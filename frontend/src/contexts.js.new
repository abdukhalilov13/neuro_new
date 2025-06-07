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
    sum: 'сум',
    
    // Additional translations
    centerOfNeurosurgery: 'Центр нейрохирургии',
    footerDescription: 'Республиканский Научный Центр Нейрохирургии - ведущее медицинское учреждение Узбекистана, специализирующееся на лечении заболеваний нервной системы.',
    mondayFriday: 'Пн-Пт',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
    centerName: 'Республиканский Научный Центр Нейрохирургии',
    ourDepartments: 'Наши отделения',
    departmentsSubtitle: 'Специализированные подразделения центра',
    latestNews: 'Последние новости',
    newsSubtitle: 'События и достижения центра',
    centerInNumbers: 'Центр в цифрах',
    numbersSubtitle: 'Факты и достижения нашего центра',
    totalBeds: 'Общая вместимость коек',
    plannedPlaces: 'Плановых мест',
    childrenPlaces: 'Детских мест',
    patientsPerYear: 'Пациентов в год'
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