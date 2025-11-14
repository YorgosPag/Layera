import { forwardRef } from 'react';
import { Box } from '@layera/layout';
import { LinkButtonProps } from '../types';

/**
 * LinkButton Component - Button που λειτουργεί ως link
 *
 * Χρησιμοποιεί anchor tag αλλά με button styling για navigation actions
 * Ideal για external links, downloads, ή routing με semantic HTML
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({
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
  href,
  target,
  rel,
  ...props
}, ref) => {
  // Υπολογισμός CSS classes (ίδιες με Button)
  const classes = [
    'layera-btn',
    `layera-btn--${variant}`,
    `layera-btn--${size}`,
    fullWidth && 'layera-btn--full-width',
    loading && 'layera-btn--loading',
    icon && !children && 'layera-btn--icon-only',
    className
  ].filter(Boolean).join(' ');

  // Security: Automatic rel="noopener noreferrer" για external links
  const computedRel = target === '_blank' && !rel?.includes('noopener')
    ? `${rel || ''} noopener noreferrer`.trim()
    : rel;

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
    <a
      ref={ref}
      href={loading ? undefined : href}
      target={target}
      rel={computedRel}
      className={classes}
      aria-disabled={loading}
      aria-busy={loading}
      aria-label={loading && loadingText ? loadingText : undefined}
      role="button"
      {...props}
    >
      {loading && (
        <Box className="layera-btn-loading">
          {renderLoadingContent()}
        </Box>
      )}
      <Box className="layera-btn-content">
        {loading && loadingText ? loadingText : renderContent()}
      </Box>
    </a>
  );
});

LinkButton.displayName = 'LayeraLinkButton';