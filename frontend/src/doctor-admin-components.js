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
  Star
} from 'lucide-react';
import { useAdmin } from './contexts';
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

  const filteredAppointments = appointments.filter(apt => 
    apt.date === selectedDate
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
                <img 
                  src="https://neuro.uz/themes/site/img/logo.png"
                  alt="NEURO.UZ Logo"
                  className="w-10 h-10"
                />
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
                  onClick={() => setActiveTab('schedule')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'schedule' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Мое расписание</span>
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего записей</h3>
                        <p className="text-3xl font-bold text-green-600">{appointments.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Подтвержденных</h3>
                        <p className="text-3xl font-bold text-purple-600">
                          {appointments.filter(a => a.status === 'confirmed').length}
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

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Мое расписание</h2>
                <p className="text-gray-600 mb-6">Ваше рабочее расписание (только просмотр)</p>
                <div className="space-y-4">
                  {[
                    { day: 'Понедельник', hours: '09:00 - 17:00', status: 'Рабочий день' },
                    { day: 'Вторник', hours: '09:00 - 17:00', status: 'Рабочий день' },
                    { day: 'Среда', hours: '09:00 - 17:00', status: 'Рабочий день' },
                    { day: 'Четверг', hours: '09:00 - 17:00', status: 'Рабочий день' },
                    { day: 'Пятница', hours: '09:00 - 17:00', status: 'Рабочий день' },
                    { day: 'Суббота', hours: '09:00 - 15:00', status: 'Сокращенный день' },
                    { day: 'Воскресенье', hours: 'Выходной', status: 'Выходной' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-900 w-24">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.status === 'Рабочий день' ? 'bg-green-100 text-green-800' :
                        schedule.status === 'Сокращенный день' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {schedule.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Примечание:</strong> Для изменения расписания обратитесь к администратору.
                  </p>
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
  const { adminData, updateAdminData } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);
  
  // Данные отделений
  const [departments, setDepartments] = useState(siteData.departments);
  
  // Данные врачей
  const [doctors, setDoctors] = useState(siteData.doctors.map(doctor => ({
    ...doctor,
    departmentId: doctor.id // Связываем с отделениями
  })));
  
  // Данные новостей
  const [news, setNews] = useState(siteData.news);
  
  // Аккаунты пользователей
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Админ', email: 'admin@neuro.uz', role: 'admin', status: 'active', createdAt: '2025-01-01' },
    { id: 2, name: 'Доктор Кариев', email: 'kariev@neuro.uz', role: 'doctor', status: 'active', createdAt: '2025-01-15' },
    { id: 3, name: 'Доктор Асадуллаев', email: 'asadullaev@neuro.uz', role: 'doctor', status: 'inactive', createdAt: '2025-02-01' }
  ]);
  
  const [newService, setNewService] = useState({ name: '', category: '', price: '', description: '' });
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', experience: '', image: '', email: '', phone: '', reception: '', departmentId: '' });
  const [newNews, setNewNews] = useState({ title: '', excerpt: '', content: '', image: '' });
  const [newAccount, setNewAccount] = useState({ name: '', email: '', role: 'doctor', password: '' });
  
  const [newSiteSettings, setNewSiteSettings] = useState({
    phones: '+998 71 264-96-10, +998 71 264-96-09',
    emails: 'admin@neuro.uz, info@neuro.uz',
    address: 'ул. Хумоюн, 40, Мирзо-Улугбекский район, г. Ташкент, 100142',
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
  const [newSeoSettings, setNewSeoSettings] = useState({
    title: 'Республиканский Научный Центр Нейрохирургии',
    description: 'Ведущий центр нейрохирургии в Центральной Азии. Более 25 лет опыта в лечении заболеваний нервной системы.',
    keywords: 'нейрохирургия, мозг, спинной мозг, операции, Узбекистан, Ташкент'
  });
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', alt: 'Центр 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1526930382372-67bf22c0fce2', alt: 'Центр 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6', alt: 'Центр 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc', alt: 'Центр 4' }
  ]);
  
  const { t } = useLanguage();
  const { 
    adminData, 
    updateSiteSettings, 
    updateSeoSettings, 
    addService, 
    updateService, 
    deleteService 
  } = useAdmin();

  useEffect(() => {
    if (isAuthenticated) {
      setNewSiteSettings({
        phones: adminData.siteSettings.phones.join(', '),
        emails: adminData.siteSettings.emails.join(', '),
        address: adminData.siteSettings.address,
        workingHours: adminData.siteSettings.workingHours,
        socialMedia: adminData.siteSettings.socialMedia
      });
      setNewSeoSettings(adminData.seoSettings);
    }
  }, [isAuthenticated, adminData]);

  // Функции для управления отделениями
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      setDepartments(departments.map(dept => 
        dept.id === editingDepartment.id ? { ...newDepartment, id: editingDepartment.id } : dept
      ));
      setEditingDepartment(null);
    } else {
      const newId = Math.max(...departments.map(d => d.id)) + 1;
      setDepartments([...departments, { ...newDepartment, id: newId }]);
    }
    setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
    setIsDepartmentModalOpen(false);
  };

  const startEditDepartment = (department) => {
    setEditingDepartment(department);
    setNewDepartment({ 
      name: department.name, 
      description: department.description, 
      icon: department.icon,
      color: department.color 
    });
    setIsDepartmentModalOpen(true);
  };

  const deleteDepartment = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это отделение?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
      // Также удаляем связанных врачей или переводим их в "без отделения"
      setDoctors(doctors.map(doctor => 
        doctor.departmentId === id ? { ...doctor, departmentId: null } : doctor
      ));
    }
  };

  // Функции для управления врачами
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id ? { ...newDoctor, id: editingDoctor.id } : doctor
      ));
      setEditingDoctor(null);
    } else {
      const newId = Math.max(...doctors.map(d => d.id)) + 1;
      setDoctors([...doctors, { ...newDoctor, id: newId }]);
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
    }
  };

  // Функции для управления новостями
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(item => 
        item.id === editingNews.id ? { ...newNews, id: editingNews.id, date: item.date } : item
      ));
      setEditingNews(null);
    } else {
      const newId = Math.max(...news.map(n => n.id)) + 1;
      const today = new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      setNews([...news, { ...newNews, id: newId, date: today }]);
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
    }
  };

  // Функции для управления аккаунтами
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
    }
  };

  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { 
        ...account, 
        status: account.status === 'active' ? 'inactive' : 'active' 
      } : account
    ));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === 'admin@neuro.uz' && loginData.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный email или пароль. Попробуйте: admin@neuro.uz / admin123');
    }
  };

  // Функции для управления отделениями
  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    if (editingDepartment) {
      setDepartments(departments.map(dept => 
        dept.id === editingDepartment.id ? { ...newDepartment, id: editingDepartment.id } : dept
      ));
      setEditingDepartment(null);
    } else {
      const newId = Math.max(...departments.map(d => d.id)) + 1;
      setDepartments([...departments, { ...newDepartment, id: newId }]);
    }
    setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
    setIsDepartmentModalOpen(false);
  };

  const startEditDepartment = (department) => {
    setEditingDepartment(department);
    setNewDepartment({ 
      name: department.name, 
      description: department.description, 
      icon: department.icon,
      color: department.color 
    });
    setIsDepartmentModalOpen(true);
  };

  const deleteDepartment = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это отделение?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
      // Также удаляем связанных врачей или переводим их в "без отделения"
      setDoctors(doctors.map(doctor => 
        doctor.departmentId === id ? { ...doctor, departmentId: null } : doctor
      ));
    }
  };

  // Функции для управления врачами
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id ? { ...newDoctor, id: editingDoctor.id } : doctor
      ));
      setEditingDoctor(null);
    } else {
      const newId = Math.max(...doctors.map(d => d.id)) + 1;
      setDoctors([...doctors, { ...newDoctor, id: newId }]);
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
    }
  };

  // Функции для управления новостями
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(item => 
        item.id === editingNews.id ? { ...newNews, id: editingNews.id, date: item.date } : item
      ));
      setEditingNews(null);
    } else {
      const newId = Math.max(...news.map(n => n.id)) + 1;
      const today = new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      setNews([...news, { ...newNews, id: newId, date: today }]);
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
    }
  };

  // Функции для управления аккаунтами
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
    }
  };

  const toggleAccountStatus = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { 
        ...account, 
        status: account.status === 'active' ? 'inactive' : 'active' 
      } : account
    ));
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
    alert('Услуга успешно сохранена!');
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

  const handleSiteSettingsSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings({
      ...adminData.siteSettings,
      phones: newSiteSettings.phones.split(',').map(p => p.trim()),
      emails: newSiteSettings.emails.split(',').map(e => e.trim()),
      address: newSiteSettings.address,
      workingHours: newSiteSettings.workingHours,
      socialMedia: newSiteSettings.socialMedia
    });
    alert('Настройки сайта успешно обновлены!');
  };

  const handleSeoSettingsSubmit = (e) => {
    e.preventDefault();
    updateSeoSettings(newSeoSettings);
    alert('SEO настройки успешно обновлены!');
  };

  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    alert('Отделение успешно добавлено!');
    setIsDepartmentModalOpen(false);
    setNewDepartment({ name: '', description: '', icon: 'Brain', color: 'from-blue-500 to-blue-600' });
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    alert('Врач успешно добавлен!');
    setIsDoctorModalOpen(false);
    setNewDoctor({ name: '', specialization: '', experience: '', email: '', phone: '', reception: '', image: '' });
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    alert('Новость успешно добавлена!');
    setIsNewsModalOpen(false);
    setNewNews({ title: '', excerpt: '', content: '', image: '' });
  };

  const removeGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
    alert('Изображение удалено из галереи!');
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
                <img 
                  src="https://neuro.uz/themes/site/img/logo.png"
                  alt="NEURO.UZ Logo"
                  className="w-10 h-10"
                />
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
                  onClick={() => setActiveTab('departments')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'departments' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Отделения</span>
                </button>
                <button
                  onClick={() => setActiveTab('doctors')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'doctors' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Врачи</span>
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'news' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Новости</span>
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'contacts' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Контакты</span>
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
                  onClick={() => setActiveTab('accounts')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'accounts' ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Аккаунты</span>
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
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Отделение {i}</h4>
                          <p className="text-sm text-gray-600 mt-1">Описание отделения</p>
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
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`https://images.pexels.com/photos/814026${i}/pexels-photo-814026${i}.jpeg`}
                            alt={`Врач ${i}`}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">Врач {i}</h4>
                            <p className="text-sm text-gray-600">Специализация</p>
                            <p className="text-sm text-green-600">Активен</p>
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
              </div>
            )}

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
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`https://images.unsplash.com/photo-15047114349${i}9`}
                            alt={`Новость ${i}`}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">Новость {i}</h4>
                            <p className="text-sm text-gray-600">Краткое описание новости</p>
                            <p className="text-sm text-blue-600">Опубликовано</p>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook
                      </label>
                      <input
                        type="url"
                        value={newSiteSettings.socialMedia.facebook}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          socialMedia: {...newSiteSettings.socialMedia, facebook: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="https://facebook.com/neuro.uz"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram
                      </label>
                      <input
                        type="url"
                        value={newSiteSettings.socialMedia.instagram}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          socialMedia: {...newSiteSettings.socialMedia, instagram: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="https://instagram.com/neuro.uz"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        YouTube
                      </label>
                      <input
                        type="url"
                        value={newSiteSettings.socialMedia.youtube}
                        onChange={(e) => setNewSiteSettings({
                          ...newSiteSettings,
                          socialMedia: {...newSiteSettings.socialMedia, youtube: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="https://youtube.com/@neuro.uz"
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
                  {galleryImages.map(image => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button 
                        onClick={() => removeGalleryImage(image.id)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Аналитика сайта</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Модальные окна */}
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