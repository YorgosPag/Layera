/**
 * details/index.ts - Details Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { DetailsStep } from './DetailsStep';
import { DetailsCard } from './DetailsCard';
import { FormIcon, QuickIcon, AdvancedIcon } from '../../../icons/LayeraIcons';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'details',
  name: 'Λεπτομέρειες',
  shortName: 'Στοιχεία',
  component: DetailsStep,
  order: 4,
  isVisible: true,
  dependencies: ['category', 'intent', 'location'], // Depends on all previous steps
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
    }
  ],
  cards: [
    {
      id: 'form-details-card',
      component: (props) => React.createElement(DetailsCard, {
        ...props,
        detailsType: 'form',
        category: props.context.selectedCategory || 'property',
        title: 'Φόρμα',
        icon: React.createElement(FormIcon, { size: 'md', theme: 'neutral' }),
        onDetailsSelect: (details) => {
          console.log('Form details selected:', details);
        }
      }),
      order: 1
    },
    {
      id: 'quick-details-card',
      component: (props) => React.createElement(DetailsCard, {
        ...props,
        detailsType: 'quick',
        category: props.context.selectedCategory || 'property',
        title: 'Γρήγορα',
        icon: React.createElement(QuickIcon, { size: 'md', theme: 'neutral' }),
        onDetailsSelect: (details) => {
          console.log('Quick details selected:', details);
        }
      }),
      order: 2
    },
    {
      id: 'advanced-details-card',
      component: (props) => React.createElement(DetailsCard, {
        ...props,
        detailsType: 'advanced',
        category: props.context.selectedCategory || 'property',
        title: 'Προχωρημένα',
        icon: React.createElement(AdvancedIcon, { size: 'md', theme: 'neutral' }),
        onDetailsSelect: (details) => {
          console.log('Advanced details selected:', details);
        }
      }),
      order: 3
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 8 // 8 seconds average for details collection
  }
});

console.log('✅ Details Step registered in StepRegistry');

// 🎯 CLEAN EXPORTS
export { DetailsStep } from './DetailsStep';
export { DetailsCard } from './DetailsCard';
export * from './types';