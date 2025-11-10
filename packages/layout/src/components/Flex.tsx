import React from 'react';

export interface FlexProps {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'button' | 'span';

  // Flex-specific props
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';

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


export const Flex: React.FC<FlexProps> = ({
  children,
  className = '',
  as = 'section',
  direction,
  align,
  justify,
  wrap,
  ...restProps
}) => {
  const Component = as;

  const classes = [
    'layera-flex',
    direction && `layera-flex--${direction}`,
    align && `layera-flex--align-${align}`,
    justify && `layera-flex--justify-${justify}`,
    wrap && `layera-flex--wrap-${wrap}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={classes}
      {...restProps}
    >
      {children}
    </Component>
  );
};