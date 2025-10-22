"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LAYERA_PIPELINES_VERSION: () => LAYERA_PIPELINES_VERSION,
  PipelineDiscovery: () => PipelineDiscovery
});
module.exports = __toCommonJS(index_exports);

// src/context/PipelineDiscovery.ts
var _PipelineDiscovery = class _PipelineDiscovery {
  constructor() {
    __publicField(this, "currentState");
    __publicField(this, "listeners", []);
    this.currentState = this.getInitialState();
  }
  static getInstance() {
    if (!_PipelineDiscovery.instance) {
      _PipelineDiscovery.instance = new _PipelineDiscovery();
    }
    return _PipelineDiscovery.instance;
  }
  getInitialState() {
    return {
      currentStepId: "category",
      steps: this.discoverAvailableSteps(null, null),
      currentStepIndex: 0,
      totalSteps: 1,
      selectedCategory: null,
      selectedIntent: null,
      completedSteps: /* @__PURE__ */ new Set()
    };
  }
  /**
   * 🚀 ENTERPRISE AUTO-DISCOVERY: Αυτόματη ανακάλυψη διαθέσιμων βημάτων
   */
  discoverAvailableSteps(selectedCategory, selectedIntent) {
    const steps = [];
    steps.push({
      id: "category",
      title: "\u039A\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1",
      shortTitle: "\u03A4\u03CD\u03C0\u03BF\u03C2",
      order: 0,
      isActive: !selectedCategory,
      isVisible: true
    });
    if (selectedCategory) {
      steps.push({
        id: "intent",
        title: "\u03A3\u03BA\u03BF\u03C0\u03CC\u03C2",
        shortTitle: "\u0394\u03C1\u03AC\u03C3\u03B7",
        category: selectedCategory,
        order: 1,
        isActive: !selectedIntent,
        isVisible: true
      });
      if (selectedCategory === "property") {
        this.discoverPropertySteps(steps, selectedIntent);
      } else if (selectedCategory === "job") {
        this.discoverJobSteps(steps, selectedIntent);
      }
    }
    return steps;
  }
  discoverPropertySteps(steps, selectedIntent) {
    if (selectedIntent === "offer") {
      steps.push({
        id: "transactionType",
        title: "\u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE",
        shortTitle: "\u03A4\u03CD\u03C0\u03BF\u03C2",
        category: "property",
        intent: "offer",
        order: 2,
        isActive: true,
        isVisible: true
      });
    }
    const commonPropertySteps = [
      { id: "location", title: "\u03A4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1", shortTitle: "\u03A7\u03AC\u03C1\u03C4\u03B7\u03C2", order: selectedIntent === "offer" ? 3 : 2 },
      { id: "layout", title: "\u039A\u03AC\u03C4\u03BF\u03C8\u03B7", shortTitle: "\u0394\u03B9\u03AC\u03C4\u03B1\u03BE\u03B7", order: selectedIntent === "offer" ? 4 : 3 },
      { id: "details", title: "\u03A3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", shortTitle: "\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE", order: selectedIntent === "offer" ? 5 : 4 },
      { id: "complete", title: "\u03A4\u03AD\u03BB\u03BF\u03C2", shortTitle: "\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7", order: selectedIntent === "offer" ? 6 : 5 }
    ];
    commonPropertySteps.forEach((step) => {
      steps.push({
        ...step,
        category: "property",
        intent: selectedIntent,
        isActive: false,
        isVisible: true
      });
    });
  }
  discoverJobSteps(steps, selectedIntent) {
    const jobSteps = [
      { id: "employmentType", title: "\u0395\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1", shortTitle: "\u03A4\u03CD\u03C0\u03BF\u03C2", order: 2 },
      { id: "availability", title: "\u0394\u03B9\u03B1\u03B8\u03B5\u03C3\u03B9\u03BC\u03CC\u03C4\u03B7\u03C4\u03B1", shortTitle: "\u03A0\u03CC\u03C4\u03B5", order: 3 },
      { id: "availabilityDetails", title: "\u039B\u03B5\u03C0\u03C4\u03BF\u03BC\u03AD\u03C1\u03B5\u03B9\u03B5\u03C2", shortTitle: "\u0397\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B5\u03C2", order: 4 },
      { id: "location", title: "\u03A4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1", shortTitle: "\u03A0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AE", order: 5 },
      { id: "details", title: "\u03A3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", shortTitle: "\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE", order: 6 },
      { id: "complete", title: "\u03A4\u03AD\u03BB\u03BF\u03C2", shortTitle: "\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7", order: 7 }
    ];
    jobSteps.forEach((step) => {
      steps.push({
        ...step,
        category: "job",
        intent: selectedIntent,
        isActive: false,
        isVisible: true
      });
    });
  }
  /**
   * 🚀 ENTERPRISE STATE UPDATE: Αυτόματη ενημέρωση pipeline state
   */
  updatePipelineState(updates) {
    const previousState = { ...this.currentState };
    Object.assign(this.currentState, updates);
    if (updates.selectedCategory !== void 0 || updates.selectedIntent !== void 0) {
      this.currentState.steps = this.discoverAvailableSteps(
        this.currentState.selectedCategory,
        this.currentState.selectedIntent
      );
      this.currentState.totalSteps = this.currentState.steps.length;
    }
    if (updates.currentStepId) {
      const stepIndex = this.currentState.steps.findIndex((step) => step.id === updates.currentStepId);
      this.currentState.currentStepIndex = stepIndex >= 0 ? stepIndex : 0;
    }
    if (this.hasSignificantChange(previousState, this.currentState)) {
      this.notifyListeners();
    }
  }
  hasSignificantChange(prev, current) {
    return prev.currentStepId !== current.currentStepId || prev.selectedCategory !== current.selectedCategory || prev.selectedIntent !== current.selectedIntent || prev.steps.length !== current.steps.length || prev.currentStepIndex !== current.currentStepIndex;
  }
  /**
   * Subscription system για real-time updates
   */
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.currentState);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentState));
  }
  /**
   * Public getter για την τρέχουσα κατάσταση
   */
  getCurrentState() {
    return { ...this.currentState };
  }
  /**
   * 🚀 ENTERPRISE AUTO-NAVIGATION: Αυτόματη πλοήγηση στο επόμενο βήμα
   */
  goToNextStep() {
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
  goToPreviousStep() {
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
  reset() {
    this.currentState = this.getInitialState();
    this.notifyListeners();
  }
  /**
   * 🚀 ENTERPRISE SMART NAVIGATION: Έξυπνη πλοήγηση με βάση την κατάσταση
   */
  navigateToStep(stepId) {
    const targetStep = this.currentState.steps.find((step) => step.id === stepId);
    if (!targetStep || !targetStep.isVisible) {
      return false;
    }
    const targetIndex = this.currentState.steps.findIndex((step) => step.id === stepId);
    this.updatePipelineState({
      currentStepId: stepId,
      currentStepIndex: targetIndex
    });
    return true;
  }
  /**
   * 🚀 ENTERPRISE COMPLETION TRACKING: Σημείωση ολοκλήρωσης βήματος
   */
  markStepCompleted(stepId) {
    const newCompletedSteps = new Set(this.currentState.completedSteps);
    newCompletedSteps.add(stepId);
    this.updatePipelineState({
      completedSteps: newCompletedSteps
    });
  }
  /**
   * Έλεγχος αν ένα βήμα έχει ολοκληρωθεί
   */
  isStepCompleted(stepId) {
    return this.currentState.completedSteps.has(stepId);
  }
  /**
   * 🚀 ENTERPRISE VALIDATION: Έλεγχος αν μπορεί να προχωρήσει στο επόμενο βήμα
   */
  canProceedToNext() {
    const currentStepIndex = this.currentState.currentStepIndex;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= this.currentState.steps.length) {
      return false;
    }
    const currentStep = this.currentState.steps[currentStepIndex];
    if (currentStep && !this.isStepCompleted(currentStep.id)) {
    }
    return true;
  }
  /**
   * Έλεγχος αν μπορεί να επιστρέψει στο προηγούμενο βήμα
   */
  canGoToPrevious() {
    return this.currentState.currentStepIndex > 0;
  }
  /**
   * 🚀 ENTERPRISE AUTO-SYNC: Αυτόματος συγχρονισμός με CategoryStep state
   */
  syncWithCategoryStep(categoryState) {
    const updates = {
      selectedCategory: categoryState.selectedCategory,
      selectedIntent: categoryState.selectedIntent
    };
    if (categoryState.showTransactionStep && categoryState.selectedCategory === "property" && categoryState.selectedIntent === "offer") {
      updates.currentStepId = "transactionType";
    } else if (categoryState.currentStep) {
      updates.currentStepId = categoryState.currentStep;
    }
    this.updatePipelineState(updates);
  }
  /**
   * 🚀 ENTERPRISE STEP DISCOVERY: Δυναμική ανακάλυψη διαθέσιμων βημάτων για UI
   */
  getAvailableStepsForUI() {
    return this.currentState.steps.map((step) => ({
      id: step.id,
      title: step.title,
      shortTitle: step.shortTitle,
      order: step.order,
      isActive: step.isActive,
      isCompleted: this.isStepCompleted(step.id),
      ...step.category && { category: step.category },
      ...step.intent && { intent: step.intent }
    }));
  }
  /**
   * 🚀 ENTERPRISE PROGRESS TRACKING: Υπολογισμός ποσοστού ολοκλήρωσης
   */
  getProgressPercentage() {
    const totalSteps = this.currentState.steps.length;
    const completedSteps = this.currentState.completedSteps.size;
    if (totalSteps === 0) return 0;
    return Math.round(completedSteps / totalSteps * 100);
  }
  /**
   * Καθαρισμός όλων των completed steps
   */
  clearCompletedSteps() {
    this.updatePipelineState({
      completedSteps: /* @__PURE__ */ new Set()
    });
  }
  /**
   * 🚀 ENTERPRISE DEBUG INFO: Debugging και monitoring πληροφορίες
   */
  getDebugInfo() {
    return {
      currentStep: this.currentState.currentStepId,
      stepIndex: this.currentState.currentStepIndex,
      totalSteps: this.currentState.totalSteps,
      availableSteps: this.currentState.steps.map((s) => s.id),
      completedSteps: Array.from(this.currentState.completedSteps),
      selectedCategory: this.currentState.selectedCategory,
      selectedIntent: this.currentState.selectedIntent,
      progressPercentage: this.getProgressPercentage()
    };
  }
};
__publicField(_PipelineDiscovery, "instance");
var PipelineDiscovery = _PipelineDiscovery;

// src/index.ts
var LAYERA_PIPELINES_VERSION = "1.0.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LAYERA_PIPELINES_VERSION,
  PipelineDiscovery
});
//# sourceMappingURL=index.js.map