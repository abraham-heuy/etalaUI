// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'redbull-blue': '#004F9E',
        'redbull-blue-light': '#E6F0FA',
        'redbull-blue-pale': '#F0F7FF',
        'soft-white': '#F9FAFB',
        'warm-gray': '#F3F4F6',
        'cool-gray': '#E5E7EB',
        'slate-text': '#374151',
        'charcoal': '#1F2937',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}