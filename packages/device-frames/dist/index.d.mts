import React from 'react';

interface DeviceFrameProps {
    device: 'iPhone X' | 'iPhone 8' | 'iPhone 8 Plus' | 'Samsung Galaxy S8' | 'iPad' | 'MacBook Pro';
    color?: 'black' | 'silver' | 'gold' | 'rose-gold' | 'space-gray';
    landscape?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare const DeviceFrame: React.FC<DeviceFrameProps>;

export { DeviceFrame, type DeviceFrameProps, DeviceFrame as default };
