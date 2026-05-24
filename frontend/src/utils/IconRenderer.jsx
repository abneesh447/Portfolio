import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const IconRenderer = ({ iconName, size = 32, color = '#ffffff' }) => {
  if (!iconName) return null;

  if (iconName.startsWith('Fa') && FaIcons[iconName]) {
    const Icon = FaIcons[iconName];
    return <Icon size={size} color={color} />;
  }
  
  if (iconName.startsWith('Si') && SiIcons[iconName]) {
    const Icon = SiIcons[iconName];
    return <Icon size={size} color={color} />;
  }

  // Fallback if icon doesn't exist
  return <div style={{ width: size, height: size, background: color, borderRadius: '50%' }}></div>;
};

export default IconRenderer;
