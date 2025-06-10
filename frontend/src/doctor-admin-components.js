/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Brain,
  Heart,
  Eye,
  Zap,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  UserCheck,
  BookOpen,
  ImageIcon,
  Shield,
  Activity,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  XCircle,
  Settings,
  Crown,
  Camera,
  Stethoscope
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';
import { siteData } from './components';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Dashboard Stats Component
const DashboardStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`${stat.color} rounded-xl p-6 text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-75">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
          <stat.icon className="w-12 h-12 opacity-75" />
        </div>
      </motion.div>
    ))}
  </div>
);

// Doctor Dashboard
const DoctorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Иван Петров',
      date: '2024-06-15',
      time: '10:00',
      type: 'Консультация',
      status: 'confirmed'
    },
    {
      id: 2,
      patientName: 'Мария Сидорова',
      date: '2024-06-15',
      time: '11:30',
      type: 'Повторный осмотр',
      status: 'pending'
    }
  ]);

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId ? { ...app, status: newStatus } : app
      )
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Кабинет врача</h1>
            <p className="text-gray-600">Войдите в свой аккаунт</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            setIsAuthenticated(true);
          }}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Пароль"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Кабинет врача</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex space-x-1 mb-8">
          {[
            { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
            { id: 'appointments', label: 'Записи на прием', icon: Calendar },
            { id: 'schedule', label: 'Расписание', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <DashboardStats stats={[
              { label: 'Записи сегодня', value: '8', color: 'bg-blue-600', icon: Calendar },
              { label: 'На этой неделе', value: '32', color: 'bg-green-600', icon: Users },
              { label: 'Завершенные', value: '156', color: 'bg-purple-600', icon: Award },
              { label: 'Рейтинг', value: '4.9', color: 'bg-yellow-600', icon: Heart }
            ]} />

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ближайшие записи</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-gray-600 font-medium">Пациент</th>
                      <th className="pb-3 text-gray-600 font-medium">Дата</th>
                      <th className="pb-3 text-gray-600 font-medium">Время</th>
                      <th className="pb-3 text-gray-600 font-medium">Тип</th>
                      <th className="pb-3 text-gray-600 font-medium">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 5).map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-100">
                        <td className="py-3 font-medium text-gray-900">{appointment.patientName}</td>
                        <td className="py-3 text-gray-600">{appointment.date}</td>
                        <td className="py-3 text-gray-600">{appointment.time}</td>
                        <td className="py-3 text-gray-600">{appointment.type}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Подтверждено' :
                             appointment.status === 'pending' ? 'Ожидает' : 'Отменено'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Все записи на прием</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-gray-600 font-medium">Пациент</th>
                    <th className="pb-3 text-gray-600 font-medium">Дата</th>
                    <th className="pb-3 text-gray-600 font-medium">Время</th>
                    <th className="pb-3 text-gray-600 font-medium">Тип</th>
                    <th className="pb-3 text-gray-600 font-medium">Статус</th>
                    <th className="pb-3 text-gray-600 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium text-gray-900">{appointment.patientName}</td>
                      <td className="py-3 text-gray-600">{appointment.date}</td>
                      <td className="py-3 text-gray-600">{appointment.time}</td>
                      <td className="py-3 text-gray-600">{appointment.type}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Подтверждено' :
                           appointment.status === 'pending' ? 'Ожидает' : 'Отменено'}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            Подтвердить
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Отменить
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
    </div>
  );
};

export { DoctorDashboard, AdminPanel };
export default DoctorDashboard;