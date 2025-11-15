import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon } from '@layera/icons';

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
            <>
              <button style={{
                backgroundColor: currentColors.primary,
                color: 'white',
                padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                border: 'none',
                borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                cursor: 'pointer',
                minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {colorHookState.colorButtonShape === 'square' ? 'P' : 'Primary Color'}
              </button>
              <button style={{
                backgroundColor: currentColors.secondary,
                color: 'white',
                padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                border: 'none',
                borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                cursor: 'pointer',
                minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {colorHookState.colorButtonShape === 'square' ? 'S' : 'Secondary Color'}
              </button>
              <button style={{
                backgroundColor: currentColors.success,
                color: 'white',
                padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                border: 'none',
                borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                cursor: 'pointer',
                minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {colorHookState.colorButtonShape === 'square' ? 'Su' : 'Success Color'}
              </button>
              <button style={{
                backgroundColor: currentColors.warning,
                color: 'black',
                padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                border: 'none',
                borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                cursor: 'pointer',
                minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {colorHookState.colorButtonShape === 'square' ? 'W' : 'Warning Color'}
              </button>
              <button style={{
                backgroundColor: currentColors.danger,
                color: 'white',
                padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                border: 'none',
                borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                cursor: 'pointer',
                minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {colorHookState.colorButtonShape === 'square' ? 'D' : 'Danger Color'}
              </button>
              <button style={{
                backgroundColor: currentColors.info,
                color: 'white',
                padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                border: 'none',
                borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                cursor: 'pointer',
                minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {colorHookState.colorButtonShape === 'square' ? 'I' : 'Info Color'}
              </button>
            </>
          )}

          {/* BACKGROUNDS CATEGORY - Show colored background boxes */}
          {colorHookState.colorCategory === 'backgrounds' && (
            <>
              <div style={{
                backgroundColor: currentColors.primary,
                color: 'white',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '12px'
              }}>
                Primary<br/>Background
              </div>
              <div style={{
                backgroundColor: currentColors.secondary,
                color: 'white',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '12px'
              }}>
                Secondary<br/>Background
              </div>
              <div style={{
                backgroundColor: currentColors.success,
                color: 'white',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '12px'
              }}>
                Success<br/>Background
              </div>
              <div style={{
                backgroundColor: currentColors.warning,
                color: 'black',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '12px'
              }}>
                Warning<br/>Background
              </div>
              <div style={{
                backgroundColor: currentColors.danger,
                color: 'white',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '12px'
              }}>
                Danger<br/>Background
              </div>
              <div style={{
                backgroundColor: currentColors.info,
                color: 'white',
                padding: '20px',
                border: '2px solid #ccc',
                borderRadius: '8px',
                minWidth: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '12px'
              }}>
                Info<br/>Background
              </div>
            </>
          )}

          {/* TEXT CATEGORY - Show colored text samples */}
          {colorHookState.colorCategory === 'text' && (
            <>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <h4 style={{ color: currentColors.primary, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Primary Text</h4>
                <p style={{ color: currentColors.primary, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <h4 style={{ color: currentColors.secondary, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Secondary Text</h4>
                <p style={{ color: currentColors.secondary, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <h4 style={{ color: currentColors.success, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Success Text</h4>
                <p style={{ color: currentColors.success, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <h4 style={{ color: currentColors.warning, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Warning Text</h4>
                <p style={{ color: currentColors.warning, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <h4 style={{ color: currentColors.danger, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Danger Text</h4>
                <p style={{ color: currentColors.danger, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
              </div>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <h4 style={{ color: currentColors.info, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Info Text</h4>
                <p style={{ color: currentColors.info, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
              </div>
            </>
          )}

          {/* BORDERS CATEGORY - Show colored border samples */}
          {colorHookState.colorCategory === 'borders' && (
            <>
              <div style={{
                border: `3px solid ${currentColors.primary}`,
                borderRadius: '8px',
                padding: '15px',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: 'white'
              }}>
                Primary<br/>Border
              </div>
              <div style={{
                border: `3px solid ${currentColors.secondary}`,
                borderRadius: '8px',
                padding: '15px',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: 'white'
              }}>
                Secondary<br/>Border
              </div>
              <div style={{
                border: `3px solid ${currentColors.success}`,
                borderRadius: '8px',
                padding: '15px',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: 'white'
              }}>
                Success<br/>Border
              </div>
              <div style={{
                border: `3px solid ${currentColors.warning}`,
                borderRadius: '8px',
                padding: '15px',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: 'white'
              }}>
                Warning<br/>Border
              </div>
              <div style={{
                border: `3px solid ${currentColors.danger}`,
                borderRadius: '8px',
                padding: '15px',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: 'white'
              }}>
                Danger<br/>Border
              </div>
              <div style={{
                border: `3px solid ${currentColors.info}`,
                borderRadius: '8px',
                padding: '15px',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: 'white'
              }}>
                Info<br/>Border
              </div>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};