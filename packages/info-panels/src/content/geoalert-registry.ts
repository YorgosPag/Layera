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

  // Property Sub-Level Cards
  sale: {
    title: '💰 ΠΩΛΗΣΗ: Μεγιστοποίηση Αξίας Ακινήτου',
    content: `📈 <strong>Ανάλυση τιμών αγοράς</strong> σε γειτονικές περιοχές<br/>
🏡 <strong>Σύγκριση χαρακτηριστικών</strong> παρόμοιων ακινήτων<br/>
⏰ <strong>Βέλτιστος χρόνος πώλησης</strong> βάσει στατιστικών<br/>
🎯 <strong>Στρατηγική τιμολόγηση</strong> για γρήγορη πώληση<br/>
📊 <strong>Πρόβλεψη απόδοσης</strong> επένδυσης ανά περιοχή<br/><br/>
✨ <em><strong>Πωλητές μας κερδίζουν κατά μέσο όρο 12% περισσότερα</strong> χάρη στην έξυπνη ανάλυση!</em>`,
    category: 'property'
  },

  rent: {
    title: '🏠 ΕΝΟΙΚΙΑΣΗ: Το Τέλειο Σπίτι στη Σωστή Τιμή',
    content: `💸 <strong>Ανάλυση ενοικίων</strong> ανά m² και περιοχή<br/>
🚇 <strong>Απόσταση από ΜΜΜ</strong> και κέντρα ενδιαφέροντος<br/>
🏪 <strong>Υπηρεσίες γειτονιάς</strong> - σούπερ μάρκετ, φαρμακεία<br/>
📱 <strong>Real-time διαθεσιμότητα</strong> και άμεση επικοινωνία<br/>
🔒 <strong>Ασφαλής αξιολόγηση</strong> ιδιοκτητών και ακινήτων<br/><br/>
🌟 <em><strong>Βρες το ιδανικό σπίτι 3x πιο γρήγορα</strong> με προηγμένη γεωφιλτράρση!</em>`,
    category: 'property'
  },

  // Job Sub-Level Cards
  fulltime: {
    title: '💼 ΠΛΗΡΗΣ: Σταθερότητα και Εξέλιξη',
    content: `🎯 <strong>Υψηλόμισθες θέσεις</strong> με εξελικτικές προοπτικές<br/>
📈 <strong>Ανάλυση αύξησης μισθού</strong> ανά εταιρεία και κλάδο<br/>
🏢 <strong>Εταιρικά benefits</strong> - ασφάλιση, γυμναστήριο, bonus<br/>
⚖️ <strong>Work-life balance</strong> βάσει αξιολογήσεων<br/>
🚗 <strong>Χρόνος μετακίνησης</strong> και κόστος από το σπίτι σου<br/><br/>
🏆 <em><strong>94% επιτυχία</strong> σε τοποθετήσεις πλήρους απασχόλησης!</em>`,
    category: 'job'
  },

  parttime: {
    title: '⏰ ΜΕΡΙΚΗ: Ευελιξία και Ισορροπία',
    content: `🕐 <strong>Ευέλικτα ωράρια</strong> που ταιριάζουν στη ζωή σου<br/>
💰 <strong>Ωριαίες αμοιβές</strong> ανά ειδικότητα και περιοχή<br/>
🎓 <strong>Συμπληρωματικό εισόδημα</strong> για φοιτητές<br/>
🏡 <strong>Remote & Hybrid θέσεις</strong> για περισσότερη ελευθερία<br/>
📊 <strong>Γρήγορες τοποθετήσεις</strong> - άμεση εκκίνηση<br/><br/>
🎯 <em><strong>Πάνω από 500 μερικές θέσεις</strong> διαθέσιμες κάθε εβδομάδα!</em>`,
    category: 'job'
  }
};

// Helper function για easy access
export const createGeoAlertContentProvider = () => {
  const { StaticContentProvider } = require('../providers/StaticContentProvider');
  return new StaticContentProvider(GEOALERT_INFO_CONTENT);
};