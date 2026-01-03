export default function CompletedOnboardingsTable({ onboardings }) {
  if (onboardings.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Completed Onboardings Yet</h3>
        <p className="text-gray-400">Completed onboardings will appear here.</p>
      </div>
    );
  }

  const getDuration = (startedAt, completedAt) => {
    if (!startedAt || !completedAt) return 'N/A';
    const start = new Date(startedAt);
    const end = new Date(completedAt);
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    return `${diffMins}m ${diffSecs}s`;
  };

  return (
    <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Completed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Resources
              </th>
            </tr>
          </thead>
          <tbody className="bg-card-bg divide-y divide-gray-700">
            {onboardings.map((onboarding) => (
              <tr key={onboarding.onboarding_id} className="hover:bg-input-bg">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {onboarding.employee_name}
                  </div>
                  {onboarding.title && (
                    <div className="text-sm text-gray-400">{onboarding.title}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                  {onboarding.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                  {onboarding.start_date ? new Date(onboarding.start_date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                  {onboarding.completed_at
                    ? new Date(onboarding.completed_at).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light">
                  {getDuration(onboarding.started_at, onboarding.completed_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-3">
                    {onboarding.documents?.welcome_packet && (
                      <a
                        href={onboarding.documents.welcome_packet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:scale-110 transition-transform"
                        title="Welcome Packet"
                      >
                        📄
                      </a>
                    )}
                    {onboarding.documents?.notion_page && (
                      <a
                        href={onboarding.documents.notion_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:scale-110 transition-transform"
                        title="Notion Page"
                      >
                        📋
                      </a>
                    )}
                    {onboarding.dashboard_url && (
                      <a
                        href={onboarding.dashboard_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:scale-110 transition-transform"
                        title="Dashboard"
                      >
                        📅
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
