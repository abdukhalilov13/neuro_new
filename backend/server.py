from fastapi import FastAPI, APIRouter, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app
app = FastAPI(
    title="Neurosurgery Center API",
    description="API for the Republican Scientific Center of Neurosurgery",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Basic routes
@api_router.get("/")
async def root():
    return {
        "message": "Neurosurgery Center API",
        "version": "1.0.0",
        "status": "active",
        "timestamp": datetime.utcnow().isoformat()
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "connected"
    }

# Simple endpoints for testing
@api_router.get("/departments")
async def get_departments():
    return [
        {
            "id": "1",
            "name": "Отделение нейрохирургии позвоночника",
            "description": "Специализируется на лечении заболеваний и травм позвоночника",
            "icon": "Activity",
            "color": "from-blue-500 to-blue-600",
            "is_active": True
        },
        {
            "id": "2", 
            "name": "Отделение нейрохирургии сосудов головного мозга",
            "description": "Лечение сосудистых заболеваний головного мозга",
            "icon": "Brain",
            "color": "from-green-500 to-green-600",
            "is_active": True
        },
        {
            "id": "3",
            "name": "Детское нейрохирургическое отделение", 
            "description": "Специализированная помощь детям с нейрохирургической патологией",
            "icon": "Heart",
            "color": "from-pink-500 to-pink-600",
            "is_active": True
        }
    ]

@api_router.get("/doctors")
async def get_doctors():
    return [
        {
            "id": "1",
            "name": "Кариев Габрат Маратович",
            "specialization": "Нейрохирург, к.м.н.",
            "experience": "25+ лет",
            "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
            "email": "kariev@neuro.uz",
            "phone": "+998 90 123-45-67",
            "reception": "Понедельник-Пятница, 9:00-17:00",
            "department_id": "1",
            "is_active": True
        },
        {
            "id": "2",
            "name": "Салимов Фаррух Шухратович",
            "specialization": "Нейрохирург",
            "experience": "15+ лет",
            "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
            "email": "salimov@neuro.uz", 
            "phone": "+998 91 234-56-78",
            "reception": "Вторник-Суббота, 9:00-17:00",
            "department_id": "2",
            "is_active": True
        },
        {
            "id": "3",
            "name": "Юлдашева Малика Азизовна",
            "specialization": "Детский нейрохирург",
            "experience": "12+ лет",
            "image": "https://images.unsplash.com/photo-1594824919597-a32ebf81ba4c?w=400&h=400&fit=crop&crop=face",
            "email": "yuldasheva@neuro.uz",
            "phone": "+998 93 345-67-89",
            "reception": "Понедельник-Пятница, 8:00-16:00",
            "department_id": "3",
            "is_active": True
        }
    ]

@api_router.get("/services")
async def get_services():
    return [
        {
            "id": "1",
            "name": "Консультация нейрохирурга",
            "category": "Консультации",
            "description": "Первичная консультация специалиста",
            "price": 150000,
            "is_active": True
        },
        {
            "id": "2",
            "name": "МРТ головного мозга",
            "category": "Диагностика", 
            "description": "Магнитно-резонансная томография",
            "price": 800000,
            "is_active": True
        },
        {
            "id": "3",
            "name": "Удаление опухоли головного мозга",
            "category": "Хирургия",
            "description": "Нейрохирургическая операция",
            "price": 15000000,
            "is_active": True
        }
    ]

@api_router.get("/news")
async def get_news():
    return [
        {
            "id": "1",
            "title": "Новые технологии в нейрохирургии",
            "excerpt": "Центр внедрил современные методы лечения",
            "content": "Подробное описание новых технологий...",
            "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
            "date": "2025-06-07",
            "is_published": True
        },
        {
            "id": "2", 
            "title": "Международная конференция",
            "excerpt": "Специалисты центра приняли участие в конференции",
            "content": "Детали участия в конференции...",
            "image": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=400&fit=crop",
            "date": "2025-06-05",
            "is_published": True
        }
    ]

@api_router.post("/appointments")
async def create_appointment(appointment_data: dict):
    # Простая заглушка для создания записи
    return {
        "id": "123",
        "message": "Appointment created successfully",
        "status": "pending",
        **appointment_data
    }

@api_router.get("/gallery")
async def get_gallery():
    return [
        {
            "id": "1",
            "url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
            "alt": "Операционная",
            "category": "building",
            "is_active": True
        },
        {
            "id": "2",
            "url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop", 
            "alt": "Медицинское оборудование",
            "category": "equipment",
            "is_active": True
        }
    ]

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    logger.info("Neurosurgery Center API started")

@app.on_event("shutdown")
async def shutdown():
    client.close()
    logger.info("Database connection closed")
