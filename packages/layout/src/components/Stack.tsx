import React from 'react';
import { SPACING_SCALE } from '@layera/constants';
import { Box } from './Box';

export interface StackProps {
  children: React.ReactNode;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  style?: React.CSSProperties;
}

const SPACING_VALUES = {
  xs: `${SPACING_SCALE.XS}px`,
  sm: `${SPACING_SCALE.SM}px`,
  md: `${SPACING_SCALE.MD}px`,
  lg: `${SPACING_SCALE.LG}px`,
  xl: `${SPACING_SCALE.XL}px`
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
    <Box className={className || ""} style={stackStyles}>
      {children}
    </Box>
  );
};