# 📦 Layera Layout Packages - Implementation Guide

## 🎯 Package Creation Roadmap

Αυτό το έγγραφο καθοδηγεί τη δημιουργία των layout packages με την ακριβή σειρά και specifications.

## 📦 Package 1: @layera/layout

### Package Structure
```
packages/layout/
├── src/
│   ├── components/
│   │   ├── AppShell/
│   │   │   ├── AppShell.tsx
│   │   │   ├── AppShell.stories.tsx
│   │   │   ├── AppShell.test.tsx
│   │   │   └── index.ts
│   │   ├── Header/
│   │   │   ├── LayeraHeader.tsx
│   │   │   ├── HeaderActions.tsx
│   │   │   ├── LayeraHeader.stories.tsx
│   │   │   ├── LayeraHeader.test.tsx
│   │   │   └── index.ts
│   │   ├── Sidebar/
│   │   │   ├── NavigationSidebar.tsx
│   │   │   ├── NavItem.tsx
│   │   │   ├── NavSection.tsx
│   │   │   ├── Sidebar.stories.tsx
│   │   │   ├── Sidebar.test.tsx
│   │   │   └── index.ts
│   │   ├── Container/
│   │   │   ├── PageContainer.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── Container.stories.tsx
│   │   │   ├── Container.test.tsx
│   │   │   └── index.ts
│   │   └── Grid/
│   │       ├── LayoutGrid.tsx
│   │       ├── GridItem.tsx
│   │       ├── Grid.stories.tsx
│   │       ├── Grid.test.tsx
│   │       └── index.ts
│   ├── tokens/
│   │   ├── spacing.css
│   │   ├── layout.css
│   │   ├── breakpoints.css
│   │   ├── tokens.css        # Master tokens file
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useLayout.ts      # Layout state management
│   │   ├── useResponsive.ts  # Responsive utilities
│   │   └── index.ts
│   ├── types/
│   │   ├── layout.types.ts
│   │   ├── component.types.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── layout.utils.ts
│   │   ├── responsive.utils.ts
│   │   └── index.ts
│   └── index.ts              # Main package exports
├── docs/
│   ├── README.md
│   ├── USAGE.md
│   ├── COMPONENTS.md
│   ├── MIGRATION.md
│   └── EXAMPLES.md
├── package.json
├── tsconfig.json
├── rollup.config.js          # Build configuration
└── .storybook/               # Storybook configuration
```

### Core Component Specifications

#### 1. AppShell Component
```tsx
// src/components/AppShell/AppShell.tsx
interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  layout?: 'dashboard' | 'fullscreen' | 'fullscreen-map' | 'minimal' | 'dual-sidebar';
  className?: string;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  header,
  sidebar,
  footer,
  layout = 'dashboard',
  className,
  sidebarCollapsed = false,
  onSidebarToggle
}) => {
  // Implementation details...
};
```

#### 2. LayeraHeader Component
```tsx
// src/components/Header/LayeraHeader.tsx
interface LayeraHeaderProps {
  title: string;
  subtitle?: string;
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'minimal' | 'standard' | 'rich';
  sticky?: boolean;
  className?: string;
}

export const LayeraHeader: React.FC<LayeraHeaderProps> = ({
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = 'standard',
  sticky = true,
  className
}) => {
  // Implementation details...
};
```

#### 3. NavigationSidebar Component
```tsx
// src/components/Sidebar/NavigationSidebar.tsx
interface NavigationSidebarProps {
  children: React.ReactNode;
  collapsed?: boolean;
  collapsible?: boolean;
  width?: string | number;
  position?: 'left' | 'right';
  variant?: 'default' | 'overlay' | 'push';
  className?: string;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  children,
  collapsed = false,
  collapsible = true,
  width = 280,
  position = 'left',
  variant = 'default',
  className
}) => {
  // Implementation details...
};
```

#### 4. PageContainer Component
```tsx
// src/components/Container/PageContainer.tsx
interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'lg',
  className
}) => {
  // Implementation details...
};
```

### Design Tokens Implementation

#### spacing.css
```css
:root {
  /* Spacing scale - 8px base */
  --layera-space-0: 0;
  --layera-space-px: 1px;
  --layera-space-0-5: 0.125rem;  /* 2px */
  --layera-space-1: 0.25rem;     /* 4px */
  --layera-space-1-5: 0.375rem;  /* 6px */
  --layera-space-2: 0.5rem;      /* 8px */
  --layera-space-2-5: 0.625rem;  /* 10px */
  --layera-space-3: 0.75rem;     /* 12px */
  --layera-space-3-5: 0.875rem;  /* 14px */
  --layera-space-4: 1rem;        /* 16px */
  --layera-space-5: 1.25rem;     /* 20px */
  --layera-space-6: 1.5rem;      /* 24px */
  --layera-space-7: 1.75rem;     /* 28px */
  --layera-space-8: 2rem;        /* 32px */
  --layera-space-9: 2.25rem;     /* 36px */
  --layera-space-10: 2.5rem;     /* 40px */
  --layera-space-12: 3rem;       /* 48px */
  --layera-space-14: 3.5rem;     /* 56px */
  --layera-space-16: 4rem;       /* 64px */
  --layera-space-20: 5rem;       /* 80px */
  --layera-space-24: 6rem;       /* 96px */

  /* Semantic spacing */
  --layera-space-xs: var(--layera-space-1);
  --layera-space-sm: var(--layera-space-2);
  --layera-space-md: var(--layera-space-4);
  --layera-space-lg: var(--layera-space-6);
  --layera-space-xl: var(--layera-space-8);
  --layera-space-2xl: var(--layera-space-10);
  --layera-space-3xl: var(--layera-space-12);
}
```

#### layout.css
```css
:root {
  /* Header dimensions */
  --layera-header-height: 64px;
  --layera-header-height-compact: 48px;
  --layera-header-height-minimal: 40px;

  /* Sidebar dimensions */
  --layera-sidebar-width: 280px;
  --layera-sidebar-width-collapsed: 64px;
  --layera-sidebar-width-compact: 240px;

  /* Container dimensions */
  --layera-container-sm: 640px;
  --layera-container-md: 768px;
  --layera-container-lg: 1024px;
  --layera-container-xl: 1280px;
  --layera-container-2xl: 1536px;
  --layera-container-full: 100%;

  /* Z-index scale */
  --layera-z-dropdown: 1000;
  --layera-z-sticky: 1010;
  --layera-z-fixed: 1020;
  --layera-z-modal-backdrop: 1030;
  --layera-z-modal: 1040;
  --layera-z-popover: 1050;
  --layera-z-tooltip: 1060;
  --layera-z-toast: 1070;

  /* Layout specific z-indexes */
  --layera-z-header: var(--layera-z-sticky);
  --layera-z-sidebar: var(--layera-z-fixed);
  --layera-z-overlay: var(--layera-z-modal-backdrop);
}
```

#### breakpoints.css
```css
:root {
  /* Breakpoint values */
  --layera-breakpoint-sm: 640px;
  --layera-breakpoint-md: 768px;
  --layera-breakpoint-lg: 1024px;
  --layera-breakpoint-xl: 1280px;
  --layera-breakpoint-2xl: 1536px;
}

/* Media query mixins via CSS custom media (future) */
@custom-media --layera-sm (min-width: 640px);
@custom-media --layera-md (min-width: 768px);
@custom-media --layera-lg (min-width: 1024px);
@custom-media --layera-xl (min-width: 1280px);
@custom-media --layera-2xl (min-width: 1536px);

/* Utility classes for responsive behavior */
.layera-hidden-sm { @media (max-width: 639px) { display: none !important; } }
.layera-hidden-md { @media (max-width: 767px) { display: none !important; } }
.layera-hidden-lg { @media (max-width: 1023px) { display: none !important; } }
.layera-hidden-xl { @media (max-width: 1279px) { display: none !important; } }

.layera-block-sm { @media (min-width: 640px) { display: block !important; } }
.layera-block-md { @media (min-width: 768px) { display: block !important; } }
.layera-block-lg { @media (min-width: 1024px) { display: block !important; } }
.layera-block-xl { @media (min-width: 1280px) { display: block !important; } }
```

### Hooks Implementation

#### useLayout Hook
```tsx
// src/hooks/useLayout.ts
interface LayoutState {
  sidebarCollapsed: boolean;
  headerHeight: number;
  sidebarWidth: number;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

interface LayoutActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setHeaderHeight: (height: number) => void;
}

export const useLayout = (): [LayoutState, LayoutActions] => {
  // Implementation...
};
```

#### useResponsive Hook
```tsx
// src/hooks/useResponsive.ts
interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentBreakpoint: string;
  windowSize: { width: number; height: number };
}

export const useResponsive = (): ResponsiveState => {
  // Implementation...
};
```

## 📦 Package 2: @layera/cards

### Card System Structure
```
packages/cards/
├── src/
│   ├── components/
│   │   ├── BaseCard/
│   │   │   ├── BaseCard.tsx
│   │   │   ├── CardHeader.tsx
│   │   │   ├── CardContent.tsx
│   │   │   ├── CardFooter.tsx
│   │   │   └── index.ts
│   │   ├── InfoCard/
│   │   │   ├── InfoCard.tsx
│   │   │   ├── InfoCard.stories.tsx
│   │   │   └── index.ts
│   │   ├── DataCard/
│   │   │   ├── DataCard.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   └── index.ts
│   │   ├── ActionCard/
│   │   │   ├── ActionCard.tsx
│   │   │   ├── ButtonCard.tsx
│   │   │   └── index.ts
│   │   └── DashboardCard/
│   │       ├── DashboardCard.tsx
│   │       ├── WidgetCard.tsx
│   │       └── index.ts
│   ├── layouts/
│   │   ├── DashboardGrid.tsx
│   │   ├── CardList.tsx
│   │   └── index.ts
│   └── index.ts
```

### BaseCard Specification
```tsx
// src/components/BaseCard/BaseCard.tsx
interface BaseCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}
```

## 📦 Package 3: @layera/patterns

### UI Patterns Structure
```
packages/patterns/
├── src/
│   ├── Navigation/
│   │   ├── TabContainer.tsx
│   │   ├── TabPanel.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── Pagination.tsx
│   │   └── index.ts
│   ├── Forms/
│   │   ├── FormContainer.tsx
│   │   ├── FormSection.tsx
│   │   ├── FormField.tsx
│   │   ├── FormActions.tsx
│   │   └── index.ts
│   ├── Tables/
│   │   ├── DataTable.tsx
│   │   ├── TableHeader.tsx
│   │   ├── TableRow.tsx
│   │   ├── TableActions.tsx
│   │   └── index.ts
│   └── index.ts
```

## 🔧 Build Configuration

### package.json Template
```json
{
  "name": "@layera/layout",
  "version": "1.0.0",
  "description": "Layera Layout System - Modular UI Components",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "test:watch": "jest --watch",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^4.9.0",
    "rollup": "^3.0.0",
    "@rollup/plugin-typescript": "^9.0.0"
  }
}
```

## 🧪 Testing Strategy

### Unit Tests
```tsx
// src/components/AppShell/AppShell.test.tsx
import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders children correctly', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies layout className correctly', () => {
    const { container } = render(
      <AppShell layout="dashboard">
        <div>Content</div>
      </AppShell>
    );
    expect(container.firstChild).toHaveClass('layera-app-shell--dashboard');
  });
});
```

### Storybook Stories
```tsx
// src/components/AppShell/AppShell.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: <div>Header Content</div>,
    sidebar: <div>Sidebar Content</div>,
    children: <div>Main Content</div>,
  },
};

export const FullscreenMap: Story = {
  args: {
    layout: 'fullscreen-map',
    header: <div>Map Header</div>,
    children: <div>Map Content</div>,
  },
};
```

## 🚀 Implementation Order

### Week 1: @layera/layout Foundation
1. **Day 1-2**: Package setup, build configuration, basic AppShell
2. **Day 3-4**: LayeraHeader component με variants
3. **Day 5-7**: NavigationSidebar, design tokens, responsive utilities

### Week 2: @layera/layout Completion
1. **Day 1-3**: PageContainer, Grid components, hooks
2. **Day 4-5**: Testing, Storybook stories
3. **Day 6-7**: Documentation, examples

### Week 3: @layera/cards Package
1. **Day 1-3**: BaseCard, InfoCard, DataCard
2. **Day 4-5**: ActionCard, DashboardCard, layouts
3. **Day 6-7**: Testing, stories, documentation

### Week 4: @layera/patterns & Integration
1. **Day 1-3**: Navigation, Forms, Tables patterns
2. **Day 4-5**: Integration testing με existing apps
3. **Day 6-7**: Migration guides, final documentation

## ✅ Acceptance Criteria

### Functionality
- [ ] All components render correctly
- [ ] Responsive behavior works across breakpoints
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] TypeScript support complete
- [ ] Tree-shaking works properly

### Performance
- [ ] Bundle size optimized
- [ ] No unnecessary re-renders
- [ ] Smooth animations/transitions
- [ ] Memory leaks prevented

### Developer Experience
- [ ] Comprehensive documentation
- [ ] Storybook examples
- [ ] TypeScript IntelliSense
- [ ] Migration guides clear

### Design System
- [ ] Consistent με existing Layera brand
- [ ] Design tokens properly implemented
- [ ] Theme integration seamless
- [ ] Cross-browser compatibility

---

**Αυτός ο οδηγός θα ενημερώνεται καθώς εξελίσσεται η υλοποίηση.**