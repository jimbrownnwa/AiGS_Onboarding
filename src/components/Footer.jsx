export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white py-6 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm mb-2">Powered by n8n + AI</p>
        <p className="text-xs text-gray-400 mb-2">Demo by AiGS</p>
        <a
          href="https://www.aigs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-light text-sm transition-colors"
        >
          Visit AiGS.com →
        </a>
      </div>
    </footer>
  );
}
