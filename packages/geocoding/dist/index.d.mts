/**
 * @layera/geocoding - Enterprise Geocoding Types
 * Μοναδική πηγή αλήθειας για location search functionality
 */
interface GeocodeRequest {
    /** Αναζήτηση στη μορφή "οδό αριθμό τ.κ και πόλη ή περιοχή" */
    query: string;
    /** Περιορισμός σε συγκεκριμένη χώρα */
    countryCode?: string;
    /** Μέγιστος αριθμός αποτελεσμάτων */
    limit?: number;
    /** Προτιμώμενη γλώσσα για αποτελέσματα */
    language?: 'el' | 'en';
    /** Structured search parameters (Nominatim advanced) */
    structured?: {
        /** Όνομα οδού */
        street?: string;
        /** Πόλη */
        city?: string;
        /** Ταχυδρομικός κώδικας */
        postalcode?: string;
        /** Περιοχή/Νομός */
        state?: string;
        /** Χώρα */
        country?: string;
        /** Τύπος τοποθεσίας (π.χ. amenity, shop) */
        amenity?: string;
    };
    /** Bounding box για περιορισμό αναζήτησης [west,south,east,north] */
    viewbox?: [number, number, number, number];
    /** Περιορισμός αποτελεσμάτων μέσα στο viewbox */
    bounded?: boolean;
    /** Εξαίρεση place IDs από τα αποτελέσματα */
    excludePlaceIds?: number[];
    /** Επιστροφή polygon boundaries */
    polygonGeoJSON?: boolean;
    /** Επιστροφή address breakdown */
    addressDetails?: boolean;
    /** Επιπλέον tags για φιλτράρισμα (π.χ. tourism=hotel) */
    extraTags?: boolean;
    /** Name details σε πολλές γλώσσες */
    nameDetails?: boolean;
}
interface GeocodeCoordinates {
    /** Γεωγραφικό πλάτος */
    latitude: number;
    /** Γεωγραφικό μήκος */
    longitude: number;
}
interface GeocodeResult {
    /** Μοναδικό αναγνωριστικό αποτελέσματος */
    id: string;
    /** Πλήρης διεύθυνση που επιστράφηκε */
    displayName: string;
    /** Συντεταγμένες τοποθεσίας */
    coordinates: GeocodeCoordinates;
    /** Επίπεδο ακρίβειας αποτελέσματος */
    accuracy: 'exact' | 'street' | 'city' | 'region' | 'interpolated';
    /** Λεπτομερή στοιχεία διεύθυνσης */
    address: {
        /** Όνομα οδού */
        street?: string;
        /** Αριθμός οδού */
        houseNumber?: string;
        /** Ταχυδρομικός κώδικας */
        postalCode?: string;
        /** Πόλη */
        city?: string;
        /** Περιοχή/Δήμος */
        region?: string;
        /** Χώρα */
        country?: string;
        /** Suburb/Neighborhood */
        suburb?: string;
        /** Village */
        village?: string;
        /** Town */
        town?: string;
        /** County */
        county?: string;
    };
    /** Επιπλέον metadata */
    metadata: {
        /** Πηγή δεδομένων */
        source: string;
        /** Βαθμολογία εμπιστοσύνης (0-1) */
        confidence: number;
        /** OSM type (node, way, relation) */
        osmType?: string;
        /** OSM ID */
        osmId?: number;
        /** OSM class (place, highway, etc) */
        class?: string;
        /** OSM type detail (city, residential, etc) */
        type?: string;
        /** Importance score */
        importance?: number;
        /** License info */
        licence?: string;
    };
    /** Polygon boundary geometry (αν ζητηθεί) */
    geometry?: {
        type: 'Polygon' | 'MultiPolygon';
        coordinates: number[][][] | number[][][][];
    };
    /** Bounding box [south, north, west, east] */
    boundingBox?: [number, number, number, number];
    /** Extra tags από OSM */
    extraTags?: Record<string, string>;
    /** Name σε διάφορες γλώσσες */
    nameDetails?: Record<string, string>;
}
interface GeocodeResponse {
    /** Λίστα αποτελεσμάτων */
    results: GeocodeResult[];
    /** Συνολικός αριθμός αποτελεσμάτων */
    total: number;
    /** Αρχικό query */
    query: string;
    /** Κατάσταση απόκρισης */
    status: 'success' | 'error' | 'no_results';
    /** Μήνυμα σφάλματος αν υπάρχει */
    error?: string;
}
interface GeocodeProvider {
    /** Όνομα provider */
    name: string;
    /** Μέθοδος αναζήτησης */
    search: (request: GeocodeRequest) => Promise<GeocodeResponse>;
    /** Reverse geocoding από συντεταγμένες */
    reverse?: (coordinates: GeocodeCoordinates, options?: ReverseGeocodeOptions) => Promise<GeocodeResult | null>;
    /** Batch geocoding για πολλαπλές διευθύνσεις */
    batch?: (requests: GeocodeRequest[]) => Promise<GeocodeResponse[]>;
    /** Address interpolation για διευθύνσεις που λείπουν */
    interpolate?: (street: string, houseNumber: string) => Promise<GeocodeResult | null>;
    /** Autocomplete suggestions */
    suggest?: (partial: string, options?: SuggestOptions) => Promise<string[]>;
    /** Έλεγχος διαθεσιμότητας */
    isAvailable: () => boolean;
}
interface ReverseGeocodeOptions {
    /** Zoom level για detail (3=country, 10=city, 18=building) */
    zoom?: number;
    /** Προτιμώμενη γλώσσα */
    language?: 'el' | 'en';
    /** Επιστροφή address details */
    addressDetails?: boolean;
}
interface SuggestOptions {
    /** Μέγιστος αριθμός προτάσεων */
    limit?: number;
    /** Περιορισμός σε χώρα */
    countryCode?: string;
    /** Focus point για proximity ranking */
    focus?: GeocodeCoordinates;
}
interface UseGeocodeOptions {
    /** Provider που θα χρησιμοποιηθεί */
    provider?: GeocodeProvider;
    /** Debounce delay σε ms */
    debounceMs?: number;
    /** Auto-search όταν αλλάζει το query */
    autoSearch?: boolean;
    /** Callback όταν επιλέγεται αποτέλεσμα */
    onSelect?: (result: GeocodeResult) => void;
}
interface UseGeocodeReturn {
    /** Τρέχον query */
    query: string;
    /** Λίστα αποτελεσμάτων */
    results: GeocodeResult[];
    /** Κατάσταση loading */
    isLoading: boolean;
    /** Κατάσταση σφάλματος */
    error: string | null;
    /** Επιλεγμένο αποτέλεσμα */
    selectedResult: GeocodeResult | null;
    /** Actions */
    actions: {
        /** Ενημέρωση query */
        setQuery: (query: string) => void;
        /** Εκτέλεση αναζήτησης */
        search: (query?: string) => Promise<void>;
        /** Επιλογή αποτελέσματος */
        selectResult: (result: GeocodeResult) => void;
        /** Καθαρισμός αποτελεσμάτων */
        clear: () => void;
    };
}

/**
 * @layera/geocoding - useGeocode Hook
 * Enterprise React hook για location search functionality
 */

declare function useGeocode(options?: UseGeocodeOptions): UseGeocodeReturn;

/**
 * @layera/geocoding - Nominatim Provider with Advanced Features
 * Full-featured OpenStreetMap geocoding service
 */

/**
 * Enhanced Nominatim Provider with all advanced features
 */
declare const nominatimProvider: GeocodeProvider;

/**
 * @layera/geocoding
 * Enterprise geocoding and location search services for the Layera platform
 * Μοναδική πηγή αλήθειας για location search functionality
 */

declare const LAYERA_GEOCODING_VERSION = "1.0.0";

export { type GeocodeCoordinates, type GeocodeProvider, type GeocodeRequest, type GeocodeResponse, type GeocodeResult, LAYERA_GEOCODING_VERSION, type ReverseGeocodeOptions, type SuggestOptions, type UseGeocodeOptions, type UseGeocodeReturn, nominatimProvider, useGeocode };
