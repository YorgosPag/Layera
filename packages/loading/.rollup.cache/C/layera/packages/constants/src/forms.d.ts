/**
 * Form-related constants - HTML input types and form field types
 */
export declare const FORM_TYPES: {
    readonly TEXT: "text";
    readonly EMAIL: "email";
    readonly PASSWORD: "password";
    readonly TEL: "tel";
    readonly URL: "url";
    readonly NUMBER: "number";
    readonly DATE: "date";
    readonly DATETIME_LOCAL: "datetime-local";
    readonly TIME: "time";
    readonly SEARCH: "search";
    readonly TEXTAREA: "textarea";
    readonly SELECT: "select";
    readonly CHECKBOX: "checkbox";
    readonly RADIO: "radio";
    readonly FILE: "file";
};
export declare const INPUT_VARIANTS: {
    readonly DEFAULT: "default";
    readonly OUTLINE: "outline";
    readonly FILLED: "filled";
    readonly GHOST: "ghost";
    readonly UNDERLINE: "underline";
};
export declare const VALIDATION_RULES: {
    readonly REQUIRED: "required";
    readonly MIN_LENGTH: "minLength";
    readonly MAX_LENGTH: "maxLength";
    readonly PATTERN: "pattern";
    readonly EMAIL: "email";
    readonly URL: "url";
    readonly NUMBER: "number";
    readonly MIN: "min";
    readonly MAX: "max";
    readonly CUSTOM: "custom";
};
export declare const AUTOCOMPLETE_VALUES: {
    readonly OFF: "off";
    readonly ON: "on";
    readonly NAME: "name";
    readonly EMAIL: "email";
    readonly USERNAME: "username";
    readonly NEW_PASSWORD: "new-password";
    readonly CURRENT_PASSWORD: "current-password";
    readonly PHONE: "tel";
    readonly ORGANIZATION: "organization";
    readonly STREET_ADDRESS: "street-address";
    readonly COUNTRY: "country";
    readonly POSTAL_CODE: "postal-code";
};
export declare const FIELD_SIZES: {
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly FULL: "full";
};
/**
 * Form Validation Constants
 */
export declare const FORM_VALIDATION: {
    readonly PASSWORD_MIN: 8;
    readonly PASSWORD_MAX: 128;
    readonly EMAIL_MAX: 254;
    readonly TEXT_MAX: 500;
    readonly TEXTAREA_MAX: 2000;
    readonly PHONE_MIN: 10;
    readonly PHONE_MAX: 15;
};
export type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES];
export type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];
export type ValidationRule = typeof VALIDATION_RULES[keyof typeof VALIDATION_RULES];
export type AutocompleteValue = typeof AUTOCOMPLETE_VALUES[keyof typeof AUTOCOMPLETE_VALUES];
export type FieldSize = typeof FIELD_SIZES[keyof typeof FIELD_SIZES];
