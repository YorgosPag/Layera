import React from 'react';
import type { LayeraUser, UserRole } from '../types/auth.js';

/**
 * Props για UserDisplay component
 */
interface UserDisplayProps {
  /** Χρήστης προς εμφάνιση */
  user: LayeraUser;
  /** Εάν θα εμφανίζει το email */
  showEmail?: boolean;
  /** Εάν θα εμφανίζει τον ρόλο */
  showRole?: boolean;
  /** Εάν θα εμφανίζει την κατάσταση MFA */
  showMfaStatus?: boolean;
  /** Εάν θα εμφανίζει την κατάσταση email verification */
  showEmailVerification?: boolean;
  /** Custom className */
  className?: string;
  /** Format του ρόλου */
  roleFormat?: 'badge' | 'text' | 'icon';
  /** Size του component */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Mapping ρόλων σε εμφανίσιμα labels
 */
const ROLE_LABELS: Record<UserRole, string> = {
  private: 'Ιδιώτης',
  broker: 'Μεσίτης',
  builder: 'Κατασκευαστής',
  admin: 'Διαχειριστής'
};

/**
 * Mapping ρόλων σε χρώματα
 */
const ROLE_COLORS: Record<UserRole, string> = {
  private: 'bg-gray-100 text-gray-800',
  broker: 'bg-blue-100 text-blue-800',
  builder: 'bg-green-100 text-green-800',
  admin: 'bg-red-100 text-red-800'
};

/**
 * Component για εμφάνιση πληροφοριών χρήστη
 *
 * @example
 * ```typescript
 * // Βασική εμφάνιση
 * <UserDisplay user={currentUser} />
 *
 * // Με όλες τις πληροφορίες
 * <UserDisplay
 *   user={currentUser}
 *   showEmail
 *   showRole
 *   showMfaStatus
 *   showEmailVerification
 *   roleFormat="badge"
 *   size="large"
 * />
 *
 * // Compact εμφάνιση
 * <UserDisplay
 *   user={currentUser}
 *   showRole
 *   roleFormat="icon"
 *   size="small"
 * />
 * ```
 */
export function UserDisplay({
  user,
  showEmail = false,
  showRole = true,
  showMfaStatus = false,
  showEmailVerification = false,
  className = '',
  roleFormat = 'badge',
  size = 'medium'
}: UserDisplayProps) {
  const sizeClasses = {
    small: 'text-sm space-y-1',
    medium: 'text-base space-y-2',
    large: 'text-lg space-y-3'
  };

  const badgeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };

  /**
   * Renders ρόλο βάσει format
   */
  const renderRole = () => {
    const role = user.layeraClaims.role;
    const label = ROLE_LABELS[role];

    switch (roleFormat) {
      case 'badge':
        return (
          <span
            className={`inline-flex items-center rounded-full font-medium ${ROLE_COLORS[role]} ${badgeClasses[size]}`}
          >
            {label}
          </span>
        );

      case 'text':
        return <span className="font-medium">{label}</span>;

      case 'icon':
        return (
          <span
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${ROLE_COLORS[role]} text-xs font-bold`}
            title={label}
          >
            {label.charAt(0).toUpperCase()}
          </span>
        );

      default:
        return null;
    }
  };

  /**
   * Renders status badge
   */
  const renderStatusBadge = (
    status: boolean,
    trueLabel: string,
    falseLabel: string,
    trueColor = 'bg-green-100 text-green-800',
    falseColor = 'bg-red-100 text-red-800'
  ) => (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        status ? trueColor : falseColor
      } ${badgeClasses[size]}`}
    >
      {status ? trueLabel : falseLabel}
    </span>
  );

  return (
    <div className={`user-display ${sizeClasses[size]} ${className}`}>
      {/* Display Name or Email */}
      <div className="flex items-center space-x-2">
        {user.displayName && (
          <span className="font-semibold">{user.displayName}</span>
        )}
        {showEmail && (
          <span className={user.displayName ? 'text-gray-600' : 'font-semibold'}>
            {user.email}
          </span>
        )}
      </div>

      {/* Role */}
      {showRole && (
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Ρόλος:</span>
          {renderRole()}
        </div>
      )}

      {/* Email Verification Status */}
      {showEmailVerification && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Email:</span>
          {renderStatusBadge(
            user.emailVerified,
            'Επαληθευμένο',
            'Μη επαληθευμένο'
          )}
        </div>
      )}

      {/* MFA Status */}
      {showMfaStatus && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">MFA:</span>
          {user.mfaStatus.required ? (
            renderStatusBadge(
              user.mfaStatus.verified,
              'Ενεργοποιημένο',
              'Απαιτείται'
            )
          ) : (
            renderStatusBadge(
              user.mfaStatus.enabled,
              'Ενεργοποιημένο',
              'Προαιρετικό',
              'bg-blue-100 text-blue-800',
              'bg-gray-100 text-gray-800'
            )
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Compact version του UserDisplay για χρήση σε headers/navigation
 */
export function UserAvatar({
  user,
  size = 'medium',
  onClick
}: {
  user: LayeraUser;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}) {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base'
  };

  const initials = user.displayName
    ? user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || '?';

  const roleColor = ROLE_COLORS[user.layeraClaims.role];

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full font-medium ${roleColor} ${sizeClasses[size]} hover:opacity-80 transition-opacity`}
      title={`${user.displayName || user.email} (${ROLE_LABELS[user.layeraClaims.role]})`}
    >
      {initials}
    </button>
  );
}