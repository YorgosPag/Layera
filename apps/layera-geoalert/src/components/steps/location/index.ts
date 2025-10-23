/**
 * location/index.ts - Location Step Package
 *
 * Auto-registration με semantic naming - folder name never changes
 * Dynamic ordering μέσω StepRegistry
 */

import React from 'react';
import { stepRegistry } from '../StepRegistry';
import { LocationStep } from './LocationStep';
import { LocationCard } from './LocationCard';
import { MapIcon, MarkerIcon, AddressIcon } from '../../../icons/LayeraIcons';

// 🚀 AUTO-REGISTRATION: Register this step in the registry
stepRegistry.register({
  id: 'location',
  name: 'Τοποθεσία',
  shortName: 'Περιοχή',
  component: LocationStep,
  order: 3,
  isVisible: true,
  dependencies: ['category', 'intent'], // Depends on category and intent selection
  conditions: [
    {
      type: 'custom',
      value: 'hasSelectedCategory'
    },
    {
      type: 'custom',
      value: 'hasSelectedIntent'
    }
  ],
  cards: [
    {
      id: 'map-location-card',
      component: (props) => React.createElement(LocationCard, {
        ...props,
        locationType: 'map',
        category: props.context.selectedCategory || 'property',
        title: 'Χάρτης',
        icon: React.createElement(MapIcon, { size: 'md', theme: 'neutral' }),
        onLocationSelect: (location) => {
          console.log('Map location selected:', location);
        }
      }),
      order: 1
    },
    {
      id: 'area-location-card',
      component: (props) => React.createElement(LocationCard, {
        ...props,
        locationType: 'area',
        category: props.context.selectedCategory || 'property',
        title: 'Περιοχή',
        icon: React.createElement(MarkerIcon, { size: 'md', theme: 'neutral' }),
        onLocationSelect: (location) => {
          console.log('Area location selected:', location);
        }
      }),
      order: 2
    },
    {
      id: 'address-location-card',
      component: (props) => React.createElement(LocationCard, {
        ...props,
        locationType: 'address',
        category: props.context.selectedCategory || 'property',
        title: 'Διεύθυνση',
        icon: React.createElement(AddressIcon, { size: 'md', theme: 'neutral' }),
        onLocationSelect: (location) => {
          console.log('Address location selected:', location);
        }
      }),
      order: 3
    }
  ],
  metadata: {
    isOptional: false,
    estimatedTime: 5 // 5 seconds average
  }
});

console.log('✅ Location Step registered in StepRegistry');

// 🎯 CLEAN EXPORTS
export { LocationStep } from './LocationStep';
export { LocationCard } from './LocationCard';
export * from './types';