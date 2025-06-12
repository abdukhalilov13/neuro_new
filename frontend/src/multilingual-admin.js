/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Briefcase
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

// Многоязычная админ-панель
export const MultilingualAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentAdminLanguage, setCurrentAdminLanguage] = useState('ru');
  
  // Модальные окна
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isVacancyModalOpen, setIsVacancyModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  
  // Данные для редактирования
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  
  // Новые записи
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
  
  const [newVacancy, setNewVacancy] = useState({
    title_ru: '', title_uz: '', title_en: '',
    description_ru: '', description_uz: '', description_en: '',
    requirements_ru: '', requirements_uz: '', requirements_en: '',
    salary: '',
    location: '',
    employment_type: 'full-time',
    is_active: true
  });
  
  const [newGalleryImage, setNewGalleryImage] = useState({
    url: '',
    alt_ru: '', alt_uz: '', alt_en: '',
    category: 'building'
  });

  // Используем данные из контекста
  const { adminData, 
    addDepartment, updateDepartment, deleteDepartment,
    addDoctor, updateDoctor, deleteDoctor,
    addNews, updateNews, deleteNews
  } = useAdmin();
  
  const { t } = useLanguage();
  const languages = ['ru', 'uz', 'en'];
  
  // Мок данные для вакансий
  const [vacancies, setVacancies] = useState([
    {
      id: '1',
      title_ru: 'Нейрохирург',
      title_uz: 'Neyroxirurg',
      title_en: 'Neurosurgeon',
      description_ru: 'Ищем опытного нейрохирурга для работы в нашем центре',
      description_uz: 'Markazimizda ishlash uchun tajribali neyroxirurg izlanmoqda',
      description_en: 'Looking for experienced neurosurgeon to work in our center',
      requirements_ru: 'Высшее медицинское образование, стаж работы от 5 лет',
      requirements_uz: 'Oliy tibbiy ma\'lumot, 5 yildan ortiq ish tajribasi',
      requirements_en: 'Medical degree, 5+ years of experience',
      salary: '15000000',
      location: 'Ташкент',
      employment_type: 'full-time',
      is_active: true,
      created_at: '2025-06-01'
    }
  ]);
  
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
      alert('Отделение обновлено!');
    } else {
      addDepartment(newDepartment);
      alert('Отделение добавлено!');
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
      alert('Врач обновлен!');
    } else {
      addDoctor(newDoctor);
      alert('Врач добавлен!');
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
      alert('Новость обновлена!');
    } else {
      addNews(newNews);
      alert('Новость добавлена!');
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

  // Функции управления вакансиями
  const handleVacancySubmit = (e) => {
    e.preventDefault();
    if (editingVacancy) {
      setVacancies(prev => prev.map(v => v.id === editingVacancy.id ? {...newVacancy, id: editingVacancy.id} : v));
      alert('Вакансия обновлена!');
    } else {
      const newId = vacancies.length > 0 ? Math.max(...vacancies.map(v => parseInt(v.id))) + 1 : 1;
      setVacancies(prev => [...prev, {...newVacancy, id: newId.toString(), created_at: new Date().toISOString().split('T')[0]}]);
      alert('Вакансия добавлена!');
    }
    setIsVacancyModalOpen(false);
    resetVacancyForm();
  };

  const resetVacancyForm = () => {
    setNewVacancy({
      title_ru: '', title_uz: '', title_en: '',
      description_ru: '', description_uz: '', description_en: '',
      requirements_ru: '', requirements_uz: '', requirements_en: '',
      salary: '',
      location: '',
      employment_type: 'full-time',
      is_active: true
    });
    setEditingVacancy(null);
  };

  const startEditVacancy = (vacancy) => {
    setEditingVacancy(vacancy);
    setNewVacancy(vacancy);
    setIsVacancyModalOpen(true);
  };

  const deleteVacancy = (id) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
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
            <h1 className="text-2xl font-bold text-gray-900">Вход в админ-панель</h1>
            <p className="text-gray-600 mt-2">Введите ваши учетные данные</p>
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
              <h1 className="text-xl font-semibold text-gray-900">Многоязычная Админ-панель</h1>
            </div>
            <div className="flex items-center space-x-4">
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
              { id: 'news', label: 'Новости', icon: FileText },
              { id: 'vacancies', label: 'Вакансии', icon: Briefcase },
              { id: 'gallery', label: 'Галерея', icon: ImageIcon }
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
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Новостей</p>
                    <p className="text-2xl font-semibold text-gray-900">{adminData.news?.length || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Записей сегодня</p>
                    <p className="text-2xl font-semibold text-gray-900">{todayAppointments.length}</p>
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
                    onClick={() => setActiveTab('appointments')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Просмотреть записи на сегодня</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setEditingNews(null);
                      resetNewsForm();
                      setIsNewsModalOpen(true);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="w-5 h-5 text-green-600" />
                      <span>Добавить новость</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setEditingVacancy(null);
                      resetVacancyForm();
                      setIsVacancyModalOpen(true);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <span>Добавить вакансию</span>
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
              
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Системная информация</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Версия: 2.0.0</div>
                  <div>Последнее обновление: 08.06.2025</div>
                  <div>Статус: Активно</div>
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

        {/* Модальные окна */}
        
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
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newDepartment[`name_${currentAdminLanguage}`] || ''}
                  onChange={(e) => setNewDepartment({...newDepartment, [`name_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание ({currentAdminLanguage.toUpperCase()})
                </label>
                <textarea
                  required
                  rows={3}
                  value={newDepartment[`description_${currentAdminLanguage}`] || ''}
                  onChange={(e) => setNewDepartment({...newDepartment, [`description_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Иконка</label>
                <select
                  value={newDepartment.icon}
                  onChange={(e) => setNewDepartment({...newDepartment, icon: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Brain">Мозг</option>
                  <option value="Heart">Сердце</option>
                  <option value="Activity">Активность</option>
                  <option value="Star">Звезда</option>
                  <option value="Shield">Щит</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
                <select
                  value={newDepartment.color}
                  onChange={(e) => setNewDepartment({...newDepartment, color: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingDepartment ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MultilingualAdminPanel;