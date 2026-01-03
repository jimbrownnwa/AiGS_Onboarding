import { useStatusPolling } from '../hooks/useStatusPolling';
import { ONBOARDING_STEPS } from '../config/steps';
import ProgressStep from './ProgressStep';

export default function LiveProgressPanel({ onboardingId, onComplete }) {
  console.log('[LiveProgressPanel] Received onboardingId:', onboardingId);
  const { progress, error, isPolling } = useStatusPolling(onboardingId, onComplete);

  console.log('[LiveProgressPanel] Progress state:', progress);

  if (!progress) {
    return (
      <div className="bg-card-bg rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
            <p className="text-gray-400">Starting onboarding...</p>
          </div>
        </div>
      </div>
    );
  }

  const isComplete = progress.status === 'complete';
  const hasError = progress.status === 'error';

  return (
    <div className="bg-card-bg rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Onboarding: {progress.onboarding_id}
        </h3>
        <p className="text-text-light font-medium">{progress.employee_name}</p>
        {progress.title && <p className="text-gray-400 text-sm">{progress.title}</p>}
        {progress.department && (
          <p className="text-gray-400 text-sm">{progress.department} Department</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 flex items-center justify-center text-white text-sm font-medium ${
              isComplete ? 'bg-success' : 'bg-orange'
            }`}
            style={{ width: `${progress.progress_percent || 0}%` }}
          >
            {progress.progress_percent}%
          </div>
        </div>
      </div>

      {/* Current Step */}
      {!isComplete && !hasError && (
        <div className="mb-6 p-3 bg-input-bg rounded-md border border-orange">
          <p className="text-sm text-text-light">
            <span className="font-medium text-orange">Current:</span> {progress.current_step}
          </p>
        </div>
      )}

      {/* Error Message */}
      {hasError && progress.error_message && (
        <div className="mb-6 p-4 bg-red-900/30 border border-error rounded-md">
          <p className="text-error font-medium">Error</p>
          <p className="text-sm text-red-400">{progress.error_message}</p>
        </div>
      )}

      {/* Connection Error */}
      {error && (
        <div className="mb-6 p-3 bg-yellow-900/30 border border-warning rounded-md">
          <p className="text-sm text-yellow-400">{error}</p>
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
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="bg-success/10 border border-success rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              Onboarding Complete!
            </h4>
            <p className="text-sm text-text-light">
              All onboarding tasks have been successfully completed for {progress.employee_name}.
            </p>
          </div>

          {/* Employee Summary */}
          <div className="bg-input-bg rounded-lg p-4 mb-4">
            <h5 className="text-sm font-semibold text-white mb-3">Employee Details</h5>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Name:</span>
                <p className="text-white font-medium">{progress.employee_name}</p>
              </div>
              {progress.employee_email && (
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p className="text-white font-medium">{progress.employee_email}</p>
                </div>
              )}
              {progress.department && (
                <div>
                  <span className="text-gray-400">Department:</span>
                  <p className="text-white font-medium">{progress.department}</p>
                </div>
              )}
              {progress.title && (
                <div>
                  <span className="text-gray-400">Title:</span>
                  <p className="text-white font-medium">{progress.title}</p>
                </div>
              )}
              {progress.start_date && (
                <div>
                  <span className="text-gray-400">Start Date:</span>
                  <p className="text-white font-medium">
                    {new Date(progress.start_date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Accounts Created */}
          {progress.accounts_created && (
            <div className="bg-input-bg rounded-lg p-4 mb-4">
              <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span>👤</span>
                Accounts Created
              </h5>
              <div className="space-y-3">
                {progress.accounts_created.google_workspace && (
                  <div className="flex items-start gap-3">
                    <span className="text-success text-lg">✓</span>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Google Workspace</p>
                      <p className="text-gray-400 text-xs">
                        {progress.accounts_created.google_workspace.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-success/20 text-success text-xs rounded">
                        {progress.accounts_created.google_workspace.status}
                      </span>
                    </div>
                  </div>
                )}
                {progress.accounts_created.slack && (
                  <div className="flex items-start gap-3">
                    <span className="text-success text-lg">✓</span>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Slack</p>
                      <p className="text-gray-400 text-xs">
                        @{progress.accounts_created.slack.username}
                      </p>
                      {progress.accounts_created.slack.channel && (
                        <p className="text-gray-400 text-xs">
                          Channel: #{progress.accounts_created.slack.channel}
                        </p>
                      )}
                      <span className="inline-block mt-1 px-2 py-0.5 bg-success/20 text-success text-xs rounded">
                        {progress.accounts_created.slack.status}
                      </span>
                    </div>
                  </div>
                )}
                {progress.accounts_created.jira && (
                  <div className="flex items-start gap-3">
                    <span className="text-success text-lg">✓</span>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">Jira</p>
                      <p className="text-gray-400 text-xs">
                        Username: {progress.accounts_created.jira.username}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-success/20 text-success text-xs rounded">
                        {progress.accounts_created.jira.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calendar & Notifications */}
          <div className="bg-input-bg rounded-lg p-4 mb-4">
            <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <span>📅</span>
              Calendar & Notifications
            </h5>
            <div className="space-y-2">
              {progress.calendar_events_created !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span className="text-text-light">
                    {progress.calendar_events_created} calendar event{progress.calendar_events_created !== 1 ? 's' : ''} created
                  </span>
                </div>
              )}
              {progress.notifications_sent && (
                <>
                  {progress.notifications_sent.new_hire && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-success">✓</span>
                      <span className="text-text-light">New hire notification sent</span>
                    </div>
                  )}
                  {progress.notifications_sent.manager && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-success">✓</span>
                      <span className="text-text-light">Manager notification sent</span>
                    </div>
                  )}
                  {progress.notifications_sent.it_team && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-success">✓</span>
                      <span className="text-text-light">IT team notification sent</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Completed Tasks Summary */}
          {progress.steps && Object.keys(progress.steps).length > 0 && (
            <div className="bg-input-bg rounded-lg p-4 mb-4">
              <h5 className="text-sm font-semibold text-white mb-3">Tasks Completed</h5>
              <div className="grid grid-cols-1 gap-2">
                {ONBOARDING_STEPS.filter(step =>
                  progress.steps?.[step.key] === 'complete'
                ).map(step => (
                  <div key={step.key} className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span className="text-lg">{step.icon}</span>
                    <span className="text-text-light">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources & Next Steps */}
          {progress.documents && (
            <div className="bg-input-bg rounded-lg p-4 mb-4">
              <h5 className="text-sm font-semibold text-white mb-3">Resources & Next Steps</h5>
              <div className="space-y-2">
                {progress.documents.welcome_packet && (
                  <a
                    href={progress.documents.welcome_packet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange hover:text-orange/80 text-sm transition-colors"
                  >
                    <span className="text-lg">📄</span>
                    <span>Welcome Packet</span>
                    <span className="ml-auto">→</span>
                  </a>
                )}
                {progress.documents.notion_page && (
                  <a
                    href={progress.documents.notion_page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange hover:text-orange/80 text-sm transition-colors"
                  >
                    <span className="text-lg">📝</span>
                    <span>Notion Onboarding Page</span>
                    <span className="ml-auto">→</span>
                  </a>
                )}
                {progress.dashboard_url && (
                  <a
                    href={progress.dashboard_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange hover:text-orange/80 text-sm transition-colors"
                  >
                    <span className="text-lg">📊</span>
                    <span>Employee Dashboard</span>
                    <span className="ml-auto">→</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-center">
            {progress.completed_at && (
              <p className="text-xs text-gray-400">
                Completed on {new Date(progress.completed_at).toLocaleString()}
              </p>
            )}
            {progress.started_at && progress.completed_at && (
              <p className="text-xs text-gray-400 mt-1">
                Duration: {Math.floor((new Date(progress.completed_at) - new Date(progress.started_at)) / 60000)} minutes
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
