// Προσωρινό Legacy UI Compatibility Layer (Phase 1)
// TODO(Phase 2): Αντικατάσταση από επίσημα tokens + απομάκρυνση

// ANIMATION_DURATIONS και EASING_FUNCTIONS υπάρχουν ήδη στο config

// Αυτά υπάρχουν ήδη στα config/navigation/sizes - μόνο τα νέα

// Ελάχιστος χάρτης CSS tokens ως placeholders
export const CSS_DESIGN_TOKENS = {
  colorPrimary: 'var(--la-color-primary-600)',
  colorInfo: 'var(--la-color-info-600)',
  colorInfoBorder: 'var(--la-color-info-300)',
  colorSuccess: 'var(--la-color-success-600)',
  colorWarning: 'var(--la-color-warning-600)',
  radiusMd: 'var(--la-radius-md)',
} as const;

// getCard* functions και getWorkflowCard* functions υπάρχουν ήδη στο cards.ts