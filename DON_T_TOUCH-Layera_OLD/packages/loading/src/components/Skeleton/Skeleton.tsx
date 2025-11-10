import React from 'react';
import { Box } from '@layera/layout';
import type { SkeletonProps } from '../../types';
import './Skeleton.css';

/**
 * Skeleton - Βασικό skeleton component για loading placeholders
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1em',
  variant = 'text',
  animation = 'wave',
  className = ''
}) => {
  const skeletonClasses = [
    'layera-skeleton',
    `layera-skeleton--${variant}`,
    animation !== 'none' && `layera-skeleton--${animation}`,
    className
  ].filter(Boolean).join(' ');

  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };

  return (
    <Box
      className={skeletonClasses}
      style={skeletonStyle}
      aria-hidden="true"
    />
  );
};