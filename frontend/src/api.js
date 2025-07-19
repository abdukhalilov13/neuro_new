const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

class ApiService {
  constructor() {
    // Ensure the baseURL ends with /api
    this.baseURL = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('API Request:', options.method || 'GET', url);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log('API Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      console.log('Response content-type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('API Response data:', result);
        return result;
      } else {
        // For DELETE operations or empty responses
        const text = await response.text();
        console.log('API Response text:', text);
        return text ? JSON.parse(text) : {};
      }
    } catch (error) {
      console.error('API request failed:', error);
      console.error('Request details:', options.method || 'GET', url, config);
      throw error;
    }
  }

  // Departments
  async getDepartments() {
    return this.request('/departments');
  }

  async getDepartment(id) {
    return this.request(`/departments/${id}`);
  }

  async createDepartment(data) {
    return this.request('/departments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDepartment(id, data) {
    return this.request(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDepartment(id) {
    return this.request(`/departments/${id}`, {
      method: 'DELETE',
    });
  }

  // Doctors
  async getDoctors() {
    return this.request('/doctors');
  }

  async getDoctor(id) {
    return this.request(`/doctors/${id}`);
  }

  async createDoctor(data) {
    return this.request('/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDoctor(id, data) {
    return this.request(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDoctor(id) {
    return this.request(`/doctors/${id}`, {
      method: 'DELETE',
    });
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  async getService(id) {
    return this.request(`/services/${id}`);
  }

  async createService(data) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id, data) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // News
  async getNews() {
    return this.request('/news');
  }

  async getNewsArticle(id) {
    return this.request(`/news/${id}`);
  }

  async createNews(data) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNews(id, data) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNews(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery
  async getGallery() {
    return this.request('/gallery');
  }

  async createGalleryImage(data) {
    return this.request('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGalleryImage(id, data) {
    return this.request(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryImage(id) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // Events
  async getEvents() {
    return this.request('/events');
  }

  async createEvent(data) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id, data) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Leadership
  async getLeadership() {
    return this.request('/leadership');
  }

  async createLeadership(data) {
    return this.request('/leadership', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLeadership(id, data) {
    return this.request(`/leadership/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLeadership(id) {
    return this.request(`/leadership/${id}`, {
      method: 'DELETE',
    });
  }

  // Users/Accounts
  async getUsers() {
    return this.request('/users');
  }

  async createUser(data) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Appointments
  async getAppointments(doctorId = null) {
    const url = doctorId ? `/appointments?doctor_id=${doctorId}` : '/appointments';
    return this.request(url);
  }

  async createAppointment(data) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAppointment(id, data) {
    return this.request(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAppointment(id) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // Users/Accounts
  async getUsers() {
    return this.request('/users');
  }

  async createUser(data) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async login(email, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Appointments
  async createAppointment(appointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async getAppointments() {
    return this.request('/appointments');
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;