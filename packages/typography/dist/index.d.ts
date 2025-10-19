import React$1 from 'react';

type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type TextColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'muted' | 'success' | 'warning' | 'danger' | 'info';
type LineHeight = 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
interface TypographyProps {
    size?: FontSize;
    weight?: FontWeight;
    align?: TextAlign;
    color?: TextColor;
    lineHeight?: LineHeight;
    className?: string;
    children: React.ReactNode;
}
interface HeadingProps extends TypographyProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
interface TextProps extends TypographyProps {
    as?: 'p' | 'span' | 'div' | 'label';
}
interface TypographyScale {
    fontSizes: Record<FontSize, string>;
    fontWeights: Record<FontWeight, number>;
    lineHeights: Record<LineHeight, number>;
    letterSpacing: Record<FontSize, string>;
}

/**
 * Text Component - Βασικό text component για το Layera Design System
 *
 * Χρησιμοποιείται για paragraphs, labels, spans και άλλα text elements
 * με ενιαία typography standards
 */
declare const Text: React$1.FC<TextProps>;

/**
 * Heading Component - Enterprise heading component για το Layera Design System
 *
 * Δημιουργεί semantic headings (h1-h6) με ενιαία typography standards
 * και προκαθορισμένα styles για enterprise εφαρμογές
 */
declare const Heading: React$1.FC<HeadingProps>;

/**
 * useTypography Hook - Παρέχει πρόσβαση στο Layera Typography Scale
 *
 * Επιστρέφει τα typography tokens και utility functions
 * για programmatic χρήση των typography standards
 */
declare const useTypography: () => {
    scale: TypographyScale;
    getTypographyStyles: ({ size, weight, lineHeight }: {
        size?: FontSize;
        weight?: FontWeight;
        lineHeight?: LineHeight;
    }) => {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
        letterSpacing: string;
        fontFamily: string;
    };
    getTypographyClasses: ({ size, weight, lineHeight, color, align }: {
        size?: FontSize;
        weight?: FontWeight;
        lineHeight?: LineHeight;
        color?: string;
        align?: string;
    }) => string;
    getCSSCustomProperties: () => {
        '--layera-font-family-sans': string;
        '--layera-font-family-mono': string;
    };
};

export { type FontSize, type FontWeight, Heading, type HeadingProps, type LineHeight, Text, type TextAlign, type TextColor, type TextProps, type TypographyProps, type TypographyScale, useTypography };
