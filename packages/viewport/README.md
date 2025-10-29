# @layera/viewport

Enterprise-grade viewport detection system για την Layera πλατφόρμα.

## Enterprise Features

- **Type-safe device detection** - Mobile, Tablet, Desktop με TypeScript support
- **SSR Compatible** - Λειτουργεί με Server-Side Rendering
- **Performance Optimized** - Debounced resize events και lightweight bundle
- **Modular Architecture** - Standalone hooks, components και utilities
- **Development Tools** - Debugging components για testing responsive behavior

## Installation

```bash
# Στο workspace ως dependency
npm install @layera/viewport

# Ή ως local package reference
"@layera/viewport": "file:../../packages/viewport"
```

## Quick Start

```tsx
import { useViewport, ResponsiveContainer, ViewportDebugger } from '@layera/viewport';

// Hook για device detection
const { deviceType, isMobile, isTablet, isDesktop } = useViewport();

// Responsive container με auto-adaptive layouts
<ResponsiveContainer enablePadding enableMaxWidth>
  <YourContent />
</ResponsiveContainer>

// Development debugging
<ViewportDebugger position="top-right" compact={isMobile} />
```

## 🔧 API Reference

### Hooks

#### `useViewport()`
Κύριο hook για viewport detection.

```tsx
const {
  deviceType,     // 'mobile' | 'tablet' | 'desktop'
  orientation,    // 'portrait' | 'landscape'
  width,          // Current viewport width
  height,         // Current viewport height
  isMobile,       // Boolean shortcuts
  isTablet,
  isDesktop,
  isPortrait,
  isLandscape
} = useViewport();
```

#### Convenience Hooks
```tsx
const isMobile = useIsMobile();      // boolean
const isTablet = useIsTablet();      // boolean
const isDesktop = useIsDesktop();    // boolean
```

### Components

#### `<ResponsiveContainer>`
Auto-adaptive container με device-specific configuration.

```tsx
import { SPACING_SCALE, BREAKPOINTS } from '@layera/constants';

<ResponsiveContainer
  enablePadding={true}      // Auto device padding
  enableMaxWidth={true}     // Responsive max-width
  config={{                 // Custom breakpoints
    mobile: { padding: SPACING_SCALE.SM, maxWidth: '100%' },
    tablet: { padding: SPACING_SCALE.MD, maxWidth: BREAKPOINTS.TABLET },
    desktop: { padding: SPACING_SCALE.LG, maxWidth: BREAKPOINTS.DESKTOP }
  }}
>
  <YourContent />
</ResponsiveContainer>
```

#### Conditional Rendering Components
```tsx
<MobileOnly>Mobile content</MobileOnly>
<TabletOnly>Tablet content</TabletOnly>
<DesktopOnly>Desktop content</DesktopOnly>
<MobileAndTablet>Mobile + Tablet content</MobileAndTablet>
<TabletAndDesktop>Tablet + Desktop content</TabletAndDesktop>
```

#### `<ViewportDebugger>`
Development tool για viewport testing.

```tsx
<ViewportDebugger
  position="top-right"      // Positioning
  compact={isMobile}        // Compact mode για mobile
  showAlways={false}        // Always visible (dev only by default)
/>
```

## 📱 Breakpoints

Default enterprise breakpoints:

- **Mobile**: 0-${BREAKPOINTS.MOBILE_MAX}px
- **Tablet**: ${BREAKPOINTS.TABLET_MIN}-${BREAKPOINTS.TABLET_MAX}px
- **Desktop**: ${BREAKPOINTS.DESKTOP_MIN}px+

## 🏢 Enterprise Usage

### Cross-App Consistency
```tsx
// GeoAlert app
import { useViewport } from '@layera/viewport';

// LayeraID app
import { useViewport } from '@layera/viewport';

// Same behavior across all apps
```

### Advanced Configuration
```tsx
import { BREAKPOINTS } from '@layera/constants';

const customConfig = {
  mobile: { breakpoint: BREAKPOINTS.MOBILE_MAX, gridColumns: 1 },
  tablet: { breakpoint: BREAKPOINTS.TABLET_MAX, gridColumns: 2 },
  desktop: { breakpoint: BREAKPOINTS.DESKTOP_MIN, gridColumns: 3 }
};

<ResponsiveContainer config={customConfig}>
  <GridLayout />
</ResponsiveContainer>
```

## 🔨 Development

```bash
# Build package
npm run build

# Watch mode για development
npm run dev

# Clean build artifacts
npm run clean
```

## 📁 Package Structure

```
packages/viewport/
├── src/
│   ├── types/index.ts              # TypeScript definitions
│   ├── hooks/useViewport.ts        # Core viewport hook
│   ├── components/
│   │   ├── ResponsiveContainer.tsx # Layout container
│   │   └── ViewportDebugger.tsx    # Debug component
│   └── index.ts                    # Main exports
├── dist/                           # Built files
├── package.json                    # Package config
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Build config
└── README.md                       # This file
```

## 🌟 Best Practices

1. **Performance**: Use convenience hooks (`useIsMobile`) αντί για destructuring όταν χρειάζεσαι μόνο μία τιμή
2. **SSR**: Το hook είναι SSR-safe με fallback στο desktop
3. **Testing**: Χρησιμοποίησε το `ViewportDebugger` για responsive testing
4. **Consistency**: Εφάρμοσε τα ίδια breakpoints σε όλες τις εφαρμογές

## 📄 License

MIT License - Layera Enterprise Platform