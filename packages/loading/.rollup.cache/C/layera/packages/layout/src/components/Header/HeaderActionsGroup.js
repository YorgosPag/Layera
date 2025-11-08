import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '../Box';
/**
 * HeaderActionsGroup - Container για header actions με proper spacing
 */
export const HeaderActionsGroup = ({ children, className = '' }) => {
    const classes = [
        'layera-header-actions-group',
        className
    ].filter(Boolean).join(' ');
    return (_jsx(Box, { className: classes, children: children }));
};
//# sourceMappingURL=HeaderActionsGroup.js.map