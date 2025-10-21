/**
 * AppHeader.tsx - iPhone app header με back button και τίτλος
 * Render μέσω FixedTopChrome για σταθερή εμφάνιση στο iOS
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
}

/**
 * App header με iOS-style design
 * Περιέχει back button, τίτλο και language switcher
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Layera GeoAlert',
  onBack,
  showBack = true
}) => {
  const { t } = useLayeraTranslation();

  const headerStyles: React.CSSProperties = {
    height: 'var(--header-h)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    position: 'relative'
  };

  const backButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#007AFF',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '17px',
    fontWeight: '600',
    color: '#000',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const languageStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#007AFF',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px'
  };

  return (
    <div style={headerStyles}>
      {/* Left: Back Button */}
      {showBack && (
        <button
          style={backButtonStyles}
          onClick={onBack || (() => window.history.back())}
        >
          ← {t('back', 'Πίσω')}
        </button>
      )}

      {/* Center: Title */}
      <div style={titleStyles}>
        {title}
      </div>

      {/* Right: Language Switcher */}
      <button style={languageStyles}>
        ΕΛ
      </button>
    </div>
  );
};