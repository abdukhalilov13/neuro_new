
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
    
    # Appointment Tests
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
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"\n===== API Testing Summary =====")
    print(f"✅ Root API endpoint: {'Working' if tester.tests_passed > 0 else 'Not working'}")
    print(f"✅ Health check endpoint: {'Working' if tester.tests_passed > 1 else 'Not working'}")
    print(f"✅ Departments endpoint: {'Working' if tester.tests_passed > 2 else 'Not working'}")
    print(f"✅ Doctors endpoint: {'Working' if tester.tests_passed > 3 else 'Not working'}")
    print(f"✅ Services endpoint: {'Working' if tester.tests_passed > 4 else 'Not working'}")
    print(f"✅ News endpoint: {'Working' if tester.tests_passed > 5 else 'Not working'}")
    print(f"✅ Gallery endpoint: {'Working' if tester.tests_passed > 6 else 'Not working'}")
    print(f"✅ Appointments endpoint: {'Working' if tester.tests_passed > 7 else 'Not working'}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
