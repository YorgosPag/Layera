// Temporary type definitions for @layera packages
declare module '@layera/cards' {
  import { ReactNode } from 'react';

  export interface BaseCardProps {
    title?: string;
    children?: ReactNode;
    variant?: string;
    onClick?: () => void;
    onInfoClick?: () => void;
    className?: string;
    'data-testid'?: string;
    icon?: ReactNode;
  }

  export const BaseCard: React.FC<BaseCardProps>;
}

declare module '@layera/buttons' {
  import { ReactNode } from 'react';

  export interface ButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    disabled?: boolean;
  }

  export const Button: React.FC<ButtonProps>;
}

declare module '@layera/layout' {
  import { ReactNode, CSSProperties } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }

  export const Box: React.FC<BoxProps>;
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

declare module '@layera/icons' {
  import { ReactNode } from 'react';

  export interface IconProps {
    size?: 'sm' | 'md' | 'lg';
    theme?: 'neutral' | 'primary' | 'secondary';
  }

  export const LocationIcon: React.FC<IconProps>;
  export const MapIcon: React.FC<IconProps>;
  export const VillaIcon: React.FC<IconProps>;
  export const BriefcaseIcon: React.FC<IconProps>;
}

declare module '@layera/loading' {
  export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
  }

  export const Spinner: React.FC<SpinnerProps>;
}

declare module '@layera/tolgee' {
  export interface TranslationResult {
    t: (key: string) => string;
  }

  export function useLayeraTranslation(): TranslationResult;
}

declare module '@layera/box-shadows' {
  export const BOX_SHADOW_SCALE: {
    [key: string]: string;
  };
}

declare module '@layera/geo-core' {
  export interface GeoJSONFeatureCollection {
    type: 'FeatureCollection';
    features: Array<{
      type: 'Feature';
      geometry: {
        type: string;
        coordinates: unknown;
      };
      properties: Record<string, unknown>;
    }>;
  }
}