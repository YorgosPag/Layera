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
import { Stack } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';
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
    mode,
    state,
    points,
    currentResult,
    addPoint,
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
          <div style={{
            padding: '16px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <Text size="sm" weight="bold" style={{ marginBottom: '8px' }}>
              Εισαγωγή Εμβαδού (τ.μ.)
            </Text>
            <input
              type="number"
              value={manualArea}
              onChange={(e) => setManualArea(parseFloat(e.target.value) || 0)}
              placeholder="π.χ. 85"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                marginBottom: '12px'
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
          </div>
        );

      case 'map-drawing':
        return (
          <div style={{
            padding: '16px',
            backgroundColor: '#f0f9ff',
            borderRadius: '8px',
            border: '1px solid #0ea5e9'
          }}>
            <Text size="sm" weight="bold" style={{ marginBottom: '8px' }}>
              Σχεδίαση στον Χάρτη
            </Text>
            <Text size="xs" style={{ marginBottom: '12px', color: '#64748b' }}>
              Κάντε κλικ στον χάρτη για να ξεκινήσετε τη σχεδίαση του πολυγώνου
            </Text>

            {/* Measurement Status */}
            <div style={{
              padding: '8px',
              backgroundColor: isDrawing ? '#fef3c7' : '#dcfce7',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              <Text size="xs">
                {isDrawing ?
                  `Σχεδίαση... (${points.length} σημεία${getCurrentArea() > 0 ? `, ${getCurrentArea().toFixed(1)} τ.μ.` : ''})` :
                  'Κάντε κλικ στον χάρτη για να ξεκινήσετε'
                }
              </Text>
            </div>

            {/* Drawing Controls */}
            <Stack spacing="sm">
              {isDrawing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelMeasurement}
                  style={{ fontSize: '12px' }}
                >
                  Ακύρωση Σχεδίασης
                </Button>
              )}

              {canFinish && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={finishMeasurement}
                  style={{ fontSize: '12px' }}
                >
                  Ολοκλήρωση Σχεδίασης
                </Button>
              )}
            </Stack>
          </div>
        );

      case 'floor-plan-upload':
        return (
          <div style={{
            padding: '16px',
            backgroundColor: '#fefce8',
            borderRadius: '8px',
            border: '1px solid #facc15'
          }}>
            <Text size="sm" weight="bold" style={{ marginBottom: '8px' }}>
              Φόρτωση Κάτοψης
            </Text>
            <Text size="xs" style={{ marginBottom: '12px', color: '#64748b' }}>
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
          </div>
        );

      case 'auto-calculate':
        return (
          <div style={{
            padding: '16px',
            backgroundColor: '#f3e8ff',
            borderRadius: '8px',
            border: '1px solid #a855f7'
          }}>
            <Text size="sm" weight="bold" style={{ marginBottom: '8px' }}>
              Αυτόματος Υπολογισμός
            </Text>
            <Text size="xs" style={{ marginBottom: '12px', color: '#64748b' }}>
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <Stack spacing="md">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <Text size="lg" weight="bold" style={{ color: '#1e293b' }}>
            Μέτρηση Εμβαδού
          </Text>
          <Text size="sm" style={{ color: '#64748b', marginTop: '4px' }}>
            Μέθοδος: {selectedMethod === 'manual-input' ? 'Χειροκίνητη Εισαγωγή' :
                      selectedMethod === 'map-drawing' ? 'Σχεδίαση στον Χάρτη' :
                      selectedMethod === 'floor-plan-upload' ? 'Φόρτωση Κάτοψης' :
                      'Αυτόματος Υπολογισμός'}
          </Text>
        </div>

        {/* Method Interface */}
        {renderMethodInterface()}

        {/* Actions */}
        {onCancel && (
          <Button
            variant="outline"
            size="md"
            onClick={onCancel}
            style={{
              fontSize: '14px',
              padding: '8px 16px',
              marginTop: '8px'
            }}
          >
            Επιστροφή στις Μεθόδους
          </Button>
        )}

        {/* Debug Info */}
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: '#f1f5f9',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#475569'
        }}>
          <Text size="xs" weight="bold">Enterprise Area Measurement</Text>
          <div>Selected Method: {selectedMethod}</div>
          <div>Property Type: {propertyType}</div>
          {selectedMethod === 'map-drawing' && (
            <>
              <div>Drawing State: {state}</div>
              <div>Points: {points.length}</div>
              <div>Current Area: {getCurrentArea().toFixed(2)} τ.μ.</div>
            </>
          )}
        </div>
      </Stack>
    </div>
  );
};