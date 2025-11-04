// Temporary type definitions for @layera packages - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
declare module '@layera/layout' {
  import { ReactNode, CSSProperties } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    role?: string;
    // Additional properties from existing patterns
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | string;
    [key: string]: unknown; // Allow any additional props
  }

  export interface FlexProps {
    children: React.ReactNode;
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    marginTop?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    minHeight?: string | number;
    backgroundColor?: string;
    className?: string;
    style?: React.CSSProperties;
    as?: 'div' | 'button' | 'span' | 'section' | 'article' | 'header' | 'footer' | 'nav';
    id?: string;
    role?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    // Additional properties from errors
    background?: string;
    border?: string;
    color?: string;
    cursor?: string;
    [key: string]: unknown; // Allow any additional props
  }

  export interface CommonProps {
    children?: ReactNode;
    layout?: string;
    header?: ReactNode;
    title?: string;
    subtitle?: string;
    variant?: string;
    actions?: ReactNode;
    maxWidth?: string;
    padding?: string;
    gap?: string;
    [key: string]: unknown; // Allow any additional props
  }

  export const Box: React.FC<BoxProps>;
  export const Flex: React.FC<FlexProps>;
  export const AppShell: React.FC<{ children: ReactNode; [key: string]: unknown; }>;
  export const Stack: React.FC<{ children: ReactNode; [key: string]: unknown; }>;
}

declare module '@layera/viewport' {
  export function useViewportWithOverride(): {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: string;
  };

  export const DeviceOverrideProvider: React.FC<{ children: React.ReactNode }>;
  export const useIPhone14ProMaxDetection: () => boolean;
}

declare module '@layera/cards' {
  import { ReactNode } from 'react';

  export interface BaseCardProps {
    title?: ReactNode;
    children?: ReactNode;
    variant?: string;
    onClick?: () => void;
    onInfoClick?: () => void;
    className?: string;
    'data-testid'?: string;
    icon?: ReactNode;
    // Additional properties from errors
    padding?: string;
    margin?: string;
    marginY?: string;
    marginLeft?: string;
    marginRight?: string;
    maxWidth?: string;
    borderWidth?: string;
    borderColor?: string;
    opacityMode?: string;
    [key: string]: unknown; // Allow any additional props
  }

  export interface CardGridProps {
    children?: ReactNode;
    title?: string;
    subtitle?: string;
    [key: string]: unknown; // Allow any additional props
  }

  export interface DashboardCardProps {
    children?: ReactNode;
    title?: string;
    variant?: string;
    onClick?: () => void | Promise<void>;
    [key: string]: unknown; // Allow any additional props
  }

  export const BaseCard: React.FC<BaseCardProps>;
  export const CardGrid: React.FC<CardGridProps>;
  export const DashboardCard: React.FC<DashboardCardProps>;
}

declare module '@layera/theme-switcher' {
  export interface ThemeSwitcherProps {
    [key: string]: unknown; // Allow any additional props
  }

  export const ThemeSwitcher: React.FC<ThemeSwitcherProps>;
  export const ThemeProvider: React.FC<{ children: React.ReactNode }>;
}

declare module '@layera/buttons' {
  import { ReactNode } from 'react';

  export interface ButtonProps {
    children?: ReactNode;
    onClick?: () => void | Promise<void>;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    disabled?: boolean;
  }

  export const Button: React.FC<ButtonProps>;
}

declare module '@layera/typography' {
  import { ReactNode } from 'react';

  export interface TextProps {
    children?: ReactNode;
    as?: string;
    marginLeft?: string;
    fontSize?: string;
    color?: string;
    fontWeight?: string;
    minWidth?: string;
    textAlign?: 'left' | 'center' | 'right' | string;
    [key: string]: unknown; // Allow any additional props
  }

  export const Text: React.FC<TextProps>;
}

declare module '@layera/loading' {
  export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
  }

  export const Spinner: React.FC<SpinnerProps>;
}

declare module '@layera/notifications' {
  export interface NotificationProps {
    [key: string]: unknown;
  }

  export const NotificationComponent: React.FC<NotificationProps>;
}

declare module '@layera/cursors' {
  export interface CursorProps {
    [key: string]: unknown;
  }

  export const CustomCursor: React.FC<CursorProps>;
}

declare module '@layera/constants' {
  export const BUTTON_VARIANTS: {
    [key: string]: string;
  };

  export const ICON_SIZES: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
    readonly XL: "xl";
    readonly MEDIUM: "md"; // Add MEDIUM as alias for MD
  };
}