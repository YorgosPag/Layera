# @layera/layout

Layera Layout System - Enterprise UI Components για unified app experiences

## 📦 Τι είναι

Το `@layera/layout` είναι το core layout package του Layera ecosystem που παρέχει:

- **AppShell**: Unified layout shell για όλες τις εφαρμογές
- **LayeraHeader**: Standardized header με flexible variants
- **NavigationSidebar**: Responsive sidebar με navigation components
- **PageContainer/PageHeader**: Standardized page layouts
- **Design Tokens**: Consistent spacing, colors, και responsive breakpoints
- **Hooks**: useLayout, useResponsive για state management

## 🚀 Quick Start

### Installation

```bash
npm install @layera/layout
```

### Basic Usage

```tsx
import { AppShell, LayeraHeader, NavigationSidebar, NavItem } from '@layera/layout';
import '@layera/layout/styles';

function App() {
  return (
    <AppShell
      layout="dashboard"
      header={
        <LayeraHeader
          title="My App"
          subtitle="Enterprise Application"
          variant="standard"
        />
      }
      sidebar={
        <NavigationSidebar>
          <NavItem icon={<HomeIcon />} label="Dashboard" to="/dashboard" />
          <NavItem icon={<UserIcon />} label="Profile" to="/profile" />
        </NavigationSidebar>
      }
    >
      <div>Your main content here</div>
    </AppShell>
  );
}
```

## 🎨 Layout Variants

### Dashboard Layout
Ιδανικό για admin/dashboard εφαρμογές:
```tsx
<AppShell layout="dashboard" header={...} sidebar={...}>
```

### Fullscreen Map Layout
Ειδικά για mapping εφαρμογές:
```tsx
<AppShell layout="fullscreen-map" header={...}>
```

### Minimal Layout
Για απλές εφαρμογές χωρίς navigation:
```tsx
<AppShell layout="minimal">
```

## 🎯 Core Components

### AppShell
Το κεντρικό layout component:

```tsx
interface AppShellProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  layout?: 'dashboard' | 'fullscreen' | 'fullscreen-map' | 'minimal';
  className?: string;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}
```

## 🚀 Upcoming Components

Τα επόμενα components που θα προστεθούν στο Layout System:

### 1. Modal/Dialog System 🪟
```tsx
<Modal open={isOpen} onClose={onClose} size="lg">
  <ModalHeader title="Confirmation" />
  <ModalContent>Are you sure?</ModalContent>
  <ModalFooter>
    <Button variant="ghost" onClick={onClose}>Cancel</Button>
    <Button variant="primary" onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

### 2. Notification/Toast System 📢
```tsx
const { showNotification } = useNotifications();
showNotification({
  type: 'success',
  title: 'Success!',
  message: 'Operation completed successfully',
  duration: 5000
});
```

### 3. Loading States & Skeletons ⏳
```tsx
<LoadingSpinner size="lg" />
<SkeletonCard />
<SkeletonText lines={3} />
```

### 4. Error Boundary Components 🛡️
```tsx
<ErrorBoundary
  fallback={<ErrorFallback />}
  onError={(error, errorInfo) => logError(error, errorInfo)}
>
  <YourComponent />
</ErrorBoundary>
```

### LayeraHeader
Standardized header με variants:

```tsx
interface LayeraHeaderProps {
  title: string;
  subtitle?: string;
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  variant?: 'minimal' | 'standard' | 'rich';
  sticky?: boolean;
  className?: string;
}
```

### NavigationSidebar
Flexible sidebar για navigation:

```tsx
interface NavigationSidebarProps {
  children: ReactNode;
  collapsed?: boolean;
  collapsible?: boolean;
  width?: string | number;
  position?: 'left' | 'right';
  variant?: 'default' | 'overlay' | 'push';
  className?: string;
}
```

## 📱 Responsive Behavior

Το layout system είναι fully responsive:

- **Mobile (<${BREAKPOINTS.TABLET_MIN}px)**: Sidebar γίνεται overlay, compact header
- **Tablet (${BREAKPOINTS.TABLET_MIN}px-${BREAKPOINTS.DESKTOP_MIN}px)**: Compact sidebar, responsive containers
- **Desktop (>${BREAKPOINTS.DESKTOP_MIN}px)**: Full layout με όλα τα features

## 🎨 Design Tokens

Χρησιμοποιεί consistent design tokens:

```css
/* Spacing */
--layera-space-sm: 0.5rem;    /* 8px */
--layera-space-md: 1rem;      /* 16px */
--layera-space-lg: 1.5rem;    /* 24px */

/* Layout dimensions */
--layera-header-height: 64px;
--layera-sidebar-width: 280px;
--layera-sidebar-width-collapsed: 64px;

/* Breakpoints */
--layera-breakpoint-md: 768px;
--layera-breakpoint-lg: 1024px;
```

## 🔗 Hooks

### useResponsive
```tsx
const { isMobile, isTablet, isDesktop, currentBreakpoint } = useResponsive();
```

### useLayout
```tsx
const [layoutState, layoutActions] = useLayout();
// layoutState: { sidebarCollapsed, headerHeight, breakpoint }
// layoutActions: { toggleSidebar, setSidebarCollapsed }
```

## 🎯 Examples

### GeoAlert Integration
```tsx
import { AppShell, LayeraHeader } from '@layera/layout';

<AppShell
  layout="fullscreen-map"
  header={
    <LayeraHeader
      title="Layera GeoAlert"
      variant="minimal"
      actions={<LanguageSwitcher />}
    />
  }
>
  <GeoMap />
</AppShell>
```

### ID Management Integration
```tsx
<AppShell
  layout="dashboard"
  header={
    <LayeraHeader
      title="Layera ID"
      subtitle="Identity Management"
      actions={<UserMenu />}
    />
  }
  sidebar={
    <NavigationSidebar>
      <NavItem label="Dashboard" to="/dashboard" />
      <NavSection title="Administration">
        <NavItem label="Users" to="/admin/users" />
        <NavItem label="Roles" to="/admin/roles" />
      </NavSection>
    </NavigationSidebar>
  }
>
  <Routes>...</Routes>
</AppShell>
```

## 🎨 Theming

Το layout system ενσωματώνεται με το `@layera/theme-switcher`:

```tsx
import { ThemeProvider } from '@layera/theme-switcher';

<ThemeProvider>
  <AppShell>...</AppShell>
</ThemeProvider>
```

## 📚 Migration Guide

Για migration από existing layouts:

1. **Install**: `npm install @layera/layout`
2. **Import styles**: `import '@layera/layout/styles'`
3. **Wrap app**: Αντικατέστησε custom layout με `<AppShell>`
4. **Update header**: Χρησιμοποίησε `<LayeraHeader>`
5. **Convert navigation**: Χρησιμοποίησε `<NavigationSidebar>` + `<NavItem>`

## 🔧 TypeScript Support

Πλήρης TypeScript support με exported types:

```tsx
import type {
  AppShellProps,
  LayeraHeaderProps,
  LayoutVariant,
  ResponsiveState
} from '@layera/layout';
```

## 🤝 Contributing

Για contributions και issues, δες το [main repository](https://github.com/layera/layera).

## 📄 License

MIT - δες [LICENSE](./LICENSE) αρχείο.