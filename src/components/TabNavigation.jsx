export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'new', label: 'New Onboarding' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="border-b border-gray-300">
      <div className="container mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-gray-900'
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
