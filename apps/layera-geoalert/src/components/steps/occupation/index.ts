/**
 * occupation/index.ts - Occupation Step Package με ESCO Integration
 *
 * Auto-registration με semantic naming
 * Enterprise-grade ESCO occupation selection
 */

console.log('🚀 LOADING OCCUPATION STEP MODULE - VALIDATION FIXED!');

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { OccupationStep } from './OccupationStep';

console.log('🔍 DEBUG: stepRegistry instance:', stepRegistry);

console.log('🔍 DEBUG: stepRegistry instance:', stepRegistry);
console.log('🔍 DEBUG: stepRegistry type:', typeof stepRegistry);
console.log('🔍 DEBUG: stepRegistry.register:', stepRegistry?.register);
console.log('🔍 DEBUG: stepRegistry.register type:', typeof stepRegistry?.register);

// 🚀 AUTO-REGISTRATION: Register this step in the registry
if (stepRegistry && typeof stepRegistry.register === 'function') {
  console.log('✅ About to register occupation step...');
  stepRegistry.register({
  id: 'occupation',
  name: 'Επάγγελμα',
  shortName: 'Επάγγελμα',
  component: OccupationStep,
  order: 6, // After employment type step (order 5)
  isVisible: true,
  // Αφαιρώ dependencies για να εμφανίζεται αμέσως μετά το employmentType
  conditions: [
    {
      type: 'category',
      value: 'job',
      operator: 'equals' // Εμφανίζεται μόνο για job category
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 15, // 15 seconds average για occupation search
    description: 'Επιλογή επαγγέλματος από την ESCO βάση δεδομένων της ΕΕ',
    features: [
      'Real-time ESCO search',
      'EU official occupation taxonomy',
      '3,007 available occupations',
      'Skills mapping integration'
    ]
  }
  });
  console.log('✅ 🎯 OCCUPATION STEP REGISTERED με ESCO integration - Firebase ready!');
} else {
  console.error('❌ stepRegistry.register is not available!', { stepRegistry, registerMethod: stepRegistry?.register });
}

// 🎯 CLEAN EXPORTS
export { OccupationStep } from './OccupationStep';
export { ESCOSearchComponent } from './ESCOSearchComponent';
export * from './types';

// Hot reload trigger - test 5 - StepDefinition validation complete