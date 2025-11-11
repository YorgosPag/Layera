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
    className
  ].filter(Boolean).join(' ');

  const colorVar = `var(--layera-text-${color})`;
  const style = { color: colorVar, ...(props.style || {}) };

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  );
};

Text.displayName = 'LayeraText';