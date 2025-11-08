import React from 'react';
export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    className?: string;
    actions?: React.ReactNode;
}
/**
 * PageHeader - Enterprise header για pages
 * Παρέχει consistent styling για page titles και actions
 */
export declare const PageHeader: React.FC<PageHeaderProps>;
