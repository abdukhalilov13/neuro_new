import React, { useState, useEffect } from 'react';
import { Eye, Download, CheckCircle, XCircle, Phone, Mail, User, Calendar, FileText, MessageSquare, Filter } from 'lucide-react';

// Модальное окно для просмотра заявки
const ApplicationDetailModal = ({ isOpen, onClose, application }) => {
  if (!isOpen || !application) return null;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'reviewed': return 'Рассмотрена';
      case 'contacted': return 'Связались';
      case 'hired': return 'Принят';
      case 'rejected': return 'Отклонена';
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Детали заявки</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Информация о вакансии */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Вакансия</h4>
            <p className="text-blue-800">{application.vacancyTitle}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-blue-600">Статус заявки:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                {getStatusText(application.status)}
              </span>
            </div>
          </div>

          {/* Информация о кандидате */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Персональная информация
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">ФИО:</span>
                  <p className="font-medium">{application.applicant.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Телефон:</span>
                  <p className="font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-gray-400" />
                    {application.applicant.phone}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    {application.applicant.email}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Дата подачи:</span>
                  <p className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(application.submittedAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Профессиональная информация
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Опыт работы:</span>
                  <p className="font-medium">{application.applicant.experience}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Образование:</span>
                  <p className="font-medium">{application.applicant.education}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Сопроводительное письмо */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Сопроводительное письмо
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{application.applicant.coverLetter}</p>
            </div>
          </div>

          {/* Действия */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                const blob = new Blob([
                  `Заявка на вакансию: ${application.vacancyTitle}\n\n` +
                  `ФИО: ${application.applicant.name}\n` +
                  `Телефон: ${application.applicant.phone}\n` +
                  `Email: ${application.applicant.email}\n` +
                  `Опыт: ${application.applicant.experience}\n` +
                  `Образование: ${application.applicant.education}\n\n` +
                  `Сопроводительное письмо:\n${application.applicant.coverLetter}\n\n` +
                  `Дата подачи: ${new Date(application.submittedAt).toLocaleString('ru-RU')}`
                ], { type: 'text/plain' });
                
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Заявка_${application.applicant.name}_${application.id}.txt`;
                a.click();
                window.URL.revokeObjectURL(url);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Скачать</span>
            </button>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Основной компонент управления заявками
export const VacancyApplicationsManager = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка заявок из localStorage
  useEffect(() => {
    const loadApplications = () => {
      try {
        const savedApplications = JSON.parse(localStorage.getItem('neuro_job_applications') || '[]');
        console.log('Загружены заявки:', savedApplications);
        setApplications(savedApplications);
      } catch (error) {
        console.error('Ошибка загрузки заявок:', error);
        setApplications([]);
      }
    };
    
    loadApplications();
    
    // Обновляем каждые 5 секунд для отладки
    const interval = setInterval(loadApplications, 5000);
    return () => clearInterval(interval);
  }, []);

  // Обновление статуса заявки
  const updateApplicationStatus = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('neuro_job_applications', JSON.stringify(updatedApplications));
  };

  // Фильтрация заявок
  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.vacancyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'reviewed': return 'Рассмотрена';
      case 'contacted': return 'Связались';
      case 'hired': return 'Принят';
      case 'rejected': return 'Отклонена';
      default: return status;
    }
  };

  const openDetailModal = (application) => {
    setSelectedApplication(application);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
            <p className="text-sm text-gray-600">Всего заявок</p>
            <p className="text-xs text-gray-400">localStorage: {JSON.parse(localStorage.getItem('neuro_job_applications') || '[]').length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === 'new').length}
            </p>
            <p className="text-sm text-gray-600">Новые</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {applications.filter(app => app.status === 'reviewed').length}
            </p>
            <p className="text-sm text-gray-600">Рассмотрены</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'hired').length}
            </p>
            <p className="text-sm text-gray-600">Приняты</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === 'rejected').length}
            </p>
            <p className="text-sm text-gray-600">Отклонены</p>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
            <input
              type="text"
              placeholder="Поиск по имени, email или вакансии..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="reviewed">Рассмотрены</option>
              <option value="contacted">Связались</option>
              <option value="hired">Приняты</option>
              <option value="rejected">Отклонены</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
      </div>

      {/* Список заявок */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {applications.length === 0 ? 'Пока нет заявок на вакансии' : 'Нет заявок, соответствующих фильтрам'}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Кандидат
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Вакансия
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата подачи
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
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.applicant.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.applicant.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.applicant.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.vacancyTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(application.submittedAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={application.status}
                      onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(application.status)}`}
                    >
                      <option value="new">Новая</option>
                      <option value="reviewed">Рассмотрена</option>
                      <option value="contacted">Связались</option>
                      <option value="hired">Принят</option>
                      <option value="rejected">Отклонена</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openDetailModal(application)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="Просмотреть детали"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Модальное окно деталей заявки */}
      <ApplicationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        application={selectedApplication}
      />
    </div>
  );
};