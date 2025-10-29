/**
 * pricing/index.ts - Pricing Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { PricingStep } from './PricingStep';
import { PricingCard } from './PricingCard';
import { EuroIcon, TagIcon, HandshakeIcon } from '@layera/icons';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'pricing',
  name: 'Τιμολόγηση',
  shortName: 'Τιμή',
  component: PricingStep,
  order: 5,
  isVisible: true,
  dependencies: ['category', 'intent', 'location', 'details'], // Depends on all previous steps
  conditions: [
    {
      type: 'custom',
      value: 'hasSelectedCategory'
    },
    {
      type: 'custom',
      value: 'hasSelectedIntent'
    },
    {
      type: 'custom',
      value: 'hasSelectedLocation'
    },
    {
      type: 'custom',
      value: 'hasSelectedDetails'
    }
  ],
  cards: [
    {
      id: 'free-pricing-card',
      component: (props) => React.createElement(PricingCard, {
        ...props,
        pricingType: 'free',
        category: props.context.selectedCategory || 'property',
        title: 'Δωρεάν',
        icon: React.createElement(TagIcon, { size: 'md', theme: 'success' }),
        onPricingSelect: (pricing) => {
          console.log('Free pricing selected:', pricing);
        }
      }),
      order: 1
    },
    {
      id: 'budget-pricing-card',
      component: (props) => React.createElement(PricingCard, {
        ...props,
        pricingType: 'budget',
        category: props.context.selectedCategory || 'property',
        title: 'Οικονομικό',
        icon: React.createElement(EuroIcon, { size: 'md', theme: 'warning' }),
        onPricingSelect: (pricing) => {
          console.log('Budget pricing selected:', pricing);
        }
      }),
      order: 2
    },
    {
      id: 'premium-pricing-card',
      component: (props) => React.createElement(PricingCard, {
        ...props,
        pricingType: 'premium',
        category: props.context.selectedCategory || 'property',
        title: 'Premium',
        icon: React.createElement(EuroIcon, { size: 'md', theme: 'primary' }),
        onPricingSelect: (pricing) => {
          console.log('Premium pricing selected:', pricing);
        }
      }),
      order: 3
    },
    {
      id: 'negotiable-pricing-card',
      component: (props) => React.createElement(PricingCard, {
        ...props,
        pricingType: 'negotiable',
        category: props.context.selectedCategory || 'property',
        title: 'Διαπραγματεύσιμο',
        icon: React.createElement(HandshakeIcon, { size: 'md', theme: 'info' }),
        onPricingSelect: (pricing) => {
          console.log('Negotiable pricing selected:', pricing);
        }
      }),
      order: 4
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 5 // 5 seconds average for pricing selection
  }
});



// 🎯 CLEAN EXPORTS
export { PricingStep } from './PricingStep';
export { PricingCard } from './PricingCard';
export * from './types';