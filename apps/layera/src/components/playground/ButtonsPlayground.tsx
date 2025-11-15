import React from 'react';
import { Box } from '@layera/layout';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, CheckIcon, CloseIcon, SettingsIcon, RulerIcon, PolygonIcon, CompassIcon } from '@layera/icons';
import { ButtonState, ButtonStateActions, ButtonVariant, ButtonSize, ButtonShape } from '../../hooks/useButtonState';

/**
 * ButtonsPlayground Component
 *
 * Enterprise-grade component για button testing και configuration
 * - Live preview area με διαφορετικά button shapes
 * - Controls grid για variant, size, text, icon, shape
 * - Current settings display
 * - Clean separation από main LivePlayground
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Well-defined props interface
 * - Single Responsibility Principle
 */

interface ButtonsPlaygroundProps {
  /** Button state από το useButtonState hook */
  buttonState: ButtonState;
  /** Button actions από το useButtonState hook */
  buttonActions: ButtonStateActions;
  /** Available button variants */
  buttonVariants: readonly ButtonVariant[];
  /** Available button sizes */
  buttonSizes: readonly ButtonSize[];
}

export const ButtonsPlayground: React.FC<ButtonsPlaygroundProps> = ({
  buttonState,
  buttonActions,
  buttonVariants,
  buttonSizes
}) => {
  return (
    <Box>
      {/* Live Preview Area */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--xl" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview
        </h3>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
          {/* Rectangular Button */}
          {buttonState.shape === 'rectangular' && (
            <Button
              variant={buttonState.variant}
              size={buttonState.size}
              icon={buttonState.withIcon ? <PlusIcon size="sm" /> : undefined}
              iconPosition="left"
            >
              {buttonState.text}
            </Button>
          )}

          {/* Square Button */}
          {buttonState.shape === 'square' && (
            <SquareButton
              icon={<SearchIcon size="sm" />}
              variant={buttonState.variant}
              size={buttonState.size}
              aria-label={`Τετράγωνο ${buttonState.variant} πλήκτρο`}
              tooltip={`Live ${buttonState.variant} τετράγωνο`}
            />
          )}

          {/* Rounded Button */}
          {buttonState.shape === 'rounded' && (
            <button
              style={{
                backgroundColor: buttonState.variant === 'primary' ? '#007bff' : buttonState.variant === 'secondary' ? '#6c757d' : '#28a745',
                color: 'white',
                padding: buttonState.size === 'xs' ? '4px 12px' : buttonState.size === 'sm' ? '6px 16px' : buttonState.size === 'md' ? '8px 20px' : buttonState.size === 'lg' ? '12px 24px' : '16px 32px',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {buttonState.withIcon && <span>⚪</span>}
              {buttonState.text}
            </button>
          )}
        </Box>
      </Box>

      {/* Controls Grid */}
      <Box
        className="layera-grid layera-grid--gap-xl layera-margin-bottom--xl"
        style={{
          gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)'
        }}
      >
        {/* Variant Control */}
        <Box className="layera-card layera-padding--lg">
          <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
            Variant
          </h4>
          <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
            {buttonVariants.map((variant) => (
              <Button
                key={variant}
                variant={buttonState.variant === variant ? 'primary' : 'outline'}
                size="sm"
                onClick={() => buttonActions.setVariant(variant)}
              >
                {variant}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Size Control */}
        <Box className="layera-card layera-padding--lg">
          <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
            Size
          </h4>
          <Box className="layera-flex layera-flex--gap-sm">
            {buttonSizes.map((size) => (
              <Button
                key={size}
                variant={buttonState.size === size ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => buttonActions.setSize(size)}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Text & Icon Control */}
        <Box className="layera-card layera-padding--lg">
          <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
            Κείμενο & Εικονίδιο
          </h4>
          <input
            type="text"
            value={buttonState.text}
            onChange={(e) => buttonActions.setText(e.target.value)}
            className="layera-input layera-width--full layera-margin-bottom--sm"
          />
          <Button
            variant={buttonState.withIcon ? 'primary' : 'outline'}
            size="sm"
            onClick={() => buttonActions.setWithIcon(!buttonState.withIcon)}
          >
            {buttonState.withIcon ? <><CheckIcon size="sm" /> Με εικονίδιο</> : <><CloseIcon size="sm" /> Χωρίς εικονίδιο</>}
          </Button>
        </Box>

        {/* Shape Control */}
        <Box className="layera-card layera-padding--lg">
          <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
            Σχήμα Πλήκτρου
          </h4>
          <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
            <Button
              variant={buttonState.shape === 'rectangular' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => buttonActions.setShape('rectangular')}
            >
              <RulerIcon size="sm" /> Παραλληλόγραμμο
            </Button>
            <Button
              variant={buttonState.shape === 'square' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => buttonActions.setShape('square')}
            >
              <PolygonIcon size="sm" /> Τετράγωνο
            </Button>
            <Button
              variant={buttonState.shape === 'rounded' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => buttonActions.setShape('rounded')}
            >
              <CompassIcon size="sm" /> Στρογγυλό
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Current Settings Display */}
      <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
        <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
          <SettingsIcon size="sm" /> Τρέχουσες Ρυθμίσεις:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
{`{
  variant: "${buttonState.variant}",
  size: "${buttonState.size}",
  text: "${buttonState.text}",
  buttonState.withIcon: ${buttonState.withIcon}
}`}
        </pre>
      </Box>
    </Box>
  );
};