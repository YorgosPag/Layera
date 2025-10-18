/**
 * 🎨 SnapCanvas Component
 * Interactive canvas για snap visualization - χρησιμοποιεί existing LEGO systems
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';

// Import από existing LEGO systems - ΜΗΝ αναδημιουργήσεις
import { useTheme } from '@layera/theme-switcher';
import { useViewport } from '@layera/viewport';
import { ErrorBoundary } from '@layera/error-boundary';
import { LoadingSpinner } from '@layera/loading';

// Import snap components
import { SnapIndicator, SnapCursor, SnapGuidelines } from './SnapIndicator';

// Import από snap engine και hooks
import { useSnapEngine } from '../hooks/useSnapEngine';
import type { SnapResult, GeometryEntity } from '@layera/snap-engine';

// ========================================
// 🎨 COMPONENT INTERFACES
// ========================================

export interface SnapCanvasProps {
  width: number;
  height: number;
  geometries: GeometryEntity[];
  onSnapResult?: (result: SnapResult) => void;
  onGeometryAdd?: (geometry: GeometryEntity) => void;
  onGeometrySelect?: (geometry: GeometryEntity) => void;

  // Visual options
  showSnapIndicators?: boolean;
  showSnapGuidelines?: boolean;
  showSnapCursor?: boolean;
  snapEnabled?: boolean;
  tolerance?: number;

  // Interaction options
  interactive?: boolean;
  drawingMode?: boolean;
  selectionMode?: boolean;

  // Styling
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CanvasState {
  cursorPosition: { x: number; y: number };
  lastSnapResult: SnapResult | null;
  isDrawing: boolean;
  selectedGeometry: GeometryEntity | null;
  hoverGeometry: GeometryEntity | null;
}

// ========================================
// 🎨 SNAP CANVAS COMPONENT
// ========================================

export const SnapCanvas: React.FC<SnapCanvasProps> = ({
  width,
  height,
  geometries,
  onSnapResult,
  onGeometryAdd,
  onGeometrySelect,

  showSnapIndicators = true,
  showSnapGuidelines = true,
  showSnapCursor = true,
  snapEnabled = true,
  tolerance = 10,

  interactive = true,
  drawingMode = false,
  selectionMode = false,

  backgroundColor,
  className = '',
  style = {}
}) => {
  // Existing LEGO systems integration - ΜΗΝ αναδημιουργήσεις
  const { theme } = useTheme();
  const { isMobile } = useViewport();

  // Snap engine integration
  const {
    snapToPoint,
    addGeometries,
    clearGeometries,
    setEnabled,
    setTolerance,
    isIndexing
  } = useSnapEngine({
    enabled: snapEnabled,
    tolerance,
    debugMode: false,
    onSnapFound: onSnapResult,
    onError: (error) => console.error('Snap canvas error:', error)
  });

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Local state
  const [canvasState, setCanvasState] = useState<CanvasState>({
    cursorPosition: { x: 0, y: 0 },
    lastSnapResult: null,
    isDrawing: false,
    selectedGeometry: null,
    hoverGeometry: null
  });

  // ========================================
  // 🎯 SNAP ENGINE SETUP
  // ========================================

  useEffect(() => {
    setEnabled(snapEnabled);
  }, [snapEnabled, setEnabled]);

  useEffect(() => {
    setTolerance(tolerance);
  }, [tolerance, setTolerance]);

  useEffect(() => {
    // Update geometries στο snap engine
    clearGeometries();
    if (geometries.length > 0) {
      addGeometries(geometries);
    }
  }, [geometries, clearGeometries, addGeometries]);

  // ========================================
  // 🎨 CANVAS RENDERING
  // ========================================

  const renderGeometries = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = backgroundColor || (theme === 'dark' ? '#2c3e50' : '#ecf0f1');
    ctx.fillRect(0, 0, width, height);

    // Render geometries
    geometries.forEach(geometry => {
      renderGeometry(ctx, geometry);
    });
  }, [width, height, geometries, backgroundColor, theme]);

  const renderGeometry = useCallback((ctx: CanvasRenderingContext2D, geometry: GeometryEntity) => {
    if (!geometry.visible) return;

    // Styling based σε selection state
    const isSelected = canvasState.selectedGeometry?.id === geometry.id;
    const isHovered = canvasState.hoverGeometry?.id === geometry.id;

    ctx.strokeStyle = isSelected ? '#e74c3c' : isHovered ? '#3498db' :
                     theme === 'dark' ? '#ecf0f1' : '#2c3e50';
    ctx.lineWidth = isSelected ? 3 : isHovered ? 2 : 1;
    ctx.fillStyle = geometry.layer === 'osm_buildings' ?
                   'rgba(52, 152, 219, 0.2)' : 'transparent';

    // Render based on geometry type
    switch (geometry.type) {
      case 'line':
        const line = geometry.data as any;
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
        break;

      case 'circle':
        const circle = geometry.data as any;
        ctx.beginPath();
        ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (ctx.fillStyle !== 'transparent') {
          ctx.fill();
        }
        break;

      case 'polyline':
      case 'polygon':
        const polyline = geometry.data as any;
        if (polyline.vertices.length > 1) {
          ctx.beginPath();
          ctx.moveTo(polyline.vertices[0].x, polyline.vertices[0].y);

          for (let i = 1; i < polyline.vertices.length; i++) {
            ctx.lineTo(polyline.vertices[i].x, polyline.vertices[i].y);
          }

          if (polyline.closed) {
            ctx.closePath();
            if (ctx.fillStyle !== 'transparent') {
              ctx.fill();
            }
          }
          ctx.stroke();
        }
        break;

      case 'point':
        const point = geometry.data as any;
        ctx.beginPath();
        ctx.arc(point.position.x, point.position.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        break;
    }
  }, [canvasState.selectedGeometry, canvasState.hoverGeometry, theme]);

  // ========================================
  // 🖱️ MOUSE INTERACTION HANDLERS
  // ========================================

  const handleMouseMove = useCallback(async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update cursor position
    setCanvasState(prev => ({
      ...prev,
      cursorPosition: { x, y }
    }));

    // Perform snap calculation
    if (snapEnabled) {
      try {
        const snapResult = await snapToPoint({ x, y });

        setCanvasState(prev => ({
          ...prev,
          lastSnapResult: snapResult
        }));

        // Call callback
        onSnapResult?.(snapResult);
      } catch (error) {
        console.error('Snap calculation failed:', error);
      }
    }

    // Hover detection για geometry selection
    if (selectionMode) {
      const hoveredGeometry = findGeometryAtPoint({ x, y });
      setCanvasState(prev => ({
        ...prev,
        hoverGeometry: hoveredGeometry
      }));
    }
  }, [interactive, snapEnabled, snapToPoint, onSnapResult, selectionMode]);

  const handleMouseClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectionMode) {
      // Select geometry
      const clickedGeometry = findGeometryAtPoint({ x, y });
      setCanvasState(prev => ({
        ...prev,
        selectedGeometry: clickedGeometry
      }));

      if (clickedGeometry) {
        onGeometrySelect?.(clickedGeometry);
      }
    }

    if (drawingMode) {
      // Drawing functionality - simplified example
      // Real implementation θα είχε διάφορα drawing tools
      console.log('Drawing at:', { x, y });
    }
  }, [interactive, selectionMode, drawingMode, onGeometrySelect]);

  const findGeometryAtPoint = useCallback((point: { x: number; y: number }): GeometryEntity | null => {
    // Simple hit testing - production implementation θα χρησιμοποιούσε spatial index
    for (const geometry of geometries) {
      if (isPointInGeometry(point, geometry)) {
        return geometry;
      }
    }
    return null;
  }, [geometries]);

  const isPointInGeometry = (point: { x: number; y: number }, geometry: GeometryEntity): boolean => {
    // Simple bounding box check - real implementation θα έκανε accurate hit testing
    const tolerance = 5;
    const bounds = geometry.bounds;

    return point.x >= bounds.minX - tolerance &&
           point.x <= bounds.maxX + tolerance &&
           point.y >= bounds.minY - tolerance &&
           point.y <= bounds.maxY + tolerance;
  };

  // ========================================
  // 📱 TOUCH HANDLERS για Mobile Support
  // ========================================

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isMobile || !interactive) return;

    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Simulate mouse move για mobile
    handleMouseMove({
      clientX: touch.clientX,
      clientY: touch.clientY
    } as any);
  }, [isMobile, interactive, handleMouseMove]);

  // ========================================
  // 🎨 CANVAS EFFECT
  // ========================================

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Render geometries
    renderGeometries(ctx);
  }, [renderGeometries, canvasState.selectedGeometry, canvasState.hoverGeometry]);

  // ========================================
  // 🎯 RENDER
  // ========================================

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width,
    height,
    overflow: 'hidden',
    cursor: interactive ? 'crosshair' : 'default',
    ...style
  };

  const canvasStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%'
  };

  return (
    <ErrorBoundary>
      <div
        ref={containerRef}
        className={`snap-canvas ${className}`}
        style={containerStyle}
      >
        {/* Main Canvas */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={canvasStyle}
          onMouseMove={handleMouseMove}
          onClick={handleMouseClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
        />

        {/* Loading Overlay - χρησιμοποιεί @layera/loading */}
        {isIndexing && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <LoadingSpinner size="large" />
          </div>
        )}

        {/* Snap Visual Feedback */}
        {snapEnabled && canvasState.lastSnapResult && (
          <>
            {/* Snap Indicator */}
            {showSnapIndicators && (
              <SnapIndicator
                snapResult={canvasState.lastSnapResult}
                visible={true}
                animated={true}
                showTooltip={!isMobile}
              />
            )}

            {/* Snap Guidelines */}
            {showSnapGuidelines && (
              <SnapGuidelines
                snapResult={canvasState.lastSnapResult}
                cursorPosition={canvasState.cursorPosition}
                visible={true}
                showDistance={!isMobile}
              />
            )}
          </>
        )}

        {/* Snap Cursor */}
        {showSnapCursor && interactive && (
          <SnapCursor
            snapResult={canvasState.lastSnapResult || {
              target: null,
              snapped: false,
              distance: Infinity,
              cursor: canvasState.cursorPosition,
              snapPoint: canvasState.cursorPosition,
              snapType: null
            }}
            cursorPosition={canvasState.cursorPosition}
            visible={true}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

// ========================================
// 🎨 PRESET CANVAS CONFIGURATIONS
// ========================================

export const CADSnapCanvas: React.FC<Omit<SnapCanvasProps, 'tolerance'>> = (props) => (
  <SnapCanvas {...props} tolerance={5} showSnapGuidelines={true} />
);

export const GISSnapCanvas: React.FC<Omit<SnapCanvasProps, 'tolerance'>> = (props) => (
  <SnapCanvas {...props} tolerance={15} showSnapGuidelines={false} />
);

export const MobileSnapCanvas: React.FC<Omit<SnapCanvasProps, 'tolerance' | 'showSnapGuidelines'>> = (props) => (
  <SnapCanvas {...props} tolerance={25} showSnapGuidelines={false} />
);