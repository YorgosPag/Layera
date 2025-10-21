import React from 'react';

export interface DeviceFrameProps {
  device: 'iPhone X' | 'iPhone 8' | 'iPhone 8 Plus' | 'Samsung Galaxy S8' | 'iPad' | 'MacBook Pro';
  color?: 'black' | 'silver' | 'gold' | 'rose-gold' | 'space-gray';
  landscape?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  device,
  color = 'black',
  landscape = false,
  children,
  className
}) => {
  // Dynamic import to handle the problematic dependency
  const [DeviceFrameset, setDeviceFrameset] = React.useState<any>(null);

  React.useEffect(() => {
    import('react-device-frameset').then((module) => {
      setDeviceFrameset(() => module.default || module);
    });
  }, []);

  if (!DeviceFrameset) {
    return <div className={className}>{children}</div>;
  }

  return React.createElement(DeviceFrameset, {
    device,
    color,
    landscape,
    className
  }, children);
};

export default DeviceFrame;