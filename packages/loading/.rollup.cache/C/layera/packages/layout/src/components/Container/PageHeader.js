import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SPACING_SCALE } from '@layera/constants';
import { Box } from '../Box';
/**
 * PageHeader - Enterprise header για pages
 * Παρέχει consistent styling για page titles και actions
 */
export const PageHeader = ({ title, subtitle, children, className = '', actions }) => {
    const headerClasses = [
        'layera-page-header',
        className
    ].filter(Boolean).join(' ');
    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: `${SPACING_SCALE.XL}px`,
        paddingBottom: `${SPACING_SCALE.MD}px`,
        borderBottom: '1px solid var(--color-border-default)'
    };
    const titleStyles = {
        margin: 0,
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: 'var(--la-text-primary)'
    };
    const subtitleStyles = {
        margin: 'var(--la-space-margin-xs-0)', // 🎯 SST: XS 0 0 0 margin
        fontSize: '1rem',
        color: 'var(--la-text-secondary)'
    };
    return (_jsxs("header", { className: headerClasses, style: styles, children: [_jsxs(Box, { children: [_jsx("h1", { style: titleStyles, children: title }), subtitle && _jsx("p", { style: subtitleStyles, children: subtitle }), children] }), actions && (_jsx(Box, { display: "flex", gap: `${SPACING_SCALE.SM}px`, alignItems: "center", children: actions }))] }));
};
//# sourceMappingURL=PageHeader.js.map