// src/components/FormField/FormField.tsx
import React2 from "react";
import { FORM_STATES } from "@layera/constants";

// ../tolgee/src/provider-minimal.tsx
import React, { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var MinimalTolgeeContext = createContext(null);
var useMinimalTolgee = () => {
  const context = useContext(MinimalTolgeeContext);
  if (!context) {
    throw new Error("useMinimalTolgee must be used within MinimalTolgeeProvider");
  }
  return context;
};

// ../tolgee/src/config.ts
var TOLGEE_CONFIG = {
  // API Configuration
  apiUrl: typeof process !== "undefined" && process.env?.TOLGEE_API_URL || "https://app.tolgee.io",
  apiKey: typeof process !== "undefined" && process.env?.TOLGEE_API_KEY || "",
  // Project Settings
  projectId: typeof process !== "undefined" && process.env?.TOLGEE_PROJECT_ID || "",
  // Language Settings
  defaultLanguage: "el",
  // Greek as default
  fallbackLanguage: "en",
  supportedLanguages: ["el", "en"],
  // Development Settings
  isDevelopment: typeof process !== "undefined" && process.env?.NODE_ENV === "development",
  inContextEditing: typeof process !== "undefined" && process.env?.NODE_ENV === "development",
  // Cache Settings
  cacheEnabled: true,
  cacheExpirationMs: 24 * 60 * 60 * 1e3,
  // 24 hours
  // Features
  features: {
    autoTranslate: true,
    machineTranslation: true,
    inContextEditing: true,
    screenshots: true,
    comments: true
  }
};

// ../tolgee/src/hooks-minimal.ts
import { useCallback } from "react";
function useLayeraTranslation() {
  const { t, language, changeLanguage } = useMinimalTolgee();
  return {
    t,
    i18n: {
      language,
      changeLanguage,
      languages: {
        el: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
        en: "English"
      }
    }
  };
}

// ../tolgee/src/components/LanguageSwitcher.tsx
import { jsx as jsx2 } from "react/jsx-runtime";

// src/components/FormField/FormField.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var FormField = ({
  children,
  label,
  labelKey,
  description,
  descriptionKey,
  error,
  errorKey,
  hint,
  hintKey,
  required = false,
  disabled = false,
  state = FORM_STATES.DEFAULT,
  className = "",
  id
}) => {
  const { t } = useLayeraTranslation();
  const fieldId = id || React2.useId();
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const resolvedLabel = labelKey ? t(labelKey) : label;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
  const resolvedError = errorKey ? t(errorKey) : error;
  const resolvedHint = hintKey ? t(hintKey) : hint;
  const fieldState = error || errorKey ? FORM_STATES.ERROR : state;
  const fieldClasses = [
    "layera-form-field",
    `layera-form-field--${fieldState}`,
    disabled && "layera-form-field--disabled",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: fieldClasses, children: [
    resolvedLabel && /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: fieldId,
        className: "layera-form-field__label",
        children: [
          resolvedLabel,
          required && /* @__PURE__ */ jsx3("span", { className: "layera-form-field__required", "aria-label": t("forms.validation.required"), children: "*" })
        ]
      }
    ),
    resolvedDescription && /* @__PURE__ */ jsx3("div", { className: "layera-form-field__description", children: resolvedDescription }),
    /* @__PURE__ */ jsx3("div", { className: "layera-form-field__control", children: React2.isValidElement(children) ? React2.cloneElement(children, {
      id: fieldId,
      "aria-describedby": [
        resolvedError ? errorId : "",
        resolvedHint ? hintId : ""
      ].filter(Boolean).join(" ") || void 0,
      "aria-invalid": fieldState === FORM_STATES.ERROR ? "true" : void 0,
      disabled
    }) : children }),
    resolvedError && /* @__PURE__ */ jsx3(
      "div",
      {
        id: errorId,
        className: "layera-form-field__error",
        role: "alert",
        "aria-live": "polite",
        children: resolvedError
      }
    ),
    resolvedHint && !resolvedError && /* @__PURE__ */ jsx3(
      "div",
      {
        id: hintId,
        className: "layera-form-field__hint",
        children: resolvedHint
      }
    )
  ] });
};

// src/components/Input/Input.tsx
import { forwardRef } from "react";
import {
  FORM_TYPES,
  FORM_SIZES,
  FORM_STATES as FORM_STATES2,
  INPUT_VARIANTS,
  AUTOCOMPLETE_VALUES
} from "@layera/constants";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var Input = forwardRef(({
  type = FORM_TYPES.TEXT,
  size = FORM_SIZES.MEDIUM,
  variant = INPUT_VARIANTS.DEFAULT,
  state = FORM_STATES2.DEFAULT,
  startIcon,
  endIcon,
  loading = false,
  autoComplete = AUTOCOMPLETE_VALUES.OFF,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}, ref) => {
  const inputClasses = [
    "layera-input",
    `layera-input--${size}`,
    `layera-input--${variant}`,
    `layera-input--${state}`,
    startIcon && "layera-input--has-start-icon",
    endIcon && "layera-input--has-end-icon",
    loading && "layera-input--loading",
    fullWidth && "layera-input--full-width",
    disabled && "layera-input--disabled",
    className
  ].filter(Boolean).join(" ");
  const wrapperClasses = [
    "layera-input-wrapper",
    `layera-input-wrapper--${size}`,
    `layera-input-wrapper--${variant}`,
    `layera-input-wrapper--${state}`,
    fullWidth && "layera-input-wrapper--full-width",
    disabled && "layera-input-wrapper--disabled"
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs2("div", { className: wrapperClasses, children: [
    startIcon && /* @__PURE__ */ jsx4("div", { className: "layera-input__start-icon", children: startIcon }),
    /* @__PURE__ */ jsx4(
      "input",
      {
        ref,
        type,
        autoComplete,
        disabled: disabled || loading,
        className: inputClasses,
        ...props
      }
    ),
    loading && /* @__PURE__ */ jsx4("div", { className: "layera-input__loading", children: /* @__PURE__ */ jsx4("div", { className: "layera-input__spinner" }) }),
    endIcon && !loading && /* @__PURE__ */ jsx4("div", { className: "layera-input__end-icon", children: endIcon })
  ] });
});
Input.displayName = "Input";

// src/components/Select/Select.tsx
import { useState, useRef, useEffect, forwardRef as forwardRef2 } from "react";
import {
  FORM_SIZES as FORM_SIZES2,
  FORM_STATES as FORM_STATES3,
  INPUT_VARIANTS as INPUT_VARIANTS2
} from "@layera/constants";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var Select = forwardRef2(({
  options,
  value,
  onChange,
  placeholder,
  placeholderKey,
  size = FORM_SIZES2.MEDIUM,
  variant = INPUT_VARIANTS2.DEFAULT,
  state = FORM_STATES3.DEFAULT,
  searchable = false,
  clearable = false,
  loading = false,
  fullWidth = false,
  disabled,
  startIcon,
  emptyMessage,
  emptyMessageKey,
  className = "",
  ...props
}, ref) => {
  const { t } = useLayeraTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const resolvedPlaceholder = placeholderKey ? t(placeholderKey) : placeholder;
  const resolvedEmptyMessage = emptyMessageKey ? t(emptyMessageKey) : emptyMessage || t("forms.select.noOptions");
  const filteredOptions = searchable ? options.filter(
    (option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())
  ) : options;
  const selectedOption = options.find((option) => option.value === value);
  const selectClasses = [
    "layera-select",
    `layera-select--${size}`,
    `layera-select--${variant}`,
    `layera-select--${state}`,
    isOpen && "layera-select--open",
    disabled && "layera-select--disabled",
    fullWidth && "layera-select--full-width",
    className
  ].filter(Boolean).join(" ");
  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    }
  };
  const handleOptionSelect = (option) => {
    if (!option.disabled) {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  };
  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.("");
    setSearchTerm("");
  };
  const handleKeyDown = (e) => {
    if (disabled || loading) return;
    switch (e.key) {
      case "Enter":
      case " ":
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        e.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(
            (prev) => prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        e.preventDefault();
        break;
      case "ArrowUp":
        if (isOpen) {
          setHighlightedIndex(
            (prev) => prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          e.preventDefault();
        }
        break;
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref: selectRef,
      className: selectClasses,
      onClick: handleToggle,
      onKeyDown: handleKeyDown,
      tabIndex: disabled ? -1 : 0,
      role: "combobox",
      "aria-expanded": isOpen,
      "aria-haspopup": "listbox",
      "aria-disabled": disabled,
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "layera-select__control", children: [
          startIcon && /* @__PURE__ */ jsx5("div", { className: "layera-select__start-icon", children: startIcon }),
          /* @__PURE__ */ jsx5("div", { className: "layera-select__value", children: searchable && isOpen ? /* @__PURE__ */ jsx5(
            "input",
            {
              ref: inputRef,
              type: "text",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "layera-select__search",
              placeholder: selectedOption?.label || resolvedPlaceholder,
              onClick: (e) => e.stopPropagation()
            }
          ) : /* @__PURE__ */ jsx5("span", { className: selectedOption ? "" : "layera-select__placeholder", children: selectedOption?.label || resolvedPlaceholder }) }),
          /* @__PURE__ */ jsxs3("div", { className: "layera-select__indicators", children: [
            loading && /* @__PURE__ */ jsx5("div", { className: "layera-select__loading", children: /* @__PURE__ */ jsx5("div", { className: "layera-select__spinner" }) }),
            clearable && value && !loading && /* @__PURE__ */ jsx5(
              "button",
              {
                className: "layera-select__clear",
                onClick: handleClear,
                tabIndex: -1,
                "aria-label": t("forms.select.clear"),
                children: "\xD7"
              }
            ),
            /* @__PURE__ */ jsx5("div", { className: "layera-select__arrow", children: /* @__PURE__ */ jsx5("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx5(
              "path",
              {
                d: "M3 4.5L6 7.5L9 4.5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) }) })
          ] })
        ] }),
        isOpen && /* @__PURE__ */ jsx5("div", { className: "layera-select__dropdown", role: "listbox", children: filteredOptions.length > 0 ? filteredOptions.map((option, index) => /* @__PURE__ */ jsx5(
          "div",
          {
            className: [
              "layera-select__option",
              option.disabled && "layera-select__option--disabled",
              index === highlightedIndex && "layera-select__option--highlighted",
              option.value === value && "layera-select__option--selected"
            ].filter(Boolean).join(" "),
            onClick: () => handleOptionSelect(option),
            role: "option",
            "aria-selected": option.value === value,
            "aria-disabled": option.disabled,
            children: option.label
          },
          option.value
        )) : /* @__PURE__ */ jsx5("div", { className: "layera-select__empty", children: resolvedEmptyMessage }) })
      ]
    }
  );
});
Select.displayName = "Select";

// src/components/FormSection/FormSection.tsx
import React5 from "react";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var FormSection = ({
  children,
  title,
  titleKey,
  description,
  descriptionKey,
  icon,
  className = "",
  collapsible = false,
  defaultCollapsed = false
}) => {
  const { t } = useLayeraTranslation();
  const [isCollapsed, setIsCollapsed] = React5.useState(defaultCollapsed);
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
  const sectionClasses = [
    "layera-form-section",
    collapsible && "layera-form-section--collapsible",
    isCollapsed && "layera-form-section--collapsed",
    className
  ].filter(Boolean).join(" ");
  const handleToggle = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };
  return /* @__PURE__ */ jsxs4("div", { className: sectionClasses, children: [
    (resolvedTitle || icon) && /* @__PURE__ */ jsxs4(
      "div",
      {
        className: "layera-form-section__header",
        onClick: handleToggle,
        role: collapsible ? "button" : void 0,
        tabIndex: collapsible ? 0 : void 0,
        "aria-expanded": collapsible ? !isCollapsed : void 0,
        children: [
          icon && /* @__PURE__ */ jsx6("div", { className: "layera-form-section__icon", children: icon }),
          /* @__PURE__ */ jsxs4("div", { className: "layera-form-section__header-content", children: [
            resolvedTitle && /* @__PURE__ */ jsx6("h3", { className: "layera-form-section__title", children: resolvedTitle }),
            resolvedDescription && /* @__PURE__ */ jsx6("p", { className: "layera-form-section__description", children: resolvedDescription })
          ] }),
          collapsible && /* @__PURE__ */ jsx6("div", { className: "layera-form-section__toggle", children: /* @__PURE__ */ jsx6(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              className: "layera-form-section__chevron",
              children: /* @__PURE__ */ jsx6(
                "path",
                {
                  d: "M4 6L8 10L12 6",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx6("div", { className: "layera-form-section__content", children })
  ] });
};

// src/components/FormActions/FormActions.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var FormActions = ({
  children,
  align = "right",
  className = "",
  sticky = false
}) => {
  const actionsClasses = [
    "layera-form-actions",
    `layera-form-actions--${align}`,
    sticky && "layera-form-actions--sticky",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx7("div", { className: actionsClasses, children: /* @__PURE__ */ jsx7("div", { className: "layera-form-actions__content", children }) });
};

// src/components/TextArea/TextArea.tsx
import { forwardRef as forwardRef3 } from "react";
import {
  FORM_SIZES as FORM_SIZES3,
  FORM_STATES as FORM_STATES4,
  INPUT_VARIANTS as INPUT_VARIANTS3
} from "@layera/constants";
import { jsx as jsx8 } from "react/jsx-runtime";
var TextArea = forwardRef3(({
  size = FORM_SIZES3.MEDIUM,
  variant = INPUT_VARIANTS3.DEFAULT,
  state = FORM_STATES4.DEFAULT,
  resize = "vertical",
  minRows = 3,
  maxRows,
  fullWidth = false,
  className = "",
  disabled,
  style,
  ...props
}, ref) => {
  const textAreaClasses = [
    "layera-textarea",
    `layera-textarea--${size}`,
    `layera-textarea--${variant}`,
    `layera-textarea--${state}`,
    `layera-textarea--resize-${resize}`,
    fullWidth && "layera-textarea--full-width",
    disabled && "layera-textarea--disabled",
    className
  ].filter(Boolean).join(" ");
  const wrapperClasses = [
    "layera-textarea-wrapper",
    `layera-textarea-wrapper--${size}`,
    `layera-textarea-wrapper--${variant}`,
    `layera-textarea-wrapper--${state}`,
    fullWidth && "layera-textarea-wrapper--full-width",
    disabled && "layera-textarea-wrapper--disabled"
  ].filter(Boolean).join(" ");
  const getMinHeight = () => {
    const lineHeight = size === FORM_SIZES3.SMALL ? 1.25 : size === FORM_SIZES3.LARGE ? 1.5 : 1.375;
    const fontSize = size === FORM_SIZES3.SMALL ? 14 : size === FORM_SIZES3.LARGE ? 18 : 16;
    const padding = size === FORM_SIZES3.SMALL ? 16 : size === FORM_SIZES3.LARGE ? 32 : 24;
    return minRows * fontSize * lineHeight + padding;
  };
  const getMaxHeight = () => {
    if (!maxRows) return void 0;
    const lineHeight = size === FORM_SIZES3.SMALL ? 1.25 : size === FORM_SIZES3.LARGE ? 1.5 : 1.375;
    const fontSize = size === FORM_SIZES3.SMALL ? 14 : size === FORM_SIZES3.LARGE ? 18 : 16;
    const padding = size === FORM_SIZES3.SMALL ? 16 : size === FORM_SIZES3.LARGE ? 32 : 24;
    return maxRows * fontSize * lineHeight + padding;
  };
  const textAreaStyle = {
    minHeight: `${getMinHeight()}px`,
    maxHeight: maxRows ? `${getMaxHeight()}px` : void 0,
    ...style
  };
  return /* @__PURE__ */ jsx8("div", { className: wrapperClasses, children: /* @__PURE__ */ jsx8(
    "textarea",
    {
      ref,
      disabled,
      className: textAreaClasses,
      style: textAreaStyle,
      ...props
    }
  ) });
});
TextArea.displayName = "TextArea";

// src/components/Checkbox/Checkbox.tsx
import React7, { forwardRef as forwardRef4 } from "react";
import {
  FORM_SIZES as FORM_SIZES4,
  FORM_STATES as FORM_STATES5
} from "@layera/constants";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var Checkbox = forwardRef4(({
  size = FORM_SIZES4.MEDIUM,
  state = FORM_STATES5.DEFAULT,
  label,
  description,
  error,
  indeterminate = false,
  fullWidth = false,
  loading = false,
  checkedIcon,
  indeterminateIcon,
  checked,
  className = "",
  disabled,
  id,
  ...props
}, ref) => {
  const t = (key) => {
    const translations = {
      "forms.required": "Required",
      "forms.optional": "Optional"
    };
    return translations[key] || key;
  };
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const actualState = error ? FORM_STATES5.ERROR : state;
  const wrapperClasses = [
    "layera-checkbox",
    `layera-checkbox--${size}`,
    `layera-checkbox--${actualState}`,
    fullWidth && "layera-checkbox--full-width",
    disabled && "layera-checkbox--disabled",
    loading && "layera-checkbox--loading",
    className
  ].filter(Boolean).join(" ");
  const inputClasses = [
    "layera-checkbox__input",
    indeterminate && "layera-checkbox__input--indeterminate"
  ].filter(Boolean).join(" ");
  const boxClasses = [
    "layera-checkbox__box",
    `layera-checkbox__box--${size}`,
    `layera-checkbox__box--${actualState}`,
    checked && "layera-checkbox__box--checked",
    indeterminate && "layera-checkbox__box--indeterminate",
    disabled && "layera-checkbox__box--disabled"
  ].filter(Boolean).join(" ");
  const inputRef = React7.useRef(null);
  React7.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const combinedRef = React7.useCallback((node) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);
  const renderIcon = () => {
    if (loading) {
      return /* @__PURE__ */ jsx9("div", { className: "layera-checkbox__spinner" });
    }
    if (indeterminate) {
      return indeterminateIcon || /* @__PURE__ */ jsx9("div", { className: "layera-checkbox__minus" });
    }
    if (checked) {
      return checkedIcon || /* @__PURE__ */ jsx9("svg", { className: "layera-checkbox__check", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx9("polyline", { points: "20,6 9,17 4,12", stroke: "currentColor", strokeWidth: "2" }) });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs5("div", { className: wrapperClasses, children: [
    /* @__PURE__ */ jsxs5("div", { className: "layera-checkbox__control", children: [
      /* @__PURE__ */ jsx9(
        "input",
        {
          ref: combinedRef,
          type: "checkbox",
          id: checkboxId,
          checked,
          disabled: disabled || loading,
          className: inputClasses,
          ...props
        }
      ),
      /* @__PURE__ */ jsx9("div", { className: boxClasses, children: renderIcon() })
    ] }),
    (label || description || error) && /* @__PURE__ */ jsxs5("div", { className: "layera-checkbox__content", children: [
      label && /* @__PURE__ */ jsxs5(
        "label",
        {
          htmlFor: checkboxId,
          className: "layera-checkbox__label",
          children: [
            label,
            props.required && /* @__PURE__ */ jsx9(
              "span",
              {
                className: "layera-checkbox__required",
                "aria-label": t("forms.required"),
                children: "*"
              }
            )
          ]
        }
      ),
      description && !error && /* @__PURE__ */ jsx9("div", { className: "layera-checkbox__description", children: description }),
      error && /* @__PURE__ */ jsx9(
        "div",
        {
          className: "layera-checkbox__error",
          role: "alert",
          "aria-live": "polite",
          children: error
        }
      )
    ] })
  ] });
});
Checkbox.displayName = "Checkbox";

// src/components/NumericInput/NumericInput.tsx
import { forwardRef as forwardRef5, useCallback as useCallback2, useEffect as useEffect2, useRef as useRef2 } from "react";
import {
  FORM_SIZES as FORM_SIZES5,
  FORM_STATES as FORM_STATES6
} from "@layera/constants";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var NumericInput = forwardRef5(({
  size = FORM_SIZES5.MEDIUM,
  state = FORM_STATES6.DEFAULT,
  value,
  onChange,
  min,
  max,
  step = 1,
  precision = 0,
  showSteppers = true,
  stepperPosition = "right",
  label,
  description,
  error,
  fullWidth = false,
  loading = false,
  formatValue,
  parseValue,
  prefix,
  suffix,
  enableWheel = true,
  enableLongPress = true,
  className = "",
  disabled,
  id,
  ...props
}, ref) => {
  const t = (key) => {
    const translations = {
      "forms.required": "Required",
      "forms.increment": "Increment",
      "forms.decrement": "Decrement"
    };
    return translations[key] || key;
  };
  const inputId = id || `numeric-input-${Math.random().toString(36).substr(2, 9)}`;
  const incrementRef = useRef2(null);
  const decrementRef = useRef2(null);
  const longPressTimerRef = useRef2(null);
  const longPressIntervalRef = useRef2(null);
  const actualState = error ? FORM_STATES6.ERROR : state;
  const formatDisplayValue = useCallback2((val) => {
    if (val === void 0 || val === null || isNaN(val)) return "";
    if (formatValue) {
      return formatValue(val);
    }
    const formatted = precision > 0 ? val.toFixed(precision) : val.toString();
    return `${prefix || ""}${formatted}${suffix || ""}`;
  }, [formatValue, precision, prefix, suffix]);
  const parseInputValue = useCallback2((inputVal) => {
    if (!inputVal.trim()) return void 0;
    let cleanValue = inputVal;
    if (prefix) cleanValue = cleanValue.replace(prefix, "");
    if (suffix) cleanValue = cleanValue.replace(suffix, "");
    if (parseValue) {
      return parseValue(cleanValue);
    }
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? void 0 : parsed;
  }, [parseValue, prefix, suffix]);
  const validateValue = useCallback2((val) => {
    if (val === void 0) return void 0;
    let constrainedValue = val;
    if (min !== void 0 && constrainedValue < min) constrainedValue = min;
    if (max !== void 0 && constrainedValue > max) constrainedValue = max;
    if (precision > 0) {
      constrainedValue = parseFloat(constrainedValue.toFixed(precision));
    }
    return constrainedValue;
  }, [min, max, precision]);
  const incrementValue = useCallback2(() => {
    const currentValue = value || 0;
    const newValue = currentValue + step;
    const validatedValue = validateValue(newValue);
    if (validatedValue !== void 0 && onChange) {
      onChange(validatedValue);
    }
  }, [value, step, validateValue, onChange]);
  const decrementValue = useCallback2(() => {
    const currentValue = value || 0;
    const newValue = currentValue - step;
    const validatedValue = validateValue(newValue);
    if (validatedValue !== void 0 && onChange) {
      onChange(validatedValue);
    }
  }, [value, step, validateValue, onChange]);
  const handleInputChange = useCallback2((event) => {
    const inputValue = event.target.value;
    const parsedValue = parseInputValue(inputValue);
    const validatedValue = validateValue(parsedValue);
    if (onChange) {
      onChange(validatedValue);
    }
  }, [parseInputValue, validateValue, onChange]);
  const handleWheel = useCallback2((event) => {
    if (!enableWheel || disabled || loading) return;
    event.preventDefault();
    const delta = event.deltaY;
    if (delta < 0) {
      incrementValue();
    } else if (delta > 0) {
      decrementValue();
    }
  }, [enableWheel, disabled, loading, incrementValue, decrementValue]);
  const startLongPress = useCallback2((action) => {
    if (!enableLongPress) return;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current);
    longPressTimerRef.current = setTimeout(() => {
      longPressIntervalRef.current = setInterval(action, 100);
    }, 500);
  }, [enableLongPress]);
  const stopLongPress = useCallback2(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (longPressIntervalRef.current) {
      clearInterval(longPressIntervalRef.current);
      longPressIntervalRef.current = null;
    }
  }, []);
  useEffect2(() => {
    return () => {
      stopLongPress();
    };
  }, [stopLongPress]);
  const wrapperClasses = [
    "layera-numeric-input",
    `layera-numeric-input--${size}`,
    `layera-numeric-input--${actualState}`,
    `layera-numeric-input--steppers-${stepperPosition}`,
    fullWidth && "layera-numeric-input--full-width",
    showSteppers && "layera-numeric-input--has-steppers",
    disabled && "layera-numeric-input--disabled",
    loading && "layera-numeric-input--loading",
    className
  ].filter(Boolean).join(" ");
  const inputClasses = [
    "layera-numeric-input__input",
    `layera-numeric-input__input--${size}`,
    `layera-numeric-input__input--${actualState}`
  ].filter(Boolean).join(" ");
  const canIncrement = !disabled && !loading && (max === void 0 || (value || 0) < max);
  const canDecrement = !disabled && !loading && (min === void 0 || (value || 0) > min);
  return /* @__PURE__ */ jsxs6("div", { className: wrapperClasses, children: [
    label && /* @__PURE__ */ jsxs6("label", { htmlFor: inputId, className: "layera-numeric-input__label", children: [
      label,
      props.required && /* @__PURE__ */ jsx10(
        "span",
        {
          className: "layera-numeric-input__required",
          "aria-label": t("forms.required"),
          children: "*"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "layera-numeric-input__control", children: [
      stepperPosition === "separate" && showSteppers && /* @__PURE__ */ jsx10(
        "button",
        {
          ref: decrementRef,
          type: "button",
          className: "layera-numeric-input__stepper layera-numeric-input__stepper--decrement",
          disabled: !canDecrement,
          onClick: decrementValue,
          onMouseDown: () => startLongPress(decrementValue),
          onMouseUp: stopLongPress,
          onMouseLeave: stopLongPress,
          "aria-label": t("forms.decrement"),
          children: /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-numeric-input__stepper-icon", children: /* @__PURE__ */ jsx10("line", { x1: "5", y1: "12", x2: "19", y2: "12", stroke: "currentColor", strokeWidth: "2" }) })
        }
      ),
      /* @__PURE__ */ jsxs6("div", { className: "layera-numeric-input__input-wrapper", children: [
        prefix && /* @__PURE__ */ jsx10("span", { className: "layera-numeric-input__prefix", children: prefix }),
        /* @__PURE__ */ jsx10(
          "input",
          {
            ref,
            type: "text",
            id: inputId,
            value: formatDisplayValue(value),
            onChange: handleInputChange,
            onWheel: handleWheel,
            disabled: disabled || loading,
            className: inputClasses,
            ...props
          }
        ),
        suffix && /* @__PURE__ */ jsx10("span", { className: "layera-numeric-input__suffix", children: suffix }),
        loading && /* @__PURE__ */ jsx10("div", { className: "layera-numeric-input__loading", children: /* @__PURE__ */ jsx10("div", { className: "layera-numeric-input__spinner" }) }),
        stepperPosition === "inline" && showSteppers && /* @__PURE__ */ jsxs6("div", { className: "layera-numeric-input__steppers-inline", children: [
          /* @__PURE__ */ jsx10(
            "button",
            {
              type: "button",
              className: "layera-numeric-input__stepper layera-numeric-input__stepper--decrement",
              disabled: !canDecrement,
              onClick: decrementValue,
              onMouseDown: () => startLongPress(decrementValue),
              onMouseUp: stopLongPress,
              onMouseLeave: stopLongPress,
              "aria-label": t("forms.decrement"),
              children: /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-numeric-input__stepper-icon", children: /* @__PURE__ */ jsx10("line", { x1: "5", y1: "12", x2: "19", y2: "12", stroke: "currentColor", strokeWidth: "2" }) })
            }
          ),
          /* @__PURE__ */ jsx10(
            "button",
            {
              type: "button",
              className: "layera-numeric-input__stepper layera-numeric-input__stepper--increment",
              disabled: !canIncrement,
              onClick: incrementValue,
              onMouseDown: () => startLongPress(incrementValue),
              onMouseUp: stopLongPress,
              onMouseLeave: stopLongPress,
              "aria-label": t("forms.increment"),
              children: /* @__PURE__ */ jsxs6("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-numeric-input__stepper-icon", children: [
                /* @__PURE__ */ jsx10("line", { x1: "12", y1: "5", x2: "12", y2: "19", stroke: "currentColor", strokeWidth: "2" }),
                /* @__PURE__ */ jsx10("line", { x1: "5", y1: "12", x2: "19", y2: "12", stroke: "currentColor", strokeWidth: "2" })
              ] })
            }
          )
        ] })
      ] }),
      stepperPosition === "right" && showSteppers && /* @__PURE__ */ jsxs6("div", { className: "layera-numeric-input__steppers-right", children: [
        /* @__PURE__ */ jsx10(
          "button",
          {
            ref: incrementRef,
            type: "button",
            className: "layera-numeric-input__stepper layera-numeric-input__stepper--increment",
            disabled: !canIncrement,
            onClick: incrementValue,
            onMouseDown: () => startLongPress(incrementValue),
            onMouseUp: stopLongPress,
            onMouseLeave: stopLongPress,
            "aria-label": t("forms.increment"),
            children: /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-numeric-input__stepper-icon", children: /* @__PURE__ */ jsx10("polyline", { points: "18,15 12,9 6,15", stroke: "currentColor", strokeWidth: "2" }) })
          }
        ),
        /* @__PURE__ */ jsx10(
          "button",
          {
            ref: decrementRef,
            type: "button",
            className: "layera-numeric-input__stepper layera-numeric-input__stepper--decrement",
            disabled: !canDecrement,
            onClick: decrementValue,
            onMouseDown: () => startLongPress(decrementValue),
            onMouseUp: stopLongPress,
            onMouseLeave: stopLongPress,
            "aria-label": t("forms.decrement"),
            children: /* @__PURE__ */ jsx10("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-numeric-input__stepper-icon", children: /* @__PURE__ */ jsx10("polyline", { points: "6,9 12,15 18,9", stroke: "currentColor", strokeWidth: "2" }) })
          }
        )
      ] }),
      stepperPosition === "separate" && showSteppers && /* @__PURE__ */ jsx10(
        "button",
        {
          ref: incrementRef,
          type: "button",
          className: "layera-numeric-input__stepper layera-numeric-input__stepper--increment",
          disabled: !canIncrement,
          onClick: incrementValue,
          onMouseDown: () => startLongPress(incrementValue),
          onMouseUp: stopLongPress,
          onMouseLeave: stopLongPress,
          "aria-label": t("forms.increment"),
          children: /* @__PURE__ */ jsxs6("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-numeric-input__stepper-icon", children: [
            /* @__PURE__ */ jsx10("line", { x1: "12", y1: "5", x2: "12", y2: "19", stroke: "currentColor", strokeWidth: "2" }),
            /* @__PURE__ */ jsx10("line", { x1: "5", y1: "12", x2: "19", y2: "12", stroke: "currentColor", strokeWidth: "2" })
          ] })
        }
      )
    ] }),
    (description || error) && /* @__PURE__ */ jsxs6("div", { className: "layera-numeric-input__footer", children: [
      description && !error && /* @__PURE__ */ jsx10("div", { className: "layera-numeric-input__description", children: description }),
      error && /* @__PURE__ */ jsx10(
        "div",
        {
          className: "layera-numeric-input__error",
          role: "alert",
          "aria-live": "polite",
          children: error
        }
      )
    ] })
  ] });
});
NumericInput.displayName = "NumericInput";

// src/components/Slider/Slider.tsx
import { forwardRef as forwardRef6, useCallback as useCallback3, useRef as useRef3, useState as useState2 } from "react";
import {
  FORM_SIZES as FORM_SIZES6,
  FORM_STATES as FORM_STATES7
} from "@layera/constants";
import { Fragment, jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var Slider = forwardRef6(({
  size = FORM_SIZES6.MEDIUM,
  state = FORM_STATES7.DEFAULT,
  value,
  values,
  onChange,
  onRangeChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  error,
  fullWidth = false,
  range = false,
  showValue = false,
  showTooltip = false,
  formatValue,
  variant = "default",
  orientation = "horizontal",
  marks = false,
  disabled = false,
  loading = false,
  reverse = false,
  className = "",
  id,
  ...props
}, ref) => {
  const t = (key) => {
    const translations = {
      "forms.required": "Required",
      "slider.value": "Value"
    };
    return translations[key] || key;
  };
  const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;
  const trackRef = useRef3(null);
  const [isDragging, setIsDragging] = useState2(null);
  const [showTooltips, setShowTooltips] = useState2([false, false]);
  const actualState = error ? FORM_STATES7.ERROR : state;
  const currentValues = range && values ? values : [value || min, max];
  const minValue = currentValues[0];
  const maxValue = range ? currentValues[1] : currentValues[0];
  const formatDisplayValue = useCallback3((val) => {
    if (formatValue) {
      return formatValue(val);
    }
    return val.toString();
  }, [formatValue]);
  const getValueFromPosition = useCallback3((clientX, clientY) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    let percentage;
    if (orientation === "horizontal") {
      const x = clientX - rect.left;
      percentage = reverse ? 1 - x / rect.width : x / rect.width;
    } else {
      const y = clientY - rect.top;
      percentage = reverse ? y / rect.height : 1 - y / rect.height;
    }
    percentage = Math.max(0, Math.min(1, percentage));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  }, [min, max, step, orientation, reverse]);
  const getPercentageFromValue = useCallback3((val) => {
    const percentage = (val - min) / (max - min);
    return reverse ? 100 - percentage * 100 : percentage * 100;
  }, [min, max, reverse]);
  const handlePointerStart = useCallback3((event, thumbIndex) => {
    if (disabled || loading) return;
    event.preventDefault();
    setIsDragging(thumbIndex);
    if (showTooltip) {
      const newTooltips = [false, false];
      newTooltips[thumbIndex] = true;
      setShowTooltips(newTooltips);
    }
    event.target.setPointerCapture(event.pointerId);
  }, [disabled, loading, showTooltip]);
  const handlePointerMove = useCallback3((event) => {
    if (isDragging === null || disabled || loading) return;
    event.preventDefault();
    const newValue = getValueFromPosition(event.clientX, event.clientY);
    if (range && values && onRangeChange) {
      const newValues = [...values];
      if (isDragging === 0) {
        newValues[0] = Math.min(newValue, values[1]);
      } else {
        newValues[1] = Math.max(newValue, values[0]);
      }
      onRangeChange(newValues);
    } else if (!range && onChange) {
      onChange(newValue);
    }
  }, [isDragging, disabled, loading, getValueFromPosition, range, values, onRangeChange, onChange]);
  const handlePointerEnd = useCallback3((event) => {
    if (isDragging === null) return;
    setIsDragging(null);
    setShowTooltips([false, false]);
    event.target.releasePointerCapture(event.pointerId);
  }, [isDragging]);
  const handleTrackClick = useCallback3((event) => {
    if (disabled || loading || isDragging !== null) return;
    const newValue = getValueFromPosition(event.clientX, event.clientY);
    if (range && values && onRangeChange) {
      const distanceToMin = Math.abs(newValue - values[0]);
      const distanceToMax = Math.abs(newValue - values[1]);
      const newValues = [...values];
      if (distanceToMin <= distanceToMax) {
        newValues[0] = Math.min(newValue, values[1]);
      } else {
        newValues[1] = Math.max(newValue, values[0]);
      }
      onRangeChange(newValues);
    } else if (!range && onChange) {
      onChange(newValue);
    }
  }, [disabled, loading, isDragging, getValueFromPosition, range, values, onRangeChange, onChange]);
  const generateMarks = useCallback3(() => {
    if (!marks) return [];
    if (Array.isArray(marks)) {
      return marks;
    }
    const markValues = [];
    const numMarks = Math.min(11, Math.floor((max - min) / step) + 1);
    const markStep = (max - min) / (numMarks - 1);
    for (let i = 0; i < numMarks; i++) {
      const markValue = min + i * markStep;
      markValues.push({ value: markValue });
    }
    return markValues;
  }, [marks, min, max, step]);
  const sliderMarks = generateMarks();
  const wrapperClasses = [
    "layera-slider",
    `layera-slider--${size}`,
    `layera-slider--${actualState}`,
    `layera-slider--${variant}`,
    `layera-slider--${orientation}`,
    fullWidth && "layera-slider--full-width",
    range && "layera-slider--range",
    disabled && "layera-slider--disabled",
    loading && "layera-slider--loading",
    reverse && "layera-slider--reverse",
    className
  ].filter(Boolean).join(" ");
  const trackClasses = [
    "layera-slider__track",
    isDragging !== null && "layera-slider__track--dragging"
  ].filter(Boolean).join(" ");
  const getTrackFillStyle = () => {
    const minPercent = getPercentageFromValue(minValue);
    const maxPercent = getPercentageFromValue(maxValue);
    if (orientation === "horizontal") {
      if (range) {
        return {
          left: `${Math.min(minPercent, maxPercent)}%`,
          width: `${Math.abs(maxPercent - minPercent)}%`
        };
      } else {
        return {
          left: reverse ? `${maxPercent}%` : "0%",
          width: `${reverse ? 100 - maxPercent : maxPercent}%`
        };
      }
    } else {
      if (range) {
        const bottomPercent = Math.min(minPercent, maxPercent);
        const topPercent = Math.max(minPercent, maxPercent);
        return {
          bottom: `${bottomPercent}%`,
          height: `${topPercent - bottomPercent}%`
        };
      } else {
        return {
          bottom: reverse ? `${100 - maxPercent}%` : "0%",
          height: `${reverse ? 100 - maxPercent : maxPercent}%`
        };
      }
    }
  };
  const getThumbStyle = (val) => {
    const percent = getPercentageFromValue(val);
    if (orientation === "horizontal") {
      return { left: `${percent}%` };
    } else {
      return { bottom: `${percent}%` };
    }
  };
  return /* @__PURE__ */ jsxs7("div", { className: wrapperClasses, ...props, ref, children: [
    label && /* @__PURE__ */ jsxs7("label", { htmlFor: sliderId, className: "layera-slider__label", children: [
      label,
      props.required && /* @__PURE__ */ jsx11(
        "span",
        {
          className: "layera-slider__required",
          "aria-label": t("forms.required"),
          children: "*"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "layera-slider__container", children: [
      showValue && /* @__PURE__ */ jsx11("div", { className: "layera-slider__values", children: range ? /* @__PURE__ */ jsxs7(Fragment, { children: [
        /* @__PURE__ */ jsx11("span", { className: "layera-slider__value", children: formatDisplayValue(minValue) }),
        /* @__PURE__ */ jsx11("span", { className: "layera-slider__value-separator", children: "-" }),
        /* @__PURE__ */ jsx11("span", { className: "layera-slider__value", children: formatDisplayValue(maxValue) })
      ] }) : /* @__PURE__ */ jsx11("span", { className: "layera-slider__value", children: formatDisplayValue(maxValue) }) }),
      /* @__PURE__ */ jsxs7("div", { className: "layera-slider__track-container", children: [
        sliderMarks.length > 0 && /* @__PURE__ */ jsx11("div", { className: "layera-slider__marks", children: sliderMarks.map((mark, index) => /* @__PURE__ */ jsxs7(
          "div",
          {
            className: "layera-slider__mark",
            style: getThumbStyle(mark.value),
            children: [
              /* @__PURE__ */ jsx11("div", { className: "layera-slider__mark-dot" }),
              mark.label && /* @__PURE__ */ jsx11("div", { className: "layera-slider__mark-label", children: mark.label })
            ]
          },
          index
        )) }),
        /* @__PURE__ */ jsxs7(
          "div",
          {
            ref: trackRef,
            className: trackClasses,
            onClick: handleTrackClick,
            children: [
              /* @__PURE__ */ jsx11("div", { className: "layera-slider__track-background" }),
              /* @__PURE__ */ jsx11(
                "div",
                {
                  className: "layera-slider__track-fill",
                  style: getTrackFillStyle()
                }
              ),
              !range && /* @__PURE__ */ jsx11(
                "div",
                {
                  className: "layera-slider__thumb",
                  style: getThumbStyle(maxValue),
                  onPointerDown: (e) => handlePointerStart(e, 0),
                  onPointerMove: handlePointerMove,
                  onPointerUp: handlePointerEnd,
                  onPointerCancel: handlePointerEnd,
                  role: "slider",
                  "aria-valuemin": min,
                  "aria-valuemax": max,
                  "aria-valuenow": maxValue,
                  "aria-valuetext": formatDisplayValue(maxValue),
                  tabIndex: disabled ? -1 : 0,
                  children: showTooltip && showTooltips[0] && /* @__PURE__ */ jsx11("div", { className: "layera-slider__tooltip", children: formatDisplayValue(maxValue) })
                }
              ),
              range && /* @__PURE__ */ jsxs7(Fragment, { children: [
                /* @__PURE__ */ jsx11(
                  "div",
                  {
                    className: "layera-slider__thumb layera-slider__thumb--min",
                    style: getThumbStyle(minValue),
                    onPointerDown: (e) => handlePointerStart(e, 0),
                    onPointerMove: handlePointerMove,
                    onPointerUp: handlePointerEnd,
                    onPointerCancel: handlePointerEnd,
                    role: "slider",
                    "aria-valuemin": min,
                    "aria-valuemax": maxValue,
                    "aria-valuenow": minValue,
                    "aria-valuetext": formatDisplayValue(minValue),
                    tabIndex: disabled ? -1 : 0,
                    children: showTooltip && showTooltips[0] && /* @__PURE__ */ jsx11("div", { className: "layera-slider__tooltip", children: formatDisplayValue(minValue) })
                  }
                ),
                /* @__PURE__ */ jsx11(
                  "div",
                  {
                    className: "layera-slider__thumb layera-slider__thumb--max",
                    style: getThumbStyle(maxValue),
                    onPointerDown: (e) => handlePointerStart(e, 1),
                    onPointerMove: handlePointerMove,
                    onPointerUp: handlePointerEnd,
                    onPointerCancel: handlePointerEnd,
                    role: "slider",
                    "aria-valuemin": minValue,
                    "aria-valuemax": max,
                    "aria-valuenow": maxValue,
                    "aria-valuetext": formatDisplayValue(maxValue),
                    tabIndex: disabled ? -1 : 0,
                    children: showTooltip && showTooltips[1] && /* @__PURE__ */ jsx11("div", { className: "layera-slider__tooltip", children: formatDisplayValue(maxValue) })
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      loading && /* @__PURE__ */ jsx11("div", { className: "layera-slider__loading", children: /* @__PURE__ */ jsx11("div", { className: "layera-slider__spinner" }) })
    ] }),
    (description || error) && /* @__PURE__ */ jsxs7("div", { className: "layera-slider__footer", children: [
      description && !error && /* @__PURE__ */ jsx11("div", { className: "layera-slider__description", children: description }),
      error && /* @__PURE__ */ jsx11(
        "div",
        {
          className: "layera-slider__error",
          role: "alert",
          "aria-live": "polite",
          children: error
        }
      )
    ] })
  ] });
});
Slider.displayName = "Slider";

// src/components/DatePicker/DatePicker.tsx
import { forwardRef as forwardRef7, useCallback as useCallback4, useEffect as useEffect4, useRef as useRef4, useState as useState3 } from "react";
import {
  FORM_SIZES as FORM_SIZES7,
  FORM_STATES as FORM_STATES8
} from "@layera/constants";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var DatePicker = forwardRef7(({
  size = FORM_SIZES7.MEDIUM,
  state = FORM_STATES8.DEFAULT,
  value,
  onChange,
  minDate,
  maxDate,
  label,
  description,
  error,
  fullWidth = false,
  showCalendar = true,
  showToday = true,
  showTime = false,
  range = false,
  rangeValue,
  onRangeChange,
  multiple = false,
  multipleValue = [],
  onMultipleChange,
  locale = "en-US",
  format = "MM/dd/yyyy",
  isDateDisabled,
  disabled = false,
  loading = false,
  numberOfMonths = 1,
  placeholder,
  className = "",
  id,
  ...props
}, ref) => {
  const t = (key) => {
    const translations = {
      "forms.required": "Required",
      "datepicker.today": "Today",
      "datepicker.clear": "Clear",
      "datepicker.previous": "Previous month",
      "datepicker.next": "Next month",
      "datepicker.selectDate": "Select date"
    };
    return translations[key] || key;
  };
  const datePickerId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  const [isOpen, setIsOpen] = useState3(false);
  const [displayDate, setDisplayDate] = useState3(() => value || /* @__PURE__ */ new Date());
  const [inputValue, setInputValue] = useState3("");
  const containerRef = useRef4(null);
  const inputRef = useRef4(null);
  const actualState = error ? FORM_STATES8.ERROR : state;
  const formatDate = useCallback4((date) => {
    if (!date) return "";
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      if (showTime) {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${month}/${day}/${year} ${hours}:${minutes}`;
      }
      return `${month}/${day}/${year}`;
    } catch {
      return "";
    }
  }, [showTime]);
  const parseDate = useCallback4((dateString) => {
    if (!dateString.trim()) return void 0;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? void 0 : date;
    } catch {
      return void 0;
    }
  }, []);
  useEffect4(() => {
    setInputValue(formatDate(value));
  }, [value, formatDate]);
  const isDisabled = useCallback4((date) => {
    if (isDateDisabled && isDateDisabled(date)) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }, [isDateDisabled, minDate, maxDate]);
  const isSelected = useCallback4((date) => {
    if (multiple) {
      return multipleValue.some(
        (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()
      );
    }
    if (range && rangeValue) {
      const [start, end] = rangeValue;
      if (start && end) {
        return date >= start && date <= end;
      }
      if (start) {
        return date.getTime() === start.getTime();
      }
      return false;
    }
    if (value) {
      return date.getDate() === value.getDate() && date.getMonth() === value.getMonth() && date.getFullYear() === value.getFullYear();
    }
    return false;
  }, [value, multiple, multipleValue, range, rangeValue]);
  const handleInputChange = useCallback4((event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const parsedDate = parseDate(newValue);
    if (parsedDate && !isDisabled(parsedDate)) {
      if (onChange) {
        onChange(parsedDate);
      }
      setDisplayDate(parsedDate);
    }
  }, [parseDate, isDisabled, onChange]);
  const handleDateSelect = useCallback4((date) => {
    if (isDisabled(date)) return;
    if (multiple) {
      const newValues = isSelected(date) ? multipleValue.filter((d) => d.getTime() !== date.getTime()) : [...multipleValue, date];
      if (onMultipleChange) {
        onMultipleChange(newValues);
      }
    } else if (range) {
      if (rangeValue && onRangeChange) {
        const [start, end] = rangeValue;
        if (!start || start && end) {
          onRangeChange([date, void 0]);
        } else {
          const newRange = start <= date ? [start, date] : [date, start];
          onRangeChange(newRange);
          setIsOpen(false);
        }
      }
    } else {
      if (onChange) {
        onChange(date);
      }
      setIsOpen(false);
    }
  }, [isDisabled, isSelected, multiple, multipleValue, onMultipleChange, range, rangeValue, onRangeChange, onChange]);
  const handleToday = useCallback4(() => {
    const today = /* @__PURE__ */ new Date();
    handleDateSelect(today);
  }, [handleDateSelect]);
  const handleClear = useCallback4(() => {
    if (onChange) {
      onChange(void 0);
    }
    if (onRangeChange) {
      onRangeChange([void 0, void 0]);
    }
    if (onMultipleChange) {
      onMultipleChange([]);
    }
    setInputValue("");
    setIsOpen(false);
  }, [onChange, onRangeChange, onMultipleChange]);
  const navigateMonth = useCallback4((direction) => {
    setDisplayDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  }, []);
  const generateCalendarDays = useCallback4((baseDate) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const current = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, []);
  useEffect4(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);
  const wrapperClasses = [
    "layera-datepicker",
    `layera-datepicker--${size}`,
    `layera-datepicker--${actualState}`,
    fullWidth && "layera-datepicker--full-width",
    disabled && "layera-datepicker--disabled",
    loading && "layera-datepicker--loading",
    isOpen && "layera-datepicker--open",
    className
  ].filter(Boolean).join(" ");
  const inputClasses = [
    "layera-datepicker__input",
    `layera-datepicker__input--${size}`,
    `layera-datepicker__input--${actualState}`
  ].filter(Boolean).join(" ");
  const calendarDays = generateCalendarDays(displayDate);
  return /* @__PURE__ */ jsxs8("div", { className: wrapperClasses, ref: containerRef, children: [
    label && /* @__PURE__ */ jsxs8("label", { htmlFor: datePickerId, className: "layera-datepicker__label", children: [
      label,
      props.required && /* @__PURE__ */ jsx12(
        "span",
        {
          className: "layera-datepicker__required",
          "aria-label": t("forms.required"),
          children: "*"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "layera-datepicker__input-wrapper", children: [
      /* @__PURE__ */ jsx12(
        "input",
        {
          ref: ref || inputRef,
          type: "text",
          id: datePickerId,
          value: inputValue,
          onChange: handleInputChange,
          onClick: () => showCalendar && setIsOpen(true),
          disabled: disabled || loading,
          placeholder: placeholder || t("datepicker.selectDate"),
          className: inputClasses,
          ...props
        }
      ),
      showCalendar && /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          className: "layera-datepicker__toggle",
          onClick: () => setIsOpen(!isOpen),
          disabled: disabled || loading,
          "aria-label": t("datepicker.selectDate"),
          children: /* @__PURE__ */ jsxs8("svg", { viewBox: "0 0 24 24", fill: "none", className: "layera-datepicker__calendar-icon", children: [
            /* @__PURE__ */ jsx12("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2", stroke: "currentColor", strokeWidth: "2" }),
            /* @__PURE__ */ jsx12("line", { x1: "16", y1: "2", x2: "16", y2: "6", stroke: "currentColor", strokeWidth: "2" }),
            /* @__PURE__ */ jsx12("line", { x1: "8", y1: "2", x2: "8", y2: "6", stroke: "currentColor", strokeWidth: "2" }),
            /* @__PURE__ */ jsx12("line", { x1: "3", y1: "10", x2: "21", y2: "10", stroke: "currentColor", strokeWidth: "2" })
          ] })
        }
      ),
      loading && /* @__PURE__ */ jsx12("div", { className: "layera-datepicker__loading", children: /* @__PURE__ */ jsx12("div", { className: "layera-datepicker__spinner" }) })
    ] }),
    isOpen && showCalendar && /* @__PURE__ */ jsxs8("div", { className: "layera-datepicker__calendar", children: [
      /* @__PURE__ */ jsxs8("div", { className: "layera-datepicker__header", children: [
        /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            className: "layera-datepicker__nav",
            onClick: () => navigateMonth("prev"),
            "aria-label": t("datepicker.previous"),
            children: /* @__PURE__ */ jsx12("svg", { viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx12("polyline", { points: "15,18 9,12 15,6", stroke: "currentColor", strokeWidth: "2" }) })
          }
        ),
        /* @__PURE__ */ jsxs8("div", { className: "layera-datepicker__month-year", children: [
          MONTHS[displayDate.getMonth()],
          " ",
          displayDate.getFullYear()
        ] }),
        /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            className: "layera-datepicker__nav",
            onClick: () => navigateMonth("next"),
            "aria-label": t("datepicker.next"),
            children: /* @__PURE__ */ jsx12("svg", { viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx12("polyline", { points: "9,18 15,12 9,6", stroke: "currentColor", strokeWidth: "2" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx12("div", { className: "layera-datepicker__weekdays", children: WEEKDAYS.map((day) => /* @__PURE__ */ jsx12("div", { className: "layera-datepicker__weekday", children: day }, day)) }),
      /* @__PURE__ */ jsx12("div", { className: "layera-datepicker__days", children: calendarDays.map((date, index) => {
        const isCurrentMonth = date.getMonth() === displayDate.getMonth();
        const isToday = date.getDate() === (/* @__PURE__ */ new Date()).getDate() && date.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && date.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear();
        const dayClasses = [
          "layera-datepicker__day",
          isCurrentMonth && "layera-datepicker__day--current-month",
          isToday && "layera-datepicker__day--today",
          isSelected(date) && "layera-datepicker__day--selected",
          isDisabled(date) && "layera-datepicker__day--disabled"
        ].filter(Boolean).join(" ");
        return /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            className: dayClasses,
            onClick: () => handleDateSelect(date),
            disabled: isDisabled(date),
            children: date.getDate()
          },
          index
        );
      }) }),
      /* @__PURE__ */ jsxs8("div", { className: "layera-datepicker__footer", children: [
        showToday && /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            className: "layera-datepicker__today",
            onClick: handleToday,
            children: t("datepicker.today")
          }
        ),
        /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            className: "layera-datepicker__clear",
            onClick: handleClear,
            children: t("datepicker.clear")
          }
        )
      ] })
    ] }),
    (description || error) && /* @__PURE__ */ jsxs8("div", { className: "layera-datepicker__footer-text", children: [
      description && !error && /* @__PURE__ */ jsx12("div", { className: "layera-datepicker__description", children: description }),
      error && /* @__PURE__ */ jsx12(
        "div",
        {
          className: "layera-datepicker__error",
          role: "alert",
          "aria-live": "polite",
          children: error
        }
      )
    ] })
  ] });
});
DatePicker.displayName = "DatePicker";

// src/components/InputGroup/InputGroup.tsx
import React11, { forwardRef as forwardRef8, useCallback as useCallback5, useMemo } from "react";
import {
  FORM_SIZES as FORM_SIZES8,
  FORM_STATES as FORM_STATES9
} from "@layera/constants";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
var InputGroupContext = React11.createContext(void 0);
var InputGroupItem = forwardRef8(({
  name,
  flex,
  minWidth,
  maxWidth,
  grow = false,
  shrink = true,
  className = "",
  children,
  ...props
}, ref) => {
  const context = React11.useContext(InputGroupContext);
  if (!context) {
    throw new Error("InputGroup.Item must be used within an InputGroup");
  }
  const { variant, direction } = context;
  const itemStyle = {
    flex,
    minWidth,
    maxWidth,
    flexGrow: grow ? 1 : 0,
    flexShrink: shrink ? 1 : 0,
    ...props.style
  };
  const itemClasses = [
    "layera-input-group__item",
    `layera-input-group__item--${variant}`,
    `layera-input-group__item--${direction}`,
    grow && "layera-input-group__item--grow",
    className
  ].filter(Boolean).join(" ");
  const enhancedChildren = React11.Children.map(children, (child) => {
    if (React11.isValidElement(child)) {
      const commonProps = {
        size: context.size,
        state: context.state,
        disabled: context.disabled,
        loading: context.loading
      };
      if (child.props.onChange) {
        const originalOnChange = child.props.onChange;
        commonProps.onChange = (value) => {
          originalOnChange(value);
          context.onItemChange(name, value);
        };
      }
      return React11.cloneElement(child, commonProps);
    }
    return child;
  });
  return /* @__PURE__ */ jsx13(
    "div",
    {
      ref,
      className: itemClasses,
      style: itemStyle,
      "data-name": name,
      ...props,
      children: enhancedChildren
    }
  );
});
InputGroupItem.displayName = "InputGroup.Item";
var InputGroup = forwardRef8(({
  size = FORM_SIZES8.MEDIUM,
  state = FORM_STATES9.DEFAULT,
  variant = "connected",
  direction = "horizontal",
  distribution = "auto",
  gap = 8,
  label,
  description,
  error,
  fullWidth = false,
  onGroupChange,
  disabled = false,
  loading = false,
  required = false,
  validate,
  className = "",
  children,
  id,
  ...props
}, ref) => {
  const t = (key) => {
    const translations = {
      "forms.required": "Required"
    };
    return translations[key] || key;
  };
  const groupId = id || `input-group-${Math.random().toString(36).substr(2, 9)}`;
  const [values, setValues] = React11.useState({});
  const actualState = error ? FORM_STATES9.ERROR : state;
  const handleItemChange = useCallback5((name, value) => {
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      let validationError;
      if (validate) {
        validationError = validate(newValues);
      }
      if (onGroupChange) {
        onGroupChange(newValues);
      }
      return newValues;
    });
  }, [validate, onGroupChange]);
  const contextValue = useMemo(() => ({
    size,
    state: actualState,
    variant,
    direction,
    disabled,
    loading,
    onItemChange: handleItemChange,
    values
  }), [size, actualState, variant, direction, disabled, loading, handleItemChange, values]);
  const wrapperClasses = [
    "layera-input-group",
    `layera-input-group--${size}`,
    `layera-input-group--${actualState}`,
    `layera-input-group--${variant}`,
    `layera-input-group--${direction}`,
    `layera-input-group--${distribution}`,
    fullWidth && "layera-input-group--full-width",
    disabled && "layera-input-group--disabled",
    loading && "layera-input-group--loading",
    className
  ].filter(Boolean).join(" ");
  const containerClasses = [
    "layera-input-group__container",
    `layera-input-group__container--${variant}`,
    `layera-input-group__container--${direction}`
  ].filter(Boolean).join(" ");
  const containerStyle = {
    gap: variant === "separate" ? gap : void 0,
    ...props.style
  };
  return /* @__PURE__ */ jsxs9("div", { className: wrapperClasses, ref, children: [
    label && /* @__PURE__ */ jsxs9("label", { htmlFor: groupId, className: "layera-input-group__label", children: [
      label,
      required && /* @__PURE__ */ jsx13(
        "span",
        {
          className: "layera-input-group__required",
          "aria-label": t("forms.required"),
          children: "*"
        }
      )
    ] }),
    /* @__PURE__ */ jsx13(InputGroupContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs9(
      "div",
      {
        id: groupId,
        className: containerClasses,
        style: containerStyle,
        role: "group",
        "aria-labelledby": label ? `${groupId}-label` : void 0,
        ...props,
        children: [
          children,
          loading && /* @__PURE__ */ jsx13("div", { className: "layera-input-group__loading", children: /* @__PURE__ */ jsx13("div", { className: "layera-input-group__spinner" }) })
        ]
      }
    ) }),
    (description || error) && /* @__PURE__ */ jsxs9("div", { className: "layera-input-group__footer", children: [
      description && !error && /* @__PURE__ */ jsx13("div", { className: "layera-input-group__description", children: description }),
      error && /* @__PURE__ */ jsx13(
        "div",
        {
          className: "layera-input-group__error",
          role: "alert",
          "aria-live": "polite",
          children: error
        }
      )
    ] })
  ] });
});
InputGroup.Item = InputGroupItem;
InputGroup.displayName = "InputGroup";
var useInputGroup = () => {
  const context = React11.useContext(InputGroupContext);
  if (!context) {
    throw new Error("useInputGroup must be used within an InputGroup");
  }
  return context;
};

// src/index.ts
import {
  FORM_TYPES as FORM_TYPES2,
  FORM_SIZES as FORM_SIZES9,
  FORM_STATES as FORM_STATES10,
  INPUT_VARIANTS as INPUT_VARIANTS4,
  VALIDATION_RULES,
  AUTOCOMPLETE_VALUES as AUTOCOMPLETE_VALUES2,
  FIELD_SIZES
} from "@layera/constants";
var LAYERA_FORMS_VERSION = "1.0.0";
export {
  AUTOCOMPLETE_VALUES2 as AUTOCOMPLETE_VALUES,
  Checkbox,
  DatePicker,
  FIELD_SIZES,
  FORM_SIZES9 as FORM_SIZES,
  FORM_STATES10 as FORM_STATES,
  FORM_TYPES2 as FORM_TYPES,
  FormActions,
  FormField,
  FormSection,
  INPUT_VARIANTS4 as INPUT_VARIANTS,
  Input,
  InputGroup,
  LAYERA_FORMS_VERSION,
  NumericInput,
  Select,
  Slider,
  TextArea,
  VALIDATION_RULES,
  useInputGroup
};
