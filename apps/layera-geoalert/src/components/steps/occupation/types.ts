/**
 * occupation/types.ts - Enterprise Occupation Step Types με ESCO Integration
 */

// ESCO Domain Types
export interface ESCOOccupation {
  id: string;
  preferredLabel: string;
  alternativeLabels: string[];
  description: string;
  definition?: string;
  iscoGroupCode: string;
  searchTerms: string[];
  skillsCount: number;
  essentialSkills: string[];
}

export interface ESCOSearchResult {
  occupations: ESCOOccupation[];
  totalResults: number;
  searchTime: number;
  query: string;
}

// Step Data Types
export interface OccupationStepData {
  selectedOccupation?: ESCOOccupation;
  searchQuery?: string;
  searchResults?: ESCOSearchResult;
  timestamp: number;
}

export interface OccupationSearchState {
  query: string;
  isLoading: boolean;
  results: ESCOOccupation[];
  selectedOccupation: ESCOOccupation | null;
  error?: string;
}

// Component Props
export interface OccupationCardProps {
  occupation: ESCOOccupation;
  onClick: (occupation: ESCOOccupation) => void;
  isSelected?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export interface ESCOSearchProps {
  onOccupationSelected: (occupation: ESCOOccupation) => void;
  placeholder?: string;
  maxResults?: number;
  variant?: 'default' | 'modal' | 'inline';
}