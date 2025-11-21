/**
 * 📂 LAYERA DATA IMPORT CLASS - Data Import component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το data import component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Data Import components
 */

import {
  DATA_IMPORT_VARIABLES,
  ImportStepType,
  ImportStepState,
  ImportValidationLevel,
  ImportProgressState,
  ImportFileType,
  ImportMappingState
} from './data-import.variables';

import {
  DATA_IMPORT_VARIANTS,
  ImportStepVariant,
  ValidationVariant,
  FieldMappingVariant,
  ImportStatusVariant,
  ProgressBarVariant,
  ImportButtonVariant,
  ImportContainerVariant
} from './data-import.variants';

// DATA IMPORT COMPONENT SYSTEM CLASS - Enterprise structure
export class DataImportComponentSystem {
  // Component tokens και variants
  static readonly variables = DATA_IMPORT_VARIABLES;
  static readonly variants = DATA_IMPORT_VARIANTS;

  // Validation methods για type safety
  static isValidStepType(stepType: string): stepType is ImportStepType {
    return ['file-selection', 'data-preview', 'field-mapping', 'validation', 'import-progress', 'summary'].includes(stepType);
  }

  static isValidStepState(stepState: string): stepState is ImportStepState {
    return ['pending', 'active', 'completed', 'error', 'disabled'].includes(stepState);
  }

  static isValidValidationLevel(level: string): level is ImportValidationLevel {
    return ['error', 'warning', 'success', 'info'].includes(level);
  }

  static isValidProgressState(state: string): state is ImportProgressState {
    return ['idle', 'processing', 'success', 'error', 'paused'].includes(state);
  }

  static isValidFileType(fileType: string): fileType is ImportFileType {
    return ['csv', 'excel', 'json', 'xml', 'text'].includes(fileType);
  }

  static isValidMappingState(state: string): state is ImportMappingState {
    return ['unmapped', 'mapped', 'auto-mapped', 'error', 'required'].includes(state);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για import step
  static getImportStepCSS(
    stepState: ImportStepState = 'pending',
    stepType: ImportStepType = 'file-selection'
  ) {
    const stepVariant = this.variants.steps[stepState] || this.variants.steps.pending;

    return {
      // Core step styles
      backgroundColor: stepVariant.background,
      color: stepVariant.textColor,
      border: stepVariant.border,
      borderRadius: stepVariant.borderRadius,
      width: stepVariant.size,
      height: stepVariant.size,

      // Transition
      transition: this.variables['import-step-transition'],

      // Connector styles
      connectorColor: this.variables['import-step-connector-color'],
      connectorWidth: this.variables['import-step-connector-width'],

      // Usage information
      usage: stepVariant.usage,
      stepType,
      stepState,
    };
  }

  // Helper για File Selector CSS generation
  static getFileSelectorCSS(
    state: 'default' | 'hover' | 'dragover' = 'default'
  ) {
    const selectorVariant = this.variants.fileSelector[state];

    return {
      backgroundColor: selectorVariant.background,
      border: selectorVariant.border,
      borderStyle: selectorVariant.borderStyle,
      borderRadius: selectorVariant.borderRadius,
      padding: selectorVariant.padding,
      minHeight: selectorVariant.minHeight,
      color: selectorVariant.textColor,
      iconColor: selectorVariant.iconColor,

      // Icon styling
      iconSize: this.variables['import-file-selector-icon-size'],

      // Transition
      transition: this.variables['import-transition-duration'],

      usage: selectorVariant.usage,
    };
  }

  // Helper για Validation Message CSS
  static getValidationMessageCSS(
    level: ImportValidationLevel = 'error'
  ) {
    const validationVariant = this.variants.validation[level];

    return {
      backgroundColor: validationVariant.background,
      border: validationVariant.border,
      color: validationVariant.textColor,
      borderRadius: validationVariant.borderRadius,
      padding: validationVariant.padding,
      iconSize: validationVariant.iconSize,

      // Container styling
      containerPadding: this.variables['import-validation-container-padding'],

      usage: validationVariant.usage,
    };
  }

  // Helper για Field Mapping CSS
  static getFieldMappingCSS(
    mappingState: ImportMappingState = 'unmapped'
  ) {
    // Map ImportMappingState to FieldMappingVariant
    const stateMapping: Record<ImportMappingState, FieldMappingVariant> = {
      unmapped: 'unmapped',
      mapped: 'mapped',
      'auto-mapped': 'mapped',
      error: 'error',
      required: 'unmapped',
    };

    const variantKey = stateMapping[mappingState];
    const mappingVariant = this.variants.fieldMapping[variantKey];

    return {
      backgroundColor: mappingVariant.background,
      border: mappingVariant.border,
      borderRadius: mappingVariant.borderRadius,
      padding: mappingVariant.padding,
      color: mappingVariant.textColor,

      // Container styling
      containerBackground: this.variables['import-mapping-container-background'],
      containerPadding: this.variables['import-mapping-container-padding'],
      containerGap: this.variables['import-mapping-container-gap'],

      // Connector styling
      connectorColor: this.variables['import-mapping-connector-color'],
      connectorWidth: this.variables['import-mapping-connector-width'],
      connectorStyle: this.variables['import-mapping-connector-style'],

      usage: mappingVariant.usage,
      mappingState,
    };
  }

  // Helper για Progress Bar CSS
  static getProgressBarCSS(
    progressState: ImportProgressState = 'idle',
    percentage: number = 0
  ) {
    // Map ImportProgressState to ProgressBarVariant
    const stateMapping: Record<ImportProgressState, ProgressBarVariant> = {
      idle: 'default',
      processing: 'default',
      success: 'success',
      error: 'error',
      paused: 'warning',
    };

    const variantKey = stateMapping[progressState];
    const progressVariant = this.variants.progress[variantKey];

    return {
      backgroundColor: progressVariant.background,
      fillColor: progressVariant.fill,
      height: progressVariant.height,
      borderRadius: progressVariant.borderRadius,
      transition: progressVariant.transition,
      textColor: progressVariant.textColor,
      percentageColor: progressVariant.percentageColor,

      // Progress value
      percentage: Math.max(0, Math.min(100, percentage)),

      // Animation for processing state
      ...(progressState === 'processing' && {
        animation: this.variables['import-loading-animation'],
      }),

      usage: progressVariant.usage,
      progressState,
    };
  }

  // Helper για Import Status Indicator CSS
  static getStatusIndicatorCSS(
    status: ImportProgressState = 'idle'
  ) {
    // Map ImportProgressState to ImportStatusVariant
    const stateMapping: Record<ImportProgressState, ImportStatusVariant> = {
      idle: 'pending',
      processing: 'processing',
      success: 'success',
      error: 'error',
      paused: 'warning',
    };

    const variantKey = stateMapping[status];
    const statusVariant = this.variants.status[variantKey];

    return {
      backgroundColor: statusVariant.background,
      color: statusVariant.textColor,

      // Animation for processing state
      ...(status === 'processing' && {
        animation: statusVariant.animation,
      }),

      usage: statusVariant.usage,
    };
  }

  // Helper για Import Action Button CSS
  static getActionButtonCSS(
    actionType: ImportButtonVariant = 'next'
  ) {
    const buttonVariant = this.variants.buttons[actionType];

    return {
      backgroundColor: buttonVariant.background,
      color: buttonVariant.textColor,

      // Container styling
      containerPadding: this.variables['import-actions-container-padding'],
      containerGap: this.variables['import-actions-gap'],
      containerBorderTop: this.variables['import-actions-border-top'],

      usage: buttonVariant.usage,
    };
  }

  // Helper για Complete Import Wizard CSS
  static getImportWizardCSS(
    currentStep: ImportStepType = 'file-selection',
    responsive: 'mobile' | 'desktop' = 'desktop'
  ) {
    const containerVariant = this.variants.containers.wizard;
    const responsiveVariant = this.variants.responsive[responsive];

    return {
      // Container styles
      backgroundColor: containerVariant.background,
      border: containerVariant.border,
      padding: responsiveVariant.padding,
      gap: responsiveVariant.gap,
      minHeight: containerVariant.minHeight,

      // Current step styling
      currentStep,

      // Responsive adjustments
      responsive,

      // Transition
      transition: this.variables['import-transition-duration'],

      usage: containerVariant.usage,
    };
  }

  // Helper για Import Summary CSS
  static getImportSummaryCSS(
    summaryData: {
      totalRecords: number;
      successCount: number;
      errorCount: number;
      warningCount: number;
    }
  ) {
    const summaryVariant = this.variants.containers.summary;

    return {
      backgroundColor: summaryVariant.background,
      border: summaryVariant.border,
      borderRadius: summaryVariant.borderRadius,
      padding: summaryVariant.padding,
      gap: summaryVariant.gap,

      // Color coding for different counts
      successColor: this.variables['import-summary-success-color'],
      errorColor: this.variables['import-summary-error-color'],
      warningColor: this.variables['import-summary-warning-color'],
      totalColor: this.variables['import-summary-total-color'],

      // Summary data
      ...summaryData,

      usage: summaryVariant.usage,
    };
  }

  // Utility για validation combinations
  static validateImportConfig(config: {
    stepType?: ImportStepType;
    stepState?: ImportStepState;
    fileType?: ImportFileType;
    validationLevel?: ImportValidationLevel;
  }) {
    const {
      stepType = 'file-selection',
      stepState = 'pending',
      fileType = 'csv',
      validationLevel = 'success'
    } = config;

    return {
      isValid:
        this.isValidStepType(stepType) &&
        this.isValidStepState(stepState) &&
        this.isValidFileType(fileType) &&
        this.isValidValidationLevel(validationLevel),
      stepType: this.isValidStepType(stepType) ? stepType : 'file-selection',
      stepState: this.isValidStepState(stepState) ? stepState : 'pending',
      fileType: this.isValidFileType(fileType) ? fileType : 'csv',
      validationLevel: this.isValidValidationLevel(validationLevel) ? validationLevel : 'success',
    };
  }

  // Helper για generating CSS class names
  static generateImportClassName(
    component: 'wizard' | 'step' | 'file-selector' | 'progress' | 'validation' | 'mapping',
    variant?: string,
    state?: string
  ): string {
    const baseClass = `layera-import-${component}`;
    const variantClass = variant ? `layera-import-${component}--${variant}` : '';
    const stateClass = state ? `layera-import-${component}--${state}` : '';

    return [baseClass, variantClass, stateClass].filter(Boolean).join(' ');
  }

  // Debug helper για development
  static debugImport(config: Parameters<typeof this.validateImportConfig>[0]) {
    const validation = this.validateImportConfig(config);
    const stepCSS = this.getImportStepCSS(validation.stepState, validation.stepType);
    const progressCSS = this.getProgressBarCSS('processing', 50);
    const className = this.generateImportClassName('wizard', 'default', validation.stepState);

    return {
      validation,
      css: {
        step: stepCSS,
        progress: progressCSS,
      },
      className,
      variables: this.variables,
    };
  }
}

// LAYERA DATA IMPORT CSS CLASSES - Ready-to-use CSS classes
export const LAYERA_DATA_IMPORT_CSS = `
/* 📂 LAYERA DATA IMPORT CORE STYLES */
.layera-import-wizard {
  background: ${DATA_IMPORT_VARIABLES['import-wizard-background']};
  border: ${DATA_IMPORT_VARIABLES['import-wizard-border']};
  padding: ${DATA_IMPORT_VARIABLES['import-wizard-padding']};
  gap: ${DATA_IMPORT_VARIABLES['import-wizard-gap']};
  min-height: ${DATA_IMPORT_VARIABLES['import-wizard-min-height']};
  display: flex;
  flex-direction: column;
  border-radius: ${DATA_IMPORT_VARIABLES['import-container-border-radius']};
  box-shadow: ${DATA_IMPORT_VARIABLES['import-container-shadow']};
}

/* IMPORT STEP STYLES */
.layera-import-step {
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${DATA_IMPORT_VARIABLES['import-step-size']};
  height: ${DATA_IMPORT_VARIABLES['import-step-size']};
  border-radius: ${DATA_IMPORT_VARIABLES['import-step-border-radius']};
  border: 2px solid;
  transition: ${DATA_IMPORT_VARIABLES['import-step-transition']};
  font-weight: 600;
  position: relative;
}

.layera-import-step--pending {
  background: ${DATA_IMPORT_VARIABLES['import-step-background']};
  color: ${DATA_IMPORT_VARIABLES['import-step-text-color']};
  border-color: ${DATA_IMPORT_VARIABLES['import-step-border']};
}

.layera-import-step--active {
  background: ${DATA_IMPORT_VARIABLES['import-step-background-active']};
  color: ${DATA_IMPORT_VARIABLES['import-step-text-active']};
  border-color: ${DATA_IMPORT_VARIABLES['import-step-border-active']};
}

.layera-import-step--completed {
  background: ${DATA_IMPORT_VARIABLES['import-step-background-completed']};
  color: ${DATA_IMPORT_VARIABLES['import-step-text-completed']};
  border-color: ${DATA_IMPORT_VARIABLES['import-step-border-active']};
}

/* FILE SELECTOR STYLES */
.layera-import-file-selector {
  background: ${DATA_IMPORT_VARIABLES['import-file-selector-background']};
  border: 2px ${DATA_IMPORT_VARIABLES['import-file-selector-border-style']} ${DATA_IMPORT_VARIABLES['import-file-selector-border']};
  border-radius: ${DATA_IMPORT_VARIABLES['import-file-selector-border-radius']};
  padding: ${DATA_IMPORT_VARIABLES['import-file-selector-padding']};
  min-height: ${DATA_IMPORT_VARIABLES['import-file-selector-min-height']};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${DATA_IMPORT_VARIABLES['import-file-selector-text-color']};
  transition: ${DATA_IMPORT_VARIABLES['import-transition-duration']} ${DATA_IMPORT_VARIABLES['import-transition-easing']};
  cursor: pointer;
}

.layera-import-file-selector:hover {
  background: ${DATA_IMPORT_VARIABLES['import-file-selector-background-hover']};
}

.layera-import-file-selector--dragover {
  background: ${DATA_IMPORT_VARIABLES['import-file-selector-background-dragover']};
  border-color: ${DATA_IMPORT_VARIABLES['import-file-selector-border-dragover']};
  color: ${DATA_IMPORT_VARIABLES['import-file-selector-text-dragover']};
}

/* VALIDATION MESSAGE STYLES */
.layera-import-validation {
  padding: ${DATA_IMPORT_VARIABLES['import-validation-padding']};
  border-radius: ${DATA_IMPORT_VARIABLES['import-validation-border-radius']};
  border: 1px solid;
  display: flex;
  align-items: center;
  gap: ${DATA_IMPORT_VARIABLES['import-validation-container-gap']};
}

.layera-import-validation--error {
  background: ${DATA_IMPORT_VARIABLES['import-validation-error-background']};
  border-color: ${DATA_IMPORT_VARIABLES['import-validation-error-border']};
  color: ${DATA_IMPORT_VARIABLES['import-validation-error-text']};
}

.layera-import-validation--warning {
  background: ${DATA_IMPORT_VARIABLES['import-validation-warning-background']};
  border-color: ${DATA_IMPORT_VARIABLES['import-validation-warning-border']};
  color: ${DATA_IMPORT_VARIABLES['import-validation-warning-text']};
}

.layera-import-validation--success {
  background: ${DATA_IMPORT_VARIABLES['import-validation-success-background']};
  border-color: ${DATA_IMPORT_VARIABLES['import-validation-success-border']};
  color: ${DATA_IMPORT_VARIABLES['import-validation-success-text']};
}

/* PROGRESS BAR STYLES */
.layera-import-progress {
  width: 100%;
  height: ${DATA_IMPORT_VARIABLES['import-progress-height']};
  background: ${DATA_IMPORT_VARIABLES['import-progress-background']};
  border-radius: ${DATA_IMPORT_VARIABLES['import-progress-border-radius']};
  overflow: hidden;
  position: relative;
}

.layera-import-progress-fill {
  height: 100%;
  background: ${DATA_IMPORT_VARIABLES['import-progress-fill']};
  border-radius: ${DATA_IMPORT_VARIABLES['import-progress-border-radius']};
  transition: ${DATA_IMPORT_VARIABLES['import-progress-transition']};
}

.layera-import-progress--success .layera-import-progress-fill {
  background: ${DATA_IMPORT_VARIABLES['import-progress-success-fill']};
}

.layera-import-progress--error .layera-import-progress-fill {
  background: ${DATA_IMPORT_VARIABLES['import-progress-error-fill']};
}

/* FIELD MAPPING STYLES */
.layera-import-mapping-field {
  background: ${DATA_IMPORT_VARIABLES['import-mapping-field-background']};
  border: 1px solid ${DATA_IMPORT_VARIABLES['import-mapping-field-border']};
  border-radius: ${DATA_IMPORT_VARIABLES['import-mapping-field-border-radius']};
  padding: ${DATA_IMPORT_VARIABLES['import-mapping-field-padding']};
  color: ${DATA_IMPORT_VARIABLES['import-mapping-field-text']};
  transition: ${DATA_IMPORT_VARIABLES['import-transition-duration']};
}

.layera-import-mapping-field--mapped {
  background: ${DATA_IMPORT_VARIABLES['import-mapping-field-background-mapped']};
  border-color: ${DATA_IMPORT_VARIABLES['import-mapping-field-border-mapped']};
  color: ${DATA_IMPORT_VARIABLES['import-mapping-field-text-mapped']};
}

/* LOADING STATES */
.layera-import--loading {
  opacity: ${DATA_IMPORT_VARIABLES['import-loading-opacity']};
  animation: ${DATA_IMPORT_VARIABLES['import-loading-animation']};
}

/* RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-import-wizard {
    padding: ${DATA_IMPORT_VARIABLES['import-mobile-padding']};
    gap: ${DATA_IMPORT_VARIABLES['import-mobile-gap']};
  }
}
`;

// Export για CSS integration
export { LAYERA_DATA_IMPORT_CSS as default };