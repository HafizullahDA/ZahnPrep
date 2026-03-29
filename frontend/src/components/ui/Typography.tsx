import React from 'react';

type TypographyVariant = 'display' | 'headline' | 'title' | 'body' | 'label';
type HtmlTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: HtmlTag;
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  as, 
  children, 
  className = '', 
  ...props 
}) => {
  const variantStyles: Record<TypographyVariant, string> = {
    'display': 'font-headline text-[3.5rem] leading-tight tracking-[-0.02em] font-bold text-on-surface',
    'headline': 'font-headline text-[1.75rem] font-bold tracking-tight text-on-surface',
    'title': 'font-headline text-xl lg:text-3xl font-bold font-bold text-on-surface',
    'body': 'font-body text-sm md:text-base leading-relaxed text-on-surface-variant',
    'label': 'font-label text-[10px] md:text-xs font-bold tracking-widest uppercase text-tertiary',
  };

  const defaultTags: Record<TypographyVariant, HtmlTag> = {
    'display': 'h1',
    'headline': 'h2',
    'title': 'h3',
    'body': 'p',
    'label': 'span',
  };

  const Tag = as || defaultTags[variant];
  const combinedClasses = `${variantStyles[variant]} ${className}`;

  return (
    <Tag className={combinedClasses} {...props}>
      {children}
    </Tag>
  );
};
