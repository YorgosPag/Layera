/**
 * iPhone 14 Pro Max Package Index
 * Main entry point για όλα τα iPhone 14 Pro Max modules
 */

// Re-export όλα τα components
export * from './components';

// Utility function για iPhone 14 Pro Max detection
export const detectiPhone14ProMax = (): boolean => {
  // Ελέγχει αν είναι iPhone 14 Pro Max βάσει screen dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = window.devicePixelRatio;

  // iPhone 14 Pro Max: 430x932 logical pixels (1290x2796 physical)
  return (
    (width === 430 && height === 932) ||
    (width === 932 && height === 430) ||
    // Alternative check με user agent
    /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent)
  );
};