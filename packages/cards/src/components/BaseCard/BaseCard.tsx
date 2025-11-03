import React from 'react';
import { BaseCardProps } from '../../types';
import { getEnhancedCardTheme, getCardTextColor } from '../../utils/cardThemes';

// Enterprise LEGO Design System imports
import { SPACING_SCALE, BORDER_RADIUS_SCALE, GEO_DRAWING_INTERACTION } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';
import { Flex, Box } from '@layera/layout';

/**
 * Enhanced BaseCard - Unified Enterprise Card Component
 *
 * Συνδυάζει τα καλύτερα από Local και LEGO BaseCard:
 * - Advanced opacity modes από Local BaseCard
 * - Mobile touch optimizations από Local BaseCard
 * - Enterprise LEGO design system integration
 * - Type safety και performance optimization
 * - Backward compatibility για existing LEGO usage
 */
export const BaseCard: React.FC<BaseCardProps> = React.memo(({
  // ============= FLEXIBLE CONTENT =============
  children,
  title,
  icon,
  description,

  // ============= LEGO FEATURES =============
  subtitle,
  actions,
  footer,
  size = 'md',
  padding = 'md',
  hoverable = false,
  clickable = false,

  // ============= ENHANCED VARIANTS =============
  variant = 'elevated',

  // ============= MOBILE UX FEATURES =============
  opacityMode = 'transparent',
  onInfoClick,
  onTouchStart,
  onTouchEnd,

  // ============= COMMON =============
  onClick,
  className = '',
  style,
  'data-testid': testId
}) => {
  // ============= ENHANCED THEME SYSTEM =============
  const theme = getEnhancedCardTheme(variant, opacityMode);
  const textColor = getCardTextColor(variant, opacityMode);

  // ============= OPACITY MODES - Event listener για opacity toggle από το stepper =============
  React.useEffect(() => {
    if (opacityMode !== 'transparent') return; // Μόνο αν χρησιμοποιεί το opacity system

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleOpacityToggle = (event: CustomEvent) => {
      // Αυτό θα χειριστεί το parent component που διαχειρίζεται το opacityMode state
    };

    window.addEventListener('toggleCardsOpacity', handleOpacityToggle as EventListener);

    return () => {
      window.removeEventListener('toggleCardsOpacity', handleOpacityToggle as EventListener);
    };
  }, [opacityMode]);

  // ============= BASE CARD STYLES με LEGO Design Tokens =============
  const baseCardStyles: React.CSSProperties = {
    // Layout
    flex: 1,
    height: size === 'sm' ? `${SPACING_SCALE.LG + SPACING_SCALE.SM}px` : undefined,
    borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
    padding: `${SPACING_SCALE[padding.toUpperCase() as keyof typeof SPACING_SCALE] || SPACING_SCALE.SM}px`,
    position: 'relative',

    // Enhanced theme από unified system
    backgroundColor: theme.backgroundColor,
    border: `2px solid ${theme.borderColor}`,
    backdropFilter: theme.backdropFilter,
    opacity: theme.opacity,

    // Interaction
    cursor: (clickable || onClick) ? getCursorVar('pointer') : 'default',
    transition: 'var(--la-transition-normal)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',

    // Shadow system
    boxShadow: hoverable ? BOX_SHADOW_SCALE.elevation1 : BOX_SHADOW_SCALE.none,

    // Custom style override
    ...style
  };

  // ============= TITLE STYLES (Local BaseCard pattern) =============
  const titleStyles: React.CSSProperties = {
    padding: `${SPACING_SCALE.XS + 2}px ${SPACING_SCALE.SM}px`,
    borderRadius: `${SPACING_SCALE.XS + 2}px`,
    fontWeight: 'var(--la-font-semibold)',
    color: textColor,
    textAlign: 'center',
    lineHeight: '1.2',
    backgroundColor: theme.titleBackground,
    boxShadow: theme.titleShadow,
    position: 'relative',
    zIndex: 2
  };

  // ============= INFO BUTTON STYLES =============
  const infoButtonStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: `${SPACING_SCALE.SM}px`,
    right: `${SPACING_SCALE.SM}px`,
    width: `${SPACING_SCALE.LG}px`,
    height: `${SPACING_SCALE.LG}px`,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: 'var(--la-font-bold)',
    color: 'var(--color-text-secondary)',
    cursor: getCursorVar('pointer'),
    transition: 'var(--la-transition-fast)',
    zIndex: 'var(--la-z-popover)', // Enterprise CSS Custom Property - Single Source of Truth
    boxShadow: BOX_SHADOW_SCALE.none,
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation'
  };

  // ============= TOUCH HANDLERS για Mobile UX =============
  const handleTouchStart = onTouchStart || ((e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.98)';
    target.style.backgroundColor = theme.backgroundColor.replace('0.01', '0.08');
  });

  const handleTouchEnd = onTouchEnd || ((e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.backgroundColor = theme.backgroundColor;
  });

  // ============= INFO CLICK HANDLER =============
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Touch handlers για το info button
  const handleInfoTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.color = 'var(--color-text-primary)';
    target.style.transform = 'scale(1.1)';
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleInfoTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.color = 'var(--color-text-secondary)';
    target.style.transform = 'scale(1)';
  };

  // ============= CLICK HANDLERS =============
  const handleClick = (): void => {
    if ((clickable || onClick) && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((clickable || onClick) && onClick && (event.key === GEO_DRAWING_INTERACTION.KEY_CODES.ENTER || event.key === GEO_DRAWING_INTERACTION.KEY_CODES.SPACE)) {
      event.preventDefault();
      onClick();
    }
  };

  // ============= RENDER LOGIC =============
  // Dynamic element based on interaction
  const CardElement = (clickable || onClick) ? 'button' : 'div';
  const extraProps = (clickable || onClick)
    ? {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: GEO_DRAWING_INTERACTION.ACCESSIBILITY.TAB_INDEX_FOCUSABLE,
        role: 'button',
        'aria-pressed': false
      }
    : {};

  // ============= DUAL RENDERING MODES =============
  // Mode 1: Local BaseCard pattern (icon + title + optional description)
  if (icon && title && !children) {
    return (
      <Box
        style={baseCardStyles}
        onClick={(clickable || onClick) ? handleClick : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={className}
        data-testid={testId || `card-${variant}`}
      >
        {/* Title with Icon - Local BaseCard pattern */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="xs"
          width="var(--la-width-full, 100%)"
        >
          <Flex align="center" justify="center" gap="xs" style={titleStyles}>
            {icon}
            {title}
          </Flex>

          {/* Description support για UploadStep pattern */}
          {description && (
            <Box
              fontSize="var(--la-font-size-sm)"
              color={getCardTextColor(variant, opacityMode)}
              textAlign="var(--la-text-align-center, center)"
              marginTop={`${SPACING_SCALE.XS}px`}
              opacity="var(--la-opacity-80, 0.8)"
            >
              {description}
            </Box>
          )}
        </Flex>

        {/* Info Button - Mobile optimized */}
        {onInfoClick && (
          <div
            onClick={handleInfoClick}
            role="button"
            tabIndex={GEO_DRAWING_INTERACTION.ACCESSIBILITY.TAB_INDEX_FOCUSABLE}
            onKeyDown={(e) => {
              if (e.key === GEO_DRAWING_INTERACTION.KEY_CODES.ENTER || e.key === GEO_DRAWING_INTERACTION.KEY_CODES.SPACE) {
                e.preventDefault();
                handleInfoClick();
              }
            }}
            style={{
              ...infoButtonStyles,
              display: 'var(--la-display-flex, flex)',
              alignItems: 'var(--la-align-center, center)',
              justifyContent: 'var(--la-justify-center, center)',
              cursor: getCursorVar('pointer')
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.transform = 'var(--la-transform-scale-110, scale(1.1))';
              }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              if (window.matchMedia('(hover: hover)').matches) {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.transform = 'var(--la-transform-scale-100, scale(1))';
              }
            }}
            onTouchStart={handleInfoTouchStart}
            onTouchEnd={handleInfoTouchEnd}
            data-testid={`${testId || 'card'}-info-button`}
          >
            i
          </div>
        )}
      </Box>
    );
  }

  // Mode 2: LEGO BaseCard pattern (traditional header/content/footer)
  const cardClasses = [
    'layera-card',
    `layera-card--${variant}`,
    `layera-card--${size}`,
    `layera-card--padding-${padding}`,
    hoverable ? 'layera-card--hoverable' : '',
    (clickable || onClick) ? 'layera-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <CardElement className={cardClasses} style={baseCardStyles} {...extraProps} data-testid={testId}>
      {/* Header Section */}
      {(title || subtitle || actions || icon) && (
        <Box className="layera-card__header">
          <Box className="layera-card__header-content">
            {/* Icon support για LEGO mode */}
            {icon && (
              <Box className="layera-card__icon" marginBottom={`${SPACING_SCALE.XS}px`}>
                {icon}
              </Box>
            )}
            {title && <h3 className="layera-card__title" style={{ color: textColor }}>{title}</h3>}
            {subtitle && <p className="layera-card__subtitle" style={{ color: textColor }}>{subtitle}</p>}
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
        <Box className="layera-card__content" color={textColor}>
          {children}
        </Box>
      )}

      {/* Footer Section */}
      {footer && (
        <Box className="layera-card__footer" color={textColor}>
          {footer}
        </Box>
      )}

      {/* Info Button για LEGO mode */}
      {onInfoClick && (
        <div
          onClick={handleInfoClick}
          role="button"
          tabIndex={GEO_DRAWING_INTERACTION.ACCESSIBILITY.TAB_INDEX_FOCUSABLE}
          onKeyDown={(e) => {
            if (e.key === GEO_DRAWING_INTERACTION.KEY_CODES.ENTER || e.key === GEO_DRAWING_INTERACTION.KEY_CODES.SPACE) {
              e.preventDefault();
              handleInfoClick();
            }
          }}
          style={{
            ...infoButtonStyles,
            display: 'var(--la-display-flex, flex)',
            alignItems: 'var(--la-align-center, center)',
            justifyContent: 'var(--la-justify-center, center)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.transform = 'var(--la-transform-scale-110, scale(1.1))';
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          onTouchStart={handleInfoTouchStart}
          onTouchEnd={handleInfoTouchEnd}
          data-testid={`${testId || 'card'}-info-button`}
        >
          i
        </div>
      )}
    </CardElement>
  );
});