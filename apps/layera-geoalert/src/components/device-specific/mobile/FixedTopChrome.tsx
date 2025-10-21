/**
 * FixedTopChrome.tsx - Portal για iOS Safari header bar fix
 * Λύση για το πρόβλημα εξαφάνισης του browser header στο iOS
 */

import React from 'react';
import { createPortal } from 'react-dom';

interface FixedTopChromeProps {
  children: React.ReactNode;
}

/**
 * Portal component που render το header απευθείας στο document.body
 * για αποφυγή των iOS Safari transform/overflow issues
 */
export const FixedTopChrome: React.FC<FixedTopChromeProps> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  if (!ref.current) {
    ref.current = document.createElement('div');
  }

  React.useEffect(() => {
    const el = ref.current!;
    Object.assign(el.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '2147483647',
      paddingTop: 'var(--safe-top)',
    });
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(children, ref.current);
};