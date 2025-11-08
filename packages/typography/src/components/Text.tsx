import React from 'react';
import { TextProps } from '../types';

/**
 * Text Component - Βασικό text component για το Layera Design System
 *
 * Χρησιμοποιείται για paragraphs, labels, spans και άλλα text elements
 * με ενιαία typography standards
 */
export const Text: React.FC<TextProps> = ({
  size = 'base',
  weight = 'normal',
  align = 'left',
  color = 'secondary',
  lineHeight = 'normal',
  className = '',
  as: Component = 'p',
  children,
  ...props
}) => {
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
    alignItems,
    gap,
    ...domProps
  } = props;
  const classes = [
    'layera-text',
    `layera-text-${size}`,
    `layera-font-${weight}`,
    `layera-text-${align}`,
    `layera-text-${color}`,
    `layera-leading-${lineHeight}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...domProps}>
      {children}
    </Component>
  );
};

Text.displayName = 'LayeraText';