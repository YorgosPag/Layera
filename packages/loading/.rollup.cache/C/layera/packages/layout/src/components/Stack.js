import { jsx as _jsx } from "react/jsx-runtime";
import { SPACING_SCALE } from '@layera/constants';
import { Box } from './Box';
const SPACING_VALUES = {
    xs: 'var(--la-space-1)', // 🎯 SST: XS spacing token
    sm: `${SPACING_SCALE.SM}px`,
    md: `${SPACING_SCALE.MD}px`,
    lg: 'var(--la-space-6)', // 🎯 SST: LG spacing (24px)
    xl: 'var(--la-space-layout-xl)' // 🎯 SST: XL spacing token
};
export const Stack = ({ children, spacing = 'md', direction = 'vertical', align = 'stretch', className, style }) => {
    const stackStyles = {
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
        gap: SPACING_VALUES[spacing],
        ...style
    };
    return (_jsx(Box, { className: className || "", style: stackStyles, children: children }));
};
//# sourceMappingURL=Stack.js.map