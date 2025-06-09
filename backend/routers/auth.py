from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import timedelta
from ..models import UserLogin, Token, User, UserCreate, MessageResponse
from ..auth import authenticate_user, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
from ..database import DatabaseManager

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=Token)
async def login(
    user_credentials: UserLogin,
    db_manager: DatabaseManager = Depends()
):
    user = await authenticate_user(
        db_manager.db, 
        user_credentials.email, 
        user_credentials.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is not active",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}, 
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer"
    }

@router.post("/register", response_model=MessageResponse)
async def register(
    user_data: UserCreate,
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
    
    return MessageResponse(message="User registered successfully")

@router.get("/me", response_model=User)
async def get_current_user(
    current_user: User = Depends(),
    db_manager: DatabaseManager = Depends()
):
    return current_user