/**
 * @layera/address-breakdown - Types για interactive address breakdown
 */

import type React from 'react';

// Temporarily inline GeocodeResult to avoid build dependency issues
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
 * Parsed address component με metadata
 */
export interface AddressComponent {
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
export interface AddressBreakdownConfig {
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
export interface AddressBreakdownCardProps {
  /** GeocodeResult από το @layera/geocoding */
  geocodeResult: GeocodeResult;
  /** Configuration options */
  config?: Partial<AddressBreakdownConfig>;
  /** Custom title για την κάρτα - δέχεται JSX */
  title?: React.ReactNode;
  /** Click handler για ολόκληρη την κάρτα */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Custom styling για την κάρτα */
  style?: React.CSSProperties;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
}

/**
 * Event που στέλνεται όταν γίνεται κλικ για boundary visualization
 */
export interface BoundaryVisualizationEvent {
  /** Τύπος event */
  type: 'showBoundary';
  /** Component details */
  component: AddressComponent;
  /** Original geocode result */
  geocodeResult: GeocodeResult;
}

/**
 * Return type για το useAddressBreakdown hook
 */
export interface UseAddressBreakdownReturn {
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
    parseGeocodeResult: (result: GeocodeResult) => AddressComponent[];
  };
}