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
      {/* Live Preview Area - Ενοποιημένο με 6 χρωματιστά buttons */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πλήκτρα
        </h3>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-md">
          {/* Τα 6 χρωματιστά buttons με δυναμικές τιμές */}
          <button style={{
            backgroundColor: '#6366f1', // primary
            color: 'white',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'P' : 'Primary'}
          </button>
          <button style={{
            backgroundColor: '#6b7280', // secondary
            color: 'white',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'S' : 'Secondary'}
          </button>
          <button style={{
            backgroundColor: '#10b981', // success
            color: 'white',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'Su' : 'Success'}
          </button>
          <button style={{
            backgroundColor: '#f59e0b', // warning
            color: 'black',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'W' : 'Warning'}
          </button>
          <button style={{
            backgroundColor: '#ef4444', // danger
            color: 'white',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'D' : 'Danger'}
          </button>
          <button style={{
            backgroundColor: '#3b82f6', // info
            color: 'white',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'I' : 'Info'}
          </button>
          <button style={{
            backgroundColor: 'transparent', // outline
            color: '#6366f1',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: '2px solid #6366f1',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'O' : 'Outline'}
          </button>
          <button style={{
            backgroundColor: 'transparent', // ghost
            color: '#6b7280',
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.shape === 'square' ? 'G' : 'Ghost'}
          </button>
        </Box>
      </Box>

      {/* Controls Grid - 1x3 Layout */}
      <Box
        className="layera-grid"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: '32px',
          marginTop: '48px',
          marginBottom: '32px'
        }}
      >
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

    </Box>
  );
};