/**
 * BaseCard.tsx - Enterprise Card Component
 *
 * Γενέτειρα κάρτα που χρησιμοποιεί configuration-driven approach
 * ακολουθώντας Design System patterns από μεγάλες εταιρείες.
 */

import React from 'react';

// Card variants - theme configuration functions με 3 opacity modes
type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';

export const getCardTheme = (variant: 'property' | 'job', opacityMode: OpacityMode) => {
  const baseColors = {
    property: {
      baseColor: '16, 185, 129', // emerald
      borderColor: 'rgb(16, 185, 129)',
      titleShadow: '0 0 25px rgba(16, 185, 129, 0.2)'
    },
    job: {
      baseColor: '59, 130, 246', // blue
      borderColor: 'rgb(59, 130, 246)',
      titleShadow: '0 0 25px rgba(59, 130, 246, 0.2)'
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
    height: '60px',
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: opacityMode === 'opaque' ? '#ffffff' : '#000000', // Κείμενα παραμένουν πλήρως ορατά
    textAlign: 'center',
    lineHeight: '1.2',
    // Theme-specific styles
    backgroundColor: theme.titleBackground,
    boxShadow: theme.titleShadow,
    position: 'relative',
    zIndex: 2 // Τίτλος και εικονίδια μπροστά από το background
  };

  // Info button styles
  const infoButtonStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 3 // Info button μπροστά από όλα τα άλλα στοιχεία
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

      {/* Info Button */}
      {onInfoClick && (
        <div
          onClick={handleInfoClick}
          style={infoButtonStyles}
          data-testid={`${testId || 'card'}-info-button`}
        >
          i
        </div>
      )}
    </div>
  );
};