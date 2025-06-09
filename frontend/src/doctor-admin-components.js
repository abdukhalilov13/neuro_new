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
  Camera
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';
import { siteData } from './components';

// Mock data for doctor dashboard
const mockAppointments = [
  {
    id: 1,
    date: '2025-06-08',
    time: '09:00',
    patient: {
      name: 'Иванов Алексей Петрович',
      phone: '+998 90 123-45-67',
      age: 45,
      complaint: 'Головные боли и головокружение'
    },
    status: 'confirmed',
    type: 'consultation'
  },
  {
    id: 2,
    date: '2025-06-08',
    time: '10:30',
    patient: {
      name: 'Петрова Мария Ивановна',
      phone: '+998 91 234-56-78',
      age: 32,
      complaint: 'Онемение в левой руке'
    },
    status: 'pending',
    type: 'follow-up'
  }
];

// Упрощенный кабинет врача
export const DoctorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState(mockAppointments);
  const { t } = useLanguage();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'doctor@neuro.uz' && loginData.password === 'demo123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: doctor@neuro.uz / demo123');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-4"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Вход в кабинет врача</h1>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="doctor@neuro.uz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="demo123"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Демо доступ:</strong><br />
              Email: doctor@neuro.uz<br />
              Пароль: demo123
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Вернуться на главную
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-xl font-bold text-gray-900">NEURO.UZ</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Кабинет врача</h1>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Панель врача</h2>
          <p className="text-gray-600">Добро пожаловать в кабинет врача. Здесь вы можете управлять своими записями.</p>
        </div>
      </div>
    </div>
  );
};

// Функция для загрузки изображений
const handleFileUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Файл не выбран');
      return;
    }
    
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      reject('Выберите файл изображения');
      return;
    }
    
    // Проверка размера файла (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      reject('Размер файла не должен превышать 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = () => {
      reject('Ошибка при чтении файла');
    };
    reader.readAsDataURL(file);
  });
};

// Компонент для загрузки изображений
const ImageUploader = ({ onImageUpload, currentImage, placeholder = "Загрузить изображение" }) => {
  const [dragOver, setDragOver] = useState(false);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file)
        .then(onImageUpload)
        .catch(alert);
    }
  };
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file)
        .then(onImageUpload)
        .catch(alert);
    }
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
    >
      {currentImage ? (
        <div className="space-y-4">
          <img
            src={currentImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg mx-auto"
          />
          <p className="text-sm text-gray-600">Перетащите новое изображение для замены</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Camera className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-600">{placeholder}</p>
          <p className="text-sm text-gray-500">Перетащите файл сюда или нажмите для выбора</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer mt-4 transition-colors"
      >
        <Upload className="w-4 h-4 inline mr-2" />
        Выбрать файл
      </label>
    </div>
  );
};

// Модальное окно
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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

// Полноценная админ-панель
export const AdminPanel = () => {
  const { adminData } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Модальные окна
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLeadershipModalOpen, setIsLeadershipModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  // Состояния редактирования
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingLeadership, setEditingLeadership] = useState(null);
  const [editingService, setEditingService] = useState(null);
  
  // Данные состояния - ИСПОЛЬЗУЕМ ИЗ КОНТЕКСТА
  const { adminData, 
    addService, updateService, deleteService,
    addDepartment, updateDepartment, deleteDepartment,
    addDoctor, updateDoctor, deleteDoctor,
    addNews, updateNews, deleteNews,
    addAccount, updateAccount, deleteAccount, toggleAccountStatus,
    addLeadership, updateLeadership, deleteLeadership,
    addGalleryImage, updateGalleryImage, deleteGalleryImage
  } = useAdmin();

  // Получаем данные из контекста
  const departments = adminData.departments || siteData.departments;
  const doctors = adminData.doctors || siteData.doctors;
  const news = adminData.news || siteData.news;
  const services = adminData.services || [];
  const accounts = adminData.accounts || [];
  const leadership = adminData.leadership || [];
  const galleryImages = adminData.galleryImages || [];
  
  // Формы для новых записей
  const [newDepartment, setNewDepartment] = useState({ 
    name: '', 
    description: '', 
    icon: 'Brain', 
    color: 'from-blue-500 to-blue-600' 
  });
  const [newDoctor, setNewDoctor] = useState({ 
    name: '', 
    specialization: '', 
    experience: '', 
    image: '', 
    email: '', 
    phone: '', 
    reception: '', 
    departmentId: '' 
  });
  const [newNews, setNewNews] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    image: '' 
  });
  const [newAccount, setNewAccount] = useState({ 
    name: '', 
    email: '', 
    role: 'doctor', 
    password: '' 
  });
  const [newLeadership, setNewLeadership] = useState({ 
    name: '', 
    position: '', 
    image: '', 
    phone: '', 
    email: '', 
    biography: '' 
  });
  const [newService, setNewService] = useState({ 
    name: '', 
    category: '', 
    price: '', 
    description: '' 
  });
  const [newGalleryImage, setNewGalleryImage] = useState({ 
    url: '', 
    alt: '', 
    category: 'general' 
  });

  // Иконки для отделений
  const departmentIcons = {
    Brain, Activity, Shield, Heart, Star, Search, Award, Building
  };

  const departmentColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
    'from-red-500 to-red-600'
  ];

  // Функции для отделений
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      setDepartments(departments.map(dept => 
        dept.id === editingDepartment.id ? { ...newDepartment, id: editingDepartment.id } : dept
      ));
      alert('Отделение успешно обновлено!');
      setEditingDepartment(null);
    } else {
      const newId = Math.max(...departments.map(d => d.id)) + 1;
      setDepartments([...departments, { ...newDepartment, id: newId }]);
      alert('Новое отделение добавлено!');
    }
    setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
    setIsDepartmentModalOpen(false);
  };

  const startEditDepartment = (department) => {
    setEditingDepartment(department);
    setNewDepartment({
      name: department.name,
      description: department.description,
      icon: department.icon || 'Brain',
      color: department.color || 'from-blue-500 to-blue-600'
    });
    setIsDepartmentModalOpen(true);
  };

  const deleteDepartment = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это отделение?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
      setDoctors(doctors.map(doctor => 
        doctor.departmentId === id ? { ...doctor, departmentId: null } : doctor
      ));
      alert('Отделение удалено!');
    }
  };

  // Функции для врачей
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id ? { ...newDoctor, id: editingDoctor.id } : doctor
      ));
      alert('Информация о враче обновлена!');
      setEditingDoctor(null);
    } else {
      const newId = Math.max(...doctors.map(d => d.id)) + 1;
      setDoctors([...doctors, { ...newDoctor, id: newId }]);
      alert('Новый врач добавлен!');
    }
    setNewDoctor({ name: '', specialization: '', experience: '', image: '', email: '', phone: '', reception: '', departmentId: '' });
    setIsDoctorModalOpen(false);
  };

  const startEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      image: doctor.image,
      email: doctor.email,
      phone: doctor.phone,
      reception: doctor.reception,
      departmentId: doctor.departmentId || ''
    });
    setIsDoctorModalOpen(true);
  };

  const deleteDoctor = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого врача?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
      alert('Врач удален!');
    }
  };

  // Функции для новостей
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(item => 
        item.id === editingNews.id ? { ...newNews, id: editingNews.id, date: item.date } : item
      ));
      alert('Новость обновлена!');
      setEditingNews(null);
    } else {
      const newId = Math.max(...news.map(n => n.id)) + 1;
      const today = new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      setNews([...news, { ...newNews, id: newId, date: today }]);
      alert('Новость добавлена!');
    }
    setNewNews({ title: '', excerpt: '', content: '', image: '' });
    setIsNewsModalOpen(false);
  };

  const startEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setNewNews({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      image: newsItem.image
    });
    setIsNewsModalOpen(true);
  };

  const deleteNews = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      setNews(news.filter(item => item.id !== id));
      alert('Новость удалена!');
    }
  };

  // Функции для аккаунтов
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      setAccounts(accounts.map(account => 
        account.id === editingAccount.id ? { 
          ...newAccount, 
          id: editingAccount.id, 
          createdAt: editingAccount.createdAt,
          status: editingAccount.status 
        } : account
      ));
      alert('Аккаунт обновлен!');
      setEditingAccount(null);
    } else {
      const newId = Math.max(...accounts.map(a => a.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      setAccounts([...accounts, { 
        ...newAccount, 
        id: newId, 
        createdAt: today,
        status: 'active'
      }]);
      alert('Новый аккаунт создан!');
    }
    setNewAccount({ name: '', email: '', role: 'doctor', password: '' });
    setIsAccountModalOpen(false);
  };

  const startEditAccount = (account) => {
    setEditingAccount(account);
    setNewAccount({
      name: account.name,
      email: account.email,
      role: account.role,
      password: ''
    });
    setIsAccountModalOpen(true);
  };

  const deleteAccount = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот аккаунт?')) {
      setAccounts(accounts.filter(account => account.id !== id));
      alert('Аккаунт удален!');
    }
  };

  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { 
        ...account, 
        status: account.status === 'active' ? 'inactive' : 'active' 
      } : account
    ));
    alert('Статус аккаунта изменен!');
  };

  // Функции для руководства
  const handleLeadershipSubmit = (e) => {
    e.preventDefault();
    if (editingLeadership) {
      setLeadership(leadership.map(leader => 
        leader.id === editingLeadership.id ? { ...newLeadership, id: editingLeadership.id } : leader
      ));
      alert('Информация о руководителе обновлена!');
      setEditingLeadership(null);
    } else {
      const newId = Math.max(...leadership.map(l => l.id)) + 1;
      setLeadership([...leadership, { ...newLeadership, id: newId }]);
      alert('Новый руководитель добавлен!');
    }
    setNewLeadership({ name: '', position: '', image: '', phone: '', email: '', biography: '' });
    setIsLeadershipModalOpen(false);
  };

  const startEditLeadership = (leader) => {
    setEditingLeadership(leader);
    setNewLeadership({
      name: leader.name,
      position: leader.position,
      image: leader.image,
      phone: leader.phone,
      email: leader.email,
      biography: leader.biography
    });
    setIsLeadershipModalOpen(true);
  };

  const deleteLeadership = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого руководителя?')) {
      setLeadership(leadership.filter(leader => leader.id !== id));
      alert('Руководитель удален!');
    }
  };

  // Функции для услуг
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? { 
          ...newService, 
          id: editingService.id,
          price: parseInt(newService.price)
        } : service
      ));
      alert('Услуга обновлена!');
      setEditingService(null);
    } else {
      const newId = Math.max(...services.map(s => s.id)) + 1;
      setServices([...services, { 
        ...newService, 
        id: newId,
        price: parseInt(newService.price)
      }]);
      alert('Новая услуга добавлена!');
    }
    setNewService({ name: '', category: '', price: '', description: '' });
    setIsServiceModalOpen(false);
  };

  const startEditService = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      description: service.description
    });
    setIsServiceModalOpen(true);
  };

  const deleteService = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      setServices(services.filter(service => service.id !== id));
      alert('Услуга удалена!');
    }
  };

  // Функции для галереи
  const addGalleryImage = () => {
    if (newGalleryImage.url && newGalleryImage.alt) {
      const newId = Math.max(...galleryImages.map(img => img.id)) + 1;
      setGalleryImages([...galleryImages, {
        ...newGalleryImage,
        id: newId
      }]);
      setNewGalleryImage({ url: '', alt: '', category: 'general' });
      alert('Изображение добавлено в галерею!');
    }
  };

  const deleteGalleryImage = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это изображение?')) {
      setGalleryImages(galleryImages.filter(img => img.id !== id));
      alert('Изображение удалено!');
    }
  };

  const updateGalleryImage = (id, field, value) => {
    setGalleryImages(galleryImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
    alert('Изображение обновлено!');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@neuro.uz' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: admin@neuro.uz / admin123');
    }
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
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Вход в админ-панель</h1>
            <p className="text-gray-600 mt-2">Только для администраторов</p>
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
              Войти в систему
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
              <h1 className="text-xl font-semibold text-gray-900">Админ-панель</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковое меню */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: BarChart3, label: 'Панель управления' },
                  { id: 'services', icon: DollarSign, label: 'Услуги и цены' },
                  { id: 'departments', icon: Building, label: 'Отделения' },
                  { id: 'doctors', icon: UserCheck, label: 'Врачи' },
                  { id: 'news', icon: BookOpen, label: 'Новости' },
                  { id: 'gallery', icon: ImageIcon, label: 'Галерея' },
                  { id: 'accounts', icon: Users, label: 'Аккаунты' },
                  { id: 'leadership', icon: Award, label: 'Руководство' },
                  { id: 'analytics', icon: TrendingUp, label: 'Аналитика' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      activeTab === item.id ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Услуги</h3>
                        <p className="text-3xl font-bold text-purple-600">{services.length}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Отделения</h3>
                        <p className="text-3xl font-bold text-blue-600">{departments.length}</p>
                      </div>
                      <Building className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Врачи</h3>
                        <p className="text-3xl font-bold text-green-600">{doctors.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Новости</h3>
                        <p className="text-3xl font-bold text-orange-600">{news.length}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние действия</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Обновлена новость: {news[0]?.title}</span>
                      <span className="text-sm text-gray-600">Сегодня</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Добавлен врач: {doctors[0]?.name}</span>
                      <span className="text-sm text-gray-600">Вчера</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Создан аккаунт: {accounts[accounts.length - 1]?.name}</span>
                      <span className="text-sm text-gray-600">2 дня назад</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Услуги */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление услугами</h2>
                  <button 
                    onClick={() => setIsServiceModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить услугу</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {['Диагностика', 'Хирургия', 'Консультации'].map(category => (
                    <div key={category}>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {services.filter(service => service.category === category).map(service => (
                          <div key={service.id} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{service.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                <p className="text-lg font-bold text-green-600 mt-2">
                                  {service.price.toLocaleString()} сум
                                </p>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() => startEditService(service)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteService(service.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Отделения */}
            {activeTab === 'departments' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление отделениями</h2>
                  <button 
                    onClick={() => setIsDepartmentModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить отделение</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {departments.map(dept => {
                    const IconComponent = departmentIcons[dept.icon] || Brain;
                    return (
                      <div key={dept.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-10 h-10 bg-gradient-to-br ${dept.color} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-900">{dept.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{dept.description}</p>
                            <p className="text-xs text-blue-600 mt-2">
                              Врачей: {doctors.filter(doctor => doctor.departmentId === dept.id).length}
                            </p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button 
                              onClick={() => startEditDepartment(dept)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteDepartment(dept.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Врачи */}
            {activeTab === 'doctors' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление врачами</h2>
                  <button 
                    onClick={() => setIsDoctorModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить врача</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {doctors.map(doctor => {
                    const department = departments.find(dept => dept.id === doctor.departmentId);
                    return (
                      <div key={doctor.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                              <p className="text-sm text-gray-600">{doctor.specialization}</p>
                              <p className="text-sm text-blue-600">{doctor.experience}</p>
                              {department && (
                                <p className="text-xs text-green-600">Отделение: {department.name}</p>
                              )}
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span>{doctor.phone}</span>
                                <span>{doctor.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => startEditDoctor(doctor)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteDoctor(doctor.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Новости */}
            {activeTab === 'news' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление новостями</h2>
                  <button 
                    onClick={() => setIsNewsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить новость</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {news.map(newsItem => (
                    <div key={newsItem.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{newsItem.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{newsItem.excerpt}</p>
                            <p className="text-xs text-blue-600">{newsItem.date}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button 
                            onClick={() => startEditNews(newsItem)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteNews(newsItem.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

            {/* Галерея */}
            {activeTab === 'gallery' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление галереей</h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Добавить изображение</h3>
                  <ImageUploader
                    onImageUpload={(imageData) => setNewGalleryImage({...newGalleryImage, url: imageData})}
                    currentImage={newGalleryImage.url}
                    placeholder="Загрузите изображение для галереи"
                  />
                  {newGalleryImage.url && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Описание изображения
                        </label>
                        <input
                          type="text"
                          value={newGalleryImage.alt}
                          onChange={(e) => setNewGalleryImage({...newGalleryImage, alt: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Введите описание изображения"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Категория
                        </label>
                        <select
                          value={newGalleryImage.category}
                          onChange={(e) => setNewGalleryImage({...newGalleryImage, category: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="general">Общее</option>
                          <option value="building">Здание</option>
                          <option value="equipment">Оборудование</option>
                          <option value="doctors">Врачи</option>
                          <option value="patients">Пациенты</option>
                        </select>
                      </div>
                      <button
                        onClick={addGalleryImage}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                      >
                        Добавить в галерею
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map(image => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              const newAlt = prompt('Измените описание:', image.alt);
                              if (newAlt !== null) {
                                updateGalleryImage(image.id, 'alt', newAlt);
                              }
                            }}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteGalleryImage(image.id)}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 text-center">{image.alt}</p>
                        <p className="text-xs text-gray-500 text-center">{image.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Аккаунты */}
            {activeTab === 'accounts' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление аккаунтами</h2>
                  <button 
                    onClick={() => setIsAccountModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Создать аккаунт</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {accounts.map(account => (
                    <div key={account.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{account.name}</h4>
                            <p className="text-sm text-gray-600">{account.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 text-xs rounded ${
                                account.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {account.role === 'admin' ? 'Администратор' : 'Врач'}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded ${
                                account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {account.status === 'active' ? 'Активен' : 'Заблокирован'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => startEditAccount(account)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleAccountStatus(account.id)}
                            className={`p-2 rounded-lg ${
                              account.status === 'active' 
                                ? 'text-red-600 hover:bg-red-50' 
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {account.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => deleteAccount(account.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

            {/* Руководство */}
            {activeTab === 'leadership' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Управление руководством</h2>
                  <button 
                    onClick={() => setIsLeadershipModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить руководителя</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leadership.map(leader => (
                    <div key={leader.id} className="p-4 border rounded-lg">
                      <div className="text-center">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                        />
                        <h4 className="font-medium text-gray-900 mb-1">{leader.name}</h4>
                        <p className="text-sm text-blue-600 mb-2">{leader.position}</p>
                        <p className="text-xs text-gray-600 mb-3">{leader.biography}</p>
                        <div className="text-xs text-gray-600 space-y-1 mb-3">
                          <p>{leader.phone}</p>
                          <p>{leader.email}</p>
                        </div>
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => startEditLeadership(leader)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteLeadership(leader.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

            {/* Аналитика */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Аналитика сайта</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Записи на прием</h3>
                      <p className="text-3xl font-bold text-blue-600">{mockAppointments.length}</p>
                      <p className="text-sm text-blue-700">Всего записей в системе</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Подтвержденные</h3>
                      <p className="text-3xl font-bold text-green-600">
                        {mockAppointments.filter(apt => apt.status === 'confirmed').length}
                      </p>
                      <p className="text-sm text-green-700">Из общего количества</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">Активные врачи</h3>
                      <p className="text-3xl font-bold text-purple-600">{doctors.length}</p>
                      <p className="text-sm text-purple-700">Врачей в штате</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900 mb-2">Отделения</h3>
                      <p className="text-3xl font-bold text-orange-600">{departments.length}</p>
                      <p className="text-sm text-orange-700">Действующих отделений</p>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h3 className="font-semibold text-indigo-900 mb-2">Новости</h3>
                      <p className="text-3xl font-bold text-indigo-600">{news.length}</p>
                      <p className="text-sm text-indigo-700">Опубликованных новостей</p>
                    </div>

                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h3 className="font-semibold text-pink-900 mb-2">Аккаунты</h3>
                      <p className="text-3xl font-bold text-pink-600">
                        {accounts.filter(acc => acc.status === 'active').length}
                      </p>
                      <p className="text-sm text-pink-700">Активных пользователей</p>
                    </div>

                    <div className="p-4 bg-teal-50 rounded-lg">
                      <h3 className="font-semibold text-teal-900 mb-2">Руководство</h3>
                      <p className="text-3xl font-bold text-teal-600">{leadership.length}</p>
                      <p className="text-sm text-teal-700">Членов руководства</p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Галерея</h3>
                      <p className="text-3xl font-bold text-yellow-600">{galleryImages.length}</p>
                      <p className="text-sm text-yellow-700">Изображений в галерее</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <AnimatePresence>
        {/* Модальное окно услуг */}
        <Modal
          isOpen={isServiceModalOpen}
          onClose={() => {
            setIsServiceModalOpen(false);
            setEditingService(null);
            setNewService({ name: '', category: '', price: '', description: '' });
          }}
          title={editingService ? "Редактировать услугу" : "Добавить услугу"}
        >
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название услуги
              </label>
              <input
                type="text"
                required
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите название услуги"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                required
                value={newService.category}
                onChange={(e) => setNewService({...newService, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Выберите категорию</option>
                <option value="Диагностика">Диагностика</option>
                <option value="Хирургия">Хирургия</option>
                <option value="Консультации">Консультации</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена (в сумах)
              </label>
              <input
                type="number"
                required
                value={newService.price}
                onChange={(e) => setNewService({...newService, price: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                required
                rows={3}
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите описание услуги"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {editingService ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно отделений */}
        <Modal
          isOpen={isDepartmentModalOpen}
          onClose={() => {
            setIsDepartmentModalOpen(false);
            setEditingDepartment(null);
            setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
          }}
          title={editingDepartment ? "Редактировать отделение" : "Добавить отделение"}
        >
          <form onSubmit={handleDepartmentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название отделения
              </label>
              <input
                type="text"
                required
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите название отделения"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                required
                rows={3}
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите описание отделения"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Иконка
              </label>
              <select
                value={newDepartment.icon}
                onChange={(e) => setNewDepartment({...newDepartment, icon: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {Object.keys(departmentIcons).map(iconName => (
                  <option key={iconName} value={iconName}>{iconName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цветовая схема
              </label>
              <select
                value={newDepartment.color}
                onChange={(e) => setNewDepartment({...newDepartment, color: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {departmentColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsDepartmentModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {editingDepartment ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно врачей */}
        <Modal
          isOpen={isDoctorModalOpen}
          onClose={() => {
            setIsDoctorModalOpen(false);
            setEditingDoctor(null);
            setNewDoctor({ name: '', specialization: '', experience: '', image: '', email: '', phone: '', reception: '', departmentId: '' });
          }}
          title={editingDoctor ? "Редактировать врача" : "Добавить врача"}
        >
          <form onSubmit={handleDoctorSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фотография
              </label>
              <ImageUploader
                onImageUpload={(imageData) => setNewDoctor({...newDoctor, image: imageData})}
                currentImage={newDoctor.image}
                placeholder="Загрузите фото врача"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Полное имя
                </label>
                <input
                  type="text"
                  required
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Введите полное имя врача"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Отделение
                </label>
                <select
                  value={newDoctor.departmentId}
                  onChange={(e) => setNewDoctor({...newDoctor, departmentId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Выберите отделение</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Специализация
              </label>
              <input
                type="text"
                required
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите специализацию"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Опыт работы
              </label>
              <input
                type="text"
                required
                value={newDoctor.experience}
                onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Например: Более 15 лет"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="doctor@neuro.uz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  required
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="+998 71 264-96-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Часы приема
              </label>
              <input
                type="text"
                required
                value={newDoctor.reception}
                onChange={(e) => setNewDoctor({...newDoctor, reception: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Понедельник-Пятница, 9:00-17:00"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsDoctorModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {editingDoctor ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно новостей */}
        <Modal
          isOpen={isNewsModalOpen}
          onClose={() => {
            setIsNewsModalOpen(false);
            setEditingNews(null);
            setNewNews({ title: '', excerpt: '', content: '', image: '' });
          }}
          title={editingNews ? "Редактировать новость" : "Добавить новость"}
        >
          <form onSubmit={handleNewsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Изображение новости
              </label>
              <ImageUploader
                onImageUpload={(imageData) => setNewNews({...newNews, image: imageData})}
                currentImage={newNews.image}
                placeholder="Загрузите изображение для новости"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок
              </label>
              <input
                type="text"
                required
                value={newNews.title}
                onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите заголовок новости"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Краткое описание
              </label>
              <textarea
                required
                rows={3}
                value={newNews.excerpt}
                onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите краткое описание новости"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полный текст
              </label>
              <textarea
                required
                rows={6}
                value={newNews.content}
                onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите полный текст новости"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsNewsModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {editingNews ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно аккаунтов */}
        <Modal
          isOpen={isAccountModalOpen}
          onClose={() => {
            setIsAccountModalOpen(false);
            setEditingAccount(null);
            setNewAccount({ name: '', email: '', role: 'doctor', password: '' });
          }}
          title={editingAccount ? "Редактировать аккаунт" : "Создать аккаунт"}
        >
          <form onSubmit={handleAccountSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Полное имя
              </label>
              <input
                type="text"
                required
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите полное имя"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={newAccount.email}
                onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="user@neuro.uz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Роль
              </label>
              <select
                required
                value={newAccount.role}
                onChange={(e) => setNewAccount({...newAccount, role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="doctor">Врач</option>
                <option value="admin">Администратор</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingAccount ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль'}
              </label>
              <input
                type="password"
                required={!editingAccount}
                value={newAccount.password}
                onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите пароль"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {editingAccount ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Модальное окно руководства */}
        <Modal
          isOpen={isLeadershipModalOpen}
          onClose={() => {
            setIsLeadershipModalOpen(false);
            setEditingLeadership(null);
            setNewLeadership({ name: '', position: '', image: '', phone: '', email: '', biography: '' });
          }}
          title={editingLeadership ? "Редактировать руководителя" : "Добавить руководителя"}
        >
          <form onSubmit={handleLeadershipSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фотография
              </label>
              <ImageUploader
                onImageUpload={(imageData) => setNewLeadership({...newLeadership, image: imageData})}
                currentImage={newLeadership.image}
                placeholder="Загрузите фото руководителя"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Полное имя
                </label>
                <input
                  type="text"
                  required
                  value={newLeadership.name}
                  onChange={(e) => setNewLeadership({...newLeadership, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Введите полное имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Должность
                </label>
                <input
                  type="text"
                  required
                  value={newLeadership.position}
                  onChange={(e) => setNewLeadership({...newLeadership, position: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Введите должность"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  required
                  value={newLeadership.phone}
                  onChange={(e) => setNewLeadership({...newLeadership, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="+998 71 264-96-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newLeadership.email}
                  onChange={(e) => setNewLeadership({...newLeadership, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="leader@neuro.uz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Биография
              </label>
              <textarea
                required
                rows={4}
                value={newLeadership.biography}
                onChange={(e) => setNewLeadership({...newLeadership, biography: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Введите биографию и достижения"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsLeadershipModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                {editingLeadership ? 'Обновить' : 'Добавить'}
              </button>
            </div>
          </form>
        </Modal>
      </AnimatePresence>
    </div>
  );
};