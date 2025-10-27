import type {
  TransformContext,
  CanvasTransform,
  TransformationMatrix,
  Point2D,
  BoundingBox
} from '../types';
// Matrix operations imported as needed

/**
 * Canvas utilities για applying transformations to 2D context
 * Enterprise-grade canvas transformation helpers
 */

/**
 * Creates transform context wrapper για canvas
 */
export const createTransformContext = (
  canvas: HTMLCanvasElement,
  initialTransform?: CanvasTransform
): TransformContext => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get 2D rendering context from canvas');
  }

  let currentTransform: CanvasTransform = initialTransform || {
    matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
    viewport: { x: 0, y: 0, width: canvas.width, height: canvas.height, scale: 1, rotation: 0 },
    scale: 1,
    translation: { x: 0, y: 0 },
    rotation: 0,
    origin: { x: 0, y: 0 }
  };

  const transformStack: CanvasTransform[] = [];

  return {
    ctx,
    transform: currentTransform,

    applyTransform: (): void => {
      const { matrix } = currentTransform;
      ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    },

    resetTransform: (): void => {
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

    save: (): void => {
      ctx.save();
      transformStack.push({ ...currentTransform });
    },

    restore: (): void => {
      ctx.restore();
      const savedTransform = transformStack.pop();
      if (savedTransform) {
        currentTransform = savedTransform;
      }
    }
  };
};

/**
 * Applies transformation matrix to canvas context
 */
export const applyMatrixToContext = (
  ctx: CanvasRenderingContext2D,
  matrix: TransformationMatrix
): void => {
  ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
};

/**
 * Draws grid on canvas με transformation support
 */
export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  gridSize: number,
  bounds: BoundingBox,
  options: {
    majorGridColor?: string;
    minorGridColor?: string;
    majorGridInterval?: number;
    lineWidth?: number;
    alpha?: number;
  } = {}
): void => {
  const {
    majorGridColor = 'var(--layera-color-gray-300, #ddd)',
    minorGridColor = 'var(--layera-color-gray-100, #f0f0f0)',
    majorGridInterval = 5,
    lineWidth = 1,
    alpha = 1
  } = options;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineWidth = lineWidth;

  // Calculate grid boundaries
  const startX = Math.floor(bounds.minX / gridSize) * gridSize;
  const endX = Math.ceil(bounds.maxX / gridSize) * gridSize;
  const startY = Math.floor(bounds.minY / gridSize) * gridSize;
  const endY = Math.ceil(bounds.maxY / gridSize) * gridSize;

  // Draw vertical lines
  ctx.beginPath();
  for (let x = startX; x <= endX; x += gridSize) {
    const isMajor = Math.round(x / gridSize) % majorGridInterval === 0;
    ctx.strokeStyle = isMajor ? majorGridColor : minorGridColor;

    ctx.moveTo(x, bounds.minY);
    ctx.lineTo(x, bounds.maxY);
    ctx.stroke();
  }

  // Draw horizontal lines
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

/**
 * Draws coordinate axes
 */
export const drawAxes = (
  ctx: CanvasRenderingContext2D,
  bounds: BoundingBox,
  options: {
    xAxisColor?: string;
    yAxisColor?: string;
    lineWidth?: number;
    showLabels?: boolean;
    labelFont?: string;
    labelColor?: string;
  } = {}
): void => {
  const {
    xAxisColor = 'var(--layera-color-gray-700, #333)',
    yAxisColor = 'var(--layera-color-gray-700, #333)',
    lineWidth = 2,
    showLabels = true,
    labelFont = 'var(--layera-font-size-xs) Arial',
    labelColor = 'var(--layera-color-gray-600, #666)'
  } = options;

  ctx.save();
  ctx.lineWidth = lineWidth;

  // Draw X axis (y = 0)
  if (bounds.minY <= 0 && bounds.maxY >= 0) {
    ctx.strokeStyle = xAxisColor;
    ctx.beginPath();
    ctx.moveTo(bounds.minX, 0);
    ctx.lineTo(bounds.maxX, 0);
    ctx.stroke();

    if (showLabels) {
      ctx.fillStyle = labelColor;
      ctx.font = labelFont;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText('X', bounds.maxX - 10, 5);
    }
  }

  // Draw Y axis (x = 0)
  if (bounds.minX <= 0 && bounds.maxX >= 0) {
    ctx.strokeStyle = yAxisColor;
    ctx.beginPath();
    ctx.moveTo(0, bounds.minY);
    ctx.lineTo(0, bounds.maxY);
    ctx.stroke();

    if (showLabels) {
      ctx.fillStyle = labelColor;
      ctx.font = labelFont;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Y', 5, bounds.minY + 10);
    }
  }

  ctx.restore();
};

/**
 * Draws scale ruler
 */
export const drawRuler = (
  ctx: CanvasRenderingContext2D,
  position: 'top' | 'bottom' | 'left' | 'right',
  bounds: BoundingBox,
  scale: number,
  options: {
    height?: number;
    backgroundColor?: string;
    textColor?: string;
    tickColor?: string;
    font?: string;
    unit?: string;
  } = {}
): void => {
  const {
    height = 30,
    backgroundColor = 'var(--layera-bg-surface-overlay, rgba(255, 255, 255, 0.9))',
    textColor = 'var(--layera-color-gray-700, #333)',
    tickColor = 'var(--layera-color-gray-600, #666)',
    font = '11px Arial',
    unit = ''
  } = options;

  ctx.save();

  // Calculate ruler area
  let rulerBounds: BoundingBox;
  switch (position) {
    case 'top':
      rulerBounds = { minX: bounds.minX, minY: bounds.minY, maxX: bounds.maxX, maxY: bounds.minY + height, width: bounds.width, height };
      break;
    case 'bottom':
      rulerBounds = { minX: bounds.minX, minY: bounds.maxY - height, maxX: bounds.maxX, maxY: bounds.maxY, width: bounds.width, height };
      break;
    case 'left':
      rulerBounds = { minX: bounds.minX, minY: bounds.minY, maxX: bounds.minX + height, maxY: bounds.maxY, width: height, height: bounds.height };
      break;
    case 'right':
      rulerBounds = { minX: bounds.maxX - height, minY: bounds.minY, maxX: bounds.maxX, maxY: bounds.maxY, width: height, height: bounds.height };
      break;
  }

  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(rulerBounds.minX, rulerBounds.minY, rulerBounds.width, rulerBounds.height);

  // Configure text
  ctx.font = font;
  ctx.fillStyle = textColor;
  ctx.strokeStyle = tickColor;
  ctx.lineWidth = 1;

  // Calculate tick spacing
  const pixelsPerUnit = scale;
  const minTickSpacing = 50; // minimum pixels between major ticks
  const unitSpacing = Math.pow(10, Math.floor(Math.log10(minTickSpacing / pixelsPerUnit)));

  if (position === 'top' || position === 'bottom') {
    // Horizontal ruler
    const startValue = Math.floor(bounds.minX / unitSpacing) * unitSpacing;
    const endValue = Math.ceil(bounds.maxX / unitSpacing) * unitSpacing;

    ctx.textAlign = 'center';
    ctx.textBaseline = position === 'top' ? 'bottom' : 'top';

    for (let value = startValue; value <= endValue; value += unitSpacing) {
      const x = value;
      const y1 = position === 'top' ? rulerBounds.maxY : rulerBounds.minY;
      const y2 = position === 'top' ? rulerBounds.maxY - height * 0.6 : rulerBounds.minY + height * 0.6;
      const textY = position === 'top' ? rulerBounds.maxY - 2 : rulerBounds.minY + 2;

      // Draw tick
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();

      // Draw label
      const label = value === 0 ? '0' : `${value}${unit}`;
      ctx.fillText(label, x, textY);
    }
  } else {
    // Vertical ruler
    const startValue = Math.floor(bounds.minY / unitSpacing) * unitSpacing;
    const endValue = Math.ceil(bounds.maxY / unitSpacing) * unitSpacing;

    ctx.textAlign = position === 'left' ? 'right' : 'left';
    ctx.textBaseline = 'middle';

    for (let value = startValue; value <= endValue; value += unitSpacing) {
      const y = value;
      const x1 = position === 'left' ? rulerBounds.maxX : rulerBounds.minX;
      const x2 = position === 'left' ? rulerBounds.maxX - height * 0.6 : rulerBounds.minX + height * 0.6;
      const textX = position === 'left' ? rulerBounds.maxX - 2 : rulerBounds.minX + 2;

      // Draw tick
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      // Draw label
      const label = value === 0 ? '0' : `${value}${unit}`;
      ctx.fillText(label, textX, y);
    }
  }

  ctx.restore();
};

/**
 * Draws crosshair cursor
 */
export const drawCrosshair = (
  ctx: CanvasRenderingContext2D,
  center: Point2D,
  bounds: BoundingBox,
  options: {
    color?: string;
    lineWidth?: number;
    dashPattern?: number[];
    alpha?: number;
  } = {}
): void => {
  const {
    color = 'var(--layera-color-red-500, #ff0000)',
    lineWidth = 1,
    dashPattern = [5, 5],
    alpha = 0.7
  } = options;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = alpha;
  ctx.setLineDash(dashPattern);

  // Vertical line
  ctx.beginPath();
  ctx.moveTo(center.x, bounds.minY);
  ctx.lineTo(center.x, bounds.maxY);
  ctx.stroke();

  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(bounds.minX, center.y);
  ctx.lineTo(bounds.maxX, center.y);
  ctx.stroke();

  ctx.restore();
};

/**
 * Utility για measuring text dimensions
 */
export const measureText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  font?: string
): { width: number; height: number } => {
  ctx.save();

  if (font) {
    ctx.font = font;
  }

  const metrics = ctx.measureText(text);
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  ctx.restore();

  return {
    width: metrics.width,
    height: height || 12 // fallback height
  };
};

/**
 * High DPI canvas setup utility
 */
export const setupHighDPICanvas = (canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  ratio: number;
} => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get 2D rendering context');
  }

  const ratio = window.devicePixelRatio || 1;

  // Set actual canvas size
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;

  // Scale context to match device pixel ratio
  ctx.scale(ratio, ratio);

  // Set CSS size to maintain appearance
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  return { ctx, ratio };
};