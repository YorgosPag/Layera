/**
 * @layera/forms
 * Enterprise form components with validation, accessibility, and TypeScript support
 */

// Components
export { FormField } from './components/FormField/FormField';
export type { FormFieldProps } from './components/FormField/FormField';

export { Input } from './components/Input/Input';
export type { InputProps } from './components/Input/Input';

export { Select } from './components/Select/Select';
export type { SelectProps, SelectOption } from './components/Select/Select';

export { FormSection } from './components/FormSection/FormSection';
export type { FormSectionProps } from './components/FormSection/FormSection';

export { FormActions } from './components/FormActions/FormActions';
export type { FormActionsProps } from './components/FormActions/FormActions';

export { TextArea } from './components/TextArea/TextArea';
export type { TextAreaProps } from './components/TextArea/TextArea';

export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps } from './components/Checkbox/Checkbox';

export { NumericInput } from './components/NumericInput/NumericInput';
export type { NumericInputProps } from './components/NumericInput/NumericInput';

export { Slider } from './components/Slider/Slider';
export type { SliderProps, SliderMark } from './components/Slider/Slider';

export { DatePicker } from './components/DatePicker/DatePicker';
export type { DatePickerProps } from './components/DatePicker/DatePicker';

export { InputGroup, useInputGroup } from './components/InputGroup/InputGroup';
export type { InputGroupProps, InputGroupItemProps, InputGroupContextValue } from './components/InputGroup/InputGroup';

// Re-export relevant constants
export {
  FORM_TYPES,
  FORM_SIZES,
  FORM_STATES,
  INPUT_VARIANTS,
  VALIDATION_RULES,
  AUTOCOMPLETE_VALUES,
  FIELD_SIZES,
  type FormType,
  type FormSize,
  type FormState,
  type InputVariant,
  type ValidationRule,
  type AutocompleteValue,
  type FieldSize
} from '@layera/constants';

// Version
export const LAYERA_FORMS_VERSION = '1.0.0';