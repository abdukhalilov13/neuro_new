
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
                base_url = "https://e4935fc8-1c5d-4af5-b8e1-d221750b0ddc.preview.emergentagent.com/api"
        
        self.base_url = base_url
        print(f"Using API base URL: {self.base_url}")
        self.tests_run = 0
        self.tests_passed = 0

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

def main():
    # Setup
    tester = NeuroUzAPITester()
    
    # Run tests for the required endpoints
    print("\n===== Testing Basic API Endpoints =====")
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    
    print("\n===== Testing Departments API =====")
    success, departments_data = tester.test_departments_endpoint()
    if success:
        print(f"✅ Found {len(departments_data)} departments")
        if departments_data and isinstance(departments_data, list):
            print("✅ Departments data structure is correct (list of departments)")
            if len(departments_data) > 0 and isinstance(departments_data[0], dict):
                required_fields = ["id", "name", "description"]
                missing_fields = [field for field in required_fields if field not in departments_data[0]]
                if not missing_fields:
                    print("✅ Department object structure is correct")
                else:
                    print(f"❌ Department object is missing required fields: {missing_fields}")
    
    # Test CRUD operations for departments
    print("\n===== Testing Department CRUD Operations =====")
    success, create_dept_data = tester.test_create_department()
    if success:
        print("✅ Department creation successful")
        if create_dept_data and isinstance(create_dept_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_dept_data]
            if not missing_fields:
                print("✅ Department creation response structure is correct")
            else:
                print(f"❌ Department creation response is missing required fields: {missing_fields}")
    
    success, update_dept_data = tester.test_update_department()
    if success:
        print("✅ Department update successful")
        if update_dept_data and isinstance(update_dept_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in update_dept_data]
            if not missing_fields:
                print("✅ Department update response structure is correct")
            else:
                print(f"❌ Department update response is missing required fields: {missing_fields}")
    
    success, delete_dept_data = tester.test_delete_department()
    if success:
        print("✅ Department deletion successful")
        if delete_dept_data and isinstance(delete_dept_data, dict):
            required_fields = ["message"]
            missing_fields = [field for field in required_fields if field not in delete_dept_data]
            if not missing_fields:
                print("✅ Department deletion response structure is correct")
            else:
                print(f"❌ Department deletion response is missing required fields: {missing_fields}")
    
    print("\n===== Testing Doctors API =====")
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
    
    # Test doctor creation
    print("\n===== Testing Doctor Creation =====")
    success, create_doctor_data = tester.test_create_doctor()
    if success:
        print("✅ Doctor creation successful")
        if create_doctor_data and isinstance(create_doctor_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_doctor_data]
            if not missing_fields:
                print("✅ Doctor creation response structure is correct")
            else:
                print(f"❌ Doctor creation response is missing required fields: {missing_fields}")
    
    print("\n===== Testing Services API =====")
    success, services_data = tester.test_services_endpoint()
    if success:
        print(f"✅ Found {len(services_data)} services")
        if services_data and isinstance(services_data, list):
            print("✅ Services data structure is correct (list of services)")
            if len(services_data) > 0 and isinstance(services_data[0], dict):
                required_fields = ["id", "name", "category", "description", "price"]
                missing_fields = [field for field in required_fields if field not in services_data[0]]
                if not missing_fields:
                    print("✅ Service object structure is correct")
                else:
                    print(f"❌ Service object is missing required fields: {missing_fields}")
    
    # Test service creation
    print("\n===== Testing Service Creation =====")
    success, create_service_data = tester.test_create_service()
    if success:
        print("✅ Service creation successful")
        if create_service_data and isinstance(create_service_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_service_data]
            if not missing_fields:
                print("✅ Service creation response structure is correct")
            else:
                print(f"❌ Service creation response is missing required fields: {missing_fields}")
    
    print("\n===== Testing News API =====")
    success, news_data = tester.test_news_endpoint()
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
    
    # Test news creation
    print("\n===== Testing News Creation =====")
    success, create_news_data = tester.test_create_news()
    if success:
        print("✅ News creation successful")
        if create_news_data and isinstance(create_news_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_news_data]
            if not missing_fields:
                print("✅ News creation response structure is correct")
            else:
                print(f"❌ News creation response is missing required fields: {missing_fields}")
    
    print("\n===== Testing Gallery API =====")
    success, gallery_data = tester.test_gallery_endpoint()
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
    
    # Test gallery image creation
    print("\n===== Testing Gallery Image Creation =====")
    success, create_gallery_data = tester.test_create_gallery_image()
    if success:
        print("✅ Gallery image creation successful")
        if create_gallery_data and isinstance(create_gallery_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_gallery_data]
            if not missing_fields:
                print("✅ Gallery image creation response structure is correct")
            else:
                print(f"❌ Gallery image creation response is missing required fields: {missing_fields}")
    
    # Test events endpoint
    print("\n===== Testing Events API =====")
    success, events_data = tester.test_events_endpoint()
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
    
    # Test event creation
    print("\n===== Testing Event Creation =====")
    success, create_event_data = tester.test_create_event()
    if success:
        print("✅ Event creation successful")
        if create_event_data and isinstance(create_event_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_event_data]
            if not missing_fields:
                print("✅ Event creation response structure is correct")
            else:
                print(f"❌ Event creation response is missing required fields: {missing_fields}")
    
    # Test leadership endpoint
    print("\n===== Testing Leadership API =====")
    success, leadership_data = tester.test_leadership_endpoint()
    if success:
        print(f"✅ Found {len(leadership_data)} leadership entries")
        if leadership_data and isinstance(leadership_data, list):
            print("✅ Leadership data structure is correct (list of leadership entries)")
            if len(leadership_data) > 0 and isinstance(leadership_data[0], dict):
                required_fields = ["id", "name", "position", "image", "biography"]
                missing_fields = [field for field in required_fields if field not in leadership_data[0]]
                if not missing_fields:
                    print("✅ Leadership object structure is correct")
                else:
                    print(f"❌ Leadership object is missing required fields: {missing_fields}")
    
    # Test leadership creation
    print("\n===== Testing Leadership Creation =====")
    success, create_leadership_data = tester.test_create_leadership()
    if success:
        print("✅ Leadership creation successful")
        if create_leadership_data and isinstance(create_leadership_data, dict):
            required_fields = ["id", "message"]
            missing_fields = [field for field in required_fields if field not in create_leadership_data]
            if not missing_fields:
                print("✅ Leadership creation response structure is correct")
            else:
                print(f"❌ Leadership creation response is missing required fields: {missing_fields}")
    
    print("\n===== Testing Appointment Submission =====")
    success, appointment_data = tester.test_appointment_submission()
    if success:
        print("✅ Appointment submission successful")
        if appointment_data and isinstance(appointment_data, dict):
            required_fields = ["id", "message", "status"]
            missing_fields = [field for field in required_fields if field not in appointment_data]
            if not missing_fields:
                print("✅ Appointment response structure is correct")
            else:
                print(f"❌ Appointment response is missing required fields: {missing_fields}")
    
    # Job Applications Tests
    def test_get_job_applications(self):
        """Test getting all job applications"""
        return self.run_test(
            "Get Job Applications",
            "GET",
            "job-applications",
            200
        )
        
    def test_create_job_application(self):
        """Test creating a new job application"""
        application_data = {
            "vacancyId": 2,
            "vacancyTitle": "Медсестра нейрохирургического отделения",
            "applicant": {
                "name": "Смирнова Анна Владимировна",
                "phone": "+998 90 555-44-33",
                "email": "smirnova@mail.uz",
                "experience": "7 лет в нейрохирургии",
                "education": "Ташкентский медицинский колледж",
                "coverLetter": "Имею большой опыт работы в нейрохирургическом отделении..."
            },
            "status": "new"
        }
        
        return self.run_test(
            "Create Job Application",
            "POST",
            "job-applications",
            200,
            data=application_data
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
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
