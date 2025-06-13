/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Target,
  Wrench
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';

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

// Компонент загрузки файлов
const FileUploader = ({ onFileSelect, currentFile, accept = "image/*", label = "Выберите файл" }) => {
  const [preview, setPreview] = useState(currentFile || '');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
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
        </div>
      )}
    </div>
  );
};

// ЕДИНАЯ АДМИН-ПАНЕЛЬ (объединены все функции)
export const UnifiedAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentAdminLanguage, setCurrentAdminLanguage] = useState('ru');
  
  // Модальные окна
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isLeadershipModalOpen, setIsLeadershipModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  // Данные для редактирования
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  const [editingLeadership, setEditingLeadership] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  
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
    price: '',
    duration: '',
    category: ''
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

  const [newEvent, setNewEvent] = useState({
    title_ru: '', title_uz: '', title_en: '',
    description_ru: '', description_uz: '', description_en: '',
    date: '',
    time: '',
    location: '',
    type: 'conference'
  });

  // Используем данные из контекста - ВСЕ функции синхронизированы!
  const { adminData, 
    addDepartment, updateDepartment, deleteDepartment,
    addDoctor, updateDoctor, deleteDoctor,
    addNews, updateNews, deleteNews,
    addService, updateService, deleteService,
    addLeadership, updateLeadership, deleteLeadership,
    addGalleryImage, updateGalleryImage, deleteGalleryImage
  } = useAdmin();
  
  const { t } = useLanguage();
  const languages = ['ru', 'uz', 'en'];
  
  // Мок данные для записей на сегодня
  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: 1,
      time: '09:00',
      patient_name: 'Иванов Алексей Петрович',
      doctor_name: 'Кариев Габрат Маратович',
      service: 'Консультация нейрохирурга',
      status: 'confirmed',
      phone: '+998 90 123-45-67'
    },
    {
      id: 2,
      time: '10:30',
      patient_name: 'Петрова Мария Ивановна',
      doctor_name: 'Асадуллаев Улугбек Максудович',
      service: 'МРТ головного мозга',
      status: 'pending',
      phone: '+998 91 234-56-78'
    },
    {
      id: 3,
      time: '14:00',
      patient_name: 'Сидоров Петр Иванович',
      doctor_name: 'Кодашев Равшан Муслимович',
      service: 'Повторная консультация',
      status: 'confirmed',
      phone: '+998 93 345-67-89'
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@neuro.uz' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: admin@neuro.uz / admin123');
    }
  };

  // Функции управления отделениями
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      updateDepartment(editingDepartment.id, newDepartment);
      alert('Отделение обновлено! Изменения синхронизированы с сайтом.');
    } else {
      addDepartment(newDepartment);
      alert('Отделение добавлено! Изменения синхронизированы с сайтом.');
    }
    setIsDepartmentModalOpen(false);
    resetDepartmentForm();
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
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      updateDoctor(editingDoctor.id, newDoctor);
      alert('Врач обновлен! Изменения синхронизированы с сайтом.');
    } else {
      addDoctor(newDoctor);
      alert('Врач добавлен! Изменения синхронизированы с сайтом.');
    }
    setIsDoctorModalOpen(false);
    resetDoctorForm();
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
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      updateNews(editingNews.id, newNews);
      alert('Новость обновлена! Изменения синхронизированы с сайтом.');
    } else {
      addNews(newNews);
      alert('Новость добавлена! Изменения синхронизированы с сайтом.');
    }
    setIsNewsModalOpen(false);
    resetNewsForm();
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
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, newService);
      alert('Услуга обновлена! Изменения синхронизированы с сайтом.');
    } else {
      addService(newService);
      alert('Услуга добавлена! Изменения синхронизированы с сайтом.');
    }
    setIsServiceModalOpen(false);
    resetServiceForm();
  };

  const resetServiceForm = () => {
    setNewService({
      title_ru: '', title_uz: '', title_en: '',
      description_ru: '', description_uz: '', description_en: '',
      price: '',
      duration: '',
      category: ''
    });
    setEditingService(null);
  };

  const startEditService = (service) => {
    setEditingService(service);
    setNewService(service);
    setIsServiceModalOpen(true);
  };

  // Функции управления руководством
  const handleLeadershipSubmit = (e) => {
    e.preventDefault();
    if (editingLeadership) {
      updateLeadership(editingLeadership.id, newLeadership);
      alert('Руководитель обновлен! Изменения синхронизированы с сайтом.');
    } else {
      addLeadership(newLeadership);
      alert('Руководитель добавлен! Изменения синхронизированы с сайтом.');
    }
    setIsLeadershipModalOpen(false);
    resetLeadershipForm();
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
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (editingGalleryImage) {
      updateGalleryImage(editingGalleryImage.id, newGalleryImage);
      alert('Изображение обновлено! Изменения синхронизированы с сайтом.');
    } else {
      addGalleryImage(newGalleryImage);
      alert('Изображение добавлено! Изменения синхронизированы с сайтом.');
    }
    setIsGalleryModalOpen(false);
    resetGalleryForm();
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

          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>Демо доступ:</strong><br />
              Email: admin@neuro.uz<br />
              Пароль: admin123
            </p>
          </div>

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
              { id: 'events', label: 'События', icon: Star }
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

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Записи на сегодня ({new Date().toLocaleDateString('ru-RU')})
              </h2>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Экспорт</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Обновить</span>
                </button>
              </div>
            </div>

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
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {todayAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.patient_name}</div>
                        <div className="text-sm text-gray-500">{appointment.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.doctor_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircle className="w-4 h-4" />
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
                      onClick={() => {
                        if (confirm('Удалить этого руководителя?')) {
                          deleteLeadership(leader.id);
                          alert('Руководитель удален! Изменения применены на сайте.');
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
                  required
                  value={newLeadership.email}
                  onChange={(e) => setNewLeadership({...newLeadership, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  required
                  value={newLeadership.phone}
                  onChange={(e) => setNewLeadership({...newLeadership, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Фото (URL)</label>
              <input
                type="url"
                required
                value={newLeadership.image}
                onChange={(e) => setNewLeadership({...newLeadership, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
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
      </div>
    </div>
  );
};

export default UnifiedAdminPanel;