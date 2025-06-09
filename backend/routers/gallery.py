from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from ..models import GalleryImage, GalleryImageCreate, GalleryImageUpdate, GalleryCategory, MessageResponse, User
from ..database import DatabaseManager
from ..auth import require_admin

router = APIRouter(prefix="/gallery", tags=["gallery"])

@router.get("/", response_model=List[GalleryImage])
async def get_gallery_images(
    skip: int = 0,
    limit: int = 50,
    category: Optional[GalleryCategory] = Query(None),
    db_manager: DatabaseManager = Depends()
):
    if category:
        images_data = await db_manager.get_gallery_by_category(category.value)
    else:
        images_data = await db_manager.get_items(
            "gallery", 
            {"is_active": True}, 
            skip=skip, 
            limit=limit,
            sort_by="created_at"
        )
    
    return [GalleryImage(**image) for image in images_data]

@router.get("/categories", response_model=List[str])
async def get_gallery_categories():
    return [category.value for category in GalleryCategory]

@router.get("/{image_id}", response_model=GalleryImage)
async def get_gallery_image(
    image_id: str,
    db_manager: DatabaseManager = Depends()
):
    image_data = await db_manager.get_item("gallery", image_id)
    if not image_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery image not found"
        )
    return GalleryImage(**image_data)

@router.post("/", response_model=GalleryImage)
async def add_gallery_image(
    image_data: GalleryImageCreate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    image = GalleryImage(**image_data.dict())
    await db_manager.create_item("gallery", image.dict())
    return image

@router.put("/{image_id}", response_model=GalleryImage)
async def update_gallery_image(
    image_id: str,
    update_data: GalleryImageUpdate,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    existing_image = await db_manager.get_item("gallery", image_id)
    if not existing_image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery image not found"
        )
    
    update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
    await db_manager.update_item("gallery", image_id, update_dict)
    
    updated_image = await db_manager.get_item("gallery", image_id)
    return GalleryImage(**updated_image)

@router.delete("/{image_id}", response_model=MessageResponse)
async def delete_gallery_image(
    image_id: str,
    current_user: User = Depends(require_admin),
    db_manager: DatabaseManager = Depends()
):
    success = await db_manager.update_item(
        "gallery", 
        image_id, 
        {"is_active": False}
    )
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gallery image not found"
        )
    
    return MessageResponse(message="Gallery image deleted successfully")