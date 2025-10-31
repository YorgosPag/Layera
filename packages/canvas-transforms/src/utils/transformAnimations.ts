import type {
  TransformAnimation,
  CanvasTransform,
  Point2D
} from '../types';
import { interpolateMatrix } from './matrixOperations';

/**
 * Transform animation utilities για smooth transitions
 * Enterprise-grade animations με easing functions και callback support
 */

/**
 * Easing functions για animations
 */
export const easingFunctions = {
  linear: (t: number): number => t,

  easeIn: (t: number): number => t * t,

  easeOut: (t: number): number => t * (2 - t),

  easeInOut: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  easeInCubic: (t: number): number => t * t * t,

  easeOutCubic: (t: number): number => (--t) * t * t + 1,

  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeInQuart: (t: number): number => t * t * t * t,

  easeOutQuart: (t: number): number => 1 - (--t) * t * t * t,

  easeInOutQuart: (t: number): number =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,

  elastic: (t: number): number => {
    if (t === 0 || t === 1) return t;
    const p = 0.3;
    const s = p / 4;
    return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
  },

  bounce: (t: number): number => {
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

/**
 * Animation manager για transform animations
 */
export class TransformAnimator {
  private activeAnimations: Map<string, {
    animation: TransformAnimation;
    startTime: number;
    rafId: number;
  }> = new Map();

  /**
   * Starts a transform animation
   */
  animate(
    id: string,
    animation: TransformAnimation
  ): Promise<void> {
    // Cancel existing animation με same ID
    this.cancel(id);

    return new Promise<void>((resolve) => {
      const startTime = performance.now();
      const easingFn = easingFunctions[animation.easing] || easingFunctions.linear;

      const animateFrame = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animation.duration, 1);
        const easedProgress = easingFn(progress);

        // Interpolate transform values
        const currentTransform = this.interpolateTransform(
          animation.from,
          animation.to,
          easedProgress
        );

        // Call update callback
        animation.onUpdate?.(currentTransform);

        if (progress >= 1) {
          // Animation complete
          this.activeAnimations.delete(id);
          animation.onComplete?.();
          resolve();
        } else {
          // Continue animation
          const rafId = requestAnimationFrame(animateFrame);
          const activeAnim = this.activeAnimations.get(id);
          if (activeAnim) {
            activeAnim.rafId = rafId;
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
  cancel(id: string): void {
    const activeAnim = this.activeAnimations.get(id);
    if (activeAnim) {
      cancelAnimationFrame(activeAnim.rafId);
      this.activeAnimations.delete(id);
    }
  }

  /**
   * Cancels all active animations
   */
  cancelAll(): void {
    this.activeAnimations.forEach((_, id) => this.cancel(id));
  }

  /**
   * Checks if animation is active
   */
  isAnimating(id: string): boolean {
    return this.activeAnimations.has(id);
  }

  /**
   * Gets list of active animation IDs
   */
  getActiveAnimations(): string[] {
    return Array.from(this.activeAnimations.keys());
  }

  /**
   * Interpolates between two transform states
   */
  private interpolateTransform(
    from: Partial<CanvasTransform>,
    to: Partial<CanvasTransform>,
    t: number
  ): CanvasTransform {
    // Create default transform if not provided
    const defaultTransform: CanvasTransform = {
      matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      viewport: { x: 0, y: 0, width: 800, height: 600, scale: 1, rotation: 0 },
      scale: 1,
      translation: { x: 0, y: 0 },
      rotation: 0,
      origin: { x: 0, y: 0 }
    };

    const fromTransform = { ...defaultTransform, ...from };
    const toTransform = { ...defaultTransform, ...to };

    // Interpolate matrix
    const interpolatedMatrix = interpolateMatrix(
      fromTransform.matrix,
      toTransform.matrix,
      t
    );

    // Interpolate viewport
    const interpolatedViewport = {
      x: fromTransform.viewport.x + (toTransform.viewport.x - fromTransform.viewport.x) * t,
      y: fromTransform.viewport.y + (toTransform.viewport.y - fromTransform.viewport.y) * t,
      width: fromTransform.viewport.width + (toTransform.viewport.width - fromTransform.viewport.width) * t,
      height: fromTransform.viewport.height + (toTransform.viewport.height - fromTransform.viewport.height) * t,
      scale: fromTransform.viewport.scale + (toTransform.viewport.scale - fromTransform.viewport.scale) * t,
      rotation: fromTransform.viewport.rotation + (toTransform.viewport.rotation - fromTransform.viewport.rotation) * t
    };

    // Interpolate other properties
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
}

/**
 * Global animator instance
 */
export const globalAnimator = new TransformAnimator();

/**
 * High-level animation functions
 */
export const animations = {
  /**
   * Animates zoom to specific scale
   */
  zoomTo: (
    targetScale: number,
    _center: Point2D,
    duration: number = 300,
    easing: keyof typeof easingFunctions = 'easeOut'
  ): Promise<void> => {
    return globalAnimator.animate('zoom', {
      duration,
      easing,
      from: { scale: 1 },
      to: { scale: targetScale },
      onUpdate: () => {
        // This would be handled by the viewport manager
      }
    });
  },

  /**
   * Animates pan to specific position
   */
  panTo: (
    targetPosition: Point2D,
    duration: number = 300,
    easing: keyof typeof easingFunctions = 'easeOut'
  ): Promise<void> => {
    return globalAnimator.animate('pan', {
      duration,
      easing,
      from: { translation: { x: 0, y: 0 } },
      to: { translation: targetPosition },
      onUpdate: () => {
      }
    });
  },

  /**
   * Animates rotation to specific angle
   */
  rotateTo: (
    targetRotation: number,
    duration: number = 300,
    easing: keyof typeof easingFunctions = 'easeInOut'
  ): Promise<void> => {
    return globalAnimator.animate('rotate', {
      duration,
      easing,
      from: { rotation: 0 },
      to: { rotation: targetRotation },
      onUpdate: () => {
      }
    });
  },

  /**
   * Smooth transition between two complete transform states
   */
  transitionTo: (
    fromTransform: CanvasTransform,
    toTransform: CanvasTransform,
    duration: number = 500,
    easing: keyof typeof easingFunctions = 'easeInOut'
  ): Promise<void> => {
    return globalAnimator.animate('transition', {
      duration,
      easing,
      from: fromTransform,
      to: toTransform,
      onUpdate: () => {
      }
    });
  }
};

/**
 * Animation utilities
 */
export const animationUtils = {
  /**
   * Creates spring animation parameters
   */
  createSpringAnimation: (
    stiffness: number = 100,
    damping: number = 10,
    mass: number = 1
  ) => {
    const w0 = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));

    if (zeta < 1) {
      // Under-damped
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return (t: number) => {
        const e = Math.exp(-zeta * w0 * t);
        return 1 - e * (Math.cos(wd * t) + (zeta * w0 / wd) * Math.sin(wd * t));
      };
    } else if (zeta === 1) {
      // Critically damped
      return (t: number) => 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    } else {
      // Over-damped
      const r1 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
      const r2 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
      return (t: number) => {
        const c1 = -r2 / (r1 - r2);
        const c2 = r1 / (r1 - r2);
        return 1 - c1 * Math.exp(r1 * t) - c2 * Math.exp(r2 * t);
      };
    }
  },

  /**
   * Calculates optimal animation duration based on distance
   */
  calculateDuration: (
    startValue: number,
    endValue: number,
    baseSpeed: number = 1000 // units per second
  ): number => {
    const distance = Math.abs(endValue - startValue);
    return Math.max(200, Math.min(1000, distance / baseSpeed * 1000));
  },

  /**
   * Creates stepped animation για discrete values
   */
  createSteppedAnimation: (steps: number) => {
    return (t: number): number => {
      return Math.floor(t * steps) / steps;
    };
  }
};