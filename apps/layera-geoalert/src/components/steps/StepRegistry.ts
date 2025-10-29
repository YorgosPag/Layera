/**
 * StepRegistry.ts - Enterprise Step Registry with Dynamic Ordering
 *
 * Central registry για όλα τα steps με semantic naming και dynamic reordering
 * Single source of truth για step management
 */

import {
  StepDefinition,
  StepContext,
  StepFlowConfig,
  StepId,
  StepRegistryInterface,
  StepCondition
} from './types';

export class StepRegistry implements StepRegistryInterface {
  private static instance: StepRegistry;
  private steps = new Map<StepId, StepDefinition>();
  private currentFlow: StepFlowConfig | null = null;

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): StepRegistry {
    if (!StepRegistry.instance) {
      StepRegistry.instance = new StepRegistry();
    }
    return StepRegistry.instance;
  }

  /**
   * 🚀 REGISTER STEP: Auto-registration από step modules
   */
  register(step: StepDefinition): void {
    if (this.steps.has(step.id)) {
      // Step already registered, overriding
    }

    // Validation
    this.validateStepDefinition(step);

    this.steps.set(step.id, step);
  }

  /**
   * 🎯 GET AVAILABLE STEPS: Context-aware step filtering
   */
  getAvailableSteps(context: StepContext): StepDefinition[] {
    const allSteps = Array.from(this.steps.values());

    return allSteps
      .filter(step => this.isStepAvailable(step, context))
      .sort((a, b) => this.getEffectiveOrder(a, context) - this.getEffectiveOrder(b, context));
  }

  /**
   * 🔍 GET STEP BY ID: Direct step access
   */
  getStep(stepId: StepId): StepDefinition | undefined {
    return this.steps.get(stepId);
  }

  /**
   * 🔄 REORDER STEPS: Dynamic order changes χωρίς folder renaming
   */
  reorderSteps(reorderConfig: Array<{ stepId: StepId; order: number }>): void {
    reorderConfig.forEach(({ stepId, order }) => {
      const step = this.steps.get(stepId);
      if (step) {
        step.order = order;
      }
    });

  }

  /**
   * 🎮 SET FLOW: Predefined flow configurations
   */
  setFlow(flowConfig: StepFlowConfig): void {
    this.currentFlow = flowConfig;

    // Apply flow-specific ordering
    flowConfig.steps.forEach(({ stepId, order }) => {
      const step = this.steps.get(stepId);
      if (step) {
        step.order = order;
      }
    });
  }

  /**
   * 📊 GET REGISTRY STATUS: Debug information
   */
  getRegistryStatus() {
    return {
      totalSteps: this.steps.size,
      registeredSteps: Array.from(this.steps.keys()),
      currentFlow: this.currentFlow?.name || 'default',
      stepOrder: Array.from(this.steps.values())
        .sort((a, b) => a.order - b.order)
        .map(step => ({ id: step.id, order: step.order }))
    };
  }

  // 🔒 PRIVATE METHODS

  private validateStepDefinition(step: StepDefinition): void {
    if (!step.id || !step.name || !step.component) {
      throw new Error(`Invalid step definition: ${step.id}`);
    }

    if (typeof step.order !== 'number' || step.order < 0) {
      throw new Error(`Invalid order for step ${step.id}: ${step.order}`);
    }
  }

  private isStepAvailable(step: StepDefinition, context: StepContext): boolean {
    // 1. Visibility check
    if (!step.isVisible) {
      return false;
    }

    // 2. Dependencies check - ΔΙΟΡΘΩΣΗ: Αγνοώ dependencies αν completedSteps είναι άδειο
    // Αυτό επιτρέπει την εμφάνιση όλων των steps όταν δεν έχουμε step completion tracking
    if (step.dependencies && context.completedSteps.size > 0) {
      const missingDeps = step.dependencies.filter(depId =>
        !context.completedSteps.has(depId)
      );
      if (missingDeps.length > 0) {
        return false;
      }
    }

    // 3. Conditions check
    if (step.conditions) {
      return step.conditions.every(condition =>
        this.evaluateCondition(condition, context)
      );
    }

    return true;
  }

  private evaluateCondition(condition: StepCondition, context: StepContext): boolean {
    const { type, value, operator = 'equals' } = condition;

    let contextValue: unknown;

    switch (type) {
      case 'category':
        contextValue = context.selectedCategory;
        break;
      case 'intent':
        contextValue = context.selectedIntent;
        break;
      case 'feature_flag':
        contextValue = context.featureFlags[value as string];
        break;
      case 'custom':
        contextValue = context.customData?.[value as string];
        break;
      default:
        return false;
    }

    switch (operator) {
      case 'equals':
        return contextValue === value;
      case 'not_equals':
        return contextValue !== value;
      case 'in':
        return Array.isArray(value) && value.includes(contextValue);
      case 'not_in':
        return Array.isArray(value) && !value.includes(contextValue);
      default:
        return false;
    }
  }

  private getEffectiveOrder(step: StepDefinition, context: StepContext): number {
    // Μελλοντικά μπορεί να έχουμε context-specific order overrides
    return step.order;
  }
}

// 🎯 SINGLETON EXPORT
export const stepRegistry = StepRegistry.getInstance();