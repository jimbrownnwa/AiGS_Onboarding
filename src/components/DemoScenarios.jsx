import { useState } from 'react';
import { DEMO_SCENARIOS } from '../config/scenarios';

export default function DemoScenarios({ onSelectScenario }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🎭</span>
          <span className="font-semibold">Demo Scenarios</span>
        </div>
        <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Click a scenario to pre-fill the form with sample data
          </p>
          <div className="grid gap-3">
            {DEMO_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.data)}
                className="text-left p-4 border border-gray-300 rounded-md hover:border-accent hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-accent transition-colors">
                      {scenario.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {scenario.data.first_name} {scenario.data.last_name} - {scenario.data.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {scenario.data.department} • {scenario.data.location}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
