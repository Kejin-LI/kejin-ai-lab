/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google Core Colors (Material Design 3 / Google Brand)
        'google-blue': '#4285F4',
        'google-red': '#EA4335',
        'google-yellow': '#FBBC05',
        'google-green': '#34A853',
        
        // Google Text Colors
        'google-grey-900': '#202124', // Primary Text
        'google-grey-700': '#5F6368', // Secondary Text
        'google-grey-100': '#F1F3F4', // Light Background
        
        // Labs Specific Neon/AI Accents (Keep user preference + AI vibe)
        'labs-pink': '#FFD6F4', // Soft pink background
        'labs-green': '#30FF8F', // Neon green action color
        'labs-purple': '#9D85FF', // AI accent
        'labs-blue': '#4F9DFF',   // AI accent
        'labs-orange': '#FF9F5A', // Warm accent
      },
      fontFamily: {
        sans: ['Google Sans', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 20px 40px rgba(0, 0, 0, 0.08)',
        'neon-green': '0 10px 30px rgba(48, 255, 143, 0.4)',
        'neon-green-hover': '0 20px 50px rgba(48, 255, 143, 0.5)',
      },
      borderRadius: {
        '4xl': '32px', // Google often uses very large radii
        'pill': '999px',
      },
      backgroundImage: {
        'hero-blobs': `
          radial-gradient(circle at 15% 25%, rgba(255, 214, 244, 0.4) 0%, transparent 40%), /* Pink Top-Left */
          radial-gradient(circle at 85% 15%, rgba(157, 133, 255, 0.25) 0%, transparent 35%), /* Purple Top-Right */
          radial-gradient(circle at 80% 80%, rgba(255, 159, 90, 0.2) 0%, transparent 35%), /* Orange Bottom-Right */
          radial-gradient(circle at 20% 80%, rgba(79, 157, 255, 0.2) 0%, transparent 35%) /* Blue Bottom-Left */
        `,
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'beat': 'beat 1s infinite',
        'aurora': 'aurora 20s infinite linear',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        aurora: {
          '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) rotate(120deg) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg) scale(0.9)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
