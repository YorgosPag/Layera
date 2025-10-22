import React from 'react';

/**
 * DraggableFAB.tsx - Enterprise Draggable Floating Action Button
 *
 * Single source of truth για draggable functionality σε όλο το Layera ecosystem.
 * Εξαχθέν από GeoMapNew.tsx για reusability και modularity.
 */

interface DraggableFABProps {
    children: React.ReactNode;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    position?: 'fixed' | 'viewport-relative';
    initialPosition?: {
        x?: number;
        y?: number;
        right?: number;
        bottom?: number;
    };
    constrainToViewport?: boolean;
    viewportSelector?: string;
    className?: string;
    style?: React.CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
    title?: string;
}
/**
 * Enterprise DraggableFAB - Single Source of Truth
 * Υποστηρίζει viewport constraints, cross-device dragging, και responsive sizing
 */
declare const DraggableFAB: React.FC<DraggableFABProps>;

export { DraggableFAB, type DraggableFABProps };
