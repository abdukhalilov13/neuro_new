# БАЗА ДАННЫХ NEURO.UZ - ПОЛНАЯ СТРУКТУРА

## УЧЕТНЫЕ ДАННЫЕ ДЛЯ ВХОДА

### АДМИН-ПАНЕЛЬ
```
Email: admin@neuro.uz
Password: testpassword
Role: admin

Email: testuser@neuro.uz  
Password: newpassword456
Role: admin
```

### КАБИНЕТ ВРАЧА
```
Email: kariev@neuro.uz
Password: demo123
Doctor ID: b3887eb2-b05a-4917-893a-e78a0a11bd92

Email: asadullaev@neuro.uz
Password: demo123  
Doctor ID: adcefcc2-9bfe-494a-b403-4bc69bde115a

Email: kodashev@neuro.uz
Password: demo123
Doctor ID: c6e2cb32-197f-4a13-8c24-226a27f1f1e5

Email: salimov@neuro.uz
Password: demo123
Doctor ID: 961cc2ac-d521-46e1-a902-1f4d8d277232

Email: yuldasheva@neuro.uz
Password: demo123
Doctor ID: 9208d149-9ab0-4579-8348-e0809c6566dd
```

## API ENDPOINTS

```
BASE_URL: https://0c0559be-4033-4575-aa41-d05f1cf33531.preview.emergentagent.com/api

POST /login - аутентификация
GET /users - список пользователей  
PUT /users/{id} - обновление пользователя

GET /doctors - список врачей
POST /doctors - создание врача
PUT /doctors/{id} - обновление врача
DELETE /doctors/{id} - удаление врача

GET /departments - список отделений
POST /departments - создание отделения
PUT /departments/{id} - обновление отделения
DELETE /departments/{id} - удаление отделения

GET /services - список услуг
POST /services - создание услуги
PUT /services/{id} - обновление услуги
DELETE /services/{id} - удаление услуги

GET /news - список новостей
POST /news - создание новости
PUT /news/{id} - обновление новости
DELETE /news/{id} - удаление новости

GET /gallery - галерея изображений
POST /gallery - добавление изображения
PUT /gallery/{id} - обновление изображения
DELETE /gallery/{id} - удаление изображения

GET /events - список событий
POST /events - создание события
PUT /events/{id} - обновление события
DELETE /events/{id} - удаление события

GET /leadership - руководство
POST /leadership - добавление руководителя
PUT /leadership/{id} - обновление руководителя
DELETE /leadership/{id} - удаление руководителя

GET /appointments - записи на прием
POST /appointments - создание записи
PUT /appointments/{id} - обновление записи

GET /job-applications - заявки на работу
POST /job-applications - создание заявки
```

## СТРУКТУРА КОЛЛЕКЦИЙ

### USERS (Пользователи)
```json
{
  "_id": "ObjectId",
  "id": "UUID", 
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin|doctor|manager",
  "status": "active|inactive",
  "doctorId": "UUID|null",
  "created_at": "ISO Date",
  "updated_at": "ISO Date"
}
```

### DOCTORS (Врачи)
```json
{
  "_id": "ObjectId",
  "id": "UUID",
  "name": "string",
  "specialization": "string", 
  "experience": "string",
  "image": "URL",
  "email": "string",
  "phone": "string",
  "reception": "string",
  "department_id": "string",
  "is_active": "boolean"
}
```

### DEPARTMENTS (Отделения)
```json
{
  "_id": "ObjectId", 
  "id": "UUID",
  "name_ru": "string",
  "name_uz": "string", 
  "name_en": "string",
  "description_ru": "string",
  "description_uz": "string",
  "description_en": "string", 
  "head_doctor": "string",
  "phone": "string",
  "is_active": "boolean"
}
```

### SERVICES (Услуги)
```json
{
  "_id": "ObjectId",
  "id": "UUID", 
  "name": "string",
  "category": "string",
  "description": "string",
  "price": "number",
  "is_active": "boolean"
}
```

### NEWS (Новости)
```json
{
  "_id": "ObjectId",
  "id": "UUID",
  "title": "string",
  "excerpt": "string", 
  "content": "string",
  "image": "URL",
  "date": "string",
  "is_published": "boolean"
}
```

### GALLERY (Галерея)
```json
{
  "_id": "ObjectId",
  "id": "UUID",
  "url": "URL",
  "alt": "string",
  "category": "string", 
  "is_active": "boolean"
}
```

### EVENTS (События)
```json
{
  "_id": "ObjectId",
  "id": "UUID",
  "title": "string",
  "description": "string",
  "date": "string",
  "time": "string",
  "location": "string",
  "type": "string",
  "is_active": "boolean"
}
```

### LEADERSHIP (Руководство)
```json
{
  "_id": "ObjectId", 
  "id": "UUID",
  "name_ru": "string",
  "name_uz": "string",
  "name_en": "string",
  "position_ru": "string", 
  "position_uz": "string",
  "position_en": "string",
  "image": "URL",
  "phone": "string",
  "email": "string",
  "biography_ru": "string",
  "biography_uz": "string", 
  "biography_en": "string",
  "is_active": "boolean"
}
```

### APPOINTMENTS (Записи)
```json
{
  "id": "string",
  "doctorId": "string", 
  "doctorName": "string",
  "date": "string",
  "time": "string",
  "patient": {
    "name": "string",
    "phone": "string",
    "email": "string", 
    "age": "number",
    "complaint": "string"
  },
  "status": "pending|confirmed|completed|cancelled",
  "type": "string",
  "createdAt": "ISO Date"
}
```

### JOB_APPLICATIONS (Заявки на работу)
```json
{
  "id": "number",
  "vacancyId": "number",
  "vacancyTitle": "string",
  "applicant": {
    "name": "string",
    "phone": "string", 
    "email": "string",
    "experience": "string",
    "education": "string",
    "coverLetter": "string"
  },
  "submittedAt": "ISO Date",
  "status": "new|reviewed|accepted|rejected"
}
```

## СВЯЗИ МЕЖДУ КОЛЛЕКЦИЯМИ

```
users.doctorId → doctors.id (связь аккаунта с врачом)
doctors.department_id → departments.id (врач принадлежит отделению)
appointments.doctorId → doctors.id (запись к врачу)
```