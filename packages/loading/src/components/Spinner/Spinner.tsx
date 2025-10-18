import React from 'react';
import type { SpinnerProps } from '../../types';
import './Spinner.css';

/**
 * Spinner - Βασικό loading spinner component
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  color,
  speed = 'normal',
  className = ''
}) => {
  const spinnerClasses = [
    'layera-spinner',
    `layera-spinner--${size}`,
    `layera-spinner--${variant}`,
    `layera-spinner--speed-${speed}`,
    className
  ].filter(Boolean).join(' ');

  const spinnerStyle = color ? { color } : undefined;

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={spinnerClasses} style={spinnerStyle}>
            <div className="layera-spinner__dot" />
            <div className="layera-spinner__dot" />
            <div className="layera-spinner__dot" />
          </div>
        );

      case 'pulse':
        return (
          <div className={spinnerClasses} style={spinnerStyle}>
            <div className="layera-spinner__pulse" />
          </div>
        );

      case 'ring':
        return (
          <div className={spinnerClasses} style={spinnerStyle}>
            <div className="layera-spinner__ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        );

      case 'bars':
        return (
          <div className={spinnerClasses} style={spinnerStyle}>
            <div className="layera-spinner__bars">
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        );

      default:
        return (
          <div className={spinnerClasses} style={spinnerStyle}>
            <svg
              className="layera-spinner__circle"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle
                className="layera-spinner__track"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.2"
              />
              <circle
                className="layera-spinner__progress"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              />
            </svg>
          </div>
        );
    }
  };

  return renderSpinner();
};