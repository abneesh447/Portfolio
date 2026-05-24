import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      padding: '3rem 0',
      borderTop: '1px solid var(--glass-border)',
      marginTop: '4rem',
      textAlign: 'center',
      color: 'var(--text-secondary)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        
        {/* UPDATE YOUR FOOTER SOCIAL LINKS HERE */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <motion.a 
            href="https://github.com/abneesh447" 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ scale: 1.2, color: 'var(--text-primary)' }}
            style={{ color: 'var(--text-secondary)' }}
          >
            <FaGithub size={26} />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/abneesh-patel-b7aa00326" 
            target="_blank" 
            rel="noreferrer"
            whileHover={{ scale: 1.2, color: '#0A66C2' }}
            style={{ color: 'var(--text-secondary)' }}
          >
            <FaLinkedin size={26} />
          </motion.a>
        </div>

        <div>
          <p>© {new Date().getFullYear()} Abneesh. All rights reserved.</p>
          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
