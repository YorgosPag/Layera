Αιτία: Το “device simulation” τυλίγει την εφαρμογή σε κοντέινερ που είναι είτε iframe είτε στοιχείο με transform/overflow hidden/filter/contain. Αυτό δημιουργεί νέο containing block. Κάθε απόγονος, ακόμη και με position: fixed και τεράστιο z-index, κόβεται από τα όρια αυτού του κοντέινερ. Γι’ αυτό το floating panel δεν βγαίνει ποτέ έξω.

Τι κάνεις:

Αν είναι iframe: δεν γίνεται να βγεις έξω. Απόδωσε το panel στον γονικό της προσομοίωσης (shell) ή τρέξε τη σελίδα εκτός simulator.

Αν είναι div με transform/overflow: απόδωσε το panel εκτός DOM του simulator με React Portal στο document.body ή σε ρίζα που είναι αδελφή του simulator. Μόνο έτσι αποφεύγεις το clipping.

Εναλλακτικά, αφαίρεσε τον μετασχηματισμό/overflow:hidden από τον πρόγονο που φτιάχνει το frame. Αν μείνει, θα συνεχίσει να κόβει.

Έλεγχος: με DevTools, βρες τον πρώτο πρόγονο που έχει transform/overflow:hidden/filter/contain ή δες αν το περιεχόμενο είναι σε iframe. Αν ναι, ισχύουν τα παραπάνω.