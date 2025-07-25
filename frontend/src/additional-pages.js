import React from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from './enhanced-components';
import { useLanguage, useAdmin } from './contexts';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Mail, Phone, MapPin, Clock, Users, Settings, Award,
  Calendar, ArrowRight, Filter, Search
} from 'lucide-react';

// Страница вакансий
export const VacanciesPage = () => {
  const { t } = useLanguage();
  
  const vacancies = [
    {
      id: 1,
      title: t('neurosurgeon'),
      department: t('neurosurgeryFullTime'),
      requirements: [
        t('higherMedicalEducation'),
        t('neurosurgerySpecialization'),
        t('experienceFrom3Years')
      ]
    },
    {
      id: 2,
      title: t('operatingRoomNurse'),
      department: t('operatingBlockFullTime'),
      requirements: [
        t('secondaryMedicalEducation'),
        t('operatingNurseCertificate'),
        t('experienceFrom1Year')
      ]
    },
    {
      id: 3,
      title: t('anesthesiologist'),
      department: t('anesthesiologyFullTime'),
      requirements: [
        t('higherMedicalEducation'),
        t('anesthesiologySpecialization'),
        t('experienceFrom2Years')
      ]
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: t('professionalTeam'),
      description: t('workWithBestSpecialists')
    },
    {
      icon: Settings,
      title: t('modernEquipment'),
      description: t('latestTechnologies')
    },
    {
      icon: Award,
      title: t('decentSalary'),
      description: t('competitiveSalary')
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('careers')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100"
          >
            {t('joinProfessionalTeam')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-8">
            {vacancies.map((vacancy, index) => (
              <motion.div
                key={vacancy.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{vacancy.title}</h3>
                    <p className="text-blue-600 font-medium">{vacancy.department}</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t('detailsAndApply')}
                  </button>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('mainRequirements')}</h4>
                  <ul className="space-y-2">
                    {vacancy.requirements.map((requirement, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyWorkWithUs')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{t('noSuitableVacancy')}</h2>
            <p className="text-xl mb-8 text-blue-100">{t('sendResume')}</p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>admin@neuro.uz</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>{t('hrDepartment')}: +998 71 264 96 22</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Страница галереи с переводами
export const GalleryPage = () => {
  const { t } = useLanguage();
  const { adminData } = useAdmin();
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const galleryImages = adminData?.galleryImages || [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      category: "building",
      alt: "Операционная"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      category: "equipment", 
      alt: "Медицинское оборудование"
    }
  ];

  const categories = [
    { id: 'all', name: t('allPhotos') },
    { id: 'building', name: t('centerBuilding') },
    { id: 'equipment', name: t('equipment') },
    { id: 'staff', name: t('staff') },
    { id: 'surgery', name: t('operatingRooms') },
    { id: 'patients', name: t('patients') }
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('gallery')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100"
          >
            {t('centerPhotosDescription')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">{image.alt}</p>
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

// Консультация секция для добавления на другие страницы
export const ConsultationSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">{t('needConsultation')}</h2>
          <p className="text-xl mb-8 text-blue-100">{t('specialistsWillAnswer')}</p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/appointment"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              {t('bookConsultation')}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              {t('contactUs')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};