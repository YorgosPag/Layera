import type { GeometryType } from './geometry.types';

/**
 * Standard GeoJSON Geometry interface
 */
export interface GeoJSONGeometry {
  type: GeometryType;
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

/**
 * Generic GeoJSON Feature properties
 */
export interface GeoJSONProperties {
  [key: string]: unknown;
}

/**
 * Standard GeoJSON Feature interface
 */
export interface GeoJSONFeature<T extends GeoJSONProperties = GeoJSONProperties> {
  type: 'Feature';
  geometry: GeoJSONGeometry;
  properties: T;
  id?: string | number;
}

/**
 * Standard GeoJSON FeatureCollection interface
 */
export interface GeoJSONFeatureCollection<T extends GeoJSONProperties = GeoJSONProperties> {
  type: 'FeatureCollection';
  features: GeoJSONFeature<T>[];
}

/**
 * OSM Building specific properties
 */
export interface OSMBuildingProperties extends GeoJSONProperties {
  /** OSM building type */
  building?: string;
  /** Building name αν υπάρχει */
  name?: string;
  /** Building height σε meters */
  height?: number;
  /** Building levels */
  'building:levels'?: number;
  /** Address information */
  'addr:street'?: string;
  'addr:housenumber'?: string;
  'addr:city'?: string;
  'addr:postcode'?: string;
}

/**
 * OSM Administrative boundary properties
 */
export interface OSMAdminProperties extends GeoJSONProperties {
  /** Administrative level (1-10) */
  admin_level?: string;
  /** Name in Greek */
  'name:el'?: string;
  /** Name in English */
  'name:en'?: string;
  /** Default name */
  name?: string;
  /** Boundary type */
  boundary?: string;
  /** Place type */
  place?: string;
  /** ISO code for countries/regions */
  'ISO3166-1'?: string;
  'ISO3166-2'?: string;
}

/**
 * Typed GeoJSON Feature για buildings
 */
export type OSMBuildingFeature = GeoJSONFeature<OSMBuildingProperties>;

/**
 * Typed GeoJSON Feature για administrative boundaries
 */
export type OSMAdminFeature = GeoJSONFeature<OSMAdminProperties>;

/**
 * Typed FeatureCollection για buildings
 */
export type OSMBuildingCollection = GeoJSONFeatureCollection<OSMBuildingProperties>;

/**
 * Typed FeatureCollection για administrative boundaries
 */
export type OSMAdminCollection = GeoJSONFeatureCollection<OSMAdminProperties>;