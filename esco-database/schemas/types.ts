/**
 * 🔥 ESCO Firestore Types - Enterprise Schema
 * TypeScript interfaces για ESCO database collections
 */

import { Timestamp } from 'firebase/firestore';

// ===================================
// 🎯 Core ESCO Types
// ===================================

export interface Occupation extends Record<string, unknown> {
  // Core Identity
  id: string;                    // key_15156
  originalUri: string;           // http://data.europa.eu/esco/occupation/...
  escoVersion: string;           // "v1.1.1"

  // ISCO Classification
  iscoGroupCode: string;         // "2654"
  iscoSubCode?: string | undefined;          // "2654.1.7"

  // Labels & Descriptions
  preferredLabel: string;        // "Technical Director"
  alternativeLabels: string[];   // ["technical manager", "head of technical"]
  description: string;           // Full description
  definition?: string | undefined;           // Technical definition
  scopeNote?: string | undefined;           // Scope clarification

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

export interface Skill extends Record<string, unknown> {
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
  definition?: string | undefined;           // Technical definition
  scopeNote?: string | undefined;           // Usage scope

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

export interface Category {
  // Core Identity
  id: string;                    // "2654" (ISCO code)
  type: CategoryType;            // "isco_group" | "skill_group"
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

export interface OccupationSkillRelation extends Record<string, unknown> {
  id: string;                    // "${occupationId}_${skillId}"
  occupationId: string;          // key_15156
  skillId: string;               // key_1260
  relationType: RelationType;    // "essential" | "optional"

  // Metadata για advanced search
  importance?: number;           // 1-10 scale
  frequency?: FrequencyType;     // "daily" | "weekly" | "occasional"

  createdAt: Timestamp;
  importedAt: Timestamp;
}

export interface SearchCache {
  queryHash: string;             // MD5 hash του search query
  query: {
    text: string;
    filters?: Record<string, unknown>;
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

export interface ESCOStats extends Record<string, unknown> {
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

// ===================================
// 🎯 Enum Types
// ===================================

export type CategoryType = 'isco_group' | 'skill_group';

export type RelationType = 'essential' | 'optional';

export type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'occasional';

export type SkillType = 'skill/competence' | 'knowledge';

export type ReuseLevel = 'cross-sector' | 'sector-specific' | 'occupation-specific';

export type OccupationType = 'escooccupation' | 'localooccupation';

export type RegulatedProfession = 'regulated' | 'unregulated';

// ===================================
// 🎯 Search & Query Types
// ===================================

export interface SearchQuery {
  text: string;
  filters?: {
    iscoGroupCode?: string;
    skillType?: SkillType;
    reuseLevel?: ReuseLevel;
    relationType?: RelationType;
  };
  language?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  items: T[];
  totalCount: number;
  hasMore: boolean;
  searchTime: number;
  cached: boolean;
}

export interface OccupationSearchResult extends SearchResult<Occupation> {
  suggestedSkills?: Skill[];
}

export interface SkillSearchResult extends SearchResult<Skill> {
  suggestedOccupations?: Occupation[];
}

// ===================================
// 🎯 Import & Processing Types
// ===================================

export interface CSVOccupationRow {
  ORIGINURI: string;
  ID: string;
  UUIDHISTORY: string;
  ISCOGROUPCODE: string;
  CODE: string;
  PREFERREDLABEL: string;
  ALTLABELS: string;
  DESCRIPTION: string;
  DEFINITION: string;
  SCOPENOTE: string;
  REGULATEDPROFESSIONNOTE: string;
  OCCUPATIONTYPE: string;
  ISLOCALIZED: string;
}

export interface CSVSkillRow {
  ORIGINURI: string;
  ID: string;
  UUIDHISTORY: string;
  SKILLTYPE: string;
  REUSELEVEL: string;
  PREFERREDLABEL: string;
  ALTLABELS: string;
  DESCRIPTION: string;
  DEFINITION: string;
  SCOPENOTE: string;
}

export interface CSVRelationRow {
  OCCUPATIONTYPE: string;
  OCCUPATIONID: string;
  RELATIONTYPE: string;
  SKILLID: string;
}

export interface ImportProgress {
  stage: ImportStage;
  processedCount: number;
  totalCount: number;
  currentItem?: string;
  errors: ImportError[];
  startedAt: Timestamp;
  estimatedCompletion?: Timestamp;
}

export type ImportStage =
  | 'parsing_csv'
  | 'validating_data'
  | 'importing_occupations'
  | 'importing_skills'
  | 'importing_relations'
  | 'building_indexes'
  | 'generating_cache'
  | 'completed'
  | 'error';

export interface ImportError {
  stage: ImportStage;
  item?: string | undefined;
  error: string;
  timestamp: Timestamp;
}

// ===================================
// 🎯 API Response Types
// ===================================

export interface ESCOApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    searchTime: number;
    totalCount: number;
    cached: boolean;
    version: string;
  };
}

export interface OccupationApiResponse extends ESCOApiResponse<Occupation[]> {
  relatedSkills?: Skill[];
  categories?: Category[];
}

export interface SkillApiResponse extends ESCOApiResponse<Skill[]> {
  relatedOccupations?: Occupation[];
  categories?: Category[];
}

// ===================================
// 🎯 Utility Types
// ===================================

export type CollectionName =
  | 'occupations'
  | 'skills'
  | 'categories'
  | 'relations'
  | 'search_cache'
  | 'metadata';

export interface FirestoreConfig {
  projectId: string;
  collectionPrefix?: string;
  enableOffline: boolean;
  cacheSettings: {
    cacheSizeBytes: number;
    enablePersistence: boolean;
  };
}

// ===================================
// 🎯 Validation Schema Types
// ===================================

export interface ValidationRule<T> {
  field: keyof T;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'array' | 'timestamp';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: (value: unknown) => boolean;
}

export interface ValidationSchema<T> {
  rules: ValidationRule<T>[];
  customValidators?: ((item: T) => ValidationError[])[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// ===================================
// 🎯 Batch Operation Types
// ===================================

export interface BatchOperation<T> {
  type: 'create' | 'update' | 'delete';
  collection: CollectionName;
  id: string;
  data?: T;
}

export interface BatchResult {
  successful: number;
  failed: number;
  errors: Array<{
    operation: BatchOperation<unknown>;
    error: string;
  }>;
}

// ===================================
// 🎯 Export everything
// ===================================

export * from './firestore-schema.md';