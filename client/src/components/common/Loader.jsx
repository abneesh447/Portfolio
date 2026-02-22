/* ─────────────────────────────────────────────────────────────
   Loader.jsx
   Variants:
     <Loader />              → full-page overlay (initial load)
     <Loader size="sm" />    → small inline spinner
     <Loader size="md" />    → medium inline spinner
     <Loader inline />       → inline, no overlay
   ───────────────────────────────────────────────────────────── */

const Loader = ({ inline = false, size = 'lg', text = 'Loading…' }) => {
  /* ── Inline / small spinner ── */
  if (inline) {
    const dim = size === 'sm' ? 18 : size === 'md' ? 28 : 40;
    const stroke = size === 'sm' ? 2 : 2.5;
    return (
      <span
        role="status"
        aria-label="Loading"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <SpinnerRing size={dim} stroke={stroke} />
      </span>
    );
  }

  /* ── Full-page overlay ── */
  return (
    <div
      role="status"
      aria-label="Loading page"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        zIndex: 9999,
      }}
    >
      {/* Animated logo mark */}
      <div style={{ position: 'relative', width: '72px', height: '72px' }}>
        {/* Outer spinning ring */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'spin 1.4s linear infinite',
          }}
        >
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="rgba(255,59,59,0.12)"
            strokeWidth="3"
          />
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="url(#loaderGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="60 130"
            strokeDashoffset="0"
          />
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff3b3b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner counter-spin ring */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            animation: 'spin 2s linear infinite reverse',
          }}
        >
          <circle
            cx="24" cy="24" r="18"
            fill="none"
            stroke="rgba(249,115,22,0.15)"
            strokeWidth="2"
          />
          <circle
            cx="24" cy="24" r="18"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="20 80"
            strokeDashoffset="0"
            opacity="0.7"
          />
        </svg>

        {/* Center logo P */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ff3b3b, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            P
          </span>
        </div>
      </div>

      {/* Loading text with animated dots */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <p
          className="font-display"
          style={{ fontSize: '0.85rem', color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase' }}
        >
          {text}
        </p>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#ff3b3b',
                display: 'block',
                animation: `loadingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loadingDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/* ── Reusable spinning ring SVG ── */
const SpinnerRing = ({ size = 24, stroke = 2.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ animation: 'spin 0.8s linear infinite' }}
    aria-hidden="true"
  >
    <circle
      cx="12" cy="12" r="9"
      stroke="rgba(255,59,59,0.15)"
      strokeWidth={stroke}
    />
    <circle
      cx="12" cy="12" r="9"
      stroke="#ff3b3b"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeDasharray="20 40"
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </svg>
);

export { SpinnerRing };
export default Loader;