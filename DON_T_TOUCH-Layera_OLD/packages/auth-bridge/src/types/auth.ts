import type { User } from 'firebase/auth';

/**
 * Υποστηριζόμενοι ρόλοι στο Layera authentication system
 * @see {@link https://layera.dev/docs/rbac | RBAC Documentation}
 */
export type UserRole = 'private' | 'broker' | 'builder' | 'admin';

/**
 * Κατάσταση MFA για χρήστη
 */
export interface MfaStatus {
  /** Εάν ο χρήστης έχει ενεργοποιημένο MFA */
  readonly enabled: boolean;
  /** Εάν απαιτείται MFA για τον τρέχοντα ρόλο */
  readonly required: boolean;
  /** Εάν ο χρήστης έχει ολοκληρώσει τη διαδικασία MFA */
  readonly verified: boolean;
  /** Τύπος MFA που χρησιμοποιείται */
  method?: 'sms' | 'totp' | 'email';
}

/**
 * Custom claims που αποθηκεύονται στο Firebase token
 */
export interface LayeraCustomClaims {
  /** Ρόλος χρήστη */
  readonly role: UserRole;
  /** Κατάσταση επαλήθευσης email */
  readonly emailVerified: boolean;
  /** Κατάσταση MFA */
  readonly mfaVerified: boolean;
  /** Timestamp τελευταίας ενημέρωσης claims */
  readonly lastUpdated: number;
}

/**
 * Εκτεταμένες πληροφορίες χρήστη με Layera-specific δεδομένα
 */
export interface LayeraUser extends User {
  /** Custom claims από το Layera system */
  readonly layeraClaims: LayeraCustomClaims;
  /** MFA status */
  readonly mfaStatus: MfaStatus;
}

/**
 * Παράμετροι αυθεντικοποίησης
 */
export interface AuthConfig {
  /** Firebase project ID */
  readonly projectId: string;
  /** API key */
  readonly apiKey: string;
  /** Auth domain */
  readonly authDomain: string;
  /** Storage bucket */
  readonly storageBucket?: string;
  /** Messaging sender ID */
  readonly messagingSenderId?: string;
  /** App ID */
  readonly appId?: string;
  /** Εάν απαιτείται email verification */
  readonly requireEmailVerification?: boolean;
  /** Εάν είναι ενεργοποιημένο το MFA */
  readonly mfaEnabled?: boolean;
  /** Default ρόλος για νέους χρήστες */
  readonly defaultRole?: UserRole;
}

/**
 * Κατάσταση authentication context
 */
export interface AuthState {
  /** Τρέχων χρήστης */
  readonly user: LayeraUser | null;
  /** Εάν το authentication φορτώνει */
  readonly loading: boolean;
  /** Τυχόν σφάλμα */
  readonly error: string | null;
  /** Εάν ο χρήστης είναι συνδεδεμένος */
  readonly isAuthenticated: boolean;
  /** Εάν το authentication έχει αρχικοποιηθεί */
  readonly initialized: boolean;
}

/**
 * Callbacks για authentication events
 */
export interface AuthCallbacks {
  /** Κλήση όταν ο χρήστης συνδέεται */
  readonly onSignIn?: (user: LayeraUser) => void;
  /** Κλήση όταν ο χρήστης αποσυνδέεται */
  readonly onSignOut?: () => void;
  /** Κλήση όταν αλλάζει ο ρόλος */
  readonly onRoleChange?: (newRole: UserRole, oldRole: UserRole) => void;
  /** Κλήση όταν αλλάζει η κατάσταση MFA */
  readonly onMfaChange?: (status: MfaStatus) => void;
}

/**
 * Αποτέλεσμα authentication operation
 */
export interface AuthResult<T = unknown> {
  /** Εάν η λειτουργία ήταν επιτυχής */
  readonly success: boolean;
  /** Δεδομένα αποτελέσματος */
  readonly data?: T;
  /** Μήνυμα σφάλματος */
  readonly error?: string;
}

/**
 * Παράμετροι για signup
 */
export interface SignUpParams {
  /** Email address */
  readonly email: string;
  /** Password */
  readonly password: string;
  /** Επιθυμητός ρόλος */
  readonly role?: UserRole;
  /** Επιπλέον metadata */
  readonly metadata?: Record<string, unknown>;
}

/**
 * Παράμετροι για signin
 */
export interface SignInParams {
  /** Email address */
  readonly email: string;
  /** Password */
  readonly password: string;
  /** Εάν θα θυμάται τη σύνδεση */
  readonly rememberMe?: boolean;
}