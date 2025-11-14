/**
 * @layera/database-core - Main Export
 *
 * Enterprise database core για LEGO systems
 * Παρέχει isolated namespaces και caching για κάθε LEGO
 */

// Core classes
export { DatabaseNamespace } from './namespaces/namespace';
export { FirestoreCache } from './cache/firestore-cache';

// Type exports
export type {
  DatabaseConfig,
  DatabaseNamespace as IDatabaseNamespace,
  CollectionSchema,
  DocumentSchema,
  FieldDefinition,
  ValidationRule,
  IndexDefinition,
  IndexField,
  MigrationStrategy,
  MigrationFunction,
  TTLPolicy,
  SecurityRule,
  PerformanceHint,
  NamespaceHealth,
  HealthError,
  CacheStrategy,
  CacheStats,
  EventBus,
  LegoEvent,
  EventHandler,
  UnsubscribeFunction,
  DatabaseRegistry,
  LegoInfo,
  QueryBuilder,
  WhereOperator,
  QueryResult,
  QueryMetadata,
  RealtimeSubscription,
  SnapshotCallback,
  ErrorCallback
} from './types';

// Utilities
export { createDatabaseNamespace, initializeFirestore } from './utils/factory';

// Constants
export const DATABASE_CORE_VERSION = '1.0.0';