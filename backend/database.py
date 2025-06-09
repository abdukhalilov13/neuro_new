from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import List, Optional, Dict, Any
from datetime import datetime
import os
from .models import *

class DatabaseManager:
    def __init__(self, mongo_url: str, db_name: str):
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
    async def close(self):
        self.client.close()
        
    # Generic CRUD operations
    async def create_item(self, collection: str, item: dict) -> str:
        item["created_at"] = datetime.utcnow()
        item["updated_at"] = datetime.utcnow()
        result = await self.db[collection].insert_one(item)
        return str(result.inserted_id)
        
    async def get_item(self, collection: str, item_id: str) -> Optional[dict]:
        return await self.db[collection].find_one({"id": item_id})
        
    async def get_items(
        self, 
        collection: str, 
        filter_dict: dict = {}, 
        skip: int = 0, 
        limit: int = 100,
        sort_by: str = "created_at",
        sort_order: int = -1
    ) -> List[dict]:
        cursor = self.db[collection].find(filter_dict)
        cursor = cursor.sort(sort_by, sort_order).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
        
    async def update_item(self, collection: str, item_id: str, update_data: dict) -> bool:
        update_data["updated_at"] = datetime.utcnow()
        result = await self.db[collection].update_one(
            {"id": item_id}, 
            {"$set": update_data}
        )
        return result.modified_count > 0
        
    async def delete_item(self, collection: str, item_id: str) -> bool:
        result = await self.db[collection].delete_one({"id": item_id})
        return result.deleted_count > 0
        
    async def count_items(self, collection: str, filter_dict: dict = {}) -> int:
        return await self.db[collection].count_documents(filter_dict)
        
    # Specialized methods
    async def get_user_by_email(self, email: str) -> Optional[dict]:
        return await self.db.users.find_one({"email": email})
        
    async def get_doctors_by_department(self, department_id: str) -> List[dict]:
        return await self.get_items(
            "doctors", 
            {"department_id": department_id, "is_active": True}
        )
        
    async def get_appointments_by_doctor(self, doctor_id: str, date: str = None) -> List[dict]:
        filter_dict = {"doctor_id": doctor_id}
        if date:
            filter_dict["date"] = date
        return await self.get_items("appointments", filter_dict, sort_by="date")
        
    async def get_appointments_by_date_range(
        self, 
        start_date: str, 
        end_date: str
    ) -> List[dict]:
        filter_dict = {
            "date": {"$gte": start_date, "$lte": end_date}
        }
        return await self.get_items("appointments", filter_dict, sort_by="date")
        
    async def get_published_news(self, limit: int = 10) -> List[dict]:
        return await self.get_items(
            "news", 
            {"is_published": True}, 
            limit=limit,
            sort_by="created_at"
        )
        
    async def get_active_services_by_category(self, category: str = None) -> List[dict]:
        filter_dict = {"is_active": True}
        if category:
            filter_dict["category"] = category
        return await self.get_items("services", filter_dict, sort_by="name", sort_order=1)
        
    async def get_gallery_by_category(self, category: str = None) -> List[dict]:
        filter_dict = {"is_active": True}
        if category:
            filter_dict["category"] = category
        return await self.get_items("gallery", filter_dict, sort_by="created_at")
        
    async def get_leadership_ordered(self) -> List[dict]:
        return await self.get_items(
            "leadership", 
            {"is_active": True}, 
            sort_by="order", 
            sort_order=1
        )
        
    async def get_site_settings(self) -> Optional[dict]:
        return await self.db.site_settings.find_one({})
        
    async def update_site_settings(self, settings_data: dict) -> bool:
        settings_data["updated_at"] = datetime.utcnow()
        result = await self.db.site_settings.update_one(
            {}, 
            {"$set": settings_data}, 
            upsert=True
        )
        return result.acknowledged
        
    # Statistics
    async def get_statistics(self) -> dict:
        stats = {}
        stats["total_doctors"] = await self.count_items("doctors", {"is_active": True})
        stats["total_departments"] = await self.count_items("departments", {"is_active": True})
        stats["total_services"] = await self.count_items("services", {"is_active": True})
        stats["total_appointments"] = await self.count_items("appointments")
        stats["pending_appointments"] = await self.count_items(
            "appointments", 
            {"status": "pending"}
        )
        stats["confirmed_appointments"] = await self.count_items(
            "appointments", 
            {"status": "confirmed"}
        )
        return stats
        
    # Search functionality
    async def search_doctors(self, query: str) -> List[dict]:
        regex_query = {"$regex": query, "$options": "i"}
        filter_dict = {
            "$or": [
                {"name": regex_query},
                {"specialization": regex_query}
            ],
            "is_active": True
        }
        return await self.get_items("doctors", filter_dict)
        
    async def search_news(self, query: str) -> List[dict]:
        regex_query = {"$regex": query, "$options": "i"}
        filter_dict = {
            "$or": [
                {"title": regex_query},
                {"content": regex_query},
                {"tags": {"$in": [regex_query]}}
            ],
            "is_published": True
        }
        return await self.get_items("news", filter_dict)