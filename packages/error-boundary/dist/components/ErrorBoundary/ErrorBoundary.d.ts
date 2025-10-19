import React, { Component, ReactNode } from 'react';
import type { ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types';
/**
 * ErrorBoundary - Main error boundary component
 */
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    refs: Record<string, React.ReactInstance>;
    private resetTimeoutId;
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    componentDidUpdate(prevProps: ErrorBoundaryProps): void;
    componentWillUnmount(): void;
    resetErrorBoundary: () => void;
    render(): ReactNode;
}
//# sourceMappingURL=ErrorBoundary.d.ts.map