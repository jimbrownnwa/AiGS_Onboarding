export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'new', label: 'New Onboarding' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="border-b border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-orange border-b-2 border-orange'
                  : 'text-gray-400 hover:text-text-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
