import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, RefreshIcon, CheckIcon } from '@layera/icons';
import { FactorySettingsService } from '../../services/factorySettingsService';
import { AVAILABLE_PALETTES, PaletteType } from '../../constants/factoryColorSettings';

/**
 * Factory Settings Panel Component
 *
 * Παρέχει επιλογές για:
 * - Reset στις εργοστασιακές ρυθμίσεις
 * - Επιλογή διαφορετικού palette (Enterprise, Microsoft, Google)
 * - Αποθήκευση/φόρτωση ρυθμίσεων χρήστη
 */

interface FactorySettingsPanelProps {
  onSettingsChange: (settings: Record<string, string>) => void;
  onPreview?: (key: string, value: string) => void;
  currentUserId?: string;
  className?: string;
}

export const FactorySettingsPanel: React.FC<FactorySettingsPanelProps> = ({
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
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'layera-current-theme',
        newValue: JSON.stringify(colorState),
      }));

      // Αν υπάρχει userId, αποθηκεύει και στη βάση
      if (currentUserId) {
        await FactorySettingsService.saveUserSettings(currentUserId, factorySettings, selectedPalette);
      }

      // Success feedback
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2000);

      console.log('✅ Επιτυχής επιστροφή στις εργοστασιακές ρυθμίσεις');
    } catch (error) {
      console.error('❌ Σφάλμα κατά την επιστροφή στις εργοστασιακές ρυθμίσεις:', error);
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
        console.error('❌ Σφάλμα κατά το preview palette:', error);
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
      console.warn('⚠️ Δεν υπάρχει userId για φόρτωση ρυθμίσεων');
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
        console.log('✅ Ρυθμίσεις χρήστη φορτώθηκαν από Firebase');
        return;
      }

      // Fallback σε local storage
      const localSettings = FactorySettingsService.loadFromLocalStorage();
      if (localSettings) {
        onSettingsChange(localSettings);
        console.log('✅ Ρυθμίσεις χρήστη φορτώθηκαν από local storage');
      } else {
        console.log('ℹ️ Δεν βρέθηκαν αποθηκευμένες ρυθμίσεις χρήστη');
      }
    } catch (error) {
      console.error('❌ Σφάλμα κατά τη φόρτωση ρυθμίσεων χρήστη:', error);
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
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        <SettingsIcon size="sm" /> Εργοστασιακές Ρυθμίσεις
      </h4>

      <Text className="layera-typography layera-margin-bottom--md" data-size="sm" data-color="secondary">
        Επιστροφή στα χρώματα των μεγάλων παγκόσμιων εταιρειών
      </Text>

      {/* Palette Selection */}
      <Box className="layera-margin-bottom--md">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-weight="medium" data-color="secondary">
          Επιλογή Παλέτας Χρωμάτων
        </Text>
        <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
          {paletteOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedPalette === option.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handlePaletteChange(option.value)}
              disabled={isLoading}
              title={option.description}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Reset Button */}
      <Box className="layera-flex layera-flex--gap-sm layera-margin-bottom--md">
        <Button
          variant={resetSuccess ? 'success' : 'warning'}
          size="sm"
          onClick={handleResetToFactory}
          disabled={isResetting || isLoading}
          style={{
            minWidth: '140px'
          }}
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

        {/* Load User Settings Button */}
        {currentUserId && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadUserSettings}
            disabled={isLoading}
          >
            Φόρτωση Ρυθμίσεων
          </Button>
        )}
      </Box>

      {/* Current Palette Info */}
      <Box
        className="layera-padding--sm"
        style={{
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          border: '1px solid var(--layera-color-border-primary)'
        }}
      >
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="primary">
          Τρέχουσα Παλέτα: {paletteOptions.find(p => p.value === selectedPalette)?.label}
        </Text>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          {paletteOptions.find(p => p.value === selectedPalette)?.description}
        </Text>

        {/* Color Preview */}
        <Box className="layera-flex layera-flex--gap-xs layera-margin-top--xs">
          {Object.values(AVAILABLE_PALETTES[selectedPalette]).map((color, index) => (
            <Box
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: color.hex,
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
              title={`${color.name}: ${color.hex}`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};