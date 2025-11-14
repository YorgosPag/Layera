/**
 * @layera/database-core - Core Types
 *
 * Type definitions για enterprise database με LEGO isolation
 * ΚΑΜΙΑ χρήση any - TypeScript strict mode
 */

import type {
  Firestore,
  CollectionReference,
  DocumentReference,
  Transaction,
  Timestamp
} from 'firebase/firestore';

/**
 * Database configuration για LEGO system
 */
export interface DatabaseConfig {
  /** Unique LEGO name (θα γίνει namespace) */
  legoName: string;
  /** Semantic version */
  version: string;
  /** Collection schemas */
  collections: CollectionSchema[];
  /** Required indexes */
  indexes: IndexDefinition[];
  /** Migration strategies */
  migrations?: MigrationStrategy[];
  /** TTL policies */
  ttlPolicies?: TTLPolicy[];
}

/**
 * Collection schema definition
 */
export interface CollectionSchema {
  /** Collection name */
  name: string;
  /** Data schema validation */
  schema: DocumentSchema;
  /** Security rules */
  security?: SecurityRule[];
  /** Performance hints */
  performance?: PerformanceHint[];
}

/**
 * Document schema validation
 */
export interface DocumentSchema {
  /** Required fields */
  required: string[];
  /** Field type definitions */
  properties: Record<string, FieldDefinition>;
  /** Additional properties allowed */
  additionalProperties: boolean;
}

/**
 * Field type definition
 */
export interface FieldDefinition {
  /** Field type */
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'timestamp' | 'geopoint';
  /** Optional field */
  optional?: boolean;
  /** Validation rules */
  validation?: ValidationRule[];
  /** Index hint */
  indexed?: boolean;
}

/**
 * Validation rule
 */
export interface ValidationRule {
  /** Rule type */
  rule: 'min' | 'max' | 'pattern' | 'enum' | 'custom';
  /** Rule value */
  value: unknown;
  /** Error message */
  message: string;
}

/**
 * Index definition
 */
export interface IndexDefinition {
  /** Collection name */
  collection: string;
  /** Fields to index */
  fields: IndexField[];
  /** Unique constraint */
  unique?: boolean;
  /** Array contains optimization */
  arrayContains?: boolean;
}

/**
 * Index field specification
 */
export interface IndexField {
  /** Field name */
  field: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
}

/**
 * Migration strategy
 */
export interface MigrationStrategy {
  /** From version */
  from: string;
  /** To version */
  to: string;
  /** Migration function */
  migrate: MigrationFunction;
  /** Rollback function */
  rollback?: MigrationFunction;
}

/**
 * Migration function type
 */
export type MigrationFunction = (
  namespace: DatabaseNamespace,
  transaction: Transaction
) => Promise<void>;

/**
 * TTL (Time To Live) policy
 */
export interface TTLPolicy {
  /** Collection name */
  collection: string;
  /** TTL field name */
  field: string;
  /** Default TTL in milliseconds */
  ttl: number;
}

/**
 * Security rule definition
 */
export interface SecurityRule {
  /** Operation type */
  operation: 'read' | 'write' | 'create' | 'update' | 'delete';
  /** Rule condition */
  condition: string;
  /** Rule description */
  description: string;
}

/**
 * Performance hint
 */
export interface PerformanceHint {
  /** Hint type */
  type: 'cache' | 'index' | 'partition' | 'limit';
  /** Hint configuration */
  config: Record<string, unknown>;
}

/**
 * Database namespace interface
 */
export interface DatabaseNamespace {
  /** Namespace identifier */
  readonly namespace: string;
  /** Firestore instance */
  readonly firestore: Firestore;
  /** Get collection reference */
  collection(name: string): CollectionReference;
  /** Run transaction */
  transaction<T>(fn: (tx: Transaction) => Promise<T>): Promise<T>;
  /** Check if namespace exists */
  exists(): Promise<boolean>;
  /** Clear all data in namespace */
  clear(): Promise<void>;
  /** Get namespace health */
  health(): Promise<NamespaceHealth>;
}

/**
 * Namespace health status
 */
export interface NamespaceHealth {
  /** Namespace identifier */
  namespace: string;
  /** Health status */
  status: 'healthy' | 'degraded' | 'down';
  /** Collection count */
  collections: number;
  /** Document count */
  documents: number;
  /** Storage size in bytes */
  storageSize: number;
  /** Last update timestamp */
  lastUpdate: Timestamp;
  /** Error details if unhealthy */
  errors?: HealthError[];
}

/**
 * Health error details
 */
export interface HealthError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error timestamp */
  timestamp: Timestamp;
}

/**
 * Cache strategy interface
 */
export interface CacheStrategy {
  /** Get cached value */
  get<T>(key: string): Promise<T | null>;
  /** Set cached value */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  /** Delete cached value */
  delete(key: string): Promise<void>;
  /** Clear all cache */
  clear(): Promise<void>;
  /** Get cache statistics */
  stats(): Promise<CacheStats>;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  /** Total keys */
  keys: number;
  /** Hit rate percentage */
  hitRate: number;
  /** Memory usage in bytes */
  memoryUsage: number;
  /** Evicted keys count */
  evictions: number;
}

/**
 * Event bus interface για inter-LEGO communication
 */
export interface EventBus {
  /** Publish event */
  publish(event: LegoEvent): Promise<void>;
  /** Subscribe to events */
  subscribe(type: string, handler: EventHandler): UnsubscribeFunction;
  /** Replay events από timestamp */
  replay(from: Date, to?: Date): Promise<LegoEvent[]>;
}

/**
 * LEGO event structure
 */
export interface LegoEvent {
  /** Event ID */
  id: string;
  /** Source LEGO */
  source: string;
  /** Event type */
  type: string;
  /** Event data */
  data: unknown;
  /** Event timestamp */
  timestamp: Timestamp;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Event handler function
 */
export type EventHandler = (event: LegoEvent) => void | Promise<void>;

/**
 * Unsubscribe function
 */
export type UnsubscribeFunction = () => void;

/**
 * Database registry interface
 */
export interface DatabaseRegistry {
  /** Register LEGO database */
  register(config: DatabaseConfig): Promise<DatabaseNamespace>;
  /** Unregister LEGO database */
  unregister(legoName: string): Promise<void>;
  /** Get namespace */
  getNamespace(legoName: string): DatabaseNamespace | null;
  /** List all registered LEGOs */
  list(): Promise<LegoInfo[]>;
  /** Health check για όλα τα LEGOs */
  healthCheck(): Promise<NamespaceHealth[]>;
}

/**
 * LEGO information
 */
export interface LegoInfo {
  /** LEGO name */
  name: string;
  /** Version */
  version: string;
  /** Namespace */
  namespace: string;
  /** Registration timestamp */
  registered: Timestamp;
  /** Collections count */
  collections: number;
  /** Status */
  status: 'active' | 'inactive' | 'migrating';
}

/**
 * Query builder interface
 */
export interface QueryBuilder<T = unknown> {
  /** Where clause */
  where(field: string, operator: WhereOperator, value: unknown): QueryBuilder<T>;
  /** Order by clause */
  orderBy(field: string, direction?: 'asc' | 'desc'): QueryBuilder<T>;
  /** Limit results */
  limit(count: number): QueryBuilder<T>;
  /** Start after document */
  startAfter(doc: DocumentReference): QueryBuilder<T>;
  /** Execute query */
  get(): Promise<QueryResult<T>>;
}

/**
 * Where operators
 */
export type WhereOperator =
  | '==' | '!=' | '<' | '<=' | '>' | '>='
  | 'array-contains' | 'array-contains-any' | 'in' | 'not-in';

/**
 * Query result
 */
export interface QueryResult<T = unknown> {
  /** Result documents */
  docs: T[];
  /** Result metadata */
  metadata: QueryMetadata;
}

/**
 * Query metadata
 */
export interface QueryMetadata {
  /** From cache flag */
  fromCache: boolean;
  /** Has pending writes */
  hasPendingWrites: boolean;
  /** Result size */
  size: number;
}

/**
 * Real-time subscription interface
 */
export interface RealtimeSubscription<T = unknown> {
  /** Subscription callback */
  onSnapshot(callback: SnapshotCallback<T>): UnsubscribeFunction;
  /** Error callback */
  onError(callback: ErrorCallback): void;
}

/**
 * Snapshot callback
 */
export type SnapshotCallback<T> = (data: T[], metadata: QueryMetadata) => void;

/**
 * Error callback
 */
export type ErrorCallback = (error: Error) => void;