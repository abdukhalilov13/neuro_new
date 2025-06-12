import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Header, Footer } from './enhanced-components';
import { siteData } from './components';
import { useAdmin } from './contexts';

export const NewsDetailPage = () => {
  const { id } = useParams();
  const { adminData } = useAdmin(); // Получаем данные из админ-панели
  
  // Используем данные из админ-панели или fallback данные
  const allNews = adminData?.news || siteData.news;
  const news = allNews.find(n => n.id === parseInt(id));

  if (!news) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Новость не найдена</h1>
          <Link to="/news" className="text-blue-600 hover:text-blue-700">
            Вернуться к новостям
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к новостям
            </Link>

            <article className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Пресс-служба центра</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {news.title}
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {news.excerpt}
                </p>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {news.content} Данное событие имеет большое значение для развития нейрохирургии 
                    в нашем регионе и позволит значительно улучшить качество медицинской помощи, 
                    предоставляемой пациентам.
                  </p>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Специалисты центра отмечают, что внедрение новых технологий и методов лечения 
                    является приоритетным направлением развития учреждения. Благодаря постоянному 
                    совершенствованию медицинских технологий удается достигать выдающихся результатов 
                    в лечении сложнейших заболеваний нервной системы.
                  </p>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    В рамках данной инициативы планируется проведение серии мероприятий, направленных 
                    на повышение квалификации медицинского персонала и внедрение передовых методик 
                    диагностики и лечения. Это позволит центру оставаться на переднем крае 
                    современной нейрохирургии.
                  </p>

                  <blockquote className="border-l-4 border-blue-600 pl-6 my-8 italic text-gray-700">
                    "Наша главная цель - предоставлять пациентам самую качественную медицинскую помощь, 
                    используя новейшие достижения науки и техники в области нейрохирургии."
                  </blockquote>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Коллектив центра продолжает активную работу по развитию международного сотрудничества 
                    с ведущими нейрохирургическими клиниками мира. Это обеспечивает постоянный обмен 
                    опытом и внедрение самых современных методов лечения.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    За дополнительной информацией вы можете обратиться в пресс-службу центра 
                    по телефону +998 71 264-96-10 или посетить наш официальный сайт. 
                    Мы всегда готовы ответить на ваши вопросы и предоставить актуальную 
                    информацию о наших достижениях.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-600">
                      <p>Опубликовано: {news.date}</p>
                      <p>Автор: Пресс-служба центра</p>
                    </div>
                    <Link
                      to="/appointment"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Записаться на прием
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Другие новости */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Другие новости</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteData.news
                  .filter(n => n.id !== parseInt(id))
                  .slice(0, 2)
                  .map((otherNews) => (
                    <Link
                      key={otherNews.id}
                      to={`/news/${otherNews.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={otherNews.image}
                        alt={otherNews.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <p className="text-sm text-blue-600 mb-1">{otherNews.date}</p>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {otherNews.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {otherNews.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};