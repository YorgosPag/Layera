/**
 * PipelineDiscovery.ts - Enterprise Auto-Discovery Pipeline System
 *
 * Αυτόματη ανακάλυψη και συγχρονισμός pipeline steps χωρίς manual configuration.
 * Κάθε νέο βήμα που προστίθεται στο CategoryStep αυτόματα ενημερώνει το stepper.
 */

export type CategoryType = 'property' | 'job' | null;
export type IntentType = 'offer' | 'search' | null;
export type PipelineStepId = string;

export interface PipelineStep {
  id: PipelineStepId;
  title: string;
  shortTitle: string;
  category?: CategoryType;
  intent?: IntentType;
  order: number;
  isActive: boolean;
  isVisible: boolean;
}

export interface PipelineState {
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
export class PipelineDiscovery {
  private static instance: PipelineDiscovery;
  private currentState: PipelineState;
  private listeners: Array<(state: PipelineState) => void> = [];

  private constructor() {
    this.currentState = this.getInitialState();
  }

  static getInstance(): PipelineDiscovery {
    if (!PipelineDiscovery.instance) {
      PipelineDiscovery.instance = new PipelineDiscovery();
    }
    return PipelineDiscovery.instance;
  }

  private getInitialState(): PipelineState {
    return {
      currentStepId: 'category',
      steps: this.discoverAvailableSteps(null, null),
      currentStepIndex: 0,
      totalSteps: 1,
      selectedCategory: null,
      selectedIntent: null,
      completedSteps: new Set()
    };
  }

  /**
   * 🚀 ENTERPRISE AUTO-DISCOVERY: Αυτόματη ανακάλυψη διαθέσιμων βημάτων
   */
  private discoverAvailableSteps(
    selectedCategory: CategoryType,
    selectedIntent: IntentType
  ): PipelineStep[] {
    const steps: PipelineStep[] = [];

    // Βήμα 1: Category (πάντα διαθέσιμο)
    steps.push({
      id: 'category',
      title: 'Κατηγορία',
      shortTitle: 'Τύπος',
      order: 0,
      isActive: !selectedCategory,
      isVisible: true
    });

    // Βήμα 2: Intent (διαθέσιμο μόνο αν έχει επιλεγεί category)
    if (selectedCategory) {
      steps.push({
        id: 'intent',
        title: 'Σκοπός',
        shortTitle: 'Δράση',
        category: selectedCategory,
        order: 1,
        isActive: !selectedIntent,
        isVisible: true
      });

      // Δυναμική ανακάλυψη επόμενων βημάτων ανάλογα με category + intent
      if (selectedCategory === 'property') {
        this.discoverPropertySteps(steps, selectedIntent);
      } else if (selectedCategory === 'job') {
        this.discoverJobSteps(steps, selectedIntent);
      }
    }

    return steps;
  }

  private discoverPropertySteps(steps: PipelineStep[], selectedIntent: IntentType): void {
    // Βήμα 3: Transaction Type (μόνο για property + offer)
    if (selectedIntent === 'offer') {
      steps.push({
        id: 'transactionType',
        title: 'Συναλλαγή',
        shortTitle: 'Τύπος',
        category: 'property',
        intent: 'offer',
        order: 2,
        isActive: true,
        isVisible: true
      });
    }

    // Κοινά βήματα για όλα τα property intents
    const commonPropertySteps = [
      { id: 'location', title: 'Τοποθεσία', shortTitle: 'Χάρτης', order: selectedIntent === 'offer' ? 3 : 2 },
      { id: 'layout', title: 'Κάτοψη', shortTitle: 'Διάταξη', order: selectedIntent === 'offer' ? 4 : 3 },
      { id: 'details', title: 'Στοιχεία', shortTitle: 'Περιγραφή', order: selectedIntent === 'offer' ? 5 : 4 },
      { id: 'complete', title: 'Τέλος', shortTitle: 'Επιβεβαίωση', order: selectedIntent === 'offer' ? 6 : 5 }
    ];

    commonPropertySteps.forEach(step => {
      steps.push({
        ...step,
        category: 'property',
        intent: selectedIntent,
        isActive: false,
        isVisible: true
      });
    });
  }

  private discoverJobSteps(steps: PipelineStep[], selectedIntent: IntentType): void {
    const jobSteps = [
      { id: 'employmentType', title: 'Εργασία', shortTitle: 'Τύπος', order: 2 },
      { id: 'availability', title: 'Διαθεσιμότητα', shortTitle: 'Πότε', order: 3 },
      { id: 'availabilityDetails', title: 'Λεπτομέρειες', shortTitle: 'Ημερομηνίες', order: 4 },
      { id: 'location', title: 'Τοποθεσία', shortTitle: 'Περιοχή', order: 5 },
      { id: 'details', title: 'Στοιχεία', shortTitle: 'Περιγραφή', order: 6 },
      { id: 'complete', title: 'Τέλος', shortTitle: 'Επιβεβαίωση', order: 7 }
    ];

    jobSteps.forEach(step => {
      steps.push({
        ...step,
        category: 'job',
        intent: selectedIntent,
        isActive: false,
        isVisible: true
      });
    });
  }

  /**
   * 🚀 ENTERPRISE STATE UPDATE: Αυτόματη ενημέρωση pipeline state
   */
  updatePipelineState(updates: Partial<PipelineState>): void {
    const previousState = { ...this.currentState };

    // Ενημέρωση βασικών πεδίων
    Object.assign(this.currentState, updates);

    // Αυτόματη ανακάλυψη νέων steps αν άλλαξε category ή intent
    if (updates.selectedCategory !== undefined || updates.selectedIntent !== undefined) {
      this.currentState.steps = this.discoverAvailableSteps(
        this.currentState.selectedCategory,
        this.currentState.selectedIntent
      );
      this.currentState.totalSteps = this.currentState.steps.length;
    }

    // Αυτόματος υπολογισμός currentStepIndex
    if (updates.currentStepId) {
      const stepIndex = this.currentState.steps.findIndex(step => step.id === updates.currentStepId);
      this.currentState.currentStepIndex = stepIndex >= 0 ? stepIndex : 0;
    }

    // Ειδοποίηση listeners μόνο αν άλλαξε κάτι σημαντικό
    if (this.hasSignificantChange(previousState, this.currentState)) {
      this.notifyListeners();
    }
  }

  private hasSignificantChange(prev: PipelineState, current: PipelineState): boolean {
    return (
      prev.currentStepId !== current.currentStepId ||
      prev.selectedCategory !== current.selectedCategory ||
      prev.selectedIntent !== current.selectedIntent ||
      prev.steps.length !== current.steps.length ||
      prev.currentStepIndex !== current.currentStepIndex
    );
  }

  /**
   * Subscription system για real-time updates
   */
  subscribe(listener: (state: PipelineState) => void): () => void {
    this.listeners.push(listener);

    // Immediate update με τρέχουσα κατάσταση
    listener(this.currentState);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentState));
  }

  /**
   * Public getter για την τρέχουσα κατάσταση
   */
  getCurrentState(): PipelineState {
    return { ...this.currentState };
  }

  /**
   * 🚀 ENTERPRISE AUTO-NAVIGATION: Αυτόματη πλοήγηση στο επόμενο βήμα
   */
  goToNextStep(): boolean {
    const nextIndex = this.currentState.currentStepIndex + 1;
    if (nextIndex < this.currentState.steps.length) {
      const nextStep = this.currentState.steps[nextIndex];
      if (nextStep) {
        this.updatePipelineState({
          currentStepId: nextStep.id,
          currentStepIndex: nextIndex
        });
        return true;
      }
    }
    return false;
  }

  /**
   * Πλοήγηση στο προηγούμενο βήμα
   */
  goToPreviousStep(): boolean {
    const prevIndex = this.currentState.currentStepIndex - 1;
    if (prevIndex >= 0) {
      const prevStep = this.currentState.steps[prevIndex];
      if (prevStep) {
        this.updatePipelineState({
          currentStepId: prevStep.id,
          currentStepIndex: prevIndex
        });
        return true;
      }
    }
    return false;
  }

  /**
   * Reset pipeline στην αρχική κατάσταση
   */
  reset(): void {
    this.currentState = this.getInitialState();
    this.notifyListeners();
  }

  /**
   * 🚀 ENTERPRISE SMART NAVIGATION: Έξυπνη πλοήγηση με βάση την κατάσταση
   */
  navigateToStep(stepId: PipelineStepId): boolean {
    const targetStep = this.currentState.steps.find(step => step.id === stepId);
    if (!targetStep || !targetStep.isVisible) {
      return false;
    }

    const targetIndex = this.currentState.steps.findIndex(step => step.id === stepId);
    this.updatePipelineState({
      currentStepId: stepId,
      currentStepIndex: targetIndex
    });

    return true;
  }

  /**
   * 🚀 ENTERPRISE COMPLETION TRACKING: Σημείωση ολοκλήρωσης βήματος
   */
  markStepCompleted(stepId: PipelineStepId): void {
    const newCompletedSteps = new Set(this.currentState.completedSteps);
    newCompletedSteps.add(stepId);

    this.updatePipelineState({
      completedSteps: newCompletedSteps
    });
  }

  /**
   * Έλεγχος αν ένα βήμα έχει ολοκληρωθεί
   */
  isStepCompleted(stepId: PipelineStepId): boolean {
    return this.currentState.completedSteps.has(stepId);
  }

  /**
   * 🚀 ENTERPRISE VALIDATION: Έλεγχος αν μπορεί να προχωρήσει στο επόμενο βήμα
   */
  canProceedToNext(): boolean {
    const currentStepIndex = this.currentState.currentStepIndex;
    const nextIndex = currentStepIndex + 1;

    // Έλεγχος αν υπάρχει επόμενο βήμα
    if (nextIndex >= this.currentState.steps.length) {
      return false;
    }

    // Έλεγχος αν το τρέχον βήμα έχει ολοκληρωθεί (προαιρετικός έλεγχος)
    const currentStep = this.currentState.steps[currentStepIndex];
    if (currentStep && !this.isStepCompleted(currentStep.id)) {
      // Για τώρα επιτρέπουμε την προχώρηση χωρίς αυστηρό έλεγχο ολοκλήρωσης
      // Μπορεί να τροποποιηθεί αργότερα για πιο αυστηρή validation
    }

    return true;
  }

  /**
   * Έλεγχος αν μπορεί να επιστρέψει στο προηγούμενο βήμα
   */
  canGoToPrevious(): boolean {
    return this.currentState.currentStepIndex > 0;
  }

  /**
   * 🚀 ENTERPRISE AUTO-SYNC: Αυτόματος συγχρονισμός με CategoryStep state
   */
  syncWithCategoryStep(categoryState: {
    selectedCategory: CategoryType;
    selectedIntent: IntentType;
    showTransactionStep?: boolean;
    currentStep?: string;
  }): void {
    const updates: Partial<PipelineState> = {
      selectedCategory: categoryState.selectedCategory,
      selectedIntent: categoryState.selectedIntent
    };

    // Αυτόματη ανακάλυψη του σωστού βήματος βάσει CategoryStep state
    if (categoryState.showTransactionStep && categoryState.selectedCategory === 'property' && categoryState.selectedIntent === 'offer') {
      updates.currentStepId = 'transactionType';
    } else if (categoryState.currentStep) {
      updates.currentStepId = categoryState.currentStep;
    }

    this.updatePipelineState(updates);
  }

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
  }> {
    return this.currentState.steps.map(step => ({
      id: step.id,
      title: step.title,
      shortTitle: step.shortTitle,
      order: step.order,
      isActive: step.isActive,
      isCompleted: this.isStepCompleted(step.id),
      ...(step.category && { category: step.category }),
      ...(step.intent && { intent: step.intent })
    }));
  }

  /**
   * 🚀 ENTERPRISE PROGRESS TRACKING: Υπολογισμός ποσοστού ολοκλήρωσης
   */
  getProgressPercentage(): number {
    const totalSteps = this.currentState.steps.length;
    const completedSteps = this.currentState.completedSteps.size;

    if (totalSteps === 0) return 0;

    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Καθαρισμός όλων των completed steps
   */
  clearCompletedSteps(): void {
    this.updatePipelineState({
      completedSteps: new Set()
    });
  }

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
  } {
    return {
      currentStep: this.currentState.currentStepId,
      stepIndex: this.currentState.currentStepIndex,
      totalSteps: this.currentState.totalSteps,
      availableSteps: this.currentState.steps.map(s => s.id),
      completedSteps: Array.from(this.currentState.completedSteps),
      selectedCategory: this.currentState.selectedCategory,
      selectedIntent: this.currentState.selectedIntent,
      progressPercentage: this.getProgressPercentage()
    };
  }
}