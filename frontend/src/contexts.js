import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteData } from './components';

// Языковой контекст
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const translations = {
    ru: {
      home: 'Главная',
      about: 'О центре',
      departments: 'Отделения',
      doctors: 'Врачи',
      services: 'Услуги',
      news: 'Новости',
      contact: 'Контакты',
      appointment: 'Запись на прием',
      gallery: 'Галерея'
    },
    uz: {
      home: 'Bosh sahifa',
      about: 'Markaz haqida',
      departments: 'Bo\'limlar',
      doctors: 'Shifokorlar',
      services: 'Xizmatlar',
      news: 'Yangiliklar',
      contact: 'Aloqa',
      appointment: 'Qabulga yozilish',
      gallery: 'Galereya'
    }
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Административный контекст (ПОЛНОСТЬЮ ОБНОВЛЕННЫЙ)
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Инициализируем с данными из siteData и дополнительными данными
  const [departments, setDepartments] = useState(siteData.departments);
  const [doctors, setDoctors] = useState(siteData.doctors.map(doctor => ({
    ...doctor,
    departmentId: doctor.id <= 3 ? doctor.id : null
  })));
  const [news, setNews] = useState(siteData.news);
  
  // Расширенные данные услуг
  const [services, setServices] = useState([
    { id: 1, name: 'МРТ головного мозга', category: 'Диагностика', price: 500000, description: 'Магнитно-резонансная томография головного мозга с контрастом' },
    { id: 2, name: 'КТ позвоночника', category: 'Диагностика', price: 400000, description: 'Компьютерная томография позвоночника всех отделов' },
    { id: 3, name: 'Удаление опухоли мозга', category: 'Хирургия', price: 5000000, description: 'Хирургическое удаление новообразований головного мозга' },
    { id: 4, name: 'Консультация нейрохирурга', category: 'Консультации', price: 150000, description: 'Первичная консультация специалиста нейрохирурга' },
    { id: 5, name: 'ЭЭГ (электроэнцефалография)', category: 'Диагностика', price: 200000, description: 'Исследование биоэлектрической активности мозга' },
    { id: 6, name: 'Люмбальная пункция', category: 'Диагностика', price: 300000, description: 'Забор спинномозговой жидкости для анализа' },
    { id: 7, name: 'Операция на позвоночнике', category: 'Хирургия', price: 3000000, description: 'Хирургическое вмешательство на позвоночнике различной сложности' },
    { id: 8, name: 'Консультация детского нейрохирурга', category: 'Консультации', price: 180000, description: 'Специализированная консультация для детей до 18 лет' },
    { id: 9, name: 'УЗИ сосудов головы и шеи', category: 'Диагностика', price: 250000, description: 'Ультразвуковое исследование сосудов головного мозга' },
    { id: 10, name: 'Ангиография церебральных сосудов', category: 'Диагностика', price: 800000, description: 'Контрастное исследование сосудов головного мозга' },
    { id: 11, name: 'Стереотаксическая биопсия', category: 'Хирургия', price: 2500000, description: 'Точечная биопсия опухолей мозга под контролем навигации' },
    { id: 12, name: 'Эндоскопическая операция', category: 'Хирургия', price: 4000000, description: 'Малоинвазивные операции с использованием эндоскопа' },
    { id: 13, name: 'Консультация по эпилепсии', category: 'Консультации', price: 200000, description: 'Специализированная консультация эпилептолога' },
    { id: 14, name: 'Реабилитация после инсульта', category: 'Реабилитация', price: 350000, description: 'Комплексная программа восстановления после инсульта' },
    { id: 15, name: 'Физиотерапия', category: 'Реабилитация', price: 100000, description: 'Физиотерапевтические процедуры для восстановления' },
    { id: 16, name: 'Логопедия', category: 'Реабилитация', price: 120000, description: 'Восстановление речевых функций' },
    { id: 17, name: 'ЛФК (лечебная физкультура)', category: 'Реабилитация', price: 80000, description: 'Лечебная физическая культура под контролем специалиста' },
    { id: 18, name: 'Массаж', category: 'Реабилитация', price: 60000, description: 'Лечебный массаж для восстановления функций' },
    { id: 19, name: 'Психологическая помощь', category: 'Консультации', price: 100000, description: 'Психологическая поддержка пациентов и родственников' },
    { id: 20, name: 'Нейропсихологическое тестирование', category: 'Диагностика', price: 180000, description: 'Оценка когнитивных функций пациента' },
    { id: 21, name: 'Операция при гидроцефалии', category: 'Хирургия', price: 3500000, description: 'Шунтирующие операции при водянке головного мозга' },
    { id: 22, name: 'Лечение аневризм', category: 'Хирургия', price: 6000000, description: 'Хирургическое лечение аневризм сосудов мозга' },
    { id: 23, name: 'Тромбэктомия', category: 'Хирургия', price: 4500000, description: 'Удаление тромбов из сосудов головного мозга' },
    { id: 24, name: 'Краниопластика', category: 'Хирургия', price: 2000000, description: 'Пластическое восстановление костей черепа' },
    { id: 25, name: 'Повторная консультация', category: 'Консультации', price: 100000, description: 'Повторный прием у лечащего врача' },
    { id: 26, name: 'Консилиум врачей', category: 'Консультации', price: 300000, description: 'Коллегиальное обсуждение сложных случаев' },
    { id: 27, name: 'Операция при болезни Паркинсона', category: 'Хирургия', price: 7000000, description: 'Глубокая стимуляция мозга при болезни Паркинсона' },
    { id: 28, name: 'Лечение тремора', category: 'Хирургия', price: 5500000, description: 'Хирургическое лечение эссенциального тремора' },
    { id: 29, name: 'Вентрикулоскопия', category: 'Хирургия', price: 2800000, description: 'Эндоскопическое исследование желудочков мозга' },
    { id: 30, name: 'Микрохирургия позвоночника', category: 'Хирургия', price: 4200000, description: 'Микрохирургические операции на позвоночнике' },
    { id: 31, name: 'Спинальная анестезия', category: 'Анестезия', price: 200000, description: 'Проведение спинальной анестезии' },
    { id: 32, name: 'Общая анестезия', category: 'Анестезия', price: 300000, description: 'Проведение общего наркоза' },
    { id: 33, name: 'Местная анестезия', category: 'Анестезия', price: 50000, description: 'Местное обезболивание' },
    { id: 34, name: 'Интенсивная терапия', category: 'Реанимация', price: 500000, description: 'Интенсивная терапия в реанимации (сутки)' },
    { id: 35, name: 'ИВЛ', category: 'Реанимация', price: 400000, description: 'Искусственная вентиляция легких (сутки)' },
    { id: 36, name: 'Мониторинг в реанимации', category: 'Реанимация', price: 200000, description: 'Комплексный мониторинг жизненных функций' }
  ]);
  
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Админ', email: 'admin@neuro.uz', role: 'admin', status: 'active', createdAt: '2025-01-01' },
    { id: 2, name: 'Доктор Кариев', email: 'kariev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-01-15' },
    { id: 3, name: 'Доктор Асадуллаев', email: 'asadullaev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-02-01' },
    { id: 4, name: 'Доктор Кодашев', email: 'kodashev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-02-10' }
  ]);
  
  const [leadership, setLeadership] = useState([
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
  ]);
  
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, url: '/images/neuro-building.jpg', alt: 'Здание центра нейрохирургии', category: 'building' },
    { id: 2, url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', alt: 'Современная операционная', category: 'equipment' },
    { id: 3, url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6', alt: 'МРТ оборудование', category: 'equipment' },
    { id: 4, url: 'https://images.unsplash.com/photo-1526930382372-67bf22c0fce2', alt: 'Консультация врача с пациентом', category: 'doctors' },
    { id: 5, url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f', alt: 'Коридор больницы', category: 'building' },
    { id: 6, url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56', alt: 'Реабилитационный зал', category: 'equipment' },
    { id: 7, url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54', alt: 'Палата для пациентов', category: 'building' },
    { id: 8, url: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd', alt: 'Команда врачей', category: 'doctors' },
    { id: 9, url: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6', alt: 'Нейрохирургическое оборудование', category: 'equipment' },
    { id: 10, url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063', alt: 'Конференц-зал', category: 'building' }
  ]);

  // Настройки сайта
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

  // Функции для управления данными
  const updateSiteSettings = (newSettings) => {
    setSiteSettings(newSettings);
  };

  const updateSeoSettings = (newSettings) => {
    setSeoSettings(newSettings);
  };

  // Функции для управления услугами
  const addService = (service) => {
    const newId = Math.max(...services.map(s => s.id)) + 1;
    setServices([...services, { ...service, id: newId }]);
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
    const newId = Math.max(...departments.map(d => d.id)) + 1;
    setDepartments([...departments, { ...department, id: newId }]);
  };

  const updateDepartment = (id, updatedDepartment) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...updatedDepartment, id } : dept
    ));
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    // Отвязываем врачей от удаленного отделения
    setDoctors(doctors.map(doctor => 
      doctor.departmentId === id ? { ...doctor, departmentId: null } : doctor
    ));
  };

  // Функции для управления врачами
  const addDoctor = (doctor) => {
    const newId = Math.max(...doctors.map(d => d.id)) + 1;
    setDoctors([...doctors, { ...doctor, id: newId }]);
  };

  const updateDoctor = (id, updatedDoctor) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === id ? { ...updatedDoctor, id } : doctor
    ));
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  // Функции для управления новостями
  const addNews = (newsItem) => {
    const newId = Math.max(...news.map(n => n.id)) + 1;
    const today = new Date().toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setNews([...news, { ...newsItem, id: newId, date: today }]);
  };

  const updateNews = (id, updatedNews) => {
    setNews(news.map(item => 
      item.id === id ? { ...updatedNews, id, date: item.date } : item
    ));
  };

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  // Функции для управления аккаунтами
  const addAccount = (account) => {
    const newId = Math.max(...accounts.map(a => a.id)) + 1;
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
    const newId = Math.max(...leadership.map(l => l.id)) + 1;
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
    const newId = Math.max(...galleryImages.map(img => img.id)) + 1;
    setGalleryImages([...galleryImages, { ...image, id: newId }]);
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
    departments,
    doctors,
    news,
    services,
    accounts,
    leadership,
    galleryImages,
    siteSettings,
    seoSettings
  };

  const value = {
    adminData,
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
    

  },
  
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    departments: 'Departments',
    doctors: 'Doctors',
    services: 'Services',
    news: 'News',
    contacts: 'Contacts',
    appointment: 'Book Appointment',
    doctorCabinet: 'Doctor Cabinet',
    
    // Hero section
    heroTitle: 'Republican Scientific Center of Neurosurgery under the Ministry of Health of the Republic of Uzbekistan',
    heroSubtitle: 'Leading neurosurgery center in Central Asia',
    heroDescription: 'More than 25 years of experience in treating complex nervous system diseases',
    
    // Statistics
    totalBeds: 'Total bed capacity',
    plannedPlaces: 'Planned places',
    childrenPlaces: 'Children places',
    patientsPerYear: 'Patients per year',
    
    // Contact info
    contactUs: 'Contact us',
    address: 'Address',
    emergency24: 'Emergency help 24/7',
    
    // Buttons
    learnMore: 'Learn more',
    allDepartments: 'All departments',
    allNews: 'All news',
    readMore: 'Read more',
    backToHome: 'Back to home',
    
    // Footer
    workingHours: 'Working hours',
    navigation: 'Navigation',
    emergencyHelp: 'Emergency help 24/7',
    allRightsReserved: 'All rights reserved',
    
    // Services
    ourServices: 'Our Services',
    consultationBooking: 'Book consultation',
    
    // Common
    phone: 'Phone',
    email: 'Email',
    experience: 'Experience',
    specialization: 'Specialization',
    reception: 'Reception',
    price: 'Price',
    from: 'from',
    sum: 'UZS'
  },
  
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    about: 'Markaz haqida',
    departments: 'Bo\'limlar',
    doctors: 'Shifokorlar',
    services: 'Xizmatlar',
    news: 'Yangiliklar',
    contacts: 'Kontaktlar',
    appointment: 'Qabulga yozilish',
    doctorCabinet: 'Shifokor kabineti',
    
    // Hero section
    heroTitle: 'O\'zbekiston Respublikasi Sog\'liqni saqlash vazirligi huzuridagi Respublika Neyrojarrohlik ilmiy markazi',
    heroSubtitle: 'Markaziy Osiyodagi yetakchi neyrojarrohlik markazi',
    heroDescription: 'Asab tizimi kasalliklarini davolashda 25 yildan ortiq tajriba',
    
    // Statistics
    totalBeds: 'Umumiy to\'shak sig\'imi',
    plannedPlaces: 'Rejalashtirilgan joylar',
    childrenPlaces: 'Bolalar joylari',
    patientsPerYear: 'Yiliga bemorlar',
    
    // Contact info
    contactUs: 'Biz bilan bog\'laning',
    address: 'Manzil',
    emergency24: 'Shoshilinch yordam 24/7',
    
    // Buttons
    learnMore: 'Batafsil',
    allDepartments: 'Barcha bo\'limlar',
    allNews: 'Barcha yangiliklar',
    readMore: 'To\'liq o\'qish',
    backToHome: 'Bosh sahifaga qaytish',
    
    // Footer
    workingHours: 'Ish vaqti',
    navigation: 'Navigatsiya',
    emergencyHelp: 'Shoshilinch yordam 24/7',
    allRightsReserved: 'Barcha huquqlar himoyalangan',
    
    // Services
    ourServices: 'Bizning xizmatlarimiz',
    consultationBooking: 'Konsultatsiyaga yozilish',
    
    // Common
    phone: 'Telefon',
    email: 'Email',
    experience: 'Tajriba',
    specialization: 'Mutaxassislik',
    reception: 'Qabul',
    price: 'Narx',
    from: 'dan',
    sum: 'so\'m'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');
  
  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };
  
  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
      setCurrentLanguage(savedLang);
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      availableLanguages: ['ru', 'en', 'uz'],
      languageNames: {
        ru: 'Русский',
        en: 'English', 
        uz: 'O\'zbekcha'
      }
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Admin Context
const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Mock data structure for admin
const initialAdminData = {
  // Site settings
  siteSettings: {
    phones: ['+998 71 264-96-10', '+998 71 264-96-09', '+998 78 113-33-78'],
    emails: ['admin@neuro.uz', 'info@neuro.uz'],
    address: 'ул. Хумоюн, 40, Мирзо-Улугбекский район, г. Ташкент, 100142',
    socialMedia: {
      facebook: 'https://facebook.com/neuro.uz',
      instagram: 'https://instagram.com/neuro.uz',
      youtube: 'https://youtube.com/@neuro.uz'
    },
    workingHours: {
      weekdays: '8:00 - 18:00',
      saturday: '9:00 - 15:00',
      sunday: 'Выходной'
    }
  },
  
  // SEO settings
  seoSettings: {
    title: 'Республиканский Научный Центр Нейрохирургии',
    description: 'Ведущий центр нейрохирургии в Узбекистане. Современные методы лечения заболеваний нервной системы.',
    keywords: 'нейрохирургия, мозг, операции, Ташкент, Узбекистан',
    ogImage: 'https://neuro.uz/og-image.jpg'
  },
  
  // Services with prices
  services: [
    // Диагностика
    {
      id: 1,
      category: 'Диагностика',
      name: 'Компьютерная томография (КТ) головного мозга',
      price: 250000,
      description: 'Высокоточная диагностика с помощью современного КТ-сканера'
    },
    {
      id: 2,
      category: 'Диагностика',
      name: 'Магнитно-резонансная томография (МРТ) головного мозга',
      price: 350000,
      description: 'Детальное исследование мягких тканей головного и спинного мозга'
    },
    {
      id: 3,
      category: 'Диагностика',
      name: 'КТ позвоночника',
      price: 280000,
      description: 'Компьютерная томография позвоночника с контрастом'
    },
    {
      id: 4,
      category: 'Диагностика',
      name: 'МРТ позвоночника',
      price: 380000,
      description: 'Магнитно-резонансная томография позвоночника'
    },
    {
      id: 5,
      category: 'Диагностика',
      name: 'Электроэнцефалография (ЭЭГ)',
      price: 100000,
      description: 'Исследование электрической активности головного мозга'
    },
    {
      id: 6,
      category: 'Диагностика',
      name: 'Эхоэнцефалография',
      price: 80000,
      description: 'Ультразвуковое исследование головного мозга'
    },
    {
      id: 7,
      category: 'Диагностика',
      name: 'Рентгенография черепа',
      price: 50000,
      description: 'Рентгеновское исследование костей черепа'
    },
    {
      id: 8,
      category: 'Диагностика',
      name: 'Цифровая субтракционная ангиография',
      price: 500000,
      description: 'Исследование сосудов головного мозга с контрастом'
    },

    // Консультации
    {
      id: 9,
      category: 'Консультации',
      name: 'Первичная консультация нейрохирурга',
      price: 150000,
      description: 'Осмотр и консультация специалиста с назначением лечения'
    },
    {
      id: 10,
      category: 'Консультации',
      name: 'Повторная консультация нейрохирурга',
      price: 100000,
      description: 'Контрольный осмотр и корректировка лечения'
    },
    {
      id: 11,
      category: 'Консультации',
      name: 'Консультация по результатам МРТ/КТ',
      price: 120000,
      description: 'Расшифровка и интерпретация результатов исследований'
    },
    {
      id: 12,
      category: 'Консультации',
      name: 'Предоперационная консультация',
      price: 200000,
      description: 'Подготовка к хирургическому вмешательству'
    },
    {
      id: 13,
      category: 'Консультации',
      name: 'Послеоперационная консультация',
      price: 150000,
      description: 'Наблюдение после хирургического лечения'
    },

    // Хирургия головного мозга
    {
      id: 14,
      category: 'Хирургия головного мозга',
      name: 'Удаление опухоли головного мозга',
      price: 15000000,
      description: 'Микрохирургическое удаление новообразований головного мозга'
    },
    {
      id: 15,
      category: 'Хирургия головного мозга',
      name: 'Эндоскопическое удаление опухоли',
      price: 18000000,
      description: 'Малоинвазивное удаление опухолей с помощью эндоскопа'
    },
    {
      id: 16,
      category: 'Хирургия головного мозга',
      name: 'Клипирование аневризмы',
      price: 12000000,
      description: 'Хирургическое лечение аневризм сосудов головного мозга'
    },
    {
      id: 17,
      category: 'Хирургия головного мозга',
      name: 'Удаление гематомы',
      price: 8000000,
      description: 'Эвакуация внутричерепной гематомы'
    },
    {
      id: 18,
      category: 'Хирургия головного мозга',
      name: 'Вентрикулоперитонеальное шунтирование',
      price: 6000000,
      description: 'Установка шунта при гидроцефалии'
    },
    {
      id: 19,
      category: 'Хирургия головного мозга',
      name: 'Краниопластика',
      price: 5000000,
      description: 'Пластика дефектов костей черепа'
    },

    // Хирургия позвоночника
    {
      id: 20,
      category: 'Хирургия позвоночника',
      name: 'Удаление грыжи межпозвонкового диска',
      price: 4000000,
      description: 'Микрохирургическое удаление грыжи диска'
    },
    {
      id: 21,
      category: 'Хирургия позвоночника',
      name: 'Ламинэктомия',
      price: 5000000,
      description: 'Удаление дужки позвонка для декомпрессии'
    },
    {
      id: 22,
      category: 'Хирургия позвоночника',
      name: 'Спондилодез',
      price: 8000000,
      description: 'Стабилизация позвоночника с фиксацией'
    },
    {
      id: 23,
      category: 'Хирургия позвоночника',
      name: 'Удаление опухоли позвоночника',
      price: 12000000,
      description: 'Хирургическое лечение новообразований позвоночника'
    },
    {
      id: 24,
      category: 'Хирургия позвоночника',
      name: 'Эндоскопическая дискэктомия',
      price: 6000000,
      description: 'Малоинвазивное удаление грыжи диска'
    },

    // Детская нейрохирургия
    {
      id: 25,
      category: 'Детская нейрохирургия',
      name: 'Лечение врожденных пороков развития',
      price: 10000000,
      description: 'Хирургическая коррекция врожденных аномалий нервной системы'
    },
    {
      id: 26,
      category: 'Детская нейрохирургия',
      name: 'Лечение гидроцефалии у детей',
      price: 7000000,
      description: 'Шунтирующие операции при детской гидроцефалии'
    },
    {
      id: 27,
      category: 'Детская нейрохирургия',
      name: 'Удаление опухолей мозга у детей',
      price: 15000000,
      description: 'Специализированное лечение детских опухолей мозга'
    },
    {
      id: 28,
      category: 'Детская нейрохирургия',
      name: 'Лечение эпилепсии у детей',
      price: 12000000,
      description: 'Хирургическое лечение фармакорезистентной эпилепсии'
    },

    // Функциональная нейрохирургия
    {
      id: 29,
      category: 'Функциональная нейрохирургия',
      name: 'Глубокая стимуляция мозга (DBS)',
      price: 25000000,
      description: 'Имплантация системы глубокой стимуляции мозга'
    },
    {
      id: 30,
      category: 'Функциональная нейрохирургия',
      name: 'Лечение болезни Паркинсона',
      price: 20000000,
      description: 'Стереотаксические операции при болезни Паркинсона'
    },
    {
      id: 31,
      category: 'Функциональная нейрохирургия',
      name: 'Лечение эссенциального тремора',
      price: 18000000,
      description: 'Хирургическое лечение патологического тремора'
    },
    {
      id: 32,
      category: 'Функциональная нейрохирургия',
      name: 'Хирургическое лечение эпилепсии',
      price: 15000000,
      description: 'Резекционные операции при эпилепсии'
    },

    // Сосудистая нейрохирургия
    {
      id: 33,
      category: 'Сосудистая нейрохирургия',
      name: 'Эмболизация аневризмы',
      price: 15000000,
      description: 'Эндоваскулярное лечение аневризм'
    },
    {
      id: 34,
      category: 'Сосудистая нейрохирургия',
      name: 'Каротидная эндартерэктомия',
      price: 8000000,
      description: 'Операция на сонных артериях'
    },
    {
      id: 35,
      category: 'Сосудистая нейрохирургия',
      name: 'Лечение АВМ головного мозга',
      price: 18000000,
      description: 'Удаление артериовенозных мальформаций'
    },
    {
      id: 36,
      category: 'Сосудистая нейрохирургия',
      name: 'Тромбэктомия',
      price: 5000000,
      description: 'Удаление тромба из сосудов головного мозга'
    }
  ]
};

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(initialAdminData);
  
  const updateSiteSettings = (newSettings) => {
    setAdminData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...newSettings }
    }));
  };
  
  const updateSeoSettings = (newSettings) => {
    setAdminData(prev => ({
      ...prev,
      seoSettings: { ...prev.seoSettings, ...newSettings }
    }));
  };
  
  const updateServices = (newServices) => {
    setAdminData(prev => ({
      ...prev,
      services: newServices
    }));
  };
  
  const addService = (service) => {
    setAdminData(prev => ({
      ...prev,
      services: [...prev.services, { ...service, id: Date.now() }]
    }));
  };
  
  const updateService = (id, updatedService) => {
    setAdminData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, ...updatedService } : service
      )
    }));
  };
  
  const deleteService = (id) => {
    setAdminData(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
  };
  
  return (
    <AdminContext.Provider value={{
      adminData,
      updateSiteSettings,
      updateSeoSettings,
      updateServices,
      addService,
      updateService,
      deleteService
    }}>
      {children}
    </AdminContext.Provider>
  );
};