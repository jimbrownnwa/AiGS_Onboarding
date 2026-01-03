export default function Header() {
  return (
    <header className="bg-primary text-white py-8 text-center">
      <div className="container mx-auto px-6">
        <div className="mb-4 flex justify-center">
          <img src="/AiGS logo.png" alt="AiGS Logo" className="h-12" />
        </div>
        <p className="text-text-light text-sm mb-4">AI-Powered Process Automation & Data Intelligence</p>
        <div className="inline-block">
          <span className="px-4 py-2 border border-orange text-orange rounded-md text-sm">
            Employee Onboarding Command Center
          </span>
        </div>
      </div>
    </header>
  );
}
