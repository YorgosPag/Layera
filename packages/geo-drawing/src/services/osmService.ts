/**
 * @layera/geo-drawing/services/osmService.ts
 *
 * BACKWARD COMPATIBILITY RE-EXPORTS
 * ===================================
 *
 * Αυτό το αρχείο παρέχει backward compatibility για το παλιό API.
 * Όλες οι OSM services έχουν μετακινηθεί στο @layera/geo-mapping package
 * ως μέρος της enterprise refactoring στρατηγικής.
 *
 * Enterprise Architecture Benefits:
 * - Separation of concerns: Drawing ≠ Data fetching
 * - Reusability: Άλλα packages μπορούν να χρησιμοποιήσουν OSM services
 * - Independent deployment: OSM services ενημερώνονται ανεξάρτητα
 * - Better testing: Isolated testing για mapping functionality
 *
 * MIGRATION PATH:
 * ==============
 *
 * ΠΑΛΙΟ (deprecated):
 * import { fetchBuildingOutlines } from '@layera/geo-drawing';
 *
 * ΝΕΟ (recommended):
 * import { fetchBuildingOutlines } from '@layera/geo-mapping';
 *
 * Αυτό το re-export θα διατηρηθεί για backward compatibility
 * μέχρι να ολοκληρωθεί η migration όλων των consumers.
 */

// Re-export all OSM services from the new dedicated package
export {
  fetchBuildingOutlines,
  fetchAdministrativeBoundary,
  fetchBoundaryByAddressComponent,
  clearOSMCache,
  getCacheSize,
  isBoundsCached,
  prefetchBuildingOutlines
} from '@layera/geo-mapping';