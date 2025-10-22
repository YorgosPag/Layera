/**
 * PipelineDiscovery.ts - Enterprise Auto-Discovery Pipeline System
 *
 * Αυτόματη ανακάλυψη και συγχρονισμός pipeline steps χωρίς manual configuration.
 * Κάθε νέο βήμα που προστίθεται στο CategoryStep αυτόματα ενημερώνει το stepper.
 */
type CategoryType = 'property' | 'job' | null;
type IntentType = 'offer' | 'search' | null;
type PipelineStepId = string;
interface PipelineStep {
    id: PipelineStepId;
    title: string;
    shortTitle: string;
    category?: CategoryType;
    intent?: IntentType;
    order: number;
    isActive: boolean;
    isVisible: boolean;
}
interface PipelineState {
    currentStepId: PipelineStepId;
    steps: PipelineStep[];
    currentStepIndex: number;
    totalSteps: number;
    selectedCategory: CategoryType;
    selectedIntent: IntentType;
    completedSteps: Set<PipelineStepId>;
}
/**
 * Enterprise Pipeline Discovery Engine
 * Αυτόματα ανακαλύπτει τα βήματα από την τρέχουσα κατάσταση του CategoryStep
 */
declare class PipelineDiscovery {
    private static instance;
    private currentState;
    private listeners;
    private constructor();
    static getInstance(): PipelineDiscovery;
    private getInitialState;
    /**
     * 🚀 ENTERPRISE AUTO-DISCOVERY: Αυτόματη ανακάλυψη διαθέσιμων βημάτων
     */
    private discoverAvailableSteps;
    private discoverPropertySteps;
    private discoverJobSteps;
    /**
     * 🚀 ENTERPRISE STATE UPDATE: Αυτόματη ενημέρωση pipeline state
     */
    updatePipelineState(updates: Partial<PipelineState>): void;
    private hasSignificantChange;
    /**
     * Subscription system για real-time updates
     */
    subscribe(listener: (state: PipelineState) => void): () => void;
    private notifyListeners;
    /**
     * Public getter για την τρέχουσα κατάσταση
     */
    getCurrentState(): PipelineState;
    /**
     * 🚀 ENTERPRISE AUTO-NAVIGATION: Αυτόματη πλοήγηση στο επόμενο βήμα
     */
    goToNextStep(): boolean;
    /**
     * Πλοήγηση στο προηγούμενο βήμα
     */
    goToPreviousStep(): boolean;
    /**
     * Reset pipeline στην αρχική κατάσταση
     */
    reset(): void;
    /**
     * 🚀 ENTERPRISE SMART NAVIGATION: Έξυπνη πλοήγηση με βάση την κατάσταση
     */
    navigateToStep(stepId: PipelineStepId): boolean;
    /**
     * 🚀 ENTERPRISE COMPLETION TRACKING: Σημείωση ολοκλήρωσης βήματος
     */
    markStepCompleted(stepId: PipelineStepId): void;
    /**
     * Έλεγχος αν ένα βήμα έχει ολοκληρωθεί
     */
    isStepCompleted(stepId: PipelineStepId): boolean;
    /**
     * 🚀 ENTERPRISE VALIDATION: Έλεγχος αν μπορεί να προχωρήσει στο επόμενο βήμα
     */
    canProceedToNext(): boolean;
    /**
     * Έλεγχος αν μπορεί να επιστρέψει στο προηγούμενο βήμα
     */
    canGoToPrevious(): boolean;
    /**
     * 🚀 ENTERPRISE AUTO-SYNC: Αυτόματος συγχρονισμός με CategoryStep state
     */
    syncWithCategoryStep(categoryState: {
        selectedCategory: CategoryType;
        selectedIntent: IntentType;
        showTransactionStep?: boolean;
        currentStep?: string;
    }): void;
    /**
     * 🚀 ENTERPRISE STEP DISCOVERY: Δυναμική ανακάλυψη διαθέσιμων βημάτων για UI
     */
    getAvailableStepsForUI(): Array<{
        id: PipelineStepId;
        title: string;
        shortTitle: string;
        order: number;
        isActive: boolean;
        isCompleted: boolean;
        category?: CategoryType;
        intent?: IntentType;
    }>;
    /**
     * 🚀 ENTERPRISE PROGRESS TRACKING: Υπολογισμός ποσοστού ολοκλήρωσης
     */
    getProgressPercentage(): number;
    /**
     * Καθαρισμός όλων των completed steps
     */
    clearCompletedSteps(): void;
    /**
     * 🚀 ENTERPRISE DEBUG INFO: Debugging και monitoring πληροφορίες
     */
    getDebugInfo(): {
        currentStep: PipelineStepId;
        stepIndex: number;
        totalSteps: number;
        availableSteps: string[];
        completedSteps: string[];
        selectedCategory: CategoryType;
        selectedIntent: IntentType;
        progressPercentage: number;
    };
}

/**
 * @layera/pipelines - Enterprise Pipeline Discovery & Management System
 *
 * Αυτόματη ανακάλυψη και συγχρονισμός pipeline steps χωρίς manual configuration.
 * Enterprise-grade pipeline state management για scalable εφαρμογές.
 */

declare const LAYERA_PIPELINES_VERSION = "1.0.0";

export { type CategoryType, type IntentType, LAYERA_PIPELINES_VERSION, PipelineDiscovery, type PipelineState, type PipelineStep, type PipelineStepId };
