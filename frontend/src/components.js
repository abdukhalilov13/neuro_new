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
    buildingImage: "/images/neuro-building.jpg",
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
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Левая колонка с текстом */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900">
                Республиканский Научный Центр Нейрохирургии при Министерстве Здравоохранения Республики Узбекистан
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-4 text-blue-600">
                Ведущий центр нейрохирургии в Центральной Азии
              </p>
              <p className="text-base sm:text-lg mb-8 text-gray-600">
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
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all text-center"
                >
                  О центре
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
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
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
                    <p className="text-sm text-gray-600">Пациентов в год</p>
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
                    <p className="text-sm text-gray-600">Лет опыта</p>
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* Телефон */}
            <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Связаться с нами</p>
                <p className="font-semibold text-gray-900">{siteData.hero.phone}</p>
              </div>
            </div>

            {/* Адрес */}
            <div className="bg-white rounded-xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Адрес</p>
                <p className="font-semibold text-gray-900">ул. Хумоюн, 40</p>
              </div>
            </div>

            {/* Экстренная помощь */}
            <div className="bg-red-500 rounded-xl p-4 flex items-center space-x-3 shadow-lg text-white">
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
export const BiographyModal = ({ leader, isOpen, onClose }) => {
  if (!isOpen || !leader) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-lg z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h2>
                  <p className="text-lg text-blue-600 font-medium mb-3">{leader.position}</p>
                  <div className="flex flex-col space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{leader.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{leader.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Биография</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {leader.biography}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Данные руководства
export const leadershipData = [
  {
    id: 1,
    name: 'Кариев Габрат Маратович',
    position: 'Директор центра',
    image: 'https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg',
    email: 'director@neuro.uz',
    phone: '+998 71 264-96-10',
    biography: 'Габрат Маратович Кариев - выдающийся нейрохирург с более чем 30-летним опытом работы. Директор Республиканского Научного Центра Нейрохирургии с 2010 года. Доктор медицинских наук, профессор. Автор более 150 научных работ в области нейрохирургии. Член Всемирной Ассоциации нейрохирургов (WFNS). Под его руководством центр стал ведущим медицинским учреждением Центральной Азии в области нейрохирургии.'
  },
  {
    id: 2,
    name: 'Асадуллаев Улугбек Максудович',
    position: 'Заместитель директора по научной работе',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg',
    email: 'science@neuro.uz',
    phone: '+998 71 264-96-15',
    biography: 'Улугбек Максудович Асадуллаев - ведущий специалист в области сосудистой нейрохирургии. Кандидат медицинских наук, заместитель директора по научной работе. Стаж работы более 15 лет. Специализируется на микрохирургических операциях на сосудах головного мозга. Автор 85 научных публикаций, участник международных конференций по нейрохирургии.'
  },
  {
    id: 3,
    name: 'Кодашев Равшан Муслимович',
    position: 'Заместитель директора по клинической работе',
    image: 'https://images.unsplash.com/photo-1536064479547-7ee40b74b807',
    email: 'clinical@neuro.uz',
    phone: '+998 71 264-96-09',
    biography: 'Равшан Муслимович Кодашев - опытный детский нейрохирург, заместитель директора по клинической работе. Кандидат медицинских наук с 20-летним стажем. Специализируется на лечении врожденных пороков развития нервной системы у детей. Провел более 1500 успешных операций на детском мозге.'
  }
];

// Компонент модального окна для биографии
export const BiographyModal = ({ leader, isOpen, onClose }) => {
  if (!isOpen || !leader) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-lg z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h2>
                  <p className="text-lg text-blue-600 font-medium mb-3">{leader.position}</p>
                  <div className="flex flex-col space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{leader.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{leader.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Биография</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {leader.biography}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};



// О центре
export const AboutPage = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

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
              <h2 className="text-3xl font-bold text-gray-900">История и миссия</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  В 1986 году организовано Научное общество нейрохирургов, а в 1998 г. создана Ассоциация нейрохирургов Узбекистана, которая является также и членом Ассоциации нейрохирургов стран Тихоокеанского региона и Всемирной Ассоциации нейрохирургов (WFNS).
                </p>
                <p>
                  Общество сотрудничает с научными коллективами и отдельными учеными многих стран дальнего и ближнего зарубежья (США, Германия, Россия, Индия, Азербайджан, Украина, Белоруссия, Казахстан, Киргизия, Грузия, Таджикистан и др.).
                </p>
                <p>
                  Основными целями общества нейрохирургов являются: содействие реализации творческого потенциала членов Общества в интересах решения актуальных теоретических, практических и научных проблем в области нейрохирургии.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Задачи Ассоциации:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Осуществление мероприятий, направленных на повышение квалификации членов Ассоциации, практическая и (или) научная деятельность которых связана с нейрохирургией</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Содействие развитию приоритетных направлений научных исследований в области нейрохирургии</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Оказание научной и практической помощи членам Общества, молодым ученым и врачам, содействие совершенствованию системы медицинского образования и повышению профессиональной квалификации специалистов, развитию профессиональной, этической и деонтологической традиций в медицине</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Развитие сотрудничества с международными и национальными научными медицинскими обществами и ассоциациями</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Год основания</h4>
                  <p className="text-2xl font-bold text-blue-600">1986</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Пациентов в год</h4>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Руководство центра</h2>
              <p className="text-xl text-gray-600">
                Опытные специалисты, возглавляющие развитие нейрохирургии в республике
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipData.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => openBioModal(leader)}
                >
                  <div className="text-center">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">{leader.position}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{leader.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{leader.email}</span>
                      </div>
                    </div>
                    <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center mx-auto space-x-1">
                      <span>Читать биографию</span>
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
      <BiographyModal 
        leader={selectedLeader}
        isOpen={isBioModalOpen}
        onClose={closeBioModal}
      />

      <Footer />
    </div>
  );
};