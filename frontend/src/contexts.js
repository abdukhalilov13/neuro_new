import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from './api';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const translations = {
    ru: {
      // Navigation
      home: 'Главная',
      about: 'О центре',
      departments: 'Отделения',
      doctors: 'Врачи',
      services: 'Услуги',
      news: 'Новости',
      contact: 'Контакты',
      contacts: 'Контакты',
      appointment: 'Запись на прием',
      gallery: 'Галерея',
      vacancies: 'Вакансии',
      testAccounts: 'Тестовые аккаунты',
      doctorDashboard: 'Кабинет врача',
      adminPanel: 'Админ-панель',
      centerOfNeurosurgery: 'Центр Нейрохирургии',
      navigation: 'Навигация',
      
      // Working hours and contact
      workingHours: 'Режим работы',
      mondayFriday: 'Пн-Пт',
      saturday: 'Суббота',
      sunday: 'Воскресенье',
      emergencyHelp: 'Экстренная помощь',
      centerName: 'Республиканский Научный Центр Нейрохирургии',
      allRightsReserved: 'Все права защищены',
      footerDescription: 'Ведущий центр нейрохирургии в Центральной Азии с более чем 25-летним опытом.',
      consultationBooking: 'Записаться на консультацию',
      weekdaysReception: 'Пн-Пт 9:00-17:00',
      tuesdaySaturdayReception: 'Вт-Сб 9:00-17:00',
      
      // Homepage
      leadingCenter: 'Ведущий центр нейрохирургии в Центральной Азии',
      yearsExperience: 'Более 25 лет опыта в лечении сложнейших заболеваний нервной системы',
      bookAppointment: 'Записаться на прием',
      aboutCenter: 'О центре',
      contactUs: 'Связаться с нами',
      address: 'Адрес',
      emergency24: 'Экстренная помощь 24/7',
      
      // Statistics
      centerInNumbers: 'Центр в цифрах',
      factsAchievements: 'Факты и достижения нашего центра',
      totalBeds: 'Общих койко-мест',
      plannedPlaces: 'Плановых мест',
      childrenPlaces: 'Детских мест',
      patientsPerYear: 'Пациентов в год',
      
      // Departments
      ourDepartments: 'Наши отделения',
      specializedDivisions: 'Специализированные подразделения центра',
      learnMore: 'Подробнее',
      allDepartments: 'Все отделения',
      
      // News
      latestNews: 'Последние новости',
      centerEvents: 'События и достижения центра',
      readMore: 'Читать далее',
      allNews: 'Все новости',
      
      // About page
      aboutPageTitle: 'О центре',
      aboutPageSubtitle: 'Республиканский Научный Центр Нейрохирургии - ведущее медицинское учреждение Центральной Азии в области нейрохирургии',
      historyMission: 'История и миссия',
      aboutHistoryText1: 'В 1986 году организовано Научное общество нейрохирургов, а в 1998 г. создана Ассоциация нейрохирургов Узбекистана, которая является также и членом Ассоциации нейрохирургов стран Тихоокеанского региона и Всемирной Ассоциации нейрохирургов (WFNS).',
      aboutHistoryText2: 'Общество сотрудничает с научными коллективами и отдельными учеными многих стран дальнего и ближнего зарубежья (США, Германия, Россия, Индия, Азербайджан, Украина, Белоруссия, Казахстан, Киргизия, Грузия, Таджикистан и др.).',
      aboutHistoryText3: 'Основными целями общества нейрохирургов являются: содействие реализации творческого потенциала членов Общества в интересах решения актуальных теоретических, практических и научных проблем в области нейрохирургии.',
      associationTasks: 'Задачи Ассоциации:',
      task1: 'Осуществление мероприятий, направленных на повышение квалификации членов Ассоциации, практическая и (или) научная деятельность которых связана с нейрохирургией',
      task2: 'Содействие развитию приоритетных направлений научных исследований в области нейрохирургии',
      task3: 'Оказание научной и практической помощи членам Общества, молодым ученым и врачам, содействие совершенствованию системы медицинского образования и повышению профессиональной квалификации специалистов, развитию профессиональной, этической и деонтологической традиций в медицине',
      task4: 'Развитие сотрудничества с международными и национальными научными медицинскими обществами и ассоциациями',
      yearFounded: 'Год основания',
      patientsPerYear: 'Пациентов в год',
      centerLeadership: 'Руководство центра',
      experiencedSpecialists: 'Опытные специалисты, возглавляющие развитие нейрохирургии в республике',
      readBiography: 'Читать биографию',
      biography: 'Биография',
      needConsultation: 'Нужна консультация по услугам?',
      contactSpecialists: 'Наши специалисты ответят на все ваши вопросы и помогут выбрать оптимальное лечение',
      scheduleConsultation: 'Записаться на консультацию',
      contactUs: 'Связаться с нами',
      
      // News page
      newsAndEvents: 'Новости и события',
      latestNewsDescription: 'Последние новости, достижения и события нашего центра (2 новости)',
      upcomingEvents: 'Ближайшие события',
      readFull: 'Читать полностью',
      
      // Contact page
      contacts: 'Контакты',
      contactDescription: 'Свяжитесь с нами для получения консультации или записи на прием',
      contactInfo: 'Контактная информация',
      address: 'Адрес',
      phones: 'Телефоны',
      workingHours: 'Режим работы',
      emergency24: 'Экстренная помощь: 24/7',
      writeToUs: 'Написать нам',
      yourName: 'Ваше имя',
      message: 'Сообщение',
      sendMessage: 'Отправить сообщение',
      membershipInfo: 'Вступление в Ассоциацию нейрохирургов Узбекистана',
      membershipDescription: 'Для вступления в Ассоциацию нейрохирургов Узбекистана необходимо предоставить:',
      membershipReq1: 'Заявление на имя председателя Ассоциации Кариева Г.М.',
      membershipReq2: 'Квитанцию об уплате 1 размера минимальной заработной платы.',
      membershipRequisites: 'Реквизиты Ассоциации нейрохирургов Узбекистана:',
      
      // Services page additional translations
      serviceConsultation: 'Нужна консультация?',
      serviceContactText: 'Свяжитесь с нами для получения профессиональной медицинской помощи',
      scheduleAppointment: 'Записаться на прием',
      
      // Additional missing translations
      professionalTeam: 'Профессиональная команда',
      workWithBestSpecialists: 'Работайте с лучшими специалистами в области нейрохирургии',
      modernEquipment: 'Современное оборудование',
      latestTechnologies: 'Новейшие технологии и методы лечения',
      competitiveSalary: 'Достойная оплата',
      competitiveSalaryDesc: 'Конкурентная заработная плата и премии',
      notFoundVacancy: 'Не нашли подходящую вакансию?',
      sendResume: 'Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящих позиций',
      hrDepartment: 'Отдел кадров',
      upcomingEvents: 'Ближайшие события',
      needConsultationQuestion: 'Нужна консультация?',
      contactForHelp: 'Свяжитесь с нами для получения профессиональной медицинской помощи',
      
      // Job application form
      fullName: 'ФИО',
      workExperience: 'Опыт работы',
      education: 'Образование',
      coverLetter: 'Сопроводительное письмо',
      apply: 'Откликнуться',
      submitApplication: 'Отправить заявку',
      applicationSent: 'Заявка отправлена',
      applicationSuccess: 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
      
      // Gallery
      allPhotos: 'Все фотографии',
      surgical: 'Операционные',
      equipment: 'Оборудование', 
      buildingPhotos: 'Здание центра',
      staff: 'Персонал',
      patients: 'Пациенты',
      
      // Services
      ourServices: 'Наши услуги',
      medicalServices: 'Медицинские услуги центра',
      consultations: 'Консультации',
      diagnostics: 'Диагностика',
      surgery: 'Хирургия',
      price: 'Цена',
      currency: 'сум',
      
      // Doctors
      ourDoctors: 'Наши врачи',
      experiencedSpecialistsSubtitle: 'Опытные специалисты с многолетним стажем',
      experience: 'Опыт',
      years: 'лет',
      reception: 'Прием',
      
      // Common
      phone: 'Телефон',
      email: 'Email',
      save: 'Сохранить',
      cancel: 'Отмена',
      edit: 'Редактировать',
      delete: 'Удалить',
      add: 'Добавить',
      search: 'Поиск',
      filter: 'Фильтр',
      close: 'Закрыть',
      loading: 'Загрузка...',
      
      // Admin panel
      adminPanel: 'Админ-панель',
      login: 'Войти',
      logout: 'Выйти',
      dashboard: 'Панель управления',
      statistics: 'Статистика',
      events: 'События',
      settings: 'Настройки',
      
      // Events
      upcomingEvents: 'Ближайшие события',
      addEvent: 'Добавить событие',
      editEvent: 'Редактировать событие',
      eventTitle: 'Название события',
      eventDate: 'Дата',
      eventTime: 'Время',
      eventLocation: 'Место проведения',
      eventType: 'Тип события',
      eventDescription: 'Описание',
      conference: 'Конференция',
      openDay: 'День открытых дверей',
      masterclass: 'Мастер-класс',
      seminar: 'Семинар',
      update: 'Обновить',
      
      // Additional translations
      building: 'Здание центра',
      equipment: 'Медицинское оборудование',
      staff: 'Персонал',
      operations: 'Операции',
      mainHall: 'Главный холл',
      
      // Appointment booking
      appointmentBooking: 'Запись на прием',
      appointmentDescription: 'Выберите удобное время для консультации с нашими специалистами',
      selectDoctor: 'Выберите врача',
      selectDate: 'Выберите дату',
      selectTime: 'Выберите время',
      selectDateAndTime: 'Выберите дату и время',
      doctorSelection: 'Выбор врача',
      dateAndTime: 'Дата и время',
      personalData: 'Личные данные',
      doctor: 'Врач',
      available: 'доступно',
      next: 'Далее',
      back: 'Назад',
      appointmentDate: 'Дата приема',
      appointmentTime: 'Время приема',
      firstName: 'Имя',
      lastName: 'Фамилия',
      birthDate: 'Дата рождения',
      address: 'Адрес',
      complaintsAndSymptoms: 'Жалобы и симптомы',
      describeSymptomsPlaceholder: 'Опишите ваши симптомы и жалобы',
      submitting: 'Отправка...',
      appointmentSuccessTitle: 'Запись успешно создана!',
      appointmentSuccessMessage: 'Ваша запись на прием к врачу',
      on: 'на',
      at: 'в',
      appointmentCreatedSuccessfully: 'успешно создана.',
      contactConfirmation: 'Мы свяжемся с вами для подтверждения записи.',
      toHomePage: 'На главную',
      bookAnotherAppointment: 'Записаться еще раз',
      enterName: 'Введите имя',
      enterSurname: 'Введите фамилию',
      enterPhone: 'Введите телефон',
      invalidPhoneFormat: 'Неверный формат телефона',
      submissionError: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.',
      
      // About page translations
      aboutCenter: 'О центре',
      aboutCenterDescription: 'Ведущий центр нейрохирургии в Республике Узбекистан',
      aboutCenterTitle: 'Наша миссия',
      aboutCenterText1: 'Республиканский центр нейрохирургии является ведущим медицинским учреждением Узбекистана, специализирующимся на лечении заболеваний нервной системы.',
      aboutCenterText2: 'Наш центр оснащен самым современным медицинским оборудованием и располагает высококвалифицированными специалистами с многолетним опытом работы.',
      aboutCenterText3: 'Мы предоставляем комплексную медицинскую помощь, начиная от диагностики и консервативного лечения до сложнейших нейрохирургических операций.',
      centerBuilding: 'Здание центра',
      successfulOperations: 'Успешных операций',
      leadership: 'Руководство',
      leadershipDescription: 'Наш центр возглавляют выдающиеся специалисты с многолетним опытом работы в области нейрохирургии',
      videoGallery: 'Видео галерея',
      videoGalleryDescription: 'Познакомьтесь с нашим центром через видеоматериалы',
      operatingRoom: 'Операционная',
      medicalEquipment: 'Медицинское оборудование',
      patientTestimonials: 'Отзывы пациентов',
      
      // Footer translations
      careers: 'Вакансии',
      
      // Appointment booking
      appointmentBooking: 'Запись на прием',
      appointmentDescription: 'Выберите удобное время для консультации с нашими специалистами',
      selectDoctor: 'Выберите врача',
      selectDate: 'Выберите дату',
      selectTime: 'Выберите время',
      selectDateAndTime: 'Выберите дату и время',
      doctorSelection: 'Выбор врача',
      dateAndTime: 'Дата и время',
      personalData: 'Личные данные',
      doctor: 'Врач',
      available: 'доступно',
      next: 'Далее',
      back: 'Назад',
      appointmentDate: 'Дата приема',
      appointmentTime: 'Время приема',
      firstName: 'Имя',
      lastName: 'Фамилия',
      birthDate: 'Дата рождения',
      address: 'Адрес',
      complaintsAndSymptoms: 'Жалобы и симптомы',
      describeSymptomsPlaceholder: 'Опишите ваши симптомы и жалобы',
      submitting: 'Отправка...',
      bookAppointment: 'Записаться',
      appointmentSuccessTitle: 'Запись успешно создана!',
      appointmentSuccessMessage: 'Ваша запись на прием к врачу',
      on: 'на',
      at: 'в',
      appointmentCreatedSuccessfully: 'успешно создана.',
      contactConfirmation: 'Мы свяжемся с вами для подтверждения записи.',
      toHomePage: 'На главную',
      bookAnotherAppointment: 'Записаться еще раз',
      enterName: 'Введите имя',
      enterSurname: 'Введите фамилию',
      enterPhone: 'Введите телефон',
      invalidPhoneFormat: 'Неверный формат телефона',
      submissionError: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.',
      
      // About page translations
      aboutCenter: 'О центре',
      aboutCenterDescription: 'Ведущий центр нейрохирургии в Республике Узбекистан',
      aboutCenterTitle: 'Наша миссия',
      aboutCenterText1: 'Республиканский центр нейрохирургии является ведущим медицинским учреждением Узбекистана, специализирующимся на лечении заболеваний нервной системы.',
      aboutCenterText2: 'Наш центр оснащен самым современным медицинским оборудованием и располагает высококвалифицированными специалистами с многолетним опытом работы.',
      aboutCenterText3: 'Мы предоставляем комплексную медицинскую помощь, начиная от диагностики и консервативного лечения до сложнейших нейрохирургических операций.',
      centerBuilding: 'Здание центра',
      successfulOperations: 'Успешных операций',
      leadership: 'Руководство',
      leadershipDescription: 'Наш центр возглавляют выдающиеся специалисты с многолетним опытом работы в области нейрохирургии',
      videoGallery: 'Видео галерея',
      videoGalleryDescription: 'Познакомьтесь с нашим центром через видеоматериалы',
      operatingRoom: 'Операционная',
      medicalEquipment: 'Медицинское оборудование',
      patientTestimonials: 'Отзывы пациентов',
      biography: 'Биография',
      
      // Appointment form
      appointmentForm: 'Форма записи на прием',
      patientName: 'ФИО пациента',
      patientPhone: 'Телефон',
      patientEmail: 'Email',
      preferredDate: 'Предпочитаемая дата',
      preferredTime: 'Предпочитаемое время',
      doctorChoice: 'Выбор врача',
      serviceChoice: 'Выбор услуги',
      additionalInfo: 'Дополнительная информация',
      submitAppointment: 'Отправить заявку',
      
      // Gallery
      galleryCategories: 'Категории галереи',
      viewAll: 'Смотреть все',
      
      // Footer additional
      quickLinks: 'Быстрые ссылки',
      socialNetworks: 'Социальные сети',
      followUs: 'Следите за нами',
      
      // Additional keys
      surgicalTreatment: 'Хирургическое лечение',
      postOperativeRehabilitation: 'Послеоперационная реабилитация',
      outpatientObservation: 'Амбулаторное наблюдение',
      highQualifiedSpecialists: 'Команда высококвалифицированных специалистов с многолетним опытом',
      fullRangeServices: 'Полный спектр медицинских услуг в области нейрохирургии с прозрачным ценообразованием',
      
      // Pages content translations
      historyAndMission: 'История и миссия',
      foundedYear: 'Год основания',
      patientsPerYear: 'Пациентов в год',
      centerLeadership: 'Руководство центра',
      experiencedSpecialistsLeading: 'Опытные специалисты, возглавляющие развитие нейрохирургии в республике',
      
      // About page content from screenshots
      establishedText: 'В 1986 году организовано Научное общество нейрохирургов, а в 1998 г. создана Ассоциация нейрохирургов Узбекистана, которая является также и членом Ассоциации нейрохирургов стран Тюркоязычного региона и Всемирной Ассоциации нейрохирургов (WFNS).',
      cooperationText: 'Общество сотрудничает с научными коллективами и отдельными учеными многих стран дальнего и ближнего зарубежья (США, Германия, Россия, Индия, Азербайджан, Украина, Белоруссия, Казахстан, Кыргызстан, Грузия, Таджикистан и др.).',
      mainGoalsText: 'Основными целями общества нейрохирургов являются: содействие реализации творческого потенциала членов Общества в интересах решения актуальных теоретических, практических и научных проблем в области нейрохирургии.',
      associationTasks: 'Задачи Ассоциации:',
      task1: 'Осуществление мероприятий, направленных на повышение квалификации членов Ассоциации, практическая и (или) научная деятельность которых связана с нейрохирургией',
      task2: 'Содействие развитию приоритетных направлений научных исследований в области нейрохирургии',
      task3: 'Оказание научной и практической помощи членам Общества, молодым ученым и врачам, содействие совершенствованию системы медицинского образования и повышение профессиональной квалификации специалистов, развитие профессиональной, этической и деонтологической традиций в медицине',
      task4: 'Развитие сотрудничества с международными и национальными научными медицинскими обществами и ассоциациями',
      
      // Services page bottom section
      needConsultationServices: 'Нужна консультация по услугам?',
      specialistsAnswerServices: 'Наши специалисты ответят на все ваши вопросы и помогут выбрать оптимальное лечение',
      
      // Contact page translations
      contactInformation: 'Контактная информация',
      writeToUs: 'Написать нам',
      yourName: 'Ваше имя',
      enterYourName: 'Введите ваше имя',
      enterYourEmail: 'Введите ваш email',
      telephone: 'Телефон',
      message: 'Сообщение',
      enterYourMessage: 'Введите ваше сообщение',
      sendMessage: 'Отправить сообщение',
      workingHours: 'Режим работы',
      weekdays: 'Понедельник - Пятница: 8:00 - 18:00',
      saturday: 'Суббота: 9:00 - 15:00',
      sunday: 'Воскресенье: Выходной',
      emergencyHelp: 'Экстренная помощь: 24/7',
      joinNeurosurgeonsAssociation: 'Вступление в Ассоциацию нейрохирургов Узбекистана',
      joinAssociationText: 'Для вступления в Ассоциацию нейрохирургов Узбекистана необходимо предоставить:',
      applicationChairman: 'Заявление на имя председателя Ассоциации Кариева Г.М.',
      paymentReceipt: 'Квитанцию об уплате 1 размера минимальной заработной платы.',
      associationRequirements: 'Реквизиты Ассоциации нейрохирургов Узбекистана:',
      
      // News page translations
      latestNews: 'Последние новости, достижения и события нашего центра',
      readMore: 'Читать полностью',
      newsCount: 'новостей',
      
      // Appointment application
      applyForVacancy: 'Откликнуться на вакансию',
      applicationSent: 'Заявка отправлена!',
      applicationSentMessage: 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.',
      attachResume: 'Прикрепить резюме',
      coverLetter: 'Сопроводительное письмо',
      writeAboutYourself: 'Расскажите о себе и своем опыте',
      
      // Consultation section
      needConsultation: 'Нужна консультация по услугам?',
      specialistsWillAnswer: 'Наши специалисты ответят на все ваши вопросы и помогут выбрать оптимальное лечение',
      bookConsultation: 'Записаться на консультацию',
      contactUs: 'Связаться с нами',
      
      // Vacancies page
      joinProfessionalTeam: 'Присоединяйтесь к команде профессионалов в ведущем центре нейрохирургии',
      neurosurgeon: 'Врач-нейрохирург',
      neurosurgeryFullTime: 'Нейрохирургия, Полная занятость',
      mainRequirements: 'Основные требования:',
      higherMedicalEducation: 'Высшее медицинское образование',
      neurosurgerySpecialization: 'Специализация по нейрохирургии',
      experienceFrom3Years: 'Опыт работы от 3 лет',
      detailsAndApply: 'Подробнее и откликнуться',
      
      operatingRoomNurse: 'Медицинская сестра операционного блока',
      operatingBlockFullTime: 'Операционный блок, Полная занятость',
      secondaryMedicalEducation: 'Среднее медицинское образование',
      operatingNurseCertificate: 'Сертификат операционной медсестры',
      experienceFrom1Year: 'Опыт работы от 1 года',
      
      anesthesiologist: 'Врач-анестезиолог',
      anesthesiologyFullTime: 'Анестезиология и реанимация, Полная занятость',
      anesthesiologySpecialization: 'Специализация по анестезиологии',
      experienceFrom2Years: 'Опыт работы от 2 лет',
      
      whyWorkWithUs: 'Почему работать у нас?',
      professionalTeam: 'Профессиональная команда',
      workWithBestSpecialists: 'Работайте с лучшими специалистами в области нейрохирургии',
      modernEquipment: 'Современное оборудование',
      latestTechnologies: 'Новейшие технологии и методы лечения',
      decentSalary: 'Достойная оплата',
      competitiveSalary: 'Конкурентная заработная плата и премии',
      
      noSuitableVacancy: 'Не нашли подходящую вакансию?',
      sendResume: 'Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящих позиций',
      hrDepartment: 'Отдел кадров',
      
      // Gallery page
      centerPhotosDescription: 'Фотографии нашего центра, оборудования и работы наших специалистов',
      allPhotos: 'Все фотографии',
      operatingRooms: 'Операционные',
      equipment: 'Оборудование',
      centerBuilding: 'Здание центра',
      staff: 'Персонал',
      patients: 'Пациенты'
    },
    uz: {
      // Navigation
      home: 'Bosh sahifa',
      about: 'Markaz haqida',
      departments: 'Bo\'limlar',
      doctors: 'Shifokorlar',
      services: 'Xizmatlar',
      news: 'Yangiliklar',
      contact: 'Aloqa',
      contacts: 'Aloqa',
      appointment: 'Qabulga yozilish',
      gallery: 'Galereya',
      vacancies: 'Bo\'sh o\'rinlar',
      testAccounts: 'Test akkauntlari',
      doctorDashboard: 'Shifokor kabineti',
      adminPanel: 'Admin-panel',
      centerOfNeurosurgery: 'Neyroxirurgiya Markazi',
      navigation: 'Navigatsiya',
      
      // Working hours and contact
      workingHours: 'Ish vaqti',
      mondayFriday: 'Du-Ju',
      saturday: 'Shanba',
      sunday: 'Yakshanba',
      emergencyHelp: 'Shoshilinch yordam',
      centerName: 'Respublika Neyroxirurgiya Ilmiy Markazi',
      allRightsReserved: 'Barcha huquqlar himoyalangan',
      footerDescription: 'Markaziy Osiyodagi yetakchi neyroxirurgiya markazi, 25 yildan ortiq tajriba.',
      consultationBooking: 'Konsultatsiyaga yozilish',
      weekdaysReception: 'Du-Ju 9:00-17:00',
      tuesdaySaturdayReception: 'Se-Sh 9:00-17:00',
      
      // Homepage
      leadingCenter: 'Markaziy Osiyodagi yetakchi neyroxirurgiya markazi',
      yearsExperience: '25 yildan ortiq nerv sistemasi kasalliklarini davolash tajribasi',
      bookAppointment: 'Qabulga yozilish',
      aboutCenter: 'Markaz haqida',
      contactUs: 'Bog\'lanish',
      address: 'Manzil',
      emergency24: 'Shoshilinch yordam 24/7',
      
      // Statistics
      centerInNumbers: 'Markaz raqamlarda',
      factsAchievements: 'Markazimizning faktlari va yutuqlari',
      totalBeds: 'Jami yotoq o\'rinlari',
      plannedPlaces: 'Rejalashtirilgan o\'rinlar',
      childrenPlaces: 'Bolalar o\'rinlari',
      patientsPerYear: 'Yiliga bemorlar',
      
      // Departments
      ourDepartments: 'Bizning bo\'limlar',
      specializedDivisions: 'Markazning ixtisoslashgan bo\'limlari',
      learnMore: 'Batafsil',
      allDepartments: 'Barcha bo\'limlar',
      
      // News
      latestNews: 'So\'nggi yangiliklar',
      centerEvents: 'Markaz voqealari va yutuqlari',
      readMore: 'Davomini o\'qish',
      allNews: 'Barcha yangiliklar',
      
      // About page
      aboutPageTitle: 'Markaz haqida',
      aboutPageSubtitle: 'Respublika Neyroxirurgiya Ilmiy Markazi - Markaziy Osiyodagi neyroxirurgiya sohasidagi yetakchi tibbiyot muassasasi',
      historyMission: 'Tarix va missiya',
      aboutHistoryText1: '1986 yilda Neyroxirurglar ilmiy jamiyati tashkil etilgan, 1998 yilda O\'zbekiston neyroxirurglar assotsiatsiyasi yaratilgan, u Tinch okeani mintaqasi davlatlari neyroxirurglar assotsiatsiyasi va Butunjahon neyroxirurglar assotsiatsiyasi (WFNS) a\'zosi hisoblanadi.',
      aboutHistoryText2: 'Jamiyat uzoq va yaqin xorijiy mamlakatlarning (AQSh, Germaniya, Rossiya, Hindiston, Ozarbayjon, Ukraina, Belarus, Qozog\'iston, Qirg\'iziston, Gruziya, Tojikiston va boshqalar) ilmiy jamoalari va alohida olimlari bilan hamkorlik qiladi.',
      aboutHistoryText3: 'Neyroxirurglar jamiyatining asosiy maqsadlari: neyroxirurgiya sohasidagi dolzarb nazariy, amaliy va ilmiy muammolarni hal etish manfaatlarida jamiyat a\'zolarining ijodiy salohiyatini ro\'yobga chiqarishga ko\'maklashish.',
      associationTasks: 'Assotsiatsiya vazifalari:',
      task1: 'Amaliy va (yoki) ilmiy faoliyati neyroxirurgiya bilan bog\'liq bo\'lgan assotsiatsiya a\'zolarining malakasini oshirishga qaratilgan tadbirlarni amalga oshirish',
      task2: 'Neyroxirurgiya sohasidagi ustuvor ilmiy tadqiqot yo\'nalishlarini rivojlantirishga ko\'maklashish',
      task3: 'Jamiyat a\'zolariga, yosh olim va shifokoriarga ilmiy va amaliy yordam ko\'rsatish, tibbiy ta\'lim tizimini takomillashtirishga va mutaxassislarning kasbiy malakasini oshirishga ko\'maklashish',
      task4: 'Xalqaro va milliy ilmiy tibbiyot jamiyatlari va assotsiatsiyalar bilan hamkorlikni rivojlantirish',
      yearFounded: 'Tashkil etilgan yil',
      patientsPerYear: 'Yiliga bemorlar',
      centerLeadership: 'Markaz rahbariyati',
      experiencedSpecialists: 'Respublikada neyroxirurgiyani rivojlantirishga rahbarlik qilayotgan tajribali mutaxassislar',
      readBiography: 'Tarjimai holni o\'qish',
      biography: 'Tarjimai hol',
      needConsultation: 'Xizmatlar bo\'yicha konsultatsiya kerakmi?',
      contactSpecialists: 'Bizning mutaxassislar barcha savollaringizga javob beradi va optimal davolanishni tanlashda yordam beradi',
      scheduleConsultation: 'Konsultatsiyaga yozilish',
      contactUs: 'Bog\'lanish',
      
      // News page
      newsAndEvents: 'Yangiliklar va tadbirlar',
      latestNewsDescription: 'Markazimizning so\'nggi yangiliklari, yutuqlari va tadbirlari (2 ta yangilik)',
      upcomingEvents: 'Yaqinlashayotgan tadbirlar',
      readFull: 'To\'liq o\'qish',
      
      // Contact page
      contacts: 'Aloqa',
      contactDescription: 'Konsultatsiya olish yoki qabulga yozilish uchun biz bilan bog\'laning',
      contactInfo: 'Aloqa ma\'lumotlari',
      address: 'Manzil',
      phones: 'Telefonlar',
      workingHours: 'Ish vaqti',
      emergency24: 'Shoshilinch yordam: 24/7',
      writeToUs: 'Bizga yozing',
      yourName: 'Ismingiz',
      message: 'Xabar',
      sendMessage: 'Xabar yuborish',
      membershipInfo: 'O\'zbekiston neyroxirurglar assotsiatsiyasiga kirish',
      membershipDescription: 'O\'zbekiston neyroxirurglar assotsiatsiyasiga kirish uchun taqdim etish kerak:',
      membershipReq1: 'Assotsiatsiya raisi G.M.Kariev nomiga ariza.',
      membershipReq2: 'Minimal ish haqi miqdorida 1 o\'lchovda to\'lov kvitansiyasi.',
      membershipRequisites: 'O\'zbekiston neyroxirurglar assotsiatsiyasi rekvizitlari:',
      
      // Services page additional translations
      serviceConsultation: 'Konsultatsiya kerakmi?',
      serviceContactText: 'Professional tibbiy yordam olish uchun biz bilan bog\'laning',
      scheduleAppointment: 'Qabulga yozilish',
      
      // Additional missing translations
      professionalTeam: 'Professional jamoa',
      workWithBestSpecialists: 'Neyroxirurgiya sohasidagi eng yaxshi mutaxassislar bilan ishlang',
      modernEquipment: 'Zamonaviy asbob-uskunalar',
      latestTechnologies: 'Eng yangi texnologiyalar va davolash usullari',
      competitiveSalary: 'Munosib ish haqi',
      competitiveSalaryDesc: 'Raqobatbardosh ish haqi va mukofotlar',
      notFoundVacancy: 'Mos bo\'sh o\'rinni topa olmadingizmi?',
      sendResume: 'Bizga rezyumeingizni yuboring, mos pozitsiyalar paydo bo\'lganda siz bilan bog\'lanamiz',
      hrDepartment: 'Kadrlar bo\'limi',
      upcomingEvents: 'Yaqinlashayotgan tadbirlar',
      needConsultationQuestion: 'Konsultatsiya kerakmi?',
      contactForHelp: 'Professional tibbiy yordam olish uchun biz bilan bog\'laning',
      
      // Job application form
      fullName: 'F.I.Sh.',
      workExperience: 'Ish tajribasi',
      education: 'Ma\'lumot',
      coverLetter: 'Qo\'shimcha xat',
      apply: 'Ariza berish',
      submitApplication: 'Ariza yuborish',
      applicationSent: 'Ariza yuborildi',
      applicationSuccess: 'Arizangiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog\'lanamiz.',
      
      // Gallery
      allPhotos: 'Barcha fotosuratlar',
      surgical: 'Jarrohlik xonalari',
      equipment: 'Asbob-uskunalar',
      buildingPhotos: 'Markaz binosi',
      staff: 'Xodimlar',
      patients: 'Bemorlar',
      
      // Services
      ourServices: 'Bizning xizmatlar',
      medicalServices: 'Markaz tibbiy xizmatlari',
      consultations: 'Konsultatsiyalar',
      diagnostics: 'Diagnostika',
      surgery: 'Jarrohlik',
      price: 'Narx',
      currency: 'so\'m',
      
      // Doctors
      ourDoctors: 'Bizning shifokorlar',
      experiencedSpecialistsSubtitle: 'Ko\'p yillik tajribaga ega mutaxassislar',
      experience: 'Tajriba',
      years: 'yil',
      reception: 'Qabul',
      
      // Common
      phone: 'Telefon',
      email: 'Email',
      save: 'Saqlash',
      cancel: 'Bekor qilish',
      edit: 'Tahrirlash',
      delete: 'O\'chirish',
      add: 'Qo\'shish',
      search: 'Qidiruv',
      filter: 'Filtr',
      close: 'Yopish',
      loading: 'Yuklanmoqda...',
      
      // Admin panel
      adminPanel: 'Admin-panel',
      login: 'Kirish',
      logout: 'Chiqish',
      dashboard: 'Boshqaruv paneli',
      statistics: 'Statistika',
      events: 'Tadbirlar',
      settings: 'Sozlamalar',
      
      // Events
      upcomingEvents: 'Yaqinlashayotgan tadbirlar',
      addEvent: 'Tadbir qo\'shish',
      editEvent: 'Tadbirni tahrirlash',
      eventTitle: 'Tadbir nomi',
      eventDate: 'Sana',
      eventTime: 'Vaqt',
      eventLocation: 'O\'tkaziladigan joy',
      eventType: 'Tadbir turi',
      eventDescription: 'Tavsif',
      conference: 'Konferentsiya',
      openDay: 'Ochiq eshiklar kuni',
      masterclass: 'Masterкlass',
      seminar: 'Seminar',
      update: 'Yangilash',
      
      // Additional translations
      building: 'Markaz binosi',
      equipment: 'Tibbiy asbob-uskunalar',
      staff: 'Xodimlar',
      operations: 'Operatsiyalar',
      mainHall: 'Asosiy zal',
      operatingRoom: 'Operatsiya xonasi',
      
      // Appointment form
      appointmentForm: 'Qabulga yozilish formasi',
      patientName: 'Bemorning F.I.Sh.',
      patientPhone: 'Telefon',
      patientEmail: 'Email',
      preferredDate: 'Afzal ko\'rilgan sana',
      preferredTime: 'Afzal ko\'rilgan vaqt',
      doctorChoice: 'Shifokor tanlash',
      serviceChoice: 'Xizmat tanlash',
      additionalInfo: 'Qo\'shimcha ma\'lumot',
      submitAppointment: 'Arizani yuborish',
      
      // Gallery
      galleryCategories: 'Galereya kategoriyalari',
      viewAll: 'Barchasini ko\'rish',
      
      // Footer additional
      quickLinks: 'Tezkor havolalar',
      socialNetworks: 'Ijtimoiy tarmoqlar',
      followUs: 'Bizni kuzatib boring',
      
      // Additional keys
      surgicalTreatment: 'Jarrohlik davolash',
      postOperativeRehabilitation: 'Operatsiyadan keyingi reabilitatsiya',
      outpatientObservation: 'Ambulatoriya kuzatuvi',
      highQualifiedSpecialists: 'Ko\'p yillik tajribaga ega yuqori malakali mutaxassislar jamoasi',
      fullRangeServices: 'Neyroxirurgiya sohasida to\'liq tibbiy xizmatlar spektri',
      
      // Appointment booking - Uzbek
      appointmentBooking: 'Qabulga yozilish',
      appointmentDescription: 'Mutaxassislarimiz bilan maslahatlashish uchun qulay vaqtni tanlang',
      selectDoctor: 'Shifokorni tanlang',
      selectDate: 'Sanani tanlang',
      selectTime: 'Vaqtni tanlang',
      selectDateAndTime: 'Sana va vaqtni tanlang',
      doctorSelection: 'Shifokor tanlash',
      dateAndTime: 'Sana va vaqt',
      personalData: 'Shaxsiy ma\'lumotlar',
      doctor: 'Shifokor',
      available: 'mavjud',
      next: 'Keyingi',
      back: 'Orqaga',
      appointmentDate: 'Qabul sanasi',
      appointmentTime: 'Qabul vaqti',
      firstName: 'Ism',
      lastName: 'Familiya',
      birthDate: 'Tug\'ilgan sana',
      address: 'Manzil',
      complaintsAndSymptoms: 'Shikoyatlar va alomatlar',
      describeSymptomsPlaceholder: 'Alomatlar va shikoyatlaringizni tasvirlab bering',
      submitting: 'Jo\'natilmoqda...',
      appointmentSuccessTitle: 'Qabul muvaffaqiyatli yaratildi!',
      appointmentSuccessMessage: 'Shifokor',
      on: 'sanasida',
      at: 'soat',
      appointmentCreatedSuccessfully: 'uchun qabulingiz muvaffaqiyatli yaratildi.',
      contactConfirmation: 'Biz siz bilan qabulni tasdiqlash uchun bog\'lanamiz.',
      toHomePage: 'Bosh sahifaga',
      bookAnotherAppointment: 'Yana qabulga yozilish',
      enterName: 'Ismni kiriting',
      enterSurname: 'Familiyani kiriting',
      enterPhone: 'Telefon raqamini kiriting',
      invalidPhoneFormat: 'Noto\'g\'ri telefon formati',
      submissionError: 'Arizani yuborishda xatolik yuz berdi. Qayta urinib ko\'ring.',
      
      // About page translations - Uzbek
      aboutCenter: 'Markaz haqida',
      aboutCenterDescription: 'O\'zbekiston Respublikasida neyroxirurgiyaning yetakchi markazi',
      aboutCenterTitle: 'Bizning missiyamiz',
      aboutCenterText1: 'Respublika neyroxirurgiya markazi asab tizimi kasalliklarini davolashga ixtisoslashgan O\'zbekistonning yetakchi tibbiy muassasasidir.',
      aboutCenterText2: 'Markazimiz eng zamonaviy tibbiy asbob-uskunalar bilan jihozlangan va ko\'p yillik ish tajribasiga ega yuqori malakali mutaxassislarga ega.',
      aboutCenterText3: 'Biz diagnostika va konservativ davolanishdan tortib eng murakkab neyroxirurgik operatsiyalargacha to\'liq tibbiy yordam ko\'rsatamiz.',
      centerBuilding: 'Markaz binosi',
      successfulOperations: 'Muvaffaqiyatli operatsiyalar',
      leadership: 'Rahbariyat',
      leadershipDescription: 'Markazimizni neyroxirurgiya sohasida ko\'p yillik ish tajribasiga ega ajoyib mutaxassislar boshqaradi',
      videoGallery: 'Video galereya',
      videoGalleryDescription: 'Video materiallar orqali markazimiz bilan tanishing',
      operatingRoom: 'Operatsiya xonasi',
      medicalEquipment: 'Tibbiy asbob-uskunalar',
      patientTestimonials: 'Bemorlarning fikrlari',
      
      // Footer translations - Uzbek
      careers: 'Bo\'sh o\'rinlar',
      
      // Pages content translations - Uzbek
      historyAndMission: 'Tarix va missiya',
      foundedYear: 'Tashkil etilgan yil',
      patientsPerYear: 'Yiliga bemorlar',
      centerLeadership: 'Markaz rahbariyati',
      experiencedSpecialistsLeading: 'Respublikada neyroxirurgiya rivojlanishini boshqarayotgan tajribali mutaxassislar',
      
      // About page content - Uzbek
      establishedText: '1986 yilda Neyroxirurglar ilmiy jamiyati tashkil etildi, 1998 yilda esa O\'zbekiston neyroxirurglar assotsiatsiyasi tuzildi, u shuningdek Turkiy tillarda so\'zlashuvchi mintaqa neyroxirurglar assotsiatsiyasi va Jahon neyroxirurglar assotsiatsiyasi (WFNS) a\'zosi hisoblanadi.',
      cooperationText: 'Jamiyat uzoq va yaqin xorijiy mamlakatlarning (AQSH, Germaniya, Rossiya, Hindiston, Ozarbayjon, Ukraina, Belorusiya, Qozog\'iston, Qirg\'iziston, Gruziya, Tojikiston va boshqalar) ilmiy jamoalari va alohida olimlari bilan hamkorlik qiladi.',
      mainGoalsText: 'Neyroxirurglar jamiyatining asosiy maqsadlari: neyroxirurgiya sohasidagi dolzarb nazariy, amaliy va ilmiy muammolarni hal qilish maqsadida jamiyat a\'zolarining ijodiy salohiyatini amalga oshirishga ko\'maklashish.',
      associationTasks: 'Assotsiatsiya vazifalari:',
      task1: 'Assotsiatsiya a\'zolarining malakasini oshirishga qaratilgan tadbirlarni amalga oshirish, ularning amaliy va (yoki) ilmiy faoliyati neyroxirurgiya bilan bog\'liq',
      task2: 'Neyroxirurgiya sohasida ilmiy tadqiqotlarning ustuvor yo\'nalishlarini rivojlantirishga ko\'maklashish',
      task3: 'Jamiyat a\'zolariga, yosh olim va shifokorlarga ilmiy va amaliy yordam ko\'rsatish, tibbiy ta\'lim tizimini takomillashtirishga ko\'maklashish va mutaxassislarning kasbiy malakasini oshirish, tibbiyotda kasbiy, axloqiy va deontologik an\'analarni rivojlantirish',
      task4: 'Xalqaro va milliy ilmiy tibbiy jamiyatlar va assotsiatsiyalar bilan hamkorlikni rivojlantirish',
      
      // Services page bottom section - Uzbek
      needConsultationServices: 'Xizmatlar bo\'yicha maslahat kerakmi?',
      specialistsAnswerServices: 'Mutaxassislarimiz barcha savollaringizga javob berishadi va optimal davolanishni tanlashda yordam berishadi',
      
      // Contact page translations - Uzbek
      contactInformation: 'Aloqa ma\'lumotlari',
      writeToUs: 'Bizga yozing',
      yourName: 'Ismingiz',
      enterYourName: 'Ismingizni kiriting',
      enterYourEmail: 'Emailingizni kiriting',
      telephone: 'Telefon',
      message: 'Xabar',
      enterYourMessage: 'Xabaringizni kiriting',
      sendMessage: 'Xabar yuborish',
      workingHours: 'Ish vaqti',
      weekdays: 'Dushanba - Juma: 8:00 - 18:00',
      saturday: 'Shanba: 9:00 - 15:00',
      sunday: 'Yakshanba: Dam olish kuni',
      emergencyHelp: 'Shoshilinch yordam: 24/7',
      joinNeurosurgeonsAssociation: 'O\'zbekiston neyroxirurglar assotsiatsiyasiga kirish',
      joinAssociationText: 'O\'zbekiston neyroxirurglar assotsiatsiyasiga kirish uchun taqdim etish kerak:',
      applicationChairman: 'Assotsiatsiya raisi Kariyev G.M. nomiga ariza.',
      paymentReceipt: 'Minimal ish haqi 1 o\'lchamini to\'lash kvitansiyasi.',
      associationRequirements: 'O\'zbekiston neyroxirurglar assotsiatsiyasining rekvizitlari:',
      
      // News page translations - Uzbek
      latestNews: 'Markazimizning so\'nggi yangiliklari, yutuqlari va voqealari',
      readMore: 'To\'liq o\'qish',
      newsCount: 'yangiliklar',
      
      // Appointment application - Uzbek
      applyForVacancy: 'Vakansiyaga ariza berish',
      applicationSent: 'Ariza yuborildi!',
      applicationSentMessage: 'Arizangiz muvaffaqiyatli yuborildi. Biz siz bilan yaqin orada bog\'lanamiz.',
      attachResume: 'Rezyume ilova qiling',
      coverLetter: 'Qo\'shimcha xat',
      writeAboutYourself: 'O\'zingiz va tajribangiz haqida so\'zlab bering',
      
      // Consultation section - Uzbek
      needConsultation: 'Xizmatlar bo\'yicha maslahat kerakmi?',
      specialistsWillAnswer: 'Mutaxassislarimiz barcha savollaringizga javob berishadi va optimal davolanishni tanlashda yordam berishadi',
      bookConsultation: 'Maslahatga yozilish',
      contactUs: 'Biz bilan bog\'laning',
      
      // Vacancies page - Uzbek
      joinProfessionalTeam: 'Neyroxirurgiyaning yetakchi markazida professionallar jamoasiga qo\'shiling',
      neurosurgeon: 'Neyroxirurg shifokor',
      neurosurgeryFullTime: 'Neyroxirurgiya, To\'liq bandlik',
      mainRequirements: 'Asosiy talablar:',
      higherMedicalEducation: 'Oliy tibbiy ta\'lim',
      neurosurgerySpecialization: 'Neyroxirurgiya bo\'yicha mutaxassislik',
      experienceFrom3Years: '3 yildan ortiq ish tajribasi',
      detailsAndApply: 'Batafsil va ariza berish',
      
      operatingRoomNurse: 'Operatsiya bloki hamshirasi',
      operatingBlockFullTime: 'Operatsiya bloki, To\'liq bandlik',
      secondaryMedicalEducation: 'O\'rta tibbiy ta\'lim',
      operatingNurseCertificate: 'Operatsiya hamshirasi sertifikati',
      experienceFrom1Year: '1 yildan ortiq ish tajribasi',
      
      anesthesiologist: 'Anesteziologo shifokor',
      anesthesiologyFullTime: 'Anesteziologiya va reanimatologiya, To\'liq bandlik',
      anesthesiologySpecialization: 'Anesteziologiya bo\'yicha mutaxassislik',
      experienceFrom2Years: '2 yildan ortiq ish tajribasi',
      
      whyWorkWithUs: 'Nega biz bilan ishlash kerak?',
      professionalTeam: 'Professional jamoa',
      workWithBestSpecialists: 'Neyroxirurgiya sohasidagi eng yaxshi mutaxassislar bilan ishlang',
      modernEquipment: 'Zamonaviy asbob-uskunalar',
      latestTechnologies: 'Eng yangi texnologiyalar va davolash usullari',
      decentSalary: 'Munosib maosh',
      competitiveSalary: 'Raqobatbardosh maosh va mukofotlar',
      
      noSuitableVacancy: 'Mos vakansiya topmadingizmi?',
      sendResume: 'Bizga rezyumeingizni yuboring, mos pozitsiyalar paydo bo\'lganda siz bilan bog\'lanamiz',
      hrDepartment: 'Kadrlar bo\'limi',
      
      // Gallery page - Uzbek
      centerPhotosDescription: 'Markazimiz, asbob-uskunalar va mutaxassislarimizning ish faoliyati rasmlari',
      allPhotos: 'Barcha rasmlar',
      operatingRooms: 'Operatsiya xonalari',
      equipment: 'Asbob-uskunalar',
      centerBuilding: 'Markaz binosi',
      staff: 'Xodimlar',
      patients: 'Bemorlar'
    },
    en: {
      // Navigation
      home: 'Home',
      about: 'About',
      departments: 'Departments',
      doctors: 'Doctors',
      services: 'Services',
      news: 'News',
      contact: 'Contact',
      contacts: 'Contacts',
      appointment: 'Appointment',
      gallery: 'Gallery',
      vacancies: 'Vacancies',
      testAccounts: 'Test Accounts',
      doctorDashboard: 'Doctor Dashboard',
      adminPanel: 'Admin Panel',
      centerOfNeurosurgery: 'Center of Neurosurgery',
      navigation: 'Navigation',
      
      // Working hours and contact
      workingHours: 'Working Hours',
      mondayFriday: 'Mon-Fri',
      saturday: 'Saturday',
      sunday: 'Sunday',
      emergencyHelp: 'Emergency Help',
      centerName: 'Republican Scientific Center of Neurosurgery',
      allRightsReserved: 'All rights reserved',
      footerDescription: 'Leading neurosurgery center in Central Asia with over 25 years of experience.',
      consultationBooking: 'Book consultation',
      weekdaysReception: 'Mon-Fri 9:00-17:00',
      tuesdaySaturdayReception: 'Tue-Sat 9:00-17:00',
      
      // Homepage
      leadingCenter: 'Leading neurosurgery center in Central Asia',
      yearsExperience: 'Over 25 years of experience in treating complex nervous system diseases',
      bookAppointment: 'Book appointment',
      aboutCenter: 'About center',
      contactUs: 'Contact us',
      address: 'Address',
      emergency24: 'Emergency help 24/7',
      
      // Statistics
      centerInNumbers: 'Center in numbers',
      factsAchievements: 'Facts and achievements of our center',
      totalBeds: 'Total beds',
      plannedPlaces: 'Planned places',
      childrenPlaces: 'Children places',
      patientsPerYear: 'Patients per year',
      
      // Departments
      ourDepartments: 'Our departments',
      specializedDivisions: 'Specialized divisions of the center',
      learnMore: 'Learn more',
      allDepartments: 'All departments',
      
      // News
      latestNews: 'Latest news',
      centerEvents: 'Center events and achievements',
      readMore: 'Read more',
      allNews: 'All news',
      
      // About page
      aboutPageTitle: 'About center',
      aboutPageSubtitle: 'Republican Scientific Center of Neurosurgery - leading medical institution in Central Asia in the field of neurosurgery',
      historyMission: 'History and mission',
      aboutHistoryText1: 'In 1986, the Scientific Society of Neurosurgeons was organized, and in 1998 the Association of Neurosurgeons of Uzbekistan was created, which is also a member of the Association of Neurosurgeons of the Pacific Region and the World Federation of Neurosurgical Societies (WFNS).',
      aboutHistoryText2: 'The Society cooperates with scientific teams and individual scientists from many countries near and far abroad (USA, Germany, Russia, India, Azerbaijan, Ukraine, Belarus, Kazakhstan, Kyrgyzstan, Georgia, Tajikistan, etc.).',
      aboutHistoryText3: 'The main goals of the neurosurgeons society are: to promote the realization of the creative potential of Society members in the interests of solving urgent theoretical, practical and scientific problems in the field of neurosurgery.',
      associationTasks: 'Association tasks:',
      task1: 'Implementation of measures aimed at improving the qualifications of Association members whose practical and (or) scientific activities are related to neurosurgery',
      task2: 'Promoting the development of priority areas of scientific research in neurosurgery',
      task3: 'Providing scientific and practical assistance to Society members, young scientists and doctors, promoting the improvement of the medical education system and professional development of specialists',
      task4: 'Development of cooperation with international and national scientific medical societies and associations',
      yearFounded: 'Year founded',
      patientsPerYear: 'Patients per year',
      centerLeadership: 'Center leadership',
      experiencedSpecialists: 'Experienced specialists leading the development of neurosurgery in the republic',
      readBiography: 'Read biography',
      biography: 'Biography',
      needConsultation: 'Need consultation about services?',
      contactSpecialists: 'Our specialists will answer all your questions and help you choose optimal treatment',
      scheduleConsultation: 'Schedule consultation',
      contactUs: 'Contact us',
      
      // News page
      newsAndEvents: 'News and events',
      latestNewsDescription: 'Latest news, achievements and events of our center (2 news)',
      upcomingEvents: 'Upcoming events',
      readFull: 'Read full',
      
      // Contact page
      contacts: 'Contacts',
      contactDescription: 'Contact us for consultation or appointment booking',
      contactInfo: 'Contact information',
      address: 'Address',
      phones: 'Phones',
      workingHours: 'Working hours',
      emergency24: 'Emergency help: 24/7',
      writeToUs: 'Write to us',
      yourName: 'Your name',
      message: 'Message',
      sendMessage: 'Send message',
      membershipInfo: 'Joining the Association of Neurosurgeons of Uzbekistan',
      membershipDescription: 'To join the Association of Neurosurgeons of Uzbekistan, you need to provide:',
      membershipReq1: 'Application addressed to the Association Chairman G.M. Kariev.',
      membershipReq2: 'Receipt of payment in the amount of 1 minimum wage.',
      membershipRequisites: 'Requisites of the Association of Neurosurgeons of Uzbekistan:',
      
      // Services page additional translations
      serviceConsultation: 'Need consultation?',
      serviceContactText: 'Contact us for professional medical help',
      scheduleAppointment: 'Schedule appointment',
      
      // Services
      ourServices: 'Our services',
      medicalServices: 'Medical services of the center',
      consultations: 'Consultations',
      diagnostics: 'Diagnostics',
      surgery: 'Surgery',
      price: 'Price',
      currency: 'UZS',
      
      // Doctors
      ourDoctors: 'Our doctors',
      experiencedSpecialistsSubtitle: 'Experienced specialists with many years of experience',
      experience: 'Experience',
      years: 'years',
      reception: 'Reception',
      
      // Common
      phone: 'Phone',
      email: 'Email',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      close: 'Close',
      loading: 'Loading...',
      
      // Admin panel
      adminPanel: 'Admin panel',
      login: 'Login',
      logout: 'Logout',
      dashboard: 'Dashboard',
      statistics: 'Statistics',
      events: 'Events',
      settings: 'Settings',
      
      // Events
      upcomingEvents: 'Upcoming events',
      addEvent: 'Add event',
      editEvent: 'Edit event',
      eventTitle: 'Event title',
      eventDate: 'Date',
      eventTime: 'Time',
      eventLocation: 'Location',
      eventType: 'Event type',
      eventDescription: 'Description',
      conference: 'Conference',
      openDay: 'Open day',
      masterclass: 'Masterclass',
      seminar: 'Seminar',
      update: 'Update',
      
      // Additional translations
      building: 'Center building',
      equipment: 'Medical equipment',
      staff: 'Staff',
      operations: 'Operations',
      mainHall: 'Main hall',
      operatingRoom: 'Operating room',
      
      // Appointment form
      appointmentForm: 'Appointment form',
      patientName: 'Patient full name',
      patientPhone: 'Phone',
      patientEmail: 'Email',
      preferredDate: 'Preferred date',
      preferredTime: 'Preferred time',
      doctorChoice: 'Choose doctor',
      serviceChoice: 'Choose service',
      additionalInfo: 'Additional information',
      submitAppointment: 'Submit appointment',
      
      // Gallery
      galleryCategories: 'Gallery categories',
      viewAll: 'View all',
      
      // Footer additional
      quickLinks: 'Quick links',
      socialNetworks: 'Social networks',
      followUs: 'Follow us',
      
      // Additional keys  
      surgicalTreatment: 'Surgical treatment',
      postOperativeRehabilitation: 'Postoperative rehabilitation',
      outpatientObservation: 'Outpatient observation',
      highQualifiedSpecialists: 'Team of highly qualified specialists with years of experience',
      fullRangeServices: 'Full range of medical services in neurosurgery with transparent pricing',
      
      // Appointment booking - English
      appointmentBooking: 'Book Appointment',
      appointmentDescription: 'Choose a convenient time to consult with our specialists',
      selectDoctor: 'Select Doctor',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      selectDateAndTime: 'Select Date and Time',
      doctorSelection: 'Doctor Selection',
      dateAndTime: 'Date and Time',
      personalData: 'Personal Data',
      doctor: 'Doctor',
      available: 'available',
      next: 'Next',
      back: 'Back',
      appointmentDate: 'Appointment Date',
      appointmentTime: 'Appointment Time',
      firstName: 'First Name',
      lastName: 'Last Name',
      birthDate: 'Date of Birth',
      address: 'Address',
      complaintsAndSymptoms: 'Complaints and Symptoms',
      describeSymptomsPlaceholder: 'Describe your symptoms and complaints',
      submitting: 'Submitting...',
      bookAppointment: 'Book Appointment',
      appointmentSuccessTitle: 'Appointment Successfully Created!',
      appointmentSuccessMessage: 'Your appointment with doctor',
      on: 'on',
      at: 'at',
      appointmentCreatedSuccessfully: 'has been successfully created.',
      contactConfirmation: 'We will contact you to confirm the appointment.',
      toHomePage: 'To Home Page',
      bookAnotherAppointment: 'Book Another Appointment',
      enterName: 'Enter first name',
      enterSurname: 'Enter last name',
      enterPhone: 'Enter phone number',
      invalidPhoneFormat: 'Invalid phone format',
      submissionError: 'An error occurred while submitting the request. Please try again.',
      
      // About page translations - English
      aboutCenter: 'About Center',
      aboutCenterDescription: 'Leading neurosurgery center in the Republic of Uzbekistan',
      aboutCenterTitle: 'Our Mission',
      aboutCenterText1: 'The Republican Center of Neurosurgery is a leading medical institution in Uzbekistan specializing in the treatment of nervous system diseases.',
      aboutCenterText2: 'Our center is equipped with the most modern medical equipment and has highly qualified specialists with many years of experience.',
      aboutCenterText3: 'We provide comprehensive medical care, from diagnosis and conservative treatment to the most complex neurosurgical operations.',
      centerBuilding: 'Center Building',
      successfulOperations: 'Successful Operations',
      leadership: 'Leadership',
      leadershipDescription: 'Our center is headed by outstanding specialists with many years of experience in neurosurgery',
      videoGallery: 'Video Gallery',
      videoGalleryDescription: 'Get to know our center through video materials',
      operatingRoom: 'Operating Room',
      medicalEquipment: 'Medical Equipment',
      patientTestimonials: 'Patient Testimonials',
      biography: 'Biography',
      
      // Footer translations - English
      careers: 'Careers',
      
      // Pages content translations - English
      historyAndMission: 'History and Mission',
      foundedYear: 'Founded Year',
      patientsPerYear: 'Patients per Year',
      centerLeadership: 'Center Leadership',
      experiencedSpecialistsLeading: 'Experienced specialists leading the development of neurosurgery in the republic',
      
      // Consultation section - English
      needConsultation: 'Need consultation on services?',
      specialistsWillAnswer: 'Our specialists will answer all your questions and help you choose optimal treatment',
      bookConsultation: 'Book Consultation',
      contactUs: 'Contact Us',
      
      // Vacancies page - English
      joinProfessionalTeam: 'Join the team of professionals at the leading neurosurgery center',
      neurosurgeon: 'Neurosurgeon',
      neurosurgeryFullTime: 'Neurosurgery, Full-time',
      mainRequirements: 'Main requirements:',
      higherMedicalEducation: 'Higher medical education',
      neurosurgerySpecialization: 'Neurosurgery specialization',
      experienceFrom3Years: '3+ years of experience',
      detailsAndApply: 'Details and apply',
      
      operatingRoomNurse: 'Operating room nurse',
      operatingBlockFullTime: 'Operating block, Full-time',
      secondaryMedicalEducation: 'Secondary medical education',
      operatingNurseCertificate: 'Operating nurse certificate',
      experienceFrom1Year: '1+ years of experience',
      
      anesthesiologist: 'Anesthesiologist',
      anesthesiologyFullTime: 'Anesthesiology and resuscitation, Full-time',
      anesthesiologySpecialization: 'Anesthesiology specialization',
      experienceFrom2Years: '2+ years of experience',
      
      whyWorkWithUs: 'Why work with us?',
      professionalTeam: 'Professional team',
      workWithBestSpecialists: 'Work with the best specialists in neurosurgery',
      modernEquipment: 'Modern equipment',
      latestTechnologies: 'Latest technologies and treatment methods',
      decentSalary: 'Decent salary',
      competitiveSalary: 'Competitive salary and bonuses',
      
      noSuitableVacancy: 'Didn\'t find a suitable vacancy?',
      sendResume: 'Send us your resume and we will contact you when suitable positions become available',
      hrDepartment: 'HR Department',
      
      // Gallery page - English
      centerPhotosDescription: 'Photos of our center, equipment and work of our specialists',
      allPhotos: 'All photos',
      operatingRooms: 'Operating rooms',
      equipment: 'Equipment',
      centerBuilding: 'Center building',
      staff: 'Staff',
      patients: 'Patients'
    }
  };

  const availableLanguages = ['ru', 'uz', 'en'];
  const languageNames = {
    ru: 'Русский',
    uz: 'O\'zbek',
    en: 'English'
  };

  const t = (key) => translations[language][key] || key;

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      currentLanguage: language,
      setLanguage, 
      changeLanguage,
      availableLanguages,
      languageNames,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Административный контекст (ПОЛНОСТЬЮ ОБНОВЛЕННЫЙ)
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Функция загрузки данных из localStorage
  const loadFromStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(`neuro_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Initialize with empty arrays, will be populated from API or localStorage
  const [departments, setDepartments] = useState(() => loadFromStorage('departments', []));
  const [doctors, setDoctors] = useState(() => loadFromStorage('doctors', []));
  const [news, setNews] = useState(() => loadFromStorage('news', []));
  const [services, setServices] = useState(() => loadFromStorage('services', [
    {
      id: 1,
      title_ru: 'Консультация нейрохирурга',
      title_uz: 'Neyroxirurg maslahati',
      title_en: 'Neurosurgeon consultation',
      description_ru: 'Первичная или повторная консультация специалиста',
      description_uz: 'Mutaxassisning birlamchi yoki takroriy maslahati',
      description_en: 'Primary or follow-up specialist consultation',
      price: 150000,
      duration: '30-45 мин',
      category: 'Консультации'
    },
    {
      id: 2,
      title_ru: 'МРТ головного мозга',
      title_uz: 'Bosh miya MRT',
      title_en: 'Brain MRI',
      description_ru: 'Магнитно-резонансная томография головного мозга',
      description_uz: 'Bosh miyaning magnit-rezonans tomografiyasi',
      description_en: 'Magnetic resonance imaging of the brain',
      price: 350000,
      duration: '30-60 мин',
      category: 'Диагностика'
    },
    {
      id: 3,
      title_ru: 'Эндоскопическая операция',
      title_uz: 'Endoskopik operatsiya',
      title_en: 'Endoscopic surgery',
      description_ru: 'Минимально инвазивная нейрохирургическая операция',
      description_uz: 'Minimal invaziv neyroxirurgik operatsiya',
      description_en: 'Minimally invasive neurosurgical operation',
      price: 5000000,
      duration: '2-4 часа',
      category: 'Хирургия'
    },
    {
      id: 4,
      title_ru: 'Микрохирургическое удаление опухоли',
      title_uz: 'Mikroxirurgik usul bilan o\'smani olib tashlash',
      title_en: 'Microsurgical tumor removal',
      description_ru: 'Прецизионное удаление новообразований мозга',
      description_uz: 'Miya yangiformalarini aniq olib tashlash',
      description_en: 'Precision removal of brain tumors',
      price: 8000000,
      duration: '3-6 часов',
      category: 'Хирургия'
    },
    {
      id: 5,
      title_ru: 'Реабилитационная программа',
      title_uz: 'Reabilitatsiya dasturi',
      title_en: 'Rehabilitation program',
      description_ru: 'Комплексная послеоперационная реабилитация',
      description_uz: 'Operatsiyadan keyingi kompleks reabilitatsiya',
      description_en: 'Comprehensive postoperative rehabilitation',
      price: 250000,
      duration: '1-2 недели',
      category: 'Реабилитация'
    }
  ]));
  const [galleryImages, setGalleryImages] = useState(() => loadFromStorage('galleryImages', []));
  const [accounts, setAccounts] = useState(() => loadFromStorage('accounts', [
    { id: 1, name: 'Админ', email: 'admin@neuro.uz', role: 'admin', status: 'active', createdAt: '2025-01-01' },
    { id: 2, name: 'Доктор Кариев', email: 'kariev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-01-15' },
    { id: 3, name: 'Доктор Асадуллаев', email: 'asadullaev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-02-01' },
    { id: 4, name: 'Доктор Кодашев', email: 'kodashev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-02-10' }
  ]));
  const [leadership, setLeadership] = useState(() => loadFromStorage('leadership', [
    {
      id: 1,
      name: 'Кариев Габрат Маратович',
      position: 'Директор центра',
      image: 'https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg',
      phone: '+998 71 264-96-10',
      email: 'director@neuro.uz',
      biography: 'Заслуженный врач Республики Узбекистан, доктор медицинских наук. Более 30 лет опыта в нейрохирургии.'
    },
    {
      id: 2,
      name: 'Асадуллаев Улугбек Максудович',
      position: 'Заместитель директора по научной работе',
      image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg',
      phone: '+998 71 264-96-15',
      email: 'asadullaev@neuro.uz',
      biography: 'Кандидат медицинских наук, старший научный сотрудник. Специалист по сосудистой нейрохирургии.'
    },
    {
      id: 3,
      name: 'Кодашев Равшан Муслимович',
      position: 'Заведующий отделением детской нейрохирургии',
      image: 'https://images.unsplash.com/photo-1536064479547-7ee40b74b807',
      phone: '+998 71 264-96-09',
      email: 'kodashev@neuro.uz',
      biography: 'Доктор медицинских наук, профессор. 20 лет опыта в детской нейрохирургии.'
    }
  ]));
  const [siteSettings, setSiteSettings] = useState({
    phones: ['+998 71 264-96-10', '+998 71 264-96-09', '+998 78 113-33-78'],
    emails: ['admin@neuro.uz', 'info@neuro.uz'],
    address: 'ул. Хумоюн, 40, Мирзо-Улугбекский район, г. Ташкент, 100142, Республика Узбекистан',
    workingHours: {
      weekdays: '8:00 - 18:00',
      saturday: '9:00 - 15:00',
      sunday: 'Выходной'
    },
    socialMedia: {
      facebook: 'https://facebook.com/neuro.uz',
      instagram: 'https://instagram.com/neuro.uz',
      youtube: 'https://youtube.com/@neuro.uz'
    }
  });
  const [seoSettings, setSeoSettings] = useState({
    title: 'Республиканский Научный Центр Нейрохирургии',
    description: 'Ведущий центр нейрохирургии в Центральной Азии. Более 25 лет опыта в лечении заболеваний нервной системы.',
    keywords: 'нейрохирургия, мозг, спинной мозг, операции, Узбекистан, Ташкент'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Автосохранение данных в localStorage (с защитой от переполнения)
  const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      // Проверяем размер данных (если больше 1MB, не сохраняем)
      if (serializedData.length > 1024 * 1024) {
        console.warn(`Data too large to save in localStorage: ${key}`);
        return;
      }
      localStorage.setItem(`neuro_${key}`, serializedData);
    } catch (error) {
      console.error(`Failed to save to localStorage: ${key}`, error);
      // Очищаем localStorage если он переполнен
      if (error.name === 'QuotaExceededError') {
        try {
          localStorage.clear();
          console.log('localStorage cleared due to quota exceeded');
        } catch (clearError) {
          console.error('Failed to clear localStorage', clearError);
        }
      }
    }
  };

  useEffect(() => {
    saveToLocalStorage('departments', departments);
  }, [departments]);

  useEffect(() => {
    saveToLocalStorage('doctors', doctors);
  }, [doctors]);

  useEffect(() => {
    saveToLocalStorage('news', news);
  }, [news]);

  useEffect(() => {
    saveToLocalStorage('services', services);
  }, [services]);

  useEffect(() => {
    saveToLocalStorage('galleryImages', galleryImages);
  }, [galleryImages]);

  useEffect(() => {
    saveToLocalStorage('accounts', accounts);
  }, [accounts]);

  useEffect(() => {
    saveToLocalStorage('leadership', leadership);
  }, [leadership]);

  // Removed reference to undefined 'users' variable
  
  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch departments
        try {
          const departmentsData = await apiService.getDepartments();
          setDepartments(departmentsData);
        } catch (error) {
          console.warn("Could not fetch departments from API, using fallback data");
          // Используем fallback данные из components.js
          setDepartments([]);
        }
        
        // Fetch doctors
        try {
          const doctorsData = await apiService.getDoctors();
          setDoctors(doctorsData);
        } catch (error) {
          console.warn("Could not fetch doctors from API, using fallback data");
          setDoctors([]);
        }
        
        // Fetch services
        try {
          const servicesData = await apiService.getServices();
          setServices(servicesData);
        } catch (error) {
          console.warn("Could not fetch services from API, using fallback data");
          setServices([]);
        }
        
        // Fetch news
        try {
          const newsData = await apiService.getNews();
          setNews(newsData);
        } catch (error) {
          console.warn("Could not fetch news from API, using fallback data");
          setNews([]);
        }
        
        // Fetch gallery
        try {
          const galleryData = await apiService.getGallery();
          setGalleryImages(galleryData);
        } catch (error) {
          console.warn("Could not fetch gallery from API, using fallback data");
          setGalleryImages([]);
        }
        
      } catch (error) {
        console.error("Error in fetchData:", error);
        // В случае общей ошибки, оставляем пустые массивы
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  


  // Функции для управления данными
  const updateSiteSettings = (newSettings) => {
    setSiteSettings(newSettings);
  };

  const updateSeoSettings = (newSettings) => {
    setSeoSettings(newSettings);
  };

  // Функции для управления услугами
  const addService = (service) => {
    const newId = services.length > 0 ? Math.max(...services.map(s => parseInt(s.id))) + 1 : 1;
    setServices([...services, { ...service, id: newId.toString() }]);
  };

  const updateService = (id, updatedService) => {
    setServices(services.map(service => 
      service.id === id ? { ...updatedService, id } : service
    ));
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Функции для управления отделениями
  const addDepartment = (department) => {
    const newId = departments.length > 0 ? Math.max(...departments.map(d => parseInt(d.id))) + 1 : 1;
    const newDepartments = [...departments, { ...department, id: newId.toString() }];
    setDepartments(newDepartments);
  };

  const updateDepartment = (id, updatedDepartment) => {
    const newDepartments = departments.map(dept => 
      dept.id === id ? { ...updatedDepartment, id } : dept
    );
    setDepartments(newDepartments);
  };

  const deleteDepartment = (id) => {
    const newDepartments = departments.filter(dept => dept.id !== id);
    setDepartments(newDepartments);
    // Отвязываем врачей от удаленного отделения
    const newDoctors = doctors.map(doctor => 
      doctor.departmentId === id ? { ...doctor, departmentId: null } : doctor
    );
    setDoctors(newDoctors);
  };

  // Функции для управления врачами
  const addDoctor = (doctor) => {
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => parseInt(d.id))) + 1 : 1;
    const newDoctors = [...doctors, { ...doctor, id: newId.toString() }];
    setDoctors(newDoctors);
  };

  const updateDoctor = (id, updatedDoctor) => {
    const newDoctors = doctors.map(doctor => 
      doctor.id === id ? { ...updatedDoctor, id } : doctor
    );
    setDoctors(newDoctors);
  };

  const deleteDoctor = (id) => {
    const newDoctors = doctors.filter(doctor => doctor.id !== id);
    setDoctors(newDoctors);
  };

  // Функции для управления новостями
  const addNews = (newsItem) => {
    const newId = news.length > 0 ? Math.max(...news.map(n => parseInt(n.id))) + 1 : 1;
    const newNewsItem = {
      ...newsItem,
      id: newId.toString(),
      date: new Date().toLocaleDateString('ru-RU'),
      is_published: newsItem.is_published !== false
    };
    const newNews = [...news, newNewsItem];
    setNews(newNews);
  };

  const updateNews = (id, updatedNews) => {
    const newNewsArray = news.map(item => 
      item.id === id ? { ...updatedNews, id } : item
    );
    setNews(newNewsArray);
  };

  const deleteNews = (id) => {
    const newNews = news.filter(item => item.id !== id);
    setNews(newNews);
  };

  // Функции для управления аккаунтами
  const addAccount = (account) => {
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    setAccounts([...accounts, { 
      ...account, 
      id: newId, 
      createdAt: today,
      status: 'active'
    }]);
  };

  const updateAccount = (id, updatedAccount) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { 
        ...updatedAccount, 
        id, 
        createdAt: account.createdAt,
        status: account.status 
      } : account
    ));
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { 
        ...account, 
        status: account.status === 'active' ? 'inactive' : 'active' 
      } : account
    ));
  };

  // Функции для управления руководством
  const addLeadership = (leader) => {
    const newId = leadership.length > 0 ? Math.max(...leadership.map(l => l.id)) + 1 : 1;
    setLeadership([...leadership, { ...leader, id: newId }]);
  };

  const updateLeadership = (id, updatedLeader) => {
    setLeadership(leadership.map(leader => 
      leader.id === id ? { ...updatedLeader, id } : leader
    ));
  };

  const deleteLeadership = (id) => {
    setLeadership(leadership.filter(leader => leader.id !== id));
  };

  // Функции для управления галереей
  const addGalleryImage = (image) => {
    const newId = galleryImages.length > 0 ? Math.max(...galleryImages.map(img => parseInt(img.id))) + 1 : 1;
    setGalleryImages([...galleryImages, { ...image, id: newId.toString() }]);
  };

  const updateGalleryImage = (id, updatedImage) => {
    setGalleryImages(galleryImages.map(img => 
      img.id === id ? { ...updatedImage, id } : img
    ));
  };

  const deleteGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  const adminData = {
    departments: departments || [],
    doctors: doctors || [],
    news: news || [],
    services: services || [],
    accounts,
    leadership,
    galleryImages: galleryImages || [],
    siteSettings,
    seoSettings,
    isLoading
  };

  const value = {
    adminData,
    isLoading,
    // Функции для услуг
    addService,
    updateService,
    deleteService,
    // Функции для отделений
    addDepartment,
    updateDepartment,
    deleteDepartment,
    // Функции для врачей
    addDoctor,
    updateDoctor,
    deleteDoctor,
    // Функции для новостей
    addNews,
    updateNews,
    deleteNews,
    // Функции для аккаунтов
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus,
    // Функции для руководства
    addLeadership,
    updateLeadership,
    deleteLeadership,
    // Функции для галереи
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    // Функции для настроек
    updateSiteSettings,
    updateSeoSettings,
    // Прямой доступ к состояниям для обновления
    setDepartments,
    setDoctors,
    setNews,
    setServices,
    setAccounts,
    setLeadership,
    setGalleryImages
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};