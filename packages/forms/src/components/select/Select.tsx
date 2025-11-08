import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  INPUT_VARIANTS,
  type FormSize,
  type FormState,
  type InputVariant
} from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';
import './Select.css';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  placeholderKey?: string;
  size?: FormSize;
  variant?: InputVariant;
  state?: FormState;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  emptyMessage?: string;
  emptyMessageKey?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(({
  options,
  value,
  onChange,
  placeholder,
  placeholderKey,
  size = FORM_SIZES.MEDIUM,
  variant = INPUT_VARIANTS.DEFAULT,
  state = FORM_STATES.DEFAULT,
  searchable = false,
  clearable = false,
  loading = false,
  fullWidth = false,
  disabled,
  startIcon,
  emptyMessage,
  emptyMessageKey,
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}, ref) => {
  const { t } = useLayeraTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resolvedPlaceholder = placeholderKey ? t(placeholderKey) : placeholder;
  const resolvedEmptyMessage = emptyMessageKey ? t(emptyMessageKey) : emptyMessage || t('forms.select.noOptions');

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  const selectClasses = [
    'layera-select',
    `layera-select--${size}`,
    `layera-select--${variant}`,
    `layera-select--${state}`,
    isOpen && 'layera-select--open',
    disabled && 'layera-select--disabled',
    fullWidth && 'layera-select--full-width',
    className
  ].filter(Boolean).join(' ');

  const handleToggle = (): void => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    }
  };

  const handleOptionSelect = (option: SelectOption) => {
    if (!option.disabled) {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || loading) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        e.preventDefault();
        break;

      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;

      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        e.preventDefault();
        break;

      case 'ArrowUp':
        if (isOpen) {
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          e.preventDefault();
        }
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  return (
    <Box
      ref={selectRef}
      className={selectClasses}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-disabled={disabled}
    >
      <Box className="layera-select__control">
        {startIcon && (
          <Box className="layera-select__start-icon">
            {startIcon}
          </Box>
        )}

        <Box className="layera-select__value">
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="layera-select__search"
              placeholder={selectedOption?.label || resolvedPlaceholder}
              onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
            />
          ) : (
            <span className={selectedOption ? '' : 'layera-select__placeholder'}>
              {selectedOption?.label || resolvedPlaceholder}
            </span>
          )}
        </Box>

        <Box className="layera-select__indicators">
          {loading && (
            <Box className="layera-select__loading">
              <Box className="layera-select__spinner" />
            </Box>
          )}

          {clearable && value && !loading && (
            <button
              className="layera-select__clear"
              onClick={handleClear}
              tabIndex={-1}
              aria-label={t('forms.select.clear')}
            >
              ×
            </button>
          )}

          <Box className="layera-select__arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>
      </Box>

      {isOpen && (
        <Box className="layera-select__dropdown" role="listbox">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <Box
                key={option.value}
                className={[
                  'layera-select__option',
                  option.disabled && 'layera-select__option--disabled',
                  index === highlightedIndex && 'layera-select__option--highlighted',
                  option.value === value && 'layera-select__option--selected'
                ].filter(Boolean).join(' ')}
                onClick={(): void => handleOptionSelect(option)}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
              >
                {option.label}
              </Box>
            ))
          ) : (
            <Box className="layera-select__empty">
              {resolvedEmptyMessage}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
});

Select.displayName = 'Select';