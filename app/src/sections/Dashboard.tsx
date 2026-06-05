import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/button';
import {
  SearchIcon,
  ChevronRightIcon,
  FileUpIcon,
  PillIcon,
  MessageSquareIcon,
  CalendarIcon,
  BellIcon,
  UserIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  FilterIcon,
  CloseIcon,
  PhoneIcon,
  MailIcon,
  AwardIcon,
  BuildingIcon,
  EducationIcon,
  CheckIcon,
  ChevronLeftIcon
} from '@/components/Icons';
import type { AIRecommendation, HealthInsight, HealthcareProvider } from '@/types';

// Simple area chart component
function RiskChart() {
  return (
    <div className="h-40 w-full">
      <svg viewBox="0 0 400 120" className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5BA8A0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5BA8A0" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q50,90 100,70 T200,50 T300,60 T400,40 L400,120 L0,120 Z"
          fill="url(#chartGradient)"
        />
        <path
          d="M0,100 Q50,90 100,70 T200,50 T300,60 T400,40"
          fill="none"
          stroke="#5BA8A0"
          strokeWidth="2"
        />
        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S'].map((month, i) => (
          <text key={month} x={i * 50} y="115" fontSize="10" fill="#9CA3AF">{month}</text>
        ))}
      </svg>
    </div>
  );
}

// Toggle button component
function ToggleButton({ options, active, onChange }: { options: string[]; active: string; onChange: (val: string) => void }) {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
            active === option
              ? 'bg-[#5BA8A0] text-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ 
  title, 
  children, 
  className = '',
  action
}: { 
  title?: string; 
  children: React.ReactNode; 
  className?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {action && (
            <button onClick={action.onClick} className="text-sm text-[#5BA8A0] hover:text-[#4A9A92] font-medium">
              {action.label}
            </button>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// List Item Component
function ListItem({ 
  title, 
  subtitle, 
  date, 
  hasArrow = true,
  icon,
  onClick
}: { 
  title: string; 
  subtitle?: string; 
  date?: string;
  hasArrow?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-5 px-5 transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="w-8 h-8 rounded-full bg-[#5BA8A0]/10 flex items-center justify-center flex-shrink-0">{icon}</div>}
        <div>
          <p className="font-medium text-gray-900 text-sm">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {date && <p className="text-xs text-gray-400">{date}</p>}
        </div>
      </div>
      {hasArrow && <ChevronRightIcon size={18} className="text-gray-400" />}
    </div>
  );
}

// Message Item Component
function MessageItem({ 
  from, 
  message, 
  type,
  unread = false
}: { 
  from: string; 
  message: string; 
  type: 'pharmacy' | 'doctor' | 'update' | 'system';
  unread?: boolean;
}) {
  const typeColors = {
    pharmacy: 'bg-blue-50 text-blue-600',
    doctor: 'bg-green-50 text-green-600',
    update: 'bg-purple-50 text-purple-600',
    system: 'bg-gray-50 text-gray-600'
  };
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-5 px-5 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${typeColors[type]}`}>{from}</span>
          {unread && <span className="w-2 h-2 bg-[#5BA8A0] rounded-full" />}
        </div>
        <p className="text-sm text-gray-700 truncate">{message}</p>
      </div>
      <ChevronRightIcon size={18} className="text-gray-400 flex-shrink-0" />
    </div>
  );
}

// AI Recommendation Card
function AIRecommendationCard({ recommendation }: { recommendation: AIRecommendation }) {
  const priorityColors = {
    high: 'bg-red-50 text-red-600 border-red-100',
    medium: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    low: 'bg-green-50 text-green-600 border-green-100'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${priorityColors[recommendation.priority]}`}>
          {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
        </span>
        {recommendation.savings && (
          <span className="text-sm font-semibold text-green-600">
            Save ${recommendation.savings}
          </span>
        )}
      </div>
      <h4 className="font-semibold text-gray-900 mb-1">{recommendation.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
      <Button 
        size="sm" 
        className="bg-[#5BA8A0] hover:bg-[#4A9A92] text-white text-xs"
      >
        {recommendation.actionText}
      </Button>
    </div>
  );
}

// Health Insight Card
function HealthInsightCard({ insight }: { insight: HealthInsight }) {
  const trendIcons = {
    improving: <TrendingUpIcon size={16} className="text-green-500" />,
    stable: <CheckCircleIcon size={16} className="text-blue-500" />,
    declining: <TrendingDownIcon size={16} className="text-red-500" />,
    new: <AlertCircleIcon size={16} className="text-[#5BA8A0]" />
  };

  const categoryColors = {
    risk: 'bg-red-50 text-red-600',
    trend: 'bg-blue-50 text-blue-600',
    opportunity: 'bg-yellow-50 text-yellow-600',
    achievement: 'bg-green-50 text-green-600'
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${categoryColors[insight.category]}`}>
        {trendIcons[insight.trend]}
      </div>
      <div className="flex-1">
        <h5 className="font-medium text-gray-900 text-sm">{insight.title}</h5>
        <p className="text-xs text-gray-600 mt-0.5">{insight.description}</p>
        {insight.actionable && insight.actionText && (
          <button className="text-xs text-[#5BA8A0] hover:text-[#4A9A92] font-medium mt-2">
            {insight.actionText}
          </button>
        )}
      </div>
    </div>
  );
}

// Provider Card
function ProviderCard({ provider, onBook, onProfile }: { 
  provider: HealthcareProvider; 
  onBook: (provider: HealthcareProvider) => void;
  onProfile: (provider: HealthcareProvider) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-[#5BA8A0]/10 flex items-center justify-center flex-shrink-0">
          <UserIcon size={24} className="text-[#5BA8A0]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{provider.name}</h4>
          <p className="text-sm text-gray-500">{provider.specialty}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarIcon size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600">{provider.rating}</span>
            <span className="text-xs text-gray-400">({provider.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <MapPinIcon size={12} />
            <span>{provider.distance} miles away</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button 
          size="sm" 
          className="flex-1 bg-[#5BA8A0] hover:bg-[#4A9A92] text-white text-xs"
          onClick={() => onBook(provider)}
        >
          Book
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 text-xs"
          onClick={() => onProfile(provider)}
        >
          Profile
        </Button>
      </div>
    </div>
  );
}

// Pharmacy Card
function PharmacyCard({ pharmacy }: { pharmacy: any }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{pharmacy.name}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{pharmacy.address}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <StarIcon size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600">{pharmacy.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPinIcon size={12} />
              <span>{pharmacy.distance} mi</span>
            </div>
            {pharmacy.isOpen && (
              <span className="text-xs text-green-600 font-medium">Open</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {pharmacy.services.slice(0, 3).map((service: string) => (
          <span key={service} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {service}
          </span>
        ))}
      </div>
      <Button size="sm" className="w-full mt-3 bg-[#5BA8A0] hover:bg-[#4A9A92] text-white text-xs">
        Order Here
      </Button>
    </div>
  );
}

// Booking Modal Component
function BookingModal({ 
  provider, 
  onClose, 
  onConfirm 
}: { 
  provider: HealthcareProvider; 
  onClose: () => void; 
  onConfirm: (bookingData: any) => void;
}) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [visitType, setVisitType] = useState<'in-person' | 'telehealth'>('in-person');
  const [reason, setReason] = useState('');

  const dates = [
    { day: 'Mon', date: 'Dec 16', full: '2024-12-16' },
    { day: 'Tue', date: 'Dec 17', full: '2024-12-17' },
    { day: 'Wed', date: 'Dec 18', full: '2024-12-18' },
    { day: 'Thu', date: 'Dec 19', full: '2024-12-19' },
    { day: 'Fri', date: 'Dec 20', full: '2024-12-20' },
  ];

  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    onConfirm({
      provider,
      date: selectedDate,
      time: selectedTime,
      visitType,
      reason
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeftIcon size={20} className="text-gray-600" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-gray-900">Book Appointment</h2>
              <p className="text-sm text-gray-500">Step {step} of 3</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <CloseIcon size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Provider Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#5BA8A0]/10 flex items-center justify-center">
              <UserIcon size={28} className="text-[#5BA8A0]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{provider.name}</h3>
              <p className="text-sm text-gray-500">{provider.specialty}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarIcon size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600">{provider.rating}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Select Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                <div className="grid grid-cols-5 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedDate === d.full
                          ? 'bg-[#5BA8A0] text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <p className="text-xs font-medium">{d.day}</p>
                      <p className="text-sm font-bold">{d.date.split(' ')[1]}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-[#5BA8A0] text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Visit Type & Reason */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Visit Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVisitType('in-person')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      visitType === 'in-person'
                        ? 'border-[#5BA8A0] bg-[#5BA8A0]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <BuildingIcon size={24} className={visitType === 'in-person' ? 'text-[#5BA8A0]' : 'text-gray-400'} />
                    <p className="font-medium text-gray-900 mt-2">In-Person</p>
                    <p className="text-xs text-gray-500">Visit the clinic</p>
                  </button>
                  <button
                    onClick={() => setVisitType('telehealth')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      visitType === 'telehealth'
                        ? 'border-[#5BA8A0] bg-[#5BA8A0]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MessageSquareIcon size={24} className={visitType === 'telehealth' ? 'text-[#5BA8A0]' : 'text-gray-400'} />
                    <p className="font-medium text-gray-900 mt-2">Telehealth</p>
                    <p className="text-xs text-gray-500">Video consultation</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Reason for Visit</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/20 focus:border-[#5BA8A0] resize-none"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckIcon size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-900">Ready to Confirm</p>
                  <p className="text-sm text-green-700">Please review your appointment details</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">
                    {dates.find(d => d.full === selectedDate)?.date || selectedDate}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Visit Type</span>
                  <span className="font-medium text-gray-900 capitalize">{visitType}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Provider</span>
                  <span className="font-medium text-gray-900">{provider.name}</span>
                </div>
                {reason && (
                  <div className="py-3">
                    <span className="text-gray-500 block mb-2">Reason</span>
                    <span className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg block">{reason}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={step === 1 && (!selectedDate || !selectedTime)}
              className="w-full bg-[#5BA8A0] hover:bg-[#4A9A92] text-white py-3 rounded-xl font-medium disabled:opacity-50"
            >
              Continue
              <ChevronRightIcon size={18} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              className="w-full bg-[#5BA8A0] hover:bg-[#4A9A92] text-white py-3 rounded-xl font-medium"
            >
              Confirm Booking
              <CheckIcon size={18} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Provider Profile Modal
function ProviderProfileModal({ 
  provider, 
  onClose,
  onBook
}: { 
  provider: HealthcareProvider; 
  onClose: () => void;
  onBook: (provider: HealthcareProvider) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Provider Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <CloseIcon size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#5BA8A0]/10 flex items-center justify-center mx-auto mb-4">
              <UserIcon size={48} className="text-[#5BA8A0]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
            <p className="text-[#5BA8A0] font-medium">{provider.specialty}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <StarIcon size={18} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">{provider.rating}</span>
              <span className="text-gray-500">({provider.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-[#5BA8A0]">15+</p>
              <p className="text-xs text-gray-500">Years Exp.</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-[#5BA8A0]">2.5k+</p>
              <p className="text-xs text-gray-500">Patients</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-[#5BA8A0]">98%</p>
              <p className="text-xs text-gray-500">Satisfaction</p>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <UserIcon size={18} className="text-[#5BA8A0]" />
              About
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dr. {provider.name.split(' ').pop()} is a board-certified {provider.specialty.toLowerCase()} with over 15 years of experience. 
              They specialize in patient-centered care and have received numerous awards for clinical excellence.
            </p>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <EducationIcon size={18} className="text-[#5BA8A0]" />
              Education & Credentials
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AwardIcon size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Medical Degree</p>
                  <p className="text-xs text-gray-500">Harvard Medical School</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AwardIcon size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Residency</p>
                  <p className="text-xs text-gray-500">Johns Hopkins Hospital</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircleIcon size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Board Certification</p>
                  <p className="text-xs text-gray-500">American Board of Medical Specialties</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPinIcon size={18} className="text-[#5BA8A0]" />
              Location
            </h4>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700">123 Healthcare Avenue, Suite 200</p>
              <p className="text-sm text-gray-500">New York, NY 10001</p>
              <p className="text-sm text-[#5BA8A0] mt-2">{provider.distance} miles from you</p>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <PhoneIcon size={18} className="text-[#5BA8A0]" />
              Contact
            </h4>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <PhoneIcon size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">(123) 456-7890</span>
              </a>
              <a href="mailto:contact@provider.com" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <MailIcon size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">contact@provider.com</span>
              </a>
            </div>
          </div>

          {/* Insurance */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Accepted Insurance</h4>
            <div className="flex flex-wrap gap-2">
              {['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealth', 'Medicare'].map((ins) => (
                <span key={ins} className="text-xs bg-[#5BA8A0]/10 text-[#5BA8A0] px-3 py-1.5 rounded-full font-medium">
                  {ins}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-medium"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              onBook(provider);
            }}
            className="flex-1 bg-[#5BA8A0] hover:bg-[#4A9A92] text-white py-3 rounded-xl font-medium"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { state, dispatch } = useApp();
  const [chartPeriod, setChartPeriod] = useState('Monthly');
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
  // Booking and Profile modal states
  const [selectedProvider, setSelectedProvider] = useState<HealthcareProvider | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProviderProfile, setShowProviderProfile] = useState(false);

  // Get data from state or use mock data
  const messages = state.messages.length > 0 ? state.messages : [];
  const notifications = state.notifications.length > 0 ? state.notifications : [];
  const appointments = state.appointments.length > 0 ? state.appointments : [];
  const medicationOrders = state.medicationOrders.length > 0 ? state.medicationOrders : [];
  const recommendations = state.recommendations.length > 0 ? state.recommendations : [];
  const healthInsights = state.healthInsights.length > 0 ? state.healthInsights : [];
  const providers = state.providers || [];
  const pharmacies = state.pharmacies || [];

  const unreadMessageCount = messages.filter(m => !m.read).length;
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const handleBookProvider = (provider: HealthcareProvider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleViewProfile = (provider: HealthcareProvider) => {
    setSelectedProvider(provider);
    setShowProviderProfile(true);
  };

  const handleConfirmBooking = (bookingData: any) => {
    // Add the appointment to state
    dispatch({
      type: 'BOOK_APPOINTMENT',
      payload: {
        id: `apt_${Date.now()}`,
        providerId: bookingData.provider.id,
        providerName: bookingData.provider.name,
        providerSpecialty: bookingData.provider.specialty,
        date: bookingData.date,
        time: bookingData.time,
        type: bookingData.visitType,
        status: 'confirmed',
        notes: bookingData.reason
      }
    });
    
    // Show success notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif_${Date.now()}`,
        type: 'appointment',
        title: 'Appointment Booked',
        message: `Your appointment with ${bookingData.provider.name} has been confirmed for ${bookingData.date} at ${bookingData.time}.`,
        timestamp: new Date().toISOString(),
        read: false
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <BookingModal
          provider={selectedProvider}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* Provider Profile Modal */}
      {showProviderProfile && selectedProvider && (
        <ProviderProfileModal
          provider={selectedProvider}
          onClose={() => setShowProviderProfile(false)}
          onBook={handleBookProvider}
        />
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#5BA8A0]">
                <path 
                  d="M8 4C8 2.89543 8.89543 2 10 2H18C23.5228 2 28 6.47715 28 12C28 17.5228 23.5228 22 18 22H14V28C14 29.1046 13.1046 30 12 30H10C8.89543 30 8 29.1046 8 28V4Z" 
                  fill="currentColor"
                />
                <path 
                  d="M14 8H18C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16H14V8Z" 
                  fill="white"
                />
              </svg>
              <span className="font-bold text-gray-900">PayPill</span>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80">
              <SearchIcon size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search doctors, medications, services..." 
                className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BellIcon size={20} />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Messages */}
            <button 
              onClick={() => setShowMessages(!showMessages)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageSquareIcon size={20} />
              {unreadMessageCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#5BA8A0] text-white text-xs rounded-full flex items-center justify-center">
                  {unreadMessageCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => dispatch({ type: 'LOGOUT' })}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign Out
            </button>
            <Button className="bg-[#5BA8A0] hover:bg-[#4A9A92] text-white rounded-lg px-5 py-2 text-sm font-medium">
              My Account
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 fixed left-0 top-16 bottom-0 overflow-y-auto z-30">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="w-5 h-5 rounded bg-gray-200" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileUpIcon size={18} />
              Upload Data
            </button>
            <button
              onClick={() => setActiveTab('refill')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'refill'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <PillIcon size={18} />
              Order Refill
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquareIcon size={18} />
              Messages
              {unreadMessageCount > 0 && (
                <span className="ml-auto bg-[#5BA8A0] text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadMessageCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CalendarIcon size={18} />
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('providers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'providers'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UserIcon size={18} />
              Find Providers
            </button>
            <button
              onClick={() => setActiveTab('pharmacies')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'pharmacies'
                  ? 'bg-[#5BA8A0]/10 text-[#5BA8A0]'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapPinIcon size={18} />
              Pharmacies
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Page Title */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'overview' && 'Overview'}
                {activeTab === 'upload' && 'Upload Health Data'}
                {activeTab === 'refill' && 'Medication Refills'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'appointments' && 'Appointments'}
                {activeTab === 'providers' && 'Find Healthcare Providers'}
                {activeTab === 'pharmacies' && 'Nearby Pharmacies'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {activeTab === 'overview' && 'Your personalized health dashboard powered by AI'}
                {activeTab === 'upload' && 'Securely upload your medical records and documents'}
                {activeTab === 'refill' && 'Request refills and track your medication orders'}
                {activeTab === 'messages' && 'Stay connected with your healthcare team'}
                {activeTab === 'appointments' && 'Manage your upcoming appointments'}
                {activeTab === 'providers' && 'Find the right doctors and specialists for you'}
                {activeTab === 'pharmacies' && 'Order medications from pharmacies near you'}
              </p>
            </div>
            {activeTab === 'overview' && (
              <div className="flex items-center gap-2">
                <ToggleButton 
                  options={['Daily', 'Weekly', 'Monthly']} 
                  active={chartPeriod} 
                  onChange={setChartPeriod} 
                />
              </div>
            )}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* AI Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.slice(0, 3).map(rec => (
                      <AIRecommendationCard key={rec.id} recommendation={rec} />
                    ))}
                  </div>
                </div>
              )}

              {/* Dashboard Grid */}
              <div className="grid grid-cols-12 gap-6">
                {/* Relative Risk Summary */}
                <div className="col-span-12 lg:col-span-7">
                  <DashboardCard>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Relative Risk Summary</h3>
                      <ToggleButton 
                        options={['Monthly', 'Quarterly']} 
                        active={chartPeriod} 
                        onChange={setChartPeriod} 
                      />
                    </div>
                    <RiskChart />
                  </DashboardCard>
                </div>

                {/* Upcoming Labs/Rx Refills */}
                <div className="col-span-12 lg:col-span-5">
                  <DashboardCard title="Upcoming Labs/Rx Refills Due">
                    <div className="space-y-1">
                      <ListItem 
                        title="CBC, Chemistry Panel Lab Draw"
                        date="August 9, 2018"
                        icon={<CalendarIcon size={16} className="text-[#5BA8A0]" />}
                      />
                      <ListItem 
                        title="Metformin, Lantus Refills Due"
                        date="September 8, 2019"
                        icon={<PillIcon size={16} className="text-[#5BA8A0]" />}
                      />
                      <ListItem 
                        title="Carvedilol, Losartan Refills Due"
                        date="October 28, 2019"
                        icon={<PillIcon size={16} className="text-[#5BA8A0]" />}
                      />
                    </div>
                  </DashboardCard>
                </div>

                {/* PayPill Messages */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <DashboardCard 
                    title="PayPill Messages" 
                    action={{ label: 'View All', onClick: () => setActiveTab('messages') }}
                  >
                    <div className="space-y-1">
                      <MessageItem 
                        from="Pharmacy"
                        message="Smart Contract renewal is now due"
                        type="pharmacy"
                        unread
                      />
                      <MessageItem 
                        from="Doctor"
                        message="Proof of Performance reward has occurred"
                        type="doctor"
                        unread
                      />
                      <MessageItem 
                        from="Update"
                        message="Disease State Staging Updates"
                        type="update"
                      />
                    </div>
                  </DashboardCard>
                </div>

                {/* Orders Pending */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <DashboardCard title="Orders Pending">
                    <div className="space-y-1">
                      {medicationOrders.length > 0 ? (
                        medicationOrders.map(order => (
                          <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{order.medicationName}</p>
                              <p className="text-xs text-gray-500">{order.pharmacyName}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'ready' ? 'bg-green-100 text-green-600' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Glyburide</p>
                              <p className="text-xs text-gray-500">$0 Co-Pay</p>
                            </div>
                            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Pending</span>
                          </div>
                          <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Furosemide</p>
                              <p className="text-xs text-gray-500">$0 Co-Pay</p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Ready</span>
                          </div>
                          <div className="flex items-center justify-between py-3">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Sertraline</p>
                              <p className="text-xs text-gray-500">$0 Co-Pay</p>
                            </div>
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Processing</span>
                          </div>
                        </>
                      )}
                    </div>
                  </DashboardCard>
                </div>

                {/* Files for Review */}
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <DashboardCard title="Files for Review">
                    <div className="space-y-1">
                      <ListItem 
                        title="ICD-10 Update"
                        subtitle="Quarter III"
                        date=""
                        icon={<FileUpIcon size={16} className="text-[#5BA8A0]" />}
                      />
                      <ListItem 
                        title="Ejection Fraction"
                        subtitle="As needed Monthly"
                        date=""
                        icon={<FileUpIcon size={16} className="text-[#5BA8A0]" />}
                      />
                      <ListItem 
                        title="Pharmacogenomics Review"
                        subtitle=""
                        date="December 2018"
                        icon={<FileUpIcon size={16} className="text-[#5BA8A0]" />}
                      />
                    </div>
                  </DashboardCard>
                </div>

                {/* Health Insights */}
                {healthInsights.length > 0 && (
                  <div className="col-span-12">
                    <h3 className="font-semibold text-gray-900 mb-4">AI Health Insights</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {healthInsights.map(insight => (
                        <HealthInsightCard key={insight.id} insight={insight} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Providers */}
                <div className="col-span-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Recommended Providers</h3>
                    <button 
                      onClick={() => setActiveTab('providers')}
                      className="text-sm text-[#5BA8A0] hover:text-[#4A9A92] font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {providers.slice(0, 4).map(provider => (
                      <ProviderCard 
                        key={provider.id} 
                        provider={provider} 
                        onBook={handleBookProvider}
                        onProfile={handleViewProfile}
                      />
                    ))}
                  </div>
                </div>

                {/* Nearby Pharmacies */}
                <div className="col-span-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Nearby Pharmacies</h3>
                    <button 
                      onClick={() => setActiveTab('pharmacies')}
                      className="text-sm text-[#5BA8A0] hover:text-[#4A9A92] font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pharmacies.slice(0, 4).map(pharmacy => (
                      <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Providers Tab */}
          {activeTab === 'providers' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name, specialty, or location..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/20 focus:border-[#5BA8A0]"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon size={16} />
                  Filter
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {providers.map(provider => (
                  <ProviderCard 
                    key={provider.id} 
                    provider={provider} 
                    onBook={handleBookProvider}
                    onProfile={handleViewProfile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pharmacies Tab */}
          {activeTab === 'pharmacies' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search pharmacies..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/20 focus:border-[#5BA8A0]"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <MapPinIcon size={16} />
                  Near Me
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pharmacies.map(pharmacy => (
                  <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
                ))}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                <Button 
                  className="bg-[#5BA8A0] hover:bg-[#4A9A92] text-white"
                  onClick={() => setActiveTab('providers')}
                >
                  <CalendarIcon size={16} className="mr-2" />
                  Book New Appointment
                </Button>
              </div>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(apt => (
                    <div key={apt.id} className="bg-white rounded-xl border border-gray-100 p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-[#5BA8A0]/10 flex items-center justify-center flex-shrink-0">
                            <CalendarIcon size={28} className="text-[#5BA8A0]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{apt.providerName}</h4>
                            <p className="text-sm text-gray-500">{apt.providerSpecialty}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <CalendarIcon size={14} />
                                {new Date(apt.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <ClockIcon size={14} />
                                {apt.time}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                apt.type === 'telehealth' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                              }`}>
                                {apt.type === 'telehealth' ? 'Telehealth' : 'In-Person'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => dispatch({ type: 'CANCEL_APPOINTMENT', payload: apt.id })}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <CalendarIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-500 mb-4">Book your first appointment to get started</p>
                  <Button 
                    className="bg-[#5BA8A0] hover:bg-[#4A9A92] text-white"
                    onClick={() => setActiveTab('providers')}
                  >
                    Book Appointment
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {messages.length > 0 ? (
                  messages.map((msg, i) => (
                    <div 
                      key={msg.id} 
                      className={`p-5 hover:bg-gray-50 cursor-pointer transition-colors ${i !== messages.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.sender.type === 'ai' ? 'bg-purple-100' :
                          msg.sender.type === 'doctor' ? 'bg-green-100' :
                          msg.sender.type === 'pharmacy' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <MessageSquareIcon size={20} className={`${
                            msg.sender.type === 'ai' ? 'text-purple-600' :
                            msg.sender.type === 'doctor' ? 'text-green-600' :
                            msg.sender.type === 'pharmacy' ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{msg.sender.name}</span>
                            {!msg.read && <span className="w-2 h-2 bg-[#5BA8A0] rounded-full" />}
                          </div>
                          <h4 className="text-sm font-medium text-gray-800">{msg.subject}</h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{msg.content}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(msg.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <MessageSquareIcon size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">QuickCare Pharmacy</span>
                            <span className="w-2 h-2 bg-[#5BA8A0] rounded-full" />
                          </div>
                          <h4 className="text-sm font-medium text-gray-800">Smart Contract renewal is now due</h4>
                          <p className="text-sm text-gray-500 mt-1">Your insurance smart contract renewal is due. Please review and approve...</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <UserIcon size={20} className="text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">Dr. Emily Rodriguez</span>
                            <span className="w-2 h-2 bg-[#5BA8A0] rounded-full" />
                          </div>
                          <h4 className="text-sm font-medium text-gray-800">Proof of Performance reward has occurred</h4>
                          <p className="text-sm text-gray-500 mt-1">Congratulations! Your consistent medication adherence has earned you...</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <BellIcon size={20} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">PayPill System</span>
                          <h4 className="text-sm font-medium text-gray-800 mt-1">Disease State Staging Updates</h4>
                          <p className="text-sm text-gray-500 mt-1">Your health profile has been updated with new staging information...</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Refill Tab */}
          {activeTab === 'refill' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <DashboardCard title="Request Refill">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Medication</label>
                      <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/20 focus:border-[#5BA8A0]">
                        <option>Metformin 500mg</option>
                        <option>Lisinopril 10mg</option>
                        <option>Ibuprofen 200mg</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Pharmacy</label>
                      <select className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/20 focus:border-[#5BA8A0]">
                        <option>QuickCare Pharmacy (0.5 mi)</option>
                        <option>Walgreens (1.2 mi)</option>
                        <option>CVS Pharmacy (2.0 mi)</option>
                      </select>
                    </div>
                    <Button className="w-full bg-[#5BA8A0] hover:bg-[#4A9A92] text-white">
                      Request Refill
                    </Button>
                  </div>
                </DashboardCard>

                <DashboardCard title="Refill History">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Metformin 500mg</p>
                        <p className="text-xs text-gray-500">QuickCare Pharmacy</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Lisinopril 10mg</p>
                        <p className="text-xs text-gray-500">Walgreens</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Ibuprofen 200mg</p>
                        <p className="text-xs text-gray-500">CVS Pharmacy</p>
                      </div>
                      <span className="text-xs text-yellow-600 font-medium">Pending</span>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <DashboardCard title="Upload Health Documents">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#5BA8A0] transition-colors cursor-pointer">
                  <FileUpIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h3>
                  <p className="text-sm text-gray-500 mb-4">Support for PDF, JPG, PNG files up to 10MB</p>
                  <Button className="bg-[#5BA8A0] hover:bg-[#4A9A92] text-white">
                    Select Files
                  </Button>
                </div>
              </DashboardCard>

              <DashboardCard title="Recently Uploaded">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                        <FileUpIcon size={20} className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Lab_Results_March2024.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileUpIcon size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Insurance_Card_Front.jpg</p>
                        <p className="text-xs text-gray-500">Uploaded 1 week ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </DashboardCard>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
