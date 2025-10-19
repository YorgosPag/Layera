/**
 * @layera/pipelines - Enterprise State Management Hook
 * Purpose: Clean state, actions, guards για UnifiedPipelineModal
 * Architecture: useReducer με functional updates - ΟΧΙ setState spreads
 */

import { useReducer, useCallback, useEffect } from 'react';
import type { PipelineEvent, PipelineContext } from '../state/types';
import type { Category, Intent, TransactionType, EmploymentType, Availability } from '../../../domain/unified/types';

interface UseUnifiedPipelineOptions {
  onSubmit: (data: any) => Promise<void>;
  onClose?: () => void;
}

type PipelineStep = 'category' | 'intent' | 'transactionType' | 'employmentType' | 'availability' | 'availabilityDetails' | 'location' | 'layout' | 'details' | 'complete';

interface PipelineState extends PipelineContext {
  step: PipelineStep;
  isSubmitting: boolean;
  error: string | null;
}

// Pure reducer με functional updates
function pipelineReducer(state: PipelineState, event: PipelineEvent): PipelineState {
  switch (event.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: event.category,
        step: 'intent',
        // Reset dependent state
        intent: null,
        transactionType: null,
        employmentType: null,
        availability: null,
        availabilityDetails: undefined
      };

    case 'SET_INTENT': {
      const nextStep: PipelineStep = state.category === 'property' ? 'transactionType' : 'employmentType';
      return {
        ...state,
        intent: event.intent,
        step: nextStep,
        // Reset dependent state
        transactionType: null,
        employmentType: null,
        availability: null,
        availabilityDetails: undefined
      };
    }

    case 'SET_TRANSACTION_TYPE':
      return {
        ...state,
        transactionType: event.transactionType,
        step: 'availability',
        availability: null,
        availabilityDetails: undefined
      };

    case 'SET_EMPLOYMENT_TYPE':
      return {
        ...state,
        employmentType: event.employmentType,
        step: 'availability',
        availability: null,
        availabilityDetails: undefined
      };

    case 'SET_AVAILABILITY': {
      // Business logic για conditional steps
      const needsAvailabilityDetails = event.availability === 'future' &&
        ((state.category === 'property' && state.intent === 'offer') || state.category === 'job');

      const nextStep: PipelineStep = needsAvailabilityDetails ? 'availabilityDetails' : 'location';

      return {
        ...state,
        availability: event.availability,
        step: nextStep,
        availabilityDetails: needsAvailabilityDetails ? state.availabilityDetails : undefined
      };
    }

    case 'SET_AVAILABILITY_DETAILS':
      return {
        ...state,
        availabilityDetails: {
          date: event.date,
          duration: event.duration,
          unit: event.unit
        }
      };

    case 'LOCATION_READY': {
      // Complex navigation logic από το original
      let nextStep: PipelineStep;

      if (state.category === 'property' && state.intent === 'offer' && state.availability === 'now') {
        nextStep = 'layout';
      } else if (state.category === 'job' && state.intent === 'search') {
        nextStep = 'complete';
      } else {
        nextStep = 'details';
      }

      return {
        ...state,
        step: nextStep,
        hasLocation: true
      };
    }

    case 'LAYOUT_READY':
      return {
        ...state,
        step: 'details',
        hasLayout: true
      };

    case 'DETAILS_READY':
      return {
        ...state,
        step: 'complete',
        hasDetails: true,
        isSubmitting: false
      };

    case 'BACK': {
      // Pure navigation logic
      switch (state.step) {
        case 'intent':
          return { ...state, step: 'category', intent: null };

        case 'transactionType':
          return { ...state, step: 'intent', transactionType: null };

        case 'employmentType':
          return { ...state, step: 'intent', employmentType: null };

        case 'availability': {
          const prevStep: PipelineStep = state.category === 'job' ? 'employmentType' : 'transactionType';
          return { ...state, step: prevStep, availability: null };
        }

        case 'availabilityDetails':
          return {
            ...state,
            step: 'availability',
            availabilityDetails: undefined
          };

        case 'location': {
          const locationPrevStep: PipelineStep =
            (state.availability === 'future' &&
             ((state.category === 'property' && state.intent === 'offer') || state.category === 'job'))
              ? 'availabilityDetails'
              : 'availability';
          return { ...state, step: locationPrevStep };
        }

        case 'layout':
          return { ...state, step: 'location' };

        case 'details': {
          const detailsPrevStep: PipelineStep =
            (state.category === 'property' && state.intent === 'offer' && state.availability === 'now')
              ? 'layout'
              : 'location';
          return { ...state, step: detailsPrevStep };
        }

        default:
          return state;
      }
    }

    case 'RESET':
      return getInitialState();

    default:
      return state;
  }
}

// Pure initial state factory
function getInitialState(): PipelineState {
  return {
    step: 'category',
    category: null,
    intent: null,
    transactionType: null,
    employmentType: null,
    availability: null,
    availabilityDetails: undefined,
    hasLocation: false,
    hasLayout: false,
    hasDetails: false,
    isSubmitting: false,
    error: null
  };
}

/**
 * Enterprise State Management Hook
 * Returns: { state, actions, can }
 */
export function useUnifiedPipeline({ onSubmit, onClose }: UseUnifiedPipelineOptions) {
  const [state, dispatch] = useReducer(pipelineReducer, getInitialState());

  // Pure action creators
  const actions = {
    setCategory: useCallback((category: Category) => {
      dispatch({ type: 'SET_CATEGORY', category });
    }, []),

    setIntent: useCallback((intent: Intent) => {
      dispatch({ type: 'SET_INTENT', intent });
    }, []),

    setTransactionType: useCallback((transactionType: TransactionType) => {
      dispatch({ type: 'SET_TRANSACTION_TYPE', transactionType });
    }, []),

    setEmploymentType: useCallback((employmentType: EmploymentType) => {
      dispatch({ type: 'SET_EMPLOYMENT_TYPE', employmentType });
    }, []),

    setAvailability: useCallback((availability: Availability) => {
      dispatch({ type: 'SET_AVAILABILITY', availability });
    }, []),

    setAvailabilityDetails: useCallback((date: string, duration: number, unit: 'months' | 'years') => {
      dispatch({ type: 'SET_AVAILABILITY_DETAILS', date, duration, unit });
    }, []),

    locationReady: useCallback(() => {
      dispatch({ type: 'LOCATION_READY' });
    }, []),

    layoutReady: useCallback(() => {
      dispatch({ type: 'LAYOUT_READY' });
    }, []),

    detailsReady: useCallback(async () => {
      try {
        await onSubmit({
          category: state.category,
          intent: state.intent,
          transactionType: state.transactionType,
          employmentType: state.employmentType,
          availability: state.availability,
          availabilityDetails: state.availabilityDetails
        });
        dispatch({ type: 'DETAILS_READY' });
      } catch (error) {
        console.error('Pipeline submission failed:', error);
      }
    }, [onSubmit, state]),

    back: useCallback(() => {
      dispatch({ type: 'BACK' });
    }, []),

    reset: useCallback(() => {
      dispatch({ type: 'RESET' });
      onClose?.();
    }, [onClose])
  };

  // Guard functions για conditional rendering
  const can = {
    goBack: state.step !== 'category' && state.step !== 'complete',
    submit: state.step === 'details' && !state.isSubmitting,
    showAvailabilityDetails: state.step === 'availabilityDetails',
    showLayout: state.step === 'layout'
  };

  // Telemetry - Enterprise requirement
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pipeline_step_viewed', {
        step: state.step,
        category: state.category,
        intent: state.intent
      });
    }
  }, [state.step, state.category, state.intent]);

  return {
    state,
    actions,
    can
  };
}