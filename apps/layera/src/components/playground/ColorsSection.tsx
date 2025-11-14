import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ColorState, SectionProps, ColorCategory } from './shared/types';
import { ColorPicker } from './shared/ColorPicker';

/**
 * ColorsSection - Enterprise Color Management Section
 *
 * ARXES Compliant Color Configuration Interface:
 * - Διαχωρισμένες κατηγορίες αντικειμένων (buttons, backgrounds, text, borders)
 * - Live preview με πραγματικά components
 * - Εφαρμογή χρωμάτων μέσω CSS custom properties
 * - Πλήρης συμμόρφωση με enterprise standards
 */
export const ColorsSection: React.FC<SectionProps> = ({ className = '' }) => {
  // Color State Management
  const [colorState, setColorState] = useState<ColorState>({
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    successColor: '#28a745',
    warningColor: '#ffc107',
    dangerColor: '#dc3545',
    infoColor: '#17a2b8',
    colorCategory: 'buttons'
  });

  const updateColorState = (updates: Partial<ColorState>) => {
    setColorState(prev => ({ ...prev, ...updates }));
  };

  // Apply colors to application based on selected category
  const applyColorsToApp = useCallback(() => {
    const root = document.documentElement;

    // Map categories to CSS variable prefixes
    const colorMap = {
      buttons: {
        primary: `--layera-color-button-primary`,
        secondary: `--layera-color-button-secondary`,
        success: `--layera-color-button-success`,
        warning: `--layera-color-button-warning`,
        danger: `--layera-color-button-danger`,
        info: `--layera-color-button-info`
      },
      backgrounds: {
        primary: `--layera-color-bg-primary`,
        secondary: `--layera-color-bg-secondary`,
        success: `--layera-color-bg-success`,
        warning: `--layera-color-bg-warning`,
        danger: `--layera-color-bg-danger`,
        info: `--layera-color-bg-info`
      },
      text: {
        primary: `--layera-color-text-primary`,
        secondary: `--layera-color-text-secondary`,
        success: `--layera-color-text-success`,
        warning: `--layera-color-text-warning`,
        danger: `--layera-color-text-danger`,
        info: `--layera-color-text-info`
      },
      borders: {
        primary: `--layera-color-border-primary`,
        secondary: `--layera-color-border-secondary`,
        success: `--layera-color-border-success`,
        warning: `--layera-color-border-warning`,
        danger: `--layera-color-border-danger`,
        info: `--layera-color-border-info`
      }
    };

    const categoryColors = colorMap[colorState.colorCategory];

    // Apply colors to CSS variables
    root.style.setProperty(categoryColors.primary, colorState.primaryColor);
    root.style.setProperty(categoryColors.secondary, colorState.secondaryColor);
    root.style.setProperty(categoryColors.success, colorState.successColor);
    root.style.setProperty(categoryColors.warning, colorState.warningColor);
    root.style.setProperty(categoryColors.danger, colorState.dangerColor);
    root.style.setProperty(categoryColors.info, colorState.infoColor);

    console.log(`🎨 Colors applied to ${colorState.colorCategory}:`, {
      primary: colorState.primaryColor,
      secondary: colorState.secondaryColor,
      success: colorState.successColor,
      warning: colorState.warningColor,
      danger: colorState.dangerColor,
      info: colorState.infoColor
    });
  }, [colorState]);

  return (
    <Box className={className}>
      {/* Color Category Selection */}
      <Box className="layera-card layera-padding--lg layera-margin-bottom--xl">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          🎯 Επιλογή Κατηγορίας Αντικειμένων
        </h3>
        <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
          <Button
            variant={colorState.colorCategory === 'buttons' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => updateColorState({ colorCategory: 'buttons' })}
          >
            🔘 Buttons
          </Button>
          <Button
            variant={colorState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => updateColorState({ colorCategory: 'backgrounds' })}
          >
            🎨 Backgrounds
          </Button>
          <Button
            variant={colorState.colorCategory === 'text' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => updateColorState({ colorCategory: 'text' })}
          >
            📝 Text
          </Button>
          <Button
            variant={colorState.colorCategory === 'borders' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => updateColorState({ colorCategory: 'borders' })}
          >
            🔲 Borders
          </Button>
        </Box>
        <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
          Επιλέξτε ποια αντικείμενα θα επηρεάσουν οι αλλαγές χρωμάτων
        </Text>
      </Box>

      {/* Live Color Preview Area */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          🎨 Live Preview - {colorState.colorCategory.toUpperCase()}
        </h3>
        <Text className="layera-typography layera-margin-bottom--lg" data-size="sm" data-color="secondary">
          {colorState.colorCategory === 'buttons' && '🔘 Τα χρώματα θα επηρεάσουν όλα τα κουμπιά στην εφαρμογή'}
          {colorState.colorCategory === 'backgrounds' && '🎨 Τα χρώματα θα επηρεάσουν τα φόντα στην εφαρμογή'}
          {colorState.colorCategory === 'text' && '📝 Τα χρώματα θα επηρεάσουν τα κείμενα στην εφαρμογή'}
          {colorState.colorCategory === 'borders' && '🔲 Τα χρώματα θα επηρεάσουν τα περιγράμματα στην εφαρμογή'}
        </Text>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
          <button style={{ backgroundColor: '#FF0000', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Primary Color - ΚΟΚΚΙΝΟ
          </button>
          <button style={{ backgroundColor: '#0000FF', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Secondary Color - ΜΠΛΕ
          </button>
          <button style={{ backgroundColor: '#00FF00', color: 'black', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Success Color - ΠΡΑΣΙΝΟ
          </button>
          <Button variant="warning" size="md">
            Warning Color
          </Button>
          <Button variant="danger" size="md">
            Danger Color
          </Button>
        </Box>
      </Box>

      {/* Color Controls Grid */}
      <Box
        className="layera-grid layera-grid--gap-xl layera-margin-bottom--xl"
        style={{
          gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)'
        } as React.CSSProperties}
      >
        <ColorPicker
          label="Primary Color"
          value={colorState.primaryColor}
          onChange={(value) => updateColorState({ primaryColor: value })}
        />

        <ColorPicker
          label="Secondary Color"
          value={colorState.secondaryColor}
          onChange={(value) => updateColorState({ secondaryColor: value })}
        />

        <ColorPicker
          label="Success Color"
          value={colorState.successColor}
          onChange={(value) => updateColorState({ successColor: value })}
        />

        <ColorPicker
          label="Warning Color"
          value={colorState.warningColor}
          onChange={(value) => updateColorState({ warningColor: value })}
        />

        <ColorPicker
          label="Danger Color"
          value={colorState.dangerColor}
          onChange={(value) => updateColorState({ dangerColor: value })}
        />

        <ColorPicker
          label="Info Color"
          value={colorState.infoColor}
          onChange={(value) => updateColorState({ infoColor: value })}
        />
      </Box>

      {/* Apply Colors Button */}
      <Box className="layera-text-center layera-margin-bottom--xl">
        <Button
          variant="primary"
          size="lg"
          onClick={applyColorsToApp}
          className="layera-button layera-button--primary"
        >
          🚀 Εφαρμογή Χρωμάτων για {colorState.colorCategory.toUpperCase()}
        </Button>
        <Text className="layera-typography layera-margin-top--sm" data-size="xs" data-color="secondary">
          Θα επηρεαστούν όλα τα στοιχεία τύπου "{colorState.colorCategory}" στην εφαρμογή
        </Text>
      </Box>

      {/* Current Color Values Display */}
      <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
        <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
          🎨 Παλέτα Χρωμάτων για {colorState.colorCategory.toUpperCase()}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
{`{
  primary: "${colorState.primaryColor}",
  secondary: "${colorState.secondaryColor}",
  success: "${colorState.successColor}",
  warning: "${colorState.warningColor}",
  danger: "${colorState.dangerColor}",
  info: "${colorState.infoColor}"
}`}
        </pre>
      </Box>
    </Box>
  );
};