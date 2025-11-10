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

