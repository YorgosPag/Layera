Φτιάχνω μία εφαρμογή και θέλω να κάνω το εξής, να διαχειρίζομαι επαγγέλματα. Επιλέγει κάποιος ότι ψάχνει ένα συγκεκριμένο επάγγελμα. Είναι σε μία εφαρμογή που κάποιος προσφέρει εργασία και κάποιος αναζητά εργασία. Επομένως, ψάχνω λίγο πώς είναι η δομή των επαγγελμάτων, παγκοσμίως να το πω έτσι, όχι μόνο στην Ελλάδα, και ψάχνω να βρω πώς οι μεγάλες εταιρείες προγραμματισμού χειρίζονται αυτήν την δομή των επαγγελμάτων και πώς κατηγοριοποιούν τα επαγγέλματα και τις ειδικότητες. Οπότε, θα ήθελα να ψάξεις μία βαθιά βουτιά στο διαδίκτυο να κάνεις και να μου πεις εάν υπάρχουν API ή modules ή components μόνο δωρεάν όμως, ούτως ώστε να τα δανειστώ και να τα βάλω μέσα στην εφαρμογή μου, η οποία είναι enterprise εφαρμογή.

Χρησιμοποίησε ESCO ως ραχοκοκαλιά. Είναι δωρεάν, πολυγλωσσικό, χαρτογραφημένο 1-προς-1 στο ISCO-08 και έχει επίσημο REST API και Local API για on-prem. Τις εθνικές ταξινομήσεις τις ενώνεις με τα επίσημα crosswalks. 
esco.ec.europa.eu
+3
esco.ec.europa.eu
+3
European Commission
+3

Δωρεάν ταξινομήσεις και APIs

ESCO (EU): REST API + Local API Docker. Έτοιμη αναζήτηση/πλοήγηση, πολυγλωσσικές ετικέτες, σχέσεις με δεξιότητες, επίσημα crosswalks και bulk downloads (CSV/RDF/ODS). Τρέχουσα έκδοση v1.2, ενημέρωση 15/05/2024. Άδεια EUPL. 
esco.ec.europa.eu
+4
European Commission
+4
esco.ec.europa.eu
+4

ISCO-08 (ILO): Παγκόσμια ιεραρχία 4 επιπέδων. Χωρίς επίσημο API, αλλά θεμέλιο για τη δομή και τους κωδικούς. 
ILOSTAT
+1

O*NET (ΗΠΑ): Web Services με δωρεάν κλειδί. Πλούσια περιγραφικά πεδία για επαγγέλματα/δεξιότητες. Απαιτεί αποδοχή όρων/αναφορά πηγής. 
services.onetcenter.org
+1

Canada NOC 2021: API κατόπιν αίτησης λογαριασμού. Νέα δομή TEER και 5-ψήφιοι κωδικοί. Παρέχονται και LMI data files. 
noc.esdc.gc.ca
+2
noc.esdc.gc.ca
+2

UK SOC 2020: Επίσημα datasets/τεκμηρίωση· όχι γενικό REST API. Χρήσιμο για UK-specific αναφορές. 
ons.gov.uk
+1

AU/NZ (ANZSCO → OSCA): ABS Data API και νέο WoAG Occupation Coding Service με API για ταξινόμηση κειμένου σε κωδικούς. 
beta.abs.gov.au
+2
Australian Bureau of Statistics
+2

France ROME: Ανοικτά datasets και endpoints μέσω data portals. Καλό για γαλλική αγορά. 
data.gouv.fr
+1

Ανοικτά modules/εργαλεία (δωρεάν)

ESCO Skill/Occupation extractors: ανοιχτού κώδικα βιβλιοθήκες για εξαγωγή επαγγελμάτων/δεξιοτήτων από κείμενο. 
GitHub
+2
ScienceDirect
+2

ESCoE Skills Extractor (Python): εξαγωγή δεξιοτήτων και αντιστοίχιση σε taxonomy. 
ESCoE

Bulk ESCO datasets για δικό σου index: CSV/RDF για γρήγορο τοπικό autocomplete (π.χ. Meilisearch/Elasticsearch). 
esco.ec.europa.eu

UI autocomplete components: MIT-licensed έτοιμα (MUI Autocomplete, Algolia Autocomplete). 
mui.com
+1

Προτεινμένη αρχιτεκτονική (enterprise)

Canonical taxonomy: ESCO ως βασικό σχήμα. Αποθήκευση: occupation_id (ESCO URI/UUID), labels{lang}, alt_labels{lang}, isco_code, parents, status, version. 
esco.ec.europa.eu

Crosswalks: Ενσωμάτωση επίσημων πινάκων προς O*NET/NOC/ROME/SOC όπου χρειάζεται. 
esco.ec.europa.eu
+1

Autosuggest: ESCO /search με type=occupation και γλώσσα χρήστη. Για υψηλή απόδοση, τοπικός index από CSV. 
European Commission
+1

On-prem API: ESCO Local API για σταθερή διαθεσιμότητα και latency. 
esco.ec.europa.eu

Skill graph: Χρήση των occupation↔skill σχέσεων ESCO για φίλτρα/ταιριάσματα. 
esco.ec.europa.eu

Διακυβέρνηση εκδόσεων: Παρακολούθηση ESCO v1.2 και μεταγενέστερων, με δικά σου migration scripts. 
esco.ec.europa.eu

Σύντομοι δρόμοι ένταξης

Γρήγορο POC: ESCO Web API για autocomplete + προβολή περιγραφών. 
European Commission

Πλήρης παραγωγή: Κατέβασε ESCO CSV, στήσε Local API ή δικό σου search index, φόρτωσε crosswalks για χώρες-στόχους, πρόσθεσε O*NET/NOC όπου απαιτείται. 
esco.ec.europa.eu
+2
esco.ec.europa.eu
+2

Αν θέλεις, δίνω αμέσως minimal endpoints και παράδειγμα schema για Firestore/Postgres με ESCO+ISCO.