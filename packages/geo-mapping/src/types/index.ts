/**
 * @layera/geo-mapping - Type definitions για OSM και boundary services
 */

/**
 * OSM Administrative Collection - GeoJSON format
 */
export interface OSMAdminCollection {
  type: 'FeatureCollection';
  features: OSMAdminFeature[];
}

/**
 * OSM Administrative Feature
 */
export interface OSMAdminFeature {
  type: 'Feature';
  properties: {
    name: string;
    admin_level: string;
    boundary: string;
    osm_id: number;
    osm_type: string;
  };
  geometry: GeoJSONGeometry;
}

/**
 * GeoJSON Geometry types
 */
export interface GeoJSONGeometry {
  type: 'Polygon' | 'MultiPolygon' | 'Point' | 'LineString';
  coordinates: number[][] | number[][][] | number[] | number[][][];
}

/**
 * Address Component για boundary search
 */
export interface AddressComponent {
  label: string;
  type: string;
}