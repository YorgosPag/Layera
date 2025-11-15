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
  /** Current active section */
  activeSection: NavigationSection;
  /** Function για αλλαγή section */
  onSectionChange: (section: NavigationSection) => void;
}

export const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  onClose,
  activeSection,
  onSectionChange
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

        {/* Navigation Tabs */}
        <Box className="layera-flex layera-flex--gap-sm layera-margin-bottom--lg layera-padding--md layera-border-radius--md layera-bg-semantic--neutral-light">
          <Button
            variant={activeSection === 'buttons' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onSectionChange('buttons')}
          >
            <PaletteIcon size="sm" /> Buttons
          </Button>
          <Button
            variant={activeSection === 'colors' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onSectionChange('colors')}
          >
            <PaletteIcon size="sm" /> Colors
          </Button>
          <Button
            variant={activeSection === 'tokens' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onSectionChange('tokens')}
          >
            <SettingsIcon size="sm" /> Tokens
          </Button>
        </Box>
      </Box>
    </>
  );
};