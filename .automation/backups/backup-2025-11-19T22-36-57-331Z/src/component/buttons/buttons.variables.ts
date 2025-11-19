/**
 * 🔲 LAYERA BUTTON COMPONENT TOKENS
 *
 * Component tokens για Button components που χαρτογραφούν semantic tokens σε συγκεκριμένες button χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';

// BUTTON PRIMARY VARIANT TOKENS
export const BUTTON_PRIMARY_TOKENS = {
  // Background states
  'button-primary-background-default': BACKGROUND_VARIABLES['background-primary'],
  'button-primary-background-hover': 'var(--layera-color-primary-600)',
  'button-primary-background-active': 'var(--layera-color-primary-700)',
  'button-primary-background-disabled': BACKGROUND_VARIABLES['background-disabled'],

  // Text colors
  'button-primary-text-default': TEXT_VARIABLES['text-on-primary'],
  'button-primary-text-hover': TEXT_VARIABLES['text-on-primary'],
  'button-primary-text-active': TEXT_VARIABLES['text-on-primary'],
  'button-primary-text-disabled': TEXT_VARIABLES['text-disabled'],

  // Border states
  'button-primary-border-default': BORDER_SEMANTIC_VARIABLES['border-interactive'],
  'button-primary-border-hover': BORDER_SEMANTIC_VARIABLES['border-interactive-hover'],
  'button-primary-border-active': BORDER_SEMANTIC_VARIABLES['border-interactive-active'],
  'button-primary-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'button-primary-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],
} as const;

// BUTTON SECONDARY VARIANT TOKENS
export const BUTTON_SECONDARY_TOKENS = {
  // Background states
  'button-secondary-background-default': BACKGROUND_VARIABLES['background-default'],
  'button-secondary-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'button-secondary-background-active': BACKGROUND_VARIABLES['background-active'],
  'button-secondary-background-disabled': BACKGROUND_VARIABLES['background-disabled'],

  // Text colors
  'button-secondary-text-default': TEXT_VARIABLES['text-brand'],
  'button-secondary-text-hover': TEXT_VARIABLES['text-brand-dark'],
  'button-secondary-text-active': TEXT_VARIABLES['text-brand-dark'],
  'button-secondary-text-disabled': TEXT_VARIABLES['text-disabled'],

  // Border states
  'button-secondary-border-default': BORDER_SEMANTIC_VARIABLES['border-interactive'],
  'button-secondary-border-hover': BORDER_SEMANTIC_VARIABLES['border-interactive-hover'],
  'button-secondary-border-active': BORDER_SEMANTIC_VARIABLES['border-interactive-active'],
  'button-secondary-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'button-secondary-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],
} as const;

// BUTTON GHOST VARIANT TOKENS
export const BUTTON_GHOST_TOKENS = {
  // Background states
  'button-ghost-background-default': 'transparent',
  'button-ghost-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'button-ghost-background-active': BACKGROUND_VARIABLES['background-active'],
  'button-ghost-background-disabled': 'transparent',

  // Text colors
  'button-ghost-text-default': TEXT_VARIABLES['text-brand'],
  'button-ghost-text-hover': TEXT_VARIABLES['text-brand-dark'],
  'button-ghost-text-active': TEXT_VARIABLES['text-brand-dark'],
  'button-ghost-text-disabled': TEXT_VARIABLES['text-disabled'],

  // Border states
  'button-ghost-border-default': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-hover': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-active': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-disabled': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],
} as const;

// BUTTON DANGER VARIANT TOKENS
export const BUTTON_DANGER_TOKENS = {
  // Background states
  'button-danger-background-default': 'var(--layera-color-error-main)',
  'button-danger-background-hover': 'var(--layera-color-error-dark)',
  'button-danger-background-active': 'var(--layera-color-error-dark)',
  'button-danger-background-disabled': BACKGROUND_VARIABLES['background-disabled'],

  // Text colors
  'button-danger-text-default': TEXT_VARIABLES['text-on-primary'],
  'button-danger-text-hover': TEXT_VARIABLES['text-on-primary'],
  'button-danger-text-active': TEXT_VARIABLES['text-on-primary'],
  'button-danger-text-disabled': TEXT_VARIABLES['text-disabled'],

  // Border states
  'button-danger-border-default': BORDER_SEMANTIC_VARIABLES['border-error'],
  'button-danger-border-hover': BORDER_SEMANTIC_VARIABLES['border-error'],
  'button-danger-border-active': BORDER_SEMANTIC_VARIABLES['border-error'],
  'button-danger-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'button-danger-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],
} as const;

// BUTTON SHARED TOKENS - Κοινά tokens για όλα τα button variants
export const BUTTON_SHARED_TOKENS = {
  // Sizing
  'button-padding-xs': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`,
  'button-padding-sm': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'button-padding-md': `${SPACING_VARIABLES['spacing-4']} ${SPACING_VARIABLES['spacing-6']}`,
  'button-padding-lg': `${SPACING_VARIABLES['spacing-5']} ${SPACING_VARIABLES['spacing-8']}`,
  'button-padding-xl': `${SPACING_VARIABLES['spacing-6']} ${SPACING_VARIABLES['spacing-10']}`,

  // Border radius
  'button-border-radius-xs': BORDER_VARIABLES['border-radius-2'],
  'button-border-radius-sm': BORDER_VARIABLES['border-radius-4'],
  'button-border-radius-md': BORDER_VARIABLES['border-radius-6'],
  'button-border-radius-lg': BORDER_VARIABLES['border-radius-8'],
  'button-border-radius-xl': BORDER_VARIABLES['border-radius-12'],

  // Shadows
  'button-shadow-default': SHADOW_VARIABLES['shadow-sm'],
  'button-shadow-hover': SHADOW_VARIABLES['shadow-md'],
  'button-shadow-active': SHADOW_VARIABLES['shadow-none'],
  'button-shadow-disabled': SHADOW_VARIABLES['shadow-none'],

  // Motion
  'button-transition-default': MOTION_VARIABLES['transition-fast'],
  'button-transition-hover': MOTION_VARIABLES['transition-normal'],
} as const;

// UNIFIED BUTTON VARIABLES - Όλα τα button tokens ενωμένα για CSS export
export const BUTTON_VARIABLES = {
  // PRIMARY BUTTON TOKENS
  'button-primary-background-default': BACKGROUND_VARIABLES['background-primary'],
  'button-primary-background-hover': 'var(--layera-color-primary-600)',
  'button-primary-background-active': 'var(--layera-color-primary-700)',
  'button-primary-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'button-primary-text-default': TEXT_VARIABLES['text-on-primary'],
  'button-primary-text-hover': TEXT_VARIABLES['text-on-primary'],
  'button-primary-text-active': TEXT_VARIABLES['text-on-primary'],
  'button-primary-text-disabled': TEXT_VARIABLES['text-disabled'],
  'button-primary-border-default': BORDER_SEMANTIC_VARIABLES['border-interactive'],
  'button-primary-border-hover': BORDER_SEMANTIC_VARIABLES['border-interactive-hover'],
  'button-primary-border-active': BORDER_SEMANTIC_VARIABLES['border-interactive-active'],
  'button-primary-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'button-primary-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],

  // SECONDARY BUTTON TOKENS
  'button-secondary-background-default': BACKGROUND_VARIABLES['background-default'],
  'button-secondary-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'button-secondary-background-active': BACKGROUND_VARIABLES['background-active'],
  'button-secondary-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'button-secondary-text-default': TEXT_VARIABLES['text-brand'],
  'button-secondary-text-hover': TEXT_VARIABLES['text-brand-dark'],
  'button-secondary-text-active': TEXT_VARIABLES['text-brand-dark'],
  'button-secondary-text-disabled': TEXT_VARIABLES['text-disabled'],
  'button-secondary-border-default': BORDER_SEMANTIC_VARIABLES['border-interactive'],
  'button-secondary-border-hover': BORDER_SEMANTIC_VARIABLES['border-interactive-hover'],
  'button-secondary-border-active': BORDER_SEMANTIC_VARIABLES['border-interactive-active'],
  'button-secondary-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],

  // GHOST BUTTON TOKENS
  'button-ghost-background-default': 'transparent',
  'button-ghost-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'button-ghost-background-active': BACKGROUND_VARIABLES['background-active'],
  'button-ghost-background-disabled': 'transparent',
  'button-ghost-text-default': TEXT_VARIABLES['text-brand'],
  'button-ghost-text-hover': TEXT_VARIABLES['text-brand-dark'],
  'button-ghost-text-active': TEXT_VARIABLES['text-brand-dark'],
  'button-ghost-text-disabled': TEXT_VARIABLES['text-disabled'],
  'button-ghost-border-default': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-hover': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-active': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-disabled': BORDER_SEMANTIC_VARIABLES['border-none'],
  'button-ghost-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],

  // DANGER BUTTON TOKENS
  'button-danger-background-default': 'var(--layera-color-error-main)',
  'button-danger-background-hover': 'var(--layera-color-error-dark)',
  'button-danger-background-active': 'var(--layera-color-error-dark)',
  'button-danger-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'button-danger-text-default': TEXT_VARIABLES['text-on-primary'],
  'button-danger-text-hover': TEXT_VARIABLES['text-on-primary'],
  'button-danger-text-active': TEXT_VARIABLES['text-on-primary'],
  'button-danger-text-disabled': TEXT_VARIABLES['text-disabled'],
  'button-danger-border-default': BORDER_SEMANTIC_VARIABLES['border-error'],
  'button-danger-border-hover': BORDER_SEMANTIC_VARIABLES['border-error'],
  'button-danger-border-active': BORDER_SEMANTIC_VARIABLES['border-error'],
  'button-danger-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'button-danger-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],

  // SHARED BUTTON TOKENS
  'button-padding-xs': 'var(--layera-spacing-2) var(--layera-spacing-3)',
  'button-padding-sm': 'var(--layera-spacing-3) var(--layera-spacing-4)',
  'button-padding-md': 'var(--layera-spacing-4) var(--layera-spacing-6)',
  'button-padding-lg': 'var(--layera-spacing-5) var(--layera-spacing-8)',
  'button-padding-xl': 'var(--layera-spacing-6) var(--layera-spacing-10)',
  'button-border-radius-xs': BORDER_VARIABLES['border-radius-2'],
  'button-border-radius-sm': BORDER_VARIABLES['border-radius-4'],
  'button-border-radius-md': BORDER_VARIABLES['border-radius-6'],
  'button-border-radius-lg': BORDER_VARIABLES['border-radius-8'],
  'button-border-radius-xl': BORDER_VARIABLES['border-radius-12'],
  'button-shadow-default': SHADOW_VARIABLES['shadow-sm'],
  'button-shadow-hover': SHADOW_VARIABLES['shadow-md'],
  'button-shadow-active': SHADOW_VARIABLES['shadow-none'],
  'button-shadow-disabled': SHADOW_VARIABLES['shadow-none'],
  'button-transition-default': MOTION_VARIABLES['transition-fast'],
  'button-transition-hover': MOTION_VARIABLES['transition-normal'],
} as const;

// Helper types για type safety
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'focus';