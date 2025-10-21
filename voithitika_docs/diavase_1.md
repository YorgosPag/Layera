Θέλω να κάνεις μια πολύ μεγάλη βουτιά πάλι, βαθιά βουτιά στο διαδίκτυο και να βρεις αν υπάρχει κάποιο plug-in ή κάποιο API που αναφέρεται σε modal, επαγγελματικό enterprise ούτως ώστε να μπορώ να το προσθέτω σαν puzzle, σαν lego-σύστημα στις εφαρμογές ή να το αφαιρώ χωρίς να σπάσουν οι εφαρμογές.Ψάξε να βρεις το καλύτερο δωρεάν modal σύστημα που μπορεί να χειρίζονται οι μεγαλύτερες εταιρείες παγκοσμίως.

Σκέφτηκε για 54s

Σύντομη σύσταση: επίλεξε Radix UI Dialog για React apps, ή Shoelace <sl-dialog> για framework-agnostic “lego” ένταξη. Αν θες hooks-API με μέγιστο έλεγχο, χρησιμοποίησε Adobe React Aria. Και τα τρία είναι δωρεάν, παραγωγικά, με πλήρη a11y και μπορούν να μπουν/βγουν χωρίς να “σπάνε” το UI.

Κορυφαίες επιλογές

Radix UI – Dialog (React, headless, MIT): unstyled primitives, focus-trap, portal, modal/non-modal, controlled/uncontrolled. Ιδανικό ως βάση enterprise design system και “κουμπώνει” με shadcn/ui. 
radix-ui.com
+1

Shoelace – <sl-dialog> (Web Components, MIT): framework-agnostic, εισαγωγή με CDN ή npm, πλήρως παραμετροποιήσιμο και προσθέτει/αφαιρείται σαν “πλακίδιο” σε οποιαδήποτε εφαρμογή. 
shoelace.style
+2
shoelace.style
+2

React Aria – useDialog (Adobe, hooks): δίνει το behavior/a11y μέσω hooks ώστε να ορίσεις εσύ DOM/στυλ· enterprise-grade focus management. 
react-spectrum.adobe.com
+1

“Lego” ενσωμάτωση (μοτίβο adapter)

Ορίζεις ένα ουδέτερο API και υλοποιείς drivers για κάθε βιβλιοθήκη· έτσι αλλάζεις backend χωρίς refactor.

// modal-api.ts
export interface ModalHandle { open(): void; close(): void; toggle(): void; }
export interface ModalAdapter {
  mount(container: HTMLElement): ModalHandle; // returns imperative API
}


Radix driver (σκίτσο):

// RadixModalAdapter.tsx
import * as Dialog from '@radix-ui/react-dialog';
export const RadixAdapter: ModalAdapter = {
  mount(el) {
    let setOpen: (v:boolean)=>void = () => {};
    const Root = () => {
      const [open, _setOpen] = React.useState(false);
      setOpen = _setOpen;
      return (
        <Dialog.Root open={open} onOpenChange={_setOpen}>
          <Dialog.Trigger asChild><button /></Dialog.Trigger>
          <Dialog.Content><slot /></Dialog.Content>
        </Dialog.Root>
      );
    };
    ReactDOM.render(<Root />, el);
    return { open: ()=>setOpen(true), close: ()=>setOpen(false), toggle: ()=>setOpen(o=>!o) };
  }
};


Radix Dialog χαρακτηριστικά και a11y: 
radix-ui.com

Shoelace driver (σκίτσο):

// ShoelaceModalAdapter.ts
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
export const ShoelaceAdapter: ModalAdapter = {
  mount(el) {
    const dlg = document.createElement('sl-dialog');
    el.appendChild(dlg);
    return { open: ()=>dlg.show(), close: ()=>dlg.hide(), toggle: ()=>dlg.open?dlg.hide():dlg.show() };
  }
};


Shoelace dialog και framework-agnostic χρήση: 
shoelace.style
+1

Εναλλακτικές “όλα-σε-ένα”

MUI Dialog: ώριμο, MIT, με Modal θεμέλιο. Καλό για teams που υιοθετούν Material. 
MUI
+2
MUI
+2

Ant Design Modal: δημοφιλές σε enterprise, MIT. Κατάλληλο αν υιοθετείς Ant Design system. 
DUMBO Design
+1

Vaadin Dialog (Web Component): enterprise προσανατολισμός, αaccessibility δηλωμένη, core υπό Apache-2.0. 
Vaadin
+2
Vaadin
+2

Επιλογή για Layera

Αν μένεις σε React + shadcn/ui, καθιέρωσε Radix Dialog ως standard driver πίσω από ένα adapter όπως παραπάνω. 
shadcn.io
+1

Αν χρειάζεσαι drop-in σε διαφορετικά stacks ή micro-frontends, χρησιμοποίησε Shoelace <sl-dialog> ως κοινό web-component driver. 
shoelace.style

Θες να σου δώσω έτοιμο @layera/modals package με τους δύο adapters και sandbox demo;