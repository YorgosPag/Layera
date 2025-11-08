import React from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { FLEX_SCALE } from '../flex';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
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

  // Additional layout properties needed by app components
  alignItems?: React.CSSProperties['alignItems']; // Alternative to 'align' prop for direct CSS control
  justifyContent?: React.CSSProperties['justifyContent']; // Alternative to 'justify' prop for direct CSS control
  flexDirection?: React.CSSProperties['flexDirection']; // Alternative to 'direction' prop for direct CSS control
  flexWrap?: React.CSSProperties['flexWrap']; // Alternative to 'wrap' prop for direct CSS control
  zIndex?: number | string;
  overflowY?: React.CSSProperties['overflowY'];
  overflowX?: React.CSSProperties['overflowX'];
  overflow?: React.CSSProperties['overflow'];
  boxSizing?: React.CSSProperties['boxSizing'];
  borderRadius?: string | number;
  inset?: string;
  position?: React.CSSProperties['position'];
  backdropFilter?: string;
  border?: string;
  borderColor?: string;
  borderWidth?: string;
  boxShadow?: string;
  cursor?: string;
  background?: string;
  padding?: string | number;
  margin?: string | number;

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

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(({
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
  alignItems,
  justifyContent,
  flexDirection,
  flexWrap,
  zIndex,
  overflowY,
  overflowX,
  overflow,
  boxSizing,
  borderRadius,
  inset,
  position,
  backdropFilter,
  border,
  borderColor,
  borderWidth,
  boxShadow,
  cursor,
  background,
  padding,
  margin,
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
}, ref) => {
  const flexStyles: React.CSSProperties = {
    display: 'flex',
    // Direct CSS properties take priority over semantic props
    flexDirection: flexDirection || direction,
    alignItems: alignItems || (align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align),
    justifyContent: justifyContent || (justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify),
    flexWrap: flexWrap || wrap,
    gap: gap ? GAP_VALUES[gap] : undefined,
    marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
    marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
    marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
    marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight,
    margin: typeof margin === 'number' ? `${margin}px` : margin,
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    backgroundColor,
    zIndex,
    overflowY,
    overflowX,
    overflow,
    boxSizing,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    inset,
    position,
    backdropFilter,
    border,
    borderColor,
    borderWidth,
    boxShadow,
    cursor,
    background,
    ...style
  };

  // Only safe DOM props - filter out React-specific layout props
  // Note: All layout props are now handled explicitly in FlexProps interface
  const {
    ...filteredRestProps
  } = restProps;

  const domProps = {
    id,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...filteredRestProps
  };

  const Component = as;

  return (
    <Component ref={ref} className={className} style={flexStyles} {...domProps}>
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';