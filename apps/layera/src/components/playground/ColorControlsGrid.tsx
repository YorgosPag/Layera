import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { OptimizedColorPicker } from './shared/OptimizedColorPicker';

/**
 * ColorControlsGrid Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Color Controls Grid ενότητα
 * Γραμμές 184-295 από το αρχικό LivePlayground.tsx
 */


interface ColorControlsGridProps {
  currentColors: Record<string, string>;
  currentSetters: Record<string, (value: string) => void>;
  startPreview: (key: string, value: string) => void;
  colorCategory: string;
}

export const ColorControlsGrid: React.FC<ColorControlsGridProps> = React.memo(({
  currentColors,
  currentSetters,
  colorCategory
}) => {

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
    <Box
      className="layera-grid layera-margin-bottom--xl layera-grid--gap-2xl"
      style={{
        gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)'
      } as React.CSSProperties}
    >
      {/* Primary Color Control */}
      <OptimizedColorPicker
        label="Primary Color"
        value={currentColors.primary}
        onChange={currentSetters.setPrimary}
        throttleMs={150}
      />

      {/* Secondary Color Control */}
      <OptimizedColorPicker
        label="Secondary Color"
        value={currentColors.secondary}
        onChange={currentSetters.setSecondary}
        throttleMs={150}
      />

      {/* Success Color Control */}
      <OptimizedColorPicker
        label="Success Color"
        value={currentColors.success}
        onChange={currentSetters.setSuccess}
        throttleMs={150}
      />

      {/* Warning Color Control */}
      <OptimizedColorPicker
        label="Warning Color"
        value={currentColors.warning}
        onChange={currentSetters.setWarning}
        throttleMs={150}
      />

      {/* Danger Color Control */}
      <OptimizedColorPicker
        label="Danger Color"
        value={currentColors.danger}
        onChange={currentSetters.setDanger}
        throttleMs={150}
      />

      {/* Info Color Control */}
      <OptimizedColorPicker
        label="Info Color"
        value={currentColors.info}
        onChange={currentSetters.setInfo}
        throttleMs={150}
      />
    </Box>
  );
});