/**
 * transactionType/index.ts - Transaction Type Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { TransactionStep } from './TransactionStep';
import { TransactionCard } from './TransactionCard';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'transactionType',
  name: 'Τύπος Συναλλαγής',
  shortName: 'Τύπος',
  component: TransactionStep,
  order: 3,
  isVisible: true,
  dependencies: ['category', 'intent'], // Depends on category and intent selection
  conditions: [
    {
      type: 'hasSelectedCategory',
      check: (context) => !!context.selectedCategory
    },
    {
      type: 'hasSelectedIntent',
      check: (context) => !!context.selectedIntent
    }
  ],
  cards: [
    {
      id: 'rent-transaction-card',
      component: (props) => React.createElement(TransactionCard, {
        ...props,
        transactionType: 'rent',
        category: props.context.selectedCategory || 'property',
        title: 'Ενοικίαση',
        icon: null, // React.createElement(RentIcon, { size: 'md', theme: 'neutral' }),
        onTransactionSelect: (transactionType) => {
        }
      }),
      order: 1,
      conditions: [
        {
          type: 'categoryIs',
          check: (context) => context.selectedCategory === 'property'
        }
      ]
    },
    {
      id: 'sale-transaction-card',
      component: (props) => React.createElement(TransactionCard, {
        ...props,
        transactionType: 'sale',
        category: props.context.selectedCategory || 'property',
        title: 'Πώληση',
        icon: null, // React.createElement(SaleIcon, { size: 'md', theme: 'neutral' }),
        onTransactionSelect: (transactionType) => {
        }
      }),
      order: 2,
      conditions: [
        {
          type: 'categoryIs',
          check: (context) => context.selectedCategory === 'property'
        }
      ]
    },
    {
      id: 'fulltime-transaction-card',
      component: (props) => React.createElement(TransactionCard, {
        ...props,
        transactionType: 'full_time',
        category: props.context.selectedCategory || 'jobs',
        title: 'Πλήρης Απασχόληση',
        icon: null, // React.createElement(FullTimeIcon, { size: 'md', theme: 'neutral' }),
        onTransactionSelect: (transactionType) => {
        }
      }),
      order: 1,
      conditions: [
        {
          type: 'categoryIs',
          check: (context) => context.selectedCategory === 'jobs'
        }
      ]
    },
    {
      id: 'parttime-transaction-card',
      component: (props) => React.createElement(TransactionCard, {
        ...props,
        transactionType: 'part_time',
        category: props.context.selectedCategory || 'jobs',
        title: 'Μερική Απασχόληση',
        icon: null, // React.createElement(PartTimeIcon, { size: 'md', theme: 'neutral' }),
        onTransactionSelect: (transactionType) => {
        }
      }),
      order: 2,
      conditions: [
        {
          type: 'categoryIs',
          check: (context) => context.selectedCategory === 'jobs'
        }
      ]
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 3 // 3 seconds average
  }
});

// 🎯 CLEAN EXPORTS
export { TransactionStep } from './TransactionStep';
export { TransactionCard } from './TransactionCard';
export * from './types';