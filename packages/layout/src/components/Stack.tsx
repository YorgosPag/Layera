import React from 'react';

export interface StackProps {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'div' | 'span' | 'form';

  // Safe DOM attributes
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}


export const Stack: React.FC<StackProps> = ({
  children,
  className = '',
  as = 'section',
  ...restProps
}) => {
  const Component = as;

  return (
    <Component
      className={`layera-stack ${className}`.trim()}
      {...restProps}
    >
      {children}
    </Component>
  );
};