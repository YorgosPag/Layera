import type {
  Viewport,
  CanvasTransform,
  BoundingBox,
  Point2D,
  CanvasConstraints,
  InteractionState
} from '../types';
import {
  createIdentityMatrix,
  createTranslationMatrix,
  createScaleMatrix,
  multiplyMatrices
} from './matrixOperations';

/**
 * Viewport management utilities για canvas zoom/pan operations
 * Enterprise-grade viewport control με constraints και smooth interactions
 */

/**
 * Creates viewport manager για canvas zoom/pan operations
 */
export class ViewportManager {
  private viewport: Viewport;
  private constraints: CanvasConstraints;
  private interaction: InteractionState;
  private callbacks: {
    onViewportChange?: (viewport: Viewport) => void;
    onTransformChange?: (transform: CanvasTransform) => void;
  } = {};

  constructor(
    initialViewport: Viewport,
    constraints: CanvasConstraints = {
      minScale: 0.1,
      maxScale: 10,
      lockAspectRatio: false,
      snapToGrid: false,
      gridSize: 10
    }
  ) {
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
  getViewport(): Viewport {
    return { ...this.viewport };
  }

  /**
   * Gets current transformation
   */
  getTransform(): CanvasTransform {
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
  onViewportChange(callback: (viewport: Viewport) => void): void {
    this.callbacks.onViewportChange = callback;
  }

  /**
   * Sets transform change callback
   */
  onTransformChange(callback: (transform: CanvasTransform) => void): void {
    this.callbacks.onTransformChange = callback;
  }

  /**
   * Updates viewport and notifies callbacks
   */
  private updateViewport(newViewport: Partial<Viewport>): void {
    this.viewport = { ...this.viewport, ...newViewport };
    this.applyConstraints();

    this.callbacks.onViewportChange?.(this.getViewport());
    this.callbacks.onTransformChange?.(this.getTransform());
  }

  /**
   * Applies constraints to current viewport
   */
  private applyConstraints(): void {
    // Scale constraints
    this.viewport.scale = Math.max(
      this.constraints.minScale,
      Math.min(this.constraints.maxScale, this.viewport.scale)
    );

    // Bounding box constraints
    if (this.constraints.boundingBox) {
      const bounds = this.constraints.boundingBox;

      // Calculate visible area in world coordinates
      const viewWidth = this.viewport.width / this.viewport.scale;
      const viewHeight = this.viewport.height / this.viewport.scale;

      // Constrain pan to keep content visible
      this.viewport.x = Math.max(
        bounds.minX - viewWidth * 0.9,
        Math.min(bounds.maxX - viewWidth * 0.1, this.viewport.x)
      );

      this.viewport.y = Math.max(
        bounds.minY - viewHeight * 0.9,
        Math.min(bounds.maxY - viewHeight * 0.1, this.viewport.y)
      );
    }

    // Grid snapping
    if (this.constraints.snapToGrid && !this.interaction.isDragging) {
      const gridSize = this.constraints.gridSize;
      this.viewport.x = Math.round(this.viewport.x / gridSize) * gridSize;
      this.viewport.y = Math.round(this.viewport.y / gridSize) * gridSize;
    }
  }

  /**
   * Calculates transformation matrix για current viewport
   */
  private calculateTransformMatrix() {
    let matrix = createIdentityMatrix();

    // Apply translation
    matrix = multiplyMatrices(
      createTranslationMatrix(this.viewport.x, this.viewport.y),
      matrix
    );

    // Apply scale
    matrix = multiplyMatrices(
      createScaleMatrix(this.viewport.scale),
      matrix
    );

    return matrix;
  }

  /**
   * Zooms viewport by factor at specific point
   */
  zoom(factor: number, center?: Point2D): void {
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

    if (actualFactor === 1) return; // No change needed

    // Adjust pan to keep zoom center fixed
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
  pan(deltaX: number, deltaY: number): void {
    this.updateViewport({
      x: this.viewport.x + deltaX,
      y: this.viewport.y + deltaY
    });
  }

  /**
   * Fits content to viewport
   */
  fitToContent(contentBounds: BoundingBox, padding: number = 0.1): void {
    const paddingX = contentBounds.width * padding;
    const paddingY = contentBounds.height * padding;

    const scaleX = this.viewport.width / (contentBounds.width + paddingX * 2);
    const scaleY = this.viewport.height / (contentBounds.height + paddingY * 2);

    const scale = Math.min(scaleX, scaleY);
    const constrainedScale = Math.max(
      this.constraints.minScale,
      Math.min(this.constraints.maxScale, scale)
    );

    // Center content in viewport
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
  centerOn(worldPoint: Point2D): void {
    this.updateViewport({
      x: this.viewport.width / 2 - worldPoint.x * this.viewport.scale,
      y: this.viewport.height / 2 - worldPoint.y * this.viewport.scale
    });
  }

  /**
   * Starts pan interaction
   */
  startPan(startPoint: Point2D): void {
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
  updatePan(currentPoint: Point2D): void {
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
  endPan(): void {
    this.interaction = {
      isDragging: false,
      isZooming: false
    };

    // Apply final constraints (like grid snapping)
    this.applyConstraints();
    this.callbacks.onViewportChange?.(this.getViewport());
    this.callbacks.onTransformChange?.(this.getTransform());
  }

  /**
   * Handles mouse wheel zoom
   */
  handleWheel(event: WheelEvent, canvas: HTMLCanvasElement): void {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const zoomCenter = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    // Determine zoom direction and factor
    const delta = event.deltaY > 0 ? -1 : 1;
    const zoomFactor = Math.pow(1.1, delta);

    this.zoom(zoomFactor, zoomCenter);
  }

  /**
   * Handles touch pinch zoom
   */
  handlePinchZoom(
    touch1: Point2D,
    touch2: Point2D,
    previousTouch1?: Point2D,
    previousTouch2?: Point2D
  ): void {
    if (!previousTouch1 || !previousTouch2) {
      return;
    }

    // Calculate current and previous distances
    const currentDistance = Math.sqrt(
      Math.pow(touch2.x - touch1.x, 2) + Math.pow(touch2.y - touch1.y, 2)
    );

    const previousDistance = Math.sqrt(
      Math.pow(previousTouch2.x - previousTouch1.x, 2) +
      Math.pow(previousTouch2.y - previousTouch1.y, 2)
    );

    if (previousDistance === 0) return;

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
  screenToWorld(screenPoint: Point2D): Point2D {
    return {
      x: (screenPoint.x - this.viewport.x) / this.viewport.scale,
      y: (screenPoint.y - this.viewport.y) / this.viewport.scale
    };
  }

  /**
   * Converts world coordinates to screen coordinates
   */
  worldToScreen(worldPoint: Point2D): Point2D {
    return {
      x: worldPoint.x * this.viewport.scale + this.viewport.x,
      y: worldPoint.y * this.viewport.scale + this.viewport.y
    };
  }

  /**
   * Gets visible world bounds
   */
  getVisibleBounds(): BoundingBox {
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
  updateConstraints(newConstraints: Partial<CanvasConstraints>): void {
    this.constraints = { ...this.constraints, ...newConstraints };
    this.applyConstraints();
    this.callbacks.onViewportChange?.(this.getViewport());
  }

  /**
   * Resets viewport to initial state
   */
  reset(): void {
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
}