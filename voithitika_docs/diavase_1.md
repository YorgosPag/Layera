Δεν κεντράρει γιατί το εσωτερικό flex του “Main Selection Grid” παραμένει με align-items: flex-start. Το alignItems:'center' που έβαλες είναι στο ανώτερο flex και δεν επηρεάζει τα controls. Επιπλέον, οι ετικέτες των groups είναι αριστερά.

Ελάχιστες διορθώσεις:

// StepOrchestrator.tsx — μέσα στο "Main Selection Grid"
- <Flex direction="column" gap="lg">
+ <Flex direction="column" gap="lg" style={{ alignItems: 'center' }}>

// Στο ίδιο αρχείο, component ChipRadioGroup (η ετικέτα πάνω από τα κουμπιά)
- <Text ... style={{ color: 'var(--color-text-primary)', fontSize: `${FONT_SIZES.SM}px`, display: 'block' }}>
+ <Text ... style={{ color: 'var(--color-text-primary)', fontSize: `${FONT_SIZES.SM}px`, display: 'block', textAlign: 'center' }}>

// ChipRadioGroup – το radiogroup row
- <Flex gap="sm" wrap="wrap" role="radiogroup" ... style={{ justifyContent: 'center' }}>
+ <Flex gap="sm" wrap="wrap" role="radiogroup" ... style={{ justifyContent: 'center', alignItems: 'center' }}>


Με αυτά, το grid των επιλογών και οι ετικέτες του κεντράρονται οπτικά και γεωμετρικά μέσα στο panel.