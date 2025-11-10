/**
 * @layera/boundary-service - Factory
 *
 * Factory functions για εύκολη δημιουργία boundary service
 */

import { createDatabaseNamespace } from '@layera/database-core';
import { BoundaryService } from './service';
import type { BoundaryServiceConfig } from './types';

/**
 * Create boundary service με default configuration
 */
export function createBoundaryService(
  config?: Partial<BoundaryServiceConfig>
): BoundaryService {
  // Default configuration
  const defaultConfig: BoundaryServiceConfig = {
    providers: [
      {
        type: 'osm',
        priority: 1,
        config: {
          endpoint: 'https://overpass-api.de/api/interpreter',
          timeout: 5000
        }
      },
      {
        type: 'nominatim',
        priority: 2,
        config: {
          endpoint: 'https://nominatim.openstreetmap.org',
          timeout: 3000
        }
      }
    ],
    cache: {
      ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
      cleanupInterval: 60 * 60 * 1000 // 1 hour
    },
    queue: {
      maxSize: 1000,
      processingInterval: 5 * 60 * 1000, // 5 minutes
      retry: {
        maxAttempts: 3,
        baseDelay: 1000,
        backoffMultiplier: 2,
        maxDelay: 30000
      }
    },
    defaults: {
      adminLevels: [4, 6, 8],
      timeout: 5000,
      includeApproximate: true
    }
  };

  // Merge configurations
  const finalConfig = {
    ...defaultConfig,
    ...config,
    providers: config?.providers || defaultConfig.providers,
    cache: { ...defaultConfig.cache, ...config?.cache },
    queue: { ...defaultConfig.queue, ...config?.queue },
    defaults: { ...defaultConfig.defaults, ...config?.defaults }
  };

  // Create database namespace
  const namespace = createDatabaseNamespace('boundary_service');

  // Create service
  return new BoundaryService(finalConfig, namespace);
}

/**
 * Create boundary service για testing
 */
export function createTestBoundaryService(): BoundaryService {
  return createBoundaryService({
    cache: {
      ttl: 5 * 60 * 1000, // 5 minutes για testing
      cleanupInterval: 60 * 1000 // 1 minute
    },
    defaults: {
      timeout: 1000, // Short timeout για tests
      includeApproximate: true
    }
  });
}