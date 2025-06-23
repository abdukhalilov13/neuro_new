import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  User,
  Heart,
  Brain,
  Activity,
  Award,
  Users,
  Building,
  ChevronRight,
  CheckCircle,
  Check
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';
import { Header, Footer, ServiceCard } from './enhanced-components';
import { siteData } from './components';

// Отделения - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ
export const DepartmentsPage = () => {
  const { adminData } = useAdmin();
  const { t, language } = useLanguage();
  
  // Используем ТОЛЬКО данные из API, без fallback на siteData
  const departments = adminData?.departments || [];

  const getFieldByLanguage = (item, fieldName) => {
    return item[`${fieldName}_${language}`] || item[`${fieldName}_ru`] || item[fieldName];
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('allDepartments')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {departments.length} {t('specializedDivisions')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${dept.color || 'from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{getFieldByLanguage(dept, 'name')}</h3>
                    <p className="text-gray-600 mb-4">{getFieldByLanguage(dept, 'description')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Врачи - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ
export const DoctorsPage = () => {
  const { adminData } = useAdmin();
  const { t, language } = useLanguage();
  
  // Используем ТОЛЬКО данные из API, без fallback на siteData
  const doctors = adminData?.doctors || [];

  const getFieldByLanguage = (item, fieldName) => {
    return item[`${fieldName}_${language}`] || item[`${fieldName}_ru`] || item[fieldName];
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('ourDoctors')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('experiencedSpecialistsSubtitle')} ({doctors.length} врачей)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{getFieldByLanguage(doctor, 'name')}</h3>
                  <p className="text-blue-600 font-medium mb-3">{getFieldByLanguage(doctor, 'specialization')}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience} {t('experience')}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{getFieldByLanguage(doctor, 'reception')}</span>
                    </div>
                  </div>

                  <Link
                    to="/appointment"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
                  >
                    {t('bookAppointment')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Услуги - ИСПОЛЬЗУЕМ ВСЕ ДАННЫЕ ИЗ АДМИНКИ
export const ServicesPage = () => {
  const { adminData, isLoading } = useAdmin();
  const { t, language } = useLanguage();

  const getFieldByLanguage = (item, fieldName) => {
    return item[`${fieldName}_${language}`] || item[`${fieldName}_ru`] || item[fieldName];
  };

  // Проверяем что данные загружены и безопасно обращаемся к services
  const services = adminData?.services || [];

  // Показываем загрузку, если данные еще загружаются
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Группируем услуги по категориям только если есть данные
  const servicesByCategory = services.reduce((acc, service) => {
    const categoryName = getFieldByLanguage(service, 'category') || service.category || 'Общие';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('ourServices')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('medicalServices')} ({services.length} услуг)
            </p>
          </motion.div>

          {/* Если услуги загружаются */}
          {services.length === 0 ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('loading')}</p>
            </div>
          ) : (
            <>
              {/* Услуги по категориям */}
              <div className="space-y-16">
                {Object.entries(servicesByCategory).map(([category, categoryServices], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {categoryServices.length} услуг
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryServices.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{getFieldByLanguage(service, 'title') || getFieldByLanguage(service, 'name')}</h3>
                          <p className="text-gray-600 mb-4">{getFieldByLanguage(service, 'description')}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-blue-600">
                              {service.price ? `${service.price.toLocaleString()} UZS` : 'По запросу'}
                            </span>
                            <Link
                              to="/appointment"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Записаться
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Контактная информация */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('serviceConsultation')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('serviceContactText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/appointment"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    {t('scheduleConsultation')}
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    {t('contactUs')}
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Новости - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ
export const NewsPage = () => {
  const [expandedNews, setExpandedNews] = useState({});
  const { adminData } = useAdmin();
  const { t, language } = useLanguage();
  const news = adminData?.news || siteData.news;

  const getFieldByLanguage = (item, fieldName) => {
    return item[`${fieldName}_${language}`] || item[`${fieldName}_ru`] || item[fieldName];
  };

  const toggleNewsExpanded = (newsId) => {
    setExpandedNews(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('newsAndEvents')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('newsDescription')} ({news.length} новостей)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основные новости */}
            <div className="lg:col-span-2 space-y-8">
              {news.map((newsItem, index) => (
                <motion.article
                  key={newsItem.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <p className="text-sm text-blue-600 mb-2">{newsItem.date}</p>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{getFieldByLanguage(newsItem, 'title')}</h2>
                      <p className="text-gray-600 mb-4">{getFieldByLanguage(newsItem, 'excerpt')}</p>
                      
                      {expandedNews[newsItem.id] && (
                        <div className="mb-4">
                          <p className="text-gray-700 mb-4">
                            {getFieldByLanguage(newsItem, 'content')}
                          </p>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => toggleNewsExpanded(newsItem.id)}
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                      >
                        {expandedNews[newsItem.id] ? t('collapse') : t('readFull')}
                        <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${expandedNews[newsItem.id] ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Боковая панель */}
            <div className="space-y-8">
              {/* Последние события */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('upcomingEvents')}</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-sm text-blue-600 mb-1">25 марта 2025</p>
                    <p className="text-gray-900 font-medium">Научная конференция по нейрохирургии</p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <p className="text-sm text-green-600 mb-1">30 марта 2025</p>
                    <p className="text-gray-900 font-medium">День открытых дверей</p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <p className="text-sm text-purple-600 mb-1">5 апреля 2025</p>
                    <p className="text-gray-900 font-medium">Мастер-класс по эндоскопии</p>
                  </div>
                </div>
              </motion.div>

              {/* Контакты */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-600 rounded-2xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4">{t('needConsultation')}</h3>
                <p className="mb-4">{t('consultationText')}</p>
                <Link
                  to="/appointment"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors block text-center"
                >
                  {t('scheduleAppointment')}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Контакты
export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { adminData } = useAdmin();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Имитация отправки
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('contactsTitle')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contactsDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Контактная информация */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('contactInfo')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1 text-left">{t('address')}</h3>
                      <p className="text-gray-600 text-left">
                        {adminData.siteSettings.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1 text-left">{t('phone')}</h3>
                      <div className="text-gray-600 text-left space-y-1">
                        {adminData.siteSettings.phones.map((phone, index) => (
                          <p key={index}>
                            {index === 0 && 'Приемная: '}
                            {index === 1 && 'Регистратура: '}
                            {index === 2 && 'Экстренная помощь: '}
                            {phone}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1 text-left">Email</h3>
                      <div className="text-gray-600 text-left space-y-1">
                        {adminData.siteSettings.emails.map((email, index) => (
                          <p key={index}>{email}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1 text-left">{t('workingHours')}</h3>
                      <div className="text-gray-600 text-left space-y-1">
                        <p>{t('mondayFriday')}: {adminData.siteSettings.workingHours.weekdays}</p>
                        <p>{t('saturday')}: {adminData.siteSettings.workingHours.saturday}</p>
                        <p>{t('sunday')}: {adminData.siteSettings.workingHours.sunday}</p>
                        <p className="text-red-600 font-medium">{t('emergencyHelp')}: 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Информация о вступлении в ассоциацию */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('associationMembership')}</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">{t('membershipRequirements')}</p>
                  
                  <ol className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                      <span>{t('membershipApplication')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                      <span>{t('membershipPayment')}</span>
                    </li>
                  </ol>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">{t('associationDetails')}</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><strong>{t('accountNumber')}:</strong> 20212000404984462001</p>
                      <p><strong>{t('bankName')}:</strong> Ташкентский городской филиал банка «Асака» (ОАЖ)</p>
                      <p><strong>{t('bankCode')}:</strong> 00416</p>
                      <p><strong>{t('taxNumber')}:</strong> 207146456</p>
                      <p><strong>{t('activityCode')}:</strong> 98500</p>
                      <p><strong>{t('payerName')}:</strong> Ф.И.О.</p>
                      <p><strong>{t('paymentPurpose')}:</strong> {t('membershipFee2025')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Форма обратной связи */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('writeToUs')}</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800">{t('messageSent')}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{t('sendError')}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('yourName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('enterName')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('enterEmail')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('enterPhone')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('message')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('enterMessage')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{t('sending')}</span>
                    </>
                  ) : (
                    <span>{t('sendMessage')}</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Карта с обновленными координатами */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('findUs')}</h2>
              <div className="relative">
                <iframe
                  src="https://yandex.uz/map-widget/v1/?ll=69.3827488%2C41.342462&mode=search&oid=1104106208&ol=biz&z=17"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  className="rounded-lg"
                  title="Республиканский Научный Центр Нейрохирургии на карте"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Центр нейрохирургии</p>
                      <p className="text-xs text-gray-600">ул. Хумоюн, 40</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Запись на прием - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ
export const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    department: '',
    doctor: '',
    doctorId: '',
    date: '',
    time: '',
    patient: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      birthDate: '',
      address: ''
    },
    complaint: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { adminData } = useAdmin();
  const { t } = useLanguage();
  const doctors = adminData?.doctors || siteData.doctors;

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!appointmentData.doctor) {
          newErrors.doctor = t('selectDoctor');
        }
        break;
      case 2:
        if (!appointmentData.date) {
          newErrors.date = t('selectDate');
        }
        if (!appointmentData.time) {
          newErrors.time = t('selectTime');
        }
        break;
      case 3:
        if (!appointmentData.patient.firstName) {
          newErrors.firstName = t('enterName');
        }
        if (!appointmentData.patient.lastName) {
          newErrors.lastName = t('enterSurname');
        }
        if (!appointmentData.patient.phone) {
          newErrors.phone = t('enterPhone');
        } else if (!/^\+998\s\d{2}\s\d{3}-\d{2}-\d{2}$/.test(appointmentData.patient.phone)) {
          newErrors.phone = t('invalidPhoneFormat');
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // Найдем врача по имени или ID
      const selectedDoctor = doctors.find(doc => 
        doc.id === appointmentData.doctorId || 
        (doc.name_ru || doc.name) === appointmentData.doctor
      );
      
      // Создаем объект записи
      const newAppointment = {
        id: Date.now(),
        doctorId: selectedDoctor?.id || appointmentData.doctorId,
        doctorName: appointmentData.doctor,
        date: appointmentData.date,
        time: appointmentData.time,
        patient: {
          name: `${appointmentData.patient.firstName} ${appointmentData.patient.lastName}`,
          phone: appointmentData.patient.phone,
          email: appointmentData.patient.email,
          age: appointmentData.patient.birthDate ? 
               new Date().getFullYear() - new Date(appointmentData.patient.birthDate).getFullYear() : null,
          complaint: appointmentData.complaint,
          address: appointmentData.patient.address
        },
        status: 'pending',
        type: 'consultation',
        createdAt: new Date().toISOString()
      };
      
      // Сохраняем запись в localStorage
      const existingAppointments = JSON.parse(localStorage.getItem('neuro_appointments') || '[]');
      existingAppointments.push(newAppointment);
      localStorage.setItem('neuro_appointments', JSON.stringify(existingAppointments));
      
      console.log('Запись сохранена:', newAppointment);
      
      // Здесь должен быть API запрос для сохранения в базе данных
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/appointments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAppointment)
        });
        
        if (response.ok) {
          console.log('Запись сохранена на сервере');
        }
      } catch (apiError) {
        console.log('API недоступен, данные сохранены локально');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(4);
    } catch (error) {
      console.error('Ошибка записи:', error);
      alert(t('submissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('appointment')}</h1>
            <p className="text-xl text-gray-600">
              Заполните форму для записи на консультацию к нашим специалистам
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                Выбор врача
              </span>
              <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                Дата и время
              </span>
              <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                Личные данные
              </span>
              <span className={`text-sm ${step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                Подтверждение
              </span>
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Выберите врача</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        appointmentData.doctor === (doctor.name_ru || doctor.name)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => {
                        setAppointmentData({
                          ...appointmentData,
                          doctor: doctor.name_ru || doctor.name,
                          doctorId: doctor.id,
                          department: doctor.department
                        });
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{doctor.name_ru || doctor.name}</h3>
                          <p className="text-blue-600 text-sm">{doctor.specialization_ru || doctor.specialization}</p>
                          <p className="text-gray-500 text-sm">{doctor.experience}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {errors.doctor && <p className="text-red-600 text-sm mt-2">{errors.doctor}</p>}
                
                <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Выберите дату и время</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setAppointmentData({...appointmentData, time})}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            appointmentData.time === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 hover:border-blue-500'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Личные данные</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        required
                        value={appointmentData.patient.firstName}
                        onChange={(e) => setAppointmentData({
                          ...appointmentData,
                          patient: {...appointmentData.patient, firstName: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите ваше имя"
                      />
                      {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        required
                        value={appointmentData.patient.lastName}
                        onChange={(e) => setAppointmentData({
                          ...appointmentData,
                          patient: {...appointmentData.patient, lastName: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Введите вашу фамилию"
                      />
                      {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        required
                        value={appointmentData.patient.phone}
                        onChange={(e) => setAppointmentData({
                          ...appointmentData,
                          patient: {...appointmentData.patient, phone: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+998 90 123-45-67"
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={appointmentData.patient.email}
                        onChange={(e) => setAppointmentData({
                          ...appointmentData,
                          patient: {...appointmentData.patient, email: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@mail.uz"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата рождения
                      </label>
                      <input
                        type="date"
                        value={appointmentData.patient.birthDate}
                        onChange={(e) => setAppointmentData({
                          ...appointmentData,
                          patient: {...appointmentData.patient, birthDate: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Адрес
                      </label>
                      <input
                        type="text"
                        value={appointmentData.patient.address}
                        onChange={(e) => setAppointmentData({
                          ...appointmentData,
                          patient: {...appointmentData.patient, address: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ваш адрес"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Жалобы и симптомы
                    </label>
                    <textarea
                      rows={4}
                      value={appointmentData.complaint}
                      onChange={(e) => setAppointmentData({...appointmentData, complaint: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Опишите ваши симптомы и жалобы подробно"
                    />
                  </div>

                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Записываем...</span>
                        </>
                      ) : (
                        <span>Записаться</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Запись успешно создана!</h2>
                <p className="text-gray-600 mb-6">
                  Ваша запись к врачу {appointmentData.doctor} на {appointmentData.date} в {appointmentData.time} успешно создана.
                  Мы свяжемся с вами для подтверждения.
                </p>
                <div className="space-y-4">
                  <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
                  >
                    На главную страницу
                  </Link>
                  <div>
                    <button
                      onClick={() => {
                        setStep(1);
                        setAppointmentData({
                          department: '',
                          doctor: '',
                          date: '',
                          time: '',
                          patient: {
                            firstName: '',
                            lastName: '',
                            phone: '',
                            email: '',
                            birthDate: '',
                            address: ''
                          },
                          complaint: ''
                        });
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Записаться еще раз
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};