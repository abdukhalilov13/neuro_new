import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Shield
} from 'lucide-react';

// Импортируем общие данные и компоненты
import { Header, Footer, siteData } from './components';

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
      birthDate: ''
    },
    complaint: ''
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ваша заявка принята! Мы свяжемся с вами для подтверждения записи.');
    setStep(4);
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
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
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
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!appointmentData.doctor}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium transition-colors"
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
                    onClick={() => setStep(3)}
                    disabled={!appointmentData.date || !appointmentData.time}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium transition-colors"
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
                      placeholder="+998 __ ___-__-__"
                    />
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Записаться на прием
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Заявка принята!</h2>
                <p className="text-gray-600 mb-6">
                  Мы получили вашу заявку на прием к врачу. Наш администратор свяжется с вами 
                  в ближайшее время для подтверждения записи.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Детали записи:</h3>
                  <p><strong>Врач:</strong> {appointmentData.doctor}</p>
                  <p><strong>Дата:</strong> {appointmentData.date}</p>
                  <p><strong>Время:</strong> {appointmentData.time}</p>
                  <p><strong>Пациент:</strong> {appointmentData.patient.firstName} {appointmentData.patient.lastName}</p>
                </div>
                <Link
                  to="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Вернуться на главную
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Кабинет врача - простая заглушка
export const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Кабинет врача</h1>
        <p className="text-gray-600 mb-8">Эта функция находится в разработке</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

// Админ панель - простая заглушка
export const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Админ панель</h1>
        <p className="text-gray-600 mb-8">Эта функция находится в разработке</p>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};