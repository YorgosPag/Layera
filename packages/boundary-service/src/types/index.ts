/**
 * @layera/boundary-service - Types
 *
 * Type definitions για enterprise boundary service
 * ΚΑΜΙΑ χρήση any - TypeScript strict mode
 */

import type { GeoJSONFeatureCollection } from '@layera/geo-core';

/**
 * Boundary service configuration
 */
export interface BoundaryServiceConfig {
  /** Providers configuration */
  providers: ProviderConfig[];
  /** Cache configuration */
  cache?: CacheConfig;
  /** Queue configuration */
  queue?: QueueConfig;
  /** Default options */
  defaults?: BoundaryOptions;
}

/**
 * Provider configuration
 */
export interface ProviderConfig {
  /** Provider type */
  type: 'osm' | 'nominatim' | 'mapbox' | 'google';
  /** Provider priority (lower = higher priority) */
  priority: number;
  /** API configuration */
  config: ProviderApiConfig;
  /** Provider-specific options */
  options?: ProviderOptions;
}

/**
 * Provider API configuration
 */
export interface ProviderApiConfig {
  /** API endpoint URL */
  endpoint?: string;
  /** API key (για paid services) */
  apiKey?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Rate limiting */
  rateLimit?: RateLimitConfig;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  /** Requests per second */
  requestsPerSecond: number;
  /** Burst limit */
  burst?: number;
}

/**
 * Provider options
 */
export interface ProviderOptions {
  /** Maximum results to return */
  maxResults?: number;
  /** Language preference */
  language?: string;
  /** Country bias */
  countryBias?: string;
  /** Bounding box για search area */
  bbox?: BoundingBox;
}

/**
 * Bounding box
 */
export interface BoundingBox {
  /** South latitude */
  south: number;
  /** West longitude */
  west: number;
  /** North latitude */
  north: number;
  /** East longitude */
  east: number;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Cache TTL in milliseconds */
  ttl: number;
  /** Maximum cache size */
  maxSize?: number;
  /** Cleanup interval in milliseconds */
  cleanupInterval?: number;
}

/**
 * Queue configuration
 */
export interface QueueConfig {
  /** Maximum queue size */
  maxSize: number;
  /** Processing interval in milliseconds */
  processingInterval: number;
  /** Retry configuration */
  retry: RetryConfig;
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  /** Maximum retry attempts */
  maxAttempts: number;
  /** Base delay in milliseconds */
  baseDelay: number;
  /** Exponential backoff multiplier */
  backoffMultiplier: number;
  /** Maximum delay in milliseconds */
  maxDelay: number;
}

/**
 * Boundary search options
 */
export interface BoundaryOptions {
  /** Administrative levels to search */
  adminLevels?: number[];
  /** Language preference */
  language?: string;
  /** Country code για filtering */
  countryCode?: string;
  /** Search timeout in milliseconds */
  timeout?: number;
  /** Force fresh API call (skip cache) */
  forceFresh?: boolean;
  /** Include approximate results */
  includeApproximate?: boolean;
}

/**
 * Boundary result
 */
export interface BoundaryResult {
  /** GeoJSON feature collection */
  boundary: GeoJSONFeatureCollection;
  /** Result metadata */
  metadata: BoundaryMetadata;
}

/**
 * Boundary metadata
 */
export interface BoundaryMetadata {
  /** Source provider */
  source: string;
  /** Search query used */
  query: string;
  /** Response time in milliseconds */
  responseTime: number;
  /** From cache flag */
  fromCache: boolean;
  /** Confidence score (0-1) */
  confidence: number;
  /** Is approximate result */
  isApproximate: boolean;
  /** Cache TTL in milliseconds */
  cacheTtl?: number;
  /** Administrative level */
  adminLevel?: number;
  /** Country code */
  countryCode?: string;
}

/**
 * Provider interface
 */
export interface BoundaryProvider {
  /** Provider name */
  readonly name: string;
  /** Provider priority */
  readonly priority: number;
  /** Provider configuration */
  readonly config: ProviderApiConfig;

  /** Check if provider is available */
  isAvailable(): Promise<boolean>;
  /** Fetch boundary για search query */
  fetchBoundary(query: string, options?: BoundaryOptions): Promise<BoundaryResult | null>;
  /** Get provider health status */
  getHealth(): Promise<ProviderHealth>;
}

/**
 * Provider health status
 */
export interface ProviderHealth {
  /** Provider name */
  provider: string;
  /** Health status */
  status: 'healthy' | 'degraded' | 'down';
  /** Response time in milliseconds */
  responseTime: number;
  /** Success rate percentage */
  successRate: number;
  /** Error count in last hour */
  errorCount: number;
  /** Last successful request timestamp */
  lastSuccess: Date | null;
  /** Last error */
  lastError: string | null;
}

/**
 * Queue request
 */
export interface QueueRequest {
  /** Unique request ID */
  id: string;
  /** Search query */
  query: string;
  /** Search options */
  options?: BoundaryOptions;
  /** Request priority */
  priority: 'low' | 'medium' | 'high';
  /** Created timestamp */
  createdAt: Date;
  /** Scheduled processing time */
  scheduledAt: Date;
  /** Processing attempts */
  attempts: number;
  /** Request status */
  status: 'pending' | 'processing' | 'completed' | 'failed';
  /** Error message if failed */
  error?: string;
}

/**
 * Queue processor interface
 */
export interface QueueProcessor {
  /** Process pending requests */
  process(): Promise<void>;
  /** Add request to queue */
  enqueue(request: Omit<QueueRequest, 'id' | 'createdAt' | 'attempts' | 'status'>): Promise<void>;
  /** Get queue statistics */
  getStats(): Promise<QueueStats>;
}

/**
 * Queue statistics
 */
export interface QueueStats {
  /** Total requests in queue */
  total: number;
  /** Pending requests */
  pending: number;
  /** Processing requests */
  processing: number;
  /** Completed requests (last 24h) */
  completed: number;
  /** Failed requests (last 24h) */
  failed: number;
  /** Average processing time */
  avgProcessingTime: number;
}

/**
 * Geocoding result για approximate boundaries
 */
export interface GeocodingResult {
  /** Location name */
  name: string;
  /** Coordinates */
  coordinates: {
    latitude: number;
    longitude: number;
  };
  /** Bounding box */
  bbox?: BoundingBox;
  /** Administrative info */
  admin?: {
    country?: string;
    region?: string;
    city?: string;
  };
  /** Confidence score */
  confidence: number;
}

/**
 * Service health status
 */
export interface ServiceHealth {
  /** Overall service status */
  status: 'healthy' | 'degraded' | 'down';
  /** Provider health status */
  providers: ProviderHealth[];
  /** Cache health */
  cache: {
    status: 'healthy' | 'degraded' | 'down';
    hitRate: number;
    size: number;
  };
  /** Queue health */
  queue: {
    status: 'healthy' | 'degraded' | 'down';
    size: number;
    processingRate: number;
  };
  /** Last health check */
  lastCheck: Date;
}

/**
 * Event types για boundary service
 */
export type BoundaryEvent =
  | { type: 'boundary.found'; data: { query: string; result: BoundaryResult } }
  | { type: 'boundary.cached'; data: { query: string; ttl: number } }
  | { type: 'boundary.queued'; data: { query: string; priority: string } }
  | { type: 'provider.failed'; data: { provider: string; error: string } }
  | { type: 'service.degraded'; data: { reason: string } };

/**
 * Subscription callback για boundary updates
 */
export type BoundarySubscriptionCallback = (result: BoundaryResult) => void;

/**
 * Error types
 */
export class BoundaryServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly provider?: string
  ) {
    super(message);
    this.name = 'BoundaryServiceError';
  }
}

export class ProviderError extends BoundaryServiceError {
  constructor(
    message: string,
    provider: string,
    public readonly statusCode?: number
  ) {
    super(message, 'PROVIDER_ERROR', provider);
    this.name = 'ProviderError';
  }
}

export class CacheError extends BoundaryServiceError {
  constructor(message: string) {
    super(message, 'CACHE_ERROR');
    this.name = 'CacheError';
  }
}

export class QueueError extends BoundaryServiceError {
  constructor(message: string) {
    super(message, 'QUEUE_ERROR');
    this.name = 'QueueError';
  }
}