/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Vert CarePulse (Primary)
        primary: {
          DEFAULT: '#24AE7C', // Utilisé pour le bouton 
          light: '#2BC48A',
          dark: '#1F9968',
        },
        // Nuances de noir (Dark)
        dark: {
          DEFAULT: '#0D0F10', // Le fond de votre application
          light: '#1A1D21', // Le fond des champs de saisie
          lighter: '#262A2E',
        },
        // Gris pour le texte secondaire
        gray: {
          secondary: '#ABB8C4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        green: '0 0 20px rgba(36, 174, 124, 0.3)',
      },
    },
  },
  plugins: [],
};
