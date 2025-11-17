import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon } from '@layera/icons';
import { ButtonState, SectionProps, ButtonVariant, ButtonSize } from './shared/types';

// Enterprise CSS για ARXES compliance
const styles = `
.layera-grid-autofit {
  grid-template-columns: var(--layera-global-gridTemplateColumns-autoFit) !important;
}
`;

// Inject styles
if (typeof document !== 'undefined' && !document.querySelector('#layera-buttons-section-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'layera-buttons-section-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

/**
 * ButtonsSection - Live Buttons Playground Section
 *
 * ARXES Compliant Button Testing Interface:
 * - Άμεση προεπισκόπηση button αλλαγών
 * - Live ρυθμίσεις που επηρεάζουν τα πραγματικά buttons
 * - Πλήρης συμμόρφωση με enterprise standards
 */
export const ButtonsSection: React.FC<SectionProps> = ({ className = '' }) => {
  // Button Settings
  const [buttonState, setButtonState] = useState<ButtonState>({
    variant: 'secondary',
    size: 'md',
    text: 'Live Button',
    withIcon: true
  });

  const updateButtonState = (updates: Partial<ButtonState>) => {
    setButtonState(prev => ({ ...prev, ...updates }));
  };

  return (
    <Box className={className}>
      {/* Button Controls Panel */}
      <Box className="layera-card layera-padding--lg layera-margin-bottom--xl layera-text--align-center">
        <h3 className="layera-typography layera-margin-bottom--lg" data-size="lg" data-weight="bold" data-color="primary">
          🎮 Button Controls
        </h3>

        <Box
          className="layera-grid layera-grid--gap-lg layera-margin-bottom--lg layera-grid-autofit"
        >
          {/* Variant Control */}
          <Box>
            <Text className="layera-typography layera-margin-bottom--sm" data-size="sm" data-weight="medium" data-color="primary">
              Variant
            </Text>
            <Box className="layera-flex layera-flex--wrap layera-flex--gap-md layera-flex--justify-center">
              {(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'] as ButtonVariant[]).map((variant) => (
                <Button
                  key={variant}
                  variant={buttonState.variant === variant ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => updateButtonState({ variant })}
                >
                  {variant}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Size Control */}
          <Box>
            <Text className="layera-typography layera-margin-bottom--sm" data-size="sm" data-weight="medium" data-color="primary">
              Size
            </Text>
            <Box className="layera-flex layera-flex--wrap layera-flex--gap-md layera-flex--justify-center">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as ButtonSize[]).map((size) => (
                <Button
                  key={size}
                  variant={buttonState.size === size ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => updateButtonState({ size })}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Text Control */}
          <Box>
            <Text className="layera-typography layera-margin-bottom--sm" data-size="sm" data-weight="medium" data-color="primary">
              Button Text
            </Text>
            <input
              type="text"
              value={buttonState.text}
              onChange={(e) => updateButtonState({ text: e.target.value })}
              className="layera-input layera-width--full"
            />
          </Box>

          {/* Icon Control */}
          <Box>
            <Text className="layera-typography layera-margin-bottom--sm" data-size="sm" data-weight="medium" data-color="primary">
              With Icon
            </Text>
            <Button
              variant={buttonState.withIcon ? 'success' : 'outline'}
              size="sm"
              onClick={() => updateButtonState({ withIcon: !buttonState.withIcon })}
            >
              {buttonState.withIcon ? '✅ Enabled' : '❌ Disabled'}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Live Button Preview */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--lg" data-size="lg" data-weight="bold" data-color="primary">
          🎯 Live Button Preview
        </h3>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-lg layera-margin-bottom--lg">
          <Button
            variant={buttonState.variant}
            size={buttonState.size}
            icon={buttonState.withIcon ? <PlusIcon /> : undefined}
          >
            {buttonState.text}
          </Button>
        </Box>

        <Text className="layera-typography" data-size="sm" data-color="secondary">
          Αυτό το button ενημερώνεται σε πραγματικό χρόνο
        </Text>
      </Box>

      {/* Button Showcase Gallery */}
      <Box className="layera-card layera-padding--lg layera-text--align-center">
        <h3 className="layera-typography layera-margin-bottom--lg" data-size="lg" data-weight="bold" data-color="primary">
          🎨 Button Gallery - {buttonState.size.toUpperCase()} Size
        </h3>

        <Box
          className="layera-grid layera-grid--gap-lg layera-grid-autofit"
        >
          {(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'] as ButtonVariant[]).map((variant) => (
            <Box key={variant} className="layera-text-center layera-padding--md">
              <Button
                variant={variant}
                size={buttonState.size}
                icon={buttonState.withIcon ? <SearchIcon /> : undefined}
                className="layera-margin-bottom--sm"
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
              <Text className="layera-typography" data-size="xs" data-color="secondary">
                {variant}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};