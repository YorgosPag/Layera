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
  return (
    <>
      {/* Live Color Preview Area */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <PaletteIcon size="md" /> Live Preview - {colorHookState.colorCategory.toUpperCase()}
        </h3>
        <Text className="layera-typography layera-margin-bottom--lg" data-size="sm" data-color="secondary">
          {colorHookState.colorCategory === 'buttons' && <><PaletteIcon size="sm" /> Τα χρώματα θα επηρεάσουν όλα τα κουμπιά στην εφαρμογή</>}
          {colorHookState.colorCategory === 'backgrounds' && <><LayersIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα φόντα στην εφαρμογή</>}
          {colorHookState.colorCategory === 'text' && <><EditIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα κείμενα στην εφαρμογή</>}
          {colorHookState.colorCategory === 'borders' && <><PolygonIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα περιγράμματα στην εφαρμογή</>}
        </Text>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
          {/* BUTTONS CATEGORY - Show actual buttons */}
          {colorHookState.colorCategory === 'buttons' && (
            <ButtonsPreview
              colorHookState={colorHookState}
              currentColors={currentColors}
            />
          )}

          {/* BACKGROUNDS CATEGORY - Show colored background boxes */}
          {colorHookState.colorCategory === 'backgrounds' && (
            <BackgroundsPreview currentColors={currentColors} />
          )}

          {/* TEXT CATEGORY - Show colored text samples */}
          {colorHookState.colorCategory === 'text' && (
            <TextPreview currentColors={currentColors} />
          )}

          {/* BORDERS CATEGORY - Show colored border samples */}
          {colorHookState.colorCategory === 'borders' && (
            <BordersPreview currentColors={currentColors} />
          )}
        </Box>
      </Box>
    </>
  );
};