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
  cards: [
    {
      id: 'property-category-card',
      component: (props) => React.createElement(CategoryCard, {
        ...props,
        categoryType: 'property',
        title: 'Ακίνητα',
        icon: React.createElement(VillaIcon, { size: 'md', theme: 'neutral' }),
        onCategorySelect: (category) => {
          console.log('Property category selected:', category);
        }
      }),
      order: 1
    },
    {
      id: 'job-category-card',
      component: (props) => React.createElement(CategoryCard, {
        ...props,
        categoryType: 'job',
        title: 'Εργασία',
        icon: React.createElement(BriefcaseIcon, { size: 'md', theme: 'neutral' }),
        onCategorySelect: (category) => {
          console.log('Job category selected:', category);
        }
      }),
      order: 2
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 5 // 5 seconds average
  }
});

console.log('✅ Category Step registered in StepRegistry');

// 🎯 CLEAN EXPORTS
export { CategoryStep } from './CategoryStep';
export { CategoryCard } from './CategoryCard';
export * from './types';