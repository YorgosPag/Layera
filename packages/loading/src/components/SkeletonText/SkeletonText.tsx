import React from 'react';
import { Skeleton } from '../Skeleton';
import type { SkeletonTextProps } from '../../types';
import './SkeletonText.css';

/**
 * SkeletonText - Multi-line text skeleton
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  spacing = 'md',
  lastLineWidth = '75%',
  className = ''
}) => {
  const containerClasses = [
    'layera-skeleton-text',
    `layera-skeleton-text--spacing-${spacing}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          animation="wave"
        />
      ))}
    </div>
  );
};