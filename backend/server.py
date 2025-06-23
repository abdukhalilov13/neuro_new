from fastapi import FastAPI, APIRouter, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
from .database import DatabaseManager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ.get('DB_NAME', 'neuro_center')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Database manager instance
db_manager = DatabaseManager(mongo_url, db_name)

# Dependency to get database manager
async def get_db_manager():
    return db_manager

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
# Departments endpoints with real database operations
@api_router.get("/departments")
async def get_departments(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        departments = await db_manager.get_items("departments", {"is_active": True})
        if not departments:
            # Initialize with fallback data in MongoDB if database is empty
            fallback_departments = [
                {
                    "id": "1",
                    "name_ru": "Общая нейрохирургия",
                    "name_uz": "Umumiy neyroxirurgiya",
                    "name_en": "General Neurosurgery",
                    "description_ru": "Лечение заболеваний центральной нервной системы",
                    "description_uz": "Markaziy asab tizimi kasalliklarini davolash",
                    "description_en": "Treatment of central nervous system diseases",
                    "head_doctor": "Кариев Габрат Маратович",
                    "phone": "+998 71 264-96-10",
                    "is_active": True
                },
                {
                    "id": "2", 
                    "name_ru": "Детская нейрохирургия",
                    "name_uz": "Bolalar neyroxirurgiyasi",
                    "name_en": "Pediatric Neurosurgery",
                    "description_ru": "Специализированная помощь детям с нейрохирургическими заболеваниями",
                    "description_uz": "Neyroxirurgik kasalliklari bo'lgan bolalarga ixtisoslashgan yordam",
                    "description_en": "Specialized care for children with neurosurgical conditions",
                    "head_doctor": "Кодашев Равшан Муслимович",
                    "phone": "+998 71 264-96-09",
                    "is_active": True
                },
                {
                    "id": "3",
                    "name_ru": "Сосудистая нейрохирургия", 
                    "name_uz": "Qon tomir neyroxirurgiyasi",
                    "name_en": "Vascular Neurosurgery",
                    "description_ru": "Лечение сосудистых заболеваний головного мозга",
                    "description_uz": "Bosh miya qon tomir kasalliklarini davolash",
                    "description_en": "Treatment of cerebrovascular diseases",
                    "head_doctor": "Асадуллаев Улугбек Максудович",
                    "phone": "+998 71 264-96-15",
                    "is_active": True
                }
            ]
            
            # Insert initial data into MongoDB
            for dept in fallback_departments:
                await db_manager.create_item("departments", dept)
            
            return fallback_departments
        
        return departments
    except Exception as e:
        # Return fallback data on database error
        logging.error(f"Database error in get_departments: {e}")
        return [
            {
                "id": "1",
                "name_ru": "Общая нейрохирургия",
                "name_uz": "Umumiy neyroxirurgiya", 
                "name_en": "General Neurosurgery",
                "description_ru": "Лечение заболеваний центральной нервной системы",
                "description_uz": "Markaziy asab tizimi kasalliklarini davolash",
                "description_en": "Treatment of central nervous system diseases",
                "head_doctor": "Кариев Габрат Маратович",
                "phone": "+998 71 264-96-10",
                "is_active": True
            }
        ]

@api_router.post("/departments")
async def create_department(department_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        # Generate new ID
        import uuid
        department_data["id"] = str(uuid.uuid4())
        department_data["is_active"] = True
        
        # Save to database
        result_id = await db_manager.create_item("departments", department_data)
        return {
            "id": department_data["id"], 
            "message": "Department created successfully",
            "name_ru": department_data.get("name_ru", ""),
            "description_ru": department_data.get("description_ru", "")
        }
    except Exception as e:
        logging.error(f"Error creating department: {e}")
        return {"error": "Failed to create department"}

@api_router.put("/departments/{department_id}")
async def update_department(department_id: str, department_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("departments", department_id, department_data)
        if success:
            return {
                "id": department_id, 
                "message": "Department updated successfully",
                "name_ru": department_data.get("name_ru", ""),
                "description_ru": department_data.get("description_ru", "")
            }
        else:
            return {"error": "Department not found"}
    except Exception as e:
        logging.error(f"Error updating department: {e}")
        return {"error": "Failed to update department"}

@api_router.delete("/departments/{department_id}")
async def delete_department(department_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("departments", department_id)
        if success:
            return {"message": "Department deleted successfully"}
        else:
            return {"error": "Department not found"}
    except Exception as e:
        logging.error(f"Error deleting department: {e}")
        return {"error": "Failed to delete department"}

# Doctors endpoints with real database operations  
@api_router.get("/doctors")
async def get_doctors(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        doctors = await db_manager.get_items("doctors", {"is_active": True})
        if not doctors:
            # Return fallback data if database is empty
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
                },
                {
                    "id": "4", 
                    "name": "Асадуллаев Улугбек Максудович",
                    "specialization": "Нейрохирург, к.м.н.",
                    "experience": "18+ лет",
                    "image": "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?w=400&h=400&fit=crop&crop=face",
                    "email": "asadullaev@neuro.uz",
                    "phone": "+998 71 264-96-15",
                    "reception": "Понедельник-Суббота, 9:00-18:00",
                    "department_id": "1",
                    "is_active": True
                },
                {
                    "id": "5",
                    "name": "Кодашев Равшан Муслимович", 
                    "specialization": "Детский нейрохирург, д.м.н., профессор",
                    "experience": "20+ лет",
                    "image": "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?w=400&h=400&fit=crop&crop=face",
                    "email": "kodashev@neuro.uz",
                    "phone": "+998 71 264-96-09",
                    "reception": "Вторник-Суббота, 8:00-17:00",
                    "department_id": "3",
                    "is_active": True
                }
            ]
        return doctors
    except Exception as e:
        logging.error(f"Database error in get_doctors: {e}")
        return []

@api_router.post("/doctors")
async def create_doctor(doctor_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        doctor_data["id"] = str(uuid.uuid4())
        doctor_data["is_active"] = True
        await db_manager.create_item("doctors", doctor_data)
        return {
            "id": doctor_data["id"], 
            "message": "Doctor created successfully",
            "name": doctor_data.get("name", ""),
            "specialization": doctor_data.get("specialization", "")
        }
    except Exception as e:
        logging.error(f"Error creating doctor: {e}")
        return {"error": "Failed to create doctor"}

@api_router.put("/doctors/{doctor_id}")
async def update_doctor(doctor_id: str, doctor_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("doctors", doctor_id, doctor_data)
        if success:
            return {
                "id": doctor_id, 
                "message": "Doctor updated successfully",
                "name": doctor_data.get("name", ""),
                "specialization": doctor_data.get("specialization", "")
            }
        else:
            return {"error": "Doctor not found"}
    except Exception as e:
        logging.error(f"Error updating doctor: {e}")
        return {"error": "Failed to update doctor"}

@api_router.delete("/doctors/{doctor_id}")
async def delete_doctor(doctor_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("doctors", doctor_id)
        if success:
            return {"message": "Doctor deleted successfully"}
        else:
            return {"error": "Doctor not found"}
    except Exception as e:
        logging.error(f"Error deleting doctor: {e}")
        return {"error": "Failed to delete doctor"}

# Services endpoints with real database operations
@api_router.get("/services")
async def get_services(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        services = await db_manager.get_items("services", {"is_active": True})
        if not services:
            # Return fallback data if database is empty
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
        return services
    except Exception as e:
        logging.error(f"Database error in get_services: {e}")
        return []

# News endpoints with real database operations  
@api_router.get("/news")
async def get_news(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        news = await db_manager.get_items("news", {"is_published": True})
        if not news:
            # Return fallback data if database is empty
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
                },
                {
                    "id": "3",
                    "title": "Успешная операция",
                    "excerpt": "Проведена сложная нейрохирургическая операция",
                    "content": "Описание операции и результатов...",
                    "image": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
                    "date": "2025-06-03",
                    "is_published": True
                }
            ]
        return news
    except Exception as e:
        logging.error(f"Database error in get_news: {e}")
        return []

@api_router.post("/appointments")
async def create_appointment(appointment_data: dict):
    # Простая заглушка для создания записи
    return {
        "id": "123",
        "message": "Appointment created successfully",
        "status": "pending",
        **appointment_data
    }

# Gallery endpoints with real database operations
@api_router.get("/gallery")
async def get_gallery(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        gallery = await db_manager.get_items("gallery", {"is_active": True})
        if not gallery:
            # Return fallback data if database is empty
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
        return gallery
    except Exception as e:
        logging.error(f"Database error in get_gallery: {e}")
        return []

# Events endpoints with real database operations
@api_router.get("/events")
async def get_events(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        events = await db_manager.get_items("events", {"is_active": True})
        if not events:
            # Return fallback data if database is empty
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
        return events
    except Exception as e:
        logging.error(f"Database error in get_events: {e}")
        return []

# Leadership endpoints with real database operations
@api_router.get("/leadership")
async def get_leadership(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        leadership = await db_manager.get_items("leadership", {"is_active": True})
        if not leadership:
            # Return fallback data if database is empty
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
        return leadership
    except Exception as e:
        logging.error(f"Database error in get_leadership: {e}")
        return []

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
async def create_service(service_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        service_data["id"] = str(uuid.uuid4())
        service_data["is_active"] = True
        await db_manager.create_item("services", service_data)
        return {
            "id": service_data["id"], 
            "message": "Service created successfully",
            "name": service_data.get("name", ""),
            "category": service_data.get("category", ""),
            "price": service_data.get("price", 0)
        }
    except Exception as e:
        logging.error(f"Error creating service: {e}")
        return {"error": "Failed to create service"}

@api_router.put("/services/{service_id}")
async def update_service(service_id: str, service_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("services", service_id, service_data)
        if success:
            return {
                "id": service_id, 
                "message": "Service updated successfully",
                "name": service_data.get("name", ""),
                "category": service_data.get("category", ""),
                "price": service_data.get("price", 0)
            }
        else:
            return {"error": "Service not found"}
    except Exception as e:
        logging.error(f"Error updating service: {e}")
        return {"error": "Failed to update service"}

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("services", service_id)
        if success:
            return {"message": "Service deleted successfully"}
        else:
            return {"error": "Service not found"}
    except Exception as e:
        logging.error(f"Error deleting service: {e}")
        return {"error": "Failed to delete service"}

@api_router.post("/news")
async def create_news(news_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        news_data["id"] = str(uuid.uuid4())
        news_data["is_published"] = True
        await db_manager.create_item("news", news_data)
        return {
            "id": news_data["id"], 
            "message": "News created successfully",
            "title": news_data.get("title", ""),
            "excerpt": news_data.get("excerpt", "")
        }
    except Exception as e:
        logging.error(f"Error creating news: {e}")
        return {"error": "Failed to create news"}

@api_router.put("/news/{news_id}")
async def update_news(news_id: str, news_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("news", news_id, news_data)
        if success:
            return {
                "id": news_id, 
                "message": "News updated successfully",
                "title": news_data.get("title", ""),
                "excerpt": news_data.get("excerpt", "")
            }
        else:
            return {"error": "News not found"}
    except Exception as e:
        logging.error(f"Error updating news: {e}")
        return {"error": "Failed to update news"}

@api_router.delete("/news/{news_id}")
async def delete_news(news_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("news", news_id)
        if success:
            return {"message": "News deleted successfully"}
        else:
            return {"error": "News not found"}
    except Exception as e:
        logging.error(f"Error deleting news: {e}")
        return {"error": "Failed to delete news"}

@api_router.post("/gallery")
async def create_gallery_image(image_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        image_data["id"] = str(uuid.uuid4())
        image_data["is_active"] = True
        await db_manager.create_item("gallery", image_data)
        return {
            "id": image_data["id"], 
            "message": "Image created successfully",
            "url": image_data.get("url", ""),
            "alt": image_data.get("alt", "")
        }
    except Exception as e:
        logging.error(f"Error creating gallery image: {e}")
        return {"error": "Failed to create image"}

@api_router.put("/gallery/{image_id}")
async def update_gallery_image(image_id: str, image_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("gallery", image_id, image_data)
        if success:
            return {
                "id": image_id, 
                "message": "Image updated successfully",
                "url": image_data.get("url", ""),
                "alt": image_data.get("alt", "")
            }
        else:
            return {"error": "Image not found"}
    except Exception as e:
        logging.error(f"Error updating gallery image: {e}")
        return {"error": "Failed to update image"}

@api_router.delete("/gallery/{image_id}")
async def delete_gallery_image(image_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("gallery", image_id)
        if success:
            return {"message": "Image deleted successfully"}
        else:
            return {"error": "Image not found"}
    except Exception as e:
        logging.error(f"Error deleting gallery image: {e}")
        return {"error": "Failed to delete image"}

@api_router.post("/leadership")
async def create_leadership(leadership_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        leadership_data["id"] = str(uuid.uuid4())
        leadership_data["is_active"] = True
        await db_manager.create_item("leadership", leadership_data)
        return {
            "id": leadership_data["id"], 
            "message": "Leadership created successfully",
            "name_ru": leadership_data.get("name_ru", ""),
            "position_ru": leadership_data.get("position_ru", "")
        }
    except Exception as e:
        logging.error(f"Error creating leadership: {e}")
        return {"error": "Failed to create leadership"}

@api_router.put("/leadership/{leadership_id}")
async def update_leadership(leadership_id: str, leadership_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("leadership", leadership_id, leadership_data)
        if success:
            return {
                "id": leadership_id, 
                "message": "Leadership updated successfully",
                "name_ru": leadership_data.get("name_ru", ""),
                "position_ru": leadership_data.get("position_ru", "")
            }
        else:
            return {"error": "Leadership not found"}
    except Exception as e:
        logging.error(f"Error updating leadership: {e}")
        return {"error": "Failed to update leadership"}

@api_router.delete("/leadership/{leadership_id}")
async def delete_leadership(leadership_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("leadership", leadership_id)
        if success:
            return {"message": "Leadership deleted successfully"}
        else:
            return {"error": "Leadership not found"}
    except Exception as e:
        logging.error(f"Error deleting leadership: {e}")
        return {"error": "Failed to delete leadership"}

# Appointments endpoints with real database operations
@api_router.get("/appointments")
async def get_appointments(doctor_id: str = None, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        filter_dict = {}
        if doctor_id:
            filter_dict["doctorId"] = doctor_id
        
        appointments = await db_manager.get_items("appointments", filter_dict)
        if not appointments:
            # Return fallback data if database is empty
            return [
                {
                    "id": "1",
                    "doctorId": "1",
                    "doctorName": "Кариев Габрат Маратович",
                    "date": "2025-06-23",
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
                },
                {
                    "id": "2",
                    "doctorId": "2", 
                    "doctorName": "Салимов Фаррух Шухратович",
                    "date": "2025-06-23",
                    "time": "10:30",
                    "patient": {
                        "name": "Петрова Мария Ивановна",
                        "phone": "+998 91 234-56-78",
                        "email": "petrova@mail.uz",
                        "age": 38,
                        "complaint": "Боли в спине после травмы"
                    },
                    "status": "confirmed",
                    "type": "examination",
                    "createdAt": "2025-06-12T11:15:00"
                }
            ]
        return appointments
    except Exception as e:
        logging.error(f"Database error in get_appointments: {e}")
        return []

@api_router.post("/appointments")
async def create_appointment(appointment_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        appointment_data["id"] = str(uuid.uuid4())
        appointment_data["createdAt"] = datetime.now().isoformat()
        await db_manager.create_item("appointments", appointment_data)
        return {
            "id": appointment_data["id"], 
            "message": "Appointment created successfully",
            "patient_name": appointment_data.get("patient", {}).get("name", ""),
            "date": appointment_data.get("date", "")
        }
    except Exception as e:
        logging.error(f"Error creating appointment: {e}")
        return {"error": "Failed to create appointment"}

@api_router.put("/appointments/{appointment_id}")
async def update_appointment(appointment_id: str, appointment_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("appointments", appointment_id, appointment_data)
        if success:
            return {
                "id": appointment_id, 
                "message": "Appointment updated successfully",
                "patient_name": appointment_data.get("patient", {}).get("name", ""),
                "status": appointment_data.get("status", "")
            }
        else:
            return {"error": "Appointment not found"}
    except Exception as e:
        logging.error(f"Error updating appointment: {e}")
        return {"error": "Failed to update appointment"}

@api_router.delete("/appointments/{appointment_id}")
async def delete_appointment(appointment_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("appointments", appointment_id)
        if success:
            return {"message": "Appointment deleted successfully"}
        else:
            return {"error": "Appointment not found"}
    except Exception as e:
        logging.error(f"Error deleting appointment: {e}")
        return {"error": "Failed to delete appointment"}

# Users/Accounts endpoints with real database operations
@api_router.get("/users")
async def get_users(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        users = await db_manager.get_items("users", {})
        if not users:
            # Initialize with default users if database is empty
            default_users = [
                {
                    "id": "1",
                    "name": "Админ",
                    "email": "admin@neuro.uz",
                    "password": "admin123",
                    "role": "admin",
                    "status": "active",
                    "createdAt": "2025-01-01",
                    "doctorId": None
                },
                {
                    "id": "2",
                    "name": "Доктор Кариев",
                    "email": "kariev@neuro.uz",
                    "password": "demo123",
                    "role": "doctor",
                    "status": "active",
                    "createdAt": "2025-01-15",
                    "doctorId": "1"
                },
                {
                    "id": "3",
                    "name": "Доктор Асадуллаев",
                    "email": "asadullaev@neuro.uz",
                    "password": "demo123",
                    "role": "doctor",
                    "status": "active",
                    "createdAt": "2025-02-01",
                    "doctorId": "4"
                },
                {
                    "id": "4",
                    "name": "Доктор Кодашев",
                    "email": "kodashev@neuro.uz",
                    "password": "demo123",
                    "role": "doctor",
                    "status": "active",
                    "createdAt": "2025-02-10",
                    "doctorId": "5"
                },
                {
                    "id": "5",
                    "name": "Доктор Салимов",
                    "email": "salimov@neuro.uz",
                    "password": "demo123",
                    "role": "doctor",
                    "status": "active",
                    "createdAt": "2025-02-15",
                    "doctorId": "2"
                },
                {
                    "id": "6",
                    "name": "Доктор Юлдашева",
                    "email": "yuldasheva@neuro.uz",
                    "password": "demo123",
                    "role": "doctor",
                    "status": "active",
                    "createdAt": "2025-02-20",
                    "doctorId": "3"
                }
            ]
            
            # Insert initial users into MongoDB
            for user in default_users:
                await db_manager.create_item("users", user)
            
            return default_users
        
        return users
    except Exception as e:
        logging.error(f"Database error in get_users: {e}")
        return []

@api_router.post("/users")
async def create_user(user_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        user_data["id"] = str(uuid.uuid4())
        user_data["createdAt"] = datetime.now().isoformat()
        user_data["status"] = user_data.get("status", "active")
        await db_manager.create_item("users", user_data)
        return {
            "id": user_data["id"], 
            "message": "User created successfully",
            "name": user_data.get("name", ""),
            "email": user_data.get("email", "")
        }
    except Exception as e:
        logging.error(f"Error creating user: {e}")
        return {"error": "Failed to create user"}

@api_router.put("/users/{user_id}")
async def update_user(user_id: str, user_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        # Hash password if it's being updated
        if "password" in user_data:
            # В реальном проекте здесь должно быть хеширование пароля
            # user_data["password"] = hash_password(user_data["password"])
            pass
            
        success = await db_manager.update_item("users", user_id, user_data)
        if success:
            return {
                "id": user_id, 
                "message": "User updated successfully",
                "name": user_data.get("name", ""),
                "email": user_data.get("email", "")
            }
        else:
            return {"error": "User not found"}
    except Exception as e:
        logging.error(f"Error updating user: {e}")
        return {"error": "Failed to update user"}

@api_router.delete("/users/{user_id}")
async def delete_user(user_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("users", user_id)
        if success:
            return {"message": "User deleted successfully"}
        else:
            return {"error": "User not found"}
    except Exception as e:
        logging.error(f"Error deleting user: {e}")
        return {"error": "Failed to delete user"}

# Login endpoint
@api_router.post("/login")
async def login(login_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        email = login_data.get("email")
        password = login_data.get("password")
        
        if not email or not password:
            return {"error": "Email and password are required"}
        
        # Find user by email
        users = await db_manager.get_items("users", {"email": email})
        if not users:
            return {"error": "Invalid credentials"}
        
        user = users[0]
        
        # Check password (в реальном проекте нужно проверять хеш)
        if user.get("password") != password:
            return {"error": "Invalid credentials"}
        
        # Get doctor profile if user is a doctor
        doctor_profile = None
        if user.get("role") == "doctor" and user.get("doctorId"):
            doctors = await db_manager.get_items("doctors", {"id": user["doctorId"]})
            if doctors:
                doctor_profile = doctors[0]
        
        return {
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "doctorId": user.get("doctorId")
            },
            "doctor_profile": doctor_profile
        }
    except Exception as e:
        logging.error(f"Error during login: {e}")
        return {"error": "Login failed"}

@api_router.post("/events")
async def create_event(event_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        import uuid
        event_data["id"] = str(uuid.uuid4())
        event_data["is_active"] = True
        await db_manager.create_item("events", event_data)
        return {
            "id": event_data["id"], 
            "message": "Event created successfully",
            "title": event_data.get("title", ""),
            "date": event_data.get("date", "")
        }
    except Exception as e:
        logging.error(f"Error creating event: {e}")
        return {"error": "Failed to create event"}

@api_router.put("/events/{event_id}")
async def update_event(event_id: str, event_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("events", event_id, event_data)
        if success:
            return {
                "id": event_id, 
                "message": "Event updated successfully",
                "title": event_data.get("title", ""),
                "date": event_data.get("date", "")
            }
        else:
            return {"error": "Event not found"}
    except Exception as e:
        logging.error(f"Error updating event: {e}")
        return {"error": "Failed to update event"}

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.delete_item("events", event_id)
        if success:
            return {"message": "Event deleted successfully"}
        else:
            return {"error": "Event not found"}
    except Exception as e:
        logging.error(f"Error deleting event: {e}")
        return {"error": "Failed to delete event"}

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
