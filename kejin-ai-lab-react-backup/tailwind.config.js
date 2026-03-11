/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'], // Global font override
        logo: ['Outfit', 'sans-serif'],
        playful: ['Fredoka', 'sans-serif'],
      },
      colors: {
        macaron: {
          pink: "#FFC8DD",
          pinkHover: "#FFAFCC",
          blue: "#A2D2FF",
          blueHover: "#BDE0FE",
          yellow: "#F6E05E", // Darker yellow for better contrast
          purple: "#CDB4DB",
          green: "#B5EAD7",
          orange: "#FFD6A5",
          red: "#FFADAD",
          cyan: "#9BF6FF",
          cream: "#FFFBF0",
          text: "#2D3436",
          textLight: "#636E72",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "blob-slow": "blob 25s infinite ease-in-out",
        "blob-medium": "blob 20s infinite ease-in-out reverse",
        "blob-fast": "blob 18s infinite ease-in-out",
        "shake": "shake 0.5s cubic-bezier(.36,.07,.19,.97) 3 both",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "25%": {
            transform: "translate(100px, -50px) scale(1.1)",
          },
          "50%": {
            transform: "translate(-50px, 100px) scale(0.9)",
          },
          "75%": {
            transform: "translate(-80px, -80px) scale(1.05)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
