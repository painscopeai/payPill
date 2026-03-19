import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { useTheme } from '@/store/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  PayPillLogo,
  CompassIcon,
  SavingsIcon,
  ProviderIcon,
  ShieldIcon,
  PillIcon,
  DoctorIcon,
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  TrendingDownIcon,
  InfoIcon,
  ChevronRightIcon,
  MenuIcon,
  ActivityIcon,
  CalendarIcon,
  FileTextIcon,
  CheckIcon,
  SearchIcon,
  FilterIcon,
  ClockIcon,
  MailIcon,
  SunIcon,
  MoonIcon
} from '@/components/Icons';
import type { AIRecommendation, HealthcareProvider, TimelineEvent } from '@/types';

export function Dashboard() {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; provider?: HealthcareProvider }>({ isOpen: false });
  const [savingsModal, setSavingsModal] = useState<{ isOpen: boolean; medication?: string; savings?: number }>({ isOpen: false });
  const [appointmentModal, setAppointmentModal] = useState<{ isOpen: boolean; title?: string }>({ isOpen: false });
  const [insuranceModal, setInsuranceModal] = useState(false);

  const user = state.user;
  const recommendations = state.recommendations.filter(r => !r.dismissed);
  const timeline = state.timeline;
  const providers = state.providers;

  const handleDismissRecommendation = (id: string) => {
    dispatch({ type: 'DISMISS_RECOMMENDATION', payload: id });
  };

  const handleBookAppointment = (provider?: HealthcareProvider) => {
    setBookingModal({ isOpen: true, provider });
  };

  const handleViewSavings = (medication: string, savings: number) => {
    setSavingsModal({ isOpen: true, medication, savings });
  };

  const handleScheduleAppointment = (title: string) => {
    setAppointmentModal({ isOpen: true, title });
  };

  const handleComparePrices = (medication: string) => {
    setSavingsModal({ isOpen: true, medication, savings: 28.50 });
  };

  const getRecommendationIcon = (type: AIRecommendation['type']) => {
    switch (type) {
      case 'medication':
      case 'savings':
        return <SavingsIcon size={20} className="text-green-600" />;
      case 'provider':
        return <ProviderIcon size={20} className="text-mfp-blue-600" />;
      case 'guidance':
        return <InfoIcon size={20} className="text-mfp-yellow-600" />;
      case 'preventive':
        return <ActivityIcon size={20} className="text-mfp-blue-600" />;
      default:
        return <CompassIcon size={20} className="text-mfp-blue-600" />;
    }
  };

  const getRecommendationColor = (type: AIRecommendation['type']) => {
    switch (type) {
      case 'medication':
      case 'savings':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'provider':
        return 'bg-mfp-blue-50 dark:bg-mfp-blue-900/20 border-mfp-blue-200 dark:border-mfp-blue-800';
      case 'guidance':
        return 'bg-mfp-yellow-50 dark:bg-mfp-yellow-900/20 border-mfp-yellow-200 dark:border-mfp-yellow-800';
      case 'preventive':
        return 'bg-mfp-blue-50 dark:bg-mfp-blue-900/20 border-mfp-blue-200 dark:border-mfp-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getTimelineIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'profile_update':
        return <ActivityIcon size={16} className="text-mfp-blue-600" />;
      case 'condition_added':
        return <FileTextIcon size={16} className="text-mfp-blue-600" />;
      case 'medication_added':
        return <PillIcon size={16} className="text-green-600" />;
      case 'insurance_connected':
        return <ShieldIcon size={16} className="text-mfp-blue-600" />;
      case 'appointment':
        return <CalendarIcon size={16} className="text-mfp-yellow-600" />;
      case 'ai_recommendation':
        return <CompassIcon size={16} className="text-purple-600" />;
      default:
        return <InfoIcon size={16} className="text-gray-600" />;
    }
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <MenuIcon size={20} className="text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <PayPillLogo size={44} className="sm:w-12" />
              <span className="text-lg sm:text-xl font-black text-foreground tracking-tight hidden sm:inline">PayPill</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors border border-border"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <MoonIcon size={18} className="text-muted-foreground" />
              ) : (
                <SunIcon size={18} className="text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'privacy' })}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <ShieldIcon size={16} />
              Privacy Shield
            </button>
            <Avatar className="w-10 h-10 border-2 border-mfp-blue-100 dark:border-mfp-blue-900">
              <AvatarFallback className="bg-gradient-to-br from-mfp-blue-500 to-mfp-blue-600 text-white text-sm font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-background border-r border-border z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Health Compass Card */}
          <div className="mb-6 p-5 bg-gradient-to-br from-mfp-blue-500 to-mfp-blue-600 rounded-2xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <CompassIcon size={24} />
              </div>
              <div>
                <p className="font-bold">Health Compass</p>
                <p className="text-xs text-blue-200">AI-Powered</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-blue-100">
                {recommendations.length} new
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {recommendations.length}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: CompassIcon },
              { id: 'providers', label: 'Providers', icon: DoctorIcon },
              { id: 'medications', label: 'Medications', icon: PillIcon },
              { id: 'privacy', label: 'Privacy Shield', icon: ShieldIcon },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'privacy') {
                    dispatch({ type: 'SET_VIEW', payload: 'privacy' });
                  } else {
                    setActiveTab(item.id);
                  }
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === item.id && item.id !== 'privacy'
                    ? 'bg-mfp-blue-50 dark:bg-mfp-blue-900/30 text-mfp-blue-600 dark:text-mfp-blue-400'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* On-Demand Health Profiling */}
          <div className="mt-6">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'health-profiling' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
            >
              <ActivityIcon size={20} />
              On-Demand Health Profiling
            </button>
          </div>

          {/* Daily Progress */}
          <div className="mt-8 p-4 bg-secondary rounded-2xl">
            <p className="text-sm font-semibold text-foreground mb-3">Daily Progress</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className="font-semibold text-mfp-blue-500">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Savings</span>
                  <span className="font-semibold text-green-500">$127</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'landing' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-secondary transition-colors"
            >
              <span className="text-lg">→</span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 min-h-screen">
        {activeTab === 'overview' && (
          <OverviewTab 
            user={user} 
            state={state} 
            recommendations={recommendations} 
            timeline={timeline} 
            providers={providers}
            handleDismissRecommendation={handleDismissRecommendation}
            getRecommendationIcon={getRecommendationIcon}
            getRecommendationColor={getRecommendationColor}
            getTimelineIcon={getTimelineIcon}
            onBookAppointment={handleBookAppointment}
            onViewSavings={handleViewSavings}
            onScheduleAppointment={handleScheduleAppointment}
            onComparePrices={handleComparePrices}
            onInsuranceClick={() => setInsuranceModal(true)}
          />
        )}
        {activeTab === 'providers' && (
          <ProvidersTab providers={state.providers} onBookAppointment={handleBookAppointment} />
        )}
        {activeTab === 'medications' && (
          <MedicationsTab medications={state.medications} onViewSavings={handleViewSavings} />
        )}
      </main>

      {/* Booking Modal */}
      <Dialog open={bookingModal.isOpen} onOpenChange={(open) => setBookingModal({ isOpen: open })}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">Book Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {bookingModal.provider && (
              <div className="flex items-center gap-3 p-3 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mfp-blue-500 to-mfp-blue-600 flex items-center justify-center text-white font-bold">
                  {bookingModal.provider.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-bold text-foreground">{bookingModal.provider.name}</p>
                  <p className="text-sm text-muted-foreground">{bookingModal.provider.specialty}</p>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Select Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Select Time</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none">
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Reason for Visit</label>
              <textarea className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none resize-none" rows={3} placeholder="Briefly describe your symptoms or reason..." />
            </div>
            <Button className="w-full bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-xl py-3 font-semibold">
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Savings Modal */}
      <Dialog open={savingsModal.isOpen} onOpenChange={(open) => setSavingsModal({ isOpen: open })}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">💰 Savings Opportunity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <p className="text-4xl font-extrabold text-green-600">${savingsModal.savings?.toFixed(2)}</p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">Potential Annual Savings</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                <span className="text-muted-foreground">Current</span>
                <span className="font-semibold text-foreground line-through">${((savingsModal.savings || 0) * 3).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <span className="text-green-700 dark:text-green-400">With Generic</span>
                <span className="font-semibold text-green-700 dark:text-green-400">${((savingsModal.savings || 0) * 2).toFixed(2)}</span>
              </div>
            </div>
            <div className="p-4 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 rounded-xl">
              <p className="text-sm text-mfp-blue-800 dark:text-mfp-blue-300">
                <strong>Tip:</strong> Ask your doctor or pharmacist about switching to the generic version of {savingsModal.medication}.
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-xl py-3 font-semibold">
              Find Nearby Pharmacies
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Appointment Modal */}
      <Dialog open={appointmentModal.isOpen} onOpenChange={(open) => setAppointmentModal({ isOpen: open })}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">📅 Schedule Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground">{appointmentModal.title}</p>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Provider</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none">
                <option>Dr. Emily Rodriguez - Internal Medicine</option>
                <option>Dr. Michael Chen - Orthopedics</option>
                <option>Dr. Sarah Williams - Endocrinology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Preferred Date</label>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
              <textarea className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 outline-none resize-none" rows={2} placeholder="Any specific concerns..." />
            </div>
            <Button className="w-full bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-xl py-3 font-semibold">
              Request Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Insurance Modal */}
      <Dialog open={insuranceModal} onOpenChange={setInsuranceModal}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">🏥 Insurance Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {state.insurance && (
              <>
                <div className="flex items-center gap-4 p-4 bg-mfp-blue-50 dark:bg-mfp-blue-900/20 rounded-2xl">
                  <div className="w-16 h-16 rounded-xl bg-mfp-blue-100 dark:bg-mfp-blue-900/30 flex items-center justify-center font-bold text-mfp-blue-600 text-xl">
                    {state.insurance.carrier.split(' ').map((w: string) => w[0]).join('').slice(0, 3)}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">{state.insurance.carrier}</p>
                    <p className="text-muted-foreground">{state.insurance.planName}</p>
                    <Badge className="mt-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0">
                      <CheckIcon size={10} className="mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-xl text-center">
                    <p className="text-2xl font-bold text-foreground">$1,500</p>
                    <p className="text-xs text-muted-foreground">Deductible</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-xl text-center">
                    <p className="text-2xl font-bold text-foreground">$5,000</p>
                    <p className="text-xs text-muted-foreground">Out-of-Pocket Max</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Member ID</span>
                    <span className="font-semibold text-gray-900">{state.insurance.memberId}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Group Number</span>
                    <span className="font-semibold text-gray-900">{state.insurance.groupNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Effective Date</span>
                    <span className="font-semibold text-gray-900">{new Date(state.insurance.effectiveDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {['Primary', 'Prescription', 'Dental', 'Vision', 'Specialist', 'Emergency'].map((coverage) => (
                    <div key={coverage} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <CheckIcon size={14} className="text-green-600" />
                      <span className="text-xs font-medium text-green-700">{coverage}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full border-gray-200 text-gray-600 rounded-xl py-3">
                  Download Insurance Card
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProviderCard({ provider, onBookAppointment }: { provider: HealthcareProvider; onBookAppointment?: (provider: HealthcareProvider) => void }) {
  return (
    <div className="mfp-card-hover p-5 bg-card border-border">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mfp-blue-500 to-mfp-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {provider.name.split(' ').slice(-1)[0][0]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground truncate">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarIcon size={14} className="text-mfp-yellow-500 fill-mfp-yellow-500" />
            <span className="text-sm font-semibold text-foreground">{provider.rating}</span>
            <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon size={14} />
          <span className="truncate">{provider.distance} miles away</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <PhoneIcon size={14} />
          <span>{provider.phone}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 text-xs font-semibold">
          <CheckIcon size={10} className="mr-1" />
          In Network
        </Badge>
        {provider.telemedicine && (
          <Badge className="bg-mfp-blue-100 dark:bg-mfp-blue-900/30 text-mfp-blue-700 dark:text-mfp-blue-400 border-0 text-xs font-semibold">
            Telehealth
          </Badge>
        )}
      </div>

      <Button 
        className="w-full mt-4 rounded-lg bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white font-semibold"
        onClick={() => onBookAppointment?.(provider)}
      >
        Book Appointment
      </Button>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ 
  user, 
  state, 
  recommendations, 
  timeline, 
  providers,
  handleDismissRecommendation,
  getRecommendationIcon,
  getRecommendationColor,
  getTimelineIcon,
  onBookAppointment,
  onViewSavings,
  onScheduleAppointment,
  onComparePrices,
  onInsuranceClick
}: any) {
  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Welcome back, {user?.firstName || 'there'}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what your Health Compass found today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="mfp-card p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mfp-blue-100 dark:bg-mfp-blue-900/30 flex items-center justify-center">
              <ActivityIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{state.healthConditions.length}</p>
              <p className="text-xs text-muted-foreground">Conditions</p>
            </div>
          </div>
        </div>
        <div className="mfp-card p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <PillIcon size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{state.medications.length}</p>
              <p className="text-xs text-muted-foreground">Medications</p>
            </div>
          </div>
        </div>
        <div className="mfp-card p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mfp-yellow-100 dark:bg-mfp-yellow-900/30 flex items-center justify-center">
              <DoctorIcon size={20} className="text-mfp-yellow-600 dark:text-mfp-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{state.providers.length}</p>
              <p className="text-xs text-muted-foreground">Providers</p>
            </div>
          </div>
        </div>
        <div className="mfp-card p-4 bg-card border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <SavingsIcon size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$127</p>
              <p className="text-xs text-muted-foreground">Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations Feed */}
      {recommendations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CompassIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
            <h2 className="text-lg font-bold text-foreground">AI Recommendations</h2>
            <Badge className="bg-mfp-blue-100 dark:bg-mfp-blue-900/30 text-mfp-blue-700 dark:text-mfp-blue-400 border-0 font-semibold">
              {recommendations.length} New
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.slice(0, 4).map((rec: AIRecommendation) => (
              <div
                key={rec.id}
                className={`mfp-card p-5 border-l-4 bg-card ${getRecommendationColor(rec.type)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background shadow-sm flex items-center justify-center">
                    {getRecommendationIcon(rec.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground">{rec.title}</h3>
                      {rec.savings && (
                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 flex-shrink-0 font-semibold">
                          <TrendingDownIcon size={12} className="mr-1" />
                          ${rec.savings.toFixed(2)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <Button
                        size="sm"
                        className="rounded-lg bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white font-semibold"
                        onClick={() => {
                          if (rec.actionText === 'Book Appointment') {
                            onBookAppointment(rec.provider);
                          } else if (rec.actionText === 'View Savings') {
                            onViewSavings('Ibuprofen', rec.savings || 46.50);
                          } else if (rec.actionText === 'Schedule Now') {
                            onScheduleAppointment(rec.title);
                          } else if (rec.actionText === 'Compare Prices') {
                            onComparePrices('Current Medications');
                          }
                        }}
                      >
                        {rec.actionText}
                      </Button>
                      <button
                        onClick={() => handleDismissRecommendation(rec.id)}
                        className="text-sm text-muted-foreground hover:text-foreground font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Timeline */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <ActivityIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
            <h2 className="text-lg font-bold text-foreground">Health Timeline</h2>
          </div>

          <div className="mfp-card p-6 bg-card border-border">
            <div className="space-y-6">
              {timeline.slice(0, 6).map((event: TimelineEvent, index: number) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      {getTimelineIcon(event.type)}
                    </div>
                    {index < 5 && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 rounded-xl border-border text-muted-foreground font-semibold hover:bg-secondary">
              View Full Timeline
              <ChevronRightIcon size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Insurance Card */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
              <h2 className="text-lg font-bold text-foreground">Insurance</h2>
            </div>

            <div 
              className="mfp-card p-5 cursor-pointer hover:shadow-lg transition-shadow bg-card border-border"
              onClick={onInsuranceClick}
            >
              {state.insurance ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-mfp-blue-100 dark:bg-mfp-blue-900/30 flex items-center justify-center font-bold text-mfp-blue-600 text-lg">
                      {state.insurance.carrier.split(' ').map((w: string) => w[0]).join('').slice(0, 3)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{state.insurance.carrier}</p>
                      <p className="text-sm text-muted-foreground">{state.insurance.planName}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member ID</span>
                      <span className="font-semibold text-foreground">{state.insurance.memberId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage</span>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 text-xs font-semibold">
                        <CheckIcon size={10} className="mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-secondary rounded-xl">
                        <p className="text-xl font-bold text-foreground">$1,500</p>
                        <p className="text-xs text-muted-foreground">Deductible</p>
                      </div>
                      <div className="p-3 bg-secondary rounded-xl">
                        <p className="text-xl font-bold text-foreground">$5,000</p>
                        <p className="text-xs text-muted-foreground">Out-of-Pocket</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-center text-mfp-blue-500 font-medium">Click for details →</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No insurance connected</p>
                  <Button className="rounded-lg bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white font-semibold">
                    Connect Insurance
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
              <h2 className="text-lg font-bold text-foreground">Upcoming</h2>
            </div>

            <div className="mfp-card p-4 bg-card border-border">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-mfp-yellow-100 dark:bg-mfp-yellow-900/30 flex items-center justify-center">
                  <DoctorIcon size={20} className="text-mfp-yellow-600 dark:text-mfp-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Dr. Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Internal Medicine</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <CalendarIcon size={14} />
                    <span>Mar 25, 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Recommendations */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DoctorIcon size={20} className="text-mfp-blue-600 dark:text-mfp-blue-400" />
            <h2 className="text-lg font-bold text-foreground">Recommended Providers</h2>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg border-border text-muted-foreground font-semibold hover:bg-secondary">
            View All
            <ChevronRightIcon size={16} className="ml-1" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.slice(0, 3).map((provider: HealthcareProvider) => (
            <ProviderCard key={provider.id} provider={provider} onBookAppointment={onBookAppointment} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Providers Tab Component
function ProvidersTab({ providers, onBookAppointment }: { providers: HealthcareProvider[]; onBookAppointment?: (provider: HealthcareProvider) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [telehealthFilter, setTelehealthFilter] = useState('all');

  const specialties = ['all', ...Array.from(new Set(providers.map(p => p.specialty)))];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || provider.specialty === specialtyFilter;
    const matchesTelehealth = telehealthFilter === 'all' || 
                             (telehealthFilter === 'yes' && provider.telemedicine) ||
                             (telehealthFilter === 'no' && !provider.telemedicine);
    return matchesSearch && matchesSpecialty && matchesTelehealth;
  });

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Healthcare Providers
        </h1>
        <p className="text-muted-foreground mt-1">
          Find and manage your healthcare providers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mfp-card p-4 mb-6 bg-card border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search providers by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl h-12 border-border bg-background text-foreground"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-40 rounded-xl h-12 border-border bg-background">
                <FilterIcon size={16} className="mr-2" />
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.filter(s => s !== 'all').map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={telehealthFilter} onValueChange={setTelehealthFilter}>
              <SelectTrigger className="w-40 rounded-xl h-12 border-border bg-background">
                <SelectValue placeholder="Telehealth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="yes">Telehealth Available</SelectItem>
                <SelectItem value="no">In-Person Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredProviders.length}</span> providers
        </p>
        <Button className="rounded-xl bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white font-semibold">
          <DoctorIcon size={18} className="mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Providers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((provider) => (
          <div key={provider.id} className="mfp-card-hover p-5 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mfp-blue-500 to-mfp-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {provider.name.split(' ').slice(-1)[0][0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate">{provider.name}</h3>
                <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarIcon size={14} className="text-mfp-yellow-500 fill-mfp-yellow-500" />
                  <span className="text-sm font-semibold text-foreground">{provider.rating}</span>
                  <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon size={14} />
                <span className="truncate">{provider.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon size={14} />
                <span>{provider.phone}</span>
              </div>
              {provider.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MailIcon size={14} />
                  <span className="truncate">{provider.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ClockIcon size={14} />
                <span>{provider.availability}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 text-xs font-semibold">
                <CheckIcon size={10} className="mr-1" />
                In Network
              </Badge>
              {provider.telemedicine && (
                <Badge className="bg-mfp-blue-100 dark:bg-mfp-blue-900/30 text-mfp-blue-700 dark:text-mfp-blue-400 border-0 text-xs font-semibold">
                  Telehealth
                </Badge>
              )}
              <Badge className="bg-secondary text-muted-foreground border-0 text-xs font-semibold capitalize">
                {provider.type}
              </Badge>
            </div>

            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1 rounded-lg bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white font-semibold"
                onClick={() => onBookAppointment?.(provider)}
              >
                Book Appointment
              </Button>
              <Button variant="outline" className="rounded-lg border-border text-muted-foreground hover:bg-secondary">
                <PhoneIcon size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <SearchIcon size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No providers found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

// Medications Tab Component
function MedicationsTab({ medications, onViewSavings }: { medications: any[]; onViewSavings?: (med: string, savings: number) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(medications.map(m => m.category)))];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.prescribingProvider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || med.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          My Medications
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your medications
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mfp-card p-4 mb-6 bg-card border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl h-12 border-border bg-background text-foreground"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48 rounded-xl h-12 border-border bg-background">
              <FilterIcon size={16} className="mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.filter(c => c !== 'all').map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredMedications.length}</span> medications
        </p>
        <Button className="rounded-xl bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white font-semibold">
          <PillIcon size={18} className="mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Medications Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredMedications.map((med) => (
          <div key={med.id} className="mfp-card-hover p-5 bg-card border-border">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                <PillIcon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-foreground">{med.name}</h3>
                    <p className="text-sm text-muted-foreground">{med.category}</p>
                  </div>
                  <Badge className={`border-0 text-xs font-semibold ${
                    med.adherenceStatus === 'excellent' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    med.adherenceStatus === 'good' ? 'bg-mfp-blue-100 dark:bg-mfp-blue-900/30 text-mfp-blue-700 dark:text-mfp-blue-400' :
                    'bg-mfp-yellow-100 dark:bg-mfp-yellow-900/30 text-mfp-yellow-700 dark:text-mfp-yellow-400'
                  }`}>
                    {med.adherenceStatus?.charAt(0).toUpperCase() + med.adherenceStatus?.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Dosage</span>
                <span className="font-semibold text-foreground">{med.dosage}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-semibold text-foreground">{med.frequency}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Prescribed by</span>
                <span className="font-semibold text-foreground">{med.prescribingProvider}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Started</span>
                <span className="font-semibold text-foreground">
                  {new Date(med.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              {med.indication && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">For</span>
                  <span className="font-semibold text-foreground">{med.indication}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 rounded-lg border-border text-muted-foreground font-semibold hover:bg-secondary">
                View Details
              </Button>
              <Button 
                className="rounded-lg bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white"
                onClick={() => onViewSavings?.(med.name, 46.50)}
              >
                <SavingsIcon size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <PillIcon size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No medications found</h3>
          <p className="text-muted-foreground">Try adjusting your search or add a new medication</p>
        </div>
      )}
    </div>
  );
}
