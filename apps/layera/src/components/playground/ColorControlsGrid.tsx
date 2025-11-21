import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { ColorPickerWithAlpha } from './shared/ColorPickerWithAlpha';
import { ColorControlsProps } from '../../types/unified-interfaces';

/**
 * ColorControlsGrid Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Color Controls Grid ενότητα
 * Γραμμές 184-295 από το αρχικό LivePlayground.tsx
 * Props interface moved to unified-interfaces.ts
 */

export const ColorControlsGrid: React.FC<ColorControlsProps> = React.memo(({
  currentColors,
  currentSetters = {},
  colorCategory = ''
}) => {

  // Helper function to convert ColorWithAlpha onChange to string setter
  const createColorHandler = (setter?: (value: string) => void) =>
    (colorWithAlpha: any) => {
      const colorSetter = setter || (() => {});
      // For backwards compatibility, pass the hex value to the setter
      colorSetter(colorWithAlpha.hex);
    };

  // Περιγραφές για κάθε κατηγορία χρωμάτων
  const getColorDescriptions = () => {
    switch(colorCategory) {
      case 'borders':
        return {
          primary: 'Κύρια περιγράμματα - Γενικά στοιχεία UI',
          secondary: 'Τετράγωνα κουμπιά header - Εικονίδια επικεφαλίδας',
          success: 'Περιγράμματα επιτυχίας - Θετικές ενέργειες',
          warning: 'Περιγράμματα προειδοποίησης - Ειδοποιήσεις',
          danger: 'Περιγράμματα κινδύνου - Διαγραφές/Σφάλματα',
          info: 'Περιγράμματα πληροφοριών - Ενημερώσεις'
        };
      case 'buttons':
        return {
          primary: 'Κουμπιά κύριας δράσης - Call-to-action',
          secondary: 'Δευτερεύοντα κουμπιά - Γενικές ενέργειες',
          success: 'Κουμπιά επιτυχίας - Αποθήκευση, Επιβεβαίωση',
          warning: 'Κουμπιά προειδοποίησης - Προσοχή απαιτείται',
          danger: 'Κουμπιά κινδύνου - Διαγραφή, Ακύρωση',
          info: 'Κουμπιά πληροφοριών - Βοήθεια, Πληροφορίες'
        };
      case 'backgrounds':
        return {
          primary: 'Κύρια φόντα - Περιοχές περιεχομένου',
          secondary: 'Δευτερεύοντα φόντα - Sidebars, panels',
          success: 'Φόντα επιτυχίας - Θετικά μηνύματα',
          warning: 'Φόντα προειδοποίησης - Alerts, notices',
          danger: 'Φόντα κινδύνου - Σφάλματα, διαγραφές',
          info: 'Φόντα πληροφοριών - Tips, οδηγίες'
        };
      case 'text':
        return {
          primary: 'Κυρίως κείμενο - Τίτλοι, περιεχόμενο',
          secondary: 'Δευτερεύον κείμενο - Υπότιτλοι, περιγραφές',
          success: 'Κείμενο επιτυχίας - Επιβεβαιώσεις',
          warning: 'Κείμενο προειδοποίησης - Ειδοποιήσεις',
          danger: 'Κείμενο κινδύνου - Σφάλματα',
          info: 'Κείμενο πληροφοριών - Βοηθητικές πληροφορίες'
        };
      default:
        return {
          primary: 'Κύριο χρώμα',
          secondary: 'Δευτερεύον χρώμα',
          success: 'Χρώμα επιτυχίας',
          warning: 'Χρώμα προειδοποίησης',
          danger: 'Χρώμα κινδύνου',
          info: 'Χρώμα πληροφοριών'
        };
    }
  };

  const descriptions = getColorDescriptions();
  return (
    <Box className="layera-card layera-padding--lg layera-margin-bottom--xl layera-bg-surface--info layera-border-color--info layera-border-width--2">
      <Box
        className="layera-grid layera-grid--gap-2xl layera-grid--columns-auto-fit"
      >
      {/* Primary Color Control */}
      <ColorPickerWithAlpha
        label="Primary Color (HEX + RGBA)"
        value={currentColors.primary}
        onChange={createColorHandler(currentSetters.setPrimary)}
        throttleMs={16}
      />

      {/* Secondary Color Control */}
      <ColorPickerWithAlpha
        label="Secondary Color (HEX + RGBA)"
        value={currentColors.secondary}
        onChange={createColorHandler(currentSetters.setSecondary)}
        throttleMs={16}
      />

      {/* Success Color Control */}
      <ColorPickerWithAlpha
        label="Success Color (HEX + RGBA)"
        value={currentColors.success}
        onChange={createColorHandler(currentSetters.setSuccess)}
        throttleMs={16}
      />

      {/* Warning Color Control */}
      <ColorPickerWithAlpha
        label="Warning Color (HEX + RGBA)"
        value={currentColors.warning}
        onChange={createColorHandler(currentSetters.setWarning)}
        throttleMs={16}
      />

      {/* Danger Color Control */}
      <ColorPickerWithAlpha
        label="Danger Color (HEX + RGBA)"
        value={currentColors.danger}
        onChange={createColorHandler(currentSetters.setDanger)}
        throttleMs={16}
      />

      {/* Info Color Control */}
      <ColorPickerWithAlpha
        label="Info Color (HEX + RGBA)"
        value={currentColors.info}
        onChange={createColorHandler(currentSetters.setInfo)}
        throttleMs={16}
      />
      </Box>
    </Box>
  );
});