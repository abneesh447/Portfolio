import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Tech Stack', href: '/#tech' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Education', href: '/#education' },
    { name: 'CP Stats', href: '/cp' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: isScrolled ? '1rem 0' : '1.5rem 0',
      background: isScrolled ? 'var(--glass-bg)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={28} color="var(--accent-color)" />
          <span>Portfolio</span>
        </Link>

        {/* Desktop Nav */}
        <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link, index) => (
            <motion.li key={index} whileHover={{ y: -2 }}>
              <Link to={link.href} style={{ fontWeight: 500, fontSize: '0.9rem' }}>{link.name}</Link>
            </motion.li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontWeight: 'bold' }} className="desktop-nav">
          <motion.a href="https://github.com/abneesh447" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}>
            GitHub
          </motion.a>
          <motion.a href="https://www.linkedin.com/in/abneesh-patel-b7aa00326" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}>
            LinkedIn
          </motion.a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'var(--bg-color)', borderBottom: '1px solid var(--glass-border)', padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {navLinks.map((link, index) => (
            <Link key={index} to={link.href} onClick={() => setIsOpen(false)} style={{ fontWeight: 500, padding: '0.5rem 0' }}>
              {link.name}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--glass-border)' }}>
            <a href="https://github.com/abneesh447" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>GitHub</a>
            <a href="https://www.linkedin.com/in/abneesh-patel-b7aa00326" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)' }}>LinkedIn</a>
          </div>
        </motion.div>
      )}
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
