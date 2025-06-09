from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Base Models
class BaseRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# User Management
class UserRole(str, Enum):
    ADMIN = "admin"
    DOCTOR = "doctor"
    NURSE = "nurse"
    RECEPTION = "reception"

class UserStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class User(BaseRecord):
    name: str
    email: EmailStr
    password_hash: str
    role: UserRole
    status: UserStatus = UserStatus.ACTIVE
    phone: Optional[str] = None
    
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole
    phone: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[UserRole] = None
    status: Optional[UserStatus] = None
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Department Models
class Department(BaseRecord):
    name: str
    description: str
    icon: str = "Brain"
    color: str = "from-blue-500 to-blue-600"
    head_doctor_id: Optional[str] = None
    is_active: bool = True

class DepartmentCreate(BaseModel):
    name: str
    description: str
    icon: str = "Brain"
    color: str = "from-blue-500 to-blue-600"
    head_doctor_id: Optional[str] = None

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    head_doctor_id: Optional[str] = None
    is_active: Optional[bool] = None

# Doctor Models
class Doctor(BaseRecord):
    name: str
    specialization: str
    experience: str
    education: Optional[str] = None
    biography: Optional[str] = None
    image: str
    email: EmailStr
    phone: str
    reception: str
    department_id: Optional[str] = None
    user_id: Optional[str] = None
    is_active: bool = True
    achievements: List[str] = []
    languages: List[str] = ["Русский", "Узбекский"]

class DoctorCreate(BaseModel):
    name: str
    specialization: str
    experience: str
    education: Optional[str] = None
    biography: Optional[str] = None
    image: str
    email: EmailStr
    phone: str
    reception: str
    department_id: Optional[str] = None
    achievements: List[str] = []
    languages: List[str] = ["Русский", "Узбекский"]

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    specialization: Optional[str] = None
    experience: Optional[str] = None
    education: Optional[str] = None
    biography: Optional[str] = None
    image: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    reception: Optional[str] = None
    department_id: Optional[str] = None
    is_active: Optional[bool] = None
    achievements: Optional[List[str]] = None
    languages: Optional[List[str]] = None

# Service Models
class ServiceCategory(str, Enum):
    DIAGNOSTICS = "Диагностика"
    SURGERY = "Хирургия"
    CONSULTATION = "Консультации"
    REHABILITATION = "Реабилитация"
    ANESTHESIA = "Анестезия"
    REANIMATION = "Реанимация"

class Service(BaseRecord):
    name: str
    category: ServiceCategory
    description: str
    price: int  # в узбекских сумах
    duration: Optional[str] = None  # например "60 минут"
    preparation: Optional[str] = None
    is_active: bool = True

class ServiceCreate(BaseModel):
    name: str
    category: ServiceCategory
    description: str
    price: int
    duration: Optional[str] = None
    preparation: Optional[str] = None

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[ServiceCategory] = None
    description: Optional[str] = None
    price: Optional[int] = None
    duration: Optional[str] = None
    preparation: Optional[str] = None
    is_active: Optional[bool] = None

# News Models
class News(BaseRecord):
    title: str
    excerpt: str
    content: str
    image: str
    author: str = "Пресс-служба центра"
    is_published: bool = True
    views: int = 0
    tags: List[str] = []

class NewsCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    image: str
    author: str = "Пресс-служба центра"
    tags: List[str] = []

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    author: Optional[str] = None
    is_published: Optional[bool] = None
    tags: Optional[List[str]] = None

# Gallery Models
class GalleryCategory(str, Enum):
    GENERAL = "general"
    BUILDING = "building"
    EQUIPMENT = "equipment"
    DOCTORS = "doctors"
    OPERATIONS = "operations"
    PATIENTS = "patients"

class GalleryImage(BaseRecord):
    url: str
    alt: str
    category: GalleryCategory = GalleryCategory.GENERAL
    description: Optional[str] = None
    is_active: bool = True

class GalleryImageCreate(BaseModel):
    url: str
    alt: str
    category: GalleryCategory = GalleryCategory.GENERAL
    description: Optional[str] = None

class GalleryImageUpdate(BaseModel):
    url: Optional[str] = None
    alt: Optional[str] = None
    category: Optional[GalleryCategory] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

# Appointment Models
class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    NO_SHOW = "no_show"

class PatientInfo(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: Optional[EmailStr] = None
    birth_date: Optional[str] = None
    address: Optional[str] = None

class Appointment(BaseRecord):
    doctor_id: str
    doctor_name: str  # для удобства
    date: str
    time: str
    patient: PatientInfo
    complaint: Optional[str] = None
    status: AppointmentStatus = AppointmentStatus.PENDING
    notes: List[Dict[str, str]] = []  # заметки врача
    diagnosis: Optional[str] = None
    treatment: Optional[str] = None

class AppointmentCreate(BaseModel):
    doctor_id: str
    doctor_name: str
    date: str
    time: str
    patient: PatientInfo
    complaint: Optional[str] = None

class AppointmentUpdate(BaseModel):
    status: Optional[AppointmentStatus] = None
    notes: Optional[List[Dict[str, str]]] = None
    diagnosis: Optional[str] = None
    treatment: Optional[str] = None

# Leadership Models
class Leadership(BaseRecord):
    name: str
    position: str
    image: str
    phone: str
    email: EmailStr
    biography: Optional[str] = None
    order: int = 0  # для сортировки
    is_active: bool = True

class LeadershipCreate(BaseModel):
    name: str
    position: str
    image: str
    phone: str
    email: EmailStr
    biography: Optional[str] = None
    order: int = 0

class LeadershipUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    image: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    biography: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None

# Settings Models
class SiteSettings(BaseRecord):
    address: str
    phones: List[str]
    emails: List[str]
    working_hours: Dict[str, str]
    social_media: Dict[str, str] = {}
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None

class SiteSettingsUpdate(BaseModel):
    address: Optional[str] = None
    phones: Optional[List[str]] = None
    emails: Optional[List[str]] = None
    working_hours: Optional[Dict[str, str]] = None
    social_media: Optional[Dict[str, str]] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None

# Response Models
class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    per_page: int
    pages: int

class MessageResponse(BaseModel):
    message: str
    success: bool = True