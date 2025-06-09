
import requests
import sys
from datetime import datetime
import uuid

class NeuroUzAPITester:
    def __init__(self, base_url="https://3e8e490c-7e85-4fd5-adcb-28cf6a45bcf5.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.auth_token = None
        self.created_ids = {
            "services": [],
            "departments": [],
            "doctors": [],
            "news": [],
            "accounts": [],
            "leadership": [],
            "gallery": []
        }

    def run_test(self, name, method, endpoint, expected_status, data=None, auth=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if auth and self.auth_token:
            headers['Authorization'] = f'Bearer {self.auth_token}'
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
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
                        return success, response.json()
                    except:
                        return success, response.text
                return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"Response: {response.text}")
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
    
    # Run tests
    print("\n===== Testing Basic API Endpoints =====")
    tester.test_root_endpoint()
    tester.test_status_endpoint()
    tester.test_create_status()
    
    print("\n===== Testing Authentication =====")
    tester.test_admin_login()
    
    print("\n===== Testing Services =====")
    tester.test_services_endpoint()
    tester.test_add_service()
    tester.test_update_service()
    tester.test_delete_service()
    
    print("\n===== Testing Departments =====")
    tester.test_departments_endpoint()
    tester.test_add_department()
    tester.test_update_department()
    
    print("\n===== Testing Doctors =====")
    tester.test_doctors_endpoint()
    tester.test_add_doctor()
    tester.test_update_doctor()
    
    print("\n===== Testing News =====")
    tester.test_news_endpoint()
    tester.test_add_news()
    tester.test_update_news()
    tester.test_delete_news()
    
    print("\n===== Testing Accounts =====")
    tester.test_accounts_endpoint()
    tester.test_add_account()
    tester.test_update_account()
    tester.test_toggle_account_status()
    tester.test_delete_account()
    
    print("\n===== Testing Leadership =====")
    tester.test_leadership_endpoint()
    tester.test_add_leadership()
    tester.test_update_leadership()
    tester.test_delete_leadership()
    
    print("\n===== Testing Gallery =====")
    tester.test_gallery_endpoint()
    tester.test_add_gallery_image()
    tester.test_update_gallery_image()
    tester.test_delete_gallery_image()
    
    print("\n===== Testing Other Functionality =====")
    tester.test_appointment_submission()
    tester.test_language_content()
    tester.test_doctor_login()
    
    # Clean up any remaining test data
    for doctor_id in tester.created_ids["doctors"]:
        tester.run_test(
            f"Cleanup Doctor {doctor_id}",
            "DELETE",
            f"doctors/{doctor_id}",
            200,
            auth=True
        )
    
    for department_id in tester.created_ids["departments"]:
        tester.run_test(
            f"Cleanup Department {department_id}",
            "DELETE",
            f"departments/{department_id}",
            200,
            auth=True
        )
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
