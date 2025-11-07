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

// Usage example - using imported constants
const emailInputConfig = {
  type: FORM_TYPES.EMAIL,
  className: `input-${FORM_SIZES.MEDIUM}`,
  'data-state': FORM_STATES.DEFAULT
};
```

### User & Role Constants
```typescript
import {
  USER_ROLES,
  USER_STATUS,
  PERMISSIONS
} from '@layera/constants';

// Usage example - role-based access control
interface User {
  role: string;
  status: string;
}

const checkUserPermission = (user: User, requiredRole: keyof typeof USER_ROLES) => {
  return USER_ROLES[user.role as keyof typeof USER_ROLES] === USER_ROLES[requiredRole];
};

// Status checking
const isActiveUser = (user: User) => {
  return user.status === USER_STATUS.ACTIVE;
};
```

### Table & Data Constants
```typescript
import {
  SORT_DIRECTIONS,
  PAGINATION_SIZES
} from '@layera/constants';

// Table sorting and pagination logic
const createTableLogic = (data: any[], currentPage: number) => {
  const sortedData = data.sort((a, b) => {
    // Use SORT_DIRECTIONS for consistent sorting
    return SORT_DIRECTIONS.ASC ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const paginatedData = sortedData.slice(
    currentPage * PAGINATION_SIZES.MEDIUM,
    (currentPage + 1) * PAGINATION_SIZES.MEDIUM
  );

  return { sortedData, paginatedData };
};
```

### UI Component Constants
```typescript
import {
  BUTTON_SIZES,
  ICON_SIZES,
  MODAL_SIZES
} from '@layera/constants';
import { Button } from '@layera/buttons';
import { HomeIcon } from '@layera/icons';

// UI component usage with constants
const ExampleComponent = () => {
  return (
    <div>
      <Button size={BUTTON_SIZES.LARGE}>
        <HomeIcon size={ICON_SIZES.MD} />
        Home
      </Button>
    </div>
  );
};
```

### Layout & Spacing Constants
```typescript
import { ΒΛΕΠΕ packages\tokens\src\tokens.css } from '@layera/constants';
import { useViewportWithOverride } from '@layera/viewport';

// Responsive layout with design tokens
const ResponsiveLayout = () => {
  const { isMobile, isTablet, isDesktop } = useViewportWithOverride();

  return (
    <div
      style={{
        padding: ΒΛΕΠΕ packages\tokens\src\tokens.css.MD,
        margin: ΒΛΕΠΕ packages\tokens\src\tokens.css.LG,
        gap: ΒΛΕΠΕ packages\tokens\src\tokens.css.SM
      }}
    >
      {/* Responsive content */}
    </div>
  );
};
```

### Validation Constants
```typescript
import { FORM_VALIDATION } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';

// Validation with i18n
const validatePassword = (password: string) => {
  const { t } = useLayeraTranslation();

  if (password.length < FORM_VALIDATION.PASSWORD_MIN) {
    return t('validation.passwordTooShort', { min: FORM_VALIDATION.PASSWORD_MIN });
  }

  return null; // Valid
};
```

### API & Configuration Constants
```typescript
import { API_STATUS, API_TIMEOUTS } from '@layera/constants';

// API client with constants
const apiClient = async (endpoint: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUTS.MEDIUM);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.status === API_STATUS.UNAUTHORIZED) {
      // Handle unauthorized
      throw new Error('Authentication required');
    }

    if (response.status === API_STATUS.OK) {
      return response.json();
    }

    throw new Error(`API error: ${response.status}`);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
```

## 🔧 Usage Examples

### In Components
```tsx
import { USER_ROLES, FORM_STATES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { Select } from '@layera/forms';

interface UserRoleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const UserRoleSelect: React.FC<UserRoleSelectProps> = ({ value, onChange }) => {
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
import { FORM_VALIDATION } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';

const usePasswordValidation = () => {
  const { t } = useLayeraTranslation();

  return (password: string): string | null => {
    if (password.length < FORM_VALIDATION.PASSWORD_MIN) {
      return t('validation.passwordTooShort', { min: FORM_VALIDATION.PASSWORD_MIN });
    }

    return null; // Valid
  };
};
```

## 🎯 TypeScript Support

All constants are properly typed with `as const` assertions:

```typescript
import { USER_ROLES, FORM_STATES, USER_STATUS } from '@layera/constants';

// Type inference works perfectly
type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]; // 'admin' | 'editor' | 'viewer' | 'private'
type FormState = typeof FORM_STATES[keyof typeof FORM_STATES]; // 'default' | 'error' | 'success' | etc.

// Use in component props
interface UserCardProps {
  role: UserRole;
  status: typeof USER_STATUS[keyof typeof USER_STATUS];
}

interface User {
  role: string;
  status: string;
  displayName?: string;
  email?: string;
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
```tsx
// Centralized constants - ALWAYS do this
import { BUTTON_SIZES, FORM_TYPES, USER_ROLES } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { Input } from '@layera/forms';

const MyComponent = () => {
  const { t } = useLayeraTranslation();

  return (
    <div>
      <Button size={BUTTON_SIZES.LARGE}>
        {t('actions.save')}
      </Button>
      <Input
        type={FORM_TYPES.EMAIL}
        placeholder={t('forms.placeholders.email')}
      />
    </div>
  );
};

const roles = Object.values(USER_ROLES);
```

---

**Status**: 🚧 Planned (Package needs to be created)
**Priority**: Critical
**Dependencies**: None (foundational package)