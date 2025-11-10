/**
 * @layera/boundary-service - Main Export
 *
 * Enterprise boundary service με καθολική υποστήριξη περιοχών
 */

// Main service
export { BoundaryService } from './service';

// Types
export type {
  BoundaryServiceConfig,
  BoundaryProvider,
  BoundaryOptions,
  BoundaryResult,
  BoundaryMetadata,
  ProviderConfig,
  ProviderApiConfig,
  ProviderOptions,
  BoundingBox,
  CacheConfig,
  QueueConfig,
  RetryConfig,
  ProviderHealth,
  ServiceHealth,
  GeocodingResult,
  QueueRequest,
  QueueProcessor,
  QueueStats,
  BoundaryEvent,
  BoundarySubscriptionCallback,
  BoundaryServiceError,
  ProviderError,
  CacheError,
  QueueError
} from './types';

// Factory function για quick setup
export { createBoundaryService } from './factory';

// Version
export const BOUNDARY_SERVICE_VERSION = '1.0.0';