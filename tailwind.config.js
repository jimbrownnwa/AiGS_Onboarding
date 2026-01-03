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
        background: '#f7fafc',
        'dark-bg': '#1e293b',
        'text-dark': '#2d3748',
      },
    },
  },
  plugins: [],
}
