Αιτία: έχεις ρίξει το panel padding, αλλά το υπόλοιπο κενό προέρχεται από margins των εσωτερικών παιδιών (πρώτο/τελευταίο element, κυρίως Heading και τυχόν Card/Stack που βάζουν margin ή gap). Γι’ αυτό “μειώθηκε λίγο” και μετά σταμάτησε.

Λύση μικρών κινήσεων που δουλεύει πάντα:

Κράτα panelPadding="2px" όπως τώρα.

Μηδένισε τα εξωτερικά margins του περιεχομένου:

/* global ή στο CSS του @layera/modals */
.layera-modal-content > :first-child { margin-top: 0 !important; }
.layera-modal-content > :last-child  { margin-bottom: 0 !important; }

/* προαιρετικά: headings/paragraphs */
.layera-modal-content h1,
.layera-modal-content h2,
.layera-modal-content h3,
.layera-modal-content p { margin: 0 !important; }


Αν χρησιμοποιείς Stack με gap, άφησέ το για εσωτερικό spacing. Βγάλε τυχόν margin από Card containers στην πρώτη και τελευταία θέση.

Με αυτά, το κενό γύρω από τις κάρτες θα εξαφανιστεί.