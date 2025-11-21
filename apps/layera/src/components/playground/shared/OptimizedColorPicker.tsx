import React, { useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { SettingsIcon } from '@layera/icons';
import { useControlThrottle } from '../../../hooks/useControlThrottle';

// Default fallback color που θα υπολογιστεί dynamically από CSS variables
const getDefaultFallbackColor = (): string => {
  if (typeof window !== 'undefined') {
    const computedStyle = getComputedStyle(document.documentElement);

    // Δοκιμάζει διάφορα CSS variables για να βρει έγκυρη hex τιμή
    const variables = [
      '--layera-colors-surface-light',
      '--layera-color-surface-primary',
      '--layera-color-neutral-white'
    ];

    for (const variable of variables) {
      const value = computedStyle.getPropertyValue(variable).trim();
      if (value && value.startsWith('#')) {
        return value;
      }
    }
  }

  // Αν δεν μπορεί να βρει τίποτα, επιστρέφει CSS variable χωρίς fallback
  return 'var(--layera-colors-surface-light)';
};

/**
 * OptimizedColorPicker Component
 *
 * Optimized color picker με throttling για smooth performance
 * - Throttles onChange events για λιγότερα state updates
 * - Local state για immediate visual feedback
 * - Batch updates για καλύτερη performance
 * - Compatible με όλα τα browsers
 */

interface OptimizedColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPreview?: (value: string) => void; // Real-time preview για dragging
  className?: string;
  throttleMs?: number;
  variant?: string; // Variant για dynamic card coloring (π.χ. 'primary', 'secondary')
  showVariantInfo?: boolean; // Εμφανίζει CSS variable & selector info
}

export const OptimizedColorPicker: React.FC<OptimizedColorPickerProps> = ({
  label,
  value,
  onChange,
  onPreview,
  className = '',
  throttleMs = 16,
  variant,
  showVariantInfo = false
}) => {
  const { value: localValue, isChanging, handleChange, handleInput } = useControlThrottle({
    initialValue: value,
    onChange,
    onPreview,
    throttleMs
  });

  // Real-time input handler για immediate preview κατά το dragging
  const handleInputEvent = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    handleInput(newValue);
  }, [handleInput]);

  // Helper function για εξαγωγή hex χρώματος
  const extractHexFromValue = (colorValue: string): string => {
    if (!colorValue) return getDefaultFallbackColor();
    if (colorValue.startsWith('#')) return colorValue;

    // 🎯 Αν είναι CSS variable, διάβασε το computed style από το DOM
    if (colorValue.includes('var(')) {
      if (typeof window !== 'undefined') {
        const computedStyle = getComputedStyle(document.documentElement);
        const varName = colorValue.match(/var\((--[^,)]+)/)?.[1];
        if (varName) {
          const computedValue = computedStyle.getPropertyValue(varName).trim();
          if (computedValue && computedValue.startsWith('#')) {
            return computedValue;
          }
        }
      }
    }

    // Αν είναι CSS variable με fallback, εξάγει το fallback hex value
    const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
    return match ? match[1] : getDefaultFallbackColor();
  };

  const displayValue = extractHexFromValue(localValue);
  const isVariable = localValue.includes('var(');
  // 🎯 Αν εξάγαμε επιτυχώς HEX από CSS variable, εμφάνισε color picker
  // Έγκυρο HEX: ξεκινάει με # και έχει 7 χαρακτήρες (#RRGGBB)
  const hasValidHex = displayValue.startsWith('#') && displayValue.length === 7;
  const inputType = (isVariable && !hasValidHex) ? 'text' : 'color';

  return (
    <Box
      className={`layera-card layera-padding--lg ${className}`}
      data-variant={variant}
    >
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        {label}
      </h4>
      <Box
        as="input"
        type={inputType}
        value={inputType === 'text' ? localValue : displayValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
        onInput={handleInputEvent}
        className={`layera-input layera-width--full layera-margin-bottom--sm layera-cursor--pointer layera-transition--fast ${isChanging ? 'layera-opacity--80' : 'layera-opacity--100'}`}
        placeholder={inputType === 'text' ? 'CSS Variable or hex color...' : ''}
      />

      {/* Variant Info - Εμφανίζει CSS variable και selector */}
      {showVariantInfo && variant && (
        <Box className="layera-margin-top--sm layera-padding-top--sm layera-border-top--default">
          <Text className="layera-typography layera-margin-bottom--xs layera-flex layera-flex--align-center layera-gap--xs" data-size="xs" data-weight="bold" data-color="primary">
            <SettingsIcon size="sm" /> CSS Info:
          </Text>
          <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
            Variable: <span className="layera-typography" data-weight="mono" data-color="info">--layera-live-card-{variant}</span>
          </Text>
          <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
            Selector: <span className="layera-typography" data-weight="mono" data-color="info">.layera-card[data-variant="{variant}"]</span>
          </Text>
          <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
            HTML Attribute: <span className="layera-typography" data-weight="mono" data-color="info">data-layera-card-{variant}="active"</span>
          </Text>
          <Text className="layera-typography" data-size="xs" data-color="secondary">
            Τρέχον χρώμα: <span className="layera-typography" data-weight="bold" data-color="success">{displayValue.toUpperCase()}</span>
          </Text>
        </Box>
      )}
    </Box>
  );
};