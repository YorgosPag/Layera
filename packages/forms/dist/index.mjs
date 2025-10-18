// src/components/FormField/FormField.tsx
import React from "react";
import { FORM_STATES } from "@layera/constants";
import { useLayeraTranslation } from "@layera/i18n";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const fieldId = id || React.useId();
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
          required && /* @__PURE__ */ jsx("span", { className: "layera-form-field__required", "aria-label": t("forms.validation.required"), children: "*" })
        ]
      }
    ),
    resolvedDescription && /* @__PURE__ */ jsx("div", { className: "layera-form-field__description", children: resolvedDescription }),
    /* @__PURE__ */ jsx("div", { className: "layera-form-field__control", children: React.isValidElement(children) ? React.cloneElement(children, {
      id: fieldId,
      "aria-describedby": [
        resolvedError ? errorId : "",
        resolvedHint ? hintId : ""
      ].filter(Boolean).join(" ") || void 0,
      "aria-invalid": fieldState === FORM_STATES.ERROR ? "true" : void 0,
      disabled
    }) : children }),
    resolvedError && /* @__PURE__ */ jsx(
      "div",
      {
        id: errorId,
        className: "layera-form-field__error",
        role: "alert",
        "aria-live": "polite",
        children: resolvedError
      }
    ),
    resolvedHint && !resolvedError && /* @__PURE__ */ jsx(
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
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
    startIcon && /* @__PURE__ */ jsx2("div", { className: "layera-input__start-icon", children: startIcon }),
    /* @__PURE__ */ jsx2(
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
    loading && /* @__PURE__ */ jsx2("div", { className: "layera-input__loading", children: /* @__PURE__ */ jsx2("div", { className: "layera-input__spinner" }) }),
    endIcon && !loading && /* @__PURE__ */ jsx2("div", { className: "layera-input__end-icon", children: endIcon })
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
import { useLayeraTranslation as useLayeraTranslation2 } from "@layera/i18n";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const { t } = useLayeraTranslation2();
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
          startIcon && /* @__PURE__ */ jsx3("div", { className: "layera-select__start-icon", children: startIcon }),
          /* @__PURE__ */ jsx3("div", { className: "layera-select__value", children: searchable && isOpen ? /* @__PURE__ */ jsx3(
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
          ) : /* @__PURE__ */ jsx3("span", { className: selectedOption ? "" : "layera-select__placeholder", children: selectedOption?.label || resolvedPlaceholder }) }),
          /* @__PURE__ */ jsxs3("div", { className: "layera-select__indicators", children: [
            loading && /* @__PURE__ */ jsx3("div", { className: "layera-select__loading", children: /* @__PURE__ */ jsx3("div", { className: "layera-select__spinner" }) }),
            clearable && value && !loading && /* @__PURE__ */ jsx3(
              "button",
              {
                className: "layera-select__clear",
                onClick: handleClear,
                tabIndex: -1,
                "aria-label": t("forms.select.clear"),
                children: "\xD7"
              }
            ),
            /* @__PURE__ */ jsx3("div", { className: "layera-select__arrow", children: /* @__PURE__ */ jsx3("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx3(
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
        isOpen && /* @__PURE__ */ jsx3("div", { className: "layera-select__dropdown", role: "listbox", children: filteredOptions.length > 0 ? filteredOptions.map((option, index) => /* @__PURE__ */ jsx3(
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
        )) : /* @__PURE__ */ jsx3("div", { className: "layera-select__empty", children: resolvedEmptyMessage }) })
      ]
    }
  );
});
Select.displayName = "Select";

// src/components/FormSection/FormSection.tsx
import React4 from "react";
import { useLayeraTranslation as useLayeraTranslation3 } from "@layera/i18n";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const { t } = useLayeraTranslation3();
  const [isCollapsed, setIsCollapsed] = React4.useState(defaultCollapsed);
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
          icon && /* @__PURE__ */ jsx4("div", { className: "layera-form-section__icon", children: icon }),
          /* @__PURE__ */ jsxs4("div", { className: "layera-form-section__header-content", children: [
            resolvedTitle && /* @__PURE__ */ jsx4("h3", { className: "layera-form-section__title", children: resolvedTitle }),
            resolvedDescription && /* @__PURE__ */ jsx4("p", { className: "layera-form-section__description", children: resolvedDescription })
          ] }),
          collapsible && /* @__PURE__ */ jsx4("div", { className: "layera-form-section__toggle", children: /* @__PURE__ */ jsx4(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              className: "layera-form-section__chevron",
              children: /* @__PURE__ */ jsx4(
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
    /* @__PURE__ */ jsx4("div", { className: "layera-form-section__content", children })
  ] });
};

// src/components/FormActions/FormActions.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx5("div", { className: actionsClasses, children: /* @__PURE__ */ jsx5("div", { className: "layera-form-actions__content", children }) });
};

// src/components/TextArea/TextArea.tsx
import { forwardRef as forwardRef3 } from "react";
import {
  FORM_SIZES as FORM_SIZES3,
  FORM_STATES as FORM_STATES4,
  INPUT_VARIANTS as INPUT_VARIANTS3
} from "@layera/constants";
import { jsx as jsx6 } from "react/jsx-runtime";
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
    if (!maxRows)
      return void 0;
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
  return /* @__PURE__ */ jsx6("div", { className: wrapperClasses, children: /* @__PURE__ */ jsx6(
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
import React6, { forwardRef as forwardRef4 } from "react";
import {
  FORM_SIZES as FORM_SIZES4,
  FORM_STATES as FORM_STATES5
} from "@layera/constants";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
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
  const inputRef = React6.useRef(null);
  React6.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const combinedRef = React6.useCallback((node) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);
  const renderIcon = () => {
    if (loading) {
      return /* @__PURE__ */ jsx7("div", { className: "layera-checkbox__spinner" });
    }
    if (indeterminate) {
      return indeterminateIcon || /* @__PURE__ */ jsx7("div", { className: "layera-checkbox__minus" });
    }
    if (checked) {
      return checkedIcon || /* @__PURE__ */ jsx7("svg", { className: "layera-checkbox__check", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx7("polyline", { points: "20,6 9,17 4,12", stroke: "currentColor", strokeWidth: "2" }) });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs5("div", { className: wrapperClasses, children: [
    /* @__PURE__ */ jsxs5("div", { className: "layera-checkbox__control", children: [
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7("div", { className: boxClasses, children: renderIcon() })
    ] }),
    (label || description || error) && /* @__PURE__ */ jsxs5("div", { className: "layera-checkbox__content", children: [
      label && /* @__PURE__ */ jsxs5(
        "label",
        {
          htmlFor: checkboxId,
          className: "layera-checkbox__label",
          children: [
            label,
            props.required && /* @__PURE__ */ jsx7(
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
      description && !error && /* @__PURE__ */ jsx7("div", { className: "layera-checkbox__description", children: description }),
      error && /* @__PURE__ */ jsx7(
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
import {
  FORM_TYPES as FORM_TYPES2,
  FORM_SIZES as FORM_SIZES5,
  FORM_STATES as FORM_STATES6,
  INPUT_VARIANTS as INPUT_VARIANTS4,
  VALIDATION_RULES,
  AUTOCOMPLETE_VALUES as AUTOCOMPLETE_VALUES2,
  FIELD_SIZES
} from "@layera/constants";
var LAYERA_FORMS_VERSION = "1.0.0";
export {
  AUTOCOMPLETE_VALUES2 as AUTOCOMPLETE_VALUES,
  Checkbox,
  FIELD_SIZES,
  FORM_SIZES5 as FORM_SIZES,
  FORM_STATES6 as FORM_STATES,
  FORM_TYPES2 as FORM_TYPES,
  FormActions,
  FormField,
  FormSection,
  INPUT_VARIANTS4 as INPUT_VARIANTS,
  Input,
  LAYERA_FORMS_VERSION,
  Select,
  TextArea,
  VALIDATION_RULES
};
