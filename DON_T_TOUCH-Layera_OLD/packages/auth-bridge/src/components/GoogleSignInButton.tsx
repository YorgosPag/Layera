import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Box } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import type { AuthResult, LayeraUser } from '../types/auth.js';

export interface GoogleSignInButtonProps {
  /** Text που εμφανίζεται στο button */
  children?: React.ReactNode;
  /** CSS class για styling */
  className?: string;
  /** Style object */
  style?: React.CSSProperties;
  /** Callback όταν η σύνδεση είναι επιτυχής */
  onSuccess?: (user: LayeraUser) => void;
  /** Callback όταν η σύνδεση αποτυγχάνει */
  onError?: (error: string) => void;
  /** Εάν το button είναι disabled */
  disabled?: boolean;
}

/**
 * Button component για Google Sign-In
 *
 * @example
 * ```tsx
 * <GoogleSignInButton
 *   onSuccess={(user) => navigate('/dashboard')}
 *   onError={(error) => setError(error)}
 * >
 *   Σύνδεση με Google
 * </GoogleSignInButton>
 * ```
 */
export function GoogleSignInButton({
  children = 'Σύνδεση με Google',
  className = '',
  style,
  onSuccess,
  onError,
  disabled: externalDisabled = false
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleClick = async () => {
    if (loading || externalDisabled) return;

    setLoading(true);

    try {
      const result: AuthResult<LayeraUser> = await signInWithGoogle();

      if (result.success && result.data) {
        onSuccess?.(result.data);
      } else {
        onError?.(result.error || 'Αποτυχία σύνδεσης με Google');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Αποτυχία σύνδεσης με Google';
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const defaultStyle: React.CSSProperties = {
    display: 'var(--la-display-flex, flex)',
    alignItems: 'var(--la-align-center, center)',
    justifyContent: 'var(--la-justify-center, center)',
    gap: 'var(--la-gap-sm, 8px)',
    padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS / 2}px ${SPACING_SCALE.MD}px`,
    border: '1px solid var(--la-border-default, #dadce0)',
    borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
    backgroundColor: 'var(--la-bg-primary)',
    color: 'var(--la-text-primary)',
    fontFamily: 'Google Sans, Roboto, sans-serif',
    fontSize: 'var(--la-font-size-sm, 14px)',
    fontWeight: 'var(--la-font-weight-medium, 500)',
    cursor: loading || externalDisabled ? 'var(--la-cursor-not-allowed, not-allowed)' : 'var(--la-cursor-pointer, pointer)',
    opacity: loading || externalDisabled ? 'var(--la-opacity-disabled, 0.6)' : 'var(--la-opacity-full, 1)',
    transition: 'var(--la-transition-box-shadow, box-shadow 0.15s ease-in-out)',
    ...style
  };

  const hoverStyle = {
    boxShadow: BOX_SHADOW_SCALE.buttonHover
  };

  return (
    <button
      type="button"
      className={`google-sign-in-button ${className}`}
      style={defaultStyle}
      onClick={handleClick}
      disabled={loading || externalDisabled}
      onMouseEnter={(e) => {
        if (!loading && !externalDisabled) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!loading && !externalDisabled) {
          e.currentTarget.style.boxShadow = BOX_SHADOW_SCALE.none;
        }
      }}
    >
      {loading ? (
        <>
          <Box
            width="var(--la-icon-size-md)"
            height="var(--la-icon-size-md)"
            border="2px solid var(--la-border-default)"
            borderTop="2px solid var(--la-color-primary)"
            borderRadius={BORDER_RADIUS_SCALE.CIRCLE}
          />
          <span>Σύνδεση...</span>
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          <span>{children}</span>
        </>
      )}
    </button>
  );
}