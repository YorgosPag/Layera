import type { ErrorInfo } from 'react';
import type { ErrorReportData } from '../types';

/**
 * Error utilities για το Error Boundary System
 */

export const generateErrorId = (): string => {
  return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatError = (error: Error): string => {
  const { name, message, stack } = error;
  return `${name}: ${message}${stack ? `\n${stack}` : ''}`;
};

export const getErrorSeverity = (error: Error): 'low' | 'medium' | 'high' | 'critical' => {
  const errorName = error.name.toLowerCase();
  const errorMessage = error.message.toLowerCase();

  // Critical errors
  if (
    errorName.includes('security') ||
    errorName.includes('permission') ||
    errorMessage.includes('unauthorized') ||
    errorMessage.includes('forbidden')
  ) {
    return 'critical';
  }

  // High severity errors
  if (
    errorName.includes('network') ||
    errorName.includes('connection') ||
    errorName.includes('timeout') ||
    errorMessage.includes('failed to fetch') ||
    errorMessage.includes('network error')
  ) {
    return 'high';
  }

  // Medium severity errors
  if (
    errorName.includes('type') ||
    errorName.includes('reference') ||
    errorName.includes('syntax') ||
    errorMessage.includes('undefined') ||
    errorMessage.includes('null')
  ) {
    return 'medium';
  }

  // Default to low severity
  return 'low';
};

export const createErrorReport = (
  error: Error,
  errorInfo: ErrorInfo,
  errorId: string,
  additionalData?: Record<string, unknown>
): ErrorReportData => {
  return {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    },
    errorInfo: {
      componentStack: errorInfo.componentStack || ''
    },
    errorId,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    additionalData
  };
};

export const sanitizeErrorForLogging = (error: Error): Record<string, unknown> => {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: 'cause' in error ? (error as { cause: unknown }).cause : undefined
  };
};

export const isNetworkError = (error: Error): boolean => {
  return (
    error.name === 'NetworkError' ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('Network request failed') ||
    error.message.includes('ERR_NETWORK') ||
    error.message.includes('ERR_INTERNET_DISCONNECTED')
  );
};

export const isChunkError = (error: Error): boolean => {
  return (
    error.name === 'ChunkLoadError' ||
    error.message.includes('Loading chunk') ||
    error.message.includes('Loading CSS chunk')
  );
};

export const isQuotaExceededError = (error: Error): boolean => {
  return (
    error.name === 'QuotaExceededError' ||
    error.message.includes('QuotaExceededError') ||
    error.message.includes('storage quota')
  );
};