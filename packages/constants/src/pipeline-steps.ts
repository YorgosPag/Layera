/**
 * Pipeline step constants for form/workflow management
 */

export const PIPELINE_STEP = {
  CATEGORY: 'category',
  MAP: 'map',
  UPLOAD: 'upload',
  CONFIRM: 'confirm',
  // Extended pipeline steps for Layera workflows
  LOCATION: 'location',
  DETAILS: 'details',
  PRICING: 'pricing',
  REVIEW: 'review',
  AREA_METHOD: 'area_method'
} as const;

export type PipelineStep = typeof PIPELINE_STEP[keyof typeof PIPELINE_STEP];

// Pipeline step metadata for enhanced workflow management
export const PIPELINE_STEP_METADATA = {
  [PIPELINE_STEP.CATEGORY]: {
    order: 1,
    title: 'Category Selection',
    description: 'Choose property category'
  },
  [PIPELINE_STEP.LOCATION]: {
    order: 2,
    title: 'Location',
    description: 'Set property location'
  },
  [PIPELINE_STEP.AREA_METHOD]: {
    order: 3,
    title: 'Area Method',
    description: 'Choose area measurement method'
  },
  [PIPELINE_STEP.MAP]: {
    order: 4,
    title: 'Map Drawing',
    description: 'Draw property boundaries'
  },
  [PIPELINE_STEP.DETAILS]: {
    order: 5,
    title: 'Property Details',
    description: 'Enter property information'
  },
  [PIPELINE_STEP.PRICING]: {
    order: 6,
    title: 'Pricing',
    description: 'Set property pricing'
  },
  [PIPELINE_STEP.UPLOAD]: {
    order: 7,
    title: 'Document Upload',
    description: 'Upload property documents'
  },
  [PIPELINE_STEP.REVIEW]: {
    order: 8,
    title: 'Review',
    description: 'Review all information'
  },
  [PIPELINE_STEP.CONFIRM]: {
    order: 9,
    title: 'Confirmation',
    description: 'Confirm and submit'
  }
} as const;