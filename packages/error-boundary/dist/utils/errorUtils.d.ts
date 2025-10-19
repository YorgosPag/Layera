import type { ErrorInfo } from 'react';
import type { ErrorReportData } from '../types';
/**
 * Error utilities για το Error Boundary System
 */
export declare const generateErrorId: () => string;
export declare const formatError: (error: Error) => string;
export declare const getErrorSeverity: (error: Error) => "low" | "medium" | "high" | "critical";
export declare const createErrorReport: (error: Error, errorInfo: ErrorInfo, errorId: string, additionalData?: Record<string, unknown>) => ErrorReportData;
export declare const sanitizeErrorForLogging: (error: Error) => Record<string, unknown>;
export declare const isNetworkError: (error: Error) => boolean;
export declare const isChunkError: (error: Error) => boolean;
export declare const isQuotaExceededError: (error: Error) => boolean;
//# sourceMappingURL=errorUtils.d.ts.map