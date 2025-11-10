/**
 * ESCO API Types - European Skills, Competences, Qualifications and Occupations
 * Based on ESCO v1.2 specification (esco.ec.europa.eu)
 */

export interface ESCOApiConfig {
  /** ESCO API base URL - default: esco.ec.europa.eu/api */
  baseUrl?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Enable caching of API responses */
  enableCache?: boolean;
  /** Cache TTL in milliseconds */
  cacheTtl?: number;
  /** Default language for requests */
  defaultLanguage?: 'el' | 'en' | string;
}

export interface ESCOOccupation {
  /** ESCO URI identifier */
  uri: string;
  /** ESCO UUID */
  uuid: string;
  /** ISCO-08 code mapping */
  iscoGroup?: string;
  /** Preferred label in requested language */
  preferredLabel: string;
  /** Alternative labels */
  alternativeLabel?: string[];
  /** Occupation description */
  description?: string;
  /** Broader occupations (parent in hierarchy) */
  broaderOccupation?: string[];
  /** Narrower occupations (children in hierarchy) */
  narrowerOccupation?: string[];
  /** Related skills */
  hasSkill?: ESCOSkill[];
  /** Status: published, deprecated, etc. */
  status: 'published' | 'deprecated' | 'draft';
  /** Last modification date */
  modifiedDate?: string;
}

export interface ESCOSkill {
  /** ESCO skill URI */
  uri: string;
  /** ESCO skill UUID */
  uuid: string;
  /** Skill preferred label */
  preferredLabel: string;
  /** Alternative labels for skill */
  alternativeLabel?: string[];
  /** Skill description */
  description?: string;
  /** Skill type: knowledge, skill, attitude */
  skillType?: 'knowledge' | 'skill' | 'attitude';
  /** Broader skills */
  broaderSkill?: string[];
  /** Status */
  status: 'published' | 'deprecated' | 'draft';
}

export interface ESCOSearchRequest {
  /** Search query text */
  text: string;
  /** Search type: occupation, skill, or both */
  type?: 'occupation' | 'skill' | 'all';
  /** Language code (ISO 639-1) */
  language?: string;
  /** Maximum results to return */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Include skills in occupation results */
  includeSkills?: boolean;
  /** Full text search or exact match */
  mode?: 'contains' | 'startsWith' | 'exact';
}

export interface ESCOSearchResponse {
  /** Search results */
  results: (ESCOOccupation | ESCOSkill)[];
  /** Total number of results available */
  total: number;
  /** Current offset */
  offset: number;
  /** Results per page */
  limit: number;
  /** Response metadata */
  meta: {
    /** Query processing time in ms */
    processingTime: number;
    /** API version used */
    apiVersion: string;
    /** Language of results */
    language: string;
  };
}

export interface ESCOHierarchyNode {
  /** Node URI */
  uri: string;
  /** Node label */
  label: string;
  /** Node level in hierarchy (1-4 for ISCO) */
  level: number;
  /** Parent node URI */
  parent?: string;
  /** Child node URIs */
  children: string[];
  /** Number of occupations under this node */
  occupationCount: number;
  /** ISCO code if applicable */
  iscoCode?: string;
}

export interface ESCOCrosswalk {
  /** Source taxonomy (esco, isco, onet, noc, etc.) */
  source: string;
  /** Target taxonomy */
  target: string;
  /** Source identifier */
  sourceId: string;
  /** Target identifier */
  targetId: string;
  /** Mapping confidence (0-1) */
  confidence?: number;
  /** Mapping type: exact, broader, narrower, related */
  mappingType: 'exact' | 'broader' | 'narrower' | 'related';
}

export interface ESCOApiError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Detailed error information */
  details?: unknown;
  /** HTTP status code */
  status: number;
}