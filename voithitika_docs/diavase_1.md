Στόχος: ομοιομορφία ονόματος layera, σωστό storageBucket, καθαρό app πακέτο.

Κείμενο προς πράκτορα (επικόλλησε αυτούσιο):

Εφάρμοσε τα εξής για το repo:

1) Εξαναγκασμός πεζών στο ριζικό φάκελο (Windows case-insensitive):
- Κλείσε VS Code terminals και dev servers.
- Από τον γονικό φάκελο τρέξε:
  Rename-Item -LiteralPath 'LAYERA' 'layera_tmp'
  Rename-Item -LiteralPath 'layera_tmp' 'layera'

2) Διόρθωσε όνομα πακέτου:
- Άνοιξε layera/apps/layera-id/package.json
- Θέσε:  "name": "layera-id",  "private": true

3) Διόρθωσε Firebase Storage bucket:
- Άνοιξε layera/apps/layera-id/src/firebase.js
- Ρύθμισε: storageBucket: "layera-dev.appspot.com"

4) Καθαρισμός σκουπιδιών:
- Διέγραψε: layera/apps/layera-id/layera-id.zip
- Διέγραψε readme_*.md μέσα στο layera/apps/layera-id
- Κράτα μόνο το README.md. Μετέφερε σημειώσεις σε layera/docs/ αν χρειάζεται.

5) Ρίζα .gitignore (αν δεν υπάρχει, δημιούργησέ το):
**/node_modules/
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
.env*
*.zip

6) Έλεγχος:
- cd layera/apps/layera-id
- npm install
- npm run dev

7) Commit:
- cd ../../
- git add -A
- git commit -m "Normalize to layera; fix storageBucket; cleanup; set package name"


Σκοπός κάθε βήματος: 1) σταθερό lowercase όνομα φακέλου, 2) σωστό package id, 3) έγκυρο Firebase bucket, 4) καθαρό δέντρο, 5) αποφυγή κατά λάθος commit, 6) λειτουργικός έλεγχος, 7) ιχνηλάτηση αλλαγών.