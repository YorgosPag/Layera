import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@layera/layout';
import './Spinner.css';
/**
 * Spinner - Βασικό loading spinner component
 */
export const Spinner = ({ size = 'md', variant = 'default', color, speed = 'normal', className = '' }) => {
    const spinnerClasses = [
        'layera-spinner',
        `layera-spinner--${size}`,
        `layera-spinner--${variant}`,
        `layera-spinner--speed-${speed}`,
        className
    ].filter(Boolean).join(' ');
    const spinnerStyle = color ? { color } : undefined;
    const renderSpinner = () => {
        switch (variant) {
            case 'dots':
                return (_jsxs(Box, { className: spinnerClasses, children: [_jsx(Box, { className: "layera-spinner__dot" }), _jsx(Box, { className: "layera-spinner__dot" }), _jsx(Box, { className: "layera-spinner__dot" })] }));
            case 'pulse':
                return (_jsx(Box, { className: spinnerClasses, children: _jsx(Box, { className: "layera-spinner__pulse" }) }));
            case 'ring':
                return (_jsx(Box, { className: spinnerClasses, children: _jsxs(Box, { className: "layera-spinner__ring", children: [_jsx(Box, {}), _jsx(Box, {}), _jsx(Box, {}), _jsx(Box, {})] }) }));
            case 'bars':
                return (_jsx(Box, { className: spinnerClasses, children: _jsxs(Box, { className: "layera-spinner__bars", children: [_jsx(Box, {}), _jsx(Box, {}), _jsx(Box, {}), _jsx(Box, {}), _jsx(Box, {})] }) }));
            default:
                return (_jsx(Box, { className: spinnerClasses, children: _jsxs("svg", { className: "layera-spinner__circle", viewBox: "0 0 50 50", fill: "none", children: [_jsx("circle", { className: "layera-spinner__track", cx: "25", cy: "25", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "4", opacity: "0.2" }), _jsx("circle", { className: "layera-spinner__progress", cx: "25", cy: "25", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeDasharray: "31.416", strokeDashoffset: "31.416" })] }) }));
        }
    };
    return renderSpinner();
};
//# sourceMappingURL=Spinner.js.map