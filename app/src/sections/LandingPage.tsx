import { useState, useEffect } from 'react';
import { useApp } from '@/store/AppContext';
import { useTheme } from '@/store/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  PayPillLogo,
  ChevronRightIcon,
  CheckIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon
} from '@/components/Icons';

// Theme Toggle Button
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors border border-border"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon size={20} className="text-foreground" />
      ) : (
        <SunIcon size={20} className="text-foreground" />
      )}
    </button>
  );
}

// Feature Card with Image
function FeatureCard({ image, title, description, delay }: { image: string; title: string; description: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`group relative bg-card rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-border transition-all duration-700 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Interactive Step Card
function StepCard({ 
  step, 
  title, 
  description, 
  image, 
  color, 
  isActive,
  onClick 
}: { 
  step: string; 
  title: string; 
  description: string; 
  image: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer group transition-all duration-500 ${
        isActive ? 'scale-105' : 'scale-100 hover:scale-102'
      }`}
    >
      <div className={`bg-card rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
        isActive ? `border-${color}-500 shadow-xl shadow-${color}-500/20` : 'border-border hover:border-muted-foreground'
      }`}>
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-b from-secondary to-background">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
            <span className="text-xl font-extrabold text-white">{step}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      
      {/* Active Indicator */}
      {isActive && (
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 ${color} rounded-full animate-pulse`} />
      )}
    </div>
  );
}

// Auth Modal Component
function AuthModal({ 
  type, 
  onClose, 
  onSuccess 
}: { 
  type: 'login' | 'signup'; 
  onClose: () => void; 
  onSuccess: (userData: { name: string; email: string }) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onSuccess({ name: name || email.split('@')[0], email });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-card rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-slide-up border border-border mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <PayPillLogo size={48} className="sm:w-14" />
            <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight">PayPill</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <CloseIcon size={24} />
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {type === 'login' ? 'Sign in to access your health dashboard.' : 'Start your journey to smarter healthcare.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 focus:ring-2 focus:ring-mfp-blue-200/50 outline-none transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 focus:ring-2 focus:ring-mfp-blue-200/50 outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-mfp-blue-500 focus:ring-2 focus:ring-mfp-blue-200/50 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-xl py-4 font-semibold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-blue-500/25"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>{type === 'login' ? 'Sign In' : 'Create Account'}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export function LandingPage() {
  const { state, dispatch } = useApp();
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleStartJourney = () => {
    setShowAuthModal('signup');
  };

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    const user = {
      id: `usr_${Date.now()}`,
      firstName: userData.name.split(' ')[0] || '',
      lastName: userData.name.split(' ').slice(1).join(' ') || '',
      email: userData.email || '',
      phone: '',
      dateOfBirth: '',
      age: 30,
      gender: 'prefer_not_say' as const,
      location: { city: '', state: '', zipCode: '' },
      preferences: { language: 'English', communication: 'email' as const },
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    dispatch({ type: 'SET_AUTH_STATE', payload: { isAuthenticated: true, user } });
    setShowAuthModal(null);
    // Navigate to health profiling form
    dispatch({ type: 'SET_VIEW', payload: 'health-profiling' });
  };

  const handleDashboardClick = () => {
    if (state.isAuthenticated) {
      dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
    } else {
      setShowAuthModal('login');
    }
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    { 
      step: '1', 
      title: 'Create Profile', 
      desc: 'Sign up and add your basic health information.', 
      image: '/assets/step-profile.png',
      color: 'bg-mfp-blue-500' 
    },
    { 
      step: '2', 
      title: 'Answer Questions', 
      desc: 'Tell us about your insurance, medications, and health needs.', 
      image: '/assets/step-questions.png',
      color: 'bg-mfp-yellow-500' 
    },
    { 
      step: '3', 
      title: 'Get AI Insights', 
      desc: 'Receive personalized recommendations to save money and find care.', 
      image: '/assets/step-insights.png',
      color: 'bg-green-500' 
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Bold and Larger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <PayPillLogo size={56} className="sm:w-16 sm:h-auto" />
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">PayPill</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={scrollToFeatures} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </button>
              <button onClick={handleDashboardClick} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </button>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              {state.isAuthenticated ? (
                <Button
                  onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })}
                  className="bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/25"
                >
                  My Dashboard
                </Button>
              ) : (
                <>
                  <button 
                    onClick={() => setShowAuthModal('login')}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Log In
                  </button>
                  <Button
                    onClick={() => setShowAuthModal('signup')}
                    className="bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/25"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors border border-border"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <CloseIcon size={24} className="text-foreground" />
                ) : (
                  <MenuIcon size={24} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => { scrollToFeatures(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => { handleDashboardClick(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                Dashboard
              </button>
              <div className="pt-3 border-t border-border space-y-2">
                {!state.isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => { setShowAuthModal('login'); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                    >
                      Log In
                    </button>
                    <Button
                      onClick={() => { setShowAuthModal('signup'); setMobileMenuOpen(false); }}
                      className="w-full bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full py-3 text-base font-semibold shadow-lg shadow-blue-500/25"
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => { dispatch({ type: 'SET_VIEW', payload: 'dashboard' }); setMobileMenuOpen(false); }}
                    className="w-full bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full py-3 text-base font-semibold shadow-lg shadow-blue-500/25"
                  >
                    My Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-full border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-mfp-blue-500">AI-Powered Health Compass</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1]">
                Save on Healthcare.<br />
                <span className="bg-gradient-to-r from-mfp-blue-500 to-cyan-500 bg-clip-text text-transparent">Stay in Control.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Connect your insurance, find the best prices, and own your health data—all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStartJourney}
                  size="lg"
                  className="bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  Get Started Free
                  <ChevronRightIcon size={20} className="ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center gap-6 pt-2">
                {['Save on meds', 'Find doctors', 'Own your data'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckIcon size={12} className="text-green-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Visual - Abstract Tech Illustration */}
            <div className="relative flex items-center justify-center min-h-[400px]">
              {/* Background Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] bg-gradient-to-br from-mfp-blue-400/40 via-cyan-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow" />
              </div>
              
              {/* Abstract Floating Elements */}
              <div className="relative z-10 w-full max-w-md">
                <div className="relative">
                  {/* Main Circle */}
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-mfp-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-float">
                    <div className="text-center text-white">
                      <p className="text-5xl font-extrabold">70%</p>
                      <p className="text-sm opacity-80">Average Savings</p>
                    </div>
                  </div>
                  
                  {/* Floating Cards */}
                  <div className="absolute -top-4 -left-4 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="text-green-600 text-lg">💊</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Save $46</p>
                        <p className="text-xs text-muted-foreground">Generic switch</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-blue-600 text-lg">👨‍⚕️</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">5 Providers</p>
                        <p className="text-xs text-muted-foreground">In-network</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 -right-8 bg-card rounded-2xl p-3 shadow-xl border border-border animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-purple-600 text-sm">🔒</span>
                      </div>
                      <p className="text-xs font-bold text-foreground">Encrypted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PayPill Coins Showcase Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80 dark:from-blue-950/30 dark:via-background dark:to-cyan-950/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-mfp-blue-400/10 via-cyan-400/10 to-purple-400/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image */}
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-mfp-blue-400/30 via-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
              </div>
              
              {/* Coin Image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                <img 
                  src="/assets/paypill-coins.jpg" 
                  alt="PayPill Coins - Healthcare Savings" 
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/30 border border-border/50"
                />
                {/* Subtle reflection effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-b from-black/5 to-transparent rounded-full blur-xl" />
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mfp-yellow-100 to-amber-100 dark:from-mfp-yellow-900/30 dark:to-amber-900/30 rounded-full border border-mfp-yellow-200 dark:border-mfp-yellow-800">
                <span className="text-lg">💰</span>
                <span className="text-sm font-semibold text-mfp-yellow-700 dark:text-mfp-yellow-400">Real Savings, Real Value</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                Turn Your Healthcare<br />
                <span className="bg-gradient-to-r from-mfp-blue-500 to-cyan-500 bg-clip-text text-transparent">Into Savings</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-blue-50/30 to-secondary dark:via-blue-950/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-mfp-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mfp-blue-100 to-cyan-100 dark:from-mfp-blue-900/30 dark:to-cyan-900/30 rounded-full border border-mfp-blue-200 dark:border-mfp-blue-800 mb-6">
              <span className="text-lg">🎬</span>
              <span className="text-sm font-semibold text-mfp-blue-700 dark:text-mfp-blue-400">See It In Action</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Watch How PayPill <span className="bg-gradient-to-r from-mfp-blue-500 to-cyan-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered dashboard helps you save on healthcare, find the best providers, and take control of your health data.
            </p>
          </div>
          
          {/* Video Container */}
          <div className="relative">
            {/* Decorative Frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-mfp-blue-500 via-cyan-500 to-mfp-blue-500 rounded-3xl opacity-20 blur-xl" />
            
            {/* Video Wrapper */}
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
              {/* Video Aspect Ratio Container */}
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/L3Z93ev5jzY?rel=0&modestbranding=1"
                  title="PayPill Dashboard Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              
              {/* Video Info Bar */}
              <div className="px-6 py-4 bg-card border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mfp-blue-500 to-cyan-500 flex items-center justify-center">
                    <PayPillLogo size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">PayPill Dashboard Tour</p>
                    <p className="text-sm text-muted-foreground">2:34 • AI-Powered Healthcare</p>
                  </div>
                </div>
                
                <Button
                  onClick={handleStartJourney}
                  className="bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/25"
                >
                  Try It Free
                  <ChevronRightIcon size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Feature Highlights Below Video */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🔍', title: 'Smart Search', desc: 'Find providers & compare prices instantly' },
              { icon: '💊', title: 'Med Savings', desc: 'Discover generic alternatives & discounts' },
              { icon: '🛡️', title: 'Data Control', desc: 'Your health data, encrypted & secure' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              AI-powered tools to help you make smarter healthcare decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              image="/assets/feature-savings.png"
              title="Smart Savings"
              description="Find generic alternatives and compare pharmacy prices to save up to 70% on medications."
              delay={0}
            />
            <FeatureCard
              image="/assets/feature-providers.png"
              title="Find the Right Care"
              description="Get matched with in-network doctors based on your insurance and health needs."
              delay={150}
            />
            <FeatureCard
              image="/assets/feature-data.png"
              title="Own Your Data"
              description="Your health records, encrypted and in your control. Access anytime, share securely."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* How It Works - Interactive */}
      <section className="py-24 bg-secondary px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-mfp-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to smarter healthcare. Click each step to learn more.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <StepCard
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.desc}
                image={item.image}
                color={item.color}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
          
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-[180px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-mfp-blue-500 via-mfp-yellow-500 to-green-500 opacity-30" />
          
          <div className="text-center mt-16">
            <Button
              onClick={handleStartJourney}
              size="lg"
              className="bg-gradient-to-r from-mfp-blue-500 to-mfp-blue-600 hover:from-mfp-blue-600 hover:to-mfp-blue-700 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-blue-500/25"
            >
              Start Your Journey
              <ChevronRightIcon size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-mfp-blue-500 via-mfp-blue-600 to-cyan-600 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-mfp-yellow-400/20 rounded-full blur-3xl" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Save on Healthcare?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 50,000+ users who are taking control of their health and saving money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartJourney}
              size="lg"
              className="bg-white text-mfp-blue-600 hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-bold shadow-xl"
            >
              Get Started Free
              <ChevronRightIcon size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-gray-900 dark:bg-black text-gray-400 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <PayPillLogo size={48} className="sm:w-14" />
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">PayPill</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm mb-6">
                Your AI-powered health compass. Navigate healthcare with confidence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={scrollToFeatures} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={handleDashboardClick} className="hover:text-white transition-colors">Dashboard</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Account</h4>
              <ul className="space-y-3 text-sm">
                {!state.isAuthenticated && (
                  <>
                    <li><button onClick={() => setShowAuthModal('login')} className="hover:text-white transition-colors">Log In</button></li>
                    <li><button onClick={() => setShowAuthModal('signup')} className="hover:text-white transition-colors">Sign Up</button></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 PayPill. All rights reserved.</p>
            <p className="text-xs">Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          type={showAuthModal} 
          onClose={() => setShowAuthModal(null)} 
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
