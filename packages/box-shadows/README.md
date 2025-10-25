# @layera/box-shadows

🌟 **Enterprise Box Shadow System** που ξεπερνά Material Design 3, Fluent Design, και Apple HIG

## 🚀 Features

- **Complete CSS box-shadow coverage** με semantic naming
- **Elevation-based shadow system** (Material Design 3 inspired)
- **Context-aware shadow utilities** για different use cases
- **CSS Custom Properties** με theme awareness
- **Performance-optimized** με design token integration
- **Type-safe shadow tokens** με strict TypeScript
- **Accessibility-compliant** shadow behaviors
- **Cross-platform consistency** (Windows, macOS, Linux, Mobile)
- **Advanced layering system** με z-index integration
- **Dark/Light theme adaptive** shadows

## 📦 Installation

```bash
npm install @layera/box-shadows
# or
yarn add @layera/box-shadows
# or
pnpm add @layera/box-shadows
```

## 🎯 Basic Usage

### Import and Use Tokens

```typescript
import {
  BOX_SHADOW_SCALE,
  getBoxShadowVar,
  useBoxShadow
} from '@layera/box-shadows';

// Direct shadow values
const cardStyles = {
  boxShadow: BOX_SHADOW_SCALE.cardDefault
};

// CSS custom properties (recommended)
const buttonStyles = {
  boxShadow: getBoxShadowVar('button-default')
};
```

### React Hooks

```typescript
import { useCardShadow, useButtonShadow } from '@layera/box-shadows';

function MyCard() {
  const { current, handlers } = useCardShadow({
    enableHover: true,
    enableActive: true
  });

  return (
    <div
      style={{ boxShadow: current }}
      {...handlers}
    >
      Interactive Card
    </div>
  );
}

function MyButton() {
  const { styles, handlers } = useButtonShadow();

  return (
    <button
      style={styles}
      {...handlers}
    >
      Interactive Button
    </button>
  );
}
```

## 🎨 Shadow Tokens

### Elevation System (Material Design 3)

```typescript
// Surface levels (0-7)
BOX_SHADOW_SCALE.elevation0  // Surface level
BOX_SHADOW_SCALE.elevation1  // Raised surface
BOX_SHADOW_SCALE.elevation2  // Card level
BOX_SHADOW_SCALE.elevation3  // Dropdown level
BOX_SHADOW_SCALE.elevation4  // Modal level
BOX_SHADOW_SCALE.elevation5  // Popover level
BOX_SHADOW_SCALE.elevation6  // Dialog/Sheet
BOX_SHADOW_SCALE.elevation7  // Full-screen overlay
```

### Interactive Elements

```typescript
// Button states
BOX_SHADOW_SCALE.buttonDefault
BOX_SHADOW_SCALE.buttonHover
BOX_SHADOW_SCALE.buttonActive
BOX_SHADOW_SCALE.buttonFocus

// Input states
BOX_SHADOW_SCALE.inputDefault
BOX_SHADOW_SCALE.inputFocus
BOX_SHADOW_SCALE.inputError

// Card states
BOX_SHADOW_SCALE.cardSubtle
BOX_SHADOW_SCALE.cardDefault
BOX_SHADOW_SCALE.cardHover
BOX_SHADOW_SCALE.cardPressed
```

### Status Shadows (Semantic)

```typescript
BOX_SHADOW_SCALE.shadowSuccess
BOX_SHADOW_SCALE.shadowWarning
BOX_SHADOW_SCALE.shadowError
BOX_SHADOW_SCALE.shadowInfo
```

### Special Effects

```typescript
// Glow effects
BOX_SHADOW_SCALE.glowSubtle
BOX_SHADOW_SCALE.glowDefault
BOX_SHADOW_SCALE.glowStrong

// Inner shadows
BOX_SHADOW_SCALE.innerSubtle
BOX_SHADOW_SCALE.innerDefault
BOX_SHADOW_SCALE.innerStrong

// Text shadows
BOX_SHADOW_SCALE.textSubtle
BOX_SHADOW_SCALE.textDefault
BOX_SHADOW_SCALE.textStrong
```

## 🔧 Utility Functions

### CSS Custom Properties

```typescript
import { getBoxShadowVar, getBoxShadowValue } from '@layera/box-shadows';

// Get CSS variable reference
const shadowVar = getBoxShadowVar('card-default');
// Returns: 'var(--box-shadow-card-default)'

// Get direct shadow value
const shadowValue = getBoxShadowValue('cardDefault');
// Returns: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
```

### Dynamic Shadow Creation

```typescript
import { COMPLETE_BOX_SHADOW_SYSTEM } from '@layera/box-shadows';

// Create custom shadow
const customShadow = COMPLETE_BOX_SHADOW_SYSTEM.helpers.createCustomShadow(
  0,    // offsetX
  4,    // offsetY
  6,    // blurRadius
  -1,   // spreadRadius
  'rgba(0, 0, 0, 0.1)' // color
);

// Combine multiple shadows
const combinedShadow = COMPLETE_BOX_SHADOW_SYSTEM.helpers.combineshadows(
  BOX_SHADOW_SCALE.cardDefault,
  BOX_SHADOW_SCALE.glowSubtle
);

// Create status shadow with glow
const statusShadow = COMPLETE_BOX_SHADOW_SYSTEM.helpers.createStatusShadow(
  'success', // status
  'glow'     // intensity
);
```

## ⚛️ React Hooks API

### useBoxShadow (Basic Hook)

```typescript
const {
  current,     // Current shadow value
  token,       // Current token
  cssVar,      // CSS variable reference
  setShadow,   // Set shadow by token
  isDarkMode,  // Dark mode detection
  reset,       // Reset to initial
  none,        // Remove shadow
  setElevation // Set elevation level
} = useBoxShadow({
  initial: 'cardDefault',
  useCSSVars: true,
  darkModeIntensity: 1.5
});
```

### useInteractiveShadow

```typescript
const {
  current,
  handlers,    // Mouse/focus event handlers
  styles,      // Complete styles with transitions
  interactionState, // Current state
  setHover,    // Manual state setters
  setActive,
  setFocus,
  setDefault
} = useInteractiveShadow({
  enableHover: true,
  enableActive: true,
  enableFocus: true,
  transitionDuration: 200
});
```

### useElevationShadow

```typescript
const {
  current,
  elevation,   // Current elevation level
  setElevation, // Set elevation (0-7)
  elevate,     // Increase elevation
  lower,       // Decrease elevation
  surface,     // Semantic elevation setters
  raised,
  container,
  overlay,
  dialog,
  popup,
  sheet,
  fullscreen
} = useElevationShadow({
  initialElevation: 2,
  autoElevate: false
});
```

### useStatusShadow

```typescript
const {
  current,
  status,      // Current status
  setStatus,   // Change status
  enableGlow,  // Enable glow effect
  disableGlow,
  toggleGlow,
  success,     // Status presets
  warning,
  error,
  info
} = useStatusShadow({
  status: 'info',
  enableGlow: false
});
```

### Specialized Component Hooks

```typescript
// Card shadow με interactive states
const cardShadow = useCardShadow({
  enableHover: true,
  enableActive: true
});

// Button shadow με full interaction
const buttonShadow = useButtonShadow({
  enableHover: true,
  enableActive: true,
  enableFocus: true
});

// Input shadow με focus/error states
const inputShadow = useInputShadow();

// Modal shadow
const modalShadow = useModalShadow();

// Tooltip shadow
const tooltipShadow = useTooltipShadow();
```

## 🎨 CSS Custom Properties

Το package παρέχει CSS custom properties για όλα τα shadow tokens:

```css
:root {
  /* Elevation shadows */
  --box-shadow-elevation-0: none;
  --box-shadow-elevation-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --box-shadow-elevation-2: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  /* ... και άλλα */

  /* Interactive shadows */
  --box-shadow-button-default: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --box-shadow-button-hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* ... και άλλα */
}
```

## 🌙 Dark Mode Support

Automatic dark mode detection και adaptive shadow intensity:

```typescript
const { current, isDarkMode } = useBoxShadow({
  initial: 'cardDefault',
  darkModeIntensity: 1.5 // Shadows become 1.5x more intense in dark mode
});
```

## 📱 Responsive Shadows

```typescript
const { current } = useResponsiveShadow(
  'cardSubtle',  // Mobile shadow (lighter for performance)
  'cardDefault'  // Desktop shadow (full experience)
);
```

## 🎭 Advanced Usage

### Theme-Aware Shadows

```typescript
const { current } = useThemeAwareShadow('cardDefault', 1.8);
```

### Animated Shadows

```typescript
const { styles } = useAnimatedShadow('cardDefault', 300, 'ease-out');
```

### Conditional Shadows

```typescript
const { current } = useConditionalShadow(
  isActive,       // condition
  'cardHover',    // true token
  'cardDefault'   // false token
);
```

### System Integration

```typescript
const shadowSystem = useBoxShadowSystem();

// Access complete system
const elevation4 = shadowSystem.css.elevation4;
const buttonUtils = shadowSystem.utils.components.button;
const customShadow = shadowSystem.helpers.createCustomShadow(0, 4, 8, 0, 'rgba(0,0,0,0.1)');
```

## 🏗️ Enterprise Patterns

### Component-Specific Utilities

```typescript
import { BOX_SHADOW_UTILITIES } from '@layera/box-shadows';

// Button με progressive enhancement
const buttonStyles = {
  ...BOX_SHADOW_UTILITIES.components.button.default,
  '&:hover': BOX_SHADOW_UTILITIES.components.button.hover,
  '&:active': BOX_SHADOW_UTILITIES.components.button.active,
  '&:focus': BOX_SHADOW_UTILITIES.components.button.focus
};

// Card με hover enhancement
const cardStyles = {
  ...BOX_SHADOW_UTILITIES.components.card.default,
  '&:hover': BOX_SHADOW_UTILITIES.components.card.hover
};
```

### Application-Specific Patterns

```typescript
// GeoAlert specific shadows
const geoAlertStyles = {
  mapCard: BOX_SHADOW_UTILITIES.application.geoAlert.mapCard,
  infoPanel: BOX_SHADOW_UTILITIES.application.geoAlert.infoPanel,
  fab: BOX_SHADOW_UTILITIES.application.geoAlert.floatingButton
};
```

## 🎯 Best Practices

1. **Use elevation system** για consistent layering
2. **Prefer CSS custom properties** για theme support
3. **Use interactive hooks** για enhanced UX
4. **Consider performance** - lighter shadows για mobile
5. **Test in dark mode** - use darkModeIntensity
6. **Follow semantic naming** - use status shadows appropriately

## 🚀 Performance Tips

- CSS custom properties are cached για better performance
- Dark mode detection uses efficient media queries
- Interactive hooks use optimized event handling
- Responsive shadows adapt automatically

## 🔗 Integration

Works seamlessly με άλλα @layera packages:

```typescript
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { Z_INDEX } from '@layera/constants';
import { SPACING_SCALE } from '@layera/constants';

const modalStyles = {
  boxShadow: BOX_SHADOW_SCALE.modalDefault,
  zIndex: Z_INDEX.modal,
  padding: SPACING_SCALE.LG
};
```

## 📊 Token Reference

Comprehensive list of all available shadow tokens με their use cases και recommended applications.

[Full token reference available in source code]

---

**Enterprise Box Shadow System** - Part of the Layera Design System
Built with ❤️ για world-class applications