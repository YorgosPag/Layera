import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
  StepButton,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraProgressStepperProps, StepConfig } from '../types';

/**
 * LayeraProgressStepper - Enterprise LEGO Component
 * Purpose: Centralized progress indication for complex workflows
 * Complexity: Medium (< 25)
 * Lines: < 200 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems + MUI
 */
export const LayeraProgressStepper: React.FC<LayeraProgressStepperProps> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  alternativeLabel = false,
  connector = null,
  onStepClick,
  className,
  sx = {},
}) => {
  const { t } = useLayeraTranslation();

  const getStepIcon = (step: StepConfig, stepIndex: number) => {
    if (step.error) {
      return <ErrorIcon color="error" />;
    }
    if (step.completed || stepIndex < activeStep) {
      return <CheckCircleIcon color="success" />;
    }
    return <RadioButtonUncheckedIcon color="disabled" />;
  };

  const getStepProps = (stepIndex: number, step: StepConfig) => {
    const props: Record<string, unknown> = {};

    if (step.completed || stepIndex < activeStep) {
      props.completed = true;
    }

    if (step.error) {
      props.error = true;
    }

    if (step.optional) {
      props.optional = true;
    }

    return props;
  };

  const handleStepClick = (stepIndex: number) => {
    if (onStepClick && stepIndex <= activeStep) {
      onStepClick(stepIndex);
    }
  };

  const renderStepLabel = (step: StepConfig, stepIndex: number) => {
    const isClickable = onStepClick && stepIndex <= activeStep;

    const labelContent = (
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: stepIndex === activeStep ? 'bold' : 'normal',
            color: step.error ? 'error.main' : 'inherit',
          }}
        >
          {step.label}
        </Typography>
        {step.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {step.description}
          </Typography>
        )}
        {step.optional && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            {t('progress.stepper.optional')}
          </Typography>
        )}
      </Box>
    );

    if (isClickable) {
      return (
        <StepButton onClick={() => handleStepClick(stepIndex)}>
          {labelContent}
        </StepButton>
      );
    }

    return labelContent;
  };

  return (
    <Box className={className} sx={sx}>
      <Stepper
        activeStep={activeStep}
        orientation={orientation}
        alternativeLabel={alternativeLabel}
        connector={connector ?? null}
        sx={{
          '& .MuiStepLabel-root': {
            cursor: onStepClick ? 'pointer' : 'default',
          },
          '& .MuiStepLabel-label': {
            fontSize: '0.875rem',
          },
          '& .MuiStepLabel-label.Mui-active': {
            fontWeight: 'bold',
          },
          '& .MuiStepLabel-label.Mui-error': {
            color: 'error.main',
          },
        }}
      >
        {steps.map((step, index) => {
          const stepProps = getStepProps(index, step);

          return (
            <Step key={step.id} {...stepProps}>
              <StepLabel
                StepIconComponent={() => getStepIcon(step, index)}
                error={!!step.error}
                optional={
                  step.optional ? (
                    <Typography variant="caption">
                      {t('progress.stepper.optional')}
                    </Typography>
                  ) : undefined
                }
              >
                {renderStepLabel(step, index)}
              </StepLabel>
              {orientation === 'vertical' && step.description && (
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};