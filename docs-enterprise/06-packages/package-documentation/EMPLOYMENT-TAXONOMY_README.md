# @layera/employment-taxonomy

Enterprise employment and occupation taxonomy system based on ESCO EU standard.

## Overview

Professional LEGO system που παρέχει comprehensive occupation search και taxonomy management μέσω του επίσημου ESCO API της Ευρωπαϊκής Ένωσης.

### Key Features

- **ESCO Integration** - Official EU taxonomy με 2,942 occupations
- **Professional Search** - Debounced search με caching
- **Multilingual** - Native Greek/English support
- **Skills Mapping** - 13,890 skills συνδεδεμένες με occupations
- **International Standards** - ISCO-08 compatibility
- **Enterprise UI** - Professional React components
- **Reusable LEGO** - Αποσπώμενο και επαναχρησιμοποιήσιμο

## Quick Start

```typescript
import {
  OccupationSearch,
  useOccupationSearch,
  type Occupation
} from '@layera/employment-taxonomy';

// Basic usage
function JobSearchForm() {
  const handleOccupationSelect = (occupation: Occupation) => {
    console.log('Selected:', occupation.title);
  };

  return (
    <OccupationSearch
      placeholder="Αναζήτηση επαγγέλματος..."
      language="el"
      autoSearch={true}
      onOccupationSelect={handleOccupationSelect}
    />
  );
}

// Advanced hook usage
function CustomSearch() {
  const { results, actions, isLoading } = useOccupationSearch({
    autoSearch: true,
    language: 'el',
    defaultFilters: { limit: 10 }
  });

  return (
    <div>
      <input onChange={(e) => actions.setQuery(e.target.value)} />
      {results.map(occupation => (
        <OccupationCard
          key={occupation.id}
          occupation={occupation}
          variant="compact"
          onClick={actions.selectOccupation}
        />
      ))}
    </div>
  );
}
```

## Components

### OccupationSearch
Professional search interface με ESCO integration:
- Auto-complete search
- Loading states
- Error handling
- Responsive design

### OccupationCard
Structured occupation display:
- Multiple variants (full/compact/minimal)
- Skills display
- Employment types
- Experience levels

## Hooks

### useOccupationSearch
Enterprise search hook:
- Debounced searching
- Caching
- Pagination
- Filter management

## 🌍 ESCO Integration

Αυτό το system χρησιμοποιεί το επίσημο ESCO API:
- **Base URL**: `https://esco.ec.europa.eu/api`
- **Documentation**: https://esco.ec.europa.eu/en/use-esco/download
- **License**: EUPL (European Union Public License)
- **Languages**: 27 EU languages supported

### Data Structure
- **Occupations**: 2,942 structured occupations
- **Skills**: 13,890 skills και competences
- **Hierarchy**: ISCO-08 4-level classification
- **Mappings**: Crosswalks to national taxonomies

## Enterprise Architecture

### Single Source of Truth
```typescript
// Domain types abstracted από ESCO complexity
interface Occupation {
  id: string;
  title: string;
  category: OccupationCategory;
  skills: Skill[];
  employmentTypes: EmploymentType[];
  // ... ESCO integration πίσω από clean interface
}
```

### Provider Pattern
```typescript
// Αποσπώμενος ESCO provider
const escoProvider = new ESCOProvider({
  baseUrl: 'https://esco.ec.europa.eu/api',
  enableCache: true,
  defaultLanguage: 'el'
});
```

### LEGO Principles
- **Composable** - Κάθε component ανεξάρτητο
- **Reusable** - Μεταφερόμενο μεταξύ εφαρμογών
- **Configurable** - Flexible configuration
- **Testable** - Clear interfaces για testing

## 🔄 Migration από Basic Employment Types

### Before (Basic)
```typescript
// Simple hardcoded types
const employmentTypes = ['full_time', 'part_time', 'freelance'];
```

### After (Enterprise ESCO)
```typescript
// Professional EU-standard taxonomy
import { OccupationSearch } from '@layera/employment-taxonomy';

<OccupationSearch
  onOccupationSelect={(occupation) => {
    // 2,942 professional occupations
    // με skills, categories, international codes
  }}
/>
```

## 🌐 Supported Languages

- **Greek (el)** - Primary
- **English (en)** - International
- **German (de)** - Available
- **French (fr)** - Available
- **Spanish (es)** - Available
- **Italian (it)** - Available

## 📊 Performance

- **Caching**: 5-minute TTL για API responses
- **Debouncing**: 300ms search delay
- **Pagination**: Configurable results per page
- **Offline**: Local caching για offline usage

## 🔗 Dependencies

### Required
- `@layera/tolgee` - i18n
- `@layera/cards` - UI components
- `@layera/buttons` - Buttons
- `@layera/icons` - Icons
- `@layera/typography` - Text components
- `@layera/layout` - Layout primitives

### External
- ESCO API (esco.ec.europa.eu)
- React 18+

## 🚨 Important Notes

### ESCO API Limits
- **Free**: Unlimited requests
- **Rate Limiting**: Reasonable usage expected
- **Attribution**: EU attribution required
- **Local API**: Docker image available για on-premise

### Data Updates
- ESCO releases new versions περιοδικά
- Current support: ESCO v1.2 (May 2024)
- Migration guide θα παρέχεται για updates

## 📈 Roadmap

### Phase 1: ✅ Core Features
- [x] ESCO API integration
- [x] Basic search components
- [x] Greek/English support

### Phase 2: 🔄 Advanced Features
- [ ] Skills extraction από job descriptions
- [ ] O*NET crosswalks
- [ ] Advanced filtering
- [ ] Occupation recommendations

### Phase 3: 🔮 AI Enhancement
- [ ] Job matching algorithms
- [ ] Skills gap analysis
- [ ] Career path recommendations
- [ ] Industry trends integration

## 📜 License

MIT License - Free για commercial χρήση.

ESCO data: EUPL license από European Commission.

---

**🏗️ Part of the Layera LEGO Ecosystem**

Designed for enterprise applications που χρειάζονται professional employment taxonomy.