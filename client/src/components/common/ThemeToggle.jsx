/* ─────────────────────────────────────────────────────────────
   ThemeToggle.jsx
   Toggles between dark / light mode by adding/removing
   the "light" class on <html>. Persists to localStorage.
   
   Usage:
     <ThemeToggle />              → icon-only pill button
     <ThemeToggle showLabel />    → with text label beside it
   ───────────────────────────────────────────────────────────── */
import { useState, useEffect } from 'react';

const ThemeToggle = ({ showLabel = false }) => {
  const [isDark, setIsDark] = useState(true);

  /* ── Init from localStorage / system preference ── */
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      const dark = stored === 'dark';
      setIsDark(dark);
      applyTheme(dark);
    } else {
      // fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      applyTheme(prefersDark);
    }
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        display:     'inline-flex',
        alignItems:  'center',
        gap:         '8px',
        padding:     showLabel ? '7px 14px 7px 10px' : '8px',
        borderRadius: '999px',
        background:  isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
        border:      `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}`,
        cursor:      'pointer',
        transition:  'all 0.25s ease',
        flexShrink:  0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background    = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor   = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background    = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)';
        e.currentTarget.style.borderColor   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
      }}
    >
      {/* ── Animated icon swap ── */}
      <span
        style={{
          position:   'relative',
          width:      '18px',
          height:     '18px',
          flexShrink: 0,
        }}
      >
        {/* Sun icon (light mode) */}
        <SunIcon
          style={{
            position:   'absolute',
            inset:      0,
            color:      '#f97316',
            opacity:    isDark ? 0 : 1,
            transform:  isDark ? 'rotate(90deg) scale(0.6)' : 'rotate(0deg) scale(1)',
            transition: 'opacity 0.3s ease, transform 0.35s ease',
          }}
        />
        {/* Moon icon (dark mode) */}
        <MoonIcon
          style={{
            position:   'absolute',
            inset:      0,
            color:      '#a0a0a0',
            opacity:    isDark ? 1 : 0,
            transform:  isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.6)',
            transition: 'opacity 0.3s ease, transform 0.35s ease',
          }}
        />
      </span>

      {/* ── Optional label ── */}
      {showLabel && (
        <span
          style={{
            fontSize:   '13px',
            fontWeight: 500,
            color:      isDark ? '#888' : '#555',
            transition: 'color 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

/* ── SVG Icons ── */
const SunIcon = ({ style }) => (
  <svg width="18" height="18" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    viewBox="0 0 24 24" style={style} aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ style }) => (
  <svg width="18" height="18" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    viewBox="0 0 24 24" style={style} aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default ThemeToggle;