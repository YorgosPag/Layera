import React from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { FLEX_SCALE } from '../flex';

export interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

  // CSS properties that should NOT be passed to DOM
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  minHeight?: string | number;
  backgroundColor?: string;

  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'button' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'nav';

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

// Enterprise gap values aligned με @layera/constants SPACING_SCALE
const GAP_VALUES = {
  xxs: 'var(--la-space-1)',  // 🎯 SST: XXS spacing token
  xs: 'var(--la-space-1)',    // 🎯 SST: XS spacing token
  sm: 'var(--la-space-2)',    // 8px
  md: 'var(--la-space-4)',    // 16px
  lg: 'var(--la-space-6)',    // 🎯 SST: LG spacing (24px)
  xl: 'var(--la-space-layout-xl)',    // 🎯 SST: XL spacing token
  xxl: 'var(--la-space-12)',  // 🎯 SST: XXL spacing token
  xxxl: 'var(--la-space-16)' // 🎯 SST: XXXL spacing token
} as const;

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  minHeight,
  backgroundColor,
  className,
  style,
  as = 'div',
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
  const flexStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    justifyContent: justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify,
    flexWrap: wrap,
    gap: gap ? GAP_VALUES[gap] : undefined,
    marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
    marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
    marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
    marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight,
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    backgroundColor,
    ...style
  };

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

  return (
    <Component className={className} style={flexStyles} {...domProps}>
      {children}
    </Component>
  );
};