import React, { forwardRef } from 'react';
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
  ...props
}, ref) => {
  // Υπολογισμός CSS classes
  const classes = [
    'layera-btn',
    `layera-btn--${variant}`,
    `layera-btn--${size}`,
    fullWidth && 'layera-btn--full-width',
    loading && 'layera-btn--loading',
    icon && !children && 'layera-btn--icon-only',
    className
  ].filter(Boolean).join(' ');

  // Loading content βάσει variant
  const renderLoadingContent = () => {
    switch (loadingVariant) {
      case 'dots':
        return (
          <div className="layera-btn__dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      case 'pulse':
        return <div className="layera-btn__pulse"></div>;
      case 'spinner':
      default:
        return <div className="layera-btn__spinner"></div>;
    }
  };

  // Icon rendering
  const renderIcon = () => {
    if (!icon) return null;
    return <span className="layera-btn__icon">{icon}</span>;
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
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={loading && loadingText ? loadingText : undefined}
      {...props}
    >
      {loading && (
        <div className="layera-btn__loading">
          {renderLoadingContent()}
        </div>
      )}
      <div className="layera-btn__content">
        {loading && loadingText ? loadingText : renderContent()}
      </div>
    </button>
  );
});

Button.displayName = 'LayeraButton';