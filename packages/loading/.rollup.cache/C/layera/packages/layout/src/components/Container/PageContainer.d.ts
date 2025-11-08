import React from 'react';
export interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}
/**
 * PageContainer - Enterprise container για page content
 * Παρέχει consistent layout με responsive breakpoints
 */
export declare const PageContainer: React.FC<PageContainerProps>;
