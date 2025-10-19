/**
 * @layera/responsive-design - Enterprise LEGO System
 * UnifiedPipelineModal Responsive Styles - Separated by Device
 * Single Source of Truth για modal styling σε κάθε device
 */
export declare const UNIFIED_PIPELINE_MODAL_STYLES: {
    readonly base: {
        readonly overlay: {
            readonly zIndex: "var(--layera-z-map-overlay-5)";
            readonly position: "fixed";
            readonly backgroundColor: "rgba(0, 0, 0, 0.6)";
            readonly pointerEvents: "auto";
        };
        readonly modal: {
            readonly position: "fixed";
            readonly top: "50%";
            readonly left: "50%";
            readonly transform: "translate(-50%, -50%)";
            readonly backgroundColor: "var(--layera-bg-primary, #ffffff)";
            readonly borderRadius: "12px";
            readonly boxSizing: "border-box";
            readonly boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)";
            readonly overflowY: "auto";
            readonly overflowX: "hidden";
        };
        readonly card: {
            readonly border: "2px solid hsl(210 100% 50%)";
            readonly borderRadius: "8px";
            readonly backgroundColor: "var(--layera-bg-primary, #ffffff)";
            readonly transition: "background-color 0.2s ease, border-color 0.2s ease";
            readonly cursor: "pointer";
            readonly boxSizing: "border-box";
            readonly overflow: "hidden";
            readonly display: "flex";
            readonly flexDirection: "column";
            readonly justifyContent: "center";
            readonly alignItems: "stretch";
        };
    };
    readonly mobile: {
        readonly modal: {
            readonly width: "100%";
            readonly maxWidth: "320px";
            readonly fontSize: "0.75rem";
            readonly padding: "0.75rem";
            readonly maxHeight: "calc(100vh - 2rem)";
        };
        readonly card: {
            readonly margin: "0.4rem 0";
            readonly padding: "0.6rem";
            readonly minHeight: "80px";
        };
        readonly title: {
            readonly fontSize: "0.85rem";
            readonly lineHeight: "1.3";
            readonly marginBottom: "0.3rem";
        };
        readonly text: {
            readonly fontSize: "0.65rem";
            readonly lineHeight: "1.4";
            readonly minHeight: "28px";
        };
        readonly icon: {
            readonly width: "20px";
            readonly height: "20px";
        };
    };
    readonly tablet: {
        readonly modal: {
            readonly width: "100%";
            readonly maxWidth: "320px";
            readonly fontSize: "0.75rem";
            readonly padding: "0.75rem";
            readonly maxHeight: "calc(100vh - 2rem)";
        };
        readonly card: {
            readonly margin: "0.4rem 0";
            readonly padding: "0.6rem";
            readonly minHeight: "80px";
        };
        readonly title: {
            readonly fontSize: "0.85rem";
            readonly lineHeight: "1.3";
            readonly marginBottom: "0.3rem";
        };
        readonly text: {
            readonly fontSize: "0.65rem";
            readonly lineHeight: "1.4";
            readonly minHeight: "28px";
        };
        readonly icon: {
            readonly width: "20px";
            readonly height: "20px";
        };
    };
    readonly desktop: {
        readonly modal: {
            readonly width: "100%";
            readonly maxWidth: "280px";
            readonly fontSize: "0.7rem";
            readonly padding: "0.6rem";
            readonly maxHeight: "calc(100vh - 2rem)";
        };
        readonly card: {
            readonly margin: "0.3rem 0";
            readonly padding: "0.5rem";
            readonly minHeight: "70px";
        };
        readonly title: {
            readonly fontSize: "0.8rem";
            readonly lineHeight: "1.3";
            readonly marginBottom: "0.25rem";
        };
        readonly text: {
            readonly fontSize: "0.6rem";
            readonly lineHeight: "1.4";
            readonly minHeight: "24px";
        };
        readonly icon: {
            readonly width: "18px";
            readonly height: "18px";
        };
    };
    readonly desktopLarge: {
        readonly modal: {
            readonly width: "100%";
            readonly maxWidth: "260px";
            readonly fontSize: "0.65rem";
            readonly padding: "0.5rem";
            readonly maxHeight: "calc(100vh - 2rem)";
        };
        readonly card: {
            readonly margin: "0.25rem 0";
            readonly padding: "0.45rem";
            readonly minHeight: "65px";
        };
        readonly title: {
            readonly fontSize: "0.75rem";
            readonly lineHeight: "1.3";
            readonly marginBottom: "0.2rem";
        };
        readonly text: {
            readonly fontSize: "0.55rem";
            readonly lineHeight: "1.4";
            readonly minHeight: "22px";
        };
        readonly icon: {
            readonly width: "16px";
            readonly height: "16px";
        };
    };
};
export declare const generateModalCSS: (zIndex: {
    MAP_OVERLAY: number;
    MAP_MODAL: number;
}) => string;
