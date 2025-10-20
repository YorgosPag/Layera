"use client";

// src/components/LayeraProgressStepper.tsx
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
  StepButton
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from "@mui/icons-material";
import { useLayeraTranslation } from "@layera/tolgee";
import { jsx, jsxs } from "react/jsx-runtime";
var LayeraProgressStepper = ({
  steps,
  activeStep,
  orientation = "horizontal",
  alternativeLabel = false,
  connector = null,
  onStepClick,
  className,
  sx = {}
}) => {
  const { t } = useLayeraTranslation();
  const getStepIcon = (step, stepIndex) => {
    if (step.error) {
      return /* @__PURE__ */ jsx(ErrorIcon, { color: "error" });
    }
    if (step.completed || stepIndex < activeStep) {
      return /* @__PURE__ */ jsx(CheckCircleIcon, { color: "success" });
    }
    return /* @__PURE__ */ jsx(RadioButtonUncheckedIcon, { color: "disabled" });
  };
  const getStepProps = (stepIndex, step) => {
    const props = {};
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
  const handleStepClick = (stepIndex) => {
    if (onStepClick && stepIndex <= activeStep) {
      onStepClick(stepIndex);
    }
  };
  const renderStepLabel = (step, stepIndex) => {
    const isClickable = onStepClick && stepIndex <= activeStep;
    const labelContent = /* @__PURE__ */ jsxs(Box, { children: [
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "body1",
          sx: {
            fontWeight: stepIndex === activeStep ? "bold" : "normal",
            color: step.error ? "error.main" : "inherit"
          },
          children: step.label
        }
      ),
      step.description && /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "body2",
          color: "text.secondary",
          sx: { mt: 0.5 },
          children: step.description
        }
      ),
      step.optional && /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "caption",
          color: "text.secondary",
          sx: { fontStyle: "italic" },
          children: t("progress.stepper.optional")
        }
      )
    ] });
    if (isClickable) {
      return /* @__PURE__ */ jsx(StepButton, { onClick: () => handleStepClick(stepIndex), children: labelContent });
    }
    return labelContent;
  };
  return /* @__PURE__ */ jsx(Box, { className, sx, children: /* @__PURE__ */ jsx(
    Stepper,
    {
      activeStep,
      orientation,
      alternativeLabel,
      connector: connector ?? null,
      sx: {
        "& .MuiStepLabel-root": {
          cursor: onStepClick ? "pointer" : "default"
        },
        "& .MuiStepLabel-label": {
          fontSize: "0.875rem"
        },
        "& .MuiStepLabel-label.Mui-active": {
          fontWeight: "bold"
        },
        "& .MuiStepLabel-label.Mui-error": {
          color: "error.main"
        }
      },
      children: steps.map((step, index) => {
        const stepProps = getStepProps(index, step);
        return /* @__PURE__ */ jsxs(Step, { ...stepProps, children: [
          /* @__PURE__ */ jsx(
            StepLabel,
            {
              StepIconComponent: () => getStepIcon(step, index),
              error: !!step.error,
              optional: step.optional ? /* @__PURE__ */ jsx(Typography, { variant: "caption", children: t("progress.stepper.optional") }) : void 0,
              children: renderStepLabel(step, index)
            }
          ),
          orientation === "vertical" && step.description && /* @__PURE__ */ jsx(StepContent, { children: /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: step.description }) })
        ] }, step.id);
      })
    }
  ) });
};

// src/hooks/useProgressStepper.ts
import { useState, useCallback } from "react";
var useProgressStepper = ({
  initialSteps,
  initialActiveStep = 0
}) => {
  const [steps, setSteps] = useState(initialSteps);
  const [activeStep, setActiveStep] = useState(initialActiveStep);
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
  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setActiveStep(stepIndex);
    }
  }, [steps.length]);
  const completeStep = useCallback((stepIndex, completed = true) => {
    setSteps(
      (prev) => prev.map(
        (step, index) => index === stepIndex ? { ...step, completed: !!completed, error: completed ? false : !!step.error } : step
      )
    );
  }, []);
  const setStepError = useCallback((stepIndex, error = true) => {
    setSteps(
      (prev) => prev.map(
        (step, index) => index === stepIndex ? { ...step, error: !!error, completed: error ? false : !!step.completed } : step
      )
    );
  }, []);
  const resetStepper = useCallback(() => {
    setActiveStep(initialActiveStep);
    setSteps(
      initialSteps.map((step) => ({
        ...step,
        completed: false,
        error: false
      }))
    );
  }, [initialSteps, initialActiveStep]);
  const updateStep = useCallback((stepIndex, updates) => {
    setSteps(
      (prev) => prev.map(
        (step, index) => index === stepIndex ? { ...step, ...updates } : step
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
    updateStep
  };
};
export {
  LayeraProgressStepper,
  useProgressStepper
};
//# sourceMappingURL=index.mjs.map