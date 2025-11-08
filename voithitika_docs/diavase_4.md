# Εκτέλεση SSOT έλεγχου για να εντοπιστούν όλα τα violations
npm run ssot:check

# Εντολή για αντικατάσταση όλων των inline styles με tokens από το tokens.json
npm run lint:css # Χρησιμοποιήστε το stylelint για να ελέγξετε τα inline styles

# Εντολή για αντικατάσταση σκληρών τιμών με tokens από το tokens.json
npm run fix:css # Αυτό θα αντικαταστήσει όλα τα hardcoded CSS values με το tokens.json

# Εντολή για αυστηρή τυποποίηση τύπων (αφαίρεση any types)
npm run typecheck # Εκτελέστε τον τύπο έλεγχου για να βεβαιωθείτε ότι οι τύποι είναι σωστοί

# Ανάγνωση και χρήση των LEGO systems με τον έλεγχο για μη παραβίαση του SSOT
npm run lint:css:vendor # Έλεγχος και αποδοχή του CSS των vendor συστημάτων με το LEGO system
