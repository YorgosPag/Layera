import React from 'react';

export interface StackProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}


export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  direction = 'vertical',
  align = 'stretch',
  className
}) => {
  return (
    <section
      className={`layera-stack layera-stack--${direction} layera-stack--${align} layera-stack--${spacing} ${className || ''}`.trim()}
      data-direction={direction}
      data-align={align}
      data-spacing={spacing}
    >
      {children}
    </section>
  );
};