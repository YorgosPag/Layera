/**
 * review/types.ts - Review Step Domain Types
 *
 * Specific types για review step functionality
 */

import React from "react";
import type { StepProps, StepCardProps, ReviewType } from '../types';

// 🎯 REVIEW STEP SPECIFIC PROPS
export interface ReviewStepProps extends StepProps {
  /** Custom review action handler */
  onReviewAction?: (action: ReviewType) => void;

  /** Final submission handler */
  onSubmit?: (context: Record<string, unknown>) => void;

  /** Edit handler για specific step */
  onEditStep?: (stepId: string) => void;

  /** Variant για conditional rendering */
  variant?: 'property' | 'job';
}

// 🎯 REVIEW CARD SPECIFIC PROPS
export interface ReviewCardProps extends StepCardProps {
  /** Review type που αντιπροσωπεύει η κάρτα */
  reviewType: ReviewType;

  /** Review content data */
  reviewData: {
    stepId: string;
    stepName: string;
    selectedValue: string;
    isValid: boolean;
  };

  /** Category context for conditional rendering */
  category?: 'property' | 'job';

  /** Custom title override */
  title?: string;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Review action handler */
  onReviewAction?: (action: ReviewType, stepId: string) => void;

  /** Edit handler */
  onEdit?: (stepId: string) => void;

  /** Current review mode */
  reviewMode?: ReviewType;
}

// 🎯 REVIEW SUMMARY DATA
export interface ReviewSummaryItem {
  label: string;
  value: string;
  stepId: string;
  isValid: boolean;
  canEdit: boolean;
}

// 🎯 REVIEW CONTEXT
export interface ReviewContext {
  mode: ReviewType;
  summaryItems: ReviewSummaryItem[];
  isSubmittable: boolean;
  validationErrors: string[];
}

// 🎯 SUBMISSION DATA
export interface SubmissionData {
  pipeline: {
    category: string | null;
    intent: string | null;
    location: string | null;
    details: string | null;
    pricing: string | null;
  };
  metadata: {
    completedSteps: string[];
    timestamp: string;
    featureFlags: Record<string, boolean>;
  };
}