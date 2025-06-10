/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Brain,
  Heart,
  Plus,
  Edit,
  Trash2,
  X,
  UserCheck,
  BookOpen,
  ImageIcon,
  Settings,
  Crown,
  Stethoscope,
  MapPin,
  Clock
} from 'lucide-react';
import { useAdmin } from './contexts';

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

// Admin Panel
// Export both DoctorDashboard and AdminPanel for compatibility  
export const DoctorDashboard = () => {
  return <div>Doctor Dashboard - Please use /doctor-dashboard route</div>;
};

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Данные состояния
  const { adminData } = useAdmin();
  
  // Получаем данные из контекста
  const departments = adminData?.departments || [];
  const doctors = adminData?.doctors || [];
  const news = adminData?.news || [];
  const services = adminData?.services || [];

  // Состояния для управления статистикой
  const [statistics, setStatistics] = useState([
    { id: 1, title: 'Пациентов в год', value: '5000+', color: 'bg-green-600' },
    { id: 2, title: 'Лет опыта', value: '25+', color: 'bg-blue-600' },
    { id: 3, title: 'Операций', value: '1500+', color: 'bg-red-600' },
    { id: 4, title: 'Врачей', value: '50+', color: 'bg-purple-600' }
  ]);
  const [editingStatistic, setEditingStatistic] = useState(null);
  const [isStatisticModalOpen, setIsStatisticModalOpen] = useState(false);

  // Состояния для управления событиями
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
    }
  ]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Состояния для управления языками
  const [currentAdminLanguage, setCurrentAdminLanguage] = useState('ru');
  const languages = ['ru', 'uz', 'en'];
  const languageNames = {
    ru: 'Русский',
    uz: 'O\'zbek',
    en: 'English'
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            <p className="text-gray-600">Войдите в систему</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (loginData.email === 'admin@neuro.uz' && loginData.password === 'admin123') {
              setIsAuthenticated(true);
            } else {
              alert('Неверные данные для входа');
            }
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
            <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            <div className="flex items-center space-x-4">
              {/* Языковой переключатель */}
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentAdminLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      currentAdminLanguage === lang
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex flex-wrap space-x-1 mb-8">
          {[
            { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
            { id: 'departments', label: 'Отделения', icon: Brain },
            { id: 'doctors', label: 'Врачи', icon: Users },
            { id: 'news', label: 'Новости', icon: BookOpen },
            { id: 'services', label: 'Услуги', icon: Stethoscope },
            { id: 'statistics', label: 'Статистика', icon: BarChart3 },
            { id: 'events', label: 'События', icon: Calendar },
            { id: 'gallery', label: 'Галерея', icon: ImageIcon },
            { id: 'settings', label: 'Настройки', icon: Settings }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-75">Отделения</p>
                    <p className="text-3xl font-bold">{departments.length}</p>
                  </div>
                  <Brain className="w-12 h-12 opacity-75" />
                </div>
              </div>
              <div className="bg-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-75">Врачи</p>
                    <p className="text-3xl font-bold">{doctors.length}</p>
                  </div>
                  <Users className="w-12 h-12 opacity-75" />
                </div>
              </div>
              <div className="bg-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-75">Новости</p>
                    <p className="text-3xl font-bold">{news.length}</p>
                  </div>
                  <BookOpen className="w-12 h-12 opacity-75" />
                </div>
              </div>
              <div className="bg-red-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-75">Услуги</p>
                    <p className="text-3xl font-bold">{services.length}</p>
                  </div>
                  <Stethoscope className="w-12 h-12 opacity-75" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Статистика центра ({statistics.length})</h2>
                <button
                  onClick={() => {
                    setEditingStatistic({ id: null, title: '', value: '', color: 'bg-blue-600' });
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

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Настройки сайта</h2>
            <p className="text-gray-600">
              Здесь можно настроить SEO, контактную информацию, социальные сети и другие параметры сайта.
            </p>
          </div>
        )}
      </div>

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

export default AdminPanel;