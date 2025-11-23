import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, RefreshIcon, CheckIcon } from '@layera/icons';
import { FactorySettingsService } from '../../services/factorySettingsService';
import { AVAILABLE_PALETTES, PaletteType } from '../../constants/factoryColorSettings';
import type { ButtonState } from '../../hooks/useButtonState.js';

/**
 * Factory Settings Panel Component
 *
 * Παρέχει επιλογές για:
 * - Reset στις εργοστασιακές ρυθμίσεις
 * - Επιλογή διαφορετικού palette (Enterprise, Microsoft, Google)
 * - Αποθήκευση/φόρτωση ρυθμίσεων χρήστη
 */

interface FactorySettingsPanelProps {
  buttonState: ButtonState;
  onSettingsChange: (settings: Record<string, string>) => void;
  onPreview?: (key: string, value: string) => void;
  currentUserId?: string;
  className?: string;
}

export const FactorySettingsPanel: React.FC<FactorySettingsPanelProps> = ({
  buttonState,
  onSettingsChange,
  onPreview,
  currentUserId,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<PaletteType>('enterprise');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  /**
   * Επιστρέφει στις εργοστασιακές ρυθμίσεις
   */
  const handleResetToFactory = useCallback(async () => {
    setIsResetting(true);
    setResetSuccess(false);

    try {
      // Φορτώνει τις εργοστασιακές ρυθμίσεις
      const factorySettings = await FactorySettingsService.loadFactorySettingsWithFallback(selectedPalette);

      // Εφαρμόζει τις νέες ρυθμίσεις
      onSettingsChange(factorySettings);

      // Αποθηκεύει στο local storage
      FactorySettingsService.saveToLocalStorage(factorySettings);

      // Επίσης αποθηκεύει στο κλειδί που διαβάζει το useColorPersistence
      const colorState = {
        ...factorySettings,
        colorCategory: 'buttons' as const, // Default category for factory settings
        outlineColor: factorySettings.outlineColor || factorySettings.primaryColor,
      };
      localStorage.setItem('layera-current-theme', JSON.stringify(colorState));

      // Ενεργοποιεί το useColorPersistence να εφαρμόσει τα χρώματα
      // Δημιουργεί custom event για local storage changes

      window.dispatchEvent(new CustomEvent('layera-theme-changed', {
        detail: {
          key: 'layera-current-theme',
          newValue: JSON.stringify(colorState),
        }
      }));

      // Αν υπάρχει userId, αποθηκεύει και στη βάση
      if (currentUserId) {
        await FactorySettingsService.saveUserSettings(currentUserId, factorySettings, selectedPalette);
      }

      // Success feedback
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2000);


    } catch (error) {

    } finally {
      setIsResetting(false);
    }
  }, [selectedPalette, onSettingsChange, currentUserId]);

  /**
   * Αλλάζει το επιλεγμένο palette και κάνει preview
   */
  const handlePaletteChange = useCallback(async (paletteType: PaletteType) => {
    setSelectedPalette(paletteType);

    if (onPreview) {
      try {
        setIsLoading(true);
        const factorySettings = await FactorySettingsService.loadFactorySettingsWithFallback(paletteType);

        // Preview όλων των χρωμάτων
        Object.entries(factorySettings).forEach(([key, value]) => {
          onPreview(key, value);
        });
      } catch (error) {

      } finally {
        setIsLoading(false);
      }
    }
  }, [onPreview]);

  /**
   * Φορτώνει τις αποθηκευμένες ρυθμίσεις χρήστη
   */
  const handleLoadUserSettings = useCallback(async () => {
    if (!currentUserId) {

      return;
    }

    try {
      setIsLoading(true);

      // Πρώτα προσπαθεί από Firebase
      const userSettings = await FactorySettingsService.getUserSettings(currentUserId);

      if (userSettings) {
        onSettingsChange(userSettings.settings);
        if (userSettings.paletteType) {
          setSelectedPalette(userSettings.paletteType);
        }

        return;
      }

      // Fallback σε local storage
      const localSettings = FactorySettingsService.loadFromLocalStorage();
      if (localSettings) {
        onSettingsChange(localSettings);

      } else {

      }
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }, [currentUserId, onSettingsChange]);

  const paletteOptions = [
    {
      value: 'enterprise' as PaletteType,
      label: 'Enterprise',
      description: 'Συνδυάζει Microsoft, Google, Bootstrap'
    },
    {
      value: 'microsoft' as PaletteType,
      label: 'Microsoft',
      description: 'Fluent Design System'
    },
    {
      value: 'google' as PaletteType,
      label: 'Google',
      description: 'Material Design'
    }
  ];

  return (
    <Box className={`layera-card layera-padding--lg layera-bg-surface--neutral layera-border-color--neutral layera-border-width--2 ${className}`} data-variant="primary">
      {/* Header Section */}
      <Box className="layera-margin-bottom--md">
        <Box>
          <h4 className="layera-typography layera-margin-bottom--xs layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
            <SettingsIcon size="sm" /> Εργοστασιακές Ρυθμίσεις
          </h4>
          <Text className="layera-typography layera-text--align-center" data-size="sm" data-color="secondary">
            Επιστροφή στα χρώματα των μεγάλων παγκόσμιων εταιρειών
          </Text>
        </Box>

        {/* Current Palette Info - Moved to right side */}
        <Box
          className="layera-padding--sm layera-bg-surface--primary layera-border--default layera-border-radius--md layera-min-width--48"
        >
          <Text className="layera-typography layera-margin-bottom--xs layera-text--align-center" data-size="xs" data-weight="medium" data-color="primary">
            Τρέχουσα Παλέτα: {paletteOptions.find(p => p.value === selectedPalette)?.label}
          </Text>
          <Text className="layera-typography layera-margin-bottom--xs layera-text--align-center" data-size="xs" data-color="secondary">
            {paletteOptions.find(p => p.value === selectedPalette)?.description}
          </Text>

        </Box>
      </Box>

      {/* Controls Section - Horizontal */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-lg layera-flex--justify-center">
        {/* Palette Selection */}
        <Box>
          {/* Label πάνω από τα κουμπιά */}
          <Text className="layera-typography layera-margin-bottom--xs layera-text--align-center" data-size="sm" data-weight="medium" data-color="secondary">
            Επιλογή Παλέτας Χρωμάτων
          </Text>

          {/* Palette Buttons + Reset Button */}
          <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center layera-margin-bottom--sm layera-align-items--center">
            {paletteOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedPalette === option.value ? 'primary' : 'outline'}
                size={buttonState.size}
                onClick={() => handlePaletteChange(option.value)}
                disabled={isLoading}
                title={option.description}
                className={`layera-margin-right--sm layera-button layera-button--${buttonState.size} layera-button--${selectedPalette === option.value ? 'primary' : 'outline'}`}
              >
                {option.label}
              </Button>
            ))}

            {/* Reset to Factory Button - στην ίδια σειρά */}
            <Button
              variant={resetSuccess ? 'success' : 'warning'}
              size={buttonState.size}
              onClick={handleResetToFactory}
              disabled={isResetting || isLoading}
              className={`layera-button layera-button--${buttonState.size} layera-button--${resetSuccess ? 'success' : 'warning'}`}
            >
              {isResetting ? (
                'Επιστροφή...'
              ) : resetSuccess ? (
                <>
                  <CheckIcon size="xs" /> Επιτυχία!
                </>
              ) : (
                <>
                  <RefreshIcon size="xs" /> Reset to Factory
                </>
              )}
            </Button>
          </Box>

          {/* Color Preview εικονίδια κάτω από τα κουμπιά */}
          <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-xs layera-flex--justify-center">
            {Object.values(AVAILABLE_PALETTES[selectedPalette]).map((color, index) => (
              <Box
                key={index}
                className="layera-border--light layera-border-radius--xs layera-color-preview--lg layera-dynamic-bg"
                data-dynamic-bg={color.hex}
                data-title={`${color.name}: ${color.hex}`}
              />
            ))}
          </Box>
        </Box>

        {/* Load User Settings Button - μόνο αν υπάρχει userId */}
        {currentUserId && (
          <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center">
            <Button
              variant="outline"
              size={buttonState.size}
              onClick={handleLoadUserSettings}
              disabled={isLoading}
              className={`layera-button layera-button--${buttonState.size} layera-button--outline`}
            >
              Φόρτωση Ρυθμίσεων
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};