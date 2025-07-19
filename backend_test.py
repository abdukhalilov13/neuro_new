
import requests
import sys
from datetime import datetime
import uuid
import os
import json

class NeuroUzAPITester:
    def __init__(self, base_url=None):
        # Read the backend URL from the frontend .env file
        if base_url is None:
            try:
                with open('/app/frontend/.env', 'r') as f:
                    for line in f:
                        if line.startswith('REACT_APP_BACKEND_URL='):
                            base_url = line.strip().split('=')[1].strip('"\'') + '/api'
                            break
            except Exception as e:
                print(f"Error reading .env file: {str(e)}")
                base_url = "https://0c0559be-4033-4575-aa41-d05f1cf33531.preview.emergentagent.com/api"
        
        self.base_url = base_url
        print(f"Using API base URL: {self.base_url}")
        self.tests_run = 0
        self.tests_passed = 0
        self.created_ids = {
            "departments": None,
            "doctors": None,
            "services": None,
            "news": None,
            "events": None,
            "gallery": None,
            "leadership": None
        }

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.text:
                    try:
                        json_response = response.json()
                        print(f"Response structure: {json.dumps(json_response, indent=2)[:500]}...")
                        return success, json_response
                    except:
                        print(f"Response: {response.text[:500]}...")
                        return success, response.text
                return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"Response: {response.text[:500]}...")
                return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    # Basic API Tests
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_health_endpoint(self):
        """Test the health endpoint"""
        return self.run_test(
            "Health Endpoint",
            "GET",
            "health",
            200
        )
    
    # Departments Tests
    def test_departments_endpoint(self):
        """Test departments endpoint"""
        return self.run_test(
            "Departments Endpoint",
            "GET",
            "departments",
            200
        )
    
    def test_create_department(self):
        """Test creating a department"""
        department_data = {
            "name": {
                "ru": "Отделение нейрохирургии спинного мозга",
                "uz": "Orqa miya neyroxirurgiya bo'limi",
                "en": "Spinal Neurosurgery Department"
            },
            "description": {
                "ru": "Специализируется на лечении заболеваний и травм спинного мозга",
                "uz": "Orqa miya kasalliklari va jarohatlarini davolashga ixtisoslashgan",
                "en": "Specializes in the treatment of spinal cord diseases and injuries"
            },
            "icon": "Activity",
            "color": "from-purple-500 to-purple-600",
            "is_active": True
        }
        return self.run_test(
            "Create Department",
            "POST",
            "departments",
            200,
            data=department_data
        )
    
    def test_update_department(self):
        """Test updating a department"""
        department_data = {
            "name": {
                "ru": "Обновленное отделение нейрохирургии",
                "uz": "Yangilangan neyroxirurgiya bo'limi",
                "en": "Updated Neurosurgery Department"
            },
            "description": {
                "ru": "Обновленное описание отделения",
                "uz": "Bo'limning yangilangan tavsifi",
                "en": "Updated department description"
            },
            "icon": "Brain",
            "color": "from-blue-500 to-blue-600",
            "is_active": True
        }
        return self.run_test(
            "Update Department",
            "PUT",
            "departments/1",
            200,
            data=department_data
        )
    
    def test_delete_department(self):
        """Test deleting a department"""
        return self.run_test(
            "Delete Department",
            "DELETE",
            "departments/1",
            200
        )
    
    # Doctors Tests
    def test_doctors_endpoint(self):
        """Test doctors endpoint"""
        return self.run_test(
            "Doctors Endpoint",
            "GET",
            "doctors",
            200
        )
    
    def test_create_doctor(self):
        """Test creating a doctor"""
        doctor_data = {
            "name": {
                "ru": "Иванов Иван Иванович",
                "uz": "Ivanov Ivan Ivanovich",
                "en": "Ivan Ivanov"
            },
            "specialization": {
                "ru": "Нейрохирург, д.м.н.",
                "uz": "Neyroxirurg, t.f.d.",
                "en": "Neurosurgeon, MD, PhD"
            },
            "experience": "20+ лет",
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
            "email": "ivanov@neuro.uz",
            "phone": "+998 90 123-45-67",
            "reception": {
                "ru": "Понедельник-Пятница, 9:00-17:00",
                "uz": "Dushanba-Juma, 9:00-17:00",
                "en": "Monday-Friday, 9:00-17:00"
            },
            "department_id": "1",
            "is_active": True
        }
        return self.run_test(
            "Create Doctor",
            "POST",
            "doctors",
            200,
            data=doctor_data
        )
    
    # Services Tests
    def test_services_endpoint(self):
        """Test services endpoint"""
        return self.run_test(
            "Services Endpoint",
            "GET",
            "services",
            200
        )
    
    def test_create_service(self):
        """Test creating a service"""
        service_data = {
            "name": {
                "ru": "Комплексное обследование",
                "uz": "Kompleks tekshiruv",
                "en": "Comprehensive examination"
            },
            "category": {
                "ru": "Диагностика",
                "uz": "Tashxis",
                "en": "Diagnostics"
            },
            "description": {
                "ru": "Полное обследование нервной системы",
                "uz": "Asab tizimining to'liq tekshiruvi",
                "en": "Complete examination of the nervous system"
            },
            "price": 500000,
            "is_active": True
        }
        return self.run_test(
            "Create Service",
            "POST",
            "services",
            200,
            data=service_data
        )
    
    # News Tests
    def test_news_endpoint(self):
        """Test news endpoint"""
        return self.run_test(
            "News Endpoint",
            "GET",
            "news",
            200
        )
    
    def test_create_news(self):
        """Test creating a news item"""
        news_data = {
            "title": {
                "ru": "Новый метод лечения",
                "uz": "Yangi davolash usuli",
                "en": "New treatment method"
            },
            "excerpt": {
                "ru": "Краткое описание нового метода",
                "uz": "Yangi usulning qisqacha tavsifi",
                "en": "Brief description of the new method"
            },
            "content": {
                "ru": "Подробное описание нового метода лечения...",
                "uz": "Yangi davolash usulining batafsil tavsifi...",
                "en": "Detailed description of the new treatment method..."
            },
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
            "date": "2025-07-15",
            "is_published": True
        }
        return self.run_test(
            "Create News",
            "POST",
            "news",
            200,
            data=news_data
        )
    
    # Gallery Tests
    def test_gallery_endpoint(self):
        """Test gallery endpoint"""
        return self.run_test(
            "Gallery Endpoint",
            "GET",
            "gallery",
            200
        )
    
    def test_create_gallery_image(self):
        """Test creating a gallery image"""
        gallery_data = {
            "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
            "alt": {
                "ru": "Новое оборудование",
                "uz": "Yangi jihozlar",
                "en": "New equipment"
            },
            "category": "equipment",
            "is_active": True
        }
        return self.run_test(
            "Create Gallery Image",
            "POST",
            "gallery",
            200,
            data=gallery_data
        )
    
    # Events Tests
    def test_events_endpoint(self):
        """Test events endpoint"""
        return self.run_test(
            "Events Endpoint",
            "GET",
            "events",
            200
        )
    
    def test_create_event(self):
        """Test creating an event"""
        event_data = {
            "title": {
                "ru": "Семинар по нейрохирургии",
                "uz": "Neyroxirurgiya bo'yicha seminar",
                "en": "Neurosurgery seminar"
            },
            "description": {
                "ru": "Обсуждение новых методов лечения",
                "uz": "Yangi davolash usullarini muhokama qilish",
                "en": "Discussion of new treatment methods"
            },
            "date": "2025-08-15",
            "time": "10:00",
            "location": {
                "ru": "Конференц-зал центра",
                "uz": "Markaz konferentsiya zali",
                "en": "Center conference hall"
            },
            "type": "seminar"
        }
        return self.run_test(
            "Create Event",
            "POST",
            "events",
            200,
            data=event_data
        )
    
    # Leadership Tests
    def test_leadership_endpoint(self):
        """Test leadership endpoint"""
        return self.run_test(
            "Leadership Endpoint",
            "GET",
            "leadership",
            200
        )
    
    def test_create_leadership(self):
        """Test creating a leadership entry"""
        leadership_data = {
            "name": {
                "ru": "Сидоров Петр Алексеевич",
                "uz": "Sidorov Petr Alekseyevich",
                "en": "Petr Sidorov"
            },
            "position": {
                "ru": "Главный врач",
                "uz": "Bosh shifokor",
                "en": "Chief Physician"
            },
            "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
            "phone": "+998 71 123-45-67",
            "email": "sidorov@neuro.uz",
            "biography": {
                "ru": "Опытный специалист с 25-летним стажем работы...",
                "uz": "25 yillik ish tajribasiga ega tajribali mutaxassis...",
                "en": "Experienced specialist with 25 years of experience..."
            }
        }
        return self.run_test(
            "Create Leadership",
            "POST",
            "leadership",
            200,
            data=leadership_data
        )
    
    # Appointment Tests
    def test_get_appointments(self):
        """Test getting all appointments"""
        return self.run_test(
            "Get All Appointments",
            "GET",
            "appointments",
            200
        )
        
    def test_get_appointments_by_doctor(self):
        """Test getting appointments by doctor ID"""
        return self.run_test(
            "Get Appointments by Doctor",
            "GET",
            "appointments?doctor_id=1",
            200
        )
        
    def test_create_appointment(self):
        """Test creating a new appointment"""
        appointment_data = {
            "doctorId": "1",
            "doctorName": "Кариев Габрат Маратович",
            "date": "2025-07-15",
            "time": "11:30",
            "patient": {
                "name": "Петров Алексей Иванович",
                "phone": "+998 90 987-65-43",
                "email": "petrov@mail.uz",
                "age": 38,
                "complaint": "Периодические головные боли"
            },
            "status": "pending",
            "type": "consultation"
        }
        
        return self.run_test(
            "Create Appointment",
            "POST",
            "appointments",
            200,
            data=appointment_data
        )
        
    def test_update_appointment(self):
        """Test updating an appointment status"""
        update_data = {
            "status": "confirmed"
        }
        
        return self.run_test(
            "Update Appointment Status",
            "PUT",
            "appointments/1",
            200,
            data=update_data
        )
        
    def test_delete_appointment(self):
        """Test deleting an appointment"""
        return self.run_test(
            "Delete Appointment",
            "DELETE",
            "appointments/1",
            200
        )
        
    # Job Applications Tests
    def test_get_job_applications(self):
        """Test getting all job applications"""
        return self.run_test(
            "Get All Job Applications",
            "GET",
            "job-applications",
            200
        )
        
    def test_create_job_application(self):
        """Test creating a new job application"""
        job_application_data = {
            "vacancyId": 2,
            "vacancyTitle": "Медсестра нейрохирургического отделения",
            "applicant": {
                "name": "Смирнова Анна Владимировна",
                "phone": "+998 90 123-45-67",
                "email": "smirnova@mail.uz",
                "experience": "7 лет в нейрохирургии",
                "education": "Медицинский колледж, специальность сестринское дело",
                "coverLetter": "Имею большой опыт работы в нейрохирургии и хотела бы присоединиться к вашей команде..."
            },
            "status": "new"
        }
        
        return self.run_test(
            "Create Job Application",
            "POST",
            "job-applications",
            200,
            data=job_application_data
        )
        
    def test_update_job_application(self):
        """Test updating a job application status"""
        update_data = {
            "status": "interview"
        }
        
        return self.run_test(
            "Update Job Application Status",
            "PUT",
            "job-applications/1",
            200,
            data=update_data
        )

def test_doctors_crud_focused():
    """Focused test for doctors CRUD operations as requested in the review"""
    tester = NeuroUzAPITester()
    
    print("\n🏥 ТЕСТИРОВАНИЕ CRUD ОПЕРАЦИЙ ДЛЯ ВРАЧЕЙ НЕЙРОХИРУРГИЧЕСКОГО ЦЕНТРА")
    print("=" * 80)
    
    # Test data from the review request
    test_doctor_data = {
        "name": "Тестовый Врач",
        "specialization": "Нейрохирург",
        "email": "test.doctor@neuro.uz",
        "phone": "+998 90 999-88-77",
        "experience": "10+ лет",
        "department_id": "1"
    }
    
    created_doctor_id = None
    
    # 1. ТЕСТ ПОЛУЧЕНИЯ ВРАЧЕЙ
    print("\n1️⃣ ТЕСТ ПОЛУЧЕНИЯ ВРАЧЕЙ")
    print("-" * 40)
    success, doctors_data = tester.run_test(
        "GET /api/doctors - получение списка врачей",
        "GET",
        "doctors",
        200
    )
    
    if success and isinstance(doctors_data, list):
        print(f"✅ Получен список из {len(doctors_data)} врачей")
        if len(doctors_data) > 0:
            doctor = doctors_data[0]
            required_fields = ["name", "specialization", "email", "phone"]
            missing_fields = [field for field in required_fields if field not in doctor]
            if not missing_fields:
                print("✅ Структура данных врача корректна - все поля присутствуют")
            else:
                print(f"❌ Отсутствуют поля: {missing_fields}")
    else:
        print("❌ Ошибка получения списка врачей")
    
    # 2. ТЕСТ СОЗДАНИЯ ВРАЧА
    print("\n2️⃣ ТЕСТ СОЗДАНИЯ ВРАЧА")
    print("-" * 40)
    success, create_response = tester.run_test(
        "POST /api/doctors - создание нового врача",
        "POST",
        "doctors",
        200,
        data=test_doctor_data
    )
    
    if success and "id" in create_response:
        created_doctor_id = create_response["id"]
        print(f"✅ Врач успешно создан с ID: {created_doctor_id}")
        print(f"✅ ID генерируется правильно (UUID формат)")
        
        # Проверяем что врач сохранился в базу данных
        print("\n🔍 Проверка сохранения в базу данных...")
        success, updated_doctors = tester.run_test(
            "Проверка сохранения врача в БД",
            "GET",
            "doctors",
            200
        )
        
        if success and isinstance(updated_doctors, list):
            new_doctor = next((doc for doc in updated_doctors if doc.get("id") == created_doctor_id), None)
            if new_doctor:
                print("✅ Врач найден в базе данных после создания")
                # Проверяем корректность сохраненных данных
                if (new_doctor.get("name") == test_doctor_data["name"] and 
                    new_doctor.get("specialization") == test_doctor_data["specialization"]):
                    print("✅ Данные врача сохранены корректно")
                else:
                    print("❌ Данные врача сохранены некорректно")
            else:
                print("❌ Врач не найден в базе данных после создания")
    else:
        print("❌ Ошибка создания врача")
    
    # 3. ТЕСТ ПОЛУЧЕНИЯ КОНКРЕТНОГО ВРАЧА
    if created_doctor_id:
        print("\n3️⃣ ТЕСТ ПОЛУЧЕНИЯ КОНКРЕТНОГО ВРАЧА")
        print("-" * 40)
        # Поскольку в API нет отдельного endpoint для получения врача по ID,
        # проверяем через общий список
        success, doctors_list = tester.run_test(
            "GET /api/doctors - поиск созданного врача",
            "GET",
            "doctors",
            200
        )
        
        if success and isinstance(doctors_list, list):
            found_doctor = next((doc for doc in doctors_list if doc.get("id") == created_doctor_id), None)
            if found_doctor:
                print(f"✅ Врач с ID {created_doctor_id} найден")
                print(f"✅ Имя: {found_doctor.get('name')}")
                print(f"✅ Специализация: {found_doctor.get('specialization')}")
            else:
                print(f"❌ Врач с ID {created_doctor_id} не найден")
    
    # 4. ТЕСТ ОБНОВЛЕНИЯ ВРАЧА
    if created_doctor_id:
        print("\n4️⃣ ТЕСТ ОБНОВЛЕНИЯ ВРАЧА")
        print("-" * 40)
        update_data = {
            "name": "Обновленный Тестовый Врач",
            "specialization": "Старший нейрохирург",
            "experience": "15+ лет"
        }
        
        success, update_response = tester.run_test(
            f"PUT /api/doctors/{created_doctor_id} - обновление врача",
            "PUT",
            f"doctors/{created_doctor_id}",
            200,
            data=update_data
        )
        
        if success:
            print(f"✅ Врач с ID {created_doctor_id} успешно обновлен")
            
            # Проверяем что изменения сохранились
            print("\n🔍 Проверка сохранения изменений...")
            success, updated_doctors = tester.run_test(
                "Проверка обновленных данных",
                "GET",
                "doctors",
                200
            )
            
            if success and isinstance(updated_doctors, list):
                updated_doctor = next((doc for doc in updated_doctors if doc.get("id") == created_doctor_id), None)
                if updated_doctor:
                    if updated_doctor.get("name") == update_data["name"]:
                        print("✅ Изменения сохранились корректно")
                    else:
                        print("❌ Изменения не сохранились")
                else:
                    print("❌ Врач не найден после обновления")
        else:
            print("❌ Ошибка обновления врача")
    
    # 5. ТЕСТ УДАЛЕНИЯ ВРАЧА
    if created_doctor_id:
        print("\n5️⃣ ТЕСТ УДАЛЕНИЯ ВРАЧА")
        print("-" * 40)
        success, delete_response = tester.run_test(
            f"DELETE /api/doctors/{created_doctor_id} - удаление врача",
            "DELETE",
            f"doctors/{created_doctor_id}",
            200
        )
        
        if success:
            print(f"✅ Врач с ID {created_doctor_id} успешно удален")
            
            # Проверяем что врач действительно удален
            print("\n🔍 Проверка удаления из базы данных...")
            success, remaining_doctors = tester.run_test(
                "Проверка удаления врача",
                "GET",
                "doctors",
                200
            )
            
            if success and isinstance(remaining_doctors, list):
                deleted_doctor = next((doc for doc in remaining_doctors if doc.get("id") == created_doctor_id), None)
                if deleted_doctor:
                    print("❌ Врач все еще присутствует в базе данных после удаления")
                else:
                    print("✅ Врач успешно удален из базы данных")
            else:
                print("❌ Ошибка проверки удаления")
        else:
            print("❌ Ошибка удаления врача")
    
    # Итоговый отчет
    print("\n" + "=" * 80)
    print("📊 ИТОГОВЫЙ ОТЧЕТ ТЕСТИРОВАНИЯ CRUD ОПЕРАЦИЙ ДЛЯ ВРАЧЕЙ")
    print("=" * 80)
    print(f"Всего тестов выполнено: {tester.tests_run}")
    print(f"Тестов прошло успешно: {tester.tests_passed}")
    print(f"Процент успешности: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 ВСЕ CRUD ОПЕРАЦИИ ДЛЯ ВРАЧЕЙ РАБОТАЮТ КОРРЕКТНО!")
        print("✅ Создание врачей - работает")
        print("✅ Получение врачей - работает") 
        print("✅ Обновление врачей - работает")
        print("✅ Удаление врачей - работает")
        print("✅ Генерация ID - работает")
        print("✅ Сохранение в БД - работает")
    else:
        print("\n⚠️ ОБНАРУЖЕНЫ ПРОБЛЕМЫ В CRUD ОПЕРАЦИЯХ ДЛЯ ВРАЧЕЙ")
        print("Необходимо исправить выявленные ошибки в backend API")
    
    return tester.tests_passed == tester.tests_run

def main():
    # Setup
    tester = NeuroUzAPITester()
    
    # Run focused doctors CRUD test first
    print("🎯 ФОКУСИРОВАННОЕ ТЕСТИРОВАНИЕ ВРАЧЕЙ (по запросу пользователя)")
    doctors_success = test_doctors_crud_focused()
    
    if not doctors_success:
        print("\n❌ КРИТИЧЕСКАЯ ПРОБЛЕМА: CRUD операции для врачей не работают!")
        print("Рекомендуется исправить проблемы с врачами перед тестированием других разделов.")
        return 1
    
    # Run basic tests
    print("\n===== Testing Basic API Endpoints =====")
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    
    # Test DEPARTMENTS CRUD operations
    print("\n===== Testing Departments CRUD Operations =====")
    print("\n----- GET /api/departments -----")
    success, departments_data = tester.test_departments_endpoint()
    if success:
        print(f"✅ Found {len(departments_data)} departments")
        if departments_data and isinstance(departments_data, list):
            print("✅ Departments data structure is correct (list of departments)")
            if len(departments_data) > 0 and isinstance(departments_data[0], dict):
                required_fields = ["id", "name_ru", "description_ru"]
                missing_fields = [field for field in required_fields if field not in departments_data[0]]
                if not missing_fields:
                    print("✅ Department object structure is correct")
                else:
                    print(f"❌ Department object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/departments -----")
    department_data = {
        "name_ru": "Отделение нейрохирургии спинного мозга",
        "name_uz": "Orqa miya neyroxirurgiya bo'limi",
        "name_en": "Spinal Neurosurgery Department",
        "description_ru": "Специализируется на лечении заболеваний и травм спинного мозга",
        "description_uz": "Orqa miya kasalliklari va jarohatlarini davolashga ixtisoslashgan",
        "description_en": "Specializes in the treatment of spinal cord diseases and injuries",
        "head_doctor": "Тестовый Врач",
        "phone": "+998 71 123-45-67",
        "is_active": True
    }
    success, create_dept_data = tester.run_test(
        "Create Department",
        "POST",
        "departments",
        200,
        data=department_data
    )
    if success and "id" in create_dept_data:
        tester.created_ids["departments"] = create_dept_data["id"]
        print(f"✅ Department created with ID: {tester.created_ids['departments']}")
    
    if tester.created_ids["departments"]:
        print("\n----- PUT /api/departments/{id} -----")
        update_data = {
            "name_ru": "Обновленное отделение нейрохирургии",
            "name_uz": "Yangilangan neyroxirurgiya bo'limi",
            "name_en": "Updated Neurosurgery Department",
            "description_ru": "Обновленное описание отделения",
            "description_uz": "Bo'limning yangilangan tavsifi",
            "description_en": "Updated department description"
        }
        success, update_dept_data = tester.run_test(
            "Update Department",
            "PUT",
            f"departments/{tester.created_ids['departments']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ Department with ID {tester.created_ids['departments']} updated successfully")
        
        print("\n----- DELETE /api/departments/{id} -----")
        success, delete_dept_data = tester.run_test(
            "Delete Department",
            "DELETE",
            f"departments/{tester.created_ids['departments']}",
            200
        )
        if success:
            print(f"✅ Department with ID {tester.created_ids['departments']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify Department Deletion -----")
        success, get_deleted_dept = tester.run_test(
            "Get Deleted Department",
            "GET",
            f"departments",
            200
        )
        if success and isinstance(get_deleted_dept, list):
            deleted_dept = next((dept for dept in get_deleted_dept if dept.get("id") == tester.created_ids["departments"]), None)
            if deleted_dept:
                print(f"❌ Department with ID {tester.created_ids['departments']} still exists after deletion")
            else:
                print(f"✅ Department with ID {tester.created_ids['departments']} was properly deleted")
    
    # Test DOCTORS CRUD operations
    print("\n===== Testing Doctors CRUD Operations =====")
    print("\n----- GET /api/doctors -----")
    success, doctors_data = tester.test_doctors_endpoint()
    if success:
        print(f"✅ Found {len(doctors_data)} doctors")
        if doctors_data and isinstance(doctors_data, list):
            print("✅ Doctors data structure is correct (list of doctors)")
            if len(doctors_data) > 0 and isinstance(doctors_data[0], dict):
                required_fields = ["id", "name", "specialization", "experience", "image"]
                missing_fields = [field for field in required_fields if field not in doctors_data[0]]
                if not missing_fields:
                    print("✅ Doctor object structure is correct")
                else:
                    print(f"❌ Doctor object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/doctors -----")
    doctor_data = {
        "name": "Иванов Иван Иванович",
        "specialization": "Нейрохирург, д.м.н.",
        "experience": "20+ лет",
        "image": "https://example.com/doctor.jpg",
        "email": "ivanov@neuro.uz",
        "phone": "+998 90 123-45-67",
        "reception": "Понедельник-Пятница, 9:00-17:00",
        "department_id": "1",
        "is_active": True
    }
    success, create_doctor_data = tester.run_test(
        "Create Doctor",
        "POST",
        "doctors",
        200,
        data=doctor_data
    )
    if success and "id" in create_doctor_data:
        tester.created_ids["doctors"] = create_doctor_data["id"]
        print(f"✅ Doctor created with ID: {tester.created_ids['doctors']}")
    
    if tester.created_ids["doctors"]:
        print("\n----- PUT /api/doctors/{id} -----")
        update_data = {
            "name": "Иванов Иван Петрович",
            "specialization": "Нейрохирург, профессор",
            "experience": "25+ лет"
        }
        success, update_doctor_data = tester.run_test(
            "Update Doctor",
            "PUT",
            f"doctors/{tester.created_ids['doctors']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ Doctor with ID {tester.created_ids['doctors']} updated successfully")
        
        print("\n----- DELETE /api/doctors/{id} -----")
        success, delete_doctor_data = tester.run_test(
            "Delete Doctor",
            "DELETE",
            f"doctors/{tester.created_ids['doctors']}",
            200
        )
        if success:
            print(f"✅ Doctor with ID {tester.created_ids['doctors']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify Doctor Deletion -----")
        success, get_deleted_doctor = tester.run_test(
            "Get Deleted Doctor",
            "GET",
            f"doctors",
            200
        )
        if success and isinstance(get_deleted_doctor, list):
            deleted_doctor = next((doc for doc in get_deleted_doctor if doc.get("id") == tester.created_ids["doctors"]), None)
            if deleted_doctor:
                print(f"❌ Doctor with ID {tester.created_ids['doctors']} still exists after deletion")
            else:
                print(f"✅ Doctor with ID {tester.created_ids['doctors']} was properly deleted")
    
    # Test SERVICES CRUD operations
    print("\n===== Testing Services CRUD Operations =====")
    print("\n----- GET /api/services -----")
    success, services_data = tester.test_services_endpoint()
    if success:
        print(f"✅ Found {len(services_data)} services")
        if services_data and isinstance(services_data, list):
            print("✅ Services data structure is correct (list of services)")
            if len(services_data) > 0 and isinstance(services_data[0], dict):
                required_fields = ["id", "name", "category", "price"]
                missing_fields = [field for field in required_fields if field not in services_data[0]]
                if not missing_fields:
                    print("✅ Service object structure is correct")
                else:
                    print(f"❌ Service object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/services -----")
    service_data = {
        "name": "Комплексное обследование",
        "category": "Диагностика",
        "description": "Полное обследование нервной системы",
        "price": 500000,
        "is_active": True
    }
    success, create_service_data = tester.run_test(
        "Create Service",
        "POST",
        "services",
        200,
        data=service_data
    )
    if success and "id" in create_service_data:
        tester.created_ids["services"] = create_service_data["id"]
        print(f"✅ Service created with ID: {tester.created_ids['services']}")
    
    if tester.created_ids["services"]:
        print("\n----- PUT /api/services/{id} -----")
        update_data = {
            "name": "Обновленное комплексное обследование",
            "price": 550000
        }
        success, update_service_data = tester.run_test(
            "Update Service",
            "PUT",
            f"services/{tester.created_ids['services']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ Service with ID {tester.created_ids['services']} updated successfully")
        
        print("\n----- DELETE /api/services/{id} -----")
        success, delete_service_data = tester.run_test(
            "Delete Service",
            "DELETE",
            f"services/{tester.created_ids['services']}",
            200
        )
        if success:
            print(f"✅ Service with ID {tester.created_ids['services']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify Service Deletion -----")
        success, get_deleted_service = tester.run_test(
            "Get Deleted Service",
            "GET",
            f"services",
            200
        )
        if success and isinstance(get_deleted_service, list):
            deleted_service = next((svc for svc in get_deleted_service if svc.get("id") == tester.created_ids["services"]), None)
            if deleted_service:
                print(f"❌ Service with ID {tester.created_ids['services']} still exists after deletion")
            else:
                print(f"✅ Service with ID {tester.created_ids['services']} was properly deleted")
    
    # Test NEWS CRUD operations
    print("\n===== Testing News CRUD Operations =====")
    print("\n----- GET /api/news -----")
    success, news_data = tester.run_test(
        "Get News",
        "GET",
        "news",
        200
    )
    if success:
        print(f"✅ Found {len(news_data)} news items")
        if news_data and isinstance(news_data, list):
            print("✅ News data structure is correct (list of news items)")
            if len(news_data) > 0 and isinstance(news_data[0], dict):
                required_fields = ["id", "title", "excerpt", "content", "image", "date"]
                missing_fields = [field for field in required_fields if field not in news_data[0]]
                if not missing_fields:
                    print("✅ News object structure is correct")
                else:
                    print(f"❌ News object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/news -----")
    news_item_data = {
        "title": "Новый метод лечения",
        "excerpt": "Краткое описание нового метода",
        "content": "Подробное описание нового метода лечения...",
        "image": "https://example.com/news.jpg",
        "date": "2025-07-15",
        "is_published": True
    }
    success, create_news_data = tester.run_test(
        "Create News",
        "POST",
        "news",
        200,
        data=news_item_data
    )
    if success and "id" in create_news_data:
        tester.created_ids["news"] = create_news_data["id"]
        print(f"✅ News item created with ID: {tester.created_ids['news']}")
    
    if tester.created_ids["news"]:
        print("\n----- PUT /api/news/{id} -----")
        update_data = {
            "title": "Обновленный метод лечения",
            "excerpt": "Обновленное краткое описание"
        }
        success, update_news_data = tester.run_test(
            "Update News",
            "PUT",
            f"news/{tester.created_ids['news']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ News item with ID {tester.created_ids['news']} updated successfully")
        
        print("\n----- DELETE /api/news/{id} -----")
        success, delete_news_data = tester.run_test(
            "Delete News",
            "DELETE",
            f"news/{tester.created_ids['news']}",
            200
        )
        if success:
            print(f"✅ News item with ID {tester.created_ids['news']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify News Deletion -----")
        success, get_deleted_news = tester.run_test(
            "Get Deleted News",
            "GET",
            f"news",
            200
        )
        if success and isinstance(get_deleted_news, list):
            deleted_news = next((item for item in get_deleted_news if item.get("id") == tester.created_ids["news"]), None)
            if deleted_news:
                print(f"❌ News item with ID {tester.created_ids['news']} still exists after deletion")
            else:
                print(f"✅ News item with ID {tester.created_ids['news']} was properly deleted")
    
    # Test EVENTS CRUD operations
    print("\n===== Testing Events CRUD Operations =====")
    print("\n----- GET /api/events -----")
    success, events_data = tester.run_test(
        "Get Events",
        "GET",
        "events",
        200
    )
    if success:
        print(f"✅ Found {len(events_data)} events")
        if events_data and isinstance(events_data, list):
            print("✅ Events data structure is correct (list of events)")
            if len(events_data) > 0 and isinstance(events_data[0], dict):
                required_fields = ["id", "title", "description", "date", "time", "location"]
                missing_fields = [field for field in required_fields if field not in events_data[0]]
                if not missing_fields:
                    print("✅ Event object structure is correct")
                else:
                    print(f"❌ Event object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/events -----")
    event_data = {
        "title": "Семинар по нейрохирургии",
        "description": "Обсуждение новых методов лечения",
        "date": "2025-08-15",
        "time": "10:00",
        "location": "Конференц-зал центра",
        "type": "seminar"
    }
    success, create_event_data = tester.run_test(
        "Create Event",
        "POST",
        "events",
        200,
        data=event_data
    )
    if success and "id" in create_event_data:
        tester.created_ids["events"] = create_event_data["id"]
        print(f"✅ Event created with ID: {tester.created_ids['events']}")
    
    if tester.created_ids["events"]:
        print("\n----- PUT /api/events/{id} -----")
        update_data = {
            "title": "Обновленный семинар по нейрохирургии",
            "time": "11:00"
        }
        success, update_event_data = tester.run_test(
            "Update Event",
            "PUT",
            f"events/{tester.created_ids['events']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ Event with ID {tester.created_ids['events']} updated successfully")
        
        print("\n----- DELETE /api/events/{id} -----")
        success, delete_event_data = tester.run_test(
            "Delete Event",
            "DELETE",
            f"events/{tester.created_ids['events']}",
            200
        )
        if success:
            print(f"✅ Event with ID {tester.created_ids['events']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify Event Deletion -----")
        success, get_deleted_event = tester.run_test(
            "Get Deleted Event",
            "GET",
            f"events",
            200
        )
        if success and isinstance(get_deleted_event, list):
            deleted_event = next((evt for evt in get_deleted_event if evt.get("id") == tester.created_ids["events"]), None)
            if deleted_event:
                print(f"❌ Event with ID {tester.created_ids['events']} still exists after deletion")
            else:
                print(f"✅ Event with ID {tester.created_ids['events']} was properly deleted")
    
    # Test GALLERY CRUD operations
    print("\n===== Testing Gallery CRUD Operations =====")
    print("\n----- GET /api/gallery -----")
    success, gallery_data = tester.run_test(
        "Get Gallery",
        "GET",
        "gallery",
        200
    )
    if success:
        print(f"✅ Found {len(gallery_data)} gallery images")
        if gallery_data and isinstance(gallery_data, list):
            print("✅ Gallery data structure is correct (list of images)")
            if len(gallery_data) > 0 and isinstance(gallery_data[0], dict):
                required_fields = ["id", "url", "alt", "category"]
                missing_fields = [field for field in required_fields if field not in gallery_data[0]]
                if not missing_fields:
                    print("✅ Gallery image object structure is correct")
                else:
                    print(f"❌ Gallery image object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/gallery -----")
    gallery_data = {
        "url": "https://example.com/gallery.jpg",
        "alt": "Новое оборудование",
        "category": "equipment",
        "is_active": True
    }
    success, create_gallery_data = tester.run_test(
        "Create Gallery Image",
        "POST",
        "gallery",
        200,
        data=gallery_data
    )
    if success and "id" in create_gallery_data:
        tester.created_ids["gallery"] = create_gallery_data["id"]
        print(f"✅ Gallery image created with ID: {tester.created_ids['gallery']}")
    
    if tester.created_ids["gallery"]:
        print("\n----- PUT /api/gallery/{id} -----")
        update_data = {
            "alt": "Обновленное описание оборудования",
            "category": "building"
        }
        success, update_gallery_data = tester.run_test(
            "Update Gallery Image",
            "PUT",
            f"gallery/{tester.created_ids['gallery']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ Gallery image with ID {tester.created_ids['gallery']} updated successfully")
        
        print("\n----- DELETE /api/gallery/{id} -----")
        success, delete_gallery_data = tester.run_test(
            "Delete Gallery Image",
            "DELETE",
            f"gallery/{tester.created_ids['gallery']}",
            200
        )
        if success:
            print(f"✅ Gallery image with ID {tester.created_ids['gallery']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify Gallery Image Deletion -----")
        success, get_deleted_gallery = tester.run_test(
            "Get Deleted Gallery Image",
            "GET",
            f"gallery",
            200
        )
        if success and isinstance(get_deleted_gallery, list):
            deleted_gallery = next((img for img in get_deleted_gallery if img.get("id") == tester.created_ids["gallery"]), None)
            if deleted_gallery:
                print(f"❌ Gallery image with ID {tester.created_ids['gallery']} still exists after deletion")
            else:
                print(f"✅ Gallery image with ID {tester.created_ids['gallery']} was properly deleted")
    
    # Test LEADERSHIP CRUD operations
    print("\n===== Testing Leadership CRUD Operations =====")
    print("\n----- GET /api/leadership -----")
    success, leadership_data = tester.run_test(
        "Get Leadership",
        "GET",
        "leadership",
        200
    )
    if success:
        print(f"✅ Found {len(leadership_data)} leadership entries")
        if leadership_data and isinstance(leadership_data, list):
            print("✅ Leadership data structure is correct (list of leadership entries)")
            if len(leadership_data) > 0 and isinstance(leadership_data[0], dict):
                required_fields = ["id", "name_ru", "position_ru", "image"]
                missing_fields = [field for field in required_fields if field not in leadership_data[0]]
                if not missing_fields:
                    print("✅ Leadership object structure is correct")
                else:
                    print(f"❌ Leadership object is missing required fields: {missing_fields}")
    
    print("\n----- POST /api/leadership -----")
    leadership_data = {
        "name_ru": "Сидоров Петр Алексеевич",
        "name_uz": "Sidorov Petr Alekseyevich",
        "name_en": "Petr Sidorov",
        "position_ru": "Главный врач",
        "position_uz": "Bosh shifokor",
        "position_en": "Chief Physician",
        "image": "https://example.com/leader.jpg",
        "phone": "+998 71 123-45-67",
        "email": "sidorov@neuro.uz",
        "biography_ru": "Опытный специалист с 25-летним стажем работы...",
        "biography_uz": "25 yillik ish tajribasiga ega tajribali mutaxassis...",
        "biography_en": "Experienced specialist with 25 years of experience..."
    }
    success, create_leadership_data = tester.run_test(
        "Create Leadership",
        "POST",
        "leadership",
        200,
        data=leadership_data
    )
    if success and "id" in create_leadership_data:
        tester.created_ids["leadership"] = create_leadership_data["id"]
        print(f"✅ Leadership entry created with ID: {tester.created_ids['leadership']}")
    
    if tester.created_ids["leadership"]:
        print("\n----- PUT /api/leadership/{id} -----")
        update_data = {
            "position_ru": "Заместитель главного врача",
            "position_uz": "Bosh shifokor o'rinbosari",
            "position_en": "Deputy Chief Physician"
        }
        success, update_leadership_data = tester.run_test(
            "Update Leadership",
            "PUT",
            f"leadership/{tester.created_ids['leadership']}",
            200,
            data=update_data
        )
        if success:
            print(f"✅ Leadership entry with ID {tester.created_ids['leadership']} updated successfully")
        
        print("\n----- DELETE /api/leadership/{id} -----")
        success, delete_leadership_data = tester.run_test(
            "Delete Leadership",
            "DELETE",
            f"leadership/{tester.created_ids['leadership']}",
            200
        )
        if success:
            print(f"✅ Leadership entry with ID {tester.created_ids['leadership']} deleted successfully")
            
        # Verify deletion
        print("\n----- Verify Leadership Deletion -----")
        success, get_deleted_leadership = tester.run_test(
            "Get Deleted Leadership",
            "GET",
            f"leadership",
            200
        )
        if success and isinstance(get_deleted_leadership, list):
            deleted_leadership = next((leader for leader in get_deleted_leadership if leader.get("id") == tester.created_ids["leadership"]), None)
            if deleted_leadership:
                print(f"❌ Leadership entry with ID {tester.created_ids['leadership']} still exists after deletion")
            else:
                print(f"✅ Leadership entry with ID {tester.created_ids['leadership']} was properly deleted")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"\n===== API Testing Summary =====")
    print(f"✅ Root API endpoint: {'Working' if tester.tests_passed > 0 else 'Not working'}")
    print(f"✅ Health check endpoint: {'Working' if tester.tests_passed > 1 else 'Not working'}")
    
    print(f"\n===== CRUD Operations Summary =====")
    print(f"✅ Departments CRUD: {'All operations working' if tester.tests_passed > 10 else 'Some operations failed'}")
    print(f"✅ Doctors CRUD: {'All operations working' if tester.tests_passed > 20 else 'Some operations failed'}")
    print(f"✅ Services CRUD: {'All operations working' if tester.tests_passed > 30 else 'Some operations failed'}")
    print(f"✅ News CRUD: {'All operations working' if tester.tests_passed > 40 else 'Some operations failed'}")
    print(f"✅ Events CRUD: {'All operations working' if tester.tests_passed > 50 else 'Some operations failed'}")
    print(f"✅ Gallery CRUD: {'All operations working' if tester.tests_passed > 60 else 'Some operations failed'}")
    print(f"✅ Leadership CRUD: {'All operations working' if tester.tests_passed > 70 else 'Some operations failed'}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
