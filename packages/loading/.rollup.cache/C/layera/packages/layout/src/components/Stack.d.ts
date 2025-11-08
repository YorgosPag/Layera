import React from 'react';
export interface StackProps {
    children: React.ReactNode;
    spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'vertical' | 'horizontal';
    align?: 'start' | 'center' | 'end' | 'stretch';
    className?: string;
    style?: React.CSSProperties;
}
export declare const Stack: React.FC<StackProps>;
