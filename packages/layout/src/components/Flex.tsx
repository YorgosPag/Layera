import React from 'react';
import { FLEX_SCALE, type FlexDirection, type FlexAlign, type FlexJustify, type FlexWrap, type FlexGap } from '../flex';

export interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

  className?: string;
  as?: 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'button' | 'span';

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
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap,
  className,
  as = 'section',
  id,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...restProps
}) => {
  // Only safe DOM props
  const domProps = {
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...restProps
  };

  const Component = as;

  const classes = [
    'layera-flex',
    `layera-flex--${direction}`,
    `layera-flex--align-${align}`,
    `layera-flex--justify-${justify}`,
    `layera-flex--wrap-${wrap}`,
    gap && `layera-flex--gap-${gap}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={classes}
      {...domProps}
    >
      {children}
    </Component>
  );
};