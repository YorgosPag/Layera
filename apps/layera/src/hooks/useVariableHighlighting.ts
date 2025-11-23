import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook για διαχείριση highlighting των CSS variables στα accordion πίνακες
 *
 * Παρακολουθεί αλλαγές από το playground και φωτίζει τις αντίστοιχες γραμμές
 */

export interface HighlightedVariable {
  category: string;
  cssVariable: string;
  timestamp: number;
}

export interface VariableHighlightingReturn {
  highlightedVariable: HighlightedVariable | null;
  highlightVariable: (category: string, cssVariable: string) => void;
  clearHighlight: () => void;
}

export const useVariableHighlighting = (): VariableHighlightingReturn => {
  const [highlightedVariable, setHighlightedVariable] = useState<HighlightedVariable | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const highlightVariable = useCallback((category: string, cssVariable: string) => {
    // Καθαρίζω το προηγούμενο timeout αν υπάρχει
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      //console.log('🔄 Clearing previous highlight timeout');
    }

    // Ορίζω το νέο highlighting
    setHighlightedVariable({
      category,
      cssVariable,
      timestamp: Date.now()
    });

    //console.log('⏰ Setting new highlight for 1 minute:', { category, cssVariable });

    // Αυτόματο καθάρισμα μετά από 1 λεπτό (60000ms)
    timeoutRef.current = setTimeout(() => {
      //console.log('⏰ 1 minute timeout - clearing highlight');
      setHighlightedVariable(prev => {
        if (prev && prev.cssVariable === cssVariable) {
          return null;
        }
        return prev;
      });
      timeoutRef.current = null;
    }, 60000);
  }, []);

  const clearHighlight = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHighlightedVariable(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    highlightedVariable,
    highlightVariable,
    clearHighlight
  };
};