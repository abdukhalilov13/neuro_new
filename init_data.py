#!/usr/bin/env python3
"""
Скрипт для инициализации всех данных в MongoDB для NEURO.UZ
"""

import requests
import json

BASE_URL = "http://localhost:8001/api"

def create_item(endpoint, data):
    """Создать элемент через API"""
    try:
        response = requests.post(f"{BASE_URL}/{endpoint}", 
                               headers={"Content-Type": "application/json"},
                               json=data)
        if response.status_code == 200:
            print(f"✅ Created {endpoint}: {data.get('name', data.get('title', data.get('name_ru', 'Item')))}")
            return response.json()
        else:
            print(f"❌ Failed to create {endpoint}: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error creating {endpoint}: {e}")
        return None

def init_departments():
    """Инициализация отделений"""
    print("\n=== Инициализация отделений ===")
    
    departments = [
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
    
    for dept in departments:
        create_item("departments", dept)

def init_doctors():
    """Инициализация врачей"""
    print("\n=== Инициализация врачей ===")
    
    doctors = [
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
    
    for doctor in doctors:
        create_item("doctors", doctor)

def init_services():
    """Инициализация услуг"""
    print("\n=== Инициализация услуг ===")
    
    services = [
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
    
    for service in services:
        create_item("services", service)

def init_news():
    """Инициализация новостей"""
    print("\n=== Инициализация новостей ===")
    
    news_items = [
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
    
    for news_item in news_items:
        create_item("news", news_item)

def init_events():
    """Инициализация событий"""
    print("\n=== Инициализация событий ===")
    
    events = [
        {
            "id": "1",
            "title": "Международная конференция по нейрохирургии",
            "description": "Ведущие специалисты обсудят новые методы лечения",
            "date": "2025-07-15",
            "time": "09:00",
            "location": "Главный конференц-зал",
            "type": "conference",
            "is_active": True
        },
        {
            "id": "2",
            "title": "День открытых дверей",
            "description": "Экскурсии по центру и консультации",
            "date": "2025-07-20",
            "time": "10:00",
            "location": "Главный холл",
            "type": "openDay",
            "is_active": True
        }
    ]
    
    for event in events:
        create_item("events", event)

def init_gallery():
    """Инициализация галереи"""
    print("\n=== Инициализация галереи ===")
    
    gallery_items = [
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
        },
        {
            "id": "3",
            "url": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
            "alt": "Конференц-зал",
            "category": "building",
            "is_active": True
        }
    ]
    
    for gallery_item in gallery_items:
        create_item("gallery", gallery_item)

def init_leadership():
    """Инициализация руководства"""
    print("\n=== Инициализация руководства ===")
    
    leadership_items = [
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
            "biography_en": "Honored Doctor of the Republic of Uzbekistan, Doctor of Medical Sciences. Over 30 years of experience in neurosurgery.",
            "is_active": True
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
            "biography_en": "Candidate of Medical Sciences, Senior Research Fellow. Specialist in vascular neurosurgery.",
            "is_active": True
        },
        {
            "id": "3",
            "name_ru": "Кодашев Равшан Муслимович",
            "name_uz": "Qodashev Ravshan Muslimovich",
            "name_en": "Kodashev Ravshan Muslimovich",
            "position_ru": "Заведующий отделением детской нейрохирургии",
            "position_uz": "Bolalar neyroxirurgiyasi bo'limi mudiri",
            "position_en": "Head of Pediatric Neurosurgery Department",
            "image": "https://images.unsplash.com/photo-1536064479547-7ee40b74b807",
            "phone": "+998 71 264-96-09",
            "email": "kodashev@neuro.uz",
            "biography_ru": "Доктор медицинских наук, профессор. 20 лет опыта в детской нейрохирургии.",
            "biography_uz": "Tibbiyot fanlari doktori, professor. Bolalar neyroxirurgiyasida 20 yillik tajriba.",
            "biography_en": "Doctor of Medical Sciences, Professor. 20 years of experience in pediatric neurosurgery.",
            "is_active": True
        }
    ]
    
    for leadership_item in leadership_items:
        create_item("leadership", leadership_item)

def init_appointments():
    """Инициализация записей пациентов"""
    print("\n=== Инициализация записей пациентов ===")
    
    appointments = [
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
        },
        {
            "id": "3",
            "doctorId": "1",
            "doctorName": "Кариев Габрат Маратович",
            "date": "2025-06-24",
            "time": "14:00",
            "patient": {
                "name": "Сидоров Петр Иванович",
                "phone": "+998 93 345-67-89",
                "email": "sidorov@mail.uz",
                "age": 52,
                "complaint": "Онемение конечностей"
            },
            "status": "pending",
            "type": "consultation",
            "createdAt": "2025-06-12T15:20:00"
        },
        {
            "id": "4",
            "doctorId": "3",
            "doctorName": "Юлдашева Малика Азизовна",
            "date": "2025-06-24",
            "time": "09:30",
            "patient": {
                "name": "Ахмедов Умид",
                "phone": "+998 94 456-78-90",
                "email": "ahmedov@mail.uz",
                "age": 8,
                "complaint": "Головные боли у ребенка"
            },
            "status": "confirmed",
            "type": "pediatric_consultation",
            "createdAt": "2025-06-12T16:45:00"
        }
    ]
    
    for appointment in appointments:
        create_item("appointments", appointment)

def main():
    """Основная функция"""
    print("🚀 Начинаем инициализацию всех данных для NEURO.UZ...")
    
    init_departments()
    init_doctors()
    init_services()
    init_news()
    init_events()
    init_gallery()
    init_leadership()
    init_appointments()
    
    print("\n🎉 Инициализация завершена! Все данные добавлены в MongoDB.")
    print("\n📋 Добавлено:")
    print("- 3 отделения")
    print("- 5 врачей")
    print("- 5 услуг")
    print("- 3 новости")
    print("- 2 события")
    print("- 3 изображения галереи")
    print("- 3 руководителя")
    print("- 4 записи пациентов")

if __name__ == "__main__":
    main()