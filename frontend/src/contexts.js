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
  const [language, setLanguage] = useState(() => {
    // Загружаем язык из localStorage или используем 'ru' по умолчанию
    try {
      return localStorage.getItem('neuro_language') || 'ru';
    } catch {
      return 'ru';
    }
  });

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
      newsAndEvents: 'Новости и события',
      newsDescription: 'Последние новости, достижения и события нашего центра',
      readFull: 'Читать полностью',
      collapse: 'Свернуть',
      upcomingEvents: 'Ближайшие события',
      needConsultation: 'Нужна консультация?',
      consultationText: 'Свяжитесь с нами для получения профессиональной медицинской помощи',
      scheduleAppointment: 'Записаться на прием',
      
      // About page
      aboutPageTitle: 'О центре',
      aboutPageSubtitle: 'Республиканский Научный Центр Нейрохирургии - ведущее медицинское учреждение Центральной Азии в области нейрохирургии',
      historyMission: 'История и миссия',
      associationTasks: 'Задачи Ассоциации:',
      yearFounded: 'Год основания',
      centerLeadership: 'Руководство центра',
      experiencedSpecialists: 'Опытные специалисты, возглавляющие развитие нейрохирургии в республике',
      readBiography: 'Читать биографию',
      biography: 'Биография',
      
      // Services
      ourServices: 'Наши услуги',
      medicalServices: 'Медицинские услуги центра',
      consultations: 'Консультации',
      diagnostics: 'Диагностика',
      surgery: 'Хирургия',
      price: 'Цена',
      currency: 'сум',
      serviceConsultation: 'Нужна консультация по услугам?',
      serviceContactText: 'Наши специалисты готовы проконсультировать вас по любым вопросам оказываемых услуг',
      scheduleConsultation: 'Записаться на консультацию',
      
      // Doctors
      ourDoctors: 'Наши врачи',
      experiencedSpecialistsSubtitle: 'Опытные специалисты с многолетним стажем',
      experience: 'Опыт',
      years: 'лет',
      reception: 'Прием',
      
      // Gallery
      galleryTitle: 'Галерея',
      galleryDescription: 'Фотографии нашего центра, оборудования и работы наших специалистов',
      allPhotos: 'Все фотографии',
      operatingRooms: 'Операционные',
      equipment: 'Оборудование',
      centerBuilding: 'Здание центра',
      staff: 'Персонал',
      patients: 'Пациенты',
      close: 'Закрыть',
      
      // Contacts
      contactsTitle: 'Контакты',
      contactsDescription: 'Свяжитесь с нами для получения консультации или записи на прием',
      contactInfo: 'Контактная информация',
      writeToUs: 'Написать нам',
      yourName: 'Ваше имя',
      enterName: 'Введите ваше имя',
      enterEmail: 'Введите ваш email',
      enterPhone: 'Введите телефон',
      message: 'Сообщение',
      enterMessage: 'Введите ваше сообщение',
      sendMessage: 'Отправить сообщение',
      sending: 'Отправка...',
      messageSent: 'Сообщение успешно отправлено!',
      sendError: 'Произошла ошибка. Попробуйте еще раз.',
      findUs: 'Где нас найти',
      
      // Vacancies
      careers: 'Вакансии',
      joinProfessionalTeam: 'Присоединяйтесь к команде профессионалов',
      whyWorkWithUs: 'Почему стоит работать с нами?',
      professionalTeam: 'Профессиональная команда',
      workWithBestSpecialists: 'Работа с лучшими специалистами',
      modernEquipment: 'Современное оборудование',
      latestTechnologies: 'Новейшие технологии и методики',
      competitiveSalary: 'Конкурентная зарплата',
      competitiveSalaryDesc: 'Достойная оплата труда и бонусы',
      notFoundVacancy: 'Не нашли подходящую вакансию?',
      sendResume: 'Отправьте нам свое резюме, и мы обязательно свяжемся с вами',
      hrDepartmentContact: 'Отдел кадров всегда на связи',
      apply: 'Откликнуться',
      applicationSuccess: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      fullName: 'ФИО',
      workExperience: 'Опыт работы',
      education: 'Образование',
      coverLetter: 'Сопроводительное письмо',
      
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
      
      // Association membership
      associationMembership: 'Вступление в Ассоциацию нейрохирургов Узбекистана',
      membershipRequirements: 'Для вступления в Ассоциацию нейрохирургов Узбекистана необходимо предоставить:',
      membershipApplication: 'Заявление на имя председателя Ассоциации Кариева Г.М.',
      membershipPayment: 'Квитанцию об уплате 1 размера минимальной заработной платы.',
      associationDetails: 'Реквизиты Ассоциации нейрохирургов Узбекистана:',
      accountNumber: 'р/с',
      bankName: 'Банк',
      bankCode: 'МФО',
      taxNumber: 'ИНН',
      activityCode: 'ОКОНХ',
      payerName: 'От кого',
      paymentPurpose: 'Основание',
      membershipFee2025: 'Членский взнос за 2025 год',
      
      // About page content
      historyMission: 'История и миссия',
      centerHistory: 'Республиканский Научный Центр Нейрохирургии был создан в 1999 году как ведущее специализированное медицинское учреждение Республики Узбекистан.',
      centerMission: 'Наша миссия — предоставление высококачественной медицинской помощи пациентам с заболеваниями нервной системы.',
      associationTasks: 'Задачи Ассоциации:',
      task1: 'Развитие нейрохирургической службы в Узбекистане',
      task2: 'Повышение квалификации специалистов',
      task3: 'Внедрение современных методов лечения',
      task4: 'Международное сотрудничество',
      task5: 'Научно-исследовательская деятельность',
      
      // Consultation block
      needConsultationQuestion: 'Нужна консультация?',
      consultationBlockText: 'Наши опытные специалисты готовы предоставить вам профессиональную медицинскую консультацию по любым вопросам',
      getConsultation: 'Получить консультацию',
      
      // About page detailed content
      aboutHistoryText1: 'Республиканский Научный Центр Нейрохирургии был создан в 1999 году как ведущее специализированное медицинское учреждение Республики Узбекистан по оказанию высокотехнологичной нейрохирургической помощи.',
      aboutHistoryText2: 'За более чем 25 лет работы центр стал ведущим медицинским учреждением Центральной Азии в области нейрохирургии, где проводятся сложнейшие операции на головном и спинном мозге с использованием современных технологий.',
      aboutHistoryText3: 'Наша миссия — предоставление высококачественной, доступной и инновационной медицинской помощи пациентам с заболеваниями нервной системы, развитие науки и подготовка высококвалифицированных специалистов.'
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
      newsAndEvents: 'Yangiliklar va tadbirlar',
      newsDescription: 'Markazimizning so\'nggi yangiliklari, yutuqlari va tadbirlari',
      readFull: 'To\'liq o\'qish',
      collapse: 'Yig\'ish',
      upcomingEvents: 'Yaqinlashayotgan tadbirlar',
      needConsultation: 'Konsultatsiya kerakmi?',
      consultationText: 'Professional tibbiy yordam olish uchun biz bilan bog\'laning',
      scheduleAppointment: 'Qabulga yozilish',
      
      // About page
      aboutPageTitle: 'Markaz haqida',
      aboutPageSubtitle: 'Respublika Neyroxirurgiya Ilmiy Markazi - Markaziy Osiyodagi neyroxirurgiya sohasidagi yetakchi tibbiyot muassasasi',
      historyMission: 'Tarix va missiya',
      associationTasks: 'Assotsiatsiya vazifalari:',
      yearFounded: 'Tashkil etilgan yil',
      centerLeadership: 'Markaz rahbariyati',
      experiencedSpecialists: 'Respublikada neyroxirurgiyani rivojlantirishga rahbarlik qilayotgan tajribali mutaxassislar',
      readBiography: 'Tarjimai holni o\'qish',
      biography: 'Tarjimai hol',
      
      // Services
      ourServices: 'Bizning xizmatlar',
      medicalServices: 'Markaz tibbiy xizmatlari',
      consultations: 'Konsultatsiyalar',
      diagnostics: 'Diagnostika',
      surgery: 'Jarrohlik',
      price: 'Narx',
      currency: 'so\'m',
      serviceConsultation: 'Xizmatlar bo\'yicha konsultatsiya kerakmi?',
      serviceContactText: 'Mutaxassislarimiz sizni ko\'rsatiladigan xizmatlar bo\'yicha har qanday savollarda maslahat berishga tayyor',
      scheduleConsultation: 'Konsultatsiyaga yozilish',
      
      // Doctors
      ourDoctors: 'Bizning shifokorlar',
      experiencedSpecialistsSubtitle: 'Ko\'p yillik tajribaga ega mutaxassislar',
      experience: 'Tajriba',
      years: 'yil',
      reception: 'Qabul',
      
      // Gallery
      galleryTitle: 'Galereya',
      galleryDescription: 'Markazimiz, jihozlar va mutaxassislarimiz ishining fotosuratlar',
      allPhotos: 'Barcha fotosuratlar',
      operatingRooms: 'Operatsiya xonalari',
      equipment: 'Jihozlar',
      centerBuilding: 'Markaz binosi',
      staff: 'Xodimlar',
      patients: 'Bemorlar',
      close: 'Yopish',
      
      // Contacts
      contactsTitle: 'Aloqa',
      contactsDescription: 'Konsultatsiya olish yoki qabulga yozilish uchun biz bilan bog\'laning',
      contactInfo: 'Aloqa ma\'lumotlari',
      writeToUs: 'Bizga yozing',
      yourName: 'Ismingiz',
      enterName: 'Ismingizni kiriting',
      enterEmail: 'Email-ingizni kiriting',
      enterPhone: 'Telefon raqamingizni kiriting',
      message: 'Xabar',
      enterMessage: 'Xabaringizni kiriting',
      sendMessage: 'Xabar yuborish',
      sending: 'Yuborilmoqda...',
      messageSent: 'Xabar muvaffaqiyatli yuborildi!',
      sendError: 'Xatolik yuz berdi. Qayta urinib ko\'ring.',
      findUs: 'Bizni qayerdan topish mumkin',
      
      // Vacancies
      careers: 'Bo\'sh o\'rinlar',
      joinProfessionalTeam: 'Professional jamoaga qo\'shiling',
      whyWorkWithUs: 'Nima uchun biz bilan ishlashga arziydi?',
      professionalTeam: 'Professional jamoa',
      workWithBestSpecialists: 'Eng yaxshi mutaxassislar bilan ishlash',
      modernEquipment: 'Zamonaviy jihozlar',
      latestTechnologies: 'Eng yangi texnologiya va usullar',
      competitiveSalary: 'Raqobatbardosh maosh',
      competitiveSalaryDesc: 'Munosib mehnat haqi va bonuslar',
      notFoundVacancy: 'Mos bo\'sh o\'rin topmadingizmi?',
      sendResume: 'Bizga rezyumengizni yuboring, albatta siz bilan bog\'lanamiz',
      hrDepartmentContact: 'Kadrlar bo\'limi doimo aloqada',
      apply: 'Ariza topshirish',
      applicationSuccess: 'Ariza muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.',
      fullName: 'F.I.Sh.',
      workExperience: 'Ish tajribasi',
      education: 'Ta\'lim',
      coverLetter: 'Qo\'shimcha xat',
      
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
      
      // Association membership
      associationMembership: 'O\'zbekiston neyroxirurglari assotsiatsiyasiga a\'zo bo\'lish',
      membershipRequirements: 'O\'zbekiston neyroxirurglari assotsiatsiyasiga a\'zo bo\'lish uchun taqdim etish kerak:',
      membershipApplication: 'Assotsiatsiya raisi Kariyev G.M. nomiga ariza',
      membershipPayment: 'Minimal ish haqining 1 o\'lchamini to\'lash to\'g\'risidagi kvitansiya.',
      associationDetails: 'O\'zbekiston neyroxirurglari assotsiatsiyasining rekvizitlari:',
      accountNumber: 'h/r',
      bankName: 'Bank',
      bankCode: 'MFO',
      taxNumber: 'STIR',
      activityCode: 'OKONX',
      payerName: 'Kimdan',
      paymentPurpose: 'Asos',
      membershipFee2025: '2025 yil uchun a\'zolik badali',
      
      // About page content
      historyMission: 'Tarix va missiya',
      centerHistory: 'Respublika Neyroxirurgiya Ilmiy Markazi 1999 yilda O\'zbekiston Respublikasining yetakchi ixtisoslashgan tibbiyot muassasasi sifatida tashkil etilgan.',
      centerMission: 'Bizning missiyamiz - nerv sistemasi kasalliklari bilan og\'rigan bemorlarga yuqori sifatli tibbiy yordam ko\'rsatish.',
      associationTasks: 'Assotsiatsiya vazifalari:',
      task1: 'O\'zbekistonda neyroxirurgiya xizmatini rivojlantirish',
      task2: 'Mutaxassislar malakasini oshirish',
      task3: 'Zamonaviy davolash usullarini joriy etish',
      task4: 'Xalqaro hamkorlik',
      task5: 'Ilmiy-tadqiqot faoliyati',
      
      // Consultation block
      needConsultationQuestion: 'Konsultatsiya kerakmi?',
      consultationBlockText: 'Tajribali mutaxassislarimiz sizga har qanday savollar bo\'yicha professional tibbiy maslahat berishga tayyor',
      getConsultation: 'Konsultatsiya olish',
      
      // About page detailed content
      aboutHistoryText1: 'Respublika Neyroxirurgiya Ilmiy Markazi 1999 yilda O\'zbekiston Respublikasida yuqori texnologiyali neyroxirurgik yordam ko\'rsatish bo\'yicha yetakchi ixtisoslashgan tibbiyot muassasasi sifatida tashkil etilgan.',
      aboutHistoryText2: '25 yildan ortiq faoliyat davomida markaz zamonaviy texnologiyalardan foydalangan holda bosh va orqa miya bo\'yicha eng murakkab operatsiyalar o\'tkaziladigan Markaziy Osiyodagi neyroxirurgiya sohasidagi yetakchi tibbiyot muassasasiga aylandi.',
      aboutHistoryText3: 'Bizning missiyamiz - nerv sistemasi kasalliklari bilan og\'rigan bemorlarga yuqori sifatli, qulay va innovatsion tibbiy yordam ko\'rsatish, ilm-fanni rivojlantirish va yuqori malakali mutaxassislar tayyorlash.'
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
      newsAndEvents: 'News and events',
      newsDescription: 'Latest news, achievements and events of our center',
      readFull: 'Read full',
      collapse: 'Collapse',
      upcomingEvents: 'Upcoming events',
      needConsultation: 'Need consultation?',
      consultationText: 'Contact us for professional medical assistance',
      scheduleAppointment: 'Schedule appointment',
      
      // About page
      aboutPageTitle: 'About center',
      aboutPageSubtitle: 'Republican Scientific Center of Neurosurgery - leading medical institution in Central Asia in the field of neurosurgery',
      historyMission: 'History and mission',
      associationTasks: 'Association tasks:',
      yearFounded: 'Year founded',
      centerLeadership: 'Center leadership',
      experiencedSpecialists: 'Experienced specialists leading the development of neurosurgery in the republic',
      readBiography: 'Read biography',
      biography: 'Biography',
      
      // Services
      ourServices: 'Our services',
      medicalServices: 'Medical services of the center',
      consultations: 'Consultations',
      diagnostics: 'Diagnostics',
      surgery: 'Surgery',
      price: 'Price',
      currency: 'UZS',
      serviceConsultation: 'Need service consultation?',
      serviceContactText: 'Our specialists are ready to consult you on any questions about provided services',
      scheduleConsultation: 'Schedule consultation',
      
      // Doctors
      ourDoctors: 'Our doctors',
      experiencedSpecialistsSubtitle: 'Experienced specialists with many years of experience',
      experience: 'Experience',
      years: 'years',
      reception: 'Reception',
      
      // Gallery
      galleryTitle: 'Gallery',
      galleryDescription: 'Photos of our center, equipment and work of our specialists',
      allPhotos: 'All photos',
      operatingRooms: 'Operating rooms',
      equipment: 'Equipment',
      centerBuilding: 'Center building',
      staff: 'Staff',
      patients: 'Patients',
      close: 'Close',
      
      // Contacts
      contactsTitle: 'Contacts',
      contactsDescription: 'Contact us for consultation or appointment booking',
      contactInfo: 'Contact information',
      writeToUs: 'Write to us',
      yourName: 'Your name',
      enterName: 'Enter your name',
      enterEmail: 'Enter your email',
      enterPhone: 'Enter your phone',
      message: 'Message',
      enterMessage: 'Enter your message',
      sendMessage: 'Send message',
      sending: 'Sending...',
      messageSent: 'Message sent successfully!',
      sendError: 'An error occurred. Please try again.',
      findUs: 'Where to find us',
      
      // Vacancies
      careers: 'Careers',
      joinProfessionalTeam: 'Join our professional team',
      whyWorkWithUs: 'Why work with us?',
      professionalTeam: 'Professional team',
      workWithBestSpecialists: 'Work with the best specialists',
      modernEquipment: 'Modern equipment',
      latestTechnologies: 'Latest technologies and methods',
      competitiveSalary: 'Competitive salary',
      competitiveSalaryDesc: 'Decent salary and bonuses',
      notFoundVacancy: 'Didn\'t find suitable vacancy?',
      sendResume: 'Send us your resume and we will definitely contact you',
      hrDepartmentContact: 'HR department is always in touch',
      apply: 'Apply',
      applicationSuccess: 'Application sent successfully! We will contact you soon.',
      fullName: 'Full name',
      workExperience: 'Work experience',
      education: 'Education',
      coverLetter: 'Cover letter',
      
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
      
      // Association membership
      associationMembership: 'Membership in the Association of Neurosurgeons of Uzbekistan',
      membershipRequirements: 'To join the Association of Neurosurgeons of Uzbekistan, you must provide:',
      membershipApplication: 'Application addressed to the Chairman of the Association Kariev G.M.',
      membershipPayment: 'Receipt of payment of 1 minimum wage.',
      associationDetails: 'Details of the Association of Neurosurgeons of Uzbekistan:',
      accountNumber: 'a/c',
      bankName: 'Bank',
      bankCode: 'MFO',
      taxNumber: 'TIN',
      activityCode: 'OKONH',
      payerName: 'From',
      paymentPurpose: 'Purpose',
      membershipFee2025: 'Membership fee for 2025',
      
      // About page content
      historyMission: 'History and mission',
      centerHistory: 'The Republican Scientific Center of Neurosurgery was established in 1999 as the leading specialized medical institution of the Republic of Uzbekistan.',
      centerMission: 'Our mission is to provide high-quality medical care to patients with nervous system diseases.',
      associationTasks: 'Association tasks:',
      task1: 'Development of neurosurgical service in Uzbekistan',
      task2: 'Professional development of specialists',
      task3: 'Implementation of modern treatment methods',
      task4: 'International cooperation',
      task5: 'Scientific research activities',
      
      // Consultation block
      needConsultationQuestion: 'Need consultation?',
      consultationBlockText: 'Our experienced specialists are ready to provide you with professional medical consultation on any questions',
      getConsultation: 'Get consultation',
      
      // About page detailed content
      aboutHistoryText1: 'The Republican Scientific Center of Neurosurgery was established in 1999 as the leading specialized medical institution of the Republic of Uzbekistan for providing high-tech neurosurgical care.',
      aboutHistoryText2: 'For more than 25 years of operation, the center has become the leading medical institution in Central Asia in the field of neurosurgery, where the most complex operations on the brain and spinal cord are performed using modern technologies.',
      aboutHistoryText3: 'Our mission is to provide high-quality, accessible and innovative medical care to patients with nervous system diseases, develop science and train highly qualified specialists.'
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
    // Сохраняем язык в localStorage
    try {
      localStorage.setItem('neuro_language', newLanguage);
    } catch (error) {
      console.warn('Could not save language to localStorage:', error);
    }
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

  // Initialize with empty arrays, will be populated from API only (УБРАЛИ LOCALSTORAGE)
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([
    { id: 'all', name_ru: 'Все фотографии', name_uz: 'Barcha suratlar', name_en: 'All photos' },
    { id: 'operations', name_ru: 'Операционные', name_uz: 'Operatsiya xonalari', name_en: 'Operating rooms' },
    { id: 'equipment', name_ru: 'Оборудование', name_uz: 'Jihozlar', name_en: 'Equipment' },
    { id: 'building', name_ru: 'Здание центра', name_uz: 'Markaz binosi', name_en: 'Center building' },
    { id: 'staff', name_ru: 'Персонал', name_uz: 'Xodimlar', name_en: 'Staff' },
    { id: 'patients', name_ru: 'Пациенты', name_uz: 'Bemorlar', name_en: 'Patients' }
  ]);
  const [vacancies, setVacancies] = useState([]);
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Админ', email: 'admin@neuro.uz', password: 'admin123', role: 'admin', status: 'active', createdAt: '2025-01-01' },
    { id: 2, name: 'Доктор Кариев', email: 'kariev@neuro.uz', password: 'demo123', role: 'doctor', status: 'active', createdAt: '2025-01-15' },
    { id: 3, name: 'Доктор Асадуллаев', email: 'asadullaev@neuro.uz', password: 'demo123', role: 'doctor', status: 'active', createdAt: '2025-02-01' },
    { id: 4, name: 'Доктор Кодашев', email: 'kodashev@neuro.uz', password: 'demo123', role: 'doctor', status: 'active', createdAt: '2025-02-10' }
  ]);
  const [events, setEvents] = useState([]);
  const [leadership, setLeadership] = useState([]);
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

  // Fetch data from API on component mount (УБРАЛИ АВТОСОХРАНЕНИЕ В LOCALSTORAGE)
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
        
        // Fetch events
        try {
          const eventsData = await apiService.getEvents();
          setEvents(eventsData);
        } catch (error) {
          console.warn("Could not fetch events from API, using fallback data");
          setEvents([]);
        }
        
        // Fetch leadership
        try {
          const leadershipData = await apiService.getLeadership();
          setLeadership(leadershipData);
        } catch (error) {
          console.warn("Could not fetch leadership from API, using fallback data");
          setLeadership([]);
        }
        
      } catch (error) {
        console.error("Error in fetchData:", error);
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

  // Функции для управления услугами (ПЕРЕДЕЛАНО ДЛЯ API)
  const addService = async (service) => {
    try {
      const result = await apiService.createService(service);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedServices = await apiService.getServices();
      setServices(updatedServices);
      return result;
    } catch (error) {
      console.error('Failed to add service:', error);
      throw error;
    }
  };

  const updateService = async (id, updatedService) => {
    try {
      const result = await apiService.updateService(id, updatedService);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedServices = await apiService.getServices();
      setServices(updatedServices);
      return result;
    } catch (error) {
      console.error('Failed to update service:', error);
      throw error;
    }
  };

  const deleteService = async (id) => {
    try {
      const result = await apiService.deleteService(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedServices = await apiService.getServices();
      setServices(updatedServices);
      return result;
    } catch (error) {
      console.error('Failed to delete service:', error);
      throw error;
    }
  };

  // Функции для управления отделениями (ПЕРЕДЕЛАНО ДЛЯ API)
  const addDepartment = async (department) => {
    try {
      const result = await apiService.createDepartment(department);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedDepartments = await apiService.getDepartments();
      setDepartments(updatedDepartments);
      return result;
    } catch (error) {
      console.error('Failed to add department:', error);
      throw error;
    }
  };

  const updateDepartment = async (id, updatedDepartment) => {
    try {
      const result = await apiService.updateDepartment(id, updatedDepartment);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedDepartments = await apiService.getDepartments();
      setDepartments(updatedDepartments);
      return result;
    } catch (error) {
      console.error('Failed to update department:', error);
      throw error;
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const result = await apiService.deleteDepartment(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedDepartments = await apiService.getDepartments();
      setDepartments(updatedDepartments);
      // Также обновляем врачей, если их отделение было удалено
      const updatedDoctors = await apiService.getDoctors();
      setDoctors(updatedDoctors);
      return result;
    } catch (error) {
      console.error('Failed to delete department:', error);
      throw error;
    }
  };

  // Функции для управления врачами (ПЕРЕДЕЛАНО ДЛЯ API)
  const addDoctor = async (doctor) => {
    try {
      const result = await apiService.createDoctor(doctor);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedDoctors = await apiService.getDoctors();
      setDoctors(updatedDoctors);
      return result;
    } catch (error) {
      console.error('Failed to add doctor:', error);
      throw error;
    }
  };

  const updateDoctor = async (id, updatedDoctor) => {
    try {
      const result = await apiService.updateDoctor(id, updatedDoctor);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedDoctors = await apiService.getDoctors();
      setDoctors(updatedDoctors);
      return result;
    } catch (error) {
      console.error('Failed to update doctor:', error);
      throw error;
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const result = await apiService.deleteDoctor(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedDoctors = await apiService.getDoctors();
      setDoctors(updatedDoctors);
      return result;
    } catch (error) {
      console.error('Failed to delete doctor:', error);
      throw error;
    }
  };

  // Функции для управления новостями (ПЕРЕДЕЛАНО ДЛЯ API)
  const addNews = async (newsItem) => {
    try {
      const newsData = {
        ...newsItem,
        date: new Date().toLocaleDateString('ru-RU'),
        is_published: newsItem.is_published !== false
      };
      const result = await apiService.createNews(newsData);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedNews = await apiService.getNews();
      setNews(updatedNews);
      return result;
    } catch (error) {
      console.error('Failed to add news:', error);
      throw error;
    }
  };

  const updateNews = async (id, updatedNews) => {
    try {
      const result = await apiService.updateNews(id, updatedNews);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedNewsArray = await apiService.getNews();
      setNews(updatedNewsArray);
      return result;
    } catch (error) {
      console.error('Failed to update news:', error);
      throw error;
    }
  };

  const deleteNews = async (id) => {
    try {
      const result = await apiService.deleteNews(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedNews = await apiService.getNews();
      setNews(updatedNews);
      return result;
    } catch (error) {
      console.error('Failed to delete news:', error);
      throw error;
    }
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

  // Функции для управления руководством (ПЕРЕДЕЛАНО ДЛЯ API)
  const addLeadership = async (leader) => {
    try {
      const result = await apiService.createLeadership(leader);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedLeadership = await apiService.getLeadership();
      setLeadership(updatedLeadership);
      return result;
    } catch (error) {
      console.error('Failed to add leadership:', error);
      throw error;
    }
  };

  const updateLeadership = async (id, updatedLeader) => {
    try {
      const result = await apiService.updateLeadership(id, updatedLeader);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedLeadership = await apiService.getLeadership();
      setLeadership(updatedLeadership);
      return result;
    } catch (error) {
      console.error('Failed to update leadership:', error);
      throw error;
    }
  };

  const deleteLeadership = async (id) => {
    try {
      const result = await apiService.deleteLeadership(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedLeadership = await apiService.getLeadership();
      setLeadership(updatedLeadership);
      return result;
    } catch (error) {
      console.error('Failed to delete leadership:', error);
      throw error;
    }
  };

  // Функции для управления галереей (ПЕРЕДЕЛАНО ДЛЯ API)
  const addGalleryImage = async (image) => {
    try {
      const result = await apiService.createGalleryImage(image);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedGallery = await apiService.getGallery();
      setGalleryImages(updatedGallery);
      return result;
    } catch (error) {
      console.error('Failed to add gallery image:', error);
      throw error;
    }
  };

  const updateGalleryImage = async (id, updatedImage) => {
    try {
      const result = await apiService.updateGalleryImage(id, updatedImage);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedGallery = await apiService.getGallery();
      setGalleryImages(updatedGallery);
      return result;
    } catch (error) {
      console.error('Failed to update gallery image:', error);
      throw error;
    }
  };

  const deleteGalleryImage = async (id) => {
    try {
      const result = await apiService.deleteGalleryImage(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedGallery = await apiService.getGallery();
      setGalleryImages(updatedGallery);
      return result;
    } catch (error) {
      console.error('Failed to delete gallery image:', error);
      throw error;
    }
  };

  // Функции для управления категориями галереи
  const addGalleryCategory = (category) => {
    const newId = galleryCategories.length > 0 ? Math.max(...galleryCategories.map(c => parseInt(c.id))) + 1 : 1;
    setGalleryCategories([...galleryCategories, { ...category, id: newId.toString() }]);
  };

  const updateGalleryCategory = (id, updatedCategory) => {
    setGalleryCategories(galleryCategories.map(cat => 
      cat.id === id ? { ...updatedCategory, id } : cat
    ));
  };

  const deleteGalleryCategory = (id) => {
    setGalleryCategories(galleryCategories.filter(cat => cat.id !== id));
  };

  // Функции для управления событиями (ПЕРЕДЕЛАНО ДЛЯ API)
  const addEvent = async (event) => {
    try {
      const result = await apiService.createEvent(event);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedEvents = await apiService.getEvents();
      setEvents(updatedEvents);
      return result;
    } catch (error) {
      console.error('Failed to add event:', error);
      throw error;
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      const result = await apiService.updateEvent(id, updatedEvent);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedEvents = await apiService.getEvents();
      setEvents(updatedEvents);
      return result;
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  };

  const deleteEvent = async (id) => {
    try {
      const result = await apiService.deleteEvent(id);
      // Обновляем локальное состояние новыми данными с сервера
      const updatedEvents = await apiService.getEvents();
      setEvents(updatedEvents);
      return result;
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw error;
    }
  };

  // Функции для управления вакансиями
  const addVacancy = (vacancy) => {
    const newId = vacancies.length > 0 ? Math.max(...vacancies.map(v => parseInt(v.id))) + 1 : 1;
    setVacancies([...vacancies, { ...vacancy, id: newId.toString(), isActive: true, createdAt: new Date().toISOString() }]);
  };

  const updateVacancy = (id, updatedVacancy) => {
    setVacancies(vacancies.map(vacancy => 
      vacancy.id === id ? { ...updatedVacancy, id } : vacancy
    ));
  };

  const deleteVacancy = (id) => {
    setVacancies(vacancies.filter(vacancy => vacancy.id !== id));
  };

  const adminData = {
    departments: departments || [],
    doctors: doctors || [],
    news: news || [],
    services: services || [],
    accounts,
    leadership,
    events: events || [],
    galleryImages: galleryImages || [],
    galleryCategories,
    vacancies,
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
    // Функции для событий
    addEvent,
    updateEvent,
    deleteEvent,
    // Функции для галереи
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    // Функции для категорий галереи
    addGalleryCategory,
    updateGalleryCategory,
    deleteGalleryCategory,
    // Функции для вакансий
    addVacancy,
    updateVacancy,
    deleteVacancy,
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
    setGalleryImages,
    setGalleryCategories,
    setVacancies
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