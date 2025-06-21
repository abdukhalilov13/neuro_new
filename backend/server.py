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
        },
        {
            "id": "4",
            "name": "Микрохирургическое удаление опухоли",
            "category": "Хирургия",
            "description": "Прецизионное удаление новообразований мозга",
            "price": 8000000,
            "is_active": True
        },
        {
            "id": "5",
            "name": "Реабилитационная программа",
            "category": "Реабилитация",
            "description": "Комплексная послеоперационная реабилитация",
            "price": 250000,
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

@api_router.get("/events")
async def get_events():
    return [
        {
            "id": "1",
            "title": "Международная конференция по нейрохирургии",
            "description": "Ведущие специалисты обсудят новые методы лечения",
            "date": "2025-07-15",
            "time": "09:00",
            "location": "Главный конференц-зал",
            "type": "conference"
        },
        {
            "id": "2",
            "title": "День открытых дверей",
            "description": "Экскурсии по центру и консультации",
            "date": "2025-07-20",
            "time": "10:00",
            "location": "Главный холл",
            "type": "openDay"
        }
    ]

@api_router.get("/leadership")
async def get_leadership():
    return [
        {
            "id": "1",
            "name_ru": "Кариев Габрат Маратович",
            "name_uz": "Kariyev Gabrat Maratovich", 
            "name_en": "Kariev Gabrat Maratovich",
            "position_ru": "Директор центра",
            "position_uz": "Markaz direktori",
            "position_en": "Center Director",
            "image": "https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg",
            "phone": "+998 71 264-96-10",
            "email": "director@neuro.uz",
            "biography_ru": "Заслуженный врач Республики Узбекистан, доктор медицинских наук. Более 30 лет опыта в нейрохирургии.",
            "biography_uz": "O'zbekiston Respublikasining xizmatli shifokori, tibbiyot fanlari doktori. Neyroxirurgiyada 30 yildan ortiq tajriba.",
            "biography_en": "Honored Doctor of the Republic of Uzbekistan, Doctor of Medical Sciences. Over 30 years of experience in neurosurgery."
        },
        {
            "id": "2",
            "name_ru": "Асадуллаев Улугбек Максудович",
            "name_uz": "Asadullayev Ulug'bek Masud o'g'li",
            "name_en": "Asadullaev Ulugbek Maksudovich",
            "position_ru": "Заместитель директора по научной работе",
            "position_uz": "Ilmiy ish bo'yicha direktor o'rinbosari",
            "position_en": "Deputy Director for Scientific Work",
            "image": "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg",
            "phone": "+998 71 264-96-15",
            "email": "asadullaev@neuro.uz",
            "biography_ru": "Кандидат медицинских наук, старший научный сотрудник. Специалист по сосудистой нейрохирургии.",
            "biography_uz": "Tibbiyot fanlari nomzodi, katta ilmiy xodim. Qon tomir neyroxirurgiyasi bo'yicha mutaxassis.",
            "biography_en": "Candidate of Medical Sciences, Senior Research Fellow. Specialist in vascular neurosurgery."
        }
    ]

# POST endpoints for admin
@api_router.post("/departments")
async def create_department(department_data: dict):
    return {"id": "new_id", "message": "Department created successfully", **department_data}

@api_router.put("/departments/{department_id}")
async def update_department(department_id: str, department_data: dict):
    return {"id": department_id, "message": "Department updated successfully", **department_data}

@api_router.delete("/departments/{department_id}")
async def delete_department(department_id: str):
    return {"message": "Department deleted successfully"}

@api_router.post("/doctors")
async def create_doctor(doctor_data: dict):
    return {"id": "new_id", "message": "Doctor created successfully", **doctor_data}

@api_router.put("/doctors/{doctor_id}")
async def update_doctor(doctor_id: str, doctor_data: dict):
    return {"id": doctor_id, "message": "Doctor updated successfully", **doctor_data}

@api_router.delete("/doctors/{doctor_id}")
async def delete_doctor(doctor_id: str):
    return {"message": "Doctor deleted successfully"}

@api_router.post("/services")
async def create_service(service_data: dict):
    return {"id": "new_id", "message": "Service created successfully", **service_data}

@api_router.put("/services/{service_id}")
async def update_service(service_id: str, service_data: dict):
    return {"id": service_id, "message": "Service updated successfully", **service_data}

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    return {"message": "Service deleted successfully"}

@api_router.post("/news")
async def create_news(news_data: dict):
    return {"id": "new_id", "message": "News created successfully", **news_data}

@api_router.put("/news/{news_id}")
async def update_news(news_id: str, news_data: dict):
    return {"id": news_id, "message": "News updated successfully", **news_data}

@api_router.delete("/news/{news_id}")
async def delete_news(news_id: str):
    return {"message": "News deleted successfully"}

@api_router.post("/gallery")
async def create_gallery_image(image_data: dict):
    return {"id": "new_id", "message": "Image created successfully", **image_data}

@api_router.put("/gallery/{image_id}")
async def update_gallery_image(image_id: str, image_data: dict):
    return {"id": image_id, "message": "Image updated successfully", **image_data}

@api_router.delete("/gallery/{image_id}")
async def delete_gallery_image(image_id: str):
    return {"message": "Image deleted successfully"}

@api_router.post("/leadership")
async def create_leadership(leadership_data: dict):
    return {"id": "new_id", "message": "Leadership created successfully", **leadership_data}

@api_router.put("/leadership/{leadership_id}")
async def update_leadership(leadership_id: str, leadership_data: dict):
    return {"id": leadership_id, "message": "Leadership updated successfully", **leadership_data}

@api_router.delete("/leadership/{leadership_id}")
async def delete_leadership(leadership_id: str):
    return {"message": "Leadership deleted successfully"}

@api_router.post("/events")
async def create_event(event_data: dict):
    return {"id": "new_id", "message": "Event created successfully", **event_data}

@api_router.put("/events/{event_id}")
async def update_event(event_id: str, event_data: dict):
    return {"id": event_id, "message": "Event updated successfully", **event_data}

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    return {"message": "Event deleted successfully"}

# Appointments endpoints
@api_router.get("/appointments")
async def get_appointments(doctor_id: str = None):
    # Возвращаем записи для конкретного врача или все записи
    appointments = [
        {
            "id": 1,
            "doctorId": "1",
            "doctorName": "Кариев Габрат Маратович",
            "date": "2025-06-13",
            "time": "09:00",
            "patient": {
                "name": "Иванов Алексей Петрович",
                "phone": "+998 90 123-45-67",
                "email": "ivanov@mail.uz",
                "age": 45,
                "complaint": "Головные боли и головокружение"
            },
            "status": "pending",
            "type": "consultation",
            "createdAt": "2025-06-12T10:30:00"
        }
    ]
    
    if doctor_id:
        appointments = [apt for apt in appointments if apt["doctorId"] == doctor_id]
    
    return appointments

@api_router.post("/appointments")
async def create_appointment(appointment_data: dict):
    return {"id": "new_id", "message": "Appointment created successfully", **appointment_data}

@api_router.put("/appointments/{appointment_id}")
async def update_appointment(appointment_id: str, appointment_data: dict):
    return {"id": appointment_id, "message": "Appointment updated successfully", **appointment_data}

@api_router.delete("/appointments/{appointment_id}")
async def delete_appointment(appointment_id: str):
    return {"message": "Appointment deleted successfully"}

# Job applications endpoints  
@api_router.get("/job-applications")
async def get_job_applications():
    return [
        {
            "id": 1,
            "vacancyId": 1,
            "vacancyTitle": "Врач-нейрохирург",
            "applicant": {
                "name": "Иванов Иван Иванович",
                "phone": "+998 90 123-45-67",
                "email": "ivanov@mail.uz",
                "experience": "5 лет в нейрохирургии",
                "education": "ТМА, специальность нейрохирургия",
                "coverLetter": "Хочу работать в вашем центре..."
            },
            "submittedAt": "2025-06-13T10:30:00",
            "status": "new"
        }
    ]

@api_router.post("/job-applications")
async def create_job_application(application_data: dict):
    return {"id": "new_id", "message": "Job application created successfully", **application_data}

@api_router.put("/job-applications/{application_id}")
async def update_job_application(application_id: str, application_data: dict):
    return {"id": application_id, "message": "Job application updated successfully", **application_data}

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
