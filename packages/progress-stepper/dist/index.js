"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LayeraProgressStepper: () => LayeraProgressStepper,
  useProgressStepper: () => useProgressStepper
});
module.exports = __toCommonJS(index_exports);

// src/components/LayeraProgressStepper.tsx
var import_material = require("@mui/material");
var import_icons_material = require("@mui/icons-material");
var import_tolgee = require("@layera/tolgee");
var import_jsx_runtime = require("react/jsx-runtime");
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
  const { t } = (0, import_tolgee.useLayeraTranslation)();
  const getStepIcon = (step, stepIndex) => {
    if (step.error) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.Error, { color: "error" });
    }
    if (step.completed || stepIndex < activeStep) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.CheckCircle, { color: "success" });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons_material.RadioButtonUnchecked, { color: "disabled" });
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
    const labelContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_material.Box, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_material.Typography,
        {
          variant: "body1",
          sx: {
            fontWeight: stepIndex === activeStep ? "bold" : "normal",
            color: step.error ? "error.main" : "inherit"
          },
          children: step.label
        }
      ),
      step.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_material.Typography,
        {
          variant: "body2",
          color: "text.secondary",
          sx: { mt: 0.5 },
          children: step.description
        }
      ),
      step.optional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_material.Typography,
        {
          variant: "caption",
          color: "text.secondary",
          sx: { fontStyle: "italic" },
          children: t("progress.stepper.optional")
        }
      )
    ] });
    if (isClickable) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.StepButton, { onClick: () => handleStepClick(stepIndex), children: labelContent });
    }
    return labelContent;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Box, { className, sx, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_material.Stepper,
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
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_material.Step, { ...stepProps, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_material.StepLabel,
            {
              StepIconComponent: () => getStepIcon(step, index),
              error: !!step.error,
              optional: step.optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Typography, { variant: "caption", children: t("progress.stepper.optional") }) : void 0,
              children: renderStepLabel(step, index)
            }
          ),
          orientation === "vertical" && step.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.StepContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_material.Typography, { variant: "body2", color: "text.secondary", children: step.description }) })
        ] }, step.id);
      })
    }
  ) });
};

// src/hooks/useProgressStepper.ts
var import_react = require("react");
var useProgressStepper = ({
  initialSteps,
  initialActiveStep = 0
}) => {
  const [steps, setSteps] = (0, import_react.useState)(initialSteps);
  const [activeStep, setActiveStep] = (0, import_react.useState)(initialActiveStep);
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const nextStep = (0, import_react.useCallback)(() => {
    if (!isLastStep) {
      setActiveStep((prev) => prev + 1);
    }
  }, [isLastStep]);
  const previousStep = (0, import_react.useCallback)(() => {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  }, [isFirstStep]);
  const goToStep = (0, import_react.useCallback)((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setActiveStep(stepIndex);
    }
  }, [steps.length]);
  const completeStep = (0, import_react.useCallback)((stepIndex, completed = true) => {
    setSteps(
      (prev) => prev.map(
        (step, index) => index === stepIndex ? { ...step, completed: !!completed, error: completed ? false : !!step.error } : step
      )
    );
  }, []);
  const setStepError = (0, import_react.useCallback)((stepIndex, error = true) => {
    setSteps(
      (prev) => prev.map(
        (step, index) => index === stepIndex ? { ...step, error: !!error, completed: error ? false : !!step.completed } : step
      )
    );
  }, []);
  const resetStepper = (0, import_react.useCallback)(() => {
    setActiveStep(initialActiveStep);
    setSteps(
      initialSteps.map((step) => ({
        ...step,
        completed: false,
        error: false
      }))
    );
  }, [initialSteps, initialActiveStep]);
  const updateStep = (0, import_react.useCallback)((stepIndex, updates) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LayeraProgressStepper,
  useProgressStepper
});
//# sourceMappingURL=index.js.map