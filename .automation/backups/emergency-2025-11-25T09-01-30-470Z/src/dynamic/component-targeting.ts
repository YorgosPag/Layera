/**
 * 🎯 COMPONENT TARGETING - Target-specific styling system
 *
 * Αντίστοιχο του getTargetSelectors() και applyColorToElement() από το HTML mockup.
 * Υποστηρίζει component-specific theming για:
 * - 'all', 'cards', 'buttons', 'modals', 'tables', 'header'
 *
 * Compatible με setTargetComponent() function
 */

import type { LayeraColorType } from '../core/colors';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 TARGET SELECTORS - CSS selectors για κάθε component target
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_TARGET_SELECTORS = {
  // Button selectors
  buttons: [
    '.layera-button',
    '.btn',
    'button[class*="button"]',
    '[data-component="button"]',
    '.primary-btn',
    '.secondary-btn',
    '.success-btn',
    '.warning-btn',
    '.danger-btn',
    '.info-btn'
  ],

  // Card selectors
  cards: [
    '.layera-card',
    '.card',
    '[data-component="card"]',
    '.card-primary',
    '.card-secondary',
    '.card-success',
    '.card-warning',
    '.card-danger',
    '.card-info'
  ],

  // Modal selectors
  modals: [
    '.layera-modal',
    '.modal',
    '[data-component="modal"]',
    '.modal-primary',
    '.modal-secondary',
    '.modal-success',
    '.modal-warning',
    '.modal-danger',
    '.modal-info'
  ],

  // Table selectors
  tables: [
    '.layera-table',
    '.table',
    'table',
    '[data-component="table"]',
    '.data-table'
  ],

  // Header selectors
  headers: [
    '.layera-header',
    '.header',
    'header',
    '[data-component="header"]',
    '.app-header',
    '.page-header'
  ]
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 COLOR APPLICATION STRATEGIES - Per component type
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_COLOR_APPLICATION = {
  // Πώς εφαρμόζονται τα χρώματα σε κάθε component type
  buttons: {
    background: (colorValue: string) => colorValue,
    borderColor: (colorValue: string) => colorValue,
    color: (colorValue: string) => getContrastColor(colorValue)
  },

  cards: {
    backgroundColor: (colorValue: string) => getLightVariant(colorValue),
    borderColor: (colorValue: string) => colorValue,
    color: (colorValue: string) => getDarkVariant(colorValue)
  },

  modals: {
    borderLeftColor: (colorValue: string) => colorValue,
    backgroundColor: () => '#FFFFFF',
    color: () => '#333333'
  },

  tables: {
    headerBackground: (colorValue: string) => colorValue,
    headerTextColor: (colorValue: string) => getContrastColor(colorValue),
    borderColor: (colorValue: string) => colorValue
  },

  headers: {
    backgroundColor: (colorValue: string) => colorValue,
    color: (colorValue: string) => getContrastColor(colorValue),
    borderBottomColor: (colorValue: string) => getDarkVariant(colorValue)
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 TARGETING FUNCTIONS - Compatible με HTML mockup functions
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraTargetComponent = 'all' | 'buttons' | 'cards' | 'modals' | 'tables' | 'headers';

/**
 * Παίρνει CSS selectors για target component - Compatible με getTargetSelectors()
 */
export function getTargetSelectors(target: LayeraTargetComponent, colorType?: LayeraColorType): string[] {
  if (target === 'all') {
    // Επιστρέφει selectors για όλα τα components
    return Object.values(LAYERA_TARGET_SELECTORS).flat();
  }

  if (target === 'headers') {
    return LAYERA_TARGET_SELECTORS.headers;
  }

  return LAYERA_TARGET_SELECTORS[target] || [];
}

/**
 * Εφαρμόζει χρώμα σε element - Compatible με applyColorToElement()
 */
export function applyColorToElement(
  element: HTMLElement,
  colorType: LayeraColorType,
  colorValue: string,
  targetComponent: LayeraTargetComponent
): void {
  // Καθορίζουμε το component type από το element
  const componentType = determineComponentType(element, targetComponent);

  if (!componentType || !LAYERA_COLOR_APPLICATION[componentType]) {
    return;
  }

  const applicationStrategy = LAYERA_COLOR_APPLICATION[componentType];

  // Εφαρμόζουμε χρώματα βάσει του component type
  switch (componentType) {
    case 'buttons':
      element.style.backgroundColor = applicationStrategy.background(colorValue);
      element.style.borderColor = applicationStrategy.borderColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      break;

    case 'cards':
      element.style.backgroundColor = applicationStrategy.backgroundColor(colorValue);
      element.style.borderColor = applicationStrategy.borderColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      break;

    case 'modals':
      element.style.borderLeftColor = applicationStrategy.borderLeftColor(colorValue);
      element.style.backgroundColor = applicationStrategy.backgroundColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      break;

    case 'tables':
      // Apply στα header cells
      const headerCells = element.querySelectorAll('th, .table-header');
      headerCells.forEach(cell => {
        (cell as HTMLElement).style.backgroundColor = applicationStrategy.headerBackground(colorValue);
        (cell as HTMLElement).style.color = applicationStrategy.headerTextColor(colorValue);
      });
      element.style.borderColor = applicationStrategy.borderColor(colorValue);
      break;

    case 'headers':
      element.style.backgroundColor = applicationStrategy.backgroundColor(colorValue);
      element.style.color = applicationStrategy.color(colorValue);
      element.style.borderBottomColor = applicationStrategy.borderBottomColor(colorValue);
      break;
  }
}

/**
 * Καθορίζει το component type από το element
 */
function determineComponentType(element: HTMLElement, targetComponent: LayeraTargetComponent): keyof typeof LAYERA_COLOR_APPLICATION | null {
  if (targetComponent !== 'all') {
    return targetComponent as keyof typeof LAYERA_COLOR_APPLICATION;
  }

  // Auto-detect component type από classes/attributes
  const classList = Array.from(element.classList);
  const tagName = element.tagName.toLowerCase();

  if (classList.some(cls => cls.includes('button') || cls.includes('btn')) || tagName === 'button') {
    return 'buttons';
  }

  if (classList.some(cls => cls.includes('card'))) {
    return 'cards';
  }

  if (classList.some(cls => cls.includes('modal'))) {
    return 'modals';
  }

  if (classList.some(cls => cls.includes('table')) || tagName === 'table') {
    return 'tables';
  }

  if (classList.some(cls => cls.includes('header')) || tagName === 'header') {
    return 'headers';
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 COLOR UTILITIES - Helper functions για color manipulation
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Παίρνει contrast color (λευκό ή μαύρο) βάσει background
 */
function getContrastColor(backgroundColor: string): string {
  // Simple contrast calculation
  const color = backgroundColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Παίρνει ανοικτό variant του χρώματος
 */
function getLightVariant(color: string): string {
  // Απλή implementation - θα μπορούσε να γίνει πιο sophisticated
  const opacity = '20'; // 20% opacity
  if (color.startsWith('#')) {
    return color + opacity;
  }
  return color;
}

/**
 * Παίρνει σκούρο variant του χρώματος
 */
function getDarkVariant(color: string): string {
  // Απλή implementation - μειώνει τη λαμπρότητα
  return color; // Simplified - θα μπορούσε να υπολογίζει darker shade
}