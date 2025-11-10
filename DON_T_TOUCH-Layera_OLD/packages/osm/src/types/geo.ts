/**
 * @layera/osm - SSR-Safe Geographic Types
 *
 * Αυτόνομοι γεωγραφικοί τύποι που δεν εξαρτώνται από browser-specific libraries όπως Leaflet.
 * Κατάλληλοι για Server-Side Rendering (SSR) και cross-platform compatibility.
 *
 * Εμπνευσμένο από GeoJSON spec και enterprise GIS standards.
 */

/**
 * SSR-safe geographic point
 * Αντικαθιστά το L.LatLng από Leaflet
 */
export interface Point {
  readonly lat: number;
  readonly lng: number;
}

/**
 * SSR-safe bounding box
 * Αντικαθιστά το L.LatLngBounds από Leaflet
 */
export interface BBox {
  readonly south: number;
  readonly west: number;
  readonly north: number;
  readonly east: number;
}

/**
 * Geographic coordinate pair [longitude, latitude]
 * Ακολουθεί το GeoJSON standard
 */
export type Coordinate = readonly [number, number];

/**
 * Array of coordinates που σχηματίζει γραμμή ή ring
 */
export type CoordinateArray = readonly Coordinate[];

/**
 * Polygon ring (outer ή inner)
 */
export type Ring = CoordinateArray;

/**
 * Polygon με outer ring και optional holes
 */
export interface PolygonCoordinates {
  readonly outer: Ring;
  readonly holes?: readonly Ring[];
}

/**
 * Utility functions για γεωγραφικούς υπολογισμούς
 */
export namespace GeoUtils {
  /**
   * Δημιουργεί Point από lat/lng
   */
  export const point = (lat: number, lng: number): Point => ({ lat, lng });

  /**
   * Δημιουργεί BBox από coordinates
   */
  export const bbox = (south: number, west: number, north: number, east: number): BBox => ({
    south,
    west,
    north,
    east
  });

  /**
   * Μετατρέπει Point σε GeoJSON coordinate
   */
  export const pointToCoordinate = (point: Point): Coordinate => [point.lng, point.lat];

  /**
   * Μετατρέπει GeoJSON coordinate σε Point
   */
  export const coordinateToPoint = (coord: Coordinate): Point => ({
    lat: coord[1],
    lng: coord[0]
  });

  /**
   * Ελέγχει αν ένα Point είναι εντός BBox
   */
  export const pointInBBox = (point: Point, bbox: BBox): boolean => {
    return (
      point.lat >= bbox.south &&
      point.lat <= bbox.north &&
      point.lng >= bbox.west &&
      point.lng <= bbox.east
    );
  };

  /**
   * Υπολογίζει το κέντρο ενός BBox
   */
  export const bboxCenter = (bbox: BBox): Point => ({
    lat: (bbox.south + bbox.north) / 2,
    lng: (bbox.west + bbox.east) / 2
  });

  /**
   * Υπολογίζει το εμβαδόν ενός BBox σε τετραγωνικές μοίρες
   */
  export const bboxArea = (bbox: BBox): number => {
    return (bbox.north - bbox.south) * (bbox.east - bbox.west);
  };

  /**
   * Ελέγχει αν δύο BBox τέμνονται
   */
  export const bboxIntersects = (bbox1: BBox, bbox2: BBox): boolean => {
    return !(
      bbox1.east < bbox2.west ||
      bbox1.west > bbox2.east ||
      bbox1.north < bbox2.south ||
      bbox1.south > bbox2.north
    );
  };

  /**
   * Δημιουργεί το union δύο BBox
   */
  export const bboxUnion = (bbox1: BBox, bbox2: BBox): BBox => ({
    south: Math.min(bbox1.south, bbox2.south),
    west: Math.min(bbox1.west, bbox2.west),
    north: Math.max(bbox1.north, bbox2.north),
    east: Math.max(bbox1.east, bbox2.east)
  });

  /**
   * Ελέγχει αν ένα BBox είναι έγκυρο
   */
  export const isValidBBox = (bbox: BBox): boolean => {
    return (
      bbox.south <= bbox.north &&
      bbox.west <= bbox.east &&
      bbox.south >= -90 &&
      bbox.north <= 90 &&
      bbox.west >= -180 &&
      bbox.east <= 180
    );
  };

  /**
   * Normalizes longitude σε [-180, 180] range
   */
  export const normalizeLongitude = (lng: number): number => {
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;
    return lng;
  };

  /**
   * Normalizes latitude σε [-90, 90] range
   */
  export const normalizeLatitude = (lat: number): number => {
    return Math.max(-90, Math.min(90, lat));
  };

  /**
   * Υπολογίζει απόσταση μεταξύ δύο points σε μέτρα (Haversine formula)
   */
  export const distanceInMeters = (point1: Point, point2: Point): number => {
    const R = 6371000; // Earth radius σε μέτρα
    const dLat = toRadians(point2.lat - point1.lat);
    const dLng = toRadians(point2.lng - point1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(point1.lat)) *
        Math.cos(toRadians(point2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  /**
   * Converts degrees σε radians
   */
  export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  /**
   * Converts radians σε degrees
   */
  export const toDegrees = (radians: number): number => (radians * 180) / Math.PI;

  /**
   * Υπολογίζει bearing μεταξύ δύο points σε degrees
   */
  export const bearing = (point1: Point, point2: Point): number => {
    const dLng = toRadians(point2.lng - point1.lng);
    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    const bearingRad = Math.atan2(y, x);
    return (toDegrees(bearingRad) + 360) % 360;
  };

  /**
   * Δημιουργεί buffer γύρω από Point (απλό τετράγωνο)
   */
  export const pointBuffer = (point: Point, radiusMeters: number): BBox => {
    // Approximate conversion: 1 degree ≈ 111,000 meters
    const degreeRadius = radiusMeters / 111000;

    return {
      south: point.lat - degreeRadius,
      west: point.lng - degreeRadius,
      north: point.lat + degreeRadius,
      east: point.lng + degreeRadius
    };
  };

  /**
   * Formats coordinates για display
   */
  export const formatPoint = (point: Point, precision = 6): string => {
    return `${point.lat.toFixed(precision)}, ${point.lng.toFixed(precision)}`;
  };

  /**
   * Formats BBox για display
   */
  export const formatBBox = (bbox: BBox, precision = 4): string => {
    return `${bbox.south.toFixed(precision)},${bbox.west.toFixed(precision)},${bbox.north.toFixed(precision)},${bbox.east.toFixed(precision)}`;
  };
}

/**
 * Conversion utilities για compatibility με existing Leaflet code
 */
export namespace LeafletCompat {
  /**
   * Converts Leaflet LatLng σε Point
   */
  export const fromLatLng = (latlng: { lat: number; lng: number }): Point => ({
    lat: latlng.lat,
    lng: latlng.lng
  });

  /**
   * Converts Leaflet LatLngBounds σε BBox
   */
  export const fromLatLngBounds = (bounds: {
    getSouth(): number;
    getWest(): number;
    getNorth(): number;
    getEast(): number;
  }): BBox => ({
    south: bounds.getSouth(),
    west: bounds.getWest(),
    north: bounds.getNorth(),
    east: bounds.getEast()
  });

  /**
   * Converts Point σε Leaflet-compatible object
   */
  export const toLatLng = (point: Point): { lat: number; lng: number } => ({
    lat: point.lat,
    lng: point.lng
  });

  /**
   * Converts BBox σε Leaflet-compatible bounds
   */
  export const toLatLngBounds = (bbox: BBox): [[number, number], [number, number]] => [
    [bbox.south, bbox.west],
    [bbox.north, bbox.east]
  ];
}

/**
 * Constants για geographic operations
 */
export const GeoConstants = {
  /** Earth radius σε μέτρα */
  EARTH_RADIUS_METERS: 6371000,

  /** Earth circumference σε μέτρα */
  EARTH_CIRCUMFERENCE_METERS: 40075000,

  /** Approximate meters per degree στον ισημερινό */
  METERS_PER_DEGREE: 111000,

  /** WGS84 coordinate system limits */
  WGS84_BOUNDS: {
    south: -90,
    west: -180,
    north: 90,
    east: 180
  } as const,

  /** Typical zoom levels για mapping */
  ZOOM_LEVELS: {
    WORLD: 1,
    CONTINENT: 3,
    COUNTRY: 6,
    REGION: 8,
    CITY: 10,
    DISTRICT: 13,
    STREET: 16,
    BUILDING: 18
  } as const
} as const;