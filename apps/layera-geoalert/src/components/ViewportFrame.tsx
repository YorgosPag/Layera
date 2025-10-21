import React from 'react';

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
        position: 'relative',
        width: '100%',
        height: '100%',                 // Χρησιμοποιεί το ύψος από το parent (AppShell)
        overflow: 'clip',               // Κόβει κάθε διαρροή - καλύτερο από hidden
        boxSizing: 'border-box'         // Σιγουρεύει σωστούς υπολογισμούς
      }}
      data-viewport-frame
    >
      {children}
    </div>
  );
}