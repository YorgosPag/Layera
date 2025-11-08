/**
 * pricing/types.ts - Pricing Step Domain Types
 *
 * Specific types για pricing step functionality
 */

import React from "react";
import type { StepProps, StepCardProps, PricingType } from '../types';

// 🎯 PRICING STEP SPECIFIC PROPS
export interface PricingStepProps extends StepProps {
  /** Custom pricing selection handler */
  onPricingSelected?: (pricing: PricingType) => void;

  /** Variant για conditional rendering */
  variant?: 'property' | 'job';
}

// 🎯 PRICING CARD SPECIFIC PROPS
export interface PricingCardProps extends StepCardProps {
  /** Pricing type που αντιπροσωπεύει η κάρτα */
  pricingType: PricingType;

  /** Category context for conditional rendering */
  category?: 'property' | 'job';

  /** Custom title override */
  title?: string;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Selection handler */
  onPricingSelect?: (pricing: PricingType) => void;

  /** Selected state */
  isSelected?: boolean;
}

// 🎯 PRICING OPTIONS CONFIGURATION
export interface PricingOption {
  id: string;
  type: PricingType;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isRecommended?: boolean;
  metadata?: {
    estimatedCost?: string;
    features?: string[];
    duration?: string;
  };
}

// 🎯 PRICING CONTEXT
export interface PricingContext {
  availableOptions: PricingOption[];
  selectedPricing: PricingType;
  category: 'property' | 'job';
  intent: 'offer' | 'search';
}