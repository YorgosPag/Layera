import React$1 from 'react';

/**
 * Device Layout Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για device layout orchestration χωρίς vendor dependencies
 */
type DeviceType = 'iphone' | 'tablet' | 'desktop' | 'mobile';
interface DrawnArea {
    id: string;
    type: 'polygon' | 'marker';
    coordinates: number[][];
    name: string;
    nameTemplate?: string;
    nameNumber?: number;
    area?: number;
    category: 'real_estate' | 'jobs';
    isVisible?: boolean;
    opacity?: number;
    metadata?: {
        price?: number;
        squareMeters?: number;
        rooms?: number;
        propertyType?: string;
        salary?: number;
        workingHours?: string;
        company?: string;
        jobType?: string;
    };
}
interface MapComponentProps {
    onAreaCreated?: (area: DrawnArea) => void;
    onNewEntryClick?: () => void;
    isIPhone14ProMaxDevice?: boolean;
    hideDrawingControls?: boolean;
}
interface StepperComponentProps {
    currentStep?: string | undefined;
    totalSteps?: number | undefined;
    stepIndex?: number | undefined;
    selectedCategory?: string | undefined;
    onNext?: (() => void) | undefined;
    onPrevious?: (() => void) | undefined;
    onReset?: (() => void) | undefined;
    canGoNext?: boolean | undefined;
    canGoPrevious?: boolean | undefined;
}
interface CategoryComponentProps {
    isVisible?: boolean | undefined;
    currentStepId?: string | undefined;
    onNext?: ((category: unknown) => Promise<void>) | undefined;
}
interface DeviceLayoutProps {
    /** Device type για conditional rendering */
    deviceType: DeviceType;
    /** Main content component να render για κάθε device */
    children?: React.ReactNode;
    /** Device-specific component να render */
    deviceComponent?: React.ReactNode;
    /** Navigation-related props */
    navigation?: {
        currentStep?: string;
        totalSteps?: number;
        stepIndex?: number;
        selectedCategory?: string;
        canGoNext?: boolean;
        canGoBack?: boolean;
    };
    /** Handlers για navigation actions */
    navigationHandlers?: {
        onNext?: () => void;
        onPrevious?: () => void;
        onReset?: () => void;
        onNewEntryClick?: () => void;
    };
    /** Show/hide stepper και category elements */
    showCategoryElements?: boolean;
    /** Stepper component να render (για iPhone mode) */
    stepperComponent?: React.ReactNode;
    /** Category component να render (για iPhone mode) */
    categoryComponent?: React.ReactNode;
    /** FAB component να render */
    fabComponent?: React.ReactNode;
    /** Custom container styles */
    containerStyle?: React.CSSProperties;
    /** Container className */
    containerClassName?: string;
}
interface ResponsiveLayoutConfig {
    iphone: {
        width: number;
        height: number;
        containerStyle: React.CSSProperties;
    };
    tablet: {
        containerStyle: React.CSSProperties;
        containerClassName: string;
    };
    desktop: {
        containerStyle: React.CSSProperties;
    };
    mobile: {
        containerStyle: React.CSSProperties;
        containerClassName: string;
    };
}
interface DeviceLayoutRendererProps {
    /** Auto-detected ή forced device type */
    deviceType?: DeviceType | undefined;
    /** Override auto-detection */
    forceDeviceType?: DeviceType | undefined;
    /** Layout configuration per device */
    layoutConfig?: Partial<ResponsiveLayoutConfig>;
    /** Common props που περνούν σε όλα τα devices */
    commonProps?: {
        onAreaCreated?: (area: DrawnArea) => void;
        onNewEntryClick?: () => void;
        isIPhone14ProMaxDevice?: boolean;
        hideDrawingControls?: boolean;
    };
    /** Device-specific components */
    components?: {
        iphone?: {
            map?: React.ComponentType<MapComponentProps> | undefined;
            stepper?: React.ComponentType<StepperComponentProps> | undefined;
            category?: React.ComponentType<CategoryComponentProps> | undefined;
        };
        tablet?: {
            map?: React.ComponentType<MapComponentProps> | undefined;
        };
        desktop?: {
            map?: React.ComponentType<MapComponentProps> | undefined;
        };
        mobile?: {
            map?: React.ComponentType<MapComponentProps> | undefined;
        };
    };
    /** Navigation state και handlers */
    navigation?: DeviceLayoutProps['navigation'];
    navigationHandlers?: DeviceLayoutProps['navigationHandlers'];
    showCategoryElements?: boolean;
    /** FAB configuration */
    fab?: {
        component?: React.ReactNode | undefined;
        onClick?: (() => void) | undefined;
        icon?: React.ReactNode | undefined;
        hidden?: boolean | undefined;
    } | undefined;
}

/**
 * DeviceLayoutRenderer.tsx - Enterprise Device Layout Orchestrator
 *
 * Single source of truth για device-specific rendering στο Layera ecosystem.
 * Αντικαθιστά duplicate device rendering logic με unified API.
 */

declare const DeviceLayoutRenderer: React$1.FC<DeviceLayoutRendererProps>;

/**
 * ResponsiveMapLayout.tsx - High-Level Responsive Map Layout Component
 *
 * Simplified API για common map layout patterns.
 * Wrapper γύρω από το DeviceLayoutRenderer για εύκολη χρήση.
 */

interface ResponsiveMapLayoutProps {
    /** Auto-detected ή forced device type */
    deviceType?: DeviceType;
    /** Override auto-detection */
    forceDeviceType?: DeviceType;
    /** Map-related props */
    map?: MapComponentProps;
    /** Device-specific map components */
    mapComponents?: {
        iPhone?: React$1.ComponentType<MapComponentProps>;
        tablet?: React$1.ComponentType<MapComponentProps>;
        desktop?: React$1.ComponentType<MapComponentProps>;
        mobile?: React$1.ComponentType<MapComponentProps>;
    };
    /** iPhone-specific components (stepper, category) */
    iPhoneComponents?: {
        stepper?: React$1.ComponentType<StepperComponentProps>;
        category?: React$1.ComponentType<CategoryComponentProps>;
    };
    /** Navigation state */
    navigation?: {
        currentStep?: string;
        totalSteps?: number;
        stepIndex?: number;
        selectedCategory?: string;
        canGoNext?: boolean;
        canGoBack?: boolean;
    };
    /** Navigation handlers */
    navigationHandlers?: {
        onNext?: () => void;
        onPrevious?: () => void;
        onReset?: () => void;
        onNewEntryClick?: () => void;
    };
    /** Show category elements (για iPhone stepper) */
    showCategoryElements?: boolean;
    /** FAB configuration */
    fab?: {
        onClick?: () => void;
        icon?: React$1.ReactNode;
        hidden?: boolean;
        deviceType?: DeviceType;
    };
}
declare const ResponsiveMapLayout: React$1.FC<ResponsiveMapLayoutProps>;

export { type CategoryComponentProps, type DeviceLayoutProps, DeviceLayoutRenderer, type DeviceLayoutRendererProps, DeviceLayoutRenderer as DeviceRenderer, type DeviceType, type DrawnArea, type MapComponentProps, ResponsiveMapLayout as MapLayout, type ResponsiveLayoutConfig, ResponsiveMapLayout, type ResponsiveMapLayoutProps, type StepperComponentProps };
