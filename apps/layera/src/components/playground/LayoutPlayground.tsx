import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon } from '@layera/icons';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { LayoutPlaygroundProps } from '../../types/unified-interfaces';

export const LayoutPlayground: React.FC<LayoutPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  layoutRadius = 'md',
  layoutSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // ✅ ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΔΙΠΛΟΤΥΠΩΝ FUNCTIONS - Χρήση κεντρικών helper functions
  const { getRadiusInGreek, getRadiusToken, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για τμήματα layout',
      `μεγέθους ${getSizeInGreek(layoutSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(layoutRadius)}`);

    // Προσθέτουμε hover effect information
    if (hoverEffect && hoverEffect !== 'normal') {
      parts.push(`με ${getHoverEffectInGreek(hoverEffect)}`);
    }

    // Προσθέτουμε active effect information
    if (activeEffect && activeEffect !== 'scale') {
      parts.push(`και ${getActiveEffectInGreek(activeEffect)}`);
    }

    return parts.join(' ');
  };

  const layoutConfigs = [
    { key: 'primary', title: 'Primary Layout', description: 'Κύριο layout', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Layout', description: 'Δευτερεύον layout', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Layout', description: 'Layout επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Layout', description: 'Layout προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Layout', description: 'Layout κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Layout', description: 'Layout πληροφοριών', colorValue: currentColors.info }
  ];

  // ✅ NO INLINE STYLES - Using useCSSVariables hook
  const { actions } = useCSSVariables();

  React.useEffect(() => {
    layoutConfigs.forEach(({ key, colorValue }) => {
      actions.applySpecificLayoutColor(key, colorValue);
    });
  }, [layoutConfigs, actions]);

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Layout
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="global-display-flex global-justifyContent-center global-alignItems-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg">
          {layoutConfigs.map(({ key, title }) => (
            <Box
              key={key}
              className={`layera-layout-uniform layera-card`}
              data-variant={key === 'danger' ? 'error' : key}
            >
              <Text
                className="layera-typography"
                data-size="xs"
                data-weight="bold"
              >
                {title}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};