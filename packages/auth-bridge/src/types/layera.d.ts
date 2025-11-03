// Temporary type definitions for @layera packages
declare module '@layera/layout' {
  import { ReactNode, CSSProperties } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    role?: string;
  }

  export const Box: React.FC<BoxProps>;
}