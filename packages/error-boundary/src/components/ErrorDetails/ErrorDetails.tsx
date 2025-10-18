import React from 'react';
import { formatError } from '../../utils';
import type { ErrorDetailsProps } from '../../types';
import './ErrorDetails.css';

/**
 * ErrorDetails - Detailed error information για debugging
 */
export const ErrorDetails: React.FC<ErrorDetailsProps> = ({
  error,
  errorInfo,
  errorId,
  expanded = false,
  onToggle,
  className = ''
}) => {
  const detailsClasses = [
    'layera-error-details',
    expanded && 'layera-error-details--expanded',
    className
  ].filter(Boolean).join(' ');

  const copyToClipboard = async () => {
    const errorReport = {
      errorId,
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2));
      // Show success message (could integrate with notification system)
      console.log('Error details copied to clipboard');
    } catch (err) {
      console.error('Failed to copy error details:', err);
    }
  };

  return (
    <div className={detailsClasses}>
      <div className="layera-error-details__header">
        <h3 className="layera-error-details__title">
          Error Details
        </h3>
        <div className="layera-error-details__actions">
          <button
            type="button"
            className="layera-error-details__copy"
            onClick={copyToClipboard}
            title="Copy error details"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          {onToggle && (
            <button
              type="button"
              className="layera-error-details__toggle"
              onClick={onToggle}
              title={expanded ? "Collapse details" : "Expand details"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 150ms ease'
                }}
              >
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="layera-error-details__content">
          <div className="layera-error-details__section">
            <h4 className="layera-error-details__section-title">Error Information</h4>
            <div className="layera-error-details__field">
              <span className="layera-error-details__label">ID:</span>
              <code className="layera-error-details__value">{errorId}</code>
            </div>
            <div className="layera-error-details__field">
              <span className="layera-error-details__label">Type:</span>
              <code className="layera-error-details__value">{error.name}</code>
            </div>
            <div className="layera-error-details__field">
              <span className="layera-error-details__label">Message:</span>
              <code className="layera-error-details__value">{error.message}</code>
            </div>
            <div className="layera-error-details__field">
              <span className="layera-error-details__label">Timestamp:</span>
              <code className="layera-error-details__value">
                {new Date().toISOString()}
              </code>
            </div>
          </div>

          {error.stack && (
            <div className="layera-error-details__section">
              <h4 className="layera-error-details__section-title">Stack Trace</h4>
              <pre className="layera-error-details__stack">
                <code>{error.stack}</code>
              </pre>
            </div>
          )}

          {errorInfo.componentStack && (
            <div className="layera-error-details__section">
              <h4 className="layera-error-details__section-title">Component Stack</h4>
              <pre className="layera-error-details__stack">
                <code>{errorInfo.componentStack}</code>
              </pre>
            </div>
          )}

          <div className="layera-error-details__section">
            <h4 className="layera-error-details__section-title">Environment</h4>
            <div className="layera-error-details__field">
              <span className="layera-error-details__label">URL:</span>
              <code className="layera-error-details__value">{window.location.href}</code>
            </div>
            <div className="layera-error-details__field">
              <span className="layera-error-details__label">User Agent:</span>
              <code className="layera-error-details__value">{navigator.userAgent}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};