import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * @layera/address-breakdown - Types για interactive address breakdown
 */
interface Coordinates$1 {
    latitude: number;
    longitude: number;
}
interface Address$1 {
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    region?: string;
    country?: string;
}
interface GeocodeResult$1 {
    id: string;
    displayName: string;
    coordinates: Coordinates$1;
    accuracy: string;
    address: Address$1;
}
/**
 * Parsed address component με metadata
 */
interface AddressComponent {
    /** Unique ID για το component */
    id: string;
    /** Το κείμενο που θα εμφανίζεται */
    label: string;
    /** Τύπος του component */
    type: 'street' | 'houseNumber' | 'postalCode' | 'city' | 'region' | 'country' | 'custom';
    /** Αν είναι clickable για boundary search */
    clickable: boolean;
    /** Original value από το geocoding result */
    value?: string;
    /** CSS classes για styling */
    className?: string;
}
/**
 * Configuration για το AddressBreakdownCard
 */
interface AddressBreakdownConfig {
    /** Εμφάνιση ως λίστα ή inline tags */
    layout: 'list' | 'tags';
    /** Ενεργοποίηση boundary search */
    enableBoundarySearch: boolean;
    /** Maximum components να εμφανίσει */
    maxComponents?: number;
    /** Custom styling */
    className?: string;
    /** Callback όταν γίνεται κλικ σε component */
    onComponentClick?: (component: AddressComponent) => void;
}
/**
 * Props για το AddressBreakdownCard component
 */
interface AddressBreakdownCardProps {
    /** GeocodeResult από το @layera/geocoding */
    geocodeResult: GeocodeResult$1;
    /** Configuration options */
    config?: Partial<AddressBreakdownConfig>;
    /** Custom title για την κάρτα */
    title?: string;
    /** Loading state */
    isLoading?: boolean;
    /** Error state */
    error?: string | null;
}
/**
 * Event που στέλνεται όταν γίνεται κλικ για boundary visualization
 */
interface BoundaryVisualizationEvent {
    /** Τύπος event */
    type: 'showBoundary';
    /** Component details */
    component: AddressComponent;
    /** Original geocode result */
    geocodeResult: GeocodeResult$1;
}
/**
 * Return type για το useAddressBreakdown hook
 */
interface UseAddressBreakdownReturn {
    /** Parsed components */
    components: AddressComponent[];
    /** Config που χρησιμοποιείται */
    config: AddressBreakdownConfig;
    /** Loading state για boundary search */
    isBoundaryLoading: boolean;
    /** Error για boundary search */
    boundaryError: string | null;
    /** Actions */
    actions: {
        /** Click handler για component */
        handleComponentClick: (component: AddressComponent) => Promise<void>;
        /** Parse νέο geocode result */
        parseGeocodeResult: (result: GeocodeResult$1) => AddressComponent[];
    };
}

/**
 * AddressBreakdownCard Component
 *
 * Μετατρέπει το displayName από geocoding σε structured, clickable λίστα
 * Όταν κάνεις κλικ σε administrative area → δείχνει το boundary στο χάρτη
 */
declare function AddressBreakdownCard({ geocodeResult, config, title, isLoading, error }: AddressBreakdownCardProps): react_jsx_runtime.JSX.Element;

/**
 * Address parsing utilities που χρησιμοποιούν το @layera/geocoding
 */
interface Coordinates {
    latitude: number;
    longitude: number;
}
interface Address {
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    region?: string;
    country?: string;
}
interface GeocodeResult {
    id: string;
    displayName: string;
    coordinates: Coordinates;
    accuracy: string;
    address: Address;
}

/**
 * Parse ένα GeocodeResult σε clickable AddressComponents
 * Χρησιμοποιεί τα parsed fields από το geocoding αντί να κάνει custom parsing
 */
declare function parseGeocodeToComponents(result: GeocodeResult): AddressComponent[];
/**
 * Parse το displayName σε επιπλέον components που δεν υπάρχουν στο parsed address
 * Useful για περιπτώσεις όπως "Μητροπολιτική Ενότητα Θεσσαλονίκης" που δεν είναι στο address object
 */
declare function parseDisplayNameToAdditionalComponents(result: GeocodeResult, existingComponents: AddressComponent[]): AddressComponent[];
/**
 * Combine parsed address components με additional components από το displayName
 */
declare function parseFullAddress(result: GeocodeResult): AddressComponent[];

export { AddressBreakdownCard, type AddressBreakdownCardProps, type AddressBreakdownConfig, type AddressComponent, type BoundaryVisualizationEvent, type UseAddressBreakdownReturn, parseDisplayNameToAdditionalComponents, parseFullAddress, parseGeocodeToComponents };
