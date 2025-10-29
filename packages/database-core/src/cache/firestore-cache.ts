/**
 * @layera/database-core - Firestore Cache Strategy
 *
 * Enterprise caching layer με TTL support και automatic cleanup
 * Χρησιμοποιεί Firestore ως persistent cache store
 */

import {
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

import type { CacheStrategy, CacheStats } from '../types';
import type { DatabaseNamespace } from '../namespaces/namespace';

/**
 * Firestore-based cache implementation
 */
export class FirestoreCache implements CacheStrategy {
  private namespace: DatabaseNamespace;
  private collectionName: string;
  private defaultTTL: number;

  constructor(
    namespace: DatabaseNamespace,
    collectionName = 'cache',
    defaultTTL = 24 * 60 * 60 * 1000 // 24 hours
  ) {
    this.namespace = namespace;
    this.collectionName = collectionName;
    this.defaultTTL = defaultTTL;
  }

  /**
   * Get cached value
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const cacheDoc = await this.getCacheDocument(key);

      if (!cacheDoc.exists()) {
        return null;
      }

      const data = cacheDoc.data();
      if (!data) {
        return null;
      }

      // Check TTL
      const now = Date.now();
      const expiresAt = data.expiresAt?.toMillis() || 0;

      if (expiresAt > 0 && now > expiresAt) {
        // Expired - delete silently
        await this.delete(key);
        return null;
      }

      // Update access statistics
      await this.updateAccessStats(key);

      return data.value as T;

    } catch (error) {
      console.error(`🚫 Cache get failed for key: ${key}`, error);
      return null;
    }
  }

  /**
   * Set cached value με TTL
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const actualTTL = ttl || this.defaultTTL;
      const expiresAt = actualTTL > 0 ?
        new Date(Date.now() + actualTTL) :
        null;

      const cacheData: CacheDocument<T> = {
        key,
        value,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
        expiresAt: expiresAt ? Timestamp.fromDate(expiresAt) : null,
        hits: 0,
        lastAccess: serverTimestamp() as Timestamp
      };

      const docRef = this.getCacheDocumentRef(key);
      await setDoc(docRef, cacheData);

    } catch (error) {
      console.error(`🚫 Cache set failed for key: ${key}`, error);
      throw error;
    }
  }

  /**
   * Delete cached value
   */
  async delete(key: string): Promise<void> {
    try {
      const docRef = this.getCacheDocumentRef(key);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`🚫 Cache delete failed for key: ${key}`, error);
      throw error;
    }
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    try {
      const coll = this.namespace.collection(this.collectionName);
      const snapshot = await getDocs(coll);

      // Delete in batches
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error(`🚫 Cache clear failed`, error);
      throw error;
    }
  }

  /**
   * Get cache statistics
   */
  async stats(): Promise<CacheStats> {
    try {
      const coll = this.namespace.collection(this.collectionName);
      const snapshot = await getDocs(coll);

      let totalHits = 0;
      let totalKeys = snapshot.size;
      let memoryUsage = 0;
      let expiredKeys = 0;

      const now = Date.now();

      snapshot.docs.forEach(doc => {
        const data = doc.data() as CacheDocument<unknown>;

        totalHits += data.hits || 0;

        // Estimate memory usage
        memoryUsage += JSON.stringify(data).length;

        // Count expired
        if (data.expiresAt && now > data.expiresAt.toMillis()) {
          expiredKeys++;
        }
      });

      const hitRate = totalKeys > 0 ? (totalHits / totalKeys) * 100 : 0;

      return {
        keys: totalKeys,
        hitRate,
        memoryUsage,
        evictions: expiredKeys
      };

    } catch (error) {
      console.error('🚫 Cache stats failed', error);
      return {
        keys: 0,
        hitRate: 0,
        memoryUsage: 0,
        evictions: 0
      };
    }
  }

  /**
   * Cleanup expired entries
   */
  async cleanup(): Promise<number> {
    try {
      const coll = this.namespace.collection(this.collectionName);
      const now = Timestamp.now();

      // Query for expired documents
      const expiredQuery = query(
        coll,
        where('expiresAt', '<=', now)
      );

      const snapshot = await getDocs(expiredQuery);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));

      await Promise.all(deletePromises);

      const cleanedCount = snapshot.size;
      if (cleanedCount > 0) {
      }

      return cleanedCount;

    } catch (error) {
      console.error('🚫 Cache cleanup failed', error);
      return 0;
    }
  }

  /**
   * Preload popular keys
   */
  async preload(keys: string[]): Promise<void> {
    try {
      const loadPromises = keys.map(key => this.get(key));
      await Promise.all(loadPromises);
    } catch (error) {
      console.error('🚫 Cache preload failed', error);
    }
  }

  /**
   * Get cache document reference
   */
  private getCacheDocumentRef(key: string) {
    // Sanitize key για Firestore
    const sanitizedKey = key.replace(/[/\\#\$\[\]]/g, '_');
    return this.namespace.doc(this.collectionName, sanitizedKey);
  }

  /**
   * Get cache document
   */
  private async getCacheDocument(key: string) {
    const docRef = this.getCacheDocumentRef(key);
    return await getDoc(docRef);
  }

  /**
   * Update access statistics
   */
  private async updateAccessStats(key: string): Promise<void> {
    try {
      const docRef = this.getCacheDocumentRef(key);

      await this.namespace.transaction(async (tx) => {
        const doc = await tx.get(docRef);
        if (doc.exists()) {
          const data = doc.data() as CacheDocument<unknown>;
          tx.update(docRef, {
            hits: (data.hits || 0) + 1,
            lastAccess: serverTimestamp()
          });
        }
      });
    } catch (error) {
      // Non-critical error - don't fail the get operation
      console.warn(`⚠️ Failed to update access stats for key: ${key}`, error);
    }
  }

  /**
   * Get key info for debugging
   */
  async getKeyInfo(key: string): Promise<CacheKeyInfo | null> {
    try {
      const doc = await this.getCacheDocument(key);
      if (!doc.exists()) {
        return null;
      }

      const data = doc.data() as CacheDocument<unknown>;
      const now = Date.now();
      const isExpired = data.expiresAt ? now > data.expiresAt.toMillis() : false;

      return {
        key,
        exists: true,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        expiresAt: data.expiresAt,
        hits: data.hits || 0,
        lastAccess: data.lastAccess,
        isExpired,
        size: JSON.stringify(data.value).length
      };

    } catch (error) {
      console.error(`🚫 Get key info failed: ${key}`, error);
      return null;
    }
  }
}

/**
 * Cache document structure
 */
interface CacheDocument<T> {
  key: string;
  value: T;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt: Timestamp | null;
  hits: number;
  lastAccess: Timestamp;
}

/**
 * Cache key information
 */
interface CacheKeyInfo {
  key: string;
  exists: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt: Timestamp | null;
  hits: number;
  lastAccess: Timestamp;
  isExpired: boolean;
  size: number;
}