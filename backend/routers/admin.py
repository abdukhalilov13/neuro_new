from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any
from ..models import SiteSettings, SiteSettingsUpdate, MessageResponse, User
from ..database import DatabaseManager
from ..auth import require_admin

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/statistics")
async def get_statistics(
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    stats = await db_manager.get_statistics()
    return stats

@router.get("/settings", response_model=SiteSettings)
async def get_site_settings(
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    settings_data = await db_manager.get_site_settings()
    if not settings_data:
        # Возвращаем настройки по умолчанию
        default_settings = SiteSettings(
            address="ул. Хумоюн, 40, Ташкент, Узбекистан",
            phones=["+998 71 120-80-90", "+998 71 120-80-91", "+998 71 120-80-92"],
            emails=["info@neuro.uz", "admin@neuro.uz", "press@neuro.uz"],
            working_hours={
                "weekdays": "08:00-18:00",
                "saturday": "09:00-15:00", 
                "sunday": "Выходной"
            },
            social_media={
                "telegram": "https://t.me/neuro_uz",
                "facebook": "https://facebook.com/neuro.uz",
                "instagram": "https://instagram.com/neuro.uz"
            },
            seo_title="Республиканский Научный Центр Нейрохирургии",
            seo_description="Ведущий центр нейрохирургии в Центральной Азии",
            seo_keywords="нейрохирургия, медицина, Узбекистан, операции"
        )
        await db_manager.create_item("site_settings", default_settings.dict())
        return default_settings
    
    return SiteSettings(**settings_data)

@router.put("/settings", response_model=SiteSettings)
async def update_site_settings(
    settings_update: SiteSettingsUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    update_dict = {k: v for k, v in settings_update.dict().items() if v is not None}
    
    success = await db_manager.update_site_settings(update_dict)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update settings"
        )
    
    updated_settings = await db_manager.get_site_settings()
    return SiteSettings(**updated_settings)

@router.get("/dashboard")
async def get_admin_dashboard(
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Получаем общую статистику
    stats = await db_manager.get_statistics()
    
    # Получаем последние записи
    recent_appointments = await db_manager.get_items(
        "appointments", 
        {}, 
        limit=5, 
        sort_by="created_at"
    )
    
    # Получаем последние новости
    recent_news = await db_manager.get_items(
        "news", 
        {}, 
        limit=5, 
        sort_by="created_at"
    )
    
    # Записи по статусам
    appointment_stats = {
        "pending": await db_manager.count_items("appointments", {"status": "pending"}),
        "confirmed": await db_manager.count_items("appointments", {"status": "confirmed"}),
        "completed": await db_manager.count_items("appointments", {"status": "completed"}),
        "cancelled": await db_manager.count_items("appointments", {"status": "cancelled"})
    }
    
    return {
        "statistics": stats,
        "recent_appointments": recent_appointments,
        "recent_news": recent_news,
        "appointment_stats": appointment_stats
    }

@router.post("/backup", response_model=MessageResponse)
async def create_backup(
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    # Здесь можно добавить логику создания резервной копии
    # Пока просто возвращаем сообщение
    return MessageResponse(message="Backup functionality will be implemented")

@router.get("/logs")
async def get_system_logs(
    current_user: User = Depends(require_admin),
    lines: int = 100
):
    # Здесь можно добавить логику получения системных логов
    # Пока возвращаем заглушку
    return {
        "logs": ["System logs will be implemented"],
        "total_lines": 1
    }