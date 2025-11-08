import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '../Box';
/**
 * LayeraHeader - Standardized header component με flexible variants
 * για διαφορετικούς τύπους εφαρμογών
 */
export const LayeraHeader = ({ title, subtitle, logo, navigation, actions, variant = 'standard', sticky = true, className = '' }) => {
    const headerClasses = [
        'layera-header',
        `layera-header--${variant}`,
        sticky ? 'layera-header--sticky' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx(Box, { className: headerClasses, children: _jsxs(Box, { className: "layera-header__container", children: [_jsxs(Box, { className: "layera-header__left", children: [logo && (_jsx(Box, { className: "layera-header__logo", children: logo })), _jsxs(Box, { className: "layera-header__title-section", children: [_jsx("h1", { className: "layera-header__title", children: title }), subtitle && variant !== 'minimal' && (_jsx("p", { className: "layera-header__subtitle", children: subtitle }))] })] }), navigation && variant === 'rich' && (_jsx("nav", { className: "layera-header__navigation", role: "navigation", children: navigation })), actions && (_jsx(Box, { className: "layera-header__actions", children: actions }))] }) }));
};
//# sourceMappingURL=LayeraHeader.js.map