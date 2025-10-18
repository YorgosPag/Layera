import L from 'leaflet';
import {
    ImportedLayer,
    WizardState,
    DrawingState,
    GeoJSONFeature,
    ListingCategory,
    ListingIntent,
    TransactionType,
    EmploymentType
} from '@geo-platform/shared';

/**
 * Generates a descriptive name for a listing based on its details.
 * @param details - The listing details.
 * @param category - The category (property or job).
 * @param intent - The intent (offer or search).
 * @param transactionType - The transaction type for properties.
 * @returns A formatted string name for the layer.
 */
export const generateListingName = (
    details: Partial<WizardState['details']>,
    category: ListingCategory | null,
    intent: ListingIntent | null,
    transactionType: TransactionType | null,
    employmentType: EmploymentType | null,
): string => {
    if (category === 'property') {
        const intentText = intent === 'offer' ? (transactionType === 'sale' ? 'Πώληση' : 'Ενοικίαση') : 'Αναζήτηση';
        const typeText = details?.propertyType ? {
            apartment: 'Διαμερίσματος', house: 'Μονοκατοικίας', maisonette: 'Μεζονέτας',
            studio: 'Studio', business: 'Επαγγελματικού Χώρου'
        }[details.propertyType] : 'Ακινήτου';
        let desc = `${intentText} ${typeText}`;
        if (details?.area) {
            desc += ` ${details.area} τ.μ.`;
        }
        return desc;
    }
    if (category === 'job') {
        const intentText = intent === 'offer' ? 'Προσφορά' : 'Αναζήτηση';
        if (details?.jobTitle) {
            return `${intentText} Εργασίας: ${details.jobTitle}`;
        }
        const typeText = employmentType ? {
            full_time: 'Πλήρους Απασχόλησης', part_time: 'Μερικής Απασχόλησης',
            freelance: 'Freelance', seasonal: 'Εποχιακής Εργασίας'
        }[employmentType] : 'Εργασίας';
        return `${intentText} ${typeText}`;
    }
    return intent === 'offer' ? 'Νέα Προσφορά' : 'Νέα Αναζήτηση';
};


/**
 * Creates a new ImportedLayer object from a completed drawing state.
 * @param drawingState - The state of the drawing tool.
 * @param intent - The user's intent (offer or search).
 * @returns A new ImportedLayer object or null if the drawing is invalid.
 */
export const createLayerFromDrawing = (drawingState: DrawingState, intent: ListingIntent | null): ImportedLayer | null => {
    if (!drawingState.isFinished || drawingState.points.length === 0) {
        return null;
    }

    let geometry: GeoJSONFeature | null = null;
    let bounds: L.LatLngBounds | null = null;
    const name = intent === 'offer' ? 'Νέα Προσφορά' : 'Νέα Αναζήτηση';

    if (drawingState.shape === 'polygon' && drawingState.points.length > 2) {
        const latlngs = [...drawingState.points, drawingState.points[0]];
        geometry = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon',
                coordinates: [latlngs.map(p => [p.lng, p.lat])]
            }
        };
        bounds = L.latLngBounds(drawingState.points);
    } else if (drawingState.shape === 'marker' && drawingState.points.length > 0) {
        const center = drawingState.points[0];
        const radius = drawingState.radius || 250;
        geometry = {
            type: 'Feature',
            properties: { radius },
            geometry: {
                type: 'Point',
                coordinates: [center.lng, center.lat]
            }
        };
        bounds = center.toBounds(radius * 2);
    }

    if (!geometry || !bounds) return null;

    const newLayer: ImportedLayer = {
        id: `layer-${Date.now()}`,
        name,
        type: 'geometry',
        data: null,
        bounds,
        isVisible: true,
        opacity: 1,
        geometry,
        createdAt: new Date().toISOString(),
    };
    
    return newLayer;
}
