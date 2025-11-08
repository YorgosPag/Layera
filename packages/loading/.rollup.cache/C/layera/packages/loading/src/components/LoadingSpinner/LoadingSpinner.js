import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from '../spinner';
import { Box } from '@layera/layout';
import './LoadingSpinner.css';
/**
 * LoadingSpinner - Enhanced spinner με overlay και message
 */
export const LoadingSpinner = ({ overlay = false, message, centered = false, size = 'md', variant = 'default', color, speed = 'normal', className = '' }) => {
    const containerClasses = [
        'layera-loading-spinner',
        overlay && 'layera-loading-spinner--overlay',
        centered && 'layera-loading-spinner--centered',
        className
    ].filter(Boolean).join(' ');
    return (_jsx(Box, { className: containerClasses, children: _jsxs(Box, { className: "layera-loading-spinner__content", children: [_jsx(Spinner, { size: size, variant: variant, color: color, speed: speed }), message && (_jsx(Box, { className: "layera-loading-spinner__message", children: message }))] }) }));
};
//# sourceMappingURL=LoadingSpinner.js.map