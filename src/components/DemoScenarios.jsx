import { useState } from 'react';
import { DEMO_SCENARIOS } from '../config/scenarios';

export default function DemoScenarios({ onSelectScenario }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-primary text-white hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🎭</span>
          <span className="font-semibold">Demo Scenarios</span>
        </div>
        <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="p-6">
          <p className="text-sm text-gray-400 mb-4">
            Click a scenario to pre-fill the form with sample data
          </p>
          <div className="grid gap-3">
            {DEMO_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.data)}
                className="text-left p-4 border border-gray-600 rounded-md hover:border-orange hover:bg-input-bg transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-orange transition-colors">
                      {scenario.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
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
