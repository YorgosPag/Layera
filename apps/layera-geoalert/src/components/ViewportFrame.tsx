import React from 'react';
import { SIZING_SCALE } from '@layera/layout';
import { CSS_DESIGN_TOKENS } from '@layera/constants';

interface ViewportFrameProps {
  children: React.ReactNode;
  id?: string;
}

/**
 * ViewportFrame - Αποκλειστικό container για σωστό positioning
 * Λύνει τα προβλήματα με CSS transforms από device simulators
 */
export function ViewportFrame({ children, id }: ViewportFrameProps) {
  return (
    <div
      id={id}
      style={{
        // ✅ Enterprise design tokens από @layera/constants
        boxSizing: CSS_DESIGN_TOKENS.positioning['box-sizing-border'],
        position: CSS_DESIGN_TOKENS.positioning['position-relative'],
        overflow: CSS_DESIGN_TOKENS.positioning['overflow-clip'],
        width: SIZING_SCALE.FULL,     // ✅ Enterprise sizing system
        height: SIZING_SCALE.FULL     // ✅ Enterprise sizing system
      }}
      data-viewport-frame
    >
      {children}
    </div>
  );
}