import React from 'react';
import { CSS_DESIGN_TOKENS } from '@layera/constants';
import { Box } from '@layera/layout';

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
    <Box
      id={id}
      boxSizing="border-box"
      position="relative"
      overflow="clip"
      width="full"
      height="full"
      data-viewport-frame
    >
      {children}
    </Box>
  );
}