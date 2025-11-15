import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon, CloseIcon } from '@layera/icons';

/**
 * ModalsPlayground Component
 *
 * Live Preview για modals με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστά modals (P, S, Su, W, D, I)
 */

interface ModalsPlaygroundProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
}

export const ModalsPlayground: React.FC<ModalsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2
}) => {
  // Helper functions same as CardsPlayground
  const getTextColor = (colorValue: string) => {
    if (colorCategory === 'text') return colorValue;
    if (colorCategory === 'backgrounds') {
      return colorValue === '#f59e0b' ? '#000000' : '#ffffff';
    }
    return '#333333';
  };

  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return '#ffffff';
  };

  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-global-borderWidth-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return '1px solid #e5e5e5';
  };

  const modalStyle = {
    height: 'var(--layera-fontSize-6xl)',
    width: 'calc(var(--layera-fontSize-6xl) * 3)',
    minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)'
  };

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Modals
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '8px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 0'
        }}>
          <div
            style={{
              padding: '12px',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.primary),
              color: getTextColor(currentColors.primary),
              border: getBorderStyle(currentColors.primary)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Primary Modal</h4>
              <CloseIcon size="sm" />
            </div>
            <p style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>Κύριο modal</p>
          </div>

          <div
            style={{
              padding: '12px',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.secondary),
              color: getTextColor(currentColors.secondary),
              border: getBorderStyle(currentColors.secondary)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Secondary Modal</h4>
              <CloseIcon size="sm" />
            </div>
            <p style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>Δευτερεύον modal</p>
          </div>

          <div
            style={{
              padding: '12px',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.success),
              color: getTextColor(currentColors.success),
              border: getBorderStyle(currentColors.success)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Success Modal</h4>
              <CloseIcon size="sm" />
            </div>
            <p style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>Modal επιτυχίας</p>
          </div>

          <div
            style={{
              padding: '12px',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.warning),
              color: getTextColor(currentColors.warning),
              border: getBorderStyle(currentColors.warning)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Warning Modal</h4>
              <CloseIcon size="sm" />
            </div>
            <p style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>Modal προειδοποίησης</p>
          </div>

          <div
            style={{
              padding: '12px',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.danger),
              color: getTextColor(currentColors.danger),
              border: getBorderStyle(currentColors.danger)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Danger Modal</h4>
              <CloseIcon size="sm" />
            </div>
            <p style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>Modal κινδύνου</p>
          </div>

          <div
            style={{
              padding: '12px',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.info),
              color: getTextColor(currentColors.info),
              border: getBorderStyle(currentColors.info)
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Info Modal</h4>
              <CloseIcon size="sm" />
            </div>
            <p style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>Modal πληροφοριών</p>
          </div>
        </div>
      </Box>
    </Box>
  );
};