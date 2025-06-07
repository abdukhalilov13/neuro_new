import React, { createContext, useContext, useState, useEffect } from 'react';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations
const translations = {
  ru: {
    // Navigation
    home: 'Главная',
    about: 'О центре',
    departments: 'Отделения',
    doctors: 'Врачи',
    services: 'Услуги',
    news: 'Новости',
    contacts: 'Контакты',
    appointment: 'Записаться на прием',
    doctorCabinet: 'Кабинет врача',
    
    // Hero section
    heroTitle: 'Республиканский Научный Центр Нейрохирургии при Министерстве Здравоохранения Республики Узбекистан',
    heroSubtitle: 'Ведущий центр нейрохирургии в Центральной Азии',
    heroDescription: 'Более 25 лет опыта в лечении сложнейших заболеваний нервной системы',
    
    // Statistics
    totalBeds: 'Общая вместимость коек',
    plannedPlaces: 'Плановых мест',
    childrenPlaces: 'Детских мест',
    patientsPerYear: 'Пациентов в год',
    
    // Contact info
    contactUs: 'Связаться с нами',
    address: 'Адрес',
    emergency24: 'Экстренная помощь 24/7',
    
    // Buttons
    learnMore: 'Подробнее',
    allDepartments: 'Все отделения',
    allNews: 'Все новости',
    readMore: 'Читать далее',
    backToHome: 'Вернуться на главную',
    
    // Footer
    workingHours: 'Режим работы',
    navigation: 'Навигация',
    emergencyHelp: 'Экстренная помощь 24/7',
    allRightsReserved: 'Все права защищены',
    
    // Services
    ourServices: 'Наши услуги',
    consultationBooking: 'Записаться на консультацию',
    
    // Common
    phone: 'Телефон',
    email: 'Email',
    experience: 'Опыт',
    specialization: 'Специализация',
    reception: 'Прием',
    price: 'Цена',
    from: 'от',
    sum: 'сум'
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
    {
      id: 1,
      category: 'Диагностика',
      name: 'Компьютерная томография (КТ)',
      price: 250000,
      description: 'Высокоточная диагностика с помощью современного КТ-сканера'
    },
    {
      id: 2,
      category: 'Диагностика',
      name: 'Магнитно-резонансная томография (МРТ)',
      price: 350000,
      description: 'Детальное исследование мягких тканей головного и спинного мозга'
    },
    {
      id: 3,
      category: 'Хирургия',
      name: 'Удаление опухоли головного мозга',
      price: 15000000,
      description: 'Микрохирургическое удаление новообразований головного мозга'
    },
    {
      id: 4,
      category: 'Хирургия',
      name: 'Операция на позвоночнике',
      price: 8000000,
      description: 'Хирургическое лечение заболеваний позвоночника'
    },
    {
      id: 5,
      category: 'Консультации',
      name: 'Первичная консультация нейрохирурга',
      price: 150000,
      description: 'Осмотр и консультация специалиста с назначением лечения'
    },
    {
      id: 6,
      category: 'Консультации',
      name: 'Повторная консультация',
      price: 100000,
      description: 'Контрольный осмотр и корректировка лечения'
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