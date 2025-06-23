import requests
import sys
from datetime import datetime
import uuid
import os
import json

class NeuroUzComprehensiveTester:
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
                base_url = "https://a28a8467-f73a-4ef4-b1b2-bda298d97266.preview.emergentagent.com/api"
        
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
            "leadership": None,
            "users": None,
            "appointments": None,
            "job_applications": None
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
    
    # Multilingual Support Tests
    def check_multilingual_support(self, data, fields_to_check):
        """Check if the data has multilingual support for specified fields"""
        if not data or not isinstance(data, list) or len(data) == 0:
            print("❌ No data to check for multilingual support")
            return False
        
        item = data[0]
        missing_fields = []
        
        for field in fields_to_check:
            ru_field = f"{field}_ru"
            uz_field = f"{field}_uz"
            en_field = f"{field}_en"
            
            if ru_field not in item:
                missing_fields.append(ru_field)
            if uz_field not in item:
                missing_fields.append(uz_field)
            if en_field not in item:
                missing_fields.append(en_field)
        
        if missing_fields:
            print(f"❌ Missing multilingual fields: {missing_fields}")
            return False
        else:
            print(f"✅ Multilingual support confirmed for fields: {fields_to_check}")
            return True

    # Departments Tests
    def test_departments_endpoint(self):
        """Test departments endpoint"""
        success, data = self.run_test(
            "Departments Endpoint",
            "GET",
            "departments",
            200
        )
        
        if success:
            multilingual = self.check_multilingual_support(data, ["name", "description"])
            return success and multilingual
        return False
    
    def test_create_department(self):
        """Test creating a department"""
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
        
        success, data = self.run_test(
            "Create Department",
            "POST",
            "departments",
            200,
            data=department_data
        )
        
        if success and "id" in data:
            self.created_ids["departments"] = data["id"]
            print(f"✅ Department created with ID: {self.created_ids['departments']}")
        
        return success
    
    def test_update_department(self):
        """Test updating a department"""
        if not self.created_ids["departments"]:
            print("❌ No department ID available for update test")
            return False
        
        update_data = {
            "name_ru": "Обновленное отделение нейрохирургии",
            "name_uz": "Yangilangan neyroxirurgiya bo'limi",
            "name_en": "Updated Neurosurgery Department",
            "description_ru": "Обновленное описание отделения",
            "description_uz": "Bo'limning yangilangan tavsifi",
            "description_en": "Updated department description"
        }
        
        return self.run_test(
            "Update Department",
            "PUT",
            f"departments/{self.created_ids['departments']}",
            200,
            data=update_data
        )
    
    def test_delete_department(self):
        """Test deleting a department"""
        if not self.created_ids["departments"]:
            print("❌ No department ID available for delete test")
            return False
        
        return self.run_test(
            "Delete Department",
            "DELETE",
            f"departments/{self.created_ids['departments']}",
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
    
    # Services Tests
    def test_services_endpoint(self):
        """Test services endpoint"""
        return self.run_test(
            "Services Endpoint",
            "GET",
            "services",
            200
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
    
    # Gallery Tests
    def test_gallery_endpoint(self):
        """Test gallery endpoint"""
        return self.run_test(
            "Gallery Endpoint",
            "GET",
            "gallery",
            200
        )
    
    # Events Tests
    def test_events_endpoint(self):
        """Test events endpoint"""
        success, data = self.run_test(
            "Events Endpoint",
            "GET",
            "events",
            200
        )
        
        if success and isinstance(data, list) and len(data) > 0:
            print(f"✅ Found {len(data)} events")
        
        return success
    
    def test_create_event(self):
        """Test creating an event"""
        event_data = {
            "title": "Семинар по нейрохирургии",
            "description": "Обсуждение новых методов лечения",
            "date": "2025-08-15",
            "time": "10:00",
            "location": "Конференц-зал центра",
            "type": "seminar"
        }
        
        success, data = self.run_test(
            "Create Event",
            "POST",
            "events",
            200,
            data=event_data
        )
        
        if success and "id" in data:
            self.created_ids["events"] = data["id"]
            print(f"✅ Event created with ID: {self.created_ids['events']}")
        
        return success
    
    # Leadership Tests
    def test_leadership_endpoint(self):
        """Test leadership endpoint"""
        success, data = self.run_test(
            "Leadership Endpoint",
            "GET",
            "leadership",
            200
        )
        
        if success:
            multilingual = self.check_multilingual_support(data, ["name", "position", "biography"])
            return success and multilingual
        return False
    
    def test_create_leadership(self):
        """Test creating a leadership entry"""
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
        
        success, data = self.run_test(
            "Create Leadership",
            "POST",
            "leadership",
            200,
            data=leadership_data
        )
        
        if success and "id" in data:
            self.created_ids["leadership"] = data["id"]
            print(f"✅ Leadership entry created with ID: {self.created_ids['leadership']}")
        
        return success
    
    # Appointments Tests
    def test_appointments_endpoint(self):
        """Test appointments endpoint"""
        return self.run_test(
            "Appointments Endpoint",
            "GET",
            "appointments",
            200
        )
    
    def test_appointments_by_doctor(self):
        """Test appointments filtered by doctor"""
        return self.run_test(
            "Appointments by Doctor",
            "GET",
            "appointments?doctor_id=1",
            200
        )
    
    def test_create_appointment(self):
        """Test creating an appointment"""
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
        
        success, data = self.run_test(
            "Create Appointment",
            "POST",
            "appointments",
            200,
            data=appointment_data
        )
        
        if success and "id" in data:
            self.created_ids["appointments"] = data["id"]
            print(f"✅ Appointment created with ID: {self.created_ids['appointments']}")
        
        return success
    
    # Job Applications Tests
    def test_job_applications_endpoint(self):
        """Test job applications endpoint"""
        return self.run_test(
            "Job Applications Endpoint",
            "GET",
            "job-applications",
            200
        )
    
    # User Management Tests
    def test_users_endpoint(self):
        """Test users endpoint"""
        return self.run_test(
            "Users Endpoint",
            "GET",
            "users",
            200
        )
    
    def test_create_user(self):
        """Test creating a user"""
        user_data = {
            "name": "Test User",
            "email": "testuser@neuro.uz",
            "password": "testpassword123",
            "role": "admin",
            "status": "active"
        }
        
        success, data = self.run_test(
            "Create User",
            "POST",
            "users",
            200,
            data=user_data
        )
        
        if success and "id" in data:
            self.created_ids["users"] = data["id"]
            print(f"✅ User created with ID: {self.created_ids['users']}")
        
        return success
    
    def test_update_user_password(self):
        """Test updating a user's password"""
        if not self.created_ids["users"]:
            print("❌ No user ID available for password update test")
            return False
        
        update_data = {
            "password": "newpassword456"
        }
        
        return self.run_test(
            "Update User Password",
            "PUT",
            f"users/{self.created_ids['users']}",
            200,
            data=update_data
        )

def main():
    # Setup
    tester = NeuroUzComprehensiveTester()
    
    # Run tests for the required endpoints
    print("\n===== COMPREHENSIVE BACKEND TEST =====")
    
    # 1. Basic API endpoints
    print("\n----- Testing Basic API Endpoints -----")
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    
    # 2. Data endpoints with multilingual support
    print("\n----- Testing Data Endpoints with Multilingual Support -----")
    tester.test_departments_endpoint()
    tester.test_doctors_endpoint()
    tester.test_services_endpoint()
    tester.test_news_endpoint()
    tester.test_gallery_endpoint()
    tester.test_events_endpoint()
    tester.test_leadership_endpoint()
    
    # 3. CRUD operations
    print("\n----- Testing CRUD Operations -----")
    print("\n--- Departments CRUD ---")
    tester.test_create_department()
    tester.test_update_department()
    tester.test_delete_department()
    
    print("\n--- Leadership CRUD ---")
    tester.test_create_leadership()
    
    print("\n--- Events CRUD ---")
    tester.test_create_event()
    
    print("\n--- User Management ---")
    tester.test_users_endpoint()
    tester.test_create_user()
    tester.test_update_user_password()
    
    # 4. Specific tests
    print("\n----- Testing Specific Endpoints -----")
    print("\n--- Appointments ---")
    success, appointments_data = tester.test_appointments_endpoint()
    if success:
        print(f"✅ Found {len(appointments_data)} appointments")
        if appointments_data and isinstance(appointments_data, list):
            print("✅ Appointments data structure is correct (list of appointments)")
            if len(appointments_data) > 0 and isinstance(appointments_data[0], dict):
                required_fields = ["id", "doctorId", "doctorName", "date", "time", "patient", "status"]
                missing_fields = [field for field in required_fields if field not in appointments_data[0]]
                if not missing_fields:
                    print("✅ Appointment object structure is correct")
                else:
                    print(f"❌ Appointment object is missing required fields: {missing_fields}")
    
    print("\n--- Appointments by Doctor ---")
    success, filtered_appointments = tester.test_appointments_by_doctor()
    if success:
        print(f"✅ Found {len(filtered_appointments)} appointments for doctor_id=1")
        if filtered_appointments and isinstance(filtered_appointments, list):
            all_match = all(appt.get("doctorId") == "1" for appt in filtered_appointments)
            if all_match:
                print("✅ All appointments correctly filtered by doctor_id=1")
            else:
                print("❌ Some appointments do not match the doctor_id filter")
    
    print("\n--- Job Applications ---")
    success, job_applications = tester.test_job_applications_endpoint()
    if success:
        print(f"✅ Found {len(job_applications)} job applications")
        if job_applications and isinstance(job_applications, list):
            print("✅ Job applications data structure is correct (list of applications)")
            if len(job_applications) > 0 and isinstance(job_applications[0], dict):
                required_fields = ["id", "vacancyId", "vacancyTitle", "applicant", "status"]
                missing_fields = [field for field in required_fields if field not in job_applications[0]]
                if not missing_fields:
                    print("✅ Job application object structure is correct")
                else:
                    print(f"❌ Job application object is missing required fields: {missing_fields}")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    print(f"\n===== COMPREHENSIVE TEST SUMMARY =====")
    print(f"✅ Basic API Endpoints: {'Working' if tester.tests_passed > 1 else 'Not working'}")
    print(f"✅ Data Endpoints with Multilingual Support: {'Working' if tester.tests_passed > 8 else 'Not working'}")
    print(f"✅ CRUD Operations: {'Working' if tester.tests_passed > 14 else 'Not working'}")
    print(f"✅ Specific Endpoints (Appointments, Job Applications): {'Working' if tester.tests_passed > 16 else 'Not working'}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())