// Google Labs Inspired Color Palette
// Based on Google's Material Design 3 and AI product branding

export const colors = {
  // Core Backgrounds
  surface: {
    light: '#FFFFFF',
    subtle: '#F8F9FA', // Very light gray for sections
    glass: 'rgba(255, 255, 255, 0.8)', // For glassmorphism
  },
  
  // Core Text
  text: {
    primary: '#202124', // Google's standard dark gray/black
    secondary: '#5F6368', // Google's standard gray text
    disabled: '#DADCE0',
  },

  // Brand Accents (Google 4 Colors)
  brand: {
    blue: '#4285F4',
    red: '#EA4335',
    yellow: '#FBBC05',
    green: '#34A853',
  },

  // AI / Future Labs Accents (Neon & Gradients)
  labs: {
    pink: '#FFD6F4', // Pink Top-Left
    purple: '#9D85FF', // Purple Top-Right
    blue: '#4F9DFF',   // Blue Bottom-Left
    orange: '#FF9F5A', // Orange Bottom-Right
    neonGreen: '#30FF8F', // Action Green
  },

  // UI Elements
  ui: {
    border: '#E8EAED',
    divider: '#F1F3F4',
  }
};

export const gradients = {
  // The classic Google "AI" gradient often seen in Gemini/Bard
  ai: 'linear-gradient(135deg, #4285F4 0%, #9B72CB 50%, #D96570 100%)',
  // Subtle background mesh
  mesh: 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
};
