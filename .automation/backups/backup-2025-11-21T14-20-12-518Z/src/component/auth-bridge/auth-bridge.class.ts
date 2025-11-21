/**
 * 🏗️ LAYERA AUTH BRIDGE CLASS - Enterprise authentication component system
 *
 * Auto-generating CSS class system for auth bridge components
 * Παρέχει runtime CSS generation και validation για auth workflows
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Zero runtime dependencies
 * - Full type safety
 * - Auto CSS generation
 */

import { AUTH_BRIDGE_VARIABLES } from './auth-bridge.variables';
import {
  AUTH_BRIDGE_VARIANTS,
  type LoginFormVariant,
  type AuthInputVariant,
  type AuthButtonVariant,
  type OAuthProviderVariant,
  type MfaVariant,
  type PasswordStrengthVariant,
  type SessionStatusVariant,
  type AuthErrorVariant,
  type ResponsiveAuthVariant,
} from './auth-bridge.variants';

/**
 * Auth Bridge Component System - Enterprise authentication κλάση για CSS generation
 */
export class AuthBridgeComponentSystem {
  private static readonly PREFIX = 'layera-auth';
  private static readonly cssCache = new Map<string, string>();

  /**
   * Generates CSS για login forms
   */
  static getLoginFormCSS(
    variant: LoginFormVariant = 'default',
    size: 'compact' | 'default' | 'fullscreen' = 'default',
    state?: 'loading' | 'error' | 'success',
  ): string {
    const cacheKey = `login-form-${variant}-${size}-${state || 'default'}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const formVariant = AUTH_BRIDGE_VARIANTS.forms[variant];
    const baseCSS = `
      .${this.PREFIX}-form--${variant} {
        background: ${formVariant.background};
        border: ${formVariant.border};
        padding: ${formVariant.padding};
        gap: ${formVariant.gap};
        border-radius: ${formVariant.borderRadius};
        width: ${formVariant.width};
        display: flex;
        flex-direction: column;
        position: relative;
        box-sizing: border-box;
      }
    `;

    let stateCSS = '';
    if (state === 'loading') {
      stateCSS = `
        .${this.PREFIX}-form--${variant}.${this.PREFIX}-form--loading {
          opacity: 0.8;
          pointer-events: none;
        }

        .${this.PREFIX}-form--${variant}.${this.PREFIX}-form--loading::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border: 2px solid ${AUTH_BRIDGE_VARIABLES['auth-loading-color']};
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: ${this.PREFIX}-spin 1s linear infinite;
          transform: translate(-50%, -50%);
        }
      `;
    }

    const finalCSS = baseCSS + stateCSS;
    this.cssCache.set(cacheKey, finalCSS);
    return finalCSS;
  }

  /**
   * Generates CSS για auth inputs
   */
  static getAuthInputCSS(
    variant: AuthInputVariant = 'default',
    type: 'text' | 'email' | 'password' | 'code' = 'text',
    state?: 'focus' | 'error' | 'success',
  ): string {
    const cacheKey = `auth-input-${variant}-${type}-${state || 'default'}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const inputVariant = AUTH_BRIDGE_VARIANTS.inputs[variant];
    const baseCSS = `
      .${this.PREFIX}-input--${variant} {
        background: ${inputVariant.background};
        border: ${inputVariant.border};
        border-radius: ${inputVariant.borderRadius};
        padding: ${inputVariant.padding};
        color: ${inputVariant.textColor};
        font-size: ${inputVariant.fontSize};
        height: ${inputVariant.height};
        width: 100%;
        box-sizing: border-box;
        transition: all 0.2s ease;
        outline: none;
      }

      .${this.PREFIX}-input--${variant}:focus {
        border: ${AUTH_BRIDGE_VARIANTS.inputs.focus.border};
        background: ${AUTH_BRIDGE_VARIANTS.inputs.focus.background};
      }

      .${this.PREFIX}-input--${variant}::placeholder {
        color: ${AUTH_BRIDGE_VARIABLES['auth-placeholder-color']};
        opacity: 1;
      }
    `;

    let typeCSS = '';
    if (type === 'password') {
      typeCSS = `
        .${this.PREFIX}-input--${variant}[type="password"] {
          font-family: 'Courier New', monospace;
          letter-spacing: 2px;
        }
      `;
    }

    if (type === 'code') {
      typeCSS = `
        .${this.PREFIX}-input--code {
          width: ${AUTH_BRIDGE_VARIABLES['auth-mfa-code-width']};
          height: ${AUTH_BRIDGE_VARIABLES['auth-mfa-code-height']};
          text-align: center;
          font-size: ${AUTH_BRIDGE_VARIABLES['auth-mfa-code-font-size']};
          font-weight: 600;
          padding: ${AUTH_BRIDGE_VARIABLES['auth-mfa-code-padding']};
        }
      `;
    }

    const finalCSS = baseCSS + typeCSS;
    this.cssCache.set(cacheKey, finalCSS);
    return finalCSS;
  }

  /**
   * Generates CSS για auth buttons
   */
  static getAuthButtonCSS(
    variant: AuthButtonVariant = 'primary',
    size: 'compact' | 'default' | 'large' = 'default',
    state?: 'hover' | 'active' | 'loading' | 'disabled',
  ): string {
    const cacheKey = `auth-button-${variant}-${size}-${state || 'default'}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const buttonVariant = AUTH_BRIDGE_VARIANTS.buttons[variant];
    const baseCSS = `
      .${this.PREFIX}-button--${variant} {
        background: ${buttonVariant.background};
        color: ${buttonVariant.textColor};
        border: ${buttonVariant.border};
        border-radius: ${buttonVariant.borderRadius};
        padding: ${buttonVariant.padding};
        font-size: ${buttonVariant.fontSize};
        font-weight: ${buttonVariant.fontWeight};
        height: ${buttonVariant.height};
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
        box-sizing: border-box;
        min-width: 120px;
      }

      .${this.PREFIX}-button--${variant}:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      }

      .${this.PREFIX}-button--${variant}:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      }

      .${this.PREFIX}-button--${variant}:disabled {
        background: ${AUTH_BRIDGE_VARIANTS.buttons.disabled.background};
        color: ${AUTH_BRIDGE_VARIANTS.buttons.disabled.textColor};
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    `;

    let sizeCSS = '';
    if (size === 'compact') {
      sizeCSS = `
        .${this.PREFIX}-button--${variant}.${this.PREFIX}-button--compact {
          padding: 8px 16px;
          height: 32px;
          font-size: 14px;
          min-width: 80px;
        }
      `;
    } else if (size === 'large') {
      sizeCSS = `
        .${this.PREFIX}-button--${variant}.${this.PREFIX}-button--large {
          padding: 16px 32px;
          height: 48px;
          font-size: 16px;
          min-width: 160px;
        }
      `;
    }

    const finalCSS = baseCSS + sizeCSS;
    this.cssCache.set(cacheKey, finalCSS);
    return finalCSS;
  }

  /**
   * Generates CSS για OAuth provider buttons
   */
  static getOAuthProviderCSS(
    provider: OAuthProviderVariant,
    size: 'compact' | 'default' | 'large' = 'default',
  ): string {
    const cacheKey = `oauth-${provider}-${size}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const providerVariant = AUTH_BRIDGE_VARIANTS.oauth[provider];
    const baseCSS = `
      .${this.PREFIX}-oauth--${provider} {
        background: ${providerVariant.background};
        color: ${providerVariant.textColor};
        border: ${providerVariant.border};
        border-radius: ${providerVariant.borderRadius};
        padding: ${providerVariant.padding};
        height: ${providerVariant.height};
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${providerVariant.gap};
        text-decoration: none;
        box-sizing: border-box;
        width: 100%;
        font-weight: 500;
      }

      .${this.PREFIX}-oauth--${provider}:hover {
        filter: brightness(0.95);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      }

      .${this.PREFIX}-oauth--${provider} .${this.PREFIX}-oauth__icon {
        width: ${providerVariant.iconSize};
        height: ${providerVariant.iconSize};
        flex-shrink: 0;
      }
    `;

    this.cssCache.set(cacheKey, baseCSS);
    return baseCSS;
  }

  /**
   * Generates CSS για MFA components
   */
  static getMfaCSS(
    variant: MfaVariant,
    type: 'container' | 'input' | 'qr' = 'container',
  ): string {
    const cacheKey = `mfa-${variant}-${type}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const mfaVariant = AUTH_BRIDGE_VARIANTS.mfa[variant];
    let css = '';

    if (type === 'container') {
      css = `
        .${this.PREFIX}-mfa--${variant} {
          background: ${mfaVariant.background};
          border: ${mfaVariant.border};
          border-radius: ${mfaVariant.borderRadius};
          padding: ${mfaVariant.padding};
          gap: ${mfaVariant.gap};
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `;
    } else if (type === 'input') {
      css = `
        .${this.PREFIX}-mfa__code-input {
          background: ${mfaVariant.background};
          border: ${mfaVariant.border};
          border-radius: ${mfaVariant.borderRadius};
          padding: ${mfaVariant.padding};
          color: ${mfaVariant.textColor};
          font-size: ${mfaVariant.fontSize};
          text-align: ${mfaVariant.textAlign};
          width: ${mfaVariant.width};
          height: ${mfaVariant.height};
          box-sizing: border-box;
        }
      `;
    } else if (type === 'qr') {
      css = `
        .${this.PREFIX}-mfa__qr-code {
          background: ${mfaVariant.background};
          border: ${mfaVariant.border};
          border-radius: ${mfaVariant.borderRadius};
          padding: ${mfaVariant.padding};
          width: ${mfaVariant.size};
          height: ${mfaVariant.size};
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `;
    }

    this.cssCache.set(cacheKey, css);
    return css;
  }

  /**
   * Generates CSS για password strength indicators
   */
  static getPasswordStrengthCSS(strength: PasswordStrengthVariant): string {
    const cacheKey = `password-strength-${strength}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const strengthVariant = AUTH_BRIDGE_VARIANTS.passwordStrength[strength];
    const css = `
      .${this.PREFIX}-password-strength--${strength} {
        background: ${strengthVariant.background};
        color: ${strengthVariant.color};
        border: ${strengthVariant.border};
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
      }

      .${this.PREFIX}-password-strength__bar--${strength} {
        width: 100%;
        height: 4px;
        background: ${AUTH_BRIDGE_VARIABLES['auth-password-bar-background']};
        border-radius: 2px;
        overflow: hidden;
        margin-top: 4px;
      }

      .${this.PREFIX}-password-strength__fill--${strength} {
        height: 100%;
        background: ${strengthVariant.color};
        transition: width 0.3s ease;
        border-radius: 2px;
      }
    `;

    this.cssCache.set(cacheKey, css);
    return css;
  }

  /**
   * Generates CSS για session status indicators
   */
  static getSessionStatusCSS(status: SessionStatusVariant): string {
    const cacheKey = `session-status-${status}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const statusVariant = AUTH_BRIDGE_VARIANTS.sessionStatus[status];
    const css = `
      .${this.PREFIX}-session--${status} {
        background: ${statusVariant.background};
        color: ${statusVariant.textColor};
        padding: 8px 12px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
      }

      .${this.PREFIX}-session__indicator--${status} {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${statusVariant.indicatorColor};
        flex-shrink: 0;
      }

      .${this.PREFIX}-session__indicator--${status}.${this.PREFIX}-session__indicator--pulse {
        animation: ${this.PREFIX}-pulse 2s infinite;
      }
    `;

    this.cssCache.set(cacheKey, css);
    return css;
  }

  /**
   * Generates CSS για auth errors
   */
  static getAuthErrorCSS(errorType: AuthErrorVariant): string {
    const cacheKey = `auth-error-${errorType}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const errorVariant = AUTH_BRIDGE_VARIANTS.errors[errorType];
    const css = `
      .${this.PREFIX}-error--${errorType} {
        background: ${errorVariant.background};
        color: ${errorVariant.textColor};
        border: ${errorVariant.border};
        border-radius: ${errorVariant.borderRadius};
        padding: ${errorVariant.padding};
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 16px;
      }

      .${this.PREFIX}-error__icon--${errorType} {
        color: ${errorVariant.iconColor};
        flex-shrink: 0;
        width: 20px;
        height: 20px;
      }

      .${this.PREFIX}-error__content--${errorType} {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
      }
    `;

    this.cssCache.set(cacheKey, css);
    return css;
  }

  /**
   * Generates responsive CSS για different screen sizes
   */
  static getResponsiveAuthCSS(breakpoint: ResponsiveAuthVariant): string {
    const cacheKey = `responsive-auth-${breakpoint}`;

    if (this.cssCache.has(cacheKey)) {
      return this.cssCache.get(cacheKey)!;
    }

    const responsiveVariant = AUTH_BRIDGE_VARIANTS.responsive[breakpoint];
    const mediaQuery = breakpoint === 'mobile' ? '(max-width: 767px)' :
                      breakpoint === 'tablet' ? '(min-width: 768px) and (max-width: 1023px)' :
                      '(min-width: 1024px)';

    const css = `
      @media ${mediaQuery} {
        .${this.PREFIX}-container {
          padding: ${responsiveVariant.containerPadding};
          gap: ${responsiveVariant.gap};
        }

        .${this.PREFIX}-form {
          width: ${responsiveVariant.formWidth};
          max-width: 100%;
        }

        .${this.PREFIX}-input {
          height: ${responsiveVariant.inputHeight};
          font-size: ${responsiveVariant.fontSize};
        }

        .${this.PREFIX}-button {
          height: ${responsiveVariant.buttonHeight};
          font-size: ${responsiveVariant.fontSize};
        }
      }
    `;

    this.cssCache.set(cacheKey, css);
    return css;
  }

  /**
   * Generates complete auth component class name
   */
  static generateAuthClassName(
    component: 'form' | 'input' | 'button' | 'oauth' | 'mfa' | 'error',
    variant: string,
    size?: string,
    state?: string,
    provider?: string,
  ): string {
    let className = `${this.PREFIX}-${component}`;

    if (provider && component === 'oauth') {
      className += `--${provider}`;
    } else {
      className += `--${variant}`;
    }

    if (size) {
      className += ` ${this.PREFIX}-${component}--${size}`;
    }

    if (state) {
      className += ` ${this.PREFIX}-${component}--${state}`;
    }

    return className;
  }

  /**
   * Validates auth component props
   */
  static validateAuthProps(component: string, props: Record<string, any>): boolean {
    const requiredProps: Record<string, string[]> = {
      form: ['variant'],
      input: ['variant', 'type'],
      button: ['variant'],
      oauth: ['provider'],
      mfa: ['variant'],
      error: ['type'],
    };

    const required = requiredProps[component];
    if (!required) {
      console.warn(`Unknown auth component: ${component}`);
      return false;
    }

    for (const prop of required) {
      if (!(prop in props)) {
        console.warn(`Missing required prop '${prop}' for auth component '${component}'`);
        return false;
      }
    }

    return true;
  }

  /**
   * Clears CSS cache (για debugging)
   */
  static clearCache(): void {
    this.cssCache.clear();
  }

  /**
   * Gets cache statistics
   */
  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cssCache.size,
      keys: Array.from(this.cssCache.keys()),
    };
  }
}

/**
 * Global CSS animations for auth components
 */
export const LAYERA_AUTH_BRIDGE_CSS = `
/* Auth Bridge Global Animations */
@keyframes layera-auth-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes layera-auth-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes layera-auth-fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-auth-slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Auth Bridge Base Styles */
.layera-auth-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.layera-auth-loading {
  animation: layera-auth-fadeIn 0.3s ease;
}

.layera-auth-error {
  animation: layera-auth-slideDown 0.3s ease;
}

/* Focus Management για Accessibility */
.layera-auth-input:focus,
.layera-auth-button:focus {
  outline: 2px solid ${AUTH_BRIDGE_VARIABLES['auth-focus-ring-color']};
  outline-offset: 2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .layera-auth-input {
    border-width: 2px;
  }

  .layera-auth-button {
    border-width: 2px;
    font-weight: 700;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .layera-auth-button,
  .layera-auth-input,
  .layera-auth-form,
  .layera-auth-error {
    transition: none;
    animation: none;
  }
}

/* Print Styles */
@media print {
  .layera-auth-container {
    background: white !important;
    color: black !important;
  }

  .layera-auth-button {
    border: 1px solid black !important;
    background: white !important;
    color: black !important;
  }
}
`;

// Helper function για direct CSS export
export const getAuthBridgeCSS = () => LAYERA_AUTH_BRIDGE_CSS;