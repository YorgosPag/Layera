/**
 * AreaMethodMeasurement.tsx - Enterprise Integration για Area Method με @layera/geo-drawing
 *
 * Συνδέει τα 4 Area Method Cards με το υπάρχον enterprise drawing system:
 * 1. Manual Input - Direct numeric input
 * 2. Map Drawing - useMeasurement hook με area mode
 * 3. Floor Plan Upload - Combination upload + measurement
 * 4. Auto Calculate - OSM building detection + calculation
 */

import React, { useState, useCallback } from 'react';
import { Stack, Box } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
import { SPACING_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { BaseCard } from '@layera/cards';
import { Input } from '@layera/forms';
import { useMeasurement, type MeasurementResult } from '@layera/geo-drawing';

export type AreaMethodType = 'manual-input' | 'map-drawing' | 'floor-plan-upload' | 'auto-calculate';

export interface AreaMeasurementResult {
  method: AreaMethodType;
  area: number; // σε τετραγωνικά μέτρα
  confidence: number; // 0-1 accuracy confidence
  measurementData?: MeasurementResult; // από geo-drawing αν υπάρχει
  floorPlanData?: {
    originalImageUrl: string;
    scale: number;
    calibrationPoints: Array<{ pixel: [number, number]; realWorld: number }>;
  };
  osmData?: {
    buildingId: string;
    confidence: number;
    source: 'osm-outline' | 'osm-calculated';
  };
}

export interface AreaMethodMeasurementProps {
  selectedMethod: AreaMethodType;
  onMeasurementComplete: (result: AreaMeasurementResult) => void;
  onCancel?: () => void;
  propertyType: 'apartment' | 'office' | 'factory' | 'land' | 'building' | 'store';
}

/**
 * Enterprise Area Measurement Component
 *
 * Ενσωματώνει το @layera/geo-drawing system με τα Area Method Cards
 * για seamless enterprise workflow integration.
 */
export const AreaMethodMeasurement: React.FC<AreaMethodMeasurementProps> = ({
  selectedMethod,
  onMeasurementComplete,
  onCancel,
  propertyType
}) => {
  const [manualArea, setManualArea] = useState<number>(85); // Default για γρήγορο testing
  const [isProcessing, setIsProcessing] = useState(false);

  // Enterprise Drawing Hook Integration
  const {
    state,
    points,
    currentResult,
    finishMeasurement,
    cancelMeasurement,
    changeMeasurementMode,
    getCurrentArea,
    isDrawing,
    canFinish
  } = useMeasurement();

  // Initialize area mode for map drawing
  React.useEffect(() => {
    if (selectedMethod === 'map-drawing') {
      changeMeasurementMode('area');
    }
  }, [selectedMethod, changeMeasurementMode]);

  // Monitor measurement completion from geo-drawing
  React.useEffect(() => {
    if (selectedMethod === 'map-drawing' && currentResult && currentResult.area && state === 'finished') {
      console.log('🎯 Area measurement completed via geo-drawing:', currentResult);

      const result: AreaMeasurementResult = {
        method: 'map-drawing',
        area: currentResult.area,
        confidence: 0.95, // High confidence για manual drawing
        measurementData: currentResult
      };

      onMeasurementComplete(result);
    }
  }, [selectedMethod, currentResult, state, onMeasurementComplete]);

  const handleManualInputSubmit = useCallback(() => {
    if (manualArea <= 0) {
      alert('Το εμβαδόν πρέπει να είναι μεγαλύτερο από 0');
      return;
    }

    console.log('📝 Manual area input:', manualArea);

    const result: AreaMeasurementResult = {
      method: 'manual-input',
      area: manualArea,
      confidence: 1.0 // Πλήρης εμπιστοσύνη για manual input
    };

    onMeasurementComplete(result);
  }, [manualArea, onMeasurementComplete]);

  const handleFloorPlanUpload = useCallback(async () => {
    setIsProcessing(true);

    // Simulate floor plan upload process
    // Στην πραγματικότητα εδώ θα γίνει integration με upload system
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('🏗️ Floor plan upload simulation');

    const result: AreaMeasurementResult = {
      method: 'floor-plan-upload',
      area: 92, // Simulated area from floor plan
      confidence: 0.85, // Lower confidence λόγω image processing
      floorPlanData: {
        originalImageUrl: '/uploads/floorplan-123.jpg',
        scale: 1.2, // meters per pixel
        calibrationPoints: [
          { pixel: [100, 100], realWorld: 3.5 }, // Room width
          { pixel: [250, 100], realWorld: 8.2 }  // Room length
        ]
      }
    };

    setIsProcessing(false);
    onMeasurementComplete(result);
  }, [onMeasurementComplete]);

  const handleAutoCalculate = useCallback(async () => {
    setIsProcessing(true);

    // Simulate OSM building detection
    // Στην πραγματικότητα εδώ θα γίνει κλήση στο OSM service
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('🤖 Auto-calculate via OSM simulation');

    const result: AreaMeasurementResult = {
      method: 'auto-calculate',
      area: 88, // Calculated from OSM building outline
      confidence: 0.78, // Moderate confidence λόγω OSM data accuracy
      osmData: {
        buildingId: 'way/123456789',
        confidence: 0.78,
        source: 'osm-outline'
      }
    };

    setIsProcessing(false);
    onMeasurementComplete(result);
  }, [onMeasurementComplete]);

  const renderMethodInterface = () => {
    switch (selectedMethod) {
      case 'manual-input':
        return (
          <BaseCard variant="neutral" padding="md">
            <Text size="sm" weight="bold" marginBottom="sm">
              Εισαγωγή Εμβαδού (τ.μ.)
            </Text>
            <input
              type="number"
              value={manualArea}
              onChange={(e) => setManualArea(parseFloat(e.target.value) || 0)}
              placeholder="π.χ. 85"
              style={{
                width: '100%',
                padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.SM}px`,
                fontSize: 'var(--layera-text-lg)',
                border: '1px solid var(--color-border-input)',
                borderRadius: `${SPACING_SCALE.XS + 2}px`,
                marginBottom: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`
              }}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleManualInputSubmit}
              style={{ width: '100%' }}
            >
              Αποθήκευση Εμβαδού
            </Button>
          </BaseCard>
        );

      case 'map-drawing':
        return (
          <BaseCard variant="info" padding="md">
            <Text size="sm" weight="bold" marginBottom="sm">
              Σχεδίαση στον Χάρτη
            </Text>
            <Text size="xs" marginBottom="sm" color="secondary">
              Κάντε κλικ στον χάρτη για να ξεκινήσετε τη σχεδίαση του πολυγώνου
            </Text>

            {/* Measurement Status */}
            <BaseCard
              variant={isDrawing ? "warning" : "success"}
              padding="sm"
              marginBottom="sm"
            >
              <Text size="xs">
                {isDrawing ?
                  `Σχεδίαση... (${points.length} σημεία${getCurrentArea() > 0 ? `, ${getCurrentArea().toFixed(1)} τ.μ.` : ''})` :
                  'Κάντε κλικ στον χάρτη για να ξεκινήσετε'
                }
              </Text>
            </BaseCard>

            {/* Drawing Controls */}
            <Stack spacing="sm">
              {isDrawing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelMeasurement}
                >
                  Ακύρωση Σχεδίασης
                </Button>
              )}

              {canFinish && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={finishMeasurement}
                >
                  Ολοκλήρωση Σχεδίασης
                </Button>
              )}
            </Stack>
          </BaseCard>
        );

      case 'floor-plan-upload':
        return (
          <BaseCard variant="warning" padding="md">
            <Text size="sm" weight="bold" marginBottom="sm">
              Φόρτωση Κάτοψης
            </Text>
            <Text size="xs" marginBottom="sm" color="secondary">
              Φορτώστε την κάτοψη και θα υπολογίσουμε αυτόματα το εμβαδόν
            </Text>
            <Button
              variant="primary"
              size="md"
              onClick={handleFloorPlanUpload}
              disabled={isProcessing}
              style={{ width: '100%' }}
            >
              {isProcessing ? 'Επεξεργασία...' : 'Φόρτωση Κάτοψης'}
            </Button>
          </BaseCard>
        );

      case 'auto-calculate':
        return (
          <BaseCard variant="info" padding="md">
            <Text size="sm" weight="bold" marginBottom="sm">
              Αυτόματος Υπολογισμός
            </Text>
            <Text size="xs" marginBottom="sm" color="secondary">
              Χρήση OpenStreetMap δεδομένων για αυτόματο υπολογισμό εμβαδού
            </Text>
            <Button
              variant="primary"
              size="md"
              onClick={handleAutoCalculate}
              disabled={isProcessing}
              style={{ width: '100%' }}
            >
              {isProcessing ? 'Υπολογισμός...' : 'Αυτόματος Υπολογισμός'}
            </Button>
          </BaseCard>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      padding: `${SPACING_SCALE.MD}px`,
      backgroundColor: 'var(--color-bg-canvas)',
      borderRadius: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
      border: '1px solid var(--color-border-default)',
      boxShadow: BOX_SHADOW_SCALE.cardDefault
    }}>
      <Stack spacing="md">
        {/* Header */}
        <BaseCard variant="neutral" padding="sm" style={{ textAlign: 'center' }}>
          <Text size="lg" weight="bold" color="primary">
            Μέτρηση Εμβαδού
          </Text>
          <Text size="sm" color="secondary" marginTop="xs">
            Μέθοδος: {selectedMethod === 'manual-input' ? 'Χειροκίνητη Εισαγωγή' :
                      selectedMethod === 'map-drawing' ? 'Σχεδίαση στον Χάρτη' :
                      selectedMethod === 'floor-plan-upload' ? 'Φόρτωση Κάτοψης' :
                      'Αυτόματος Υπολογισμός'}
          </Text>
        </BaseCard>

        {/* Method Interface */}
        {renderMethodInterface()}

        {/* Actions */}
        {onCancel && (
          <Button
            variant="outline"
            size="md"
            onClick={onCancel}
            marginTop="sm"
          >
            Επιστροφή στις Μεθόδους
          </Button>
        )}

        {/* Debug Info */}
        <BaseCard variant="neutral" padding="sm" marginTop="sm">
          <Text size="xs" weight="bold">Enterprise Area Measurement</Text>
          <Text size="xs" color="secondary">Selected Method: {selectedMethod}</Text>
          <Text size="xs" color="secondary">Property Type: {propertyType}</Text>
          {selectedMethod === 'map-drawing' && (
            <>
              <Text size="xs" color="secondary">Drawing State: {state}</Text>
              <Text size="xs" color="secondary">Points: {points.length}</Text>
              <Text size="xs" color="secondary">Current Area: {getCurrentArea().toFixed(2)} τ.μ.</Text>
            </>
          )}
        </BaseCard>
      </Stack>
    </div>
  );
};