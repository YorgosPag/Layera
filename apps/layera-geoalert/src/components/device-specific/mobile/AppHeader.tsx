/**
 * AppHeader.tsx - iPhone app header με back button και τίτλος
 * Render μέσω FixedTopChrome για σταθερή εμφάνιση στο iOS
 */

// React imports
import React from 'react';

// Enterprise LEGO Design System imports
import { SPACING_SCALE } from '@layera/constants';
import { getCursorVar } from '@layera/cursors';
import { Flex } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { Text } from '@layera/typography';

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
    backgroundColor: 'var(--color-bg-surface-overlay)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--color-border-subtle)',
    // Layout handled by Flex wrapper
    padding: `0 ${SPACING_SCALE.MD}px`,
    position: 'relative'
  };

  const backButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    // fontSize handled by Text component
    color: 'var(--color-interactive-primary)', // Design system primary color instead of hardcoded #007AFF
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    padding: `${SPACING_SCALE.SM}px`,
    // Layout handled by Flex wrapper
    // gap handled by Flex component
  };

  // titleStyles moved inline

  const languageStyles: React.CSSProperties = {
    // fontSize handled by Text component
    color: 'var(--color-interactive-primary)', // Design system primary color instead of hardcoded #007AFF
    background: 'none',
    border: 'none',
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    padding: `${SPACING_SCALE.SM}px`
  };

  return (
    <Flex align="center" justify="space-between" style={headerStyles}>
      {/* Left: Back Button */}
      {showBack && (
        <button
          style={{
            ...backButtonStyles,
            display: 'flex',
            alignItems: 'center',
            gap: `${SPACING_SCALE.XS}px`
          }}
          onClick={onBack || (() => window.history.back())}
        >
          ← {t('back', 'Πίσω')}
        </button>
      )}

      {/* Center: Title */}
      <Text
        size="base"
        weight="bold"
        style={{
          color: '#000',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: `${SPACING_SCALE.XXXL * 3}px`,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </Text>

      {/* Right: Language Switcher */}
      <button style={languageStyles}>
        ΕΛ
      </button>
    </Flex>
  );
};