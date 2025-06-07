import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  User,
  Phone,
  Mail,
  Clock,
  FileText,
  Search,
  Settings,
  BarChart3,
  Image as ImageIcon,
  Shield,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  Bell,
  Filter,
  Download,
  Upload,
  RefreshCw,
  X,
  Check,
  Brain
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';

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
  },
  {
    id: 3,
    date: '2025-06-08',
    time: '14:00',
    patient: {
      name: 'Сидоров Владимир Николаевич',
      phone: '+998 93 345-67-89',
      age: 58,
      complaint: 'Боли в пояснице'
    },
    status: 'confirmed',
    type: 'consultation'
  },
  {
    id: 4,
    date: '2025-06-09',
    time: '09:30',
    patient: {
      name: 'Каримова Фатима Рахимовна',
      phone: '+998 94 456-78-90',
      age: 28,
      complaint: 'Мигрень'
    },
    status: 'confirmed',
    type: 'consultation'
  }
];

const mockPatients = [
  {
    id: 1,
    name: 'Иванов Алексей Петрович',
    phone: '+998 90 123-45-67',
    email: 'ivanov@mail.uz',
    age: 45,
    lastVisit: '2025-05-15',
    diagnosis: 'Вегето-сосудистая дистония',
    status: 'active'
  },
  {
    id: 2,
    name: 'Петрова Мария Ивановна',
    phone: '+998 91 234-56-78',
    email: 'petrova@mail.uz',
    age: 32,
    lastVisit: '2025-05-20',
    diagnosis: 'Остеохондроз шейного отдела',
    status: 'active'
  },
  {
    id: 3,
    name: 'Сидоров Владимир Николаевич',
    phone: '+998 93 345-67-89',
    email: 'sidorov@mail.uz',
    age: 58,
    lastVisit: '2025-04-10',
    diagnosis: 'Радикулопатия',
    status: 'inactive'
  }
];

// Полноценный кабинет врача
export const DoctorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'doctor@neuro.uz' && loginData.password === 'demo123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: doctor@neuro.uz / demo123');
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.date === selectedDate
  );

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const updateAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
    alert(`Статус записи успешно изменен на "${status === 'confirmed' ? 'Подтверждено' : 'Отменено'}"`);
  };

  const handleAppointmentAction = (id, action) => {
    if (action === 'view') {
      const appointment = appointments.find(apt => apt.id === id);
      alert(`Детали записи:\n\nПациент: ${appointment.patient.name}\nВремя: ${appointment.time}\nТелефон: ${appointment.patient.phone}\nЖалобы: ${appointment.patient.complaint}`);
    } else if (action === 'cancel') {
      if (confirm('Вы уверены, что хотите отменить эту запись?')) {
        setAppointments(appointments.filter(apt => apt.id !== id));
        alert('Запись успешно отменена');
      }
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">NEURO.UZ</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Кабинет врача</h1>
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
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg"
                  alt="Врач"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Д-р Кариев</h3>
                  <p className="text-sm text-gray-600">Нейрохирург</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Панель управления</span>
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'appointments' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Записи пациентов</span>
                </button>
                <button
                  onClick={() => setActiveTab('patients')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'patients' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>База пациентов</span>
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'schedule' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Расписание</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Статистика */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Записей сегодня</h3>
                        <p className="text-3xl font-bold text-blue-600">{filteredAppointments.length}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего пациентов</h3>
                        <p className="text-3xl font-bold text-green-600">{patients.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Активных пациентов</h3>
                        <p className="text-3xl font-bold text-purple-600">
                          {patients.filter(p => p.status === 'active').length}
                        </p>
                      </div>
                      <Activity className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Ближайшие записи */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ближайшие записи</h3>
                  <div className="space-y-3">
                    {filteredAppointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-1">
                            <span className="font-medium text-gray-900">{appointment.patient.name}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {appointment.time} - {appointment.patient.complaint}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleAppointmentAction(appointment.id, 'view')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Просмотр
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Записи пациентов</h2>
                  <div className="flex items-center space-x-4">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Обновить</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <span className="font-medium text-gray-900">{appointment.patient.name}</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                appointment.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                appointment.type === 'consultation' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-purple-100 text-purple-800'
                              }`}>
                                {appointment.type === 'consultation' ? 'Консультация' : 'Повторный'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><Clock className="w-4 h-4 inline mr-2" />{appointment.time}</p>
                              <p><Phone className="w-4 h-4 inline mr-2" />{appointment.patient.phone}</p>
                              <p><FileText className="w-4 h-4 inline mr-2" />{appointment.patient.complaint}</p>
                              <p><User className="w-4 h-4 inline mr-2" />Возраст: {appointment.patient.age} лет</p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {appointment.status === 'pending' && (
                              <button 
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                              >
                                <Check className="w-4 h-4" />
                                <span>Подтвердить</span>
                              </button>
                            )}
                            <button 
                              onClick={() => handleAppointmentAction(appointment.id, 'view')}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Просмотр
                            </button>
                            <button 
                              onClick={() => handleAppointmentAction(appointment.id, 'cancel')}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Отменить
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'patients' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">База пациентов</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Добавить пациента</span>
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Поиск пациентов..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {filteredPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="font-medium text-gray-900">{patient.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              patient.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {patient.status === 'active' ? 'Активный' : 'Неактивный'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{patient.phone} • {patient.email}</p>
                            <p>Возраст: {patient.age} лет • Последний визит: {patient.lastVisit}</p>
                            <p>Диагноз: {patient.diagnosis}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Просмотреть карту
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Записать на прием
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Расписание работы</h2>
                <div className="space-y-4">
                  {[
                    { day: 'Понедельник', hours: '09:00 - 17:00' },
                    { day: 'Вторник', hours: '09:00 - 17:00' },
                    { day: 'Среда', hours: '09:00 - 17:00' },
                    { day: 'Четверг', hours: '09:00 - 17:00' },
                    { day: 'Пятница', hours: '09:00 - 17:00' },
                    { day: 'Суббота', hours: '09:00 - 15:00' },
                    { day: 'Воскресенье', hours: 'Выходной' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Редактировать
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Полноценная админ-панель
export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [editingService, setEditingService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [newSiteSettings, setNewSiteSettings] = useState({
    phones: '',
    emails: '',
    address: '',
    workingHours: {
      weekdays: '',
      saturday: '',
      sunday: ''
    }
  });

  const [newSeoSettings, setNewSeoSettings] = useState({
    title: '',
    description: '',
    keywords: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      setNewSiteSettings({
        phones: adminData.siteSettings.phones.join(', '),
        emails: adminData.siteSettings.emails.join(', '),
        address: adminData.siteSettings.address,
        workingHours: adminData.siteSettings.workingHours
      });
      setNewSeoSettings(adminData.seoSettings);
    }
  }, [isAuthenticated, adminData]);

  const handleSiteSettingsSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings({
      ...adminData.siteSettings,
      phones: newSiteSettings.phones.split(',').map(p => p.trim()),
      emails: newSiteSettings.emails.split(',').map(e => e.trim()),
      address: newSiteSettings.address,
      workingHours: newSiteSettings.workingHours
    });
    alert('Настройки сайта успешно обновлены!');
  };

  const handleSeoSettingsSubmit = (e) => {
    e.preventDefault();
    updateSeoSettings(newSeoSettings);
    alert('SEO настройки успешно обновлены!');
  };
  const { 
    adminData, 
    updateSiteSettings, 
    updateSeoSettings, 
    addService, 
    updateService, 
    deleteService 
  } = useAdmin();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@neuro.uz' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: admin@neuro.uz / admin123');
    }
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, {
        ...newService,
        price: parseInt(newService.price)
      });
    } else {
      addService({
        ...newService,
        price: parseInt(newService.price)
      });
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
    setNewService({ name: '', category: '', price: '', description: '' });
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
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
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'dashboard' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Панель управления</span>
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'services' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Услуги и цены</span>
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'contacts' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Контакты и соц.сети</span>
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'seo' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>SEO настройки</span>
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'gallery' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Галерея</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'analytics' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Аналитика</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Статистика */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего услуг</h3>
                        <p className="text-3xl font-bold text-purple-600">{adminData.services.length}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Записей сегодня</h3>
                        <p className="text-3xl font-bold text-blue-600">12</p>
                      </div>
                      <Calendar className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Активных врачей</h3>
                        <p className="text-3xl font-bold text-green-600">8</p>
                      </div>
                      <Users className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Просмотров сайта</h3>
                        <p className="text-3xl font-bold text-orange-600">1,245</p>
                      </div>
                      <Eye className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Последние действия */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние действия</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Новая запись: Иванов А.П.</span>
                      <span className="text-sm text-gray-600">10:30</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Обновлена услуга: МРТ головного мозга</span>
                      <span className="text-sm text-gray-600">09:15</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Добавлена новость</span>
                      <span className="text-sm text-gray-600">08:45</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
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

                  {/* Услуги по категориям */}
                  {['Диагностика', 'Хирургия', 'Консультации'].map(category => (
                    <div key={category} className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {adminData.services
                          .filter(service => service.category === category)
                          .map(service => (
                            <div key={service.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{service.name}</h4>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => startEditService(service)}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteService(service.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                              <p className="text-lg font-bold text-green-600">
                                {new Intl.NumberFormat('uz-UZ').format(service.price)} сум
                              </p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Управление контактами</h2>
                
                <div className="space-y-8">
                  {/* Телефоны */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Телефоны</h3>
                    <div className="space-y-3">
                      {adminData.siteSettings.phones.map((phone, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              const newPhones = [...adminData.siteSettings.phones];
                              newPhones[index] = e.target.value;
                              updateSiteSettings({ phones: newPhones });
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email адреса</h3>
                    <div className="space-y-3">
                      {adminData.siteSettings.emails.map((email, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              const newEmails = [...adminData.siteSettings.emails];
                              newEmails[index] = e.target.value;
                              updateSiteSettings({ emails: newEmails });
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          />
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Социальные сети */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Социальные сети</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Facebook className="w-6 h-6 text-blue-600" />
                        <input
                          type="url"
                          placeholder="https://facebook.com/neuro.uz"
                          value={adminData.siteSettings.socialMedia.facebook}
                          onChange={(e) => updateSiteSettings({
                            socialMedia: { ...adminData.siteSettings.socialMedia, facebook: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <Instagram className="w-6 h-6 text-pink-600" />
                        <input
                          type="url"
                          placeholder="https://instagram.com/neuro.uz"
                          value={adminData.siteSettings.socialMedia.instagram}
                          onChange={(e) => updateSiteSettings({
                            socialMedia: { ...adminData.siteSettings.socialMedia, instagram: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <Youtube className="w-6 h-6 text-red-600" />
                        <input
                          type="url"
                          placeholder="https://youtube.com/@neuro.uz"
                          value={adminData.siteSettings.socialMedia.youtube}
                          onChange={(e) => updateSiteSettings({
                            socialMedia: { ...adminData.siteSettings.socialMedia, youtube: e.target.value }
                          })}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Адрес */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Адрес</h3>
                    <textarea
                      rows={3}
                      value={adminData.siteSettings.address}
                      onChange={(e) => updateSiteSettings({ address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Сохранить изменения</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO настройки</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок сайта
                    </label>
                    <input
                      type="text"
                      value={adminData.seoSettings.title}
                      onChange={(e) => updateSeoSettings({ title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание сайта
                    </label>
                    <textarea
                      rows={3}
                      value={adminData.seoSettings.description}
                      onChange={(e) => updateSeoSettings({ description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ключевые слова
                    </label>
                    <input
                      type="text"
                      value={adminData.seoSettings.keywords}
                      onChange={(e) => updateSeoSettings({ keywords: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                    Сохранить настройки
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Галерея</h2>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Загрузить изображение</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1,2,3,4,5,6,7,8].map((item) => (
                    <div key={item} className="relative group">
                      <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button className="text-white text-sm bg-red-600 px-2 py-1 rounded">
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Контакты и соцсети</h2>
                
                <form onSubmit={handleSiteSettingsSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефоны (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newSiteSettings.phones}
                      onChange={(e) => setNewSiteSettings({...newSiteSettings, phones: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="+998 71 264-96-10, +998 71 264-96-09"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email адреса (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newSiteSettings.emails}
                      onChange={(e) => setNewSiteSettings({...newSiteSettings, emails: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="admin@neuro.uz, info@neuro.uz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес
                    </label>
                    <input
                      type="text"
                      value={newSiteSettings.address}
                      onChange={(e) => setNewSiteSettings({...newSiteSettings, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Пн-Пт
                      </label>
                      <input
                        type="text"
                        value={newSiteSettings.workingHours.weekdays}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          workingHours: {...newSiteSettings.workingHours, weekdays: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="8:00 - 18:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Суббота
                      </label>
                      <input
                        type="text"
                        value={newSiteSettings.workingHours.saturday}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          workingHours: {...newSiteSettings.workingHours, saturday: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="9:00 - 15:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Воскресенье
                      </label>
                      <input
                        type="text"
                        value={newSiteSettings.workingHours.sunday}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          workingHours: {...newSiteSettings.workingHours, sunday: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Выходной"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Сохранить изменения
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO настройки</h2>
                
                <form onSubmit={handleSeoSettingsSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок сайта
                    </label>
                    <input
                      type="text"
                      value={newSeoSettings.title}
                      onChange={(e) => setNewSeoSettings({...newSeoSettings, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание сайта
                    </label>
                    <textarea
                      rows={3}
                      value={newSeoSettings.description}
                      onChange={(e) => setNewSeoSettings({...newSeoSettings, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ключевые слова (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newSeoSettings.keywords}
                      onChange={(e) => setNewSeoSettings({...newSeoSettings, keywords: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Сохранить изменения
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Управление галереей</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Перетащите изображения сюда или</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                    Выберите файлы
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=300&h=200&fit=crop`}
                        alt={`Gallery ${i}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'contacts' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Контакты и соцсети</h2>
                
                <form onSubmit={handleSiteSettingsSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефоны (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newSiteSettings.phones}
                      onChange={(e) => setNewSiteSettings({...newSiteSettings, phones: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="+998 71 264-96-10, +998 71 264-96-09"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email адреса (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newSiteSettings.emails}
                      onChange={(e) => setNewSiteSettings({...newSiteSettings, emails: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="admin@neuro.uz, info@neuro.uz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес
                    </label>
                    <input
                      type="text"
                      value={newSiteSettings.address}
                      onChange={(e) => setNewSiteSettings({...newSiteSettings, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Пн-Пт
                      </label>
                      <input
                        type="text"
                        value={newSiteSettings.workingHours.weekdays}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          workingHours: {...newSiteSettings.workingHours, weekdays: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="8:00 - 18:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Суббота
                      </label>
                      <input
                        type="text"
                        value={newSiteSettings.workingHours.saturday}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          workingHours: {...newSiteSettings.workingHours, saturday: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="9:00 - 15:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Воскресенье
                      </label>
                      <input
                        type="text"
                        value={newSiteSettings.workingHours.sunday}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          workingHours: {...newSiteSettings.workingHours, sunday: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Выходной"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Сохранить изменения
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO настройки</h2>
                
                <form onSubmit={handleSeoSettingsSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок сайта
                    </label>
                    <input
                      type="text"
                      value={newSeoSettings.title}
                      onChange={(e) => setNewSeoSettings({...newSeoSettings, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание сайта
                    </label>
                    <textarea
                      rows={3}
                      value={newSeoSettings.description}
                      onChange={(e) => setNewSeoSettings({...newSeoSettings, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ключевые слова (через запятую)
                    </label>
                    <input
                      type="text"
                      value={newSeoSettings.keywords}
                      onChange={(e) => setNewSeoSettings({...newSeoSettings, keywords: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Сохранить изменения
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Управление галереей</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Перетащите изображения сюда или</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                    Выберите файлы
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=300&h=200&fit=crop`}
                        alt={`Gallery ${i}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Посещения за месяц</h3>
                      <p className="text-3xl font-bold text-blue-600">24,567</p>
                      <p className="text-sm text-blue-700">+12% к прошлому месяцу</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Записей на прием</h3>
                      <p className="text-3xl font-bold text-green-600">342</p>
                      <p className="text-sm text-green-700">+8% к прошлому месяцу</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2">Популярные услуги</h3>
                      <p className="text-lg font-bold text-purple-600">МРТ головного мозга</p>
                      <p className="text-sm text-purple-700">156 запросов</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-900 mb-2">Время на сайте</h3>
                      <p className="text-3xl font-bold text-orange-600">4:32</p>
                      <p className="text-sm text-orange-700">среднее время сессии</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно для услуг */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingService ? 'Редактировать услугу' : 'Добавить услугу'}
                </h3>
                <button
                  onClick={() => {
                    setIsServiceModalOpen(false);
                    setEditingService(null);
                    setNewService({ name: '', category: '', price: '', description: '' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

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
                    Цена (сум)
                  </label>
                  <input
                    type="number"
                    required
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingService ? 'Сохранить' : 'Добавить'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsServiceModalOpen(false);
                      setEditingService(null);
                      setNewService({ name: '', category: '', price: '', description: '' });
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};