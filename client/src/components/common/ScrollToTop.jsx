/* ─────────────────────────────────────────────────────────────
   ScrollToTop.jsx
   Drop this once inside <BrowserRouter> (already in main.jsx via App).
   Automatically scrolls window to top on every route change.
   ───────────────────────────────────────────────────────────── */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small timeout lets the new page paint first
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // renders nothing
};

export default ScrollToTop;