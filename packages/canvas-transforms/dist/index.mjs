var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/utils/matrixOperations.ts
var createIdentityMatrix = () => ({
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0
});
var createTranslationMatrix = (x, y) => ({
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: x,
  f: y
});
var createScaleMatrix = (scaleX, scaleY = scaleX) => ({
  a: scaleX,
  b: 0,
  c: 0,
  d: scaleY,
  e: 0,
  f: 0
});
var createRotationMatrix = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    a: cos,
    b: sin,
    c: -sin,
    d: cos,
    e: 0,
    f: 0
  };
};
var createRotationAroundPointMatrix = (angle, centerX, centerY) => {
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
var multiplyMatrices = (m1, m2) => ({
  a: m1.a * m2.a + m1.b * m2.c,
  b: m1.a * m2.b + m1.b * m2.d,
  c: m1.c * m2.a + m1.d * m2.c,
  d: m1.c * m2.b + m1.d * m2.d,
  e: m1.e * m2.a + m1.f * m2.c + m2.e,
  f: m1.e * m2.b + m1.f * m2.d + m2.f
});
var getMatrixDeterminant = (matrix) => {
  return matrix.a * matrix.d - matrix.b * matrix.c;
};
var invertMatrix = (matrix) => {
  const det = getMatrixDeterminant(matrix);
  if (Math.abs(det) < 1e-10) {
    throw new Error("Matrix is not invertible (determinant is zero)");
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
var transformPoint = (point, matrix) => ({
  x: matrix.a * point.x + matrix.c * point.y + matrix.e,
  y: matrix.b * point.x + matrix.d * point.y + matrix.f
});
var transformPoints = (points, matrix) => points.map((point) => transformPoint(point, matrix));
var transformBoundingBox = (bounds, matrix) => {
  const corners = [
    { x: bounds.minX, y: bounds.minY },
    { x: bounds.maxX, y: bounds.minY },
    { x: bounds.maxX, y: bounds.maxY },
    { x: bounds.minX, y: bounds.maxY }
  ];
  const transformedCorners = transformPoints(corners, matrix);
  const xs = transformedCorners.map((p) => p.x);
  const ys = transformedCorners.map((p) => p.y);
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
var decompose = (matrix) => {
  const { a, b, c, d, e, f } = matrix;
  const translation = { x: e, y: f };
  const scaleX = Math.sqrt(a * a + b * b);
  const scaleY = Math.sqrt(c * c + d * d);
  const rotation = Math.atan2(b, a);
  const skewX = Math.atan2(a * c + b * d, scaleX * scaleX);
  const skewY = 0;
  return {
    translation,
    scale: { x: scaleX, y: scaleY },
    rotation,
    skew: { x: skewX, y: skewY }
  };
};
var compose = (translation = { x: 0, y: 0 }, scale = { x: 1, y: 1 }, rotation = 0, origin = { x: 0, y: 0 }) => {
  const translateToOrigin = createTranslationMatrix(-origin.x, -origin.y);
  const scaleMatrix = createScaleMatrix(scale.x, scale.y);
  const rotateMatrix = createRotationMatrix(rotation);
  const translateFromOrigin = createTranslationMatrix(origin.x, origin.y);
  const translateMatrix = createTranslationMatrix(translation.x, translation.y);
  let result = translateToOrigin;
  result = multiplyMatrices(scaleMatrix, result);
  result = multiplyMatrices(rotateMatrix, result);
  result = multiplyMatrices(translateFromOrigin, result);
  result = multiplyMatrices(translateMatrix, result);
  return result;
};
var isIdentity = (matrix, tolerance = 1e-10) => {
  const identity = createIdentityMatrix();
  return Math.abs(matrix.a - identity.a) < tolerance && Math.abs(matrix.b - identity.b) < tolerance && Math.abs(matrix.c - identity.c) < tolerance && Math.abs(matrix.d - identity.d) < tolerance && Math.abs(matrix.e - identity.e) < tolerance && Math.abs(matrix.f - identity.f) < tolerance;
};
var interpolateMatrix = (from, to, t) => {
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
var matrixToCSSTransform = (matrix) => {
  return `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;
};
var matrixToSVGTransform = (matrix) => {
  return `matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`;
};

// src/utils/coordinateMapping.ts
var createCoordinateMapping = (viewport, coordinateSystem) => {
  let currentSystem = { ...coordinateSystem };
  let cachedMatrix = null;
  let cachedInverseMatrix = null;
  const updateMatrices = () => {
    let matrix = createIdentityMatrix();
    matrix = multiplyMatrices(
      createTranslationMatrix(-viewport.x, -viewport.y),
      matrix
    );
    matrix = multiplyMatrices(
      createScaleMatrix(1 / viewport.scale),
      matrix
    );
    matrix = multiplyMatrices(
      createTranslationMatrix(currentSystem.origin.x, currentSystem.origin.y),
      matrix
    );
    if (currentSystem.rotation !== 0) {
      matrix = multiplyMatrices(
        createRotationMatrix(-currentSystem.rotation),
        // Inverse rotation για screen to world
        matrix
      );
    }
    matrix = multiplyMatrices(
      createScaleMatrix(
        currentSystem.flipX ? -currentSystem.scaleX : currentSystem.scaleX,
        currentSystem.flipY ? -currentSystem.scaleY : currentSystem.scaleY
      ),
      matrix
    );
    cachedMatrix = matrix;
    cachedInverseMatrix = invertMatrix(matrix);
  };
  updateMatrices();
  return {
    screenToWorld: (screenPoint) => {
      if (!cachedMatrix)
        updateMatrices();
      return transformPoint(screenPoint, cachedMatrix);
    },
    worldToScreen: (worldPoint) => {
      if (!cachedInverseMatrix)
        updateMatrices();
      return transformPoint(worldPoint, cachedInverseMatrix);
    },
    getMatrix: () => {
      if (!cachedMatrix)
        updateMatrices();
      return { ...cachedMatrix };
    },
    updateSystem: (system) => {
      currentSystem = { ...currentSystem, ...system };
      cachedMatrix = null;
      cachedInverseMatrix = null;
    }
  };
};
var createCanvasCoordinateMapping = (canvas, coordinateSystem) => {
  const rect = canvas.getBoundingClientRect();
  const viewport = {
    x: 0,
    y: 0,
    width: rect.width,
    height: rect.height,
    scale: 1,
    rotation: 0
  };
  return createCoordinateMapping(viewport, coordinateSystem);
};
var getCanvasCoordinates = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();
  let clientX;
  let clientY;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    const touch = event.touches[0] || event.changedTouches[0];
    if (!touch) {
      throw new Error("No touch point found in touch event");
    }
    clientX = touch.clientX;
    clientY = touch.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
};
var geoCoordinates = {
  /**
   * Converts latitude/longitude to Web Mercator (EPSG:3857)
   */
  latLngToWebMercator: (lat, lng) => {
    const x = lng * 2003750834e-2 / 180;
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 2003750834e-2 / 180;
    return { x, y };
  },
  /**
   * Converts Web Mercator to latitude/longitude
   */
  webMercatorToLatLng: (x, y) => {
    const lng = x * 180 / 2003750834e-2;
    let lat = y * 180 / 2003750834e-2;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    return { x: lng, y: lat };
  },
  /**
   * Creates coordinate system για geographic data
   */
  createGeoCoordinateSystem: (bounds, canvasSize) => {
    const nw = geoCoordinates.latLngToWebMercator(bounds.north, bounds.west);
    const se = geoCoordinates.latLngToWebMercator(bounds.south, bounds.east);
    const mercatorWidth = se.x - nw.x;
    const mercatorHeight = nw.y - se.y;
    const scaleX = canvasSize.width / mercatorWidth;
    const scaleY = canvasSize.height / mercatorHeight;
    return {
      origin: { x: -nw.x, y: -se.y },
      scaleX,
      scaleY,
      rotation: 0,
      flipX: false,
      flipY: true
      // Geographic coordinates have origin at bottom-left
    };
  }
};
var gridCoordinates = {
  /**
   * Snaps point to grid
   */
  snapToGrid: (point, gridSize) => ({
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize
  }),
  /**
   * Gets grid points within bounding area
   */
  getGridPoints: (bounds, gridSize) => {
    const points = [];
    const startX = Math.floor(bounds.minX / gridSize) * gridSize;
    const endX = Math.ceil(bounds.maxX / gridSize) * gridSize;
    const startY = Math.floor(bounds.minY / gridSize) * gridSize;
    const endY = Math.ceil(bounds.maxY / gridSize) * gridSize;
    for (let x = startX; x <= endX; x += gridSize) {
      for (let y = startY; y <= endY; y += gridSize) {
        points.push({ x, y });
      }
    }
    return points;
  },
  /**
   * Creates coordinate system για grid-based layouts
   */
  createGridCoordinateSystem: (_gridSize, origin = { x: 0, y: 0 }) => ({
    origin,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    flipX: false,
    flipY: false
  })
};
var convertCoordinates = (point, fromSystem, toSystem) => {
  const screenPoint = fromSystem.worldToScreen(point);
  return toSystem.screenToWorld(screenPoint);
};

// src/utils/viewportManager.ts
var ViewportManager = class {
  constructor(initialViewport, constraints = {
    minScale: 0.1,
    maxScale: 10,
    lockAspectRatio: false,
    snapToGrid: false,
    gridSize: 10
  }) {
    __publicField(this, "viewport");
    __publicField(this, "constraints");
    __publicField(this, "interaction");
    __publicField(this, "callbacks", {});
    this.viewport = { ...initialViewport };
    this.constraints = { ...constraints };
    this.interaction = {
      isDragging: false,
      isZooming: false
    };
  }
  /**
   * Gets current viewport state
   */
  getViewport() {
    return { ...this.viewport };
  }
  /**
   * Gets current transformation
   */
  getTransform() {
    const matrix = this.calculateTransformMatrix();
    return {
      matrix,
      viewport: this.getViewport(),
      scale: this.viewport.scale,
      translation: { x: this.viewport.x, y: this.viewport.y },
      rotation: this.viewport.rotation,
      origin: { x: this.viewport.width / 2, y: this.viewport.height / 2 }
    };
  }
  /**
   * Sets viewport change callback
   */
  onViewportChange(callback) {
    this.callbacks.onViewportChange = callback;
  }
  /**
   * Sets transform change callback
   */
  onTransformChange(callback) {
    this.callbacks.onTransformChange = callback;
  }
  /**
   * Updates viewport and notifies callbacks
   */
  updateViewport(newViewport) {
    this.viewport = { ...this.viewport, ...newViewport };
    this.applyConstraints();
    this.callbacks.onViewportChange?.(this.getViewport());
    this.callbacks.onTransformChange?.(this.getTransform());
  }
  /**
   * Applies constraints to current viewport
   */
  applyConstraints() {
    this.viewport.scale = Math.max(
      this.constraints.minScale,
      Math.min(this.constraints.maxScale, this.viewport.scale)
    );
    if (this.constraints.boundingBox) {
      const bounds = this.constraints.boundingBox;
      const viewWidth = this.viewport.width / this.viewport.scale;
      const viewHeight = this.viewport.height / this.viewport.scale;
      this.viewport.x = Math.max(
        bounds.minX - viewWidth * 0.9,
        Math.min(bounds.maxX - viewWidth * 0.1, this.viewport.x)
      );
      this.viewport.y = Math.max(
        bounds.minY - viewHeight * 0.9,
        Math.min(bounds.maxY - viewHeight * 0.1, this.viewport.y)
      );
    }
    if (this.constraints.snapToGrid && !this.interaction.isDragging) {
      const gridSize = this.constraints.gridSize;
      this.viewport.x = Math.round(this.viewport.x / gridSize) * gridSize;
      this.viewport.y = Math.round(this.viewport.y / gridSize) * gridSize;
    }
  }
  /**
   * Calculates transformation matrix για current viewport
   */
  calculateTransformMatrix() {
    let matrix = createIdentityMatrix();
    matrix = multiplyMatrices(
      createTranslationMatrix(this.viewport.x, this.viewport.y),
      matrix
    );
    matrix = multiplyMatrices(
      createScaleMatrix(this.viewport.scale),
      matrix
    );
    return matrix;
  }
  /**
   * Zooms viewport by factor at specific point
   */
  zoom(factor, center) {
    const zoomCenter = center || {
      x: this.viewport.width / 2,
      y: this.viewport.height / 2
    };
    const newScale = this.viewport.scale * factor;
    const clampedScale = Math.max(
      this.constraints.minScale,
      Math.min(this.constraints.maxScale, newScale)
    );
    const actualFactor = clampedScale / this.viewport.scale;
    if (actualFactor === 1)
      return;
    const dx = (zoomCenter.x - this.viewport.x) * (1 - actualFactor);
    const dy = (zoomCenter.y - this.viewport.y) * (1 - actualFactor);
    this.updateViewport({
      scale: clampedScale,
      x: this.viewport.x + dx,
      y: this.viewport.y + dy
    });
  }
  /**
   * Pans viewport by offset
   */
  pan(deltaX, deltaY) {
    this.updateViewport({
      x: this.viewport.x + deltaX,
      y: this.viewport.y + deltaY
    });
  }
  /**
   * Fits content to viewport
   */
  fitToContent(contentBounds, padding = 0.1) {
    const paddingX = contentBounds.width * padding;
    const paddingY = contentBounds.height * padding;
    const scaleX = this.viewport.width / (contentBounds.width + paddingX * 2);
    const scaleY = this.viewport.height / (contentBounds.height + paddingY * 2);
    const scale = Math.min(scaleX, scaleY);
    const constrainedScale = Math.max(
      this.constraints.minScale,
      Math.min(this.constraints.maxScale, scale)
    );
    const centerX = contentBounds.minX + contentBounds.width / 2;
    const centerY = contentBounds.minY + contentBounds.height / 2;
    this.updateViewport({
      scale: constrainedScale,
      x: this.viewport.width / 2 - centerX * constrainedScale,
      y: this.viewport.height / 2 - centerY * constrainedScale
    });
  }
  /**
   * Centers viewport on specific point
   */
  centerOn(worldPoint) {
    this.updateViewport({
      x: this.viewport.width / 2 - worldPoint.x * this.viewport.scale,
      y: this.viewport.height / 2 - worldPoint.y * this.viewport.scale
    });
  }
  /**
   * Starts pan interaction
   */
  startPan(startPoint) {
    this.interaction = {
      isDragging: true,
      isZooming: false,
      startPosition: startPoint,
      lastPointerPosition: startPoint,
      startTransform: this.getTransform()
    };
  }
  /**
   * Updates pan interaction
   */
  updatePan(currentPoint) {
    if (!this.interaction.isDragging || !this.interaction.lastPointerPosition) {
      return;
    }
    const deltaX = currentPoint.x - this.interaction.lastPointerPosition.x;
    const deltaY = currentPoint.y - this.interaction.lastPointerPosition.y;
    this.pan(deltaX / this.viewport.scale, deltaY / this.viewport.scale);
    this.interaction.lastPointerPosition = currentPoint;
  }
  /**
   * Ends pan interaction
   */
  endPan() {
    this.interaction = {
      isDragging: false,
      isZooming: false
    };
    this.applyConstraints();
    this.callbacks.onViewportChange?.(this.getViewport());
    this.callbacks.onTransformChange?.(this.getTransform());
  }
  /**
   * Handles mouse wheel zoom
   */
  handleWheel(event, canvas) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const zoomCenter = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    const delta = event.deltaY > 0 ? -1 : 1;
    const zoomFactor = Math.pow(1.1, delta);
    this.zoom(zoomFactor, zoomCenter);
  }
  /**
   * Handles touch pinch zoom
   */
  handlePinchZoom(touch1, touch2, previousTouch1, previousTouch2) {
    if (!previousTouch1 || !previousTouch2) {
      return;
    }
    const currentDistance = Math.sqrt(
      Math.pow(touch2.x - touch1.x, 2) + Math.pow(touch2.y - touch1.y, 2)
    );
    const previousDistance = Math.sqrt(
      Math.pow(previousTouch2.x - previousTouch1.x, 2) + Math.pow(previousTouch2.y - previousTouch1.y, 2)
    );
    if (previousDistance === 0)
      return;
    const zoomFactor = currentDistance / previousDistance;
    const zoomCenter = {
      x: (touch1.x + touch2.x) / 2,
      y: (touch1.y + touch2.y) / 2
    };
    this.zoom(zoomFactor, zoomCenter);
  }
  /**
   * Converts screen coordinates to world coordinates
   */
  screenToWorld(screenPoint) {
    return {
      x: (screenPoint.x - this.viewport.x) / this.viewport.scale,
      y: (screenPoint.y - this.viewport.y) / this.viewport.scale
    };
  }
  /**
   * Converts world coordinates to screen coordinates
   */
  worldToScreen(worldPoint) {
    return {
      x: worldPoint.x * this.viewport.scale + this.viewport.x,
      y: worldPoint.y * this.viewport.scale + this.viewport.y
    };
  }
  /**
   * Gets visible world bounds
   */
  getVisibleBounds() {
    const topLeft = this.screenToWorld({ x: 0, y: 0 });
    const bottomRight = this.screenToWorld({
      x: this.viewport.width,
      y: this.viewport.height
    });
    return {
      minX: topLeft.x,
      minY: topLeft.y,
      maxX: bottomRight.x,
      maxY: bottomRight.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    };
  }
  /**
   * Updates constraints
   */
  updateConstraints(newConstraints) {
    this.constraints = { ...this.constraints, ...newConstraints };
    this.applyConstraints();
    this.callbacks.onViewportChange?.(this.getViewport());
  }
  /**
   * Resets viewport to initial state
   */
  reset() {
    this.viewport = {
      x: 0,
      y: 0,
      width: this.viewport.width,
      height: this.viewport.height,
      scale: 1,
      rotation: 0
    };
    this.interaction = {
      isDragging: false,
      isZooming: false
    };
    this.callbacks.onViewportChange?.(this.getViewport());
    this.callbacks.onTransformChange?.(this.getTransform());
  }
};

// src/utils/transformAnimations.ts
var easingFunctions = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  elastic: (t) => {
    if (t === 0 || t === 1)
      return t;
    const p = 0.3;
    const s = p / 4;
    return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
  },
  bounce: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  }
};
var TransformAnimator = class {
  constructor() {
    __publicField(this, "activeAnimations", /* @__PURE__ */ new Map());
  }
  /**
   * Starts a transform animation
   */
  animate(id, animation) {
    this.cancel(id);
    return new Promise((resolve) => {
      const startTime = performance.now();
      const easingFn = easingFunctions[animation.easing] || easingFunctions.linear;
      const animateFrame = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animation.duration, 1);
        const easedProgress = easingFn(progress);
        const currentTransform = this.interpolateTransform(
          animation.from,
          animation.to,
          easedProgress
        );
        animation.onUpdate?.(currentTransform);
        if (progress >= 1) {
          this.activeAnimations.delete(id);
          animation.onComplete?.();
          resolve();
        } else {
          const rafId2 = requestAnimationFrame(animateFrame);
          const activeAnim = this.activeAnimations.get(id);
          if (activeAnim) {
            activeAnim.rafId = rafId2;
          }
        }
      };
      const rafId = requestAnimationFrame(animateFrame);
      this.activeAnimations.set(id, {
        animation,
        startTime,
        rafId
      });
    });
  }
  /**
   * Cancels active animation
   */
  cancel(id) {
    const activeAnim = this.activeAnimations.get(id);
    if (activeAnim) {
      cancelAnimationFrame(activeAnim.rafId);
      this.activeAnimations.delete(id);
    }
  }
  /**
   * Cancels all active animations
   */
  cancelAll() {
    this.activeAnimations.forEach((_, id) => this.cancel(id));
  }
  /**
   * Checks if animation is active
   */
  isAnimating(id) {
    return this.activeAnimations.has(id);
  }
  /**
   * Gets list of active animation IDs
   */
  getActiveAnimations() {
    return Array.from(this.activeAnimations.keys());
  }
  /**
   * Interpolates between two transform states
   */
  interpolateTransform(from, to, t) {
    const defaultTransform = {
      matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      viewport: { x: 0, y: 0, width: 800, height: 600, scale: 1, rotation: 0 },
      scale: 1,
      translation: { x: 0, y: 0 },
      rotation: 0,
      origin: { x: 0, y: 0 }
    };
    const fromTransform = { ...defaultTransform, ...from };
    const toTransform = { ...defaultTransform, ...to };
    const interpolatedMatrix = interpolateMatrix(
      fromTransform.matrix,
      toTransform.matrix,
      t
    );
    const interpolatedViewport = {
      x: fromTransform.viewport.x + (toTransform.viewport.x - fromTransform.viewport.x) * t,
      y: fromTransform.viewport.y + (toTransform.viewport.y - fromTransform.viewport.y) * t,
      width: fromTransform.viewport.width + (toTransform.viewport.width - fromTransform.viewport.width) * t,
      height: fromTransform.viewport.height + (toTransform.viewport.height - fromTransform.viewport.height) * t,
      scale: fromTransform.viewport.scale + (toTransform.viewport.scale - fromTransform.viewport.scale) * t,
      rotation: fromTransform.viewport.rotation + (toTransform.viewport.rotation - fromTransform.viewport.rotation) * t
    };
    const interpolatedScale = fromTransform.scale + (toTransform.scale - fromTransform.scale) * t;
    const interpolatedRotation = fromTransform.rotation + (toTransform.rotation - fromTransform.rotation) * t;
    const interpolatedTranslation = {
      x: fromTransform.translation.x + (toTransform.translation.x - fromTransform.translation.x) * t,
      y: fromTransform.translation.y + (toTransform.translation.y - fromTransform.translation.y) * t
    };
    const interpolatedOrigin = {
      x: fromTransform.origin.x + (toTransform.origin.x - fromTransform.origin.x) * t,
      y: fromTransform.origin.y + (toTransform.origin.y - fromTransform.origin.y) * t
    };
    return {
      matrix: interpolatedMatrix,
      viewport: interpolatedViewport,
      scale: interpolatedScale,
      translation: interpolatedTranslation,
      rotation: interpolatedRotation,
      origin: interpolatedOrigin
    };
  }
};
var globalAnimator = new TransformAnimator();
var animations = {
  /**
   * Animates zoom to specific scale
   */
  zoomTo: (targetScale, _center, duration = 300, easing = "easeOut") => {
    return globalAnimator.animate("zoom", {
      duration,
      easing,
      from: { scale: 1 },
      to: { scale: targetScale },
      onUpdate: (transform) => {
        console.log("Zoom animation update:", transform);
      }
    });
  },
  /**
   * Animates pan to specific position
   */
  panTo: (targetPosition, duration = 300, easing = "easeOut") => {
    return globalAnimator.animate("pan", {
      duration,
      easing,
      from: { translation: { x: 0, y: 0 } },
      to: { translation: targetPosition },
      onUpdate: (transform) => {
        console.log("Pan animation update:", transform);
      }
    });
  },
  /**
   * Animates rotation to specific angle
   */
  rotateTo: (targetRotation, duration = 300, easing = "easeInOut") => {
    return globalAnimator.animate("rotate", {
      duration,
      easing,
      from: { rotation: 0 },
      to: { rotation: targetRotation },
      onUpdate: (transform) => {
        console.log("Rotation animation update:", transform);
      }
    });
  },
  /**
   * Smooth transition between two complete transform states
   */
  transitionTo: (fromTransform, toTransform, duration = 500, easing = "easeInOut") => {
    return globalAnimator.animate("transition", {
      duration,
      easing,
      from: fromTransform,
      to: toTransform,
      onUpdate: (transform) => {
        console.log("Transition animation update:", transform);
      }
    });
  }
};
var animationUtils = {
  /**
   * Creates spring animation parameters
   */
  createSpringAnimation: (stiffness = 100, damping = 10, mass = 1) => {
    const w0 = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    if (zeta < 1) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return (t) => {
        const e = Math.exp(-zeta * w0 * t);
        return 1 - e * (Math.cos(wd * t) + zeta * w0 / wd * Math.sin(wd * t));
      };
    } else if (zeta === 1) {
      return (t) => 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    } else {
      const r1 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
      const r2 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
      return (t) => {
        const c1 = -r2 / (r1 - r2);
        const c2 = r1 / (r1 - r2);
        return 1 - c1 * Math.exp(r1 * t) - c2 * Math.exp(r2 * t);
      };
    }
  },
  /**
   * Calculates optimal animation duration based on distance
   */
  calculateDuration: (startValue, endValue, baseSpeed = 1e3) => {
    const distance = Math.abs(endValue - startValue);
    return Math.max(200, Math.min(1e3, distance / baseSpeed * 1e3));
  },
  /**
   * Creates stepped animation για discrete values
   */
  createSteppedAnimation: (steps) => {
    return (t) => {
      return Math.floor(t * steps) / steps;
    };
  }
};

// src/utils/canvasUtils.ts
var createTransformContext = (canvas, initialTransform) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get 2D rendering context from canvas");
  }
  let currentTransform = initialTransform || {
    matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
    viewport: { x: 0, y: 0, width: canvas.width, height: canvas.height, scale: 1, rotation: 0 },
    scale: 1,
    translation: { x: 0, y: 0 },
    rotation: 0,
    origin: { x: 0, y: 0 }
  };
  const transformStack = [];
  return {
    ctx,
    transform: currentTransform,
    applyTransform: () => {
      const { matrix } = currentTransform;
      ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    },
    resetTransform: () => {
      ctx.resetTransform();
      currentTransform = {
        matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
        viewport: currentTransform.viewport,
        scale: 1,
        translation: { x: 0, y: 0 },
        rotation: 0,
        origin: { x: 0, y: 0 }
      };
    },
    save: () => {
      ctx.save();
      transformStack.push({ ...currentTransform });
    },
    restore: () => {
      ctx.restore();
      const savedTransform = transformStack.pop();
      if (savedTransform) {
        currentTransform = savedTransform;
      }
    }
  };
};
var applyMatrixToContext = (ctx, matrix) => {
  ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
};
var drawGrid = (ctx, gridSize, bounds, options = {}) => {
  const {
    majorGridColor = "#ddd",
    minorGridColor = "#f0f0f0",
    majorGridInterval = 5,
    lineWidth = 1,
    alpha = 1
  } = options;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineWidth = lineWidth;
  const startX = Math.floor(bounds.minX / gridSize) * gridSize;
  const endX = Math.ceil(bounds.maxX / gridSize) * gridSize;
  const startY = Math.floor(bounds.minY / gridSize) * gridSize;
  const endY = Math.ceil(bounds.maxY / gridSize) * gridSize;
  ctx.beginPath();
  for (let x = startX; x <= endX; x += gridSize) {
    const isMajor = Math.round(x / gridSize) % majorGridInterval === 0;
    ctx.strokeStyle = isMajor ? majorGridColor : minorGridColor;
    ctx.moveTo(x, bounds.minY);
    ctx.lineTo(x, bounds.maxY);
    ctx.stroke();
  }
  ctx.beginPath();
  for (let y = startY; y <= endY; y += gridSize) {
    const isMajor = Math.round(y / gridSize) % majorGridInterval === 0;
    ctx.strokeStyle = isMajor ? majorGridColor : minorGridColor;
    ctx.moveTo(bounds.minX, y);
    ctx.lineTo(bounds.maxX, y);
    ctx.stroke();
  }
  ctx.restore();
};
var drawAxes = (ctx, bounds, options = {}) => {
  const {
    xAxisColor = "#333",
    yAxisColor = "#333",
    lineWidth = 2,
    showLabels = true,
    labelFont = "12px Arial",
    labelColor = "#666"
  } = options;
  ctx.save();
  ctx.lineWidth = lineWidth;
  if (bounds.minY <= 0 && bounds.maxY >= 0) {
    ctx.strokeStyle = xAxisColor;
    ctx.beginPath();
    ctx.moveTo(bounds.minX, 0);
    ctx.lineTo(bounds.maxX, 0);
    ctx.stroke();
    if (showLabels) {
      ctx.fillStyle = labelColor;
      ctx.font = labelFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("X", bounds.maxX - 10, 5);
    }
  }
  if (bounds.minX <= 0 && bounds.maxX >= 0) {
    ctx.strokeStyle = yAxisColor;
    ctx.beginPath();
    ctx.moveTo(0, bounds.minY);
    ctx.lineTo(0, bounds.maxY);
    ctx.stroke();
    if (showLabels) {
      ctx.fillStyle = labelColor;
      ctx.font = labelFont;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("Y", 5, bounds.minY + 10);
    }
  }
  ctx.restore();
};
var drawRuler = (ctx, position, bounds, scale, options = {}) => {
  const {
    height = 30,
    backgroundColor = "rgba(255, 255, 255, 0.9)",
    textColor = "#333",
    tickColor = "#666",
    font = "11px Arial",
    unit = ""
  } = options;
  ctx.save();
  let rulerBounds;
  switch (position) {
    case "top":
      rulerBounds = { minX: bounds.minX, minY: bounds.minY, maxX: bounds.maxX, maxY: bounds.minY + height, width: bounds.width, height };
      break;
    case "bottom":
      rulerBounds = { minX: bounds.minX, minY: bounds.maxY - height, maxX: bounds.maxX, maxY: bounds.maxY, width: bounds.width, height };
      break;
    case "left":
      rulerBounds = { minX: bounds.minX, minY: bounds.minY, maxX: bounds.minX + height, maxY: bounds.maxY, width: height, height: bounds.height };
      break;
    case "right":
      rulerBounds = { minX: bounds.maxX - height, minY: bounds.minY, maxX: bounds.maxX, maxY: bounds.maxY, width: height, height: bounds.height };
      break;
  }
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(rulerBounds.minX, rulerBounds.minY, rulerBounds.width, rulerBounds.height);
  ctx.font = font;
  ctx.fillStyle = textColor;
  ctx.strokeStyle = tickColor;
  ctx.lineWidth = 1;
  const pixelsPerUnit = scale;
  const minTickSpacing = 50;
  const unitSpacing = Math.pow(10, Math.floor(Math.log10(minTickSpacing / pixelsPerUnit)));
  if (position === "top" || position === "bottom") {
    const startValue = Math.floor(bounds.minX / unitSpacing) * unitSpacing;
    const endValue = Math.ceil(bounds.maxX / unitSpacing) * unitSpacing;
    ctx.textAlign = "center";
    ctx.textBaseline = position === "top" ? "bottom" : "top";
    for (let value = startValue; value <= endValue; value += unitSpacing) {
      const x = value;
      const y1 = position === "top" ? rulerBounds.maxY : rulerBounds.minY;
      const y2 = position === "top" ? rulerBounds.maxY - height * 0.6 : rulerBounds.minY + height * 0.6;
      const textY = position === "top" ? rulerBounds.maxY - 2 : rulerBounds.minY + 2;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
      const label = value === 0 ? "0" : `${value}${unit}`;
      ctx.fillText(label, x, textY);
    }
  } else {
    const startValue = Math.floor(bounds.minY / unitSpacing) * unitSpacing;
    const endValue = Math.ceil(bounds.maxY / unitSpacing) * unitSpacing;
    ctx.textAlign = position === "left" ? "right" : "left";
    ctx.textBaseline = "middle";
    for (let value = startValue; value <= endValue; value += unitSpacing) {
      const y = value;
      const x1 = position === "left" ? rulerBounds.maxX : rulerBounds.minX;
      const x2 = position === "left" ? rulerBounds.maxX - height * 0.6 : rulerBounds.minX + height * 0.6;
      const textX = position === "left" ? rulerBounds.maxX - 2 : rulerBounds.minX + 2;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
      const label = value === 0 ? "0" : `${value}${unit}`;
      ctx.fillText(label, textX, y);
    }
  }
  ctx.restore();
};
var drawCrosshair = (ctx, center, bounds, options = {}) => {
  const {
    color = "#ff0000",
    lineWidth = 1,
    dashPattern = [5, 5],
    alpha = 0.7
  } = options;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = alpha;
  ctx.setLineDash(dashPattern);
  ctx.beginPath();
  ctx.moveTo(center.x, bounds.minY);
  ctx.lineTo(center.x, bounds.maxY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bounds.minX, center.y);
  ctx.lineTo(bounds.maxX, center.y);
  ctx.stroke();
  ctx.restore();
};
var measureText = (ctx, text, font) => {
  ctx.save();
  if (font) {
    ctx.font = font;
  }
  const metrics = ctx.measureText(text);
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  ctx.restore();
  return {
    width: metrics.width,
    height: height || 12
    // fallback height
  };
};
var setupHighDPICanvas = (canvas) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get 2D rendering context");
  }
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.scale(ratio, ratio);
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  return { ctx, ratio };
};

// src/index.ts
var DEFAULT_VIEWPORT = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  scale: 1,
  rotation: 0
};
var DEFAULT_CONSTRAINTS = {
  minScale: 0.1,
  maxScale: 10,
  lockAspectRatio: false,
  snapToGrid: false,
  gridSize: 10
};
var DEFAULT_COORDINATE_SYSTEM = {
  origin: { x: 0, y: 0 },
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  flipX: false,
  flipY: false
};
export {
  DEFAULT_CONSTRAINTS,
  DEFAULT_COORDINATE_SYSTEM,
  DEFAULT_VIEWPORT,
  TransformAnimator,
  ViewportManager,
  animationUtils,
  animations,
  applyMatrixToContext,
  compose,
  convertCoordinates,
  createCanvasCoordinateMapping,
  createCoordinateMapping,
  createIdentityMatrix,
  createRotationAroundPointMatrix,
  createRotationMatrix,
  createScaleMatrix,
  createTransformContext,
  createTranslationMatrix,
  decompose,
  drawAxes,
  drawCrosshair,
  drawGrid,
  drawRuler,
  easingFunctions,
  geoCoordinates,
  getCanvasCoordinates,
  getMatrixDeterminant,
  globalAnimator,
  gridCoordinates,
  interpolateMatrix,
  invertMatrix,
  isIdentity,
  matrixToCSSTransform,
  matrixToSVGTransform,
  measureText,
  multiplyMatrices,
  setupHighDPICanvas,
  transformBoundingBox,
  transformPoint,
  transformPoints
};
//# sourceMappingURL=index.mjs.map