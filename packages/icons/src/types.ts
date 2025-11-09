// Layera Icons - Type Definitions
// Enterprise pattern: Consistent type system για όλα τα εικονίδια

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | number;

export type IconVariant =
  | 'solid'        // Γεμάτο εικονίδιο
  | 'outline'      // Μόνο περίγραμμα
  | 'light'        // Λεπτό περίγραμμα
  | 'bold'         // Χοντρό περίγραμμα
  | 'duotone';     // Δύο χρώματα

export type IconTheme =
  | 'primary'      // Κύριο χρώμα Layera
  | 'secondary'    // Δευτερεύον χρώμα
  | 'success'      // Πράσινο για επιτυχία
  | 'warning'      // Πορτοκαλί για προειδοποίηση
  | 'danger'       // Κόκκινο για κίνδυνο
  | 'info'         // Μπλε για πληροφορίες
  | 'neutral';     // Γκρι για ουδέτερα στοιχεία

export interface BaseIconProps {
  size?: IconSize;
  variant?: IconVariant;
  theme?: IconTheme;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event?: React.MouseEvent<SVGSVGElement>) => void;
  'aria-label'?: string;
  title?: string;
  // 🏢 Enterprise features
  darkMode?: boolean;           // Dark theme support
  interactive?: boolean;        // Interactive hover/focus states
  disabled?: boolean;          // Disabled state
  focusable?: boolean;         // Keyboard focus support
  touchTarget?: 'mobile' | 'desktop'; // Touch target size
  contrast?: 'normal' | 'large' | 'enhanced'; // WCAG contrast level
  transition?: 'fast' | 'normal' | 'slow'; // Animation speed
}

export interface IconDefinition {
  name: string;
  category: string;
  tags: string[];
  variants: {
    solid?: string;
    outline?: string;
    light?: string;
    bold?: string;
    duotone?: string;
  };
  // 🏢 Enterprise metadata
  accessibility?: {
    description?: string;
    keywords?: string[];
  };
  interactive?: {
    hasHoverState?: boolean;
    hasFocusState?: boolean;
    hasActiveState?: boolean;
  };
}

// Κατηγορίες εικονιδίων
export type IconCategory =
  | 'navigation'   // Πλοήγηση
  | 'actions'      // Ενέργειες
  | 'interface'    // UI στοιχεία
  | 'maps'         // Χάρτες και γεωγραφικά
  | 'devices'      // Συσκευές
  | 'communication' // Επικοινωνία
  | 'files'        // Αρχεία
  | 'media'        // Πολυμέσα
  | 'weather'      // Καιρός
  | 'social'       // Κοινωνικά δίκτυα
  | 'business'     // Επιχειρηματικά
  | 'system';      // Σύστημα