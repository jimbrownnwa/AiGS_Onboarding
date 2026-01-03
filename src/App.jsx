import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import NewOnboardingForm from './components/NewOnboardingForm';
import LiveProgressPanel from './components/LiveProgressPanel';
import DemoScenarios from './components/DemoScenarios';
import ActiveOnboardingsTable from './components/ActiveOnboardingsTable';
import CompletedOnboardingsTable from './components/CompletedOnboardingsTable';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('new');
  const [onboardings, setOnboardings] = useState({
    active: [],
    completed: [],
  });
  const [currentOnboarding, setCurrentOnboarding] = useState(null);
  const formRef = useRef(null);

  const handleOnboardingSuccess = (response) => {
    console.log('[App] Start webhook response:', response);
    console.log('[App] Extracted onboarding_id:', response.onboarding_id);
    console.log('[App] Type of onboarding_id:', typeof response.onboarding_id);

    // Create onboarding record from response
    const newOnboarding = {
      onboarding_id: response.onboarding_id,
      employee_id: response.employee_id,
      employee_name: response.employee?.full_name || 'Unknown',
      employee_email: response.employee?.corporate_email || '',
      department: response.employee?.department || '',
      title: response.employee?.title || '',
      start_date: response.employee?.start_date || '',
      status: 'provisioning',
      progress_percent: 0,
      current_step: 'Initializing...',
      steps: {},
      started_at: response.processed_at || new Date().toISOString(),
      completed_at: null,
      error_message: null,
      documents: response.documents || {},
      dashboard_url: response.dashboard_url || '',
    };

    // Add to active list
    setOnboardings((prev) => ({
      ...prev,
      active: [...prev.active, newOnboarding],
    }));

    // Set as current for live tracking
    console.log('[App] Setting current onboarding ID:', response.onboarding_id);
    setCurrentOnboarding(response.onboarding_id);
  };

  const handleOnboardingComplete = useCallback((progressData) => {
    console.log('[App] Onboarding complete, moving to completed list');

    // Move from active to completed
    setOnboardings((prev) => {
      const activeOnboarding = prev.active.find(
        (o) => o.onboarding_id === progressData.onboarding_id
      );

      if (!activeOnboarding) return prev;

      const completedOnboarding = {
        ...activeOnboarding,
        ...progressData,
        status: progressData.status,
        progress_percent: progressData.progress_percent,
        completed_at: progressData.completed_at || new Date().toISOString(),
      };

      return {
        active: prev.active.filter((o) => o.onboarding_id !== progressData.onboarding_id),
        completed: [completedOnboarding, ...prev.completed],
      };
    });

    // Keep currentOnboarding set so completion summary stays visible
    // It will be replaced when user submits a new onboarding
  }, []);

  const handleSelectScenario = (scenarioData) => {
    // Find the form and set its values
    const formElement = formRef.current;
    if (formElement && formElement.setFormValues) {
      formElement.setFormValues(scenarioData);
    }
  };

  // Update active onboardings with live data
  const updateActiveOnboarding = (onboardingId, progressData) => {
    setOnboardings((prev) => ({
      ...prev,
      active: prev.active.map((o) =>
        o.onboarding_id === onboardingId
          ? {
              ...o,
              ...progressData,
              status: progressData.status,
              progress_percent: progressData.progress_percent,
              current_step: progressData.current_step,
              steps: progressData.steps,
            }
          : o
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-6 py-8 flex-grow">
        {/* New Onboarding Tab */}
        {activeTab === 'new' && (
          <div>
            <DemoScenarios onSelectScenario={handleSelectScenario} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form */}
              <div>
                <NewOnboardingForm ref={formRef} onSuccess={handleOnboardingSuccess} />
              </div>

              {/* Live Progress */}
              <div>
                {currentOnboarding ? (
                  <LiveProgressPanel
                    onboardingId={currentOnboarding}
                    onComplete={handleOnboardingComplete}
                  />
                ) : (
                  <div className="bg-card-bg rounded-lg shadow-lg p-12 text-center h-full flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Ready to Process
                    </h3>
                    <p className="text-gray-400">
                      Submit a new hire form to see real-time onboarding progress
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Active Onboardings Tab */}
        {activeTab === 'active' && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">Active Onboardings</h2>
            <ActiveOnboardingsTable onboardings={onboardings.active} />
          </div>
        )}

        {/* Completed Onboardings Tab */}
        {activeTab === 'completed' && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Completed Onboardings
            </h2>
            <CompletedOnboardingsTable onboardings={onboardings.completed} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
