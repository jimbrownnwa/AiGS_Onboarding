export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-6 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm mb-2">Powered by n8n + OpenAI</p>
        <p className="text-xs text-gray-400 mb-2">Demo by AiGS</p>
        <a
          href="https://www.aigs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange hover:text-orange/80 text-sm transition-colors"
        >
          Visit AiGS.com →
        </a>
      </div>
    </footer>
  );
}
