/* eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from './api'; // ДОБАВИЛИ ИМПОРТ API SERVICE
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Search,
  Filter,
  Download,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Building,
  UserCheck,
  Crown,
  BookOpen,
  ImageIcon,
  Shield,
  Activity,
  Brain,
  Award,
  Heart,
  Star,
  RefreshCw,
  FileText,
  Check,
  Upload,
  Camera,
  Stethoscope,
  Globe,
  Languages,
  ChevronDown,
  Briefcase,
  Info,
  UserPlus,
  Target,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';
import { ContactsSection, SeoSection, RedirectsSection } from './admin-additional-sections';
import { VacancyApplicationsManager } from './vacancy-manager';
import { VacanciesAdminManager } from './vacancies-admin';

// Компонент модального окна
const Modal = ({ isOpen, onClose, title, children, size = 'default' }) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    default: 'max-w-2xl',
    large: 'max-w-4xl',
    small: 'max-w-md'
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-white rounded-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Компонент переключения языков в админке
const AdminLanguageSwitcher = ({ currentLanguage, onLanguageChange, languages }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            currentLanguage === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

// Упрощенный компонент обрезки изображений
const ImageCropper = ({ onCrop, aspectRatio = 1, onClose }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  
  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = () => {
    if (!imageSrc) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;
    
    if (!image || !canvas) return;
    
    const size = Math.min(image.naturalWidth, image.naturalHeight);
    const cropSize = aspectRatio === 1 ? size : size * aspectRatio;
    
    canvas.width = 400;
    canvas.height = 400 / aspectRatio;
    
    const sourceX = (image.naturalWidth - size) / 2;
    const sourceY = (image.naturalHeight - size) / 2;
    
    ctx.drawImage(
      image,
      sourceX, sourceY, size, size,
      0, 0, canvas.width, canvas.height
    );
    
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        onCrop(reader.result);
        onClose();
      };
      reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.8);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Обрезка изображения</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          {!imageSrc ? (
            <div className="text-center py-8">
              <input
                type="file"
                accept="image/*"
                onChange={onFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-gray-500 mt-2">Выберите изображение для обрезки</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Для обрезки"
                  className="max-w-full max-h-64 mx-auto"
                  style={{ display: 'none' }}
                  onLoad={() => {
                    // Автоматически обрезаем после загрузки
                    setTimeout(cropImage, 100);
                  }}
                />
                <img
                  src={imageSrc}
                  alt="Превью"
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Изображение будет автоматически обрезано до {aspectRatio === 1 ? 'квадратного' : 'прямоугольного'} формата
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setImageSrc(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Выбрать другое
                </button>
                <button
                  onClick={cropImage}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Обрезать
                </button>
              </div>
            </div>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
};

// Обновленный компонент загрузки файлов с обрезкой
const FileUploader = ({ onFileSelect, currentFile, accept = "image/*", label = "Выберите файл", enableCrop = true, aspectRatio = 1 }) => {
  const [preview, setPreview] = useState(currentFile || '');
  const [isUploading, setIsUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (enableCrop && file.type.startsWith('image/')) {
      setShowCropper(true);
    } else {
      processFile(file);
    }
  };
  
  const processFile = (file) => {
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onFileSelect(base64String);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      setIsUploading(false);
    }
  };
  
  const handleCroppedImage = (croppedImage) => {
    setPreview(croppedImage);
    onFileSelect(croppedImage);
    setShowCropper(false);
  };
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {isUploading && (
          <div className="text-blue-600">
            <RefreshCw className="w-4 h-4 animate-spin" />
          </div>
        )}
      </div>
      {preview && (
        <div className="mt-3">
          <img 
            src={preview} 
            alt="Превью" 
            className="w-32 h-32 object-cover rounded-lg border"
          />
          {enableCrop && (
            <button
              onClick={() => setShowCropper(true)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Обрезать изображение
            </button>
          )}
        </div>
      )}
      
      {showCropper && (
        <ImageCropper
          onCrop={handleCroppedImage}
          aspectRatio={aspectRatio}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
};

// ЕДИНАЯ АДМИН-ПАНЕЛЬ (объединены все функции)
const UnifiedAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentAdminLanguage, setCurrentAdminLanguage] = useState('ru');
  const [showAppointmentFilters, setShowAppointmentFilters] = useState(false);

  // Функция экспорта в Excel
  const exportToExcel = () => {
    // Простая имитация экспорта
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Время,Пациент,Врач,Услуга,Статус,Телефон,Email\n"
      + todayAppointments.map(app => 
          `${app.time},"${app.patient_name}","${app.doctor_name}","${app.service}","${app.status}","${app.phone}","${app.email}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `записи_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Состояния для модальных окон
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isLeadershipModalOpen, setIsLeadershipModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  
  // Данные для редактирования
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  const [editingLeadership, setEditingLeadership] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [editingSeo, setEditingSeo] = useState(null);
  const [editingRedirect, setEditingRedirect] = useState(null);

  // Данные событий
  const [newEvent, setNewEvent] = useState({
    title_ru: '', title_uz: '', title_en: '',
    description_ru: '', description_uz: '', description_en: '',
    date: '',
    time: '',
    location: '',
    type: 'conference'
  });
  
  // Состояния для модальных окон пользователей
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'doctor',
    email: '',
    password: '',
    status: 'active'
  });
  
  // Новые записи с многоязычностью
  const [newDepartment, setNewDepartment] = useState({
    name_ru: '', name_uz: '', name_en: '',
    description_ru: '', description_uz: '', description_en: '',
    icon: 'Brain',
    color: 'from-blue-500 to-blue-600'
  });
  
  const [newDoctor, setNewDoctor] = useState({
    name_ru: '', name_uz: '', name_en: '',
    specialization_ru: '', specialization_uz: '', specialization_en: '',
    experience: '',
    image: '',
    email: '',
    phone: '',
    reception_ru: '', reception_uz: '', reception_en: '',
    department_id: '',
    schedule: {
      monday: { start: '09:00', end: '17:00', active: true },
      tuesday: { start: '09:00', end: '17:00', active: true },
      wednesday: { start: '09:00', end: '17:00', active: true },
      thursday: { start: '09:00', end: '17:00', active: true },
      friday: { start: '09:00', end: '17:00', active: true },
      saturday: { start: '09:00', end: '15:00', active: false },
      sunday: { start: '09:00', end: '15:00', active: false }
    }
  });
  
  const [newNews, setNewNews] = useState({
    title_ru: '', title_uz: '', title_en: '',
    excerpt_ru: '', excerpt_uz: '', excerpt_en: '',
    content_ru: '', content_uz: '', content_en: '',
    image: '',
    is_published: true
  });
  
  const [newService, setNewService] = useState({
    title_ru: '', title_uz: '', title_en: '',
    description_ru: '', description_uz: '', description_en: '',
    category_ru: '', category_uz: '', category_en: '',
    price: '',
    duration: ''
  });
  
  const [newLeadership, setNewLeadership] = useState({
    name: '',
    position: '',
    image: '',
    email: '',
    phone: '',
    biography: ''
  });
  
  const [newGalleryImage, setNewGalleryImage] = useState({
    url: '',
    alt_ru: '', alt_uz: '', alt_en: '',
    category: 'building'
  });

  // Состояния для вакансий
  const [isVacancyModalOpen, setIsVacancyModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [newVacancy, setNewVacancy] = useState({
    title_ru: '', title_uz: '', title_en: '',
    department_ru: '', department_uz: '', department_en: '',
    type_ru: '', type_uz: '', type_en: '',
    salary: '',
    requirements_ru: [''], requirements_uz: [''], requirements_en: [''],
    responsibilities_ru: [''], responsibilities_uz: [''], responsibilities_en: [''],
    benefits_ru: [''], benefits_uz: [''], benefits_en: ['']
  });

  // Загружаем заявки на вакансии
  const [jobApplications, setJobApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('neuro_job_applications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // События (добавляем новое состояние)
  const [events, setEvents] = useState([
    {
      id: 1,
      title_ru: 'Международная конференция по нейрохирургии',
      title_uz: 'Neyroxirurgiya bo\'yicha xalqaro konferensiya',
      title_en: 'International Neurosurgery Conference',
      description_ru: 'Ведущие специалисты обсудят новые методы лечения',
      description_uz: 'Etakchi mutaxassislar yangi davolash usullarini muhokama qilishadi',
      description_en: 'Leading specialists will discuss new treatment methods',
      date: '2025-07-15',
      time: '09:00',
      location: 'Главный конференц-зал',
      type: 'conference'
    },
    {
      id: 2,
      title_ru: 'День открытых дверей',
      title_uz: 'Ochiq eshiklar kuni',
      title_en: 'Open Day',
      description_ru: 'Экскурсии по центру и консультации',
      description_uz: 'Markaz bo\'ylab ekskursiya va konsultatsiyalar',
      description_en: 'Center tours and consultations',
      date: '2025-07-20',
      time: '10:00',
      location: 'Главный холл',
      type: 'openDay'
    }
  ]);

  // Используем данные из контекста - ВСЕ функции синхронизированы!
  const { adminData, 
    addDepartment, updateDepartment, deleteDepartment,
    addDoctor, updateDoctor, deleteDoctor,
    addNews, updateNews, deleteNews,
    addService, updateService, deleteService,
    addLeadership, updateLeadership, deleteLeadership,
    addGalleryImage, updateGalleryImage, deleteGalleryImage,
    addVacancy, updateVacancy, deleteVacancy,
    addAccount, updateAccount, deleteAccount, toggleAccountStatus
  } = useAdmin();
  
  const { t } = useLanguage();
  const languages = ['ru', 'uz', 'en'];
  
  // Записи на сегодня (ЗАГРУЗКА ИЗ API)
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  // Загрузка записей на сегодня
  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        setAppointmentsLoading(true);
        const appointments = await apiService.getAppointments();
        
        // Фильтруем записи на сегодня
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const todayApps = appointments.filter(app => app.date === today);
        
        setTodayAppointments(todayApps);
      } catch (error) {
        console.error('Failed to fetch today appointments:', error);
        setTodayAppointments([]);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log('=== НАЧАЛО ПРОЦЕССА ВХОДА ===');
    console.log('Email:', loginData.email);
    console.log('Password length:', loginData.password.length);
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    
    try {
      // Используем API для аутентификации
      const response = await apiService.login(loginData.email, loginData.password);
      
      console.log('=== ОТВЕТ ОТ СЕРВЕРА ===');
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (response.message === 'Login successful' && response.user) {
        console.log('Пользователь:', response.user);
        console.log('Роль пользователя:', response.user.role);
        
        // Проверяем роль пользователя
        if (response.user.role === 'admin' || response.user.role === 'manager') {
          console.log('✅ УСПЕШНЫЙ ВХОД! Устанавливаю isAuthenticated = true');
          setIsAuthenticated(true);
        } else {
          console.log('❌ ОТКАЗ: Неподходящая роль:', response.user.role);
          alert('У вас нет прав доступа к админ-панели. Требуется роль администратора.');
        }
      } else if (response.error) {
        console.log('❌ ОШИБКА ОТВЕТА:', response.error);
        alert(`Ошибка входа: ${response.error}`);
      } else {
        console.log('❌ НЕИЗВЕСТНАЯ СТРУКТУРА ОТВЕТА:', response);
        alert('Неверный email или пароль');
      }
    } catch (error) {
      console.log('=== ИСКЛЮЧЕНИЕ ===');
      console.error('Детали ошибки входа:', error);
      console.error('Error stack:', error.stack);
      alert('Ошибка подключения к серверу. Проверьте подключение и попробуйте снова.');
    }
    
    console.log('=== КОНЕЦ ПРОЦЕССА ВХОДА ===');
  };

  // Функции управления отделениями
  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, newDepartment);
        alert('Отделение обновлено! Изменения синхронизированы с сайтом.');
      } else {
        await addDepartment(newDepartment);
        alert('Отделение добавлено! Изменения синхронизированы с сайтом.');
      }
      setIsDepartmentModalOpen(false);
      resetDepartmentForm();
    } catch (error) {
      console.error('Error with department operation:', error);
      alert('Ошибка при сохранении отделения. Проверьте подключение и попробуйте снова.');
    }
  };

  const resetDepartmentForm = () => {
    setNewDepartment({
      name_ru: '', name_uz: '', name_en: '',
      description_ru: '', description_uz: '', description_en: '',
      icon: 'Brain',
      color: 'from-blue-500 to-blue-600'
    });
    setEditingDepartment(null);
  };

  const startEditDepartment = (department) => {
    setEditingDepartment(department);
    setNewDepartment(department);
    setIsDepartmentModalOpen(true);
  };

  // Функции управления врачами
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, newDoctor);
        alert('Врач обновлен! Изменения синхронизированы с сайтом.');
      } else {
        await addDoctor(newDoctor);
        alert('Врач добавлен! Изменения синхронизированы с сайтом.');
      }
      setIsDoctorModalOpen(false);
      resetDoctorForm();
    } catch (error) {
      console.error('Error with doctor operation:', error);
      alert('Ошибка при сохранении врача. Проверьте подключение и попробуйте снова.');
    }
  };

  const resetDoctorForm = () => {
    setNewDoctor({
      name_ru: '', name_uz: '', name_en: '',
      specialization_ru: '', specialization_uz: '', specialization_en: '',
      experience: '',
      image: '',
      email: '',
      phone: '',
      reception_ru: '', reception_uz: '', reception_en: '',
      department_id: '',
      schedule: {
        monday: { start: '09:00', end: '17:00', active: true },
        tuesday: { start: '09:00', end: '17:00', active: true },
        wednesday: { start: '09:00', end: '17:00', active: true },
        thursday: { start: '09:00', end: '17:00', active: true },
        friday: { start: '09:00', end: '17:00', active: true },
        saturday: { start: '09:00', end: '15:00', active: false },
        sunday: { start: '09:00', end: '15:00', active: false }
      }
    });
    setEditingDoctor(null);
  };

  const startEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor(doctor);
    setIsDoctorModalOpen(true);
  };

  // Функции управления новостями
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await updateNews(editingNews.id, newNews);
        alert('Новость обновлена! Изменения синхронизированы с сайтом.');
      } else {
        await addNews(newNews);
        alert('Новость добавлена! Изменения синхронизированы с сайтом.');
      }
      setIsNewsModalOpen(false);
      resetNewsForm();
    } catch (error) {
      console.error('Error with news operation:', error);
      alert('Ошибка при сохранении новости. Проверьте подключение и попробуйте снова.');
    }
  };

  const resetNewsForm = () => {
    setNewNews({
      title_ru: '', title_uz: '', title_en: '',
      excerpt_ru: '', excerpt_uz: '', excerpt_en: '',
      content_ru: '', content_uz: '', content_en: '',
      image: '',
      is_published: true
    });
    setEditingNews(null);
  };

  const startEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setNewNews(newsItem);
    setIsNewsModalOpen(true);
  };

  // Функции управления услугами
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateService(editingService.id, newService);
        alert('Услуга обновлена! Изменения синхронизированы с сайтом.');
      } else {
        await addService(newService);
        alert('Услуга добавлена! Изменения синхронизированы с сайтом.');
      }
      setIsServiceModalOpen(false);
      resetServiceForm();
    } catch (error) {
      console.error('Error with service operation:', error);
      alert('Ошибка при сохранении услуги. Проверьте подключение и попробуйте снова.');
    }
  };

  const resetServiceForm = () => {
    setNewService({
      title_ru: '', title_uz: '', title_en: '',
      description_ru: '', description_uz: '', description_en: '',
      category_ru: '', category_uz: '', category_en: '',
      price: '',
      duration: ''
    });
    setEditingService(null);
  };

  const startEditService = (service) => {
    setEditingService(service);
    setNewService(service);
    setIsServiceModalOpen(true);
  };

  // Функции управления руководством
  const handleLeadershipSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLeadership) {
        await updateLeadership(editingLeadership.id, newLeadership);
        alert('Руководитель обновлен! Изменения синхронизированы с сайтом.');
      } else {
        await addLeadership(newLeadership);
        alert('Руководитель добавлен! Изменения синхронизированы с сайтом.');
      }
      setIsLeadershipModalOpen(false);
      resetLeadershipForm();
    } catch (error) {
      console.error('Error with leadership operation:', error);
      alert('Ошибка при сохранении руководителя. Проверьте подключение и попробуйте снова.');
    }
  };

  const resetLeadershipForm = () => {
    setNewLeadership({
      name: '',
      position: '',
      image: '',
      email: '',
      phone: '',
      biography: ''
    });
    setEditingLeadership(null);
  };

  const startEditLeadership = (leader) => {
    setEditingLeadership(leader);
    setNewLeadership(leader);
    setIsLeadershipModalOpen(true);
  };

  // Функции управления галереей
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGalleryImage) {
        await updateGalleryImage(editingGalleryImage.id, newGalleryImage);
        alert('Изображение обновлено! Изменения синхронизированы с сайтом.');
      } else {
        await addGalleryImage(newGalleryImage);
        alert('Изображение добавлено! Изменения синхронизированы с сайтом.');
      }
      setIsGalleryModalOpen(false);
      resetGalleryForm();
    } catch (error) {
      console.error('Error with gallery operation:', error);
      alert('Ошибка при сохранении изображения. Проверьте подключение и попробуйте снова.');
    }
  };

  const resetGalleryForm = () => {
    setNewGalleryImage({
      url: '',
      alt_ru: '', alt_uz: '', alt_en: '',
      category: 'building'
    });
    setEditingGalleryImage(null);
  };

  const startEditGalleryImage = (image) => {
    setEditingGalleryImage(image);
    setNewGalleryImage(image);
    setIsGalleryModalOpen(true);
  };

  // Функции управления событиями
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      const updatedEvents = events.map(event => 
        event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
      );
      setEvents(updatedEvents);
      alert('Событие обновлено!');
    } else {
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      setEvents([...events, { ...newEvent, id: newId }]);
      alert('Событие добавлено!');
    }
    setIsEventModalOpen(false);
    resetEventForm();
  };

  const resetEventForm = () => {
    setNewEvent({
      title_ru: '', title_uz: '', title_en: '',
      description_ru: '', description_uz: '', description_en: '',
      date: '',
      time: '',
      location: '',
      type: 'conference'
    });
    setEditingEvent(null);
  };

  const startEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setIsEventModalOpen(true);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // Функции управления вакансиями
  const handleVacancySubmit = (e) => {
    e.preventDefault();
    if (editingVacancy) {
      updateVacancy(editingVacancy.id, newVacancy);
      alert('Вакансия обновлена!');
    } else {
      addVacancy(newVacancy);
      alert('Вакансия добавлена!');
    }
    setIsVacancyModalOpen(false);
    resetVacancyForm();
  };

  const resetVacancyForm = () => {
    setNewVacancy({
      title_ru: '', title_uz: '', title_en: '',
      department_ru: '', department_uz: '', department_en: '',
      type_ru: '', type_uz: '', type_en: '',
      salary: '',
      requirements_ru: [''], requirements_uz: [''], requirements_en: [''],
      responsibilities_ru: [''], responsibilities_uz: [''], responsibilities_en: [''],
      benefits_ru: [''], benefits_uz: [''], benefits_en: ['']
    });
    setEditingVacancy(null);
  };

  const startEditVacancy = (vacancy) => {
    setEditingVacancy(vacancy);
    setNewVacancy(vacancy);
    setIsVacancyModalOpen(true);
  };

  // Обновляем данные заявок при изменении localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('neuro_job_applications');
        setJobApplications(saved ? JSON.parse(saved) : []);
      } catch {
        setJobApplications([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Функции управления пользователями
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('handleUserSubmit called');
      console.log('editingUser:', editingUser);
      console.log('newUser:', newUser);
      
      if (editingUser) {
        // Обновляем через API (удалили дублирование localStorage)
        console.log('Updating user with ID:', editingUser.id);
        const result = await updateAccount(editingUser.id, newUser);
        console.log('Update result:', result);
        alert('Пользователь обновлен! Пароль изменен.');
      } else {
        // Добавляем через API (удалили дублирование localStorage)
        console.log('Creating new user');
        const result = await addAccount(newUser);
        console.log('Create result:', result);
        alert('Пользователь создан!');
      }
      setIsUserModalOpen(false);
      resetUserForm();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Ошибка при сохранении пользователя!');
    }
  };

  const resetUserForm = () => {
    setNewUser({
      name: '',
      role: 'doctor',
      email: '',
      password: '',
      status: 'active'
    });
    setEditingUser(null);
  };

  const startEditUser = (user) => {
    setEditingUser(user);
    setNewUser({...user, password: ''});
    setIsUserModalOpen(true);
  };

  const deleteUser = (id) => {
    if (id === 1) {
      alert('Нельзя удалить главного администратора!');
      return;
    }
    deleteAccount(id);
    alert('Пользователь удален!');
  };

  const toggleUserStatus = (id) => {
    if (id === 1) {
      alert('Нельзя деактивировать главного администратора!');
      return;
    }
    toggleAccountStatus(id);
    alert('Статус пользователя изменен!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Единая Админ-панель</h1>
            <p className="text-gray-600 mt-2">Полное управление сайтом с синхронизацией</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="admin@neuro.uz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="admin123"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-purple-600 hover:text-purple-700">
              Вернуться на главную
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-xl font-bold text-gray-900">NEURO.UZ</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Единая Админ-панель</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                ✅ Полная синхронизация с сайтом
              </div>
              <Bell className="w-5 h-5 text-gray-600" />
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
              { id: 'appointments', label: 'Записи на сегодня', icon: Calendar },
              { id: 'departments', label: 'Отделения', icon: Building },
              { id: 'doctors', label: 'Врачи', icon: Stethoscope },
              { id: 'services', label: 'Услуги', icon: Wrench },
              { id: 'leadership', label: 'Руководство', icon: Crown },
              { id: 'news', label: 'Новости', icon: FileText },
              { id: 'gallery', label: 'Галерея', icon: ImageIcon },
              { id: 'events', label: 'События', icon: Star },
              { id: 'vacancies', label: 'Вакансии', icon: Briefcase },
              { id: 'contacts', label: 'Контакты', icon: Phone },
              { id: 'seo', label: 'SEO настройки', icon: Settings },
              { id: 'redirects', label: 'Редиректы', icon: ArrowRight },
              { id: 'users', label: 'Пользователи', icon: UserPlus }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Уведомление о синхронизации */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Единая панель с полной синхронизацией!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    ✅ Все изменения автоматически отображаются на сайте<br/>
                    ✅ Многоязычная поддержка (RU/UZ/EN)<br/>
                    ✅ Управление всем контентом в одном месте
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Отделений</p>
                    <p className="text-2xl font-semibold text-gray-900">{adminData.departments?.length || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <Stethoscope className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Врачей</p>
                    <p className="text-2xl font-semibold text-gray-900">{adminData.doctors?.length || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Crown className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Руководителей</p>
                    <p className="text-2xl font-semibold text-gray-900">{adminData.leadership?.length || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Новостей</p>
                    <p className="text-2xl font-semibold text-gray-900">{adminData.news?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('leadership')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <span>Управление руководством</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('departments')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-blue-600" />
                      <span>Управление отделениями</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('doctors')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                      <span>Управление врачами</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Контент сайта</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('news')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-yellow-600" />
                      <span>Управление новостями</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Wrench className="w-5 h-5 text-orange-600" />
                      <span>Управление услугами</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="w-5 h-5 text-indigo-600" />
                      <span>Управление галереей</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Поддержка языков</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Русский (основной)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">O'zbek tili</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">English</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ЗАПИСЕЙ НА СЕГОДНЯ (только просмотр) */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Записи на сегодня ({new Date().toLocaleDateString('ru-RU')}) - {todayAppointments.length}
              </h2>
              <div className="flex space-x-3">
                <button 
                  onClick={exportToExcel}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Экспорт в Excel</span>
                </button>
                <button 
                  onClick={() => setShowAppointmentFilters(!showAppointmentFilters)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Фильтры</span>
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-900">Только для просмотра</h3>
                  <p className="text-sm text-yellow-700">
                    Записи создаются через форму на сайте. Здесь можно только просматривать и экспортировать данные.
                  </p>
                </div>
              </div>
            </div>

            {/* Фильтры */}
            {showAppointmentFilters && (
              <div className="bg-white rounded-lg p-4 shadow mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Фильтры записей</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="">Все статусы</option>
                      <option value="pending">Ожидает</option>
                      <option value="confirmed">Подтверждено</option>
                      <option value="completed">Завершено</option>
                      <option value="cancelled">Отменено</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Врач</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="">Все врачи</option>
                      {adminData.doctors?.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name_ru || doctor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="">Все время</option>
                      <option value="morning">Утро (9:00-12:00)</option>
                      <option value="afternoon">День (12:00-17:00)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Время
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Пациент
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Врач
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Услуга
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Контакты
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointmentsLoading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Загрузка записей...
                      </td>
                    </tr>
                  ) : todayAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Записей на сегодня нет
                      </td>
                    </tr>
                  ) : (
                    todayAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {appointment.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{appointment.patient?.name || appointment.patient_name}</div>
                              <div className="text-sm text-gray-500">ID: {appointment.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appointment.doctorName || appointment.doctor_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appointment.patient?.complaint || appointment.service || appointment.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : appointment.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Подтверждено' :
                             appointment.status === 'pending' ? 'Ожидает' :
                             appointment.status === 'completed' ? 'Завершено' :
                             'Отменено'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{appointment.patient?.phone || appointment.phone}</div>
                          <div className="text-gray-500">{appointment.patient?.email || appointment.email}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              
              {todayAppointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Нет записей</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    На сегодня нет записей на прием
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ОТДЕЛЕНИЙ */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Отделения ({adminData.departments?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingDepartment(null);
                  resetDepartmentForm();
                  setIsDepartmentModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить отделение</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
                  <p className="text-sm text-green-700">
                    Отделения автоматически отображаются на главной странице и в разделе "Отделения".
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData.departments?.map((department) => (
                <div key={department.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${department.color || 'from-blue-500 to-blue-600'} flex items-center justify-center mx-auto mb-3`}>
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {department.name_ru || department.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {department.description_ru || department.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => startEditDepartment(department)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Удалить это отделение?')) {
                          try {
                            await deleteDepartment(department.id);
                            alert('Отделение удалено! Изменения применены на сайте.');
                          } catch (error) {
                            console.error('Error deleting department:', error);
                            alert('Ошибка при удалении отделения. Попробуйте снова.');
                          }
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ВРАЧЕЙ */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Врачи ({adminData.doctors?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingDoctor(null);
                  resetDoctorForm();
                  setIsDoctorModalOpen(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить врача</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
                  <p className="text-sm text-green-700">
                    Врачи автоматически отображаются на главной странице и в разделе "Врачи".
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData.doctors?.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="text-center mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name_ru || doctor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {doctor.name_ru || doctor.name}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">
                      {doctor.specialization_ru || doctor.specialization}
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{doctor.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => startEditDoctor(doctor)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Удалить этого врача?')) {
                          try {
                            await deleteDoctor(doctor.id);
                            alert('Врач удален! Изменения применены на сайте.');
                          } catch (error) {
                            console.error('Error deleting doctor:', error);
                            alert('Ошибка при удалении врача. Попробуйте снова.');
                          }
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ УСЛУГ */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Услуги ({adminData.services?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingService(null);
                  resetServiceForm();
                  setIsServiceModalOpen(true);
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить услугу</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
                  <p className="text-sm text-green-700">
                    Услуги автоматически отображаются в разделе "Услуги".
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminData.services?.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {service.title_ru || service.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.description_ru || service.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.price ? `${service.price.toLocaleString()} сум` : 'По запросу'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditService(service)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Удалить эту услугу?')) {
                                try {
                                  await deleteService(service.id);
                                  alert('Услуга удалена! Изменения применены на сайте.');
                                } catch (error) {
                                  console.error('Error deleting service:', error);
                                  alert('Ошибка при удалении услуги. Попробуйте снова.');
                                }
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* СЕКЦИЯ НОВОСТЕЙ */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Новости ({adminData.news?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingNews(null);
                  resetNewsForm();
                  setIsNewsModalOpen(true);
                }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить новость</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
                  <p className="text-sm text-green-700">
                    Новости автоматически отображаются на главной странице и в разделе "Новости".
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData.news?.map((newsItem) => (
                <div key={newsItem.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title_ru || newsItem.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {newsItem.title_ru || newsItem.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {newsItem.excerpt_ru || newsItem.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{newsItem.date}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditNews(newsItem)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Удалить эту новость?')) {
                              try {
                                await deleteNews(newsItem.id);
                                alert('Новость удалена! Изменения применены на сайте.');
                              } catch (error) {
                                console.error('Error deleting news:', error);
                                alert('Ошибка при удалении новости. Попробуйте снова.');
                              }
                            }
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ГАЛЕРЕИ */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Галерея ({adminData.galleryImages?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingGalleryImage(null);
                  resetGalleryForm();
                  setIsGalleryModalOpen(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить изображение</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
                  <p className="text-sm text-green-700">
                    Изображения автоматически отображаются в разделе "Галерея" с фильтрацией по категориям.
                  </p>
                </div>
              </div>
            </div>

            {/* Фильтр по категориям */}
            <div className="bg-white rounded-lg p-4 shadow mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Фильтр по категориям:</h3>
              <div className="flex flex-wrap gap-2">
                {['Все', 'building', 'equipment', 'staff', 'surgery'].map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    {category === 'Все' ? 'Все' : 
                     category === 'building' ? 'Здание' :
                     category === 'equipment' ? 'Оборудование' :
                     category === 'staff' ? 'Персонал' :
                     category === 'surgery' ? 'Операции' : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminData.galleryImages?.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt_ru || image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {image.category === 'building' ? 'Здание' :
                         image.category === 'equipment' ? 'Оборудование' :
                         image.category === 'staff' ? 'Персонал' :
                         image.category === 'surgery' ? 'Операции' : image.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {image.alt_ru || image.alt}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => startEditGalleryImage(image)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Удалить это изображение?')) {
                            try {
                              await deleteGalleryImage(image.id);
                              alert('Изображение удалено! Изменения применены на сайте.');
                            } catch (error) {
                              console.error('Error deleting gallery image:', error);
                              alert('Ошибка при удалении изображения. Попробуйте снова.');
                            }
                          }
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ПОЛЬЗОВАТЕЛЕЙ */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Пользователи ({(adminData.accounts || []).length})</h2>
              <button
                onClick={() => {
                  setEditingUser(null);
                  resetUserForm();
                  setIsUserModalOpen(true);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Добавить пользователя</span>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Управление доступом</h3>
                  <p className="text-sm text-blue-700">
                    Управление пользователями системы и их правами доступа.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-600">Активных</p>
                    <p className="text-2xl font-bold text-green-900">
                      {(adminData.accounts || []).filter(u => u.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-600">Администраторов</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {(adminData.accounts || []).filter(u => u.role === 'admin').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Stethoscope className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-purple-600">Врачей</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {(adminData.accounts || []).filter(u => u.role === 'doctor').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Пользователь
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Роль
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Связанный врач
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Контакты
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Последний вход
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(adminData.accounts || []).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              user.role === 'admin' 
                                ? 'bg-red-100' 
                                : 'bg-blue-100'
                            }`}>
                              {user.role === 'admin' 
                                ? <Shield className="h-5 w-5 text-red-600" />
                                : <Stethoscope className="h-5 w-5 text-blue-600" />
                              }
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin'
                            ? 'bg-red-100 text-red-800'
                            : user.role === 'doctor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'admin' ? 'Администратор' :
                           user.role === 'doctor' ? 'Врач' :
                           user.role === 'nurse' ? 'Медсестра' : user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.role === 'doctor' && user.doctorId ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <Stethoscope className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {(() => {
                                  const linkedDoctor = adminData.doctors?.find(doc => doc.id === user.doctorId);
                                  return linkedDoctor ? linkedDoctor.name_ru || linkedDoctor.name : 'Врач не найден';
                                })()}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {user.doctorId}
                              </div>
                            </div>
                          </div>
                        ) : user.role === 'doctor' ? (
                          <span className="text-sm text-red-500">Не связан с врачом</span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{user.email}</div>
                        <div className="text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.last_login}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditUser(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {user.id !== 1 && (
                            <button
                              onClick={() => {
                                if (confirm('Удалить этого пользователя?')) {
                                  deleteUser(user.id);
                                  alert('Пользователь удален!');
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* СЕКЦИЯ СОБЫТИЙ */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">События ({events.length})</h2>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  resetEventForm();
                  setIsEventModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить событие</span>
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Многоязычная поддержка</h3>
                  <p className="text-sm text-green-700">
                    События поддерживают русский, узбекский и английский языки.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата и время
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Место
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {event.title_ru}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.description_ru.length > 50 
                            ? `${event.description_ru.substring(0, 50)}...` 
                            : event.description_ru}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{event.date}</div>
                        <div className="text-gray-500">{event.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {event.type === 'conference' ? 'Конференция' :
                           event.type === 'openDay' ? 'Открытый день' :
                           event.type === 'masterclass' ? 'Мастер-класс' :
                           event.type === 'seminar' ? 'Семинар' : event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditEvent(event)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Удалить это событие?')) {
                                deleteEvent(event.id);
                                alert('Событие удалено!');
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* СЕКЦИЯ ВАКАНСИЙ И ЗАЯВОК */}
        {activeTab === 'vacancies' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Управление вакансиями и заявками</h2>
            </div>

            {/* Управление вакансиями */}
            <VacanciesAdminManager />
            
            {/* Разделитель */}
            <div className="border-t border-gray-200 my-8"></div>
            
            {/* Управление заявками */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Заявки на вакансии</h3>
                  <p className="text-sm text-blue-700">
                    Все заявки сохраняются автоматически и доступны для просмотра.
                  </p>
                </div>
              </div>
            </div>

            <VacancyApplicationsManager />
          </div>
        )}

        {/* Руководство */}
        {activeTab === 'leadership' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Руководство ({adminData.leadership?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingLeadership(null);
                  resetLeadershipForm();
                  setIsLeadershipModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить руководителя</span>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Синхронизация с сайтом</h3>
                  <p className="text-sm text-blue-700">
                    Изменения руководства автоматически отображаются на странице "О центре".
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData.leadership?.map((leader) => (
                <div key={leader.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="text-center mb-4">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{leader.position}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="w-3 h-3" />
                        <span>{leader.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{leader.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => startEditLeadership(leader)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Удалить этого руководителя?')) {
                          try {
                            await deleteLeadership(leader.id);
                            alert('Руководитель удален! Изменения применены на сайте.');
                          } catch (error) {
                            console.error('Error deleting leadership:', error);
                            alert('Ошибка при удалении руководителя. Попробуйте снова.');
                          }
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ КОНТАКТОВ И НАСТРОЕК */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Контакты и настройки сайта</h2>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Управление контактной информацией</h3>
                  <p className="text-sm text-green-700">
                    Изменения контактов автоматически отображаются во всех разделах сайта.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Телефоны */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Телефоны
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Основной телефон</label>
                    <input
                      type="tel"
                      defaultValue="+998 71 264-96-10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дополнительный телефон</label>
                    <input
                      type="tel"
                      defaultValue="+998 71 264-96-09"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Экстренная помощь</label>
                    <input
                      type="tel"
                      defaultValue="+998 78 113-33-78"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email адреса */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-green-600" />
                  Email адреса
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Основной email</label>
                    <input
                      type="email"
                      defaultValue="admin@neuro.uz"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Информационный email</label>
                    <input
                      type="email"
                      defaultValue="info@neuro.uz"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Социальные сети */}
              <div className="bg-white rounded-lg p-6 shadow lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-indigo-600" />
                  Социальные сети
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      defaultValue="https://facebook.com/neuro.uz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      defaultValue="https://instagram.com/neuro.uz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      defaultValue="https://youtube.com/@neuro.uz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telegram</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      defaultValue="https://t.me/neuro_uz"
                    />
                  </div>
                </div>
              </div>

              {/* Кнопка сохранения */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
                      <Save className="w-5 h-5" />
                      <span>Сохранить настройки</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно руководства */}
        <Modal
          isOpen={isLeadershipModalOpen}
          onClose={() => setIsLeadershipModalOpen(false)}
          title={editingLeadership ? 'Редактировать руководителя' : 'Добавить руководителя'}
          size="large"
        >
          <form onSubmit={handleLeadershipSubmit} className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Автоматическая синхронизация</h3>
                  <p className="text-sm text-green-700">
                    Изменения будут сразу видны на странице "О центре" сайта.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ФИО</label>
                <input
                  type="text"
                  required
                  value={newLeadership.name}
                  onChange={(e) => setNewLeadership({...newLeadership, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Должность</label>
                <input
                  type="text"
                  required
                  value={newLeadership.position}
                  onChange={(e) => setNewLeadership({...newLeadership, position: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newLeadership.email}
                  onChange={(e) => setNewLeadership({...newLeadership, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  value={newLeadership.phone}
                  onChange={(e) => setNewLeadership({...newLeadership, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <FileUploader
              onFileSelect={(file) => setNewLeadership({...newLeadership, image: file})}
              currentFile={newLeadership.image}
              label="Фото руководителя"
              enableCrop={true}
              aspectRatio={1}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Биография</label>
              <textarea
                required
                rows={4}
                value={newLeadership.biography}
                onChange={(e) => setNewLeadership({...newLeadership, biography: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsLeadershipModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingLeadership ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно отделений */}
        <Modal
          isOpen={isDepartmentModalOpen}
          onClose={() => setIsDepartmentModalOpen(false)}
          title={editingDepartment ? 'Редактировать отделение' : 'Добавить отделение'}
          size="large"
        >
          <form onSubmit={handleDepartmentSubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Многоязычная поддержка</h3>
                  <p className="text-sm text-green-700">
                    Заполните информацию на всех языках для корректного отображения.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newDepartment[`name_${currentAdminLanguage}`]}
                onChange={(e) => setNewDepartment({
                  ...newDepartment, 
                  [`name_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={4}
                value={newDepartment[`description_${currentAdminLanguage}`]}
                onChange={(e) => setNewDepartment({
                  ...newDepartment, 
                  [`description_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Иконка</label>
                <select
                  value={newDepartment.icon}
                  onChange={(e) => setNewDepartment({...newDepartment, icon: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Brain">Мозг</option>
                  <option value="Heart">Сердце</option>
                  <option value="Activity">Активность</option>
                  <option value="Stethoscope">Стетоскоп</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
                <select
                  value={newDepartment.color}
                  onChange={(e) => setNewDepartment({...newDepartment, color: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="from-blue-500 to-blue-600">Синий</option>
                  <option value="from-green-500 to-green-600">Зеленый</option>
                  <option value="from-purple-500 to-purple-600">Фиолетовый</option>
                  <option value="from-red-500 to-red-600">Красный</option>
                  <option value="from-yellow-500 to-yellow-600">Желтый</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsDepartmentModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editingDepartment ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно врачей */}
        <Modal
          isOpen={isDoctorModalOpen}
          onClose={() => setIsDoctorModalOpen(false)}
          title={editingDoctor ? 'Редактировать врача' : 'Добавить врача'}
          size="large"
        >
          <form onSubmit={handleDoctorSubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Многоязычная поддержка</h3>
                  <p className="text-sm text-green-700">
                    Заполните информацию на всех языках для корректного отображения.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newDoctor[`name_${currentAdminLanguage}`]}
                  onChange={(e) => setNewDoctor({
                    ...newDoctor, 
                    [`name_${currentAdminLanguage}`]: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Специализация ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newDoctor[`specialization_${currentAdminLanguage}`]}
                  onChange={(e) => setNewDoctor({
                    ...newDoctor, 
                    [`specialization_${currentAdminLanguage}`]: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                График приема ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newDoctor[`reception_${currentAdminLanguage}`]}
                onChange={(e) => setNewDoctor({
                  ...newDoctor, 
                  [`reception_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Пн-Пт 9:00-17:00"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Опыт работы</label>
                <input
                  type="text"
                  required
                  value={newDoctor.experience}
                  onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="15+ лет"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Отделение</label>
              <select
                value={newDoctor.department_id}
                onChange={(e) => setNewDoctor({...newDoctor, department_id: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Выберите отделение</option>
                {adminData.departments?.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name_ru || dept.name}
                  </option>
                ))}
              </select>
            </div>
            
            <FileUploader
              onFileSelect={(file) => setNewDoctor({...newDoctor, image: file})}
              currentFile={newDoctor.image}
              label="Фото врача"
              enableCrop={true}
              aspectRatio={1}
            />
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsDoctorModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {editingDoctor ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно услуг */}
        <Modal
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          title={editingService ? 'Редактировать услугу' : 'Добавить услугу'}
          size="large"
        >
          <form onSubmit={handleServiceSubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Многоязычная поддержка</h3>
                  <p className="text-sm text-green-700">
                    Заполните информацию на всех языках для корректного отображения.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название услуги ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newService[`title_${currentAdminLanguage}`]}
                onChange={(e) => setNewService({
                  ...newService, 
                  [`title_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={3}
                value={newService[`description_${currentAdminLanguage}`]}
                onChange={(e) => setNewService({
                  ...newService, 
                  [`description_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цена (сум)</label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="150000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Длительность</label>
                <input
                  type="text"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="30 мин"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newService[`category_${currentAdminLanguage}`]}
                  onChange={(e) => setNewService({
                    ...newService, 
                    [`category_${currentAdminLanguage}`]: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Консультации, Диагностика, Хирургия..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                {editingService ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно новостей */}
        <Modal
          isOpen={isNewsModalOpen}
          onClose={() => setIsNewsModalOpen(false)}
          title={editingNews ? 'Редактировать новость' : 'Добавить новость'}
          size="large"
        >
          <form onSubmit={handleNewsSubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Многоязычная поддержка</h3>
                  <p className="text-sm text-green-700">
                    Заполните информацию на всех языках для корректного отображения.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newNews[`title_${currentAdminLanguage}`]}
                onChange={(e) => setNewNews({
                  ...newNews, 
                  [`title_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Краткое описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={2}
                value={newNews[`excerpt_${currentAdminLanguage}`]}
                onChange={(e) => setNewNews({
                  ...newNews, 
                  [`excerpt_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полный текст ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={6}
                value={newNews[`content_${currentAdminLanguage}`]}
                onChange={(e) => setNewNews({
                  ...newNews, 
                  [`content_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <FileUploader
              onFileSelect={(file) => setNewNews({...newNews, image: file})}
              currentFile={newNews.image}
              label="Изображение новости"
              enableCrop={true}
              aspectRatio={16/9}
            />
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                checked={newNews.is_published}
                onChange={(e) => setNewNews({...newNews, is_published: e.target.checked})}
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                Опубликовать новость
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsNewsModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                {editingNews ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно галереи */}
        <Modal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          title={editingGalleryImage ? 'Редактировать изображение' : 'Добавить изображение'}
          size="large"
        >
          <form onSubmit={handleGallerySubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Управление категориями</h3>
                  <p className="text-sm text-green-700">
                    Изображения группируются по категориям для удобной навигации.
                  </p>
                </div>
              </div>
            </div>
            
            <FileUploader
              onFileSelect={(file) => setNewGalleryImage({...newGalleryImage, url: file})}
              currentFile={newGalleryImage.url}
              label="Изображение для галереи"
              enableCrop={true}
              aspectRatio={4/3}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newGalleryImage[`alt_${currentAdminLanguage}`]}
                onChange={(e) => setNewGalleryImage({
                  ...newGalleryImage, 
                  [`alt_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <select
                value={newGalleryImage.category}
                onChange={(e) => setNewGalleryImage({...newGalleryImage, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="building">Здание</option>
                <option value="equipment">Оборудование</option>
                <option value="staff">Персонал</option>
                <option value="surgery">Операции</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                {editingGalleryImage ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно событий */}
        <Modal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          title={editingEvent ? 'Редактировать событие' : 'Добавить событие'}
          size="large"
        >
          <form onSubmit={handleEventSubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Многоязычная поддержка</h3>
                  <p className="text-sm text-green-700">
                    Заполните информацию на всех языках для корректного отображения.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название события ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newEvent[`title_${currentAdminLanguage}`]}
                onChange={(e) => setNewEvent({
                  ...newEvent, 
                  [`title_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={4}
                value={newEvent[`description_${currentAdminLanguage}`]}
                onChange={(e) => setNewEvent({
                  ...newEvent, 
                  [`description_${currentAdminLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                <input
                  type="time"
                  required
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип события</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="conference">Конференция</option>
                  <option value="openDay">День открытых дверей</option>
                  <option value="masterclass">Мастер-класс</option>
                  <option value="seminar">Семинар</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Место проведения</label>
              <input
                type="text"
                required
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Главный конференц-зал"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingEvent ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно пользователей */}
        <Modal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          title={editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
          size="large"
        >
          <form onSubmit={handleUserSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Создание пользователя</h3>
                  <p className="text-sm text-blue-700">
                    Добавление нового пользователя в систему с определенными правами доступа.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Полное имя *</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Роль *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="doctor">Врач</option>
                  <option value="nurse">Медсестра</option>
                  <option value="admin">Администратор</option>
                  <option value="manager">Менеджер</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Заблокирован</option>
                </select>
              </div>
            </div>
            
            {/* Поле выбора врача (ДОБАВЛЕНО) - показывается только для роли "doctor" */}
            {newUser.role === 'doctor' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Связанный врач *</label>
                <select
                  value={newUser.doctorId || ''}
                  onChange={(e) => setNewUser({...newUser, doctorId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Выберите врача...</option>
                  {adminData.doctors?.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name_ru || doctor.name} - {doctor.specialization_ru || doctor.specialization}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Выберите врача из базы данных, с которым будет связан этот аккаунт
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingUser ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль *'}
              </label>
              <input
                type="password"
                required={!editingUser}
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder={editingUser ? "Новый пароль" : "Пароль"}
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                {editingUser ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </Modal>

        {/* СЕКЦИЯ КОНТАКТОВ */}
        {activeTab === 'contacts' && <ContactsSection />}

        {/* СЕКЦИЯ SEO */}
        {activeTab === 'seo' && <SeoSection />}

        {/* СЕКЦИЯ РЕДИРЕКТОВ */}
        {activeTab === 'redirects' && <RedirectsSection />}

        {/* Модальное окно вакансии */}
        <Modal
          isOpen={isVacancyModalOpen}
          onClose={() => setIsVacancyModalOpen(false)}
          title={editingVacancy ? 'Редактировать вакансию' : 'Добавить вакансию'}
          size="large"
        >
          <form onSubmit={handleVacancySubmit} className="space-y-6">
            <AdminLanguageSwitcher
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newVacancy[`title_${currentAdminLanguage}`]}
                  onChange={(e) => setNewVacancy({...newVacancy, [`title_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Отделение ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newVacancy[`department_${currentAdminLanguage}`]}
                  onChange={(e) => setNewVacancy({...newVacancy, [`department_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип занятости ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newVacancy[`type_${currentAdminLanguage}`]}
                  onChange={(e) => setNewVacancy({...newVacancy, [`type_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Полная занятость, Частичная занятость..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Зарплата (UZS)</label>
                <input
                  type="text"
                  value={newVacancy.salary}
                  onChange={(e) => setNewVacancy({...newVacancy, salary: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="5000000 - 8000000"
                />
              </div>
            </div>
            
            {/* Требования */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Требования ({currentAdminLanguage.toUpperCase()})
              </label>
              {newVacancy[`requirements_${currentAdminLanguage}`]?.map((req, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => {
                      const newReqs = [...newVacancy[`requirements_${currentAdminLanguage}`]];
                      newReqs[index] = e.target.value;
                      setNewVacancy({...newVacancy, [`requirements_${currentAdminLanguage}`]: newReqs});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Требование..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newReqs = newVacancy[`requirements_${currentAdminLanguage}`].filter((_, i) => i !== index);
                      setNewVacancy({...newVacancy, [`requirements_${currentAdminLanguage}`]: newReqs});
                    }}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newReqs = [...(newVacancy[`requirements_${currentAdminLanguage}`] || []), ''];
                  setNewVacancy({...newVacancy, [`requirements_${currentAdminLanguage}`]: newReqs});
                }}
                className="text-purple-600 hover:text-purple-900 text-sm"
              >
                + Добавить требование
              </button>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsVacancyModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingVacancy ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default UnifiedAdminPanel;