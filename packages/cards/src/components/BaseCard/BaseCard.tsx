import React from 'react';
import { BaseCardProps } from '../../types';

/**
 * BaseCard - Core card component που παρέχει τη βάση για όλα τα άλλα cards
 */
export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  title,
  subtitle,
  actions,
  footer,
  variant = 'elevated',
  size = 'md',
  padding = 'md',
  hoverable = false,
  clickable = false,
  onClick,
  className = '',
  style
}) => {
  const cardClasses = [
    'layera-card',
    `layera-card--${variant}`,
    `layera-card--${size}`,
    `layera-card--padding-${padding}`,
    hoverable ? 'layera-card--hoverable' : '',
    clickable ? 'layera-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (clickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  const CardElement = clickable ? 'button' : 'div';
  const extraProps = clickable
    ? {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: 'button',
        'aria-pressed': false
      }
    : {};

  return (
    <CardElement className={cardClasses} style={style} {...extraProps}>
      {/* Header Section */}
      {(title || subtitle || actions) && (
        <div className="layera-card__header">
          <div className="layera-card__header-content">
            {title && <h3 className="layera-card__title">{title}</h3>}
            {subtitle && <p className="layera-card__subtitle">{subtitle}</p>}
          </div>
          {actions && (
            <div className="layera-card__actions">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="layera-card__content">
        {children}
      </div>

      {/* Footer Section */}
      {footer && (
        <div className="layera-card__footer">
          {footer}
        </div>
      )}
    </CardElement>
  );
};