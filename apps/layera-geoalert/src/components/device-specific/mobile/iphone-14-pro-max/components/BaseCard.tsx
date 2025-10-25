/**
 * BaseCard.tsx - Enterprise Card Component
 *
 * Γενέτειρα κάρτα που χρησιμοποιεί configuration-driven approach
 * ακολουθώντας Design System patterns από μεγάλες εταιρείες.
 */

import React from 'react';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { SIZING_SCALE } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { Text } from '@layera/typography';
import { getCursorVar } from '@layera/cursors';

// Card variants - theme configuration functions με 3 opacity modes
type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';

export const getCardTheme = (variant: 'property' | 'job', opacityMode: OpacityMode) => {
  const baseColors = {
    property: {
      baseColor: 'var(--color-semantic-success-rgb)', // emerald από design tokens
      borderColor: 'var(--color-semantic-success-border)',
      titleShadow: '0 0 25px var(--color-semantic-success-shadow)'
    },
    job: {
      baseColor: 'var(--color-interactive-primary-rgb)', // blue από design tokens
      borderColor: 'var(--color-interactive-primary)',
      titleShadow: '0 0 25px var(--color-interactive-primary-shadow)'
    }
  };

  const { baseColor, borderColor, titleShadow } = baseColors[variant];

  switch (opacityMode) {
    case 'transparent':
      return {
        backgroundColor: `rgba(${baseColor}, 0.01)`, // Πλήρως διαφανές background ΜΟΝΟ
        borderColor, // Περίγραμμα παραμένει πλήρως ορατό
        titleBackground: `rgba(${baseColor}, 0.02)`,
        titleShadow: 'none', // Χωρίς shadow στο transparent mode επίσης
        backdropFilter: 'none', // ΚΑΜΙΑ θόλωση - όλα καθαρά
        opacity: 1 // ΠΑΡΑΜΕΝΕΙ 1 - μόνο το background είναι διαφανές
      };
    case 'semi-transparent':
      return {
        backgroundColor: `rgba(${baseColor}, 0.65)`, // Πιο έντονο χρώμα, λιγότερη διαφάνεια
        borderColor,
        titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
        titleShadow: 'none', // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        backdropFilter: 'none', // Χωρίς blur - κείμενα και εικονίδια καθαρά
        opacity: 0.8
      };
    case 'opaque':
      return {
        backgroundColor: `rgba(${baseColor}, 0.95)`, // Συμπαγές
        borderColor,
        titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
        titleShadow: 'none', // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        backdropFilter: 'none',
        opacity: 0.95
      };
  }
};

// Legacy cardThemes για backwards compatibility
export const cardThemes = {
  property: getCardTheme('property', 'transparent'),
  job: getCardTheme('job', 'transparent')
} as const;

export type CardVariant = keyof typeof cardThemes;

export interface BaseCardProps {
  // Core props
  variant: CardVariant;
  title: string;
  icon: React.ReactNode;

  // Event handlers
  onClick?: () => void;
  onInfoClick?: () => void;

  // Optional styling
  className?: string;
  'data-testid'?: string;

  // Touch events
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  variant,
  title,
  icon,
  onClick,
  onInfoClick,
  className = '',
  'data-testid': testId,
  onTouchStart,
  onTouchEnd
}) => {
  // Opacity modes - τρεις καταστάσεις
  type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';
  const [opacityMode, setOpacityMode] = React.useState<OpacityMode>('transparent');

  // Event listener για opacity toggle από το stepper
  React.useEffect(() => {
    const handleOpacityToggle = (event: CustomEvent) => {
      const { opacityMode: newOpacityMode } = event.detail;
      setOpacityMode(newOpacityMode);
    };

    window.addEventListener('toggleCardsOpacity', handleOpacityToggle as EventListener);

    return () => {
      window.removeEventListener('toggleCardsOpacity', handleOpacityToggle as EventListener);
    };
  }, []);

  const theme = getCardTheme(variant, opacityMode);

  // Base card styles - consistent across all variants
  const baseCardStyles: React.CSSProperties = {
    flex: 1,
    height: `${SPACING_SCALE.LG + SPACING_SCALE.SM}px`,
    borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
    boxShadow: BOX_SHADOW_SCALE.none,
    padding: `${SPACING_SCALE.SM}px`,
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    transition: 'var(--layera-transition-normal)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Theme-specific styles
    backgroundColor: theme.backgroundColor,
    border: `2px solid ${theme.borderColor}`,
    backdropFilter: 'none', // ΕΞΑΣΦΑΛΙΖΩ ότι δεν υπάρχει blur πουθενά
    opacity: theme.opacity
  };

  // Title container styles
  const titleStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${SPACING_SCALE.XS + 2}px`,
    padding: `${SPACING_SCALE.XS + 2}px ${SPACING_SCALE.SM}px`,
    borderRadius: `${SPACING_SCALE.XS + 2}px`,
    // fontSize handled by Text component
    fontWeight: 'var(--layera-font-semibold)', // Typography system token για 600
    color: opacityMode === 'opaque' ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)', // Κείμενα παραμένουν πλήρως ορατά
    textAlign: 'center',
    lineHeight: '1.2',
    // Theme-specific styles
    backgroundColor: theme.titleBackground,
    boxShadow: theme.titleShadow,
    position: 'relative',
    zIndex: 2 // Τίτλος και εικονίδια μπροστά από το background
  };

  // Info button styles - responsive για desktop και mobile
  const infoButtonStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: `${SIZING_SCALE.SM}px`,
    right: `${SIZING_SCALE.SM}px`,
    width: `${SIZING_SCALE.LG}px`,
    height: `${SIZING_SCALE.LG}px`,
    borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize handled by Text component
    fontWeight: 'var(--layera-font-bold)', // Typography system token για bold
    color: 'var(--color-text-secondary)', // Neutral theme color από design tokens
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    transition: 'var(--layera-transition-fast)',
    zIndex: 10000,
    boxShadow: BOX_SHADOW_SCALE.none,
    // Touch-friendly για mobile
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation'
  };

  // Default touch handlers
  const handleTouchStart = onTouchStart || ((e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.98)';
    target.style.backgroundColor = theme.backgroundColor.replace('0.05', '0.08');
  });

  const handleTouchEnd = onTouchEnd || ((e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.backgroundColor = theme.backgroundColor;
  });

  // Info click handler with event stopPropagation
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onInfoClick?.();
  };

  // Touch handlers για το info button (mobile feedback)
  const handleInfoTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.color = 'var(--color-text-primary)'; // Πιο σκούρο γκρι στο touch
    target.style.transform = 'scale(1.1)';
    if ('vibrate' in navigator) {
      navigator.vibrate(10); // Μικρή δόνηση για feedback
    }
  };

  const handleInfoTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.style.color = 'var(--color-text-secondary)'; // Επιστροφή στο κανονικό χρώμα
    target.style.transform = 'scale(1)';
  };

  return (
    <div
      style={baseCardStyles}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={className}
      data-testid={testId || `card-${variant}`}
    >
      {/* Title with Icon */}
      <div style={titleStyles}>
        {icon}
        {title}
      </div>

      {/* Info Button - Responsive για desktop hover και mobile touch */}
      {onInfoClick && (
        <div
          onClick={handleInfoClick}
          style={infoButtonStyles}
          // Desktop hover effects
          onMouseEnter={(e) => {
            // Ελέγχω αν είναι desktop (έχει ποντίκι)
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          // Mobile touch effects
          onTouchStart={handleInfoTouchStart}
          onTouchEnd={handleInfoTouchEnd}
          data-testid={`${testId || 'card'}-info-button`}
        >
          i
        </div>
      )}
    </div>
  );
};