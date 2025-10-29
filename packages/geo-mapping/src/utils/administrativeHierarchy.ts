/**
 * Administrative Hierarchy Utils - Διοικητική Ιεραρχία
 *
 * Καθολικό σύστημα επεξεργασίας διοικητικών διαιρέσεων με:
 * - Ιεραρχική ταξινόμηση από μικρό προς μεγάλο
 * - Καθαρισμό διπλότυπων
 * - Υποστήριξη πολλαπλών χωρών (Ελλάδα, μελλοντικά Βουλγαρία κ.α.)
 */

/**
 * Τύποι διοικητικών επιπέδων για Ελλάδα
 */
export enum GreekAdministrativeLevel {
  STREET = 1,           // Οδός/Λεωφόρος + Αριθμός + Τ.Κ.
  COMMUNITY = 2,        // Κοινότητα
  NEIGHBORHOOD = 3,     // Συνοικία/Γειτονιά
  VILLAGE = 4,          // Χωριό/Κωμόπολη
  MUNICIPAL_UNIT = 5,   // Δημοτική Ενότητα
  MUNICIPALITY = 6,     // Δήμος
  METROPOLITAN = 7,     // Μητροπολιτική Ενότητα
  PREFECTURE = 8,       // Νομός
  REGION = 9,           // Περιφέρεια
  DECENTRALIZED = 10,   // Αποκεντρωμένη Διοίκηση
  COUNTRY = 11          // Χώρα
}

/**
 * Patterns για αναγνώριση ελληνικών διοικητικών τύπων
 */
const GREEK_PATTERNS = {
  [GreekAdministrativeLevel.STREET]: [
    /^.*?\s*\d+/, // Οδός με αριθμό
    /οδός|λεωφόρος|πλατεία|αγίου|αγίας/i
  ],
  [GreekAdministrativeLevel.COMMUNITY]: [
    /κοινότητα|community/i
  ],
  [GreekAdministrativeLevel.NEIGHBORHOOD]: [
    /συνοικία|γειτονιά|περιοχή/i
  ],
  [GreekAdministrativeLevel.VILLAGE]: [
    /χωριό|κωμόπολη|οικισμός/i
  ],
  [GreekAdministrativeLevel.MUNICIPAL_UNIT]: [
    /δημοτική\s+ενότητα|municipal\s+unit/i
  ],
  [GreekAdministrativeLevel.MUNICIPALITY]: [
    /^δήμος\s+|municipality\s+of/i
  ],
  [GreekAdministrativeLevel.METROPOLITAN]: [
    /μητροπολιτική\s+ενότητα|metropolitan/i
  ],
  [GreekAdministrativeLevel.PREFECTURE]: [
    /νομός|νομαρχία|prefecture/i
  ],
  [GreekAdministrativeLevel.REGION]: [
    /περιφέρεια|region/i
  ],
  [GreekAdministrativeLevel.DECENTRALIZED]: [
    /αποκεντρωμένη\s+διοίκηση|decentralized/i
  ],
  [GreekAdministrativeLevel.COUNTRY]: [
    /ελλάδα|greece/i
  ]
};

/**
 * Αναγνώριση επιπέδου διοικητικής διαίρεσης
 */
export function getAdministrativeLevel(text: string): GreekAdministrativeLevel {
  const cleanText = text.trim();

  // Έλεγχος για κάθε επίπεδο με τα patterns
  for (const [level, patterns] of Object.entries(GREEK_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(cleanText)) {
        return parseInt(level) as GreekAdministrativeLevel;
      }
    }
  }

  // Default: αν δεν αναγνωρίζεται, θεωρούμε ότι είναι πόλη/περιοχή
  return GreekAdministrativeLevel.NEIGHBORHOOD;
}

/**
 * Καθαρισμός διπλότυπων και παρόμοιων ονομάτων
 */
export function removeDuplicates(items: string[]): string[] {
  const cleaned: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const normalized = normalizeText(item);

    // Έλεγχος για exact match
    if (seen.has(normalized)) {
      continue;
    }

    // Έλεγχος για παρόμοια ονόματα (substring)
    const isDuplicate = Array.from(seen).some(existing => {
      return areTextsSimilar(normalized, existing);
    });

    if (!isDuplicate) {
      seen.add(normalized);
      cleaned.push(item);
    }
  }

  return cleaned;
}

/**
 * Κανονικοποίηση κειμένου για σύγκριση
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/^(δήμος|δημοτική\s+ενότητα|περιφέρεια|νομός)\s+/i, '')
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Έλεγχος αν δύο κείμενα είναι παρόμοια (για διπλότυπα)
 * ΕΙΔΙΚΟΣ ΕΛΕΓΧΟΣ: "Ελευθέριο" vs "Ελευθέριο-Κορδελιό"
 */
function areTextsSimilar(text1: string, text2: string): boolean {
  // Exact match
  if (text1 === text2) return true;

  // ΕΙΔΙΚΟΣ ΚΑΝΟΝΑΣ: Αν ένα κείμενο είναι substring του άλλου ΚΑΙ είναι μικρότερο από 50% του άλλου, ΔΕΝ είναι διπλότυπο
  if (text1.includes(text2)) {
    const ratio = text2.length / text1.length;
    if (ratio < 0.6) return true; // Το μικρότερο είναι διπλότυπο
  }
  if (text2.includes(text1)) {
    const ratio = text1.length / text2.length;
    if (ratio < 0.6) return true; // Το μικρότερο είναι διπλότυπο
  }

  // Παρόμοια ονόματα με μικρές διαφορές
  const similarity = calculateSimilarity(text1, text2);
  return similarity > 0.85; // 85% similarity threshold
}

/**
 * Υπολογισμός ομοιότητας κειμένων (Levenshtein distance)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1;

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Levenshtein distance algorithm
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * ΚΥΡΙΑ FUNCTION: Επεξεργασία display_name σε ιεραρχική δομή
 * Παίρνει το raw display_name από OSM και το κάνει καθαρό και ταξινομημένο
 * Επιστρέφει κάθε διοικητική διαίρεση σε ξεχωριστή γραμμή
 */
export function processDisplayNameToHierarchy(displayName: string): string {
  // Split by comma και καθαρισμός
  const parts = displayName
    .split(',')
    .map(part => part.trim())
    .filter(part => part.length > 0);
  // ΕΙΔΙΚΗ ΛΟΓΙΚΗ: Δημιουργία οδού με αριθμό και Τ.Κ.
  let streetWithNumberAndPostal = '';
  const nonStreetParts: string[] = [];
  let postalCode = '';

  // Βρες postal code
  const postalIndex = parts.findIndex(part => /^\d{3,5}(-\d{4})?$/.test(part));
  if (postalIndex !== -1) {
    postalCode = parts[postalIndex];
  }

  // Βρες οδό με αριθμό (πρώτο part που έχει αριθμό)
  const streetIndex = parts.findIndex(part => /^.*?\s*\d+/.test(part));
  if (streetIndex !== -1) {
    streetWithNumberAndPostal = postalCode
      ? `${parts[streetIndex]}, ${postalCode}`
      : parts[streetIndex];
  }

  // Μάζεψε όλα τα άλλα parts (εκτός από οδό και postal code)
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Skip postal codes
    if (/^\d{3,5}(-\d{4})?$/.test(part)) continue;
    // Skip pure numbers
    if (/^\d+$/.test(part)) continue;
    // Skip την οδό που ήδη χρησιμοποιήσαμε
    if (i === streetIndex) continue;

    nonStreetParts.push(part);
  }
  // Αφαίρεση διπλότυπων από τα non-street parts
  const uniqueNonStreetParts = removeDuplicates(nonStreetParts);
  // Ταξινόμηση κατά ιεραρχικό επίπεδο (μικρό προς μεγάλο)
  const hierarchicalParts = uniqueNonStreetParts
    .map(part => ({
      text: part,
      level: getAdministrativeLevel(part)
    }))
    .sort((a, b) => a.level - b.level)
    .map(item => item.text);
  // ΣΥΝΟΛΙΚΗ ΙΕΡΑΡΧΙΑ: Οδός πρώτα, μετά τα υπόλοιπα
  const finalParts = [];
  if (streetWithNumberAndPostal) {
    finalParts.push(streetWithNumberAndPostal);
  }
  finalParts.push(...hierarchicalParts);

  // ΚΑΘΕ ΔΙΟΙΚΗΤΙΚΗ ΔΙΑΙΡΕΣΗ ΣΕ ΞΕΧΩΡΙΣΤΗ ΓΡΑΜΜΗ
  const formattedHierarchy = finalParts.join('\n');
  return formattedHierarchy;
}

/**
 * Μελλοντική υποστήριξη για άλλες χώρες
 */
export function getCountryFromDisplayName(displayName: string): 'greece' | 'bulgaria' | 'unknown' {
  const lowerName = displayName.toLowerCase();

  if (lowerName.includes('ελλάδα') || lowerName.includes('greece')) {
    return 'greece';
  }

  if (lowerName.includes('bulgaria') || lowerName.includes('βουλγαρία')) {
    return 'bulgaria';
  }

  return 'unknown';
}

/**
 * Country-specific processing (για μελλοντική επέκταση)
 */
export function processDisplayNameByCountry(displayName: string): string {
  const country = getCountryFromDisplayName(displayName);

  switch (country) {
    case 'greece':
      return processDisplayNameToHierarchy(displayName);

    case 'bulgaria':
      // FIXME: Υλοποίηση για Βουλγαρία - Implementation required
      return displayName; // Fallback προς το παρόν

    default:
      // Universal fallback
      return processDisplayNameToHierarchy(displayName);
  }
}