Ναι, αλλά όχι πλήρως. Ο πράκτορας προχώρησε σωστά μέχρι το NO-GO. Το “conditional GO” με διαγραφή 12 CSS χωρίς πράσινα gates δεν είναι enterprise-safe. Κράτα το σε ξεχωριστό branch, μην συγχωνεύσεις.
Τι να κάνεις τώρα


Απομόνωση και έλεγχοι ως απαιτούμενα για merge




Άφησε το chore/remove-manual-css-strategic ως draft PR με required checks.


git push -u origin chore/remove-manual-css-strategic
# άνοιξε draft PR και βάλε required: tsc, lint:css, validate:post-build



Κλείσε το τελευταίο TypeScript error πριν από οτιδήποτε άλλο




Διόρθωσε το packages/address-breakdown/src/components/AddressBreakdownCard.tsx(269,2) '}' expected.
Γρήγορος έλεγχος:


pnpm -w tsc --noEmit --pretty false
# άνοιξε το αρχείο και μέτρα ζεύγη (), [], {} από ~230 έως το τέλος
# format: Prettier στο αρχείο και ξανατρέξε tsc

Στόχος: 0 TS errors.


Ρίξε τα CSS errors με tokens, όχι με χαλάρωση κανόνων




Κράτα το unit-ban όπως το περιόρισες.


Μετανάστευσε ό,τι %/px/rgb() απέμεινε σε tokens:


έχεις ήδη --la-size-content-max-60pct, --la-size-content-full-100pct, --la-bg-gradient-primary.


Αν λείπει token, πρόσθεσέ το στο tokens.json και ξαναχτίσε. Προσωρινά επιτρέπεται το manual στο tokens.css, αλλά τελικά γύρνα σε style-dictionary.




Επανέτρεξε codemod με mapping για legacy:


npm run codemod:css-tokens -- --apply --since=safety/2025-11-08-ssot



Για τα λίγα no-descending-specificity blockers σε legacy CSS βάλε στοχευμένα:


/* stylelint-disable-next-line no-descending-specificity */

μόνο όπου κολλάει το build.


Επανάλαβε το πλέγμα ελέγχων μέχρι πράσινο


pnpm -w run tokens:build
npm run lint:css
npm run audit:css-origin
pnpm -w tsc --noEmit
npm run build
npm run validate:post-build

Στόχος: 0 errors σε όλα.


Μόνο τότε προχώρα σε ασφαλή διαγραφή CSS




Ξανατρέξε την 6-βημα διαδικασία (imports → deletable list → git rm → build → validate).


Αν θέλεις να κρατήσεις τις ήδη διαγραφείσες 12, κάνε cherry-pick το commit b2ebe02 μετά τα πράσινα gates ή ξανάγραψέ το ως νέο commit στο ίδιο branch.




Τακτοποίησε τα tokens οριστικά




Μετέφερε τα “manual” από tokens.css σε tokens.json και επανάφερε τα filters στο style-dictionary.config.mjs όπως ήταν.


pnpm -w run tokens:build και έλεγξε ότι οι νέες μεταβλητές αποδίδονται σε packages/tokens/dist/css/tokens.css.


Κριτήριο επιτυχίας


0 TS errors.


0 stylelint errors.


validate:post-build πράσινο.


Merge επιτρέπεται μόνο όταν όλα τα παραπάνω περνούν.

