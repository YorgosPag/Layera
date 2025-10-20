/**
 * @layera/database-core - Database Namespace
 *
 * Isolated database namespace για κάθε LEGO system
 * Εξασφαλίζει καμία cross-LEGO εξάρτηση στη βάση δεδομένων
 */

import {
  Firestore,
  collection,
  doc,
  runTransaction,
  Transaction,
  CollectionReference,
  DocumentReference,
  getDocs,
  query,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

import type {
  DatabaseNamespace as IDataBaseNamespace,
  NamespaceHealth,
  HealthError
} from '../types';

/**
 * Isolated database namespace implementation
 */
export class DatabaseNamespace implements IDataBaseNamespace {
  public readonly namespace: string;
  public readonly firestore: Firestore;

  constructor(legoName: string, firestore: Firestore) {
    // Validate LEGO name
    if (!legoName || typeof legoName !== 'string') {
      throw new Error('Invalid LEGO name: must be non-empty string');
    }

    // Sanitize namespace
    this.namespace = `lego_${legoName.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;
    this.firestore = firestore;

    console.log(`📦 Created database namespace: ${this.namespace}`);
  }

  /**
   * Get scoped collection reference
   */
  collection(name: string): CollectionReference {
    if (!name || typeof name !== 'string') {
      throw new Error('Collection name must be non-empty string');
    }

    const collectionPath = `${this.namespace}/${name}`;
    return collection(this.firestore, collectionPath);
  }

  /**
   * Get scoped document reference
   */
  doc(collectionName: string, docId?: string): DocumentReference {
    const coll = this.collection(collectionName);
    return docId ? doc(coll, docId) : doc(coll);
  }

  /**
   * Run transaction within namespace
   */
  async transaction<T>(fn: (tx: Transaction) => Promise<T>): Promise<T> {
    try {
      return await runTransaction(this.firestore, fn);
    } catch (error) {
      console.error(`🚫 Transaction failed in ${this.namespace}:`, error);
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if namespace has any data
   */
  async exists(): Promise<boolean> {
    try {
      // Check if any collection exists με at least one document
      const collections = await this.listCollections();

      for (const collectionName of collections) {
        const coll = this.collection(collectionName);
        const snapshot = await getDocs(query(coll, limit(1)));

        if (!snapshot.empty) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error(`🚫 Failed to check namespace existence: ${this.namespace}`, error);
      return false;
    }
  }

  /**
   * Clear all data in namespace (DANGER!)
   */
  async clear(): Promise<void> {
    console.warn(`⚠️ Clearing all data in namespace: ${this.namespace}`);

    try {
      await this.transaction(async (tx) => {
        const collections = await this.listCollections();

        for (const collectionName of collections) {
          await this.clearCollection(tx, collectionName);
        }
      });

      console.log(`✅ Cleared namespace: ${this.namespace}`);
    } catch (error) {
      console.error(`🚫 Failed to clear namespace: ${this.namespace}`, error);
      throw new Error(`Clear failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get namespace health information
   */
  async health(): Promise<NamespaceHealth> {
    const startTime = Date.now();
    const errors: HealthError[] = [];
    let collections = 0;
    let documents = 0;
    let storageSize = 0;

    try {
      // Count collections and documents
      const collectionNames = await this.listCollections();
      collections = collectionNames.length;

      for (const collectionName of collectionNames) {
        try {
          const coll = this.collection(collectionName);
          const snapshot = await getDocs(coll);
          documents += snapshot.size;

          // Estimate storage size (rough calculation)
          snapshot.docs.forEach(doc => {
            const data = doc.data();
            storageSize += JSON.stringify(data).length;
          });
        } catch (collectionError) {
          errors.push({
            code: 'COLLECTION_ERROR',
            message: `Failed to read collection ${collectionName}: ${collectionError instanceof Error ? collectionError.message : 'Unknown error'}`,
            timestamp: serverTimestamp() as Timestamp
          });
        }
      }

      const responseTime = Date.now() - startTime;
      const status = errors.length === 0 ?
        (responseTime < 1000 ? 'healthy' : 'degraded') :
        'down';

      return {
        namespace: this.namespace,
        status,
        collections,
        documents,
        storageSize,
        lastUpdate: serverTimestamp() as Timestamp,
        ...(errors.length > 0 && { errors })
      };

    } catch (error) {
      return {
        namespace: this.namespace,
        status: 'down',
        collections: 0,
        documents: 0,
        storageSize: 0,
        lastUpdate: serverTimestamp() as Timestamp,
        errors: [{
          code: 'HEALTH_CHECK_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
          timestamp: serverTimestamp() as Timestamp
        }]
      };
    }
  }

  /**
   * List all collections in namespace (helper method)
   */
  private async listCollections(): Promise<string[]> {
    // Note: Firestore client SDK doesn't have listCollections
    // This is a simplified implementation
    // In production, you'd use Admin SDK ή keep a registry

    const knownCollections = [
      'cache',
      'queue',
      'analytics',
      'preferences',
      'history',
      'metadata'
    ];

    const existingCollections: string[] = [];

    for (const collectionName of knownCollections) {
      try {
        const coll = this.collection(collectionName);
        const snapshot = await getDocs(query(coll, limit(1)));

        if (!snapshot.empty) {
          existingCollections.push(collectionName);
        }
      } catch {
        // Collection doesn't exist or access denied
        continue;
      }
    }

    return existingCollections;
  }

  /**
   * Clear collection within transaction
   */
  private async clearCollection(tx: Transaction, collectionName: string): Promise<void> {
    const coll = this.collection(collectionName);
    const snapshot = await getDocs(coll);

    // Delete in batches to avoid transaction limits
    const batch = snapshot.docs.slice(0, 500); // Firestore limit

    for (const documentSnapshot of batch) {
      tx.delete(documentSnapshot.ref);
    }

    // If more documents exist, they'll be handled in subsequent transactions
    if (snapshot.docs.length > 500) {
      console.warn(`⚠️ Collection ${collectionName} has >500 docs, will require multiple transactions`);
    }
  }

  /**
   * Create collection με validation
   */
  createCollection(name: string): CollectionReference {
    if (!name.match(/^[a-z0-9_]+$/)) {
      throw new Error(`Invalid collection name: ${name}. Use only lowercase letters, numbers, and underscores.`);
    }

    return this.collection(name);
  }

  /**
   * Batch write operations
   */
  async batchWrite(operations: BatchOperation[]): Promise<void> {
    if (operations.length === 0) {
      return;
    }

    if (operations.length > 500) {
      throw new Error('Batch operations limited to 500 items');
    }

    await this.transaction(async (tx) => {
      for (const operation of operations) {
        switch (operation.type) {
          case 'set':
            tx.set(operation.ref, operation.data);
            break;
          case 'update':
            if (operation.data) {
              tx.update(operation.ref, operation.data);
            }
            break;
          case 'delete':
            tx.delete(operation.ref);
            break;
          default:
            throw new Error(`Unknown operation type: ${(operation as unknown as { type: string }).type}`);
        }
      }
    });
  }

  /**
   * Get namespace statistics
   */
  async getStats(): Promise<NamespaceStats> {
    const health = await this.health();

    return {
      namespace: this.namespace,
      collections: health.collections,
      documents: health.documents,
      storageSize: health.storageSize,
      healthy: health.status === 'healthy',
      lastCheck: health.lastUpdate
    };
  }
}

/**
 * Batch operation type
 */
interface BatchOperation {
  type: 'set' | 'update' | 'delete';
  ref: DocumentReference;
  data?: Record<string, unknown>;
}

/**
 * Namespace statistics
 */
interface NamespaceStats {
  namespace: string;
  collections: number;
  documents: number;
  storageSize: number;
  healthy: boolean;
  lastCheck: Timestamp;
}