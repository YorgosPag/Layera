import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { RulerIcon, CircleIcon, PointIcon } from '@layera/icons';
import type { MeasurementMode } from '../types';

interface MeasurementControlsProps {
  mode: MeasurementMode;
  distance: number;
  area: number;
  onModeChange: (mode: MeasurementMode) => React.ReactNode;
  onReset: () => React.ReactNode;
  onFinish?: () => void;
  onCancel?: () => void;
  isDrawing: boolean;
  canFinish: boolean;
  displayValue?: string;
}

/**
 * Measurement controls component using LEGO systems
 * Βασισμένο στο OLD_geo-canvas/components/measurement/MeasurementControls.tsx
 * αλλά ενσωματώνει τα existing LEGO systems
 */
export const MeasurementControls: React.FC<MeasurementControlsProps> = ({
  mode,
  distance,
  area,
  onModeChange,
  onReset,
  onFinish,
  onCancel,
  isDrawing,
  canFinish,
  displayValue
}) => {
  const { t } = useLayeraTranslation();

  return (
    <Card variant="floating" className="min-w-[var(--la-space-50)]">
      <Typography variant="h6" className="text-center mb-3">
        {t('geo-drawing.measurement-title')}
      </Typography>

      {/* Mode Selection */}
      <Layout direction="horizontal" spacing="sm" className="mb-3">
        <Button
          variant={mode === 'distance' ? 'primary' : 'secondary'}
          size="sm"
          onClick={(): void => onModeChange('distance')}
          disabled={isDrawing}
          className="flex-1"
        >
          <Icons.Rule className="w-4 h-4 mr-1" />
          {t('geo-drawing.modes.distance')}
        </Button>

        <Button
          variant={mode === 'area' ? 'primary' : 'secondary'}
          size="sm"
          onClick={(): void => onModeChange('area')}
          disabled={isDrawing}
          className="flex-1"
        >
          <Icons.Square className="w-4 h-4 mr-1" />
          {t('geo-drawing.modes.area')}
        </Button>
      </Layout>

      <Layout direction="horizontal" spacing="sm" className="mb-3">
        <Button
          variant={mode === 'point' ? 'primary' : 'secondary'}
          size="sm"
          onClick={(): void => onModeChange('point')}
          disabled={isDrawing}
          className="flex-1"
        >
          <Icons.MapPin className="w-4 h-4 mr-1" />
          {t('geo-drawing.modes.point')}
        </Button>
      </Layout>

      {/* Current Measurement Display */}
      <Card variant="inner" className="mb-3 p-2 min-h-[var(--la-space-15)] flex items-center justify-center">
        <Typography variant="body" className="text-center">
          {displayValue || (
            mode === 'distance'
              ? `${t('geo-drawing.labels.distance')}: ${distance.toFixed(2)} m`
              : mode === 'area'
              ? `${t('geo-drawing.labels.area')}: ${area.toFixed(2)} m²`
              : t('geo-drawing.labels.select-point')
          )}
        </Typography>
      </Card>

      {/* Action Buttons */}
      <Layout direction="vertical" spacing="sm">
        {isDrawing && (
          <Layout direction="horizontal" spacing="sm">
            {canFinish && onFinish && (
              <Button
                variant="success"
                size="sm"
                onClick={onFinish}
                className="flex-1"
              >
                <Icons.Check className="w-4 h-4 mr-1" />
                {t('geo-drawing.actions.finish')}
              </Button>
            )}

            {onCancel && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onCancel}
                className="flex-1"
              >
                <Icons.X className="w-4 h-4 mr-1" />
                {t('geo-drawing.actions.cancel')}
              </Button>
            )}
          </Layout>
        )}

        <Button
          variant="danger"
          size="sm"
          onClick={onReset}
          className="w-full"
        >
          <Icons.Trash className="w-4 h-4 mr-1" />
          {t('geo-drawing.actions.clear')}
        </Button>
      </Layout>

      {/* Instructions */}
      <Card variant="inner" className="mt-3 p-2">
        <Typography variant="caption" className="text-center leading-tight">
          {isDrawing ? (
            <>
              {t('geo-drawing.instructions.click-add')}<br/>
              {mode !== 'point' && (
                <>
                  {t('geo-drawing.instructions.double-click-finish')}<br/>
                </>
              )}
              {t('geo-drawing.instructions.esc-cancel')}
            </>
          ) : (
            t('geo-drawing.instructions.select-mode')
          )}
        </Typography>
      </Card>
    </Card>
  );
};