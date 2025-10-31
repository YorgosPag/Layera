// Layera Icons - Type Definitions
// Enterprise pattern: Consistent type system για όλα τα εικονίδια

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export type IconVariant =
  | 'solid'        // Γεμάτο εικονίδιο
  | 'outline'      // Μόνο περίγραμμα
  | 'light'        // Λεπτό περίγραμμα
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
}

export interface IconDefinition {
  name: string;
  category: string;
  tags: string[];
  variants: {
    solid?: string;
    outline?: string;
    light?: string;
    duotone?: string;
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