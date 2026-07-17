/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design tokens — "engineering lab at 2am" palette
        lab: {
          bg: '#0a0e17',        // deep charcoal-navy base
          panel: '#0f1420',     // slightly lifted panel surface
          panel2: '#131a2a',    // glass card surface
          line: '#1c2537',      // hairline / border on dark
        },
        circuit: {
          DEFAULT: '#00d4ff',   // circuit-blue accent
          dim: '#0891b2',
          glow: 'rgba(0, 212, 255, 0.35)',
        },
        copper: {
          DEFAULT: '#ffb703',   // copper/amber accent
          dim: '#c98a00',
          glow: 'rgba(255, 183, 3, 0.35)',
        },
        ink: {
          100: '#f4f6fb',
          300: '#c7cede',
          500: '#8892a8',
          700: '#586178',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 24px rgba(0, 212, 255, 0.25)',
        'glow-copper': '0 0 24px rgba(255, 183, 3, 0.25)',
        'inner-line': 'inset 0 1px 0 0 rgba(255,255,255,0.04)',
      },
      keyframes: {
        drift: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '80px 80px' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        drift: 'drift 18s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
