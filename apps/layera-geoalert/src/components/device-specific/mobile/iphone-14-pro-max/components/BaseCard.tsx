/**
 * BaseCard.tsx - Enterprise Card Component
 *
 * Γενέτειρα κάρτα που χρησιμοποιεί configuration-driven approach
 * ακολουθώντας Design System patterns από μεγάλες εταιρείες.
 */

import React from 'react';

// Card variants - theme configuration
export const cardThemes = {
  property: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)', // Επιστροφή στο ήπιο emerald
    borderColor: 'rgb(16, 185, 129)', // Επιστροφή στο ήπιο emerald
    titleBackground: 'rgba(16, 185, 129, 0.1)',
    titleShadow: '0 0 25px rgba(16, 185, 129, 0.2)'
  },
  job: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)', // Ίδιο με stepper
    borderColor: 'rgb(59, 130, 246)', // Ίδιο με stepper
    titleBackground: 'rgba(59, 130, 246, 0.1)',
    titleShadow: '0 0 25px rgba(59, 130, 246, 0.2)'
  }
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
  const theme = cardThemes[variant];

  // Base card styles - consistent across all variants
  const baseCardStyles: React.CSSProperties = {
    flex: 1,
    height: '60px',
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
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
    backdropFilter: 'none'
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
    color: '#000000',
    textAlign: 'center',
    lineHeight: '1.2',
    // Theme-specific styles
    backgroundColor: theme.titleBackground,
    boxShadow: theme.titleShadow
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
    transition: 'all 0.2s ease'
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