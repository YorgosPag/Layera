# @layera/modals

Layera Modal System - Enterprise διαλογικά παράθυρα για modern React applications

## 📦 Τι είναι

Το `@layera/modals` είναι ένα complete modal system που παρέχει:

- **Modal**: Core modal component με full customization
- **Dialog**: Preconfigured modal για confirmations και alerts
- **ModalHeader/Content/Footer**: Modular layout components
- **useModal**: Hook για easy state management
- **TypeScript**: Πλήρη type safety
- **Accessibility**: WCAG 2.1 AA compliant
- **Theme Support**: Dark/light mode integration

## 🚀 Installation

```bash
npm install @layera/modals
```

## 🎯 Basic Usage

### Simple Modal

```tsx
import { Modal, ModalHeader, ModalContent, ModalFooter, useModal } from '@layera/modals';
import '@layera/modals/styles';

function MyComponent() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button onClick={open}>Open Modal</button>

      <Modal open={isOpen} onClose={close} size="md">
        <ModalHeader title="Modal Title" onClose={close} />
        <ModalContent>
          <p>This is the modal content!</p>
        </ModalContent>
        <ModalFooter>
          <button onClick={close}>Close</button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Dialog (Confirmation)

```tsx
import { Dialog, useModal } from '@layera/modals';

function DeleteButton() {
  const { isOpen, open, close } = useModal();

  const handleDelete = async () => {
    // Delete logic here
    console.log('Deleted!');
  };

  return (
    <>
      <button onClick={open}>Delete Item</button>

      <Dialog
        open={isOpen}
        onClose={close}
        type="error"
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={close}
      />
    </>
  );
}
```

## 🎨 Components

### Modal

Core modal component με πλήρη customization:

```tsx
interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'elevated' | 'centered' | 'sidebar';
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
}
```

### Dialog

Preconfigured modal για common use cases:

```tsx
interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success' | 'question';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}
```

### ModalHeader

```tsx
<ModalHeader
  title="Modal Title"
  subtitle="Optional subtitle"
  onClose={close}
  showCloseButton={true}
/>
```

### ModalContent

```tsx
<ModalContent
  padding="md"           // 'none' | 'sm' | 'md' | 'lg'
  scrollable={true}      // Enable scrolling for long content
>
  Your content here
</ModalContent>
```

### ModalFooter

```tsx
<ModalFooter
  align="right"          // 'left' | 'center' | 'right' | 'between'
  actions={
    <div>
      <button onClick={close}>Cancel</button>
      <button onClick={save}>Save</button>
    </div>
  }
/>
```

## 🎯 Modal Sizes

```tsx
// Predefined sizes
<Modal size="xs">   {/* 320px */}
<Modal size="sm">   {/* 448px */}
<Modal size="md">   {/* 512px - default */}
<Modal size="lg">   {/* 768px */}
<Modal size="xl">   {/* 1024px */}
<Modal size="full"> {/* Full viewport */}
```

## 🎨 Modal Variants

```tsx
<Modal variant="default">   {/* Standard modal */}
<Modal variant="elevated">  {/* Extra shadow */}
<Modal variant="centered">  {/* Always centered */}
<Modal variant="sidebar">   {/* Full height sidebar */}
```

## 🎭 Dialog Types

```tsx
<Dialog type="info">     {/* Blue info icon */}
<Dialog type="success">  {/* Green check icon */}
<Dialog type="warning">  {/* Yellow warning icon */}
<Dialog type="error">    {/* Red error icon */}
<Dialog type="question"> {/* Blue question icon */}
```

## 🔗 useModal Hook

```tsx
const { isOpen, open, close, toggle } = useModal(false);

// Methods
open();     // Opens the modal
close();    // Closes the modal
toggle();   // Toggles modal state
```

## 🎨 Advanced Examples

### Form Modal

```tsx
function EditUserModal({ userId, onSave }) {
  const { isOpen, open, close } = useModal();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await onSave(formData);
      close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={open}>Edit User</button>

      <Modal
        open={isOpen}
        onClose={close}
        size="lg"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
      >
        <ModalHeader
          title="Edit User"
          subtitle="Update user information"
          onClose={close}
        />
        <ModalContent scrollable>
          <UserForm onSubmit={handleSubmit} loading={loading} />
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Multi-step Dialog

```tsx
function MultiStepDialog() {
  const { isOpen, open, close } = useModal();
  const [step, setStep] = useState(1);

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      title={`Step ${step} of 3`}
      message="Please follow the steps to complete the process."
      confirmText={step === 3 ? "Finish" : "Next"}
      cancelText={step === 1 ? "Cancel" : "Back"}
      onConfirm={() => step < 3 ? setStep(s => s + 1) : close()}
      onCancel={() => step > 1 ? setStep(s => s - 1) : close()}
    />
  );
}
```

## 🎨 Styling & Theming

### CSS Custom Properties

```css
:root {
  --layera-modal-z-index: 1000;
  --layera-modal-overlay-bg: rgba(0, 0, 0, 0.5);
  --layera-modal-bg: #ffffff;
  --layera-modal-border: #e5e7eb;
  --layera-modal-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --layera-modal-radius: 12px;
  --layera-modal-padding: 24px;
}
```

### Dark Theme

```css
[data-theme="dark"] {
  --layera-modal-bg: #1f2937;
  --layera-modal-border: #374151;
  --layera-modal-overlay-bg: rgba(0, 0, 0, 0.8);
}
```

### Custom Styling

```tsx
<Modal
  className="my-custom-modal"
  overlayClassName="my-custom-overlay"
>
  <ModalContent className="my-custom-content">
    Content here
  </ModalContent>
</Modal>
```

## ♿ Accessibility

Το modal system είναι πλήρως accessible:

- **ARIA attributes**: `role="dialog"`, `aria-modal="true"`
- **Focus management**: Auto-focus πρώτο focusable element
- **Keyboard navigation**: ESC για κλείσιμο, Tab cycling
- **Screen readers**: Proper labeling με `aria-labelledby`

```tsx
<Modal
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <ModalHeader title="Title" id="modal-title" />
  <ModalContent>
    <p id="modal-description">Description</p>
  </ModalContent>
</Modal>
```

## 📱 Mobile Support

- **Responsive**: Auto-adapts για mobile screens
- **Touch-friendly**: Proper touch targets
- **Fullscreen**: Auto-fullscreen on small screens
- **Safe areas**: Respects notches και status bars

## 🔧 TypeScript

Πλήρης TypeScript support:

```tsx
import type {
  BaseModalProps,
  DialogProps,
  ModalSize,
  ModalVariant,
  UseModalReturn
} from '@layera/modals';
```

## 🤝 Contributing

Για contributions και issues, δες το [main repository](https://github.com/layera/layera).

## 📄 License

MIT - δες [LICENSE](./LICENSE) αρχείο.