"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// ../geo-mapping/src/services/fallbackBoundaries.ts
var fallbackBoundaries_exports = {};
__export(fallbackBoundaries_exports, {
  addFallbackBoundary: () => addFallbackBoundary,
  clearFallbackBoundaries: () => clearFallbackBoundaries,
  findFallbackBoundary: () => findFallbackBoundary,
  getAllFallbackBoundaries: () => getAllFallbackBoundaries
});
var FALLBACK_BOUNDARIES, findFallbackBoundary, addFallbackBoundary, getAllFallbackBoundaries, clearFallbackBoundaries;
var init_fallbackBoundaries = __esm({
  "../geo-mapping/src/services/fallbackBoundaries.ts"() {
    "use strict";
    FALLBACK_BOUNDARIES = [
      // Θεσσαλονίκη - Κέντρο
      {
        keys: ["\u0398\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7\u03C2", "Thessaloniki", "\u0398\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7"],
        name: "\u0394\u03AE\u03BC\u03BF\u03C2 \u0398\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7\u03C2",
        adminLevel: "8",
        coordinates: [
          // Simplified boundary για demo - στην πράξη θα χρειάζεται πλήρες polygon
          [22.9352, 40.6401],
          [22.96, 40.6401],
          [22.96, 40.625],
          [22.9352, 40.625],
          [22.9352, 40.6401]
        ]
      },
      // Μακεδονία regions
      {
        keys: ["\u039A\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03AE\u03C2 \u039C\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1\u03C2", "Central Macedonia", "\u039A\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03AE \u039C\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1"],
        name: "\u03A0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1 \u039A\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03AE\u03C2 \u039C\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1\u03C2",
        adminLevel: "4",
        coordinates: [
          // Simplified boundary για demo
          [22, 41.5],
          [24.5, 41.5],
          [24.5, 40],
          [22, 40],
          [22, 41.5]
        ]
      },
      // Αμπελόκηποι (existing)
      {
        keys: ["\u0391\u03BC\u03C0\u03B5\u03BB\u03BF\u03BA\u03AE\u03C0\u03C9\u03BD", "Ampelokipon", "\u0410\u043C\u043F\u0435\u043B\u043E\u043A\u0438\u043F\u043E\u043D", "\u0391\u03BC\u03C0\u03B5\u03BB\u03CC\u03BA\u03B7\u03C0\u03BF\u03B9"],
        name: "\u0394\u03B7\u03BC\u03BF\u03C4\u03B9\u03BA\u03AE \u0395\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1 \u0391\u03BC\u03C0\u03B5\u03BB\u03BF\u03BA\u03AE\u03C0\u03C9\u03BD",
        adminLevel: "8",
        coordinates: [
          [22.9166013, 40.6545235],
          [22.916378, 40.6548432],
          [22.9161263, 40.654913],
          [22.9159367, 40.6551479],
          [22.9157414, 40.6553883],
          [22.9155318, 40.655694],
          [22.9155987, 40.6558613],
          [22.9154793, 40.6562918],
          [22.915702, 40.6565594],
          [22.9150123, 40.6571562],
          [22.914356, 40.6575815],
          [22.9141897, 40.6577716],
          [22.913965, 40.6580476],
          [22.9137682, 40.6584715],
          [22.9130735, 40.6595013],
          [22.9146819, 40.6606645],
          [22.9195995, 40.6611276],
          [22.922064, 40.6603006],
          [22.9243559, 40.6589395],
          [22.928998, 40.6570252],
          [22.9316767, 40.6565356],
          [22.934234, 40.6567998],
          [22.9345673, 40.6568327],
          [22.9344419, 40.6563954],
          [22.9345299, 40.6555972],
          [22.9346904, 40.654914],
          [22.9352047, 40.6527174],
          [22.9342228, 40.6523744],
          [22.9341515, 40.651373],
          [22.9341167, 40.6510887],
          [22.9340592, 40.6505896],
          [22.9339901, 40.6498829],
          [22.9340715, 40.6493217],
          [22.9339464, 40.6484215],
          [22.9326998, 40.6484637],
          [22.931444, 40.6490899],
          [22.9313272, 40.6491772],
          [22.9303401, 40.6495824],
          [22.929558, 40.6496515],
          [22.9280302, 40.6497943],
          [22.9267611, 40.6494903],
          [22.9256199, 40.6492281],
          [22.9243866, 40.6489393],
          [22.9239727, 40.6488403],
          [22.9195478, 40.6508989],
          [22.919069, 40.6511528],
          [22.9186956, 40.651313],
          [22.9184825, 40.6514636],
          [22.9183194, 40.6516322],
          [22.9181684, 40.6518332],
          [22.9180779, 40.6520084],
          [22.9180263, 40.6522166],
          [22.9179568, 40.6523848],
          [22.9178432, 40.6525894],
          [22.9171589, 40.6536558],
          [22.9166013, 40.6545235]
        ]
      }
    ];
    findFallbackBoundary = (searchTerms) => {
      const normalizedSearchTerms = searchTerms.filter((term) => term && typeof term === "string").map((term) => term.toLowerCase().trim());
      for (const boundary of FALLBACK_BOUNDARIES) {
        const matches = boundary.keys.some((key) => {
          const normalizedKey = key.toLowerCase();
          return normalizedSearchTerms.some(
            (searchTerm) => searchTerm.includes(normalizedKey) || normalizedKey.includes(searchTerm)
          );
        });
        if (matches) {
          console.log(`\u2705 Fallback boundary found \u03B3\u03B9\u03B1: ${boundary.name}`);
          return {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              properties: {
                name: boundary.name,
                admin_level: boundary.adminLevel,
                boundary: "administrative"
              },
              geometry: {
                type: "Polygon",
                coordinates: [boundary.coordinates]
              }
            }]
          };
        }
      }
      return null;
    };
    addFallbackBoundary = (boundary) => {
      const exists = FALLBACK_BOUNDARIES.some(
        (b) => b.keys.some((key) => boundary.keys.includes(key))
      );
      if (!exists) {
        FALLBACK_BOUNDARIES.push(boundary);
        console.log(`\u{1F4CD} Added fallback boundary: ${boundary.name}`);
      }
    };
    getAllFallbackBoundaries = () => {
      return FALLBACK_BOUNDARIES;
    };
    clearFallbackBoundaries = () => {
      FALLBACK_BOUNDARIES.length = 0;
    };
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AvailabilityDetailsStep: () => AvailabilityDetailsStep,
  AvailabilityStep: () => AvailabilityStep,
  CategoryStep: () => CategoryStep,
  CompleteStep: () => CompleteStep,
  DetailsStep: () => DetailsStep,
  EmploymentTypeStep: () => EmploymentTypeStep,
  IntentStep: () => IntentStep,
  LAYERA_PIPELINES_VERSION: () => LAYERA_PIPELINES_VERSION,
  LayoutStep: () => LayoutStep,
  LocationStep: () => LocationStep,
  TransactionTypeStep: () => TransactionTypeStep,
  UnifiedPipelineContent: () => UnifiedPipelineContent,
  UnifiedPipelineModal: () => UnifiedPipelineModal,
  createStepperConfig: () => createStepperConfig,
  getStepIndex: () => getStepIndex,
  updateStepCompletion: () => updateStepCompletion,
  useIsDeviceSimulation: () => useIsDeviceSimulation,
  useMediaQuery: () => useMediaQuery,
  useModalContainer: () => useModalContainer,
  useUnifiedPipeline: () => useUnifiedPipeline
});
module.exports = __toCommonJS(index_exports);

// unified/UnifiedPipelineModal.tsx
var import_react10 = require("react");
var import_modals = require("@layera/modals");
var import_layout11 = require("@layera/layout");
var import_buttons10 = require("@layera/buttons");
var import_forms9 = require("@layera/forms");
var import_typography11 = require("@layera/typography");
var import_progress_stepper = require("@layera/progress-stepper");

// unified/hooks/useModalContainer.ts
var import_react = require("react");
function useModalContainer(options = {}) {
  const { preferredId = "layera-device-simulator-viewport", fallbackId = "root" } = options;
  const [containerFn, setContainerFn] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const getContainer = () => {
      if (preferredId) {
        const preferred = document.getElementById(preferredId);
        if (preferred) return preferred;
      }
      if (fallbackId) {
        const fallback = document.getElementById(fallbackId);
        if (fallback) return fallback;
      }
      return document.body;
    };
    setContainerFn(() => getContainer);
  }, [preferredId, fallbackId]);
  return containerFn;
}
function useIsDeviceSimulation() {
  const [isDeviceMode, setIsDeviceMode] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const deviceViewport = document.getElementById("layera-device-simulator-viewport");
    setIsDeviceMode(!!deviceViewport);
  }, []);
  return isDeviceMode;
}

// unified/hooks/useUnifiedPipeline.ts
var import_react2 = require("react");
function pipelineReducer(state, event) {
  switch (event.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: event.category,
        step: "intent",
        // Reset dependent state
        intent: null,
        transactionType: null,
        employmentType: null,
        availability: null,
        availabilityDetails: void 0
      };
    case "SET_INTENT": {
      const nextStep = state.category === "property" ? "transactionType" : "employmentType";
      return {
        ...state,
        intent: event.intent,
        step: nextStep,
        // Reset dependent state
        transactionType: null,
        employmentType: null,
        availability: null,
        availabilityDetails: void 0
      };
    }
    case "SET_TRANSACTION_TYPE":
      return {
        ...state,
        transactionType: event.transactionType,
        step: "availability",
        availability: null,
        availabilityDetails: void 0
      };
    case "SET_EMPLOYMENT_TYPE":
      return {
        ...state,
        employmentType: event.employmentType,
        step: "availability",
        availability: null,
        availabilityDetails: void 0
      };
    case "SET_AVAILABILITY": {
      const needsAvailabilityDetails = event.availability === "future" && (state.category === "property" && state.intent === "offer" || state.category === "job");
      const nextStep = needsAvailabilityDetails ? "availabilityDetails" : "location";
      return {
        ...state,
        availability: event.availability,
        step: nextStep,
        availabilityDetails: needsAvailabilityDetails ? state.availabilityDetails : void 0
      };
    }
    case "SET_AVAILABILITY_DETAILS":
      return {
        ...state,
        availabilityDetails: {
          date: event.date,
          duration: event.duration,
          unit: event.unit
        }
      };
    case "LOCATION_READY": {
      let nextStep;
      if (state.category === "property" && state.intent === "offer" && state.availability === "now") {
        nextStep = "layout";
      } else if (state.category === "job" && state.intent === "search") {
        nextStep = "complete";
      } else {
        nextStep = "details";
      }
      return {
        ...state,
        step: nextStep,
        hasLocation: true
      };
    }
    case "LAYOUT_READY":
      return {
        ...state,
        step: "details",
        hasLayout: true
      };
    case "DETAILS_READY":
      return {
        ...state,
        step: "complete",
        hasDetails: true,
        isSubmitting: false
      };
    case "BACK": {
      switch (state.step) {
        case "intent":
          return { ...state, step: "category", intent: null };
        case "transactionType":
          return { ...state, step: "intent", transactionType: null };
        case "employmentType":
          return { ...state, step: "intent", employmentType: null };
        case "availability": {
          const prevStep = state.category === "job" ? "employmentType" : "transactionType";
          return { ...state, step: prevStep, availability: null };
        }
        case "availabilityDetails":
          return {
            ...state,
            step: "availability",
            availabilityDetails: void 0
          };
        case "location": {
          const locationPrevStep = state.availability === "future" && (state.category === "property" && state.intent === "offer" || state.category === "job") ? "availabilityDetails" : "availability";
          return { ...state, step: locationPrevStep };
        }
        case "layout":
          return { ...state, step: "location" };
        case "details": {
          const detailsPrevStep = state.category === "property" && state.intent === "offer" && state.availability === "now" ? "layout" : "location";
          return { ...state, step: detailsPrevStep };
        }
        default:
          return state;
      }
    }
    case "RESET":
      return getInitialState();
    default:
      return state;
  }
}
function getInitialState() {
  return {
    step: "category",
    category: null,
    intent: null,
    transactionType: null,
    employmentType: null,
    availability: null,
    availabilityDetails: void 0,
    hasLocation: false,
    hasLayout: false,
    hasDetails: false,
    isSubmitting: false,
    error: null
  };
}
function useUnifiedPipeline({ onSubmit, onClose }) {
  const [state, dispatch] = (0, import_react2.useReducer)(pipelineReducer, getInitialState());
  const actions = {
    setCategory: (0, import_react2.useCallback)((category) => {
      dispatch({ type: "SET_CATEGORY", category });
    }, []),
    setIntent: (0, import_react2.useCallback)((intent) => {
      dispatch({ type: "SET_INTENT", intent });
    }, []),
    setTransactionType: (0, import_react2.useCallback)((transactionType) => {
      dispatch({ type: "SET_TRANSACTION_TYPE", transactionType });
    }, []),
    setEmploymentType: (0, import_react2.useCallback)((employmentType) => {
      dispatch({ type: "SET_EMPLOYMENT_TYPE", employmentType });
    }, []),
    setAvailability: (0, import_react2.useCallback)((availability) => {
      dispatch({ type: "SET_AVAILABILITY", availability });
    }, []),
    setAvailabilityDetails: (0, import_react2.useCallback)((date, duration, unit) => {
      dispatch({ type: "SET_AVAILABILITY_DETAILS", date, duration, unit });
    }, []),
    locationReady: (0, import_react2.useCallback)(() => {
      dispatch({ type: "LOCATION_READY" });
    }, []),
    layoutReady: (0, import_react2.useCallback)(() => {
      dispatch({ type: "LAYOUT_READY" });
    }, []),
    detailsReady: (0, import_react2.useCallback)(async () => {
      try {
        await onSubmit({
          category: state.category,
          intent: state.intent,
          transactionType: state.transactionType,
          employmentType: state.employmentType,
          availability: state.availability,
          availabilityDetails: state.availabilityDetails
        });
        dispatch({ type: "DETAILS_READY" });
      } catch (error) {
        console.error("Pipeline submission failed:", error);
      }
    }, [onSubmit, state]),
    back: (0, import_react2.useCallback)(() => {
      dispatch({ type: "BACK" });
    }, []),
    reset: (0, import_react2.useCallback)(() => {
      dispatch({ type: "RESET" });
      onClose?.();
    }, [onClose])
  };
  const can = {
    goBack: state.step !== "category" && state.step !== "complete",
    submit: state.step === "details" && !state.isSubmitting,
    showAvailabilityDetails: state.step === "availabilityDetails",
    showLayout: state.step === "layout"
  };
  (0, import_react2.useEffect)(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "pipeline_step_viewed", {
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

// unified/UnifiedPipelineModal.tsx
var import_tolgee10 = require("@layera/tolgee");

// unified/hooks/useMediaQuery.ts
var import_react3 = require("react");
var useMediaQuery = (query) => {
  const [matches, setMatches] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

// unified/utils/stepperConfig.ts
var createStepperConfig = (category, t) => {
  const smartTranslate = (key, fallback) => {
    if (!t) return fallback;
    const translated = t(key);
    return translated === key ? fallback : translated;
  };
  const baseSteps = [
    {
      id: "category",
      label: smartTranslate("progress.stepper.labels.category", "\u039A\u03B1\u03C4\u03B7\u03B3\u03BF\u03C1\u03AF\u03B1"),
      description: smartTranslate("progress.stepper.descriptions.category", "\u03A4\u03CD\u03C0\u03BF\u03C2")
    },
    {
      id: "intent",
      label: t ? t("progress.stepper.labels.intent") : "\u03A3\u03BA\u03BF\u03C0\u03CC\u03C2",
      description: t ? t("progress.stepper.descriptions.intent") : "\u0394\u03C1\u03AC\u03C3\u03B7"
    }
  ];
  if (category === "property") {
    return [
      ...baseSteps,
      {
        id: "transactionType",
        label: t ? t("progress.stepper.labels.transactionType") : "\u03A3\u03C5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE",
        description: t ? t("progress.stepper.descriptions.transactionType") : "\u03A4\u03CD\u03C0\u03BF\u03C2"
      },
      {
        id: "location",
        label: t ? t("progress.stepper.labels.location") : "\u03A4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1",
        description: t ? t("progress.stepper.descriptions.location") : "\u03A7\u03AC\u03C1\u03C4\u03B7\u03C2"
      },
      {
        id: "layout",
        label: t ? t("progress.stepper.labels.layout") : "\u039A\u03AC\u03C4\u03BF\u03C8\u03B7",
        description: t ? t("progress.stepper.descriptions.layout") : "\u0394\u03B9\u03AC\u03C4\u03B1\u03BE\u03B7",
        optional: true
      },
      {
        id: "details",
        label: t ? t("progress.stepper.labels.details") : "\u03A3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1",
        description: t ? t("progress.stepper.descriptions.details") : "\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE"
      },
      {
        id: "complete",
        label: t ? t("progress.stepper.labels.complete") : "\u03A4\u03AD\u03BB\u03BF\u03C2",
        description: t ? t("progress.stepper.descriptions.complete") : "\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7"
      }
    ];
  }
  if (category === "job") {
    return [
      ...baseSteps,
      {
        id: "employmentType",
        label: t ? t("progress.stepper.labels.employmentType") : "\u0395\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1",
        description: t ? t("progress.stepper.descriptions.employmentType") : "\u03A4\u03CD\u03C0\u03BF\u03C2"
      },
      {
        id: "availability",
        label: t ? t("progress.stepper.labels.availability") : "\u0394\u03B9\u03B1\u03B8\u03B5\u03C3\u03B9\u03BC\u03CC\u03C4\u03B7\u03C4\u03B1",
        description: t ? t("progress.stepper.descriptions.availability") : "\u03A0\u03CC\u03C4\u03B5"
      },
      {
        id: "availabilityDetails",
        label: t ? t("progress.stepper.labels.availabilityDetails") : "\u039B\u03B5\u03C0\u03C4\u03BF\u03BC\u03AD\u03C1\u03B5\u03B9\u03B5\u03C2",
        description: t ? t("progress.stepper.descriptions.availabilityDetails") : "\u0397\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B5\u03C2"
      },
      {
        id: "location",
        label: t ? t("progress.stepper.labels.location") : "\u03A4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C3\u03AF\u03B1",
        description: t ? t("progress.stepper.descriptions.location") : "\u03A0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AE"
      },
      {
        id: "details",
        label: t ? t("progress.stepper.labels.details") : "\u03A3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1",
        description: t ? t("progress.stepper.descriptions.details") : "\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE"
      },
      {
        id: "complete",
        label: t ? t("progress.stepper.labels.complete") : "\u03A4\u03AD\u03BB\u03BF\u03C2",
        description: t ? t("progress.stepper.descriptions.complete") : "\u0395\u03C0\u03B9\u03B2\u03B5\u03B2\u03B1\u03AF\u03C9\u03C3\u03B7"
      }
    ];
  }
  return baseSteps;
};
var getStepIndex = (currentStep, steps) => {
  return steps.findIndex((step) => step.id === currentStep);
};
var updateStepCompletion = (steps, completedSteps) => {
  return steps.map((step) => ({
    ...step,
    completed: completedSteps.includes(step.id)
  }));
};

// unified/steps/CategoryStep.tsx
var import_cards = require("@layera/cards");
var import_typography = require("@layera/typography");
var import_layout = require("@layera/layout");
var import_icons = require("@layera/icons");
var import_tolgee = require("@layera/tolgee");
var import_jsx_runtime = require("react/jsx-runtime");
var CategoryStep = ({ onNext }) => {
  const { t } = (0, import_tolgee.useLayeraTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Stack, { spacing: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Heading, { as: "h3", size: "lg", color: "primary", children: t("pipeline.category.selection.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_cards.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("property"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.VillaIcon, { size: "xl", theme: "primary" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipeline.category.property.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_typography.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipeline.category.property.description")
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_cards.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("job"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.BriefcaseIcon, { size: "xl", theme: "success" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_layout.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipeline.category.job.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_typography.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipeline.category.job.description")
                }
              )
            ] })
          ] })
        }
      )
    ] })
  ] });
};

// unified/steps/IntentStep.tsx
var import_cards2 = require("@layera/cards");
var import_typography2 = require("@layera/typography");
var import_layout2 = require("@layera/layout");
var import_buttons = require("@layera/buttons");
var import_forms = require("@layera/forms");
var import_icons2 = require("@layera/icons");
var import_tolgee2 = require("@layera/tolgee");
var import_jsx_runtime2 = require("react/jsx-runtime");
var IntentStep = ({ category, onNext, onBack }) => {
  const { t } = (0, import_tolgee2.useLayeraTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_layout2.Stack, { spacing: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Heading, { as: "h3", size: "lg", color: "primary", children: t("pipeline.intent.selection.title", {
      category: category === "property" ? t("pipeline.category.property.title") : t("pipeline.category.job.title")
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_layout2.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_cards2.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("offer"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_layout2.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.IndustrialIcon, { size: "xl", theme: "info" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_layout2.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "xl", weight: "bold", className: "card-title", children: t(`pipeline.intent.offer.${category}.title`) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_typography2.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t(`pipeline.intent.offer.${category}.description`)
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_cards2.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("search"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_layout2.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.RestaurantIcon, { size: "xl", theme: "warning" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_layout2.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "xl", weight: "bold", className: "card-title", children: t(`pipeline.intent.search.${category}.title`) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_typography2.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t(`pipeline.intent.search.${category}.description`)
                }
              )
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_forms.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_buttons.Button,
      {
        variant: "outline",
        size: "lg",
        onClick: onBack,
        className: "layera-pipeline-button-secondary",
        children: t("pipelines.actions.back")
      }
    ) })
  ] });
};

// unified/steps/TransactionTypeStep.tsx
var import_cards3 = require("@layera/cards");
var import_typography3 = require("@layera/typography");
var import_layout3 = require("@layera/layout");
var import_buttons2 = require("@layera/buttons");
var import_forms2 = require("@layera/forms");
var import_icons3 = require("@layera/icons");
var import_tolgee3 = require("@layera/tolgee");
var import_jsx_runtime3 = require("react/jsx-runtime");
var TransactionTypeStep = ({ onNext, onBack }) => {
  const { t } = (0, import_tolgee3.useLayeraTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_layout3.Stack, { spacing: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography3.Heading, { as: "h3", size: "lg", color: "primary", children: t("pipelines.steps.transaction.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_layout3.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_cards3.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("sale"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_layout3.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.CommercialIcon, { size: "xl", theme: "success" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_layout3.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography3.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.transaction.sale.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                import_typography3.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipelines.steps.transaction.sale.description")
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_cards3.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("rent"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_layout3.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.BuildingIcon, { size: "xl", theme: "neutral" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_layout3.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography3.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.transaction.rent.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                import_typography3.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipelines.steps.transaction.rent.description")
                }
              )
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_forms2.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_buttons2.Button,
      {
        variant: "outline",
        onClick: onBack,
        className: "layera-unified-button",
        children: t("pipelines.actions.back")
      }
    ) })
  ] });
};

// unified/steps/EmploymentTypeStep.tsx
var import_cards4 = require("@layera/cards");
var import_typography4 = require("@layera/typography");
var import_layout4 = require("@layera/layout");
var import_buttons3 = require("@layera/buttons");
var import_forms3 = require("@layera/forms");
var import_icons4 = require("@layera/icons");
var import_tolgee4 = require("@layera/tolgee");
var import_jsx_runtime4 = require("react/jsx-runtime");
var EmploymentTypeStep = ({ onNext, onBack }) => {
  const { t } = (0, import_tolgee4.useLayeraTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Stack, { spacing: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Heading, { as: "h3", size: "lg", color: "primary", children: t("pipelines.steps.employmentType.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_cards4.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("full_time"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.ToolIcon, { size: "xl", theme: "primary" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.employmentType.fullTime.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_typography4.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipelines.steps.employmentType.fullTime.description")
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_cards4.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("part_time"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.HospitalIcon, { size: "xl", theme: "info" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.employmentType.partTime.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_typography4.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipelines.steps.employmentType.partTime.description")
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_cards4.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("freelance"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.TruckIcon, { size: "xl", theme: "success" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.employmentType.freelance.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_typography4.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipelines.steps.employmentType.freelance.description")
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_cards4.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("seasonal"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.StoreIcon, { size: "xl", theme: "warning" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_layout4.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.employmentType.seasonal.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                import_typography4.Text,
                {
                  size: "base",
                  color: "secondary",
                  className: "card-text",
                  children: t("pipelines.steps.employmentType.seasonal.description")
                }
              )
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_forms3.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_buttons3.Button,
      {
        variant: "outline",
        onClick: onBack,
        className: "layera-unified-button",
        children: t("pipelines.actions.back")
      }
    ) })
  ] });
};

// unified/steps/AvailabilityStep.tsx
var import_cards5 = require("@layera/cards");
var import_typography5 = require("@layera/typography");
var import_layout5 = require("@layera/layout");
var import_icons5 = require("@layera/icons");
var import_tolgee5 = require("@layera/tolgee");
var import_jsx_runtime5 = require("react/jsx-runtime");
var AvailabilityStep = ({ onNext }) => {
  const { t } = (0, import_tolgee5.useLayeraTranslation)();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_layout5.Stack, { spacing: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_typography5.Heading, { as: "h2", size: "xl", color: "primary", children: t("pipelines.steps.availability.question.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_typography5.Text, { size: "lg", color: "secondary", children: t("pipelines.steps.availability.question.subtitle") }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_layout5.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_cards5.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("now"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_layout5.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_icons5.CheckIcon, { size: "xl", theme: "primary" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_layout5.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_typography5.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.availability.options.now.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_typography5.Text, { size: "base", color: "secondary", className: "card-text", children: t("pipelines.steps.availability.options.now.description") })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_cards5.BaseCard,
        {
          clickable: true,
          onClick: () => onNext("future"),
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_layout5.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_icons5.RefreshIcon, { size: "xl", theme: "secondary" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_layout5.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_typography5.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.availability.options.future.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_typography5.Text, { size: "base", color: "secondary", className: "card-text", children: t("pipelines.steps.availability.options.future.description") })
            ] })
          ] })
        }
      )
    ] })
  ] });
};

// unified/steps/AvailabilityDetailsStep.tsx
var import_react4 = require("react");
var import_typography6 = require("@layera/typography");
var import_layout6 = require("@layera/layout");
var import_forms4 = require("@layera/forms");
var import_buttons4 = require("@layera/buttons");
var import_tolgee6 = require("@layera/tolgee");
var import_jsx_runtime6 = require("react/jsx-runtime");
var AvailabilityDetailsStep = ({ onNext }) => {
  const { t } = (0, import_tolgee6.useLayeraTranslation)();
  const [date, setDate] = (0, import_react4.useState)("");
  const [duration, setDuration] = (0, import_react4.useState)(12);
  const [unit, setUnit] = (0, import_react4.useState)("months");
  const handleNext = () => {
    if (date && duration > 0) {
      onNext({ date, duration, unit });
    }
  };
  const isValid = date && duration > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_layout6.Stack, { spacing: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_typography6.Heading, { as: "h2", size: "xl", color: "primary", children: t("pipelines.steps.availability.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_typography6.Text, { size: "lg", color: "secondary", children: t("pipelines.steps.availability.subtitle") }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_layout6.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_forms4.FormField, { label: t("pipelines.steps.availability.fields.startDate"), required: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_forms4.Input,
        {
          type: "date",
          value: date,
          onChange: (e) => setDate(e.target.value),
          placeholder: t("pipelines.steps.availability.placeholders.datePlaceholder"),
          size: "lg",
          variant: "outline"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_forms4.FormField, { label: t("pipelines.steps.availability.fields.duration"), required: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        import_forms4.Input,
        {
          type: "number",
          value: duration,
          onChange: (e) => setDuration(parseInt(e.target.value) || 0),
          placeholder: t("pipelines.steps.availability.placeholders.duration"),
          size: "lg",
          variant: "outline"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_forms4.FormField, { label: t("pipelines.steps.availability.fields.unit"), required: true, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "select",
        {
          value: unit,
          onChange: (e) => setUnit(e.target.value),
          style: { padding: "12px", fontSize: "16px", borderRadius: "4px" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "months", children: t("pipelines.steps.availability.units.months") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "years", children: t("pipelines.steps.availability.units.years") })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_forms4.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_buttons4.Button,
      {
        variant: "primary",
        size: "lg",
        onClick: handleNext,
        disabled: !isValid,
        children: t("pipelines.actions.continue")
      }
    ) })
  ] });
};

// unified/steps/LocationStep.tsx
var import_react5 = require("react");
var import_cards6 = require("@layera/cards");
var import_typography7 = require("@layera/typography");
var import_layout7 = require("@layera/layout");
var import_buttons5 = require("@layera/buttons");
var import_forms5 = require("@layera/forms");
var import_icons6 = require("@layera/icons");
var import_tolgee7 = require("@layera/tolgee");
var import_jsx_runtime7 = require("react/jsx-runtime");
var LocationStep = ({
  category,
  intent,
  availability,
  onNext,
  onBack
}) => {
  const { t } = (0, import_tolgee7.useLayeraTranslation)();
  const [uploadedFile, setUploadedFile] = (0, import_react5.useState)(null);
  const getFileType = (file) => {
    const extension = file.name.toLowerCase().split(".").pop();
    const mimeType = file.type.toLowerCase();
    if (mimeType.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return "image";
    }
    if (mimeType === "application/pdf" || extension === "pdf") {
      return "pdf";
    }
    if (["dxf", "dwg"].includes(extension || "") || mimeType.includes("acad") || mimeType.includes("autocad")) {
      return "cad";
    }
    return "unknown";
  };
  const sendFileToMap = (file) => {
    const fileType = getFileType(file);
    const fileUrl = URL.createObjectURL(file);
    const mapEvent = new CustomEvent("showFloorPlan", {
      detail: {
        file,
        fileUrl,
        fileName: file.name,
        fileType,
        fileSize: file.size
      }
    });
    console.log("\u{1F4C2} Sending floor plan to map:", {
      fileName: file.name,
      fileType,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fileUrl
    });
    console.log("\u{1F4E4} Dispatching showFloorPlan event to window...");
    window.dispatchEvent(mapEvent);
    console.log("\u2705 Event dispatched successfully");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Stack, { spacing: "md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Heading, { as: "h3", size: "lg", color: "primary", children: t("pipelines.steps.layout.title") }),
    category === "property" && intent === "offer" && availability === "now" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "base", color: "secondary", children: t("location.uploadFloorplan") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        import_cards6.BaseCard,
        {
          clickable: true,
          onClick: () => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/jpeg,image/png,image/gif,image/webp,application/pdf,.dxf,.dwg,application/acad,application/x-autocad";
            fileInput.style.display = "none";
            fileInput.onchange = (e) => {
              const target = e.target;
              const file = target.files?.[0];
              if (file) {
                setUploadedFile(file);
                sendFileToMap(file);
                console.log("Floor plan selected:", file.name, "Type:", getFileType(file));
                setTimeout(() => {
                  onNext();
                }, 500);
              }
            };
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
          },
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_layout7.Stack, { spacing: "md", style: { width: "100%" }, children: uploadedFile ? (
            // Επιβεβαίωση ότι το αρχείο στάλθηκε στον χάρτη
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Stack, { spacing: "sm", align: "center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Flex, { gap: "sm", align: "center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_icons6.CheckIcon, { size: "md", theme: "success" }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "lg", weight: "bold", color: "success", children: "\u0397 \u03BA\u03AC\u03C4\u03BF\u03C8\u03B7 \u03B5\u03BC\u03C6\u03B1\u03BD\u03AF\u03C3\u03C4\u03B7\u03BA\u03B5 \u03C3\u03C4\u03BF\u03BD \u03C7\u03AC\u03C1\u03C4\u03B7!" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { style: {
                wordBreak: "break-all",
                padding: "12px",
                backgroundColor: "#f0fdf4",
                border: "1px solid #10b981",
                borderRadius: "8px",
                maxWidth: "300px",
                textAlign: "center"
              }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "sm", color: "secondary", children: uploadedFile.name }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("br", {}),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_typography7.Text, { size: "xs", color: "secondary", children: [
                  getFileType(uploadedFile).toUpperCase(),
                  " \u2022 ",
                  (uploadedFile.size / 1024 / 1024).toFixed(2),
                  " MB"
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "sm", color: "secondary", align: "center", style: {
                fontStyle: "italic",
                maxWidth: "280px"
              }, children: "\u03A3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03C4\u03B5 \u03C3\u03C4\u03BF \u03B5\u03C0\u03CC\u03BC\u03B5\u03BD\u03BF \u03B2\u03AE\u03BC\u03B1 \u03B3\u03B9\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03AD\u03C4\u03B7\u03C3\u03B7 \u03BA\u03B1\u03B9 \u03C0\u03C1\u03BF\u03C3\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE" })
            ] })
          ) : (
            // Default Upload UI
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Flex, { align: "start", gap: "lg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_icons6.UploadIcon, { size: "xl", theme: "primary" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "xl", weight: "bold", className: "card-title", children: t("pipelines.steps.layout.floorPlan.selectFile") }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "base", color: "secondary", className: "card-text", children: t("pipelines.steps.layout.floorPlan.description") }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "sm", color: "secondary", style: { marginTop: "8px" }, children: t("pipelines.steps.layout.floorPlan.supportedTypes") })
              ] })
            ] })
          ) })
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "base", color: "secondary", children: intent === "offer" ? t("drawingArea") : t("drawingSearchArea") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        import_cards6.BaseCard,
        {
          clickable: true,
          onClick: () => {
            onNext();
          },
          variant: "outlined",
          size: "lg",
          padding: "lg",
          hoverable: true,
          className: "layera-unified-card",
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Flex, { align: "start", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_icons6.MapIcon, { size: "xl", theme: "primary" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_layout7.Stack, { spacing: "xs", style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "xl", weight: "bold", className: "card-title", children: t("openDrawingTool") }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_typography7.Text, { size: "base", color: "secondary", className: "card-text", children: t("clickToDrawOnMap") })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_forms5.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_buttons5.Button,
      {
        variant: "outline",
        onClick: onBack,
        className: "layera-unified-button",
        children: t("pipelines.actions.back")
      }
    ) })
  ] });
};

// unified/steps/LayoutStep.tsx
var import_react8 = require("react");
var import_typography8 = require("@layera/typography");
var import_layout8 = require("@layera/layout");
var import_buttons7 = require("@layera/buttons");
var import_forms6 = require("@layera/forms");
var import_forms7 = require("@layera/forms");
var import_icons8 = require("@layera/icons");

// ../geocoding/src/hooks/useGeocode.ts
var import_react6 = require("react");

// ../geocoding/src/providers/nominatim.ts
var NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
var NOMINATIM_SEARCH = `${NOMINATIM_BASE_URL}/search`;
var NOMINATIM_REVERSE = `${NOMINATIM_BASE_URL}/reverse`;
function mapAccuracy(osmClass, osmType, interpolated) {
  if (interpolated) return "interpolated";
  if (osmType === "house") return "exact";
  if (osmClass === "highway" || osmType === "residential") return "street";
  if (osmClass === "place" && (osmType === "city" || osmType === "town" || osmType === "village")) {
    return "city";
  }
  return "region";
}
function parseNominatimResult(item) {
  const coordinates = {
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon)
  };
  const address = {};
  if (item.address?.road) address.street = item.address.road;
  if (item.address?.house_number) address.houseNumber = item.address.house_number;
  if (item.address?.postcode) address.postalCode = item.address.postcode;
  if (item.address?.suburb) address.suburb = item.address.suburb;
  if (item.address?.village) address.village = item.address.village;
  if (item.address?.town) address.town = item.address.town;
  if (item.address?.county) address.county = item.address.county;
  if (item.address?.city) {
    address.city = item.address.city;
  } else if (item.address?.municipality) {
    address.city = item.address.municipality;
  } else if (item.address?.town) {
    address.city = item.address.town;
  } else if (item.address?.village) {
    address.city = item.address.village;
  }
  if (item.address?.state) address.region = item.address.state;
  if (item.address?.country) address.country = item.address.country;
  const result = {
    id: `nominatim_${item.place_id}`,
    displayName: item.display_name,
    coordinates,
    accuracy: mapAccuracy(item.class, item.type),
    address,
    metadata: {
      source: "nominatim",
      confidence: Math.min(item.importance || 0.5, 1),
      osmType: item.osm_type,
      osmId: item.osm_id,
      class: item.class,
      type: item.type,
      importance: item.importance,
      licence: item.licence
    }
  };
  if (item.geojson) {
    result.geometry = item.geojson;
  }
  if (item.boundingbox && item.boundingbox.length === 4) {
    result.boundingBox = [
      parseFloat(item.boundingbox[0] || "0"),
      parseFloat(item.boundingbox[1] || "0"),
      parseFloat(item.boundingbox[2] || "0"),
      parseFloat(item.boundingbox[3] || "0")
    ];
  }
  if (item.extratags) result.extraTags = item.extratags;
  if (item.namedetails) result.nameDetails = item.namedetails;
  return result;
}
async function searchNominatim(request) {
  try {
    const params = new URLSearchParams({
      format: "json",
      addressdetails: request.addressDetails !== false ? "1" : "0",
      limit: String(request.limit || 5),
      "accept-language": request.language === "el" ? "el,en" : "en"
    });
    if (request.structured) {
      if (request.structured.street) params.append("street", request.structured.street);
      if (request.structured.city) params.append("city", request.structured.city);
      if (request.structured.postalcode) params.append("postalcode", request.structured.postalcode);
      if (request.structured.state) params.append("state", request.structured.state);
      if (request.structured.country) params.append("country", request.structured.country);
      if (request.structured.amenity) params.append("amenity", request.structured.amenity);
      console.log("\u{1F3AF} Using STRUCTURED search:", request.structured);
    } else {
      params.append("q", request.query);
    }
    if (request.countryCode) {
      params.append("countrycodes", request.countryCode);
    }
    if (request.viewbox) {
      params.append("viewbox", request.viewbox.join(","));
      if (request.bounded) {
        params.append("bounded", "1");
      }
    }
    if (request.polygonGeoJSON) {
      params.append("polygon_geojson", "1");
    }
    if (request.extraTags) {
      params.append("extratags", "1");
    }
    if (request.nameDetails) {
      params.append("namedetails", "1");
    }
    if (request.excludePlaceIds?.length) {
      params.append("exclude_place_ids", request.excludePlaceIds.join(","));
    }
    console.log("\u{1F50D} NominatimProvider: Advanced search with params:", params.toString());
    const response = await fetch(`${NOMINATIM_SEARCH}?${params.toString()}`, {
      headers: {
        "User-Agent": "Layera-GeoAlert/1.0 (contact@layera.com)"
      }
    });
    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`);
    }
    let data = await response.json();
    console.log("\u{1F4CD} NominatimProvider: Found", data.length, "results");
    if (data.length === 0 && request.query.includes(",")) {
      console.log("\u{1F504} No exact match. Attempting interpolation and broader search...");
      const userRequestedResult = {
        place_id: -1,
        licence: "User Input",
        osm_id: -1,
        osm_type: "interpolated",
        lat: "0",
        lon: "0",
        class: "place",
        type: "address",
        display_name: `\u2753 \u0391\u03BD\u03B1\u03B6\u03B7\u03C4\u03AE\u03C3\u03B1\u03C4\u03B5: "${request.query}" (interpolated)`,
        address: {
          road: request.query.split(",")[0]?.trim() || "",
          city: request.query.split(",")[request.query.split(",").length - 2]?.trim() || "",
          country: request.query.split(",")[request.query.split(",").length - 1]?.trim() || ""
        },
        importance: 0,
        boundingbox: []
      };
      data.push(userRequestedResult);
      const parts = request.query.split(",");
      if (parts.length > 1) {
        const broaderQuery = parts.slice(-2).join(",").trim();
        const broaderParams = new URLSearchParams({
          q: broaderQuery,
          format: "json",
          addressdetails: "1",
          limit: String((request.limit || 5) - 1),
          "accept-language": request.language === "el" ? "el,en" : "en"
        });
        if (request.polygonGeoJSON) {
          broaderParams.append("polygon_geojson", "1");
        }
        const broaderResponse = await fetch(`${NOMINATIM_SEARCH}?${broaderParams.toString()}`, {
          headers: {
            "User-Agent": "Layera-GeoAlert/1.0 (contact@layera.com)"
          }
        });
        if (broaderResponse.ok) {
          const broaderData = await broaderResponse.json();
          if (broaderData.length > 0) {
            console.log("\u2705 Found alternative results via interpolation");
            const alternativeResults = broaderData.map((item, index) => ({
              ...item,
              display_name: `\u{1F4A1} \u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03BA\u03C4\u03B9\u03BA\u03AC ${index + 1}: ${item.display_name}`
            }));
            data.push(...alternativeResults);
          }
        }
      }
    }
    const results = data.map(parseNominatimResult);
    const sortedResults = results.sort((a, b) => {
      const aHasStreetAndNumber = a.address.street && a.address.houseNumber;
      const bHasStreetAndNumber = b.address.street && b.address.houseNumber;
      if (aHasStreetAndNumber && !bHasStreetAndNumber) return -1;
      if (!aHasStreetAndNumber && bHasStreetAndNumber) return 1;
      const aHasStreet = a.address.street && !a.address.houseNumber;
      const bHasStreet = b.address.street && !b.address.houseNumber;
      if (aHasStreet && !bHasStreet) return -1;
      if (!aHasStreet && bHasStreet) return 1;
      const getAdministrativeLevel2 = (result) => {
        const address = result.address;
        if (address.street) return 1;
        if (address.suburb || address.village) return 2;
        if (address.town) return 3;
        if (address.city) return 4;
        if (address.county) return 5;
        if (address.region) return 6;
        if (address.country) return 7;
        return 8;
      };
      const aLevel = getAdministrativeLevel2(a);
      const bLevel = getAdministrativeLevel2(b);
      if (aLevel !== bLevel) return aLevel - bLevel;
      const queryLower = request.query.toLowerCase();
      const aDisplayLower = a.displayName.toLowerCase();
      const bDisplayLower = b.displayName.toLowerCase();
      const aStartsWithQuery = aDisplayLower.startsWith(queryLower);
      const bStartsWithQuery = bDisplayLower.startsWith(queryLower);
      if (aStartsWithQuery && !bStartsWithQuery) return -1;
      if (!aStartsWithQuery && bStartsWithQuery) return 1;
      const aIncludesQuery = aDisplayLower.includes(queryLower);
      const bIncludesQuery = bDisplayLower.includes(queryLower);
      if (aIncludesQuery && !bIncludesQuery) return -1;
      if (!aIncludesQuery && bIncludesQuery) return 1;
      const accuracyOrder = {
        "exact": 1,
        "interpolated": 2,
        "street": 3,
        "city": 4,
        "region": 5
      };
      const aAccuracy = accuracyOrder[a.accuracy] || 6;
      const bAccuracy = accuracyOrder[b.accuracy] || 6;
      if (aAccuracy !== bAccuracy) return aAccuracy - bAccuracy;
      const aConfidence = a.metadata?.confidence || 0;
      const bConfidence = b.metadata?.confidence || 0;
      return bConfidence - aConfidence;
    });
    console.log("\u{1F4CD} NominatimProvider: Results sorted with street priority");
    return {
      results: sortedResults,
      total: sortedResults.length,
      query: request.query,
      status: sortedResults.length > 0 ? "success" : "no_results"
    };
  } catch (error) {
    console.error("\u274C NominatimProvider: Search error:", error);
    return {
      results: [],
      total: 0,
      query: request.query,
      status: "error",
      error: error instanceof Error ? error.message : "\u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF \u03C3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2"
    };
  }
}
async function reverseGeocode(coordinates, options) {
  try {
    const params = new URLSearchParams({
      format: "json",
      lat: String(coordinates.latitude),
      lon: String(coordinates.longitude),
      zoom: String(options?.zoom || 18),
      addressdetails: options?.addressDetails !== false ? "1" : "0",
      "accept-language": options?.language === "en" ? "en" : "el,en"
    });
    console.log(`\u{1F4CD} Reverse geocoding for: ${coordinates.latitude}, ${coordinates.longitude}`);
    const response = await fetch(`${NOMINATIM_REVERSE}?${params.toString()}`, {
      headers: {
        "User-Agent": "Layera-GeoAlert/1.0 (contact@layera.com)"
      }
    });
    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.place_id) {
      return null;
    }
    return parseNominatimResult(data);
  } catch (error) {
    console.error("\u274C Reverse geocoding error:", error);
    return null;
  }
}
async function batchGeocode(requests) {
  console.log(`\u{1F680} Batch geocoding ${requests.length} addresses...`);
  const batchSize = 5;
  const results = [];
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchPromises = batch.map((req) => searchNominatim(req));
    try {
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      if (i + batchSize < requests.length) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    } catch (error) {
      console.error(`\u274C Batch ${i / batchSize + 1} failed:`, error);
      batch.forEach(() => results.push({
        results: [],
        total: 0,
        query: "",
        status: "error",
        error: "Batch processing failed"
      }));
    }
  }
  console.log(`\u2705 Batch geocoding completed: ${results.length} results`);
  return results;
}
async function interpolateAddress(street, houseNumber) {
  console.log(`\u{1F522} Interpolating address: ${street} ${houseNumber}`);
  const streetSearch = {
    query: street,
    limit: 1,
    polygonGeoJSON: true,
    addressDetails: true
  };
  const streetResult = await searchNominatim(streetSearch);
  if (streetResult.results.length === 0) {
    console.log("\u274C Street not found for interpolation");
    return null;
  }
  const streetData = streetResult.results[0];
  if (!streetData) {
    console.log("\u274C No street data for interpolation");
    return null;
  }
  const interpolated = {
    ...streetData,
    id: `nominatim_interpolated_${Date.now()}`,
    displayName: `${street} ${houseNumber} (estimated)`,
    accuracy: "interpolated",
    address: {
      ...streetData.address,
      street,
      houseNumber
    },
    metadata: {
      ...streetData.metadata,
      confidence: 0.7,
      // Lower confidence for interpolated
      type: "interpolated"
    }
  };
  console.log("\u2705 Address interpolated successfully");
  return interpolated;
}
async function getSuggestions(partial, options) {
  const searchRequest = {
    query: partial,
    limit: options?.limit || 5
  };
  if (options?.countryCode) {
    searchRequest.countryCode = options.countryCode;
  }
  if (options?.focus) {
    const offset = 0.1;
    searchRequest.viewbox = [
      options.focus.longitude - offset,
      options.focus.latitude - offset,
      options.focus.longitude + offset,
      options.focus.latitude + offset
    ];
  }
  const response = await searchNominatim(searchRequest);
  return response.results.map((r) => r.displayName);
}
var nominatimProvider = {
  name: "nominatim",
  search: searchNominatim,
  reverse: reverseGeocode,
  batch: batchGeocode,
  interpolate: interpolateAddress,
  suggest: getSuggestions,
  isAvailable: () => typeof fetch !== "undefined"
};

// ../geocoding/src/hooks/useGeocode.ts
function useGeocode(options = {}) {
  const {
    provider = nominatimProvider,
    debounceMs = 300,
    autoSearch = false,
    onSelect
  } = options;
  const [query, setQuery] = (0, import_react6.useState)("");
  const [results, setResults] = (0, import_react6.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)(null);
  const [selectedResult, setSelectedResult] = (0, import_react6.useState)(null);
  const [currentLanguage, setCurrentLanguage] = (0, import_react6.useState)(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("i18nextLng") || "el";
    }
    return "el";
  });
  const debounceTimeoutRef = (0, import_react6.useRef)(null);
  const abortControllerRef = (0, import_react6.useRef)(null);
  const search = (0, import_react6.useCallback)(async (searchQuery) => {
    const queryToSearch = searchQuery ?? query;
    if (!queryToSearch.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    console.log("\u{1F50D} useGeocode: Starting search for:", queryToSearch);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);
    try {
      const storedLang = typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : null;
      const userLanguage = storedLang || (typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "el");
      console.log("\u{1F310} Detected language:", userLanguage, "(stored:", storedLang, ")");
      const request = {
        query: queryToSearch,
        // Αφαιρούμε το countryCode για παγκόσμια αναζήτηση
        limit: 5,
        language: userLanguage.startsWith("el") ? "el" : "en"
        // Χρήση γλώσσας χρήστη
      };
      console.log("\u{1F4E1} useGeocode: Making API request with:", request);
      const response = await provider.search(request);
      if (abortControllerRef.current?.signal.aborted) {
        console.log("\u{1F6D1} useGeocode: Search aborted");
        return;
      }
      console.log("\u2705 useGeocode: Search completed with", response.results.length, "results");
      if (response.status === "error") {
        setError(response.error || "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2");
        setResults([]);
      } else {
        setResults(response.results);
        setError(null);
      }
    } catch (searchError) {
      if (searchError instanceof Error && searchError.name === "AbortError") {
        console.log("\u{1F6D1} useGeocode: Request cancelled");
        return;
      }
      console.error("\u274C useGeocode: Search error:", searchError);
      setError(searchError instanceof Error ? searchError.message : "\u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF \u03C3\u03C6\u03AC\u03BB\u03BC\u03B1");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, provider]);
  const debouncedSearch = (0, import_react6.useCallback)((searchQuery) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      search(searchQuery);
    }, debounceMs);
  }, [search, debounceMs]);
  (0, import_react6.useEffect)(() => {
    if (autoSearch && query.trim()) {
      debouncedSearch(query);
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, autoSearch, debouncedSearch]);
  (0, import_react6.useEffect)(() => {
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("i18nextLng") || "el";
      console.log("\u{1F30D} Language changed from", currentLanguage, "to", newLanguage);
      if (newLanguage !== currentLanguage) {
        setCurrentLanguage(newLanguage);
        if (query.trim() && results.length > 0) {
          console.log("\u{1F504} Re-searching with new language:", newLanguage);
          search(query);
        }
      }
    };
    window.addEventListener("storage", handleLanguageChange);
    window.addEventListener("languagechange", handleLanguageChange);
    const interval = setInterval(() => {
      const newLang = localStorage.getItem("i18nextLng") || "el";
      if (newLang !== currentLanguage) {
        handleLanguageChange();
      }
    }, 500);
    return () => {
      window.removeEventListener("storage", handleLanguageChange);
      window.removeEventListener("languagechange", handleLanguageChange);
      clearInterval(interval);
    };
  }, [currentLanguage, query, results.length, search]);
  (0, import_react6.useEffect)(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);
  const selectResult = (0, import_react6.useCallback)((result) => {
    console.log("\u{1F3AF} useGeocode: Selected result:", result.displayName);
    setSelectedResult(result);
    if (onSelect) {
      onSelect(result);
    }
  }, [onSelect]);
  const clear = (0, import_react6.useCallback)(() => {
    console.log("\u{1F9F9} useGeocode: Clearing results");
    setQuery("");
    setResults([]);
    setError(null);
    setSelectedResult(null);
    setIsLoading(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);
  return {
    query,
    results,
    isLoading,
    error,
    selectedResult,
    actions: {
      setQuery,
      search,
      selectResult,
      clear
    }
  };
}

// unified/steps/LayoutStep.tsx
var import_i18n = require("@layera/i18n");

// ../address-breakdown/src/components/AddressBreakdownCard.tsx
var import_react7 = require("react");
var import_cards7 = require("@layera/cards");
var import_buttons6 = require("@layera/buttons");
var import_icons7 = require("@layera/icons");
var import_loading = require("@layera/loading");
var import_tolgee8 = require("@layera/tolgee");

// ../geo-mapping/src/utils/administrativeHierarchy.ts
var GREEK_PATTERNS = {
  [1 /* STREET */]: [
    /^.*?\s*\d+/,
    // Οδός με αριθμό
    /οδός|λεωφόρος|πλατεία|αγίου|αγίας/i
  ],
  [2 /* COMMUNITY */]: [
    /κοινότητα|community/i
  ],
  [3 /* NEIGHBORHOOD */]: [
    /συνοικία|γειτονιά|περιοχή/i
  ],
  [4 /* VILLAGE */]: [
    /χωριό|κωμόπολη|οικισμός/i
  ],
  [5 /* MUNICIPAL_UNIT */]: [
    /δημοτική\s+ενότητα|municipal\s+unit/i
  ],
  [6 /* MUNICIPALITY */]: [
    /^δήμος\s+|municipality\s+of/i
  ],
  [7 /* METROPOLITAN */]: [
    /μητροπολιτική\s+ενότητα|metropolitan/i
  ],
  [8 /* PREFECTURE */]: [
    /νομός|νομαρχία|prefecture/i
  ],
  [9 /* REGION */]: [
    /περιφέρεια|region/i
  ],
  [10 /* DECENTRALIZED */]: [
    /αποκεντρωμένη\s+διοίκηση|decentralized/i
  ],
  [11 /* COUNTRY */]: [
    /ελλάδα|greece/i
  ]
};
function getAdministrativeLevel(text) {
  const cleanText = text.trim();
  for (const [level, patterns] of Object.entries(GREEK_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(cleanText)) {
        return parseInt(level);
      }
    }
  }
  return 3 /* NEIGHBORHOOD */;
}
function removeDuplicates(items) {
  const cleaned = [];
  const seen = /* @__PURE__ */ new Set();
  for (const item of items) {
    const normalized = normalizeText(item);
    if (seen.has(normalized)) {
      continue;
    }
    const isDuplicate = Array.from(seen).some((existing) => {
      return areTextsSimilar(normalized, existing);
    });
    if (!isDuplicate) {
      seen.add(normalized);
      cleaned.push(item);
    }
  }
  return cleaned;
}
function normalizeText(text) {
  return text.toLowerCase().replace(/^(δήμος|δημοτική\s+ενότητα|περιφέρεια|νομός)\s+/i, "").replace(/\s*-\s*/g, "-").replace(/\s+/g, " ").trim();
}
function areTextsSimilar(text1, text2) {
  if (text1 === text2) return true;
  if (text1.includes(text2)) {
    const ratio = text2.length / text1.length;
    if (ratio < 0.6) return true;
  }
  if (text2.includes(text1)) {
    const ratio = text1.length / text2.length;
    if (ratio < 0.6) return true;
  }
  const similarity = calculateSimilarity(text1, text2);
  return similarity > 0.85;
}
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  if (longer.length === 0) return 1;
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}
function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        // deletion
        matrix[j - 1][i] + 1,
        // insertion
        matrix[j - 1][i - 1] + cost
        // substitution
      );
    }
  }
  return matrix[str2.length][str1.length];
}
function processDisplayNameToHierarchy(displayName) {
  console.log("\u{1F504} Processing display name for hierarchy:", displayName);
  const parts = displayName.split(",").map((part) => part.trim()).filter((part) => part.length > 0);
  console.log("\u{1F4DD} Initial parts:", parts);
  let streetWithNumberAndPostal = "";
  const nonStreetParts = [];
  let postalCode = "";
  const postalIndex = parts.findIndex((part) => /^\d{3,5}(-\d{4})?$/.test(part));
  if (postalIndex !== -1) {
    postalCode = parts[postalIndex];
  }
  const streetIndex = parts.findIndex((part) => /^.*?\s*\d+/.test(part));
  if (streetIndex !== -1) {
    streetWithNumberAndPostal = postalCode ? `${parts[streetIndex]}, ${postalCode}` : parts[streetIndex];
  }
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (/^\d{3,5}(-\d{4})?$/.test(part)) continue;
    if (/^\d+$/.test(part)) continue;
    if (i === streetIndex) continue;
    nonStreetParts.push(part);
  }
  console.log("\u{1F6E3}\uFE0F Street with number and postal:", streetWithNumberAndPostal);
  console.log("\u{1F9F9} Non-street parts:", nonStreetParts);
  const uniqueNonStreetParts = removeDuplicates(nonStreetParts);
  console.log("\u2728 Unique non-street parts:", uniqueNonStreetParts);
  const hierarchicalParts = uniqueNonStreetParts.map((part) => ({
    text: part,
    level: getAdministrativeLevel(part)
  })).sort((a, b) => a.level - b.level).map((item) => item.text);
  console.log("\u{1F3DB}\uFE0F Hierarchically sorted non-street parts:", hierarchicalParts);
  const finalParts = [];
  if (streetWithNumberAndPostal) {
    finalParts.push(streetWithNumberAndPostal);
  }
  finalParts.push(...hierarchicalParts);
  const formattedHierarchy = finalParts.join("\n");
  console.log("\u{1F4CB} Final formatted hierarchy:", formattedHierarchy);
  return formattedHierarchy;
}
function getCountryFromDisplayName(displayName) {
  const lowerName = displayName.toLowerCase();
  if (lowerName.includes("\u03B5\u03BB\u03BB\u03AC\u03B4\u03B1") || lowerName.includes("greece")) {
    return "greece";
  }
  if (lowerName.includes("bulgaria") || lowerName.includes("\u03B2\u03BF\u03C5\u03BB\u03B3\u03B1\u03C1\u03AF\u03B1")) {
    return "bulgaria";
  }
  return "unknown";
}
function processDisplayNameByCountry(displayName) {
  const country = getCountryFromDisplayName(displayName);
  switch (country) {
    case "greece":
      return processDisplayNameToHierarchy(displayName);
    case "bulgaria":
      return displayName;
    // Fallback προς το παρόν
    default:
      return processDisplayNameToHierarchy(displayName);
  }
}

// ../geo-mapping/src/services/osmService.ts
var fetchBoundaryByAddressComponent = async (addressComponent) => {
  try {
    console.log(`\u{1F30D} Fetching boundary \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressComponent.label)}&format=json&limit=1&polygon_geojson=1`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Layera-GeoAlert/1.0"
      }
    });
    if (!searchResponse.ok) {
      throw new Error(`Nominatim error: ${searchResponse.status}`);
    }
    const searchData = await searchResponse.json();
    if (searchData && searchData.length > 0) {
      const result = searchData[0];
      if (result.geojson) {
        console.log(`\u2705 Found FULL POLYGON \u03B3\u03B9\u03B1 ${addressComponent.label} \u03BC\u03B5 ${result.geojson.coordinates?.[0]?.length || 0} \u03C3\u03B7\u03BC\u03B5\u03AF\u03B1`);
        return {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {
              name: result.display_name ? processDisplayNameByCountry(result.display_name) : addressComponent.label,
              admin_level: "8",
              boundary: "administrative",
              osm_id: result.osm_id || 0,
              osm_type: result.osm_type || "node"
            },
            geometry: result.geojson
          }]
        };
      } else if (result.boundingbox) {
        const bbox = result.boundingbox;
        const south = parseFloat(bbox[0]);
        const north = parseFloat(bbox[1]);
        const west = parseFloat(bbox[2]);
        const east = parseFloat(bbox[3]);
        console.log(`\u26A0\uFE0F Using bounding box \u03B3\u03B9\u03B1 ${addressComponent.label} (no polygon available)`);
        return {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {
              name: result.display_name ? processDisplayNameByCountry(result.display_name) : addressComponent.label,
              admin_level: "8",
              boundary: "administrative",
              osm_id: result.osm_id || 0,
              osm_type: result.osm_type || "node"
            },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [west, north],
                [east, north],
                [east, south],
                [west, south],
                [west, north]
              ]]
            }
          }]
        };
      }
    }
    const query = `
      [out:json][timeout:10];
      (
        relation["boundary"="administrative"]["name"~"${addressComponent.label}",i];
      );
      out ids;
    `;
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `data=${encodeURIComponent(query)}`
    });
    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }
    const data = await response.json();
    if (data.elements && data.elements.length > 0) {
      console.log(`\u2705 OSM boundary IDs found \u03B3\u03B9\u03B1: ${addressComponent.label} (${data.elements.length} elements)`);
      return {
        type: "FeatureCollection",
        features: []
      };
    }
    console.log(`\u26A0\uFE0F No OSM boundary found \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    return {
      type: "FeatureCollection",
      features: []
    };
  } catch (error) {
    console.error(`\u{1F6AB} OSM API error \u03B3\u03B9\u03B1 ${addressComponent.label}:`, error);
    console.log(`\u26A0\uFE0F Fallback to local boundary system \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    return await fetchLocalBoundary(addressComponent);
  }
};
async function fetchLocalBoundary(addressComponent) {
  const baseName = addressComponent.label.replace(/^Δήμος\s+/, "").replace(/^Δημοτική\s+Ενότητα\s+/, "").replace(/^Περιφέρεια\s+/, "").replace(/^Περιφερειακή\s+Ενότητα\s+/, "").replace(/\s+-\s+.*$/, "").replace(/\s+\(.+\)$/, "").trim();
  console.log("\u26A0\uFE0F Fallback to local boundary system \u03B3\u03B9\u03B1:", baseName);
  try {
    const { findFallbackBoundary: findFallbackBoundary2 } = await Promise.resolve().then(() => (init_fallbackBoundaries(), fallbackBoundaries_exports));
    const searchTerms = [addressComponent.label, baseName];
    const fallbackBoundary = findFallbackBoundary2(searchTerms);
    if (fallbackBoundary) {
      console.log("\u2705 Local fallback boundary found");
      return fallbackBoundary;
    }
  } catch (fallbackError) {
    console.warn("\u26A0\uFE0F Fallback system not available:", fallbackError);
  }
  console.error("\u{1F6AB} No boundary data available \u03B3\u03B9\u03B1:", addressComponent.label);
  return {
    type: "FeatureCollection",
    features: []
  };
}

// ../address-breakdown/src/utils/addressParser.ts
function parseGeocodeToComponents(result) {
  const components = [];
  let index = 0;
  if (result.address.street && result.address.houseNumber) {
    components.push({
      id: `street-${index++}`,
      label: `${result.address.street} ${result.address.houseNumber}`,
      type: "street",
      clickable: false,
      // Streets δεν έχουν boundaries
      value: `${result.address.street} ${result.address.houseNumber}`,
      className: "address-street"
    });
  } else if (result.address.street) {
    components.push({
      id: `street-${index++}`,
      label: result.address.street,
      type: "street",
      clickable: false,
      value: result.address.street,
      className: "address-street"
    });
  }
  if (result.address.postalCode) {
    components.push({
      id: `postal-${index++}`,
      label: result.address.postalCode,
      type: "postalCode",
      clickable: false,
      // Postal codes δεν έχουν boundaries
      value: result.address.postalCode,
      className: "address-postal"
    });
  }
  if (result.address.city) {
    components.push({
      id: `city-${index++}`,
      label: result.address.city,
      type: "city",
      clickable: true,
      // Cities έχουν administrative boundaries
      value: result.address.city,
      className: "address-city"
    });
  }
  if (result.address.region) {
    components.push({
      id: `region-${index++}`,
      label: result.address.region,
      type: "region",
      clickable: true,
      // Regions έχουν administrative boundaries
      value: result.address.region,
      className: "address-region"
    });
  }
  if (result.address.country) {
    components.push({
      id: `country-${index++}`,
      label: result.address.country,
      type: "country",
      clickable: true,
      // Countries έχουν boundaries
      value: result.address.country,
      className: "address-country"
    });
  }
  return components;
}
function parseDisplayNameToAdditionalComponents(result, existingComponents) {
  const displayName = result.displayName;
  const additionalComponents = [];
  const existingValues = new Set(existingComponents.map((c) => c.value?.toLowerCase()));
  const parts = displayName.split(",").map((part) => part.trim());
  let index = existingComponents.length;
  for (const part of parts) {
    if (existingValues.has(part.toLowerCase())) {
      continue;
    }
    if (/^\d+$/.test(part)) {
      continue;
    }
    if (/^\d{5}$/.test(part)) {
      continue;
    }
    const isNotClickable = /^\d+$/.test(part) || // Μόνο αριθμοί
    /^\d{3,5}(-\d{4})?$/.test(part) || // Postal codes
    part.length <= 2;
    additionalComponents.push({
      id: `additional-${index++}`,
      label: part,
      type: "custom",
      clickable: !isNotClickable,
      // Όλα clickable εκτός από τις εξαιρέσεις
      value: part,
      className: "address-component"
    });
  }
  return additionalComponents;
}
function getAdministrativeHierarchy(label) {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("\u03BF\u03B4\u03CC\u03C2") || lowerLabel.includes("\u03BF\u03B4\u03CC") || lowerLabel.includes("\u03BB\u03B5\u03C9\u03C6\u03CC\u03C1\u03BF\u03C2")) return 1;
  if (lowerLabel.includes("\u03C3\u03C5\u03BD\u03BF\u03B9\u03BA\u03AF\u03B1") || lowerLabel.includes("\u03B3\u03B5\u03B9\u03C4\u03BF\u03BD\u03B9\u03AC")) return 2;
  if (lowerLabel.includes("\u03C7\u03C9\u03C1\u03B9\u03CC") || lowerLabel.includes("\u03BA\u03C9\u03BC\u03CC\u03C0\u03BF\u03BB\u03B7")) return 3;
  if (lowerLabel.includes("\u03C0\u03CC\u03BB\u03B7") || lowerLabel.includes("\u03B4\u03AE\u03BC\u03BF\u03C2") || lowerLabel.includes("\u03B4\u03B7\u03BC\u03CC\u03C4\u03B7\u03C4\u03B1")) return 4;
  if (lowerLabel.includes("\u03BD\u03BF\u03BC\u03CC\u03C2") || lowerLabel.includes("\u03B5\u03C0\u03B1\u03C1\u03C7\u03AF\u03B1")) return 5;
  if (lowerLabel.includes("\u03C0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1") || lowerLabel.includes("\u03BC\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1") || lowerLabel.includes("\u03B8\u03C1\u03AC\u03BA\u03B7") || lowerLabel.includes("\u03B8\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7")) return 6;
  if (lowerLabel.includes("\u03B5\u03BB\u03BB\u03AC\u03B4\u03B1") || lowerLabel.includes("greece")) return 7;
  return 5;
}
function parseFullAddress(result) {
  const baseComponents = parseGeocodeToComponents(result);
  const additionalComponents = parseDisplayNameToAdditionalComponents(result, baseComponents);
  const allComponents = [...baseComponents, ...additionalComponents];
  return allComponents.sort((a, b) => {
    if (!a.clickable && b.clickable) return -1;
    if (a.clickable && !b.clickable) return 1;
    if (a.clickable && b.clickable) {
      const hierarchyA = getAdministrativeHierarchy(a.label);
      const hierarchyB = getAdministrativeHierarchy(b.label);
      return hierarchyA - hierarchyB;
    }
    const typePriority = {
      "street": 1,
      "houseNumber": 2,
      "postalCode": 3,
      "city": 4,
      "region": 5,
      "custom": 6,
      "country": 7
    };
    return (typePriority[a.type] || 999) - (typePriority[b.type] || 999);
  });
}

// ../address-breakdown/src/components/AddressBreakdownCard.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function AddressBreakdownCard({
  geocodeResult,
  config = {},
  title,
  onClick,
  style,
  isLoading = false,
  error = null
}) {
  const { t } = (0, import_tolgee8.useLayeraTranslation)();
  const [boundaryLoading, setBoundaryLoading] = (0, import_react7.useState)(null);
  const [boundaryError, setBoundaryError] = (0, import_react7.useState)(null);
  const [loadingTimer, setLoadingTimer] = (0, import_react7.useState)(0);
  (0, import_react7.useEffect)(() => {
    let interval;
    if (boundaryLoading) {
      setLoadingTimer(0);
      interval = setInterval(() => {
        setLoadingTimer((prev) => prev + 1);
      }, 1e3);
    } else {
      setLoadingTimer(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [boundaryLoading]);
  const finalConfig = {
    layout: "list",
    enableBoundarySearch: true,
    maxComponents: 10,
    ...config
  };
  const components = parseFullAddress(geocodeResult);
  const visibleComponents = finalConfig.maxComponents ? components.slice(0, finalConfig.maxComponents) : components;
  const handleComponentClick = (0, import_react7.useCallback)(async (component) => {
    if (!component.clickable || !finalConfig.enableBoundarySearch) {
      return;
    }
    if (finalConfig.onComponentClick) {
      finalConfig.onComponentClick(component);
    }
    console.log(`\u{1F504} Starting boundary search for: ${component.label}, ID: ${component.id}`);
    setBoundaryLoading(component.id);
    setBoundaryError(null);
    try {
      console.log(`\u{1F50D} Fetching boundary for: ${component.label}`);
      const boundaryData = await fetchBoundaryByAddressComponent({
        label: component.label,
        type: component.type
      });
      if (boundaryData && boundaryData.features && boundaryData.features.length > 0) {
        console.log(`\u2705 Found boundary with ${boundaryData.features.length} features`);
        const event = new CustomEvent("showAdministrativeBoundary", {
          detail: {
            type: "showBoundary",
            component,
            geocodeResult,
            boundary: boundaryData
          }
        });
        window.dispatchEvent(event);
        console.log(`\u{1F3AF} Boundary search completed for: ${component.label}`);
      } else {
        console.warn(`\u26A0\uFE0F No boundary data found for: ${component.label}`);
        setBoundaryError(`\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03CC\u03C1\u03B9\u03B1 \u03B3\u03B9\u03B1 ${component.label}`);
      }
    } catch (error2) {
      setBoundaryError(`Failed to search boundary for ${component.label}`);
      console.error("Boundary search error:", error2);
    } finally {
      console.log(`\u{1F3C1} Boundary search completed for: ${component.label}, clearing loading state`);
      setBoundaryLoading(null);
    }
  }, [finalConfig, geocodeResult, t]);
  const renderComponent = (component) => {
    const isLoading2 = boundaryLoading === component.id;
    const isClickable = component.clickable && finalConfig.enableBoundarySearch;
    const componentProps = {
      className: `address-component ${component.className || ""} ${isClickable ? "clickable" : ""}`,
      onClick: isClickable ? () => handleComponentClick(component) : void 0,
      disabled: isLoading2 || !!boundaryLoading,
      style: {
        cursor: isClickable ? "pointer" : "default",
        opacity: isLoading2 ? 0.6 : 1
      }
    };
    if (finalConfig.layout === "tags") {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
        import_buttons6.Button,
        {
          ...componentProps,
          variant: isClickable ? "outline" : "ghost",
          size: "sm",
          startIcon: isClickable ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_icons7.MapIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_icons7.LocationIcon, {}),
          loading: isLoading2,
          children: [
            component.label,
            isLoading2 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { style: {
              marginLeft: "0.5rem",
              fontSize: "0.75rem",
              color: "#6B7280"
            }, children: [
              "(",
              loadingTimer,
              "s)"
            ] })
          ]
        },
        component.id
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        ...componentProps,
        className: `list-item ${componentProps.className}`,
        style: {
          ...componentProps.style,
          padding: "0.75rem",
          borderRadius: "0.375rem",
          marginBottom: "0.5rem",
          border: "1px solid #E5E7EB",
          transition: "all 0.2s ease-in-out",
          backgroundColor: isClickable ? "#FFFFFF" : "#F9FAFB",
          textAlign: "left",
          // Ευθυγράμμιση προς τα αριστερά
          ...isClickable && {
            ":hover": {
              backgroundColor: "#F3F4F6",
              borderColor: "#D1D5DB",
              transform: "translateY(-1px)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }
          }
        },
        onMouseEnter: (e) => {
          if (isClickable && !isLoading2) {
            e.currentTarget.style.backgroundColor = "#F3F4F6";
            e.currentTarget.style.borderColor = "#D1D5DB";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          }
        },
        onMouseLeave: (e) => {
          if (isClickable && !isLoading2) {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.borderColor = "#E5E7EB";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "list-item-content", style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            // Ευθυγράμμιση προς τα αριστερά
            gap: "0.5rem",
            width: "100%"
          }, children: [
            isLoading2 ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_loading.Spinner, { size: "sm", variant: "default" }) : isClickable ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_icons7.MapIcon, { className: "list-icon", style: {
              width: "1rem",
              height: "1rem",
              color: "#3B82F6"
            } }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_icons7.LocationIcon, { className: "list-icon", style: {
              width: "1rem",
              height: "1rem",
              color: "#6B7280"
            } }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "list-label", style: {
              flex: 1,
              fontSize: "0.875rem",
              color: isClickable ? "#1F2937" : "#6B7280",
              fontWeight: isClickable ? "500" : "400",
              textAlign: "left",
              // Ευθυγράμμιση κειμένου προς τα αριστερά
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: component.label })
          ] }),
          isLoading2 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "loading-indicator", style: {
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "#6B7280",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03C0\u03B5\u03C1\u03B9\u03B3\u03C1\u03AC\u03BC\u03BC\u03B1\u03C4\u03BF\u03C2..." }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { style: {
              fontWeight: "500",
              color: "#3B82F6",
              minWidth: "2rem"
            }, children: [
              loadingTimer,
              "s"
            ] })
          ] })
        ]
      },
      component.id
    );
  };
  const cardActions = /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_buttons6.Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: () => {
        const event = new CustomEvent("showSearchResult", {
          detail: {
            latitude: geocodeResult.coordinates.latitude,
            longitude: geocodeResult.coordinates.longitude,
            zoom: 16,
            displayName: geocodeResult.displayName
          }
        });
        window.dispatchEvent(event);
      },
      children: t("showOnMap")
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    import_cards7.BaseCard,
    {
      title: title || t("addressDetails"),
      actions: cardActions,
      className: `address-breakdown-card ${finalConfig.className || ""}`,
      onClick,
      style,
      children: [
        error && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "error-message", children: error }),
        boundaryError && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "boundary-error", children: boundaryError }),
        !isLoading && visibleComponents.some((c) => c.clickable) && finalConfig.enableBoundarySearch && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: {
          fontSize: "0.875rem",
          color: "#6B7280",
          marginBottom: "0.75rem",
          fontStyle: "italic"
        }, children: t("clickToShowBoundary") }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `address-components layout-${finalConfig.layout}`, children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "loading-state", children: "Loading..." }) : visibleComponents.map(renderComponent) }),
        components.length > visibleComponents.length && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "components-overflow", children: [
          "+",
          components.length - visibleComponents.length,
          " more components"
        ] })
      ]
    }
  );
}

// unified/steps/LayoutStep.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function renderSearchResultItem(result, layoutLocation, index) {
  const getBadgeStyle = (badgeText2) => {
    const badgeColors = {
      "\u039F\u0394\u039F\u03A3+": { bg: "#22c55e", text: "white" },
      "\u039F\u0394\u039F\u03A3": { bg: "#3b82f6", text: "white" },
      "\u03A3\u03A5\u039D\u039F\u0399\u039A\u0399\u0391": { bg: "#f59e0b", text: "white" },
      "\u03A7\u03A9\u03A1\u0399\u039F": { bg: "#f59e0b", text: "white" },
      "\u03A0\u039F\u039B\u0397": { bg: "#8b5cf6", text: "white" },
      "\u0394\u0397\u039C\u039F\u03A3": { bg: "#8b5cf6", text: "white" },
      "\u039D\u039F\u039C\u039F\u03A3": { bg: "#6b7280", text: "white" },
      "\u03A0\u0395\u03A1\u0399\u03A6\u0395\u03A1\u0395\u0399\u0391": { bg: "#6b7280", text: "white" },
      "\u03A7\u03A9\u03A1\u0391": { bg: "#374151", text: "white" },
      "\u03A4\u039F\u03A0\u039F\u03A3": { bg: "#84cc16", text: "white" }
    };
    return badgeColors[badgeText2] || { bg: "#6b7280", text: "white" };
  };
  const hasStreetAndNumber = result.address.street && result.address.houseNumber;
  const hasStreetOnly = result.address.street && !result.address.houseNumber;
  let content = "";
  let badgeText = "";
  let subtitle = "";
  if (hasStreetAndNumber) {
    content = `${result.address.street} ${result.address.houseNumber}`;
    badgeText = "\u039F\u0394\u039F\u03A3+";
    const locationParts = [];
    if (result.address.postalCode) locationParts.push(result.address.postalCode);
    if (result.address.suburb || result.address.city) {
      locationParts.push(result.address.suburb || result.address.city);
    }
    if (locationParts.length > 0) {
      subtitle = locationParts.join(", ");
    }
  } else if (hasStreetOnly) {
    content = result.address.street;
    badgeText = "\u039F\u0394\u039F\u03A3";
    const locationParts = [];
    if (result.address.suburb || result.address.city) {
      locationParts.push(result.address.suburb || result.address.city);
    }
    if (result.address.region) locationParts.push(result.address.region);
    if (locationParts.length > 0) {
      subtitle = locationParts.join(", ");
    }
  } else {
    const address = result.address;
    if (address.suburb) {
      content = address.suburb;
      badgeText = "\u03A3\u03A5\u039D\u039F\u0399\u039A\u0399\u0391";
      if (address.city && address.city !== address.suburb) {
        subtitle = address.city;
      }
    } else if (address.village) {
      content = address.village;
      badgeText = "\u03A7\u03A9\u03A1\u0399\u039F";
      if (address.county) subtitle = address.county;
    } else if (address.town) {
      content = address.town;
      badgeText = "\u03A0\u039F\u039B\u0397";
      if (address.region) subtitle = address.region;
    } else if (address.city) {
      content = address.city;
      badgeText = "\u0394\u0397\u039C\u039F\u03A3";
      if (address.region) subtitle = address.region;
    } else if (address.county) {
      content = address.county;
      badgeText = "\u039D\u039F\u039C\u039F\u03A3";
      if (address.region) subtitle = address.region;
    } else if (address.region) {
      content = address.region;
      badgeText = "\u03A0\u0395\u03A1\u0399\u03A6\u0395\u03A1\u0395\u0399\u0391";
      if (address.country) subtitle = address.country;
    } else if (address.country) {
      content = address.country;
      badgeText = "\u03A7\u03A9\u03A1\u0391";
    } else {
      const queryWords = layoutLocation.toLowerCase().split(/[\s,]+/);
      const displayParts = result.displayName.split(",").map((p) => p.trim());
      let bestMatch = displayParts[0] || result.displayName;
      for (const part of displayParts) {
        for (const word of queryWords) {
          if (word.length > 2 && part.toLowerCase().includes(word)) {
            bestMatch = part;
            break;
          }
        }
      }
      content = bestMatch;
      badgeText = "\u03A4\u039F\u03A0\u039F\u03A3";
      if (displayParts.length > 1 && bestMatch !== result.displayName) {
        subtitle = displayParts.filter((p) => p !== bestMatch).slice(0, 2).join(", ");
      }
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_layout8.Flex, { gap: "sm", align: "center", style: { width: "100%" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_icons8.LocationIcon, { size: "sm", theme: hasStreetAndNumber || hasStreetOnly ? "primary" : "neutral" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: {
        fontWeight: hasStreetAndNumber || hasStreetOnly ? "bold" : "normal",
        color: hasStreetAndNumber || hasStreetOnly ? "#1f2937" : "#6b7280",
        fontSize: hasStreetAndNumber || hasStreetOnly ? "14px" : "13px"
      }, children: content }),
      subtitle && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: {
        fontSize: "11px",
        color: "#9ca3af",
        marginTop: "2px"
      }, children: subtitle })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: {
      backgroundColor: getBadgeStyle(badgeText).bg,
      color: getBadgeStyle(badgeText).text,
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "9px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    }, children: badgeText })
  ] });
}
var LayoutStep = ({ onNext, onBack }) => {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const [layoutRotation, setLayoutRotation] = (0, import_react8.useState)(0);
  const [layoutScaleWidth, setLayoutScaleWidth] = (0, import_react8.useState)(1);
  const [layoutScaleHeight, setLayoutScaleHeight] = (0, import_react8.useState)(1);
  const [layoutScaleDepth, setLayoutScaleDepth] = (0, import_react8.useState)(1);
  const [activeScaleField, setActiveScaleField] = (0, import_react8.useState)(null);
  const { query: layoutLocation, actions: geocodeActions, isLoading, results, selectedResult } = useGeocode({
    debounceMs: 500,
    autoSearch: false,
    onSelect: (result) => {
      console.log("\u{1F3AF} LayoutStep: Location selected:", result.displayName);
      const mapEvent = new CustomEvent("showSearchResult", {
        detail: {
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
          zoom: 16,
          displayName: result.displayName,
          result
          // Προσθήκη ολόκληρου του structured result
        }
      });
      console.log("\u{1F4E1} LayoutStep: Dispatching showSearchResult event for search result");
      window.dispatchEvent(mapEvent);
      const floorPlanEvent = new CustomEvent("moveFloorPlanToLocation", {
        detail: {
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
          reason: "search_result",
          displayName: result.displayName
        }
      });
      console.log("\u{1F3E0} LayoutStep: Dispatching moveFloorPlanToLocation event for search result:", result.displayName);
      window.dispatchEvent(floorPlanEvent);
    }
  });
  (0, import_react8.useEffect)(() => {
    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem("i18nextLng");
      console.log("\u{1F30D} LayoutStep detected language change to:", currentLang);
      if (layoutLocation && results.length > 0) {
        console.log("\u{1F504} Re-searching location with new language:", currentLang);
        geocodeActions.search(layoutLocation);
      }
    };
    let lastLang = localStorage.getItem("i18nextLng");
    const interval = setInterval(() => {
      const storedLang = localStorage.getItem("i18nextLng");
      if (storedLang !== lastLang) {
        lastLang = storedLang;
        handleLanguageChange();
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [layoutLocation, results.length, geocodeActions]);
  const handleFindMyLocation = () => {
    console.log("\u{1F50D} LayoutStep: Find location button clicked");
    if ("geolocation" in navigator) {
      console.log("\u{1F30D} LayoutStep: Geolocation is available, requesting position...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("\u{1F4CD} LayoutStep: User location found:", { latitude, longitude });
          const mapEvent = new CustomEvent("centerMapToLocation", {
            detail: { latitude, longitude, zoom: 16 }
          });
          console.log("\u{1F4E1} LayoutStep: Dispatching centerMapToLocation event with:", { latitude, longitude, zoom: 16 });
          window.dispatchEvent(mapEvent);
          const floorPlanEvent = new CustomEvent("moveFloorPlanToLocation", {
            detail: {
              latitude,
              longitude,
              reason: "user_location"
            }
          });
          console.log("\u{1F3E0} LayoutStep: Dispatching moveFloorPlanToLocation event for user location");
          window.dispatchEvent(floorPlanEvent);
          geocodeActions.setQuery(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          console.log("\u2705 LayoutStep: Location field updated");
        },
        (error) => {
          console.error("\u274C LayoutStep: Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5e3,
          maximumAge: 3e5
          // 5 λεπτά cache
        }
      );
    } else {
      console.error("\u274C LayoutStep: Geolocation is not supported by this browser");
    }
  };
  const handleLayoutLocationSearch = async () => {
    if (!layoutLocation.trim()) {
      console.log("\u{1F50D} LayoutStep: Empty search query");
      return;
    }
    console.log("\u{1F50D} LayoutStep: Starting location search for:", layoutLocation);
    await geocodeActions.search(layoutLocation);
  };
  const handleScaleFieldEdit = (field) => {
    setActiveScaleField(field);
  };
  const handleScaleFieldOk = (field) => {
    setActiveScaleField(null);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_layout8.Stack, { spacing: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Heading, { as: "h3", size: "lg", color: "primary", children: t("pipelines.steps.layout.title") }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      import_buttons7.Button,
      {
        variant: "primary",
        onClick: handleFindMyLocation,
        style: {
          width: "100%",
          backgroundColor: "#60a5fa",
          border: "none",
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "2px",
          fontWeight: "bold"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_icons8.LocationIcon, { size: "sm", theme: "neutral", style: { marginRight: "4px" } }),
          t("pipelines.steps.layout.findMyLocation")
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: {
      display: "flex",
      alignItems: "center",
      margin: "1px 0",
      gap: "2px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: {
        flex: 1,
        height: "1px",
        backgroundColor: "#dee2e6"
      } }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", color: "secondary", children: t("pipelines.steps.layout.or") }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { style: {
        flex: 1,
        height: "1px",
        backgroundColor: "#dee2e6"
      } })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { marginBottom: "2px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "base", weight: "bold", children: t("pipelines.steps.layout.searchLocation") }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "2px", position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          import_forms7.Input,
          {
            value: layoutLocation,
            onChange: (e) => geocodeActions.setQuery(e.target.value),
            placeholder: t("pipelines.steps.layout.locationPlaceholder"),
            size: "lg",
            variant: "outline",
            className: "layera-form-input",
            style: {
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "16px",
              width: "calc(100% - 50px)",
              border: "1px solid #dee2e6"
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          import_buttons7.Button,
          {
            variant: "primary",
            size: "lg",
            onClick: handleLayoutLocationSearch,
            disabled: isLoading || !layoutLocation.trim(),
            style: {
              backgroundColor: isLoading ? "#9ca3af" : "#60a5fa",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              fontWeight: "bold",
              width: "60px",
              position: "absolute",
              right: 0
            },
            children: isLoading ? "..." : "Go"
          }
        )
      ] }),
      results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { marginTop: "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", weight: "bold", style: { marginBottom: "8px" }, children: t("pipelines.steps.layout.results", { count: results.length }) }),
        results.map((result, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "div",
          {
            onClick: () => {
              console.log("\u{1F3AF} LayoutStep: Card clicked, selecting result:", result.displayName);
              geocodeActions.selectResult(result);
            },
            style: {
              cursor: "pointer",
              border: index === 0 ? "2px solid #3b82f6" : "1px solid #e5e7eb",
              backgroundColor: index === 0 ? "#f0f9ff" : "white",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "8px",
              transition: "all 0.2s ease"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.borderColor = "#3b82f6";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = index === 0 ? "#f0f9ff" : "white";
              e.currentTarget.style.borderColor = index === 0 ? "#3b82f6" : "#e5e7eb";
            },
            children: renderSearchResultItem(result, layoutLocation, index)
          },
          result.id
        ))
      ] })
    ] }),
    (selectedResult || results.length > 0 && !isLoading) && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "div",
      {
        style: {
          backgroundColor: "#ffffff",
          border: "2px solid #60a5fa",
          borderRadius: "12px",
          padding: "20px",
          marginTop: "16px",
          marginBottom: "16px"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          AddressBreakdownCard,
          {
            geocodeResult: selectedResult || results[0],
            title: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "base", weight: "bold", color: "primary", children: t("pipelines.steps.layout.addressBreakdown.title") }),
            config: {
              layout: "list",
              enableBoundarySearch: true,
              maxComponents: 8
            }
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "div",
      {
        style: {
          backgroundColor: "#ffffff",
          border: "2px solid #60a5fa",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "16px"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "base", weight: "bold", color: "primary", children: t("pipelines.steps.layout.placementTools.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", color: "secondary", children: t("pipelines.steps.layout.placementTools.description") }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { marginBottom: "16px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", weight: "bold", children: t("pipelines.steps.layout.placementTools.rotation") }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_layout8.Flex, { gap: "md", align: "center", justify: "center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                import_buttons7.Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setLayoutRotation(-90),
                  style: {
                    backgroundColor: "#d0d7de",
                    border: "1px solid #8c959f",
                    color: "#495057",
                    borderRadius: "6px",
                    padding: "8px 12px"
                  },
                  children: "-90\xB0"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_typography8.Text, { size: "sm", children: [
                layoutRotation,
                "\xB0"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                import_buttons7.Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setLayoutRotation(90),
                  style: {
                    backgroundColor: "#d0d7de",
                    border: "1px solid #8c959f",
                    color: "#495057",
                    borderRadius: "6px",
                    padding: "8px 12px"
                  },
                  children: "+90\xB0"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: {
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "8px",
            margin: "8px 0"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", weight: "bold", children: t("pipelines.steps.layout.placementTools.scale") }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: {
              display: "flex",
              gap: "4px",
              width: "100%",
              justifyContent: "space-between"
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", weight: "bold", children: t("pipelines.steps.layout.placementTools.units.cmToM") }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { display: "flex", gap: "2px", alignItems: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_forms7.Input,
                    {
                      type: "number",
                      value: layoutScaleWidth,
                      onChange: (e) => setLayoutScaleWidth(parseFloat(e.target.value) || 1),
                      onFocus: () => handleScaleFieldEdit("width"),
                      disabled: activeScaleField !== null && activeScaleField !== "width",
                      size: "sm",
                      variant: "outline",
                      className: "layera-form-input",
                      style: {
                        borderRadius: "4px",
                        padding: "4px 6px",
                        backgroundColor: activeScaleField === "width" ? "#ffffff" : "#f8f9fa",
                        border: "1px solid #dee2e6",
                        flex: 1,
                        fontSize: "10px",
                        minWidth: 0,
                        maxWidth: "50px"
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_buttons7.Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleScaleFieldOk("width"),
                      disabled: activeScaleField !== "width",
                      style: {
                        backgroundColor: activeScaleField === "width" ? "#60a5fa" : "#e9ecef",
                        border: `1px solid ${activeScaleField === "width" ? "#60a5fa" : "#ced4da"}`,
                        color: activeScaleField === "width" ? "white" : "#6c757d",
                        borderRadius: "4px",
                        padding: "6px",
                        fontSize: "10px",
                        minWidth: "24px",
                        maxWidth: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: "OK"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", weight: "bold", children: t("pipelines.steps.layout.placementTools.units.mmToM") }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { display: "flex", gap: "2px", alignItems: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_forms7.Input,
                    {
                      type: "number",
                      value: layoutScaleHeight,
                      onChange: (e) => setLayoutScaleHeight(parseFloat(e.target.value) || 1),
                      onFocus: () => handleScaleFieldEdit("height"),
                      disabled: activeScaleField !== null && activeScaleField !== "height",
                      size: "sm",
                      variant: "outline",
                      className: "layera-form-input",
                      style: {
                        borderRadius: "4px",
                        padding: "4px 6px",
                        backgroundColor: activeScaleField === "height" ? "#ffffff" : "#f8f9fa",
                        border: "1px solid #dee2e6",
                        flex: 1,
                        fontSize: "10px",
                        minWidth: 0,
                        maxWidth: "50px"
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_buttons7.Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleScaleFieldOk("height"),
                      disabled: activeScaleField !== "height",
                      style: {
                        backgroundColor: activeScaleField === "height" ? "#60a5fa" : "#e9ecef",
                        border: `1px solid ${activeScaleField === "height" ? "#60a5fa" : "#ced4da"}`,
                        color: activeScaleField === "height" ? "white" : "#6c757d",
                        borderRadius: "4px",
                        padding: "6px",
                        fontSize: "10px",
                        minWidth: "24px",
                        maxWidth: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: "OK"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_typography8.Text, { size: "sm", weight: "bold", children: t("pipelines.steps.layout.placementTools.units.mToM") }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { display: "flex", gap: "2px", alignItems: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_forms7.Input,
                    {
                      type: "number",
                      value: layoutScaleDepth,
                      onChange: (e) => setLayoutScaleDepth(parseFloat(e.target.value) || 1),
                      onFocus: () => handleScaleFieldEdit("depth"),
                      disabled: activeScaleField !== null && activeScaleField !== "depth",
                      size: "sm",
                      variant: "outline",
                      className: "layera-form-input",
                      style: {
                        borderRadius: "4px",
                        padding: "4px 6px",
                        backgroundColor: activeScaleField === "depth" ? "#ffffff" : "#f8f9fa",
                        border: "1px solid #dee2e6",
                        flex: 1,
                        fontSize: "10px",
                        minWidth: 0,
                        maxWidth: "50px"
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_buttons7.Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => handleScaleFieldOk("depth"),
                      disabled: activeScaleField !== "depth",
                      style: {
                        backgroundColor: activeScaleField === "depth" ? "#60a5fa" : "#e9ecef",
                        border: `1px solid ${activeScaleField === "depth" ? "#60a5fa" : "#ced4da"}`,
                        color: activeScaleField === "depth" ? "white" : "#6c757d",
                        borderRadius: "4px",
                        padding: "6px",
                        fontSize: "10px",
                        minWidth: "24px",
                        maxWidth: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: "OK"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_forms6.FormActions, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        import_buttons7.Button,
        {
          variant: "outline",
          onClick: onBack,
          className: "layera-unified-button",
          style: {
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            color: "#6c757d"
          },
          children: t("pipelines.steps.layout.actions.back")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        import_buttons7.Button,
        {
          variant: "primary",
          onClick: onNext,
          className: "layera-unified-button",
          style: {
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            fontWeight: "bold"
          },
          children: t("pipelines.steps.layout.actions.saveLocation")
        }
      )
    ] })
  ] });
};

// unified/steps/DetailsStep.tsx
var import_react9 = require("react");
var import_typography9 = require("@layera/typography");
var import_layout9 = require("@layera/layout");
var import_forms8 = require("@layera/forms");
var import_buttons8 = require("@layera/buttons");
var import_tolgee9 = require("@layera/tolgee");
var import_jsx_runtime10 = require("react/jsx-runtime");
var DetailsStep = ({ category, intent, onNext, onBack }) => {
  const { t } = (0, import_tolgee9.useLayeraTranslation)();
  const [title, setTitle] = (0, import_react9.useState)("");
  const [description, setDescription] = (0, import_react9.useState)("");
  const [price, setPrice] = (0, import_react9.useState)();
  const [salary, setSalary] = (0, import_react9.useState)();
  const [contactInfo, setContactInfo] = (0, import_react9.useState)("");
  const isProperty = category === "property";
  const isOffer = intent === "offer";
  const handleNext = () => {
    if (title && description && contactInfo) {
      onNext({
        title,
        description,
        price: isProperty ? price : void 0,
        salary: !isProperty ? salary : void 0,
        contactInfo
      });
    }
  };
  const isValid = title && description && contactInfo;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_layout9.Stack, { spacing: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_typography9.Heading, { as: "h2", size: "xl", color: "primary", children: t("pipelines.steps.details.title", {
      type: isProperty ? t("pipelines.steps.details.property") : t("pipelines.steps.details.job")
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_typography9.Text, { size: "lg", color: "secondary", children: t("pipelines.steps.details.subtitle", {
      intent: isOffer ? t("pipelines.steps.details.offer") : t("pipelines.steps.details.search")
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_layout9.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_forms8.FormField, { label: t("pipelines.steps.details.fields.title"), required: true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_forms8.Input,
        {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          placeholder: isProperty ? t("pipelines.steps.details.placeholders.propertyTitle") : t("pipelines.steps.details.placeholders.jobTitle"),
          size: "lg",
          variant: "outline"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_forms8.FormField, { label: t("pipelines.steps.details.fields.description"), required: true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_forms8.TextArea,
        {
          value: description,
          onChange: (e) => setDescription(e.target.value),
          placeholder: t("pipelines.steps.details.placeholders.description"),
          rows: 4,
          size: "lg",
          variant: "outline"
        }
      ) }),
      isProperty && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_forms8.FormField, { label: t("pipelines.steps.details.fields.price"), required: isOffer, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_forms8.Input,
        {
          type: "number",
          value: price || "",
          onChange: (e) => setPrice(e.target.value ? parseInt(e.target.value) : void 0),
          placeholder: t("pipelines.steps.details.placeholders.price"),
          size: "lg",
          variant: "outline"
        }
      ) }),
      !isProperty && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_forms8.FormField, { label: t("pipelines.steps.details.fields.salary"), required: isOffer, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_forms8.Input,
        {
          type: "number",
          value: salary || "",
          onChange: (e) => setSalary(e.target.value ? parseInt(e.target.value) : void 0),
          placeholder: t("pipelines.steps.details.placeholders.salary"),
          size: "lg",
          variant: "outline"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_forms8.FormField, { label: t("pipelines.steps.details.fields.contactInfo"), required: true, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_forms8.Input,
        {
          type: "text",
          value: contactInfo,
          onChange: (e) => setContactInfo(e.target.value),
          placeholder: t("pipelines.steps.details.placeholders.contact"),
          size: "lg",
          variant: "outline"
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_forms8.FormActions, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_buttons8.Button,
        {
          variant: "outline",
          size: "lg",
          onClick: onBack,
          children: t("pipelines.actions.back")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        import_buttons8.Button,
        {
          variant: "primary",
          size: "lg",
          onClick: handleNext,
          disabled: !isValid,
          children: t("pipelines.actions.continue")
        }
      )
    ] })
  ] });
};

// unified/steps/CompleteStep.tsx
var import_cards8 = require("@layera/cards");
var import_typography10 = require("@layera/typography");
var import_layout10 = require("@layera/layout");
var import_buttons9 = require("@layera/buttons");
var import_icons9 = require("@layera/icons");
var import_jsx_runtime11 = require("react/jsx-runtime");
var CompleteStep = ({
  category,
  intent,
  onComplete,
  onBack
}) => {
  const isProperty = category === "property";
  const isOffer = intent === "offer";
  const getSuccessMessage = () => {
    if (isProperty && isOffer) return "\u0397 \u03C0\u03C1\u03BF\u03C3\u03C6\u03BF\u03C1\u03AC \u03B1\u03BA\u03B9\u03BD\u03AE\u03C4\u03BF\u03C5 \u03C3\u03B1\u03C2 \u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03B8\u03B7\u03BA\u03B5 \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03CE\u03C2!";
    if (isProperty && !isOffer) return "\u03A4\u03BF Geo-Alert \u03C3\u03B1\u03C2 \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AE\u03B8\u03B7\u03BA\u03B5 \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03CE\u03C2!";
    if (!isProperty && isOffer) return "\u0397 \u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2 \u03C3\u03B1\u03C2 \u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03B8\u03B7\u03BA\u03B5 \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03CE\u03C2!";
    return "\u0397 \u03B1\u03AF\u03C4\u03B7\u03C3\u03B7 \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1\u03C2 \u03C3\u03B1\u03C2 \u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03B8\u03B7\u03BA\u03B5 \u03B5\u03C0\u03B9\u03C4\u03C5\u03C7\u03CE\u03C2!";
  };
  const getNextSteps = () => {
    if (isProperty && !isOffer) {
      return [
        "\u0398\u03B1 \u03BB\u03B1\u03BC\u03B2\u03AC\u03BD\u03B5\u03C4\u03B5 \u03B5\u03B9\u03B4\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9\u03C2 \u03CC\u03C4\u03B1\u03BD \u03B2\u03C1\u03B5\u03B8\u03BF\u03CD\u03BD \u03BD\u03AD\u03B1 \u03B1\u03BA\u03AF\u03BD\u03B7\u03C4\u03B1",
        "\u039C\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B4\u03B9\u03B1\u03C7\u03B5\u03B9\u03C1\u03B9\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03B1 alerts \u03C3\u03B1\u03C2 \u03B1\u03C0\u03CC \u03C4\u03BF \u03C0\u03C1\u03BF\u03C6\u03AF\u03BB",
        "\u039F\u03B9 \u03B5\u03B9\u03B4\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9\u03C2 \u03B8\u03B1 \u03C3\u03C4\u03B1\u03BB\u03BF\u03CD\u03BD \u03C3\u03C4\u03BF email \u03C3\u03B1\u03C2"
      ];
    }
    if (!isProperty && !isOffer) {
      return [
        "\u039F\u03B9 \u03B5\u03C1\u03B3\u03BF\u03B4\u03CC\u03C4\u03B5\u03C2 \u03B8\u03B1 \u03BC\u03C0\u03BF\u03C1\u03BF\u03CD\u03BD \u03BD\u03B1 \u03B4\u03BF\u03C5\u03BD \u03C4\u03BF \u03C0\u03C1\u03BF\u03C6\u03AF\u03BB \u03C3\u03B1\u03C2",
        "\u0398\u03B1 \u03BB\u03B1\u03BC\u03B2\u03AC\u03BD\u03B5\u03C4\u03B5 \u03B5\u03B9\u03B4\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9\u03C2 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03C4\u03AC\u03BB\u03BB\u03B7\u03BB\u03B5\u03C2 \u03B8\u03AD\u03C3\u03B5\u03B9\u03C2",
        "\u039C\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03BF \u03C0\u03C1\u03BF\u03C6\u03AF\u03BB \u03C3\u03B1\u03C2 \u03B1\u03BD\u03AC \u03C0\u03AC\u03C3\u03B1 \u03C3\u03C4\u03B9\u03B3\u03BC\u03AE"
      ];
    }
    return [
      "\u0397 \u03BA\u03B1\u03C4\u03B1\u03C7\u03CE\u03C1\u03B7\u03C3\u03AE \u03C3\u03B1\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BB\u03AD\u03BF\u03BD \u03B5\u03BD\u03B5\u03C1\u03B3\u03AE",
      "\u039F\u03B9 \u03B5\u03BD\u03B4\u03B9\u03B1\u03C6\u03B5\u03C1\u03CC\u03BC\u03B5\u03BD\u03BF\u03B9 \u03B8\u03B1 \u03BC\u03C0\u03BF\u03C1\u03BF\u03CD\u03BD \u03BD\u03B1 \u03C3\u03B1\u03C2 \u03B5\u03C0\u03B9\u03BA\u03BF\u03B9\u03BD\u03C9\u03BD\u03AE\u03C3\u03BF\u03C5\u03BD",
      "\u039C\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B4\u03B9\u03B1\u03C7\u03B5\u03B9\u03C1\u03B9\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03B7\u03BD \u03BA\u03B1\u03C4\u03B1\u03C7\u03CE\u03C1\u03B7\u03C3\u03B7 \u03B1\u03C0\u03CC \u03C4\u03BF \u03C0\u03C1\u03BF\u03C6\u03AF\u03BB \u03C3\u03B1\u03C2"
    ];
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_layout10.Stack, { spacing: "lg", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_cards8.BaseCard, { variant: "outlined", size: "lg", padding: "lg", className: "layera-unified-card", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_layout10.Stack, { spacing: "lg", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_icons9.CheckIcon, { size: "xl", theme: "success" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_typography10.Heading, { as: "h2", size: "xl", color: "success", children: "\u0395\u03C0\u03B9\u03C4\u03C5\u03C7\u03AE\u03C2 \u039F\u03BB\u03BF\u03BA\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7!" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_typography10.Text, { size: "lg", color: "secondary", children: getSuccessMessage() })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_cards8.BaseCard, { variant: "outlined", size: "lg", padding: "lg", className: "layera-unified-card", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_layout10.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_layout10.Flex, { align: "center", gap: "md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_icons9.AlertTriangleIcon, { size: "lg", theme: "primary" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_typography10.Heading, { as: "h3", size: "lg", color: "primary", children: "\u0395\u03C0\u03CC\u03BC\u03B5\u03BD\u03B1 \u0392\u03AE\u03BC\u03B1\u03C4\u03B1" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_layout10.Stack, { spacing: "sm", children: getNextSteps().map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_typography10.Text, { size: "base", color: "secondary", children: [
        "\u2022 ",
        step
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_layout10.Stack, { spacing: "md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_buttons9.Button,
        {
          variant: "primary",
          size: "lg",
          onClick: onComplete,
          style: { width: "100%" },
          children: "\u03A4\u03AD\u03BB\u03BF\u03C2"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_buttons9.Button,
        {
          variant: "outline",
          size: "lg",
          onClick: onBack,
          style: { width: "100%" },
          children: "\u03A0\u03AF\u03C3\u03C9 \u03B3\u03B9\u03B1 \u0391\u03BB\u03BB\u03B1\u03B3\u03AD\u03C2"
        }
      )
    ] })
  ] });
};

// unified/UnifiedPipelineModal.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var UnifiedPipelineModal = ({
  isOpen,
  onClose,
  onSubmit,
  container
}) => {
  const { t } = (0, import_tolgee10.useLayeraTranslation)();
  const containerFn = useModalContainer({
    preferredId: "layera-device-simulator-viewport",
    fallbackId: "root"
  });
  const { state, actions, can } = useUnifiedPipeline({ onSubmit, onClose });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const stepperSteps = (0, import_react10.useMemo)(() => {
    const baseSteps = createStepperConfig(state.category, t);
    const completedSteps = [];
    if (state.category) completedSteps.push("category");
    if (state.intent) completedSteps.push("intent");
    if (state.transactionType || state.employmentType) {
      completedSteps.push(state.category === "property" ? "transactionType" : "employmentType");
    }
    if (state.availability) completedSteps.push("availability");
    if (state.availabilityDetails) completedSteps.push("availabilityDetails");
    return updateStepCompletion(baseSteps, completedSteps);
  }, [state.category, state.intent, state.transactionType, state.employmentType, state.availability, state.availabilityDetails, t]);
  const currentStepIndex = getStepIndex(state.step, stepperSteps);
  const finalContainer = container !== void 0 ? container : containerFn;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_modals.Modal,
    {
      open: isOpen,
      onClose: actions.reset,
      size: "xs",
      variant: "centered",
      closeOnOverlayClick: true,
      closeOnEscape: true,
      showCloseButton: true,
      overlayClassName: "unified-pipeline-modal-overlay",
      className: "unified-pipeline-modal",
      panelPadding: "2px",
      overlayPadding: "2px",
      container: finalContainer,
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
        import_layout11.Stack,
        {
          spacing: "sm",
          style: {
            transform: "scale(0.7)",
            transformOrigin: "center"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_layout11.Flex, { justify: "between", align: "center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_typography11.Heading, { as: "h2", size: "xl", color: "primary", children: t("pipeline.newEntry.title") }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_layout11.Flex, { gap: "xs", children: [
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  import_buttons10.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: actions.reset,
                    children: "RESET"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  import_buttons10.Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: actions.reset,
                    style: {
                      minWidth: "32px",
                      height: "32px",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: "\u2715"
                  }
                )
              ] })
            ] }),
            stepperSteps.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: {
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              paddingBottom: "8px",
              marginBottom: "8px"
            }, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_progress_stepper.LayeraProgressStepper,
              {
                steps: stepperSteps,
                activeStep: currentStepIndex,
                orientation: "horizontal",
                alternativeLabel: false,
                sx: {
                  minWidth: "max-content",
                  width: "max-content",
                  paddingX: "8px",
                  "& .MuiStepLabel-label": {
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    lineHeight: "1.2",
                    whiteSpace: "nowrap"
                  },
                  "& .MuiStepLabel-iconContainer": {
                    paddingRight: "8px"
                  },
                  "& .MuiStepConnector-root": {
                    top: "16px"
                  },
                  "& .MuiStep-root": {
                    paddingLeft: 0,
                    paddingRight: "12px",
                    minWidth: "100px"
                  },
                  "& .MuiStepLabel-root": {
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px"
                  },
                  "& .MuiStepLabel-labelContainer": {
                    textAlign: "center",
                    maxWidth: "90px"
                  }
                }
              }
            ) }),
            state.step === "category" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(CategoryStep, { onNext: actions.setCategory }),
            state.step === "intent" && state.category && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              IntentStep,
              {
                category: state.category,
                onNext: actions.setIntent,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "transactionType" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              TransactionTypeStep,
              {
                onNext: actions.setTransactionType,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "employmentType" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              EmploymentTypeStep,
              {
                onNext: actions.setEmploymentType,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "availability" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              AvailabilityStep,
              {
                onNext: actions.setAvailability,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "availabilityDetails" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              AvailabilityDetailsStep,
              {
                availabilityDate: state.availabilityDetails?.date || null,
                availabilityDuration: state.availabilityDetails?.duration || null,
                availabilityDurationUnit: state.availabilityDetails?.unit || null,
                onDateChange: (date) => actions.setAvailabilityDetails(date, state.availabilityDetails?.duration || 1, state.availabilityDetails?.unit || "months"),
                onDurationChange: (duration) => actions.setAvailabilityDetails(state.availabilityDetails?.date || "", duration, state.availabilityDetails?.unit || "months"),
                onUnitChange: (unit) => actions.setAvailabilityDetails(state.availabilityDetails?.date || "", state.availabilityDetails?.duration || 1, unit),
                onNext: actions.locationReady,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "location" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              LocationStep,
              {
                category: state.category,
                intent: state.intent,
                availability: state.availability,
                onNext: actions.locationReady,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "layout" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              LayoutStep,
              {
                onNext: actions.layoutReady,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "details" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              DetailsStep,
              {
                category: state.category,
                onSubmit: actions.detailsReady,
                onBack: can.goBack ? actions.back : void 0
              }
            ),
            state.step === "complete" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              CompleteStep,
              {
                pipelineState: state,
                onClose: actions.reset
              }
            ),
            state.step === "category" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_forms9.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_buttons10.Button,
              {
                variant: "outline",
                onClick: actions.reset,
                children: t("pipelines.actions.cancel")
              }
            ) })
          ]
        }
      )
    }
  );
};

// unified/UnifiedPipelineContent.tsx
var import_react11 = require("react");
var import_layout12 = require("@layera/layout");
var import_buttons11 = require("@layera/buttons");
var import_forms10 = require("@layera/forms");
var import_typography12 = require("@layera/typography");
var import_progress_stepper2 = require("@layera/progress-stepper");
var import_tolgee11 = require("@layera/tolgee");
var import_jsx_runtime13 = require("react/jsx-runtime");
var UnifiedPipelineContent = ({
  onClose,
  onSubmit
}) => {
  const { t } = (0, import_tolgee11.useLayeraTranslation)();
  const { state, actions, can } = useUnifiedPipeline({ onSubmit, onClose });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const stepperSteps = (0, import_react11.useMemo)(() => {
    const baseSteps = createStepperConfig(state.category, t);
    const completedSteps = [];
    if (state.category) completedSteps.push("category");
    if (state.intent) completedSteps.push("intent");
    if (state.transactionType || state.employmentType) {
      completedSteps.push(state.category === "property" ? "transactionType" : "employmentType");
    }
    if (state.availability) completedSteps.push("availability");
    if (state.availabilityDetails) completedSteps.push("availabilityDetails");
    return updateStepCompletion(baseSteps, completedSteps);
  }, [state.category, state.intent, state.transactionType, state.employmentType, state.availability, state.availabilityDetails, t]);
  const currentStepIndex = getStepIndex(state.step, stepperSteps);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    import_layout12.Stack,
    {
      spacing: "sm",
      style: {
        height: "100%",
        overflow: "auto",
        backgroundColor: "transparent",
        padding: "12px"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: {
          backgroundColor: "var(--layera-bg-primary)",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "8px"
        }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_layout12.Flex, { justify: "between", align: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_typography12.Heading, { as: "h2", size: "xl", color: "primary", children: t("pipeline.newEntry.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_layout12.Flex, { gap: "xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_buttons11.Button,
              {
                variant: "outline",
                size: "sm",
                onClick: actions.reset,
                children: "RESET"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_buttons11.Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: actions.reset,
                style: {
                  minWidth: "32px",
                  height: "32px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                children: "\u2715"
              }
            )
          ] })
        ] }) }),
        stepperSteps.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: {
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          paddingBottom: "8px",
          marginBottom: "8px"
        }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          import_progress_stepper2.LayeraProgressStepper,
          {
            steps: stepperSteps,
            activeStep: currentStepIndex,
            orientation: "horizontal",
            alternativeLabel: false,
            sx: {
              minWidth: "max-content",
              width: "max-content",
              paddingX: "8px",
              "& .MuiStepLabel-label": {
                fontSize: "0.75rem",
                fontWeight: "500",
                lineHeight: "1.2",
                whiteSpace: "nowrap"
              },
              "& .MuiStepLabel-iconContainer": {
                paddingRight: "8px"
              },
              "& .MuiStepConnector-root": {
                top: "16px"
              },
              "& .MuiStep-root": {
                paddingLeft: 0,
                paddingRight: "12px",
                minWidth: "100px"
              },
              "& .MuiStepLabel-root": {
                flexDirection: "column",
                alignItems: "center",
                gap: "4px"
              },
              "& .MuiStepLabel-labelContainer": {
                textAlign: "center",
                maxWidth: "90px"
              }
            }
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { style: {
          backgroundColor: "var(--layera-bg-primary)",
          borderRadius: "8px",
          padding: "16px"
        }, children: [
          state.step === "category" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CategoryStep, { onNext: actions.setCategory }),
          state.step === "intent" && state.category && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            IntentStep,
            {
              category: state.category,
              onNext: actions.setIntent,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "transactionType" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            TransactionTypeStep,
            {
              onNext: actions.setTransactionType,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "employmentType" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            EmploymentTypeStep,
            {
              onNext: actions.setEmploymentType,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "availability" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            AvailabilityStep,
            {
              onNext: actions.setAvailability,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "availabilityDetails" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            AvailabilityDetailsStep,
            {
              availabilityDate: state.availabilityDetails?.date || null,
              availabilityDuration: state.availabilityDetails?.duration || null,
              availabilityDurationUnit: state.availabilityDetails?.unit || null,
              onDateChange: (date) => actions.setAvailabilityDetails(date, state.availabilityDetails?.duration || 1, state.availabilityDetails?.unit || "months"),
              onDurationChange: (duration) => actions.setAvailabilityDetails(state.availabilityDetails?.date || "", duration, state.availabilityDetails?.unit || "months"),
              onUnitChange: (unit) => actions.setAvailabilityDetails(state.availabilityDetails?.date || "", state.availabilityDetails?.duration || 1, unit),
              onNext: actions.locationReady,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "location" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            LocationStep,
            {
              category: state.category,
              intent: state.intent,
              availability: state.availability,
              onNext: actions.locationReady,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "layout" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            LayoutStep,
            {
              onNext: actions.layoutReady,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "details" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            DetailsStep,
            {
              category: state.category,
              onSubmit: actions.detailsReady,
              onBack: can.goBack ? actions.back : void 0
            }
          ),
          state.step === "complete" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            CompleteStep,
            {
              pipelineState: state,
              onClose: actions.reset
            }
          ),
          state.step === "category" && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_forms10.FormActions, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            import_buttons11.Button,
            {
              variant: "outline",
              onClick: actions.reset,
              children: t("pipelines.actions.cancel")
            }
          ) })
        ] })
      ]
    }
  );
};

// src/index.ts
var LAYERA_PIPELINES_VERSION = "1.0.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvailabilityDetailsStep,
  AvailabilityStep,
  CategoryStep,
  CompleteStep,
  DetailsStep,
  EmploymentTypeStep,
  IntentStep,
  LAYERA_PIPELINES_VERSION,
  LayoutStep,
  LocationStep,
  TransactionTypeStep,
  UnifiedPipelineContent,
  UnifiedPipelineModal,
  createStepperConfig,
  getStepIndex,
  updateStepCompletion,
  useIsDeviceSimulation,
  useMediaQuery,
  useModalContainer,
  useUnifiedPipeline
});
//# sourceMappingURL=index.js.map