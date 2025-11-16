import { useEffect } from 'react';
import { ColorState } from '../components/playground/shared/types';

/**
 * Hook για αυτόματη εφαρμογή αποθηκευμένων χρωμάτων στο DOM
 * Χρησιμοποιεί localStorage για persistence
 */
export const useColorPersistence = () => {
  useEffect(() => {
    // Φόρτωση και εφαρμογή χρωμάτων από localStorage
    const loadAndApplyStoredColors = () => {
      try {
        const stored = localStorage.getItem('layera-current-theme');

        if (stored) {
          const savedState: ColorState = JSON.parse(stored);

          // Εφαρμογή χρωμάτων στο DOM
          const root = document.documentElement;

          if (savedState.colorCategory === 'buttons') {
            // Εφαρμογή για buttons - χρησιμοποιώ τα σωστά CSS variables
            root.style.setProperty('--layera-btn-secondary-bg', savedState.secondaryColor);
            root.style.setProperty('--layera-btn-secondary-color', 'var(--layera-color-white)');
            root.style.setProperty('--layera-btn-secondary-border', savedState.secondaryColor);

            // EMERGENCY OVERRIDE για HEADER BUTTONS - Στοχεύω SquareButton components
            const emergencyStyle = `
              /* Στόχευση με BEM notation (.layera-btn--secondary) */
              .layera-btn--secondary {
                background-color: ${savedState.secondaryColor} !important;
                border-color: ${savedState.secondaryColor} !important;
                color: var(--layera-color-white) !important;
              }

              /* Στόχευση με single dash (.layera-btn-secondary) αν υπάρχει */
              .layera-btn-secondary {
                background-color: ${savedState.secondaryColor} !important;
                border-color: ${savedState.secondaryColor} !important;
                color: var(--layera-color-white) !important;
              }

              /* Στόχευση συγκεκριμένα των header buttons με οποιαδήποτε κλάση */
              [data-layout="header-fixed"] button.layera-btn--secondary,
              [data-layout="header-fixed"] button.layera-btn-secondary {
                background-color: ${savedState.secondaryColor} !important;
                border-color: ${savedState.secondaryColor} !important;
                color: var(--layera-color-white) !important;
              }

              /* Στόχευση όλων των secondary variant buttons */
              button[class*="layera-btn"][class*="secondary"] {
                background-color: ${savedState.secondaryColor} !important;
                border-color: ${savedState.secondaryColor} !important;
                color: var(--layera-color-white) !important;
              }
            `;

            // Αφαίρεση παλιού emergency style αν υπάρχει
            const oldEmergencyStyle = document.getElementById('layera-emergency-header-button-style');
            if (oldEmergencyStyle) {
              oldEmergencyStyle.remove();
            }

            // Προσθήκη νέου emergency style
            const styleElement = document.createElement('style');
            styleElement.id = 'layera-emergency-header-button-style';
            styleElement.textContent = emergencyStyle;
            document.head.appendChild(styleElement);

          } else {
            // Εφαρμογή για άλλες κατηγορίες
            const colorMap = {
              backgrounds: {
                primary: `--layera-color-bg-primary`,
                secondary: `--layera-color-bg-secondary`,
                success: `--layera-color-bg-success`,
                warning: `--layera-color-bg-warning`,
                danger: `--layera-color-bg-danger`,
                info: `--layera-color-bg-info`
              },
              text: {
                primary: `--layera-color-text-primary`,
                secondary: `--layera-color-text-secondary`,
                success: `--layera-color-text-success`,
                warning: `--layera-color-text-warning`,
                danger: `--layera-color-text-danger`,
                info: `--layera-color-text-info`
              },
              borders: {
                primary: `--layera-color-border-primary`,
                secondary: `--layera-color-border-secondary`,
                success: `--layera-color-border-success`,
                warning: `--layera-color-border-warning`,
                danger: `--layera-color-border-danger`,
                info: `--layera-color-border-info`
              }
            };

            const categoryColors = colorMap[savedState.colorCategory];
            if (categoryColors) {
              root.style.setProperty(categoryColors.primary, savedState.primaryColor);
              root.style.setProperty(categoryColors.secondary, savedState.secondaryColor);
              root.style.setProperty(categoryColors.success, savedState.successColor);
              root.style.setProperty(categoryColors.warning, savedState.warningColor);
              root.style.setProperty(categoryColors.danger, savedState.dangerColor);
              root.style.setProperty(categoryColors.info, savedState.infoColor);
            }

          }

          return savedState;
        }
      } catch (error) {
        console.error('Σφάλμα φόρτωσης χρωμάτων:', error);
      }
      return null;
    };

    // ΑΜΕΣΗ εφαρμογή χρωμάτων - χωρίς καθυστέρηση
    loadAndApplyStoredColors();

    // Επιπλέον έλεγχος μετά από μικρό timeout για late-loading elements
    const timeoutId = setTimeout(loadAndApplyStoredColors, 100);

    // Ακούει για αλλαγές στο storage (από factory settings panel)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'layera-current-theme' && e.newValue) {
        loadAndApplyStoredColors();
      }
    };

    // Ακούει για custom theme events (από factory settings panel)
    const handleCustomThemeChange = (e: CustomEvent) => {
      console.log('🎨 Custom theme change event received:', e.detail);
      if (e.detail && e.detail.key === 'layera-current-theme') {
        console.log('🔄 Applying stored colors from custom event...');
        loadAndApplyStoredColors();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('layera-theme-changed', handleCustomThemeChange as EventListener);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('layera-theme-changed', handleCustomThemeChange as EventListener);
    };
  }, []);
};