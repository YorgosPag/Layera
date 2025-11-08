/**
 * Legacy Constants Compatibility Layer
 *
 * ⚠️  ΠΡΟΣΩΡΙΝΑ aliases για παλαιά κλειδιά που χρησιμοποιούνται στον κώδικα.
 * 🎯  ΔΕΝ αλλάζουμε tokens.json - Single Source of Truth παραμένει.
 * 🔗  Δένουμε aliases σε υπάρχοντες tokens ή σταθερές τιμές που ήδη εγκρίνουμε.
 *
 * Phase 2: Θα αντικαταστήσουμε αυτά με επίσημα tokens μέσω guided codemods.
 */
// 📐 Layout spacing aliases - αντιστοιχούν σε επίσημα --la-space-* tokens
export const LEGACY_LAYOUT_ALIASES = {
    LAYOUT_SM: 'var(--la-space-8)', // 32px equivalent
    LAYOUT_MD: 'var(--la-space-12)', // 48px equivalent
    LAYOUT_LG: 'var(--la-space-16)', // 64px equivalent
    LAYOUT_XL: 'var(--la-space-20)', // 80px equivalent
    LAYOUT_XXL: 'var(--la-space-24)', // 96px equivalent
    LAYOUT_XXXL: 'var(--la-space-32)', // 128px equivalent
};
// 📱 Container breakpoints - enterprise responsive design
export const LEGACY_CONTAINER_ALIASES = {
    CONTAINER_SM: 600, // Small container
    CONTAINER_MD: 768, // Medium container (already exists)
    CONTAINER_LG: 1200, // Large container
    CONTAINER_XL: 1400, // Extra large container
    CONTAINER_XXL: 1600, // Extra extra large container
};
// 🖼️ Viewport και content sizing - CSS intrinsic values
export const LEGACY_VIEWPORT_ALIASES = {
    VIEWPORT_WIDTH: '100%',
    VIEWPORT_HEIGHT: '100%',
    MIN_CONTENT: 'min-content',
    MAX_CONTENT: 'max-content',
    FIT_CONTENT: 'fit-content',
};
// 🔒 Cryptographic constants που λείπουν από auth-bridge
export const CRYPTOGRAPHIC_CONSTANTS = {
    TOTP_ALGORITHM: 'SHA1',
    TOTP_DIGITS: 6,
    TOTP_STEP_SECONDS: 30,
    BIT_32: 0xFFFFFFFF,
    TOTP_SECRET_LENGTH: 32,
    TOTP_WINDOW: 1,
    BACKUP_CODES_COUNT: 8,
    QR_CODE_SIZE: 256
};
//# sourceMappingURL=legacy-aliases.js.map