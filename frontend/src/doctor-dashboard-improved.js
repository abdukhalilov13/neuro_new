import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  X,
  BarChart3,
  Users,
  Bell,
  Settings,
  LogOut,
  UserCheck,
  Shield,
  Activity,
  RefreshCw,
  FileText,
  Check,
  Stethoscope,
  ArrowRight,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';

// Модальное окно
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
};

export const ImprovedDoctorDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { adminData } = useAdmin();
  
  // Состояние аутентификации
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Состояние записей
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedTransferDoctor, setSelectedTransferDoctor] = useState('');
  const [transferReason, setTransferReason] = useState('');

  // Фильтры и поиск
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка записей для текущего врача
  useEffect(() => {
    if (currentDoctor) {
      loadAppointments();
    }
  }, [currentDoctor, filterDate, filterStatus]);

  // Загрузка записей для текущего врача
  useEffect(() => {
    if (currentDoctor) {
      loadAppointments();
    }
  }, [currentDoctor, filterDate, filterStatus]);

  const loadAppointments = () => {
    try {
      // Загружаем реальные записи из localStorage
      const savedAppointments = JSON.parse(localStorage.getItem('neuro_appointments') || '[]');
      console.log('Все записи:', savedAppointments);
      console.log('Текущий врач ID:', currentDoctor?.id);
      
      // Фильтруем записи по врачу
      const doctorAppointments = savedAppointments.filter(apt => {
        const matchesDoctor = apt.doctorId === currentDoctor?.id || apt.doctorId === String(currentDoctor?.id);
        const matchesDate = !filterDate || apt.date === filterDate;
        const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
        const matchesSearch = !searchTerm || apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesDoctor && matchesDate && matchesStatus && matchesSearch;
      });
      
      console.log('Записи врача:', doctorAppointments);
      
      // Если нет реальных записей, добавляем demo данные для этого врача
      if (doctorAppointments.length === 0) {
        const mockData = [
          {
            id: `demo-${currentDoctor.id}-1`,
            doctorId: currentDoctor?.id,
            doctorName: currentDoctor?.name_ru || currentDoctor?.name,
            date: new Date().toISOString().split('T')[0],
            time: '09:00',
            patient: {
              name: 'Демо пациент Иванов А.П.',
              phone: '+998 90 123-45-67',
              email: 'demo@mail.uz',
              age: 45,
              complaint: 'Демо жалоба: головные боли и головокружение'
            },
            status: 'pending',
            type: 'consultation',
            createdAt: new Date().toISOString(),
            notes: ''
          }
        ];
        setAppointments(mockData);
      } else {
        setAppointments(doctorAppointments);
      }
    } catch (error) {
      console.error('Ошибка загрузки записей:', error);
      setAppointments([]);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    // Проверяем email в списке врачей
    const doctor = adminData.doctors?.find(doc => 
      doc.email === loginData.email
    );
    
    if (doctor && loginData.password === 'doctor123') {
      setCurrentDoctor(doctor);
      setIsAuthenticated(true);
    } else {
      setLoginError('Неверный email или пароль. Попробуйте doctor123 в качестве пароля.');
    }
  };

  const handleAppointmentAction = (appointmentId, action, data = {}) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        switch (action) {
          case 'confirm':
            return { ...apt, status: 'confirmed' };
          case 'pending':
            return { ...apt, status: 'pending' };
          case 'reject':
            return { ...apt, status: 'rejected' };
          case 'complete':
            return { ...apt, status: 'completed', notes: data.notes || apt.notes };
          case 'transfer':
            return { 
              ...apt, 
              status: 'transferred', 
              transferredTo: data.doctorId,
              transferReason: data.reason,
              transferredAt: new Date().toISOString()
            };
          default:
            return apt;
        }
      }
      return apt;
    }));
    
    setSelectedAppointment(null);
    setIsAppointmentModalOpen(false);
    setTransferModalOpen(false);
  };

  const handleTransferAppointment = () => {
    if (!selectedTransferDoctor || !transferReason) {
      alert('Выберите врача и укажите причину перенаправления');
      return;
    }
    
    const targetDoctor = adminData.doctors?.find(doc => doc.id === selectedTransferDoctor);
    
    handleAppointmentAction(selectedAppointment.id, 'transfer', {
      doctorId: selectedTransferDoctor,
      doctorName: targetDoctor?.name_ru || targetDoctor?.name,
      reason: transferReason
    });
    
    setSelectedTransferDoctor('');
    setTransferReason('');
    alert(`Запись перенаправлена врачу: ${targetDoctor?.name_ru || targetDoctor?.name}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'transferred': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'confirmed': return 'Подтверждено';
      case 'rejected': return 'Отклонено';
      case 'completed': return 'Завершено';
      case 'transferred': return 'Перенаправлено';
      default: return status;
    }
  };

  // Если не авторизован, показываем форму входа
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
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Кабинет врача</h1>
            <p className="text-gray-600 mt-2">Войдите в свой личный кабинет</p>
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
                placeholder="your.email@neuro.uz"
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
                placeholder="doctor123"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Для входа:</strong><br />
              Используйте email врача из базы данных<br />
              Пароль: doctor123
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

  // Основной интерфейс кабинета врача
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <Stethoscope className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">NEURO.UZ</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-900">Кабинет врача</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{currentDoctor?.name_ru || currentDoctor?.name}</p>
                <p className="text-gray-500">{currentDoctor?.specialization_ru || currentDoctor?.specialization}</p>
              </div>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Сегодня</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
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
                <p className="text-sm font-medium text-gray-600">Ожидают</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(apt => apt.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Подтверждено</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.filter(apt => apt.status === 'confirmed').length}
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
                <p className="text-sm font-medium text-gray-600">Всего записей</p>
                <p className="text-2xl font-semibold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Все</option>
                <option value="pending">Ожидают</option>
                <option value="confirmed">Подтверждено</option>
                <option value="completed">Завершено</option>
                <option value="rejected">Отклонено</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск пациента</label>
              <input
                type="text"
                placeholder="Имя пациента..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={loadAppointments}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Обновить</span>
              </button>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Записи пациентов</h3>
          </div>
          
          {appointments.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Нет записей на выбранную дату</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата и время
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Пациент
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
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('ru-RU')}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.patient.name}</div>
                        <div className="text-sm text-gray-500">{appointment.patient.phone}</div>
                        <div className="text-sm text-gray-500">Возраст: {appointment.patient.age}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {appointment.patient.complaint}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setIsAppointmentModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAppointmentAction(appointment.id, 'confirm')}
                              className="text-green-600 hover:text-green-900 mr-3"
                              title="Подтвердить"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                              className="text-red-600 hover:text-red-900"
                              title="Отклонить"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title="Детали записи"
        size="large"
      >
        {selectedAppointment && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Информация о пациенте</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>ФИО:</strong> {selectedAppointment.patient.name}</p>
                  <p><strong>Возраст:</strong> {selectedAppointment.patient.age} лет</p>
                  <p><strong>Телефон:</strong> {selectedAppointment.patient.phone}</p>
                  <p><strong>Email:</strong> {selectedAppointment.patient.email}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Детали записи</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Дата:</strong> {new Date(selectedAppointment.date).toLocaleDateString('ru-RU')}</p>
                  <p><strong>Время:</strong> {selectedAppointment.time}</p>
                  <p><strong>Тип:</strong> {selectedAppointment.type === 'consultation' ? 'Консультация' : 'Повторный прием'}</p>
                  <p><strong>Статус:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedAppointment.status)}`}>
                    {getStatusText(selectedAppointment.status)}
                  </span></p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Жалобы пациента</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                {selectedAppointment.patient.complaint}
              </p>
            </div>
            
            {selectedAppointment.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Заметки врача</h4>
                <p className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg">
                  {selectedAppointment.notes}
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
              {selectedAppointment.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleAppointmentAction(selectedAppointment.id, 'confirm')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Подтвердить</span>
                  </button>
                  <button
                    onClick={() => handleAppointmentAction(selectedAppointment.id, 'reject')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Отклонить</span>
                  </button>
                </>
              )}
              
              {(selectedAppointment.status === 'confirmed' || selectedAppointment.status === 'pending') && (
                <button
                  onClick={() => setTransferModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Перенаправить врачу</span>
                </button>
              )}
              
              {selectedAppointment.status === 'confirmed' && (
                <button
                  onClick={() => handleAppointmentAction(selectedAppointment.id, 'complete', {notes: 'Прием завершен'})}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Завершить прием</span>
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Transfer Modal */}
      <Modal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        title="Перенаправить к другому врачу"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Выберите врача</label>
            <select
              value={selectedTransferDoctor}
              onChange={(e) => setSelectedTransferDoctor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Выберите врача...</option>
              {adminData.doctors?.filter(doc => doc.id !== currentDoctor?.id).map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name_ru || doctor.name} - {doctor.specialization_ru || doctor.specialization}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Причина перенаправления</label>
            <textarea
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Укажите причину перенаправления..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setTransferModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Отмена
            </button>
            <button
              onClick={handleTransferAppointment}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              Перенаправить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};