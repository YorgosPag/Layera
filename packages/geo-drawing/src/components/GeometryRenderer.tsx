import React, { useMemo } from 'react';
import { Polygon, Polyline, CircleMarker, Popup } from 'react-leaflet';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import L from 'leaflet';
import { useTheme } from '@layera/theme-switcher';
import { Typography } from '@layera/typography';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import type { MeasurementResult, OSMBuildingFeature } from '../types';
import { extractOSMGeometry } from '../utils/geometry';
import './GeometryRenderer.css';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();

  // Get theme-aware colors
  const colors = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      // Measurement colors
      measurementLine: isDark ? 'var(--la-color-success)' : 'var(--la-color-success-dark)',
      measurementFill: isDark ? 'rgba(var(--la-color-success-rgb), 0.2)' : 'rgba(var(--la-color-success-rgb), 0.2)',
      measurementPoint: isDark ? 'var(--la-color-warning)' : 'var(--la-color-warning-dark)',

      // OSM building colors
      buildingLine: isDark ? 'var(--la-text-secondary)' : 'var(--la-text-muted)',
      buildingFill: isDark ? 'rgba(var(--la-color-gray-rgb), 0.1)' : 'rgba(var(--la-color-gray-rgb), 0.1)',
      buildingHover: isDark ? 'var(--la-color-gray-dark)' : 'var(--la-color-border-light)',

      // Border colors
      border: isDark ? 'var(--la-text-primary)' : 'var(--la-color-surface)'
    };
  }, [theme]);

  // Render OSM building outlines
  const renderOSMBuildings = (): void => {
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
              mouseover: (e: React.FormEvent<HTMLFormElement>) => {
                e.target.setStyle({
                  fillColor: colors.buildingHover,
                  fillOpacity: 0.3
                });
              },
              mouseout: (e: React.FormEvent<HTMLFormElement>) => {
                e.target.setStyle({
                  fillColor: colors.buildingFill,
                  fillOpacity: 0.1
                });
              }
            }}
          >
            {feature.properties.name && (
              <Popup>
                <Box>
                  <Typography variant="subtitle" className="font-semibold">
                    {feature.properties.name}
                  </Typography>
                  {feature.properties.building && (
                    <Typography variant="caption" className="layera-geo-text-muted">
                      {t('geo-drawing.building-type')}: {feature.properties.building}
                    </Typography>
                  )}
                  {feature.properties['addr:street'] && (
                    <Typography variant="caption" className="layera-geo-text-muted">
                      {feature.properties['addr:street']} {feature.properties['addr:housenumber']}
                    </Typography>
                  )}
                </Box>
              </Popup>
            )}
          </Polygon>
        );
      });
    });
  };

  // Render measurement results
  const renderMeasurements = (): void => {
    if (!showMeasurements || measurements.length === 0) return null;

    return measurements.map((measurement: unknown) => {
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
                <Box>
                  <Typography variant="subtitle" className="font-semibold">
                    {t('geo-drawing.point-info', { index: index + 1 })}
                  </Typography>
                  <Typography variant="caption">
                    {point.latlng.lat.toFixed(6)}, {point.latlng.lng.toFixed(6)}
                  </Typography>
                </Box>
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
                <Box>
                  <Typography variant="subtitle" className="font-semibold">
                    {t(`geo-drawing.modes.${measurement.type}`)}
                  </Typography>
                  <Typography variant="body">
                    {measurement.displayValue}
                  </Typography>
                  <Typography variant="caption" className="layera-geo-text-muted">
                    {new Date(measurement.timestamp).toLocaleString()}
                  </Typography>
                </Box>
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
                <Box>
                  <Typography variant="subtitle" className="font-semibold">
                    {t('geo-drawing.area-measurement')}
                  </Typography>
                  <Typography variant="body">
                    {measurement.area && formatAreaWithLabels(measurement.area)}
                  </Typography>
                  <Typography variant="caption" className="layera-geo-text-muted">
                    {t('geo-drawing.points-count', { count: measurement.points.length })}
                  </Typography>
                </Box>
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