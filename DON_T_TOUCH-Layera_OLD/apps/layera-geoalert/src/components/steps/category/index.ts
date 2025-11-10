/**
 * category/index.ts - Category Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { CategoryStep } from './CategoryStep';
import { CategoryCard } from './CategoryCard';
import { VillaIcon, BriefcaseIcon } from '@layera/icons';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'category',
  name: 'Κατηγορία',
  shortName: 'Τύπος',
  component: CategoryStep,
  order: 1,
  isVisible: true,
  dependencies: [], // First step, no dependencies
  conditions: [], // Always available
  cards: [], // ΔΙΠΛΟΤΥΠΟΣ ΑΦΑΙΡΕΘΗΚΕ: Τα cards render-άρονται ήδη στο CategoryStep.tsx
  metadata: {
    isOptional: false,
    estimatedTime: 5 // 5 seconds average
  }
});


// 🎯 CLEAN EXPORTS
export { CategoryStep } from './CategoryStep';
export { CategoryCard } from './CategoryCard';
export * from './types';