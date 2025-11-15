import React from 'react';
import { Box } from '@layera/layout';
import { Button } from '@layera/buttons';
import { SettingsIcon, CheckIcon, PaletteIcon } from '@layera/icons';
import { NavigationSection } from '../../hooks/useNavigation';

/**
 * PlaygroundHeader Component
 *
 * Enterprise-grade header component για το Live Playground
 * - Header με title και close button
 * - Navigation tabs για section switching
 * - Clean separation από main content
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Προπερτίες καλά ορισμένες
 * - Single Responsibility Principle
 */

interface PlaygroundHeaderProps {
  /** Function να καλέσει όταν πατηθεί το κουμπί κλεισίματος */
  onClose: () => void;
}

export const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  onClose
}) => {
  return (
    <>
      {/* Header με κουμπί κλεισίματος */}
      <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-padding--lg layera-border-bottom--default layera-bg-surface--secondary layera-position--sticky layera-top--0 layera-z-index--overlay">
        <h1 className="layera-typography" data-size="xl" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> Live Playground - Ζωντανές Ρυθμίσεις
        </h1>
        <button
          onClick={onClose}
          className="layera-button layera-button--outline layera-padding-x--lg layera-padding-y--sm layera-cursor--pointer"
        >
          ✕ Κλείσιμο
        </button>
      </Box>

      {/* Main Content Container Start */}
      <Box
        className="layera-bg-surface--secondary layera-text-color--primary layera-padding--2xl layera-max-width--container-xl layera-margin-x--auto"
      >
        {/* TEST - Θα δεις αυτό το κείμενο */}
        <h2 className="layera-typography layera-margin-bottom--xl" data-color="primary" data-size="2xl" data-weight="bold">
          <CheckIcon size="sm" /> ΠΕΡΙΕΧΟΜΕΝΟ ΦΟΡΤΩΝΕΙ!
        </h2>

        {/* Navigation Tabs αφαιρέθηκαν - απευθείας εμφάνιση content */}
      </Box>
    </>
  );
};