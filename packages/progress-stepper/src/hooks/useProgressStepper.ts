import React from "react";
import { useState, useCallback } from 'react';
import { StepConfig } from '../types';

export interface UseProgressStepperProps {
  initialSteps: StepConfig[];
  initialActiveStep?: number;
}

export interface UseProgressStepperReturn {
  steps: StepConfig[];
  activeStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => React.ReactNode;
  previousStep: () => React.ReactNode;
  goToStep: (stepIndex: number) => React.ReactNode;
  completeStep: (stepIndex: number, completed?: boolean) => React.ReactNode;
  setStepError: (stepIndex: number, error?: boolean) => React.ReactNode;
  resetStepper: () => React.ReactNode;
  updateStep: (stepIndex: number, updates: Partial<StepConfig>) => React.ReactNode;
}

/**
 * useProgressStepper - Enterprise LEGO Hook
 * Purpose: State management for progress stepper workflows
 * Complexity: Medium (< 20)
 * Lines: < 150 (Enterprise Standard)
 * Dependencies: ONLY React hooks
 */
export const useProgressStepper = ({
  initialSteps,
  initialActiveStep = 0,
}: UseProgressStepperProps): UseProgressStepperReturn => {
  const [steps, setSteps] = useState<StepConfig[]>(initialSteps);
  const [activeStep, setActiveStep] = useState<number>(initialActiveStep);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setActiveStep((prev) => prev + 1);
    }
  }, [isLastStep]);

  const previousStep = useCallback(() => {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setActiveStep(stepIndex);
    }
  }, [steps.length]);

  const completeStep = useCallback((stepIndex: number, completed = true) => {
    setSteps((prev) =>
      prev.map((step, index): StepConfig =>
        index === stepIndex
          ? { ...step, completed: !!completed, error: completed ? false : !!step.error }
          : step
      )
    );
  }, []);

  const setStepError = useCallback((stepIndex: number, error = true) => {
    setSteps((prev) =>
      prev.map((step, index): StepConfig =>
        index === stepIndex
          ? { ...step, error: !!error, completed: error ? false : !!step.completed }
          : step
      )
    );
  }, []);

  const resetStepper = useCallback(() => {
    setActiveStep(initialActiveStep);
    setSteps(
      initialSteps.map((step: unknown) => ({
        ...step,
        completed: false,
        error: false,
      }))
    );
  }, [initialSteps, initialActiveStep]);

  const updateStep = useCallback((stepIndex: number, updates: Partial<StepConfig>) => {
    setSteps((prev) =>
      prev.map((step, index) =>
        index === stepIndex ? { ...step, ...updates } : step
      )
    );
  }, []);

  return {
    steps,
    activeStep,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goToStep,
    completeStep,
    setStepError,
    resetStepper,
    updateStep,
  };
};