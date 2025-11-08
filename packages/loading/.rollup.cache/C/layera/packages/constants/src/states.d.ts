/**
 * State constants for component states and statuses
 */
export declare const FORM_STATES: {
    readonly DEFAULT: "default";
    readonly FOCUS: "focus";
    readonly ERROR: "error";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};
export declare const BUTTON_STATES: {
    readonly DEFAULT: "default";
    readonly HOVER: "hover";
    readonly ACTIVE: "active";
    readonly FOCUS: "focus";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};
export declare const CARD_STATES: {
    readonly DEFAULT: "default";
    readonly HOVER: "hover";
    readonly ACTIVE: "active";
    readonly DISABLED: "disabled";
    readonly LOADING: "loading";
};
export declare const DATA_STATES: {
    readonly LOADING: "loading";
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly EMPTY: "empty";
    readonly IDLE: "idle";
};
export declare const USER_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly PENDING: "pending";
    readonly SUSPENDED: "suspended";
    readonly VERIFIED: "verified";
    readonly UNVERIFIED: "unverified";
};
export type FormState = typeof FORM_STATES[keyof typeof FORM_STATES];
export type ButtonState = typeof BUTTON_STATES[keyof typeof BUTTON_STATES];
export type CardState = typeof CARD_STATES[keyof typeof CARD_STATES];
export type DataState = typeof DATA_STATES[keyof typeof DATA_STATES];
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
