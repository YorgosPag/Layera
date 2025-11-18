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
  const classes = [
    `layera-text-${size}`,
    `layera-font-${weight}`,
    `layera-leading-${lineHeight}`,
    `layera-text-color-${color}`,
    `layera-text-align-${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} data-size={size} data-weight={weight} data-color={color} data-align={align} data-line-height={lineHeight} {...props}>
      {children}
    </Component>
  );
};

Text.displayName = 'LayeraText';