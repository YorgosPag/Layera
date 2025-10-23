/**
 * intent/index.ts - Intent Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { IntentStep } from './IntentStep';
import { IntentCard } from './IntentCard';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'intent',
  name: 'Πρόθεση',
  shortName: 'Σκοπός',
  component: IntentStep,
  order: 2,
  isVisible: true,
  dependencies: ['category'], // Depends on category selection
  conditions: [
    {
      type: 'hasSelectedCategory',
      check: (context) => !!context.selectedCategory
    }
  ],
  cards: [
    {
      id: 'offer-intent-card',
      component: (props) => React.createElement(IntentCard, {
        ...props,
        intentType: 'offer',
        category: props.context.selectedCategory || 'property',
        title: 'Προσφορά',
        icon: null, // React.createElement(OfferIcon, { size: 'md', theme: 'neutral' }),
        onIntentSelect: (intent) => {
          console.log('Offer intent selected:', intent);
        }
      }),
      order: 1
    },
    {
      id: 'search-intent-card',
      component: (props) => React.createElement(IntentCard, {
        ...props,
        intentType: 'search',
        category: props.context.selectedCategory || 'property',
        title: 'Αναζήτηση',
        icon: null, // React.createElement(SearchIcon, { size: 'md', theme: 'neutral' }),
        onIntentSelect: (intent) => {
          console.log('Search intent selected:', intent);
        }
      }),
      order: 2
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 3 // 3 seconds average
  }
});

console.log('✅ Intent Step registered in StepRegistry');

// 🎯 CLEAN EXPORTS
export { IntentStep } from './IntentStep';
export { IntentCard } from './IntentCard';
export * from './types';