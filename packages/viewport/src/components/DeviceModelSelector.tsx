/**
 * 🚨🚨🚨 ΠΡΟΣΟΧΗ - DEVICE SIMULATION SELECTOR 🚨🚨🚨
 *
 * ✅ ΛΕΙΤΟΥΡΓΕΙ ΤΕΛΕΙΑ: Mobile phones (iPhone, Samsung Galaxy κλπ)
 * ❌ ΠΡΟΒΛΗΜΑΤΙΚΑ: Tablets, Desktop, Foldables (Samsung Galaxy Z Fold 5)
 *
 * ΜΗΝ αλλάξεις τη λίστα συσκευών! Λειτουργεί για mobile preview μόνο.
 *
 * - Γιώργος Παγώνης, 28/10/2025
 */

import React, { useState } from 'react';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, DEVICE_FRAME_COLORS, CSS_DESIGN_TOKENS, FONT_SIZES } from '@layera/constants';

export type DeviceModel =
  | 'iPhone X'
  | 'iPhone 8'
  | 'iPhone 8 Plus'
  | 'iPhone 12 Pro'
  | 'iPhone 14 Pro Max'
  | 'Samsung Galaxy S21'
  | 'Samsung Galaxy S22'
  | 'Samsung Galaxy S22 Ultra'
  | 'Samsung Galaxy S23'
  | 'Samsung Galaxy S23 Ultra'
  | 'Samsung Galaxy S24'
  | 'Samsung Galaxy S24 Ultra'
  | 'Samsung Galaxy A35'
  | 'Samsung Galaxy Z Fold 5'
  | 'Samsung Galaxy Z Flip 5'
  | 'Google Pixel 5'
  | 'iPad Air'
  | 'iPad Pro 11"'
  | 'iPad Pro 12.9"'
  | 'Surface Pro 7'
  | 'MacBook Pro 13"'
  | 'iMac 24"';

interface DeviceSpecs {
  width: number;
  height: number;
  scale: number;
  hasNotch: boolean;
  hasHomeBar: boolean;
  borderRadius: number;
  frameColor: string;
}

const deviceSpecs: Record<DeviceModel, DeviceSpecs> = {
  'iPhone X': { width: 375, height: 812, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 40, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'iPhone 8': { width: 375, height: 667, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 25, frameColor: DEVICE_FRAME_COLORS.SILVER },
  'iPhone 8 Plus': { width: 414, height: 736, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 25, frameColor: DEVICE_FRAME_COLORS.SILVER },
  'iPhone 12 Pro': { width: 390, height: 844, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 45, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'iPhone 14 Pro Max': { width: 430, height: 932, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 50, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Samsung Galaxy S21': { width: 384, height: 854, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.BLACK },
  'Samsung Galaxy S22': { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Samsung Galaxy S22 Ultra': { width: 412, height: 908, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.BLACK },
  'Samsung Galaxy S23': { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Samsung Galaxy S23 Ultra': { width: 412, height: 908, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.BLACK },
  'Samsung Galaxy S24': { width: 393, height: 851, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Samsung Galaxy S24 Ultra': { width: 412, height: 926, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.BLACK },
  'Samsung Galaxy A35': { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 30, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Samsung Galaxy Z Fold 5': { width: 720, height: 720, scale: 0.9, hasNotch: false, hasHomeBar: false, borderRadius: 30, frameColor: DEVICE_FRAME_COLORS.BLACK },
  'Samsung Galaxy Z Flip 5': { width: 390, height: 876, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Google Pixel 5': { width: 393, height: 851, scale: 1, hasNotch: false, hasHomeBar: true, borderRadius: 30, frameColor: DEVICE_FRAME_COLORS.GRAPHITE },
  'iPad Air': { width: 720, height: 960, scale: 0.8, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: DEVICE_FRAME_COLORS.WHITE },
  'iPad Pro 11"': { width: 740, height: 980, scale: 0.8, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'iPad Pro 12.9"': { width: 800, height: 1080, scale: 0.75, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: DEVICE_FRAME_COLORS.SPACE_GRAY },
  'Surface Pro 7': { width: 760, height: 1020, scale: 0.75, hasNotch: false, hasHomeBar: false, borderRadius: 0, frameColor: DEVICE_FRAME_COLORS.BLACK },
  'MacBook Pro 13"': { width: 900, height: 600, scale: 0.8, hasNotch: false, hasHomeBar: false, borderRadius: 10, frameColor: DEVICE_FRAME_COLORS.WHITE },
  'iMac 24"': { width: 1000, height: 700, scale: 0.8, hasNotch: false, hasHomeBar: false, borderRadius: 15, frameColor: DEVICE_FRAME_COLORS.SILVER }
};

interface DeviceModelSelectorProps {
  onModelSelect: (model: DeviceModel | null) => void;
  currentModel: DeviceModel | null;
}

export const DeviceModelSelector: React.FC<DeviceModelSelectorProps> = ({
  onModelSelect,
  currentModel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 60 }); // Position as percentage for x, pixels for y
  const [isDragging, setIsDragging] = useState(false);

  React.useEffect(() => {
    console.log('🎯 DeviceModelSelector mounted! Samsung Galaxy A35 should be available.');
  }, []);

  const deviceCategories = {
    'iPhones': ['iPhone X', 'iPhone 8', 'iPhone 8 Plus', 'iPhone 12 Pro', 'iPhone 14 Pro Max'] as DeviceModel[],
    'Samsung': [
      'Samsung Galaxy S24 Ultra',
      'Samsung Galaxy S24',
      'Samsung Galaxy S23 Ultra',
      'Samsung Galaxy S23',
      'Samsung Galaxy S22 Ultra',
      'Samsung Galaxy S22',
      'Samsung Galaxy S21',
      'Samsung Galaxy A35',
      'Samsung Galaxy Z Fold 5',
      'Samsung Galaxy Z Flip 5'
    ] as DeviceModel[],
    'Other Android': ['Google Pixel 5'] as DeviceModel[],
    'Tablets': ['iPad Air', 'iPad Pro 11"', 'iPad Pro 12.9"', 'Surface Pro 7'] as DeviceModel[],
    'Desktop': ['MacBook Pro 13"', 'iMac 24"'] as DeviceModel[]
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if clicking on the button, not the dropdown
    if ((e.target as HTMLElement).closest('button') && !isOpen) {
      e.preventDefault();
      setIsDragging(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = { ...position };

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Calculate new position
        const newX = Math.max(5, Math.min(95, startPos.x + (deltaX / window.innerWidth) * 100));
        const newY = Math.max(10, Math.min(window.innerHeight - 100, startPos.y + deltaY));

        setPosition({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}%`,
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backgroundColor: isDragging ? 'var(--color-bg-surface-solid)' : 'var(--color-bg-surface-strong)',
        backdropFilter: `blur(${SPACING_SCALE.SM}px)`,
        borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
        boxShadow: isDragging
          ? BOX_SHADOW_SCALE.elevation5
          : BOX_SHADOW_SCALE.elevation3,
        padding: `${SPACING_SCALE.SM}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}>
      <button
        onClick={() => !isDragging && setIsOpen(!isOpen)}
        style={{
          background: currentModel ? 'var(--la-color-primary, var(--color-semantic-info-border))' : 'var(--la-color-neutral, var(--color-text-secondary))',
          color: 'var(--la-color-white, var(--color-text-on-primary))',
          border: 'none',
          borderRadius: `${BORDER_RADIUS_SCALE.BUTTON}px`,
          padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`,
          fontSize: `${FONT_SIZES.XS}px`, // Design token για compact button
          fontWeight: 'var(--la-font-weight-semibold, var(--font-weight-semibold))',
          cursor: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: `${SPACING_SCALE.SM}px`,
          minWidth: 'var(--la-width-min-200, var(--la-width-min-dropdown))',
          justifyContent: 'space-between'
        }}
      >
        <span>{currentModel || 'Select Device Model'}</span>
        <span style={{ fontSize: `${FONT_SIZES.XS - 2}px` }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          minWidth: `${SPACING_SCALE.XXXXL * 3}px`, // Design token για dropdown width
          marginTop: `${SPACING_SCALE.SM}px`,
          backgroundColor: 'var(--la-color-surface)', // WHITE BACKGROUND για καλύτερη ορατότητα συσκευών
          borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
          boxShadow: BOX_SHADOW_SCALE.modalDefault,
          overflow: 'hidden',
          maxHeight: SPACING_SCALE.XXXXL * 6 + 'px', // 6 * 96px = 576px - Larger for better UX
          overflowY: 'auto'
        }}>
          <button
            onClick={() => {
              onModelSelect(null);
              setIsOpen(false);
            }}
            style={{
              width: '100%',
              padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.MD}px`, // Μικρότερο vertical padding
              border: 'none',
              background: !currentModel ? '#e3f2fd' : 'var(--la-color-surface)', // Ξεκάθαρα χρώματα
              color: 'var(--la-text-primary)', // Μαύρο κείμενο για καλύτερη ορατότητα
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: `${FONT_SIZES.XS}px`, // Design token για "Responsive View"
              fontWeight: !currentModel ? 'var(--la-font-weight-semibold, var(--la-font-weight-semibold))' : 'var(--la-font-weight-normal, var(--la-font-weight-normal))',
              borderBottom: 'var(--la-border-default, var(--la-border-width-default) solid var(--la-color-border-default))',
              whiteSpace: 'nowrap' // Αποτρέπει το αναδίπλωμα
            }}
          >
            🖥️ Responsive View (No Frame)
          </button>

          {Object.entries(deviceCategories).map(([category, devices]) => (
            <div key={category}>
              <div style={{
                padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.MD}px`, // Μικρότερο vertical padding για category headers
                fontSize: `${FONT_SIZES.XS - 3}px`, // Extra compact για category headers
                fontWeight: 'var(--la-font-weight-semibold, var(--la-font-weight-semibold))',
                color: 'var(--la-text-primary)', // Σκούρο γκρι κείμενο για καλύτερη ορατότητα
                backgroundColor: '#f5f5f5', // Ανοικτό γκρι για category headers
                borderTop: 'var(--la-border-default, var(--la-border-width-default) solid var(--la-color-border-default))',
                borderBottom: 'var(--la-border-default, var(--la-border-width-default) solid var(--la-color-border-default))',
                whiteSpace: 'nowrap' // Αποτρέπει το αναδίπλωμα category headers
              }}>
                {category}
              </div>
              {devices.map((device) => (
                <button
                  key={device}
                  onClick={() => {
                    onModelSelect(device);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.MD}px ${SPACING_SCALE.XS}px ${SPACING_SCALE.LG + SPACING_SCALE.SM}px`, // Μικρότερο vertical padding
                    border: 'none',
                    background: currentModel === device ? '#e3f2fd' : 'var(--la-color-surface)', // Ξεκάθαρα χρώματα για device selection
                    color: 'var(--la-text-primary)', // Μαύρο κείμενο για καλύτερη ορατότητα
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: `${FONT_SIZES.XS}px`, // Design token για device names
                    fontWeight: currentModel === device ? 'var(--la-font-weight-semibold, var(--la-font-weight-semibold))' : 'var(--la-font-weight-normal, var(--la-font-weight-normal))',
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap' // Αποτρέπει το αναδίπλωμα device names
                  }}
                  onMouseOver={(e) => {
                    if (currentModel !== device) {
                      e.currentTarget.style.background = 'var(--la-bg-hover, var(--la-color-surface-hover))';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentModel !== device) {
                      e.currentTarget.style.background = 'var(--la-color-surface)';
                    }
                  }}
                >
                  {device}
                  <span style={{
                    fontSize: `${FONT_SIZES.XS - 4}px`, // Extra compact για διαστάσεις
                    color: 'var(--la-text-tertiary, var(--la-color-text-tertiary))',
                    marginLeft: `${SPACING_SCALE.SM}px`
                  }}>
                    ({deviceSpecs[device].width}x{deviceSpecs[device].height})
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const getDeviceSpecs = (model: DeviceModel): DeviceSpecs => {
  return deviceSpecs[model];
};