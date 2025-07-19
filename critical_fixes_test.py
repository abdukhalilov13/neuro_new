#!/usr/bin/env python3

import requests
import sys
from datetime import datetime
import uuid
import os
import json

class CriticalFixesTester:
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
        print(f"🔗 Using API base URL: {self.base_url}")
        self.tests_run = 0
        self.tests_passed = 0
        self.critical_issues = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        if data:
            print(f"Data: {json.dumps(data, indent=2)}")
        
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
                print(f"✅ PASS - Status: {response.status_code}")
                if response.text:
                    try:
                        json_response = response.json()
                        print(f"Response: {json.dumps(json_response, indent=2)[:800]}...")
                        return success, json_response
                    except:
                        print(f"Response: {response.text[:500]}...")
                        return success, response.text
                return success, {}
            else:
                print(f"❌ FAIL - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"Response: {response.text[:500]}...")
                self.critical_issues.append(f"{name}: Expected {expected_status}, got {response.status_code}")
                return success, {}

        except Exception as e:
            print(f"❌ FAIL - Error: {str(e)}")
            self.critical_issues.append(f"{name}: {str(e)}")
            return False, {}

    def test_critical_login_doctor(self):
        """Test critical login for doctor with correct credentials"""
        print("\n🚨 CRITICAL TEST: Doctor Login")
        
        # Test with the credentials mentioned in the review request
        login_data = {
            "email": "kariev@neuro.uz", 
            "password": "123456"
        }
        
        success, response = self.run_test(
            "Doctor Login (kariev@neuro.uz / 123456)",
            "POST",
            "login",
            200,
            data=login_data
        )
        
        if success and isinstance(response, dict):
            # Check if response has correct structure
            if "user" in response and "doctor_profile" in response:
                print("✅ Login response has correct structure with user and doctor_profile")
                user = response.get("user", {})
                doctor_profile = response.get("doctor_profile")
                
                if user.get("role") == "doctor":
                    print("✅ User role is correctly set to 'doctor'")
                else:
                    print(f"❌ User role is '{user.get('role')}', expected 'doctor'")
                    self.critical_issues.append("Doctor login: User role is not 'doctor'")
                
                if doctor_profile:
                    print("✅ Doctor profile is present in response")
                    print(f"Doctor profile: {json.dumps(doctor_profile, indent=2)[:300]}...")
                else:
                    print("❌ Doctor profile is missing from response")
                    self.critical_issues.append("Doctor login: Doctor profile missing")
            else:
                print("❌ Login response missing required fields (user, doctor_profile)")
                self.critical_issues.append("Doctor login: Response structure incorrect")
        
        # Also test with the password from backend code (demo123)
        login_data_alt = {
            "email": "kariev@neuro.uz", 
            "password": "demo123"
        }
        
        success_alt, response_alt = self.run_test(
            "Doctor Login Alternative (kariev@neuro.uz / demo123)",
            "POST",
            "login",
            200,
            data=login_data_alt
        )
        
        return success or success_alt

    def test_critical_login_admin(self):
        """Test critical login for admin with correct credentials"""
        print("\n🚨 CRITICAL TEST: Admin Login")
        
        # Test with the credentials mentioned in the review request
        login_data = {
            "email": "admin@neuro.uz", 
            "password": "testpassword"
        }
        
        success, response = self.run_test(
            "Admin Login (admin@neuro.uz / testpassword)",
            "POST",
            "login",
            200,
            data=login_data
        )
        
        # Also test with the password from backend code (admin123)
        login_data_alt = {
            "email": "admin@neuro.uz", 
            "password": "admin123"
        }
        
        success_alt, response_alt = self.run_test(
            "Admin Login Alternative (admin@neuro.uz / admin123)",
            "POST",
            "login",
            200,
            data=login_data_alt
        )
        
        if success_alt and isinstance(response_alt, dict):
            # Check if response has correct structure
            if "user" in response_alt:
                print("✅ Admin login response has correct structure with user")
                user = response_alt.get("user", {})
                
                if user.get("role") == "admin":
                    print("✅ User role is correctly set to 'admin'")
                else:
                    print(f"❌ User role is '{user.get('role')}', expected 'admin'")
                    self.critical_issues.append("Admin login: User role is not 'admin'")
            else:
                print("❌ Admin login response missing required fields (user)")
                self.critical_issues.append("Admin login: Response structure incorrect")
        
        return success or success_alt

    def test_critical_appointments_all(self):
        """Test critical appointments endpoint - get all appointments"""
        print("\n🚨 CRITICAL TEST: Get All Appointments")
        
        success, response = self.run_test(
            "Get All Appointments",
            "GET",
            "appointments",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} appointments")
            
            # Check if appointments have correct structure
            if len(response) > 0:
                appointment = response[0]
                required_fields = ["id", "doctorId", "doctorName", "date", "time", "patient", "status"]
                missing_fields = [field for field in required_fields if field not in appointment]
                
                if not missing_fields:
                    print("✅ Appointment structure is correct")
                    
                    # Check if doctorId is present and valid
                    doctor_id = appointment.get("doctorId")
                    if doctor_id:
                        print(f"✅ Appointment has doctorId: {doctor_id}")
                    else:
                        print("❌ Appointment missing doctorId")
                        self.critical_issues.append("Appointments: Missing doctorId")
                        
                else:
                    print(f"❌ Appointment missing required fields: {missing_fields}")
                    self.critical_issues.append(f"Appointments: Missing fields {missing_fields}")
            else:
                print("⚠️ No appointments found in database")
        
        return success

    def test_critical_appointments_by_doctor(self):
        """Test critical appointments endpoint - get appointments for specific doctor (Kariev)"""
        print("\n🚨 CRITICAL TEST: Get Appointments for Dr. Kariev")
        
        # Use the doctorId mentioned in the review request
        doctor_id = "b3887eb2-b05a-4917-893a-e78a0a11bd92"
        
        success, response = self.run_test(
            f"Get Appointments for Doctor {doctor_id}",
            "GET",
            f"appointments?doctor_id={doctor_id}",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} appointments for Dr. Kariev")
            
            # Check if all returned appointments belong to the specified doctor
            for appointment in response:
                if appointment.get("doctorId") == doctor_id:
                    print(f"✅ Appointment {appointment.get('id')} correctly belongs to Dr. Kariev")
                else:
                    print(f"❌ Appointment {appointment.get('id')} has wrong doctorId: {appointment.get('doctorId')}")
                    self.critical_issues.append(f"Appointments filter: Wrong doctorId in filtered results")
        
        return success

    def test_critical_create_appointment(self):
        """Test creating new appointment for Dr. Kariev"""
        print("\n🚨 CRITICAL TEST: Create New Appointment for Dr. Kariev")
        
        appointment_data = {
            "doctorId": "b3887eb2-b05a-4917-893a-e78a0a11bd92",
            "doctorName": "Кариев Габрат Маратович",
            "date": "2025-07-20",
            "time": "15:30",
            "patient": {
                "name": "Тестовый Пациент Иванович",
                "phone": "+998 90 999-88-77",
                "email": "test.patient@mail.uz",
                "age": 42,
                "complaint": "Тестовая жалоба для проверки системы"
            },
            "status": "pending",
            "type": "consultation"
        }
        
        success, response = self.run_test(
            "Create Appointment for Dr. Kariev",
            "POST",
            "appointments",
            200,
            data=appointment_data
        )
        
        if success and isinstance(response, dict):
            appointment_id = response.get("id")
            if appointment_id:
                print(f"✅ Appointment created with ID: {appointment_id}")
                
                # Verify the appointment appears in GET requests
                print("\n🔍 Verifying appointment appears in GET requests...")
                
                # Check all appointments
                success_get, all_appointments = self.run_test(
                    "Verify in All Appointments",
                    "GET",
                    "appointments",
                    200
                )
                
                if success_get and isinstance(all_appointments, list):
                    found_appointment = next((apt for apt in all_appointments if apt.get("id") == appointment_id), None)
                    if found_appointment:
                        print("✅ New appointment appears in all appointments list")
                    else:
                        print("❌ New appointment NOT found in all appointments list")
                        self.critical_issues.append("Create appointment: Not appearing in GET all appointments")
                
                # Check doctor-specific appointments
                success_doctor, doctor_appointments = self.run_test(
                    "Verify in Doctor Appointments",
                    "GET",
                    f"appointments?doctor_id=b3887eb2-b05a-4917-893a-e78a0a11bd92",
                    200
                )
                
                if success_doctor and isinstance(doctor_appointments, list):
                    found_doctor_appointment = next((apt for apt in doctor_appointments if apt.get("id") == appointment_id), None)
                    if found_doctor_appointment:
                        print("✅ New appointment appears in doctor-specific appointments list")
                    else:
                        print("❌ New appointment NOT found in doctor-specific appointments list")
                        self.critical_issues.append("Create appointment: Not appearing in GET doctor appointments")
            else:
                print("❌ Created appointment response missing ID")
                self.critical_issues.append("Create appointment: Response missing ID")
        
        return success

    def test_critical_users_with_doctors(self):
        """Test users endpoint to verify doctors with correct doctorId"""
        print("\n🚨 CRITICAL TEST: Users with Doctor Roles and DoctorId")
        
        success, response = self.run_test(
            "Get All Users",
            "GET",
            "users",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} users")
            
            doctor_users = [user for user in response if user.get("role") == "doctor"]
            print(f"✅ Found {len(doctor_users)} users with role='doctor'")
            
            for doctor_user in doctor_users:
                user_name = doctor_user.get("name", "Unknown")
                doctor_id = doctor_user.get("doctorId")
                
                if doctor_id:
                    print(f"✅ Doctor user '{user_name}' has doctorId: {doctor_id}")
                else:
                    print(f"❌ Doctor user '{user_name}' missing doctorId")
                    self.critical_issues.append(f"Users: Doctor user '{user_name}' missing doctorId")
            
            # Check if we have the specific users mentioned
            kariev_user = next((user for user in response if "kariev" in user.get("email", "").lower()), None)
            if kariev_user:
                print(f"✅ Found Kariev user: {kariev_user.get('email')} with doctorId: {kariev_user.get('doctorId')}")
            else:
                print("❌ Kariev user not found")
                self.critical_issues.append("Users: Kariev user not found")
        
        return success

    def run_all_critical_tests(self):
        """Run all critical tests"""
        print("🚨🚨🚨 STARTING CRITICAL FIXES TESTING FOR NEUROSURGERY CENTER 🚨🚨🚨")
        print("=" * 80)
        
        # Test 1: Critical Login Tests
        print("\n" + "=" * 50)
        print("1. CRITICAL LOGIN TESTS")
        print("=" * 50)
        
        doctor_login_success = self.test_critical_login_doctor()
        admin_login_success = self.test_critical_login_admin()
        
        # Test 2: Critical Appointments Tests
        print("\n" + "=" * 50)
        print("2. CRITICAL APPOINTMENTS TESTS")
        print("=" * 50)
        
        all_appointments_success = self.test_critical_appointments_all()
        doctor_appointments_success = self.test_critical_appointments_by_doctor()
        create_appointment_success = self.test_critical_create_appointment()
        
        # Test 3: Critical Users Test
        print("\n" + "=" * 50)
        print("3. CRITICAL USERS TEST")
        print("=" * 50)
        
        users_success = self.test_critical_users_with_doctors()
        
        # Summary
        print("\n" + "=" * 80)
        print("🚨 CRITICAL FIXES TEST SUMMARY")
        print("=" * 80)
        
        print(f"\n📊 Overall Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        print(f"\n🔐 LOGIN TESTS:")
        print(f"   Doctor Login: {'✅ PASS' if doctor_login_success else '❌ FAIL'}")
        print(f"   Admin Login: {'✅ PASS' if admin_login_success else '❌ FAIL'}")
        
        print(f"\n📅 APPOINTMENTS TESTS:")
        print(f"   Get All Appointments: {'✅ PASS' if all_appointments_success else '❌ FAIL'}")
        print(f"   Get Doctor Appointments: {'✅ PASS' if doctor_appointments_success else '❌ FAIL'}")
        print(f"   Create New Appointment: {'✅ PASS' if create_appointment_success else '❌ FAIL'}")
        
        print(f"\n👥 USERS TEST:")
        print(f"   Users with Doctor Roles: {'✅ PASS' if users_success else '❌ FAIL'}")
        
        if self.critical_issues:
            print(f"\n🚨 CRITICAL ISSUES FOUND ({len(self.critical_issues)}):")
            for i, issue in enumerate(self.critical_issues, 1):
                print(f"   {i}. {issue}")
        else:
            print(f"\n🎉 NO CRITICAL ISSUES FOUND! All fixes are working correctly.")
        
        return len(self.critical_issues) == 0

def main():
    tester = CriticalFixesTester()
    success = tester.run_all_critical_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())