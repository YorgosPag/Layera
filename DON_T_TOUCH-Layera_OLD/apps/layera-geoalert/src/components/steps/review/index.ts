/**
 * review/index.ts - Review Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { ReviewStep } from './ReviewStep';
import { ReviewCard } from './ReviewCard';
import { EyeIcon, EditIcon, CheckIcon } from '@layera/icons';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'review',
  name: 'Επιθεώρηση',
  shortName: 'Review',
  component: ReviewStep,
  order: 8, // Μετά το availability step (order 7)
  isVisible: true,
  dependencies: ['category', 'intent', 'location', 'details', 'pricing'], // Depends on all previous steps
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
    },
    {
      type: 'custom',
      value: 'hasSelectedPricing'
    }
  ],
  cards: [
    {
      id: 'preview-review-card',
      component: (props) => React.createElement(ReviewCard, {
        ...props,
        reviewType: 'preview',
        reviewData: {
          stepId: 'all-steps',
          stepName: 'Όλα τα Βήματα',
          selectedValue: 'Προεπισκόπηση επιλογών',
          isValid: true
        },
        category: props.context.selectedCategory || 'property',
        title: 'Προεπισκόπηση',
        icon: React.createElement(EyeIcon, { size: 'md', theme: 'info' }),
        onReviewAction: (action, stepId) => {
          console.log('Preview review action:', action, stepId);
        }
      }),
      order: 1
    },
    {
      id: 'edit-review-card',
      component: (props) => React.createElement(ReviewCard, {
        ...props,
        reviewType: 'edit',
        reviewData: {
          stepId: 'editable-steps',
          stepName: 'Επεξεργασία',
          selectedValue: 'Επεξεργασία επιλογών',
          isValid: true
        },
        category: props.context.selectedCategory || 'property',
        title: 'Επεξεργασία',
        icon: React.createElement(EditIcon, { size: 'md', theme: 'warning' }),
        onReviewAction: (action, stepId) => {
          console.log('Edit review action:', action, stepId);
        }
      }),
      order: 2
    },
    {
      id: 'confirm-review-card',
      component: (props) => React.createElement(ReviewCard, {
        ...props,
        reviewType: 'confirm',
        reviewData: {
          stepId: 'final-submission',
          stepName: 'Επιβεβαίωση',
          selectedValue: 'Έτοιμο για υποβολή',
          isValid: true
        },
        category: props.context.selectedCategory || 'property',
        title: 'Επιβεβαίωση',
        icon: React.createElement(CheckIcon, { size: 'md', theme: 'success' }),
        onReviewAction: (action, stepId) => {
          console.log('Confirm review action:', action, stepId);
        }
      }),
      order: 3
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 10 // 10 seconds average for final review
  }
});



// 🎯 CLEAN EXPORTS
export { ReviewStep } from './ReviewStep';
export { ReviewCard } from './ReviewCard';
export * from './types';