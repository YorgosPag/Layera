# @layera/icons

Enterprise Icon System για το Layera Ecosystem

## Σκοπός

Το `@layera/icons` είναι ένα ενιαίο icon system που εξασφαλίζει συνέπεια στα εικονίδια σε όλες τις Layera εφαρμογές. Παρέχει enterprise-grade λύση με στυλ, μεγέθη και θέματα που ταιριάζουν στο Layera brand.

## Εγκατάσταση

```bash
npm install @layera/icons
```

## 📦 Βασική Χρήση

### Core Icon Component

```tsx
import { Icon } from '@layera/icons';

// Βασική χρήση
<Icon name="home" />

// Με παραμέτρους
<Icon
  name="map"
  size="lg"
  variant="solid"
  theme="primary"
  onClick={() => console.log('Clicked!')}
/>
```

### Προκατασκευασμένα Εικονίδια

```tsx
import { HomeIcon, MapIcon, PhoneIcon } from '@layera/icons';

<HomeIcon size="md" theme="primary" />
<MapIcon variant="outline" theme="success" />
<PhoneIcon size={32} variant="solid" />
```

## Παράμετροι

### Sizes (Μεγέθη)

```tsx
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

// Predefined sizes
'xs' = 12px
'sm' = 16px
'md' = 20px (default)
'lg' = 24px
'xl' = 32px

// Custom size
<Icon name="home" size={40} />
```

### Variants (Στυλ)

```tsx
type IconVariant = 'solid' | 'outline' | 'light' | 'duotone';

<Icon name="home" variant="solid" />     // Γεμάτο
<Icon name="home" variant="outline" />   // Περίγραμμα (default)
<Icon name="home" variant="light" />     // Λεπτό περίγραμμα
<Icon name="home" variant="duotone" />   // Δύο χρώματα
```

### Themes (Χρώματα)

```tsx
type IconTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

<Icon name="alert" theme="danger" />     // Κόκκινο
<Icon name="check" theme="success" />    // Πράσινο
<Icon name="info" theme="info" />        // Μπλε
<Icon name="home" theme="primary" />     // Layera μπλε (default για εμφάσεις)
```

## 📚 Διαθέσιμα Εικονίδια

### Navigation Icons
- `HomeIcon` - Αρχική σελίδα
- `MenuIcon` - Μενού
- `ArrowLeftIcon` / `ArrowRightIcon` - Βέλη
- `CloseIcon` - Κλείσιμο
- `SearchIcon` - Αναζήτηση
- `SettingsIcon` - Ρυθμίσεις
- `MoreIcon` - Περισσότερα
- `RefreshIcon` - Ανανέωση

### Map & Geographic Icons
- `MapIcon` - Χάρτης
- `LocationIcon` - Τοποθεσία
- `CompassIcon` - Πυξίδα
- `LayersIcon` - Επίπεδα χάρτη
- `RouteIcon` - Διαδρομή
- `ZoomInIcon` / `ZoomOutIcon` - Zoom
- `CrosshairsIcon` - Στόχευση GPS
- `GlobeIcon` - Υδρόγειος
- `AlertTriangleIcon` - Προειδοποίηση
- `SatelliteIcon` - Δορυφόρος

### Device Icons
- `PhoneIcon` / `SmartphoneIcon` - Κινητά
- `TabletIcon` - Tablet
- `MonitorIcon` / `LaptopIcon` - Υπολογιστές
- `WatchIcon` - Έξυπνο ρολόι
- `TvIcon` - Τηλεόραση
- `RotateIcon` - Περιστροφή οθόνης

### Action Icons
- `SaveIcon` - Αποθήκευση
- `EditIcon` - Επεξεργασία
- `DeleteIcon` - Διαγραφή
- `PlusIcon` - Προσθήκη
- `DownloadIcon` / `UploadIcon` - Λήψη/Αποστολή
- `CopyIcon` - Αντιγραφή
- `ShareIcon` - Κοινοποίηση
- `PrintIcon` - Εκτύπωση
- `UndoIcon` / `RedoIcon` - Αναίρεση/Επανάληψη

## 💼 Enterprise Features

### Accessibility
- Αυτόματα `aria-label` attributes
- Keyboard navigation support (Enter/Space)
- Screen reader friendly

### Performance
- Tree-shakable exports
- Optimized SVG paths
- Zero runtime dependencies

### Consistency
- Ενιαία Layera brand colors
- Συνεπή μεγέθη και spacing
- Standardized naming conventions

## Advanced Usage

### Custom Styling

```tsx
<Icon
  name="home"
  className="la-component"
  style={{
    transform: 'rotate(45deg)',
    transition: 'all 0.3s ease'
  }}
/>
```

### Interactive Icons

```tsx
<Icon
  name="settings"
  onClick={() => setShowSettings(true)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') setShowSettings(true);
  }}
  tabIndex={0}
  role="button"
  aria-label="Άνοιγμα ρυθμίσεων"
/>
```

### Dynamic Themes

```tsx
const getThemeByStatus = (status: string): IconTheme => {
  switch(status) {
    case 'online': return 'success';
    case 'warning': return 'warning';
    case 'error': return 'danger';
    default: return 'neutral';
  }
};

<Icon
  name="status-indicator"
  theme={getThemeByStatus(userStatus)}
/>
```

## CSS Classes

Κάθε εικονίδιο παράγει τις εξής CSS κλάσεις:

```css
.layera-icon                    /* Base class */
.layera-icon--{name}           /* Icon specific */
.layera-icon--{variant}        /* Variant specific */
.layera-icon--{theme}          /* Theme specific */
.layera-icon--size-{size}      /* Size specific */
.layera-icon--clickable        /* When onClick is provided */
```

## 🌍 Παγκόσμια Χρήση

Το icon system είναι σχεδιασμένο για χρήση σε όλες τις Layera εφαρμογές:

- **Layera ID** - Authentication & Profile
- **Layera GeoAlert** - Maps & Geographic Alerts
- **Layera Viewport** - Device Testing & Responsive Design
- Μελλοντικές Layera εφαρμογές

## 🔗 Integration

### With Layera Viewport

```tsx
import { DeviceSimulator } from '@layera/viewport';
import { PhoneIcon, TabletIcon, MonitorIcon } from '@layera/icons';

<DeviceSimulator>
  <PhoneIcon theme="primary" />
  <TabletIcon theme="primary" />
  <MonitorIcon theme="primary" />
</DeviceSimulator>
```

### With React Routers

```tsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '@layera/icons';

const navigate = useNavigate();

<ArrowLeftIcon
  onClick={() => navigate(-1)}
  theme="primary"
  size="lg"
/>
```

## 📝 License

MIT License - Layera Team