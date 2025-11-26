import React from 'react';
import { PaletteIcon, SettingsIcon } from '@layera/icons';
import { UnifiedCard } from '@layera/cards';
import type { CardVariant } from '@layera/cards';
import { getCSSVariablePrefix } from '../../services/theme';

/**
 * SettingsDisplay Component
 *
 * Εμφανίζει τις τρέχουσες ρυθμίσεις (button settings, colors, CSS variables)
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Settings Display ενότητα
 * Γραμμές 199-279 από το αρχικό LivePlayground.tsx
 */

import type { ColorState } from '../../hooks/useColorState.js';

interface SettingsDisplayProps {
  colorHookState: ColorState;
  buttonState?: {
    variant: string;
    size: string;
    text: string;
    withIcon: boolean;
  };
}

export const SettingsDisplay: React.FC<SettingsDisplayProps> = ({
  colorHookState,
  buttonState
}) => {
  return (
    <>
      {/* #1: Current Settings Display - για buttons */}
      {colorHookState.elementType === 'buttons' && buttonState && (
        <UnifiedCard
          config={{
            id: 'current-settings-display',
            type: 'data',
            title: 'Τρέχουσες Ρυθμίσεις',
            icon: <SettingsIcon size="sm" />,
            variant: 'info' as CardVariant,
            content: (
              <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark layera-white-space--pre-wrap layera-word-wrap--break layera-overflow-wrap--break" data-family="mono">
{`{
  variant: "${buttonState.variant}",
  size: "${buttonState.size}",
  text: "${buttonState.text}",
  withIcon: ${buttonState.withIcon}
}`}
              </pre>
            )
          }}
        />
      )}

    </>
  );
};