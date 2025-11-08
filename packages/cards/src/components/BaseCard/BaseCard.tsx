import React from 'react';
import { BaseCardProps } from '../../types';
import { getEnhancedCardTheme, getCardTextColor } from '../../utils/cardThemes';
import { SST_CARD_CONFIG } from '../../styles/sst-config';

// Enterprise LEGO Design System imports
import { SPACING_SCALE, BORDER_RADIUS_SCALE, GEO_DRAWING_INTERACTION, COMPONENT_DESIGN_TOKENS } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';

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
  'data-testid': testId,

  // ============= ADDITIONAL LAYOUT PROPERTIES =============
  marginY,
  marginLeft,
  marginRight,
  maxWidth,
  borderWidth,
  borderColor
}) => {
  // 🔥 DEBUG: SST System Console Logs (disabled for cleaner console)
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('🎯 BaseCard Debug:', {
  //     variant,
  //     title,
  //     className: `layera-card--${variant}`,
  //     timestamp: new Date().toLocaleTimeString()
  //   });
  // }

  // 🔥 DEBUG: SST Config Analysis
  const sstStyles = SST_CARD_CONFIG.getCardStyles(variant as string);
  const hasSST = Object.keys(sstStyles).length > 0;

  // if (process.env.NODE_ENV === 'development') {
  //   console.log('🎨 SST Debug:', {
  //     variant,
  //     sstStyles,
  //     hasSST,
  //     backgroundColor: sstStyles.backgroundColor,
  //     fullConfig: SST_CARD_CONFIG[variant as keyof typeof SST_CARD_CONFIG]
  //   });

  //   // 🔥 DEBUG: Final computed styles
  //   console.log('🖼️ Final Styles:', {
  //     variant,
  //     willUseSST: hasSST,
  //     finalBackgroundColor: hasSST ? sstStyles.backgroundColor : 'fallback',
  //     sstKeys: Object.keys(sstStyles),
  //     sstConfigKeys: Object.keys(SST_CARD_CONFIG)
  //   });
  // }
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

  // ============= UNIVERSAL SST SYSTEM - SINGLE SOURCE OF TRUTH =============
  // (sstStyles already defined above in debug section)

  const baseCardStyles: React.CSSProperties = {
    // Layout
    flex: 1,
    height: size === 'sm' ? 'calc(var(--la-space-6) + var(--la-space-3))' : undefined, // 🎯 SST: LG + SM = 24px + 12px
    position: 'relative',

    // 🎯 UNIVERSAL SST SYSTEM - Works for ALL variants
    ...(hasSST ? sstStyles : {
      // Fallback for unknown variants
      backgroundColor: 'var(--la-color-surface)',
      border: 'var(--la-border-width-md) solid var(--la-color-info)', // 🎯 SST: Border width token
      borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
      padding: `${SPACING_SCALE[padding.toUpperCase() as keyof typeof SPACING_SCALE] || SPACING_SCALE.SM}px`
    }),

    // Theme system (only if no SST)
    ...(hasSST ? {} : {
      backdropFilter: theme.backdropFilter,
      opacity: theme.opacity
    }),

    // Interaction
    cursor: (clickable || onClick) ? getCursorVar('pointer') : 'default',
    transition: 'var(--la-transition-normal)',
    userSelect: 'text', // ✅ ΕΠΙΤΡΕΠΕΙ αντιγραφή κειμένου από όλες τις κάρτες
    WebkitTapHighlightColor: 'transparent',

    // Shadow system (only if no SST boxShadow)
    boxShadow: sstStyles.boxShadow || (hoverable ? BOX_SHADOW_SCALE.elevation1 : BOX_SHADOW_SCALE.none),

    // Additional layout properties
    marginTop: marginY,
    marginBottom: marginY,
    marginLeft: marginLeft,
    marginRight: marginRight,
    maxWidth: maxWidth,
    borderWidth: borderWidth,
    borderColor: borderColor,

    // Custom style override
    ...style
  };

  // ============= UNIVERSAL SST TITLE SYSTEM =============
  const sstTitleStyles = SST_CARD_CONFIG.getTitleStyles(variant as string);
  const hasSSTTitle = Object.keys(sstTitleStyles).length > 0;

  const titleStyles: React.CSSProperties = {
    // Base layout (always applied)
    fontWeight: 'var(--la-font-semibold)', // 🎯 SST: Font weight token
    textAlign: 'center',
    lineHeight: 'var(--la-line-height-tight)', // 🎯 SST: Line height token
    position: 'relative',
    zIndex: 2,

    // 🎯 UNIVERSAL SST TITLE SYSTEM - Works for ALL variants
    ...(hasSSTTitle ? sstTitleStyles : {
      // Fallback for unknown variants
      padding: 'var(--la-space-xs-plus-2-sm-padding)', // 🎯 SST: XS+2 SM padding
      borderRadius: 'var(--la-space-xs-plus-2-radius)', // 🎯 SST: XS+2 border radius
      color: textColor,
      backgroundColor: theme.titleBackground,
      boxShadow: theme.titleShadow
    })
  };

  // ============= INFO BUTTON STYLES =============
  const infoButtonStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: `${SPACING_SCALE.SM}px`,
    right: `${SPACING_SCALE.SM}px`,
    width: 'var(--la-space-6)', // 🎯 SST: LG size (24px)
    height: 'var(--la-space-6)', // 🎯 SST: LG size (24px)
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    backgroundColor: 'transparent',
    border: 'none',
    fontWeight: 'var(--la-font-bold)', // 🎯 SST: Font weight token
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
    target.style.transform = 'var(--la-scale-down)'; // 🎯 SST: Transform token
    target.style.backgroundColor = theme.backgroundColor.replace('var(--la-opacity-low)', 'var(--la-opacity-medium)'); // 🎯 SST: Opacity tokens
  });

  const handleTouchEnd = onTouchEnd || ((e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'var(--la-scale-normal)'; // 🎯 SST: Transform token
    target.style.backgroundColor = theme.backgroundColor;
  });

  // ============= INFO CLICK HANDLER =============
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('vibrate' in navigator) {
      navigator.vibrate(COMPONENT_DESIGN_TOKENS.haptic['haptic-medium']);
    }
    onInfoClick?.();
  };

  // Touch handlers για το info button
  const handleInfoTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.color = 'var(--color-text-primary)';
    target.style.transform = 'var(--la-scale-up)'; // 🎯 SST: Transform token
    if ('vibrate' in navigator) {
      navigator.vibrate(COMPONENT_DESIGN_TOKENS.haptic['haptic-light']);
    }
  };

  const handleInfoTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.color = 'var(--color-text-secondary)';
    target.style.transform = 'var(--la-scale-normal)'; // 🎯 SST: Transform token
  };

  // ============= CLICK HANDLERS =============
  const handleClick = (): void => {
    if ((clickable || onClick) && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((clickable || onClick) && onClick && (event.key === GEO_DRAWING_INTERACTION.KEY_CODES.ENTER || event.key === ' ')) {
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
        tabIndex: 0,
        role: 'button',
        'aria-pressed': false
      }
    : {};

  // ============= SIMPLIFIED RENDERING =============
  // Simplified mode to avoid TypeScript errors
  if (icon && title && !children) {
    return (
      <div
        className={`la-card-base ${className}`}
        onClick={(clickable || onClick) ? handleClick : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-testid={testId || `card-${variant}`}
      >
        {/* Title with Icon - Simplified pattern */}
        <div className="la-card-title-container">
          <div
            className="layera-card__title la-card-title-with-icon"
          >
            {icon}
            {title}
          </div>

          {/* Description support - Universal SST */}
          {description && (
            <div className="la-card-description">
              {description}
            </div>
          )}
        </div>

        {/* Info Button - Simplified */}
        {onInfoClick && (
          <div
            onClick={handleInfoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const mouseEvent = new MouseEvent('click', { bubbles: true });
                handleInfoClick(mouseEvent as unknown as React.MouseEvent);
              }
            }}
            className="la-card-info-button la-card-info-button-positioned"
            data-testid={`${testId || 'card'}-info-button`}
          >
            i
          </div>
        )}
      </div>
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
    <CardElement className={cardClasses} {...extraProps} data-testid={testId}>
      {/* Header Section */}
      {(title || subtitle || actions || icon) && (
        <div className="layera-card__header">
          <div className="layera-card__header-content">
            {/* Icon support για LEGO mode */}
            {icon && (
              <div className="layera-card__icon la-card-icon">
                {icon}
              </div>
            )}
            {title && <h3 className="layera-card__title la-card-title-with-color">{title}</h3>}
            {subtitle && <p className="layera-card__subtitle la-card-title-with-color">{subtitle}</p>}
          </div>
          {actions && (
            <div className="layera-card__actions">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      {children && (
        <div className="layera-card__content la-card-content-with-color">
          {children}
        </div>
      )}

      {/* Footer Section */}
      {footer && (
        <div className="layera-card__footer la-card-footer-with-color">
          {footer}
        </div>
      )}

      {/* Info Button για LEGO mode */}
      {onInfoClick && (
        <div
          onClick={handleInfoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const mouseEvent = new MouseEvent('click', { bubbles: true });
              handleInfoClick(mouseEvent as unknown as React.MouseEvent);
            }
          }}
          className="la-card-info-button la-card-info-button-positioned"
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.transform = 'var(--la-scale-up)';
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.transform = 'var(--la-scale-normal)';
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