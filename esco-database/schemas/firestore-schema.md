# 🔥 ESCO Firestore Schema - Enterprise Design

## 🎯 Overview

Enterprise-grade Firestore schema για European Skills, Competences, Qualifications and Occupations (ESCO) database.

**📊 Data Volume:**
- **Occupations**: 33,104 records
- **Skills**: 97,764 records
- **Relations**: 123,788 occupation-skill connections
- **Categories**: 9,821 ISCO groups

---

## 🗂️ Collections Structure

### 1. `/occupations/{occupationId}`

**Primary collection για επαγγέλματα**

```typescript
interface Occupation {
  // Core Identity
  id: string;                    // key_15156
  originalUri: string;           // http://data.europa.eu/esco/occupation/...
  escoVersion: string;           // "v1.1.1"

  // ISCO Classification
  iscoGroupCode: string;         // "2654"
  iscoSubCode?: string;          // "2654.1.7"

  // Labels & Descriptions
  preferredLabel: string;        // "Technical Director"
  alternativeLabels: string[];   // ["technical manager", "head of technical"]
  description: string;           // Full description
  definition?: string;           // Technical definition
  scopeNote?: string;           // Scope clarification

  // Professional Info
  occupationType: string;        // "escooccupation"
  regulatedProfession: string;   // "unregulated" | "regulated"
  isLocalized: boolean;          // false για English base

  // Skills Relations (denormalized για performance)
  essentialSkills: string[];     // Array of skill IDs
  optionalSkills?: string[];     // Array of skill IDs
  skillsCount: number;           // Cache για UI

  // Search & Indexing
  searchTerms: string[];         // Lowercase terms για full-text search
  popularity?: number;           // Search frequency score

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  importedAt: Timestamp;
}
```

**🔍 Indexes:**
- `iscoGroupCode`
- `occupationType`
- `searchTerms` (array-contains)
- `essentialSkills` (array-contains)

---

### 2. `/skills/{skillId}`

**Collection για δεξιότητες και competences**

```typescript
interface Skill {
  // Core Identity
  id: string;                    // key_1260
  originalUri: string;           // http://data.europa.eu/esco/skill/...
  escoVersion: string;           // "v1.1.1"

  // Skill Classification
  skillType: string;             // "skill/competence" | "knowledge"
  reuseLevel: string;            // "cross-sector" | "sector-specific" | "occupation-specific"

  // Labels & Descriptions
  preferredLabel: string;        // "manage musical staff"
  alternativeLabels: string[];   // ["coordinate duties of musical staff"]
  description: string;           // Full description
  definition?: string;           // Technical definition
  scopeNote?: string;           // Usage scope

  // Relations (denormalized)
  relatedOccupations: string[];  // Array of occupation IDs που χρησιμοποιούν αυτή τη skill
  occupationsCount: number;      // Cache για UI
  relatedSkills?: string[];      // Συσχετισμένες skills

  // Categorization
  skillGroup?: string;           // Parent skill group
  category?: string;             // High-level category

  // Search & Indexing
  searchTerms: string[];         // Lowercase terms
  popularity?: number;           // Usage frequency

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  importedAt: Timestamp;
}
```

**🔍 Indexes:**
- `skillType`
- `reuseLevel`
- `searchTerms` (array-contains)
- `relatedOccupations` (array-contains)

---

### 3. `/categories/{categoryId}`

**ISCO Groups και skill categories**

```typescript
interface Category {
  // Core Identity
  id: string;                    // "2654" (ISCO code)
  type: string;                  // "isco_group" | "skill_group"
  level: number;                 // 1-4 (ISCO hierarchy level)

  // Hierarchy
  parentId?: string;             // Parent category ID
  childrenIds: string[];         // Children category IDs
  path: string[];                // ["25", "265", "2654"] (για breadcrumbs)

  // Labels
  preferredLabel: string;        // "Information and communications technology professionals"
  description?: string;          // Category description

  // Contents (denormalized για performance)
  occupationIds: string[];       // Array of occupation IDs σε αυτή την κατηγορία
  skillIds?: string[];           // Array of skill IDs (αν είναι skill category)
  totalOccupations: number;      // Cache count
  totalSkills?: number;          // Cache count

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**🔍 Indexes:**
- `type`
- `level`
- `parentId`
- `occupationIds` (array-contains)

---

### 4. `/relations/{relationId}`

**Detailed occupation-skill relations**

```typescript
interface OccupationSkillRelation {
  id: string;                    // "${occupationId}_${skillId}"
  occupationId: string;          // key_15156
  skillId: string;               // key_1260
  relationType: string;          // "essential" | "optional"

  // Metadata για advanced search
  importance?: number;           // 1-10 scale
  frequency?: string;            // "daily" | "weekly" | "occasional"

  createdAt: Timestamp;
  importedAt: Timestamp;
}
```

**🔍 Indexes:**
- `occupationId`
- `skillId`
- `relationType`
- Composite: `occupationId + relationType`

---

### 5. `/search_cache/{queryHash}`

**Search results caching για performance**

```typescript
interface SearchCache {
  queryHash: string;             // MD5 hash του search query
  query: {
    text: string;
    filters?: object;
    language?: string;
  };

  results: {
    occupations: string[];       // Array of occupation IDs
    skills: string[];            // Array of skill IDs
    totalCount: number;
  };

  createdAt: Timestamp;
  expiresAt: Timestamp;          // TTL για cache invalidation
}
```

---

### 6. `/metadata/stats`

**Global statistics για dashboard**

```typescript
interface ESCOStats {
  totalOccupations: number;
  totalSkills: number;
  totalRelations: number;
  totalCategories: number;

  lastImport: Timestamp;
  escoVersion: string;

  popularOccupations: string[];  // Top 10 occupation IDs
  popularSkills: string[];       // Top 10 skill IDs

  updatedAt: Timestamp;
}
```

---

## 🚀 Search Strategy

### Full-Text Search Implementation:

**1. Client-Side Search (Basic):**
```typescript
// Array-contains queries on searchTerms
const query = collection.where('searchTerms', 'array-contains', searchTerm.toLowerCase());
```

**2. Advanced Search (με Algolia integration):**
```typescript
// External search index για complex queries
const algoliaIndex = algolia.initIndex('esco_occupations');
const results = await algoliaIndex.search(query, {
  filters: 'iscoGroupCode:2654',
  hitsPerPage: 20
});
```

### Performance Optimizations:

**1. Denormalization:**
- Essential skills stored directly στο occupation document
- Occupation counts stored στο skill document
- Search terms pre-calculated και lowercase

**2. Composite Indexes:**
- `iscoGroupCode + occupationType`
- `skillType + reuseLevel`
- `occupationId + relationType`

**3. Pagination:**
```typescript
const query = collection
  .orderBy('preferredLabel')
  .startAfter(lastDoc)
  .limit(20);
```

---

## 🔧 Import Strategy

**1. Batch Processing:**
- Process CSV files σε batches των 500 records
- Use Firestore batch writes (max 500 operations)

**2. Data Validation:**
- TypeScript interfaces για type safety
- Required fields validation
- Duplicate detection

**3. Indexing:**
- Auto-generate searchTerms arrays
- Calculate denormalized counts
- Build category hierarchies

---

## 📱 Mobile Optimization

**Offline Support:**
```typescript
// Essential data για offline usage
const essentialOccupations = collection
  .where('popularity', '>=', 5)
  .limit(100);

// Cache locally
await essentialOccupations.get({ source: 'cache' });
```

**Progressive Loading:**
- Load basic occupation data first
- Lazy load skills and relations
- Background sync για updates

---

## 🔒 Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Read-only access για ESCO data
    match /occupations/{document} {
      allow read: if true;
      allow write: if false; // Only import scripts
    }

    match /skills/{document} {
      allow read: if true;
      allow write: if false;
    }

    match /search_cache/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Authenticated users can cache
    }
  }
}
```

---

## 📊 Estimated Costs

**Storage:**
- ~50MB για 33K occupations
- ~150MB για 97K skills
- ~200MB total (συμπεριλαμβανομένων indexes)

**Reads:**
- Typical search: 1-5 document reads
- με caching: 80% cache hit rate
- Estimated: 10,000 reads/day = $0.36/day

**Total Monthly Cost: ~$15-25** (very reasonable για enterprise feature)

---

Αυτό το schema παρέχει:
✅ **Scalable search** με multiple strategies
✅ **Offline support** για mobile apps
✅ **Performance optimization** με denormalization
✅ **Enterprise reliability** με caching και validation
✅ **Cost efficiency** με smart indexing

Ready για το import script development!