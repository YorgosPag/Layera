import React from 'react';

export interface StackProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  style?: React.CSSProperties;
}

const SPACING_VALUES = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
} as const;

export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  direction = 'vertical',
  align = 'stretch',
  className,
  style
}) => {
  const stackStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    gap: SPACING_VALUES[spacing],
    ...style
  };

  return (
    <div className={className} style={stackStyles}>
      {children}
    </div>
  );
};