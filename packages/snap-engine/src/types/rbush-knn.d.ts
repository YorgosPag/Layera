// Type definitions for rbush-knn
declare module 'rbush-knn' {
  import RBush from 'rbush';

  interface KNNOptions {
    k?: number;
    maxDistance?: number;
    predicate?: (item: any) => boolean;
  }

  function knn(
    tree: RBush<any>,
    x: number,
    y: number,
    n?: number,
    predicate?: (item: any) => boolean,
    maxDistance?: number
  ): any[];

  function knn(
    tree: RBush<any>,
    x: number,
    y: number,
    options?: KNNOptions
  ): any[];

  export = knn;
}