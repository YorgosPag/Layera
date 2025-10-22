Ναι, γίνεται να πάνε «έξω από το simulation». Μην τα ρεντάρεις μέσα στο MapContainer· βάλε τα σε fixed pane έξω από το .device-frame-wrapper στο App.tsx.

Τι φταίει τώρα:

Το prop δεν καταλήγει στο MapContainer.
Στο split σταμάτησε να περνά παντού το isIPhone14ProMaxDevice, άρα το MapContainer νομίζει ότι δεν είναι iPhone και δείχνει τα 3 πλήκτρα.

Η συνθήκη απόκρυψης στο MapContainer είναι λάθος προτεραιότητας.
Ελέγχει μόνο !isIPhone14ProMaxDevice ή αγνοεί hideDrawingControls, οπότε τα controls εμφανίζονται στο mobile.

Το πράσινο FAB μεταφέρθηκε και «χάθηκε».
Στο OLD_GeoMap το FAB ρενταριζόταν στον κύριο γεω-χάρτη με υψηλό z-index και εμφανιζόταν όταν isIPhone14ProMaxDevice && !showCategoryElements. Αυτό δούλευε γιατί το κρύψιμο των 3 πλήκτρων γινόταν στο ίδιο component με το FAB. Μετά το split, το FAB και τα controls βρίσκονται σε διαφορετικά components, οπότε το FAB κρύβεται ή μπαίνει πίσω από άλλα layers. 

OLD_GeoMap

Η μαύρη λωρίδα στο κάτω μέρος είναι layout υπόλοιπο του “mobile toolbar”/footer.
Το MapContainer κρατά χώρο (bottom panel) για τα mobile controls. Όταν αυτά δεν πρέπει να φανούν, ο χώρος μένει μαύρος.

Ελάχιστες διορθώσεις:

A) Πέρνα πάντα τα props προς MapContainer
Σε ΟΛΑ τα render paths:

<MapContainer
  onAreaCreated={onAreaCreated}
  onNewEntryClick={onNewEntryClick}
  isIPhone14ProMaxDevice={isIPhone14ProMaxDevice}
  hideDrawingControls={isIPhone14ProMaxDevice}
/>


B) Διόρθωσε τη συνθήκη απόκρυψης στο MapContainer
Αντικατάστησε το block των mobile controls με:

{!(hideDrawingControls || isIPhone14ProMaxDevice) && (
  <div className="mobile-drawing-toolbar">…</div>
)}


C) Επανέφερε το FAB όπως στο OLD_GeoMap
Ρεντάρισέ το στο ίδιο component που αποφασίζει για το iPhone mode και δώσε z-index > 1200. Η απλή μορφή:

{(onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements && (
  <div style={{position:'absolute', right:15, bottom:15, zIndex:2000}}>…</div>
)}


D) Εξάλειψε τη μαύρη λωρίδα
Μην αφήνεις reserved ύψος για toolbar όταν είναι κρυφό. Ο χάρτης να γεμίζει όλο τον χώρο:

<div id="geo-map" style={{ position:'absolute', inset:0 }} />


Πηγή για το «σωστό» παλιό behavior (κρύψιμο controls με !isIPhone14ProMaxDevice και FAB): OLD_GeoMap.tsx, ενότητα Drawing Toolbar και FAB. 

OLD_GeoMap

Αποτέλεσμα: εμφανίζεται το πράσινο κουμπί, τα 3 πλήκτρα δεν μπαίνουν μέσα στο κινητό, και η μαύρη λωρίδα εξαφανίζεται.