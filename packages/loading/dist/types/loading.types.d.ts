import { ReactNode } from 'react';
/**
 * Loading Types για το Layera Loading System
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'default' | 'dots' | 'pulse' | 'ring' | 'bars';
export type SkeletonAnimation = 'wave' | 'pulse' | 'none';
export interface SpinnerProps {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    color?: string;
    speed?: 'slow' | 'normal' | 'fast';
    className?: string;
}
export interface LoadingSpinnerProps extends SpinnerProps {
    overlay?: boolean;
    message?: string;
    centered?: boolean;
}
export interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'rectangular' | 'circular';
    animation?: SkeletonAnimation;
    className?: string;
}
export interface SkeletonTextProps {
    lines?: number;
    spacing?: 'sm' | 'md' | 'lg';
    lastLineWidth?: string | number;
    className?: string;
}
export interface SkeletonCardProps {
    showAvatar?: boolean;
    avatarSize?: SpinnerSize;
    showImage?: boolean;
    imageHeight?: string | number;
    textLines?: number;
    className?: string;
}
export interface ProgressBarProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'striped' | 'animated';
    color?: 'primary' | 'success' | 'warning' | 'error';
    className?: string;
}
export interface LoadingOverlayProps {
    visible: boolean;
    children?: ReactNode;
    spinner?: SpinnerProps;
    message?: string;
    backdrop?: 'transparent' | 'blur' | 'dark';
    className?: string;
}
//# sourceMappingURL=loading.types.d.ts.map