// PayPill Health Compass - Type Definitions

// User Profile Types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  gender: 'female' | 'male' | 'intersex' | 'prefer_not_say';
  genderIdentity?: string;
  bloodGroup?: string;
  genotype?: string;
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  preferences: {
    language: string;
    communication: 'sms' | 'email' | 'push';
  };
  profilePhoto?: string;
  createdAt: string;
  lastUpdated: string;
}

// Health Measurements
export interface BodyMeasurements {
  height: number; // cm
  weight: number; // kg
  bmi: number;
  waistCircumference?: number;
  hipCircumference?: number;
}

export interface VitalSigns {
  restingHeartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation?: number;
  bodyTemperature?: number;
  respiratoryRate?: number;
  bloodSugarBaseline?: number;
}

// Health Conditions
export interface HealthCondition {
  id: string;
  category: string;
  name: string;
  dateDiagnosed?: string;
  severity: 'mild' | 'moderate' | 'severe';
  currentTreatment?: string;
  controlled: boolean;
  managingDoctor?: string;
  notes?: string;
}

// Medications
export interface Medication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  strength: string;
  frequency: string;
  route: 'oral' | 'iv' | 'subcutaneous' | 'topical' | 'inhaled';
  startDate: string;
  endDate?: string;
  prescribingProvider: string;
  indication: string;
  sideEffects?: string[];
  adherenceStatus: 'excellent' | 'good' | 'fair' | 'poor';
  isBrandName: boolean;
  genericEquivalent?: string;
  refillsRemaining?: number;
  lastRefillDate?: string;
  nextRefillDate?: string;
  pharmacyId?: string;
}

// Allergies
export interface Allergy {
  id: string;
  type: 'drug' | 'food' | 'environmental';
  allergen: string;
  reactionType: string;
  severity: 'mild' | 'moderate' | 'severe';
}

// Insurance
export interface Insurance {
  id: string;
  type: string;
  carrier: string;
  planName: string;
  memberId: string;
  groupNumber?: string;
  policyHolderName: string;
  relationship: 'self' | 'spouse' | 'child' | 'other';
  effectiveDate: string;
  expiryDate?: string;
  coverage: {
    primary: boolean;
    prescription: boolean;
    dental: boolean;
    vision: boolean;
    specialist: boolean;
    lab: boolean;
    emergency: boolean;
  };
  cardImages?: {
    front?: string;
    back?: string;
  };
}

// Healthcare Provider
export interface HealthcareProvider {
  id: string;
  name: string;
  specialty: string;
  type: 'primary' | 'specialist' | 'allied' | 'facility';
  hospitalAffiliation?: string;
  npi?: string;
  address: string;
  phone: string;
  email?: string;
  availability?: string;
  telemedicine: boolean;
  distance?: number;
  rating: number;
  reviewCount: number;
  insuranceAccepted: string[];
  image?: string;
  bio?: string;
  education?: string[];
  languages?: string[];
  nextAvailable?: string;
}

// Pharmacy
export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  hours: string;
  services: string[];
  rating: number;
  isOpen: boolean;
  deliveryAvailable: boolean;
  insuranceAccepted: string[];
}

// Emergency Contact
export interface EmergencyContact {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  address?: string;
  canDiscussMedicalHistory: boolean;
  canMakeDecisions: boolean;
  hasRecordAccess: boolean;
  isHealthcareProxy: boolean;
}

// Lifestyle/Habits
export interface Lifestyle {
  exercise: {
    frequency: 'none' | 'light' | 'moderate' | 'intense';
    timesPerWeek?: number;
    type?: string;
  };
  smoking: {
    status: 'never' | 'former' | 'current' | 'occasionally' | 'vaping';
    packsPerDay?: number;
    yearsSmoked?: number;
  };
  alcohol: {
    status: 'never' | 'occasionally' | 'weekly' | 'daily';
    unitsPerWeek?: number;
    type?: string;
  };
  diet: string[];
  sleep: {
    averageHours: number;
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    issues?: string[];
  };
  stressLevel: 'low' | 'medium' | 'high';
}

// AI Recommendations
export interface AIRecommendation {
  id: string;
  type: 'medication' | 'provider' | 'guidance' | 'savings' | 'preventive' | 'lifestyle' | 'refill' | 'appointment';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionText: string;
  actionLink?: string;
  savings?: number;
  provider?: HealthcareProvider;
  medication?: Medication;
  pharmacy?: Pharmacy;
  createdAt: string;
  expiresAt?: string;
  dismissed: boolean;
  aiConfidence?: number;
  evidence?: string[];
}

// Health Insights from AI
export interface HealthInsight {
  id: string;
  category: 'risk' | 'trend' | 'opportunity' | 'achievement';
  title: string;
  description: string;
  metric?: string;
  value?: string;
  trend: 'improving' | 'stable' | 'declining' | 'new';
  severity?: 'low' | 'medium' | 'high';
  actionable: boolean;
  actionText?: string;
  createdAt: string;
}

// Risk Assessment
export interface RiskAssessment {
  overallRisk: 'low' | 'moderate' | 'high';
  overallScore: number;
  categories: {
    cardiovascular: { risk: 'low' | 'moderate' | 'high'; score: number; factors: string[] };
    diabetes: { risk: 'low' | 'moderate' | 'high'; score: number; factors: string[] };
    mentalHealth: { risk: 'low' | 'moderate' | 'high'; score: number; factors: string[] };
    lifestyle: { risk: 'low' | 'moderate' | 'high'; score: number; factors: string[] };
  };
  lastUpdated: string;
  nextAssessment: string;
}

// Follow-up Tasks
export interface FollowUpTask {
  id: string;
  title: string;
  description?: string;
  type: 'appointment' | 'lab' | 'medication' | 'lifestyle' | 'general';
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  completed: boolean;
  completedAt?: string;
  relatedRecommendationId?: string;
}

// Timeline Events
export interface TimelineEvent {
  id: string;
  type: 'profile_update' | 'condition_added' | 'medication_added' | 'insurance_connected' | 'appointment' | 'lab_result' | 'ai_recommendation' | 'medication_order' | 'refill' | 'message';
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
  metadata?: Record<string, any>;
}

// Privacy Audit Log
export interface PrivacyAuditLog {
  id: string;
  action: string;
  dataAccessed: string[];
  timestamp: string;
  aiEngine: boolean;
  purpose: string;
}

// Messages
export interface Message {
  id: string;
  sender: {
    type: 'ai' | 'doctor' | 'pharmacy' | 'system';
    name: string;
    avatar?: string;
  };
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  category: 'health' | 'medication' | 'appointment' | 'system' | 'general';
  actions?: {
    label: string;
    action: string;
  }[];
}

// Notifications
export interface Notification {
  id: string;
  type: 'reminder' | 'alert' | 'insight' | 'appointment' | 'medication' | 'refill' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionLink?: string;
  actionText?: string;
}

// Appointments
export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  providerSpecialty: string;
  date: string;
  time: string;
  duration: number;
  type: 'in-person' | 'telehealth';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason?: string;
  notes?: string;
  location?: string;
  reminderSent: boolean;
}

// Medication Orders
export interface MedicationOrder {
  id: string;
  medicationId: string;
  medicationName: string;
  pharmacyId: string;
  pharmacyName: string;
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  deliveryType: 'pickup' | 'delivery';
  trackingNumber?: string;
}

// Refill Requests
export interface RefillRequest {
  id: string;
  medicationId: string;
  pharmacyId: string;
  status: 'pending' | 'approved' | 'denied' | 'completed';
  requestedAt: string;
  completedAt?: string;
  notes?: string;
}

// Qualification Answers
export interface QualificationAnswers {
  hasInsurance: boolean;
  insuranceCarrier?: string;
  takesMedications: boolean;
  medications?: string[];
  hasChronicCondition: boolean;
  conditions?: string[];
  lookingFor: 'savings' | 'providers' | 'both';
}

// Health Profile Data
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

// App State
export interface AppState {
  currentView: 'landing' | 'onboarding' | 'dashboard' | 'privacy' | 'providers' | 'medications' | 'qualification' | 'auth' | 'health-profiling' | 'messages' | 'appointments' | 'orders' | 'profile';
  onboardingStep: number;
  user: UserProfile | null;
  healthConditions: HealthCondition[];
  medications: Medication[];
  allergies: Allergy[];
  insurance: Insurance | null;
  providers: HealthcareProvider[];
  pharmacies: Pharmacy[];
  emergencyContacts: EmergencyContact[];
  recommendations: AIRecommendation[];
  healthInsights: HealthInsight[];
  riskAssessment: RiskAssessment | null;
  followUpTasks: FollowUpTask[];
  timeline: TimelineEvent[];
  auditLogs: PrivacyAuditLog[];
  isAuthenticated: boolean;
  qualificationAnswers: QualificationAnswers | null;
  healthProfile: HealthProfileData | null;
  // New features
  messages: Message[];
  notifications: Notification[];
  appointments: Appointment[];
  medicationOrders: MedicationOrder[];
  refillRequests: RefillRequest[];
  unreadMessageCount: number;
  unreadNotificationCount: number;
}

// Form Types for Onboarding
export interface OnboardingData {
  profile: Partial<UserProfile>;
  measurements: Partial<BodyMeasurements>;
  vitals: Partial<VitalSigns>;
  conditions: string[];
  medications: string[];
  allergies: string[];
  lifestyle: Partial<Lifestyle>;
  insurance: Partial<Insurance>;
  emergencyContact: Partial<EmergencyContact>;
}

// Pharmacy/Medication Pricing
export interface MedicationPricing {
  brandName: string;
  genericName: string;
  brandPrice: number;
  genericPrice: number;
  savings: number;
  savingsPercentage: number;
  pharmacies: {
    name: string;
    price: number;
    distance: number;
    inStock: boolean;
  }[];
}

// AI Analysis Result
export interface AIAnalysisResult {
  insights: HealthInsight[];
  recommendations: AIRecommendation[];
  riskAssessment: RiskAssessment;
  followUpTasks: FollowUpTask[];
  providerMatches: HealthcareProvider[];
  pharmacyMatches: Pharmacy[];
}
