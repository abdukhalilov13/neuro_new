import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Settings,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Shield,
  DollarSign,
  CheckCircle,
  CreditCard,
  Smartphone,
  Check,
  ArrowRight
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';
import { Header, Footer, ServiceCard } from './enhanced-components';
import { DoctorDashboard } from './doctor-admin-components';
import UnifiedAdminPanel from './unified-admin';

// Обновленные данные для сайта
const siteData = {
  hero: {
    doctorImage: "https://images.unsplash.com/photo-1638202993928-7267aad84c31",
    buildingImage: "https://i.postimg.cc/vZh6YwS0/thumb-show.jpg",
    phone: "+998 71 264-96-10",
    emergency: "+998 78 113-33-78"
  },
  
  statistics: [
    { number: "157", label: "Общих койко-мест", icon: Building },
    { number: "59", label: "Плановых мест", icon: Calendar },
    { number: "28", label: "Детских мест", icon: Heart },
    { number: "5000+", label: "Пациентов в год", icon: Users }
  ],

  departments: [
    {
      id: 1,
      name: "Сосудистая нейрохирургия",
      description: "Лечение сосудистых заболеваний головного и спинного мозга",
      icon: Activity,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Нейроонкология",
      description: "Хирургическое лечение опухолей нервной системы",
      icon: Brain,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      name: "Спинальная нейрохирургия",
      description: "Операции на позвоночнике и спинном мозге",
      icon: Shield,
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      name: "Детская нейрохирургия",
      description: "Специализированная помощь детям",
      icon: Heart,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      name: "Функциональная нейрохирургия",
      description: "Современные методы лечения двигательных расстройств",
      icon: Star,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: 6,
      name: "Эндоскопическая нейрохирургия",
      description: "Малоинвазивные операции с использованием эндоскопа",
      icon: Search,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      name: "Нейрореабилитация",
      description: "Восстановление функций нервной системы",
      icon: Award,
      color: "from-teal-500 to-teal-600"
    }
  ],

  doctors: [
    {
      id: 1,
      name: "Кариев Габрат Маратович",
      specialization: "Директор центра, нейрохирург высшей категории",
      experience: "Более 30 лет",
      image: "https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg",
      email: "director@neuro.uz",
      phone: "+998 71 264-96-10",
      reception: "Понедельник-Пятница, 9:00-17:00"
    },
    {
      id: 2,
      name: "Асадуллаев Улугбек Максудович",
      specialization: "Старший врач, специалист по сосудистой нейрохирургии",
      experience: "Более 15 лет",
      image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg",
      email: "asadullaev@neuro.uz",
      phone: "+998 71 264-96-15",
      reception: "Понедельник-Пятница, 8:00-16:00"
    },
    {
      id: 3,
      name: "Кодашев Равшан Муслимович",
      specialization: "Нейрохирург, специалист по детской нейрохирургии",
      experience: "Более 20 лет",
      image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807",
      email: "kodashev@neuro.uz",
      phone: "+998 71 264-96-09",
      reception: "Вторник-Суббота, 9:00-17:00"
    }
  ],

  news: [
    {
      id: 1,
      title: "Новые методы лечения опухолей головного мозга",
      date: "15 марта 2025",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      excerpt: "В центре внедрены инновационные технологии для точной диагностики и лечения новообразований мозга.",
      content: "Подробное описание новых методов..."
    },
    {
      id: 2,
      title: "Международная конференция по нейрохирургии",
      date: "10 марта 2025",
      image: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2",
      excerpt: "Специалисты центра приняли участие в престижной международной конференции.",
      content: "Отчет о конференции..."
    },
    {
      id: 3,
      title: "Успешная операция с применением робототехники",
      date: "5 марта 2025",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6",
      excerpt: "Проведена сложнейшая операция на позвоночнике с использованием роботизированной системы.",
      content: "Детали операции..."
    }
  ]
};




// Главная страница - ИСПОЛЬЗУЕМ ТОЛЬКО ДАННЫЕ ИЗ API
export const HomePage = () => {
  const { adminData, isLoading } = useAdmin();
  const { t, language } = useLanguage(); // Добавляем поддержку переводов
  
  // Используем ТОЛЬКО данные из API, без fallback на siteData
  const departments = adminData?.departments || [];
  const news = adminData?.news || [];
  const events = adminData?.events || [];

  // Отладочная информация для проверки изменения языка
  React.useEffect(() => {
    console.log('HomePage: Language changed to:', language);
  }, [language]);
  
  // Отладка данных админки
  React.useEffect(() => {
    console.log('HomePage adminData:', adminData);
    console.log('HomePage departments:', departments);
    console.log('HomePage adminData.departments:', adminData?.departments);
    console.log('HomePage siteData.departments:', siteData.departments);
  }, [adminData, departments]);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        {/* Индикатор текущего языка для отладки */}
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          Язык: {language.toUpperCase()}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка с текстом */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-gray-900">
                {t('centerName')}
              </h1>
              <p className="text-lg sm:text-xl lg:text-xl mb-3 text-blue-600">
                {t('leadingCenter')}
              </p>
              <p className="text-base sm:text-lg mb-6 text-gray-600">
                {t('yearsExperience')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointment"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center"
                >
                  {t('bookAppointment')}
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all text-center"
                >
                  {t('aboutCenter')}
                </Link>
              </div>
            </motion.div>

            {/* Правая колонка с фото */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src={siteData.hero.buildingImage}
                  alt="Здание центра нейрохирургии"
                  className="w-full h-80 lg:h-[420px] object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl"></div>
              </div>
              
              {/* Статистические карточки */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5000+</p>
                    <p className="text-sm text-gray-600">{t('patientsPerYear')}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">25+</p>
                    <p className="text-sm text-gray-600">{t('years')} {t('experience')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* Телефон */}
            <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('contactUs')}</p>
                <p className="font-semibold text-gray-900">{adminData?.siteSettings?.phones?.[0] || siteData.hero.phone}</p>
              </div>
            </div>

            {/* Адрес */}
            <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('address')}</p>
                <p className="font-semibold text-gray-900">ул. Хумоюн, 40</p>
              </div>
            </div>

            {/* Экстренная помощь */}
            <div className="bg-red-500 rounded-xl p-4 flex items-center space-x-3 shadow-lg text-white">
              <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-100">{t('emergency24')}</p>
                <p className="font-semibold">{adminData?.siteSettings?.phones?.[2] || siteData.hero.emergency}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('centerInNumbers')}</h2>
            <p className="text-xl text-gray-600">{t('factsAchievements')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">157</h3>
              <p className="text-gray-600">{t('totalBeds')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">59</h3>
              <p className="text-gray-600">{t('plannedPlaces')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">28</h3>
              <p className="text-gray-600">{t('childrenPlaces')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600">{t('patientsPerYear')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments Preview - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('ourDepartments')}</h2>
            <p className="text-xl text-gray-600">{t('specializedDivisions')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.slice(0, 6).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${dept.color || 'from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{dept.name_ru || dept.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{dept.description_ru || dept.description}</p>
                <Link
                  to="/departments"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  {t('learnMore')} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/departments"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              {t('allDepartments')}
            </Link>
          </div>
        </div>
      </section>

      {/* News Preview - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('latestNews')}</h2>
            <p className="text-xl text-gray-600">{t('centerEvents')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.slice(0, 3).map((newsItem, index) => (
              <motion.article
                key={newsItem.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 mb-2">{newsItem.date}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{newsItem.title_ru || newsItem.title}</h3>
                  <p className="text-gray-600 mb-4">{newsItem.excerpt_ru || newsItem.excerpt}</p>
                  <Link
                    to="/news"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    {t('readMore')} <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/news"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              {t('allNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section - ИСПОЛЬЗУЕМ ДАННЫЕ ИЗ АДМИНКИ */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('upcomingEvents')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events && events.length > 0 ? events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title_ru || event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description_ru || event.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.location_ru || event.location}</span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">{t('noEventsScheduled')}</p>
              </div>
            )}
          </div>

          {events && events.length > 3 && (
            <div className="text-center mt-8">
              <Link
                to="/events"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                {t('allEvents')}
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Экспорт всех компонентов
export { Header, Footer, siteData, DoctorDashboard, UnifiedAdminPanel };



// О центре
export const AboutPage = () => {
  const { t, language } = useLanguage(); // Добавляем поддержку переводов
  const { adminData } = useAdmin(); // Получаем данные из админ-панели
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const getFieldByLanguage = (item, fieldName) => {
    return item[`${fieldName}_${language}`] || item[`${fieldName}_ru`] || item[fieldName];
  };

  // Используем данные о руководстве из админ-панели
  const leadershipData = adminData?.leadership || [];
  
  // Отладочная информация
  console.log('AboutPage: adminData.leadership:', adminData?.leadership);
  console.log('AboutPage: leadershipData:', leadershipData);
  console.log('AboutPage: current language:', language);

  const openBioModal = (leader) => {
    setSelectedLeader(leader);
    setIsBioModalOpen(true);
  };

  const closeBioModal = () => {
    setSelectedLeader(null);
    setIsBioModalOpen(false);
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('aboutPageTitle')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('aboutPageSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/neuro-building.jpg"
                alt="Здание центра"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">{t('historyMission')}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t('aboutHistoryText1')}</p>
                <p>{t('aboutHistoryText2')}</p>
                <p>{t('aboutHistoryText3')}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('associationTasks')}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('task1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('task2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('task3')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('task4')}</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('yearFounded')}</h4>
                  <p className="text-2xl font-bold text-blue-600">1986</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">{t('patientsPerYear')}</h4>
                  <p className="text-2xl font-bold text-green-600">5000+</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Раздел руководства */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('centerLeadership')}</h2>
              <p className="text-xl text-gray-600">
                {t('experiencedSpecialists')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {leadershipData.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer min-h-[500px]"
                  onClick={() => openBioModal(leader)}
                >
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 ring-4 ring-blue-100 shadow-lg rounded-2xl overflow-hidden">
                      <img
                        src={leader.image}
                        alt={getFieldByLanguage(leader, 'name')}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {getFieldByLanguage(leader, 'name')}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4 text-lg">{getFieldByLanguage(leader, 'position')}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{leader.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{leader.email}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => openBioModal(leader)}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm flex items-center justify-center mx-auto space-x-2 transition-colors"
                    >
                      <span>{t('readBiography')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Модальное окно биографии */}
      {isBioModalOpen && selectedLeader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeBioModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button onClick={closeBioModal} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-lg z-10">
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img src={selectedLeader.image} alt={getFieldByLanguage(selectedLeader, 'name')} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{getFieldByLanguage(selectedLeader, 'name')}</h2>
                    <p className="text-lg text-blue-600 font-medium mb-3">{getFieldByLanguage(selectedLeader, 'position')}</p>
                    <div className="flex flex-col space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedLeader.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{selectedLeader.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('biography')}</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{getFieldByLanguage(selectedLeader, 'biography')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Секция консультации */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">{t('needConsultationQuestion')}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('consultationBlockText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/appointment"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                {t('scheduleConsultation')}
              </Link>
              <Link
                to="/contact"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors"
              >
                {t('contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};