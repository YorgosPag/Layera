import { createMachine, assign } from 'xstate';
import { PipelineContext, PipelineEvent } from './types';
import { isProperty, isJob, isFuture, needsLayout } from './guards';

/**
 * Enterprise XState Machine - UnifiedPipeline
 * Purpose: Type-safe state management with guards and actions
 * Complexity: Medium (< 15)
 * Lines: < 100 (Enterprise Standard)
 */

export const unifiedPipelineMachine = createMachine({
  id: 'unifiedPipeline',
  initial: 'category',
  context: {
    category: null,
    intent: null,
    transactionType: null,
    employmentType: null,
    availability: null,
    hasLocation: false,
    hasLayout: false,
    hasDetails: false
  } as PipelineContext,
  states: {
    category: {
      on: {
        SET_CATEGORY: {
          target: 'intent',
          actions: assign({ category: (_, event) => event.category })
        }
      }
    },
    intent: {
      on: {
        SET_INTENT: [
          {
            target: 'transactionType',
            guard: isProperty,
            actions: assign({ intent: (_, event) => event.intent })
          },
          {
            target: 'employmentType',
            guard: isJob,
            actions: assign({ intent: (_, event) => event.intent })
          }
        ],
        BACK: 'category'
      }
    },
    transactionType: {
      on: {
        SET_TRANSACTION_TYPE: {
          target: 'availability',
          actions: assign({ transactionType: (_, event) => event.transactionType })
        },
        BACK: 'intent'
      }
    },
    employmentType: {
      on: {
        SET_EMPLOYMENT_TYPE: {
          target: 'availability',
          actions: assign({ employmentType: (_, event) => event.employmentType })
        },
        BACK: 'intent'
      }
    },
    availability: {
      on: {
        SET_AVAILABILITY: [
          {
            target: 'location',
            guard: (context) => !isFuture(context),
            actions: assign({ availability: (_, event) => event.availability })
          },
          {
            target: 'availabilityDetails',
            guard: isFuture,
            actions: assign({ availability: (_, event) => event.availability })
          }
        ],
        BACK: [
          { target: 'transactionType', guard: isProperty },
          { target: 'employmentType', guard: isJob }
        ]
      }
    },
    availabilityDetails: {
      on: {
        SET_AVAILABILITY_DETAILS: {
          target: 'location',
          actions: assign({
            availabilityDetails: (_, event) => ({
              date: event.date,
              duration: event.duration,
              unit: event.unit
            })
          })
        },
        BACK: 'availability'
      }
    },
    location: {
      on: {
        LOCATION_READY: [
          {
            target: 'layout',
            guard: needsLayout,
            actions: assign({ hasLocation: true })
          },
          {
            target: 'details',
            actions: assign({ hasLocation: true })
          }
        ],
        BACK: [
          { target: 'availabilityDetails', guard: isFuture },
          { target: 'availability' }
        ]
      }
    },
    layout: {
      on: {
        LAYOUT_READY: {
          target: 'details',
          actions: assign({ hasLayout: true })
        },
        BACK: 'location'
      }
    },
    details: {
      on: {
        DETAILS_READY: {
          target: 'complete',
          actions: assign({ hasDetails: true })
        },
        BACK: [
          { target: 'layout', guard: needsLayout },
          { target: 'location' }
        ]
      }
    },
    complete: {
      on: {
        RESET: {
          target: 'category',
          actions: assign({
            category: null,
            intent: null,
            transactionType: null,
            employmentType: null,
            availability: null,
            availabilityDetails: undefined,
            hasLocation: false,
            hasLayout: false,
            hasDetails: false
          })
        }
      }
    }
  }
});