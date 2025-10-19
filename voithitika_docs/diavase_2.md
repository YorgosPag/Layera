Ναι, θέλει διάσπαση. Κράτα το modal “shell” λεπτό και βγάλε state, πλοήγηση, CSS, utilities έξω.

Στόχος
UnifiedPipelineModal = καθαρό shell που συνθέτει βήματα.

Κατάσταση/κανόνες ροής = ξεχωριστό hook ή state machine.

CSS/DOM side-effects εκτός component.

SSR-safe container detection.

Προτεινόμενη δομή φακέλων
packages/pipelines/unified/
  UnifiedPipelineModal.tsx          // μόνο compose + wiring
  hooks/
    useUnifiedPipeline.ts           // state, actions, guards
    useModalContainer.ts            // SSR-safe container resolver
  state/
    types.ts                        // Category/Intent/... + DTOs
    reducer.ts                      // ή machine.ts (XState)
    guards.ts
    selectors.ts
  utils/
    navigation.ts                   // from→to rules, pure
  styles/
    modal.css                       // overlay/classes; ΚΑΘΟΛΟΥ inline <style>
Εργασίες διάσπασης
State & πλοήγηση

Μετέφερε όλα τα pipelineState + handlers σε useUnifiedPipeline.

Χρησιμοποίησε useReducer με καθαρά events. Όχι setState({...pipelineState,...}). Πάντα functional updates.

Οι κανόνες μετάβασης να είναι pure (guards σε guards.ts).

Το modal shell κάνει μόνο:

const {state, actions} = useUnifiedPipeline({ onSubmit });
και switch(state.step) για render.

Τύποι & DTO

Ορίσσε UnifiedPipelineDTO και μην χρησιμοποιείς any στο onSubmit.

Discriminated unions για property/job ώστε να μην χρειάζονται non-null assertions (!).

Container detection (SSR-safe)

Βγάλε getModalContainer σε useModalContainer:

Μη διαβάζεις document στο render.

Επιστρέφεις () => Element ή null μετά από useEffect/useLayoutEffect guard:

const container = useModalContainer({ preferredId: 'layera-device-simulator-viewport' });
<Modal container={container} />
Αν το Modal δέχεται function, πέρασέ την function, όχι getModalContainer() στο render.

CSS

Αφαίρεσε όλο το document.createElement('style').

Μετέφερε τις κλάσεις σε styles/modal.css (overlay, modal box, dark theme).

Τα tokens να προέρχονται από @layera/responsive-design ή global CSS vars. Καμία “magic” HSL εδώ.

Steps API

Κάθε step να είναι “dumb”: δέχεται value(s), onNext, onBack. Δεν ξέρει global state shape.

Προσάρμοσε LocationStep, LayoutStep, DetailsStep να μην διαβάζουν ! properties, ο συσχετισμός γίνεται στο hook.

Υποβολή & λάθη

handleDetailsSubmit να έχει try/catch, loading flag, disable κουμπιών, idempotency (μη διπλό submit).

Lazy loading

const CategoryStep = lazy(() => import('./steps/CategoryStep')); με <Suspense fallback={<Spinner/>}>.

Τηλεμετρία

Στο hook: events step_viewed, step_completed, duration μέσω performance.now().

Tests

Unit: reducer/guards (happy/edge paths).

RTL: modal shell render ανά step.

Contract: DTO validators.

Ενδεικτικό wiring μετά τη διάσπαση (σύντομο)
// UnifiedPipelineModal.tsx
export function UnifiedPipelineModal({ isOpen, onClose, onSubmit }: Props) {
  const container = useModalContainer({ preferredId: 'layera-device-simulator-viewport' });
  const { state, actions, can } = useUnifiedPipeline({ onSubmit, onClose });

  return (
    <Modal open={isOpen} onClose={actions.reset} container={container} className="unified-pipeline-modal">
      {state.step === 'category' && <CategoryStep onNext={actions.setCategory} />}
      {state.step === 'intent' && <IntentStep category={state.category!} onNext={actions.setIntent} onBack={actions.back} />}
      {/* ...τα υπόλοιπα βήματα... */}
    </Modal>
  );
}
Συνοπτικό συμπέρασμα
Ναι, διάσπαση τώρα: hook για ροή, utils για container, CSS σε αρχείο, strong types για DTO, dumb steps. Το modal μένει λεπτό και enterprise-έτοιμο.