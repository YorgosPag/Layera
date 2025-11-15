import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

/**
 * ColorControlsGrid Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Color Controls Grid ενότητα
 * Γραμμές 184-295 από το αρχικό LivePlayground.tsx
 */

/**
 * Εξάγει την hex τιμή από CSS variable string
 * π.χ. "var(--layera-color-primary, #6366f1)" -> "#6366f1"
 */
const extractHexFromCSSVar = (cssValue: string): string => {
  // Αν είναι ήδη hex τιμή, επιστρέφει όπως είναι
  if (cssValue.startsWith('#')) {
    return cssValue;
  }

  // Αν είναι CSS variable, εξάγει το fallback hex value
  const match = cssValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
  return match ? match[1] : cssValue;
};

interface ColorControlsGridProps {
  currentColors: Record<string, string>;
  currentSetters: Record<string, (value: string) => void>;
  startPreview: (key: string, value: string) => void;
}

export const ColorControlsGrid: React.FC<ColorControlsGridProps> = ({
  currentColors,
  currentSetters,
  startPreview
}) => {
  return (
    <Box
      className="layera-grid layera-margin-bottom--xl"
      style={{
        gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)',
        gap: '2rem'
      } as React.CSSProperties}
    >
      {/* Primary Color Control */}
      <Box className="layera-card layera-padding--lg">
        <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
          Primary Color
        </h4>
        <input
          type="color"
          value={extractHexFromCSSVar(currentColors.primary)}
          onChange={(e) => currentSetters.setPrimary(e.target.value)}
          className="layera-input layera-width--full layera-margin-bottom--sm"
        />
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          {currentColors.primary.toUpperCase()}
        </Text>
      </Box>

      {/* Secondary Color Control */}
      <Box className="layera-card layera-padding--lg">
        <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
          Secondary Color
        </h4>
        <input
          type="color"
          value={extractHexFromCSSVar(currentColors.secondary)}
          onInput={(e) => {
            // Real-time preview while dragging
            const newColor = (e.target as HTMLInputElement).value;
            startPreview('secondaryColor', newColor);
          }}
          onChange={(e) => {
            // Final commit when color selection is done
            const newColor = e.target.value;
            currentSetters.setSecondary(newColor);
          }}
          className="layera-input layera-width--full layera-margin-bottom--sm"
        />
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          {currentColors.secondary.toUpperCase()}
        </Text>
      </Box>

      {/* Success Color Control */}
      <Box className="layera-card layera-padding--lg">
        <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
          Success Color
        </h4>
        <input
          type="color"
          value={extractHexFromCSSVar(currentColors.success)}
          onChange={(e) => currentSetters.setSuccess(e.target.value)}
          className="layera-input layera-width--full layera-margin-bottom--sm"
        />
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          {currentColors.success.toUpperCase()}
        </Text>
      </Box>

      {/* Warning Color Control */}
      <Box className="layera-card layera-padding--lg">
        <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
          Warning Color
        </h4>
        <input
          type="color"
          value={extractHexFromCSSVar(currentColors.warning)}
          onChange={(e) => currentSetters.setWarning(e.target.value)}
          className="layera-input layera-width--full layera-margin-bottom--sm"
        />
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          {currentColors.warning.toUpperCase()}
        </Text>
      </Box>

      {/* Danger Color Control */}
      <Box className="layera-card layera-padding--lg">
        <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
          Danger Color
        </h4>
        <input
          type="color"
          value={extractHexFromCSSVar(currentColors.danger)}
          onChange={(e) => currentSetters.setDanger(e.target.value)}
          className="layera-input layera-width--full layera-margin-bottom--sm"
        />
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          {currentColors.danger.toUpperCase()}
        </Text>
      </Box>

      {/* Info Color Control */}
      <Box className="layera-card layera-padding--lg">
        <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
          Info Color
        </h4>
        <input
          type="color"
          value={extractHexFromCSSVar(currentColors.info)}
          onChange={(e) => currentSetters.setInfo(e.target.value)}
          className="layera-input layera-width--full layera-margin-bottom--sm"
        />
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          {currentColors.info.toUpperCase()}
        </Text>
      </Box>
    </Box>
  );
};