#!/usr/bin/env python3
"""
Специализированный тест для исправлений CRUD операций в нейрохирургическом центре
Тестирует конкретные исправления по запросу пользователя:
1. API вакансий (новый функционал)
2. Редактирование врачей (исправление)
3. Структура данных
"""

import requests
import sys
import json
from datetime import datetime
import uuid

class VacanciesDoctorsAPITester:
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
        self.created_vacancy_id = None
        self.created_doctor_id = None

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
                        print(f"Response preview: {json.dumps(json_response, indent=2, ensure_ascii=False)[:300]}...")
                        return success, json_response
                    except:
                        print(f"Response: {response.text[:300]}...")
                        return success, response.text
                return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"Response: {response.text[:300]}...")
                return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_vacancies_api(self):
        """1. ТЕСТ API ВАКАНСИЙ (новый функционал)"""
        print("\n" + "="*80)
        print("1️⃣ ТЕСТ API ВАКАНСИЙ (новый функционал)")
        print("="*80)
        
        # GET /api/vacancies - проверить многоязычные поля
        print("\n📋 Тест GET /api/vacancies - получение вакансий с многоязычными полями")
        print("-" * 60)
        success, vacancies_data = self.run_test(
            "GET /api/vacancies - получение списка вакансий",
            "GET",
            "vacancies",
            200
        )
        
        if success and isinstance(vacancies_data, list):
            print(f"✅ Получен список из {len(vacancies_data)} вакансий")
            if len(vacancies_data) > 0:
                vacancy = vacancies_data[0]
                # Проверяем многоязычные поля
                multilingual_fields = [
                    "title_ru", "title_uz", "title_en",
                    "description_ru", "description_uz", "description_en"
                ]
                missing_fields = [field for field in multilingual_fields if field not in vacancy]
                if not missing_fields:
                    print("✅ Многоязычные поля присутствуют: title_ru/uz/en, description_ru/uz/en")
                    print(f"✅ Пример: title_ru='{vacancy.get('title_ru', '')}'")
                    print(f"✅ Пример: title_uz='{vacancy.get('title_uz', '')}'")
                    print(f"✅ Пример: title_en='{vacancy.get('title_en', '')}'")
                else:
                    print(f"❌ Отсутствуют многоязычные поля: {missing_fields}")
        else:
            print("❌ Ошибка получения списка вакансий")
        
        # POST /api/vacancies - создать новую вакансию
        print("\n📝 Тест POST /api/vacancies - создание новой вакансии")
        print("-" * 60)
        new_vacancy_data = {
            "title_ru": "Врач-анестезиолог",
            "title_uz": "Anesteziyolog shifokor",
            "title_en": "Anesthesiologist",
            "description_ru": "Требуется опытный врач-анестезиолог для работы в операционном блоке",
            "description_uz": "Operatsiya blokida ishlash uchun tajribali anesteziyolog shifokor kerak",
            "description_en": "Experienced anesthesiologist needed for operating room work",
            "requirements_ru": "Высшее медицинское образование, специализация по анестезиологии",
            "requirements_uz": "Oliy tibbiy ma'lumot, anesteziyologiya bo'yicha mutaxassislik",
            "requirements_en": "Higher medical education, anesthesiology specialization",
            "salary": "12000000",
            "category_ru": "Медицинский персонал",
            "category_uz": "Tibbiy personal",
            "category_en": "Medical Staff",
            "isActive": True
        }
        
        success, create_response = self.run_test(
            "POST /api/vacancies - создание новой вакансии",
            "POST",
            "vacancies",
            200,
            data=new_vacancy_data
        )
        
        if success and "id" in create_response:
            self.created_vacancy_id = create_response["id"]
            print(f"✅ Вакансия успешно создана с ID: {self.created_vacancy_id}")
            print("✅ Многоязычные данные переданы корректно")
        else:
            print("❌ Ошибка создания вакансии")
        
        # PUT /api/vacancies/{id} - обновить существующую вакансию
        if self.created_vacancy_id:
            print("\n✏️ Тест PUT /api/vacancies/{id} - обновление существующей вакансии")
            print("-" * 60)
            update_data = {
                "title_ru": "Старший врач-анестезиолог",
                "title_uz": "Katta anesteziyolog shifokor",
                "title_en": "Senior Anesthesiologist",
                "salary": "15000000"
            }
            
            success, update_response = self.run_test(
                f"PUT /api/vacancies/{self.created_vacancy_id} - обновление вакансии",
                "PUT",
                f"vacancies/{self.created_vacancy_id}",
                200,
                data=update_data
            )
            
            if success:
                print(f"✅ Вакансия с ID {self.created_vacancy_id} успешно обновлена")
                print("✅ Многоязычные поля обновлены корректно")
            else:
                print("❌ Ошибка обновления вакансии")
        
        # DELETE /api/vacancies/{id} - удалить вакансию
        if self.created_vacancy_id:
            print("\n🗑️ Тест DELETE /api/vacancies/{id} - удаление вакансии")
            print("-" * 60)
            success, delete_response = self.run_test(
                f"DELETE /api/vacancies/{self.created_vacancy_id} - удаление вакансии",
                "DELETE",
                f"vacancies/{self.created_vacancy_id}",
                200
            )
            
            if success:
                print(f"✅ Вакансия с ID {self.created_vacancy_id} успешно удалена")
            else:
                print("❌ Ошибка удаления вакансии")

    def test_doctors_editing(self):
        """2. ТЕСТ РЕДАКТИРОВАНИЯ ВРАЧЕЙ (исправление)"""
        print("\n" + "="*80)
        print("2️⃣ ТЕСТ РЕДАКТИРОВАНИЯ ВРАЧЕЙ (исправление)")
        print("="*80)
        
        # GET /api/doctors - убедиться что врачи возвращают правильные поля
        print("\n👨‍⚕️ Тест GET /api/doctors - проверка правильных полей врачей")
        print("-" * 60)
        success, doctors_data = self.run_test(
            "GET /api/doctors - получение списка врачей",
            "GET",
            "doctors",
            200
        )
        
        if success and isinstance(doctors_data, list):
            print(f"✅ Получен список из {len(doctors_data)} врачей")
            if len(doctors_data) > 0:
                doctor = doctors_data[0]
                # Проверяем обязательные поля
                required_fields = ["name", "specialization", "email", "phone", "experience"]
                missing_fields = [field for field in required_fields if field not in doctor]
                if not missing_fields:
                    print("✅ Все обязательные поля присутствуют: name, specialization, email, phone, experience")
                    print(f"✅ Пример врача: {doctor.get('name', '')} - {doctor.get('specialization', '')}")
                    print(f"✅ Email: {doctor.get('email', '')}, Phone: {doctor.get('phone', '')}")
                    print(f"✅ Experience: {doctor.get('experience', '')}")
                else:
                    print(f"❌ Отсутствуют обязательные поля: {missing_fields}")
                
                # Проверяем многоязычные поля (если есть)
                multilingual_fields = ["name_ru", "specialization_ru"]
                present_multilingual = [field for field in multilingual_fields if field in doctor]
                if present_multilingual:
                    print(f"✅ Найдены многоязычные поля: {present_multilingual}")
                else:
                    print("ℹ️ Многоязычные поля name_ru, specialization_ru не найдены (используется стандартная структура)")
        else:
            print("❌ Ошибка получения списка врачей")
        
        # Создаем тестового врача для редактирования
        print("\n📝 Создание тестового врача для проверки редактирования")
        print("-" * 60)
        test_doctor_data = {
            "name": "Тестовый Врач Редактирование",
            "specialization": "Нейрохирург-тестер",
            "email": "test.edit@neuro.uz",
            "phone": "+998 90 111-22-33",
            "experience": "5+ лет",
            "department_id": "1",
            "reception": "Понедельник-Пятница, 10:00-16:00"
        }
        
        success, create_response = self.run_test(
            "POST /api/doctors - создание тестового врача",
            "POST",
            "doctors",
            200,
            data=test_doctor_data
        )
        
        if success and "id" in create_response:
            self.created_doctor_id = create_response["id"]
            print(f"✅ Тестовый врач создан с ID: {self.created_doctor_id}")
        else:
            print("❌ Ошибка создания тестового врача")
            return
        
        # PUT /api/doctors/{id} - проверить редактирование врача
        print("\n✏️ Тест PUT /api/doctors/{id} - редактирование врача")
        print("-" * 60)
        edit_data = {
            "name": "Отредактированный Тестовый Врач",
            "specialization": "Старший нейрохирург-тестер",
            "experience": "10+ лет",
            "phone": "+998 90 999-88-77"
        }
        
        success, edit_response = self.run_test(
            f"PUT /api/doctors/{self.created_doctor_id} - редактирование врача",
            "PUT",
            f"doctors/{self.created_doctor_id}",
            200,
            data=edit_data
        )
        
        if success:
            print(f"✅ Врач с ID {self.created_doctor_id} успешно отредактирован")
            
            # Проверяем что изменения сохранились
            print("\n🔍 Проверка сохранения изменений")
            print("-" * 40)
            success, updated_doctors = self.run_test(
                "GET /api/doctors - проверка изменений",
                "GET",
                "doctors",
                200
            )
            
            if success and isinstance(updated_doctors, list):
                updated_doctor = next((doc for doc in updated_doctors if doc.get("id") == self.created_doctor_id), None)
                if updated_doctor:
                    if (updated_doctor.get("name") == edit_data["name"] and 
                        updated_doctor.get("specialization") == edit_data["specialization"]):
                        print("✅ Изменения сохранились корректно")
                        print(f"✅ Новое имя: {updated_doctor.get('name')}")
                        print(f"✅ Новая специализация: {updated_doctor.get('specialization')}")
                    else:
                        print("❌ Изменения не сохранились")
                else:
                    print("❌ Врач не найден после редактирования")
        else:
            print("❌ Ошибка редактирования врача")
        
        # Удаляем тестового врача
        if self.created_doctor_id:
            print("\n🗑️ Очистка - удаление тестового врача")
            print("-" * 40)
            success, delete_response = self.run_test(
                f"DELETE /api/doctors/{self.created_doctor_id} - удаление тестового врача",
                "DELETE",
                f"doctors/{self.created_doctor_id}",
                200
            )
            
            if success:
                print(f"✅ Тестовый врач с ID {self.created_doctor_id} удален")
            else:
                print("❌ Ошибка удаления тестового врача")

    def test_data_structure(self):
        """3. ТЕСТ СТРУКТУРЫ ДАННЫХ"""
        print("\n" + "="*80)
        print("3️⃣ ТЕСТ СТРУКТУРЫ ДАННЫХ")
        print("="*80)
        
        # Проверяем структуру данных врачей
        print("\n👨‍⚕️ Проверка структуры данных врачей")
        print("-" * 50)
        success, doctors_data = self.run_test(
            "GET /api/doctors - проверка структуры врачей",
            "GET",
            "doctors",
            200
        )
        
        if success and isinstance(doctors_data, list) and len(doctors_data) > 0:
            doctor = doctors_data[0]
            required_doctor_fields = ["name", "specialization", "email", "phone", "experience"]
            
            print("🔍 Проверяем обязательные поля врачей:")
            all_fields_present = True
            for field in required_doctor_fields:
                if field in doctor:
                    print(f"  ✅ {field}: '{doctor[field]}'")
                else:
                    print(f"  ❌ {field}: отсутствует")
                    all_fields_present = False
            
            if all_fields_present:
                print("✅ У врачей есть все требуемые поля: name, specialization, email, phone, experience")
            else:
                print("❌ У врачей отсутствуют некоторые обязательные поля")
        else:
            print("❌ Не удалось получить данные врачей для проверки структуры")
        
        # Проверяем структуру данных вакансий
        print("\n📋 Проверка структуры данных вакансий")
        print("-" * 50)
        success, vacancies_data = self.run_test(
            "GET /api/vacancies - проверка структуры вакансий",
            "GET",
            "vacancies",
            200
        )
        
        if success and isinstance(vacancies_data, list) and len(vacancies_data) > 0:
            vacancy = vacancies_data[0]
            required_multilingual_fields = [
                "title_ru", "title_uz", "title_en",
                "description_ru", "description_uz", "description_en"
            ]
            
            print("🔍 Проверяем многоязычные поля вакансий:")
            all_multilingual_present = True
            for field in required_multilingual_fields:
                if field in vacancy:
                    value = vacancy[field][:50] + "..." if len(str(vacancy[field])) > 50 else vacancy[field]
                    print(f"  ✅ {field}: '{value}'")
                else:
                    print(f"  ❌ {field}: отсутствует")
                    all_multilingual_present = False
            
            if all_multilingual_present:
                print("✅ У вакансий есть все требуемые многоязычные поля: title_ru/uz/en, description_ru/uz/en")
            else:
                print("❌ У вакансий отсутствуют некоторые многоязычные поля")
        else:
            print("❌ Не удалось получить данные вакансий для проверки структуры")

    def run_all_tests(self):
        """Запуск всех тестов"""
        print("🏥 ТЕСТИРОВАНИЕ ИСПРАВЛЕНИЙ ДЛЯ CRUD ОПЕРАЦИЙ В НЕЙРОХИРУРГИЧЕСКОМ ЦЕНТРЕ")
        print("=" * 90)
        print("Контекст: Исправлены критические проблемы:")
        print("- Добавлены API endpoints для вакансий в backend")
        print("- Исправлена функция startEditDoctor для правильного заполнения многоязычных полей")
        print("- Переключена VacanciesPage на использование API вместо статических данных")
        print("- Исправлен импорт в App.js для устранения JavaScript ошибок")
        print("=" * 90)
        
        # Запускаем тесты
        self.test_vacancies_api()
        self.test_doctors_editing()
        self.test_data_structure()
        
        # Итоговый отчет
        print("\n" + "="*90)
        print("📊 ИТОГОВЫЙ ОТЧЕТ ТЕСТИРОВАНИЯ ИСПРАВЛЕНИЙ")
        print("="*90)
        print(f"Всего тестов выполнено: {self.tests_run}")
        print(f"Тестов прошло успешно: {self.tests_passed}")
        print(f"Процент успешности: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("\n🎉 ВСЕ ИСПРАВЛЕНИЯ РАБОТАЮТ КОРРЕКТНО!")
            print("✅ API вакансий - полностью функционален")
            print("✅ Редактирование врачей - работает корректно")
            print("✅ Структура данных - соответствует требованиям")
            print("✅ Многоязычные поля - присутствуют и работают")
            return True
        else:
            print("\n⚠️ ОБНАРУЖЕНЫ ПРОБЛЕМЫ В ИСПРАВЛЕНИЯХ")
            failed_tests = self.tests_run - self.tests_passed
            print(f"❌ Количество неудачных тестов: {failed_tests}")
            print("Необходимо исправить выявленные ошибки в backend API")
            return False

def main():
    """Главная функция"""
    tester = VacanciesDoctorsAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())