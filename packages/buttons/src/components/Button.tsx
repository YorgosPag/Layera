import { forwardRef } from 'react';
import { Box } from '@layera/layout';
import { ButtonProps } from '../types';

/**
 * Button Component - Enterprise Button για το Layera Design System
 *
 * Features:
 * - WCAG 2.1 Compliant (44x44px minimum για touch targets)
 * - Enterprise design variants (primary, secondary, outline, ghost, danger, success, warning, info)
 * - 5 responsive sizes (xs, sm, md, lg, xl)
 * - Loading states με spinner/dots/pulse animations
 * - Icon support με configurable positioning
 * - Full accessibility support με ARIA attributes
 * - TypeScript strict mode compatible
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  loadingVariant = 'spinner',
  loadingText,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  disabled,
  type = 'button',
  // Removed CSS properties for ARXES compliance - styling via CSS classes only
  ...props
}, ref) => {
  // Υπολογισμός CSS classes - χρήση των ΠΡΑΓΜΑΤΙΚΩΝ κλάσεων από tokens
  const classes = [
    'layera-button',
    `layera-button--${size}`,
    fullWidth && 'layera-button--full-width',
    loading && 'layera-button--loading',
    icon && !children && 'layera-button--icon-only',
    className
  ].filter(Boolean).join(' ');

  // Note: CSS styling handled by CSS classes - no inline styles for ARXES compliance

  // Loading content βάσει variant
  const renderLoadingContent = () => {
    switch (loadingVariant) {
      case 'dots':
        return (
          <Box className="layera-btn-dots">
            <Box className="dot"></Box>
            <Box className="dot"></Box>
            <Box className="dot"></Box>
          </Box>
        );
      case 'pulse':
        return <Box className="layera-btn-pulse"></Box>;
      case 'spinner':
      default:
        return <Box className="layera-btn-spinner"></Box>;
    }
  };

  // Icon rendering
  const renderIcon = () => {
    if (!icon) return null;
    return <span className="layera-btn-icon">{icon}</span>;
  };

  // Content ordering βάσει icon position
  const renderContent = () => {
    if (iconPosition === 'right') {
      return (
        <>
          {children}
          {renderIcon()}
        </>
      );
    }

    if (iconPosition === 'only') {
      return renderIcon();
    }

    // Default: left ή no icon
    return (
      <>
        {renderIcon()}
        {children}
      </>
    );
  };

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      data-size={size}
      data-variant={variant}
      data-loading={loading}
      data-full-width={fullWidth}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={loading && loadingText ? loadingText : undefined}
      {...props}
    >
      {loading && (
        <Box className="layera-button-loading">
          {renderLoadingContent()}
        </Box>
      )}
      <Box className="layera-button-content">
        {loading && loadingText ? loadingText : renderContent()}
      </Box>
    </button>
  );
});

Button.displayName = 'LayeraButton';