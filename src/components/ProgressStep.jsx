export default function ProgressStep({ icon, label, status }) {
  const getStatusIcon = () => {
    switch (status) {
      case 'complete':
        return <span className="text-success text-xl">✓</span>;
      case 'in_progress':
        return <span className="text-warning text-xl animate-pulse">◉</span>;
      case 'pending':
      default:
        return <span className="text-gray-400 text-xl">○</span>;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'complete':
        return 'text-success';
      case 'in_progress':
        return 'text-warning font-medium';
      case 'pending':
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-shrink-0 w-6 flex items-center justify-center">
        {getStatusIcon()}
      </div>
      <span className="text-lg">{icon}</span>
      <span className={`${getTextColor()} transition-colors`}>{label}</span>
    </div>
  );
}
