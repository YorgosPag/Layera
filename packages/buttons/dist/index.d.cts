import React$1, { ReactNode, ComponentPropsWithoutRef } from 'react';

/**
 * Button size variants με WCAG 2.1 compliance
 * Minimum 44x44px για touch targets
 */
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 * Button visual variants - Enterprise design patterns
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
/**
 * Button loading state variants
 */
type ButtonLoadingVariant = 'spinner' | 'dots' | 'pulse';
/**
 * Icon position within button
 */
type IconPosition = 'left' | 'right' | 'only';
/**
 * Base button properties για accessibility και functionality
 */
interface BaseButtonProps {
    /** Button visual variant */
    variant?: ButtonVariant;
    /** Button size - affects padding, font-size, min-height */
    size?: ButtonSize;
    /** Full width button */
    fullWidth?: boolean;
    /** Loading state - shows spinner and disables interaction */
    loading?: boolean;
    /** Loading spinner variant */
    loadingVariant?: ButtonLoadingVariant;
    /** Loading text to show instead of children */
    loadingText?: string;
    /** Icon element to display */
    icon?: ReactNode;
    /** Icon position relative to text */
    iconPosition?: IconPosition;
    /** Additional CSS class names */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Children content */
    children?: ReactNode;
}
/**
 * Button component props που extend native button attributes
 */
interface ButtonProps extends BaseButtonProps, Omit<ComponentPropsWithoutRef<'button'>, keyof BaseButtonProps> {
    /** Button type - default is 'button' για accessibility */
    type?: 'button' | 'submit' | 'reset';
}
/**
 * Link button component props που extend native anchor attributes
 */
interface LinkButtonProps extends BaseButtonProps, Omit<ComponentPropsWithoutRef<'a'>, keyof BaseButtonProps> {
    /** Link destination */
    href: string;
    /** Link target */
    target?: string;
    /** Link relationship */
    rel?: string;
}
/**
 * Button group properties για related actions
 */
interface ButtonGroupProps {
    /** Button group orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Spacing between buttons */
    spacing?: ButtonSize;
    /** All buttons same size */
    uniform?: boolean;
    /** Additional CSS class names */
    className?: string;
    /** Children buttons */
    children: ReactNode;
}
/**
 * Button design tokens interface
 */
interface ButtonTokens {
    sizes: Record<ButtonSize, {
        height: string;
        padding: string;
        fontSize: string;
        iconSize: string;
        gap: string;
    }>;
    variants: Record<ButtonVariant, {
        background: string;
        color: string;
        border: string;
        hover: {
            background: string;
            color: string;
            border: string;
        };
        active: {
            background: string;
            color: string;
            border: string;
        };
        focus: {
            outline: string;
            ring: string;
        };
        disabled: {
            background: string;
            color: string;
            border: string;
        };
    }>;
    transitions: {
        default: string;
        fast: string;
        slow: string;
    };
    radius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
}

/**
 * Button Component - Enterprise Button για το Layera Design System
 *
 * Features:
 * - WCAG 2.1 Compliant (44x44px minimum για touch targets)
 * - Enterprise design variants (primary, secondary, outline, ghost, danger, success, warning, info)
 * - 5 responsive sizes (xs, sm, md, lg, xl)
 * - Loading states με spinner/dots/pulse animations
 * - Icon support με configurable positioning
 * - Full accessibility support με ARIA attributes
 * - TypeScript strict mode compatible
 */
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

/**
 * LinkButton Component - Button που λειτουργεί ως link
 *
 * Χρησιμοποιεί anchor tag αλλά με button styling για navigation actions
 * Ideal για external links, downloads, ή routing με semantic HTML
 */
declare const LinkButton: React$1.ForwardRefExoticComponent<LinkButtonProps & React$1.RefAttributes<HTMLAnchorElement>>;

/**
 * ButtonGroup Component - Ομαδοποιεί buttons για related actions
 *
 * Features:
 * - Horizontal ή vertical orientation
 * - Configurable spacing
 * - Uniform sizing option
 * - Proper border radius handling για connected look
 */
declare const ButtonGroup: React$1.FC<ButtonGroupProps>;

/**
 * useButton Hook - Παρέχει πρόσβαση στο Layera Button Design System
 *
 * Επιστρέφει τα button design tokens και utility functions
 * για programmatic χρήση των button standards
 */
declare const useButton: () => {
    tokens: ButtonTokens;
    getButtonStyles: ({ variant, size }: {
        variant?: ButtonVariant;
        size?: ButtonSize;
    }) => {
        height: string;
        padding: string;
        fontSize: string;
        backgroundColor: string;
        color: string;
        border: string;
        borderRadius: string;
        transition: string;
        fontFamily: string;
        fontWeight: string;
        cursor: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        gap: string;
    };
    getButtonClasses: ({ variant, size, fullWidth, loading, className }: {
        variant?: ButtonVariant;
        size?: ButtonSize;
        fullWidth?: boolean;
        loading?: boolean;
        className?: string;
    }) => string;
    getCSSCustomProperties: () => Record<string, string>;
};

export { BaseButtonProps, Button, ButtonGroup, ButtonGroupProps, ButtonLoadingVariant, ButtonProps, ButtonSize, ButtonTokens, ButtonVariant, IconPosition, LinkButton, LinkButtonProps, useButton };
