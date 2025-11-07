/**
 * 🎛️ SnapSettingsPanel Component
 * Settings panel για snap configuration - χρησιμοποιεί existing LEGO systems
 */

import React, { useState, useCallback } from 'react';

// Import από existing LEGO systems - ΜΗΝ αναδημιουργήσεις
import { BaseCard } from '@layera/cards';
import { Button, ToggleButton } from '@layera/buttons';
import { Slider, FormField, FormSection } from '@layera/forms';
import { Text, Heading } from '@layera/typography';
import { Stack, Grid } from '@layera/layout';
import { Icon } from '@layera/icons';
import { useTheme } from '@layera/theme-switcher';
import { SPACING_SCALE } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { useNotification } from '@layera/notifications';

// Import από snap engine
import type { SnapType, SnapConfiguration } from '@layera/snap-engine';

// ========================================
// 🎛️ COMPONENT INTERFACES
// ========================================

export interface SnapSettingsPanelProps {
  configuration: SnapConfiguration;
  onConfigChange: (config: Partial<SnapConfiguration>) => void;
  onClose?: () => void;
  compact?: boolean;
  disabled?: boolean;
}

// ========================================
// 🎯 SNAP TYPE CONFIGURATIONS
// ========================================

const SNAP_TYPE_INFO: Record<SnapType, {
  icon: string;
  priority: number;
  description: string;
  category: 'basic' | 'advanced' | 'precision';
}> = {
  endpoint: { icon: 'square', priority: 100, description: 'snap.types.endpoint.desc', category: 'basic' },
  midpoint: { icon: 'triangle', priority: 80, description: 'snap.types.midpoint.desc', category: 'basic' },
  center: { icon: 'circle', priority: 90, description: 'snap.types.center.desc', category: 'basic' },
  vertex: { icon: 'diamond', priority: 85, description: 'snap.types.vertex.desc', category: 'basic' },
  intersection: { icon: 'cross', priority: 95, description: 'snap.types.intersection.desc', category: 'advanced' },
  perpendicular: { icon: 'perpendicular', priority: 70, description: 'snap.types.perpendicular.desc', category: 'precision' },
  tangent: { icon: 'tangent', priority: 65, description: 'snap.types.tangent.desc', category: 'precision' },
  nearest: { icon: 'target', priority: 60, description: 'snap.types.nearest.desc', category: 'basic' },
  grid: { icon: 'grid', priority: 50, description: 'snap.types.grid.desc', category: 'advanced' },
  edge: { icon: 'line', priority: 75, description: 'snap.types.edge.desc', category: 'advanced' }
};

// ========================================
// 🎛️ SNAP SETTINGS PANEL COMPONENT
// ========================================

export const SnapSettingsPanel: React.FC<SnapSettingsPanelProps> = ({
  configuration,
  onConfigChange,
  onClose,
  compact = false,
  disabled = false
}) => {
  // Existing LEGO systems integration - ΜΗΝ αναδημιουργήσεις
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();
  const { toast } = useNotification();

  // Local state
  const [activeCategory, setActiveCategory] = useState<'basic' | 'advanced' | 'precision'>('basic');

  // ========================================
  // 🔧 EVENT HANDLERS
  // ========================================

  const handleToleranceChange = useCallback((value: number) => {
    onConfigChange({ tolerance: value });
    toast({
      type: 'info',
      message: t('snap.settings.tolerance_changed', { value }),
      duration: 1500
    });
  }, [onConfigChange, toast, t]);

  const handleSnapTypeToggle = useCallback((type: SnapType, enabled: boolean) => {
    const newEnabledTypes = new Set(configuration.enabledTypes);

    if (enabled) {
      newEnabledTypes.add(type);
    } else {
      newEnabledTypes.delete(type);
    }

    onConfigChange({ enabledTypes: newEnabledTypes });

    toast({
      type: enabled ? 'success' : 'info',
      message: t(`snap.settings.type_${enabled ? 'enabled' : 'disabled'}`, {
        type: t(`snap.types.${type}`)
      }),
      duration: 1500
    });
  }, [configuration.enabledTypes, onConfigChange, toast, t]);

  const handlePerformanceLevelChange = useCallback((level: 'high' | 'medium' | 'low') => {
    onConfigChange({ performanceLevel: level });
    toast({
      type: 'info',
      message: t('snap.settings.performance_changed', { level: t(`snap.performance.${level}`) }),
      duration: 2000
    });
  }, [onConfigChange, toast, t]);

  const handleResetToDefaults = useCallback(() => {
    const defaultConfig: Partial<SnapConfiguration> = {
      tolerance: 10,
      enabledTypes: new Set(['endpoint', 'midpoint', 'center']),
      performanceLevel: 'medium'
    };

    onConfigChange(defaultConfig);
    toast({
      type: 'success',
      message: t('snap.settings.reset_success'),
      duration: 2000
    });
  }, [onConfigChange, toast, t]);

  // ========================================
  // 🎨 RENDER HELPERS
  // ========================================

  const renderSnapTypeToggle = (type: SnapType) => {
    const info = SNAP_TYPE_INFO[type];
    const isEnabled = configuration.enabledTypes.has(type);

    return (
      <FormField
        key={type}
        label={
          <Stack direction="row" spacing="var(--la-space-1)" align="center"> {/* 🎯 SST: XS spacing */}
            <Icon name={info.icon} size={16} />
            <Text variant="body2" weight="medium">
              {t(`snap.types.${type}`)}
            </Text>
          </Stack>
        }
        description={compact ? undefined : t(info.description)}
      >
        <ToggleButton
          active={isEnabled}
          disabled={disabled}
          onClick={(): void => handleSnapTypeToggle(type, !isEnabled)}
          size={compact ? 'small' : 'medium'}
        >
          {isEnabled ? t('common.enabled') : t('common.disabled')}
        </ToggleButton>
      </FormField>
    );
  };

  const renderCategorySection = (category: 'basic' | 'advanced' | 'precision') => {
    const types = Object.entries(SNAP_TYPE_INFO)
      .filter(([, info]) => info.category === category)
      .map(([type]) => type as SnapType);

    if (types.length === 0) return null;

    return (
      <FormSection
        title={t(`snap.categories.${category}`)}
        collapsible={!compact}
        defaultExpanded={category === activeCategory}
      >
        <Stack spacing={compact ? 8 : 12}>
          {types.map(renderSnapTypeToggle)}
        </Stack>
      </FormSection>
    );
  };

  // ========================================
  // 🎛️ MAIN RENDER
  // ========================================

  // Card title με close button
  const cardTitle = (
    <Stack direction="row" spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */ align="center">
      <Icon name="settings" size={20} />
      <Heading level={compact ? 4 : 3}>
        {t('snap.settings.title')}
      </Heading>
    </Stack>
  );

  const cardActions = onClose ? (
    <Button
      variant="ghost"
      size="small"
      onClick={onClose}
      disabled={disabled}
    >
      <Icon name="close" size={16} />
    </Button>
  ) : undefined;

  return (
    <BaseCard
      title={cardTitle}
      actions={cardActions}
      className={compact ? 'snap-settings-compact' : 'snap-settings-full'}
    >
        <Stack spacing={compact ? 16 : 24}>
          {/* Tolerance Slider με @layera/forms */}
          <FormSection title={t('snap.settings.tolerance.title')}>
            <FormField
              label={t('snap.settings.tolerance.label')}
              description={!compact ? t('snap.settings.tolerance.description') : undefined}
            >
              <Stack spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */>
                <Slider
                  min={1}
                  max={50}
                  step={1}
                  value={configuration.tolerance}
                  onChange={handleToleranceChange}
                  disabled={disabled}
                  showValue
                  formatValue={(value) => `${value}px`}
                />
                <Text variant="caption" color="muted">
                  {t('snap.settings.tolerance.current', { value: configuration.tolerance })}
                </Text>
              </Stack>
            </FormField>
          </FormSection>

          {/* Snap Types με category tabs */}
          <FormSection title={t('snap.settings.types.title')}>
            {/* Category Navigation για non-compact mode */}
            {!compact && (
              <Stack direction="row" spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */ marginBottom={`${SPACING_SCALE.MD}px`}>
                {(['basic', 'advanced', 'precision'] as const).map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? 'primary' : 'outline'}
                    size="small"
                    onClick={(): void => setActiveCategory(category)}
                    disabled={disabled}
                  >
                    {t(`snap.categories.${category}`)}
                  </Button>
                ))}
              </Stack>
            )}

            {/* Render categories */}
            {compact ? (
              // Compact mode - show all in grid
              <Grid columns={2} spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */>
                {Object.keys(SNAP_TYPE_INFO).map(type =>
                  renderSnapTypeToggle(type as SnapType)
                )}
              </Grid>
            ) : (
              // Full mode - show by category
              <Stack spacing={16}>
                {renderCategorySection('basic')}
                {renderCategorySection('advanced')}
                {renderCategorySection('precision')}
              </Stack>
            )}
          </FormSection>

          {/* Performance Level */}
          <FormSection title={t('snap.settings.performance.title')}>
            <FormField
              label={t('snap.settings.performance.label')}
              description={!compact ? t('snap.settings.performance.description') : undefined}
            >
              <Stack direction="row" spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */>
                {(['low', 'medium', 'high'] as const).map(level => (
                  <Button
                    key={level}
                    variant={configuration.performanceLevel === level ? 'primary' : 'outline'}
                    size={compact ? 'small' : 'medium'}
                    onClick={(): void => handlePerformanceLevelChange(level)}
                    disabled={disabled}
                  >
                    {t(`snap.performance.${level}`)}
                  </Button>
                ))}
              </Stack>
            </FormField>
          </FormSection>

          {/* Actions */}
          <Stack direction="row" spacing={12} justify="space-between">
            <Button
              variant="outline"
              onClick={handleResetToDefaults}
              disabled={disabled}
            >
              <Icon name="refresh" size={16} marginRight="var(--la-space-1)" /* 🎯 SST: XS spacing */ />
              {t('snap.settings.reset_defaults')}
            </Button>

            {!compact && (
              <Stack direction="row" spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */>
                <Text variant="caption" color="muted">
                  {t('snap.settings.enabled_count', {
                    count: configuration.enabledTypes.size
                  })}
                </Text>
              </Stack>
            )}
          </Stack>
        </Stack>
    </BaseCard>
  );
};

// ========================================
// 🎛️ COMPACT SNAP TOOLBAR
// ========================================

export interface SnapToolbarProps {
  configuration: SnapConfiguration;
  onConfigChange: (config: Partial<SnapConfiguration>) => void;
  onOpenSettings?: () => void;
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
}

export const SnapToolbar: React.FC<SnapToolbarProps> = ({
  configuration,
  onConfigChange,
  onOpenSettings,
  enabled,
  onToggleEnabled
}) => {
  const { t } = useLayeraTranslation();

  // Quick toggle για common snap types
  const quickTypes: SnapType[] = ['endpoint', 'midpoint', 'center', 'vertex'];

  return (
    <Stack direction="row" spacing="var(--la-space-1)" /* 🎯 SST: XS spacing */ align="center">
      {/* Master Enable/Disable */}
      <ToggleButton
        active={enabled}
        onClick={(): void => onToggleEnabled(!enabled)}
        variant="primary"
      >
        <Icon name="magnet" size={16} marginRight="var(--la-space-1)" /> {/* 🎯 SST: XXS spacing token */}
        {t('snap.toolbar.snap')}
      </ToggleButton>

      {/* Quick type toggles */}
      {enabled && quickTypes.map(type => (
        <ToggleButton
          key={type}
          active={configuration.enabledTypes.has(type)}
          onClick={(): void => {
            const newTypes = new Set(configuration.enabledTypes);
            if (newTypes.has(type)) {
              newTypes.delete(type);
            } else {
              newTypes.add(type);
            }
            onConfigChange({ enabledTypes: newTypes });
          }}
          size="small"
          title={t(`snap.types.${type}`)}
        >
          <Icon name={SNAP_TYPE_INFO[type].icon} size={14} />
        </ToggleButton>
      ))}

      {/* Settings button */}
      {onOpenSettings && (
        <Button
          variant="ghost"
          size="small"
          onClick={onOpenSettings}
          title={t('snap.toolbar.open_settings')}
        >
          <Icon name="settings" size={16} />
        </Button>
      )}

      {/* Tolerance quick adjust */}
      <Stack direction="row" spacing={4} align="center">
        <Text variant="caption" color="muted">
          {configuration.tolerance}px
        </Text>
      </Stack>
    </Stack>
  );
};