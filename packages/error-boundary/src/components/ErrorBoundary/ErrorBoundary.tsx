import React, { Component, ReactNode } from 'react';
import type { ErrorInfo } from 'react';
import { ErrorFallback } from '../ErrorFallback';
import { generateErrorId } from '../../utils';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types';

/**
 * ErrorBoundary - Main error boundary component
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: generateErrorId()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo
    });

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🛡️ ErrorBoundary caught an error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Error ID:', this.state.errorId);
      console.groupEnd();
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset error state if resetKeys changed
    if (hasError && resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => prevProps.resetKeys?.[index] !== key
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    // Reset error state if any props changed and resetOnPropsChange is true
    if (hasError && resetOnPropsChange) {
      const propsChanged = Object.keys(this.props).some(
        key => this.props[key as keyof ErrorBoundaryProps] !== prevProps[key as keyof ErrorBoundaryProps]
      );

      if (propsChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount(): void {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = (): void => {
    if (this.props.onRetry) {
      this.props.onRetry();
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, level = 'component', isolate = false, className = '' } = this.props;

    if (hasError && error && errorInfo) {
      // Custom fallback component/function
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, errorInfo, this.resetErrorBoundary);
        }
        return fallback;
      }

      // Default fallback
      return (
        <ErrorFallback
          error={error}
          errorInfo={errorInfo}
          retry={this.resetErrorBoundary}
          level={level}
          className={className}
        />
      );
    }

    // Isolate children in error boundary
    if (isolate) {
      return (
        <div className="layera-error-boundary-isolate">
          {children}
        </div>
      );
    }

    return children;
  }
}