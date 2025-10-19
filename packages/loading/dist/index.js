import React from 'react';

/**
 * Spinner - Βασικό loading spinner component
 */
const Spinner = ({ size = 'md', variant = 'default', color, speed = 'normal', className = '' }) => {
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
                return (React.createElement("div", { className: spinnerClasses, style: spinnerStyle },
                    React.createElement("div", { className: "layera-spinner__dot" }),
                    React.createElement("div", { className: "layera-spinner__dot" }),
                    React.createElement("div", { className: "layera-spinner__dot" })));
            case 'pulse':
                return (React.createElement("div", { className: spinnerClasses, style: spinnerStyle },
                    React.createElement("div", { className: "layera-spinner__pulse" })));
            case 'ring':
                return (React.createElement("div", { className: spinnerClasses, style: spinnerStyle },
                    React.createElement("div", { className: "layera-spinner__ring" },
                        React.createElement("div", null),
                        React.createElement("div", null),
                        React.createElement("div", null),
                        React.createElement("div", null))));
            case 'bars':
                return (React.createElement("div", { className: spinnerClasses, style: spinnerStyle },
                    React.createElement("div", { className: "layera-spinner__bars" },
                        React.createElement("div", null),
                        React.createElement("div", null),
                        React.createElement("div", null),
                        React.createElement("div", null),
                        React.createElement("div", null))));
            default:
                return (React.createElement("div", { className: spinnerClasses, style: spinnerStyle },
                    React.createElement("svg", { className: "layera-spinner__circle", viewBox: "0 0 50 50", fill: "none" },
                        React.createElement("circle", { className: "layera-spinner__track", cx: "25", cy: "25", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "4", opacity: "0.2" }),
                        React.createElement("circle", { className: "layera-spinner__progress", cx: "25", cy: "25", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeDasharray: "31.416", strokeDashoffset: "31.416" }))));
        }
    };
    return renderSpinner();
};

/**
 * Skeleton - Βασικό skeleton component για loading placeholders
 */
const Skeleton = ({ width = '100%', height = '1em', variant = 'text', animation = 'wave', className = '' }) => {
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
    return (React.createElement("div", { className: skeletonClasses, style: skeletonStyle, "aria-hidden": "true" }));
};

/**
 * SkeletonText - Multi-line text skeleton
 */
const SkeletonText = ({ lines = 3, spacing = 'md', lastLineWidth = '75%', className = '' }) => {
    const containerClasses = [
        'layera-skeleton-text',
        `layera-skeleton-text--spacing-${spacing}`,
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: containerClasses }, Array.from({ length: lines }, (_, index) => (React.createElement(Skeleton, { key: index, variant: "text", width: index === lines - 1 ? lastLineWidth : '100%', animation: "wave" })))));
};

/**
 * LoadingSpinner - Enhanced spinner με overlay και message
 */
const LoadingSpinner = ({ overlay = false, message, centered = false, size = 'md', variant = 'default', color, speed = 'normal', className = '' }) => {
    const containerClasses = [
        'layera-loading-spinner',
        overlay && 'layera-loading-spinner--overlay',
        centered && 'layera-loading-spinner--centered',
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: containerClasses },
        React.createElement("div", { className: "layera-loading-spinner__content" },
            React.createElement(Spinner, { size: size, variant: variant, color: color, speed: speed }),
            message && (React.createElement("div", { className: "layera-loading-spinner__message" }, message)))));
};

export { LoadingSpinner, Skeleton, SkeletonText, Spinner };
//# sourceMappingURL=index.js.map
