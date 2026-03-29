import React from 'react';

type SurfaceLevel = 'base' | 'low' | 'lowest' | 'high' | 'container' | 'container-lowest';

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: SurfaceLevel;
  children: React.ReactNode;
  className?: string;
}

/**
 * Surface Component
 * Enforces the "No-Line Rule" by handling component depth purely through defined background colors
 * instead of 1px borders. Adheres to the exact design system prototype tokens.
 */
export const Surface: React.FC<SurfaceProps> = ({ 
  level = 'base', 
  children, 
  className = '', 
  ...props 
}) => {
  const bgColors: Record<SurfaceLevel, string> = {
    'base': 'bg-surface',
    'low': 'bg-surface-container-low',
    'lowest': 'bg-surface-container-lowest',
    'high': 'bg-surface-container-high',
    'container': 'bg-surface-container',
    'container-lowest': 'bg-surface-container-lowest',
  };

  const selectedBg = bgColors[level] || bgColors['base'];

  return (
    <div className={`${selectedBg} ${className}`} {...props}>
      {children}
    </div>
  );
};
