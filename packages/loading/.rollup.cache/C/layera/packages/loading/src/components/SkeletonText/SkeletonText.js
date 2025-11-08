import { jsx as _jsx } from "react/jsx-runtime";
import { Skeleton } from '../skeleton';
import { Box } from '@layera/layout';
import './SkeletonText.css';
/**
 * SkeletonText - Multi-line text skeleton
 */
export const SkeletonText = ({ lines = 3, spacing = 'md', lastLineWidth = '75%', className = '' }) => {
    const containerClasses = [
        'layera-skeleton-text',
        `layera-skeleton-text--spacing-${spacing}`,
        className
    ].filter(Boolean).join(' ');
    return (_jsx(Box, { className: containerClasses, children: Array.from({ length: lines }, (_, index) => (_jsx(Skeleton, { variant: "text", width: index === lines - 1 ? lastLineWidth : '100%', animation: "wave" }, index))) }));
};
//# sourceMappingURL=SkeletonText.js.map