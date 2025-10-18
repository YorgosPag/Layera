# 🌐 Layera i18n Key Structure

## 📋 Key Organization

All text content MUST be managed through the i18n system. NO hardcoded strings allowed.

## 🗂️ File Structure

```
packages/i18n/src/locales/
├── el/ (Greek - Primary)
│   ├── common.json          # Shared across all components
│   ├── forms.json           # Form-related text
│   ├── tables.json          # Table headers, actions, states
│   ├── navigation.json      # Menus, breadcrumbs, links
│   ├── components.json      # Component-specific labels
│   ├── validation.json      # Error messages, validation
│   ├── actions.json         # Button labels, CTAs
│   └── status.json          # Status messages, states
└── en/ (English - Secondary)
    ├── common.json
    ├── forms.json
    ├── tables.json
    ├── navigation.json
    ├── components.json
    ├── validation.json
    ├── actions.json
    └── status.json
```

## 🔑 Key Naming Conventions

### Hierarchical Structure
```json
{
  "section": {
    "subsection": {
      "specific": "Translated Text"
    }
  }
}
```

### Category Prefixes
- **`actions.`** - Button labels, CTAs
- **`forms.`** - Form labels, placeholders, hints
- **`tables.`** - Headers, filters, pagination
- **`navigation.`** - Menu items, breadcrumbs
- **`validation.`** - Error messages, validation
- **`status.`** - Status indicators, states
- **`components.`** - Component-specific text

## 📚 Required Keys for New Packages

### @layera/forms
```json
// forms.json
{
  "labels": {
    "email": "Email",
    "password": "Κωδικός",
    "name": "Όνομα",
    "role": "Ρόλος"
  },
  "placeholders": {
    "email": "Εισάγετε το email σας",
    "enterValue": "Εισάγετε τιμή",
    "selectRole": "Επιλέξτε ρόλο",
    "search": "Αναζήτηση..."
  },
  "hints": {
    "emailPrivacy": "Δεν θα μοιραστούμε ποτέ το email σας",
    "passwordStrength": "Χρησιμοποιήστε τουλάχιστον 8 χαρακτήρες",
    "required": "Αυτό το πεδίο είναι υποχρεωτικό"
  },
  "states": {
    "loading": "Φόρτωση...",
    "saving": "Αποθήκευση...",
    "saved": "Αποθηκεύτηκε",
    "error": "Σφάλμα"
  }
}
```

### @layera/tables
```json
// tables.json
{
  "headers": {
    "name": "Όνομα",
    "email": "Email",
    "role": "Ρόλος",
    "status": "Κατάσταση",
    "actions": "Ενέργειες",
    "createdAt": "Ημερομηνία Δημιουργίας",
    "lastLogin": "Τελευταία Σύνδεση"
  },
  "actions": {
    "edit": "Επεξεργασία",
    "delete": "Διαγραφή",
    "view": "Προβολή",
    "export": "Εξαγωγή"
  },
  "filters": {
    "search": "Αναζήτηση...",
    "filterBy": "Φιλτράρισμα κατά",
    "clearFilters": "Καθαρισμός Φίλτρων",
    "noResults": "Δεν βρέθηκαν αποτελέσματα"
  },
  "pagination": {
    "previous": "Προηγούμενη",
    "next": "Επόμενη",
    "page": "Σελίδα",
    "of": "από",
    "rowsPerPage": "Γραμμές ανά σελίδα",
    "showing": "Εμφάνιση {{start}} - {{end}} από {{total}}"
  },
  "bulk": {
    "selected": "{{count}} επιλεγμένα",
    "selectAll": "Επιλογή Όλων",
    "deselectAll": "Αποεπιλογή Όλων",
    "bulkActions": "Μαζικές Ενέργειες"
  }
}
```

### @layera/navigation
```json
// navigation.json
{
  "breadcrumbs": {
    "home": "Αρχική",
    "back": "Πίσω",
    "separator": "/"
  },
  "tabs": {
    "overview": "Επισκόπηση",
    "details": "Λεπτομέρειες",
    "settings": "Ρυθμίσεις",
    "history": "Ιστορικό"
  },
  "menu": {
    "open": "Άνοιγμα Μενού",
    "close": "Κλείσιμο Μενού",
    "toggle": "Εναλλαγή Μενού"
  }
}
```

### @layera/validation
```json
// validation.json
{
  "required": "Αυτό το πεδίο είναι υποχρεωτικό",
  "email": "Παρακαλώ εισάγετε έγκυρο email",
  "password": {
    "tooShort": "Ο κωδικός πρέπει να έχει τουλάχιστον {{min}} χαρακτήρες",
    "tooWeak": "Ο κωδικός δεν είναι αρκετά ισχυρός",
    "mismatch": "Οι κωδικοί δεν ταιριάζουν"
  },
  "phone": {
    "invalid": "Μη έγκυρος αριθμός τηλεφώνου",
    "format": "Χρησιμοποιήστε τη μορφή +30xxxxxxxxxx"
  },
  "length": {
    "min": "Πρέπει να έχει τουλάχιστον {{min}} χαρακτήρες",
    "max": "Δεν μπορεί να υπερβαίνει τους {{max}} χαρακτήρες"
  }
}
```

## 🔧 Usage Patterns

### Component Implementation
```typescript
import { useLayeraTranslation } from '@layera/i18n';

const MyComponent = () => {
  const { t } = useLayeraTranslation();

  return (
    <div>
      <h1>{t('components.userProfile.title')}</h1>
      <Button>{t('actions.save')}</Button>
      <Input placeholder={t('forms.placeholders.email')} />
    </div>
  );
};
```

### Dynamic Keys
```typescript
// For role-based content
const roleName = t(`roles.${user.role}`);

// For status indicators
const statusText = t(`status.${item.status}`);

// For validation with parameters
const errorMsg = t('validation.password.tooShort', { min: 8 });
```

### Pluralization
```json
{
  "items": {
    "zero": "Δεν υπάρχουν στοιχεία",
    "one": "{{count}} στοιχείο",
    "other": "{{count}} στοιχεία"
  }
}
```

## 🚫 Migration Rules

### From Hardcoded Text
```typescript
// ❌ WRONG - Hardcoded
<Button>Save Changes</Button>
<Button>Αποθήκευση Αλλαγών</Button>

// ✅ CORRECT - i18n
<Button>{t('actions.saveChanges')}</Button>
```

### From Mixed Languages
```typescript
// ❌ WRONG - Mixed languages
<Link to="/dashboard">← Επιστροφή Dashboard</Link>

// ✅ CORRECT - Pure i18n
<Link to="/dashboard">{t('navigation.backToDashboard')}</Link>
```

## 🎯 Key Addition Process

### 1. Identify Missing Text
- Audit component for any hardcoded strings
- Check for mixed language expressions
- List all user-facing text

### 2. Categorize Keys
- Determine appropriate file (forms, tables, etc.)
- Follow naming conventions
- Group related keys together

### 3. Add to Both Languages
```bash
# Add to Greek (primary)
packages/i18n/src/locales/el/forms.json

# Add to English (secondary)
packages/i18n/src/locales/en/forms.json
```

### 4. Update Component
```typescript
// Replace hardcoded text with t() calls
const text = t('category.subcategory.key');
```

---

**Status**: ✅ Active System
**Dependencies**: All packages must use this system
**Enforcement**: ESLint rules + code review