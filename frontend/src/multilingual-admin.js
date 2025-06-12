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
import { EventsSection, AccountsSection, LeadershipSection, SettingsSection } from './admin-sections';
import { 
  EnhancedSettingsSection, 
  GalleryCategoriesSection, 
  ImageUpload 
} from './enhanced-admin-sections';

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
  // Функция экспорта в Excel
  const exportToExcel = (data) => {
    const headers = ['Время', 'Пациент', 'Врач', 'Услуга', 'Статус', 'Телефон'];
    const csvContent = [
      headers.join(','),
      ...data.map(appointment => [
        appointment.time,
        `"${appointment.patient_name}"`,
        `"${appointment.doctor_name}"`,
        `"${appointment.service}"`,
        appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает',
        appointment.phone
      ].join(','))
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `записи_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLeadershipModalOpen, setIsLeadershipModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  // Данные для редактирования
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingLeader, setEditingLeader] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  
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

  // Новые состояния для событий
  const [newEvent, setNewEvent] = useState({
    title_ru: '', title_uz: '', title_en: '',
    description_ru: '', description_uz: '', description_en: '',
    date: '',
    time: '',
    location_ru: '', location_uz: '', location_en: '',
    type: 'conference',
    image: ''
  });

  // Новые состояния для аккаунтов
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    role: 'doctor',
    password: ''
  });

  // Новые состояния для руководства
  const [newLeader, setNewLeader] = useState({
    name_ru: '', name_uz: '', name_en: '',
    position_ru: '', position_uz: '', position_en: '',
    biography_ru: '', biography_uz: '', biography_en: '',
    image: '',
    phone: '',
    email: ''
  });

  // Состояния для категорий галереи
  const [galleryCategories, setGalleryCategories] = useState([
    { id: 1, name_ru: 'Здание', name_uz: 'Bino', name_en: 'Building', description_ru: 'Фотографии здания центра', description_uz: 'Markaz binosi rasmlari', description_en: 'Center building photos', slug: 'building' },
    { id: 2, name_ru: 'Оборудование', name_uz: 'Jihozlar', name_en: 'Equipment', description_ru: 'Медицинское оборудование', description_uz: 'Tibbiy jihozlar', description_en: 'Medical equipment', slug: 'equipment' },
    { id: 3, name_ru: 'Персонал', name_uz: 'Xodimlar', name_en: 'Staff', description_ru: 'Фотографии сотрудников', description_uz: 'Xodimlar rasmlari', description_en: 'Staff photos', slug: 'staff' },
    { id: 4, name_ru: 'События', name_uz: 'Tadbirlar', name_en: 'Events', description_ru: 'Мероприятия и события', description_uz: 'Tadbirlar va voqealar', description_en: 'Events and activities', slug: 'events' }
  ]);

  const [newCategory, setNewCategory] = useState({
    name_ru: '', name_uz: '', name_en: '',
    description_ru: '', description_uz: '', description_en: '',
    slug: ''
  });

  // Используем данные из контекста
  const { adminData, 
    addDepartment, updateDepartment, deleteDepartment,
    addDoctor, updateDoctor, deleteDoctor,
    addNews, updateNews, deleteNews,
    addLeadership, updateLeadership, deleteLeadership,
    addAccount, updateAccount, deleteAccount, toggleAccountStatus,
    updateSiteSettings, updateSeoSettings
  } = useAdmin();
  
  const { t } = useLanguage();
  const languages = ['ru', 'uz', 'en'];
  
  // Мок данные для событий
  const [events, setEvents] = useState([
    {
      id: '1',
      title_ru: 'Международная конференция по нейрохирургии',
      title_uz: 'Neyroxirurgiya bo\'yicha xalqaro konferensiya',
      title_en: 'International Conference on Neurosurgery',
      description_ru: 'Ежегодная конференция ведущих нейрохирургов мира',
      description_uz: 'Dunyo yetakchi neyroxirurglarining yillik konferensiyasi',
      description_en: 'Annual conference of leading neurosurgeons worldwide',
      date: '2025-07-15',
      time: '09:00',
      location_ru: 'Главный конференц-зал',
      location_uz: 'Asosiy konferents zali',
      location_en: 'Main conference hall',
      type: 'conference'
    },
    {
      id: '2',
      title_ru: 'День открытых дверей',
      title_uz: 'Ochiq eshiklar kuni',
      title_en: 'Open House Day',
      description_ru: 'Знакомство с центром и нашими специалистами',
      description_uz: 'Markaz va mutaxassislarimiz bilan tanishish',
      description_en: 'Get to know our center and specialists',
      date: '2025-06-20',
      time: '10:00',
      location_ru: 'Фойе центра',
      location_uz: 'Markaz foyesi',
      location_en: 'Center lobby',
      type: 'open-day'
    }
  ]);

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

  // Функции управления событиями
  const handleLeadershipSubmit = (e) => {
    e.preventDefault();
    if (editingLeadership) {
      updateLeadership(editingLeadership.id, newLeadership);
      alert('Руководитель обновлен!');
    } else {
      addLeadership(newLeadership);
      alert('Руководитель добавлен!');
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

  // Функции управления событиями
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(prev => prev.map(event => event.id === editingEvent.id ? {...newEvent, id: editingEvent.id} : event));
      alert('Событие обновлено!');
    } else {
      const newId = events.length > 0 ? Math.max(...events.map(e => parseInt(e.id))) + 1 : 1;
      setEvents(prev => [...prev, {...newEvent, id: newId.toString()}]);
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
      location_ru: '', location_uz: '', location_en: '',
      type: 'conference',
      image: ''
    });
    setEditingEvent(null);
  };

  const startEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setIsEventModalOpen(true);
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Функции управления аккаунтами
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      updateAccount(editingAccount.id, newAccount);
      alert('Аккаунт обновлен!');
    } else {
      addAccount(newAccount);
      alert('Аккаунт добавлен!');
    }
    setIsAccountModalOpen(false);
    resetAccountForm();
  };

  const resetAccountForm = () => {
    setNewAccount({
      name: '',
      email: '',
      role: 'doctor',
      password: ''
    });
    setEditingAccount(null);
  };

  const startEditAccount = (account) => {
    setEditingAccount(account);
    setNewAccount({...account, password: ''}); // Don't show password for security
    setIsAccountModalOpen(true);
  };

  const resetLeadershipForm = () => {
    setNewLeader({
      name_ru: '', name_uz: '', name_en: '',
      position_ru: '', position_uz: '', position_en: '',
      biography_ru: '', biography_uz: '', biography_en: '',
      image: '',
      phone: '',
      email: ''
    });
    setEditingLeader(null);
  };

  const startEditLeader = (leader) => {
    setEditingLeader(leader);
    setNewLeader(leader);
    setIsLeadershipModalOpen(true);
  };

  // Функции управления категориями галереи
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setGalleryCategories(prev => prev.map(cat => cat.id === editingCategory.id ? {...newCategory, id: editingCategory.id} : cat));
      alert('Категория обновлена!');
    } else {
      const newId = galleryCategories.length > 0 ? Math.max(...galleryCategories.map(c => c.id)) + 1 : 1;
      const slug = newCategory.name_ru.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setGalleryCategories(prev => [...prev, {...newCategory, id: newId, slug}]);
      alert('Категория добавлена!');
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const resetCategoryForm = () => {
    setNewCategory({
      name_ru: '', name_uz: '', name_en: '',
      description_ru: '', description_uz: '', description_en: '',
      slug: ''
    });
    setEditingCategory(null);
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
              { id: 'leadership', label: 'Руководство', icon: Crown },
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

        {activeTab === 'events' && (
          <EventsSection
            events={events}
            setEditingEvent={setEditingEvent}
            resetEventForm={resetEventForm}
            setIsEventModalOpen={setIsEventModalOpen}
            startEditEvent={startEditEvent}
            deleteEvent={deleteEvent}
          />
        )}

        {activeTab === 'accounts' && (
          <AccountsSection
            accounts={adminData.accounts || []}
            setEditingAccount={setEditingAccount}
            resetAccountForm={resetAccountForm}
            setIsAccountModalOpen={setIsAccountModalOpen}
            startEditAccount={startEditAccount}
            deleteAccount={deleteAccount}
            toggleAccountStatus={toggleAccountStatus}
          />
        )}

        {activeTab === 'leadership' && (
          <LeadershipSection
            leadership={adminData.leadership || []}
            setEditingLeader={setEditingLeader}
            resetLeadershipForm={resetLeadershipForm}
            setIsLeadershipModalOpen={setIsLeadershipModalOpen}
            startEditLeader={startEditLeader}
            deleteLeadership={deleteLeadership}
          />
        )}

        {activeTab === 'settings' && (
          <EnhancedSettingsSection
            adminData={adminData}
            updateSiteSettings={updateSiteSettings}
            updateSeoSettings={updateSeoSettings}
          />
        )}

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
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить отделение</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminData.departments?.map((dept) => (
                <div key={dept.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-lg flex items-center justify-center`}>
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {dept.name_ru || dept.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {dept.description_ru || dept.description}
                        </p>
                        <div className="text-xs text-gray-500">
                          <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
                          <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {dept.name_uz ? '✓' : '✗'}</span>
                          <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {dept.name_en ? '✓' : '✗'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEditDepartment(dept)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Удалить это отделение?')) {
                            deleteDepartment(dept.id);
                            alert('Отделение удалено!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить врача</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData.doctors?.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {doctor.name_ru || doctor.name}
                    </h3>
                    <p className="text-sm text-blue-600 mb-2">
                      {doctor.specialization_ru || doctor.specialization}
                    </p>
                    <p className="text-xs text-gray-600 mb-3">{doctor.experience}</p>
                    
                    {/* Расписание врача */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Расписание:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {doctor.schedule ? Object.entries(doctor.schedule).map(([day, schedule]) => (
                          <div key={day} className={`px-2 py-1 rounded ${schedule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            {day}: {schedule.active ? `${schedule.start}-${schedule.end}` : 'Выходной'}
                          </div>
                        )) : (
                          <div className="text-gray-500">Не указано</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {doctor.name_uz ? '✓' : '✗'}</span>
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {doctor.name_en ? '✓' : '✗'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <p>{doctor.phone}</p>
                        <p>{doctor.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditDoctor(doctor)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Удалить этого врача?')) {
                              deleteDoctor(doctor.id);
                              alert('Врач удален!');
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
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

        {activeTab === 'leadership' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Руководство ({adminData.leadership?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingLeadership(null);
                  setNewLeadership({
                    name: '',
                    position: '',
                    image: '',
                    email: '',
                    phone: '',
                    biography: ''
                  });
                  setIsLeadershipModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить руководителя</span>
              </button>
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
                      onClick={() => {
                        setEditingLeadership(leader);
                        setNewLeadership(leader);
                        setIsLeadershipModalOpen(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Удалить этого руководителя?')) {
                          deleteLeadership(leader.id);
                          alert('Руководитель удален!');
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

        {activeTab === 'leadership' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Руководство ({adminData.leadership?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingLeadership(null);
                  setNewLeadership({
                    name: '',
                    position: '',
                    image: '',
                    email: '',
                    phone: '',
                    biography: ''
                  });
                  setIsLeadershipModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить руководителя</span>
              </button>
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
                      onClick={() => {
                        setEditingLeadership(leader);
                        setNewLeadership(leader);
                        setIsLeadershipModalOpen(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Удалить этого руководителя?')) {
                          deleteLeadership(leader.id);
                          alert('Руководитель удален!');
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
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить новость</span>
              </button>
            </div>

            <div className="space-y-4">
              {adminData.news?.map((newsItem) => (
                <div key={newsItem.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {newsItem.title_ru || newsItem.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {newsItem.excerpt_ru || newsItem.excerpt}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">{newsItem.date}</p>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {newsItem.title_uz ? '✓' : '✗'}</span>
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {newsItem.title_en ? '✓' : '✗'}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditNews(newsItem)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Удалить эту новость?')) {
                            deleteNews(newsItem.id);
                            alert('Новость удалена!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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

        {activeTab === 'vacancies' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Вакансии ({vacancies.length})</h2>
              <button
                onClick={() => {
                  setEditingVacancy(null);
                  resetVacancyForm();
                  setIsVacancyModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить вакансию</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{vacancy.title_ru}</h3>
                      <p className="text-sm text-gray-600 mb-3">{vacancy.description_ru}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div><strong>Требования:</strong> {vacancy.requirements_ru}</div>
                        <div><strong>Зарплата:</strong> {parseInt(vacancy.salary).toLocaleString()} сум</div>
                        <div><strong>Местоположение:</strong> {vacancy.location}</div>
                        <div><strong>Тип занятости:</strong> {vacancy.employment_type === 'full-time' ? 'Полная занятость' : 'Частичная занятость'}</div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-3">
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {vacancy.title_uz ? '✓' : '✗'}</span>
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {vacancy.title_en ? '✓' : '✗'}</span>
                      </div>
                      
                      <div className="mt-3">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          vacancy.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {vacancy.is_active ? 'Активна' : 'Неактивна'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEditVacancy(vacancy)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Удалить эту вакансию?')) {
                            deleteVacancy(vacancy.id);
                            alert('Вакансия удалена!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <GalleryCategoriesSection
              categories={galleryCategories}
              setCategories={setGalleryCategories}
              setIsCategoryModalOpen={setIsCategoryModalOpen}
              setEditingCategory={setEditingCategory}
              setNewCategory={setNewCategory}
            />
            
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Галерея ({adminData.galleryImages?.length || 0})</h2>
              <button
                onClick={() => {
                  setEditingGalleryImage(null);
                  setNewGalleryImage({
                    url: '',
                    alt_ru: '', alt_uz: '', alt_en: '',
                    category: 'building'
                  });
                  setIsGalleryModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить изображение</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData.galleryImages?.map((image) => (
                <div key={image.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {image.alt_ru || image.alt}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Категория: {galleryCategories.find(cat => cat.slug === image.category)?.name_ru || image.category}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {image.alt_uz ? '✓' : '✗'}</span>
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {image.alt_en ? '✓' : '✗'}</span>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingGalleryImage(image);
                          setNewGalleryImage(image);
                          setIsGalleryModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Удалить это изображение?')) {
                            // deleteGalleryImage(image.id);
                            alert('Изображение удалено!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Записи на сегодня ({new Date().toLocaleDateString('ru-RU')})
              </h2>
              <div className="flex space-x-3">
                <button 
                  onClick={() => exportToExcel(todayAppointments)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Экспорт в Excel</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
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
                      Телефон
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Примечание:</strong> Управление записями (подтверждение, отмена) доступно только в кабинете врача. 
                Здесь отображается информация для просмотра и экспорта.
              </p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newDoctor[`name_${currentAdminLanguage}`] || ''}
                  onChange={(e) => setNewDoctor({...newDoctor, [`name_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Специализация ({currentAdminLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={newDoctor[`specialization_${currentAdminLanguage}`] || ''}
                  onChange={(e) => setNewDoctor({...newDoctor, [`specialization_${currentAdminLanguage}`]: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Опыт работы</label>
                <input
                  type="text"
                  required
                  value={newDoctor.experience}
                  onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="15+ лет"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Отделение</label>
                <select
                  value={newDoctor.department_id}
                  onChange={(e) => setNewDoctor({...newDoctor, department_id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Выберите отделение</option>
                  {adminData.departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name_ru || dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div>
              <ImageUpload
                value={newDoctor.image}
                onChange={(value) => setNewDoctor({...newDoctor, image: value})}
                label="Фото врача"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                График приема ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                value={newDoctor[`reception_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewDoctor({...newDoctor, [`reception_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Пн-Пт 9:00-17:00"
              />
            </div>
            
            {/* Расписание врача */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Расписание работы</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(newDoctor.schedule).map(([day, schedule]) => (
                  <div key={day} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 capitalize">{day}</label>
                      <input
                        type="checkbox"
                        checked={schedule.active}
                        onChange={(e) => setNewDoctor({
                          ...newDoctor,
                          schedule: {
                            ...newDoctor.schedule,
                            [day]: { ...schedule, active: e.target.checked }
                          }
                        })}
                        className="rounded"
                      />
                    </div>
                    {schedule.active && (
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="time"
                          value={schedule.start}
                          onChange={(e) => setNewDoctor({
                            ...newDoctor,
                            schedule: {
                              ...newDoctor.schedule,
                              [day]: { ...schedule, start: e.target.value }
                            }
                          })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="time"
                          value={schedule.end}
                          onChange={(e) => setNewDoctor({
                            ...newDoctor,
                            schedule: {
                              ...newDoctor.schedule,
                              [day]: { ...schedule, end: e.target.value }
                            }
                          })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
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
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingDoctor ? 'Обновить' : 'Добавить'}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newNews[`title_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewNews({...newNews, [`title_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Краткое описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={3}
                value={newNews[`excerpt_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewNews({...newNews, [`excerpt_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полный текст ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={6}
                value={newNews[`content_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewNews({...newNews, [`content_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <ImageUpload
                value={newNews.image}
                onChange={(value) => setNewNews({...newNews, image: value})}
                label="Изображение новости"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                checked={newNews.is_published}
                onChange={(e) => setNewNews({...newNews, is_published: e.target.checked})}
                className="rounded mr-2"
              />
              <label htmlFor="is_published" className="text-sm text-gray-700">
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
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingNews ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно вакансий */}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название должности ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newVacancy[`title_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewVacancy({...newVacancy, [`title_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание вакансии ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={4}
                value={newVacancy[`description_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewVacancy({...newVacancy, [`description_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Требования ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={3}
                value={newVacancy[`requirements_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewVacancy({...newVacancy, [`requirements_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Зарплата (в сумах)</label>
                <input
                  type="number"
                  required
                  value={newVacancy.salary}
                  onChange={(e) => setNewVacancy({...newVacancy, salary: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                <input
                  type="text"
                  required
                  value={newVacancy.location}
                  onChange={(e) => setNewVacancy({...newVacancy, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип занятости</label>
              <select
                value={newVacancy.employment_type}
                onChange={(e) => setNewVacancy({...newVacancy, employment_type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="full-time">Полная занятость</option>
                <option value="part-time">Частичная занятость</option>
                <option value="contract">Контракт</option>
                <option value="internship">Стажировка</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={newVacancy.is_active}
                onChange={(e) => setNewVacancy({...newVacancy, is_active: e.target.checked})}
                className="rounded mr-2"
              />
              <label htmlFor="is_active" className="text-sm text-gray-700">
                Активная вакансия
              </label>
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

        {/* Модальное окно галереи */}
        <Modal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          title={editingGalleryImage ? 'Редактировать изображение' : 'Добавить изображение'}
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            if (editingGalleryImage) {
              // updateGalleryImage logic here
              alert('Изображение обновлено!');
            } else {
              // addGalleryImage logic here
              alert('Изображение добавлено!');
            }
            setIsGalleryModalOpen(false);
          }} className="space-y-6">
            <AdminLanguageSwitcher 
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div>
              <ImageUpload
                value={newGalleryImage.url}
                onChange={(value) => setNewGalleryImage({...newGalleryImage, url: value})}
                label="Изображение для галереи"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newGalleryImage[`alt_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewGalleryImage({...newGalleryImage, [`alt_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <select
                value={newGalleryImage.category}
                onChange={(e) => setNewGalleryImage({...newGalleryImage, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {galleryCategories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name_ru}
                  </option>
                ))}
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
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название события ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newEvent[`title_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewEvent({...newEvent, [`title_${currentAdminLanguage}`]: e.target.value})}
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
                value={newEvent[`description_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewEvent({...newEvent, [`description_${currentAdminLanguage}`]: e.target.value})}
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
                  <option value="open-day">День открытых дверей</option>
                  <option value="masterclass">Мастер-класс</option>
                  <option value="seminar">Семинар</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Место проведения ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newEvent[`location_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewEvent({...newEvent, [`location_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <ImageUpload
                value={newEvent.image}
                onChange={(value) => setNewEvent({...newEvent, image: value})}
                label="Изображение события"
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

        {/* Модальное окно аккаунтов */}
        <Modal
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          title={editingAccount ? 'Редактировать аккаунт' : 'Добавить аккаунт'}
        >
          <form onSubmit={handleAccountSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Имя пользователя</label>
              <input
                type="text"
                required
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={newAccount.email}
                onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Роль</label>
              <select
                value={newAccount.role}
                onChange={(e) => setNewAccount({...newAccount, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="doctor">Врач</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
            
            {!editingAccount && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
                <input
                  type="password"
                  required
                  value={newAccount.password}
                  onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Минимум 6 символов"
                  minLength={6}
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingAccount ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно руководства */}
        <Modal
          isOpen={isLeadershipModalOpen}
          onClose={() => setIsLeadershipModalOpen(false)}
          title={editingLeader ? 'Редактировать руководителя' : 'Добавить руководителя'}
          size="large"
        >
          <form onSubmit={handleLeadershipSubmit} className="space-y-6">
            <AdminLanguageSwitcher 
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ФИО ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newLeader[`name_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewLeader({...newLeader, [`name_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Должность ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newLeader[`position_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewLeader({...newLeader, [`position_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Биография ({currentAdminLanguage.toUpperCase()})
              </label>
              <textarea
                required
                rows={4}
                value={newLeader[`biography_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewLeader({...newLeader, [`biography_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  value={newLeader.phone}
                  onChange={(e) => setNewLeader({...newLeader, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newLeader.email}
                  onChange={(e) => setNewLeader({...newLeader, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div>
              <ImageUpload
                value={newLeader.image}
                onChange={(value) => setNewLeader({...newLeader, image: value})}
                label="Фото руководителя"
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
                {editingLeader ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно категорий галереи */}
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title={editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
          size="large"
        >
          <form onSubmit={handleCategorySubmit} className="space-y-6">
            <AdminLanguageSwitcher 
              currentLanguage={currentAdminLanguage}
              onLanguageChange={setCurrentAdminLanguage}
              languages={languages}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название категории ({currentAdminLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newCategory[`name_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewCategory({...newCategory, [`name_${currentAdminLanguage}`]: e.target.value})}
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
                value={newCategory[`description_${currentAdminLanguage}`] || ''}
                onChange={(e) => setNewCategory({...newCategory, [`description_${currentAdminLanguage}`]: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingCategory ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default MultilingualAdminPanel;