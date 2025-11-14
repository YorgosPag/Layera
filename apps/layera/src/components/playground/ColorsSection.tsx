import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ColorState, SectionProps, ColorCategory } from './shared/types';
import { ColorPicker } from './shared/ColorPicker';
import { useAuthContext } from '@layera/auth-bridge';
import {
  saveColorTheme,
  loadColorTheme,
  loadUserColorThemes,
  saveCurrentThemeToLocalStorage,
  loadCurrentThemeFromLocalStorage,
  type ColorTheme
} from '../../services/colorThemeService';

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
  // Auth context για user identification
  const { user } = useAuthContext();

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

  // Firebase state management
  const [savedThemes, setSavedThemes] = useState<ColorTheme[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [themeName, setThemeName] = useState('');

  const updateColorState = (updates: Partial<ColorState>) => {
    const newState = { ...colorState, ...updates };
    setColorState(newState);

    // Auto-save to localStorage
    saveCurrentThemeToLocalStorage(newState);
  };

  // Load saved themes για την τρέχουσα κατηγορία
  const loadSavedThemes = useCallback(async () => {
    setLoading(true);
    try {
      const themes = await loadUserColorThemes(colorState.colorCategory, user || undefined);
      setSavedThemes(themes);
    } catch (error) {
      console.error('Failed to load saved themes:', error);
    } finally {
      setLoading(false);
    }
  }, [colorState.colorCategory, user]);

  // Save current theme to Firebase
  const saveCurrentTheme = useCallback(async () => {
    if (!themeName.trim()) return;

    setSaving(true);
    try {
      await saveColorTheme(colorState, user || undefined, themeName);
      setThemeName('');
      await loadSavedThemes(); // Refresh the list
      console.log('🎨 Theme saved successfully!');
    } catch (error) {
      console.error('Failed to save theme:', error);
    } finally {
      setSaving(false);
    }
  }, [colorState, user, themeName, loadSavedThemes]);

  // Load a theme from Firebase
  const loadTheme = useCallback(async (themeId: string) => {
    setLoading(true);
    try {
      const loadedState = await loadColorTheme(themeId, user || undefined);
      if (loadedState) {
        setColorState(loadedState);
        saveCurrentThemeToLocalStorage(loadedState);
        console.log('🎨 Theme loaded successfully!');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load από localStorage on mount
  useEffect(() => {
    const savedState = loadCurrentThemeFromLocalStorage();
    if (savedState) {
      setColorState(savedState);
    }
    loadSavedThemes();
  }, [loadSavedThemes]);

  // Reload themes όταν αλλάζει κατηγορία
  useEffect(() => {
    loadSavedThemes();
  }, [colorState.colorCategory, loadSavedThemes]);

  // Apply colors to application based on selected category
  const applyColorsToApp = useCallback(async () => {
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

    // Auto-save to Firebase
    try {
      const autoSaveId = await saveColorTheme(colorState, user || undefined, `Auto-save ${colorState.colorCategory}`);
      console.log(`🎨 Colors applied & auto-saved to Firebase: ${autoSaveId}`);
    } catch (error) {
      console.warn('⚠️ Auto-save failed, but colors applied to DOM:', error);
    }

    // Also save to localStorage
    saveCurrentThemeToLocalStorage(colorState);

    console.log(`🎨 Colors applied to ${colorState.colorCategory}:`, {
      primary: colorState.primaryColor,
      secondary: colorState.secondaryColor,
      success: colorState.successColor,
      warning: colorState.warningColor,
      danger: colorState.dangerColor,
      info: colorState.infoColor
    });
  }, [colorState, user]);

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

      {/* Save Theme Section */}
      <Box className="layera-card layera-padding--lg layera-margin-bottom--xl">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          💾 Αποθήκευση Θέματος
        </h3>
        <Box className="layera-flex layera-flex--gap-md layera-flex--align-center layera-margin-bottom--md">
          <input
            type="text"
            placeholder="Όνομα θέματος..."
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            className="layera-input layera-flex-1"
            style={{
              padding: 'var(--layera-spacing-sm)',
              border: '1px solid var(--layera-color-border-default)',
              borderRadius: 'var(--layera-border-radius-md)'
            }}
          />
          <Button
            variant="primary"
            size="md"
            onClick={saveCurrentTheme}
            disabled={saving || !themeName.trim()}
          >
            {saving ? '💾 Αποθήκευση...' : '💾 Αποθήκευση'}
          </Button>
        </Box>
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          Αποθηκεύστε την παρούσα παλέτα χρωμάτων για μελλοντική χρήση
        </Text>
      </Box>

      {/* Saved Themes Section */}
      {savedThemes.length > 0 && (
        <Box className="layera-card layera-padding--lg layera-margin-bottom--xl">
          <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
            📚 Αποθηκευμένα Θέματα ({colorState.colorCategory})
          </h3>
          {loading ? (
            <Box className="layera-text-center layera-padding--lg">
              <Text className="layera-typography" data-size="sm" data-color="secondary">
                🔄 Φόρτωση θεμάτων...
              </Text>
            </Box>
          ) : (
            <Box
              className="layera-grid layera-grid--gap-md"
              style={{
                gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)'
              } as React.CSSProperties}
            >
              {savedThemes.map((theme) => (
                <Box
                  key={theme.id}
                  className="layera-card layera-padding--md layera-border--default"
                  style={{ background: 'var(--layera-color-bg-subtle)' }}
                >
                  <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--sm">
                    <h4 className="layera-typography layera-margin--none" data-size="base" data-weight="semibold">
                      {theme.name}
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadTheme(theme.id)}
                    >
                      📥 Φόρτωση
                    </Button>
                  </Box>

                  {/* Theme Color Preview */}
                  <Box className="layera-flex layera-flex--gap-xs layera-margin-bottom--sm">
                    {Object.entries(theme.colors).map(([key, color]) => (
                      <Box
                        key={key}
                        className="layera-border-radius--sm"
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: color,
                          border: '1px solid var(--layera-color-border-default)'
                        }}
                      />
                    ))}
                  </Box>

                  <Text className="layera-typography" data-size="xs" data-color="secondary">
                    {new Date(theme.createdAt).toLocaleDateString('el-GR')}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}

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