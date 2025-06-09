from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from ..models import Doctor, DoctorCreate, DoctorUpdate, MessageResponse, User
from ..database import DatabaseManager
from ..auth import require_admin, require_staff

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("/", response_model=List[Doctor])
async def get_doctors(
    skip: int = 0,
    limit: int = 100,
    department_id: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db_manager: DatabaseManager = Depends()
):
    if search:
        doctors_data = await db_manager.search_doctors(search)
    elif department_id:
        doctors_data = await db_manager.get_doctors_by_department(department_id)
    else:
        doctors_data = await db_manager.get_items(
            "doctors", 
            {"is_active": True}, 
            skip=skip, 
            limit=limit,
            sort_by="name",
            sort_order=1
        )
    
    return [Doctor(**doctor) for doctor in doctors_data]

@router.get("/{doctor_id}", response_model=Doctor)
async def get_doctor(
    doctor_id: str,
    db_manager: DatabaseManager = Depends()
):
    doctor_data = await db_manager.get_item("doctors", doctor_id)
    if not doctor_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    return Doctor(**doctor_data)

@router.post("/", response_model=Doctor)
async def create_doctor(
    doctor_data: DoctorCreate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    doctor = Doctor(**doctor_data.dict())
    await db_manager.create_item("doctors", doctor.dict())
    return doctor

@router.put("/{doctor_id}", response_model=Doctor)
async def update_doctor(
    doctor_id: str,
    update_data: DoctorUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    existing_doctor = await db_manager.get_item("doctors", doctor_id)
    if not existing_doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    await db_manager.update_item("doctors", doctor_id, update_dict)
    
    updated_doctor = await db_manager.get_item("doctors", doctor_id)
    return Doctor(**updated_doctor)

@router.delete("/{doctor_id}", response_model=MessageResponse)
async def delete_doctor(
    doctor_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.update_item(
        "doctors", 
        doctor_id, 
        {"is_active": False}
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )
    
    return MessageResponse(message="Doctor deleted successfully")

@router.get("/{doctor_id}/appointments")
async def get_doctor_appointments(
    doctor_id: str,
    date: Optional[str] = Query(None),
    current_user: User = Depends(require_staff),
    db_manager: DatabaseManager = Depends()
):
    appointments = await db_manager.get_appointments_by_doctor(doctor_id, date)
    return appointments