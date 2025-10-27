● ΠΛΗΡΗΣ ΑΝΑΛΥΣΗ ΤΟΥ ΠΡΟΒΛΗΜΑΤΟΣ:

  🎯 ΤΙ ΘΕΛΟΥΜΕ ΝΑ ΚΑΝΟΥΜΕ

  Στόχος: Όταν ο χρήστης επιλέγει "🖥️ Responsive View (No Frame)" από το dropdown του
  DeviceModelSelector, ο χάρτης πρέπει να εμφανίζεται σε όλη την οθόνη (100% πλάτος) αντί για το τρέχον
  50%.

  🔍 ΤΕΧΝΙΚΗ ΑΝΑΛΥΣΗ ΤΟΥ ΠΡΟΒΛΗΜΑΤΟΣ

  Τρέχουσα Κατάσταση (Λάθος):

  // App.tsx γραμμή 285-288
  <Flex direction="row" height="100vh">
    <Box flex="1">  ⬅️ ΠΡΟΒΛΗΜΑ: περιορίζει στο 50% πλάτος
      <DeviceFrameWrapper enabled={true}>

  Πώς Λειτουργεί το DeviceFrameWrapper:

  1. Όταν selectedModel = null ("Responsive View"):
  return (
    <>
      <DeviceModelSelector ... />
      <div className="layera-layout-container">  ⬅️ Χωρίς frame
        {children}
      </div>
    </>
  );
  2. Όταν selectedModel υπάρχει (iPhone, iPad, κλπ):
  return (
    <Flex className="device-frame-container">
      <Box data-device={selectedModel?.id}>  ⬅️ Με frame
        {children}
      </Box>
    </Flex>
  );

  Η Ρίζα του Προβλήματος:

  Το parent container <Box flex="1"> στο App.tsx περιορίζει το DeviceFrameWrapper σε 50% πλάτος (επειδή     
  υπάρχει και δεξιά στήλη), ανεξάρτητα από το αν είναι responsive mode ή όχι.

  🧩 ΤΙ ΠΡΕΠΕΙ ΝΑ ΒΡΟΥΜΕ ΣΤΑ LEGO SYSTEMS

  ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ που χρειάζομαι:

  1. CSS Classes ή Hooks που detect όταν είμαστε σε responsive mode:
    - Context/Hook που expose το selectedModel state
    - CSS classes που υπάρχουν ήδη για responsive detection
    - Existing layout patterns για fullscreen vs constrained
  2. Layout Management από @layera/layout:
    - Existing CSS για .layera-layout-container fullscreen behavior
    - AppShell layout modes που handle responsive
    - Grid/Flex utilities που adapt based on mode
  3. Viewport/Device Detection από @layera/viewport:
    - Existing Context για device model selection
    - CSS custom properties που set based on device
    - Data attributes που indicate responsive mode

  📝 ΑΥΤΟ ΠΟΥ ΔΕΝ ΠΡΕΠΕΙ ΝΑ ΚΑΝΩ

  ❌ Δημιουργία custom:
  - CSS classes (.my-responsive-container)
  - React hooks (useResponsiveMode)
  - State management (useState για detection)
  - Custom CSS logic (conditional styles)
  - Props/callbacks (onResponsiveModeChange)

  ✅ Αυτό που ΠΡΕΠΕΙ να βρω:
  - Existing LEGO solution που το handle ήδη
  - Built-in CSS classes ή utilities
  - Existing Context/Hook από packages
  - Pre-built responsive layout patterns

  🔎 ΣΤΡΑΤΗΓΙΚΗ ΕΡΕΥΝΑΣ

  1. Βαθιά έρευνα στα @layera/layout, @layera/viewport, @layera/device-layouts
  2. Αναζήτηση για existing responsive patterns
  3. Εντοπισμός built-in CSS ή Context solutions
  4. ΜΟΝΟ αν βρω 100% existing solution → implementation
  5. ΑΝ δεν βρω → παραδέχομαι "δεν υπάρχει ακόμα" αντί να φτιάξω custom

  ΚΑΤΆΛΑΒΑ ΟΤΙ:
  - Πρέπει να βρω existing enterprise solution
  - ΔΕΝ πρέπει να φαντάζομαι λύσεις
  - ΠΑΝΤΟΤΕ ερευνώ πρώτα στα LEGO systems
  - ΠΟΤΕ custom code χωρίς 100% βεβαιότητα