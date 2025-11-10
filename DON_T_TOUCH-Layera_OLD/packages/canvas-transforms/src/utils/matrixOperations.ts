import type { TransformationMatrix, Point2D, BoundingBox } from '../types';

/**
 * Matrix operations utilities για canvas transformations
 * Βασισμένο σε industry-standard matrix math operations
 */

/**
 * Creates identity transformation matrix
 */
export const createIdentityMatrix = (): TransformationMatrix => ({
  a: 1, b: 0, c: 0,
  d: 1, e: 0, f: 0
});

/**
 * Creates translation matrix
 */
export const createTranslationMatrix = (x: number, y: number): TransformationMatrix => ({
  a: 1, b: 0, c: 0,
  d: 1, e: x, f: y
});

/**
 * Creates scaling matrix
 */
export const createScaleMatrix = (scaleX: number, scaleY: number = scaleX): TransformationMatrix => ({
  a: scaleX, b: 0, c: 0,
  d: scaleY, e: 0, f: 0
});

/**
 * Creates rotation matrix
 */
export const createRotationMatrix = (angle: number): TransformationMatrix => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    a: cos, b: sin, c: -sin,
    d: cos, e: 0, f: 0
  };
};

/**
 * Creates rotation matrix around specific point
 */
export const createRotationAroundPointMatrix = (
  angle: number,
  centerX: number,
  centerY: number
): TransformationMatrix => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    a: cos,
    b: sin,
    c: -sin,
    d: cos,
    e: centerX * (1 - cos) + centerY * sin,
    f: centerY * (1 - cos) - centerX * sin
  };
};

/**
 * Multiplies two transformation matrices
 */
export const multiplyMatrices = (
  m1: TransformationMatrix,
  m2: TransformationMatrix
): TransformationMatrix => ({
  a: m1.a * m2.a + m1.b * m2.c,
  b: m1.a * m2.b + m1.b * m2.d,
  c: m1.c * m2.a + m1.d * m2.c,
  d: m1.c * m2.b + m1.d * m2.d,
  e: m1.e * m2.a + m1.f * m2.c + m2.e,
  f: m1.e * m2.b + m1.f * m2.d + m2.f
});

/**
 * Calculates matrix determinant
 */
export const getMatrixDeterminant = (matrix: TransformationMatrix): number => {
  return matrix.a * matrix.d - matrix.b * matrix.c;
};

/**
 * Calculates inverse transformation matrix
 */
export const invertMatrix = (matrix: TransformationMatrix): TransformationMatrix => {
  const det = getMatrixDeterminant(matrix);

  if (Math.abs(det) < 1e-10) {
    throw new Error('Matrix is not invertible (determinant is zero)');
  }

  const invDet = 1 / det;

  return {
    a: matrix.d * invDet,
    b: -matrix.b * invDet,
    c: -matrix.c * invDet,
    d: matrix.a * invDet,
    e: (matrix.c * matrix.f - matrix.d * matrix.e) * invDet,
    f: (matrix.b * matrix.e - matrix.a * matrix.f) * invDet
  };
};

/**
 * Transforms a point using transformation matrix
 */
export const transformPoint = (
  point: Point2D,
  matrix: TransformationMatrix
): Point2D => ({
  x: matrix.a * point.x + matrix.c * point.y + matrix.e,
  y: matrix.b * point.x + matrix.d * point.y + matrix.f
});

/**
 * Transforms multiple points efficiently
 */
export const transformPoints = (
  points: Point2D[],
  matrix: TransformationMatrix
): Point2D[] => points.map(point => transformPoint(point, matrix));

/**
 * Transforms bounding box using transformation matrix
 */
export const transformBoundingBox = (
  bounds: BoundingBox,
  matrix: TransformationMatrix
): BoundingBox => {
  // Transform all four corners
  const corners: Point2D[] = [
    { x: bounds.minX, y: bounds.minY },
    { x: bounds.maxX, y: bounds.minY },
    { x: bounds.maxX, y: bounds.maxY },
    { x: bounds.minX, y: bounds.maxY }
  ];

  const transformedCorners = transformPoints(corners, matrix);

  // Find new bounds
  const xs = transformedCorners.map(p => p.x);
  const ys = transformedCorners.map(p => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY
  };
};

/**
 * Decomposes transformation matrix into components
 */
export const decompose = (matrix: TransformationMatrix) => {
  const { a, b, c, d, e, f } = matrix;

  // Extract translation
  const translation = { x: e, y: f };

  // Extract scale
  const scaleX = Math.sqrt(a * a + b * b);
  const scaleY = Math.sqrt(c * c + d * d);

  // Extract rotation
  const rotation = Math.atan2(b, a);

  // Extract skew
  const skewX = Math.atan2(a * c + b * d, scaleX * scaleX);
  const skewY = 0; // For affine transformations

  return {
    translation,
    scale: { x: scaleX, y: scaleY },
    rotation,
    skew: { x: skewX, y: skewY }
  };
};

/**
 * Composes transformation from individual components
 */
export const compose = (
  translation: Point2D = { x: 0, y: 0 },
  scale: Point2D = { x: 1, y: 1 },
  rotation: number = 0,
  origin: Point2D = { x: 0, y: 0 }
): TransformationMatrix => {
  // Create individual transformation matrices
  const translateToOrigin = createTranslationMatrix(-origin.x, -origin.y);
  const scaleMatrix = createScaleMatrix(scale.x, scale.y);
  const rotateMatrix = createRotationMatrix(rotation);
  const translateFromOrigin = createTranslationMatrix(origin.x, origin.y);
  const translateMatrix = createTranslationMatrix(translation.x, translation.y);

  // Compose transformations: translate * translateFromOrigin * rotate * scale * translateToOrigin
  let result = translateToOrigin;
  result = multiplyMatrices(scaleMatrix, result);
  result = multiplyMatrices(rotateMatrix, result);
  result = multiplyMatrices(translateFromOrigin, result);
  result = multiplyMatrices(translateMatrix, result);

  return result;
};

/**
 * Checks if matrix is identity matrix
 */
export const isIdentity = (matrix: TransformationMatrix, tolerance: number = 1e-10): boolean => {
  const identity = createIdentityMatrix();

  return Math.abs(matrix.a - identity.a) < tolerance &&
         Math.abs(matrix.b - identity.b) < tolerance &&
         Math.abs(matrix.c - identity.c) < tolerance &&
         Math.abs(matrix.d - identity.d) < tolerance &&
         Math.abs(matrix.e - identity.e) < tolerance &&
         Math.abs(matrix.f - identity.f) < tolerance;
};

/**
 * Interpolates between two matrices για animations
 */
export const interpolateMatrix = (
  from: TransformationMatrix,
  to: TransformationMatrix,
  t: number
): TransformationMatrix => {
  const clampedT = Math.max(0, Math.min(1, t));

  return {
    a: from.a + (to.a - from.a) * clampedT,
    b: from.b + (to.b - from.b) * clampedT,
    c: from.c + (to.c - from.c) * clampedT,
    d: from.d + (to.d - from.d) * clampedT,
    e: from.e + (to.e - from.e) * clampedT,
    f: from.f + (to.f - from.f) * clampedT
  };
};

/**
 * Converts matrix to CSS transform string
 */
export const matrixToCSSTransform = (matrix: TransformationMatrix): string => {
  return `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;
};

/**
 * Converts matrix to SVG transform string
 */
export const matrixToSVGTransform = (matrix: TransformationMatrix): string => {
  return `matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`;
};