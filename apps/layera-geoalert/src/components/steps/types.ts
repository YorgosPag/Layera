/**
 * types.ts - Enterprise Step Management Domain Types
 *
 * Single source of truth για όλους τους step-related types
 * Semantic IDs με dynamic ordering support
 */

// 🎯 CORE STEP TYPES
export type StepId =
  | 'category'
  | 'intent'
  | 'location'
  | 'details'
  | 'pricing'
  | 'review'
  | 'transaction';

export type CategoryType = 'property' | 'job' | null;
export type IntentType = 'offer' | 'search' | null;
export type LocationType = 'map' | 'area' | 'address' | null;
export type DetailsType = 'form' | 'quick' | 'advanced' | null;
export type PricingType = 'free' | 'budget' | 'premium' | 'negotiable' | null;
export type ReviewType = 'preview' | 'edit' | 'confirm' | null;

// 🎯 STEP DEFINITION INTERFACE
export interface StepDefinition {
  /** Semantic ID - never changes */
  id: StepId;

  /** Display name για UI */
  name: string;

  /** Short name για compact displays */
  shortName?: string;

  /** React component για το step */
  component: React.ComponentType<StepProps>;

  /** Display order - changes dynamically */
  order: number;

  /** Visibility conditions */
  isVisible: boolean;

  /** Prerequisites - άλλα steps που πρέπει να ολοκληρωθούν */
  dependencies?: StepId[];

  /** Conditional rendering rules */
  conditions?: StepCondition[];

  /** Cards που ανήκουν σε αυτό το step */
  cards: StepCardDefinition[];

  /** Metadata για advanced filtering */
  metadata?: {
    category?: CategoryType;
    intent?: IntentType;
    isOptional?: boolean;
    estimatedTime?: number; // σε δευτερόλεπτα
  };
}

// 🎯 STEP CARD DEFINITION
export interface StepCardDefinition {
  /** Unique card ID */
  id: string;

  /** React component για την κάρτα */
  component: React.ComponentType<StepCardProps>;

  /** Display order μέσα στο step */
  order: number;

  /** Conditional rendering */
  conditions?: StepCondition[];

  /** Card-specific metadata */
  metadata?: {
    isRequired?: boolean;
    validationRules?: unknown[];
  };
}

// 🎯 STEP CONDITIONS
export interface StepCondition {
  /** Condition type */
  type: 'category' | 'intent' | 'feature_flag' | 'custom';

  /** Expected value */
  value: unknown;

  /** Comparison operator */
  operator?: 'equals' | 'not_equals' | 'in' | 'not_in';
}

// 🎯 STEP CONTEXT
export interface StepContext {
  /** Current step state */
  currentStepId: StepId;

  /** User selections */
  selectedCategory: CategoryType;
  selectedIntent: IntentType;
  selectedLocation: LocationType;
  selectedDetails: DetailsType;
  selectedPricing: PricingType;
  selectedReview: ReviewType;

  /** Step completion status */
  completedSteps: Set<StepId>;

  /** Feature flags */
  featureFlags: Record<string, boolean>;

  /** Custom data για advanced use cases */
  customData?: Record<string, unknown>;
}

// 🎯 STEP COMPONENT PROPS
export interface StepProps {
  /** Current context */
  context: StepContext;

  /** Navigation callbacks */
  onNext?: () => void;
  onPrevious?: () => void;
  onStepComplete?: (stepId: StepId, data?: unknown) => void;

  /** Visibility flag */
  isVisible?: boolean;

  /** Device-specific props */
  deviceProps?: {
    isIPhone14ProMaxDevice?: boolean;
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  };
}

// 🎯 STEP CARD COMPONENT PROPS
export interface StepCardProps {
  /** Current context */
  context: StepContext;

  /** Card-specific data */
  data?: unknown;

  /** Event callbacks */
  onChange?: (data: unknown) => void;
  onValidationChange?: (isValid: boolean) => void;

  /** Display properties */
  variant?: 'property' | 'job';
  theme?: 'light' | 'dark';
  opacity?: 'transparent' | 'semi-transparent' | 'opaque';
}

// 🎯 STEP FLOW CONFIGURATION
export interface StepFlowConfig {
  /** Flow identifier */
  id: string;

  /** Flow display name */
  name: string;

  /** Step definitions με custom order */
  steps: Array<{
    stepId: StepId;
    order: number;
    isOptional?: boolean;
  }>;

  /** Flow conditions */
  conditions?: StepCondition[];
}

// 🎯 STEP REGISTRY INTERFACE
export interface StepRegistryInterface {
  /** Register a step definition */
  register(step: StepDefinition): void;

  /** Get available steps για specific context */
  getAvailableSteps(context: StepContext): StepDefinition[];

  /** Get step by ID */
  getStep(stepId: StepId): StepDefinition | undefined;

  /** Reorder steps dynamically */
  reorderSteps(reorderConfig: Array<{ stepId: StepId; order: number }>): void;

  /** Set flow configuration */
  setFlow(flowConfig: StepFlowConfig): void;
}