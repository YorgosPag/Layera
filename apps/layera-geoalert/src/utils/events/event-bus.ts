// Layera GeoAlert V1 - EventBus Micro-Module
// Single Responsibility: Handle component-to-component communication
// Enterprise pattern: Publisher-Subscriber για decoupled communication

import { GeoAlertArea, DrawingShape } from '../../types';
import { Coordinate } from '../geometry/coordinate-utils';

/**
 * Event types for type-safe event communication
 */
export interface MapEvents {
  'drawing:started': { shape: DrawingShape };
  'drawing:completed': { geometry: GeoAlertArea['geometry'] };
  'drawing:cancelled': {};
  'area:created': { area: GeoAlertArea };
  'area:selected': { areaId: string };
  'area:deleted': { areaId: string };
  'location:detected': { coordinate: Coordinate; accuracy?: number };
  'location:error': { error: string };
  'map:ready': { mapInstance: L.Map };
  'map:moved': { center: Coordinate; zoom: number };
}

type EventName = keyof MapEvents;
type EventHandler<T extends EventName> = (data: MapEvents[T]) => void;

/**
 * Enterprise EventBus implementation
 * Type-safe events για component communication
 */
class EventBus {
  private listeners: Map<EventName, Set<EventHandler<EventName>>> = new Map();

  /**
   * Subscribe to an event
   */
  on<T extends EventName>(eventName: T, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    this.listeners.get(eventName)!.add(handler as EventHandler<EventName>);

    // Return unsubscribe function
    return () => {
      this.off(eventName, handler);
    };
  }

  /**
   * Subscribe to an event (one-time only)
   */
  once<T extends EventName>(eventName: T, handler: EventHandler<T>): void {
    const unsubscribe = this.on(eventName, (data) => {
      handler(data);
      unsubscribe();
    });
  }

  /**
   * Unsubscribe from an event
   */
  off<T extends EventName>(eventName: T, handler: EventHandler<T>): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.delete(handler as EventHandler<EventName>);
      if (eventListeners.size === 0) {
        this.listeners.delete(eventName);
      }
    }
  }

  /**
   * Emit an event
   */
  emit<T extends EventName>(eventName: T, data: MapEvents[T]): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in event handler για ${eventName}:`, error);
        }
      });
    }
  }

  /**
   * Remove all listeners για specific event
   */
  removeAllListeners(eventName?: EventName): void {
    if (eventName) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Get number of listeners για an event
   */
  listenerCount(eventName: EventName): number {
    return this.listeners.get(eventName)?.size || 0;
  }

  /**
   * Check if there are any listeners για an event
   */
  hasListeners(eventName: EventName): boolean {
    return this.listenerCount(eventName) > 0;
  }
}

// Singleton instance
const eventBus = new EventBus();

export default eventBus;

/**
 * React hook για easier event usage in components
 */
export const useEventBus = (): void => {
  return {
    on: eventBus.on.bind(eventBus),
    once: eventBus.once.bind(eventBus),
    off: eventBus.off.bind(eventBus),
    emit: eventBus.emit.bind(eventBus)
  };
};

/**
 * Convenience functions για common events
 */
export const mapEvents = {
  // Drawing events
  startDrawing: (shape: DrawingShape) =>
    eventBus.emit('drawing:started', { shape }),

  completeDrawing: (geometry: GeoAlertArea['geometry']) =>
    eventBus.emit('drawing:completed', { geometry }),

  cancelDrawing: () =>
    eventBus.emit('drawing:cancelled', {}),

  // Area events
  createArea: (area: GeoAlertArea) =>
    eventBus.emit('area:created', { area }),

  selectArea: (areaId: string) =>
    eventBus.emit('area:selected', { areaId }),

  deleteArea: (areaId: string) =>
    eventBus.emit('area:deleted', { areaId }),

  // Location events
  locationDetected: (coordinate: Coordinate, accuracy?: number) =>
    eventBus.emit('location:detected', { coordinate, accuracy }),

  locationError: (error: string) =>
    eventBus.emit('location:error', { error }),

  // Map events
  mapReady: (mapInstance: L.Map) =>
    eventBus.emit('map:ready', { mapInstance }),

  mapMoved: (center: Coordinate, zoom: number) =>
    eventBus.emit('map:moved', { center, zoom })
};