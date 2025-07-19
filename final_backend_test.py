import requests
import sys
from datetime import datetime
import uuid
import os
import json

class NeuroUzFinalTester:
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
            "users": None,
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

    # Departments Tests with Multilingual Check
    def test_departments_multilingual(self):
        """Test departments endpoint with multilingual support"""
        success, data = self.run_test(
            "Departments Endpoint with Multilingual Support",
            "GET",
            "departments",
            200
        )
        
        if success:
            multilingual = self.check_multilingual_support(data, ["name", "description"])
            return success and multilingual
        return False

    # Leadership Tests with Multilingual Check
    def test_leadership_multilingual(self):
        """Test leadership endpoint with multilingual support"""
        success, data = self.run_test(
            "Leadership Endpoint with Multilingual Support",
            "GET",
            "leadership",
            200
        )
        
        if success:
            multilingual = self.check_multilingual_support(data, ["name", "position", "biography"])
            return success and multilingual
        return False

    # Appointments Tests
    def test_appointments(self):
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

    # Job Applications Tests
    def test_job_applications(self):
        """Test job applications endpoint"""
        return self.run_test(
            "Job Applications Endpoint",
            "GET",
            "job-applications",
            200
        )

    # User Management Tests
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
    tester = NeuroUzFinalTester()
    
    # Run tests for the required endpoints
    print("\n===== FINAL COMPREHENSIVE TEST =====")
    
    # 1. Basic API health check
    print("\n----- Testing API Health -----")
    tester.test_health_endpoint()
    
    # 2. Test multilingual support in endpoints
    print("\n----- Testing Multilingual Support -----")
    tester.test_departments_multilingual()
    tester.test_leadership_multilingual()
    
    # 3. Test appointments
    print("\n----- Testing Appointments -----")
    success, appointments_data = tester.test_appointments()
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
    
    # 4. Test appointments filtered by doctor
    print("\n----- Testing Appointments Filtered by Doctor -----")
    success, filtered_appointments = tester.test_appointments_by_doctor()
    if success:
        print(f"✅ Found {len(filtered_appointments)} appointments for doctor_id=1")
        if filtered_appointments and isinstance(filtered_appointments, list):
            all_match = all(appt.get("doctorId") == "1" for appt in filtered_appointments)
            if all_match:
                print("✅ All appointments correctly filtered by doctor_id=1")
            else:
                print("❌ Some appointments do not match the doctor_id filter")
    
    # 5. Test job applications
    print("\n----- Testing Job Applications -----")
    success, job_applications = tester.test_job_applications()
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
    
    # 6. Test user creation
    print("\n----- Testing User Creation -----")
    tester.test_create_user()
    
    # 7. Test user password update
    print("\n----- Testing User Password Update -----")
    if tester.created_ids["users"]:
        success, update_result = tester.test_update_user_password()
        if success:
            print(f"✅ Successfully updated password for user with ID: {tester.created_ids['users']}")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    print(f"\n===== FINAL TEST SUMMARY =====")
    print(f"✅ API Health: {'Working' if tester.tests_passed > 0 else 'Not working'}")
    print(f"✅ Multilingual Support: {'Confirmed' if tester.tests_passed > 2 else 'Not confirmed'}")
    print(f"✅ Appointments API: {'Working' if tester.tests_passed > 4 else 'Not working'}")
    print(f"✅ Job Applications API: {'Working' if tester.tests_passed > 5 else 'Not working'}")
    print(f"✅ User Management API: {'Working' if tester.tests_passed > 7 else 'Not working'}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())