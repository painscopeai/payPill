import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { AppState, UserProfile, HealthCondition, Medication, Insurance, AIRecommendation } from '@/types';
import {
  mockProviders,
  generatePersonalizedRecommendations,
  generateRecommendationsFromHealthProfile
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
  emergencyContacts: [],
  recommendations: [],
  timeline: [],
  auditLogs: [],
  isAuthenticated: false,
  qualificationAnswers: null,
  healthProfile: null
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
      // Generate personalized recommendations based on answers
      const personalizedRecs = generatePersonalizedRecommendations(action.payload);
      return { 
        ...state, 
        qualificationAnswers: action.payload,
        recommendations: personalizedRecs
      };
    case 'SET_HEALTH_PROFILE':
      // Generate AI recommendations based on health profile
      const healthProfileRecs = generateRecommendationsFromHealthProfile(action.payload);
      return {
        ...state,
        healthProfile: action.payload,
        recommendations: [...state.recommendations, ...healthProfileRecs]
      };
    case 'SET_AUTH_STATE':
      return { 
        ...state, 
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...initialState,
        providers: mockProviders // Keep providers
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
