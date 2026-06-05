import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authAPI, providerAPI, appointmentAPI, pharmacyAPI, messageAPI, notificationAPI, aiAPI } from '@/services/api';
import type { UserProfile, HealthcareProvider, Pharmacy, Appointment, Message, Notification, AIRecommendation, HealthInsight } from '@/types';

interface ApiContextType {
  // Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  
  // Data
  providers: HealthcareProvider[];
  pharmacies: Pharmacy[];
  appointments: Appointment[];
  messages: Message[];
  notifications: Notification[];
  recommendations: AIRecommendation[];
  healthInsights: HealthInsight[];
  
  // Actions
  fetchProviders: (params?: any) => Promise<void>;
  fetchPharmacies: (params?: any) => Promise<void>;
  fetchAppointments: () => Promise<void>;
  fetchMessages: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  fetchRecommendations: () => Promise<void>;
  
  // Appointment actions
  bookAppointment: (data: any) => Promise<void>;
  cancelAppointment: (id: string, reason?: string) => Promise<void>;
  
  // Message actions
  sendMessage: (data: any) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  
  // Notification actions
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  
  // AI actions
  dismissRecommendation: (id: string) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ children }: { children: ReactNode }) {
  // Auth state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data state
  const [providers, setProviders] = useState<HealthcareProvider[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [healthInsights, setHealthInsights] = useState<HealthInsight[]>([]);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response: any = await authAPI.getMe();
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Fetch initial data
        fetchAllData();
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchProviders(),
      fetchPharmacies(),
      fetchAppointments(),
      fetchMessages(),
      fetchNotifications(),
      fetchRecommendations(),
    ]);
  };

  // Auth actions
  const login = async (email: string, password: string) => {
    const response: any = await authAPI.login({ email, password });
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsAuthenticated(true);
      await fetchAllData();
    }
  };

  const register = async (data: any) => {
    const response: any = await authAPI.register(data);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setProviders([]);
    setPharmacies([]);
    setAppointments([]);
    setMessages([]);
    setNotifications([]);
    setRecommendations([]);
    setHealthInsights([]);
  };

  // Data fetching
  const fetchProviders = async (params?: any) => {
    try {
      const response: any = await providerAPI.getProviders(params);
      if (response.success) {
        setProviders(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error);
    }
  };

  const fetchPharmacies = async (params?: any) => {
    try {
      const response: any = await pharmacyAPI.getPharmacies(params);
      if (response.success) {
        setPharmacies(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch pharmacies:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response: any = await appointmentAPI.getAppointments();
      if (response.success) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response: any = await messageAPI.getMessages();
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response: any = await notificationAPI.getNotifications();
      if (response.success) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const [recResponse, insightsResponse] = await Promise.all([
        aiAPI.getRecommendations(),
        aiAPI.getInsights(),
      ]);
      if ((recResponse as any).success) {
        setRecommendations((recResponse as any).data);
      }
      if ((insightsResponse as any).success) {
        setHealthInsights((insightsResponse as any).data);
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    }
  };

  // Appointment actions
  const bookAppointment = async (data: any) => {
    const response: any = await appointmentAPI.createAppointment(data);
    if (response.success) {
      await fetchAppointments();
    }
  };

  const cancelAppointment = async (id: string, reason?: string) => {
    const response: any = await appointmentAPI.cancelAppointment(id, reason);
    if (response.success) {
      await fetchAppointments();
    }
  };

  // Message actions
  const sendMessage = async (data: any) => {
    const response: any = await messageAPI.sendMessage(data);
    if (response.success) {
      await fetchMessages();
    }
  };

  const markMessageRead = async (id: string) => {
    const response: any = await messageAPI.markAsRead(id);
    if (response.success) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    }
  };

  // Notification actions
  const markNotificationRead = async (id: string) => {
    const response: any = await notificationAPI.markAsRead(id);
    if (response.success) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const markAllNotificationsRead = async () => {
    const response: any = await notificationAPI.markAllAsRead();
    if (response.success) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  // AI actions
  const dismissRecommendation = async (id: string) => {
    const response: any = await aiAPI.dismissRecommendation(id);
    if (response.success) {
      setRecommendations(prev => prev.filter(r => r.id !== id));
    }
  };

  const value: ApiContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    providers,
    pharmacies,
    appointments,
    messages,
    notifications,
    recommendations,
    healthInsights,
    fetchProviders,
    fetchPharmacies,
    fetchAppointments,
    fetchMessages,
    fetchNotifications,
    fetchRecommendations,
    bookAppointment,
    cancelAppointment,
    sendMessage,
    markMessageRead,
    markNotificationRead,
    markAllNotificationsRead,
    dismissRecommendation,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
