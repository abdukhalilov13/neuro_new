# Universal CRUD endpoints for all collections
from fastapi import APIRouter, Depends, HTTPException
from .database import DatabaseManager
import uuid
import logging

# Services endpoints with real database operations
async def get_services(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        services = await db_manager.get_items("services", {"is_active": True})
        if not services:
            return [
                {
                    "id": "1",
                    "name": "Консультация нейрохирурга",
                    "category": "Консультации",
                    "description": "Первичная консультация специалиста",
                    "price": 500000,
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

async def create_service(service_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        service_data["id"] = str(uuid.uuid4())
        service_data["is_active"] = True
        await db_manager.create_item("services", service_data)
        return {"id": service_data["id"], "message": "Service created successfully", **service_data}
    except Exception as e:
        logging.error(f"Error creating service: {e}")
        return {"error": "Failed to create service"}

async def update_service(service_id: str, service_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("services", service_id, service_data)
        if success:
            return {"id": service_id, "message": "Service updated successfully", **service_data}
        else:
            return {"error": "Service not found"}
    except Exception as e:
        logging.error(f"Error updating service: {e}")
        return {"error": "Failed to update service"}

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

# News endpoints
async def get_news(db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        news = await db_manager.get_items("news", {"is_published": True})
        if not news:
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

async def create_news(news_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        news_data["id"] = str(uuid.uuid4())
        news_data["is_published"] = True
        await db_manager.create_item("news", news_data)
        return {"id": news_data["id"], "message": "News created successfully", **news_data}
    except Exception as e:
        logging.error(f"Error creating news: {e}")
        return {"error": "Failed to create news"}

async def update_news(news_id: str, news_data: dict, db_manager: DatabaseManager = Depends(get_db_manager)):
    try:
        success = await db_manager.update_item("news", news_id, news_data)
        if success:
            return {"id": news_id, "message": "News updated successfully", **news_data}
        else:
            return {"error": "News not found"}
    except Exception as e:
        logging.error(f"Error updating news: {e}")
        return {"error": "Failed to update news"}

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