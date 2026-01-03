import { useState } from 'react';

export default function ActiveOnboardingsTable({ onboardings }) {
  const [expandedId, setExpandedId] = useState(null);

  if (onboardings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Onboardings</h3>
        <p className="text-gray-500">Submit a new hire to see onboarding progress here.</p>
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {onboardings.map((onboarding) => (
              <>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${onboarding.progress_percent || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {onboarding.progress_percent || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {onboarding.status || 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => toggleExpand(onboarding.onboarding_id)}
                      className="text-accent hover:text-accent-light font-medium transition-colors"
                    >
                      {expandedId === onboarding.onboarding_id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>
                {expandedId === onboarding.onboarding_id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-gray-50">
                      <div className="text-sm">
                        <h4 className="font-semibold text-gray-900 mb-2">Onboarding Details</h4>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-gray-600">Onboarding ID:</span>
                            <span className="ml-2 font-medium">{onboarding.onboarding_id}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2 font-medium">{onboarding.employee_email || 'N/A'}</span>
                          </div>
                        </div>
                        {onboarding.current_step && (
                          <div className="mb-3">
                            <span className="text-gray-600">Current Step:</span>
                            <span className="ml-2 text-warning font-medium">
                              {onboarding.current_step}
                            </span>
                          </div>
                        )}
                        {onboarding.started_at && (
                          <div className="text-xs text-gray-500">
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
