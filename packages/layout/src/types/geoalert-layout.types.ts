/**
 * GeoAlert Layout System Types
 * Enterprise layout types για GeoAlert step system
 */

export type GeoAlertCardLayoutVariant =
  | 'horizontal'     // Κάρτες δίπλα-δίπλα
  | 'vertical'       // Κάρτες κάθετα (fallback)
  | 'smart-triple';  // 3 κάρτες: 2+1 arrangement

export interface GeoAlertLayoutConfig {
  /** Stepper height σε pixels */
  stepperHeight: number;

  /** Gap μεταξύ stepper και καρτών σε pixels */
  stepperToCardsGap: number;

  /** Gap μεταξύ καρτών σε pixels */
  cardsGap: number;

  /** Ύψος κάθε κάρτας σε pixels */
  cardHeight: number;

  /** Side margins σε pixels */
  sideMargins: number;
}

export interface GeoAlertCalculatedPositions {
  /** Top position για κάρτες */
  cardsTop: string;

  /** Top position για InfoPanel */
  infoPanelTop: string;

  /** Left position */
  left: string;

  /** Right position */
  right: string;

  /** Gap μεταξύ καρτών */
  gap: string;
}

export interface GeoAlertCardContainerProps {
  /** Layout variant */
  variant?: GeoAlertCardLayoutVariant;

  /** Custom CSS class */
  className?: string;

  /** Children (κάρτες) */
  children: React.ReactNode;
}

export interface GeoAlertInfoPanelProps {
  /** Αν είναι mobile ή desktop */
  isMobile?: boolean;

  /** Custom CSS class */
  className?: string;

  /** Children (InfoPanel content) */
  children: React.ReactNode;
}