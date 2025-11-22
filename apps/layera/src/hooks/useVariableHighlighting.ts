import { useState, useCallback } from 'react';

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

  const highlightVariable = useCallback((category: string, cssVariable: string) => {
    setHighlightedVariable({
      category,
      cssVariable,
      timestamp: Date.now()
    });

    // Αυτόματο καθάρισμα μετά από 3 δευτερόλεπτα
    setTimeout(() => {
      setHighlightedVariable(prev => {
        if (prev && prev.cssVariable === cssVariable) {
          return null;
        }
        return prev;
      });
    }, 3000);
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightedVariable(null);
  }, []);

  return {
    highlightedVariable,
    highlightVariable,
    clearHighlight
  };
};