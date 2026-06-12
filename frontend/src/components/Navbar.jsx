import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'CP Stats', path: '/cp' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <div className="bg-[var(--color-cream)]/90 backdrop-blur-md border-2 border-[var(--color-ink)] shadow-[6px_6px_0_0_var(--color-ink)] rounded-full flex items-center justify-between px-6 py-3 w-full max-w-4xl pointer-events-auto relative z-20">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-full bg-[var(--color-coral)] border-2 border-[var(--color-ink)] flex items-center justify-center font-display font-bold text-lg text-[var(--color-ink)] group-hover:scale-105 transition-transform">
            a.
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">abneesh</span>
        </Link>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex items-center gap-4 py-1 px-1">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`px-4 py-2 rounded-full font-medium text-base border-2 transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-[var(--color-mint)] border-[var(--color-ink)] shadow-[3px_3px_0_0_var(--color-ink)]' 
                    : 'bg-transparent border-transparent hover:bg-[var(--color-lemon)] hover:border-[var(--color-ink)]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className="md:hidden p-2 bg-transparent border-2 border-transparent rounded-full hover:bg-[var(--color-peach)] hover:border-[var(--color-ink)] transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm pointer-events-auto mt-4 z-10"
          >
            <div className="bg-[var(--color-cream)]/95 backdrop-blur-md border-2 border-[var(--color-ink)] shadow-[6px_6px_0_0_var(--color-ink)] rounded-3xl p-4 flex flex-col gap-2">
              {links.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-2xl font-bold text-lg text-center border-2 transition-colors ${
                      isActive 
                        ? 'bg-[var(--color-mint)] border-[var(--color-ink)]' 
                        : 'bg-transparent border-transparent hover:bg-[var(--color-lemon)] hover:border-[var(--color-ink)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
