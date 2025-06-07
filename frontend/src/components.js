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
      content: "Подробное описание новых методов диагностики и лечения опухолей головного мозга с использованием современного оборудования."
    },
    {
      id: 2,
      title: "Международная конференция по нейрохирургии",
      date: "10 марта 2025",
      image: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2",
      excerpt: "Специалисты центра приняли участие в престижной международной конференции.",
      content: "Отчет о международной конференции по нейрохирургии и представленных там новых технологиях."
    },
    {
      id: 3,
      title: "Успешная операция с применением робототехники",
      date: "5 марта 2025",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6",
      excerpt: "Проведена сложнейшая операция на позвоночнике с использованием роботизированной системы.",
      content: "Детали успешной операции с применением роботизированных технологий в нейрохирургии."
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
            src="https://images.unsplash.com/photo-1476889155166-39ae3886a3ef"
            alt="Здание центра нейрохирургии"
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
      </section>

      {/* Раздел Руководство */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Руководство центра</h2>
            <p className="text-xl text-gray-600">
              Опытные специалисты, возглавляющие наш медицинский центр
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Директор */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <img
                src="https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg"
                alt="Директор центра"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Кариев Габрат Маратович</h3>
              <p className="text-blue-600 font-medium mb-3">Директор центра</p>
              <p className="text-gray-600 text-sm mb-4">
                Доктор медицинских наук, профессор, нейрохирург высшей категории. 
                Более 30 лет опыта в нейрохирургии.
              </p>
              <div className="text-sm text-gray-500">
                <p>Прием: Пн-Пт, 9:00-17:00</p>
                <p>+998 71 264-96-10</p>
              </div>
            </motion.div>

            {/* Заместитель директора */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <img
                src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg"
                alt="Заместитель директора"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Асадуллаев Улугбек Максудович</h3>
              <p className="text-green-600 font-medium mb-3">Заместитель директора по науке</p>
              <p className="text-gray-600 text-sm mb-4">
                Кандидат медицинских наук, специалист по сосудистой нейрохирургии. 
                Более 15 лет опыта в области нейрохирургии.
              </p>
              <div className="text-sm text-gray-500">
                <p>Прием: Пн-Пт, 8:00-16:00</p>
                <p>+998 71 264-96-15</p>
              </div>
            </motion.div>

            {/* Главный врач */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <img
                src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807"
                alt="Главный врач"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Кодашев Равшан Муслимович</h3>
              <p className="text-purple-600 font-medium mb-3">Главный врач</p>
              <p className="text-gray-600 text-sm mb-4">
                Врач высшей категории, специалист по детской нейрохирургии. 
                Более 20 лет опыта работы с детьми.
              </p>
              <div className="text-sm text-gray-500">
                <p>Прием: Вт-Сб, 9:00-17:00</p>
                <p>+998 71 264-96-09</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
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
      <section className="py-16 bg-gray-50">
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
      <section className="py-16 bg-white">
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
                    to={`/news/${news.id}`}
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
                src="https://images.unsplash.com/photo-1476889155166-39ae3886a3ef"
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
                В 1986 году организовано Научное общество нейрохирургов, а в 1998 г. создана Ассоциация нейрохирургов Узбекистана, которая является также и членом Ассоциации нейрохирургов стран Тихоокеанского региона и Всемирной Ассоциации нейрохирургов (WFNS). Общество сотрудничает с научными коллективами и отдельными учеными многих стран дальнего и ближнего зарубежья (США, Германия, Россия, Индия, Азербайджан, Украина, Белоруссия, Казахстан, Киргизия, Грузия, Таджикистан и др.).
              </p>
              <p className="text-gray-600 leading-relaxed">
                Основными целями общества нейрохирургов являются: содействие реализации творческого потенциала членов Общества в интересах решения актуальных теоретических, практических и научных проблем в области нейрохирургии. Для достижения целей Ассоциация решает следующие задачи: — осуществление мероприятий, направленных на повышение квалификации членов Ассоциации, практическая и (или) научная деятельность которых связана с нейрохирургией; — содействие развитию приоритетных направлений научных исследований в области нейрохирургии; — оказание научной и практической помощи членам Общества, молодым ученым и врачам, содействие совершенствованию системы медицинского образования и повышению профессиональной квалификации специалистов, развитию профессиональной, этической и деонтологической традиций в медицине; — развитие сотрудничества с международными и национальными научными медицинскими обществами и ассоциациями.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Год основания</h4>
                  <p className="text-2xl font-bold text-blue-600">1998</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Пациентов в год</h4>
                  <p className="text-2xl font-bold text-green-600">5000+</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Раздел Руководство */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Руководство центра</h2>
              <p className="text-xl text-gray-600">
                Опытные специалисты, возглавляющие наш медицинский центр
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Директор */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <img
                  src="https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg"
                  alt="Директор центра"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Кариев Габрат Маратович</h3>
                <p className="text-blue-600 font-medium mb-3">Директор центра</p>
                <p className="text-gray-600 text-sm mb-4">
                  Доктор медицинских наук, профессор, нейрохирург высшей категории. 
                  Более 30 лет опыта в нейрохирургии.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Прием: Пн-Пт, 9:00-17:00</p>
                  <p>+998 71 264-96-10</p>
                </div>
              </motion.div>

              {/* Заместитель директора */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <img
                  src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg"
                  alt="Заместитель директора"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Асадуллаев Улугбек Максудович</h3>
                <p className="text-green-600 font-medium mb-3">Заместитель директора по науке</p>
                <p className="text-gray-600 text-sm mb-4">
                  Кандидат медицинских наук, специалист по сосудистой нейрохирургии. 
                  Более 15 лет опыта в области нейрохирургии.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Прием: Пн-Пт, 8:00-16:00</p>
                  <p>+998 71 264-96-15</p>
                </div>
              </motion.div>

              {/* Главный врач */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807"
                  alt="Главный врач"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Кодашев Равшан Муслимович</h3>
                <p className="text-purple-600 font-medium mb-3">Главный врач</p>
                <p className="text-gray-600 text-sm mb-4">
                  Врач высшей категории, специалист по детской нейрохирургии. 
                  Более 20 лет опыта работы с детьми.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Прием: Вт-Сб, 9:00-17:00</p>
                  <p>+998 71 264-96-09</p>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Экспорт всех компонентов
export { Header, Footer, siteData, DoctorDashboard, AdminPanel };