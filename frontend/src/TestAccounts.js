import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Settings, Lock, ArrowRight } from 'lucide-react';
import { Header, Footer } from './enhanced-components';

export const TestAccountsPage = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Тестовые аккаунты</h1>
            <p className="text-xl text-gray-600">
              Для демонстрации функциональности сайта используйте следующие тестовые аккаунты
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Кабинет врача */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Кабинет врача</h2>
                  <p className="text-gray-600">Личный кабинет для врачей</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">Данные для входа:</span>
                  </div>
                  <p className="text-blue-800"><strong>Email:</strong> doctor@neuro.uz</p>
                  <p className="text-blue-800"><strong>Пароль:</strong> demo123</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Функциональность:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Управление записями пациентов</li>
                    <li>• База данных пациентов</li>
                    <li>• Статистика и аналитика</li>
                    <li>• Управление расписанием</li>
                  </ul>
                </div>
              </div>
              
              <Link
                to="/doctor-dashboard"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>Войти в кабинет врача</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Админ-панель */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-600"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Админ-панель</h2>
                  <p className="text-gray-600">Управление сайтом</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-900">Информация о доступе:</span>
                  </div>
                  <p className="text-purple-800">Доступ предоставляется администратором</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Функциональность:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Управление услугами и ценами</li>
                    <li>• Настройки контактов</li>
                    <li>• SEO настройки</li>
                    <li>• Управление галереей</li>
                    <li>• Аналитика сайта</li>
                  </ul>
                </div>
              </div>
              
              <Link
                to="/admin"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>Войти в админ-панель</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">📝 Важная информация</h3>
            <p className="text-yellow-700">
              Все данные в системе являются демонстрационными. 
              Изменения, внесенные в тестовые аккаунты, сохраняются только на время сессии.
            </p>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};