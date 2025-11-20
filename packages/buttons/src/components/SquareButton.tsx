import { forwardRef } from 'react';
import { Button } from './Button';
import { SquareButtonProps } from '../types';

/**
 * SquareButton Component - Τετράγωνα πλήκτρα για επικεφαλίδες και toolbars
 *
 * Enterprise button component με 1:1 aspect ratio
 * - Ίδιο width και height
 * - Μόνο εικονίδιο (χωρίς text)
 * - Ιδανικό για headers, toolbars, floating actions
 * - WCAG 2.1 Compliant με accessibility support
 */

/**
 * SquareButton - Enterprise τετράγωνο πλήκτρο
 *
 * Features:
 * - Square aspect ratio (width = height)
 * - Icon-only interface με accessibility
 * - Tooltip support για UX
 * - Πλήρης συμβατότητα με Button API
 * - Enterprise design patterns
 */
export const SquareButton = forwardRef<HTMLButtonElement, SquareButtonProps>(({
  icon,
  size = 'md',
  variant = 'secondary',
  className = '',
  tooltip,
  ...props
}, ref) => {
  // Enterprise CSS classes αντί για inline styles
  const squareClassName = `layera-square-button layera-square-button--${size} layera-button ${className}`;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      icon={icon}
      iconPosition="left"
      className={squareClassName}
      title={tooltip}
      data-shape="square"
      data-size={size}
      {...props}
    />
  );
});

SquareButton.displayName = 'LayeraSquareButton';