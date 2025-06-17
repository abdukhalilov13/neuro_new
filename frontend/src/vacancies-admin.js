import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, CheckCircle, Save, X } from 'lucide-react';

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

// Компонент переключения языков
const LanguageSwitcher = ({ currentLanguage, onLanguageChange, languages }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            currentLanguage === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

// Основной компонент управления вакансиями
export const VacanciesAdminManager = () => {
  const [vacancies, setVacancies] = useState(() => {
    const saved = localStorage.getItem('neuro_vacancies');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title_ru: 'Врач-нейрохирург',
        title_uz: 'Neyroxirurg shifokor',
        title_en: 'Neurosurgeon',
        description_ru: 'Ищем опытного врача-нейрохирурга для работы в современном центре',
        description_uz: 'Zamonaviy markazda ishlash uchun tajribali neyroxirurg shifokor izlaymiz',
        description_en: 'Looking for experienced neurosurgeon to work in modern center',
        requirements_ru: 'Высшее медицинское образование, специализация по нейрохирургии, опыт работы от 3 лет',
        requirements_uz: 'Oliy tibbiy ma\'lumot, neyroxirurgiya bo\'yicha mutaxassislik, 3 yildan ortiq ish tajribasi',
        requirements_en: 'Higher medical education, neurosurgery specialization, 3+ years experience',
        salary: '15000000',
        isActive: true,
        category_ru: 'Медицинский персонал',
        category_uz: 'Tibbiy personal',
        category_en: 'Medical Staff'
      },
      {
        id: 2,
        title_ru: 'Медицинская сестра',
        title_uz: 'Tibbiy hamshira',
        title_en: 'Nurse',
        description_ru: 'Требуется медицинская сестра в отделение нейрохирургии',
        description_uz: 'Neyroxirurgiya bo\'limiga tibbiy hamshira kerak',
        description_en: 'Nurse needed for neurosurgery department',
        requirements_ru: 'Медицинское образование, опыт работы от 2 лет',
        requirements_uz: 'Tibbiy ma\'lumot, 2 yildan ortiq ish tajribasi',
        requirements_en: 'Medical education, 2+ years experience',
        salary: '8000000',
        isActive: true,
        category_ru: 'Медицинский персонал',
        category_uz: 'Tibbiy personal',
        category_en: 'Medical Staff'
      }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('ru');
  const languages = ['ru', 'uz', 'en'];

  const [newVacancy, setNewVacancy] = useState({
    title_ru: '',
    title_uz: '',
    title_en: '',
    description_ru: '',
    description_uz: '',
    description_en: '',
    requirements_ru: '',
    requirements_uz: '',
    requirements_en: '',
    category_ru: '',
    category_uz: '',
    category_en: '',
    salary: '',
    isActive: true
  });

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('neuro_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingVacancy) {
      setVacancies(vacancies.map(v => 
        v.id === editingVacancy.id ? { ...newVacancy, id: editingVacancy.id } : v
      ));
      alert('Вакансия обновлена!');
    } else {
      const newId = vacancies.length > 0 ? Math.max(...vacancies.map(v => v.id)) + 1 : 1;
      setVacancies([...vacancies, { ...newVacancy, id: newId }]);
      alert('Вакансия добавлена!');
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewVacancy({
      title_ru: '',
      title_uz: '',
      title_en: '',
      description_ru: '',
      description_uz: '',
      description_en: '',
      requirements_ru: '',
      requirements_uz: '',
      requirements_en: '',
      category_ru: '',
      category_uz: '',
      category_en: '',
      salary: '',
      isActive: true
    });
    setEditingVacancy(null);
    setCurrentLanguage('ru');
  };

  const startEdit = (vacancy) => {
    setEditingVacancy(vacancy);
    setNewVacancy(vacancy);
    setIsModalOpen(true);
  };

  const deleteVacancy = (id) => {
    if (confirm('Удалить эту вакансию?')) {
      setVacancies(vacancies.filter(v => v.id !== id));
      alert('Вакансия удалена!');
    }
  };

  const toggleStatus = (id) => {
    setVacancies(vacancies.map(v => 
      v.id === id ? { ...v, isActive: !v.isActive } : v
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управление вакансиями ({vacancies.length})</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить вакансию</span>
        </button>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <h3 className="font-medium text-green-900">Синхронизация с сайтом</h3>
            <p className="text-sm text-green-700">
              Вакансии автоматически отображаются на странице /vacancies с поддержкой 3 языков.
            </p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{vacancies.length}</p>
            <p className="text-sm text-gray-600">Всего вакансий</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {vacancies.filter(v => v.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Активные</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">
              {vacancies.filter(v => !v.isActive).length}
            </p>
            <p className="text-sm text-gray-600">Неактивные</p>
          </div>
        </div>
      </div>

      {/* Список вакансий */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Зарплата
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
            {vacancies.map((vacancy) => (
              <tr key={vacancy.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {vacancy.title_ru}
                  </div>
                  <div className="text-sm text-gray-500">
                    {vacancy.description_ru.length > 50 
                      ? `${vacancy.description_ru.substring(0, 50)}...` 
                      : vacancy.description_ru}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vacancy.category_ru}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vacancy.salary ? `${parseInt(vacancy.salary).toLocaleString()} сум` : 'По договоренности'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleStatus(vacancy.id)}
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      vacancy.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {vacancy.isActive ? 'Активна' : 'Неактивна'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(vacancy)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteVacancy(vacancy.id)}
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

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVacancy ? 'Редактировать вакансию' : 'Добавить вакансию'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            languages={languages}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название ({currentLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newVacancy[`title_${currentLanguage}`]}
                onChange={(e) => setNewVacancy({
                  ...newVacancy, 
                  [`title_${currentLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория ({currentLanguage.toUpperCase()})
              </label>
              <input
                type="text"
                required
                value={newVacancy[`category_${currentLanguage}`]}
                onChange={(e) => setNewVacancy({
                  ...newVacancy, 
                  [`category_${currentLanguage}`]: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Медицинский персонал"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание ({currentLanguage.toUpperCase()})
            </label>
            <textarea
              required
              rows={3}
              value={newVacancy[`description_${currentLanguage}`]}
              onChange={(e) => setNewVacancy({
                ...newVacancy, 
                [`description_${currentLanguage}`]: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Требования ({currentLanguage.toUpperCase()})
            </label>
            <textarea
              required
              rows={4}
              value={newVacancy[`requirements_${currentLanguage}`]}
              onChange={(e) => setNewVacancy({
                ...newVacancy, 
                [`requirements_${currentLanguage}`]: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Зарплата (сум)
            </label>
            <input
              type="number"
              value={newVacancy.salary}
              onChange={(e) => setNewVacancy({...newVacancy, salary: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="15000000"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={newVacancy.isActive}
              onChange={(e) => setNewVacancy({...newVacancy, isActive: e.target.checked})}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Активная вакансия
            </label>
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
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {editingVacancy ? 'Обновить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};