// PayPill Mock Backend Data

import type {
  UserProfile,
  HealthCondition,
  Medication,
  Insurance,
  HealthcareProvider,
  Pharmacy,
  EmergencyContact,
  AIRecommendation,
  Message,
  Notification,
  Appointment,
  MedicationOrder,
  HealthInsight,
  RiskAssessment,
  FollowUpTask,
  TimelineEvent,
  PrivacyAuditLog,
  MedicationPricing,
  Lifestyle,
} from '@/types';

// Health Condition Categories from CSV
export const healthConditionCategories = {
  cardiovascular: [
    'Hypertension', 'Heart failure', 'Coronary artery disease', 'Arrhythmia',
    'Stroke history', 'Peripheral vascular disease', 'High cholesterol'
  ],
  endocrine: [
    'Type 1 diabetes', 'Type 2 diabetes', 'Prediabetes', 'Thyroid disorders',
    'Obesity', 'Metabolic syndrome', 'Gout'
  ],
  kidney: [
    'Chronic kidney disease', 'Kidney stones', 'Nephrotic syndrome',
    'Urinary tract disorders', 'Proteinuria', 'Dialysis history'
  ],
  respiratory: [
    'Asthma', 'COPD', 'Tuberculosis history', 'Sleep apnea',
    'Chronic bronchitis', 'Pulmonary fibrosis'
  ],
  neurological: [
    'Epilepsy', 'Migraine', "Parkinson's disease", 'Multiple sclerosis',
    'Dementia', 'Neuropathy'
  ],
  mentalHealth: [
    'Anxiety disorder', 'Depression', 'Bipolar disorder', 'PTSD',
    'ADHD', 'Schizophrenia', 'Substance use disorder'
  ],
  gastrointestinal: [
    'Peptic ulcer disease', 'GERD', 'IBS', "Crohn's disease",
    'Ulcerative colitis', 'Liver disease', 'Hepatitis'
  ],
  musculoskeletal: [
    'Arthritis', 'Osteoporosis', 'Chronic back pain', 'Fibromyalgia',
    'Lupus', 'Joint replacement history'
  ],
  cancer: [
    'Breast cancer', 'Prostate cancer', 'Cervical cancer', 'Colon cancer',
    'Leukemia', 'Lymphoma', 'Cancer survivor status'
  ],
  infectious: [
    'HIV', 'Hepatitis B', 'Hepatitis C', 'Malaria recurrence',
    'Tuberculosis', 'COVID-19 complications'
  ],
  autoimmune: [
    'Rheumatoid arthritis', 'Psoriasis', 'Sickle cell disease',
    'Immunodeficiency', 'Celiac disease'
  ],
  womensHealth: [
    'PCOS', 'Endometriosis', 'Fibroids', 'Pregnancy-induced hypertension',
    'Gestational diabetes history'
  ],
  mensHealth: [
    'Benign prostatic hyperplasia', 'Erectile dysfunction',
    'Prostatitis', 'Testosterone deficiency'
  ]
};

// Flattened health tags for UI
export const healthTags = Object.values(healthConditionCategories).flat();

// Medication Database
export const medicationDatabase = {
  diabetes: [
    { name: 'Metformin', category: 'Diabetes', isBrand: false },
    { name: 'Insulin', category: 'Diabetes', isBrand: false },
    { name: 'Jardiance', category: 'Diabetes', isBrand: true, generic: 'Empagliflozin' },
    { name: 'Farxiga', category: 'Diabetes', isBrand: true, generic: 'Dapagliflozin' },
    { name: 'Januvia', category: 'Diabetes', isBrand: true, generic: 'Sitagliptin' },
  ],
  bloodPressure: [
    { name: 'Norvasc', category: 'Blood Pressure', isBrand: true, generic: 'Amlodipine' },
    { name: 'Cozaar', category: 'Blood Pressure', isBrand: true, generic: 'Losartan' },
    { name: 'Prinivil', category: 'Blood Pressure', isBrand: true, generic: 'Lisinopril' },
    { name: 'Hydrochlorothiazide', category: 'Blood Pressure', isBrand: false },
  ],
  cholesterol: [
    { name: 'Lipitor', category: 'Cholesterol', isBrand: true, generic: 'Atorvastatin' },
    { name: 'Zocor', category: 'Cholesterol', isBrand: true, generic: 'Simvastatin' },
    { name: 'Crestor', category: 'Cholesterol', isBrand: true, generic: 'Rosuvastatin' },
  ],
  pain: [
    { name: 'Tylenol', category: 'Pain', isBrand: true, generic: 'Acetaminophen' },
    { name: 'Advil', category: 'Pain', isBrand: true, generic: 'Ibuprofen' },
    { name: 'Voltaren', category: 'Pain', isBrand: true, generic: 'Diclofenac' },
    { name: 'Ultram', category: 'Pain', isBrand: true, generic: 'Tramadol' },
  ],
  respiratory: [
    { name: 'Ventolin', category: 'Respiratory', isBrand: true, generic: 'Albuterol' },
    { name: 'Pulmicort', category: 'Respiratory', isBrand: true, generic: 'Budesonide' },
    { name: 'Singulair', category: 'Respiratory', isBrand: true, generic: 'Montelukast' },
  ],
  mentalHealth: [
    { name: 'Zoloft', category: 'Mental Health', isBrand: true, generic: 'Sertraline' },
    { name: 'Prozac', category: 'Mental Health', isBrand: true, generic: 'Fluoxetine' },
    { name: 'Elavil', category: 'Mental Health', isBrand: true, generic: 'Amitriptyline' },
  ],
  gi: [
    { name: 'Prilosec', category: 'GI', isBrand: true, generic: 'Omeprazole' },
    { name: 'Nexium', category: 'GI', isBrand: true, generic: 'Esomeprazole' },
  ]
};

// Insurance Carriers
export const insuranceCarriers = [
  'Blue Cross Blue Shield',
  'Aetna',
  'Cigna',
  'UnitedHealthcare',
  'Humana',
  'Kaiser Permanente',
  'Medicare',
  'Medicaid'
];

// Mock User Profile
export const mockUser: UserProfile = {
  id: 'usr_001',
  firstName: 'Sarah',
  lastName: 'Johnson',
  preferredName: 'Sarah',
  email: 'sarah.johnson@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-03-15',
  age: 39,
  gender: 'female',
  bloodGroup: 'O+',
  location: {
    city: 'Austin',
    state: 'TX',
    zipCode: '78701'
  },
  preferences: {
    language: 'English',
    communication: 'email'
  },
  createdAt: '2024-01-15T10:00:00Z',
  lastUpdated: '2024-03-15T14:30:00Z'
};

// Mock Health Conditions
export const mockHealthConditions: HealthCondition[] = [
  {
    id: 'hc_001',
    category: 'musculoskeletal',
    name: 'Chronic back pain',
    dateDiagnosed: '2019-06-15',
    severity: 'moderate',
    currentTreatment: 'Physical therapy, NSAIDs as needed',
    controlled: true,
    managingDoctor: 'Dr. Michael Chen',
    notes: 'Lumbar region, aggravated by prolonged sitting'
  },
  {
    id: 'hc_002',
    category: 'endocrine',
    name: 'Type 2 diabetes',
    dateDiagnosed: '2020-11-20',
    severity: 'mild',
    currentTreatment: 'Metformin 500mg twice daily',
    controlled: true,
    managingDoctor: 'Dr. Emily Rodriguez',
    notes: 'HbA1c stable at 6.8%'
  },
  {
    id: 'hc_003',
    category: 'cardiovascular',
    name: 'Hypertension',
    dateDiagnosed: '2021-02-10',
    severity: 'mild',
    currentTreatment: 'Lisinopril 10mg daily',
    controlled: true,
    managingDoctor: 'Dr. Emily Rodriguez',
    notes: 'BP averaging 128/82'
  }
];

// Mock Medications
export const mockMedications: Medication[] = [
  {
    id: 'med_001',
    name: 'Metformin',
    category: 'Diabetes Medications',
    dosage: '500mg',
    strength: '500mg',
    frequency: 'Twice daily with meals',
    route: 'oral',
    startDate: '2020-11-25',
    prescribingProvider: 'Dr. Emily Rodriguez',
    indication: 'Type 2 diabetes',
    adherenceStatus: 'excellent',
    isBrandName: false
  },
  {
    id: 'med_002',
    name: 'Lisinopril',
    category: 'Blood Pressure Medications',
    dosage: '10mg',
    strength: '10mg',
    frequency: 'Once daily',
    route: 'oral',
    startDate: '2021-02-15',
    prescribingProvider: 'Dr. Emily Rodriguez',
    indication: 'Hypertension',
    adherenceStatus: 'good',
    isBrandName: false
  },
  {
    id: 'med_003',
    name: 'Ibuprofen',
    category: 'Pain and Inflammation',
    dosage: '400mg',
    strength: '200mg',
    frequency: 'As needed for pain',
    route: 'oral',
    startDate: '2019-07-01',
    prescribingProvider: 'Dr. Michael Chen',
    indication: 'Chronic back pain',
    adherenceStatus: 'good',
    isBrandName: true,
    genericEquivalent: 'Ibuprofen'
  }
];

// Mock Insurance
export const mockInsurance: Insurance = {
  id: 'ins_001',
  type: 'PPO',
  carrier: 'Blue Cross Blue Shield',
  planName: 'Blue Advantage PPO',
  memberId: 'BCBS123456789',
  groupNumber: 'GRP987654',
  policyHolderName: 'Sarah Johnson',
  relationship: 'self',
  effectiveDate: '2024-01-01',
  expiryDate: '2024-12-31',
  coverage: {
    primary: true,
    prescription: true,
    dental: true,
    vision: true,
    specialist: true,
    lab: true,
    emergency: true
  }
};

// Mock Healthcare Providers
export const mockProviders: HealthcareProvider[] = [
  {
    id: 'prov_001',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Internal Medicine',
    type: 'primary',
    hospitalAffiliation: 'Austin Medical Center',
    address: '123 Healthcare Blvd, Austin, TX 78701',
    phone: '(512) 555-0100',
    email: 'e.rodriguez@austinmed.com',
    telemedicine: true,
    distance: 2.3,
    rating: 4.8,
    reviewCount: 127,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare'],
    availability: 'Mon-Fri, 8AM-5PM'
  },
  {
    id: 'prov_002',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedics',
    type: 'specialist',
    hospitalAffiliation: 'Austin Orthopedic Institute',
    address: '456 Spine Street, Austin, TX 78702',
    phone: '(512) 555-0200',
    telemedicine: true,
    distance: 4.1,
    rating: 4.9,
    reviewCount: 89,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare'],
    availability: 'Mon-Thu, 9AM-6PM'
  },
  {
    id: 'prov_003',
    name: 'City Physio',
    specialty: 'Physical Therapy',
    type: 'allied',
    hospitalAffiliation: 'Austin Wellness Network',
    address: '789 Recovery Road, Austin, TX 78703',
    phone: '(512) 555-0300',
    telemedicine: false,
    distance: 1.8,
    rating: 4.7,
    reviewCount: 203,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Cigna', 'Humana'],
    availability: 'Mon-Sat, 7AM-7PM'
  },
  {
    id: 'prov_004',
    name: 'Dr. Sarah Williams',
    specialty: 'Endocrinology',
    type: 'specialist',
    hospitalAffiliation: 'Austin Medical Center',
    address: '321 Hormone Lane, Austin, TX 78701',
    phone: '(512) 555-0400',
    telemedicine: true,
    distance: 2.5,
    rating: 4.6,
    reviewCount: 76,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'Cigna'],
    availability: 'Tue-Fri, 8AM-4PM'
  },
  {
    id: 'prov_005',
    name: 'QuickCare Pharmacy',
    specialty: 'Pharmacy',
    type: 'allied',
    address: '100 Main Street, Austin, TX 78701',
    phone: '(512) 555-0500',
    telemedicine: false,
    distance: 0.5,
    rating: 4.5,
    reviewCount: 312,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Humana'],
    availability: '24/7'
  }
];

// Mock Emergency Contact
export const mockEmergencyContact: EmergencyContact = {
  id: 'ec_001',
  firstName: 'David',
  lastName: 'Johnson',
  relationship: 'Spouse',
  phone: '(555) 987-6543',
  alternatePhone: '(555) 987-6544',
  email: 'david.johnson@email.com',
  canDiscussMedicalHistory: true,
  canMakeDecisions: true,
  hasRecordAccess: true,
  isHealthcareProxy: true
};

// Mock Lifestyle
export const mockLifestyle: Lifestyle = {
  exercise: {
    frequency: 'moderate',
    timesPerWeek: 3,
    type: 'Walking, swimming'
  },
  smoking: {
    status: 'never'
  },
  alcohol: {
    status: 'occasionally',
    unitsPerWeek: 2
  },
  diet: ['Low sugar', 'Low sodium'],
  sleep: {
    averageHours: 7,
    quality: 'good'
  },
  stressLevel: 'medium'
};

// Mock AI Recommendations
export const mockRecommendations: AIRecommendation[] = [
  {
    id: 'rec_001',
    type: 'medication',
    title: 'Save on Pain Relief',
    description: 'Switch from Advil to generic Ibuprofen and save up to 70% on your medication costs.',
    priority: 'high',
    actionText: 'View Savings',
    savings: 45.00,
    createdAt: '2024-03-15T10:00:00Z',
    dismissed: false
  },
  {
    id: 'rec_002',
    type: 'provider',
    title: 'Recommended: City Physio',
    description: 'Based on your chronic back pain and Blue Cross Blue Shield coverage, City Physio is 100% covered and only 1.8 miles away.',
    priority: 'high',
    actionText: 'Book Appointment',
    provider: mockProviders[2],
    createdAt: '2024-03-14T14:30:00Z',
    dismissed: false
  },
  {
    id: 'rec_003',
    type: 'guidance',
    title: 'Diabetes Check-Up Due',
    description: 'It has been 4 months since your last HbA1c test. Schedule a follow-up with Dr. Rodriguez to ensure your diabetes remains well-controlled.',
    priority: 'medium',
    actionText: 'Schedule Now',
    createdAt: '2024-03-13T09:15:00Z',
    dismissed: false
  },
  {
    id: 'rec_004',
    type: 'savings',
    title: 'Prescription Savings Found',
    description: 'QuickCare Pharmacy offers your medications at lower copays than your current pharmacy.',
    priority: 'medium',
    actionText: 'Compare Prices',
    savings: 28.50,
    createdAt: '2024-03-12T16:45:00Z',
    dismissed: false
  }
];

// Mock Timeline Events
export const mockTimeline: TimelineEvent[] = [
  {
    id: 'evt_001',
    type: 'ai_recommendation',
    title: 'New Savings Opportunity',
    description: 'AI found potential savings on your pain medication',
    timestamp: '2024-03-15T10:00:00Z'
  },
  {
    id: 'evt_002',
    type: 'profile_update',
    title: 'Profile Updated',
    description: 'Updated contact information and preferences',
    timestamp: '2024-03-14T16:30:00Z'
  },
  {
    id: 'evt_003',
    type: 'condition_added',
    title: 'Health History Added',
    description: 'Added chronic back pain to your health profile',
    timestamp: '2024-03-10T11:00:00Z'
  },
  {
    id: 'evt_004',
    type: 'insurance_connected',
    title: 'Insurance Verified',
    description: 'Blue Cross Blue Shield successfully connected',
    timestamp: '2024-03-08T09:45:00Z'
  },
  {
    id: 'evt_005',
    type: 'appointment',
    title: 'Upcoming: Physio Appointment',
    description: 'Physical therapy session at City Physio',
    timestamp: '2024-03-20T14:00:00Z'
  },
  {
    id: 'evt_006',
    type: 'medication_added',
    title: 'Medication Added',
    description: 'Metformin added to your medication list',
    timestamp: '2024-03-05T13:20:00Z'
  }
];

// Mock Privacy Audit Logs
export const mockAuditLogs: PrivacyAuditLog[] = [
  {
    id: 'aud_001',
    action: 'Medication Savings Analysis',
    dataAccessed: ['medications', 'insurance_coverage'],
    timestamp: '2024-03-15T10:00:00Z',
    aiEngine: true,
    purpose: 'Find generic alternatives and cost savings'
  },
  {
    id: 'aud_002',
    action: 'Provider Match Recommendation',
    dataAccessed: ['health_conditions', 'insurance_carrier', 'location'],
    timestamp: '2024-03-14T14:30:00Z',
    aiEngine: true,
    purpose: 'Match patient with in-network specialists'
  },
  {
    id: 'aud_003',
    action: 'Health Timeline Update',
    dataAccessed: ['profile', 'health_conditions'],
    timestamp: '2024-03-10T11:00:00Z',
    aiEngine: false,
    purpose: 'User-initiated profile update'
  },
  {
    id: 'aud_004',
    action: 'Insurance Verification',
    dataAccessed: ['insurance_details'],
    timestamp: '2024-03-08T09:45:00Z',
    aiEngine: false,
    purpose: 'Verify insurance coverage and benefits'
  },
  {
    id: 'aud_005',
    action: 'Preventive Care Reminder',
    dataAccessed: ['health_conditions', 'medications', 'last_appointments'],
    timestamp: '2024-03-07T08:00:00Z',
    aiEngine: true,
    purpose: 'Generate personalized health reminders'
  }
];

// Mock Medication Pricing Data
export const mockMedicationPricing: MedicationPricing[] = [
  {
    brandName: 'Advil',
    genericName: 'Ibuprofen',
    brandPrice: 65.00,
    genericPrice: 18.50,
    savings: 46.50,
    savingsPercentage: 71.5,
    pharmacies: [
      { name: 'QuickCare Pharmacy', price: 18.50, distance: 0.5, inStock: true },
      { name: 'Walgreens', price: 22.00, distance: 1.2, inStock: true },
      { name: 'CVS', price: 24.99, distance: 2.0, inStock: true },
      { name: 'Costco', price: 15.99, distance: 5.5, inStock: true }
    ]
  },
  {
    brandName: 'Lipitor',
    genericName: 'Atorvastatin',
    brandPrice: 340.00,
    genericPrice: 45.00,
    savings: 295.00,
    savingsPercentage: 86.8,
    pharmacies: [
      { name: 'QuickCare Pharmacy', price: 45.00, distance: 0.5, inStock: true },
      { name: 'Walgreens', price: 52.00, distance: 1.2, inStock: true },
      { name: 'CVS', price: 48.50, distance: 2.0, inStock: false },
      { name: 'Costco', price: 38.00, distance: 5.5, inStock: true }
    ]
  },
  {
    brandName: 'Norvasc',
    genericName: 'Amlodipine',
    brandPrice: 180.00,
    genericPrice: 28.00,
    savings: 152.00,
    savingsPercentage: 84.4,
    pharmacies: [
      { name: 'QuickCare Pharmacy', price: 28.00, distance: 0.5, inStock: true },
      { name: 'Walgreens', price: 32.00, distance: 1.2, inStock: true },
      { name: 'CVS', price: 30.50, distance: 2.0, inStock: true },
      { name: 'Costco', price: 24.00, distance: 5.5, inStock: true }
    ]
  }
];

// Insurance Partner Logos (for trust bar)
export const insurancePartners = [
  { name: 'Blue Cross Blue Shield', initials: 'BCBS' },
  { name: 'Aetna', initials: 'AET' },
  { name: 'Cigna', initials: 'CIG' },
  { name: 'UnitedHealthcare', initials: 'UHC' },
  { name: 'Humana', initials: 'HUM' },
  { name: 'Kaiser Permanente', initials: 'KP' }
];

// Feature data for landing page
export const features = [
  {
    id: 'smart-savings',
    title: 'Smart Savings',
    description: 'AI-driven medication price comparisons that find generic alternatives and the best pharmacy prices near you.',
    icon: 'savings',
    color: 'emerald'
  },
  {
    id: 'right-fit-care',
    title: 'Right-Fit Care',
    description: 'Matching you with doctors based on your insurance, health history, and location—no more surprise bills.',
    icon: 'provider',
    color: 'sky'
  },
  {
    id: 'owned-records',
    title: 'Owned Records',
    description: 'Your complete health history, encrypted and in your control. Access it anytime, share it securely.',
    icon: 'shield',
    color: 'teal'
  }
];

// Generate personalized recommendations based on qualification answers
import type { QualificationAnswers } from '@/types';

export function generatePersonalizedRecommendations(answers: QualificationAnswers): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  const now = new Date().toISOString();

  // Savings recommendations for users looking for savings or both
  if (answers.lookingFor === 'savings' || answers.lookingFor === 'both') {
    if (answers.takesMedications && answers.medications && answers.medications.length > 0) {
      recommendations.push({
        id: `rec_savings_${Date.now()}`,
        type: 'savings',
        title: 'Save on Your Medications',
        description: `Based on your ${answers.medications.length} medication(s), you could save up to $200/month by switching to generics and comparing pharmacy prices.`,
        priority: 'high',
        actionText: 'View Savings',
        savings: 200,
        createdAt: now,
        dismissed: false
      });
    }

    recommendations.push({
      id: `rec_savings_insurance_${Date.now()}`,
      type: 'savings',
      title: 'Insurance Benefits You\'re Missing',
      description: 'Many users don\'t know their insurance covers preventive care 100%. Check what you\'re entitled to.',
      priority: 'medium',
      actionText: 'Check Benefits',
      savings: 150,
      createdAt: now,
      dismissed: false
    });
  }

  // Provider recommendations for users looking for providers or both
  if (answers.lookingFor === 'providers' || answers.lookingFor === 'both') {
    if (answers.hasChronicCondition && answers.conditions) {
      recommendations.push({
        id: `rec_provider_${Date.now()}`,
        type: 'provider',
        title: 'Find a Specialist Near You',
        description: `Based on your ${answers.conditions.join(', ')}, we found 3 in-network specialists within 5 miles.`,
        priority: 'high',
        actionText: 'Book Appointment',
        provider: mockProviders[1], // Dr. Michael Chen
        createdAt: now,
        dismissed: false
      });
    }

    recommendations.push({
      id: `rec_provider_primary_${Date.now()}`,
      type: 'provider',
      title: 'Connect with a Primary Care Doctor',
      description: 'Having a primary care provider helps you stay on top of your health and catch issues early.',
      priority: 'medium',
      actionText: 'Find Doctors',
      provider: mockProviders[0], // Dr. Emily Rodriguez
      createdAt: now,
      dismissed: false
    });
  }

  // Insurance-related recommendations
  if (answers.hasInsurance && answers.insuranceCarrier) {
    recommendations.push({
      id: `rec_insurance_${Date.now()}`,
      type: 'guidance',
      title: 'Maximize Your Insurance Benefits',
      description: `${answers.insuranceCarrier} offers many benefits you might not be using. Let us help you get the most out of your plan.`,
      priority: 'medium',
      actionText: 'Learn More',
      createdAt: now,
      dismissed: false
    });
  } else if (!answers.hasInsurance) {
    recommendations.push({
      id: `rec_no_insurance_${Date.now()}`,
      type: 'guidance',
      title: 'Find Affordable Healthcare Options',
      description: 'Without insurance, healthcare can be expensive. We found programs that could help you save up to 60%.',
      priority: 'high',
      actionText: 'Explore Options',
      savings: 300,
      createdAt: now,
      dismissed: false
    });
  }

  // Preventive care recommendation for everyone
  recommendations.push({
    id: `rec_preventive_${Date.now()}`,
    type: 'preventive',
    title: 'Stay Ahead with Preventive Care',
    description: 'Regular checkups can catch health issues early. Schedule your annual wellness visit today.',
    priority: 'medium',
    actionText: 'Schedule Now',
    createdAt: now,
    dismissed: false
  });

  return recommendations;
}

// Mock Pharmacies
export const mockPharmacies: Pharmacy[] = [
  {
    id: 'pharm_001',
    name: 'QuickCare Pharmacy',
    address: '100 Main Street, Austin, TX 78701',
    phone: '(512) 555-0500',
    distance: 0.5,
    hours: 'Open 24 hours',
    services: ['Prescription filling', 'Vaccinations', 'Health screenings', 'Delivery'],
    rating: 4.7,
    isOpen: true,
    deliveryAvailable: true,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Humana']
  },
  {
    id: 'pharm_002',
    name: 'Walgreens',
    address: '2500 Guadalupe St, Austin, TX 78705',
    phone: '(512) 555-0600',
    distance: 1.2,
    hours: '7AM - 10PM',
    services: ['Prescription filling', 'Photo', 'Vaccinations'],
    rating: 4.3,
    isOpen: true,
    deliveryAvailable: false,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare']
  },
  {
    id: 'pharm_003',
    name: 'CVS Pharmacy',
    address: '1800 Lamar Blvd, Austin, TX 78701',
    phone: '(512) 555-0700',
    distance: 2.0,
    hours: '8AM - 9PM',
    services: ['Prescription filling', 'MinuteClinic', 'Vaccinations'],
    rating: 4.1,
    isOpen: true,
    deliveryAvailable: true,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Cigna', 'Humana']
  },
  {
    id: 'pharm_004',
    name: 'Costco Pharmacy',
    address: '9900 S Interstate 35, Austin, TX 78748',
    phone: '(512) 555-0800',
    distance: 5.5,
    hours: '10AM - 8PM',
    services: ['Prescription filling', 'Vaccinations', 'Health screenings'],
    rating: 4.8,
    isOpen: false,
    deliveryAvailable: false,
    insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Humana']
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg_001',
    sender: { type: 'ai', name: 'PayPill AI' },
    subject: 'Smart Contract renewal is now due',
    content: 'Your insurance smart contract renewal is due. Please review and approve the updated terms to continue receiving benefits.',
    timestamp: '2024-03-15T09:30:00Z',
    read: false,
    category: 'health',
    actions: [{ label: 'Review Contract', action: 'review_contract' }]
  },
  {
    id: 'msg_002',
    sender: { type: 'doctor', name: 'Dr. Emily Rodriguez' },
    subject: 'Proof of Performance reward has occurred',
    content: 'Congratulations! Your consistent medication adherence has earned you a PPLL token reward. Keep up the great work!',
    timestamp: '2024-03-14T14:15:00Z',
    read: false,
    category: 'health',
    actions: [{ label: 'View Reward', action: 'view_reward' }]
  },
  {
    id: 'msg_003',
    sender: { type: 'system', name: 'PayPill System' },
    subject: 'Disease State Staging Updates',
    content: 'Your health profile has been updated with new staging information based on your recent lab results.',
    timestamp: '2024-03-13T11:00:00Z',
    read: true,
    category: 'system',
    actions: [{ label: 'View Updates', action: 'view_updates' }]
  },
  {
    id: 'msg_004',
    sender: { type: 'pharmacy', name: 'QuickCare Pharmacy' },
    subject: 'Your prescription is ready for pickup',
    content: 'Your Metformin prescription is ready. You can pick it up anytime during business hours.',
    timestamp: '2024-03-12T16:45:00Z',
    read: true,
    category: 'medication',
    actions: [{ label: 'View Details', action: 'view_prescription' }]
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'reminder',
    title: 'Medication Reminder',
    message: 'Time to take your Lisinopril (10mg)',
    timestamp: '2024-03-15T08:00:00Z',
    read: false,
    priority: 'high',
    actionText: 'Mark Taken',
    actionLink: '/medications'
  },
  {
    id: 'notif_002',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Physical therapy with City Physio tomorrow at 2:00 PM',
    timestamp: '2024-03-15T07:00:00Z',
    read: false,
    priority: 'medium',
    actionText: 'View Details',
    actionLink: '/appointments'
  },
  {
    id: 'notif_003',
    type: 'refill',
    title: 'Refill Available',
    message: 'Your Metformin prescription can be refilled now',
    timestamp: '2024-03-14T10:30:00Z',
    read: true,
    priority: 'medium',
    actionText: 'Request Refill',
    actionLink: '/medications'
  },
  {
    id: 'notif_004',
    type: 'insight',
    title: 'Health Insight',
    message: 'Your blood pressure readings have improved 15% this month!',
    timestamp: '2024-03-13T09:00:00Z',
    read: true,
    priority: 'low',
    actionText: 'View Trends',
    actionLink: '/dashboard'
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'apt_001',
    providerId: 'prov_003',
    providerName: 'City Physio',
    providerSpecialty: 'Physical Therapy',
    date: '2024-03-20',
    time: '14:00',
    duration: 60,
    type: 'in-person',
    status: 'scheduled',
    reason: 'Chronic back pain treatment',
    location: '789 Recovery Road, Austin, TX 78703',
    reminderSent: false
  },
  {
    id: 'apt_002',
    providerId: 'prov_001',
    providerName: 'Dr. Emily Rodriguez',
    providerSpecialty: 'Internal Medicine',
    date: '2024-03-25',
    time: '10:30',
    duration: 30,
    type: 'telehealth',
    status: 'confirmed',
    reason: 'Diabetes follow-up',
    reminderSent: true
  },
  {
    id: 'apt_003',
    providerId: 'prov_004',
    providerName: 'Dr. Sarah Williams',
    providerSpecialty: 'Endocrinology',
    date: '2024-04-05',
    time: '11:00',
    duration: 45,
    type: 'in-person',
    status: 'scheduled',
    reason: 'HbA1c review',
    location: '321 Hormone Lane, Austin, TX 78701',
    reminderSent: false
  }
];

// Mock Medication Orders
export const mockMedicationOrders: MedicationOrder[] = [
  {
    id: 'order_001',
    medicationId: 'med_001',
    medicationName: 'Metformin 500mg',
    pharmacyId: 'pharm_001',
    pharmacyName: 'QuickCare Pharmacy',
    quantity: 90,
    price: 18.50,
    status: 'ready',
    orderDate: '2024-03-14T10:00:00Z',
    deliveryType: 'pickup'
  },
  {
    id: 'order_002',
    medicationId: 'med_002',
    medicationName: 'Lisinopril 10mg',
    pharmacyId: 'pharm_002',
    pharmacyName: 'Walgreens',
    quantity: 30,
    price: 12.00,
    status: 'delivered',
    orderDate: '2024-03-10T14:30:00Z',
    deliveryType: 'delivery',
    trackingNumber: 'TRACK123456'
  }
];

// Generate AI Health Insights
export function generateAIHealthInsights(profile: HealthProfileData): HealthInsight[] {
  const insights: HealthInsight[] = [];
  const now = new Date().toISOString();

  // Risk-based insights
  if (profile.hasConditions) {
    insights.push({
      id: `insight_risk_${Date.now()}`,
      category: 'risk',
      title: 'Condition Management',
      description: `Your ${profile.conditions.length} health condition(s) require regular monitoring.`,
      metric: 'Conditions',
      value: profile.conditions.length.toString(),
      trend: 'stable',
      severity: 'medium',
      actionable: true,
      actionText: 'Schedule Follow-up',
      createdAt: now
    });
  }

  // Achievement insights
  if (profile.exerciseFrequency === 'Daily' || profile.exerciseFrequency === '3-5 times per week') {
    insights.push({
      id: `insight_achievement_${Date.now()}`,
      category: 'achievement',
      title: 'Great Exercise Habits!',
      description: 'Your regular exercise routine is improving your cardiovascular health.',
      metric: 'Exercise',
      value: profile.exerciseFrequency,
      trend: 'improving',
      actionable: false,
      createdAt: now
    });
  }

  // Opportunity insights
  if (profile.sleepHours === 'Less than 5 hours') {
    insights.push({
      id: `insight_opportunity_${Date.now()}`,
      category: 'opportunity',
      title: 'Sleep Improvement Opportunity',
      description: 'Increasing your sleep to 7-8 hours could improve your overall health.',
      metric: 'Sleep',
      value: profile.sleepHours,
      trend: 'declining',
      severity: 'medium',
      actionable: true,
      actionText: 'Sleep Tips',
      createdAt: now
    });
  }

  // Trend insights
  insights.push({
    id: `insight_trend_${Date.now()}`,
    category: 'trend',
    title: 'Health Profile Complete',
    description: 'Your comprehensive health profile enables personalized AI recommendations.',
    trend: 'new',
    actionable: false,
    createdAt: now
  });

  return insights;
}

// Generate Risk Assessment
export function generateRiskAssessment(profile: HealthProfileData): RiskAssessment {
  const now = new Date().toISOString();
  const nextAssessment = new Date();
  nextAssessment.setMonth(nextAssessment.getMonth() + 3);

  // Calculate overall risk based on profile data
  let overallScore = 30; // Base score
  const factors: string[] = [];

  if (profile.hasConditions) {
    overallScore += profile.conditions.length * 10;
    factors.push(...profile.conditions);
  }

  if (profile.smokingStatus === 'Daily smoker') {
    overallScore += 20;
    factors.push('Smoking');
  }

  if (profile.stressLevel.includes('High') || profile.stressLevel.includes('Very high')) {
    overallScore += 10;
    factors.push('High stress');
  }

  if (profile.sleepHours === 'Less than 5 hours') {
    overallScore += 10;
    factors.push('Insufficient sleep');
  }

  if (profile.exerciseFrequency === 'Never' || profile.exerciseFrequency === 'Rarely') {
    overallScore += 10;
    factors.push('Sedentary lifestyle');
  }

  // Cap at 100
  overallScore = Math.min(overallScore, 100);

  const overallRisk = overallScore < 40 ? 'low' : overallScore < 70 ? 'moderate' : 'high';

  return {
    overallRisk,
    overallScore,
    categories: {
      cardiovascular: {
        risk: overallScore > 60 ? 'high' : overallScore > 40 ? 'moderate' : 'low',
        score: Math.min(overallScore + 10, 100),
        factors: factors.filter(f => ['Hypertension', 'High cholesterol', 'Smoking'].some(hf => f.includes(hf)))
      },
      diabetes: {
        risk: profile.conditions.some(c => c.toLowerCase().includes('diabetes')) ? 'moderate' : 'low',
        score: profile.conditions.some(c => c.toLowerCase().includes('diabetes')) ? 55 : 25,
        factors: factors.filter(f => f.toLowerCase().includes('diabetes'))
      },
      mentalHealth: {
        risk: profile.stressLevel.includes('High') ? 'moderate' : 'low',
        score: profile.stressLevel.includes('High') ? 50 : 30,
        factors: factors.filter(f => f.includes('stress') || f.includes('anxiety') || f.includes('depression'))
      },
      lifestyle: {
        risk: profile.exerciseFrequency === 'Never' ? 'moderate' : 'low',
        score: profile.exerciseFrequency === 'Never' ? 55 : 35,
        factors: factors.filter(f => ['Sedentary lifestyle', 'Insufficient sleep', 'Smoking'].includes(f))
      }
    },
    lastUpdated: now,
    nextAssessment: nextAssessment.toISOString()
  };
}

// Generate Follow-up Tasks
export function generateFollowUpTasks(profile: HealthProfileData): FollowUpTask[] {
  const tasks: FollowUpTask[] = [];

  // Checkup task
  if (profile.lastCheckup.includes('More than') || profile.lastCheckup === 'Never') {
    tasks.push({
      id: `task_checkup_${Date.now()}`,
      title: 'Schedule Annual Checkup',
      description: 'It has been a while since your last comprehensive health checkup.',
      type: 'appointment',
      priority: 'high',
      completed: false
    });
  }

  // Lab work task
  if (profile.hasConditions) {
    tasks.push({
      id: `task_lab_${Date.now()}`,
      title: 'Complete Lab Work',
      description: 'Your conditions require regular monitoring through lab tests.',
      type: 'lab',
      priority: 'medium',
      completed: false
    });
  }

  // Medication review task
  if (profile.takesMedications) {
    tasks.push({
      id: `task_med_review_${Date.now()}`,
      title: 'Review Medications with Doctor',
      description: 'Ensure all your medications are still appropriate and effective.',
      type: 'medication',
      priority: 'medium',
      completed: false
    });
  }

  // Lifestyle task
  if (profile.exerciseFrequency === 'Never' || profile.exerciseFrequency === 'Rarely') {
    tasks.push({
      id: `task_exercise_${Date.now()}`,
      title: 'Start Exercise Routine',
      description: 'Aim for 20-30 minutes of moderate activity daily.',
      type: 'lifestyle',
      priority: 'medium',
      completed: false
    });
  }

  return tasks;
}

// Generate recommendations based on comprehensive health profile
import type { HealthProfileData } from '@/types';

export function generateRecommendationsFromHealthProfile(profile: HealthProfileData): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];
  const now = new Date().toISOString();

  // Lifestyle-based recommendations
  if (profile.exerciseFrequency === 'Never' || profile.exerciseFrequency === 'Rarely') {
    recommendations.push({
      id: `rec_exercise_${Date.now()}`,
      type: 'guidance',
      title: 'Start Moving for Better Health',
      description: 'Adding just 20-30 minutes of walking daily can improve your cardiovascular health and energy levels.',
      priority: 'medium',
      actionText: 'Learn More',
      createdAt: now,
      dismissed: false
    });
  }

  if (profile.sleepHours === 'Less than 5 hours' || profile.sleepHours === '5-6 hours') {
    recommendations.push({
      id: `rec_sleep_${Date.now()}`,
      type: 'guidance',
      title: 'Prioritize Your Sleep',
      description: 'Aim for 7-8 hours of quality sleep. Poor sleep is linked to many health issues including weight gain and weakened immunity.',
      priority: 'high',
      actionText: 'Sleep Tips',
      createdAt: now,
      dismissed: false
    });
  }

  // Stress and mental health
  if (profile.stressLevel.includes('High') || profile.stressLevel.includes('Very high')) {
    recommendations.push({
      id: `rec_stress_${Date.now()}`,
      type: 'guidance',
      title: 'Manage Your Stress Levels',
      description: 'High stress can impact your physical health. Consider mindfulness, exercise, or speaking with a mental health professional.',
      priority: 'high',
      actionText: 'Get Support',
      createdAt: now,
      dismissed: false
    });
  }

  // Smoking cessation
  if (profile.smokingStatus === 'Daily smoker' || profile.smokingStatus === 'Occasional smoker') {
    recommendations.push({
      id: `rec_smoking_${Date.now()}`,
      type: 'guidance',
      title: 'Quit Smoking - Your Body Will Thank You',
      description: 'Quitting smoking has immediate health benefits. We can connect you with cessation resources and support.',
      priority: 'high',
      actionText: 'Get Help Quitting',
      createdAt: now,
      dismissed: false
    });
  }

  // Symptom-based recommendations
  if (profile.hasSymptoms && profile.symptomSeverity.includes('Severe')) {
    recommendations.push({
      id: `rec_symptoms_${Date.now()}`,
      type: 'provider',
      title: 'Schedule a Medical Evaluation',
      description: 'Given the severity of your symptoms, we recommend scheduling an appointment with a healthcare provider soon.',
      priority: 'high',
      actionText: 'Find a Doctor',
      provider: mockProviders[0],
      createdAt: now,
      dismissed: false
    });
  }

  // Condition management
  if (profile.hasConditions) {
    if (profile.conditions.includes('Diabetes (Type 1)') || profile.conditions.includes('Diabetes (Type 2)')) {
      recommendations.push({
        id: `rec_diabetes_${Date.now()}`,
        type: 'guidance',
        title: 'Diabetes Management Support',
        description: 'Regular monitoring and specialist follow-ups are key. We can help you find endocrinologists and diabetes educators.',
        priority: 'high',
        actionText: 'Find Specialists',
        createdAt: now,
        dismissed: false
      });
    }

    if (profile.conditions.includes('Hypertension (High blood pressure)')) {
      recommendations.push({
        id: `rec_bp_${Date.now()}`,
        type: 'guidance',
        title: 'Blood Pressure Management',
        description: 'Monitor your BP regularly and maintain your medication schedule. Consider a home BP monitor for convenience.',
        priority: 'high',
        actionText: 'BP Monitors',
        createdAt: now,
        dismissed: false
      });
    }
  }

  // Insurance and care access
  if (profile.insuranceType === 'None/Uninsured') {
    recommendations.push({
      id: `rec_uninsured_${Date.now()}`,
      type: 'guidance',
      title: 'Explore Healthcare Options',
      description: 'Community health centers offer sliding-scale fees. We can also help you explore Medicaid or Marketplace plans.',
      priority: 'high',
      actionText: 'Explore Options',
      createdAt: now,
      dismissed: false
    });
  }

  if (!profile.hasPrimaryCare) {
    recommendations.push({
      id: `rec_pcp_${Date.now()}`,
      type: 'provider',
      title: 'Find a Primary Care Provider',
      description: 'A PCP is your healthcare quarterback. They coordinate your care and help catch issues early.',
      priority: 'medium',
      actionText: 'Find PCPs',
      provider: mockProviders[0],
      createdAt: now,
      dismissed: false
    });
  }

  // Medication savings
  if (profile.takesMedications) {
    recommendations.push({
      id: `rec_med_savings_${Date.now()}`,
      type: 'savings',
      title: 'Save on Your Prescriptions',
      description: 'Compare prices across pharmacies and explore generic alternatives. You could save significantly.',
      priority: 'medium',
      actionText: 'Compare Prices',
      savings: 150,
      createdAt: now,
      dismissed: false
    });
  }

  // Preventive care
  if (profile.lastCheckup.includes('More than') || profile.lastCheckup === 'Never') {
    recommendations.push({
      id: `rec_checkup_${Date.now()}`,
      type: 'preventive',
      title: 'Schedule Your Annual Checkup',
      description: 'It\'s been a while since your last checkup. Preventive care is often covered 100% by insurance.',
      priority: 'medium',
      actionText: 'Schedule Now',
      createdAt: now,
      dismissed: false
    });
  }

  // Family history screening
  if (profile.familyHistory.includes('Cancer (any type)') || profile.familyHistory.includes('Heart disease')) {
    recommendations.push({
      id: `rec_screening_${Date.now()}`,
      type: 'preventive',
      title: 'Consider Early Screening',
      description: 'Given your family history, talk to your doctor about starting screenings earlier than usual.',
      priority: 'medium',
      actionText: 'Learn More',
      createdAt: now,
      dismissed: false
    });
  }

  return recommendations;
}
