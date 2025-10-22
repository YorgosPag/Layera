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
  },

  // Transaction Type Cards (Property)
  sale: {
    title: '💰 ΠΩΛΗΣΗ ΑΚΙΝΗΤΟΥ: Μεγιστοποίηση Αξίας',
    content: `🏠 <strong>Βέλτιστη τιμολόγηση</strong> με ανάλυση αγοράς και τάσεων<br/>
📊 <strong>Market intelligence</strong> - σύγκριση με παρόμοια ακίνητα<br/>
📸 <strong>Professional φωτογράφιση</strong> και virtual tours<br/>
🎯 <strong>Εστιασμένο marketing</strong> σε qualified αγοραστές<br/>
⚡ <strong>Γρήγορη πώληση</strong> με προηγμένα εργαλεία προβολής<br/><br/>
✨ <em><strong>Πωλητές μας πετυχαίνουν 18% υψηλότερες τιμές</strong> και πουλάνε 3x πιο γρήγορα!</em>`,
    category: 'property'
  },

  rent: {
    title: '🏡 ΕΝΟΙΚΙΑΣΗ ΑΚΙΝΗΤΟΥ: Σταθερό Εισόδημα',
    content: `💵 <strong>Competitive τιμολόγηση</strong> για μέγιστη πληρότητα<br/>
👥 <strong>Προ-φιλτραρισμένοι ενοικιαστές</strong> με επαληθευμένα στοιχεία<br/>
📋 <strong>Έξυπνα συμβόλαια</strong> και νομική υποστήριξη<br/>
🔒 <strong>Ασφαλής διαχείριση</strong> πληρωμών και επικοινωνίας<br/>
📈 <strong>Απόδοση επένδυσης</strong> με ανάλυση αγοράς<br/><br/>
🎖️ <em><strong>Ιδιοκτήτες μας έχουν 89% πληρότητα</strong> και βρίσκουν ενοικιαστές σε <7 ημέρες!</em>`,
    category: 'property'
  },

  // Availability Cards (After Transaction)
  now: {
    title: '⚡ ΔΙΑΘΕΣΙΜΟ ΑΜΕΣΑ: Άμεση Επιχειρηματική Δράση',
    content: `🚀 <strong>Άμεση προβολή</strong> στη μεγαλύτερη πλατφόρμα ακινήτων<br/>
📱 <strong>Instant ειδοποιήσεις</strong> σε χιλιάδες ενδιαφερόμενους<br/>
💼 <strong>Προτεραιότητα στα αποτελέσματα</strong> αναζήτησης<br/>
⚡ <strong>24/7 υποστήριξη</strong> για γρήγορη διεκπεραίωση<br/>
🎯 <strong>Express διαδικασίες</strong> για άμεσα αποτελέσματα<br/><br/>
✨ <em><strong>Ακίνητα "διαθέσιμα άμεσα" έχουν 340% περισσότερη δραστηριότητα</strong> την πρώτη εβδομάδα!</em>`,
    category: 'property'
  },

  future: {
    title: '📅 ΔΙΑΘΕΣΙΜΟ ΣΤΟ ΜΕΛΛΟΝ: Στρατηγικός Σχεδιασμός',
    content: `📆 <strong>Προγραμματισμένη προβολή</strong> τη βέλτιστη στιγμή<br/>
📧 <strong>Προ-καταχώρηση ενδιαφέροντος</strong> από σοβαρούς αγοραστές<br/>
📊 <strong>Ανάλυση αγοράς</strong> μέχρι την ημερομηνία διαθεσιμότητας<br/>
🎯 <strong>Στρατηγική τιμολόγηση</strong> βάσει προβλέψεων<br/>
🔔 <strong>Αυτόματες ειδοποιήσεις</strong> πριν την επίσημη διάθεση<br/><br/>
🏆 <em><strong>Σχεδιασμένες πωλήσεις πετυχαίνουν 28% καλύτερες τιμές</strong> λόγω καλύτερης προετοιμασίας!</em>`,
    category: 'property'
  },

  // Upload Card (After Availability = Now)
  upload: {
    title: '📁 ΑΝΑΒΑΣΜΑ ΑΡΧΕΙΩΝ: Έξυπνη Οπτικοποίηση Ακινήτου',
    content: `🖼️ <strong>Εικόνες:</strong> JPG, PNG, GIF, WEBP - Άμεση προβολή<br/>
📄 <strong>Έγγραφα:</strong> PDF - Αυτόματη ανάλυση περιεχομένου<br/>
🏗️ <strong>Τεχνικά Σχέδια:</strong> DXF, DWG - CAD integration<br/>
🗺️ <strong>Έξυπνη επικάλυψη</strong> στον διαδραστικό χάρτη<br/>
📐 <strong>Αυτόματος υπολογισμός</strong> μετρήσεων και επιφανειών<br/>
🎯 <strong>Ακριβής τοποθέτηση</strong> με drag & drop<br/><br/>
✨ <em><strong>Ακίνητα με κατόψεις πετυχαίνουν 87% περισσότερες προβολές</strong> και πωλούνται 3x πιο γρήγορα!</em>`,
    category: 'property'
  },

  // Layout Card (After Upload)
  layout: {
    title: '🗺️ ΤΟΠΟΘΕΤΗΣΗ & ΚΛΙΜΑΚΑ: Ακριβής Γεωεντοπισμός',
    content: `📍 <strong>GPS Τοποθέτηση:</strong> Αυτόματος εντοπισμός της θέσης σου<br/>
🔍 <strong>Αναζήτηση Διεύθυνσης:</strong> Εύρεση συγκεκριμένης τοποθεσίας<br/>
🔄 <strong>Περιστροφή Κάτοψης:</strong> Προσαρμογή στον προσανατολισμό του κτιρίου<br/>
📏 <strong>Κλίμακα Μετρήσεων:</strong> Ακριβής μετατροπή cm→m, mm→m<br/>
🎯 <strong>Επικάλυψη Χάρτη:</strong> Real-time προβολή στη σωστή τοποθεσία<br/>
📐 <strong>Διαστάσεις Χώρου:</strong> Αυτόματος υπολογισμός επιφανειών<br/><br/>
🏆 <em><strong>Ακριβής γεωεντοπισμός αυξάνει το ενδιαφέρον 76%</strong> και επιταχύνει τις αποφάσεις αγοράς!</em>`,
    category: 'property'
  }
};

// Helper function για easy access
export const createGeoAlertContentProvider = () => {
  const { StaticContentProvider } = require('../providers/StaticContentProvider');
  return new StaticContentProvider(GEOALERT_INFO_CONTENT);
};