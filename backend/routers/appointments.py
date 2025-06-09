from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime, timedelta
from ..models import (
    Appointment, AppointmentCreate, AppointmentUpdate, 
    AppointmentStatus, MessageResponse, User
)
from ..database import DatabaseManager
from ..auth import require_staff, require_doctor

router = APIRouter(prefix="/appointments", tags=["appointments"])

@router.get("/", response_model=List[Appointment])
async def get_appointments(
    skip: int = 0,
    limit: int = 100,
    doctor_id: Optional[str] = Query(None),
    date: Optional[str] = Query(None),
    status: Optional[AppointmentStatus] = Query(None),
    current_user: User = Depends(require_staff),
    db_manager: DatabaseManager = Depends()
):
    filter_dict = {}
    
    # Если пользователь врач, показываем только его записи
    if current_user.role == "doctor" and not doctor_id:
        # Находим ID врача по пользователю
        doctor_data = await db_manager.db.doctors.find_one({"email": current_user.email})
        if doctor_data:
            filter_dict["doctor_id"] = doctor_data["id"]
    elif doctor_id:
        filter_dict["doctor_id"] = doctor_id
    
    if date:
        filter_dict["date"] = date
    if status:
        filter_dict["status"] = status.value
    
    appointments_data = await db_manager.get_items(
        "appointments", 
        filter_dict, 
        skip=skip, 
        limit=limit,
        sort_by="date"
    )
    
    return [Appointment(**appointment) for appointment in appointments_data]

@router.get("/{appointment_id}", response_model=Appointment)
async def get_appointment(
    appointment_id: str,
    current_user: User = Depends(require_staff),
    db_manager: DatabaseManager = Depends()
):
    appointment_data = await db_manager.get_item("appointments", appointment_id)
    if not appointment_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    appointment = Appointment(**appointment_data)
    
    # Проверяем права доступа - врач может видеть только свои записи
    if current_user.role == "doctor":
        doctor_data = await db_manager.db.doctors.find_one({"email": current_user.email})
        if doctor_data and appointment.doctor_id != doctor_data["id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return appointment

@router.post("/", response_model=Appointment)
async def create_appointment(
    appointment_data: AppointmentCreate,
    db_manager: DatabaseManager = Depends()
):
    # Проверяем доступность времени
    existing_appointments = await db_manager.get_items(
        "appointments",
        {
            "doctor_id": appointment_data.doctor_id,
            "date": appointment_data.date,
            "time": appointment_data.time,
            "status": {"$ne": "cancelled"}
        }
    )
    
    if existing_appointments:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This time slot is already booked"
        )
    
    appointment = Appointment(**appointment_data.dict())
    await db_manager.create_item("appointments", appointment.dict())
    return appointment

@router.put("/{appointment_id}", response_model=Appointment)
async def update_appointment(
    appointment_id: str,
    update_data: AppointmentUpdate,
    current_user: User = Depends(require_staff),
    db_manager: DatabaseManager = Depends()
):
    existing_appointment = await db_manager.get_item("appointments", appointment_id)
    if not existing_appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    appointment = Appointment(**existing_appointment)
    
    # Проверяем права доступа
    if current_user.role == "doctor":
        doctor_data = await db_manager.db.doctors.find_one({"email": current_user.email})
        if doctor_data and appointment.doctor_id != doctor_data["id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    await db_manager.update_item("appointments", appointment_id, update_dict)
    
    updated_appointment = await db_manager.get_item("appointments", appointment_id)
    return Appointment(**updated_appointment)

@router.delete("/{appointment_id}", response_model=MessageResponse)
async def cancel_appointment(
    appointment_id: str,
    current_user: User = Depends(require_staff),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.update_item(
        "appointments", 
        appointment_id, 
        {"status": "cancelled"}
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    return MessageResponse(message="Appointment cancelled successfully")

@router.get("/available-slots/{doctor_id}")
async def get_available_slots(
    doctor_id: str,
    date: str,
    db_manager: DatabaseManager = Depends()
):
    # Получаем существующие записи на эту дату
    booked_appointments = await db_manager.get_items(
        "appointments",
        {
            "doctor_id": doctor_id,
            "date": date,
            "status": {"$ne": "cancelled"}
        }
    )
    
    booked_times = [apt["time"] for apt in booked_appointments]
    
    # Стандартные временные слоты
    all_slots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
    ]
    
    available_slots = [slot for slot in all_slots if slot not in booked_times]
    
    return {"available_slots": available_slots}

@router.post("/{appointment_id}/add-note")
async def add_appointment_note(
    appointment_id: str,
    note: dict,  # {"date": "2025-06-08", "text": "Note text"}
    current_user: User = Depends(require_doctor),
    db_manager: DatabaseManager = Depends()
):
    appointment_data = await db_manager.get_item("appointments", appointment_id)
    if not appointment_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    appointment = Appointment(**appointment_data)
    
    # Проверяем права доступа
    doctor_data = await db_manager.db.doctors.find_one({"email": current_user.email})
    if doctor_data and appointment.doctor_id != doctor_data["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    # Добавляем заметку
    current_notes = appointment.notes or []
    current_notes.append(note)
    
    await db_manager.update_item("appointments", appointment_id, {"notes": current_notes})
    
    return MessageResponse(message="Note added successfully")