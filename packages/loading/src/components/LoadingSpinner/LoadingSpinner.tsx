import React from 'react';
import { Spinner } from '../Spinner';
import type { LoadingSpinnerProps } from '../../types';
import './LoadingSpinner.css';

/**
 * LoadingSpinner - Enhanced spinner με overlay και message
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  overlay = false,
  message,
  centered = false,
  size = 'md',
  variant = 'default',
  color,
  speed = 'normal',
  className = ''
}) => {
  const containerClasses = [
    'layera-loading-spinner',
    overlay && 'layera-loading-spinner--overlay',
    centered && 'layera-loading-spinner--centered',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className="layera-loading-spinner__content">
        <Spinner
          size={size}
          variant={variant}
          color={color}
          speed={speed}
        />
        {message && (
          <div className="layera-loading-spinner__message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};