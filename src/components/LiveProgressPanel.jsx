import { useStatusPolling } from '../hooks/useStatusPolling';
import { ONBOARDING_STEPS } from '../config/steps';
import ProgressStep from './ProgressStep';

export default function LiveProgressPanel({ onboardingId, onComplete }) {
  console.log('[LiveProgressPanel] Received onboardingId:', onboardingId);
  const { progress, error, isPolling } = useStatusPolling(onboardingId, onComplete);

  console.log('[LiveProgressPanel] Progress state:', progress);

  if (!progress) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Starting onboarding...</p>
          </div>
        </div>
      </div>
    );
  }

  const isComplete = progress.status === 'complete';
  const hasError = progress.status === 'error';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-dark mb-1">
          Onboarding: {progress.onboarding_id}
        </h3>
        <p className="text-gray-700 font-medium">{progress.employee_name}</p>
        {progress.title && <p className="text-gray-600 text-sm">{progress.title}</p>}
        {progress.department && (
          <p className="text-gray-600 text-sm">{progress.department} Department</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 flex items-center justify-center text-white text-sm font-medium ${
              isComplete ? 'bg-success' : 'bg-accent'
            }`}
            style={{ width: `${progress.progress_percent || 0}%` }}
          >
            {progress.progress_percent}%
          </div>
        </div>
      </div>

      {/* Current Step */}
      {!isComplete && !hasError && (
        <div className="mb-6 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Current:</span> {progress.current_step}
          </p>
        </div>
      )}

      {/* Error Message */}
      {hasError && progress.error_message && (
        <div className="mb-6 p-4 bg-red-50 border border-error rounded-md">
          <p className="text-error font-medium">Error</p>
          <p className="text-sm text-red-700">{progress.error_message}</p>
        </div>
      )}

      {/* Connection Error */}
      {error && (
        <div className="mb-6 p-3 bg-yellow-50 border border-warning rounded-md">
          <p className="text-sm text-yellow-800">{error}</p>
        </div>
      )}

      {/* Steps List */}
      <div className="space-y-1 mb-6">
        {ONBOARDING_STEPS.map((step) => {
          const stepStatus = progress.steps?.[step.key] || 'pending';
          return (
            <ProgressStep
              key={step.key}
              icon={step.icon}
              label={step.label}
              status={stepStatus}
            />
          );
        })}
      </div>

      {/* Completion Summary */}
      {isComplete && (
        <div className="border-t pt-6 mt-6">
          <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            Onboarding Complete!
          </h4>

          {progress.documents && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Resources:</p>
              {progress.documents.welcome_packet && (
                <a
                  href={progress.documents.welcome_packet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent hover:text-accent-light text-sm transition-colors"
                >
                  📄 View Welcome Packet →
                </a>
              )}
              {progress.documents.notion_page && (
                <a
                  href={progress.documents.notion_page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent hover:text-accent-light text-sm transition-colors"
                >
                  📝 View Notion Page →
                </a>
              )}
              {progress.dashboard_url && (
                <a
                  href={progress.dashboard_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent hover:text-accent-light text-sm transition-colors"
                >
                  📊 View Dashboard →
                </a>
              )}
            </div>
          )}

          {progress.completed_at && (
            <p className="text-xs text-gray-500 mt-4">
              Completed at {new Date(progress.completed_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
