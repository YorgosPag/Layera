// Type definitions for rbush-knn
declare module 'rbush-knn' {
  import RBush from 'rbush';

  interface KNNOptions {
    k?: number;
    maxDistance?: number;
    predicate?: (item: unknown) => boolean;
  }

  function knn(
    tree: RBush<any>,
    x: number,
    y: number,
    n?: number,
    predicate?: (item: unknown) => boolean,
    maxDistance?: number
  ): unknown[];

  function knn(
    tree: RBush<any>,
    x: number,
    y: number,
    options?: KNNOptions
  ): unknown[];

  export = knn;
}