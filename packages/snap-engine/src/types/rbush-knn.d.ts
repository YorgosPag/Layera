// Type definitions for rbush-knn - Enterprise TypeScript strict mode
declare module 'rbush-knn' {
  import RBush from 'rbush';

  // Generic spatial item with bounding box
  interface SpatialItem {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  }

  interface KNNOptions<T extends SpatialItem> {
    k?: number;
    maxDistance?: number;
    predicate?: (item: T) => boolean;
  }

  // Strongly typed KNN function overloads
  function knn<T extends SpatialItem>(
    tree: RBush<T>,
    x: number,
    y: number,
    n?: number,
    predicate?: (item: T) => boolean,
    maxDistance?: number
  ): T[];

  function knn<T extends SpatialItem>(
    tree: RBush<T>,
    x: number,
    y: number,
    options?: KNNOptions<T>
  ): T[];

  export = knn;
}