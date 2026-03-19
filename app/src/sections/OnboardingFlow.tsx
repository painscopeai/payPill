import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PayPillLogo,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  ShieldIcon,
  LockIcon,
  UserIcon,
  HeartIcon,
  PillIcon,
  WalletIcon
} from '@/components/Icons';
import { healthTags, insuranceCarriers, medicationDatabase } from '@/data/mockData';

// Flatten medication list
const allMedications = Object.values(medicationDatabase).flat();

export function OnboardingFlow() {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(state.onboardingStep);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data states
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    state: '',
    postcode: '',
    country: ''
  });
  
  // City autocomplete suggestions
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  
  // Common cities for autocomplete
  const commonCities = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
    'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
    'Portland, OR', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD', 'Milwaukee, WI',
    'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Mesa, AZ', 'Sacramento, CA',
    'Atlanta, GA', 'Kansas City, MO', 'Colorado Springs, CO', 'Omaha, NE', 'Raleigh, NC',
    'Miami, FL', 'Long Beach, CA', 'Virginia Beach, VA', 'Oakland, CA', 'Minneapolis, MN',
    'Tulsa, OK', 'Tampa, FL', 'Arlington, TX', 'New Orleans, LA', 'Wichita, KS',
    'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bradford',
    'Liverpool', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leicester', 'Coventry',
    'Nottingham', 'Newcastle', 'Hull', 'Plymouth', 'Stoke-on-Trent', 'Wolverhampton',
    'Derby', 'Swansea', 'Southampton', 'Aberdeen', 'Portsmouth', 'York', 'Peterborough',
    'Dundee', 'Oxford', 'Cambridge', 'Reading', 'Brighton', 'Norwich', 'Exeter'
  ];
  
  // Country list
  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Japan', 'South Korea',
    'Singapore', 'India', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia',
    'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Israel', 'UAE', 'Saudi Arabia',
    'China', 'Hong Kong', 'Taiwan', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines',
    'Vietnam', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Greece', 'Portugal',
    'Russia', 'Ukraine', 'Turkey', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal'
  ];
  
  // Handle city input change with autocomplete
  const handleCityChange = (value: string) => {
    setProfileData({ ...profileData, city: value });
    if (value.length >= 2) {
      const filtered = commonCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setCitySuggestions(filtered);
      setShowCitySuggestions(filtered.length > 0);
    } else {
      setShowCitySuggestions(false);
    }
  };
  
  // Select city from suggestions
  const selectCity = (city: string) => {
    setProfileData({ ...profileData, city });
    setShowCitySuggestions(false);
  };
  
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [insuranceData, setInsuranceData] = useState({
    carrier: '',
    memberId: '',
    groupNumber: ''
  });

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      dispatch({ type: 'SET_ONBOARDING_STEP', payload: step + 1 });
    } else {
      // Complete onboarding
      setIsLoading(true);
      setTimeout(() => {
        dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      dispatch({ type: 'SET_ONBOARDING_STEP', payload: step - 1 });
    } else {
      dispatch({ type: 'SET_VIEW', payload: 'landing' });
    }
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const toggleMedication = (medication: string) => {
    setSelectedMedications(prev =>
      prev.includes(medication)
        ? prev.filter(m => m !== medication)
        : [...prev, medication]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return profileData.firstName && profileData.lastName && profileData.email && profileData.dateOfBirth;
      case 1:
        return true; // Health conditions are optional
      case 2:
        return true; // Medications are optional
      case 3:
        return insuranceData.carrier && insuranceData.memberId;
      default:
        return true;
    }
  };

  const stepTitles = [
    { title: 'Personal Identity', subtitle: 'Let\'s start with the basics', icon: UserIcon },
    { title: 'Health Profile', subtitle: 'Select any conditions that apply', icon: HeartIcon },
    { title: 'Current Medications', subtitle: 'What medications are you taking?', icon: PillIcon },
    { title: 'Insurance Bridge', subtitle: 'Connect your coverage', icon: WalletIcon }
  ];

  const CurrentIcon = stepTitles[step].icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ChevronLeftIcon size={20} />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center gap-2">
              <PayPillLogo size={40} className="sm:w-12" />
              <span className="text-lg sm:text-xl font-black text-foreground tracking-tight">PayPill</span>
            </div>
            
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Skip
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white px-4">
        <div className="max-w-3xl mx-auto py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Step {step + 1} of {totalSteps}</span>
            <span className="text-sm font-semibold text-mfp-blue-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-36 pb-32 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Step Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-mfp-blue-100 text-mfp-blue-600 mb-4">
              <CurrentIcon size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {stepTitles[step].title}
            </h1>
            <p className="text-gray-600">{stepTitles[step].subtitle}</p>
          </div>

          {/* Step Content */}
          <div className="mfp-card p-6 sm:p-8">
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name *</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      placeholder="John"
                      className="rounded-xl h-12 border-gray-200 focus:border-mfp-blue-500 focus:ring-mfp-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="rounded-xl h-12 border-gray-200 focus:border-mfp-blue-500 focus:ring-mfp-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="rounded-xl h-12 border-gray-200 focus:border-mfp-blue-500 focus:ring-mfp-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="rounded-xl h-12 border-gray-200 focus:border-mfp-blue-500 focus:ring-mfp-blue-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-gray-700 font-semibold">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      className="rounded-xl h-12 border-gray-200 focus:border-mfp-blue-500 focus:ring-mfp-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-700 font-semibold">Gender</Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                    >
                      <SelectTrigger className="rounded-xl h-12 border-gray-200">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="intersex">Intersex</SelectItem>
                        <SelectItem value="non_binary">Non-binary</SelectItem>
                        <SelectItem value="transgender_female">Transgender Female</SelectItem>
                        <SelectItem value="transgender_male">Transgender Male</SelectItem>
                        <SelectItem value="genderqueer">Genderqueer</SelectItem>
                        <SelectItem value="genderfluid">Genderfluid</SelectItem>
                        <SelectItem value="agender">Agender</SelectItem>
                        <SelectItem value="bigender">Bigender</SelectItem>
                        <SelectItem value="two_spirit">Two-Spirit</SelectItem>
                        <SelectItem value="demiboy">Demiboy</SelectItem>
                        <SelectItem value="demigirl">Demigirl</SelectItem>
                        <SelectItem value="androgynous">Androgynous</SelectItem>
                        <SelectItem value="neutrois">Neutrois</SelectItem>
                        <SelectItem value="pangender">Pangender</SelectItem>
                        <SelectItem value="third_gender">Third Gender</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not_say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-semibold">Location</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative col-span-2 sm:col-span-1">
                      <Input
                        placeholder="City (type to search)"
                        value={profileData.city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        onFocus={() => profileData.city.length >= 2 && setShowCitySuggestions(true)}
                        onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                        className="rounded-xl h-12 border-gray-200"
                      />
                      {showCitySuggestions && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
                          {citySuggestions.map((city, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => selectCity(city)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Input
                      placeholder="State / Province"
                      value={profileData.state}
                      onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      className="rounded-xl h-12 border-gray-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Postcode"
                      value={profileData.postcode}
                      onChange={(e) => setProfileData({ ...profileData, postcode: e.target.value })}
                      className="rounded-xl h-12 border-gray-200"
                    />
                    <Select
                      value={profileData.country}
                      onValueChange={(value) => setProfileData({ ...profileData, country: value })}
                    >
                      <SelectTrigger className="rounded-xl h-12 border-gray-200">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '_')}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-mfp-yellow-50 border border-mfp-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-mfp-yellow-800">
                    <strong>Optional:</strong> Select any health conditions you have. 
                    This helps us provide better recommendations.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-700">Select Health Conditions</Label>
                  <div className="flex flex-wrap gap-2">
                    {healthTags.slice(0, 30).map((condition) => (
                      <button
                        key={condition}
                        onClick={() => toggleCondition(condition)}
                        className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          selectedConditions.includes(condition)
                            ? 'bg-mfp-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selectedConditions.includes(condition) && (
                          <CheckIcon size={14} className="inline mr-1" />
                        )}
                        {condition}
                      </button>
                    ))}
                  </div>
                  {selectedConditions.length > 0 && (
                    <p className="text-sm text-mfp-blue-600 font-medium">
                      {selectedConditions.length} condition(s) selected
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-mfp-yellow-50 border border-mfp-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-mfp-yellow-800">
                    <strong>Optional:</strong> Add your current medications so we can 
                    find savings and check for interactions.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-700">Select Medications</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {allMedications.map((med) => (
                      <button
                        key={med.name}
                        onClick={() => toggleMedication(med.name)}
                        className={`p-4 rounded-xl text-left text-sm transition-all ${
                          selectedMedications.includes(med.name)
                            ? 'bg-mfp-blue-500 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="font-semibold">{med.name}</div>
                        <div className={`text-xs mt-1 ${selectedMedications.includes(med.name) ? 'text-blue-200' : 'text-gray-500'}`}>
                          {med.category}
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedMedications.length > 0 && (
                    <p className="text-sm text-mfp-blue-600 font-medium">
                      {selectedMedications.length} medication(s) selected
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-mfp-blue-50 border border-mfp-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <ShieldIcon size={20} className="text-mfp-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure Connection</p>
                    <p className="text-sm text-gray-600">
                      Your insurance information is encrypted and only used to verify coverage.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="carrier" className="text-gray-700 font-semibold">Insurance Carrier *</Label>
                    <Select
                      value={insuranceData.carrier}
                      onValueChange={(value) => setInsuranceData({ ...insuranceData, carrier: value })}
                    >
                      <SelectTrigger className="rounded-xl h-12 border-gray-200">
                        <SelectValue placeholder="Select your insurance" />
                      </SelectTrigger>
                      <SelectContent>
                        {insuranceCarriers.map((carrier) => (
                          <SelectItem key={carrier} value={carrier}>
                            {carrier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memberId" className="text-gray-700 font-semibold">Member ID *</Label>
                    <div className="relative">
                      <Input
                        id="memberId"
                        value={insuranceData.memberId}
                        onChange={(e) => setInsuranceData({ ...insuranceData, memberId: e.target.value })}
                        placeholder="Enter your member ID"
                        className="rounded-xl h-12 pr-10 border-gray-200"
                      />
                      <LockIcon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groupNumber" className="text-gray-700 font-semibold">Group Number (Optional)</Label>
                    <Input
                      id="groupNumber"
                      value={insuranceData.groupNumber}
                      onChange={(e) => setInsuranceData({ ...insuranceData, groupNumber: e.target.value })}
                      placeholder="Enter group number if applicable"
                      className="rounded-xl h-12 border-gray-200"
                    />
                  </div>
                </div>

                {/* Simulated Insurance Preview */}
                {insuranceData.carrier && (
                  <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-lg border border-gray-200 shadow-sm">
                        {insuranceData.carrier.split(' ').map(w => w[0]).join('').slice(0, 3)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{insuranceData.carrier}</p>
                        <p className="text-xs text-gray-500">Connected Provider</p>
                      </div>
                      <Badge className="ml-auto bg-green-100 text-green-700 border-0 font-semibold">
                        <CheckIcon size={12} className="mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Coverage Type</span>
                        <span className="font-semibold text-gray-900">PPO</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Deductible</span>
                        <span className="font-semibold text-gray-900">$1,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Out-of-Pocket Max</span>
                        <span className="font-semibold text-gray-900">$5,000</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto flex gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 rounded-xl py-6 h-14 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
          >
            <ChevronLeftIcon size={20} className="mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className="flex-1 bg-mfp-blue-500 hover:bg-mfp-blue-600 text-white rounded-xl py-6 h-14 font-semibold disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Setting up...
              </span>
            ) : step === totalSteps - 1 ? (
              <>
                Complete Setup
                <CheckIcon size={20} className="ml-2" />
              </>
            ) : (
              <>
                Continue
                <ChevronRightIcon size={20} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
}
