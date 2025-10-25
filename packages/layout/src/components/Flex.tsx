import React from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { FLEX_SCALE, type FlexDirection, type FlexAlign, type FlexJustify, type FlexWrap, type FlexGap } from '../flex';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'button' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'nav';
}

// Enterprise gap values aligned με @layera/constants SPACING_SCALE
const GAP_VALUES = {
  xxs: `${SPACING_SCALE.XXS}px`,  // 2px
  xs: `${SPACING_SCALE.XS}px`,    // 4px
  sm: `${SPACING_SCALE.SM}px`,    // 8px
  md: `${SPACING_SCALE.MD}px`,    // 16px
  lg: `${SPACING_SCALE.LG}px`,    // 24px
  xl: `${SPACING_SCALE.XL}px`,    // 32px
  xxl: `${SPACING_SCALE.XXL}px`,  // 48px
  xxxl: `${SPACING_SCALE.XXXL}px` // 64px
} as const;

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap,
  className,
  style,
  as = 'div',
  ...restProps
}) => {
  const flexStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    justifyContent: justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify,
    flexWrap: wrap,
    gap: gap ? GAP_VALUES[gap] : undefined,
    ...style
  };

  const Component = as;

  return (
    <Component className={className} style={flexStyles} {...restProps}>
      {children}
    </Component>
  );
};