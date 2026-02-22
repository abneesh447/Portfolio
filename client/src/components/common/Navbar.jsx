import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Skills',      href: '#skills' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Experience',  href: '#experience' },
  { label: 'Blog',        href: '#blog' },
  { label: 'Contact',     href: '#contact' },
];

const Navbar = () => {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [visible,       setVisible]       = useState(true);
  const lastScrollY = useRef(0);
  const location    = useLocation();

  /* ── Scroll: hide/show + glassmorphism trigger ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [location.pathname]);

  /* ── Smooth scroll helper ── */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s ease, box-shadow 0.3s ease',
          background: scrolled
            ? 'rgba(10,10,10,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.04)' : 'none',
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <nav className="container-custom flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={e => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <div
              className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #ff3b3b, #f97316)' }}
            >
              <span className="font-display font-bold text-white text-sm leading-none">P</span>
              {/* glow pulse */}
              <span
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, #ff3b3b, #f97316)',
                  filter: 'blur(8px)',
                  transition: 'opacity 0.3s ease',
                  zIndex: -1,
                }}
              />
            </div>
            <span className="font-display font-semibold text-white text-lg tracking-tight">
              port<span style={{ color: '#ff3b3b' }}>folio</span>
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="relative px-3 py-2 text-sm font-medium rounded-lg block"
                    style={{
                      color: isActive ? '#ff3b3b' : '#a0a0a0',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#f5f5f5'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#a0a0a0'; }}
                  >
                    {label}
                    {/* active underline */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '50%',
                        transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                        transformOrigin: 'center',
                        width: '16px',
                        height: '2px',
                        borderRadius: '1px',
                        background: '#ff3b3b',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/admin/login"
              className="text-sm font-medium px-4 py-2 rounded-lg"
              style={{
                color: '#666',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#f5f5f5';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              Admin
            </a>
            <a
              href="#contact"
              onClick={e => handleNavClick(e, '#contact')}
              className="btn-primary text-sm px-5 py-2"
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            style={{
              background: menuOpen ? 'rgba(255,59,59,0.1)' : 'transparent',
              border: '1px solid',
              borderColor: menuOpen ? 'rgba(255,59,59,0.3)' : 'rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease',
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: menuOpen ? '#ff3b3b' : '#f5f5f5',
                borderRadius: '2px',
                transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '1.5px',
                background: menuOpen ? '#ff3b3b' : '#f5f5f5',
                borderRadius: '2px',
                transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                opacity: menuOpen ? 1 : 0.6,
                transition: 'all 0.3s ease',
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 40,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* ── Mobile Menu Drawer ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 85vw)',
          background: '#111111',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          zIndex: 45,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '5rem 2rem 2rem',
          overflowY: 'auto',
        }}
      >
        {/* Accent bar top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #ff3b3b, #f97316)',
          }}
        />

        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }, i) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li
                  key={href}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                    transition: `opacity 0.3s ease ${i * 50 + 100}ms, transform 0.3s ease ${i * 50 + 100}ms`,
                  }}
                >
                  <a
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium"
                    style={{
                      color: isActive ? '#ff3b3b' : '#a0a0a0',
                      background: isActive ? 'rgba(255,59,59,0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(255,59,59,0.2)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: isActive ? '#ff3b3b' : 'rgba(255,255,255,0.2)',
                        flexShrink: 0,
                        transition: 'background 0.2s ease',
                      }}
                    />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            className="btn-primary text-center text-sm justify-center"
          >
            Hire Me
          </a>
          <a
            href="/admin/login"
            className="btn-outline text-center text-sm justify-center"
          >
            Admin Portal
          </a>
        </div>

        {/* Social links at bottom */}
        <div className="mt-auto pt-8 flex items-center gap-4">
          {[
            { label: 'GitHub',   href: 'https://github.com',   icon: GitHubIcon },
            { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
            { label: 'Twitter',  href: 'https://twitter.com',  icon: TwitterIcon },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#666',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#ff3b3b';
                e.currentTarget.style.borderColor = 'rgba(255,59,59,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

/* ── Inline SVG Icons ── */
const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default Navbar;