from fastapi import FastAPI, APIRouter, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime

# Import models and database
from models import *
from database import DatabaseManager
from auth import get_password_hash

# Import routers
from routers import auth, departments, doctors, services, appointments, news, gallery, users, admin

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# Global database manager
db_manager = None

# Create the main app
app = FastAPI(
    title="Neurosurgery Center API",
    description="API for the Republican Scientific Center of Neurosurgery",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Dependency to get database manager
async def get_db_manager():
    return db_manager

# Include all routers
api_router.include_router(auth.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(departments.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(doctors.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(services.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(appointments.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(news.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(gallery.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(users.router, dependencies=[Depends(get_db_manager)])
api_router.include_router(admin.router, dependencies=[Depends(get_db_manager)])

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
        "database": "connected" if db_manager else "disconnected"
    }

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
async def startup_db():
    global db_manager
    db_manager = DatabaseManager(mongo_url, db_name)
    logger.info("Database connection established")
    
    # Initialize default data
    await initialize_default_data()

@app.on_event("shutdown")
async def shutdown_db():
    if db_manager:
        await db_manager.close()
        logger.info("Database connection closed")

async def initialize_default_data():
    """Initialize the database with default data"""
    
    # Create default admin user
    existing_admin = await db_manager.get_user_by_email("admin@neuro.uz")
    if not existing_admin:
        admin_user = User(
            name="Администратор",
            email="admin@neuro.uz",
            password_hash=get_password_hash("admin123"),
            role=UserRole.ADMIN,
            status=UserStatus.ACTIVE
        )
        await db_manager.create_item("users", admin_user.dict())
        logger.info("Default admin user created")
    
    # Create default doctor user
    existing_doctor = await db_manager.get_user_by_email("doctor@neuro.uz")
    if not existing_doctor:
        doctor_user = User(
            name="Доктор",
            email="doctor@neuro.uz",
            password_hash=get_password_hash("demo123"),
            role=UserRole.DOCTOR,
            status=UserStatus.ACTIVE
        )
        await db_manager.create_item("users", doctor_user.dict())
        logger.info("Default doctor user created")
    
    # Create default departments if none exist
    departments_count = await db_manager.count_items("departments")
    if departments_count == 0:
        default_departments = [
            {
                "name": "Отделение нейрохирургии позвоночника",
                "description": "Специализируется на лечении заболеваний и травм позвоночника",
                "icon": "Activity",
                "color": "from-blue-500 to-blue-600"
            },
            {
                "name": "Отделение нейрохирургии сосудов головного мозга",
                "description": "Лечение сосудистых заболеваний головного мозга",
                "icon": "Brain",
                "color": "from-green-500 to-green-600"
            },
            {
                "name": "Детское нейрохирургическое отделение",
                "description": "Специализированная помощь детям с нейрохирургической патологией",
                "icon": "Heart",
                "color": "from-pink-500 to-pink-600"
            }
        ]
        
        for dept_data in default_departments:
            dept = Department(**dept_data)
            await db_manager.create_item("departments", dept.dict())
        
        logger.info("Default departments created")
    
    # Create default services if none exist
    services_count = await db_manager.count_items("services")
    if services_count == 0:
        default_services = [
            {
                "name": "Консультация нейрохирурга",
                "category": ServiceCategory.CONSULTATION,
                "description": "Первичная консультация специалиста",
                "price": 150000
            },
            {
                "name": "МРТ головного мозга",
                "category": ServiceCategory.DIAGNOSTICS,
                "description": "Магнитно-резонансная томография",
                "price": 800000
            },
            {
                "name": "Удаление опухоли головного мозга",
                "category": ServiceCategory.SURGERY,
                "description": "Нейрохирургическая операция",
                "price": 15000000
            }
        ]
        
        for service_data in default_services:
            service = Service(**service_data)
            await db_manager.create_item("services", service.dict())
        
        logger.info("Default services created")
    
    logger.info("Default data initialization completed")
