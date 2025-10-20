/**
 * @layera/geo-mapping
 *
 * OSM services, administrative boundaries, και external mapping APIs.
 * Enterprise Architecture: Business Domain Layer
 *
 * Depends on: @layera/geo-core, @layera/constants
 * Used by: @layera/geo-drawing, @layera/search-module, @layera/map-module
 */

// OSM Services
export {
  fetchBuildingOutlines,
  fetchAdministrativeBoundary,
  fetchBoundaryByAddressComponent,
  clearOSMCache,
  getCacheSize,
  isBoundsCached,
  prefetchBuildingOutlines
} from './services/osmService';

// Package metadata
export const GEO_MAPPING_VERSION = '1.0.0';
export const GEO_MAPPING_NAME = '@layera/geo-mapping';