import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { 
  AppState, 
  UserProfile, 
  HealthCondition, 
  Medication, 
  Insurance, 
  AIRecommendation
} from '@/types';
import {
  mockProviders,
  mockPharmacies,
  generatePersonalizedRecommendations,
  generateRecommendationsFromHealthProfile,
  generateAIHealthInsights,
  generateRiskAssessment,
  generateFollowUpTasks
} from '@/data/mockData';

// Health Profile Data Type
export interface HealthProfileData {
  age: string;
  gender: string;
  genderOther?: string;
  location: string;
  hasSymptoms: boolean;
  symptoms: string[];
  symptomOther?: string;
  symptomDuration: string;
  symptomSeverity: string;
  hasConditions: boolean;
  conditions: string[];
  conditionOther?: string;
  surgeries: string;
  allergies: string[];
  allergyOther?: string;
  familyHistory: string[];
  familyHistoryOther?: string;
  exerciseFrequency: string;
  sleepHours: string;
  dietType: string;
  smokingStatus: string;
  alcoholConsumption: string;
  stressLevel: string;
  mentalHealthConcerns: string[];
  mentalHealthOther?: string;
  takesMedications: boolean;
  medications: string[];
  medicationOther?: string;
  supplements: string[];
  supplementOther?: string;
  hasInsurance: boolean;
  insuranceType: string;
  insuranceProvider: string;
  hasPrimaryCare: boolean;
  lastCheckup: string;
  preferredCareType: string[];
  healthGoals: string[];
  goalOther?: string;
  priorityAreas: string[];
}

type Action =
  | { type: 'SET_VIEW'; payload: AppState['currentView'] }
  | { type: 'SET_ONBOARDING_STEP'; payload: number }
  | { type: 'SET_USER'; payload: UserProfile | null }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> }
  | { type: 'ADD_CONDITION'; payload: HealthCondition }
  | { type: 'REMOVE_CONDITION'; payload: string }
  | { type: 'ADD_MEDICATION'; payload: Medication }
  | { type: 'REMOVE_MEDICATION'; payload: string }
  | { type: 'SET_INSURANCE'; payload: Insurance | null }
  | { type: 'DISMISS_RECOMMENDATION'; payload: string }
  | { type: 'SET_RECOMMENDATIONS'; payload: AIRecommendation[] }
  | { type: 'SET_QUALIFICATION_ANSWERS'; payload: QualificationAnswers }
  | { type: 'SET_HEALTH_PROFILE'; payload: HealthProfileData }
  | { type: 'SET_AUTH_STATE'; payload: { isAuthenticated: boolean; user: UserProfile | null } }
  | { type: 'ADD_MESSAGE'; payload: any }
  | { type: 'MARK_MESSAGE_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: any }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'BOOK_APPOINTMENT'; payload: any }
  | { type: 'CANCEL_APPOINTMENT'; payload: string }
  | { type: 'PLACE_MEDICATION_ORDER'; payload: any }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: string } }
  | { type: 'REQUEST_REFILL'; payload: { medicationId: string; pharmacyId: string } }
  | { type: 'SET_HEALTH_INSIGHTS'; payload: any[] }
  | { type: 'SET_RISK_ASSESSMENT'; payload: any }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'RESET_STATE' };

// Qualification answers type
export interface QualificationAnswers {
  hasInsurance: boolean;
  insuranceCarrier?: string;
  takesMedications: boolean;
  medications?: string[];
  hasChronicCondition: boolean;
  conditions?: string[];
  lookingFor: 'savings' | 'providers' | 'both';
}

const initialState: AppState = {
  currentView: 'landing',
  onboardingStep: 0,
  user: null,
  healthConditions: [],
  medications: [],
  allergies: [],
  insurance: null,
  providers: mockProviders,
  pharmacies: mockPharmacies,
  emergencyContacts: [],
  recommendations: [],
  healthInsights: [],
  riskAssessment: null,
  followUpTasks: [],
  timeline: [],
  auditLogs: [],
  isAuthenticated: false,
  qualificationAnswers: null,
  healthProfile: null,
  // New features
  messages: [],
  notifications: [],
  appointments: [],
  medicationOrders: [],
  refillRequests: [],
  unreadMessageCount: 0,
  unreadNotificationCount: 0
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_ONBOARDING_STEP':
      return { ...state, onboardingStep: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
    case 'ADD_CONDITION':
      return { ...state, healthConditions: [...state.healthConditions, action.payload] };
    case 'REMOVE_CONDITION':
      return { ...state, healthConditions: state.healthConditions.filter(c => c.id !== action.payload) };
    case 'ADD_MEDICATION':
      return { ...state, medications: [...state.medications, action.payload] };
    case 'REMOVE_MEDICATION':
      return { ...state, medications: state.medications.filter(m => m.id !== action.payload) };
    case 'SET_INSURANCE':
      return { ...state, insurance: action.payload };
    case 'DISMISS_RECOMMENDATION':
      return {
        ...state,
        recommendations: state.recommendations.map(r =>
          r.id === action.payload ? { ...r, dismissed: true } : r
        )
      };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_QUALIFICATION_ANSWERS':
      const personalizedRecs = generatePersonalizedRecommendations(action.payload);
      return { 
        ...state, 
        qualificationAnswers: action.payload,
        recommendations: personalizedRecs
      };
    case 'SET_HEALTH_PROFILE':
      const healthProfileRecs = generateRecommendationsFromHealthProfile(action.payload);
      const healthInsights = generateAIHealthInsights(action.payload);
      const riskAssessment = generateRiskAssessment(action.payload);
      const followUpTasks = generateFollowUpTasks(action.payload);
      return {
        ...state,
        healthProfile: action.payload,
        recommendations: [...state.recommendations, ...healthProfileRecs],
        healthInsights,
        riskAssessment,
        followUpTasks
      };
    case 'SET_AUTH_STATE':
      return { 
        ...state, 
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    // Messages
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [action.payload, ...state.messages],
        unreadMessageCount: state.unreadMessageCount + 1
      };
    case 'MARK_MESSAGE_READ':
      return {
        ...state,
        messages: state.messages.map(m =>
          m.id === action.payload ? { ...m, read: true } : m
        ),
        unreadMessageCount: Math.max(0, state.unreadMessageCount - 1)
      };
    // Notifications
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadNotificationCount: state.unreadNotificationCount + 1
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadNotificationCount: Math.max(0, state.unreadNotificationCount - 1)
      };
    // Appointments
    case 'BOOK_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      };
    case 'CANCEL_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(a =>
          a.id === action.payload ? { ...a, status: 'cancelled' as const } : a
        )
      };
    // Medication Orders
    case 'PLACE_MEDICATION_ORDER':
      return {
        ...state,
        medicationOrders: [action.payload, ...state.medicationOrders]
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        medicationOrders: state.medicationOrders.map(o =>
          o.id === action.payload.orderId ? { ...o, status: action.payload.status as any } : o
        )
      };
    case 'REQUEST_REFILL':
      return {
        ...state,
        refillRequests: [...state.refillRequests, {
          id: `refill_${Date.now()}`,
          medicationId: action.payload.medicationId,
          pharmacyId: action.payload.pharmacyId,
          status: 'pending' as const,
          requestedAt: new Date().toISOString()
        }]
      };
    case 'SET_HEALTH_INSIGHTS':
      return { ...state, healthInsights: action.payload };
    case 'SET_RISK_ASSESSMENT':
      return { ...state, riskAssessment: action.payload };
    case 'COMPLETE_TASK':
      return {
        ...state,
        followUpTasks: state.followUpTasks.map(t =>
          t.id === action.payload ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
        )
      };
    case 'LOGOUT':
      return {
        ...initialState,
        providers: mockProviders,
        pharmacies: mockPharmacies
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
