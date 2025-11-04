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
  order: 3, // Μετά το PropertyTypeStep στο property flow
  isVisible: true,
  // ΔΙΟΡΘΩΣΗ: Χρησιμοποιώ conditions μόνο, όχι dependencies για να αποφύγω το completedSteps issue
  conditions: [
    {
      type: 'category',
      value: null,
      operator: 'not_equals' // Απαιτεί selectedCategory να μην είναι null
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

// 🎯 CLEAN EXPORTS
export { IntentStep } from './IntentStep';
export { IntentCard } from './IntentCard';
export * from './types';