/**
 * @layera/geocoding - Enterprise Geocoding Types
 * Μοναδική πηγή αλήθειας για location search functionality
 */

export interface GeocodeRequest {
  /** Αναζήτηση στη μορφή "οδό αριθμό τ.κ και πόλη ή περιοχή" */
  query: string;
  /** Περιορισμός στην Ελλάδα για καλύτερα αποτελέσματα */
  countryCode?: 'GR';
  /** Μέγιστος αριθμός αποτελεσμάτων */
  limit?: number;
  /** Προτιμώμενη γλώσσα για αποτελέσματα */
  language?: 'el' | 'en';
}

export interface GeocodeCoordinates {
  /** Γεωγραφικό πλάτος */
  latitude: number;
  /** Γεωγραφικό μήκος */
  longitude: number;
}

export interface GeocodeResult {
  /** Μοναδικό αναγνωριστικό αποτελέσματος */
  id: string;
  /** Πλήρης διεύθυνση που επιστράφηκε */
  displayName: string;
  /** Συντεταγμένες τοποθεσίας */
  coordinates: GeocodeCoordinates;
  /** Επίπεδο ακρίβειας αποτελέσματος */
  accuracy: 'exact' | 'street' | 'city' | 'region';
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
  };
  /** Επιπλέον metadata */
  metadata: {
    /** Πηγή δεδομένων */
    source: string;
    /** Βαθμολογία εμπιστοσύνης (0-1) */
    confidence: number;
  };
}

export interface GeocodeResponse {
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

export interface GeocodeProvider {
  /** Όνομα provider */
  name: string;
  /** Μέθοδος αναζήτησης */
  search: (request: GeocodeRequest) => Promise<GeocodeResponse>;
  /** Έλεγχος διαθεσιμότητας */
  isAvailable: () => boolean;
}

export interface UseGeocodeOptions {
  /** Provider που θα χρησιμοποιηθεί */
  provider?: GeocodeProvider;
  /** Debounce delay σε ms */
  debounceMs?: number;
  /** Auto-search όταν αλλάζει το query */
  autoSearch?: boolean;
  /** Callback όταν επιλέγεται αποτέλεσμα */
  onSelect?: (result: GeocodeResult) => void;
}

export interface UseGeocodeReturn {
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