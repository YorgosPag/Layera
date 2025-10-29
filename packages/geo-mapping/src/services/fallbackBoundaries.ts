/**
 * @layera/geo-mapping - Fallback Boundaries Configuration
 *
 * Type-safe configuration για fallback polygons όταν το OSM API αποτυγχάνει.
 * ΚΑΜΙΑ χρήση any - TypeScript strict mode.
 */

import type { GeoJSONFeatureCollection } from '@layera/geo-core';

/**
 * Fallback boundary configuration
 */
interface FallbackBoundary {
  /** Unique keys για matching (μπορεί να περιέχει variations) */
  keys: string[];
  /** Display name για το boundary */
  name: string;
  /** Admin level από OSM */
  adminLevel: string;
  /** Polygon coordinates [lng, lat][] */
  coordinates: number[][];
}

/**
 * Type-safe fallback boundaries registry
 *
 * ΣΗΜΕΙΩΣΗ: Αυτό είναι προσωρινή λύση. Το σωστό είναι να διορθωθεί
 * το OSM API integration για καθολική υποστήριξη περιοχών.
 *
 * Μέχρι τότε, προσθέτουμε μόνο critical περιοχές εδώ.
 */
const FALLBACK_BOUNDARIES: FallbackBoundary[] = [
  // Θεσσαλονίκη - Κέντρο
  {
    keys: ['Θεσσαλονίκης', 'Thessaloniki', 'Θεσσαλονίκη'],
    name: 'Δήμος Θεσσαλονίκης',
    adminLevel: '8',
    coordinates: [
      // Simplified boundary για demo - στην πράξη θα χρειάζεται πλήρες polygon
      [22.9352, 40.6401], [22.9600, 40.6401], [22.9600, 40.6250],
      [22.9352, 40.6250], [22.9352, 40.6401]
    ]
  },

  // Μακεδονία regions
  {
    keys: ['Κεντρικής Μακεδονίας', 'Central Macedonia', 'Κεντρική Μακεδονία'],
    name: 'Περιφέρεια Κεντρικής Μακεδονίας',
    adminLevel: '4',
    coordinates: [
      // Simplified boundary για demo
      [22.0, 41.5], [24.5, 41.5], [24.5, 40.0],
      [22.0, 40.0], [22.0, 41.5]
    ]
  },

  // Αμπελόκηποι (existing)
  {
    keys: ['Αμπελοκήπων', 'Ampelokipon', 'Ампелокипон', 'Αμπελόκηποι'],
    name: 'Δημοτική Ενότητα Αμπελοκήπων',
    adminLevel: '8',
    coordinates: [
      [22.9166013, 40.6545235], [22.916378, 40.6548432], [22.9161263, 40.654913],
      [22.9159367, 40.6551479], [22.9157414, 40.6553883], [22.9155318, 40.655694],
      [22.9155987, 40.6558613], [22.9154793, 40.6562918], [22.915702, 40.6565594],
      [22.9150123, 40.6571562], [22.914356, 40.6575815], [22.9141897, 40.6577716],
      [22.913965, 40.6580476], [22.9137682, 40.6584715], [22.9130735, 40.6595013],
      [22.9146819, 40.6606645], [22.9195995, 40.6611276], [22.922064, 40.6603006],
      [22.9243559, 40.6589395], [22.928998, 40.6570252], [22.9316767, 40.6565356],
      [22.934234, 40.6567998], [22.9345673, 40.6568327], [22.9344419, 40.6563954],
      [22.9345299, 40.6555972], [22.9346904, 40.654914], [22.9352047, 40.6527174],
      [22.9342228, 40.6523744], [22.9341515, 40.651373], [22.9341167, 40.6510887],
      [22.9340592, 40.6505896], [22.9339901, 40.6498829], [22.9340715, 40.6493217],
      [22.9339464, 40.6484215], [22.9326998, 40.6484637], [22.931444, 40.6490899],
      [22.9313272, 40.6491772], [22.9303401, 40.6495824], [22.929558, 40.6496515],
      [22.9280302, 40.6497943], [22.9267611, 40.6494903], [22.9256199, 40.6492281],
      [22.9243866, 40.6489393], [22.9239727, 40.6488403], [22.9195478, 40.6508989],
      [22.919069, 40.6511528], [22.9186956, 40.651313], [22.9184825, 40.6514636],
      [22.9183194, 40.6516322], [22.9181684, 40.6518332], [22.9180779, 40.6520084],
      [22.9180263, 40.6522166], [22.9179568, 40.6523848], [22.9178432, 40.6525894],
      [22.9171589, 40.6536558], [22.9166013, 40.6545235]
    ]
  }
];

/**
 * Βρίσκει fallback boundary με βάση search terms
 */
export const findFallbackBoundary = (
  searchTerms: string[]
): GeoJSONFeatureCollection | null => {
  // Normalize search terms
  const normalizedSearchTerms = searchTerms
    .filter(term => term && typeof term === 'string')
    .map(term => term.toLowerCase().trim());

  // Αναζήτηση για matching boundary
  for (const boundary of FALLBACK_BOUNDARIES) {
    const matches = boundary.keys.some(key => {
      const normalizedKey = key.toLowerCase();
      return normalizedSearchTerms.some(searchTerm =>
        searchTerm.includes(normalizedKey) || normalizedKey.includes(searchTerm)
      );
    });

    if (matches) {
      return {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {
            name: boundary.name,
            admin_level: boundary.adminLevel,
            boundary: 'administrative'
          },
          geometry: {
            type: 'Polygon',
            coordinates: [boundary.coordinates]
          }
        }]
      };
    }
  }

  return null;
};

/**
 * Προσθέτει νέο fallback boundary
 */
export const addFallbackBoundary = (boundary: FallbackBoundary): void => {
  // Έλεγχος για duplicates
  const exists = FALLBACK_BOUNDARIES.some(b =>
    b.keys.some(key => boundary.keys.includes(key))
  );

  if (!exists) {
    FALLBACK_BOUNDARIES.push(boundary);
  }
};

/**
 * Επιστρέφει όλα τα διαθέσιμα fallback boundaries
 */
export const getAllFallbackBoundaries = (): readonly FallbackBoundary[] => {
  return FALLBACK_BOUNDARIES;
};

/**
 * Καθαρίζει όλα τα fallback boundaries (για testing)
 */
export const clearFallbackBoundaries = (): void => {
  FALLBACK_BOUNDARIES.length = 0;
};