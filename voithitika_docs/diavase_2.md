Ιδού η σωστή εντολή για         
  PowerShell:

  git add .; git commit -m "🔧 Auto-commit #$(git rev-list --count HEAD)"; git push

  Ή εναλλακτικά (πιο αξιόπιστη):

  git add . ; if ($?) { git commit -m "🔧 Auto-commit #$(git rev-list --count HEAD)" } ; if ($?) { git
  push }

  Διαφορές:
  - ; αντί για && (PowerShell syntax)
  - $() δουλεύει κανονικά στο PowerShell
  - Η δεύτερη εκδοχή ελέγχει για errors σε κάθε βήμα

  Δοκίμασε την πρώτη (απλούστερη):
  git add .; git commit -m "🔧 Auto-commit #$(git rev-list --count HEAD)"; git push