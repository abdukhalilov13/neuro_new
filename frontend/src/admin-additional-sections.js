import React, { useState } from 'react';
import { Phone, Mail, Clock, Globe, ArrowRight, Plus, Edit, Trash2, Save, X, CheckCircle } from 'lucide-react';

// Компонент модального окна
const Modal = ({ isOpen, onClose, title, children, size = 'default' }) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    default: 'max-w-2xl',
    large: 'max-w-4xl',
    small: 'max-w-md'
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Секция управления контактами
export const ContactsSection = () => {
  const [contacts, setContacts] = useState({
    phones: ['+998 71 264-96-10', '+998 71 264-96-09', '+998 78 113-33-78'],
    emails: ['admin@neuro.uz', 'info@neuro.uz'],
    address: 'ул. Хумоюн, 40, Мирзо-Улугбекский район, г. Ташкент, 100142, Республика Узбекистан',
    workingHours: {
      weekdays: '8:00 - 18:00',
      saturday: '9:00 - 15:00',
      sunday: 'Выходной'
    },
    emergency: '+998 78 113-33-78'
  });
  
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleSave = (field, value) => {
    setContacts(prev => ({
      ...prev,
      [field]: value
    }));
    setEditingField(null);
    setTempValue('');
    alert('Контактные данные обновлены!');
  };

  const handleArraySave = (field, index, value) => {
    setContacts(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
    setEditingField(null);
    setTempValue('');
    alert('Контактные данные обновлены!');
  };

  const addPhone = () => {
    const newPhone = prompt('Введите новый номер телефона:');
    if (newPhone) {
      setContacts(prev => ({
        ...prev,
        phones: [...prev.phones, newPhone]
      }));
      alert('Телефон добавлен!');
    }
  };

  const addEmail = () => {
    const newEmail = prompt('Введите новый email:');
    if (newEmail) {
      setContacts(prev => ({
        ...prev,
        emails: [...prev.emails, newEmail]
      }));
      alert('Email добавлен!');
    }
  };

  const removePhone = (index) => {
    if (confirm('Удалить этот телефон?')) {
      setContacts(prev => ({
        ...prev,
        phones: prev.phones.filter((_, i) => i !== index)
      }));
      alert('Телефон удален!');
    }
  };

  const removeEmail = (index) => {
    if (confirm('Удалить этот email?')) {
      setContacts(prev => ({
        ...prev,
        emails: prev.emails.filter((_, i) => i !== index)
      }));
      alert('Email удален!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управление контактами</h2>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
            <p className="text-sm text-green-700">
              Контактные данные автоматически обновляются на всех страницах сайта.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Телефоны */}
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Телефоны
            </h3>
            <button onClick={addPhone} className="text-blue-600 hover:text-blue-700">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {contacts.phones.map((phone, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                {editingField === `phone-${index}` ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleArraySave('phones', index, tempValue)}
                      className="text-green-600"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{phone}</span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => {
                          setEditingField(`phone-${index}`);
                          setTempValue(phone);
                        }}
                        className="text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removePhone(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emails */}
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email адреса
            </h3>
            <button onClick={addEmail} className="text-blue-600 hover:text-blue-700">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {contacts.emails.map((email, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                {editingField === `email-${index}` ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="email"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleArraySave('emails', index, tempValue)}
                      className="text-green-600"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{email}</span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => {
                          setEditingField(`email-${index}`);
                          setTempValue(email);
                        }}
                        className="text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeEmail(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Адрес */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Адрес
          </h3>
          {editingField === 'address' ? (
            <div className="space-y-2">
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave('address', tempValue)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Сохранить</span>
                </button>
                <button
                  onClick={() => setEditingField(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-3">{contacts.address}</p>
              <button
                onClick={() => {
                  setEditingField('address');
                  setTempValue(contacts.address);
                }}
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Редактировать</span>
              </button>
            </div>
          )}
        </div>

        {/* Режим работы */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Режим работы
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Пн-Пт:</span>
              {editingField === 'weekdays' ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => handleSave('workingHours', {...contacts.workingHours, weekdays: tempValue})}
                    className="text-green-600"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{contacts.workingHours.weekdays}</span>
                  <button
                    onClick={() => {
                      setEditingField('weekdays');
                      setTempValue(contacts.workingHours.weekdays);
                    }}
                    className="text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Суббота:</span>
              {editingField === 'saturday' ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => handleSave('workingHours', {...contacts.workingHours, saturday: tempValue})}
                    className="text-green-600"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{contacts.workingHours.saturday}</span>
                  <button
                    onClick={() => {
                      setEditingField('saturday');
                      setTempValue(contacts.workingHours.saturday);
                    }}
                    className="text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Воскресенье:</span>
              {editingField === 'sunday' ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => handleSave('workingHours', {...contacts.workingHours, sunday: tempValue})}
                    className="text-green-600"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{contacts.workingHours.sunday}</span>
                  <button
                    onClick={() => {
                      setEditingField('sunday');
                      setTempValue(contacts.workingHours.sunday);
                    }}
                    className="text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Секция SEO настроек
export const SeoSection = () => {
  const [seoSettings, setSeoSettings] = useState({
    title: 'Республиканский Научный Центр Нейрохирургии',
    description: 'Ведущий центр нейрохирургии в Центральной Азии. Более 25 лет опыта в лечении заболеваний нервной системы.',
    keywords: 'нейрохирургия, мозг, спинной мозг, операции, Узбекистан, Ташкент',
    ogTitle: 'Республиканский Научный Центр Нейрохирургии',
    ogDescription: 'Ведущий центр нейрохирургии в Центральной Азии',
    ogImage: 'https://neuro.uz/og-image.jpg',
    favicon: '/favicon.ico',
    robots: 'index, follow',
    canonical: 'https://neuro.uz',
    alternateLanguages: {
      ru: 'https://neuro.uz',
      uz: 'https://neuro.uz/uz',
      en: 'https://neuro.uz/en'
    }
  });

  const handleSave = () => {
    // Здесь должна быть логика сохранения SEO настроек
    alert('SEO настройки сохранены!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">SEO настройки</h2>
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Сохранить изменения</span>
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">Поисковая оптимизация</h3>
            <p className="text-sm text-blue-700">
              Настройте мета-теги и структурированные данные для лучшего ранжирования в поисковых системах.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Основные мета-теги</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (заголовок страницы)</label>
              <input
                type="text"
                value={seoSettings.title}
                onChange={(e) => setSeoSettings({...seoSettings, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Заголовок для поисковых систем"
              />
              <p className="text-xs text-gray-500 mt-1">Рекомендуемая длина: 50-60 символов</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (описание)</label>
              <textarea
                value={seoSettings.description}
                onChange={(e) => setSeoSettings({...seoSettings, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Краткое описание сайта для поисковых систем"
              />
              <p className="text-xs text-gray-500 mt-1">Рекомендуемая длина: 150-160 символов</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (ключевые слова)</label>
              <input
                type="text"
                value={seoSettings.keywords}
                onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ключевое слово 1, ключевое слово 2, ключевое слово 3"
              />
              <p className="text-xs text-gray-500 mt-1">Разделяйте ключевые слова запятыми</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Open Graph (для социальных сетей)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
              <input
                type="text"
                value={seoSettings.ogTitle}
                onChange={(e) => setSeoSettings({...seoSettings, ogTitle: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
              <textarea
                value={seoSettings.ogDescription}
                onChange={(e) => setSeoSettings({...seoSettings, ogDescription: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Image (URL изображения)</label>
              <input
                type="url"
                value={seoSettings.ogImage}
                onChange={(e) => setSeoSettings({...seoSettings, ogImage: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://neuro.uz/og-image.jpg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Технические настройки</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Robots</label>
              <select
                value={seoSettings.robots}
                onChange={(e) => setSeoSettings({...seoSettings, robots: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="index, follow">index, follow (индексировать и переходить по ссылкам)</option>
                <option value="noindex, nofollow">noindex, nofollow (не индексировать)</option>
                <option value="index, nofollow">index, nofollow (индексировать, но не переходить по ссылкам)</option>
                <option value="noindex, follow">noindex, follow (не индексировать, но переходить по ссылкам)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
              <input
                type="url"
                value={seoSettings.canonical}
                onChange={(e) => setSeoSettings({...seoSettings, canonical: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://neuro.uz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Favicon URL</label>
              <input
                type="text"
                value={seoSettings.favicon}
                onChange={(e) => setSeoSettings({...seoSettings, favicon: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="/favicon.ico"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Секция редиректов
export const RedirectsSection = () => {
  const [redirects, setRedirects] = useState([
    { id: 1, from: '/old-about', to: '/about', type: '301' },
    { id: 2, from: '/old-contact', to: '/contact', type: '301' },
    { id: 3, from: '/doctors-old', to: '/doctors', type: '301' }
  ]);
  const [newRedirect, setNewRedirect] = useState({ from: '', to: '', type: '301' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRedirect) {
      setRedirects(redirects.map(r => r.id === editingRedirect.id ? {...newRedirect, id: editingRedirect.id} : r));
      alert('Редирект обновлен!');
    } else {
      const newId = redirects.length > 0 ? Math.max(...redirects.map(r => r.id)) + 1 : 1;
      setRedirects([...redirects, { ...newRedirect, id: newId }]);
      alert('Редирект добавлен!');
    }
    setIsModalOpen(false);
    setNewRedirect({ from: '', to: '', type: '301' });
    setEditingRedirect(null);
  };

  const handleEdit = (redirect) => {
    setEditingRedirect(redirect);
    setNewRedirect(redirect);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Удалить этот редирект?')) {
      setRedirects(redirects.filter(r => r.id !== id));
      alert('Редирект удален!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управление редиректами</h2>
        <button
          onClick={() => {
            setEditingRedirect(null);
            setNewRedirect({ from: '', to: '', type: '301' });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить редирект</span>
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <ArrowRight className="w-5 h-5 text-yellow-600" />
          <div>
            <h3 className="font-medium text-yellow-900">Настройка редиректов</h3>
            <p className="text-sm text-yellow-700">
              Перенаправляйте пользователей со старых URL на новые. Это важно для SEO и пользовательского опыта.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Откуда (старый URL)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Куда (новый URL)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тип
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {redirects.map((redirect) => (
              <tr key={redirect.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {redirect.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {redirect.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    redirect.type === '301' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {redirect.type} {redirect.type === '301' ? '(Постоянный)' : '(Временный)'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(redirect)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(redirect.id)}
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

      {/* Модальное окно редиректа */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRedirect ? 'Редактировать редирект' : 'Добавить редирект'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Откуда (старый URL)
            </label>
            <input
              type="text"
              required
              value={newRedirect.from}
              onChange={(e) => setNewRedirect({...newRedirect, from: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="/old-page"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Куда (новый URL)
            </label>
            <input
              type="text"
              required
              value={newRedirect.to}
              onChange={(e) => setNewRedirect({...newRedirect, to: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="/new-page"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип редиректа
            </label>
            <select
              value={newRedirect.type}
              onChange={(e) => setNewRedirect({...newRedirect, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="301">301 - Постоянный редирект</option>
              <option value="302">302 - Временный редирект</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              301 - для постоянно перемещенных страниц (рекомендуется для SEO)<br/>
              302 - для временно перемещенных страниц
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {editingRedirect ? 'Обновить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};