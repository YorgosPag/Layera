import React from "react";
import { ReactNode, ErrorInfo } from 'react';

/**
 * Error Types για το Layera Error Boundary System
 */

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo, retry: () => React.ReactNode) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRetry?: () => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  isolate?: boolean;
  level?: 'page' | 'section' | 'component';
  className?: string;
}

export interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  retry: () => React.ReactNode;
  level?: 'page' | 'section' | 'component';
  className?: string;
}

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  errorId: string;
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

export interface ErrorReportProps {
  error: Error;
  errorInfo: ErrorInfo;
  errorId: string;
  onReport?: (data: ErrorReportData) => void;
  className?: string;
}

export interface ErrorReportData {
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  errorInfo: {
    componentStack: string;
  };
  errorId: string;
  timestamp: number;
  userAgent: string;
  url: string;
  userId?: string;
  additionalData?: Record<string, unknown>;
}