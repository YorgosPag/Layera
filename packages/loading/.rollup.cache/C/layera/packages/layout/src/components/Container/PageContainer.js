import { jsx as _jsx } from "react/jsx-runtime";
import { SPACING_SCALE } from '@layera/constants';
import { Box } from '../Box';
/**
 * PageContainer - Enterprise container για page content
 * Παρέχει consistent layout με responsive breakpoints
 */
export const PageContainer = ({ children, className = '', maxWidth = 'lg', padding = 'md' }) => {
    const containerClasses = [
        'layera-page-container',
        `layera-page-container--${maxWidth}`,
        `layera-page-container--padding-${padding}`,
        className
    ].filter(Boolean).join(' ');
    const styles = {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...(maxWidth === 'sm' && { maxWidth: 'var(--la-width-container-sm)' }), // 640px
        ...(maxWidth === 'md' && { maxWidth: 'var(--la-width-container-md)' }), // 768px
        ...(maxWidth === 'lg' && { maxWidth: 'var(--la-width-container-lg)' }), // 1024px
        ...(maxWidth === 'xl' && { maxWidth: 'var(--la-width-container-xl)' }), // 1280px
        ...(maxWidth === 'full' && { maxWidth: '100%' }),
        ...(padding === 'none' && { padding: '0' }),
        ...(padding === 'sm' && { padding: `${SPACING_SCALE.SM}px` }),
        ...(padding === 'md' && { padding: `${SPACING_SCALE.MD}px` }),
        ...(padding === 'lg' && { padding: 'var(--la-space-6)' }) // 🎯 SST: LG padding (24px)
    };
    return (_jsx(Box, { className: containerClasses, style: styles, children: children }));
};
//# sourceMappingURL=PageContainer.js.map