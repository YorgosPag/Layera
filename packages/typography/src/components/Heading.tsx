import React from 'react';
import { HeadingProps } from '../types';

/**
 * Heading Component - Enterprise heading component για το Layera Design System
 *
 * Δημιουργεί semantic headings (h1-h6) με ενιαία typography standards
 * και προκαθορισμένα styles για enterprise εφαρμογές
 */
export const Heading: React.FC<HeadingProps> = ({
  size = '2xl',
  weight = 'semibold',
  align = 'left',
  color = 'primary',
  lineHeight = 'tight',
  className = '',
  as: Component = 'h2',
  children,
  ...props
}) => {
  // Προκαθορισμένα styles βάσει του heading level
  const getDefaultStylesForLevel = () => {
    switch (Component) {
      case 'h1':
        return {
          size: '4xl' as const,
          weight: 'extrabold' as const,
          lineHeight: 'tight' as const
        };
      case 'h2':
        return {
          size: '3xl' as const,
          weight: 'bold' as const,
          lineHeight: 'tight' as const
        };
      case 'h3':
        return {
          size: '2xl' as const,
          weight: 'semibold' as const,
          lineHeight: 'snug' as const
        };
      case 'h4':
        return {
          size: 'xl' as const,
          weight: 'semibold' as const,
          lineHeight: 'snug' as const
        };
      case 'h5':
        return {
          size: 'lg' as const,
          weight: 'medium' as const,
          lineHeight: 'normal' as const
        };
      case 'h6':
        return {
          size: 'base' as const,
          weight: 'medium' as const,
          lineHeight: 'normal' as const
        };
      default:
        return { size, weight, lineHeight };
    }
  };

  const defaults = getDefaultStylesForLevel();
  const finalSize = size || defaults.size;
  const finalWeight = weight || defaults.weight;
  const finalLineHeight = lineHeight || defaults.lineHeight;

  const classes = [
    'layera-text',
    `layera-text-${finalSize}`,
    `layera-font-${finalWeight}`,
    `layera-text-${align}`,
    `layera-text-${color}`,
    `layera-leading-${finalLineHeight}`,
    className
  ].filter(Boolean).join(' ');

  // Filter out React-specific layout props that shouldn't go to DOM
  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...domProps
  } = props;

  return (
    <Component className={classes} {...domProps}>
      {children}
    </Component>
  );
};

Heading.displayName = 'LayeraHeading';