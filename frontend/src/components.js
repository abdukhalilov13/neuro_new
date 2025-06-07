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
  Check
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';
import { Header, Footer, ServiceCard } from './enhanced-components';
import { DoctorDashboard, AdminPanel } from './doctor-admin-components';

// Обновленные данные для сайта
const siteData = {
  hero: {
    doctorImage: "https://images.unsplash.com/photo-1638202993928-7267aad84c31",
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




// Главная страница
export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10"></div>
          <img 
            src={siteData.hero.doctorImage}
            alt="Врач нейрохирург"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Республиканский Научный Центр Нейрохирургии при Министерстве Здравоохранения Республики Узбекистан
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-4 text-blue-100">
                Ведущий центр нейрохирургии в Центральной Азии
              </p>
              <p className="text-base sm:text-lg mb-8 text-blue-50">
                Более 25 лет опыта в лечении сложнейших заболеваний нервной системы
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointment"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center"
                >
                  Записаться на прием
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all text-center"
                >
                  О центре
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* Телефон */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Связаться с нами</p>
                <p className="font-semibold text-gray-900">{siteData.hero.phone}</p>
              </div>
            </div>

            {/* Адрес */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Адрес</p>
                <p className="font-semibold text-gray-900">ул. Хумоюн, 40</p>
              </div>
            </div>

            {/* Экстренная помощь */}
            <div className="bg-red-500/90 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3 shadow-lg text-white">
              <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-red-100">Экстренная помощь 24/7</p>
                <p className="font-semibold">{siteData.hero.emergency}</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Центр в цифрах</h2>
            <p className="text-xl text-gray-600">Факты и достижения нашего центра</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteData.statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши отделения</h2>
            <p className="text-xl text-gray-600">Специализированные подразделения центра</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.departments.slice(0, 6).map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <dept.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <Link
                  to="/departments"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  Подробнее <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/departments"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Все отделения
            </Link>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Последние новости</h2>
            <p className="text-xl text-gray-600">События и достижения центра</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.news.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 mb-2">{news.date}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h3>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <Link
                    to="/news"
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Читать далее <ChevronRight className="w-4 h-4 ml-1" />
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
              Все новости
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Экспорт всех компонентов
export { Header, Footer, siteData, DoctorDashboard, AdminPanel };

// О центре
export const AboutPage = () => {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">О центре</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Республиканский Научный Центр Нейрохирургии - ведущее медицинское учреждение 
              Центральной Азии в области нейрохирургии
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
                src="https://images.unsplash.com/photo-1490351267196-b7a67e26e41b"
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
              <h2 className="text-3xl font-bold text-gray-900">История и миссия</h2>
              <p className="text-gray-600 leading-relaxed">
                В 1997 году был основан Республиканский Научный Центр Нейрохирургии при 
                Министерстве Здравоохранения Республики Узбекистан. Центр был создан 
                профессором Маратом Хикматовичем Кариевым, выдающимся специалистом 
                в области здравоохранения страны.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Сегодня центр является ведущим учреждением нейрохирургии в регионе, 
                предоставляющим высококачественную медицинскую помощь пациентам из 
                Узбекистана и соседних стран.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Год основания</h4>
                  <p className="text-2xl font-bold text-blue-600">1997</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Пациентов в год</h4>
                  <p className="text-2xl font-bold text-green-600">5000+</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Отделения
export const DepartmentsPage = () => {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Отделения центра</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Семь специализированных отделений с передовыми технологиями и опытными специалистами
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {siteData.departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Основные услуги:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Диагностика и консультации</li>
                        <li>• Хирургическое лечение</li>
                        <li>• Послеоперационная реабилитация</li>
                        <li>• Амбулаторное наблюдение</li>
                      </ul>
                    </div>
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

// Врачи
export const DoctorsPage = () => {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Наши врачи</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Команда высококвалифицированных специалистов с многолетним опытом
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.doctors.map((doctor, index) => (
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{doctor.specialization}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{doctor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{doctor.reception}</span>
                    </div>
                  </div>

                  <Link
                    to="/appointment"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block"
                  >
                    Записаться на прием
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

// Услуги
export const ServicesPage = () => {
  const { adminData } = useAdmin();
  const { t } = useLanguage();

  // Группируем услуги по категориям
  const servicesByCategory = adminData.services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Наши услуги</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр медицинских услуг в области нейрохирургии с прозрачным ценообразованием
            </p>
          </motion.div>

          {/* Услуги по категориям */}
          <div className="space-y-16">
            {Object.entries(servicesByCategory).map(([category, services], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isAdmin={false}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Дополнительная информация */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Принципы ценообразования</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Прозрачная система цен без скрытых доплат</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Индивидуальный подход к каждому пациенту</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Возможность рассрочки платежа</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Бесплатные повторные консультации в течение месяца</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Способы оплаты</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Наличные</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Банковская карта</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Мобильные платежи</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <Building className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Банковский перевод</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Нужна консультация по услугам?</h3>
            <p className="text-gray-600 mb-6">
              Наши специалисты ответят на все ваши вопросы и помогут выбрать оптимальное лечение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/appointment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Записаться на консультацию
              </Link>
              <Link
                to="/contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Новости
export const NewsPage = () => {
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Новости и события</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Последние новости, достижения и события нашего центра
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основные новости */}
            <div className="lg:col-span-2 space-y-8">
              {siteData.news.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <p className="text-sm text-blue-600 mb-2">{news.date}</p>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{news.title}</h2>
                      <p className="text-gray-600 mb-4">{news.excerpt}</p>
                      <p className="text-gray-700 mb-4">{news.content}</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Читать полностью
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ближайшие события</h3>
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
                <h3 className="text-xl font-bold mb-4">Нужна консультация?</h3>
                <p className="mb-4">Свяжитесь с нами для получения профессиональной медицинской помощи</p>
                <Link
                  to="/appointment"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors block text-center"
                >
                  Записаться на прием
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Контакты</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Свяжитесь с нами для получения консультации или записи на прием
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                      <p className="text-gray-600">
                        ул. Хумоюн, 40, Мирзо-Улугбекский район,<br />
                        г. Ташкент, 100142, Республика Узбекистан
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Телефоны</h3>
                      <p className="text-gray-600">
                        Приемная: +998 71 264-96-10<br />
                        Регистратура: +998 71 264-96-09<br />
                        Экстренная помощь: +998 78 113-33-78
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">
                        admin@neuro.uz<br />
                        info@neuro.uz
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Режим работы</h3>
                      <p className="text-gray-600">
                        Понедельник - Пятница: 8:00 - 18:00<br />
                        Суббота: 9:00 - 15:00<br />
                        Воскресенье: Выходной<br />
                        <span className="text-red-600 font-medium">Экстренная помощь: 24/7</span>
                      </p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Написать нам</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800">Сообщение успешно отправлено!</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">Произошла ошибка. Попробуйте еще раз.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите ваше имя"
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
                    placeholder="Введите ваш email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+998 __ ___-__-__"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите ваше сообщение"
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
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <span>Отправить сообщение</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Карта */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Как нас найти</h2>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Интерактивная карта</p>
                  <p className="text-sm text-gray-500 mt-1">ул. Хумоюн, 40, Ташкент</p>
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

// Запись на прием
export const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!appointmentData.doctor) {
          newErrors.doctor = 'Выберите врача';
        }
        break;
      case 2:
        if (!appointmentData.date) {
          newErrors.date = 'Выберите дату';
        }
        if (!appointmentData.time) {
          newErrors.time = 'Выберите время';
        }
        break;
      case 3:
        if (!appointmentData.patient.firstName) {
          newErrors.firstName = 'Введите имя';
        }
        if (!appointmentData.patient.lastName) {
          newErrors.lastName = 'Введите фамилию';
        }
        if (!appointmentData.patient.phone) {
          newErrors.phone = 'Введите телефон';
        } else if (!/^\+998\s\d{2}\s\d{3}-\d{2}-\d{2}$/.test(appointmentData.patient.phone)) {
          newErrors.phone = 'Неверный формат телефона';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(4);
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
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
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Запись на прием</h1>
            <p className="text-xl text-gray-600">
              Выберите удобное время для консультации с нашими специалистами
            </p>
          </motion.div>

          {/* Прогресс-бар */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2 text-sm text-gray-600">
              <div className="grid grid-cols-3 gap-8 text-center">
                <span>Выбор врача</span>
                <span>Дата и время</span>
                <span>Личные данные</span>
              </div>
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Выберите врача</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Врач
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {siteData.doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => setAppointmentData({...appointmentData, doctor: doctor.name})}
                          className={`p-4 text-left border-2 rounded-lg transition-colors ${
                            appointmentData.doctor === doctor.name
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                              <p className="text-sm text-gray-600">{doctor.specialization}</p>
                              <p className="text-xs text-blue-600">{doctor.experience}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.doctor && <p className="text-red-600 text-sm mt-2">{errors.doctor}</p>}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Далее
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Выберите дату и время</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Дата приема
                    </label>
                    <input
                      type="date"
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.date && <p className="text-red-600 text-sm mt-2">{errors.date}</p>}
                  </div>

                  {appointmentData.date && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Время приема
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setAppointmentData({...appointmentData, time})}
                            className={`p-3 text-center border-2 rounded-lg transition-colors ${
                              appointmentData.time === time
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-600 text-sm mt-2">{errors.time}</p>}
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Личные данные</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                  </div>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Жалобы и симптомы
                  </label>
                  <textarea
                    rows={4}
                    value={appointmentData.complaint}
                    onChange={(e) => setAppointmentData({...appointmentData, complaint: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Опишите ваши жалобы и симптомы"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <span>Записаться на прием</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Заявка принята!</h2>
                <p className="text-gray-600 mb-6">
                  Мы получили вашу заявку на прием к врачу. Наш администратор свяжется с вами 
                  в ближайшее время для подтверждения записи.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Детали записи:</h3>
                  <div className="text-left space-y-2">
                    <p><strong>Врач:</strong> {appointmentData.doctor}</p>
                    <p><strong>Дата:</strong> {new Date(appointmentData.date).toLocaleDateString('ru-RU')}</p>
                    <p><strong>Время:</strong> {appointmentData.time}</p>
                    <p><strong>Пациент:</strong> {appointmentData.patient.firstName} {appointmentData.patient.lastName}</p>
                    <p><strong>Телефон:</strong> {appointmentData.patient.phone}</p>
                    {appointmentData.patient.email && <p><strong>Email:</strong> {appointmentData.patient.email}</p>}
                    {appointmentData.complaint && <p><strong>Жалобы:</strong> {appointmentData.complaint}</p>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    Вернуться на главную
                  </Link>
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
                      setErrors({});
                    }}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    Записать еще раз
                  </button>
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