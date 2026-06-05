import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeftIcon, CheckIcon, ChevronRightIcon, HeartIcon, ActivityIcon, BrainIcon, ShieldIcon, PillIcon, StethoscopeIcon, TargetIcon } from '@/components/Icons';

// Types for form data
interface HealthProfileData {
  // Basic Demographics
  age: string;
  gender: string;
  genderOther?: string;
  location: string;
  
  // Current Symptoms
  hasSymptoms: boolean;
  symptoms: string[];
  symptomOther?: string;
  symptomDuration: string;
  symptomSeverity: string;
  
  // Medical History
  hasConditions: boolean;
  conditions: string[];
  conditionOther?: string;
  surgeries: string;
  allergies: string[];
  allergyOther?: string;
  
  // Family History
  familyHistory: string[];
  familyHistoryOther?: string;
  
  // Lifestyle
  exerciseFrequency: string;
  sleepHours: string;
  dietType: string;
  smokingStatus: string;
  alcoholConsumption: string;
  
  // Mental Wellbeing
  stressLevel: string;
  mentalHealthConcerns: string[];
  mentalHealthOther?: string;
  
  // Medications
  takesMedications: boolean;
  medications: string[];
  medicationOther?: string;
  supplements: string[];
  supplementOther?: string;
  
  // Insurance
  hasInsurance: boolean;
  insuranceType: string;
  insuranceProvider: string;
  
  // Access to Care
  hasPrimaryCare: boolean;
  lastCheckup: string;
  preferredCareType: string[];
  
  // Goals
  healthGoals: string[];
  goalOther?: string;
  priorityAreas: string[];
}

const initialData: HealthProfileData = {
  age: '',
  gender: '',
  location: '',
  hasSymptoms: false,
  symptoms: [],
  symptomDuration: '',
  symptomSeverity: '',
  hasConditions: false,
  conditions: [],
  surgeries: '',
  allergies: [],
  familyHistory: [],
  exerciseFrequency: '',
  sleepHours: '',
  dietType: '',
  smokingStatus: '',
  alcoholConsumption: '',
  stressLevel: '',
  mentalHealthConcerns: [],
  takesMedications: false,
  medications: [],
  supplements: [],
  hasInsurance: false,
  insuranceType: '',
  insuranceProvider: '',
  hasPrimaryCare: false,
  lastCheckup: '',
  preferredCareType: [],
  healthGoals: [],
  priorityAreas: [],
};

// Form steps configuration
const formSteps = [
  { id: 'demographics', title: 'About You', icon: HeartIcon },
  { id: 'symptoms', title: 'Current Symptoms', icon: ActivityIcon },
  { id: 'medical-history', title: 'Medical History', icon: StethoscopeIcon },
  { id: 'family-history', title: 'Family History', icon: HeartIcon },
  { id: 'lifestyle', title: 'Lifestyle', icon: ActivityIcon },
  { id: 'mental-health', title: 'Mental Wellbeing', icon: BrainIcon },
  { id: 'medications', title: 'Medications', icon: PillIcon },
  { id: 'insurance', title: 'Insurance & Access', icon: ShieldIcon },
  { id: 'goals', title: 'Health Goals', icon: TargetIcon },
];

interface HealthProfilingFormProps {
  onComplete: (data: HealthProfileData) => void;
  onCancel: () => void;
  isOnDemand?: boolean;
}

export function HealthProfilingForm({ onComplete, onCancel, isOnDemand = false }: HealthProfilingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<HealthProfileData>(initialData);
  const [showSummary, setShowSummary] = useState(false);

  const updateData = (field: keyof HealthProfileData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof HealthProfileData, item: string) => {
    setData(prev => {
      const current = prev[field] as string[];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(data);
  };

  const progress = ((currentStep + 1) / formSteps.length) * 100;
  const CurrentIcon = formSteps[currentStep].icon;

  if (showSummary) {
    return <HealthCompassSummary data={data} onConfirm={handleSubmit} onBack={() => setShowSummary(false)} />;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ArrowLeftIcon size={20} className="text-foreground" />
            </button>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-mfp-blue-100 dark:bg-mfp-blue-900/30 flex items-center justify-center">
                <CurrentIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {formSteps.length}</p>
                <h1 className="text-xl font-bold text-foreground">{formSteps[currentStep].title}</h1>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          {!isOnDemand && (
            <button
              onClick={onCancel}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Form Content */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
          {currentStep === 0 && (
            <DemographicsStep data={data} updateData={updateData} />
          )}
          {currentStep === 1 && (
            <SymptomsStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
          {currentStep === 2 && (
            <MedicalHistoryStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
          {currentStep === 3 && (
            <FamilyHistoryStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
          {currentStep === 4 && (
            <LifestyleStep data={data} updateData={updateData} />
          )}
          {currentStep === 5 && (
            <MentalHealthStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
          {currentStep === 6 && (
            <MedicationsStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
          {currentStep === 7 && (
            <InsuranceStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
          {currentStep === 8 && (
            <GoalsStep data={data} updateData={updateData} toggleArrayItem={toggleArrayItem} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-xl px-8 py-3 font-semibold"
          >
            {currentStep === formSteps.length - 1 ? 'View Summary' : 'Continue'}
            <ChevronRightIcon size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ==================== STEP COMPONENTS ====================

function DemographicsStep({ data, updateData }: { data: HealthProfileData; updateData: (f: keyof HealthProfileData, v: any) => void }) {
  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Prefer not to say'];
  const genders = ['Female', 'Male', 'Non-binary', 'Transgender', 'Genderqueer', 'Prefer not to say', 'Other'];
  const locations = ['Urban', 'Suburban', 'Rural', 'Small town'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">What is your age range?</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ageRanges.map(age => (
            <button
              key={age}
              onClick={() => updateData('age', age)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.age === age
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">What is your gender?</label>
        <div className="grid grid-cols-2 gap-3">
          {genders.map(gender => (
            <button
              key={gender}
              onClick={() => updateData('gender', gender)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.gender === gender
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
        {data.gender === 'Other' && (
          <input
            type="text"
            placeholder="Please specify"
            value={data.genderOther || ''}
            onChange={(e) => updateData('genderOther', e.target.value)}
            className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Where do you live?</label>
        <div className="grid grid-cols-2 gap-3">
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => updateData('location', loc)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.location === loc
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SymptomsStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const commonSymptoms = [
    'Headaches', 'Fatigue', 'Pain (general)', 'Back pain', 'Joint pain',
    'Digestive issues', 'Sleep problems', 'Anxiety', 'Low mood',
    'Shortness of breath', 'Dizziness', 'Skin issues', 'Weight changes',
    'Appetite changes', 'Frequent urination', 'None of these'
  ];
  const durations = ['Less than a week', '1-4 weeks', '1-3 months', '3-6 months', 'More than 6 months', 'On and off for years'];
  const severities = ['Mild - noticeable but doesn\'t affect daily life', 'Moderate - affects some activities', 'Severe - significantly impacts daily life', 'Very severe - unable to function normally'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Are you currently experiencing any symptoms?</label>
        <div className="flex gap-4">
          <button
            onClick={() => updateData('hasSymptoms', true)}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.hasSymptoms === true
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            Yes, I have symptoms
          </button>
          <button
            onClick={() => { updateData('hasSymptoms', false); updateData('symptoms', []); }}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.hasSymptoms === false
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            No symptoms currently
          </button>
        </div>
      </div>

      {data.hasSymptoms && (
        <>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">What symptoms are you experiencing? (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => toggleArrayItem('symptoms', symptom)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                    data.symptoms.includes(symptom)
                      ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                      : 'border-border hover:border-mfp-blue-300 text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      data.symptoms.includes(symptom) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                    }`}>
                      {data.symptoms.includes(symptom) && <CheckIcon size={12} className="text-white" />}
                    </div>
                    {symptom}
                  </div>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other symptoms (describe)"
              value={data.symptomOther || ''}
              onChange={(e) => updateData('symptomOther', e.target.value)}
              className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">How long have you had these symptoms?</label>
            <div className="space-y-2">
              {durations.map(duration => (
                <button
                  key={duration}
                  onClick={() => updateData('symptomDuration', duration)}
                  className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    data.symptomDuration === duration
                      ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                      : 'border-border hover:border-mfp-blue-300 text-foreground'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">How would you rate the severity?</label>
            <div className="space-y-2">
              {severities.map(severity => (
                <button
                  key={severity}
                  onClick={() => updateData('symptomSeverity', severity)}
                  className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    data.symptomSeverity === severity
                      ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                      : 'border-border hover:border-mfp-blue-300 text-foreground'
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MedicalHistoryStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const conditions = [
    'Diabetes (Type 1)', 'Diabetes (Type 2)', 'Hypertension (High blood pressure)',
    'High cholesterol', 'Heart disease', 'Asthma', 'COPD', 'Arthritis',
    'Thyroid disorder', 'Kidney disease', 'Liver disease', 'Cancer',
    'Autoimmune condition', 'Neurological condition', 'Mental health condition',
    'None of these'
  ];
  const commonAllergies = ['Penicillin', 'Sulfa drugs', 'Latex', 'Food allergies', 'Seasonal allergies', 'No known allergies'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Have you been diagnosed with any chronic conditions?</label>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => updateData('hasConditions', true)}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.hasConditions === true
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            Yes, I have conditions
          </button>
          <button
            onClick={() => { updateData('hasConditions', false); updateData('conditions', []); }}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.hasConditions === false
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            No conditions
          </button>
        </div>

        {data.hasConditions && (
          <div className="grid grid-cols-2 gap-3">
            {conditions.map(condition => (
              <button
                key={condition}
                onClick={() => toggleArrayItem('conditions', condition)}
                className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                  data.conditions.includes(condition)
                    ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                    : 'border-border hover:border-mfp-blue-300 text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    data.conditions.includes(condition) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                  }`}>
                    {data.conditions.includes(condition) && <CheckIcon size={12} className="text-white" />}
                  </div>
                  {condition}
                </div>
              </button>
            ))}
          </div>
        )}
        {data.hasConditions && (
          <input
            type="text"
            placeholder="Other conditions (specify)"
            value={data.conditionOther || ''}
            onChange={(e) => updateData('conditionOther', e.target.value)}
            className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Have you had any surgeries or hospitalizations?</label>
        <textarea
          placeholder="List any surgeries, procedures, or hospital stays (with approximate dates if possible)"
          value={data.surgeries}
          onChange={(e) => updateData('surgeries', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Do you have any allergies?</label>
        <div className="grid grid-cols-2 gap-3">
          {commonAllergies.map(allergy => (
            <button
              key={allergy}
              onClick={() => toggleArrayItem('allergies', allergy)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.allergies.includes(allergy)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.allergies.includes(allergy) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.allergies.includes(allergy) && <CheckIcon size={12} className="text-white" />}
                </div>
                {allergy}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FamilyHistoryStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const familyConditions = [
    'Heart disease', 'Stroke', 'Diabetes', 'High blood pressure',
    'High cholesterol', 'Cancer (any type)', 'Mental health conditions',
    'Autoimmune diseases', 'Alzheimer\'s/Dementia', 'Kidney disease',
    'Unknown / Not sure', 'No significant family history'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-mfp-blue-50 dark:bg-mfp-blue-900/20 p-4 rounded-xl mb-6">
        <p className="text-sm text-mfp-blue-800 dark:text-mfp-blue-300">
          Family health history helps identify potential risk factors. This information is kept private and secure.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Has anyone in your immediate family (parents, siblings) been diagnosed with any of the following? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {familyConditions.map(condition => (
            <button
              key={condition}
              onClick={() => toggleArrayItem('familyHistory', condition)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.familyHistory.includes(condition)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.familyHistory.includes(condition) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.familyHistory.includes(condition) && <CheckIcon size={12} className="text-white" />}
                </div>
                {condition}
              </div>
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Other family conditions (specify)"
          value={data.familyHistoryOther || ''}
          onChange={(e) => updateData('familyHistoryOther', e.target.value)}
          className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
        />
      </div>
    </div>
  );
}

function LifestyleStep({ data, updateData }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
}) {
  const exerciseOptions = ['Daily', '3-5 times per week', '1-2 times per week', 'Rarely', 'Never'];
  const sleepOptions = ['Less than 5 hours', '5-6 hours', '7-8 hours', '9+ hours', 'Varies significantly'];
  const dietOptions = ['Balanced/Varied', 'Vegetarian', 'Vegan', 'Keto/Low-carb', 'Mediterranean', 'Gluten-free', 'Other/No specific diet'];
  const smokingOptions = ['Never smoked', 'Former smoker', 'Occasional smoker', 'Daily smoker', 'Vape/e-cigarettes'];
  const alcoholOptions = ['Never', 'Rarely (special occasions)', 'Socially (1-2/week)', 'Regularly (3-5/week)', 'Daily'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">How often do you exercise?</label>
        <div className="space-y-2">
          {exerciseOptions.map(option => (
            <button
              key={option}
              onClick={() => updateData('exerciseFrequency', option)}
              className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.exerciseFrequency === option
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">How many hours of sleep do you typically get?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sleepOptions.map(option => (
            <button
              key={option}
              onClick={() => updateData('sleepHours', option)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.sleepHours === option
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">How would you describe your diet?</label>
        <div className="grid grid-cols-2 gap-3">
          {dietOptions.map(option => (
            <button
              key={option}
              onClick={() => updateData('dietType', option)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.dietType === option
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Smoking status</label>
        <div className="grid grid-cols-2 gap-3">
          {smokingOptions.map(option => (
            <button
              key={option}
              onClick={() => updateData('smokingStatus', option)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.smokingStatus === option
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Alcohol consumption</label>
        <div className="space-y-2">
          {alcoholOptions.map(option => (
            <button
              key={option}
              onClick={() => updateData('alcoholConsumption', option)}
              className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.alcoholConsumption === option
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MentalHealthStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const stressLevels = ['Low - I feel calm and in control', 'Moderate - Some stress but manageable', 'High - Stress affects my daily life', 'Very high - I feel overwhelmed frequently'];
  const mentalHealthConcerns = ['Anxiety', 'Depression', 'Sleep issues', 'Difficulty concentrating', 'Mood swings', 'Social withdrawal', 'None currently'];

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mb-6">
        <p className="text-sm text-purple-800 dark:text-purple-300">
          Your mental wellbeing is just as important as your physical health. All responses are confidential.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">How would you describe your current stress level?</label>
        <div className="space-y-2">
          {stressLevels.map(level => (
            <button
              key={level}
              onClick={() => updateData('stressLevel', level)}
              className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.stressLevel === level
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Are you experiencing any of the following? (Select all that apply)</label>
        <div className="grid grid-cols-2 gap-3">
          {mentalHealthConcerns.map(concern => (
            <button
              key={concern}
              onClick={() => toggleArrayItem('mentalHealthConcerns', concern)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.mentalHealthConcerns.includes(concern)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.mentalHealthConcerns.includes(concern) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.mentalHealthConcerns.includes(concern) && <CheckIcon size={12} className="text-white" />}
                </div>
                {concern}
              </div>
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Other concerns (specify)"
          value={data.mentalHealthOther || ''}
          onChange={(e) => updateData('mentalHealthOther', e.target.value)}
          className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
        />
      </div>
    </div>
  );
}

function MedicationsStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const commonMedications = ['Blood pressure medication', 'Diabetes medication', 'Cholesterol medication', 'Thyroid medication', 'Pain medication', 'Antidepressants/anti-anxiety', 'Birth control', 'Vitamins', 'None currently'];
  const commonSupplements = ['Multivitamin', 'Vitamin D', 'Vitamin B12', 'Iron', 'Calcium', 'Omega-3/Fish oil', 'Probiotics', 'Protein supplements', 'None'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Are you currently taking any prescription medications?</label>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => updateData('takesMedications', true)}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.takesMedications === true
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            Yes, I take medications
          </button>
          <button
            onClick={() => { updateData('takesMedications', false); updateData('medications', []); }}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.takesMedications === false
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            No medications
          </button>
        </div>

        {data.takesMedications && (
          <>
            <label className="block text-sm font-medium text-foreground mb-3">What medications are you taking? (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-3">
              {commonMedications.map(med => (
                <button
                  key={med}
                  onClick={() => toggleArrayItem('medications', med)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    data.medications.includes(med)
                      ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                      : 'border-border hover:border-mfp-blue-300 text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      data.medications.includes(med) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                    }`}>
                      {data.medications.includes(med) && <CheckIcon size={12} className="text-white" />}
                    </div>
                    {med}
                  </div>
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other medications (specify)"
              value={data.medicationOther || ''}
              onChange={(e) => updateData('medicationOther', e.target.value)}
              className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
            />
          </>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Do you take any supplements or over-the-counter products?</label>
        <div className="grid grid-cols-2 gap-3">
          {commonSupplements.map(supplement => (
            <button
              key={supplement}
              onClick={() => toggleArrayItem('supplements', supplement)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.supplements.includes(supplement)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.supplements.includes(supplement) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.supplements.includes(supplement) && <CheckIcon size={12} className="text-white" />}
                </div>
                {supplement}
              </div>
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Other supplements (specify)"
          value={data.supplementOther || ''}
          onChange={(e) => updateData('supplementOther', e.target.value)}
          className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
        />
      </div>
    </div>
  );
}

function InsuranceStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const insuranceTypes = ['Private/Employer', 'Medicare', 'Medicaid', 'VA/Military', 'Marketplace/ACA', 'None/Uninsured'];
  const insuranceProviders = ['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Kaiser', 'Humana', 'Other/Not sure'];
  const checkupOptions = ['Within the last year', '1-2 years ago', '2-5 years ago', 'More than 5 years ago', 'Never/I don\'t remember'];
  const careTypes = ['In-person doctor visits', 'Telehealth/Virtual visits', 'Urgent care', 'Emergency room', 'Specialist referrals'];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Do you have health insurance?</label>
        <div className="grid grid-cols-2 gap-3">
          {insuranceTypes.map(type => (
            <button
              key={type}
              onClick={() => updateData('insuranceType', type)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                data.insuranceType === type
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {data.insuranceType && data.insuranceType !== 'None/Uninsured' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Who is your insurance provider?</label>
          <div className="grid grid-cols-2 gap-3">
            {insuranceProviders.map(provider => (
              <button
                key={provider}
                onClick={() => updateData('insuranceProvider', provider)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.insuranceProvider === provider
                    ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                    : 'border-border hover:border-mfp-blue-300 text-foreground'
                }`}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Do you have a primary care doctor?</label>
        <div className="flex gap-4">
          <button
            onClick={() => updateData('hasPrimaryCare', true)}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.hasPrimaryCare === true
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            Yes, I have a PCP
          </button>
          <button
            onClick={() => updateData('hasPrimaryCare', false)}
            className={`flex-1 p-4 rounded-xl border-2 text-sm font-medium transition-all ${
              data.hasPrimaryCare === false
                ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                : 'border-border hover:border-mfp-blue-300 text-foreground'
            }`}
          >
            No, I don't
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">When was your last routine checkup?</label>
        <div className="space-y-2">
          {checkupOptions.map(option => (
            <button
              key={option}
              onClick={() => updateData('lastCheckup', option)}
              className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.lastCheckup === option
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">What types of care do you typically use? (Select all that apply)</label>
        <div className="grid grid-cols-2 gap-3">
          {careTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleArrayItem('preferredCareType', type)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.preferredCareType.includes(type)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.preferredCareType.includes(type) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.preferredCareType.includes(type) && <CheckIcon size={12} className="text-white" />}
                </div>
                {type}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoalsStep({ data, updateData, toggleArrayItem }: { 
  data: HealthProfileData; 
  updateData: (f: keyof HealthProfileData, v: any) => void;
  toggleArrayItem: (f: keyof HealthProfileData, item: string) => void;
}) {
  const goalOptions = [
    'Manage a chronic condition', 'Lose weight', 'Improve fitness', 'Eat healthier',
    'Reduce stress', 'Sleep better', 'Save money on healthcare', 'Find the right doctor',
    'Understand my insurance', 'Get preventive care', 'Manage medications better'
  ];
  const priorityOptions = ['Physical health', 'Mental health', 'Financial health', 'Preventive care', 'Managing existing conditions'];

  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl mb-6">
        <p className="text-sm text-green-800 dark:text-green-300">
          Almost done! Tell us about your health goals so we can personalize your recommendations.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">What are your main health goals? (Select all that apply)</label>
        <div className="grid grid-cols-2 gap-3">
          {goalOptions.map(goal => (
            <button
              key={goal}
              onClick={() => toggleArrayItem('healthGoals', goal)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.healthGoals.includes(goal)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.healthGoals.includes(goal) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.healthGoals.includes(goal) && <CheckIcon size={12} className="text-white" />}
                </div>
                {goal}
              </div>
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Other goals (specify)"
          value={data.goalOther || ''}
          onChange={(e) => updateData('goalOther', e.target.value)}
          className="mt-3 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">What areas would you like to prioritize? (Select up to 3)</label>
        <div className="grid grid-cols-2 gap-3">
          {priorityOptions.map(priority => (
            <button
              key={priority}
              onClick={() => toggleArrayItem('priorityAreas', priority)}
              className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                data.priorityAreas.includes(priority)
                  ? 'border-mfp-blue-500 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 text-mfp-blue-700 dark:text-mfp-blue-300'
                  : 'border-border hover:border-mfp-blue-300 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.priorityAreas.includes(priority) ? 'border-mfp-blue-500 bg-mfp-blue-500' : 'border-muted-foreground'
                }`}>
                  {data.priorityAreas.includes(priority) && <CheckIcon size={12} className="text-white" />}
                </div>
                {priority}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== HEALTH COMPASS SUMMARY ====================

interface HealthCompassSummaryProps {
  data: HealthProfileData;
  onConfirm: () => void;
  onBack: () => void;
}

function HealthCompassSummary({ data, onConfirm, onBack }: HealthCompassSummaryProps) {
  const generateRecommendations = () => {
    const recommendations: { category: string; items: string[] }[] = [];

    // Lifestyle Recommendations
    const lifestyleRecs: string[] = [];
    if (data.exerciseFrequency === 'Never' || data.exerciseFrequency === 'Rarely') {
      lifestyleRecs.push('Consider starting with light physical activity like walking 20-30 minutes daily');
    }
    if (data.sleepHours === 'Less than 5 hours' || data.sleepHours === '5-6 hours') {
      lifestyleRecs.push('Aim for 7-8 hours of sleep for optimal health and recovery');
    }
    if (data.stressLevel.includes('High') || data.stressLevel.includes('Very high')) {
      lifestyleRecs.push('Try stress-reduction techniques like meditation, deep breathing, or yoga');
    }
    if (data.smokingStatus === 'Daily smoker' || data.smokingStatus === 'Occasional smoker') {
      lifestyleRecs.push('Consider smoking cessation resources - quitting has immediate health benefits');
    }
    if (lifestyleRecs.length > 0) {
      recommendations.push({ category: 'Lifestyle Recommendations', items: lifestyleRecs });
    }

    // Medication Information
    const medRecs: string[] = [];
    if (data.takesMedications) {
      medRecs.push('Use our medication price comparison tool to find potential savings on your prescriptions');
      medRecs.push('Set up medication reminders to help maintain adherence');
      if (data.medications.includes('Pain medication')) {
        medRecs.push('Explore non-pharmacological pain management options like physical therapy');
      }
    }
    if (data.supplements.length > 0 && !data.supplements.includes('None')) {
      medRecs.push('Review your supplements with your doctor to ensure they don\'t interact with medications');
    }
    if (medRecs.length > 0) {
      recommendations.push({ category: 'Medication & Supplement Insights', items: medRecs });
    }

    // Insurance Benefits
    const insuranceRecs: string[] = [];
    if (data.insuranceType === 'None/Uninsured') {
      insuranceRecs.push('Explore community health centers that offer sliding-scale fees');
      insuranceRecs.push('Look into Medicaid eligibility or Marketplace plans during open enrollment');
      insuranceRecs.push('Consider direct primary care or cash-pay options for routine care');
    } else {
      insuranceRecs.push('Most plans cover preventive care (annual physicals, screenings) at 100%');
      if (data.hasConditions) {
        insuranceRecs.push('Check if your plan offers disease management programs for your conditions');
      }
      insuranceRecs.push('Review your plan\'s in-network providers to maximize benefits');
    }
    if (insuranceRecs.length > 0) {
      recommendations.push({ category: 'Insurance & Coverage Tips', items: insuranceRecs });
    }

    // Care Navigation
    const careRecs: string[] = [];
    if (!data.hasPrimaryCare) {
      careRecs.push('Finding a primary care doctor is important for coordinated care');
      careRecs.push('We can help you find in-network PCPs in your area');
    }
    if (data.lastCheckup.includes('More than') || data.lastCheckup === 'Never') {
      careRecs.push('Schedule a routine checkup - preventive care helps catch issues early');
    }
    if (data.hasSymptoms && data.symptomSeverity.includes('Severe')) {
      careRecs.push('Given your symptom severity, consider scheduling an appointment soon');
    }
    if (data.conditions.includes('Diabetes') || data.conditions.includes('Hypertension')) {
      careRecs.push('Regular specialist follow-ups are important for managing chronic conditions');
    }
    if (careRecs.length > 0) {
      recommendations.push({ category: 'Care Navigation', items: careRecs });
    }

    return recommendations;
  };

  const generateTimeline = () => {
    const timeline: { timeframe: string; actions: string[] }[] = [];

    // Immediate
    const immediate: string[] = [];
    if (data.hasSymptoms && data.symptomSeverity.includes('Severe')) {
      immediate.push('Schedule a medical evaluation for your symptoms');
    }
    if (!data.hasPrimaryCare) {
      immediate.push('Start searching for a primary care provider');
    }
    if (data.insuranceType === 'None/Uninsured') {
      immediate.push('Explore insurance options or community health resources');
    }
    if (immediate.length > 0) {
      timeline.push({ timeframe: 'Immediate (This Week)', actions: immediate });
    }

    // Short-term
    const shortTerm: string[] = [];
    if (data.lastCheckup.includes('More than') || data.lastCheckup === 'Never') {
      shortTerm.push('Schedule an annual wellness visit');
    }
    if (data.takesMedications) {
      shortTerm.push('Review your medications with your pharmacist or doctor');
    }
    if (data.hasConditions) {
      shortTerm.push('Set up any recommended specialist appointments');
    }
    if (shortTerm.length > 0) {
      timeline.push({ timeframe: 'Short-term (Next 30 Days)', actions: shortTerm });
    }

    // Long-term
    const longTerm: string[] = [];
    longTerm.push('Establish regular health screenings based on your age and risk factors');
    if (data.healthGoals.includes('Lose weight') || data.healthGoals.includes('Improve fitness')) {
      longTerm.push('Develop a sustainable fitness and nutrition routine');
    }
    if (data.mentalHealthConcerns.length > 0 && !data.mentalHealthConcerns.includes('None currently')) {
      longTerm.push('Consider ongoing mental health support if needed');
    }
    longTerm.push('Build a relationship with your healthcare team');
    timeline.push({ timeframe: 'Long-term (Ongoing)', actions: longTerm });

    return timeline;
  };

  const recommendations = generateRecommendations();
  const timeline = generateTimeline();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Health Compass Summary</h1>
            <p className="text-sm text-muted-foreground">Personalized recommendations based on your profile</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl mb-6">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Important:</strong> These are general recommendations, not medical advice. 
            Always consult with qualified healthcare professionals for personalized care.
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          {recommendations.map((section, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-mfp-blue-100 dark:bg-mfp-blue-900/30 flex items-center justify-center">
                  <span className="text-mfp-blue-600 dark:text-mfp-blue-400 text-sm">{index + 1}</span>
                </div>
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Health Timeline */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-mfp-blue-100 dark:bg-mfp-blue-900/30 flex items-center justify-center">
                <ActivityIcon size={16} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
              </div>
              Your Health Timeline
            </h2>
            <div className="space-y-6">
              {timeline.map((phase, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-mfp-blue-200 dark:border-mfp-blue-800">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-mfp-blue-500" />
                  <h3 className="font-semibold text-foreground mb-2">{phase.timeframe}</h3>
                  <ul className="space-y-2">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-mfp-blue-500">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 rounded-xl border-border text-foreground font-semibold py-4"
          >
            <ArrowLeftIcon size={18} className="mr-2" />
            Edit Responses
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-xl py-4 font-semibold"
          >
            Save to My Profile
            <ChevronRightIcon size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
