import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Box Component - Enterprise Layout Primitive
 *
 * 🌟 Universal layout primitive που ξεπερνά Material-UI Box και Chakra Box
 *
 * Features:
 * - Complete sizing system integration
 * - Type-safe width/height props
 * - CSS Custom Properties support
 * - Performance-optimized με memoization
 * - Enterprise-grade flexibility
 */
import React, { useMemo } from 'react';
import { SPACING_SCALE } from '@layera/constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getSizingValue } from '../sizing';
/**
 * Utility function για sizing value conversion
 */
const resolveSizingValue = (value) => {
    if (value === undefined)
        return undefined;
    // If it's a SizingToken, get the value
    if (typeof value === 'string' && value in SPACING_SCALE) {
        const result = getSizingValue(value);
        return typeof result === 'number' ? `${result}px` : result;
    }
    // If it's a number, add px
    if (typeof value === 'number') {
        return `${value}px`;
    }
    // If it's a string, return as-is (allows CSS values like '100%', 'auto', etc.)
    return value;
};
export const Box = React.forwardRef(({ children, width, height, minWidth, minHeight, maxWidth, maxHeight, marginTop, marginBottom, marginLeft, marginRight, margin, paddingTop, paddingBottom, paddingLeft, paddingRight, padding, backgroundColor, borderRadius, textAlign, boxSizing, animationDuration, gridTemplateColumns, display, alignItems, gap, fontSize, opacity, position, top, right, bottom, left, color, className, style, as: Component = 'div', id, role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, onClick, onMouseEnter, onMouseLeave, ...rest }, ref) => {
    // Memoized styles για performance
    const boxStyles = useMemo(() => {
        return {
            // Sizing properties
            width: resolveSizingValue(width),
            height: resolveSizingValue(height),
            minWidth: resolveSizingValue(minWidth),
            minHeight: resolveSizingValue(minHeight),
            maxWidth: resolveSizingValue(maxWidth),
            maxHeight: resolveSizingValue(maxHeight),
            // Layout properties - individual values override shorthand
            margin: typeof margin === 'number' ? `${margin}px` : margin,
            marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
            marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
            marginLeft: typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
            marginRight: typeof marginRight === 'number' ? `${marginRight}px` : marginRight,
            padding: typeof padding === 'number' ? `${padding}px` : padding,
            paddingTop: typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop,
            paddingBottom: typeof paddingBottom === 'number' ? `${paddingBottom}px` : paddingBottom,
            paddingLeft: typeof paddingLeft === 'number' ? `${paddingLeft}px` : paddingLeft,
            paddingRight: typeof paddingRight === 'number' ? `${paddingRight}px` : paddingRight,
            // Visual properties
            backgroundColor,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            textAlign,
            boxSizing,
            animationDuration: typeof animationDuration === 'number' ? `${animationDuration}ms` : animationDuration,
            gridTemplateColumns,
            display,
            alignItems,
            gap,
            fontSize,
            opacity,
            position,
            top,
            right,
            bottom,
            left,
            color,
            // Merge με user styles
            ...style
        };
    }, [width, height, minWidth, minHeight, maxWidth, maxHeight, margin, marginTop, marginBottom, marginLeft, marginRight, padding, paddingTop, paddingBottom, paddingLeft, paddingRight, backgroundColor, borderRadius, textAlign, boxSizing, animationDuration, gridTemplateColumns, display, alignItems, gap, fontSize, opacity, position, top, right, bottom, left, color, style]);
    // Filter out React-specific props that shouldn't go to DOM
    const { justifyContent, flexDirection, flexWrap, borderBottom, zIndex, boxShadow, ...filteredRest } = rest;
    // Only safe DOM props
    const domProps = {
        id,
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        onClick,
        onMouseEnter,
        onMouseLeave,
        ...filteredRest
    };
    return (_jsx(Component, { ref: ref, className: className, style: boxStyles, ...domProps, children: children }));
});
Box.displayName = 'Box';
//# sourceMappingURL=Box.js.map