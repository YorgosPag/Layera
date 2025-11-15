import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon } from '@layera/icons';
import { ButtonsPreview } from './ButtonsPreview';
import { BackgroundsPreview } from './BackgroundsPreview';
import { TextPreview } from './TextPreview';
import { BordersPreview } from './BordersPreview';

interface ColorPreviewAreaProps {
  colorHookState: {
    colorCategory: string;
    colorButtonShape: string;
    elementType: string;
  };
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export const ColorPreviewArea: React.FC<ColorPreviewAreaProps> = ({
  colorHookState,
  currentColors
}) => {
  // Helper functions for Greek translations
  const getCategoryDisplayName = (category: string): string => {
    switch (category) {
      case 'backgrounds': return 'Φόντα';
      case 'text': return 'Κείμενα';
      case 'borders': return 'Περιγράμματα';
      default: return category;
    }
  };

  const getElementDisplayName = (elementType: string): string => {
    switch (elementType) {
      case 'buttons': return 'Πλήκτρα';
      case 'cards': return 'Κάρτες';
      case 'modals': return 'Modals';
      case 'inputs': return 'Πεδία';
      case 'layout': return 'Layout';
      case 'tables': return 'Πίνακες';
      default: return elementType;
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'backgrounds': return LayersIcon;
      case 'text': return EditIcon;
      case 'borders': return PolygonIcon;
      default: return PaletteIcon;
    }
  };

  const IconComponent = getIcon(colorHookState.colorCategory);
  const categoryName = getCategoryDisplayName(colorHookState.colorCategory);
  const elementName = getElementDisplayName(colorHookState.elementType);

  return (
    <>
      {/* Live Color Preview Area */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <IconComponent size="md" /> Live Preview: {categoryName} για {elementName}
        </h3>
        <Text className="layera-typography layera-margin-bottom--lg" data-size="sm" data-color="secondary">
          <IconComponent size="sm" /> Τα {categoryName.toLowerCase()} χρώματα θα επηρεάσουν τα {elementName.toLowerCase()} στην εφαρμογή
        </Text>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
          {/* ELEMENT TYPE BASED PREVIEWS */}
          {colorHookState.elementType === 'buttons' && (
            <ButtonsPreview
              colorHookState={colorHookState}
              currentColors={currentColors}
            />
          )}

          {colorHookState.elementType === 'cards' && (
            <BackgroundsPreview currentColors={currentColors} />
          )}

          {colorHookState.elementType === 'modals' && (
            <BackgroundsPreview currentColors={currentColors} />
          )}

          {colorHookState.elementType === 'inputs' && (
            <BordersPreview currentColors={currentColors} />
          )}

          {colorHookState.elementType === 'layout' && (
            <BackgroundsPreview currentColors={currentColors} />
          )}

          {colorHookState.elementType === 'tables' && (
            <BordersPreview currentColors={currentColors} />
          )}
        </Box>
      </Box>
    </>
  );
};