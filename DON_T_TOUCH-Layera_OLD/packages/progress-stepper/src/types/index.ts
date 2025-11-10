export interface StepConfig {
  id: string;
  label: string;
  description?: string;
  optional?: boolean;
  completed?: boolean;
  error?: boolean;
}

export interface LayeraProgressStepperProps {
  steps: StepConfig[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  alternativeLabel?: boolean;
  connector?: React.ReactElement | null;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  sx?: Record<string, unknown>;
}