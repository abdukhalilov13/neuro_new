// Дополнительные разделы для админ-панели
import React from 'react';
import { 
  Star, 
  Users, 
  Crown, 
  Settings, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Award
} from 'lucide-react';

// Раздел событий
export const EventsSection = ({ 
  events, 
  setEditingEvent, 
  resetEventForm, 
  setIsEventModalOpen, 
  startEditEvent, 
  deleteEvent 
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">События ({events.length})</h2>
      <button
        onClick={() => {
          setEditingEvent(null);
          resetEventForm();
          setIsEventModalOpen(true);
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Добавить событие</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg p-6 shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Star className={`w-5 h-5 ${
                  event.type === 'conference' ? 'text-blue-600' :
                  event.type === 'open-day' ? 'text-green-600' :
                  event.type === 'masterclass' ? 'text-purple-600' :
                  'text-orange-600'
                }`} />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.type === 'conference' ? 'bg-blue-100 text-blue-800' :
                  event.type === 'open-day' ? 'bg-green-100 text-green-800' :
                  event.type === 'masterclass' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {event.type === 'conference' ? 'Конференция' :
                   event.type === 'open-day' ? 'День открытых дверей' :
                   event.type === 'masterclass' ? 'Мастер-класс' :
                   'Семинар'}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{event.title_ru}</h3>
              <p className="text-sm text-gray-600 mb-3">{event.description_ru}</p>
              
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location_ru}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-3">
                <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {event.title_uz ? '✓' : '✗'}</span>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {event.title_en ? '✓' : '✗'}</span>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => startEditEvent(event)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Удалить это событие?')) {
                    deleteEvent(event.id);
                    alert('Событие удалено!');
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
);

// Раздел аккаунтов
export const AccountsSection = ({ 
  accounts, 
  setEditingAccount, 
  resetAccountForm, 
  setIsAccountModalOpen, 
  startEditAccount, 
  deleteAccount,
  toggleAccountStatus 
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Аккаунты ({accounts.length})</h2>
      <button
        onClick={() => {
          setEditingAccount(null);
          resetAccountForm();
          setIsAccountModalOpen(true);
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Добавить аккаунт</span>
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
              Дата создания
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
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      account.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      {account.role === 'admin' ? (
                        <Crown className={`h-5 w-5 text-purple-600`} />
                      ) : (
                        <Users className={`h-5 w-5 text-blue-600`} />
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  account.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {account.role === 'admin' ? 'Администратор' : 'Врач'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  account.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {account.status === 'active' ? 'Активен' : 'Неактивен'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(account.createdAt).toLocaleDateString('ru-RU')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditAccount(account)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleAccountStatus(account.id)}
                    className={`${account.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                  >
                    {account.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Раздел руководства
export const LeadershipSection = ({ 
  leadership, 
  setEditingLeader, 
  resetLeadershipForm, 
  setIsLeadershipModalOpen, 
  startEditLeader, 
  deleteLeadership 
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">Руководство ({leadership.length})</h2>
      <button
        onClick={() => {
          setEditingLeader(null);
          resetLeadershipForm();
          setIsLeadershipModalOpen(true);
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Добавить руководителя</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leadership.map((leader) => (
        <div key={leader.id} className="bg-white rounded-lg overflow-hidden shadow">
          <img
            src={leader.image}
            alt={leader.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                Руководство
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              {leader.name_ru || leader.name}
            </h3>
            <p className="text-sm text-blue-600 mb-3">
              {leader.position_ru || leader.position}
            </p>
            
            <div className="text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span>{leader.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span>{leader.email}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
              <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">RU: ✓</span>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded mr-2">UZ: {leader.name_uz ? '✓' : '✗'}</span>
              <span className="inline-block px-2 py-1 bg-gray-100 rounded">EN: {leader.name_en ? '✓' : '✗'}</span>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => startEditLeader(leader)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Удалить этого руководителя?')) {
                    deleteLeadership(leader.id);
                    alert('Руководитель удален!');
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
);

// Раздел настроек
export const SettingsSection = ({ adminData, updateSiteSettings, updateSeoSettings }) => {
  const [siteSettings, setSiteSettings] = React.useState(adminData.siteSettings);
  const [seoSettings, setSeoSettings] = React.useState(adminData.seoSettings);

  const handleSiteSettingsSubmit = (e) => {
    e.preventDefault();
    updateSiteSettings(siteSettings);
    alert('Настройки сайта обновлены!');
  };

  const handleSeoSettingsSubmit = (e) => {
    e.preventDefault();
    updateSeoSettings(seoSettings);
    alert('SEO настройки обновлены!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Настройки</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Настройки сайта */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки сайта</h3>
          <form onSubmit={handleSiteSettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Телефоны</label>
              {siteSettings.phones.map((phone, index) => (
                <input
                  key={index}
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const newPhones = [...siteSettings.phones];
                    newPhones[index] = e.target.value;
                    setSiteSettings({...siteSettings, phones: newPhones});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2"
                />
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email адреса</label>
              {siteSettings.emails.map((email, index) => (
                <input
                  key={index}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const newEmails = [...siteSettings.emails];
                    newEmails[index] = e.target.value;
                    setSiteSettings({...siteSettings, emails: newEmails});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2"
                />
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Адрес</label>
              <textarea
                value={siteSettings.address}
                onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Сохранить настройки сайта
            </button>
          </form>
        </div>

        {/* SEO настройки */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO настройки</h3>
          <form onSubmit={handleSeoSettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Заголовок сайта</label>
              <input
                type="text"
                value={seoSettings.title}
                onChange={(e) => setSeoSettings({...seoSettings, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
              <textarea
                value={seoSettings.description}
                onChange={(e) => setSeoSettings({...seoSettings, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ключевые слова</label>
              <input
                type="text"
                value={seoSettings.keywords}
                onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Сохранить SEO настройки
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};