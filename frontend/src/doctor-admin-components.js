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
  Check
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

// Полноценная админ-панель
export const AdminPanel = () => {
  const { adminData } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Данные состояния
  const [departments] = useState(siteData.departments);
  const [doctors] = useState(siteData.doctors);
  const [news] = useState(siteData.news);
  const [accounts] = useState([
    { id: 1, name: 'Админ', email: 'admin@neuro.uz', role: 'admin', status: 'active', createdAt: '2025-01-01' },
    { id: 2, name: 'Доктор Кариев', email: 'kariev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-01-15' }
  ]);
  const [leadership] = useState([
    {
      id: 1,
      name: 'Кариев Габрат Маратович',
      position: 'Директор центра',
      image: 'https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg',
      phone: '+998 71 264-96-10',
      email: 'director@neuro.uz'
    }
  ]);
  const [galleryImages] = useState([
    { id: 1, url: '/images/neuro-building.jpg', alt: 'Здание центра' },
    { id: 2, url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', alt: 'Операционная' }
  ]);

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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Отделения</h3>
                        <p className="text-3xl font-bold text-purple-600">{departments.length}</p>
                      </div>
                      <Building className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Врачи</h3>
                        <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Новости</h3>
                        <p className="text-3xl font-bold text-green-600">{news.length}</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Галерея</h3>
                        <p className="text-3xl font-bold text-orange-600">{galleryImages.length}</p>
                      </div>
                      <ImageIcon className="w-8 h-8 text-orange-500" />
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

            {activeTab !== 'dashboard' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {activeTab === 'departments' && 'Управление отделениями'}
                  {activeTab === 'doctors' && 'Управление врачами'}
                  {activeTab === 'news' && 'Управление новостями'}
                  {activeTab === 'gallery' && 'Управление галереей'}
                  {activeTab === 'accounts' && 'Управление аккаунтами'}
                  {activeTab === 'leadership' && 'Управление руководством'}
                  {activeTab === 'analytics' && 'Аналитика'}
                </h2>

                {activeTab === 'departments' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {departments.map(dept => (
                      <div key={dept.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{dept.name}</h4>
                        <p className="text-sm text-gray-600">{dept.description}</p>
                        <div className="flex space-x-2 mt-3">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'doctors' && (
                  <div className="space-y-4">
                    {doctors.map(doctor => (
                      <div key={doctor.id} className="p-4 border rounded-lg flex items-center justify-between">
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
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'news' && (
                  <div className="space-y-4">
                    {news.map(newsItem => (
                      <div key={newsItem.id} className="p-4 border rounded-lg flex items-start justify-between">
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
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {galleryImages.map(image => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex space-x-2">
                              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 text-center">{image.alt}</p>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        const url = prompt('Введите URL изображения:');
                        const alt = prompt('Введите описание изображения:');
                        if (url && alt) {
                          alert('Изображение добавлено в галерею!');
                        }
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Добавить изображение</span>
                    </button>
                  </div>
                )}

                {activeTab === 'accounts' && (
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
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'leadership' && (
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
                          <div className="text-xs text-gray-600 space-y-1">
                            <p>{leader.phone}</p>
                            <p>{leader.email}</p>
                          </div>
                          <div className="flex justify-center space-x-2 mt-3">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'analytics' && (
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
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};