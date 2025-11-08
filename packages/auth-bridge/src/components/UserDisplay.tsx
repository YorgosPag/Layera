import React from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import type { LayeraUser, UserRole } from '../types/auth.js';
import './UserDisplay.css';

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
 * Utility function to get role label using translation
 */
const getRoleLabel = (role: UserRole, t: (key: string) => string): string => {
  return t(`roles.${role}`) || t('roles.private');
};

/**
 * Mapping ρόλων σε CSS classes με design tokens
 */
const ROLE_CLASSES: Record<UserRole, string> = {
  private: 'user-role-badge-private',
  broker: 'user-role-badge-broker',
  builder: 'user-role-badge-builder',
  admin: 'user-role-badge-admin'
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
  const { t } = useLayeraTranslation();
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
  const renderRole = (): React.ReactElement | null => {
    const role = user.layeraClaims.role;
    const label = getRoleLabel(role, t);

    switch (roleFormat) {
      case 'badge':
        return (
          <span
            className={`inline-flex items-center rounded-full font-medium ${badgeClasses[size]} ${ROLE_CLASSES[role]}`}
          >
            {label}
          </span>
        );

      case 'text':
        return <span className="font-medium">{label}</span>;

      case 'icon':
        return (
          <span
            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${ROLE_CLASSES[role]}`}
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
    trueClass: string = 'user-status-success',
    falseClass: string = 'user-status-danger'
  ) => (
    <span
      className={`inline-flex items-center rounded-full font-medium ${badgeClasses[size]} ${status ? trueClass : falseClass}`}
    >
      {status ? trueLabel : falseLabel}
    </span>
  );

  return (
    <Box className={`user-display ${sizeClasses[size]} ${className}`}>
      {/* Display Name or Email */}
      <Box className="flex items-center space-x-2">
        {user.displayName && (
          <span className="font-semibold">{user.displayName}</span>
        )}
        {showEmail && (
          <span className={`${user.displayName ? 'user-email-secondary' : 'font-semibold'}`}>
            {user.email}
          </span>
        )}
      </Box>

      {/* Role */}
      {showRole && (
        <Box className="flex items-center">
          <span className="mr-2 user-label-secondary">{t('data.fields.role')}:</span>
          {renderRole()}
        </Box>
      )}

      {/* Email Verification Status */}
      {showEmailVerification && (
        <Box className="flex items-center space-x-2">
          <span className="user-label-secondary">Email:</span>
          {renderStatusBadge(
            user.emailVerified,
            t('status.verified'),
            t('settings.items.emailVerification.statusUnverified')
          )}
        </Box>
      )}

      {/* MFA Status */}
      {showMfaStatus && (
        <Box className="flex items-center space-x-2">
          <span className="user-label-secondary">MFA:</span>
          {user.mfaStatus.required ? (
            renderStatusBadge(
              user.mfaStatus.verified,
              t('account.badges.mfaActive'),
              t('mfa.required')
            )
          ) : (
            renderStatusBadge(
              user.mfaStatus.enabled,
              t('account.badges.mfaActive'),
              t('mfa.optional'),
              'user-status-info',
              'user-status-secondary'
            )
          )}
        </Box>
      )}
    </Box>
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
  const { t } = useLayeraTranslation();
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large'
  };

  const initials = user.displayName
    ? user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || '?';

  const roleClass = ROLE_CLASSES[user.layeraClaims.role];
  const roleLabel = getRoleLabel(user.layeraClaims.role, t);

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size]} hover:opacity-80 transition-opacity ${roleClass}`}
      title={`${user.displayName || user.email} (${roleLabel})`}
    >
      {initials}
    </button>
  );
}