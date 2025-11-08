import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  type FormSize,
  type FormState
} from '@layera/constants';
import { Box } from '@layera/layout';
import './InputGroup.css';

export interface InputGroupItemProps {
  /** Name identifier for this item */
  name: string;
  /** Flex properties for layout */
  flex?: string | number;
  /** Minimum width */
  minWidth?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Whether this item should grow */
  grow?: boolean;
  /** Whether this item should shrink */
  shrink?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Children elements */
  children: React.ReactNode;
}

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Size of the input group */
  size?: FormSize;
  /** Visual state of the input group */
  state?: FormState;
  /** Visual variant */
  variant?: 'connected' | 'outlined' | 'filled' | 'separate';
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Layout distribution mode */
  distribution?: 'equal' | 'auto' | 'custom';
  /** Gap between items when variant is 'separate' */
  gap?: string | number;
  /** Label text for the input group */
  label?: string;
  /** Helper text displayed below the input group */
  description?: string;
  /** Error message displayed when state is error */
  error?: string;
  /** Whether the input group takes full width of container */
  fullWidth?: boolean;
  /** Group change handler */
  onGroupChange?: (values: Record<string, unknown>) => void;
  /** Whether the input group is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Whether this is a required field */
  required?: boolean;
  /** Custom validation function */
  validate?: (values: Record<string, unknown>) => string | undefined;
  /** Children elements (InputGroup.Item components) */
  children: React.ReactNode;
}

export interface InputGroupContextValue {
  size: FormSize;
  state: FormState;
  variant: 'connected' | 'outlined' | 'filled' | 'separate';
  direction: 'horizontal' | 'vertical';
  disabled: boolean;
  loading: boolean;
  onItemChange: (name: string, value: unknown) => React.ReactNode;
  values: Record<string, unknown>;
}

const InputGroupContext = React.createContext<InputGroupContextValue | undefined>(undefined);

// Item component
const InputGroupItem = forwardRef<HTMLDivElement, InputGroupItemProps>(({
  name,
  flex,
  minWidth,
  maxWidth,
  grow = false,
  shrink = true,
  className = '',
  children,
  ...props
}, ref) => {
  const context = React.useContext(InputGroupContext);

  if (!context) {
    throw new Error('InputGroup.Item must be used within an InputGroup');
  }

  const { variant, direction } = context;

  // Create style object for flex properties
  const itemStyle: React.CSSProperties = {
    flex: flex,
    minWidth: minWidth,
    maxWidth: maxWidth,
    flexGrow: grow ? 1 : 0,
    flexShrink: shrink ? 1 : 0,
    ...props.style
  };

  const itemClasses = [
    'layera-input-group__item',
    `layera-input-group__item--${variant}`,
    `layera-input-group__item--${direction}`,
    grow && 'layera-input-group__item--grow',
    className
  ].filter(Boolean).join(' ');

  // Clone children and pass down context props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Pass down common props to form components
      const commonProps = {
        size: context.size,
        state: context.state,
        disabled: context.disabled,
        loading: context.loading
      };

      // If child has onChange prop, wrap it to notify group
      if (child.props.onChange) {
        const originalOnChange = child.props.onChange;
        commonProps.onChange = (value: unknown) => {
          originalOnChange(value);
          context.onItemChange(name, value);
        };
      }

      return React.cloneElement(child, commonProps);
    }
    return child;
  });

  return (
    <Box
      ref={ref}
      className={itemClasses}
      style={itemStyle}
      data-name={name}
      {...props}
    >
      {enhancedChildren}
    </Box>
  );
});

InputGroupItem.displayName = 'InputGroup.Item';

// Main InputGroup component
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(({
  size = FORM_SIZES.MEDIUM,
  state = FORM_STATES.DEFAULT,
  variant = 'connected',
  direction = 'horizontal',
  distribution = 'auto',
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
  className = '',
  children,
  id,
  ...props
}, ref) => {
  // Translation function - could be integrated with @layera/tolgee when ready
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'forms.required': 'Required'
    };
    return translations[key] || key;
  };

  // Generate unique ID if not provided
  const groupId = id || `input-group-${Math.random().toString(36).substr(2, 9)}`;

  // Internal state for tracking values
  const [values, setValues] = React.useState<Record<string, unknown>>({});

  // Determine the actual state based on error prop
  const actualState = error ? FORM_STATES.ERROR : state;

  // Handle item value changes
  const handleItemChange = useCallback((name: string, value: unknown) => {
    setValues(prev => {
      const newValues = { ...prev, [name]: value };

      // Validate if validator is provided
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let validationError: string | undefined;
      if (validate) {
        validationError = validate(newValues);
      }

      // Notify parent of changes
      if (onGroupChange) {
        onGroupChange(newValues);
      }

      return newValues;
    });
  }, [validate, onGroupChange]);

  // Context value
  const contextValue = useMemo<InputGroupContextValue>(() => ({
    size,
    state: actualState,
    variant,
    direction,
    disabled,
    loading,
    onItemChange: handleItemChange,
    values
  }), [size, actualState, variant, direction, disabled, loading, handleItemChange, values]);

  // Create class names
  const wrapperClasses = [
    'layera-input-group',
    `layera-input-group--${size}`,
    `layera-input-group--${actualState}`,
    `layera-input-group--${variant}`,
    `layera-input-group--${direction}`,
    `layera-input-group--${distribution}`,
    fullWidth && 'layera-input-group--full-width',
    disabled && 'layera-input-group--disabled',
    loading && 'layera-input-group--loading',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'layera-input-group__container',
    `layera-input-group__container--${variant}`,
    `layera-input-group__container--${direction}`
  ].filter(Boolean).join(' ');

  // Container style
  const containerStyle: React.CSSProperties = {
    gap: variant === 'separate' ? gap : undefined,
    ...props.style
  };

  return (
    <Box className={wrapperClasses} ref={ref}>
      {label && (
        <label htmlFor={groupId} className="layera-input-group__label">
          {label}
          {required && (
            <span
              className="layera-input-group__required"
              aria-label={t('forms.required')}
            >
              *
            </span>
          )}
        </label>
      )}

      <InputGroupContext.Provider value={contextValue}>
        <Box
          id={groupId}
          className={containerClasses}
          style={containerStyle}
          role="group"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          {...props}
        >
          {children}

          {loading && (
            <Box className="layera-input-group__loading">
              <Box className="layera-input-group__spinner" />
            </Box>
          )}
        </Box>
      </InputGroupContext.Provider>

      {(description || error) && (
        <Box className="layera-input-group__footer">
          {description && !error && (
            <Box className="layera-input-group__description">
              {description}
            </Box>
          )}

          {error && (
            <Box
              className="layera-input-group__error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}) as React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<HTMLDivElement>> & {
  Item: typeof InputGroupItem;
};

// Attach Item as a static property
InputGroup.Item = InputGroupItem;
InputGroup.displayName = 'InputGroup';

// Hook for accessing context
export const useInputGroup = (): void => {
  const context = React.useContext(InputGroupContext);
  if (!context) {
    throw new Error('useInputGroup must be used within an InputGroup');
  }
  return context;
};