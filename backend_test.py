
import requests
import sys
from datetime import datetime

class NeuroUzAPITester:
    def __init__(self, base_url="https://3e8e490c-7e85-4fd5-adcb-28cf6a45bcf5.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

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
    
    def test_admin_login(self):
        """Test admin login"""
        login_data = {
            "email": "admin@neuro.uz",
            "password": "admin123"
        }
        
        return self.run_test(
            "Admin Login",
            "POST",
            "auth/admin",
            200,
            data=login_data
        )
    
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
        service_data = {
            "name": "Тестовая услуга",
            "category": "Диагностика",
            "price": 100000,
            "description": "Описание тестовой услуги"
        }
        
        return self.run_test(
            "Add Service",
            "POST",
            "services",
            200,
            data=service_data
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
    tester.test_doctor_login()
    tester.test_admin_login()
    
    print("\n===== Testing Services =====")
    tester.test_services_endpoint()
    tester.test_add_service()
    
    print("\n===== Testing Appointments =====")
    tester.test_appointment_submission()
    
    print("\n===== Testing Multilingual Support =====")
    tester.test_language_content()

    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
