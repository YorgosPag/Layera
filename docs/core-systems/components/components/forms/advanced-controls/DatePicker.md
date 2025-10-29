# 📅 DatePicker Component

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Package: @layera/forms*
*Enterprise-grade date picker με calendar popup και advanced features*

---

## 🎯 **OVERVIEW**

Το DatePicker component είναι ένα enterprise-grade UI element που παρέχει enhanced date selection functionality με calendar popup, date validation και πλήρη integration στο LAYERA LEGO σύστημα.

### **🔗 LEGO SYSTEMS INTEGRATION:**

**🧩 COMPLETE LAYERA LEGO ECOSYSTEM (17 Systems):**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ χρήση LAYERA LEGO συστημάτων:

// 1. 🃏 UI Foundation
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, IconButton, PrimaryButton } from '@layera/buttons';
import { DatePicker, FormField, FormSection, Input } from '@layera/forms';  // ← ΝΕΟ DatePicker!
import { Heading, Text, Label, Caption } from '@layera/typography';

// 2. 📐 Layout & Structure
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { DataTable, TableColumn } from '@layera/tables';
import { Modal, Dialog, Drawer } from '@layera/modals';

// 3. 🔄 Dynamic Content
import { LoadingSpinner, SkeletonCard } from '@layera/loading';
import { toast, showNotification } from '@layera/notifications';

// 4. 🗺️ Geo Features (για location-based availability)
import { GeoDrawingCanvas, MeasurementDisplay } from '@layera/geo-drawing';

// 5. 🎨 Visual & Icons
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@layera/icons';

// 6. 🌐 Localization & State
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';

// 7. 🔧 System Integration
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

// 📝 ΚΡΙΤΙΚΟ: 100% LEGO compliance - NO custom date inputs!
```

**Primary Package**: @layera/forms
**Dependencies**: 10 από τα 17 LEGO systems
**Usage**: `import { DatePicker } from '@layera/forms';`

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **TypeScript Interface:**
```typescript
export interface DatePickerProps {
  // Core Props
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;

  // Date Configuration
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  selectableDates?: Date[] | ((date: Date) => boolean);

  // Calendar Features
  showCalendar?: boolean;
  showToday?: boolean;
  showWeekNumbers?: boolean;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=Sunday, 1=Monday, etc.
  numberOfMonths?: number;
  enableTime?: boolean;
  timeFormat?: '12' | '24';

  // Range Selection
  selectionMode?: 'single' | 'range' | 'multiple';
  startDate?: Date | null;
  endDate?: Date | null;

  // Formatting
  dateFormat?: string;
  displayFormat?: string;
  locale?: string;
  formatDate?: (date: Date) => string;
  parseDate?: (text: string) => Date | null;

  // Visual
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  placeholder?: string;

  // States
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  required?: boolean;
  loading?: boolean;

  // Labels & Content
  label?: string;
  description?: string;
  errorMessage?: string;
  helpText?: string;

  // Layout
  fullWidth?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom' | 'left' | 'right';

  // Advanced
  name?: string;
  id?: string;
  autoFocus?: boolean;
  closeOnSelect?: boolean;
  clearable?: boolean;

  // Events
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onCalendarOpen?: () => void;
  onCalendarClose?: () => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (year: number) => void;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;

  // Theme
  className?: string;
}
```

### **Constants Integration:**
```typescript
// From @layera/constants
export const DATEPICKER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg'
} as const;

export const DATEPICKER_VARIANTS = {
  DEFAULT: 'default',
  OUTLINED: 'outlined',
  FILLED: 'filled'
} as const;

export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  EUROPEAN: 'DD/MM/YYYY',
  US: 'MM/DD/YYYY',
  FULL: 'dddd, MMMM Do YYYY'
} as const;

export const SELECTION_MODES = {
  SINGLE: 'single',
  RANGE: 'range',
  MULTIPLE: 'multiple'
} as const;

// Property/Job specific date limits
export const AVAILABILITY_LIMITS = {
  MIN_FUTURE_DAYS: 1,
  MAX_FUTURE_MONTHS: 24,
  BOOKING_ADVANCE_DAYS: 7
} as const;
```

---

## 🎨 **VISUAL DESIGN**

### **Sizes:**
```typescript
// Small - 32px height
<DatePicker size="sm" label="Μικρό date picker" />

// Medium (default) - 40px height
<DatePicker size="md" label="Κανονικό date picker" />

// Large - 48px height
<DatePicker size="lg" label="Μεγάλο date picker" />
```

### **Selection Modes:**
```typescript
// Single date selection
<DatePicker
  selectionMode="single"
  label="Ημερομηνία διαθεσιμότητας"
/>

// Date range selection
<DatePicker
  selectionMode="range"
  label="Περίοδος διαθεσιμότητας"
/>

// Multiple dates selection
<DatePicker
  selectionMode="multiple"
  label="Διαθέσιμες ημερομηνίες"
/>
```

### **Calendar Features:**
```typescript
// With time selection
<DatePicker
  enableTime={true}
  timeFormat="24"
  label="Ημερομηνία και ώρα"
/>

// Multiple months display
<DatePicker
  numberOfMonths={2}
  label="Επιλογή εύρους"
/>

// With week numbers
<DatePicker
  showWeekNumbers={true}
  firstDayOfWeek={1} // Monday
  label="Με αριθμούς εβδομάδας"
/>
```

---

## 🔧 **USAGE EXAMPLES**

### **Basic Usage:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { DatePicker } from '@layera/forms';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { CONSTANTS } from '@layera/constants';

export const BasicDatePickerExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + CONSTANTS.AVAILABILITY_LIMITS.MIN_FUTURE_DAYS);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + CONSTANTS.AVAILABILITY_LIMITS.MAX_FUTURE_MONTHS);

  return (
    <DatePicker
      value={availabilityDate}
      onChange={setAvailabilityDate}
      minDate={minDate}
      maxDate={maxDate}
      label={t('property.availability.date')}
      description={t('property.availability.description')}
      placeholder={t('property.availability.placeholder')}
      required={true}
    />
  );
};
```

### **Complete LEGO Integration με Availability Form:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { DatePicker, FormSection, FormField, Select } from '@layera/forms';
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Container, Grid, Stack, Flex } from '@layera/layout';
import { Heading, Text, Label } from '@layera/typography';
import { Button, PrimaryButton } from '@layera/buttons';
import { CalendarIcon, CheckIcon, HomeIcon } from '@layera/icons';
import { LoadingSpinner } from '@layera/loading';
import { toast } from '@layera/notifications';
import { DataTable, TableColumn } from '@layera/tables';
import { Modal, Dialog } from '@layera/modals';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { useAuth } from '@layera/auth-bridge/hooks';
import { useTheme } from '@layera/theme-switcher/hooks';
import { CONSTANTS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';

export const PropertyAvailabilityForm: React.FC = () => {
  const { t } = useLayeraTranslation();
  const { user, hasRole } = useAuth();
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [availabilityData, setAvailabilityData] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    availabilityType: 'immediate' as 'immediate' | 'future' | 'flexible',
    duration: null as number | null,
    durationUnit: 'months' as 'months' | 'years',
    blackoutDates: [] as Date[],
    recurringPattern: 'none' as 'none' | 'weekly' | 'monthly'
  });

  const handleDateChange = useCallback((field: string, date: Date | null) => {
    setAvailabilityData(prev => ({ ...prev, [field]: date }));

    // Integration με @layera/notifications
    if (date) {
      toast.info(t('availability.date.updated', {
        field: t(`availability.${field}`),
        date: formatDate(date)
      }));
    }
  }, [t]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('el-GR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const calculateDurationInDays = (): number | null => {
    if (!availabilityData.startDate || !availabilityData.endDate) return null;
    const diffTime = availabilityData.endDate.getTime() - availabilityData.startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const isBlackoutDate = (date: Date): boolean => {
    return availabilityData.blackoutDates.some(blackoutDate =>
      blackoutDate.toDateString() === date.toDateString()
    );
  };

  // ✅ Import from @layera packages): boolean => {
    return availabilityData.startDate !== null &&
           (availabilityData.availabilityType === 'immediate' || availabilityData.endDate !== null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(t('availability.form.incomplete'));
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, CONSTANTS.TIMEOUTS.DEFAULT));
    toast.success(t('availability.form.saved'));
    setIsLoading(false);
  };

  // Integration με @layera/auth-bridge
  if (!hasRole('user')) {
    return (
      <Card>
        <CardContent>
          <Text>{t('auth.unauthorized')}</Text>
        </CardContent>
      </Card>
    );
  }

  // Summary data για @layera/tables
  const summaryData = [
    {
      field: t('availability.startDate'),
      value: availabilityData.startDate ? formatDate(availabilityData.startDate) : '-'
    },
    {
      field: t('availability.endDate'),
      value: availabilityData.endDate ? formatDate(availabilityData.endDate) : '-'
    },
    {
      field: t('availability.duration'),
      value: calculateDurationInDays() ? `${calculateDurationInDays()} ${t('common.days')}` : '-'
    },
    {
      field: t('availability.blackoutDates'),
      value: availabilityData.blackoutDates.length || 0
    }
  ];

  const tableColumns: TableColumn[] = [
    { key: 'field', label: t('availability.summary.field'), sortable: false },
    { key: 'value', label: t('availability.summary.value'), sortable: false }
  ];

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Grid cols={2} spacing="lg">
          {/* Form Panel */}
          <Card>
            <CardHeader>
              <Flex align="center" gap="sm">
                <CalendarIcon size="lg" />
                <Heading level={2}>{t('availability.title')}</Heading>
                <Text variant="caption">{user?.email}</Text>
              </Flex>
            </CardHeader>

            <CardContent>
              <Stack spacing="lg">
                <FormSection title={t('availability.type.title')}>
                  <FormField>
                    <Select
                      value={availabilityData.availabilityType}
                      onChange={(value) => setAvailabilityData(prev => ({
                        ...prev, availabilityType: value as any
                      }))}
                      options={[
                        { value: 'immediate', label: t('availability.type.immediate') },
                        { value: 'future', label: t('availability.type.future') },
                        { value: 'flexible', label: t('availability.type.flexible') }
                      ]}
                      label={t('availability.type.label')}
                      disabled={isLoading}
                    />
                  </FormField>
                </FormSection>

                <FormSection title={t('availability.dates.title')}>
                  <Grid cols={2} spacing="md">
                    <FormField>
                      <DatePicker
                        value={availabilityData.startDate}
                        onChange={(date) => handleDateChange('startDate', date)}
                        minDate={new Date()}
                        maxDate={(() => {
                          const maxDate = new Date();
                          maxDate.setMonth(maxDate.getMonth() + CONSTANTS.AVAILABILITY_LIMITS.MAX_FUTURE_MONTHS);
                          return maxDate;
                        })()}
                        disabledDates={isBlackoutDate}
                        label={t('availability.startDate.label')}
                        description={t('availability.startDate.description')}
                        placeholder={t('availability.startDate.placeholder')}
                        showToday={true}
                        clearable={true}
                        size="md"
                        disabled={isLoading}
                        required={true}
                      />
                    </FormField>

                    <FormField>
                      <DatePicker
                        value={availabilityData.endDate}
                        onChange={(date) => handleDateChange('endDate', date)}
                        minDate={availabilityData.startDate || new Date()}
                        maxDate={(() => {
                          const maxDate = new Date();
                          maxDate.setMonth(maxDate.getMonth() + CONSTANTS.AVAILABILITY_LIMITS.MAX_FUTURE_MONTHS);
                          return maxDate;
                        })()}
                        disabledDates={isBlackoutDate}
                        label={t('availability.endDate.label')}
                        description={t('availability.endDate.description')}
                        placeholder={t('availability.endDate.placeholder')}
                        size="md"
                        disabled={isLoading || !availabilityData.startDate}
                        required={availabilityData.availabilityType !== 'immediate'}
                      />
                    </FormField>
                  </Grid>

                  {calculateDurationInDays() && (
                    <Text variant="caption" color="secondary">
                      {t('availability.duration.calculated', {
                        days: calculateDurationInDays(),
                        weeks: Math.floor(calculateDurationInDays()! / 7)
                      })}
                    </Text>
                  )}
                </FormSection>

                <FormSection title={t('availability.advanced.title')}>
                  <FormField>
                    <DatePicker
                      value={null}
                      onChange={(date) => {
                        if (date && !isBlackoutDate(date)) {
                          setAvailabilityData(prev => ({
                            ...prev,
                            blackoutDates: [...prev.blackoutDates, date]
                          }));
                          toast.info(t('availability.blackout.added'));
                        }
                      }}
                      selectionMode="multiple"
                      label={t('availability.blackout.label')}
                      description={t('availability.blackout.description')}
                      placeholder={t('availability.blackout.placeholder')}
                      minDate={availabilityData.startDate || new Date()}
                      maxDate={availabilityData.endDate || undefined}
                      disabledDates={isWeekend}
                      size="sm"
                      disabled={isLoading}
                    />
                  </FormField>

                  {availabilityData.blackoutDates.length > 0 && (
                    <Stack spacing="xs">
                      <Label>{t('availability.blackout.selected')}</Label>
                      <Flex wrap="wrap" gap="xs">
                        {availabilityData.blackoutDates.map((date, index) => (
                          <Button
                            key={index}
                            variant="outlined"
                            size="sm"
                            onClick={() => {
                              setAvailabilityData(prev => ({
                                ...prev,
                                blackoutDates: prev.blackoutDates.filter((_, i) => i !== index)
                              }));
                            }}
                          >
                            {formatDate(date)} ×
                          </Button>
                        ))}
                      </Flex>
                    </Stack>
                  )}
                </FormSection>

                <Flex justify="space-between">
                  <Button variant="secondary" disabled={isLoading}>
                    {t('common.cancel')}
                  </Button>
                  <Flex gap="sm">
                    <Button
                      variant="outlined"
                      onClick={() => setShowPreview(true)}
                      disabled={!validateForm()}
                    >
                      {t('availability.preview')}
                    </Button>
                    <PrimaryButton
                      onClick={handleSubmit}
                      disabled={isLoading || !validateForm()}
                      icon={isLoading ? <LoadingSpinner size="sm" /> : <CheckIcon />}
                    >
                      {t('availability.form.save')}
                    </PrimaryButton>
                  </Flex>
                </Flex>
              </Stack>
            </CardContent>
          </Card>

          {/* Summary Panel με @layera/tables */}
          <Card>
            <CardHeader>
              <Flex align="center" gap="sm">
                <HomeIcon size="md" />
                <Heading level={3}>{t('availability.summary.title')}</Heading>
              </Flex>
            </CardHeader>

            <CardContent>
              <DataTable
                columns={tableColumns}
                data={summaryData}
                showPagination={false}
                showSearch={false}
                loading={isLoading ? <SkeletonCard /> : undefined}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Modal με @layera/modals */}
        {showPreview && (
          <Modal open={showPreview} onClose={() => setShowPreview(false)}>
            <Dialog>
              <CardHeader>
                <Heading level={3}>{t('availability.preview.title')}</Heading>
              </CardHeader>
              <CardContent>
                <Stack spacing="md">
                  <Text>{t('availability.preview.description')}</Text>
                  {/* Calendar preview would go here */}
                  <Flex justify="end" gap="sm">
                    <Button
                      variant="secondary"
                      onClick={() => setShowPreview(false)}
                    >
                      {t('common.close')}
                    </Button>
                  </Flex>
                </Stack>
              </CardContent>
            </Dialog>
          </Modal>
        )}
      </Container>
    </ErrorBoundary>
  );
};

// 🎯 ΑΠΟΤΕΛΕΣΜΑ: 15 από τα 17 LEGO systems integration!
// ✅ @layera/forms, @layera/cards, @layera/layout, @layera/typography
// ✅ @layera/buttons, @layera/icons, @layera/loading, @layera/notifications
// ✅ @layera/tables, @layera/modals, @layera/i18n, @layera/auth-bridge,
// ✅ @layera/theme-switcher, @layera/constants, @layera/error-boundary
```

### **Range Date Selection:**
```typescript
import { useLayeraTranslation } from '@layera/tolgee';
// ✅ Use LEGO hooks and utilities;
import { DatePicker } from '@layera/forms';
import { Stack } from '@layera/layout';
import { Text } from '@layera/typography';

export const DateRangeExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const [dateRange, setDateRange] = useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  });

  const calculateNights = (): number | null => {
    if (!dateRange.start || !dateRange.end) return null;
    const diffTime = dateRange.end.getTime() - dateRange.start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Stack spacing="md">
      <DatePicker
        selectionMode="range"
        startDate={dateRange.start}
        endDate={dateRange.end}
        onChange={(start, end) => setDateRange({ start, end })}
        minDate={new Date()}
        numberOfMonths={2}
        label={t('booking.dateRange')}
        description={t('booking.selectPeriod')}
        closeOnSelect={false}
      />

      {calculateNights() && (
        <Text variant="caption" color="secondary">
          {t('booking.nights', { count: calculateNights() })}
        </Text>
      )}
    </Stack>
  );
};
```

---

## 🎨 **THEME INTEGRATION**

### **CSS Variables:**
```css
.layera-datepicker {
  --datepicker-input-height: var(--layera-form-element-height-md);
  --datepicker-input-border: var(--layera-border-width-default);
  --datepicker-input-border-color: var(--layera-color-border-default);
  --datepicker-input-border-radius: var(--layera-border-radius-md);
  --datepicker-input-background: var(--layera-color-background-primary);
  --datepicker-calendar-background: var(--layera-color-background-primary);
  --datepicker-calendar-border: var(--layera-border-width-default);
  --datepicker-calendar-shadow: var(--layera-shadow-lg);
  --datepicker-day-size: 36px;
  --datepicker-day-color: var(--layera-color-text-primary);
  --datepicker-day-hover-background: var(--layera-color-background-secondary);
  --datepicker-day-selected-background: var(--layera-color-primary);
  --datepicker-day-selected-color: var(--layera-color-text-inverse);
  --datepicker-disabled-opacity: var(--layera-opacity-disabled);
}

/* Calendar popup */
.layera-datepicker__calendar {
  background: var(--datepicker-calendar-background);
  border: var(--datepicker-calendar-border) solid var(--datepicker-input-border-color);
  border-radius: var(--layera-border-radius-lg);
  box-shadow: var(--datepicker-calendar-shadow);
  padding: var(--layera-spacing-md);
  z-index: var(--layera-z-index-dropdown);
}

/* Calendar navigation */
.layera-datepicker__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--layera-spacing-sm);
}

/* Calendar days */
.layera-datepicker__day {
  width: var(--datepicker-day-size);
  height: var(--datepicker-day-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--layera-border-radius-sm);
  cursor: pointer;
  transition: all var(--layera-transition-fast);
}

.layera-datepicker__day:hover {
  background: var(--datepicker-day-hover-background);
}

.layera-datepicker__day--selected {
  background: var(--datepicker-day-selected-background);
  color: var(--datepicker-day-selected-color);
}

.layera-datepicker__day--disabled {
  opacity: var(--datepicker-disabled-opacity);
  cursor: not-allowed;
}

/* Dark mode support */
[data-theme="dark"] .layera-datepicker {
  --datepicker-input-border-color: var(--layera-color-border-dark);
  --datepicker-input-background: var(--layera-color-background-dark);
  --datepicker-calendar-background: var(--layera-color-background-dark);
  --datepicker-day-color: var(--layera-color-text-dark);
}
```

---

## ♿ **ACCESSIBILITY**

### **ARIA Support:**
```typescript
<DatePicker
  label="Ημερομηνία διαθεσιμότητας"
  aria-describedby="availability-description"
  aria-expanded={isCalendarOpen}
  aria-haspopup="dialog"
  aria-required={true}
/>
```

### **Keyboard Navigation:**
- **Space/Enter**: Open/close calendar
- **Arrow Keys**: Navigate calendar dates
- **Page Up/Down**: Navigate months
- **Shift + Page Up/Down**: Navigate years
- **Home/End**: Go to start/end of week
- **Escape**: Close calendar

### **Screen Reader Support:**
- Calendar state announcements
- Date selection announcements
- Navigation context
- Error message association

---

## 🧪 **TESTING GUIDELINES**

### **Unit Tests:**
```typescript
import { render, fireEvent, screen } from '@testing-library/react';
import { DatePicker } from '@layera/forms';

describe('DatePicker Component', () => {
  it('should open calendar when clicked', () => {
    render(<DatePicker label="Select Date" />);

    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should select date when calendar date clicked', () => {
    const handleChange = jest.fn();
    render(<DatePicker value={null} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('15'));

    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should respect min/max date limits', () => {
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2024-12-31');

    render(
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        value={new Date('2023-12-31')}
      />
    );

    // Should show validation error
    expect(screen.getByText(/minimum date/i)).toBeInTheDocument();
  });
});
```

---

## 📦 **IMPLEMENTATION CHECKLIST**

### **✅ Component Features:**
- [ ] Basic date input με calendar popup
- [ ] Date range selection
- [ ] Multiple date selection
- [ ] Min/max date validation
- [ ] Disabled dates support
- [ ] Time selection (optional)
- [ ] Multiple month display
- [ ] Week numbers display
- [ ] Today button
- [ ] Clear functionality

### **✅ Integration:**
- [ ] @layera/constants integration
- [ ] @layera/theme-switcher support
- [ ] @layera/i18n compatibility
- [ ] @layera/icons για calendar navigation
- [ ] @layera/modals για calendar popup
- [ ] TypeScript strict types

### **✅ Quality:**
- [ ] Unit tests με >90% coverage
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Smooth animations

---

## 🚀 **MIGRATION FROM OLD_geo-canvas**

### **Before (OLD_geo-canvas):**
```typescript
// ❌ Basic HTML date input
<label htmlFor="availability-date" className="block text-sm font-medium text-gray-700">
  Ημερομηνία Διαθεσιμότητας
</label>
<input
  type="date"
  id="availability-date"
  value={availabilityDate || ''}
  onChange={handleDateChange}
  min={new Date().toISOString().split('T')[0]}
  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
/>
```

### **After (@layera/forms):**
```typescript
// ✅ LEGO component
<DatePicker
  value={availabilityDate}
  onChange={setAvailabilityDate}
  minDate={new Date()}
  maxDate={(() => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + CONSTANTS.AVAILABILITY_LIMITS.MAX_FUTURE_MONTHS);
    return maxDate;
  })()}
  label={t('property.availability.date')}
  description={t('property.availability.description')}
  placeholder={t('property.availability.placeholder')}
  showToday={true}
  clearable={true}
  required={true}
/>
```

---

*📝 Next Component: [InputGroup.md](./InputGroup.md)*