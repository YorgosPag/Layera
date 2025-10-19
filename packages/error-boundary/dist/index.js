import React, { useState, Component } from 'react';

/**
 * ErrorDetails - Detailed error information για debugging
 */
const ErrorDetails = ({ error, errorInfo, errorId, expanded = false, onToggle, className = '' }) => {
    const detailsClasses = [
        'layera-error-details',
        expanded && 'layera-error-details--expanded',
        className
    ].filter(Boolean).join(' ');
    const copyToClipboard = async () => {
        const errorReport = {
            errorId,
            timestamp: new Date().toISOString(),
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            componentStack: errorInfo.componentStack,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        try {
            await navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2));
            // Show success message (could integrate with notification system)
            console.log('Error details copied to clipboard');
        }
        catch (err) {
            console.error('Failed to copy error details:', err);
        }
    };
    return (React.createElement("div", { className: detailsClasses },
        React.createElement("div", { className: "layera-error-details__header" },
            React.createElement("h3", { className: "layera-error-details__title" }, "Error Details"),
            React.createElement("div", { className: "layera-error-details__actions" },
                React.createElement("button", { type: "button", className: "layera-error-details__copy", onClick: copyToClipboard, title: "Copy error details" },
                    React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                        React.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                        React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" }))),
                onToggle && (React.createElement("button", { type: "button", className: "layera-error-details__toggle", onClick: onToggle, title: expanded ? "Collapse details" : "Expand details" },
                    React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", style: {
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 150ms ease'
                        } },
                        React.createElement("polyline", { points: "6,9 12,15 18,9" })))))),
        expanded && (React.createElement("div", { className: "layera-error-details__content" },
            React.createElement("div", { className: "layera-error-details__section" },
                React.createElement("h4", { className: "layera-error-details__section-title" }, "Error Information"),
                React.createElement("div", { className: "layera-error-details__field" },
                    React.createElement("span", { className: "layera-error-details__label" }, "ID:"),
                    React.createElement("code", { className: "layera-error-details__value" }, errorId)),
                React.createElement("div", { className: "layera-error-details__field" },
                    React.createElement("span", { className: "layera-error-details__label" }, "Type:"),
                    React.createElement("code", { className: "layera-error-details__value" }, error.name)),
                React.createElement("div", { className: "layera-error-details__field" },
                    React.createElement("span", { className: "layera-error-details__label" }, "Message:"),
                    React.createElement("code", { className: "layera-error-details__value" }, error.message)),
                React.createElement("div", { className: "layera-error-details__field" },
                    React.createElement("span", { className: "layera-error-details__label" }, "Timestamp:"),
                    React.createElement("code", { className: "layera-error-details__value" }, new Date().toISOString()))),
            error.stack && (React.createElement("div", { className: "layera-error-details__section" },
                React.createElement("h4", { className: "layera-error-details__section-title" }, "Stack Trace"),
                React.createElement("pre", { className: "layera-error-details__stack" },
                    React.createElement("code", null, error.stack)))),
            errorInfo.componentStack && (React.createElement("div", { className: "layera-error-details__section" },
                React.createElement("h4", { className: "layera-error-details__section-title" }, "Component Stack"),
                React.createElement("pre", { className: "layera-error-details__stack" },
                    React.createElement("code", null, errorInfo.componentStack)))),
            React.createElement("div", { className: "layera-error-details__section" },
                React.createElement("h4", { className: "layera-error-details__section-title" }, "Environment"),
                React.createElement("div", { className: "layera-error-details__field" },
                    React.createElement("span", { className: "layera-error-details__label" }, "URL:"),
                    React.createElement("code", { className: "layera-error-details__value" }, window.location.href)),
                React.createElement("div", { className: "layera-error-details__field" },
                    React.createElement("span", { className: "layera-error-details__label" }, "User Agent:"),
                    React.createElement("code", { className: "layera-error-details__value" }, navigator.userAgent)))))));
};

/**
 * Error utilities για το Error Boundary System
 */
const generateErrorId = () => {
    return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
const formatError = (error) => {
    const { name, message, stack } = error;
    return `${name}: ${message}${stack ? `\n${stack}` : ''}`;
};
const getErrorSeverity = (error) => {
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    // Critical errors
    if (errorName.includes('security') ||
        errorName.includes('permission') ||
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('forbidden')) {
        return 'critical';
    }
    // High severity errors
    if (errorName.includes('network') ||
        errorName.includes('connection') ||
        errorName.includes('timeout') ||
        errorMessage.includes('failed to fetch') ||
        errorMessage.includes('network error')) {
        return 'high';
    }
    // Medium severity errors
    if (errorName.includes('type') ||
        errorName.includes('reference') ||
        errorName.includes('syntax') ||
        errorMessage.includes('undefined') ||
        errorMessage.includes('null')) {
        return 'medium';
    }
    // Default to low severity
    return 'low';
};
const createErrorReport = (error, errorInfo, errorId, additionalData) => {
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
const sanitizeErrorForLogging = (error) => {
    return {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: 'cause' in error ? error.cause : undefined
    };
};
const isNetworkError = (error) => {
    return (error.name === 'NetworkError' ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network request failed') ||
        error.message.includes('ERR_NETWORK') ||
        error.message.includes('ERR_INTERNET_DISCONNECTED'));
};
const isChunkError = (error) => {
    return (error.name === 'ChunkLoadError' ||
        error.message.includes('Loading chunk') ||
        error.message.includes('Loading CSS chunk'));
};
const isQuotaExceededError = (error) => {
    return (error.name === 'QuotaExceededError' ||
        error.message.includes('QuotaExceededError') ||
        error.message.includes('storage quota'));
};

/**
 * Error Messages & Constants για το Error Boundary System
 */
const ERROR_MESSAGES = {
    // Network errors
    NETWORK_TITLE: 'Σφάλμα Δικτύου',
    NETWORK_MESSAGE: 'Δεν μπορούμε να συνδεθούμε στο διαδίκτυο. Παρακαλώ ελέγξτε τη σύνδεσή σας.',
    NETWORK_RETRY: 'Επανάληψη σύνδεσης',
    // Chunk errors
    CHUNK_TITLE: 'Σφάλμα Φόρτωσης',
    CHUNK_MESSAGE: 'Υπήρξε πρόβλημα κατά τη φόρτωση των αρχείων. Παρακαλώ ανανεώστε τη σελίδα.',
    CHUNK_RETRY: 'Ανανέωση σελίδας',
    // Page level errors
    PAGE_TITLE: 'Σφάλμα Σελίδας',
    PAGE_MESSAGE: 'Η σελίδα αντιμετώπισε ένα απροσδόκητο σφάλμα και δεν μπορεί να φορτωθεί.',
    // Section level errors
    SECTION_TITLE: 'Σφάλμα Ενότητας',
    SECTION_MESSAGE: 'Αυτή η ενότητα αντιμετώπισε ένα σφάλμα και δεν μπορεί να εμφανιστεί.',
    // Component level errors
    COMPONENT_TITLE: 'Κάτι πήγε στραβά',
    COMPONENT_MESSAGE: 'Αυτό το στοιχείο αντιμετώπισε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.',
    // Generic retry
    GENERIC_RETRY: 'Δοκιμάστε ξανά',
    // Development
    SHOW_DETAILS: 'Εμφάνιση λεπτομερειών',
    HIDE_DETAILS: 'Απόκρυψη λεπτομερειών'
};
const ERROR_ICON_SIZES = {
    small: 24,
    medium: 32,
    large: 48,
    xl: 64
};
const ERROR_ANIMATION_DURATIONS = {
    fast: 150,
    normal: 300,
    slow: 500
};

/**
 * i18n Keys για το Error Boundary System
 */
const ERROR_I18N_KEYS = {
    // Network errors
    NETWORK_TITLE: 'errors.networkError',
    NETWORK_MESSAGE: 'errors.networkError',
    NETWORK_RETRY: 'notifications.retry',
    // Chunk errors
    CHUNK_TITLE: 'notifications.loading',
    CHUNK_MESSAGE: 'errors.unknownError',
    CHUNK_RETRY: 'notifications.tryAgain',
    // Page level errors
    PAGE_TITLE: 'common.error',
    PAGE_MESSAGE: 'errors.unknownError',
    // Section level errors
    SECTION_TITLE: 'common.error',
    SECTION_MESSAGE: 'errors.unknownError',
    // Component level errors
    COMPONENT_TITLE: 'notifications.somethingWentWrong',
    COMPONENT_MESSAGE: 'errors.unknownError',
    // Generic retry
    GENERIC_RETRY: 'notifications.tryAgain',
    // Development
    SHOW_DETAILS: 'actions.manage',
    HIDE_DETAILS: 'actions.cancel'
};

/**
 * ErrorFallback - Default fallback UI για errors
 */
const ErrorFallback = ({ error, errorInfo, retry, level = 'component', className = '' }) => {
    const [showDetails, setShowDetails] = useState(false);
    const severity = getErrorSeverity(error);
    const isNetwork = isNetworkError(error);
    const isChunk = isChunkError(error);
    const getErrorIcon = () => {
        if (isNetwork) {
            return (React.createElement("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
                React.createElement("path", { d: "M12 1v6m0 6v6" }),
                React.createElement("path", { d: "m21 12-6-3-6 3-6-3" })));
        }
        if (isChunk) {
            return (React.createElement("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                React.createElement("path", { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" }),
                React.createElement("polyline", { points: "14,2 14,8 20,8" }),
                React.createElement("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
                React.createElement("line", { x1: "16", y1: "17", x2: "8", y2: "17" }),
                React.createElement("polyline", { points: "10,9 9,9 8,9" })));
        }
        switch (severity) {
            case 'critical':
                return (React.createElement("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                    React.createElement("polygon", { points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" }),
                    React.createElement("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
                    React.createElement("line", { x1: "9", y1: "9", x2: "15", y2: "15" })));
            case 'high':
                return (React.createElement("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                    React.createElement("path", { d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" })));
            default:
                return (React.createElement("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" },
                    React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
                    React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
                    React.createElement("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })));
        }
    };
    const getErrorTitle = () => {
        if (isNetwork)
            return ERROR_MESSAGES.NETWORK_TITLE;
        if (isChunk)
            return ERROR_MESSAGES.CHUNK_TITLE;
        switch (level) {
            case 'page':
                return ERROR_MESSAGES.PAGE_TITLE;
            case 'section':
                return ERROR_MESSAGES.SECTION_TITLE;
            default:
                return ERROR_MESSAGES.COMPONENT_TITLE;
        }
    };
    const getErrorMessage = () => {
        if (isNetwork) {
            return ERROR_MESSAGES.NETWORK_MESSAGE;
        }
        if (isChunk) {
            return ERROR_MESSAGES.CHUNK_MESSAGE;
        }
        switch (level) {
            case 'page':
                return ERROR_MESSAGES.PAGE_MESSAGE;
            case 'section':
                return ERROR_MESSAGES.SECTION_MESSAGE;
            default:
                return ERROR_MESSAGES.COMPONENT_MESSAGE;
        }
    };
    const getRetryText = () => {
        if (isNetwork)
            return ERROR_MESSAGES.NETWORK_RETRY;
        if (isChunk)
            return ERROR_MESSAGES.CHUNK_RETRY;
        return ERROR_MESSAGES.GENERIC_RETRY;
    };
    const handleRetry = () => {
        if (isChunk) {
            window.location.reload();
        }
        else {
            retry();
        }
    };
    const fallbackClasses = [
        'layera-error-fallback',
        `layera-error-fallback--${level}`,
        `layera-error-fallback--${severity}`,
        isNetwork && 'layera-error-fallback--network',
        isChunk && 'layera-error-fallback--chunk',
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: fallbackClasses, role: "alert" },
        React.createElement("div", { className: "layera-error-fallback__content" },
            React.createElement("div", { className: "layera-error-fallback__icon" }, getErrorIcon()),
            React.createElement("div", { className: "layera-error-fallback__text" },
                React.createElement("h2", { className: "layera-error-fallback__title" }, getErrorTitle()),
                React.createElement("p", { className: "layera-error-fallback__message" }, getErrorMessage())),
            React.createElement("div", { className: "layera-error-fallback__actions" },
                React.createElement("button", { type: "button", className: "layera-error-fallback__retry", onClick: handleRetry }, getRetryText()),
                process.env.NODE_ENV === 'development' && (React.createElement("button", { type: "button", className: "layera-error-fallback__details-toggle", onClick: () => setShowDetails(!showDetails) }, showDetails ? ERROR_MESSAGES.HIDE_DETAILS : ERROR_MESSAGES.SHOW_DETAILS))),
            showDetails && (React.createElement(ErrorDetails, { error: error, errorInfo: errorInfo, errorId: `error-${Date.now()}`, expanded: true })))));
};

/**
 * ErrorBoundary - Main error boundary component
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.refs = {};
        this.resetTimeoutId = null;
        this.resetErrorBoundary = () => {
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
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            errorId: generateErrorId()
        };
    }
    componentDidCatch(error, errorInfo) {
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
    componentDidUpdate(prevProps) {
        const { resetKeys, resetOnPropsChange } = this.props;
        const { hasError } = this.state;
        // Reset error state if resetKeys changed
        if (hasError && resetKeys) {
            const hasResetKeyChanged = resetKeys.some((key, index) => prevProps.resetKeys?.[index] !== key);
            if (hasResetKeyChanged) {
                this.resetErrorBoundary();
            }
        }
        // Reset error state if any props changed and resetOnPropsChange is true
        if (hasError && resetOnPropsChange) {
            const propsChanged = Object.keys(this.props).some(key => this.props[key] !== prevProps[key]);
            if (propsChanged) {
                this.resetErrorBoundary();
            }
        }
    }
    componentWillUnmount() {
        if (this.resetTimeoutId) {
            clearTimeout(this.resetTimeoutId);
        }
    }
    render() {
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
            return (React.createElement(ErrorFallback, { error: error, errorInfo: errorInfo, retry: this.resetErrorBoundary, level: level, className: className }));
        }
        // Isolate children in error boundary
        if (isolate) {
            return (React.createElement("div", { className: "layera-error-boundary-isolate" }, children));
        }
        return children;
    }
}

export { ERROR_ANIMATION_DURATIONS, ERROR_I18N_KEYS, ERROR_ICON_SIZES, ERROR_MESSAGES, ErrorBoundary, ErrorDetails, ErrorFallback, createErrorReport, formatError, generateErrorId, getErrorSeverity, isChunkError, isNetworkError, isQuotaExceededError, sanitizeErrorForLogging };
//# sourceMappingURL=index.js.map
