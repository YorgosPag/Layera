"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AUTOCOMPLETE_VALUES: () => import_constants6.AUTOCOMPLETE_VALUES,
  Checkbox: () => Checkbox,
  FIELD_SIZES: () => import_constants6.FIELD_SIZES,
  FORM_SIZES: () => import_constants6.FORM_SIZES,
  FORM_STATES: () => import_constants6.FORM_STATES,
  FORM_TYPES: () => import_constants6.FORM_TYPES,
  FormActions: () => FormActions,
  FormField: () => FormField,
  FormSection: () => FormSection,
  INPUT_VARIANTS: () => import_constants6.INPUT_VARIANTS,
  Input: () => Input,
  LAYERA_FORMS_VERSION: () => LAYERA_FORMS_VERSION,
  Select: () => Select,
  TextArea: () => TextArea,
  VALIDATION_RULES: () => import_constants6.VALIDATION_RULES
});
module.exports = __toCommonJS(src_exports);

// src/components/FormField/FormField.tsx
var import_react = __toESM(require("react"));
var import_constants = require("@layera/constants");
var import_i18n = require("@layera/i18n");
var import_jsx_runtime = require("react/jsx-runtime");
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
  state = import_constants.FORM_STATES.DEFAULT,
  className = "",
  id
}) => {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const fieldId = id || import_react.default.useId();
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const resolvedLabel = labelKey ? t(labelKey) : label;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
  const resolvedError = errorKey ? t(errorKey) : error;
  const resolvedHint = hintKey ? t(hintKey) : hint;
  const fieldState = error || errorKey ? import_constants.FORM_STATES.ERROR : state;
  const fieldClasses = [
    "layera-form-field",
    `layera-form-field--${fieldState}`,
    disabled && "layera-form-field--disabled",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: fieldClasses, children: [
    resolvedLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "label",
      {
        htmlFor: fieldId,
        className: "layera-form-field__label",
        children: [
          resolvedLabel,
          required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "layera-form-field__required", "aria-label": t("forms.validation.required"), children: "*" })
        ]
      }
    ),
    resolvedDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "layera-form-field__description", children: resolvedDescription }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "layera-form-field__control", children: import_react.default.isValidElement(children) ? import_react.default.cloneElement(children, {
      id: fieldId,
      "aria-describedby": [
        resolvedError ? errorId : "",
        resolvedHint ? hintId : ""
      ].filter(Boolean).join(" ") || void 0,
      "aria-invalid": fieldState === import_constants.FORM_STATES.ERROR ? "true" : void 0,
      disabled
    }) : children }),
    resolvedError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        id: errorId,
        className: "layera-form-field__error",
        role: "alert",
        "aria-live": "polite",
        children: resolvedError
      }
    ),
    resolvedHint && !resolvedError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react2 = require("react");
var import_constants2 = require("@layera/constants");
var import_jsx_runtime2 = require("react/jsx-runtime");
var Input = (0, import_react2.forwardRef)(({
  type = import_constants2.FORM_TYPES.TEXT,
  size = import_constants2.FORM_SIZES.MEDIUM,
  variant = import_constants2.INPUT_VARIANTS.DEFAULT,
  state = import_constants2.FORM_STATES.DEFAULT,
  startIcon,
  endIcon,
  loading = false,
  autoComplete = import_constants2.AUTOCOMPLETE_VALUES.OFF,
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: wrapperClasses, children: [
    startIcon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-input__start-icon", children: startIcon }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    loading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-input__loading", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-input__spinner" }) }),
    endIcon && !loading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-input__end-icon", children: endIcon })
  ] });
});
Input.displayName = "Input";

// src/components/Select/Select.tsx
var import_react3 = require("react");
var import_constants3 = require("@layera/constants");
var import_i18n2 = require("@layera/i18n");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Select = (0, import_react3.forwardRef)(({
  options,
  value,
  onChange,
  placeholder,
  placeholderKey,
  size = import_constants3.FORM_SIZES.MEDIUM,
  variant = import_constants3.INPUT_VARIANTS.DEFAULT,
  state = import_constants3.FORM_STATES.DEFAULT,
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
  const { t } = (0, import_i18n2.useLayeraTranslation)();
  const [isOpen, setIsOpen] = (0, import_react3.useState)(false);
  const [searchTerm, setSearchTerm] = (0, import_react3.useState)("");
  const [highlightedIndex, setHighlightedIndex] = (0, import_react3.useState)(-1);
  const selectRef = (0, import_react3.useRef)(null);
  const inputRef = (0, import_react3.useRef)(null);
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
    if (disabled || loading)
      return;
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
  (0, import_react3.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  (0, import_react3.useEffect)(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-select__control", children: [
          startIcon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__start-icon", children: startIcon }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__value", children: searchable && isOpen ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
          ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: selectedOption ? "" : "layera-select__placeholder", children: selectedOption?.label || resolvedPlaceholder }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-select__indicators", children: [
            loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__loading", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__spinner" }) }),
            clearable && value && !loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                className: "layera-select__clear",
                onClick: handleClear,
                tabIndex: -1,
                "aria-label": t("forms.select.clear"),
                children: "\xD7"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__arrow", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__dropdown", role: "listbox", children: filteredOptions.length > 0 ? filteredOptions.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        )) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-select__empty", children: resolvedEmptyMessage }) })
      ]
    }
  );
});
Select.displayName = "Select";

// src/components/FormSection/FormSection.tsx
var import_react4 = __toESM(require("react"));
var import_i18n3 = require("@layera/i18n");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  const { t } = (0, import_i18n3.useLayeraTranslation)();
  const [isCollapsed, setIsCollapsed] = import_react4.default.useState(defaultCollapsed);
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: sectionClasses, children: [
    (resolvedTitle || icon) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "layera-form-section__header",
        onClick: handleToggle,
        role: collapsible ? "button" : void 0,
        tabIndex: collapsible ? 0 : void 0,
        "aria-expanded": collapsible ? !isCollapsed : void 0,
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-form-section__icon", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "layera-form-section__header-content", children: [
            resolvedTitle && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "layera-form-section__title", children: resolvedTitle }),
            resolvedDescription && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "layera-form-section__description", children: resolvedDescription })
          ] }),
          collapsible && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-form-section__toggle", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              className: "layera-form-section__chevron",
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-form-section__content", children })
  ] });
};

// src/components/FormActions/FormActions.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: actionsClasses, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "layera-form-actions__content", children }) });
};

// src/components/TextArea/TextArea.tsx
var import_react5 = require("react");
var import_constants4 = require("@layera/constants");
var import_jsx_runtime6 = require("react/jsx-runtime");
var TextArea = (0, import_react5.forwardRef)(({
  size = import_constants4.FORM_SIZES.MEDIUM,
  variant = import_constants4.INPUT_VARIANTS.DEFAULT,
  state = import_constants4.FORM_STATES.DEFAULT,
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
    const lineHeight = size === import_constants4.FORM_SIZES.SMALL ? 1.25 : size === import_constants4.FORM_SIZES.LARGE ? 1.5 : 1.375;
    const fontSize = size === import_constants4.FORM_SIZES.SMALL ? 14 : size === import_constants4.FORM_SIZES.LARGE ? 18 : 16;
    const padding = size === import_constants4.FORM_SIZES.SMALL ? 16 : size === import_constants4.FORM_SIZES.LARGE ? 32 : 24;
    return minRows * fontSize * lineHeight + padding;
  };
  const getMaxHeight = () => {
    if (!maxRows)
      return void 0;
    const lineHeight = size === import_constants4.FORM_SIZES.SMALL ? 1.25 : size === import_constants4.FORM_SIZES.LARGE ? 1.5 : 1.375;
    const fontSize = size === import_constants4.FORM_SIZES.SMALL ? 14 : size === import_constants4.FORM_SIZES.LARGE ? 18 : 16;
    const padding = size === import_constants4.FORM_SIZES.SMALL ? 16 : size === import_constants4.FORM_SIZES.LARGE ? 32 : 24;
    return maxRows * fontSize * lineHeight + padding;
  };
  const textAreaStyle = {
    minHeight: `${getMinHeight()}px`,
    maxHeight: maxRows ? `${getMaxHeight()}px` : void 0,
    ...style
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: wrapperClasses, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_react6 = __toESM(require("react"));
var import_constants5 = require("@layera/constants");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Checkbox = (0, import_react6.forwardRef)(({
  size = import_constants5.FORM_SIZES.MEDIUM,
  state = import_constants5.FORM_STATES.DEFAULT,
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
  const actualState = error ? import_constants5.FORM_STATES.ERROR : state;
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
  const inputRef = import_react6.default.useRef(null);
  import_react6.default.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const combinedRef = import_react6.default.useCallback((node) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);
  const renderIcon = () => {
    if (loading) {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "layera-checkbox__spinner" });
    }
    if (indeterminate) {
      return indeterminateIcon || /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "layera-checkbox__minus" });
    }
    if (checked) {
      return checkedIcon || /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { className: "layera-checkbox__check", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("polyline", { points: "20,6 9,17 4,12", stroke: "currentColor", strokeWidth: "2" }) });
    }
    return null;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: wrapperClasses, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "layera-checkbox__control", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: boxClasses, children: renderIcon() })
    ] }),
    (label || description || error) && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "layera-checkbox__content", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "label",
        {
          htmlFor: checkboxId,
          className: "layera-checkbox__label",
          children: [
            label,
            props.required && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
      description && !error && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "layera-checkbox__description", children: description }),
      error && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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

// src/index.ts
var import_constants6 = require("@layera/constants");
var LAYERA_FORMS_VERSION = "1.0.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUTOCOMPLETE_VALUES,
  Checkbox,
  FIELD_SIZES,
  FORM_SIZES,
  FORM_STATES,
  FORM_TYPES,
  FormActions,
  FormField,
  FormSection,
  INPUT_VARIANTS,
  Input,
  LAYERA_FORMS_VERSION,
  Select,
  TextArea,
  VALIDATION_RULES
});
