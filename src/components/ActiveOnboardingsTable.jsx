import { useState } from 'react';

export default function ActiveOnboardingsTable({ onboardings }) {
  const [expandedId, setExpandedId] = useState(null);

  if (onboardings.length === 0) {
    return (
      <div className="bg-card-bg rounded-lg shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Active Onboardings</h3>
        <p className="text-gray-400">Submit a new hire to see onboarding progress here.</p>
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card-bg divide-y divide-gray-700">
            {onboardings.map((onboarding) => (
              <>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-orange h-2 rounded-full transition-all duration-300"
                          style={{ width: `${onboarding.progress_percent || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {onboarding.progress_percent || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange/20 text-orange">
                      {onboarding.status || 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => toggleExpand(onboarding.onboarding_id)}
                      className="text-orange hover:text-orange/80 font-medium transition-colors"
                    >
                      {expandedId === onboarding.onboarding_id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>
                {expandedId === onboarding.onboarding_id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-input-bg">
                      <div className="text-sm">
                        <h4 className="font-semibold text-white mb-2">Onboarding Details</h4>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-gray-400">Onboarding ID:</span>
                            <span className="ml-2 font-medium text-white">{onboarding.onboarding_id}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="ml-2 font-medium text-white">{onboarding.employee_email || 'N/A'}</span>
                          </div>
                        </div>
                        {onboarding.current_step && (
                          <div className="mb-3">
                            <span className="text-gray-400">Current Step:</span>
                            <span className="ml-2 text-orange font-medium">
                              {onboarding.current_step}
                            </span>
                          </div>
                        )}
                        {onboarding.started_at && (
                          <div className="text-xs text-gray-400">
                            Started: {new Date(onboarding.started_at).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
