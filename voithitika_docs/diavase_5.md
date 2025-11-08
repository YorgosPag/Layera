ΠΟΛΙΤΙΚΗ «SEARCH-FIRST-OR-STOP» — ΜΗΔΕΝ ΔΙΠΛΟΤΥΠΑ

1) ΑΠΑΓΟΡΕΥΣΗ
Απαγορεύεται να δημιουργήσεις νέο αρχείο, νέο component, νέο export ή νέο τύπο πριν αποδείξεις ότι δεν υπάρχει ήδη ισοδύναμος κώδικας στο monorepo.

2) ΥΠΟΧΡΕΩΤΙΚΟΣ ΕΛΕΓΧΟΣ ΠΡΙΝ-ΓΡΑΦΗΣ (PREWRITE CHECKLIST)
Πριν γράψεις οτιδήποτε, εκτελείς ΚΑΙ καταγράφεις:
- Κώδικας: `rg -n --hidden -S "<ΟΝΟΜΑ_ΣΥΜΒΟΛΟΥ>|<ΟΝΟΜΑ_ΑΡΧΕΙΟΥ_ΧΩΡΙΣ_ΕΠΕΚΤΑΣΗ>" -g '!node_modules' -g '!dist'`
- Exports: `rg -n "export .*<ΣΥΜΒΟΛΟ>" packages apps`
- Case-sensitive paths σε imports για το target πακέτο.
- Έλεγχος υπάρχοντος συστήματος LEGO (packages/*) που καλύπτει τη λειτουργία.

3) ΤΕΚΜΗΡΙΩΣΗ ΠΡΙΝ-ΓΡΑΦΗΣ (ΥΠΟΧΡΕΩΤΙΚΟ ΜΠΛΟΚ)
Πριν προτείνεις κώδικα, δημοσιεύεις το εξής μπλοκ. Αν δεν υπάρχει, σταματάς.
---
PREWRITE_EVIDENCE
TARGET: <τι πας να φτιάξεις>
SEARCH_CMDS:
- <οι ακριβείς εντολές rg που έτρεξες>
RESULTS_COUNT: <αριθμός>
RESULTS_PATHS:
- <μονοπάτια που βρέθηκαν ή "none">
DECISION:
- REUSE_EXISTING | EXTEND_EXISTING | CREATE_NEW (αιτιολόγηση 1 πρότασης)
---

4) ΚΑΝΟΝΕΣ «ΜΟΝΟ ΜΕ ΤΟ ΥΠΑΡΧΟΝ ΣΥΣΤΗΜΑ»
- Loading: Χρησιμοποιείς ΜΟΝΟ `@layera/loading` (`Spinner`, `LoadingSpinner`). Απαγορεύεται νέο spinner.
- Layout κεντράρισμα: Χρησιμοποιείς `FlexCenter` από τα shortcuts του `@layera/layout`. Απαγορεύεται νέο FlexCenter.
- Constants: Legacy aliases μόνο από `packages/constants/src/legacy-aliases.ts`. Απαγορεύεται δεύτερο αρχείο ή διπλά exports.
- Icons: Μόνο μέσω `@layera/icons` aliases. Απαγορεύεται απευθείας εισαγωγή από τρίτες βιβλιοθήκες χωρίς απόδειξη ανυπαρξίας alias.
- Vendor shims: Επιτρέπονται μόνο σε επίπεδο app και μόνο αν δεν υπάρχει κεντρικός τύπος. Πρώτα πρόταση ενοποίησης.
- Imports/Paths: Όλα lowercase και ακριβές casing με τα ονόματα αρχείων. Απαγορεύονται ζεύγη τύπου `Spinner/ spinner`.

5) ΚΡΙΤΗΡΙΑ ΔΙΑΚΟΠΗΣ
Αν το PREWRITE_EVIDENCE δείξει ότι υπάρχει έστω μία υλοποίηση:
- ΣΤΑΜΑΤΑΣ. Δεν γράφεις νέο κώδικα.
- Προτείνεις reuse/extend με συγκεκριμένα αρχεία και exports.

6) ΠΡΟΤΥΠΟ ΑΡΝΗΣΗΣ (όταν υπάρχει υπάρχον)
"STOP: Βρέθηκε υπάρχον <X> σε <μονοπάτια>. Προτείνω REUSE/EXTEND. Δεν δημιουργώ νέο κώδικα."

7) ΠΑΡΑΒΙΑΣΗ
Οποιοδήποτε νέο αρχείο ή export χωρίς PREWRITE_EVIDENCE θεωρείται σοβαρή παραβίαση. Διακόπτεις το task και αναφέρεις την παράβαση.

8) ΜΟΝΑΔΙΚΗ ΕΞΑΙΡΕΣΗ
Μόνο με ρητή εντολή "ΔΗΜΙΟΥΡΓΗΣΕ ΝΕΟ ΠΑΡΟΤΙ ΥΠΑΡΧΕΙ", και αφού τεκμηριώσεις συγκρούσεις σχεδίασης ή ασυμβατότητες. Διαφορετικά, STOP.

9) ΤΕΛΙΚΟΣ ΕΛΕΓΧΟΣ ΠΡΙΝ-PR
Τρέχεις:
- `pnpm -w -r exec tsc --noEmit`
- `rg -n "/components/(Spinner|spinner|Skeleton|skeleton)/index.ts" packages/loading/src` για case duplicates
- Έλεγχο ότι κάθε νέο import σέβεται το casing του πραγματικού αρχείου.
Αν αποτύχει κάτι, δεν ανοίγεις PR.
