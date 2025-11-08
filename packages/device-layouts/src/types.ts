import React from "react";
/**
 * Enterprise Responsive Layout Types - LEGO Systems Compliant
 *
 * ✅ Simplified responsive types χωρίς device simulation complexity
 * Single Source of Truth για responsive layout orchestration
 */

// Simplified Device Categories (mobile, tablet, desktop)
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Domain types για component props (NO any!)
export interface DrawnArea {
  id: string;
  type: 'polygon' | 'marker';
  coordinates: number[][];
  name: string;
  nameTemplate?: string;
  nameNumber?: number;
  area?: number;
  category: 'real_estate' | 'jobs';
  isVisible?: boolean;
  opacity?: number;
  metadata?: {
    price?: number;
    squareMeters?: number;
    rooms?: number;
    propertyType?: string;
    salary?: number;
    workingHours?: string;
    company?: string;
    jobType?: string;
  };
}

// Generic component props interface
export interface ComponentProps {
  [key: string]: unknown;
}

// Responsive Layout Configuration
export interface ResponsiveLayoutConfig {
  mobile: {
    layout: 'stacked' | 'overlay';
    direction: 'column';
  };
  tablet: {
    layout: 'split' | 'sidebar';
    direction: 'row';
  };
  desktop: {
    layout: 'split' | 'sidebar' | 'fullscreen';
    direction: 'row';
  };
}

// Navigation interfaces
export interface NavigationState {
  currentStep?: string;
  totalSteps?: number;
  stepIndex?: number;
  selectedCategory?: string;
  canGoNext?: boolean;
  canGoBack?: boolean;
}

export interface NavigationHandlers {
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  onStepClick?: (stepIndex: number) => void;
  onNewEntryClick?: () => void;
}

// FAB Configuration
export interface FABConfig {
  onClick?: () => void;
  icon?: React.ReactNode;
  hidden?: boolean;
}