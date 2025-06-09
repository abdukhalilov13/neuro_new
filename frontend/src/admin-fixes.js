import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Search,
  Filter,
  Download,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Building,
  UserCheck,
  BookOpen,
  ImageIcon,
  Shield,
  Activity,
  Brain,
  Award,
  Heart,
  Star,
  RefreshCw,
  FileText,
  Check
} from 'lucide-react';

// Данные руководства
const [leadership, setLeadership] = useState([
  {
    id: 1,
    name: 'Кариев Габрат Маратович',
    position: 'Директор центра',
    image: 'https://images.pexels.com/photos/8460374/pexels-photo-8460374.jpeg',
    phone: '+998 71 264-96-10',
    email: 'director@neuro.uz',
    biography: 'Заслуженный врач Республики Узбекистан, доктор медицинских наук'
  },
  {
    id: 2,
    name: 'Асадуллаев Улугбек Максудович',
    position: 'Заместитель директора по научной работе',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg',
    phone: '+998 71 264-96-15',
    email: 'asadullaev@neuro.uz',
    biography: 'Кандидат медицинских наук, старший научный сотрудник'
  }
]);

const [newLeadership, setNewLeadership] = useState({
  name: '',
  position: '',
  image: '',
  phone: '',
  email: '',
  biography: ''
});

// Функции для управления руководством
const handleLeadershipSubmit = (e) => {
  e.preventDefault();
  if (editingLeadership) {
    setLeadership(leadership.map(leader => 
      leader.id === editingLeadership.id ? { ...newLeadership, id: editingLeadership.id } : leader
    ));
    setEditingLeadership(null);
  } else {
    const newId = Math.max(...leadership.map(l => l.id)) + 1;
    setLeadership([...leadership, { ...newLeadership, id: newId }]);
  }
  setNewLeadership({ name: '', position: '', image: '', phone: '', email: '', biography: '' });
  setIsLeadershipModalOpen(false);
};

const startEditLeadership = (leader) => {
  setEditingLeadership(leader);
  setNewLeadership({
    name: leader.name,
    position: leader.position,
    image: leader.image,
    phone: leader.phone,
    email: leader.email,
    biography: leader.biography
  });
  setIsLeadershipModalOpen(true);
};

const deleteLeadership = (id) => {
  if (window.confirm('Вы уверены, что хотите удалить этого руководителя?')) {
    setLeadership(leadership.filter(leader => leader.id !== id));
  }
};

// Улучшенная функция добавления изображений в галерею
const addGalleryImage = () => {
  const newImageUrl = prompt('Введите URL нового изображения:');
  const newImageAlt = prompt('Введите описание изображения:');
  
  if (newImageUrl && newImageAlt) {
    const newId = Math.max(...galleryImages.map(img => img.id)) + 1;
    setGalleryImages([...galleryImages, {
      id: newId,
      url: newImageUrl,
      alt: newImageAlt,
      category: 'general'
    }]);
    alert('Изображение добавлено в галерею!');
  }
};

const updateGalleryImage = (id, updates) => {
  setGalleryImages(galleryImages.map(img => 
    img.id === id ? { ...img, ...updates } : img
  ));
};

// Система последних действий
const [recentActions, setRecentActions] = useState([
  {
    id: 1,
    action: 'Добавлена новость',
    details: 'Новые методы лечения опухолей головного мозга',
    timestamp: new Date().toLocaleString('ru-RU'),
    type: 'news',
    icon: 'plus'
  },
  {
    id: 2,
    action: 'Обновлен врач',
    details: 'Кариев Габрат Маратович',
    timestamp: new Date(Date.now() - 3600000).toLocaleString('ru-RU'),
    type: 'doctor',
    icon: 'edit'
  },
  {
    id: 3,
    action: 'Создан аккаунт',
    details: 'doctor.new@neuro.uz',
    timestamp: new Date(Date.now() - 7200000).toLocaleString('ru-RU'),
    type: 'account',
    icon: 'user'
  }
]);

const addRecentAction = (action, details, type) => {
  const newAction = {
    id: Date.now(),
    action,
    details,
    timestamp: new Date().toLocaleString('ru-RU'),
    type,
    icon: type === 'news' ? 'plus' : type === 'doctor' ? 'edit' : 'user'
  };
  setRecentActions([newAction, ...recentActions.slice(0, 9)]);
};

// Исправленная аналитика
const getAnalytics = () => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  
  return {
    totalServices: adminData.services?.length || 25,
    todayAppointments: mockAppointments.filter(apt => 
      apt.date === today.toISOString().split('T')[0]
    ).length,
    activeDoctors: doctors.filter(doc => doc.status !== 'inactive').length,
    totalDepartments: departments.length,
    monthlyAppointments: mockAppointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getMonth() === thisMonth && aptDate.getFullYear() === thisYear;
    }).length,
    siteViews: 1247 + Math.floor(Math.random() * 100),
    averageRating: 4.8,
    completedTreatments: 156 + Math.floor(Math.random() * 10)
  };
};

export { 
  leadership, 
  setLeadership, 
  newLeadership, 
  setNewLeadership,
  handleLeadershipSubmit,
  startEditLeadership,
  deleteLeadership,
  addGalleryImage,
  updateGalleryImage,
  recentActions,
  addRecentAction,
  getAnalytics
};