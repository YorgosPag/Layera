import React from 'react';
import { Box } from '@layera/layout';
import { Button } from '@layera/buttons';

/**
 * ARXES COMPLIANT Preset Themes Component
 *
 * Προκαθορισμένα θέματα από το HTML mockup:
 * - Ocean Blue (#2196F3, #00BCD4)
 * - Nature Green (#4CAF50, #8BC34A)
 * - Sunset Orange (#FF9800, #FF5722)
 * - Royal Purple (#9013FE, #7C4DFF)
 * - Dark Mode (#212121)
 * - Pastel (#E1BEE7)
 *
 * Χρησιμοποιεί υπάρχοντα tokens και functions από @layera/tokens
 */

interface PresetThemesProps {
  onThemeApply: (themeName: string) => void;
}

const PRESET_THEMES = [
  { name: 'ocean', label: '🌊 Ocean Blue', variant: 'info' as const },
  { name: 'nature', label: '🌿 Nature Green', variant: 'success' as const },
  { name: 'sunset', label: '🔥 Sunset Orange', variant: 'warning' as const },
  { name: 'royal', label: '💜 Royal Purple', variant: 'secondary' as const },
  { name: 'dark', label: '🌑 Dark Mode', variant: 'outline' as const },
  { name: 'pastel', label: '🎨 Pastel', variant: 'primary' as const }
] as const;

export const PresetThemes: React.FC<PresetThemesProps> = ({
  onThemeApply
}) => {
  const [activeTheme, setActiveTheme] = React.useState<string>('ocean');

  const handleThemeClick = React.useCallback((themeName: string) => {
    setActiveTheme(themeName);
    onThemeApply(themeName);
  }, [onThemeApply]);

  return (
    <Box className="layera-flex layera-flex--direction-column layera-flex--gap-sm">
      {PRESET_THEMES.map(({ name, label, variant }) => (
        <Button
          key={name}
          variant={activeTheme === name ? 'primary' : variant}
          size="sm"
          onClick={() => handleThemeClick(name)}
          className="layera-button layera-width--full layera-text--align-left"
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};