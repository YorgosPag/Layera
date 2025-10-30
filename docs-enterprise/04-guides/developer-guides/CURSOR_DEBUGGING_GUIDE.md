# 🐛 Cursor Debugging Guide - Leaflet & Info Panel Conflicts

## 🎯 Σκοπός
Διάγνωση και επίλυση cursor conflicts μεταξύ Leaflet χάρτη και info panels που προκαλούν αναβοσβήνει ("παλεύουν 2-3 εικονίδια").

## 🔧 Εφαρμοσμένες Λύσεις

### ✅ 1. Διαγνωστικό Module (`cursorDebug.ts`)
- Comprehensive logging όλων των cursor changes
- Monitoring Leaflet DOM mutations
- Stack trace για dynamic cursor assignments
- Live element stack analysis

### ✅ 2. Leaflet Event Blocking
```typescript
// Όταν hover στο panel → Leaflet δεν λαμβάνει events
mapElement.style.pointerEvents = 'none';
```

### ✅ 3. Leaflet Interaction Disabling
```typescript
// Όταν hover στο panel → όλες οι Leaflet interactions σταματούν
leafletMap.dragging?.disable();
leafletMap.scrollWheelZoom?.disable();
// κλπ...
```

### ✅ 4. Scoped CSS Override
```css
.info-panel-stable { cursor: default; }
.info-panel-stable * { cursor: inherit; }
.info-panel-stable button { cursor: inherit !important; }
```

### ✅ 5. Live Overlap Debugging
- Real-time element stack logging
- `window.__who(x, y)` helper function

## 🚀 Πώς να Ενεργοποιήσεις το Debugging

### Βήμα 1: Enable Debug Mode
```javascript
// Στην κονσόλα του browser:
window.__LAYERA_DEBUG_CURSOR = true;

// Refresh το panel ή την page
```

### Βήμα 2: Παρακολούθησε τα Logs
```javascript
// Θα δεις logs σαν αυτά:
[cursor] mousemove { target: "DIV", cursor: "default", stack: [...] }
[cursor] panel enter → map pointer-events:none
[cursor] body change { class: "leaflet-container", style: "..." }
[stack] ["info-panel-stable", "body", "html"]
```

### Βήμα 3: Manual Analysis
```javascript
// Χρησιμοποίησε το helper function:
window.__who(300, 400)  // coordinates του mouse
// Returns: Array με τα elements στο σημείο

// Για live monitoring:
document.addEventListener('click', e =>
  console.log('Element stack:', window.__who(e.clientX, e.clientY))
);
```

## 🎯 Τι να Ψάχνεις στα Logs

### 🔍 Cursor Conflicts
```
[cursor] setProperty { value: "pointer", priority: undefined }
[cursor] style.cursor= "default"
```
Αν βλέπεις εναλλαγή pointer/default → conflict detected!

### 🔍 Leaflet Interference
```
[cursor] body change { class: "leaflet-dragging leaflet-touch" }
[cursor] map change { style: "cursor: grabbing" }
```
Αν το Leaflet αλλάζει cursor ενώ είσαι στο panel → Leaflet interference!

### 🔍 Element Overlap
```
[stack] ["close-button", "info-panel-stable", "leaflet-container", "body"]
```
Αν βλέπεις leaflet-container στο stack όταν hover panel → overlap issue!

## 🛠️ Troubleshooting

### Panel εξακολουθεί να αναβοσβήνει;

1. **Ελέγξε τα logs** για Leaflet interference:
   ```javascript
   // Φίλτρα μόνο cursor-related events:
   console.log = (...args) => {
     if (args[0] === '[cursor]') originalConsole.log(...args);
   };
   ```

2. **Ελέγξε z-index conflicts**:
   ```javascript
   // Δες όλα τα z-index values:
   document.querySelectorAll('*').forEach(el => {
     const z = window.getComputedStyle(el).zIndex;
     if (z !== 'auto') console.log(el, 'z-index:', z);
   });
   ```

3. **Ελέγξε για invisible overlays**:
   ```javascript
   // Δες αν υπάρχουν αόρατα elements στο stack:
   window.__who(x, y).forEach(html => {
     if (html.includes('opacity: 0') || html.includes('visibility: hidden')) {
       console.warn('Invisible overlay detected:', html);
     }
   });
   ```

## 🎯 Expected Results

**Πριν την επιδιόρθωση:**
- Cursor αναβοσβήνει μεταξύ pointer/default/text
- Logs δείχνουν εναλλαγή cursor values
- Panel "τρεμοπαίζει" στο hover

**Μετά την επιδιόρθωση:**
- Σταθερός `default` cursor σε όλο το panel
- Μόνο `[cursor] panel enter/leave` logs
- Smooth panel interaction χωρίς flickering

## 🔧 Για Developers

### Disable Debugging
```javascript
window.__LAYERA_DEBUG_CURSOR = false;
// Refresh page για cleanup
```

### Extend Debugging
```typescript
// Προσθήκη custom cursor tracking:
installCursorDebug({
  panelSelector: '.my-custom-panel',
  mapSelector: '.my-map-container',
  throttleMs: 50  // Higher frequency logging
});
```

### Production Safety
```typescript
// Το debugging ενεργοποιείται μόνο με:
if (!window.__LAYERA_DEBUG_CURSOR) return;

// Κανένα performance impact σε production
```