import React, { forwardRef } from 'react';
import { ArrowLeftIcon } from '@layera/icons';
import { Button } from './Button';
import { BackButtonProps } from '../types';

/**
 * BackButton Component - Πλήκτρο επιστροφής για navigation
 *
 * Specialized Button component για επιστροφή σε προηγούμενο βήμα
 * - Enterprise design patterns
 * - WCAG 2.1 Compliant
 * - Προ-διαμορφωμένο με ArrowLeft icon και secondary variant
 * - Customizable text και functionality
 */

/**
 * BackButton - Enterprise πλήκτρο επιστροφής
 *
 * Features:
 * - Προ-διαμορφωμένο με ArrowLeft icon
 * - Secondary variant by default (low emphasis)
 * - Customizable text και functionality
 * - Πλήρης accessibility support
 * - ARXES compliant styling
 */
export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(({
  text = 'Πίσω',
  variant = 'secondary',
  onBack,
  onClick,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call custom onBack handler πρώτα
    onBack?.();

    // Καλεί το custom onClick αν υπάρχει
    onClick?.(event);
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      icon={<ArrowLeftIcon />}
      iconPosition="left"
      className={`layera-back-btn ${className}`}
      onClick={handleClick}
      aria-label={`Επιστροφή: ${text}`}
      {...props}
    >
      {text}
    </Button>
  );
});

BackButton.displayName = 'LayeraBackButton';