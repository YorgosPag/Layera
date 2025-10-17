/**
 * Παίρνει τα custom claims από το Firebase token
 *
 * @param user - Firebase user
 * @returns Promise με τα custom claims
 */
export async function getCustomClaims(user) {
    const tokenResult = await user.getIdTokenResult();
    const claims = tokenResult.claims;
    return {
        role: claims.role || 'private',
        emailVerified: Boolean(claims.emailVerified),
        mfaVerified: Boolean(claims.mfaVerified),
        lastUpdated: Number(claims.lastUpdated) || Date.now()
    };
}
/**
 * Υπολογίζει την κατάσταση MFA για χρήστη
 *
 * @param claims - Custom claims
 * @returns MFA status
 */
export function calculateMfaStatus(claims) {
    const requiresMfa = ['broker', 'builder', 'admin'].includes(claims.role);
    const status = {
        enabled: claims.mfaVerified,
        required: requiresMfa,
        verified: claims.mfaVerified
    };
    if (claims.mfaVerified) {
        status.method = 'totp';
    }
    return status;
}
/**
 * Μετατρέπει Firebase User σε LayeraUser
 *
 * @param user - Firebase user
 * @returns Promise με LayeraUser
 */
export async function createLayeraUser(user) {
    const claims = await getCustomClaims(user);
    const mfaStatus = calculateMfaStatus(claims);
    return {
        ...user,
        layeraClaims: claims,
        mfaStatus
    };
}
/**
 * Ελέγχει εάν ο χρήστης έχει δικαίωμα πρόσβασης
 *
 * @param user - Layera user
 * @param requiredRole - Απαιτούμενος ρόλος
 * @returns Εάν έχει πρόσβαση
 */
export function hasAccess(user, requiredRole) {
    if (!user)
        return false;
    if (!requiredRole)
        return true;
    const roleHierarchy = ['private', 'broker', 'builder', 'admin'];
    const userRoleIndex = roleHierarchy.indexOf(user.layeraClaims.role);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    return userRoleIndex >= requiredRoleIndex;
}
/**
 * Ελέγχει εάν ο χρήστης χρειάζεται MFA verification
 *
 * @param user - Layera user
 * @returns Εάν χρειάζεται MFA
 */
export function requiresMfaVerification(user) {
    if (!user)
        return false;
    return user.mfaStatus.required && !user.mfaStatus.verified;
}
/**
 * Ελέγχει εάν ο χρήστης είναι πλήρως αυθεντικοποιημένος
 *
 * @param user - Layera user
 * @returns Εάν είναι πλήρως authenticated
 */
export function isFullyAuthenticated(user) {
    if (!user)
        return false;
    const emailVerified = user.emailVerified;
    const mfaComplete = !user.mfaStatus.required || user.mfaStatus.verified;
    return emailVerified && mfaComplete;
}
