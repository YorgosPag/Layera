import React$1 from 'react';

/**
 * Info Panels Types - Enterprise LEGO System
 *
 * Clean domain types που μπορούν να χρησιμοποιηθούν από οποιοδήποτε project
 * χωρίς dependencies σε specific UI libraries ή frameworks.
 */
type InfoPanelId = string;
interface InfoPanelContent {
    id: InfoPanelId;
    title: string;
    content: string;
    category?: string;
    metadata?: Record<string, unknown>;
}
interface InfoPanelConfig {
    id: InfoPanelId;
    titleKey: string;
    contentKey: string;
    category?: string;
    fallbackTitle?: string;
    fallbackContent?: string;
}
interface InfoPanelTheme {
    backgroundColor: string;
    color: string;
    borderColor?: string;
    boxShadow?: string;
    borderRadius?: string;
    fontSize?: string;
    padding?: string;
}
interface InfoPanelStyleConfig {
    position?: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    zIndex?: number;
    maxHeight?: string;
    overflow?: string;
    theme?: InfoPanelTheme;
}
interface InfoPanelRegistry {
    [key: InfoPanelId]: InfoPanelConfig;
}
interface InfoPanelContentProvider {
    getContent(id: InfoPanelId, locale?: string): Promise<InfoPanelContent>;
    hasContent(id: InfoPanelId): boolean;
}
interface InfoPanelEventHandlers {
    onShow?: (id: InfoPanelId) => void;
    onHide?: (id: InfoPanelId) => void;
    onClick?: (id: InfoPanelId) => void;
}
interface InfoPanelState {
    visiblePanels: Set<InfoPanelId>;
    registry: InfoPanelRegistry;
    contentProvider: InfoPanelContentProvider;
    defaultStyle?: InfoPanelStyleConfig;
    eventHandlers?: InfoPanelEventHandlers;
}
interface UseInfoPanelReturn {
    showPanel: (id: InfoPanelId) => void;
    hidePanel: (id: InfoPanelId) => void;
    togglePanel: (id: InfoPanelId) => void;
    isVisible: (id: InfoPanelId) => boolean;
    getContent: (id: InfoPanelId) => Promise<InfoPanelContent>;
    registerPanel: (config: InfoPanelConfig) => void;
    unregisterPanel: (id: InfoPanelId) => void;
}
interface InfoPanelProviderProps {
    children: React.ReactNode;
    registry?: InfoPanelRegistry;
    contentProvider?: InfoPanelContentProvider;
    defaultStyle?: InfoPanelStyleConfig;
    eventHandlers?: InfoPanelEventHandlers;
}

/**
 * InfoPanelContext - React Context για το LEGO Info Panels System
 *
 * Παρέχει centralized state management για info panels σε όλο το app tree.
 * Αποσπώμενο και επαναχρησιμοποιήσιμο σε οποιοδήποτε React project.
 */

declare const InfoPanelProvider: React$1.FC<InfoPanelProviderProps>;
declare const useInfoPanel: () => UseInfoPanelReturn;

/**
 * useCategoryTheming.ts - Enterprise Theme-Aware Hook για Info Panels
 *
 * Αυτόματη σύνδεση category colors με info panel theming.
 * Εξαλείφει την ανάγκη manual χρωματισμού σε κάθε component.
 */
type CategoryType = 'property' | 'job' | 'initial' | null;
interface CategoryTheme {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    accentColor: string;
    isDark?: boolean;
}
/**
 * Hook που επιστρέφει το σωστό theme ανάλογα με την επιλεγμένη κατηγορία
 */
declare const useCategoryTheming: (selectedCategory: CategoryType) => CategoryTheme;
/**
 * Helper function για χρήση εκτός React components
 */
declare const getCategoryTheme: (selectedCategory: CategoryType) => CategoryTheme;

/**
 * StaticContentProvider - Default implementation για static content
 *
 * Αυτό είναι το fallback provider που χρησιμοποιεί hardcoded content.
 * Μπορεί να αντικατασταθεί από CMS provider, API provider, κλπ.
 */

interface StaticContentConfig {
    [key: InfoPanelId]: {
        title: string;
        content: string;
        category?: string;
        metadata?: Record<string, unknown>;
    };
}
declare class StaticContentProvider implements InfoPanelContentProvider {
    private content;
    constructor(content?: StaticContentConfig);
    getContent(id: InfoPanelId, locale?: string): Promise<InfoPanelContent>;
    hasContent(id: InfoPanelId): boolean;
    addContent(id: InfoPanelId, content: StaticContentConfig[string]): void;
    removeContent(id: InfoPanelId): void;
    updateContent(id: InfoPanelId, content: Partial<StaticContentConfig[string]>): void;
    getAllIds(): InfoPanelId[];
    getContentByCategory(category: string): InfoPanelContent[];
}

/**
 * GeoAlert Info Panel Content Registry
 *
 * Περιεχόμενα από το CategoryStepOld.tsx για χρήση στο LEGO system.
 * Αυτό το registry μπορεί να χρησιμοποιηθεί από όλες τις Layera εφαρμογές.
 */

declare const GEOALERT_INFO_CONTENT: StaticContentConfig;
declare const createGeoAlertContentProvider: () => any;

/**
 * @layera/info-panels - Enterprise LEGO Info Panels System
 *
 * Scalable και αποσπώμενο σύστημα για contextual information overlays.
 * Μπορεί να χρησιμοποιηθεί σε οποιοδήποτε React project χωρίς dependencies.
 */

declare const createInfoPanelConfig: (id: InfoPanelId, titleKey: string, contentKey: string, options?: {
    category?: string;
    fallbackTitle?: string;
    fallbackContent?: string;
}) => InfoPanelConfig;
declare const createInfoPanelTheme: (baseColor: string, options?: {
    opacity?: number;
    borderOpacity?: number;
    shadowOpacity?: number;
}) => InfoPanelTheme;
declare const INFO_PANEL_THEMES: {
    readonly property: InfoPanelTheme;
    readonly job: InfoPanelTheme;
    readonly success: InfoPanelTheme;
    readonly warning: InfoPanelTheme;
    readonly error: InfoPanelTheme;
    readonly info: InfoPanelTheme;
};
declare const DEFAULT_INFO_PANEL_STYLES: {
    readonly mobile: {
        readonly position: {
            readonly top: "161px";
            readonly left: "8px";
            readonly right: "8px";
        };
        readonly zIndex: 10000;
        readonly maxHeight: "60vh";
        readonly overflow: "auto";
    };
    readonly desktop: {
        readonly position: {
            readonly top: "20px";
            readonly right: "20px";
        };
        readonly zIndex: 10000;
        readonly maxHeight: "400px";
        readonly overflow: "auto";
    };
};

export { type CategoryTheme, type CategoryType, DEFAULT_INFO_PANEL_STYLES, GEOALERT_INFO_CONTENT, INFO_PANEL_THEMES, type InfoPanelConfig, type InfoPanelContent, type InfoPanelContentProvider, type InfoPanelEventHandlers, type InfoPanelId, InfoPanelProvider, type InfoPanelProviderProps, type InfoPanelRegistry, type InfoPanelState, type InfoPanelStyleConfig, type InfoPanelTheme, type StaticContentConfig, StaticContentProvider, type UseInfoPanelReturn, createGeoAlertContentProvider, createInfoPanelConfig, createInfoPanelTheme, getCategoryTheme, useCategoryTheming, useInfoPanel };
