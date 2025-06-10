
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

    def test_status_endpoint(self):
        """Test the status endpoint"""
        return self.run_test(
            "Status Endpoint",
            "GET",
            "status",
            200
        )
    
    def test_create_status(self):
        """Test creating a status check"""
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data={"client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"}
        )
    
    # Authentication Tests
    def test_admin_login(self):
        """Test admin login"""
        login_data = {
            "email": "admin@neuro.uz",
            "password": "admin123"
        }
        
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/admin",
            200,
            data=login_data
        )
        
        if success and 'token' in response:
            self.auth_token = response['token']
            print("✅ Successfully obtained auth token")
        else:
            print("❌ Failed to obtain auth token")
            
        return success, response
    
    def test_doctor_login(self):
        """Test doctor login"""
        login_data = {
            "email": "doctor@neuro.uz",
            "password": "demo123"
        }
        
        return self.run_test(
            "Doctor Login",
            "POST",
            "auth/doctor",
            200,
            data=login_data
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
    
    def test_add_service(self):
        """Test adding a new service"""
        service_id = str(uuid.uuid4())
        service_data = {
            "id": service_id,
            "name": f"Тестовая услуга {datetime.now().strftime('%H%M%S')}",
            "category": "Диагностика",
            "price": 100000,
            "description": "Описание тестовой услуги"
        }
        
        success, response = self.run_test(
            "Add Service",
            "POST",
            "services",
            200,
            data=service_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["services"].append(response['id'])
        
        return success, response
    
    def test_update_service(self):
        """Test updating a service"""
        if not self.created_ids["services"]:
            print("⚠️ No service to update, skipping test")
            return False, {}
        
        service_id = self.created_ids["services"][0]
        service_data = {
            "id": service_id,
            "name": f"Обновленная услуга {datetime.now().strftime('%H%M%S')}",
            "category": "Хирургия",
            "price": 150000,
            "description": "Обновленное описание услуги"
        }
        
        return self.run_test(
            "Update Service",
            "PUT",
            f"services/{service_id}",
            200,
            data=service_data,
            auth=True
        )
    
    def test_delete_service(self):
        """Test deleting a service"""
        if not self.created_ids["services"]:
            print("⚠️ No service to delete, skipping test")
            return False, {}
        
        service_id = self.created_ids["services"].pop()
        
        return self.run_test(
            "Delete Service",
            "DELETE",
            f"services/{service_id}",
            200,
            auth=True
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
    
    def test_add_department(self):
        """Test adding a new department"""
        department_id = str(uuid.uuid4())
        department_data = {
            "id": department_id,
            "name": f"Тестовое отделение {datetime.now().strftime('%H%M%S')}",
            "description": "Описание тестового отделения",
            "icon": "Brain",
            "color": "from-blue-500 to-blue-600"
        }
        
        success, response = self.run_test(
            "Add Department",
            "POST",
            "departments",
            200,
            data=department_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["departments"].append(response['id'])
        
        return success, response
    
    def test_update_department(self):
        """Test updating a department"""
        if not self.created_ids["departments"]:
            print("⚠️ No department to update, skipping test")
            return False, {}
        
        department_id = self.created_ids["departments"][0]
        department_data = {
            "id": department_id,
            "name": f"Обновленное отделение {datetime.now().strftime('%H%M%S')}",
            "description": "Обновленное описание отделения",
            "icon": "Heart",
            "color": "from-green-500 to-green-600"
        }
        
        return self.run_test(
            "Update Department",
            "PUT",
            f"departments/{department_id}",
            200,
            data=department_data,
            auth=True
        )
    
    def test_delete_department(self):
        """Test deleting a department"""
        if not self.created_ids["departments"]:
            print("⚠️ No department to delete, skipping test")
            return False, {}
        
        department_id = self.created_ids["departments"].pop()
        
        return self.run_test(
            "Delete Department",
            "DELETE",
            f"departments/{department_id}",
            200,
            auth=True
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
    
    def test_add_doctor(self):
        """Test adding a new doctor"""
        doctor_id = str(uuid.uuid4())
        doctor_data = {
            "id": doctor_id,
            "name": f"Тестовый Врач {datetime.now().strftime('%H%M%S')}",
            "specialization": "Нейрохирург",
            "experience": "10 лет",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "email": f"test.doctor{datetime.now().strftime('%H%M%S')}@neuro.uz",
            "phone": "+998 90 123-45-67",
            "reception": "Пн-Пт, 9:00-17:00",
            "departmentId": self.created_ids["departments"][0] if self.created_ids["departments"] else None
        }
        
        success, response = self.run_test(
            "Add Doctor",
            "POST",
            "doctors",
            200,
            data=doctor_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["doctors"].append(response['id'])
        
        return success, response
    
    def test_update_doctor(self):
        """Test updating a doctor"""
        if not self.created_ids["doctors"]:
            print("⚠️ No doctor to update, skipping test")
            return False, {}
        
        doctor_id = self.created_ids["doctors"][0]
        doctor_data = {
            "id": doctor_id,
            "name": f"Обновленный Врач {datetime.now().strftime('%H%M%S')}",
            "specialization": "Нейрохирург высшей категории",
            "experience": "15 лет",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "email": f"updated.doctor{datetime.now().strftime('%H%M%S')}@neuro.uz",
            "phone": "+998 90 987-65-43",
            "reception": "Пн-Пт, 10:00-18:00",
            "departmentId": self.created_ids["departments"][0] if self.created_ids["departments"] else None
        }
        
        return self.run_test(
            "Update Doctor",
            "PUT",
            f"doctors/{doctor_id}",
            200,
            data=doctor_data,
            auth=True
        )
    
    def test_delete_doctor(self):
        """Test deleting a doctor"""
        if not self.created_ids["doctors"]:
            print("⚠️ No doctor to delete, skipping test")
            return False, {}
        
        doctor_id = self.created_ids["doctors"].pop()
        
        return self.run_test(
            "Delete Doctor",
            "DELETE",
            f"doctors/{doctor_id}",
            200,
            auth=True
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
    
    def test_add_news(self):
        """Test adding a news item"""
        news_id = str(uuid.uuid4())
        news_data = {
            "id": news_id,
            "title": f"Тестовая новость {datetime.now().strftime('%H%M%S')}",
            "excerpt": "Краткое описание тестовой новости",
            "content": "Полный текст тестовой новости с подробным описанием события",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "date": datetime.now().strftime('%d.%m.%Y')
        }
        
        success, response = self.run_test(
            "Add News",
            "POST",
            "news",
            200,
            data=news_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["news"].append(response['id'])
        
        return success, response
    
    def test_update_news(self):
        """Test updating a news item"""
        if not self.created_ids["news"]:
            print("⚠️ No news to update, skipping test")
            return False, {}
        
        news_id = self.created_ids["news"][0]
        news_data = {
            "id": news_id,
            "title": f"Обновленная новость {datetime.now().strftime('%H%M%S')}",
            "excerpt": "Обновленное краткое описание новости",
            "content": "Обновленный полный текст новости с подробным описанием события",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "date": datetime.now().strftime('%d.%m.%Y')
        }
        
        return self.run_test(
            "Update News",
            "PUT",
            f"news/{news_id}",
            200,
            data=news_data,
            auth=True
        )
    
    def test_delete_news(self):
        """Test deleting a news item"""
        if not self.created_ids["news"]:
            print("⚠️ No news to delete, skipping test")
            return False, {}
        
        news_id = self.created_ids["news"].pop()
        
        return self.run_test(
            "Delete News",
            "DELETE",
            f"news/{news_id}",
            200,
            auth=True
        )
    
    # Accounts Tests
    def test_accounts_endpoint(self):
        """Test accounts endpoint"""
        return self.run_test(
            "Accounts Endpoint",
            "GET",
            "accounts",
            200,
            auth=True
        )
    
    def test_add_account(self):
        """Test adding a new account"""
        account_id = str(uuid.uuid4())
        account_data = {
            "id": account_id,
            "name": f"Тестовый Пользователь {datetime.now().strftime('%H%M%S')}",
            "email": f"test.user{datetime.now().strftime('%H%M%S')}@neuro.uz",
            "role": "doctor",
            "password": "test123",
            "status": "active"
        }
        
        success, response = self.run_test(
            "Add Account",
            "POST",
            "accounts",
            200,
            data=account_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["accounts"].append(response['id'])
        
        return success, response
    
    def test_update_account(self):
        """Test updating an account"""
        if not self.created_ids["accounts"]:
            print("⚠️ No account to update, skipping test")
            return False, {}
        
        account_id = self.created_ids["accounts"][0]
        account_data = {
            "id": account_id,
            "name": f"Обновленный Пользователь {datetime.now().strftime('%H%M%S')}",
            "email": f"updated.user{datetime.now().strftime('%H%M%S')}@neuro.uz",
            "role": "admin",
            "password": "updated123",
            "status": "active"
        }
        
        return self.run_test(
            "Update Account",
            "PUT",
            f"accounts/{account_id}",
            200,
            data=account_data,
            auth=True
        )
    
    def test_toggle_account_status(self):
        """Test toggling account status"""
        if not self.created_ids["accounts"]:
            print("⚠️ No account to toggle status, skipping test")
            return False, {}
        
        account_id = self.created_ids["accounts"][0]
        
        return self.run_test(
            "Toggle Account Status",
            "PUT",
            f"accounts/{account_id}/toggle-status",
            200,
            auth=True
        )
    
    def test_delete_account(self):
        """Test deleting an account"""
        if not self.created_ids["accounts"]:
            print("⚠️ No account to delete, skipping test")
            return False, {}
        
        account_id = self.created_ids["accounts"].pop()
        
        return self.run_test(
            "Delete Account",
            "DELETE",
            f"accounts/{account_id}",
            200,
            auth=True
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
    
    def test_add_leadership(self):
        """Test adding a leadership member"""
        leadership_id = str(uuid.uuid4())
        leadership_data = {
            "id": leadership_id,
            "name": f"Тестовый Руководитель {datetime.now().strftime('%H%M%S')}",
            "position": "Заместитель директора",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "phone": "+998 90 123-45-67",
            "email": f"test.leader{datetime.now().strftime('%H%M%S')}@neuro.uz",
            "biography": "Биография тестового руководителя"
        }
        
        success, response = self.run_test(
            "Add Leadership",
            "POST",
            "leadership",
            200,
            data=leadership_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["leadership"].append(response['id'])
        
        return success, response
    
    def test_update_leadership(self):
        """Test updating a leadership member"""
        if not self.created_ids["leadership"]:
            print("⚠️ No leadership to update, skipping test")
            return False, {}
        
        leadership_id = self.created_ids["leadership"][0]
        leadership_data = {
            "id": leadership_id,
            "name": f"Обновленный Руководитель {datetime.now().strftime('%H%M%S')}",
            "position": "Главный врач",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "phone": "+998 90 987-65-43",
            "email": f"updated.leader{datetime.now().strftime('%H%M%S')}@neuro.uz",
            "biography": "Обновленная биография руководителя"
        }
        
        return self.run_test(
            "Update Leadership",
            "PUT",
            f"leadership/{leadership_id}",
            200,
            data=leadership_data,
            auth=True
        )
    
    def test_delete_leadership(self):
        """Test deleting a leadership member"""
        if not self.created_ids["leadership"]:
            print("⚠️ No leadership to delete, skipping test")
            return False, {}
        
        leadership_id = self.created_ids["leadership"].pop()
        
        return self.run_test(
            "Delete Leadership",
            "DELETE",
            f"leadership/{leadership_id}",
            200,
            auth=True
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
    
    def test_add_gallery_image(self):
        """Test adding a gallery image"""
        image_id = str(uuid.uuid4())
        image_data = {
            "id": image_id,
            "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "alt": f"Тестовое изображение {datetime.now().strftime('%H%M%S')}",
            "category": "general"
        }
        
        success, response = self.run_test(
            "Add Gallery Image",
            "POST",
            "gallery",
            200,
            data=image_data,
            auth=True
        )
        
        if success and 'id' in response:
            self.created_ids["gallery"].append(response['id'])
        
        return success, response
    
    def test_update_gallery_image(self):
        """Test updating a gallery image"""
        if not self.created_ids["gallery"]:
            print("⚠️ No gallery image to update, skipping test")
            return False, {}
        
        image_id = self.created_ids["gallery"][0]
        image_data = {
            "id": image_id,
            "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "alt": f"Обновленное изображение {datetime.now().strftime('%H%M%S')}",
            "category": "equipment"
        }
        
        return self.run_test(
            "Update Gallery Image",
            "PUT",
            f"gallery/{image_id}",
            200,
            data=image_data,
            auth=True
        )
    
    def test_delete_gallery_image(self):
        """Test deleting a gallery image"""
        if not self.created_ids["gallery"]:
            print("⚠️ No gallery image to delete, skipping test")
            return False, {}
        
        image_id = self.created_ids["gallery"].pop()
        
        return self.run_test(
            "Delete Gallery Image",
            "DELETE",
            f"gallery/{image_id}",
            200,
            auth=True
        )
    
    # Other Tests
    def test_appointment_submission(self):
        """Test appointment submission"""
        appointment_data = {
            "doctor": "Кариев Габрат Маратович",
            "date": "2025-06-15",
            "time": "10:00",
            "patient": {
                "firstName": "Тест",
                "lastName": "Тестов",
                "phone": "+998 90 123-45-67",
                "email": "test@example.com",
                "birthDate": "1990-01-01",
                "address": "г. Ташкент"
            },
            "complaint": "Тестовая запись на прием"
        }
        
        return self.run_test(
            "Appointment Submission",
            "POST",
            "appointments",
            200,
            data=appointment_data
        )
    
    def test_language_content(self):
        """Test language content endpoint"""
        return self.run_test(
            "Language Content",
            "GET",
            "languages",
            200
        )

def main():
    # Setup
    tester = NeuroUzAPITester()
    
    # Run tests for the required endpoints
    print("\n===== Testing Basic API Endpoints =====")
    tester.test_root_endpoint()
    
    print("\n===== Testing Departments API =====")
    success, departments_data = tester.test_departments_endpoint()
    if success:
        print(f"✅ Found {len(departments_data)} departments")
        if len(departments_data) == 3:
            print("✅ Correct number of departments (3) returned from API")
        else:
            print(f"❌ Expected 3 departments, but got {len(departments_data)}")
    
    print("\n===== Testing Doctors API =====")
    success, doctors_data = tester.test_doctors_endpoint()
    if success:
        print(f"✅ Found {len(doctors_data)} doctors")
        if len(doctors_data) == 3:
            print("✅ Correct number of doctors (3) returned from API")
        else:
            print(f"❌ Expected 3 doctors, but got {len(doctors_data)}")
    
    print("\n===== Testing Services API =====")
    success, services_data = tester.test_services_endpoint()
    if success:
        print(f"✅ Found {len(services_data)} services")
        if len(services_data) == 3:
            print("✅ Correct number of services (3) returned from API")
        else:
            print(f"❌ Expected 3 services, but got {len(services_data)}")
    
    print("\n===== Testing News API =====")
    success, news_data = tester.test_news_endpoint()
    if success:
        print(f"✅ Found {len(news_data)} news items")
        if len(news_data) == 2:
            print("✅ Correct number of news items (2) returned from API")
        else:
            print(f"❌ Expected 2 news items, but got {len(news_data)}")
    
    print("\n===== Testing Gallery API =====")
    success, gallery_data = tester.test_gallery_endpoint()
    if success:
        print(f"✅ Found {len(gallery_data)} gallery images")
    
    print("\n===== Testing Appointment Submission =====")
    tester.test_appointment_submission()
    
    print("\n===== Testing Authentication =====")
    print("Testing Doctor Login:")
    tester.test_doctor_login()
    
    print("Testing Admin Login:")
    tester.test_admin_login()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
