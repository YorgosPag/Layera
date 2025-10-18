// Layera Typography System - Main Entry Point
// Enterprise Typography Package για το Layera Design System

// Types
export type {
  FontSize,
  FontWeight,
  TextAlign,
  TextColor,
  LineHeight,
  TypographyProps,
  HeadingProps,
  TextProps,
  TypographyScale
} from './types';

// Components
export { Text, Heading } from './components';

// Hooks
export { useTypography } from './hooks';

// CSS Styles - Αυτόματα import όταν χρησιμοποιείται το package
import './styles/index.css';