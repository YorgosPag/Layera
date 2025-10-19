/**
 * @layera/pipelines - Enterprise Modal Container Hook
 * SSR-safe container resolution - NO document access in render
 */

import { useEffect, useState } from 'react';

interface UseModalContainerOptions {
  preferredId?: string;
  fallbackId?: string;
}

/**
 * SSR-safe modal container resolver
 * Returns container function only after hydration
 */
export function useModalContainer(options: UseModalContainerOptions = {}) {
  const { preferredId = 'layera-device-simulator-viewport', fallbackId = 'root' } = options;
  const [containerFn, setContainerFn] = useState<(() => Element | null) | null>(null);

  useEffect(() => {
    // Only run after hydration - SSR safe
    const getContainer = (): Element | null => {
      // Try preferred container first
      if (preferredId) {
        const preferred = document.getElementById(preferredId);
        if (preferred) return preferred;
      }

      // Try fallback
      if (fallbackId) {
        const fallback = document.getElementById(fallbackId);
        if (fallback) return fallback;
      }

      // Ultimate fallback to body
      return document.body;
    };

    setContainerFn(() => getContainer);
  }, [preferredId, fallbackId]);

  return containerFn;
}

/**
 * Simple helper to detect if we're in device simulation mode
 * Used for styling decisions
 */
export function useIsDeviceSimulation(): boolean {
  const [isDeviceMode, setIsDeviceMode] = useState(false);

  useEffect(() => {
    const deviceViewport = document.getElementById('layera-device-simulator-viewport');
    setIsDeviceMode(!!deviceViewport);
  }, []);

  return isDeviceMode;
}