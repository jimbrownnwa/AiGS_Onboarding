export default function CompletedOnboardingsTable({ onboardings }) {
  if (onboardings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Completed Onboardings Yet</h3>
        <p className="text-gray-500">Completed onboardings will appear here.</p>
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Completed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Resources
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {onboardings.map((onboarding) => (
              <tr key={onboarding.onboarding_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {onboarding.employee_name}
                  </div>
                  {onboarding.title && (
                    <div className="text-sm text-gray-500">{onboarding.title}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {onboarding.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {onboarding.start_date ? new Date(onboarding.start_date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {onboarding.completed_at
                    ? new Date(onboarding.completed_at).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
