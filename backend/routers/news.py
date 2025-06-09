from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from ..models import News, NewsCreate, NewsUpdate, MessageResponse, User
from ..database import DatabaseManager
from ..auth import require_admin

router = APIRouter(prefix="/news", tags=["news"])

@router.get("/", response_model=List[News])
async def get_news(
    skip: int = 0,
    limit: int = 20,
    published_only: bool = Query(True),
    search: Optional[str] = Query(None),
    db_manager: DatabaseManager = Depends()
):
    if search:
        news_data = await db_manager.search_news(search)
    else:
        filter_dict = {"is_published": True} if published_only else {}
        news_data = await db_manager.get_items(
            "news", 
            filter_dict, 
            skip=skip, 
            limit=limit,
            sort_by="created_at"
        )
    
    return [News(**article) for article in news_data]

@router.get("/{news_id}", response_model=News)
async def get_news_article(
    news_id: str,
    db_manager: DatabaseManager = Depends()
):
    news_data = await db_manager.get_item("news", news_id)
    if not news_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )
    
    # Увеличиваем счетчик просмотров
    await db_manager.update_item("news", news_id, {"views": news_data.get("views", 0) + 1})
    
    return News(**news_data)

@router.post("/", response_model=News)
async def create_news_article(
    news_data: NewsCreate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    news = News(**news_data.dict())
    await db_manager.create_item("news", news.dict())
    return news

@router.put("/{news_id}", response_model=News)
async def update_news_article(
    news_id: str,
    update_data: NewsUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    existing_news = await db_manager.get_item("news", news_id)
    if not existing_news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    await db_manager.update_item("news", news_id, update_dict)
    
    updated_news = await db_manager.get_item("news", news_id)
    return News(**updated_news)

@router.delete("/{news_id}", response_model=MessageResponse)
async def delete_news_article(
    news_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.delete_item("news", news_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )
    
    return MessageResponse(message="News article deleted successfully")

@router.put("/{news_id}/publish", response_model=MessageResponse)
async def publish_news_article(
    news_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.update_item("news", news_id, {"is_published": True})
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )
    
    return MessageResponse(message="News article published successfully")

@router.put("/{news_id}/unpublish", response_model=MessageResponse)
async def unpublish_news_article(
    news_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.update_item("news", news_id, {"is_published": False})
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="News article not found"
        )
    
    return MessageResponse(message="News article unpublished successfully")