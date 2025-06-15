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
      operatingRoom: 'Операционная',
      
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
      followUs: 'Следите за нами'
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
      update: 'Yangilash'
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
      update: 'Update'
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
  const [services, setServices] = useState(() => loadFromStorage('services', []));
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