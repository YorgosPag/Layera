import React, { useState } from 'react';
import { ErrorDetails } from '../ErrorDetails';
import { getErrorSeverity, isNetworkError, isChunkError } from '../../utils';
import { ERROR_MESSAGES, ERROR_ICON_SIZES } from '../../constants';
import type { ErrorFallbackProps } from '../../types';
import './ErrorFallback.css';

/**
 * ErrorFallback - Default fallback UI για errors
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  retry,
  level = 'component',
  className = ''
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const severity = getErrorSeverity(error);
  const isNetwork = isNetworkError(error);
  const isChunk = isChunkError(error);

  const getErrorIcon = () => {
    if (isNetwork) {
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="m21 12-6-3-6 3-6-3"/>
        </svg>
      );
    }

    if (isChunk) {
      return (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      );
    }

    switch (severity) {
      case 'critical':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        );
      case 'high':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        );
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        );
    }
  };

  const getErrorTitle = () => {
    if (isNetwork) return ERROR_MESSAGES.NETWORK_TITLE;
    if (isChunk) return ERROR_MESSAGES.CHUNK_TITLE;

    switch (level) {
      case 'page':
        return ERROR_MESSAGES.PAGE_TITLE;
      case 'section':
        return ERROR_MESSAGES.SECTION_TITLE;
      default:
        return ERROR_MESSAGES.COMPONENT_TITLE;
    }
  };

  const getErrorMessage = () => {
    if (isNetwork) {
      return ERROR_MESSAGES.NETWORK_MESSAGE;
    }

    if (isChunk) {
      return ERROR_MESSAGES.CHUNK_MESSAGE;
    }

    switch (level) {
      case 'page':
        return ERROR_MESSAGES.PAGE_MESSAGE;
      case 'section':
        return ERROR_MESSAGES.SECTION_MESSAGE;
      default:
        return ERROR_MESSAGES.COMPONENT_MESSAGE;
    }
  };

  const getRetryText = () => {
    if (isNetwork) return ERROR_MESSAGES.NETWORK_RETRY;
    if (isChunk) return ERROR_MESSAGES.CHUNK_RETRY;
    return ERROR_MESSAGES.GENERIC_RETRY;
  };

  const handleRetry = () => {
    if (isChunk) {
      window.location.reload();
    } else {
      retry();
    }
  };

  const fallbackClasses = [
    'layera-error-fallback',
    `layera-error-fallback--${level}`,
    `layera-error-fallback--${severity}`,
    isNetwork && 'layera-error-fallback--network',
    isChunk && 'layera-error-fallback--chunk',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fallbackClasses} role="alert">
      <div className="layera-error-fallback__content">
        <div className="layera-error-fallback__icon">
          {getErrorIcon()}
        </div>

        <div className="layera-error-fallback__text">
          <h2 className="layera-error-fallback__title">
            {getErrorTitle()}
          </h2>
          <p className="layera-error-fallback__message">
            {getErrorMessage()}
          </p>
        </div>

        <div className="layera-error-fallback__actions">
          <button
            type="button"
            className="layera-error-fallback__retry"
            onClick={handleRetry}
          >
            {getRetryText()}
          </button>

          {process.env.NODE_ENV === 'development' && (
            <button
              type="button"
              className="layera-error-fallback__details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? ERROR_MESSAGES.HIDE_DETAILS : ERROR_MESSAGES.SHOW_DETAILS}
            </button>
          )}
        </div>

        {showDetails && (
          <ErrorDetails
            error={error}
            errorInfo={errorInfo}
            errorId={`error-${Date.now()}`}
            expanded={true}
          />
        )}
      </div>
    </div>
  );
};