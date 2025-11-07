import {
  CADData,
  CADRenderData,
  CADRenderOptions,
  CADLayerRenderData,
  CADEntity,
  CADGeometry,
  CADPoint3D,
  CADRenderingError
} from '../types';

/**
 * CAD renderer που μετατρέπει CAD data σε SVG
 * Βασισμένο σε patterns από OLD_geo-canvas DxfEntityRenderer
 */
export class CADRenderer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private svgElements: string[] = [];
  private currentScale = 1;
  private currentOffset = { x: 0, y: 0 };

  /**
   * Main rendering method
   */
  async render(
    cadData: CADData,
    options: CADRenderOptions = {}
  ): Promise<CADRenderData> {
    try {
      this.svgElements = [];

      // Calculate rendering parameters
      const renderBounds = this.calculateRenderBounds(cadData);
      const scale = this.calculateScale(renderBounds, options);
      const viewBox = this.calculateViewBox(renderBounds, scale);

      this.currentScale = scale;
      this.currentOffset = {
        x: -renderBounds.min.x * scale,
        y: -renderBounds.min.y * scale
      };

      // Filter layers to render
      const layersToRender = this.getLayersToRender(cadData, options);

      // Render layers
      const layerRenderData: CADLayerRenderData[] = [];

      for (const layer of layersToRender) {
        const layerEntities = cadData.entities.filter(entity => entity.layer === layer.name);

        if (layerEntities.length > 0) {
          const layerSvg = this.renderLayer(layer.name, layerEntities, options);
          layerRenderData.push({
            name: layer.name,
            visible: layer.visible,
            elementCount: layerEntities.length,
            svgGroup: layerSvg
          });
        }
      }

      // Combine all SVG elements
      const svg = this.generateFinalSVG(layerRenderData, viewBox, options);

      return {
        svg,
        bounds: renderBounds,
        layers: layerRenderData,
        scale,
        viewBox
      };

    } catch (error) {
      throw new CADRenderingError(
        error instanceof Error ? error.message : 'Unknown rendering error'
      );
    }
  }

  /**
   * Calculates the bounding box για rendering
   */
  private calculateRenderBounds(cadData: CADData) {
    return cadData.metadata.boundingBox;
  }

  /**
   * Calculates appropriate scale για rendering
   */
  private calculateScale(bounds: CADData['metadata']['boundingBox'], options: CADRenderOptions): number {
    if (options.scaleFactor) {
      return options.scaleFactor;
    }

    // Auto-scale to fit within reasonable SVG dimensions
    const maxDimension = Math.max(bounds.size.x, bounds.size.y);
    const targetSize = 1000; // Target max dimension

    return maxDimension > 0 ? targetSize / maxDimension : 1;
  }

  /**
   * Calculates SVG viewBox
   */
  private calculateViewBox(bounds: CADData['metadata']['boundingBox'], scale: number): string {
    const width = bounds.size.x * scale;
    const height = bounds.size.y * scale;
    const x = bounds.min.x * scale;
    const y = bounds.min.y * scale;

    return `${x} ${y} ${width} ${height}`;
  }

  /**
   * Gets layers που θα rendered
   */
  private getLayersToRender(cadData: CADData, options: CADRenderOptions) {
    const allLayers = cadData.tables.layers;

    if (options.renderLayers === 'all') {
      return allLayers.filter(layer => layer.visible);
    }

    if (Array.isArray(options.renderLayers)) {
      return allLayers.filter(layer =>
        options.renderLayers!.includes(layer.name) && layer.visible
      );
    }

    return allLayers.filter(layer => layer.visible);
  }

  /**
   * Renders a single layer
   */
  private renderLayer(
    layerName: string,
    entities: CADEntity[],
    options: CADRenderOptions
  ): string {
    const layerElements: string[] = [];

    for (const entity of entities) {
      try {
        const svg = this.renderEntity(entity, options);
        if (svg) {
          layerElements.push(svg);
        }
      } catch (error) {
        console.warn(`Failed to render entity ${entity.id}:`, error);
      }
    }

    return `<g id="layer-${this.escapeId(layerName)}" class="cad-layer">\n${layerElements.join('\n')}\n</g>`;
  }

  /**
   * Renders a single entity
   */
  private renderEntity(entity: CADEntity, options: CADRenderOptions): string | null {
    const { geometry, color, lineType, lineWeight } = entity;

    // Generate style attributes
    const style = this.generateEntityStyle(color, lineType, lineWeight);

    switch (geometry.type) {
      case 'LINE':
        return this.renderLine(geometry, style);
      case 'CIRCLE':
        return this.renderCircle(geometry, style);
      case 'ARC':
        return this.renderArc(geometry, style);
      case 'POLYLINE':
      case 'LWPOLYLINE':
        return this.renderPolyline(geometry, style);
      case 'TEXT':
      case 'MTEXT':
        return options.renderText ? this.renderText(geometry, style) : null;
      case 'POINT':
        return this.renderPoint(geometry, style);
      default:
        console.warn(`Unsupported entity type for rendering: ${geometry.type}`);
        return null;
    }
  }

  /**
   * Renders LINE entity
   */
  private renderLine(geometry: CADGeometry, style: string): string {
    if (geometry.points.length < 2) return '';

    const p1 = this.transformPoint(geometry.points[0]);
    const p2 = this.transformPoint(geometry.points[1]);

    return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" ${style} />`;
  }

  /**
   * Renders CIRCLE entity
   */
  private renderCircle(geometry: CADGeometry, style: string): string {
    if (geometry.points.length === 0) return '';

    const center = this.transformPoint(geometry.points[0]);
    const radius = (geometry.properties.radius as number || 0) * this.currentScale;

    return `<circle cx="${center.x}" cy="${center.y}" r="${radius}" ${style} fill="none" />`;
  }

  /**
   * Renders ARC entity
   */
  private renderArc(geometry: CADGeometry, style: string): string {
    if (geometry.points.length === 0) return '';

    const center = this.transformPoint(geometry.points[0]);
    const radius = (geometry.properties.radius as number || 0) * this.currentScale;
    const startAngle = geometry.properties.startAngle as number || 0;
    const endAngle = geometry.properties.endAngle as number || 0;

    // Convert to SVG path
    const startX = center.x + radius * Math.cos(startAngle);
    const startY = center.y + radius * Math.sin(startAngle);
    const endX = center.x + radius * Math.cos(endAngle);
    const endY = center.y + radius * Math.sin(endAngle);

    const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;

    const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

    return `<path d="${pathData}" ${style} fill="none" />`;
  }

  /**
   * Renders POLYLINE entity
   */
  private renderPolyline(geometry: CADGeometry, style: string): string {
    if (geometry.points.length < 2) return '';

    const points = geometry.points.map(p => {
      const transformed = this.transformPoint(p);
      return `${transformed.x},${transformed.y}`;
    }).join(' ');

    const closed = geometry.properties.closed as boolean || false;
    const element = closed ? 'polygon' : 'polyline';

    return `<${element} points="${points}" ${style} fill="none" />`;
  }

  /**
   * Renders TEXT entity
   */
  private renderText(geometry: CADGeometry, style: string): string {
    if (geometry.points.length === 0) return '';

    const position = this.transformPoint(geometry.points[0]);
    const text = geometry.properties.text as string || '';
    const height = (geometry.properties.height as number || 1) * this.currentScale;

    const escapedText = this.escapeXML(text);

    return `<text x="${position.x}" y="${position.y}" font-size="${height}" ${style}>${escapedText}</text>`;
  }

  /**
   * Renders POINT entity
   */
  private renderPoint(geometry: CADGeometry, style: string): string {
    if (geometry.points.length === 0) return '';

    const position = this.transformPoint(geometry.points[0]);
    const size = 2; // Fixed size για points

    return `<circle cx="${position.x}" cy="${position.y}" r="${size}" ${style} />`;
  }

  /**
   * Transforms a point από CAD coordinates to SVG coordinates
   */
  private transformPoint(point: CADPoint3D): { x: number; y: number } {
    return {
      x: point.x * this.currentScale + this.currentOffset.x,
      y: -(point.y * this.currentScale) + this.currentOffset.y // Flip Y axis
    };
  }

  /**
   * Generates CSS style attributes για entity
   */
  private generateEntityStyle(
    color: CADEntity['color'],
    lineType: string,
    lineWeight: number
  ): string {
    const styles: string[] = [];

    // Color
    const colorValue = this.convertCADColor(color);
    styles.push(`stroke="${colorValue}"`);

    // Line weight
    const strokeWidth = Math.max(0.5, lineWeight * this.currentScale);
    styles.push(`stroke-width="${strokeWidth}"`);

    // Line type (simplified)
    if (lineType !== 'CONTINUOUS') {
      styles.push('stroke-dasharray="5,5"'); // Simplified dashed line
    }

    return styles.join(' ');
  }

  /**
   * Converts CAD color to CSS color
   */
  private convertCADColor(color: CADEntity['color']): string {
    if (color.type === 'rgb' && typeof color.value === 'object') {
      const rgb = color.value as { r: number; g: number; b: number };
      return `var(--la-color-text-primary)`;  // RGB to design token
    }

    if (color.type === 'index' && typeof color.value === 'number') {
      // AutoCAD color index to RGB mapping (simplified)
      const colorMap: Record<number, string> = {
        0: 'var(--la-color-text-primary)', // ByBlock
        1: 'var(--la-color-error)', // Error color
        2: 'var(--la-color-warning)', // Warning color
        3: 'var(--la-color-success)', // Success color
        4: 'var(--la-color-info)', // Info color
        5: 'var(--la-color-primary)', // Primary color
        6: 'var(--la-color-secondary)', // Secondary color
        7: 'var(--la-color-surface)', // Surface color
        8: 'var(--la-color-text-secondary)', // Secondary text
        9: 'var(--la-color-text-muted)'  // Muted text
      };

      return colorMap[color.value] || 'var(--la-color-text-primary)';
    }

    return 'var(--la-color-text-primary)'; // Default color
  }

  /**
   * Generates the final SVG document
   */
  private generateFinalSVG(
    layers: CADLayerRenderData[],
    viewBox: string,
    options: CADRenderOptions
  ): string {
    const width = options.renderOptions?.width || 1000;
    const height = options.renderOptions?.height || 1000;

    const svgContent = layers.map(layer => layer.svgGroup).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="${viewBox}"
     class="cad-drawing">
  <defs>
    <style>
      .cad-layer { }
      .cad-entity { }
    </style>
  </defs>
  ${svgContent}
</svg>`;
  }

  /**
   * Helper methods
   */
  private escapeId(id: string): string {
    return id.replace(/[^a-zA-Z0-9-_]/g, '_');
  }

  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}