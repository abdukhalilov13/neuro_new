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
import { Header, Footer } from './enhanced-components';

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
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
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
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                              Просмотр
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm">
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