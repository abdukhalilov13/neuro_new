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
      centerOfNeurosurgery: 'Центр Нейрохирургии',
      navigation: 'Навигация',
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
      tuesdaySaturdayReception: 'Вт-Сб 9:00-17:00'
    },
    uz: {
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
      centerOfNeurosurgery: 'Neyroxirurgiya Markazi',
      navigation: 'Navigatsiya',
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
      tuesdaySaturdayReception: 'Se-Sh 9:00-17:00'
    },
    en: {
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
      centerOfNeurosurgery: 'Center of Neurosurgery',
      navigation: 'Navigation',
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
      tuesdaySaturdayReception: 'Tue-Sat 9:00-17:00'
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
  // Initialize with empty arrays, will be populated from API
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch departments
        const departmentsData = await apiService.getDepartments();
        setDepartments(departmentsData);
        
        // Fetch doctors
        const doctorsData = await apiService.getDoctors();
        setDoctors(doctorsData);
        
        // Fetch services
        const servicesData = await apiService.getServices();
        setServices(servicesData);
        
        // Fetch news
        const newsData = await apiService.getNews();
        setNews(newsData);
        
        // Fetch gallery
        const galleryData = await apiService.getGallery();
        setGalleryImages(galleryData);
        
      } catch (error) {
        console.error("Error fetching data from API:", error);
        // В случае ошибки, оставляем пустые массивы
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
    setDepartments([...departments, { ...department, id: newId.toString() }]);
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
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => parseInt(d.id))) + 1 : 1;
    setDoctors([...doctors, { ...doctor, id: newId.toString() }]);
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
    const newId = news.length > 0 ? Math.max(...news.map(n => parseInt(n.id))) + 1 : 1;
    const today = new Date().toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setNews([...news, { ...newsItem, id: newId.toString(), date: today }]);
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