import requests
import sys
import json
from datetime import datetime

class NeuroAPITester:
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

    # Test existing endpoints
    def test_departments(self):
        return self.run_test("Departments Endpoint", "GET", "departments", 200)
        
    def test_doctors(self):
        return self.run_test("Doctors Endpoint", "GET", "doctors", 200)
        
    def test_services(self):
        return self.run_test("Services Endpoint", "GET", "services", 200)
        
    def test_news(self):
        return self.run_test("News Endpoint", "GET", "news", 200)
        
    def test_gallery(self):
        return self.run_test("Gallery Endpoint", "GET", "gallery", 200)
        
    def test_events(self):
        return self.run_test("Events Endpoint", "GET", "events", 200)
        
    def test_leadership(self):
        return self.run_test("Leadership Endpoint", "GET", "leadership", 200)
    
    # Test appointments endpoints
    def test_get_appointments(self):
        return self.run_test("Get All Appointments", "GET", "appointments", 200)
        
    def test_get_appointments_by_doctor(self):
        return self.run_test("Get Appointments by Doctor", "GET", "appointments?doctor_id=1", 200)
        
    def test_create_appointment(self):
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
        
        return self.run_test("Create Appointment", "POST", "appointments", 200, data=appointment_data)
        
    def test_update_appointment(self):
        update_data = {
            "status": "confirmed"
        }
        
        return self.run_test("Update Appointment Status", "PUT", "appointments/1", 200, data=update_data)
        
    def test_delete_appointment(self):
        return self.run_test("Delete Appointment", "DELETE", "appointments/1", 200)
        
    # Test job applications endpoints
    def test_get_job_applications(self):
        return self.run_test("Get Job Applications", "GET", "job-applications", 200)
        
    def test_create_job_application(self):
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
        
        return self.run_test("Create Job Application", "POST", "job-applications", 200, data=application_data)
        
    def test_update_job_application(self):
        update_data = {
            "status": "interview"
        }
        
        return self.run_test("Update Job Application Status", "PUT", "job-applications/1", 200, data=update_data)

def main():
    tester = NeuroAPITester()
    
    # Test existing endpoints
    print("\n===== Testing Existing Endpoints =====")
    success, departments = tester.test_departments()
    success, doctors = tester.test_doctors()
    success, services = tester.test_services()
    success, news = tester.test_news()
    success, gallery = tester.test_gallery()
    success, events = tester.test_events()
    success, leadership = tester.test_leadership()
    
    # Test appointments endpoints
    print("\n===== Testing Appointments Endpoints =====")
    success, appointments = tester.test_get_appointments()
    if success:
        print(f"✅ Found {len(appointments)} appointments")
        if appointments and isinstance(appointments, list) and len(appointments) > 0:
            print("✅ Appointments data structure is correct")
            required_fields = ["id", "doctorId", "doctorName", "date", "time", "patient", "status"]
            missing_fields = [field for field in required_fields if field not in appointments[0]]
            if not missing_fields:
                print("✅ Appointment object structure is correct")
                if "patient" in appointments[0] and isinstance(appointments[0]["patient"], dict):
                    patient_fields = ["name", "phone", "email", "complaint"]
                    missing_patient_fields = [field for field in patient_fields if field not in appointments[0]["patient"]]
                    if not missing_patient_fields:
                        print("✅ Patient object structure is correct")
                    else:
                        print(f"❌ Patient object is missing required fields: {missing_patient_fields}")
            else:
                print(f"❌ Appointment object is missing required fields: {missing_fields}")
    
    success, doctor_appointments = tester.test_get_appointments_by_doctor()
    if success:
        print(f"✅ Found {len(doctor_appointments)} appointments for doctor ID 1")
    
    success, create_appointment = tester.test_create_appointment()
    if success:
        print("✅ Appointment creation successful")
        required_fields = ["id", "message", "status"]
        missing_fields = [field for field in required_fields if field not in create_appointment]
        if not missing_fields:
            print("✅ Appointment creation response structure is correct")
        else:
            print(f"❌ Appointment creation response is missing required fields: {missing_fields}")
    
    success, update_appointment = tester.test_update_appointment()
    if success:
        print("✅ Appointment update successful")
        if "status" in update_appointment and update_appointment["status"] == "confirmed":
            print("✅ Appointment status was correctly updated to 'confirmed'")
    
    success, delete_appointment = tester.test_delete_appointment()
    if success:
        print("✅ Appointment deletion successful")
    
    # Test job applications endpoints
    print("\n===== Testing Job Applications Endpoints =====")
    success, job_applications = tester.test_get_job_applications()
    if success:
        print(f"✅ Found {len(job_applications)} job applications")
        if job_applications and isinstance(job_applications, list) and len(job_applications) > 0:
            print("✅ Job applications data structure is correct")
            required_fields = ["id", "vacancyId", "vacancyTitle", "applicant", "status"]
            missing_fields = [field for field in required_fields if field not in job_applications[0]]
            if not missing_fields:
                print("✅ Job application object structure is correct")
                if "applicant" in job_applications[0] and isinstance(job_applications[0]["applicant"], dict):
                    applicant_fields = ["name", "phone", "email", "experience", "education"]
                    missing_applicant_fields = [field for field in applicant_fields if field not in job_applications[0]["applicant"]]
                    if not missing_applicant_fields:
                        print("✅ Applicant object structure is correct")
                    else:
                        print(f"❌ Applicant object is missing required fields: {missing_applicant_fields}")
            else:
                print(f"❌ Job application object is missing required fields: {missing_fields}")
    
    success, create_job_application = tester.test_create_job_application()
    if success:
        print("✅ Job application creation successful")
        required_fields = ["id", "message"]
        missing_fields = [field for field in required_fields if field not in create_job_application]
        if not missing_fields:
            print("✅ Job application creation response structure is correct")
        else:
            print(f"❌ Job application creation response is missing required fields: {missing_fields}")
    
    success, update_job_application = tester.test_update_job_application()
    if success:
        print("✅ Job application update successful")
        if "status" in update_job_application and update_job_application["status"] == "interview":
            print("✅ Job application status was correctly updated to 'interview'")
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"\n===== API Testing Summary =====")
    print(f"✅ Existing endpoints (departments, doctors, services, news, gallery, events, leadership): {'Working' if tester.tests_passed >= 7 else 'Not working'}")
    print(f"✅ Appointments GET endpoint: {'Working' if tester.tests_passed >= 9 else 'Not working'}")
    print(f"✅ Appointments CRUD operations: {'Working' if tester.tests_passed >= 12 else 'Not working'}")
    print(f"✅ Job Applications GET endpoint: {'Working' if tester.tests_passed >= 13 else 'Not working'}")
    print(f"✅ Job Applications creation and update: {'Working' if tester.tests_passed >= 15 else 'Not working'}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())