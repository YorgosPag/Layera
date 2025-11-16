import React from 'react';
import { BaseCardProps, CardVariant } from '../../types';
import { Box } from '@layera/layout';

/**
 * BaseCard - Enterprise Compliant Card Component
 *
 * ✅ ΠΛΗΡΗΣ ΣΥΜΜΟΡΦΩΣΗ ΜΕ ARXES ΚΑΝΟΝΕΣ:
 * - Μόνο CSS classes και design tokens
 * - Καμία χρήση inline styles
 * - Μόνο @layera/layout primitives
 * - Type safety χωρίς any types
 */
export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  title,
  icon,
  description,
  subtitle,
  actions,
  footer,
  size = 'md',
  padding = 'md',
  hoverable = false,
  clickable = false,
  variant = 'elevated' as CardVariant,
  onClick,
  className = '',
  'data-testid': testId
}) => {
  // Build CSS classes based on props using data attributes (Enterprise compliant)
  const cardClasses = [
    'layera-card',
    className
  ].filter(Boolean).join(' ');

  // Event handlers
  const handleClick = React.useCallback(() => {
    if ((clickable || onClick) && onClick) {
      onClick();
    }
  }, [clickable, onClick]);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if ((clickable || onClick) && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  }, [clickable, onClick]);

  // Dynamic element based on interaction - using Box instead of div
  const CardElement = (clickable || onClick) ? 'button' : 'section';
  const extraProps = (clickable || onClick)
    ? {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: 'button' as const,
        'aria-pressed': false
      }
    : {};

  return (
    <Box
      as={CardElement}
      className={cardClasses}
      data-variant={variant}
      data-size={size}
      data-padding={padding}
      data-hoverable={hoverable ? 'true' : 'false'}
      data-clickable={(clickable || onClick) ? 'true' : 'false'}
      data-testid={testId}
      {...extraProps}
    >
      {/* Header Section */}
      {(title || subtitle || actions || icon) && (
        <Box className="layera-card__header">
          {icon && (
            <Box className="layera-card__icon">
              {icon}
            </Box>
          )}
          <Box className="layera-card__headerContent">
            {title && (
              <Box as="header" className="layera-card__title">
                {title}
              </Box>
            )}
            {subtitle && (
              <Box className="layera-card__subtitle">
                {subtitle}
              </Box>
            )}
            {description && (
              <Box className="layera-card__description">
                {description}
              </Box>
            )}
          </Box>
          {actions && (
            <Box className="layera-card__actions">
              {actions}
            </Box>
          )}
        </Box>
      )}

      {/* Content Section */}
      {children && (
        <Box className="layera-card__content">
          {children}
        </Box>
      )}

      {/* Footer Section */}
      {footer && (
        <Box className="layera-card__footer">
          {footer}
        </Box>
      )}
    </Box>
  );
};