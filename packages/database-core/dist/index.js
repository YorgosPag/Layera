"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DATABASE_CORE_VERSION: () => DATABASE_CORE_VERSION,
  DatabaseNamespace: () => DatabaseNamespace,
  FirestoreCache: () => FirestoreCache,
  createDatabaseNamespace: () => createDatabaseNamespace,
  initializeFirestore: () => initializeFirestore
});
module.exports = __toCommonJS(index_exports);

// src/namespaces/namespace.ts
var import_firestore = require("firebase/firestore");
var DatabaseNamespace = class {
  constructor(legoName, firestore) {
    __publicField(this, "namespace");
    __publicField(this, "firestore");
    if (!legoName || typeof legoName !== "string") {
      throw new Error("Invalid LEGO name: must be non-empty string");
    }
    this.namespace = `lego_${legoName.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`;
    this.firestore = firestore;
    console.log(`\u{1F4E6} Created database namespace: ${this.namespace}`);
  }
  /**
   * Get scoped collection reference
   */
  collection(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Collection name must be non-empty string");
    }
    const collectionPath = `${this.namespace}/${name}`;
    return (0, import_firestore.collection)(this.firestore, collectionPath);
  }
  /**
   * Get scoped document reference
   */
  doc(collectionName, docId) {
    const coll = this.collection(collectionName);
    return docId ? (0, import_firestore.doc)(coll, docId) : (0, import_firestore.doc)(coll);
  }
  /**
   * Run transaction within namespace
   */
  async transaction(fn) {
    try {
      return await (0, import_firestore.runTransaction)(this.firestore, fn);
    } catch (error) {
      console.error(`\u{1F6AB} Transaction failed in ${this.namespace}:`, error);
      throw new Error(`Transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  /**
   * Check if namespace has any data
   */
  async exists() {
    try {
      const collections = await this.listCollections();
      for (const collectionName of collections) {
        const coll = this.collection(collectionName);
        const snapshot = await (0, import_firestore.getDocs)((0, import_firestore.query)(coll, (0, import_firestore.limit)(1)));
        if (!snapshot.empty) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(`\u{1F6AB} Failed to check namespace existence: ${this.namespace}`, error);
      return false;
    }
  }
  /**
   * Clear all data in namespace (DANGER!)
   */
  async clear() {
    console.warn(`\u26A0\uFE0F Clearing all data in namespace: ${this.namespace}`);
    try {
      await this.transaction(async (tx) => {
        const collections = await this.listCollections();
        for (const collectionName of collections) {
          await this.clearCollection(tx, collectionName);
        }
      });
      console.log(`\u2705 Cleared namespace: ${this.namespace}`);
    } catch (error) {
      console.error(`\u{1F6AB} Failed to clear namespace: ${this.namespace}`, error);
      throw new Error(`Clear failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  /**
   * Get namespace health information
   */
  async health() {
    const startTime = Date.now();
    const errors = [];
    let collections = 0;
    let documents = 0;
    let storageSize = 0;
    try {
      const collectionNames = await this.listCollections();
      collections = collectionNames.length;
      for (const collectionName of collectionNames) {
        try {
          const coll = this.collection(collectionName);
          const snapshot = await (0, import_firestore.getDocs)(coll);
          documents += snapshot.size;
          snapshot.docs.forEach((doc2) => {
            const data = doc2.data();
            storageSize += JSON.stringify(data).length;
          });
        } catch (collectionError) {
          errors.push({
            code: "COLLECTION_ERROR",
            message: `Failed to read collection ${collectionName}: ${collectionError instanceof Error ? collectionError.message : "Unknown error"}`,
            timestamp: (0, import_firestore.serverTimestamp)()
          });
        }
      }
      const responseTime = Date.now() - startTime;
      const status = errors.length === 0 ? responseTime < 1e3 ? "healthy" : "degraded" : "down";
      return {
        namespace: this.namespace,
        status,
        collections,
        documents,
        storageSize,
        lastUpdate: (0, import_firestore.serverTimestamp)(),
        ...errors.length > 0 && { errors }
      };
    } catch (error) {
      return {
        namespace: this.namespace,
        status: "down",
        collections: 0,
        documents: 0,
        storageSize: 0,
        lastUpdate: (0, import_firestore.serverTimestamp)(),
        errors: [{
          code: "HEALTH_CHECK_ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
          timestamp: (0, import_firestore.serverTimestamp)()
        }]
      };
    }
  }
  /**
   * List all collections in namespace (helper method)
   */
  async listCollections() {
    const knownCollections = [
      "cache",
      "queue",
      "analytics",
      "preferences",
      "history",
      "metadata"
    ];
    const existingCollections = [];
    for (const collectionName of knownCollections) {
      try {
        const coll = this.collection(collectionName);
        const snapshot = await (0, import_firestore.getDocs)((0, import_firestore.query)(coll, (0, import_firestore.limit)(1)));
        if (!snapshot.empty) {
          existingCollections.push(collectionName);
        }
      } catch {
        continue;
      }
    }
    return existingCollections;
  }
  /**
   * Clear collection within transaction
   */
  async clearCollection(tx, collectionName) {
    const coll = this.collection(collectionName);
    const snapshot = await (0, import_firestore.getDocs)(coll);
    const batch = snapshot.docs.slice(0, 500);
    for (const documentSnapshot of batch) {
      tx.delete(documentSnapshot.ref);
    }
    if (snapshot.docs.length > 500) {
      console.warn(`\u26A0\uFE0F Collection ${collectionName} has >500 docs, will require multiple transactions`);
    }
  }
  /**
   * Create collection με validation
   */
  createCollection(name) {
    if (!name.match(/^[a-z0-9_]+$/)) {
      throw new Error(`Invalid collection name: ${name}. Use only lowercase letters, numbers, and underscores.`);
    }
    return this.collection(name);
  }
  /**
   * Batch write operations
   */
  async batchWrite(operations) {
    if (operations.length === 0) {
      return;
    }
    if (operations.length > 500) {
      throw new Error("Batch operations limited to 500 items");
    }
    await this.transaction(async (tx) => {
      for (const operation of operations) {
        switch (operation.type) {
          case "set":
            tx.set(operation.ref, operation.data);
            break;
          case "update":
            if (operation.data) {
              tx.update(operation.ref, operation.data);
            }
            break;
          case "delete":
            tx.delete(operation.ref);
            break;
          default:
            throw new Error(`Unknown operation type: ${operation.type}`);
        }
      }
    });
  }
  /**
   * Get namespace statistics
   */
  async getStats() {
    const health = await this.health();
    return {
      namespace: this.namespace,
      collections: health.collections,
      documents: health.documents,
      storageSize: health.storageSize,
      healthy: health.status === "healthy",
      lastCheck: health.lastUpdate
    };
  }
};

// src/cache/firestore-cache.ts
var import_firestore2 = require("firebase/firestore");
var FirestoreCache = class {
  constructor(namespace, collectionName = "cache", defaultTTL = 24 * 60 * 60 * 1e3) {
    __publicField(this, "namespace");
    __publicField(this, "collectionName");
    __publicField(this, "defaultTTL");
    this.namespace = namespace;
    this.collectionName = collectionName;
    this.defaultTTL = defaultTTL;
    console.log(`\u{1F4BE} Created Firestore cache: ${namespace.namespace}/${collectionName}`);
  }
  /**
   * Get cached value
   */
  async get(key) {
    try {
      const cacheDoc = await this.getCacheDocument(key);
      if (!cacheDoc.exists()) {
        return null;
      }
      const data = cacheDoc.data();
      if (!data) {
        return null;
      }
      const now = Date.now();
      const expiresAt = data.expiresAt?.toMillis() || 0;
      if (expiresAt > 0 && now > expiresAt) {
        await this.delete(key);
        return null;
      }
      await this.updateAccessStats(key);
      return data.value;
    } catch (error) {
      console.error(`\u{1F6AB} Cache get failed for key: ${key}`, error);
      return null;
    }
  }
  /**
   * Set cached value με TTL
   */
  async set(key, value, ttl) {
    try {
      const actualTTL = ttl || this.defaultTTL;
      const expiresAt = actualTTL > 0 ? new Date(Date.now() + actualTTL) : null;
      const cacheData = {
        key,
        value,
        createdAt: (0, import_firestore2.serverTimestamp)(),
        updatedAt: (0, import_firestore2.serverTimestamp)(),
        expiresAt: expiresAt ? import_firestore2.Timestamp.fromDate(expiresAt) : null,
        hits: 0,
        lastAccess: (0, import_firestore2.serverTimestamp)()
      };
      const docRef = this.getCacheDocumentRef(key);
      await (0, import_firestore2.setDoc)(docRef, cacheData);
    } catch (error) {
      console.error(`\u{1F6AB} Cache set failed for key: ${key}`, error);
      throw error;
    }
  }
  /**
   * Delete cached value
   */
  async delete(key) {
    try {
      const docRef = this.getCacheDocumentRef(key);
      await (0, import_firestore2.deleteDoc)(docRef);
    } catch (error) {
      console.error(`\u{1F6AB} Cache delete failed for key: ${key}`, error);
      throw error;
    }
  }
  /**
   * Clear all cache
   */
  async clear() {
    try {
      const coll = this.namespace.collection(this.collectionName);
      const snapshot = await (0, import_firestore2.getDocs)(coll);
      const deletePromises = snapshot.docs.map((doc2) => (0, import_firestore2.deleteDoc)(doc2.ref));
      await Promise.all(deletePromises);
      console.log(`\u2705 Cleared cache: ${this.namespace.namespace}/${this.collectionName}`);
    } catch (error) {
      console.error(`\u{1F6AB} Cache clear failed`, error);
      throw error;
    }
  }
  /**
   * Get cache statistics
   */
  async stats() {
    try {
      const coll = this.namespace.collection(this.collectionName);
      const snapshot = await (0, import_firestore2.getDocs)(coll);
      let totalHits = 0;
      let totalKeys = snapshot.size;
      let memoryUsage = 0;
      let expiredKeys = 0;
      const now = Date.now();
      snapshot.docs.forEach((doc2) => {
        const data = doc2.data();
        totalHits += data.hits || 0;
        memoryUsage += JSON.stringify(data).length;
        if (data.expiresAt && now > data.expiresAt.toMillis()) {
          expiredKeys++;
        }
      });
      const hitRate = totalKeys > 0 ? totalHits / totalKeys * 100 : 0;
      return {
        keys: totalKeys,
        hitRate,
        memoryUsage,
        evictions: expiredKeys
      };
    } catch (error) {
      console.error("\u{1F6AB} Cache stats failed", error);
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
  async cleanup() {
    try {
      const coll = this.namespace.collection(this.collectionName);
      const now = import_firestore2.Timestamp.now();
      const expiredQuery = (0, import_firestore2.query)(
        coll,
        (0, import_firestore2.where)("expiresAt", "<=", now)
      );
      const snapshot = await (0, import_firestore2.getDocs)(expiredQuery);
      const deletePromises = snapshot.docs.map((doc2) => (0, import_firestore2.deleteDoc)(doc2.ref));
      await Promise.all(deletePromises);
      const cleanedCount = snapshot.size;
      if (cleanedCount > 0) {
        console.log(`\u{1F9F9} Cleaned ${cleanedCount} expired cache entries`);
      }
      return cleanedCount;
    } catch (error) {
      console.error("\u{1F6AB} Cache cleanup failed", error);
      return 0;
    }
  }
  /**
   * Preload popular keys
   */
  async preload(keys) {
    try {
      const loadPromises = keys.map((key) => this.get(key));
      await Promise.all(loadPromises);
      console.log(`\u{1F4E6} Preloaded ${keys.length} cache keys`);
    } catch (error) {
      console.error("\u{1F6AB} Cache preload failed", error);
    }
  }
  /**
   * Get cache document reference
   */
  getCacheDocumentRef(key) {
    const sanitizedKey = key.replace(/[/\\#\$\[\]]/g, "_");
    return this.namespace.doc(this.collectionName, sanitizedKey);
  }
  /**
   * Get cache document
   */
  async getCacheDocument(key) {
    const docRef = this.getCacheDocumentRef(key);
    return await (0, import_firestore2.getDoc)(docRef);
  }
  /**
   * Update access statistics
   */
  async updateAccessStats(key) {
    try {
      const docRef = this.getCacheDocumentRef(key);
      await this.namespace.transaction(async (tx) => {
        const doc2 = await tx.get(docRef);
        if (doc2.exists()) {
          const data = doc2.data();
          tx.update(docRef, {
            hits: (data.hits || 0) + 1,
            lastAccess: (0, import_firestore2.serverTimestamp)()
          });
        }
      });
    } catch (error) {
      console.warn(`\u26A0\uFE0F Failed to update access stats for key: ${key}`, error);
    }
  }
  /**
   * Get key info for debugging
   */
  async getKeyInfo(key) {
    try {
      const doc2 = await this.getCacheDocument(key);
      if (!doc2.exists()) {
        return null;
      }
      const data = doc2.data();
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
      console.error(`\u{1F6AB} Get key info failed: ${key}`, error);
      return null;
    }
  }
};

// src/utils/factory.ts
var import_app = require("firebase/app");
var import_firestore3 = require("firebase/firestore");
function initializeFirestore(config) {
  let app;
  const existingApps = (0, import_app.getApps)();
  if (existingApps.length > 0) {
    app = existingApps[0];
  } else {
    const firebaseConfig = config || getDefaultConfig();
    app = (0, import_app.initializeApp)(firebaseConfig);
  }
  const firestore = (0, import_firestore3.getFirestore)(app);
  if (process.env.NODE_ENV === "development" && !isEmulatorConnected(firestore)) {
    try {
      (0, import_firestore3.connectFirestoreEmulator)(firestore, "localhost", 8080);
      console.log("\u{1F527} Connected to Firestore emulator");
    } catch (error) {
      console.log("\u{1F4E1} Using production Firestore");
    }
  }
  return firestore;
}
function createDatabaseNamespace(legoName, firestore) {
  const db = firestore || initializeFirestore();
  return new DatabaseNamespace(legoName, db);
}
function getDefaultConfig() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID || process.env.REACT_APP_FIREBASE_APP_ID
  };
  const requiredFields = ["projectId", "apiKey", "authDomain"];
  const missingFields = requiredFields.filter((field) => !config[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing Firebase configuration: ${missingFields.join(", ")}`);
  }
  return config;
}
function isEmulatorConnected(firestore) {
  try {
    const settings = firestore._delegate?._settings;
    return settings?.host?.includes("localhost") || false;
  } catch {
    return false;
  }
}

// src/index.ts
var DATABASE_CORE_VERSION = "1.0.0";
//# sourceMappingURL=index.js.map