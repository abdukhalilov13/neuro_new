from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import Department, DepartmentCreate, DepartmentUpdate, MessageResponse, User
from database import DatabaseManager
from auth import require_admin, require_staff

router = APIRouter(prefix="/departments", tags=["departments"])

@router.get("/", response_model=List[Department])
async def get_departments(
    skip: int = 0,
    limit: int = 100,
    db_manager: DatabaseManager = Depends()
):
    departments_data = await db_manager.get_items(
        "departments", 
        {"is_active": True}, 
        skip=skip, 
        limit=limit,
        sort_by="name",
        sort_order=1
    )
    return [Department(**dept) for dept in departments_data]

@router.get("/{department_id}", response_model=Department)
async def get_department(
    department_id: str,
    db_manager: DatabaseManager = Depends()
):
    department_data = await db_manager.get_item("departments", department_id)
    if not department_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    return Department(**department_data)

@router.post("/", response_model=Department)
async def create_department(
    department_data: DepartmentCreate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    department = Department(**department_data.dict())
    await db_manager.create_item("departments", department.dict())
    return department

@router.put("/{department_id}", response_model=Department)
async def update_department(
    department_id: str,
    update_data: DepartmentUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Проверяем существование отделения
    existing_dept = await db_manager.get_item("departments", department_id)
    if not existing_dept:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    # Обновляем только переданные поля
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    
    await db_manager.update_item("departments", department_id, update_dict)
    
    # Возвращаем обновленные данные
    updated_dept = await db_manager.get_item("departments", department_id)
    return Department(**updated_dept)

@router.delete("/{department_id}", response_model=MessageResponse)
async def delete_department(
    department_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Мягкое удаление - помечаем как неактивное
    success = await db_manager.update_item(
        "departments", 
        department_id, 
        {"is_active": False}
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    return MessageResponse(message="Department deleted successfully")

@router.get("/{department_id}/doctors")
async def get_department_doctors(
    department_id: str,
    db_manager: DatabaseManager = Depends()
):
    doctors_data = await db_manager.get_doctors_by_department(department_id)
    return doctors_data