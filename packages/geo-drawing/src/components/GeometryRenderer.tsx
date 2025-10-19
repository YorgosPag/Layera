import React, { useMemo } from 'react';
import { Polygon, Polyline, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@layera/theme-switcher';
import { Typography } from '@layera/typography';
import { useLayeraTranslation } from '@layera/i18n';
import type { MeasurementResult, OSMBuildingFeature } from '../types';
import { extractOSMGeometry } from '../utils/geometry';
import { useMeasurementFormatter } from '../utils/formatters';

interface GeometryRendererProps {
  measurements?: MeasurementResult[];
  osmFeatures?: OSMBuildingFeature[];
  showOSMBuildings?: boolean;
  showMeasurements?: boolean;
  onMeasurementClick?: (measurement: MeasurementResult) => void;
  onBuildingClick?: (feature: OSMBuildingFeature) => void;
}

/**
 * Renders various geometric elements on the map
 * Υποστηρίζει measurement results και OSM building outlines
 */
export const GeometryRenderer: React.FC<GeometryRendererProps> = ({
  measurements = [],
  osmFeatures = [],
  showOSMBuildings = true,
  showMeasurements = true,
  onMeasurementClick,
  onBuildingClick
}) => {
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();

  // Get theme-aware colors
  const colors = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      // Measurement colors
      measurementLine: isDark ? '#10b981' : '#059669',
      measurementFill: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.2)',
      measurementPoint: isDark ? '#f59e0b' : '#d97706',

      // OSM building colors
      buildingLine: isDark ? '#6b7280' : '#9ca3af',
      buildingFill: isDark ? 'rgba(107, 114, 128, 0.1)' : 'rgba(156, 163, 175, 0.1)',
      buildingHover: isDark ? '#374151' : '#d1d5db',

      // Border colors
      border: isDark ? '#1f2937' : '#ffffff'
    };
  }, [theme]);

  // Render OSM building outlines
  const renderOSMBuildings = () => {
    if (!showOSMBuildings || osmFeatures.length === 0) return null;

    return osmFeatures.map((feature, index) => {
      const polygons = extractOSMGeometry(feature);

      return polygons.map((polygon, polygonIndex) => {
        const key = `building-${index}-${polygonIndex}`;

        return (
          <Polygon
            key={key}
            positions={polygon}
            pathOptions={{
              color: colors.buildingLine,
              fillColor: colors.buildingFill,
              fillOpacity: 0.1,
              weight: 1,
              opacity: 0.6
            }}
            eventHandlers={{
              click: () => onBuildingClick?.(feature),
              mouseover: (e) => {
                e.target.setStyle({
                  fillColor: colors.buildingHover,
                  fillOpacity: 0.3
                });
              },
              mouseout: (e) => {
                e.target.setStyle({
                  fillColor: colors.buildingFill,
                  fillOpacity: 0.1
                });
              }
            }}
          >
            {feature.properties.name && (
              <Popup>
                <div>
                  <Typography variant="subtitle" className="font-semibold">
                    {feature.properties.name}
                  </Typography>
                  {feature.properties.building && (
                    <Typography variant="caption" className="text-gray-600">
                      {t('geo-drawing.building-type')}: {feature.properties.building}
                    </Typography>
                  )}
                  {feature.properties['addr:street'] && (
                    <Typography variant="caption" className="text-gray-600">
                      {feature.properties['addr:street']} {feature.properties['addr:housenumber']}
                    </Typography>
                  )}
                </div>
              </Popup>
            )}
          </Polygon>
        );
      });
    });
  };

  // Render measurement results
  const renderMeasurements = () => {
    if (!showMeasurements || measurements.length === 0) return null;

    return measurements.map((measurement) => {
      const latlngs = measurement.points.map(p => p.latlng);
      const key = `measurement-${measurement.timestamp}`;

      return (
        <React.Fragment key={key}>
          {/* Render measurement points */}
          {measurement.points.map((point, index) => (
            <CircleMarker
              key={`${key}-point-${index}`}
              center={point.latlng}
              radius={5}
              pathOptions={{
                color: colors.border,
                fillColor: colors.measurementPoint,
                fillOpacity: 1,
                weight: 2
              }}
              eventHandlers={{
                click: () => onMeasurementClick?.(measurement)
              }}
            >
              <Popup>
                <div>
                  <Typography variant="subtitle" className="font-semibold">
                    {t('geo-drawing.point-info', { index: index + 1 })}
                  </Typography>
                  <Typography variant="caption">
                    {point.latlng.lat.toFixed(6)}, {point.latlng.lng.toFixed(6)}
                  </Typography>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Render lines for distance/area measurements */}
          {((measurement.type === 'distance' || measurement.type === 'area') && latlngs.length >= 2) && (
            <Polyline
              positions={latlngs}
              pathOptions={{
                color: colors.measurementLine,
                weight: 3,
                opacity: 0.8
              }}
              eventHandlers={{
                click: () => onMeasurementClick?.(measurement)
              }}
            >
              <Popup>
                <div>
                  <Typography variant="subtitle" className="font-semibold">
                    {t(`geo-drawing.modes.${measurement.type}`)}
                  </Typography>
                  <Typography variant="body">
                    {measurement.displayValue}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {new Date(measurement.timestamp).toLocaleString()}
                  </Typography>
                </div>
              </Popup>
            </Polyline>
          )}

          {/* Render polygon fill for area measurements */}
          {(measurement.type === 'area' && latlngs.length >= 3) && (
            <Polygon
              positions={latlngs}
              pathOptions={{
                color: colors.measurementLine,
                fillColor: colors.measurementFill,
                fillOpacity: 0.3,
                weight: 2
              }}
              eventHandlers={{
                click: () => onMeasurementClick?.(measurement)
              }}
            >
              <Popup>
                <div>
                  <Typography variant="subtitle" className="font-semibold">
                    {t('geo-drawing.area-measurement')}
                  </Typography>
                  <Typography variant="body">
                    {measurement.area && formatAreaWithLabels(measurement.area)}
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {t('geo-drawing.points-count', { count: measurement.points.length })}
                  </Typography>
                </div>
              </Popup>
            </Polygon>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {renderOSMBuildings()}
      {renderMeasurements()}
    </>
  );
};