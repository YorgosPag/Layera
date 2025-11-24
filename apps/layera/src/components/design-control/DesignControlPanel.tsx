import React from 'react';
import { Box } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { UnifiedCard } from '@layera/cards';
import { PresetThemes } from './PresetThemes';
import { ColorControls } from './ColorControls';
import { LayoutControls } from './LayoutControls';
import { ExportPanel } from './ExportPanel';
import {
  LAYERA_DYNAMIC_TOKENS,
  applyTheme,
  updateAdvancedColor,
  updateAdvancedLayout
} from '@layera/tokens';

/**
 * ARXES COMPLIANT Design Control Panel Component
 *
 * Enterprise-grade αναπλήρωση του FullAppPreview_Mockup.html design control system:
 * - 6-Color System με live preview
 * - Preset theme selection (ocean, nature, sunset, royal, dark, pastel)
 * - Advanced layout controls
 * - CSS Export functionality
 * - Reset to defaults
 * - Integration με Dynamic Token System v2.0
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - React 19.1.1 compatibility
 * - Zero inline styles
 * - μόνο @layera/* imports
 * - tokens-based architecture
 */

export interface DesignControlPanelProps {
  className?: string;
  onThemeChange?: (themeName: string) => void;
  onColorChange?: (colorType: string, newColor: string) => void;
  onLayoutChange?: (property: string, value: string | number) => void;
}

export const DesignControlPanel: React.FC<DesignControlPanelProps> = ({
  className = '',
  onThemeChange,
  onColorChange,
  onLayoutChange
}) => {

  const handleThemeApply = React.useCallback((themeName: string) => {
    console.log(`🚀 Applying theme: ${themeName}`);
    applyTheme(themeName);
    onThemeChange?.(themeName);
  }, [onThemeChange]);

  const handleColorUpdate = React.useCallback((colorType: string, newColor: string) => {
    console.log(`🎨 Updating ${colorType} to ${newColor}`);
    updateAdvancedColor(colorType, newColor);
    onColorChange?.(colorType, newColor);
  }, [onColorChange]);

  const handleLayoutUpdate = React.useCallback((property: string, value: string | number) => {
    console.log(`📐 Updating layout ${property} to ${value}`);
    updateAdvancedLayout(property, value);
    onLayoutChange?.(property, value);
  }, [onLayoutChange]);

  return (
    <Box className={`layera-design-control-panel ${className}`}>
      <Heading
        className="layera-typography"
        data-size="xl"
        data-weight="bold"
        data-color="primary"
      >
        🎨 Design Control Panel
      </Heading>

      <Text
        className="layera-typography layera-margin-bottom--lg"
        data-size="sm"
        data-color="secondary"
      >
        Έλεγχος θεμάτων, χρωμάτων και layout με το Dynamic Token System v2.0
      </Text>

      <Box className="layera-grid--auto-fit-280 layera-margin-bottom--xl">
        {/* Preset Themes Panel */}
        <UnifiedCard
          config={{
            id: 'preset-themes',
            type: 'control',
            title: '🎨 Preset Themes',
            description: 'Προκαθορισμένα χρωματικά σχήματα',
            variant: 'primary',
            className: 'layera-height--auto',
            content: (
              <PresetThemes onThemeApply={handleThemeApply} />
            )
          }}
        />

        {/* 6-Color System Controls */}
        <UnifiedCard
          config={{
            id: 'color-controls',
            type: 'control',
            title: '🌈 6-Color System',
            description: 'Κύρια χρώματα εφαρμογής',
            variant: 'secondary',
            className: 'layera-height--auto',
            content: (
              <ColorControls onColorUpdate={handleColorUpdate} />
            )
          }}
        />

        {/* Layout Controls */}
        <UnifiedCard
          config={{
            id: 'layout-controls',
            type: 'control',
            title: '📐 Layout Controls',
            description: 'Spacing, radius, dimensions',
            variant: 'info',
            className: 'layera-height--auto',
            content: (
              <LayoutControls onLayoutUpdate={handleLayoutUpdate} />
            )
          }}
        />

        {/* Export & Reset Panel */}
        <UnifiedCard
          config={{
            id: 'export-panel',
            type: 'action',
            title: '💾 Export & Reset',
            description: 'CSS export και επαναφορά',
            variant: 'success',
            className: 'layera-height--auto',
            content: (
              <ExportPanel />
            )
          }}
        />
      </Box>
    </Box>
  );
};
