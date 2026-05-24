import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = ({ height = '200px' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card skeleton-animation" 
      style={{ height, width: '100%', borderRadius: '16px' }}
    />
  );
};
