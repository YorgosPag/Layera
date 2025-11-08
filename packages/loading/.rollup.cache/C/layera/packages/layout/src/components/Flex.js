import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
// Enterprise gap values aligned με @layera/constants SPACING_SCALE
const GAP_VALUES = {
    xxs: 'var(--la-space-1)', // 🎯 SST: XXS spacing token
    xs: 'var(--la-space-1)', // 🎯 SST: XS spacing token
    sm: 'var(--la-space-2)', // 8px
    md: 'var(--la-space-4)', // 16px
    lg: 'var(--la-space-6)', // 🎯 SST: LG spacing (24px)
    xl: 'var(--la-space-layout-xl)', // 🎯 SST: XL spacing token
    xxl: 'var(--la-space-12)', // 🎯 SST: XXL spacing token
    xxxl: 'var(--la-space-16)' // 🎯 SST: XXXL spacing token
};
export const Flex = React.forwardRef(({ children, direction = 'row', align = 'start', justify = 'start', wrap = 'nowrap', gap, marginTop, marginBottom, marginLeft, marginRight, minHeight, backgroundColor, className, style, as = 'div', id, role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, onClick, onMouseEnter, onMouseLeave, ...restProps }, ref) => {
    const flexStyles = {
        display: 'flex',
        flexDirection: direction,
        alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
        justifyContent: justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify,
        flexWrap: wrap,
        gap: gap ? GAP_VALUES[gap] : undefined,
        marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
        marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
        marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
        marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight,
        minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
        backgroundColor,
        ...style
    };
    // Only safe DOM props - filter out React-specific layout props
    const { alignItems, justifyContent, flexDirection, flexWrap, backdropFilter, zIndex, overflowY, boxSizing, borderRadius, inset, position, ...filteredRestProps } = restProps;
    const domProps = {
        id,
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        onClick,
        onMouseEnter,
        onMouseLeave,
        ...filteredRestProps
    };
    const Component = as;
    return (_jsx(Component, { ref: ref, className: className, style: flexStyles, ...domProps, children: children }));
});
Flex.displayName = 'Flex';
//# sourceMappingURL=Flex.js.map