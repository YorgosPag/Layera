import React$1 from 'react';

interface StepConfig {
    id: string;
    label: string;
    description?: string;
    optional?: boolean;
    completed?: boolean;
    error?: boolean;
}
interface LayeraProgressStepperProps {
    steps: StepConfig[];
    activeStep: number;
    orientation?: 'horizontal' | 'vertical';
    alternativeLabel?: boolean;
    connector?: React.ReactElement | null;
    onStepClick?: (stepIndex: number) => void;
    className?: string;
    sx?: Record<string, unknown>;
}

/**
 * LayeraProgressStepper - Enterprise LEGO Component
 * Purpose: Centralized progress indication for complex workflows
 * Complexity: Medium (< 25)
 * Lines: < 200 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems + MUI
 */
declare const LayeraProgressStepper: React$1.FC<LayeraProgressStepperProps>;

interface UseProgressStepperProps {
    initialSteps: StepConfig[];
    initialActiveStep?: number;
}
interface UseProgressStepperReturn {
    steps: StepConfig[];
    activeStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (stepIndex: number) => void;
    completeStep: (stepIndex: number, completed?: boolean) => void;
    setStepError: (stepIndex: number, error?: boolean) => void;
    resetStepper: () => void;
    updateStep: (stepIndex: number, updates: Partial<StepConfig>) => void;
}
/**
 * useProgressStepper - Enterprise LEGO Hook
 * Purpose: State management for progress stepper workflows
 * Complexity: Medium (< 20)
 * Lines: < 150 (Enterprise Standard)
 * Dependencies: ONLY React hooks
 */
declare const useProgressStepper: ({ initialSteps, initialActiveStep, }: UseProgressStepperProps) => UseProgressStepperReturn;

export { LayeraProgressStepper, type LayeraProgressStepperProps, type StepConfig, type UseProgressStepperProps, type UseProgressStepperReturn, useProgressStepper };
