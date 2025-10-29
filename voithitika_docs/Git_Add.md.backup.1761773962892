  Εντολή 1 (Απλή):

  git add .; git commit -m "🔧 Auto-commit #$(git rev-list --count HEAD)"; git push

  Τι κάνει κάθε μέρος:
  - git add . → Προσθέτει όλες τις αλλαγές (νέα αρχεία, τροποποιημένα, διαγραμμένα) στο staging area
  - ; → Separator στο PowerShell (εκτελεί την επόμενη εντολή ανεξάρτητα από το αποτέλεσμα)
  - git commit -m "..." → Κάνει commit με αυτόματο μήνυμα
  - $(git rev-list --count HEAD) → Μετράει πόσα commits υπάρχουν στο branch (δίνει αριθμό)
  - git push → Στέλνει τις αλλαγές στο remote repository

  Αποτέλεσμα: Στέλνει όλες τις αλλαγές με μήνυμα "🔧 Auto-commit #123" (όπου 123 = αριθμός commit)  

  ---
  Εντολή 2 (Ασφαλής):

  git add . ; if ($?) { git commit -m "🔧 Auto-commit #$(git rev-list --count HEAD)" } ; if ($?) { git      
  push }

  Τι κάνει κάθε μέρος:
  - git add . → Ίδιο με πάνω
  - ; → Separator
  - if ($?) → Ελέγχει αν η προηγούμενη εντολή επέτυχε ($? = true/false)
  - { git commit ... } → Εκτελείται μόνο αν το git add επέτυχε
  - ; if ($?) { git push } → Το push εκτελείται μόνο αν το commit επέτυχε

  Αποτέλεσμα: Ίδιο με την πρώτη, αλλά σταματάει αν κάποιο βήμα αποτύχει


  Start-Process powershell -ArgumentList "-NoExit","-Command","cd 'C:\layera\apps\layera-id'; npm run dev -- --port 3000"
Start-Process powershell -ArgumentList "-NoExit","-Command","cd 'C:\layera\apps\layera-geoalert'; npm run dev -- --port 3001"


# Terminal 1
cd C:\layera\apps\layera-id
npm run dev -- --port 3000

# Terminal 2
cd C:\layera\apps\layera-geoalert
npm run dev -- --port 3001


  📋 ΕΝΤΟΛΕΣ VALIDATION & SCRIPTS - ΠΛΗΡΗΣ ΑΝΑΛΥΣΗ

  🔍 ΚΥΡΙΕΣ ΕΝΤΟΛΕΣ ΓΙΑ ΕΛΕΓΧΟ ΣΦΑΛΜΑΤΩΝ:

  1. Πλήρης Enterprise Validation:
  npm run verify
  (Τρέχει: typecheck + lint + policy:check + dup:check + enterprise:validate)

  2. Διπλότυπα & Code Quality:
  npm run dup:check           # Διπλότυπος κώδικας
  npm run enterprise:validate # Πλήρης validation με duplicates

  3. Critical Issues (Pre-commit):
  node scripts/domains/validation/critical-validation.js

  4. Specific Validations:
  npm run typecheck          # TypeScript errors
  npm run lint              # ESLint issues  
  npm run lint:css          # CSS/SCSS styling issues
  npm run imports:check     # Dependency cycles

  🛠️  AUTO-FIX ΕΝΤΟΛΕΣ:

  node scripts/domains/typescript/fix-any-types.js        # TypeScript any fixes
  node scripts/domains/design/fix-hardcoded-colors.js     # Hardcoded color fixes
  node scripts/domains/production/fix-console-logs.js     # Console.log cleanup
  node scripts/domains/code-quality/fix-todo-comments.js  # TODO resolution

  📊 SPECIALIZED CHECKS:

  node scripts/domains/i18n/check-translations.js         # Translation coverage
  node scripts/domains/validation/validate-geo-drawing.js # Geo system validation

  Η πιο χρήσιμη εντολή για σένα είναι: npm run verify για πλήρη έλεγχο όλων των σφαλμάτων.

● Έχεις απόλυτο δίκιο! Η λίστα εργασιών έχει γίνει άχρηστη και παλιά. Θα την καθαρίσω:

● Καθάρισα τη λίστα. Τώρα για την ανάλυση που ζήτησες:  

  📋 ΕΝΤΟΛΕΣ VALIDATION - ΠΛΗΡΗΣ ΟΔΗΓΟΣ

  🔴 ΚΥΡΙΕΣ ΕΝΤΟΛΕΣ ΓΙΑ ΟΛΕΣ ΤΙΣ ΚΑΤΗΓΟΡΙΕΣ ΣΦΑΛΜΑΤΩΝ:  

  Πλήρης Έλεγχος (Όλα μαζί):
  npm run verify

  Κρίσιμα Σφάλματα (Pre-commit blocking):
  node scripts/domains/validation/critical-validation.js

  Διπλότυπα:
  npm run dup:check
  npm run enterprise:validate

  🛠️  AUTO-FIX ΕΝΤΟΛΕΣ:

  node scripts/domains/typescript/fix-any-types.js      
  node scripts/domains/production/fix-console-logs.js   
  node scripts/domains/code-quality/fix-todo-comments.js

  📊 ΕΙΔΙΚΟΙ ΕΛΕΓΧΟΙ:

  npm run typecheck    # TypeScript
  npm run lint         # ESLint
  npm run lint:css     # CSS
  npm run imports:check # Dependencies

  Αυτές είναι οι εντολές που χρειάζεσαι.
  