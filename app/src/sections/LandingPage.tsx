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
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-pp-teal focus:ring-2 focus:ring-pp-teal/20 outline-none transition-all"
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
            className="w-full bg-pp-teal hover:bg-pp-teal-600 text-white rounded-xl py-4 font-semibold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg"
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
  const { dispatch } = useApp();
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const goHome = () => {
    dispatch({ type: 'SET_VIEW', payload: 'landing' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    { 
      step: '1', 
      title: 'Create Profile', 
      desc: 'Sign up and add your basic health information.', 
      image: '/assets/step-profile.png',
      color: 'bg-pp-teal' 
    },
    { 
      step: '2', 
      title: 'Answer Questions', 
      desc: 'Tell us about your insurance, medications, and health needs.', 
      image: '/assets/step-questions.png',
      color: 'bg-pp-sage' 
    },
    { 
      step: '3', 
      title: 'Get AI Insights', 
      desc: 'Receive personalized recommendations to save money and find care.', 
      image: '/assets/step-insights.png',
      color: 'bg-pp-purple' 
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
            <button onClick={goHome} className="flex items-center gap-2 sm:gap-3" aria-label="Go to home">
              <PayPillLogo size={56} className="sm:w-16 sm:h-auto" />
              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">PayPill</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </button>
              <button onClick={scrollToFeatures} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </button>
              <button onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Team
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </button>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
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
                onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => { scrollToFeatures(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => { document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                Team
              </button>
              <button 
                onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative bg-pp-periwinkle">
        {/* Healthcare Icons Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="health-icons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <text x="2" y="15" fontSize="12" fill="hsl(174,35%,35%)" opacity="0.3">+</text>
                <text x="12" y="8" fontSize="10" fill="hsl(174,35%,35%)" opacity="0.3">♥</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#health-icons)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-pp-teal">CHANGING</span><br />
                <span className="text-pp-teal">HEALTHCARE</span><br />
                <span className="text-white drop-shadow-sm">FOREVER</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-pp-teal italic max-w-lg leading-relaxed">
                A new digital healthcare eco-system powered by our propriety Blockchain, Artificial Intelligence technologies
              </p>
              
            </div>
            
            {/* Right Visual - Phone Mockup */}
            <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
              {/* Background Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-pp-teal/20 via-pp-sage/10 to-pp-purple/10 rounded-full blur-3xl" />
              </div>
              
              {/* Phone Mockup Image */}
              <div className="relative z-10 w-full max-w-sm lg:max-w-md">
                <img 
                  src="/assets/hero-phone.png" 
                  alt="PayPill App on Mobile" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PayPill Coins Showcase Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-pp-offwhite">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-pp-periwinkle/30 via-pp-offwhite to-pp-sage/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-pp-teal/10 via-pp-sage/10 to-pp-purple/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image */}
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-pp-teal/30 via-pp-sage/20 to-pp-purple/20 rounded-full blur-3xl animate-pulse-slow" />
              </div>
              
              {/* Coin Image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                <img 
                  src="/assets/paypill-coins.jpg" 
                  alt="PayPill Coins - Healthcare Savings" 
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-black/10 border border-border/50"
                />
                {/* Subtle reflection effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-gradient-to-b from-black/5 to-transparent rounded-full blur-xl" />
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pp-sage/30 rounded-full border border-pp-sage">
                <span className="text-lg">💰</span>
                <span className="text-sm font-semibold text-pp-teal">Real Savings, Real Value</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                Turn Your Healthcare<br />
                <span className="text-pp-teal">Into Savings</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-pp-sage">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-pp-sage via-pp-periwinkle/20 to-pp-sage" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pp-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pp-purple/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pp-periwinkle rounded-full border border-pp-teal/30 mb-6">
              <span className="text-lg">🎬</span>
              <span className="text-sm font-semibold text-pp-teal">See It In Action</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Watch How PayPill <span className="text-pp-teal">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered dashboard helps you save on healthcare, find the best providers, and take control of your health data.
            </p>
          </div>
          
          {/* Video Container */}
          <div className="relative">
            {/* Decorative Frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pp-teal via-pp-sage to-pp-teal rounded-3xl opacity-20 blur-xl" />
            
            {/* Video Wrapper */}
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
              {/* Video Aspect Ratio Container */}
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/Nliv5xU1za0?rel=0&modestbranding=1"
                  title="PayPill Dashboard Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              
              {/* Video Info Bar */}
              <div className="px-6 py-4 bg-card border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pp-teal flex items-center justify-center">
                    <PayPillLogo size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">PayPill Dashboard Tour</p>
                    <p className="text-sm text-muted-foreground">2:34 • AI-Powered Healthcare</p>
                  </div>
                </div>
                
                <Button
                  onClick={handleStartJourney}
                  className="bg-pp-teal hover:bg-pp-teal-600 text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg"
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

      {/* PayPill Helper App Section */}
      <section id="helper-app" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-white overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pp-teal/5 via-white to-pp-teal/5" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pp-teal/10 rounded-full border border-pp-teal/20">
                <svg className="w-5 h-5 text-pp-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-semibold text-pp-teal">Mobile & Desktop</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                PayPill <span className="text-pp-teal">Helper App</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our PayPill Helper App allows individuals, on both mobile and desktop, to securely access and review all their healthcare data from multiple institutions.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                The app also provides personalised alternative healthcare solutions tailored to each user's unique needs, powered by our patented AI and Machine Learning algorithms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={goHome}
                  className="bg-pp-teal hover:bg-pp-teal-600 text-white rounded-lg px-6 py-3 font-medium shadow-lg shadow-pp-teal/20"
                >
                  Get the App
                  <ChevronRightIcon size={18} className="ml-2" />
                </Button>
                <Button
                  onClick={goHome}
                  variant="outline"
                  className="border-pp-teal text-pp-teal hover:bg-pp-teal/5 rounded-lg px-6 py-3 font-medium"
                >
                  Learn More
                </Button>
              </div>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: '🔐', title: 'Secure Access', desc: 'End-to-end encryption' },
                  { icon: '📊', title: 'Unified Data', desc: 'All institutions in one place' },
                  { icon: '🤖', title: 'AI Insights', desc: 'Personalized recommendations' },
                  { icon: '💡', title: 'Smart Alerts', desc: 'Never miss important updates' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Image */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-[90%] bg-pp-teal/10 rounded-3xl blur-3xl" />
              </div>
              
              {/* Dashboard Image */}
              <div className="relative z-10 transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/assets/paypill-helper-app.png" 
                  alt="PayPill Helper App Dashboard" 
                  className="w-full rounded-2xl shadow-2xl shadow-black/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gray-50">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pp-teal/5 to-transparent" />
        
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
      <section className="py-24 bg-pp-periwinkle px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pp-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pp-sage/10 rounded-full blur-3xl" />
        
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
          <div className="hidden md:block absolute top-[180px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-pp-teal via-pp-sage to-pp-purple opacity-30" />
          
          <div className="text-center mt-16">
            <Button
              onClick={goHome}
              size="lg"
              className="bg-pp-teal hover:bg-pp-teal-600 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg"
            >
              Start Your Journey
              <ChevronRightIcon size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-pp-offwhite">
        <div className="absolute inset-0 bg-gradient-to-br from-pp-periwinkle/30 via-pp-offwhite to-pp-sage/20" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pp-teal rounded-full mb-6">
              <span className="text-lg">🏥</span>
              <span className="text-sm font-semibold text-white">About PayPill</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the future of healthcare—one where patients control their data, access affordable treatments, and benefit from every step of their wellness journey.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Pioneering Digital Health</h3>
              <p className="text-muted-foreground leading-relaxed">
                PayPill Technologies is a pioneering digital health company at the intersection of blockchain and artificial intelligence. Our patented technology ecosystem empowers individuals to take control of their healthcare journey—removing barriers, reducing costs, and creating value for patients worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We partner with employers and third-party payers to deliver secure, direct digital healthcare management that puts patients first.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">The PayPill Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Healthcare should work <em>for</em> people—not the other way around.
              </p>
              <ul className="space-y-3">
                {[
                  'Own their health data securely on the blockchain',
                  'Access affordable medications and specialty drugs through localized digital contracts',
                  'Earn rewards via the PayPill PPLL token for improving their health outcomes'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-pp-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={14} className="text-pp-teal" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed italic">
                Think of it as healthcare that pays you back—like AirMiles for wellness.
              </p>
            </div>
          </div>
          
          {/* Our Solution */}
          <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-foreground mb-4">Our Solution</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <span className="text-sm font-semibold text-red-700 dark:text-red-400">The Problem</span>
                </div>
                <h4 className="text-xl font-bold text-foreground">Healthcare today is broken.</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Global healthcare transactions are trapped in a web of middlemen and bureaucratic systems that drive costs sky-high—often making care unattainable for those who need it most.
                </p>
                <div className="bg-pp-periwinkle rounded-2xl p-6">
                  <p className="text-3xl font-black text-pp-teal mb-2">$500 Billion</p>
                  <p className="text-sm text-muted-foreground">spent annually in the U.S. alone on healthcare administration and insurer contracts</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Medication errors and fragmented health records contribute to preventable morbidity rates. Patients remain powerless, with no control over their own data or healthcare decisions.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">Our Answer</span>
                </div>
                <h4 className="text-xl font-bold text-foreground">PayPill's AI-powered "healthcare helper" puts patients back in the driver's seat.</h4>
                
                <div className="space-y-4">
                  {[
                    { title: 'Personalized Health Guidance', desc: 'Our AI understands your unique healthcare needs and works alongside your physicians to review medications, services, and scientifically-validated alternative treatments.' },
                    { title: 'Rewards for Wellness', desc: 'Earn PayPill PPLL tokens for improving your health status. Use these tokens to purchase medications and healthcare services—or exchange anonymized data for additional savings.' },
                    { title: 'Data Ownership & Security', desc: 'Our blockchain technology gives you a single, highly secure location for ALL your health data. No more fragmented records. No more lost information.' },
                    { title: 'Collective Bargaining Power', desc: 'When you choose to share anonymized data, our AI aggregates insights across our community to negotiate better rates with healthcare providers and insurers—benefiting everyone.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-pp-teal flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-1">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Advisors Section */}
      <section id="team" className="py-24 bg-pp-sage px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pp-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pp-purple/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pp-teal rounded-full mb-6">
              <span className="text-lg">👥</span>
              <span className="text-sm font-semibold text-white">Leadership & Advisors</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
              Team & Advisors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry experts united by a shared vision: healthcare that works for everyone.
            </p>
          </div>
          
          {/* Founders */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-foreground mb-8 text-center">Founders</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                { name: 'Dr. Wayne C. A. Wright', role: 'Chief Executive Officer and Co-Founder', linkedin: 'https://www.linkedin.com/in/drwaynewright/' },
                { name: 'Keegan Dohm', role: 'Chief Technical Officer and Co-Founder', linkedin: 'https://www.linkedin.com/in/keegan-dohm/' }
              ].map((person, i) => (
                <div key={i} className="bg-card rounded-2xl p-8 border border-border shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-pp-teal flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{person.name.split(' ').pop()?.[0]}</span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pp-teal transition-colors">
                      {person.name}
                    </a>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">{person.role}</p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pp-teal hover:text-pp-teal-600 transition-colors text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Advisory Board */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-8 text-center">Advisory Board</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Ray Bailey', role: 'Specialty Healthcare', linkedin: 'https://www.linkedin.com/in/ray-bailey-34011132/' },
                { name: 'Tayo Dada', role: 'Cybersecurity & Blockchain', linkedin: '' },
                { name: 'Cal Evans', role: 'Legal & Regulatory', linkedin: 'https://www.linkedin.com/in/mrcalevans/' },
                { name: 'André Wright', role: 'Product & Data', linkedin: 'https://www.linkedin.com/in/andrejwright/' },
                { name: 'Jay Godla', role: 'Global Healthcare & PBMs', linkedin: 'https://www.linkedin.com/in/jay-godla-1889a14/' },
                { name: 'Dr. John Kutzko', role: 'Clinical Science & Advisory', linkedin: 'https://www.linkedin.com/in/john-kutzko/' },
                { name: 'Deji O', role: 'AI Technical Lead', linkedin: 'https://www.linkedin.com/in/ayodejiogunmola/' }
              ].map((person, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border shadow hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold text-foreground mb-1">
                    {person.linkedin ? (
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pp-teal transition-colors">
                        {person.name}
                      </a>
                    ) : (
                      person.name
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{person.role}</p>
                  {person.linkedin ? (
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-pp-teal hover:text-pp-teal-600 transition-colors text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">LinkedIn link pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-pp-offwhite">
        <div className="absolute inset-0 bg-gradient-to-br from-pp-periwinkle/30 via-pp-offwhite to-pp-sage/20" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-card rounded-3xl p-8 lg:p-16 border border-border shadow-xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pp-teal rounded-full mb-6">
              <span className="text-lg">📧</span>
              <span className="text-sm font-semibold text-white">Get In Touch</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Have questions about PayPill or interested in partnership opportunities?
            </p>
            
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-pp-periwinkle rounded-2xl">
              <svg className="w-6 h-6 text-pp-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@paypill.com" className="text-lg font-semibold text-foreground hover:text-pp-teal transition-colors">
                info@paypill.com
              </a>
            </div>
            
            <p className="mt-8 text-sm text-muted-foreground">
              PayPill Technologies — Changing Healthcare Forever
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-pp-teal px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pp-sage/30 rounded-full blur-3xl" />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Join the Healthcare Revolution
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Be part of the digital healthcare ecosystem that's changing everything. Own your data. Save on care. Get rewarded.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-pp-charcoal text-gray-300 px-4 sm:px-6 lg:px-8 border-t border-pp-charcoal-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <button onClick={goHome} className="flex items-center gap-3 mb-4" aria-label="Go to home">
                <PayPillLogo size={48} className="sm:w-14" />
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">PayPill</span>
              </button>
              <p className="text-sm leading-relaxed max-w-sm mb-6">
                Changing healthcare forever through blockchain and AI.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Team & Advisors</button></li>
                <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={scrollToFeatures} className="hover:text-white transition-colors">Features</button></li>
              </ul>
            </div>
            
          </div>
          
          <div className="pt-8 border-t border-pp-charcoal-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2026 PayPill. All rights reserved.</p>
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
