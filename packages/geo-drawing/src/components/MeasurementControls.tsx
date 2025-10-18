import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@layera/buttons';
import { Card } from '@layera/cards';
import { Typography } from '@layera/typography';
import { Layout } from '@layera/layout';
import { Icons } from '@layera/icons';
import type { MeasurementMode } from '../types';

interface MeasurementControlsProps {
  mode: MeasurementMode;
  distance: number;
  area: number;
  onModeChange: (mode: MeasurementMode) => void;
  onReset: () => void;
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
  const { t } = useTranslation();

  return (
    <Card variant=\"floating\" className=\"min-w-[200px]\">\n      <Typography variant=\"h6\" className=\"text-center mb-3\">\n        {t('geo-drawing.measurement-title')}\n      </Typography>\n\n      {/* Mode Selection */}\n      <Layout direction=\"horizontal\" spacing=\"sm\" className=\"mb-3\">\n        <Button\n          variant={mode === 'distance' ? 'primary' : 'secondary'}\n          size=\"sm\"\n          onClick={() => onModeChange('distance')}\n          disabled={isDrawing}\n          className=\"flex-1\"\n        >\n          <Icons.Rule className=\"w-4 h-4 mr-1\" />\n          {t('geo-drawing.modes.distance')}\n        </Button>\n        \n        <Button\n          variant={mode === 'area' ? 'primary' : 'secondary'}\n          size=\"sm\"\n          onClick={() => onModeChange('area')}\n          disabled={isDrawing}\n          className=\"flex-1\"\n        >\n          <Icons.Square className=\"w-4 h-4 mr-1\" />\n          {t('geo-drawing.modes.area')}\n        </Button>\n      </Layout>\n\n      <Layout direction=\"horizontal\" spacing=\"sm\" className=\"mb-3\">\n        <Button\n          variant={mode === 'point' ? 'primary' : 'secondary'}\n          size=\"sm\"\n          onClick={() => onModeChange('point')}\n          disabled={isDrawing}\n          className=\"flex-1\"\n        >\n          <Icons.MapPin className=\"w-4 h-4 mr-1\" />\n          {t('geo-drawing.modes.point')}\n        </Button>\n      </Layout>\n\n      {/* Current Measurement Display */}\n      <Card variant=\"inner\" className=\"mb-3 p-2 min-h-[60px] flex items-center justify-center\">\n        <Typography variant=\"body\" className=\"text-center\">\n          {displayValue || (\n            mode === 'distance' \n              ? `${t('geo-drawing.labels.distance')}: ${distance.toFixed(2)} m`\n              : mode === 'area'\n              ? `${t('geo-drawing.labels.area')}: ${area.toFixed(2)} m²`\n              : t('geo-drawing.labels.select-point')\n          )}\n        </Typography>\n      </Card>\n\n      {/* Action Buttons */}\n      <Layout direction=\"vertical\" spacing=\"sm\">\n        {isDrawing && (\n          <Layout direction=\"horizontal\" spacing=\"sm\">\n            {canFinish && onFinish && (\n              <Button\n                variant=\"success\"\n                size=\"sm\"\n                onClick={onFinish}\n                className=\"flex-1\"\n              >\n                <Icons.Check className=\"w-4 h-4 mr-1\" />\n                {t('geo-drawing.actions.finish')}\n              </Button>\n            )}\n            \n            {onCancel && (\n              <Button\n                variant=\"secondary\"\n                size=\"sm\"\n                onClick={onCancel}\n                className=\"flex-1\"\n              >\n                <Icons.X className=\"w-4 h-4 mr-1\" />\n                {t('geo-drawing.actions.cancel')}\n              </Button>\n            )}\n          </Layout>\n        )}\n\n        <Button\n          variant=\"danger\"\n          size=\"sm\"\n          onClick={onReset}\n          className=\"w-full\"\n        >\n          <Icons.Trash className=\"w-4 h-4 mr-1\" />\n          {t('geo-drawing.actions.clear')}\n        </Button>\n      </Layout>\n\n      {/* Instructions */}\n      <Card variant=\"inner\" className=\"mt-3 p-2\">\n        <Typography variant=\"caption\" className=\"text-center leading-tight\">\n          {isDrawing ? (\n            <>\n              {t('geo-drawing.instructions.click-add')}<br/>\n              {mode !== 'point' && (\n                <>\n                  {t('geo-drawing.instructions.double-click-finish')}<br/>\n                </>n              )}\n              {t('geo-drawing.instructions.esc-cancel')}\n            </>\n          ) : (\n            t('geo-drawing.instructions.select-mode')\n          )}\n        </Typography>\n      </Card>\n    </Card>\n  );\n};