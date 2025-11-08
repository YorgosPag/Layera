/**
 * Layera Loading - Components Export
 */

export { Spinner } from './spinner';
export { Skeleton } from './skeleton';
export { SkeletonText } from './SkeletonText';
export { LoadingSpinner } from './LoadingSpinner';

// ============= ALIAS EXPORTS για App Compatibility =============
// Export aliases to maintain backward compatibility
export { Spinner as LoadingSpinner2 } from './spinner'; // Alternative alias
export { LoadingSpinner as Spinner2 } from './LoadingSpinner'; // Alternative alias

// Common expected names
export { Spinner as SpinnerComponent } from './spinner';
export { LoadingSpinner as LoadingComponent } from './LoadingSpinner';
export { Skeleton as SkeletonComponent } from './skeleton';
export { SkeletonText as SkeletonTextComponent } from './SkeletonText';