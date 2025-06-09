from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from ..models import Service, ServiceCreate, ServiceUpdate, ServiceCategory, MessageResponse, User
from ..database import DatabaseManager
from ..auth import require_admin

router = APIRouter(prefix="/services", tags=["services"])

@router.get("/", response_model=List[Service])
async def get_services(
    skip: int = 0,
    limit: int = 100,
    category: Optional[ServiceCategory] = Query(None),
    db_manager: DatabaseManager = Depends()
):
    if category:
        services_data = await db_manager.get_active_services_by_category(category.value)
    else:
        services_data = await db_manager.get_items(
            "services", 
            {"is_active": True}, 
            skip=skip, 
            limit=limit,
            sort_by="category",
            sort_order=1
        )
    
    return [Service(**service) for service in services_data]

@router.get("/categories", response_model=List[str])
async def get_service_categories():
    return [category.value for category in ServiceCategory]

@router.get("/{service_id}", response_model=Service)
async def get_service(
    service_id: str,
    db_manager: DatabaseManager = Depends()
):
    service_data = await db_manager.get_item("services", service_id)
    if not service_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    return Service(**service_data)

@router.post("/", response_model=Service)
async def create_service(
    service_data: ServiceCreate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    service = Service(**service_data.dict())
    await db_manager.create_item("services", service.dict())
    return service

@router.put("/{service_id}", response_model=Service)
async def update_service(
    service_id: str,
    update_data: ServiceUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    existing_service = await db_manager.get_item("services", service_id)
    if not existing_service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    await db_manager.update_item("services", service_id, update_dict)
    
    updated_service = await db_manager.get_item("services", service_id)
    return Service(**updated_service)

@router.delete("/{service_id}", response_model=MessageResponse)
async def delete_service(
    service_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.update_item(
        "services", 
        service_id, 
        {"is_active": False}
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    
    return MessageResponse(message="Service deleted successfully")