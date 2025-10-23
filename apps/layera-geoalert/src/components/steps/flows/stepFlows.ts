/**
 * stepFlows.ts - Pre-defined Step Flow Configurations
 *
 * Enterprise flow definitions για διαφορετικά user journeys
 * Semantic naming με dynamic ordering support
 */

import type { StepFlowConfig } from '../types';

// 🏠 PROPERTY FLOWS
export const PROPERTY_OFFER_FLOW: StepFlowConfig = {
  id: 'property_offer',
  name: 'Property Offer Flow',
  steps: [
    { stepId: 'category', order: 1 },
    { stepId: 'intent', order: 2 },
    { stepId: 'location', order: 3 },
    { stepId: 'details', order: 4 },
    { stepId: 'pricing', order: 5 },
    { stepId: 'review', order: 6 }
  ],
  conditions: [
    { type: 'category', value: 'property' },
    { type: 'intent', value: 'offer' }
  ]
};

export const PROPERTY_SEARCH_FLOW: StepFlowConfig = {
  id: 'property_search',
  name: 'Property Search Flow',
  steps: [
    { stepId: 'category', order: 1 },
    { stepId: 'intent', order: 2 },
    { stepId: 'location', order: 3 },
    { stepId: 'details', order: 4 },
    { stepId: 'review', order: 5 }
    // Χωρίς pricing για search
  ],
  conditions: [
    { type: 'category', value: 'property' },
    { type: 'intent', value: 'search' }
  ]
};

// 💼 JOB FLOWS
export const JOB_OFFER_FLOW: StepFlowConfig = {
  id: 'job_offer',
  name: 'Job Offer Flow',
  steps: [
    { stepId: 'category', order: 1 },
    { stepId: 'intent', order: 2 },
    { stepId: 'location', order: 3 },
    { stepId: 'details', order: 4 },
    { stepId: 'pricing', order: 5 }, // Salary για jobs
    { stepId: 'review', order: 6 }
  ],
  conditions: [
    { type: 'category', value: 'job' },
    { type: 'intent', value: 'offer' }
  ]
};

export const JOB_SEARCH_FLOW: StepFlowConfig = {
  id: 'job_search',
  name: 'Job Search Flow',
  steps: [
    { stepId: 'category', order: 1 },
    { stepId: 'location', order: 2 }, // Location πιο νωρίς για job search
    { stepId: 'intent', order: 3 },
    { stepId: 'details', order: 4 },
    { stepId: 'review', order: 5 }
    // Χωρίς pricing για search
  ],
  conditions: [
    { type: 'category', value: 'job' },
    { type: 'intent', value: 'search' }
  ]
};

// 🚀 ENHANCED FLOWS (για A/B testing)
export const ENHANCED_PROPERTY_FLOW: StepFlowConfig = {
  id: 'enhanced_property',
  name: 'Enhanced Property Flow',
  steps: [
    { stepId: 'category', order: 1 },
    { stepId: 'pricing', order: 2 }, // Πρώιμο pricing για better qualification
    { stepId: 'intent', order: 3 },
    { stepId: 'location', order: 4 },
    { stepId: 'details', order: 5 },
    { stepId: 'transaction', order: 6 }, // Με transaction step
    { stepId: 'review', order: 7 }
  ],
  conditions: [
    { type: 'category', value: 'property' },
    { type: 'feature_flag', value: 'enhanced_flow_enabled' }
  ]
};

export const QUICK_FLOW: StepFlowConfig = {
  id: 'quick_flow',
  name: 'Quick Entry Flow',
  steps: [
    { stepId: 'category', order: 1 },
    { stepId: 'location', order: 2 },
    { stepId: 'review', order: 3 }
    // Minimal steps για quick entry
  ],
  conditions: [
    { type: 'feature_flag', value: 'quick_flow_enabled' }
  ]
};

// 📋 FLOW REGISTRY
export const STEP_FLOWS: Record<string, StepFlowConfig> = {
  property_offer: PROPERTY_OFFER_FLOW,
  property_search: PROPERTY_SEARCH_FLOW,
  job_offer: JOB_OFFER_FLOW,
  job_search: JOB_SEARCH_FLOW,
  enhanced_property: ENHANCED_PROPERTY_FLOW,
  quick_flow: QUICK_FLOW
};

// 🎮 FLOW SELECTION UTILITIES
export const getFlowForContext = (
  category: 'property' | 'job' | null,
  intent: 'offer' | 'search' | null,
  featureFlags: Record<string, boolean> = {}
): StepFlowConfig | null => {
  // Enhanced flow με feature flag
  if (category === 'property' && featureFlags.enhanced_flow_enabled) {
    return ENHANCED_PROPERTY_FLOW;
  }

  // Quick flow με feature flag
  if (featureFlags.quick_flow_enabled) {
    return QUICK_FLOW;
  }

  // Standard flows
  const flowKey = `${category}_${intent}`;
  return STEP_FLOWS[flowKey] || null;
};

export const getAllFlows = (): StepFlowConfig[] => {
  return Object.values(STEP_FLOWS);
};

export const getFlowById = (flowId: string): StepFlowConfig | null => {
  return STEP_FLOWS[flowId] || null;
};