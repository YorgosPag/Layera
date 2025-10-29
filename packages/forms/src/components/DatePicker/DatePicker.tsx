import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  type FormSize,
  type FormState
} from '@layera/constants';
import { Box } from '@layera/layout';
import './DatePicker.css';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'value'> {
  /** Size of the input */
  size?: FormSize;
  /** Visual state of the input */
  state?: FormState;
  /** Current date value */
  value?: Date;
  /** Change handler for date value */
  onChange?: (date: Date | undefined) => void;
  /** Minimum allowed date */
  minDate?: Date;
  /** Maximum allowed date */
  maxDate?: Date;
  /** Label text for the input */
  label?: string;
  /** Helper text displayed below the input */
  description?: string;
  /** Error message displayed when state is error */
  error?: string;
  /** Whether the input takes full width of container */
  fullWidth?: boolean;
  /** Whether to show calendar popup */
  showCalendar?: boolean;
  /** Whether to show today button */
  showToday?: boolean;
  /** Whether to show time selection */
  showTime?: boolean;
  /** Whether this is a date range picker */
  range?: boolean;
  /** Range values for date range picker */
  rangeValue?: [Date | undefined, Date | undefined];
  /** Range change handler */
  onRangeChange?: (dates: [Date | undefined, Date | undefined]) => void;
  /** Whether to allow multiple date selection */
  multiple?: boolean;
  /** Multiple date values */
  multipleValue?: Date[];
  /** Multiple dates change handler */
  onMultipleChange?: (dates: Date[]) => void;
  /** Locale for date formatting */
  locale?: string;
  /** Date format string */
  format?: string;
  /** Function to determine if a date should be disabled */
  isDateDisabled?: (date: Date) => boolean;
  /** Whether the calendar is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Number of months to display */
  numberOfMonths?: number;
  /** Custom placeholder text */
  placeholder?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DatePickerComponent = (props: DatePickerProps, ref: React.Ref<HTMLInputElement>) => {
  const {
    size = FORM_SIZES.MEDIUM,
    state = FORM_STATES.DEFAULT,
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
    locale = 'en-US',
    format = 'MM/dd/yyyy',
    isDateDisabled,
    disabled = false,
    loading = false,
    numberOfMonths = 1,
    placeholder,
    className = '',
    id,
    ...restProps
  } = props;
  // Translation function - could be integrated with @layera/tolgee when ready
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'forms.required': 'Required',
      'datepicker.today': 'Today',
      'datepicker.clear': 'Clear',
      'datepicker.previous': 'Previous month',
      'datepicker.next': 'Next month',
      'datepicker.selectDate': 'Select date'
    };
    return translations[key] || key;
  };

  // Generate unique ID if not provided
  const datePickerId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(() => value || new Date());
  const [inputValue, setInputValue] = useState('');

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine the actual state based on error prop
  const actualState = error ? FORM_STATES.ERROR : state;

  // Format date for display
  const formatDate = useCallback((date: Date | undefined): string => {
    if (!date) return '';

    try {
      // Simple formatting - could be enhanced with more sophisticated formatting
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      if (showTime) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}`;
      }

      return `${month}/${day}/${year}`;
    } catch {
      return '';
    }
  }, [showTime]);

  // Parse date from input
  const parseDate = useCallback((dateString: string): Date | undefined => {
    if (!dateString.trim()) return undefined;

    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? undefined : date;
    } catch {
      return undefined;
    }
  }, []);

  // Update input value when value changes
  useEffect(() => {
    setInputValue(formatDate(value));
  }, [value, formatDate]);

  // Check if date is disabled
  const isDisabled = useCallback((date: Date): boolean => {
    if (isDateDisabled && isDateDisabled(date)) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }, [isDateDisabled, minDate, maxDate]);

  // Check if date is selected
  const isSelected = useCallback((date: Date): boolean => {
    if (multiple) {
      return multipleValue.some(d =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
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
      return (
        date.getDate() === value.getDate() &&
        date.getMonth() === value.getMonth() &&
        date.getFullYear() === value.getFullYear()
      );
    }

    return false;
  }, [value, multiple, multipleValue, range, rangeValue]);

  // Handle input change
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

  // Handle date selection
  const handleDateSelect = useCallback((date: Date) => {
    if (isDisabled(date)) return;

    if (multiple) {
      const newValues = isSelected(date)
        ? multipleValue.filter(d => d.getTime() !== date.getTime())
        : [...multipleValue, date];

      if (onMultipleChange) {
        onMultipleChange(newValues);
      }
    } else if (range) {
      if (rangeValue && onRangeChange) {
        const [start, end] = rangeValue;

        if (!start || (start && end)) {
          // Starting new range
          onRangeChange([date, undefined]);
        } else {
          // Completing range
          const newRange: [Date, Date] = start <= date ? [start, date] : [date, start];
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

  // Handle today button
  const handleToday = useCallback(() => {
    const today = new Date();
    handleDateSelect(today);
  }, [handleDateSelect]);

  // Handle clear button
  const handleClear = useCallback(() => {
    if (onChange) {
      onChange(undefined);
    }
    if (onRangeChange) {
      onRangeChange([undefined, undefined]);
    }
    if (onMultipleChange) {
      onMultipleChange([]);
    }
    setInputValue('');
    setIsOpen(false);
  }, [onChange, onRangeChange, onMultipleChange]);

  // Navigate months
  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setDisplayDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  // Generate calendar days
  const generateCalendarDays = useCallback((baseDate: Date) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    const current = new Date(startDate);

    // Generate 6 weeks (42 days) to fill calendar grid
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, []);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Create class names
  const wrapperClasses = [
    'layera-datepicker',
    `layera-datepicker--${size}`,
    `layera-datepicker--${actualState}`,
    fullWidth && 'layera-datepicker--full-width',
    disabled && 'layera-datepicker--disabled',
    loading && 'layera-datepicker--loading',
    isOpen && 'layera-datepicker--open',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'layera-datepicker__input',
    `layera-datepicker__input--${size}`,
    `layera-datepicker__input--${actualState}`
  ].filter(Boolean).join(' ');

  const calendarDays = generateCalendarDays(displayDate);

  return (
    <Box className={wrapperClasses} ref={containerRef}>
      {label && (
        <label htmlFor={datePickerId} className="layera-datepicker__label">
          {label}
          {restProps.required && (
            <span
              className="layera-datepicker__required"
              aria-label={t('forms.required')}
            >
              *
            </span>
          )}
        </label>
      )}

      <Box className="layera-datepicker__input-wrapper">
        <input
          ref={ref || inputRef}
          type="text"
          id={datePickerId}
          value={inputValue}
          onChange={handleInputChange}
          onClick={(): void => showCalendar && setIsOpen(true)}
          disabled={disabled || loading}
          placeholder={placeholder || t('datepicker.selectDate')}
          className={inputClasses}
          {...restProps}
        />

        {showCalendar && (
          <button
            type="button"
            className="layera-datepicker__toggle"
            onClick={(): void => setIsOpen(!isOpen)}
            disabled={disabled || loading}
            aria-label={t('datepicker.selectDate')}
          >
            <svg viewBox="0 0 24 24" fill="none" className="layera-datepicker__calendar-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}

        {loading && (
          <Box className="layera-datepicker__loading">
            <Box className="layera-datepicker__spinner" />
          </Box>
        )}
      </Box>

      {isOpen && showCalendar && (
        <Box className="layera-datepicker__calendar">
          <Box className="layera-datepicker__header">
            <button
              type="button"
              className="layera-datepicker__nav"
              onClick={(): void => navigateMonth('prev')}
              aria-label={t('datepicker.previous')}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <Box className="layera-datepicker__month-year">
              {MONTHS[displayDate.getMonth()]} {displayDate.getFullYear()}
            </Box>

            <button
              type="button"
              className="layera-datepicker__nav"
              onClick={(): void => navigateMonth('next')}
              aria-label={t('datepicker.next')}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </Box>

          <Box className="layera-datepicker__weekdays">
            {WEEKDAYS.map(day => (
              <Box key={day} className="layera-datepicker__weekday">
                {day}
              </Box>
            ))}
          </Box>

          <Box className="layera-datepicker__days">
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === displayDate.getMonth();
              const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();

              const dayClasses = [
                'layera-datepicker__day',
                isCurrentMonth && 'layera-datepicker__day--current-month',
                isToday && 'layera-datepicker__day--today',
                isSelected(date) && 'layera-datepicker__day--selected',
                isDisabled(date) && 'layera-datepicker__day--disabled'
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={index}
                  type="button"
                  className={dayClasses}
                  onClick={(): void => handleDateSelect(date)}
                  disabled={isDisabled(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </Box>

          <Box className="layera-datepicker__footer">
            {showToday && (
              <button
                type="button"
                className="layera-datepicker__today"
                onClick={handleToday}
              >
                {t('datepicker.today')}
              </button>
            )}

            <button
              type="button"
              className="layera-datepicker__clear"
              onClick={handleClear}
            >
              {t('datepicker.clear')}
            </button>
          </Box>
        </Box>
      )}

      {(description || error) && (
        <Box className="layera-datepicker__footer-text">
          {description && !error && (
            <Box className="layera-datepicker__description">
              {description}
            </Box>
          )}

          {error && (
            <Box
              className="layera-datepicker__error"
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
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(DatePickerComponent);
DatePicker.displayName = 'DatePicker';