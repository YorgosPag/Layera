import type { User } from 'firebase/auth';
import type { LayeraCustomClaims, LayeraUser, MfaStatus, UserRole } from '../types/auth.js';
/**
 * Παίρνει τα custom claims από το Firebase token
 *
 * @param user - Firebase user
 * @returns Promise με τα custom claims
 */
export declare function getCustomClaims(user: User): Promise<LayeraCustomClaims>;
/**
 * Υπολογίζει την κατάσταση MFA για χρήστη
 *
 * @param claims - Custom claims
 * @returns MFA status
 */
export declare function calculateMfaStatus(claims: LayeraCustomClaims): MfaStatus;
/**
 * Μετατρέπει Firebase User σε LayeraUser
 *
 * @param user - Firebase user
 * @returns Promise με LayeraUser
 */
export declare function createLayeraUser(user: User): Promise<LayeraUser>;
/**
 * Ελέγχει εάν ο χρήστης έχει δικαίωμα πρόσβασης
 *
 * @param user - Layera user
 * @param requiredRole - Απαιτούμενος ρόλος
 * @returns Εάν έχει πρόσβαση
 */
export declare function hasAccess(user: LayeraUser | null, requiredRole?: UserRole): boolean;
/**
 * Ελέγχει εάν ο χρήστης χρειάζεται MFA verification
 *
 * @param user - Layera user
 * @returns Εάν χρειάζεται MFA
 */
export declare function requiresMfaVerification(user: LayeraUser | null): boolean;
/**
 * Ελέγχει εάν ο χρήστης είναι πλήρως αυθεντικοποιημένος
 *
 * @param user - Layera user
 * @returns Εάν είναι πλήρως authenticated
 */
export declare function isFullyAuthenticated(user: LayeraUser | null): boolean;
//# sourceMappingURL=claims.d.ts.map