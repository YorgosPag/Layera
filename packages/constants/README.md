# @layera/constants

Centralized constants and configuration values for the Layera design system.

## 🚀 Installation

```bash
npm install @layera/constants
```

## 🎯 Purpose

**ZERO hardcoded values policy** - All values must come from this centralized system:
- Component sizes, states, variants
- User roles, permissions, statuses
- Form types, validation rules
- Table configurations
- API endpoints and timeouts

## 📦 Available Constants

### Form Constants
```typescript
import {
  FORM_SIZES,
  FORM_STATES,
  FORM_TYPES,
  VALIDATION_RULES
} from '@layera/constants';

// Component sizes
export const FORM_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg'
} as const;

// Component states
export const FORM_STATES = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  DISABLED: 'disabled'
} as const;

// Input types
export const FORM_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  SEARCH: 'search'
} as const;
```

### User & Role Constants
```typescript
import {
  USER_ROLES,
  USER_STATUSES,
  PERMISSIONS
} from '@layera/constants';

// User roles hierarchy
export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
  PRIVATE: 'private'
} as const;

// User account statuses
export const USER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  DELETED: 'deleted'
} as const;

// Permission levels
export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin'
} as const;
```

### Table & Data Constants
```typescript
import {
  TABLE_SIZES,
  TABLE_STATES,
  SORT_DIRECTIONS,
  PAGINATION_SIZES
} from '@layera/constants';

// Table component sizes
export const TABLE_SIZES = {
  COMPACT: 'compact',
  STANDARD: 'standard',
  COMFORTABLE: 'comfortable'
} as const;

// Pagination options
export const PAGINATION_SIZES = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 50,
  EXTRA_LARGE: 100
} as const;

// Sort directions
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: null
} as const;
```

### UI Component Constants
```typescript
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  ICON_SIZES,
  MODAL_SIZES
} from '@layera/constants';

// Button variants
export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  GHOST: 'ghost',
  DANGER: 'danger'
} as const;

// Icon sizes (in pixels)
export const ICON_SIZES = {
  XS: '12px',
  SM: '16px',
  MD: '20px',
  LG: '24px',
  XL: '32px',
  XXL: '48px'
} as const;

// Modal sizes
export const MODAL_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
  FULL: 'full'
} as const;
```

### Layout & Spacing Constants
```typescript
import {
  BREAKPOINTS,
  SPACING_SCALE,
  LAYOUT_VARIANTS
} from '@layera/constants';

// Responsive breakpoints
export const BREAKPOINTS = {
  XS: '0px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px'
} as const;

// Spacing scale (matches CSS design tokens)
export const SPACING_SCALE = {
  XS: 'var(--layera-space-xs)',
  SM: 'var(--layera-space-sm)',
  MD: 'var(--layera-space-md)',
  LG: 'var(--layera-space-lg)',
  XL: 'var(--layera-space-xl)'
} as const;
```

### Validation Constants
```typescript
import {
  VALIDATION_PATTERNS,
  VALIDATION_LIMITS,
  ERROR_TYPES
} from '@layera/constants';

// Regex patterns for validation
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_GR: /^\+30\d{10}$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/
} as const;

// Validation limits
export const VALIDATION_LIMITS = {
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  USERNAME_MIN: 3,
  USERNAME_MAX: 20,
  DESCRIPTION_MAX: 500
} as const;
```

### API & Configuration Constants
```typescript
import {
  API_ENDPOINTS,
  HTTP_STATUS,
  TIMEOUTS
} from '@layera/constants';

// API configuration
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  ROLES: '/api/roles',
  ALERTS: '/api/alerts'
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
} as const;

// Timeout values (in milliseconds)
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000
} as const;
```

## 🔧 Usage Examples

### In Components
```typescript
import { USER_ROLES, FORM_STATES, ICON_SIZES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';

const UserRoleSelect = ({ value, onChange }) => {
  const { t } = useLayeraTranslation();

  return (
    <Select
      value={value}
      onChange={onChange}
      options={Object.values(USER_ROLES).map(role => ({
        value: role,
        label: t(`roles.${role}`)
      }))}
      state={value ? FORM_STATES.SUCCESS : FORM_STATES.DEFAULT}
    />
  );
};
```

### In Validation
```typescript
import { VALIDATION_PATTERNS, VALIDATION_LIMITS } from '@layera/constants';

const validatePassword = (password: string) => {
  if (password.length < VALIDATION_LIMITS.PASSWORD_MIN) {
    return t('validation.passwordTooShort', { min: VALIDATION_LIMITS.PASSWORD_MIN });
  }

  if (!VALIDATION_PATTERNS.PASSWORD_STRONG.test(password)) {
    return t('validation.passwordWeak');
  }

  return null;
};
```

## 🎯 TypeScript Support

All constants are properly typed with `as const` assertions:

```typescript
// Type inference works perfectly
type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]; // 'admin' | 'editor' | 'viewer' | 'private'
type FormState = typeof FORM_STATES[keyof typeof FORM_STATES]; // 'default' | 'error' | 'success' | etc.

// Use in component props
interface UserCardProps {
  role: UserRole;
  status: typeof USER_STATUSES[keyof typeof USER_STATUSES];
}
```

## 🚫 Migration from Hardcoded Values

### Before (❌ Wrong)
```typescript
// Hardcoded values - NEVER do this
<Button variant="primary" size="lg">Save</Button>
<Input type="email" placeholder="Enter email" />
const roles = ['admin', 'editor', 'viewer'];
```

### After (✅ Correct)
```typescript
// Centralized constants - ALWAYS do this
import { BUTTON_VARIANTS, BUTTON_SIZES, FORM_TYPES, USER_ROLES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';

const { t } = useLayeraTranslation();

<Button variant={BUTTON_VARIANTS.PRIMARY} size={BUTTON_SIZES.LARGE}>
  {t('actions.save')}
</Button>
<Input
  type={FORM_TYPES.EMAIL}
  placeholder={t('forms.placeholders.email')}
/>
const roles = Object.values(USER_ROLES);
```

---

**Status**: 🚧 Planned (Package needs to be created)
**Priority**: Critical
**Dependencies**: None (foundational package)