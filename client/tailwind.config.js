/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Fonts ──────────────────────────────────────────────
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body:    ['"Satoshi"',       'sans-serif'],
        code:    ['"JetBrains Mono"','monospace'],
      },

      // ── Colors ─────────────────────────────────────────────
      colors: {
        primary: {
          50:  '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ff9f9f',
          400: '#ff6b6b',
          500: '#ff3b3b',
          600: '#ed1515',
          700: '#c80d0d',
          800: '#a50f0f',
          900: '#881414',
        },
        accent: {
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        dark: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
          400: '#333333',
        },
        surface: {
          DEFAULT: '#111111',
          2: '#1a1a1a',
          3: '#222222',
        },
        muted: '#888888',
      },

      // ── Background Images ───────────────────────────────────
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // ── Border Radius ───────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Animations (extend Tailwind's built-in list) ────────
      animation: {
        'float':       'float 5s ease-in-out infinite',
        'spin-slow':   'spin 10s linear infinite',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'shimmer':     'shimmer 1.8s linear infinite',
        'ping-slow':   'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },

      // ── Keyframes ───────────────────────────────────────────
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },

      // ── Spacing extras ──────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ── Box shadow ──────────────────────────────────────────
      boxShadow: {
        'primary-sm': '0 4px 14px rgba(255, 59, 59, 0.25)',
        'primary':    '0 8px 30px rgba(255, 59, 59, 0.3)',
        'primary-lg': '0 20px 60px rgba(255, 59, 59, 0.25)',
        'dark-sm':    '0 4px 20px rgba(0, 0, 0, 0.4)',
        'dark':       '0 10px 40px rgba(0, 0, 0, 0.5)',
        'dark-lg':    '0 20px 60px rgba(0, 0, 0, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(255, 59, 59, 0.08)',
      },

      // ── Max width extras ────────────────────────────────────
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      // ── Z-index ─────────────────────────────────────────────
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // ── Transition duration extras ──────────────────────────
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};