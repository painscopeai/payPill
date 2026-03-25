import axios, { type AxiosInstance, type AxiosError } from 'axios';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (data: any) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
  updateProfile: (data: any) => apiClient.put('/auth/profile', data),
  changePassword: (data: any) => apiClient.put('/auth/password', data),
  logout: () => apiClient.post('/auth/logout'),
};

// User API
export const userAPI = {
  getDashboard: () => apiClient.get('/users/dashboard'),
  getStats: () => apiClient.get('/users/stats'),
  getHealthProfile: () => apiClient.get('/users/health-profile'),
  updateHealthProfile: (data: any) => apiClient.put('/users/health-profile', data),
  addCondition: (data: any) => apiClient.post('/users/health-profile/conditions', data),
  removeCondition: (id: string) => apiClient.delete(`/users/health-profile/conditions/${id}`),
  addMedication: (data: any) => apiClient.post('/users/health-profile/medications', data),
  removeMedication: (id: string) => apiClient.delete(`/users/health-profile/medications/${id}`),
  addEmergencyContact: (data: any) => apiClient.post('/users/health-profile/emergency-contacts', data),
  updateInsurance: (data: any) => apiClient.put('/users/health-profile/insurance', data),
};

// Provider API
export const providerAPI = {
  getProviders: (params?: any) => apiClient.get('/providers', { params }),
  getProvider: (id: string) => apiClient.get(`/providers/${id}`),
  getAvailability: (id: string, params?: any) => apiClient.get(`/providers/${id}/availability`, { params }),
  getSpecialties: () => apiClient.get('/providers/specialties'),
  searchProviders: (params?: any) => apiClient.get('/providers/search', { params }),
};

// Appointment API
export const appointmentAPI = {
  getAppointments: (params?: any) => apiClient.get('/appointments', { params }),
  getAppointment: (id: string) => apiClient.get(`/appointments/${id}`),
  createAppointment: (data: any) => apiClient.post('/appointments', data),
  updateAppointment: (id: string, data: any) => apiClient.put(`/appointments/${id}`, data),
  cancelAppointment: (id: string, reason?: string) => apiClient.put(`/appointments/${id}/cancel`, { reason }),
  rescheduleAppointment: (id: string, data: any) => apiClient.put(`/appointments/${id}/reschedule`, data),
  getUpcoming: (params?: any) => apiClient.get('/appointments/upcoming', { params }),
  getHistory: (params?: any) => apiClient.get('/appointments/history', { params }),
};

// Pharmacy API
export const pharmacyAPI = {
  getPharmacies: (params?: any) => apiClient.get('/pharmacies', { params }),
  getPharmacy: (id: string) => apiClient.get(`/pharmacies/${id}`),
  getNearby: (params?: any) => apiClient.get('/pharmacies/nearby', { params }),
  placeOrder: (id: string, data: any) => apiClient.post(`/pharmacies/${id}/order`, data),
  requestRefill: (id: string, data: any) => apiClient.post(`/pharmacies/${id}/refill`, data),
};

// Message API
export const messageAPI = {
  getMessages: (params?: any) => apiClient.get('/messages', { params }),
  getMessage: (id: string) => apiClient.get(`/messages/${id}`),
  sendMessage: (data: any) => apiClient.post('/messages', data),
  sendToProvider: (providerId: string, data: any) => apiClient.post(`/messages/to-provider/${providerId}`, data),
  markAsRead: (id: string) => apiClient.put(`/messages/${id}/read`),
  deleteMessage: (id: string) => apiClient.delete(`/messages/${id}`),
  getUnreadCount: () => apiClient.get('/messages/unread/count'),
};

// Notification API
export const notificationAPI = {
  getNotifications: (params?: any) => apiClient.get('/notifications', { params }),
  getNotification: (id: string) => apiClient.get(`/notifications/${id}`),
  markAsRead: (id: string) => apiClient.put(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.put('/notifications/read-all'),
  deleteNotification: (id: string) => apiClient.delete(`/notifications/${id}`),
  getUnreadCount: () => apiClient.get('/notifications/unread/count'),
};

// Medication API
export const medicationAPI = {
  getCurrent: () => apiClient.get('/medications/current'),
  getHistory: () => apiClient.get('/medications/history'),
  getOrders: (params?: any) => apiClient.get('/medications/orders', { params }),
  getOrder: (id: string) => apiClient.get(`/medications/orders/${id}`),
  getRefills: (params?: any) => apiClient.get('/medications/refills', { params }),
  requestRefill: (data: any) => apiClient.post('/medications/refills', data),
  cancelRefill: (id: string) => apiClient.put(`/medications/refills/${id}/cancel`),
  addMedication: (data: any) => apiClient.post('/medications', data),
  updateMedication: (id: string, data: any) => apiClient.put(`/medications/${id}`, data),
  removeMedication: (id: string) => apiClient.delete(`/medications/${id}`),
};

// AI API
export const aiAPI = {
  getRecommendations: (params?: any) => apiClient.get('/ai/recommendations', { params }),
  getRecommendation: (id: string) => apiClient.get(`/ai/recommendations/${id}`),
  dismissRecommendation: (id: string) => apiClient.put(`/ai/recommendations/${id}/dismiss`),
  getInsights: (params?: any) => apiClient.get('/ai/insights', { params }),
  getHealthSummary: () => apiClient.get('/ai/health-summary'),
  getRiskAssessment: () => apiClient.get('/ai/risk-assessment'),
  getSavings: () => apiClient.get('/ai/savings'),
  generateRecommendations: () => apiClient.post('/ai/generate-recommendations'),
};

export default apiClient;
