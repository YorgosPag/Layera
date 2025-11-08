/**
 * Legacy Constants Compatibility Layer
 *
 * ⚠️  ΠΡΟΣΩΡΙΝΑ aliases για παλαιά κλειδιά που χρησιμοποιούνται στον κώδικα.
 * 🎯  ΔΕΝ αλλάζουμε tokens.json - Single Source of Truth παραμένει.
 * 🔗  Δένουμε aliases σε υπάρχοντες tokens ή σταθερές τιμές που ήδη εγκρίνουμε.
 *
 * Phase 2: Θα αντικαταστήσουμε αυτά με επίσημα tokens μέσω guided codemods.
 */
export declare const LEGACY_LAYOUT_ALIASES: {
    readonly LAYOUT_SM: "var(--la-space-8)";
    readonly LAYOUT_MD: "var(--la-space-12)";
    readonly LAYOUT_LG: "var(--la-space-16)";
    readonly LAYOUT_XL: "var(--la-space-20)";
    readonly LAYOUT_XXL: "var(--la-space-24)";
    readonly LAYOUT_XXXL: "var(--la-space-32)";
};
export declare const LEGACY_CONTAINER_ALIASES: {
    readonly CONTAINER_SM: 600;
    readonly CONTAINER_MD: 768;
    readonly CONTAINER_LG: 1200;
    readonly CONTAINER_XL: 1400;
    readonly CONTAINER_XXL: 1600;
};
export declare const LEGACY_VIEWPORT_ALIASES: {
    readonly VIEWPORT_WIDTH: "100%";
    readonly VIEWPORT_HEIGHT: "100%";
    readonly MIN_CONTENT: "min-content";
    readonly MAX_CONTENT: "max-content";
    readonly FIT_CONTENT: "fit-content";
};
export declare const CRYPTOGRAPHIC_CONSTANTS: {
    readonly TOTP_ALGORITHM: "SHA1";
    readonly TOTP_DIGITS: 6;
    readonly TOTP_STEP_SECONDS: 30;
    readonly BIT_32: 4294967295;
    readonly TOTP_SECRET_LENGTH: 32;
    readonly TOTP_WINDOW: 1;
    readonly BACKUP_CODES_COUNT: 8;
    readonly QR_CODE_SIZE: 256;
};
