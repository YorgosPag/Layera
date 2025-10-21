Αιτία: το header χάνεται γιατί:

iOS Safari κρύβει τα browser bars όταν υπάρχει κατακόρυφο scroll στο root.

position: fixed χαλάει σε iOS αν οποιοσδήποτε πρόγονος έχει transform/filter/perspective ή αν το header είναι μέσα σε container με overflow.

100vh μεταβάλλεται σε iOS· το layout πηδάει και το header βγαίνει εκτός ορατού.

Λύση αρχιτεκτονικά: μηδενικό scroll στο root, header έξω από το “device frame”/map containers, χρήση 100dvh, και render του header με Portal στο document.body.

Εφάρμοσε αυτά τα 5 βήματα:

Global CSS

html, body { height: 100%; overflow: hidden; }
#root, #app { height: 100dvh; position: relative; }
:root { --safe-top: env(safe-area-inset-top, 0px); --header-h: 56px; }


Αντικατάστησε παντού 100vh με 100dvh. Αν χρειάζεται fallback:

useEffect(() => {
  const setVH = () => document.documentElement.style
    .setProperty('--vh', `${window.innerHeight * 0.01}px`);
  setVH(); window.addEventListener('resize', setVH);
  return () => window.removeEventListener('resize', setVH);
}, []);
/* και CSS εναλλακτικά: height: calc(var(--vh, 1vh) * 100); */


Κάνε τον header Portal ώστε να μην έχει προγόνους με transform/overflow:

import { createPortal } from 'react-dom';
function FixedTopChrome({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  if (!ref.current) ref.current = document.createElement('div');
  React.useEffect(() => {
    const el = ref.current!;
    Object.assign(el.style, {
      position: 'fixed', top: '0', left: '0', right: '0',
      zIndex: '2147483647', paddingTop: 'var(--safe-top)',
    });
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, []);
  return createPortal(children, ref.current);
}


Χρήση στο iPhone layout:

{isIPhone14ProMaxDevice && (
  <FixedTopChrome>
    <AppHeader /* back, τίτλος, γλώσσα */ />
  </FixedTopChrome>
)}


Το map να μην προκαλεί page scroll και να ξεκινά κάτω από τον header:

<div
  id="map-wrap"
  style={{
    position: 'absolute',
    top: `calc(var(--header-h) + var(--safe-top))`,
    left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    touchAction: 'pan-x pan-y',
  }}
>
  {/* leaflet map container εδώ */}
</div>


Καθάρισε hacks που μπλέκουν:

Βγάλε transform από wrappers του “device frame” που περιέχουν τον header. Αν το frame χρειάζεται transform, άφησέ το μόνο γύρω από τον χάρτη, όχι γύρω από τον header.

Αφαίρεσε τα meta/JS που τροποποιούν viewport ή body σε runtime. Δεν χρειάζονται με το παραπάνω layout.

Ξαναενεργοποίησε τα Leaflet interactions στο iPhone. Δεν θα κρύβεται η μπάρα αφού δεν υπάρχει root scroll.

Έλεγχοι-κλειδιά:

Ο header πρέπει να είναι sibling του map container και να γίνεται render σε document.body μέσω Portal.

Κανένας πρόγονος του header με transform, filter, perspective, backdrop-filter, will-change, ή overflow.

Καμία χρήση 100vh. Μόνο 100dvh ή το --vh hack.

Με αυτά ο back button και ο τίτλος μένουν σταθερά ορατά ενώ μετακινείς τον χάρτη.