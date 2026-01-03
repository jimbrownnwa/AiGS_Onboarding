/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          dark: '#0f2342',
        },
        accent: {
          DEFAULT: '#3182ce',
          light: '#4299e1',
        },
        success: '#38a169',
        warning: '#dd6b20',
        error: '#e53e3e',
        background: '#1a2332', // Dark navy background
        'dark-bg': '#1e293b',
        'card-bg': '#2d3e50', // Dark blue for cards
        'input-bg': '#3a4d62', // Darker blue for inputs
        'text-dark': '#2d3748',
        'text-light': '#e2e8f0',
        'orange': '#ff6b35', // Bright orange for buttons
      },
    },
  },
  plugins: [],
}
