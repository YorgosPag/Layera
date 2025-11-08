/**
 * cursorDebug.ts - Διαγνωστικό module για cursor conflicts
 *
 * Διαγνώζει την αλληλεπίδραση μεταξύ Leaflet χάρτη και info panels
 * που προκαλεί cursor flickering/conflicts.
 */

import { CONFIG } from '@layera/constants';

export interface CursorDebugOptions {
  panelSelector: string;
  mapSelector?: string;
  throttleMs?: number;
}

declare global {
  interface Window {
    __LAYERA_DEBUG_CURSOR?: boolean;
    __who?: (x: number, y: number) => string[];
  }
}

/**
 * Εγκαθιστά comprehensive cursor debugging για ανίχνευση conflicts
 */
export function installCursorDebug(opts: CursorDebugOptions) {
  const { panelSelector, mapSelector = '.leaflet-container', throttleMs = CONFIG.debug.cursorThrottleMs } = opts;

  const log = (...args: unknown[]) => {
    // Debug logging disabled in production
    if (process.env.NODE_ENV === 'development') {
      console.debug('[cursor-debug]', ...args);
    }
  };

  // Throttled mousemove logger για performance
  let lastLogTime = 0;
  const onMove = (e: MouseEvent) => {
    const now = performance.now();
    if (now - lastLogTime < throttleMs) return;
    lastLogTime = now;

    const target = e.target as HTMLElement;
    const computedCursor = window.getComputedStyle(target).cursor;

    // Get element stack at cursor position
    const elementStack = document.elementsFromPoint(e.clientX, e.clientY)
      .slice(0, CONFIG.debug.maxElementStackSize)
      .map(el => {
        const element = el as HTMLElement;
        return element.className || element.id || element.tagName;
      });

    log('mousemove', {
      target: target.tagName,
      cursor: computedCursor,
      stack: elementStack
    });
  };

  // Observe body class/style changes (Leaflet adds/removes classes like leaflet-dragging)
  const bodyObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
        log('body change', {
          class: document.body.className,
          style: document.body.getAttribute('style')
        });
      }
    });
  });
  bodyObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class', 'style']
  });

  // Observe map container class/style changes
  const mapElement = document.querySelector(mapSelector) as HTMLElement | null;
  const mapObserver = mapElement ? new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
        log('map change', {
          class: mapElement.className,
          style: mapElement.getAttribute('style')
        });
      }
    });
  }) : null;

  if (mapElement && mapObserver) {
    mapObserver.observe(mapElement, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }

  // Trap style.cursor assignments για ανίχνευση dynamic cursor changes
  const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function(
    name: string,
    value: string,
    priority?: string
  ) {
    if (name === 'cursor' && process.env.NODE_ENV === 'development') {
      console.debug('[cursor-setprop]', { value, priority });
    }
    return originalSetProperty.call(this, name, value, priority as any);
  };

  // Trap direct cursor property assignments
  const cursorDescriptor = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'cursor');
  if (cursorDescriptor && cursorDescriptor.set) {
    Object.defineProperty(CSSStyleDeclaration.prototype, 'cursor', {
      configurable: true,
      get: cursorDescriptor.get.bind(this),
      set: function(value: unknown) {
        if (process.env.NODE_ENV === 'development') {
          console.debug('[cursor-direct]', { value });
        }
        return cursorDescriptor.set!.call(this, value);
      }
    });
  }

  // Install global mousemove listener
  window.addEventListener('mousemove', onMove, true);

  // Install helper function για manual debugging
  window.__who = (x: number, y: number) =>
    document.elementsFromPoint(x, y)
      .map(element => (element as HTMLElement).outerHTML.slice(0, CONFIG.debug.maxHTMLSliceLength));

  // Cleanup function
  return () => {
    window.removeEventListener('mousemove', onMove, true);
    bodyObserver.disconnect();
    mapObserver?.disconnect();

    // Restore original methods
    CSSStyleDeclaration.prototype.setProperty = originalSetProperty;
    if (cursorDescriptor) {
      Object.defineProperty(CSSStyleDeclaration.prototype, 'cursor', cursorDescriptor);
    }

    delete window.__who;
    // Cursor debugging cleanup completed
  };
}

/**
 * Εγκαθιστά live element stack debugging
 */
export function installLiveStackDebug() {
  const stackLogger = (e: MouseEvent) => {
    if (!window.__LAYERA_DEBUG_CURSOR) return;

    const stack = document.elementsFromPoint(e.clientX, e.clientY)
      .slice(0, CONFIG.debug.maxLiveStackSize)
      .map(node => {
        const element = node as HTMLElement;
        return element.className || element.nodeName;
      });

    if (process.env.NODE_ENV === 'development') {
      console.debug('[cursor-stack]', stack);
    }
  };

  document.addEventListener('mousemove', stackLogger, true);

  return () => {
    document.removeEventListener('mousemove', stackLogger, true);
  };
}