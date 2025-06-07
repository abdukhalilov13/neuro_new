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
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { useLanguage, useAdmin } from './contexts';

// Данные для сайта (теперь с многоязычностью)
const siteData = {
  hero: {
    doctorImage: "https://images.unsplash.com/photo-1638202993928-7267aad84c31",
    phone: "+998 71 264-96-10",
    emergency: "+998 78 113-33-78"
  },
  
  statistics: [
    { number: "157", icon: Building },
    { number: "59", icon: Calendar },
    { number: "28", icon: Heart },
    { number: "5000", icon: Users }
  ],

  departments: [
    {
      id: 1,
      nameKey: 'vascularNeurosurgery',
      descriptionKey: 'vascularNeurosurgeryDesc',
      icon: Activity,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      nameKey: 'neuroOncology',
      descriptionKey: 'neuroOncologyDesc',
      icon: Brain,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      nameKey: 'spinalNeurosurgery',
      descriptionKey: 'spinalNeurosurgeryDesc',
      icon: Shield,
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      nameKey: 'pediatricNeurosurgery',
      descriptionKey: 'pediatricNeurosurgeryDesc',
      icon: Heart,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      nameKey: 'functionalNeurosurgery',
      descriptionKey: 'functionalNeurosurgeryDesc',
      icon: Star,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: 6,
      nameKey: 'endoscopicNeurosurgery',
      descriptionKey: 'endoscopicNeurosurgeryDesc',
      icon: Search,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      nameKey: 'neurorehabilitation',
      descriptionKey: 'neurorehabilitationDesc',
      icon: Award,
      color: "from-teal-500 to-teal-600"
    }
  ],

  doctors: [
    {
      id: 1,
      nameKey: 'doctor1Name',
      specializationKey: 'doctor1Specialization',
      experience: "30+",
      image: "https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg",
      email: "director@neuro.uz",
      phone: "+998 71 264-96-10",
      receptionKey: 'weekdaysReception'
    },
    {
      id: 2,
      nameKey: 'doctor2Name',
      specializationKey: 'doctor2Specialization',
      experience: "15+",
      image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg",
      email: "asadullaev@neuro.uz",
      phone: "+998 71 264-96-15",
      receptionKey: 'weekdaysReception'
    },
    {
      id: 3,
      nameKey: 'doctor3Name',
      specializationKey: 'doctor3Specialization',
      experience: "20+",
      image: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807",
      email: "kodashev@neuro.uz",
      phone: "+998 71 264-96-09",
      receptionKey: 'tuesdaySaturdayReception'
    }
  ],

  news: [
    {
      id: 1,
      titleKey: 'news1Title',
      date: "15.03.2025",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      excerptKey: 'news1Excerpt',
      contentKey: 'news1Content'
    },
    {
      id: 2,
      titleKey: 'news2Title',
      date: "10.03.2025",
      image: "https://images.unsplash.com/photo-1526930382372-67bf22c0fce2",
      excerptKey: 'news2Excerpt',
      contentKey: 'news2Content'
    },
    {
      id: 3,
      titleKey: 'news3Title',
      date: "05.03.2025",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6",
      excerptKey: 'news3Excerpt',
      contentKey: 'news3Content'
    }
  ]
};

// Language Switcher Component
const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, availableLanguages, languageNames } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{languageNames[currentLanguage]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden z-50"
          >
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  currentLanguage === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Header with improved mobile responsiveness
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { adminData } = useAdmin();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('departments'), href: '/departments' },
    { name: t('doctors'), href: '/doctors' },
    { name: t('services'), href: '/services' },
    { name: t('news'), href: '/news' },
    { name: t('contacts'), href: '/contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      {/* Top bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{adminData.siteSettings.phones[0]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{adminData.siteSettings.emails[0]}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <LanguageSwitcher />
              <Link to="/appointment" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">
                {t('appointment')}
              </Link>
              <Link to="/doctor-dashboard" className="hover:text-blue-200 transition-colors text-sm">
                {t('doctorCabinet')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">NEURO.UZ</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{t('centerOfNeurosurgery')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group text-sm xl:text-base"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/appointment"
                className="block px-3 py-2 bg-blue-600 text-white rounded-md text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                {t('appointment')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Enhanced Footer with social media
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { adminData } = useAdmin();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О центре */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">NEURO.UZ</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {t('footerDescription')}
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href={adminData.siteSettings.socialMedia.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={adminData.siteSettings.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={adminData.siteSettings.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contacts')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {adminData.siteSettings.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">{adminData.siteSettings.phones[0]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">{adminData.siteSettings.emails[0]}</span>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('navigation')}</h4>
            <div className="space-y-2">
              {[
                { name: t('about'), href: '/about' },
                { name: t('departments'), href: '/departments' },
                { name: t('doctors'), href: '/doctors' },
                { name: t('services'), href: '/services' },
                { name: t('news'), href: '/news' },
                { name: t('contacts'), href: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-300 hover:text-blue-400 text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Режим работы */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('workingHours')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">{t('mondayFriday')}:</span>
                <span className="text-white">{adminData.siteSettings.workingHours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">{t('saturday')}:</span>
                <span className="text-white">{adminData.siteSettings.workingHours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">{t('sunday')}:</span>
                <span className="text-white">{adminData.siteSettings.workingHours.sunday}</span>
              </div>
              <div className="mt-4 p-3 bg-red-600 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('emergencyHelp')}</span>
                </div>
                <p className="text-sm mt-1">{adminData.siteSettings.phones[2]}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} {t('centerName')}. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Service Card Component with Price
const ServiceCard = ({ service, onEdit, onDelete, isAdmin = false }) => {
  const { t, currentLanguage } = useLanguage();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
            {service.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        </div>
        {isAdmin && (
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onEdit(service)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(service.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(service.price)} {t('sum')}
          </span>
        </div>
        <Link
          to="/appointment"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          {t('consultationBooking')}
        </Link>
      </div>
    </motion.div>
  );
};

// Экспорт компонентов
export { Header, Footer, ServiceCard, LanguageSwitcher, siteData };