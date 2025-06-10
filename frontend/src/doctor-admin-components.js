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

        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">База пациентов</h2>
            <p className="text-gray-600">Здесь будет отображаться полная база данных пациентов с историей болезни.</p>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Расписание работы</h2>
            <p className="text-gray-600">Здесь можно настроить персональное расписание приема пациентов.</p>
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
  const [editingLeadership, setEditingLeadership] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState(null);
  
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
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (editingGalleryImage) {
      updateGalleryImage(editingGalleryImage.id, { ...newGalleryImage });
      alert('Изображение обновлено!');
      setEditingGalleryImage(null);
    } else {
      addGalleryImage(newGalleryImage);
      alert('Новое изображение добавлено в галерею!');
    }
    setNewGalleryImage({ url: '', alt: '', category: 'general' });
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
              { id: 'services', label: 'Услуги', icon: DollarSign },
              { id: 'departments', label: 'Отделения', icon: Building },
              { id: 'doctors', label: 'Врачи', icon: Users },
              { id: 'news', label: 'Новости', icon: FileText },
              { id: 'gallery', label: 'Галерея', icon: ImageIcon },
              { id: 'accounts', label: 'Аккаунты', icon: UserCheck },
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Галерея ({galleryImages.length})</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="bg-white rounded-lg overflow-hidden shadow">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">{image.alt}</h3>
                    <p className="text-sm text-gray-600 mb-3">{image.category}</p>
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
                              alert('Изображение удалено!');
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

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Настройки сайта</h2>
            <p className="text-gray-600">
              Здесь можно настроить SEO, контактную информацию, социальные сети и другие параметры сайта.
            </p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">URL фотографии</label>
            <input
              type="url"
              required
              value={newDoctor.image}
              onChange={(e) => setNewDoctor({...newDoctor, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения</label>
            <input
              type="url"
              required
              value={newNews.image}
              onChange={(e) => setNewNews({...newNews, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения</label>
            <input
              type="url"
              required
              value={newGalleryImage.url}
              onChange={(e) => setNewGalleryImage({...newGalleryImage, url: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
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
              <option value="general">Общее</option>
              <option value="building">Здание</option>
              <option value="equipment">Оборудование</option>
              <option value="doctors">Врачи</option>
              <option value="operations">Операции</option>
              <option value="patients">Пациенты</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
            >
              {editingGalleryImage ? 'Обновить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(false)}
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
    </div>
  );
};