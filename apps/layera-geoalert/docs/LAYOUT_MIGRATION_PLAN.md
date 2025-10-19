# 🗺️ Layera GeoAlert - Layout Migration Plan

## 📋 Current State Analysis

### Existing Layout Structure
```tsx
// apps/layera-geoalert/src/App.tsx - CURRENT
function App() {
  return (
    <div className="geo-app"> {/* Custom wrapper */}
      <LanguageSwitcher />    {/* Custom positioned */}
      <DeviceSwitcher />      {/* Custom positioned */}
      <GeoMap />              {/* Full screen map */}
    </div>
  );
}
```

### Identified Issues
- ❌ No standardized header
- ❌ Custom positioning logic scattered
- ❌ No container system
- ❌ Responsive behavior handled per component
- ❌ No navigation structure for future features

## 🎯 Target Layout Structure

### New Structure με @layera/layout
```tsx
// apps/layera-geoalert/src/App.tsx - TARGET
import { AppShell, LayeraHeader } from '@layera/layout';

function App() {
  return (
    <AppShell
      layout="fullscreen-map"  // Specialized layout for mapping
      header={
        <LayeraHeader
          title="Layera GeoAlert V1"
          subtitle="Enterprise Geo-Mapping Building Block"
          actions={
            <>
              <LanguageSwitcher />
              <DeviceSwitcher />
              <ThemeSwitcher />
            </>
          }
          variant="minimal"  // For map-focused experience
        />
      }
    >
      <GeoMap />
    </AppShell>
  );
}
```

## 🏗️ Required Layout Components

### 1. AppShell Variant: "fullscreen-map"
```tsx
// Specific για mapping applications
interface FullscreenMapLayout {
  header: React.ReactNode;     // Minimal header
  children: React.ReactNode;   // Map component
  overlay?: React.ReactNode;   // Tools/panels που overlay στον map
  sidebar?: React.ReactNode;   // Collapsible tools sidebar
}
```

### 2. Header Actions Integration
```tsx
// Standardized header actions area
<LayeraHeader
  actions={
    <HeaderActionsGroup>
      <LanguageSwitcher />
      <DeviceSwitcher />
      <ThemeSwitcher />
      <UserMenu />
    </HeaderActionsGroup>
  }
/>
```

### 3. Map Tools Sidebar (Future)
```tsx
// Για μελλοντικά features
<AppShell
  sidebar={
    <MapToolsSidebar>
      <DrawingTools />
      <AreasPanel />
      <LayersPanel />
    </MapToolsSidebar>
  }
>
```

## 📱 Responsive Behavior

### Desktop (>1024px)
- Full header με όλα τα actions
- Sidebar available για tools
- Map takes remaining space

### Tablet (768px-1024px)
- Compact header
- Sidebar overlay mode
- Map optimized για touch

### Mobile (<768px)
- Minimal header
- Bottom sheet για tools
- Full screen map

## 🔄 Migration Steps

### Step 1: Setup Layout Dependencies
```bash
# Install layout package
npm install @layera/layout@workspace:*
```

### Step 2: Create Header Component
```tsx
// apps/layera-geoalert/src/components/GeoHeader.tsx
import { LayeraHeader } from '@layera/layout';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DeviceSwitcher } from '@layera/viewport';

export const GeoHeader: React.FC = () => {
  const { t } = useLayeraTranslation();

  return (
    <LayeraHeader
      title={t('title')}
      subtitle={t('subtitle')}
      variant="minimal"
      actions={
        <>
          <LanguageSwitcher />
          <DeviceSwitcher
            labels={{
              auto: t('auto'),
              mobile: t('mobile'),
              tablet: t('tablet'),
              desktop: t('desktop'),
              overrideActive: t('overrideActive')
            }}
          />
        </>
      }
    />
  );
};
```

### Step 3: Update Main App Component
```tsx
// apps/layera-geoalert/src/App.tsx
import { AppShell } from '@layera/layout';
import { GeoHeader } from './components/GeoHeader';
import { GeoMap } from './components/GeoMap';

export default function App() {
  return (
    <AppShell
      layout="fullscreen-map"
      header={<GeoHeader />}
    >
      <GeoMap />
    </AppShell>
  );
}
```

### Step 4: Remove Custom Layout Code
- Remove custom positioning από GeoMap
- Remove manual responsive logic
- Update CSS classes να χρησιμοποιούν layout tokens

### Step 5: Test Responsive Behavior
- Test σε όλα τα breakpoints
- Verify DeviceSwitcher positioning
- Check LanguageSwitcher functionality

## 🎨 Design Tokens Integration

### Current Custom Styles → Layout Tokens
```css
/* REMOVE: Custom positioning */
.device-switcher {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

/* REPLACE WITH: Layout token based */
.layera-header__actions {
  gap: var(--layera-space-md);
}
```

## 🧪 Testing Checklist

### Functionality Tests
- [ ] LanguageSwitcher changes app language
- [ ] DeviceSwitcher simulation works
- [ ] Map renders correctly in new layout
- [ ] Responsive breakpoints work
- [ ] Theme switching maintains layout

### Visual Tests
- [ ] Header alignment consistent
- [ ] Actions spacing correct
- [ ] Map fills available space
- [ ] Mobile layout usable
- [ ] Tablet layout optimized

### Performance Tests
- [ ] No layout shifts
- [ ] Smooth transitions
- [ ] Map rendering performance maintained

## 📚 Documentation Updates

### Update README
- Document new layout structure
- Update development setup
- Add responsive behavior notes

### Update Component Docs
- Remove custom layout documentation
- Add @layera/layout integration guide
- Update examples

## 🚀 Future Enhancements

### Phase 2: Navigation Structure
```tsx
<AppShell
  sidebar={
    <GeoNavigation>
      <NavItem icon={<MapIcon />} label="Dashboard" />
      <NavItem icon={<AlertIcon />} label="Alerts" />
      <NavItem icon={<SettingsIcon />} label="Settings" />
    </GeoNavigation>
  }
>
```

### Phase 3: Advanced Map Tools
```tsx
<AppShell
  overlay={
    <MapToolsOverlay>
      <DrawingToolsPanel />
      <AreasManagementPanel />
      <LayersControlPanel />
    </MapToolsOverlay>
  }
>
```

## ⚠️ Potential Issues

### 1. Map Container Sizing
- **Issue**: Map needs specific container dimensions
- **Solution**: AppShell provides proper CSS grid layout

### 2. Leaflet Integration
- **Issue**: Leaflet may not resize properly
- **Solution**: Add resize observer στο layout system

### 3. DeviceSwitcher Positioning
- **Issue**: Current fixed positioning
- **Solution**: Integration στο header actions area

## ✅ Success Criteria

- [ ] Consistent header across GeoAlert
- [ ] Proper responsive behavior
- [ ] No functionality regressions
- [ ] Performance maintained
- [ ] Code reduction >30%
- [ ] Documentation updated

---

**Αυτό το πλάνο θα υλοποιηθεί μετά τη δημιουργία του @layera/layout package.**