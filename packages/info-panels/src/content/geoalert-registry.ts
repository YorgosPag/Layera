/**
 * GeoAlert Info Panel Content Registry
 *
 * Περιεχόμενα από το CategoryStepOld.tsx για χρήση στο LEGO system.
 * Αυτό το registry μπορεί να χρησιμοποιηθεί από όλες τις Layera εφαρμογές.
 */

import type { StaticContentConfig } from '../providers/StaticContentProvider';

export const GEOALERT_INFO_CONTENT: StaticContentConfig = {
  // Category Level Cards
  property: {
    title: '🎯 ΑΚΙΝΗΤΑ: Η Έξυπνη Γεωγραφική Αναζήτηση',
    content: `✨ <strong>Βρες το τέλειο σπίτι</strong> στην ιδανική γειτονιά<br/>
🔍 <strong>Ανάλυση απόστασης</strong> από σχολεία, μετρό, εργασία<br/>
📍 <strong>Προβλέψεις τιμών</strong> ανά περιοχή & μελλοντική αξία<br/>
🎨 <strong>Εξερεύνηση με χρώματα</strong> - από φθηνότερα (πράσινα) σε ακριβότερα (κόκκινα)<br/><br/>
💡 <em>Η τεχνολογία που βοηθά <strong>95% των χρηστών</strong> να βρουν καλύτερο σπίτι σε λιγότερο χρόνο!</em>`,
    category: 'property'
  },

  job: {
    title: '🚀 ΕΡΓΑΣΙΑ: Το Μυστικό Όπλο της Καριέρας',
    content: `⚡ <strong>Υπολογισμός χρόνου μετακίνησης</strong> από το σπίτι σου<br/>
🎯 <strong>Εργασίες στην ιδανική απόσταση</strong> - όχι άγχος, όχι κόστος<br/>
📊 <strong>Ανάλυση μισθών</strong> ανά περιοχή & κλάδο<br/>
🗺️ <strong>Οπτικοποίηση:</strong> πράσινες περιοχές = καλύτερες ευκαιρίες<br/>
💰 <strong>Βελτιστοποίηση</strong> κόστος μεταφοράς vs μισθός<br/><br/>
🎖️ <em><strong>89% των χρηστών</strong> βρήκαν καλύτερη δουλειά χρησιμοποιώντας την γεωχωρική αναζήτηση!</em>`,
    category: 'job'
  },

  // Property Intent Cards
  'property-offer': {
    title: '🏡 ΠΡΟΣΦΕΡΩ ΑΚΙΝΗΤΟ: Μεγιστοποίηση Αξίας',
    content: `💰 <strong>Βέλτιστη τιμολόγηση</strong> με ανάλυση αγοράς<br/>
📈 <strong>Στρατηγική πώλησης/ενοικίασης</strong> για γρήγορα αποτελέσματα<br/>
📱 <strong>Προβολή σε χιλιάδες ενδιαφερόμενους</strong> άμεσα<br/>
🎯 <strong>Εστιασμένο marketing</strong> στην ιδανική γειτονιά<br/>
📊 <strong>Πραγματικός χρόνος ενδιαφέροντος</strong> και προσφορών<br/><br/>
✨ <em><strong>Πωλητές μας πετυχαίνουν 23% υψηλότερες τιμές</strong> χάρη στην έξυπνη προβολή!</em>`,
    category: 'property'
  },

  'property-search': {
    title: '🔍 ΑΝΑΖΗΤΩ ΑΚΙΝΗΤΟ: Έξυπνη Εύρεση',
    content: `🎯 <strong>Προσωποποιημένη αναζήτηση</strong> βάσει των αναγκών σου<br/>
🗺️ <strong>Γεωγραφική εξερεύνηση</strong> με real-time προτάσεις<br/>
⚡ <strong>Ειδοποιήσεις νέων ακινήτων</strong> στις περιοχές σου<br/>
💸 <strong>Σύγκριση τιμών</strong> και ανάλυση αξίας<br/>
🔒 <strong>Ασφαλής επικοινωνία</strong> με ιδιοκτήτες<br/><br/>
🌟 <em><strong>Βρες το ιδανικό σπίτι 4x πιο γρήγορα</strong> με προηγμένη AI αναζήτηση!</em>`,
    category: 'property'
  },

  // Job Intent Cards
  'job-offer': {
    title: '💼 ΠΡΟΣΦΕΡΩ ΘΕΣΗ: Βρες την Ιδανική Στελέχωση',
    content: `🎯 <strong>Εστιασμένη προβολή</strong> σε εξειδικευμένους επαγγελματίες<br/>
📊 <strong>Ανάλυση μισθών αγοράς</strong> για competitive προσφορές<br/>
⚡ <strong>Γρήγορη στελέχωση</strong> με προ-φιλτραρισμένους υποψήφιους<br/>
🏢 <strong>Company branding</strong> και προβολή εταιρικής κουλτούρας<br/>
🎖️ <strong>Quality matching</strong> βάσει skills και γεωγραφίας<br/><br/>
🚀 <em><strong>Εταιρείες μας βρίσκουν 67% πιο γρήγορα</strong> το ιδανικό talent!</em>`,
    category: 'job'
  },

  'job-search': {
    title: '🔍 ΑΝΑΖΗΤΩ ΕΡΓΑΣΙΑ: Το Επόμενο Βήμα Καριέρας',
    content: `🎯 <strong>Προσωποποιημένες προτάσεις</strong> βάσει δεξιοτήτων<br/>
📍 <strong>Εργασίες κοντά στο σπίτι</strong> με υπολογισμό χρόνου μετακίνησης<br/>
💰 <strong>Διαφάνεια αμοιβών</strong> και σύγκριση προσφορών<br/>
📈 <strong>Career path προτάσεις</strong> για εξέλιξη<br/>
🔔 <strong>Instant alerts</strong> για ιδανικές ευκαιρίες<br/><br/>
🏆 <em><strong>92% των χρηστών μας</strong> βρίσκουν καλύτερη δουλειά σε <30 ημέρες!</em>`,
    category: 'job'
  }
};

// Helper function για easy access
export const createGeoAlertContentProvider = () => {
  const { StaticContentProvider } = require('../providers/StaticContentProvider');
  return new StaticContentProvider(GEOALERT_INFO_CONTENT);
};