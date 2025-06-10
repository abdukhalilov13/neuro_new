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
  Stethoscope
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
  },
  {
    id: 3,
    date: '2025-06-09',
    time: '14:00',
    patient: {
      name: 'Сидоров Петр Иванович',
      phone: '+998 93 345-67-89',
      age: 58,
      complaint: 'Боли в пояснице, онемение ног'
    },
    status: 'confirmed',
    type: 'consultation'
  },
  {
    id: 4,
    date: '2025-06-10',
    time: '15:30',
    patient: {
      name: 'Козлова Анна Сергеевна',
      phone: '+998 94 456-78-90',
      age: 28,
      complaint: 'Мигрень, нарушение координации'
    },
    status: 'pending',
    type: 'follow-up'
  }
];

// ПОЛНОЦЕННЫЙ кабинет врача
export const DoctorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newPatientNote, setNewPatientNote] = useState('');
  const { t } = useLanguage();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'doctor@neuro.uz' && loginData.password === 'demo123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: doctor@neuro.uz / demo123');
    }
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const addPatientNote = (appointmentId, note) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, notes: [...(apt.notes || []), { date: new Date().toLocaleDateString(), text: note }] }
          : apt
      )
    );
    setNewPatientNote('');
    alert('Заметка добавлена!');
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
      {/* Header */}
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
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
              { id: 'appointments', label: 'Записи на прием', icon: Calendar },
              { id: 'schedule', label: 'Расписание', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Записи сегодня</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Подтвержденные</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {appointments.filter(apt => apt.status === 'confirmed').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ожидающие</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {appointments.filter(apt => apt.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Всего пациентов</p>
                    <p className="text-2xl font-semibold text-gray-900">{appointments.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Ближайшие записи</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{appointment.patient.name}</p>
                          <p className="text-sm text-gray-500">{appointment.patient.complaint}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Записи на прием</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Экспорт
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Пациент
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата и время
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Жалобы
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
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.patient.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.patient.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{appointment.patient.complaint}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Расписание работы</h2>
            <p className="text-gray-600 mb-6">Просмотр вашего рабочего расписания. Редактирование доступно только через админ-панель.</p>
            
            {/* Календарь расписания */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-700 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Рабочие часы */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Рабочие часы</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница:</span>
                  <span className="font-medium">9:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота:</span>
                  <span className="font-medium">9:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье:</span>
                  <span className="font-medium text-red-600">Выходной</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Карта пациента</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Информация о пациенте</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Имя:</span>
                    <span className="ml-2 text-gray-900">{selectedAppointment.patient.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Возраст:</span>
                    <span className="ml-2 text-gray-900">{selectedAppointment.patient.age} лет</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Телефон:</span>
                    <span className="ml-2 text-gray-900">{selectedAppointment.patient.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Дата приема:</span>
                    <span className="ml-2 text-gray-900">{selectedAppointment.date} {selectedAppointment.time}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Жалобы</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedAppointment.patient.complaint}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Заметки врача</h4>
                <div className="space-y-2 mb-4">
                  {selectedAppointment.notes?.map((note, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded">
                      <div className="text-xs text-blue-600">{note.date}</div>
                      <div className="text-sm text-gray-700">{note.text}</div>
                    </div>
                  )) || <p className="text-gray-500 text-sm">Заметок пока нет</p>}
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newPatientNote}
                    onChange={(e) => setNewPatientNote(e.target.value)}
                    placeholder="Добавить заметку..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => addPatientNote(selectedAppointment.id, newPatientNote)}
                    disabled={!newPatientNote.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Данные состояния - ИСПОЛЬЗУЕМ ИЗ КОНТЕКСТА
  const { adminData, 
    addService, updateService, deleteService,
    addDepartment, updateDepartment, deleteDepartment,
    addDoctor, updateDoctor, deleteDoctor,
    addNews, updateNews, deleteNews,
    addAccount, updateAccount, deleteAccount, toggleAccountStatus,
    addLeadership, updateLeadership, deleteLeadership,
    addGalleryImage, updateGalleryImage, deleteGalleryImage,
    updateSiteSettings, updateSeoSettings
  } = useAdmin();
  
  // Настройки сайта - ИНИЦИАЛИЗИРУЕМ ПОСЛЕ ПОЛУЧЕНИЯ ДАННЫХ
  const [seoSettings, setSeoSettings] = useState(adminData?.seoSettings || {
    title: 'Республиканский Научный Центр Нейрохирургии',
    description: 'Ведущий центр нейрохирургии в Центральной Азии. Более 25 лет опыта в лечении заболеваний нервной системы.',
    keywords: 'нейрохирургия, мозг, спинной мозг, операции, Узбекистан, Ташкент'
  });
  
  const [siteSettings, setSiteSettings] = useState(adminData?.siteSettings || {
    address: 'ул. Хумоюн, 40, Мирзо-Улугбекский район, г. Ташкент, 100142, Республика Узбекистан',
    phones: ['+998 71 264-96-10', '+998 71 264-96-09', '+998 78 113-33-78'],
    emails: ['admin@neuro.uz', 'info@neuro.uz'],
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
  
  // Модальные окна
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLeadershipModalOpen, setIsLeadershipModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  
  // Состояния редактирования
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingLeadership, setEditingLeadership] = useState({
    id: null,
    name: '',
    position: '',
    image: '',
    phone: '',
    email: '',
    bio: '',
    education: [],
    experience: [],
    achievements: []
  });
  const [editingService, setEditingService] = useState(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  
  // Получаем данные из контекста
  const departments = adminData?.departments || siteData.departments;
  const doctors = adminData?.doctors || siteData.doctors;
  const news = adminData?.news || siteData.news;
  const services = adminData?.services || [];
  const accounts = adminData?.accounts || [];
  const leadership = adminData?.leadership || [];
  const galleryImages = adminData?.galleryImages || [];
  
  // Состояния для управления галереей
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [galleryCategories, setGalleryCategories] = useState([
    'general', 'building', 'equipment', 'surgery', 'staff', 'events'
  ]);
  
  // Состояния для загрузки файлов
  const [uploadType, setUploadType] = useState('url');
  const [filePreview, setFilePreview] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  
  // Состояния для загрузки файлов врачей  
  const [doctorUploadType, setDoctorUploadType] = useState('url');
  const [doctorFilePreview, setDoctorFilePreview] = useState(null);
  const [uploadingDoctorFile, setUploadingDoctorFile] = useState(false);
  
  // Состояния для загрузки файлов новостей
  const [newsUploadType, setNewsUploadType] = useState('url');
  const [newsFilePreview, setNewsFilePreview] = useState(null);
  const [uploadingNewsFile, setUploadingNewsFile] = useState(false);
  
  // Состояния для загрузки файлов руководства
  const [leadershipUploadType, setLeadershipUploadType] = useState('url');
  const [leadershipFilePreview, setLeadershipFilePreview] = useState(null);
  const [uploadingLeadershipFile, setUploadingLeadershipFile] = useState(false);
  
  // Состояния для управления статистикой
  const [statistics, setStatistics] = useState([
    { id: 1, title: 'Пациентов в год', value: '5000+', icon: 'Users', color: 'bg-green-600' },
    { id: 2, title: 'Лет опыта', value: '25+', icon: 'Award', color: 'bg-blue-600' },
    { id: 3, title: 'Операций', value: '1500+', icon: 'Heart', color: 'bg-red-600' },
    { id: 4, title: 'Врачей', value: '50+', icon: 'UserCheck', color: 'bg-purple-600' }
  ]);
  const [editingStatistic, setEditingStatistic] = useState(null);
  const [isStatisticModalOpen, setIsStatisticModalOpen] = useState(false);
  
  // Состояния для управления языками в админке
  const [currentAdminLanguage, setCurrentAdminLanguage] = useState('ru');
  const languages = ['ru', 'uz', 'en'];
  const languageNames = {
    ru: 'Русский',
    uz: 'O\'zbek',
    en: 'English'
  };
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: 'Международная конференция по нейрохирургии', 
      date: '2024-07-15', 
      time: '09:00',
      location: 'Главный зал центра',
      description: 'Обсуждение современных методов лечения',
      type: 'conference'
    },
    { 
      id: 2, 
      title: 'День открытых дверей', 
      date: '2024-07-20', 
      time: '10:00',
      location: 'Все отделения',
      description: 'Экскурсии и консультации для посетителей',
      type: 'open-day'
    },
    { 
      id: 3, 
      title: 'Мастер-класс по микрохирургии', 
      date: '2024-07-25', 
      time: '14:00',
      location: 'Операционная №1',
      description: 'Демонстрация современных методик',
      type: 'masterclass'
    }
  ]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@neuro.uz' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: admin@neuro.uz / admin123');
    }
  };

  // Вспомогательные функции
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

  const startEditGalleryImage = (image) => {
    setEditingGalleryImage(image);
    setNewGalleryImage({
      url: image.url,
      alt: image.alt,
      category: image.category
    });
    setIsGalleryModalOpen(true);
  };

  // Функции для отделений
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      updateDepartment(editingDepartment.id, { ...newDepartment });
      alert('Отделение успешно обновлено!');
      setEditingDepartment(null);
    } else {
      addDepartment(newDepartment);
      alert('Новое отделение добавлено!');
    }
    setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
    setIsDepartmentModalOpen(false);
  };

  // Функции для врачей
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      updateDoctor(editingDoctor.id, { ...newDoctor });
      alert('Информация о враче обновлена!');
      setEditingDoctor(null);
    } else {
      addDoctor(newDoctor);
      alert('Новый врач добавлен!');
    }
    setNewDoctor({ name: '', specialization: '', experience: '', image: '', email: '', phone: '', reception: '', departmentId: '' });
    setIsDoctorModalOpen(false);
  };

  // Функции для новостей
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      updateNews(editingNews.id, { ...newNews });
      alert('Новость обновлена!');
      setEditingNews(null);
    } else {
      addNews(newNews);
      alert('Новость добавлена!');
    }
    setNewNews({ title: '', excerpt: '', content: '', image: '' });
    setIsNewsModalOpen(false);
  };

  // Функции для аккаунтов
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      updateAccount(editingAccount.id, { ...newAccount });
      alert('Аккаунт обновлен!');
      setEditingAccount(null);
    } else {
      addAccount(newAccount);
      alert('Новый аккаунт создан!');
    }
    setNewAccount({ name: '', email: '', role: 'doctor', password: '' });
    setIsAccountModalOpen(false);
  };

  // Функции для руководства
  const handleLeadershipSubmit = (e) => {
    e.preventDefault();
    if (editingLeadership) {
      updateLeadership(editingLeadership.id, { ...newLeadership });
      alert('Информация о руководителе обновлена!');
      setEditingLeadership(null);
    } else {
      addLeadership(newLeadership);
      alert('Новый руководитель добавлен!');
    }
    setNewLeadership({ name: '', position: '', image: '', phone: '', email: '', biography: '' });
    setIsLeadershipModalOpen(false);
  };

  // Функции для услуг
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      ...newService,
      price: parseInt(newService.price)
    };
    
    if (editingService) {
      updateService(editingService.id, serviceData);
      alert('Услуга обновлена!');
      setEditingService(null);
    } else {
      addService(serviceData);
      alert('Новая услуга добавлена!');
    }
    setNewService({ name: '', category: '', price: '', description: '' });
    setIsServiceModalOpen(false);
  };

  // Функции для галереи
  
  // Универсальная функция для обработки загрузки файла
  const handleFileUploadGeneric = (e, setFilePreview, setUploading, updateState, fileKey) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка размера файла (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 5MB');
      return;
    }

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    setUploading(true);

    // Создаем preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setFilePreview(result);
      
      // Симулируем загрузку на сервер 
      setTimeout(() => {
        const fileName = file.name.replace(/\s+/g, '_');
        const timestamp = Date.now();
        const mockServerUrl = `https://neuro.uz/uploads/${timestamp}_${fileName}`;
        
        updateState(prev => ({...prev, [fileKey]: mockServerUrl}));
        setUploading(false);
        alert('Файл успешно загружен! (симуляция)');
      }, 2000);
    };
    
    reader.readAsDataURL(file);
  };

  // Функция для обработки загрузки файла галереи
  const handleFileUpload = (e) => {
    handleFileUploadGeneric(e, setFilePreview, setUploadingFile, setNewGalleryImage, 'url');
  };

  // Функция для обработки загрузки файла врача
  const handleDoctorFileUpload = (e) => {
    handleFileUploadGeneric(e, setDoctorFilePreview, setUploadingDoctorFile, setNewDoctor, 'image');
  };

  // Функция для обработки загрузки файла новости  
  const handleNewsFileUpload = (e) => {
    handleFileUploadGeneric(e, setNewsFilePreview, setUploadingNewsFile, setNewNews, 'image');
  };

  // Функция для обработки загрузки файла руководства
  const handleLeadershipFileUpload = (e) => {
    handleFileUploadGeneric(e, setLeadershipFilePreview, setUploadingLeadershipFile, setEditingLeadership, 'image');
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    
    if (uploadingFile) {
      alert('Дождитесь завершения загрузки файла');
      return;
    }
    
    if (editingGalleryImage) {
      updateGalleryImage(editingGalleryImage.id, { ...newGalleryImage });
      alert('Изображение обновлено!');
      setEditingGalleryImage(null);
    } else {
      addGalleryImage(newGalleryImage);
      alert('Новое изображение добавлено в галерею!');
    }
    
    // Сброс состояний
    setNewGalleryImage({ url: '', alt: '', category: 'general' });
    setUploadType('url');
    setFilePreview(null);
    setIsGalleryModalOpen(false);
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
              <h1 className="text-xl font-semibold text-gray-900">Админ-панель</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-purple-600 hover:text-purple-700">
                Перейти на сайт
              </Link>
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
              { id: 'services', label: 'Услуги', icon: Stethoscope },
              { id: 'statistics', label: 'Статистика', icon: BarChart3 },
              { id: 'events', label: 'События', icon: Calendar },
              { id: 'accounts', label: 'Аккаунты', icon: UserCheck },
              { id: 'leadership', label: 'Руководство', icon: Crown },
              { id: 'settings', label: 'Настройки', icon: Settings }
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
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Услуги</p>
                    <p className="text-2xl font-semibold text-gray-900">{services.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Отделения</p>
                    <p className="text-2xl font-semibold text-gray-900">{departments.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Врачи</p>
                    <p className="text-2xl font-semibold text-gray-900">{doctors.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Новости</p>
                    <p className="text-2xl font-semibold text-gray-900">{news.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Добро пожаловать в админ-панель!</h2>
              <p className="text-gray-600">
                Здесь вы можете управлять всем контентом сайта: услугами, отделениями, врачами, новостями и настройками.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Услуги ({services.length})</h2>
              <button
                onClick={() => {
                  setEditingService(null);
                  setNewService({ name: '', category: '', price: '', description: '' });
                  setIsServiceModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить услугу</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                        {service.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      <p className="text-lg font-bold text-green-600">
                        {service.price.toLocaleString()} uzs
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => startEditService(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Удалить эту услугу?')) {
                            deleteService(service.id);
                            alert('Услуга удалена!');
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

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Отделения ({departments.length})</h2>
              <button
                onClick={() => {
                  setEditingDepartment(null);
                  setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
                  setIsDepartmentModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить отделение</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-lg flex items-center justify-center`}>
                        <dept.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
                        <p className="text-sm text-gray-600">{dept.description}</p>
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
              <h2 className="text-2xl font-bold text-gray-900">Врачи ({doctors.length})</h2>
              <button
                onClick={() => {
                  setEditingDoctor(null);
                  setNewDoctor({ name: '', specialization: '', experience: '', image: '', email: '', phone: '', reception: '', departmentId: '' });
                  setDoctorUploadType('url');
                  setDoctorFilePreview(null);
                  setIsDoctorModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить врача</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{doctor.specialization}</p>
                    <p className="text-xs text-gray-600 mb-3">{doctor.experience}</p>
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

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Новости ({news.length})</h2>
              <button
                onClick={() => {
                  setEditingNews(null);
                  setNewNews({ title: '', excerpt: '', content: '', image: '' });
                  setNewsUploadType('url');
                  setNewsFilePreview(null);
                  setIsNewsModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить новость</span>
              </button>
            </div>

            <div className="space-y-4">
              {news.map((newsItem) => (
                <div key={newsItem.id} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{newsItem.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{newsItem.excerpt}</p>
                      <p className="text-xs text-gray-500">{newsItem.date}</p>
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

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Заголовок и управление */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Галерея ({galleryImages.length})</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCategoryManager(!showCategoryManager)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Управление категориями</span>
                </button>
                <button
                  onClick={() => {
                    setEditingGalleryImage(null);
                    setNewGalleryImage({ url: '', alt: '', category: 'general' });
                    setIsGalleryModalOpen(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить изображение</span>
                </button>
              </div>
            </div>

            {/* Управление категориями */}
            {showCategoryManager && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Управление категориями</h3>
                
                {/* Добавить новую категорию */}
                <div className="flex space-x-3 mb-4">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Название новой категории"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newCategoryName.trim() && !galleryCategories.includes(newCategoryName.trim())) {
                        setGalleryCategories([...galleryCategories, newCategoryName.trim()]);
                        setNewCategoryName('');
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Добавить
                  </button>
                </div>

                {/* Список категорий */}
                <div className="space-y-2">
                  {galleryCategories.map((category, index) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          ({galleryImages.filter(img => img.category === category).length} изображений)
                        </span>
                        {category !== 'general' && (
                          <button
                            onClick={() => {
                              if (confirm(`Удалить категорию "${category}"?`)) {
                                setGalleryCategories(galleryCategories.filter(cat => cat !== category));
                                // Перенести изображения из удаляемой категории в 'general'
                                galleryImages
                                  .filter(img => img.category === category)
                                  .forEach(img => updateGalleryImage(img.id, { ...img, category: 'general' }));
                              }
                            }}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Фильтр по категориям */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Все ({galleryImages.length})
              </button>
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category} ({galleryImages.filter(img => img.category === category).length})
                </button>
              ))}
            </div>

            {/* Галерея изображений */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages
                .filter(image => selectedCategory === 'all' || image.category === selectedCategory)
                .map((image) => (
                <div key={image.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">{image.alt}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {image.category}
                      </span>
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">ID: {image.id}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditGalleryImage(image)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Удалить это изображение?')) {
                              deleteGalleryImage(image.id);
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

            {galleryImages.filter(image => selectedCategory === 'all' || image.category === selectedCategory).length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет изображений</h3>
                <p className="text-gray-600">В этой категории пока нет изображений.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Статистика центра ({statistics.length})</h2>
                <button
                  onClick={() => {
                    setEditingStatistic({ id: null, title: '', value: '', icon: 'Users', color: 'bg-blue-600' });
                    setIsStatisticModalOpen(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить показатель</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.map((stat) => (
                  <div key={stat.id} className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl text-white font-bold">{stat.value}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3">{stat.title}</h3>
                    
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          setEditingStatistic(stat);
                          setIsStatisticModalOpen(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Изменить</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Удалить этот показатель?')) {
                            setStatistics(statistics.filter(s => s.id !== stat.id));
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Ближайшие события ({events.length})</h2>
                <button
                  onClick={() => {
                    setEditingEvent({ 
                      id: null, 
                      title: '', 
                      date: '', 
                      time: '',
                      location: '',
                      description: '',
                      type: 'conference'
                    });
                    setIsEventModalOpen(true);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить событие</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.type === 'conference' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'open-day' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {event.type === 'conference' ? 'Конференция' :
                             event.type === 'open-day' ? 'День открытых дверей' :
                             'Мастер-класс'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{event.date} в {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingEvent(event);
                            setIsEventModalOpen(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center space-x-1 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Изменить</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Удалить это событие?')) {
                              setEvents(events.filter(e => e.id !== event.id));
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Аккаунты ({accounts.length})</h2>
              <button
                onClick={() => {
                  setEditingAccount(null);
                  setNewAccount({ name: '', email: '', role: 'doctor', password: '' });
                  setIsAccountModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Создать аккаунт</span>
              </button>
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
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Создан
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">{account.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          account.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {account.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          account.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {account.status === 'active' ? 'Активен' : 'Заблокирован'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {account.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => startEditAccount(account)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            toggleAccountStatus(account.id);
                            alert(`Статус аккаунта изменен!`);
                          }}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Удалить этот аккаунт?')) {
                              deleteAccount(account.id);
                              alert('Аккаунт удален!');
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leadership' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Руководство ({leadership.length})</h2>
                <button
                  onClick={() => {
                    setEditingLeadership({
                      id: null,
                      name: '',
                      position: '',
                      image: '',
                      phone: '',
                      email: '',
                      bio: '',
                      education: [],
                      experience: [],
                      achievements: []
                    });
                    setIsLeadershipModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить руководителя</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadership.map((leader) => (
                  <div key={leader.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={leader.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'}
                        alt={leader.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{leader.name}</h3>
                        <p className="text-sm text-gray-600">{leader.position}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {leader.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{leader.phone}</span>
                        </div>
                      )}
                      {leader.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{leader.email}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingLeadership(leader);
                          setIsLeadershipModalOpen(true);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Редактировать</span>
                      </button>
                      <button
                        onClick={() => deleteLeadership(leader.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* SEO Настройки */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Настройки</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок сайта
                  </label>
                  <input
                    type="text"
                    value={seoSettings.title}
                    onChange={(e) => setSeoSettings({...seoSettings, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание сайта
                  </label>
                  <textarea
                    rows="3"
                    value={seoSettings.description}
                    onChange={(e) => setSeoSettings({...seoSettings, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ключевые слова
                  </label>
                  <input
                    type="text"
                    value={seoSettings.keywords}
                    onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="через запятую"
                  />
                </div>
                
                <button
                  onClick={() => updateSeoSettings(seoSettings)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Сохранить SEO настройки
                </button>
              </div>
            </div>

            {/* Контактная информация */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Контактная информация</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес
                  </label>
                  <textarea
                    rows="2"
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Приемная
                    </label>
                    <input
                      type="text"
                      value={siteSettings.phones[0]}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        phones: [e.target.value, siteSettings.phones[1], siteSettings.phones[2]]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Регистратура
                    </label>
                    <input
                      type="text"
                      value={siteSettings.phones[1]}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        phones: [siteSettings.phones[0], e.target.value, siteSettings.phones[2]]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Экстренная помощь
                    </label>
                    <input
                      type="text"
                      value={siteSettings.phones[2]}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        phones: [siteSettings.phones[0], siteSettings.phones[1], e.target.value]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Основной Email
                    </label>
                    <input
                      type="email"
                      value={siteSettings.emails[0]}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        emails: [e.target.value, siteSettings.emails[1]]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дополнительный Email
                    </label>
                    <input
                      type="email"
                      value={siteSettings.emails[1]}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        emails: [siteSettings.emails[0], e.target.value]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => updateSiteSettings(siteSettings)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Сохранить контактную информацию
                </button>
              </div>
            </div>

            {/* Режим работы */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Режим работы</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Будние дни
                  </label>
                  <input
                    type="text"
                    value={siteSettings.workingHours.weekdays}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      workingHours: {...siteSettings.workingHours, weekdays: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Суббота
                  </label>
                  <input
                    type="text"
                    value={siteSettings.workingHours.saturday}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      workingHours: {...siteSettings.workingHours, saturday: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Воскресенье
                  </label>
                  <input
                    type="text"
                    value={siteSettings.workingHours.sunday}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      workingHours: {...siteSettings.workingHours, sunday: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={() => updateSiteSettings(siteSettings)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Сохранить режим работы
              </button>
            </div>

            {/* Социальные сети */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Социальные сети</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.facebook}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      socialMedia: {...siteSettings.socialMedia, facebook: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.instagram}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      socialMedia: {...siteSettings.socialMedia, instagram: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={siteSettings.socialMedia.youtube}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      socialMedia: {...siteSettings.socialMedia, youtube: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button
                  onClick={() => updateSiteSettings(siteSettings)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Сохранить социальные сети
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* МОДАЛЬНЫЕ ОКНА */}
      
      {/* Модальное окно услуг */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingService ? 'Редактировать услугу' : 'Добавить новую услугу'}
      >
        <form onSubmit={handleServiceSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название услуги</label>
            <input
              type="text"
              required
              value={newService.name}
              onChange={(e) => setNewService({...newService, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
            <select
              required
              value={newService.category}
              onChange={(e) => setNewService({...newService, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Выберите категорию</option>
              <option value="Диагностика">Диагностика</option>
              <option value="Хирургия">Хирургия</option>
              <option value="Консультации">Консультации</option>
              <option value="Реабилитация">Реабилитация</option>
              <option value="Анестезия">Анестезия</option>
              <option value="Реанимация">Реанимация</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Цена (UZS)</label>
            <input
              type="number"
              required
              value={newService.price}
              onChange={(e) => setNewService({...newService, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              required
              rows={3}
              value={newService.description}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {editingService ? 'Обновить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={() => setIsServiceModalOpen(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>

      {/* Модальное окно отделений */}
      <Modal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
        title={editingDepartment ? 'Редактировать отделение' : 'Добавить новое отделение'}
      >
        <form onSubmit={handleDepartmentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название отделения</label>
            <input
              type="text"
              required
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              required
              rows={3}
              value={newDepartment.description}
              onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Иконка</label>
              <select
                value={newDepartment.icon}
                onChange={(e) => setNewDepartment({...newDepartment, icon: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {Object.keys(departmentIcons).map(iconName => (
                  <option key={iconName} value={iconName}>{iconName}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Цвет</label>
              <select
                value={newDepartment.color}
                onChange={(e) => setNewDepartment({...newDepartment, color: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {departmentColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {editingDepartment ? 'Обновить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={() => setIsDepartmentModalOpen(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>

      {/* Модальное окно врачей */}
      <Modal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        title={editingDoctor ? 'Редактировать информацию о враче' : 'Добавить нового врача'}
      >
        <form onSubmit={handleDoctorSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
            <input
              type="text"
              required
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Специализация</label>
            <input
              type="text"
              required
              value={newDoctor.specialization}
              onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Опыт работы</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Отделение</label>
              <select
                value={newDoctor.departmentId}
                onChange={(e) => setNewDoctor({...newDoctor, departmentId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Не привязан к отделению</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Фотография врача</label>
            <div className="space-y-3">
              {/* Выбор способа загрузки */}
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="doctorUploadType"
                    value="url"
                    checked={doctorUploadType === 'url'}
                    onChange={(e) => setDoctorUploadType(e.target.value)}
                    className="mr-2"
                  />
                  По URL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="doctorUploadType"
                    value="file"
                    checked={doctorUploadType === 'file'}
                    onChange={(e) => setDoctorUploadType(e.target.value)}
                    className="mr-2"
                  />
                  Загрузить файл
                </label>
              </div>

              {/* URL загрузка */}
              {doctorUploadType === 'url' && (
                <input
                  type="url"
                  required
                  value={newDoctor.image}
                  onChange={(e) => setNewDoctor({...newDoctor, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/doctor-photo.jpg"
                />
              )}

              {/* Файловая загрузка */}
              {doctorUploadType === 'file' && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleDoctorFileUpload(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  {doctorFilePreview && (
                    <div className="mt-3">
                      <img
                        src={doctorFilePreview}
                        alt="Предпросмотр"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Максимальный размер: 5MB. Поддерживаемые форматы: JPG, PNG, GIF, WebP
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input
                type="tel"
                required
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Время приема</label>
            <input
              type="text"
              required
              value={newDoctor.reception}
              onChange={(e) => setNewDoctor({...newDoctor, reception: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Понедельник-Пятница, 9:00-17:00"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {editingDoctor ? 'Обновить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={() => setIsDoctorModalOpen(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>

      {/* Модальное окно новостей */}
      <Modal
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        title={editingNews ? 'Редактировать новость' : 'Добавить новую новость'}
      >
        <form onSubmit={handleNewsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
            <input
              type="text"
              required
              value={newNews.title}
              onChange={(e) => setNewNews({...newNews, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
            <textarea
              required
              rows={3}
              value={newNews.excerpt}
              onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Полный текст</label>
            <textarea
              required
              rows={5}
              value={newNews.content}
              onChange={(e) => setNewNews({...newNews, content: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Изображение новости</label>
            <div className="space-y-3">
              {/* Выбор способа загрузки */}
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="newsUploadType"
                    value="url"
                    checked={newsUploadType === 'url'}
                    onChange={(e) => setNewsUploadType(e.target.value)}
                    className="mr-2"
                  />
                  По URL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="newsUploadType"
                    value="file"
                    checked={newsUploadType === 'file'}
                    onChange={(e) => setNewsUploadType(e.target.value)}
                    className="mr-2"
                  />
                  Загрузить файл
                </label>
              </div>

              {/* URL загрузка */}
              {newsUploadType === 'url' && (
                <input
                  type="url"
                  required
                  value={newNews.image}
                  onChange={(e) => setNewNews({...newNews, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/news-image.jpg"
                />
              )}

              {/* Файловая загрузка */}
              {newsUploadType === 'file' && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleNewsFileUpload(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  {newsFilePreview && (
                    <div className="mt-3">
                      <img
                        src={newsFilePreview}
                        alt="Предпросмотр"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Максимальный размер: 5MB. Поддерживаемые форматы: JPG, PNG, GIF, WebP
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {editingNews ? 'Обновить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={() => setIsNewsModalOpen(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>

      {/* Модальное окно галереи */}
      <Modal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        title={editingGalleryImage ? 'Редактировать изображение' : 'Добавить новое изображение'}
      >
        <form onSubmit={handleGallerySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Изображение</label>
            <div className="space-y-3">
              {/* Выбор способа загрузки */}
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadType"
                    value="url"
                    checked={uploadType === 'url'}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="mr-2"
                  />
                  По URL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadType"
                    value="file"
                    checked={uploadType === 'file'}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="mr-2"
                  />
                  Загрузить файл
                </label>
              </div>

              {/* URL загрузка */}
              {uploadType === 'url' && (
                <input
                  type="url"
                  required
                  value={newGalleryImage.url}
                  onChange={(e) => setNewGalleryImage({...newGalleryImage, url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              )}

              {/* Файловая загрузка */}
              {uploadType === 'file' && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  {filePreview && (
                    <div className="mt-3">
                      <img
                        src={filePreview}
                        alt="Предпросмотр"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Максимальный размер: 5MB. Поддерживаемые форматы: JPG, PNG, GIF, WebP
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <input
              type="text"
              required
              value={newGalleryImage.alt}
              onChange={(e) => setNewGalleryImage({...newGalleryImage, alt: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
            <select
              required
              value={newGalleryImage.category}
              onChange={(e) => setNewGalleryImage({...newGalleryImage, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {galleryCategories.map(category => (
                <option key={category} value={category}>
                  {category === 'general' ? 'Общее' : 
                   category === 'building' ? 'Здание' : 
                   category === 'equipment' ? 'Оборудование' : 
                   category === 'surgery' ? 'Хирургия' : 
                   category === 'staff' ? 'Персонал' : 
                   category === 'events' ? 'События' : 
                   category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={uploadingFile}
              className={`flex-1 py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                uploadingFile 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {uploadingFile ? 'Загрузка...' : (editingGalleryImage ? 'Обновить' : 'Добавить')}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsGalleryModalOpen(false);
                setUploadType('url');
                setFilePreview(null);
                setNewGalleryImage({ url: '', alt: '', category: 'general' });
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>

      {/* Модальное окно аккаунтов */}
      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        title={editingAccount ? 'Редактировать аккаунт' : 'Создать новый аккаунт'}
      >
        <form onSubmit={handleAccountSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
            <input
              type="text"
              required
              value={newAccount.name}
              onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={newAccount.email}
              onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
            <select
              required
              value={newAccount.role}
              onChange={(e) => setNewAccount({...newAccount, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="doctor">Врач</option>
              <option value="admin">Администратор</option>
              <option value="nurse">Медсестра</option>
              <option value="reception">Регистратура</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль {editingAccount && '(оставьте пустым, чтобы не изменять)'}
            </label>
            <input
              type="password"
              required={!editingAccount}
              value={newAccount.password}
              onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {editingAccount ? 'Обновить' : 'Создать'}
            </button>
            <button
              type="button"
              onClick={() => setIsAccountModalOpen(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>

      {/* Leadership Modal */}
      <Modal
        isOpen={isLeadershipModalOpen}
        onClose={() => setIsLeadershipModalOpen(false)}
        title={editingLeadership?.id ? 'Редактировать руководителя' : 'Добавить руководителя'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          if (editingLeadership?.id) {
            updateLeadership(editingLeadership.id, editingLeadership);
          } else {
            addLeadership({
              ...editingLeadership,
              id: Date.now()
            });
          }
          setIsLeadershipModalOpen(false);
        }}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО
                </label>
                <input
                  type="text"
                  required
                  value={editingLeadership.name}
                  onChange={(e) => setEditingLeadership({...editingLeadership, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Должность
                </label>
                <input
                  type="text"
                  required
                  value={editingLeadership.position}
                  onChange={(e) => setEditingLeadership({...editingLeadership, position: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Фотография руководителя</label>
              <div className="space-y-3">
                {/* Выбор способа загрузки */}
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="leadershipUploadType"
                      value="url"
                      checked={leadershipUploadType === 'url'}
                      onChange={(e) => setLeadershipUploadType(e.target.value)}
                      className="mr-2"
                    />
                    По URL
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="leadershipUploadType"
                      value="file"
                      checked={leadershipUploadType === 'file'}
                      onChange={(e) => setLeadershipUploadType(e.target.value)}
                      className="mr-2"
                    />
                    Загрузить файл
                  </label>
                </div>

                {/* URL загрузка */}
                {leadershipUploadType === 'url' && (
                  <input
                    type="url"
                    value={editingLeadership.image}
                    onChange={(e) => setEditingLeadership({...editingLeadership, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/leader-photo.jpg"
                  />
                )}

                {/* Файловая загрузка */}
                {leadershipUploadType === 'file' && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLeadershipFileUpload(e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {leadershipFilePreview && (
                      <div className="mt-3">
                        <img
                          src={leadershipFilePreview}
                          alt="Предпросмотр"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Максимальный размер: 5MB. Поддерживаемые форматы: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={editingLeadership.phone}
                  onChange={(e) => setEditingLeadership({...editingLeadership, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingLeadership.email}
                  onChange={(e) => setEditingLeadership({...editingLeadership, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Биография
              </label>
              <textarea
                rows="4"
                value={editingLeadership.bio}
                onChange={(e) => setEditingLeadership({...editingLeadership, bio: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Краткая биография руководителя..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Образование (через запятую)
              </label>
              <textarea
                rows="2"
                value={editingLeadership.education?.join(', ') || ''}
                onChange={(e) => setEditingLeadership({
                  ...editingLeadership, 
                  education: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Университет 1, Университет 2..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Опыт работы (через запятую)
              </label>
              <textarea
                rows="2"
                value={editingLeadership.experience?.join(', ') || ''}
                onChange={(e) => setEditingLeadership({
                  ...editingLeadership, 
                  experience: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Должность 1, Должность 2..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Достижения (через запятую)
              </label>
              <textarea
                rows="2"
                value={editingLeadership.achievements?.join(', ') || ''}
                onChange={(e) => setEditingLeadership({
                  ...editingLeadership, 
                  achievements: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Награда 1, Награда 2..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsLeadershipModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {editingLeadership?.id ? 'Обновить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Statistics Modal */}
      <Modal
        isOpen={isStatisticModalOpen}
        onClose={() => setIsStatisticModalOpen(false)}
        title={editingStatistic?.id ? 'Редактировать показатель' : 'Добавить показатель'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          if (editingStatistic?.id) {
            setStatistics(statistics.map(s => s.id === editingStatistic.id ? editingStatistic : s));
          } else {
            setStatistics([...statistics, { ...editingStatistic, id: Date.now() }]);
          }
          setIsStatisticModalOpen(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название показателя</label>
              <input
                type="text"
                required
                value={editingStatistic?.title || ''}
                onChange={(e) => setEditingStatistic({...editingStatistic, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Например: Пациентов в год"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Значение</label>
              <input
                type="text"
                required
                value={editingStatistic?.value || ''}
                onChange={(e) => setEditingStatistic({...editingStatistic, value: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Например: 5000+"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Цвет</label>
              <select
                required
                value={editingStatistic?.color || 'bg-blue-600'}
                onChange={(e) => setEditingStatistic({...editingStatistic, color: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="bg-blue-600">Синий</option>
                <option value="bg-green-600">Зеленый</option>
                <option value="bg-red-600">Красный</option>
                <option value="bg-purple-600">Фиолетовый</option>
                <option value="bg-yellow-600">Желтый</option>
                <option value="bg-indigo-600">Индиго</option>
                <option value="bg-pink-600">Розовый</option>
                <option value="bg-gray-600">Серый</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsStatisticModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {editingStatistic?.id ? 'Обновить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Events Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title={editingEvent?.id ? 'Редактировать событие' : 'Добавить событие'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          if (editingEvent?.id) {
            setEvents(events.map(ev => ev.id === editingEvent.id ? editingEvent : ev));
          } else {
            setEvents([...events, { ...editingEvent, id: Date.now() }]);
          }
          setIsEventModalOpen(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название события</label>
              <input
                type="text"
                required
                value={editingEvent?.title || ''}
                onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Например: Международная конференция"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                <input
                  type="date"
                  required
                  value={editingEvent?.date || ''}
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                <input
                  type="time"
                  required
                  value={editingEvent?.time || ''}
                  onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Место проведения</label>
              <input
                type="text"
                required
                value={editingEvent?.location || ''}
                onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Например: Главный зал центра"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип события</label>
              <select
                required
                value={editingEvent?.type || 'conference'}
                onChange={(e) => setEditingEvent({...editingEvent, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="conference">Конференция</option>
                <option value="open-day">День открытых дверей</option>
                <option value="masterclass">Мастер-класс</option>
                <option value="seminar">Семинар</option>
                <option value="workshop">Воркшоп</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
              <textarea
                rows="3"
                required
                value={editingEvent?.description || ''}
                onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Краткое описание события..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsEventModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              {editingEvent?.id ? 'Обновить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};