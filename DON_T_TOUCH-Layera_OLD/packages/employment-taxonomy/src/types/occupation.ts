/**
 * Domain Types για Employment Taxonomy System
 * Καθαρά domain types που αφαιρούν την πολυπλοκότητα του ESCO API
 */

export interface Occupation {
  /** Unique identifier */
  id: string;
  /** Primary display name */
  title: string;
  /** Alternative names/titles */
  alternativeTitles?: string[];
  /** Detailed description */
  description?: string;
  /** Industry category */
  category: OccupationCategory;
  /** Employment type preferences */
  employmentTypes: EmploymentType[];
  /** Required/relevant skills */
  skills: Skill[];
  /** Experience level */
  experienceLevel: ExperienceLevel;
  /** ESCO URI for external reference */
  escoUri?: string;
  /** ISCO-08 code for international compatibility */
  iscoCode?: string;
  /** Localization data */
  localizations: Record<string, OccupationLocalization>;
}

export interface OccupationCategory {
  /** Category ID */
  id: string;
  /** Category name */
  name: string;
  /** Parent category ID */
  parentId?: string;
  /** Category level (1-4, following ISCO structure) */
  level: number;
  /** ISCO major group code */
  iscoMajorGroup?: string;
}

export interface Skill {
  /** Skill identifier */
  id: string;
  /** Skill name */
  name: string;
  /** Skill description */
  description?: string;
  /** Skill type classification */
  type: SkillType;
  /** Skill level/proficiency */
  level?: SkillLevel;
  /** ESCO skill URI */
  escoUri?: string;
}

export interface OccupationLocalization {
  /** Localized title */
  title: string;
  /** Localized alternative titles */
  alternativeTitles?: string[];
  /** Localized description */
  description?: string;
  /** Language code */
  language: string;
}

export type EmploymentType =
  | 'full_time'        // Πλήρης απασχόληση
  | 'part_time'        // Μερική απασχόληση
  | 'contract'         // Συμβάσεις έργου
  | 'freelance'        // Αυτοτελής εργασία
  | 'temporary'        // Προσωρινή εργασία
  | 'seasonal'         // Εποχιακή εργασία
  | 'internship'       // Πρακτική άσκηση
  | 'volunteer'        // Εθελοντική εργασία
  | 'remote'           // Εξ αποστάσεως εργασία
  | 'hybrid';          // Υβριδική εργασία

export type ExperienceLevel =
  | 'entry'            // Εισαγωγικό επίπεδο
  | 'junior'           // Νέος επαγγελματίας
  | 'mid'              // Μεσαίος επαγγελματίας
  | 'senior'           // Έμπειρος επαγγελματίας
  | 'expert'           // Εξειδικευμένος
  | 'executive';       // Ανώτατο διοικητικό

export type SkillType =
  | 'technical'        // Τεχνικές δεξιότητες
  | 'soft'             // Μαλακές δεξιότητες
  | 'language'         // Γλωσσικές δεξιότητες
  | 'certification'    // Πιστοποιήσεις
  | 'tool'             // Εργαλεία/Software
  | 'domain';          // Γνωστικό αντικείμενο

export type SkillLevel =
  | 'basic'            // Βασικό επίπεδο
  | 'intermediate'     // Μεσαίο επίπεδο
  | 'advanced'         // Προχωρημένο επίπεδο
  | 'expert';          // Επίπεδο ειδικού

export interface OccupationSearchFilters {
  /** Text search query */
  query?: string;
  /** Filter by categories */
  categories?: string[];
  /** Filter by employment types */
  employmentTypes?: EmploymentType[];
  /** Filter by experience levels */
  experienceLevels?: ExperienceLevel[];
  /** Filter by required skills */
  skills?: string[];
  /** Language for localized results */
  language?: string;
  /** Maximum results */
  limit?: number;
  /** Pagination offset */
  offset?: number;
}

export interface OccupationSearchResult {
  /** Matching occupations */
  occupations: Occupation[];
  /** Total results available */
  total: number;
  /** Applied filters */
  filters: OccupationSearchFilters;
  /** Search metadata */
  meta: {
    /** Query processing time */
    processingTime: number;
    /** Search suggestions */
    suggestions?: string[];
    /** Did you mean alternatives */
    corrections?: string[];
  };
}