import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon } from '@layera/icons';
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
  colorHookState
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

  // Αφαιρέθηκε - Το Live Preview τώρα είναι ενσωματωμένο στα element type contents
  return null;
};