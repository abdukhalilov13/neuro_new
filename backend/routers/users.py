from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..models import User, UserCreate, UserUpdate, MessageResponse
from ..database import DatabaseManager
from ..auth import require_admin, get_password_hash

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[User])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    users_data = await db_manager.get_items(
        "users", 
        {}, 
        skip=skip, 
        limit=limit,
        sort_by="created_at"
    )
    return [User(**user) for user in users_data]

@router.get("/{user_id}", response_model=User)
async def get_user(
    user_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    user_data = await db_manager.get_item("users", user_id)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return User(**user_data)

@router.post("/", response_model=User)
async def create_user(
    user_data: UserCreate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Проверяем, существует ли пользователь
    existing_user = await db_manager.get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Создаем нового пользователя
    user_dict = user_data.dict()
    user_dict["password_hash"] = get_password_hash(user_dict.pop("password"))
    user_dict["status"] = "active"
    
    user = User(**user_dict)
    await db_manager.create_item("users", user.dict())
    return user

@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: str,
    update_data: UserUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    existing_user = await db_manager.get_item("users", user_id)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    await db_manager.update_item("users", user_id, update_dict)
    
    updated_user = await db_manager.get_item("users", user_id)
    return User(**updated_user)

@router.delete("/{user_id}", response_model=MessageResponse)
async def delete_user(
    user_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Нельзя удалить самого себя
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    success = await db_manager.update_item(
        "users", 
        user_id, 
        {"status": "inactive"}
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return MessageResponse(message="User deleted successfully")

@router.put("/{user_id}/toggle-status", response_model=MessageResponse)
async def toggle_user_status(
    user_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Нельзя заблокировать самого себя
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot modify your own account status"
        )
    
    user_data = await db_manager.get_item("users", user_id)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    new_status = "inactive" if user_data["status"] == "active" else "active"
    
    await db_manager.update_item("users", user_id, {"status": new_status})
    
    return MessageResponse(message=f"User status changed to {new_status}")