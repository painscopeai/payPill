import { Document, Types } from 'mongoose';

// User Types
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'non_binary' | 'prefer_not_say';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  role: 'patient' | 'provider' | 'admin';
  isVerified: boolean;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'non_binary' | 'prefer_not_say';
}

// Health Profile Types
export interface IHealthProfile extends Document {
  userId: Types.ObjectId;
  conditions: IHealthCondition[];
  medications: IMedication[];
  allergies: IAllergy[];
  vitalSigns: IVitalSigns;
  lifestyle: ILifestyle;
  familyHistory: string[];
  emergencyContacts: IEmergencyContact[];
  insurance?: IInsurance;
  lastUpdated: Date;
}

export interface IHealthCondition {
  id: string;
  name: string;
  diagnosedDate?: Date;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'managed' | 'resolved';
  notes?: string;
}

export interface IMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy?: string;
  startDate?: Date;
  endDate?: Date;
  status: 'active' | 'discontinued' | 'as_needed';
  refillsRemaining: number;
}

export interface IAllergy {
  id: string;
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  reaction: string;
}

export interface IVitalSigns {
  height?: { value: number; unit: 'cm' | 'ft' };
  weight?: { value: number; unit: 'kg' | 'lbs' };
  bloodPressure?: { systolic: number; diastolic: number };
  heartRate?: number;
  temperature?: number;
  lastUpdated?: Date;
}

export interface ILifestyle {
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'occasional' | 'regular';
  exerciseFrequency: 'none' | 'light' | 'moderate' | 'active';
  sleepHours?: number;
  dietType?: string;
}

export interface IEmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface IInsurance {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  coverageType: string;
  effectiveDate?: Date;
  expirationDate?: Date;
}

// Healthcare Provider Types
export interface IHealthcareProvider extends Document {
  userId?: Types.ObjectId;
  name: string;
  specialty: string;
  subSpecialties?: string[];
  credentials: string[];
  education: IEducation[];
  experience: IExperience[];
  rating: number;
  reviewCount: number;
  location: ILocation;
  contact: IContact;
  availability: IAvailability[];
  services: string[];
  acceptedInsurance: string[];
  languages: string[];
  about?: string;
  isVerified: boolean;
  isAcceptingNewPatients: boolean;
  distance?: number;
}

export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: number;
}

export interface IExperience {
  title: string;
  organization: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
}

export interface ILocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface IContact {
  phone: string;
  email?: string;
  website?: string;
}

export interface IAvailability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Pharmacy Types
export interface IPharmacy extends Document {
  name: string;
  chain?: string;
  location: ILocation;
  contact: IContact;
  hours: IOperatingHours[];
  services: string[];
  rating: number;
  distance?: number;
  isOpen: boolean;
  is24Hours: boolean;
}

export interface IOperatingHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

// Appointment Types
export interface IAppointment extends Document {
  patientId: Types.ObjectId;
  providerId: Types.ObjectId;
  providerName: string;
  providerSpecialty: string;
  date: Date;
  time: string;
  duration: number;
  type: 'in-person' | 'telehealth';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  symptoms?: string[];
  meetingLink?: string;
  reminderSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface IMessage extends Document {
  senderId: Types.ObjectId;
  senderType: 'user' | 'provider' | 'pharmacy' | 'system';
  senderName: string;
  recipientId: Types.ObjectId;
  subject: string;
  content: string;
  attachments?: string[];
  read: boolean;
  readAt?: Date;
  createdAt: Date;
}

// Notification Types
export interface INotification extends Document {
  userId: Types.ObjectId;
  type: 'appointment' | 'medication' | 'message' | 'system' | 'health' | 'reward';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: Date;
  actionUrl?: string;
  createdAt: Date;
}

// Medication Order Types
export interface IMedicationOrder extends Document {
  patientId: Types.ObjectId;
  medicationId: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  pharmacyId: Types.ObjectId;
  pharmacyName: string;
  status: 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';
  prescriptionRef?: string;
  copay?: number;
  insuranceCovered: boolean;
  orderedAt: Date;
  readyAt?: Date;
  completedAt?: Date;
}

// Refill Request Types
export interface IRefillRequest extends Document {
  patientId: Types.ObjectId;
  medicationId: string;
  medicationName: string;
  pharmacyId: Types.ObjectId;
  pharmacyName: string;
  status: 'pending' | 'approved' | 'denied' | 'completed';
  requestedBy: 'patient' | 'provider';
  notes?: string;
  requestedAt: Date;
  completedAt?: Date;
}

// AI Recommendation Types
export interface IAIRecommendation extends Document {
  userId: Types.ObjectId;
  type: 'medication' | 'provider' | 'lifestyle' | 'screening' | 'savings';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionText: string;
  actionUrl?: string;
  savings?: number;
  dismissed: boolean;
  dismissedAt?: Date;
  createdAt: Date;
}

// Health Insight Types
export interface IHealthInsight extends Document {
  userId: Types.ObjectId;
  category: 'risk' | 'trend' | 'opportunity' | 'achievement';
  trend: 'improving' | 'stable' | 'declining' | 'new';
  title: string;
  description: string;
  actionable: boolean;
  actionText?: string;
  actionUrl?: string;
  metric?: string;
  value?: number;
  unit?: string;
  createdAt: Date;
}

// Health Data Upload Types
export interface IHealthDataUpload extends Document {
  userId: Types.ObjectId;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  category: 'lab_result' | 'imaging' | 'prescription' | 'insurance' | 'other';
  description?: string;
  processed: boolean;
  extractedData?: Record<string, any>;
  uploadedAt: Date;
}

// Auth Types
export interface IAuthToken {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends IUserInput {}

// API Response Types
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Query Types
export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IProviderQuery extends IPaginationQuery {
  specialty?: string;
  location?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  availability?: string;
  insurance?: string;
  rating?: number;
  search?: string;
}

export interface IAppointmentQuery extends IPaginationQuery {
  status?: string;
  fromDate?: Date;
  toDate?: Date;
  type?: string;
}
