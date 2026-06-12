import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t-2 border-[var(--color-ink)] bg-lavender mt-20 py-3 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-2 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
        <div>
          © {new Date().getFullYear()} Abneesh — built with caffeine & curiosity.
        </div>
        <div className="font-mono text-xs opacity-70">
          all rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
