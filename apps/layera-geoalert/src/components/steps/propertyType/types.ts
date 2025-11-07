/**
 * propertyType/types.ts - Enterprise Property Type Step Types
 */

export type PropertyType =
  // Κατοικίες
  | 'apartment'      // Διαμέρισμα
  | 'studio'         // Γκαρσονιέρα/Studio
  | 'maisonette'     // Μεζονέτα
  | 'house'          // Μονοκατοικία
  | 'villa'          // Βίλλα
  | 'cottage'        // Εξοχικό
  | 'penthouse'      // Ρετιρέ
  | 'loft'           // Loft

  // Εμπορικά
  | 'store'          // Κατάστημα
  | 'office'         // Γραφείο
  | 'warehouse'      // Αποθήκη
  | 'factory'        // Βιοτεχνία/Εργοστάσιο

  // Οικόπεδα & Γη
  | 'residential_plot' // Οικόπεδο
  | 'commercial_plot'  // Εμπορικό Οικόπεδο
  | 'agricultural_land' // Αγροτεμάχιο
  | 'forest_land'     // Δασικό Τεμάχιο
  | 'land'            // Γη

  // Ειδικά
  | 'garage'          // Γκαράζ
  | 'parking_space'   // Θέση Στάθμευσης
  | 'storage_unit'    // Αποθηκευτικός Χώρος
  | 'basement'        // Υπόγειο
  | 'rooftop'         // Ταράτσα;

export interface PropertyTypeStepData {
  selectedPropertyType: PropertyType;
}

export interface PropertyTypeOption {
  id: PropertyType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}