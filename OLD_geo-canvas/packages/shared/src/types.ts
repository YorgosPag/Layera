import L from 'leaflet';

export type LayerType = 'dxf' | 'raster' | 'geometry';
export type ListingCategory = 'property' | 'job';
export type ListingIntent = 'offer' | 'search';
export type TransactionType = 'sale' | 'rent';
export type EmploymentType = 'full_time' | 'part_time' | 'freelance' | 'seasonal';
export type Availability = 'now' | 'future';
export type DrawingShape = 'polygon' | 'marker';
export type ActiveView = 'map' | 'dashboard';

export interface UploadedPhoto {
    id: string;
    previewUrl: string;
    description: string;
    file: File; // The original (or compressed) file object
}

export interface ImportedLayer {
    id:string;
    name: string;
    type: LayerType;
    data: ArrayBuffer | null; // Null for geometry layers
    bounds: L.LatLngBounds | null;
    isVisible: boolean;
    opacity: number;
    rotation?: number;
    hasBackground?: boolean;
    intrinsicWidth?: number;
    intrinsicHeight?: number;
    geometry?: GeoJSONFeature | null; // For user-drawn shapes
    // --- Enriched Data ---
    category?: ListingCategory;
    intent?: ListingIntent;
    transactionType?: TransactionType;
    employmentType?: EmploymentType;
    availability?: Availability;
    details?: Partial<ListingDetails & JobDetails & {
        availabilityDate?: string | null;
        availabilityDuration?: number | null;
        availabilityDurationUnit?: 'months' | 'years' | null;
    }>;
    createdAt: string; // ISO 8601 date string
}

// GeoJSON types
export interface GeoJSONFeature {
    type: 'Feature';
    geometry: {
        type: 'Polygon' | 'MultiPolygon' | 'LineString' | 'Point' | string;
        coordinates: any;
    };
    properties: any;
}

export interface GeoJSONFeatureCollection {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
}

export interface JobDetails {
    jobTitle: string;
    company: string;
    employmentType: EmploymentType | '';
    salary: number | '';
    description: string;
    proximityPreference?: boolean;
    proximityRadius?: number; // in kilometers
}

export interface ListingDetails {
    price: number | '';
    area: number | '';
    propertyType: 'apartment' | 'house' | 'maisonette' | 'studio' | 'business' | '';
    bedrooms: number | '';
    bathrooms: number | '';
    wc: number | '';
    floor: 'ground' | '1' | '2' | '3' | '4+' | '';
    totalFloors: number | '';
    constructionYear: number | '';
    condition: 'new' | 'renovated' | 'good' | 'needs_renovation' | '';
    heating: 'autonomous_petrol' | 'autonomous_gas' | 'central_petrol' | 'central_gas' | 'ac' | 'none' | '';
    parking: 'closed' | 'open' | 'none' | '';
    amenities: {
        storage: boolean;
        fireplace: boolean;
        elevator: boolean;
        balcony: boolean;
        garden: boolean;
        securityDoor: boolean;
        alarm: boolean;
    };
    description: string;
    photos: UploadedPhoto[];
}

export interface DrawingState {
    isActive: boolean;
    shape: DrawingShape | null;
    points: L.LatLng[];
    radius: number | null; // Radius in meters for 'marker' shape
    isFinished: boolean;
}

export interface WizardState {
    isActive: boolean;
    step: 'category' | 'intent' | 'transactionType' | 'employmentType' | 'availability' | 'availabilityDetails' | 'location' | 'details' | 'complete';
    category: ListingCategory | null;
    intent: ListingIntent | null;
    transactionType: TransactionType | null;
    employmentType: EmploymentType | null;
    availability: Availability | null;
    availabilityDate: string | null; // e.g., '2024-12-31'
    availabilityDuration: number | null;
    availabilityDurationUnit: 'months' | 'years' | null;
    file: File | null;
    associatedLayerId: string | null;
    details: Partial<ListingDetails & JobDetails>;
}