import { useApp } from '@/store/AppContext';
import { LandingPage } from '@/sections/LandingPage';
import { OnboardingFlow } from '@/sections/OnboardingFlow';
import { Dashboard } from '@/sections/Dashboard';
import { PrivacyDashboard } from '@/sections/PrivacyDashboard';
import { HealthProfilingForm } from '@/sections/HealthProfilingForm';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { state, dispatch } = useApp();

  const handleHealthProfileComplete = (data: any) => {
    dispatch({ type: 'SET_HEALTH_PROFILE', payload: data });
    dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
  };

  return (
    <>
      {state.currentView === 'landing' && <LandingPage />}
      {state.currentView === 'onboarding' && <OnboardingFlow />}
      {state.currentView === 'dashboard' && <Dashboard />}
      {state.currentView === 'privacy' && <PrivacyDashboard />}
      {state.currentView === 'health-profiling' && (
        <HealthProfilingForm 
          onComplete={handleHealthProfileComplete}
          onCancel={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })}
          isOnDemand={!!state.healthProfile}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
