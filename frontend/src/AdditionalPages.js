import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Users, Building, Mail, Send, CheckCircle } from 'lucide-react';
import { Header, Footer } from './enhanced-components';
import { useAdmin, useLanguage } from './contexts';

// Вакансии
export const VacanciesPage = () => {
  const { adminData } = useAdmin(); // Получаем данные из админ-панели
  const { t } = useLanguage(); // Добавляем поддержку переводов
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    education: '',
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Используем данные из админ-панели или fallback данные
  const vacancies = adminData?.vacancies || [
    {
      id: 1,
      title: 'Врач-нейрохирург',
      department: 'Нейрохирургия',
      type: 'Полная занятость',
      salary: '15000000 - 25000000',
      requirements: [
        'Высшее медицинское образование',
        'Специализация по нейрохирургии',
        'Опыт работы от 3 лет',
        'Сертификат специалиста',
        'Знание современных методов диагностики и лечения'
      ],
      responsibilities: [
        'Проведение нейрохирургических операций',
        'Консультирование пациентов',
        'Ведение медицинской документации',
        'Участие в научной деятельности'
      ],
      benefits: [
        'Официальное трудоустройство',
        'Медицинская страховка',
        'Премии за достижения',
        'Повышение квалификации'
      ]
    },
    {
      id: 2,
      title: 'Медицинская сестра операционного блока',
      department: 'Операционный блок',
      type: 'Полная занятость',
      salary: '5000000 - 8000000',
      requirements: [
        'Среднее медицинское образование',
        'Сертификат операционной медсестры',
        'Опыт работы от 1 года',
        'Знание асептики и антисептики',
        'Внимательность и стрессоустойчивость'
      ],
      responsibilities: [
        'Подготовка операционной к вмешательствам',
        'Ассистирование врачам во время операций',
        'Стерилизация инструментов',
        'Контроль соблюдения санэпидрежима'
      ],
      benefits: [
        'Стабильная заработная плата',
        'Социальные гарантии',
        'Обучение и развитие',
        'Дружный коллектив'
      ]
    },
    {
      id: 3,
      title: 'Врач-анестезиолог',
      department: 'Анестезиология и реанимация',
      type: 'Полная занятость',
      salary: '12000000 - 18000000',
      requirements: [
        'Высшее медицинское образование',
        'Специализация по анестезиологии',
        'Опыт работы от 2 лет',
        'Сертификат специалиста',
        'Знание современного оборудования'
      ],
      responsibilities: [
        'Проведение анестезии при операциях',
        'Мониторинг состояния пациентов',
        'Реанимационные мероприятия',
        'Послеоперационное наблюдение'
      ],
      benefits: [
        'Высокая заработная плата',
        'Премии и надбавки',
        'Современное оборудование',
        'Профессиональный рост'
      ]
    },
    {
      id: 4,
      title: 'Врач функциональной диагностики',
      department: 'Диагностическое отделение',
      type: 'Полная занятость',
      salary: '8000000 - 12000000',
      requirements: [
        'Высшее медицинское образование',
        'Специализация по функциональной диагностике',
        'Опыт работы от 1 года',
        'Знание МРТ, КТ, ЭЭГ',
        'Внимательность к деталям'
      ],
      responsibilities: [
        'Проведение диагностических исследований',
        'Интерпретация результатов',
        'Консультирование пациентов',
        'Ведение протоколов исследований'
      ],
      benefits: [
        'Работа с современным оборудованием',
        'Гибкий график',
        'Обучение новым методикам',
        'Карьерный рост'
      ]
    },
    {
      id: 5,
      title: 'Администратор регистратуры',
      department: 'Административный персонал',
      type: 'Полная занятость',
      salary: '3500000 - 5000000',
      requirements: [
        'Среднее образование',
        'Опыт работы в медицине желателен',
        'Знание ПК',
        'Коммуникабельность',
        'Вежливость и терпение'
      ],
      responsibilities: [
        'Запись пациентов на прием',
        'Работа с медицинскими картами',
        'Прием звонков',
        'Информирование пациентов'
      ],
      benefits: [
        'Стабильная работа',
        'Обучение на рабочем месте',
        'Социальный пакет',
        'Удобный график'
      ]
    }
  ];

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Создаем объект заявки
      const applicationData = {
        id: Date.now(),
        vacancyId: selectedVacancy.id,
        vacancyTitle: selectedVacancy.title,
        applicant: {
          name: applicationForm.name,
          phone: applicationForm.phone,
          email: applicationForm.email,
          experience: applicationForm.experience,
          education: applicationForm.education,
          coverLetter: applicationForm.coverLetter
        },
        submittedAt: new Date().toISOString(),
        status: 'new' // new, reviewed, contacted, hired, rejected
      };

      // Сохраняем заявку в localStorage
      const existingApplications = JSON.parse(localStorage.getItem('neuro_job_applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('neuro_job_applications', JSON.stringify(existingApplications));

      console.log('Заявка сохранена в localStorage:', applicationData);

      // Отправляем на бэкенд (для будущей интеграции)
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/job-applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData)
        });

        if (response.ok) {
          console.log('Заявка отправлена на сервер');
        }
      } catch (apiError) {
        console.log('API недоступен, заявка сохранена локально');
      }
      
      setSubmitStatus('success');
      setApplicationForm({
        name: '',
        phone: '',
        email: '',
        experience: '',
        education: '',
        coverLetter: ''
      });
      
      // Закрываем модальное окно через 3 секунды
      setTimeout(() => {
        setSelectedVacancy(null);
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Ошибка отправки заявки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('careers')}</h1>
            <p className="text-xl text-gray-600">
              {t('joinProfessionalTeam')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список вакансий */}
            <div className="lg:col-span-2 space-y-6">
              {vacancies.map((vacancy, index) => (
                <motion.div
                  key={vacancy.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedVacancy(vacancy)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{vacancy.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{vacancy.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{vacancy.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-green-600 font-semibold">
                        <span>{vacancy.salary} UZS</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Основные требования:</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {vacancy.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVacancy(vacancy);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Подробнее и откликнуться
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Информация о работе в центре */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Почему работать у нас?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('professionalTeam')}</h4>
                      <p className="text-sm text-gray-600">{t('workWithBestSpecialists')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('modernEquipment')}</h4>
                      <p className="text-sm text-gray-600">{t('latestTechnologies')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('competitiveSalary')}</h4>
                      <p className="text-sm text-gray-600">{t('competitiveSalaryDesc')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-blue-600 rounded-2xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4">{t('notFoundVacancy')}</h3>
                <p className="mb-4">{t('sendResume')}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>admin@neuro.uz</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{t('hrDepartmentContact')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно вакансии */}
      {selectedVacancy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVacancy.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{selectedVacancy.department}</span>
                  <span>•</span>
                  <span>{selectedVacancy.type}</span>
                  <span>•</span>
                  <span className="text-green-600 font-semibold">{selectedVacancy.salary} UZS</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedVacancy(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Требования к кандидату</h3>
                  <ul className="space-y-2">
                    {selectedVacancy.requirements.map((req, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Обязанности</h3>
                  <ul className="space-y-2">
                    {selectedVacancy.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-600">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Мы предлагаем</h3>
                  <ul className="space-y-2">
                    {selectedVacancy.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('apply')}</h3>
                
                {submitStatus === 'success' && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-green-800">{t('applicationSuccess')}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ФИО *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Опыт работы
                    </label>
                    <input
                      type="text"
                      value={applicationForm.experience}
                      onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5 лет в нейрохирургии"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Образование
                    </label>
                    <input
                      type="text"
                      value={applicationForm.education}
                      onChange={(e) => setApplicationForm({...applicationForm, education: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="ТашГосМедИнститут"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Сопроводительное письмо
                    </label>
                    <textarea
                      rows={4}
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Расскажите о себе и почему хотите работать у нас"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Отправить заявку</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// Галерея
export const GalleryPage = () => {
  const { adminData } = useAdmin(); // Получаем данные из админ-панели
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Все фотографии' },
    { id: 'operations', name: 'Операционные' },
    { id: 'equipment', name: 'Оборудование' },
    { id: 'building', name: 'Здание центра' },
    { id: 'staff', name: 'Персонал' },
    { id: 'patients', name: 'Пациенты' }
  ];

  // Используем данные из админ-панели или fallback данные
  const images = adminData?.galleryImages || [
    { id: 1, url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56', category: 'operations', title: 'Операционная №1', description: 'Современная нейрохирургическая операционная' },
    { id: 2, url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514', category: 'equipment', title: 'МРТ аппарат', description: 'Высокопольный МРТ сканер 3 Тесла' },
    { id: 3, url: 'https://images.unsplash.com/photo-1476889155166-39ae3886a3ef', category: 'building', title: 'Главный корпус', description: 'Фасад центра нейрохирургии' },
    { id: 4, url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6', category: 'operations', title: 'Микрохирургия', description: 'Микрохирургическая операция на головном мозге' },
    { id: 5, url: 'https://images.unsplash.com/photo-1551076805-e1869033e561', category: 'equipment', title: 'КТ сканер', description: 'Компьютерный томограф последнего поколения' },
    { id: 6, url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', category: 'staff', title: 'Врачебная конференция', description: 'Еженедельная конференция специалистов' },
    { id: 7, url: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9', category: 'building', title: 'Холл центра', description: 'Современный интерьер главного холла' },
    { id: 8, url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54', category: 'staff', title: 'Медицинский персонал', description: 'Команда профессионалов' },
    { id: 9, url: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29', category: 'equipment', title: 'Нейромониторинг', description: 'Система нейромониторинга во время операций' },
    { id: 10, url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907', category: 'patients', title: 'Палата пациента', description: 'Комфортные условия для пациентов' },
    { id: 11, url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d', category: 'building', title: 'Диагностический центр', description: 'Отделение лучевой диагностики' },
    { id: 12, url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842', category: 'operations', title: 'Эндоскопическая операция', description: 'Малоинвазивная нейрохирургия' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Галерея</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Фотографии нашего центра, оборудования и работы наших специалистов
            </p>
          </motion.div>

          {/* Фильтры категорий */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Сетка изображений */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={image.url}
                    alt={image.alt_ru || image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{image.alt_ru || image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">В данной категории пока нет изображений</p>
            </div>
          )}
        </div>
      </section>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10"
            >
              ✕ Закрыть
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt_ru || selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
              <h3 className="text-xl font-bold mb-2">{selectedImage.alt_ru || selectedImage.title}</h3>
              <p className="text-gray-200">{selectedImage.description}</p>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};