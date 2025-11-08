import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@layera/layout';
import './Skeleton.css';
/**
 * Skeleton - Βασικό skeleton component για loading placeholders
 */
export const Skeleton = ({ width = '100%', height = '1em', variant = 'text', animation = 'wave', className = '' }) => {
    const skeletonClasses = [
        'layera-skeleton',
        `layera-skeleton--${variant}`,
        animation !== 'none' && `layera-skeleton--${animation}`,
        className
    ].filter(Boolean).join(' ');
    const skeletonStyle = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
    };
    return (_jsx(Box, { className: skeletonClasses, "aria-hidden": "true", width: width, height: height }));
};
//# sourceMappingURL=Skeleton.js.map