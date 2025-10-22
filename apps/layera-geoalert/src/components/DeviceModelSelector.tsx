import React, { useState } from 'react';

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
  'iPhone X': { width: 375, height: 812, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 40, frameColor: '#1c1c1e' },
  'iPhone 8': { width: 375, height: 667, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 25, frameColor: '#f0f0f0' },
  'iPhone 8 Plus': { width: 414, height: 736, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 25, frameColor: '#f0f0f0' },
  'iPhone 12 Pro': { width: 390, height: 844, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 45, frameColor: '#1c1c1e' },
  'iPhone 14 Pro Max': { width: 430, height: 932, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 50, frameColor: '#1c1c1e' },
  'Samsung Galaxy S21': { width: 384, height: 854, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#000000' },
  'Samsung Galaxy S22': { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#1c1c1e' },
  'Samsung Galaxy S22 Ultra': { width: 412, height: 908, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#000000' },
  'Samsung Galaxy S23': { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#1c1c1e' },
  'Samsung Galaxy S23 Ultra': { width: 412, height: 908, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#000000' },
  'Samsung Galaxy S24': { width: 393, height: 851, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#1c1c1e' },
  'Samsung Galaxy S24 Ultra': { width: 412, height: 926, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#000000' },
  'Samsung Galaxy Z Fold 5': { width: 904, height: 905, scale: 0.8, hasNotch: false, hasHomeBar: false, borderRadius: 30, frameColor: '#000000' },
  'Samsung Galaxy Z Flip 5': { width: 390, height: 876, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: '#1c1c1e' },
  'Google Pixel 5': { width: 393, height: 851, scale: 1, hasNotch: false, hasHomeBar: true, borderRadius: 30, frameColor: '#202124' },
  'iPad Air': { width: 820, height: 1180, scale: 0.7, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: '#e5e5e7' },
  'iPad Pro 11"': { width: 834, height: 1194, scale: 0.7, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: '#1c1c1e' },
  'iPad Pro 12.9"': { width: 1024, height: 1366, scale: 0.6, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: '#1c1c1e' },
  'Surface Pro 7': { width: 912, height: 1368, scale: 0.6, hasNotch: false, hasHomeBar: false, borderRadius: 0, frameColor: '#000000' },
  'MacBook Pro 13"': { width: 1440, height: 900, scale: 0.5, hasNotch: false, hasHomeBar: false, borderRadius: 10, frameColor: '#e5e5e7' },
  'iMac 24"': { width: 1920, height: 1080, scale: 0.7, hasNotch: false, hasHomeBar: false, borderRadius: 15, frameColor: '#f0f0f0' }
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
        backgroundColor: isDragging ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        boxShadow: isDragging
          ? '0 8px 30px rgba(0,0,0,0.2)'
          : '0 4px 20px rgba(0,0,0,0.1)',
        padding: '8px',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}>
      <button
        onClick={() => !isDragging && setIsOpen(!isOpen)}
        style={{
          background: currentModel ? '#4F46E5' : '#6B7280',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '200px',
          justifyContent: 'space-between'
        }}
      >
        <span>{currentModel || 'Select Device Model'}</span>
        <span style={{ fontSize: '12px' }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          marginTop: '8px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <button
            onClick={() => {
              onModelSelect(null);
              setIsOpen(false);
            }}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              background: !currentModel ? '#EBF5FF' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: !currentModel ? '600' : '400',
              borderBottom: '1px solid #E5E7EB'
            }}
          >
            🖥️ Responsive View (No Frame)
          </button>

          {Object.entries(deviceCategories).map(([category, devices]) => (
            <div key={category}>
              <div style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                backgroundColor: '#F9FAFB',
                borderTop: '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB'
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
                    padding: '10px 16px 10px 32px',
                    border: 'none',
                    background: currentModel === device ? '#EBF5FF' : 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: currentModel === device ? '600' : '400',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (currentModel !== device) {
                      e.currentTarget.style.background = '#F3F4F6';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentModel !== device) {
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  {device}
                  <span style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    marginLeft: '8px'
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