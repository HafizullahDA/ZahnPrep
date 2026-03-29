import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-[0.98] tap-highlight-transparent';
  
  const variantStyles: Record<ButtonVariant, string> = {
    'primary': 'bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl md:rounded-2xl shadow-sm hover:shadow-md px-6 py-3',
    'secondary': 'bg-surface-container-high text-primary rounded-xl px-6 py-3 hover:bg-surface-container',
    'tertiary': 'bg-surface-container-lowest text-primary border border-outline-variant/20 rounded-lg px-4 py-2 hover:bg-primary hover:text-white',
    'ghost': 'bg-transparent text-primary hover:underline px-4 py-2',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
