/**
 * Cards - Unified Card Styling Constants
 * Single Source of Truth για τα στυλ των καρτών σε StepOrchestrator και WorkflowPlaceholder
 */
/**
 * Standard στυλ για workflow/step cards που χρησιμοποιούνται
 * στο StepOrchestrator και WorkflowPlaceholder
 */
export declare const WORKFLOW_CARD_STYLES: {
    readonly CONTAINER: {
        readonly border: "var(--la-border-width-xxs) solid var(--color-border-strong)";
        readonly borderRadius: "var(--la-radius-lg)px";
        readonly padding: "var(--la-space-6)";
        readonly margin: "0 auto";
        readonly position: "relative";
        readonly maxWidth: "768px";
        readonly boxSizing: "border-box";
        readonly backgroundColor: "var(--la-card-background)";
    };
    readonly COLORS: {
        readonly PRIMARY: "var(--la-card-background)";
        readonly SUCCESS: "var(--la-card-background)";
        readonly INFO: "var(--la-card-background)";
        readonly WARNING: "var(--la-card-background)";
        readonly ERROR: "var(--la-card-background)";
        readonly ORANGE: "var(--la-card-background)";
    };
    readonly BORDERS: {
        readonly PRIMARY: "var(--la-card-border-color)";
        readonly SUCCESS: "var(--la-card-border-color)";
        readonly INFO: "var(--la-card-border-color)";
        readonly WARNING: "var(--la-card-border-color)";
        readonly ERROR: "var(--la-card-border-color)";
        readonly ORANGE: "var(--la-card-border-color)";
    };
    readonly MODAL_CONTENT: {
        readonly borderRadius: "var(--la-radius-lg)px";
        readonly paddingTop: "var(--la-space-6)";
        readonly paddingBottom: "var(--la-space-8)px";
        readonly paddingLeft: "var(--la-space-6)";
        readonly paddingRight: "var(--la-space-6)";
        readonly border: "var(--la-border-width-xxs) solid var(--la-color-brand)";
        readonly position: "relative";
        readonly maxWidth: "768px";
        readonly backgroundColor: "var(--la-card-background)";
    };
    readonly BUTTON_CONTAINER: {
        readonly padding: "var(--la-space-4)px var(--la-space-8)px";
        readonly border: "var(--la-border-width-xxs) solid var(--color-border-strong)";
        readonly borderRadius: "var(--la-radius-md)px";
        readonly backgroundColor: "var(--la-card-background)";
    };
    readonly STEP_CARD: {
        readonly padding: "var(--la-space-4)px";
        readonly borderRadius: "var(--la-radius-md)px";
        readonly border: "var(--la-border-width-xxs) solid var(--la-color-brand)";
        readonly backgroundColor: "var(--la-color-error)";
        readonly appearance: "none";
        readonly outline: "none";
        readonly userSelect: "none";
        readonly WebkitAppearance: "none";
        readonly MozAppearance: "none";
        readonly msUserSelect: "none";
        readonly WebkitUserSelect: "none";
        readonly MozUserSelect: "none";
    };
    readonly STEP_CONTAINER: {
        readonly width: "100%";
        readonly maxWidth: "768px";
        readonly alignSelf: "center";
        readonly backgroundColor: "var(--la-card-background)";
    };
};
/**
 * Utility functions για consistent styling
 */
export declare const getWorkflowCardContainerStyle: () => {
    readonly border: "var(--la-border-width-xxs) solid var(--color-border-strong)";
    readonly borderRadius: "var(--la-radius-lg)px";
    readonly padding: "var(--la-space-6)";
    readonly margin: "0 auto";
    readonly position: "relative";
    readonly maxWidth: "768px";
    readonly boxSizing: "border-box";
    readonly backgroundColor: "var(--la-card-background)";
};
export declare const getWorkflowCardModalStyle: () => {
    readonly borderRadius: "var(--la-radius-lg)px";
    readonly paddingTop: "var(--la-space-6)";
    readonly paddingBottom: "var(--la-space-8)px";
    readonly paddingLeft: "var(--la-space-6)";
    readonly paddingRight: "var(--la-space-6)";
    readonly border: "var(--la-border-width-xxs) solid var(--la-color-brand)";
    readonly position: "relative";
    readonly maxWidth: "768px";
    readonly backgroundColor: "var(--la-card-background)";
};
export declare const getWorkflowCardButtonStyle: () => {
    readonly padding: "var(--la-space-4)px var(--la-space-8)px";
    readonly border: "var(--la-border-width-xxs) solid var(--color-border-strong)";
    readonly borderRadius: "var(--la-radius-md)px";
    readonly backgroundColor: "var(--la-card-background)";
};
export declare const getWorkflowCardStepStyle: () => {
    readonly padding: "var(--la-space-4)px";
    readonly borderRadius: "var(--la-radius-md)px";
    readonly border: "var(--la-border-width-xxs) solid var(--la-color-brand)";
    readonly backgroundColor: "var(--la-color-error)";
    readonly appearance: "none";
    readonly outline: "none";
    readonly userSelect: "none";
    readonly WebkitAppearance: "none";
    readonly MozAppearance: "none";
    readonly msUserSelect: "none";
    readonly WebkitUserSelect: "none";
    readonly MozUserSelect: "none";
};
export declare const getWorkflowCardStepContainerStyle: () => {
    readonly width: "100%";
    readonly maxWidth: "768px";
    readonly alignSelf: "center";
    readonly backgroundColor: "var(--la-card-background)";
};
/**
 * 🌐 GLOBAL COLOR UTILITIES - Single Source of Truth για ΟΛΕΣ τις κάρτες
 */
export declare const getCardPrimaryColor: () => "var(--la-card-background)";
export declare const getCardSuccessColor: () => "var(--la-card-background)";
export declare const getCardInfoColor: () => "var(--la-card-background)";
export declare const getCardWarningColor: () => "var(--la-card-background)";
export declare const getCardErrorColor: () => "var(--la-card-background)";
export declare const getCardOrangeColor: () => "var(--la-card-background)";
/**
 * 🔲 GLOBAL BORDER UTILITIES - Single Source of Truth για ΟΛΕΣ τις κάρτες
 */
export declare const getCardPrimaryBorder: () => "var(--la-card-border-color)";
export declare const getCardSuccessBorder: () => "var(--la-card-border-color)";
export declare const getCardInfoBorder: () => "var(--la-card-border-color)";
export declare const getCardWarningBorder: () => "var(--la-card-border-color)";
export declare const getCardErrorBorder: () => "var(--la-card-border-color)";
export declare const getCardOrangeBorder: () => "var(--la-card-border-color)";
