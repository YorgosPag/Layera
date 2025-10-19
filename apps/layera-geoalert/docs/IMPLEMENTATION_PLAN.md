# Layera GeoAlert V1 Implementation Plan
**Δημιουργία:** 2025-10-17
**Στόχος:** Ελαφρύ monorepo app για property geo alerts με Leaflet

## 🎯 Στόχοι V1
- **Μόνο "Ζητώ ακίνητο"** functionality
- **3-βήματα wizard:** Σκοπός → Τοποθεσία → Αποθήκευση
- **Guest mode:** δοκιμή χάρτη χωρίς αποθήκευση
- **Save:** απαιτεί verified email μόνο

## 📁 Δομή Φακέλων (Ελαφρό Monorepo)
```
apps/layera-geoalert/
├── package.json           ✅ Δικό του build system
├── vite.config.ts         ✅ Δική του διαμόρφωση
├── tsconfig.json          ✅ Δικό του TypeScript config
├── .env.example           ✅ Δικές του μεταβλητές περιβάλλοντος
├── README.md              ✅ Δικές του οδηγίες
├── public/
│   └── index.html
└── src/
    ├── main.tsx           ✅ Entry point με AuthProvider
    ├── App.tsx            ✅ Router και routes
    ├── lib/
    │   └── firebase.ts    ✅ Firestore config (EU region)
    ├── pages/
    │   ├── Home.tsx       ✅ Χάρτης + "Δοκίμασε χωρίς λογαριασμό"
    │   ├── NewArea.tsx    ✅ Wizard 3 βημάτων
    │   └── MyAreas.tsx    ✅ Λίστα περιοχών χρήστη
    ├── components/
    │   ├── MapCanvas.tsx  ✅ Leaflet + leaflet-draw
    │   └── SaveGuard.tsx  ✅ RequireVerified wrapper
    └── data/
        └── areas.ts       ✅ Firestore CRUD operations
```

## 🛠 Τεχνικό Stack
- **Framework:** React 19 + Vite + TypeScript
- **Χάρτης:** Leaflet + leaflet-draw (δωρεάν)
- **Auth:** @layera/auth-bridge (setAuth/AuthProvider/RequireVerified)
- **Database:** Firestore (EU region)
- **Security:** email_verified == true για writes

## 📦 Dependencies
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "leaflet": "^1.9.4",
    "leaflet-draw": "^1.0.4",
    "firebase": "^10.0.0",
    "@layera/auth-bridge": "workspace:*"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.7",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## 🔄 Ροές Εφαρμογής

### 1. Home Page (/)
- **UI:** Χάρτης σε πλήρη οθόνη
- **Κουμπί:** "Σχεδίασε περιοχή" → /new-area
- **Guest:** Μπορεί να σχεδιάσει χωρίς αποθήκευση
- **Functionality:** Βασική εξερεύνηση χάρτη

### 2. NewArea Wizard (/new-area)
**Βήμα 1:** Σκοπός
- Προεπιλογή: "Ζητώ ακίνητο"
- Προαιρετικά φίλτρα: τύπος (ενοικίαση/αγορά), εύρος τιμής, εμβαδό

**Βήμα 2:** Τοποθεσία
- Leaflet χάρτης με drawing tools
- Επιλογές: Point/Circle/Polygon
- Preview γεωμετρίας

**Βήμα 3:** Περίληψη & Αποθήκευση
- Review επιλογών
- `<RequireVerified fallback={<LoginButton />}>` για save
- Redirect στο /my-areas μετά την αποθήκευση

### 3. MyAreas (/my-areas)
- **Λίστα:** Όλες οι περιοχές του χρήστη
- **Κάθε εγγραφή:** όνομα, γεωμετρία preview, φίλτρα, active toggle, delete button
- **Actions:** Ενεργοποίηση/απενεργοποίηση, διαγραφή

## 🗄 Firestore Schema
**Collection:** `users/{uid}/areas/{areaId}`

```typescript
interface AreaDocument {
  name: string;                    // "Κέντρο Θεσσαλονίκης"
  geometry: {
    type: "Point" | "Circle" | "Polygon";
    coords: number[];              // [lat, lng] ή array
    radius?: number;               // για Circle μόνο
  };
  filters: {
    type: "rent" | "buy";
    priceMin: number;
    priceMax: number;
    sqmMin: number;
    sqmMax: number;
  };
  active: boolean;
  createdAt: FirebaseTimestamp;
}
```

## 🔒 Security Rules
```javascript
// Firestore Security Rules
match /users/{userId}/areas/{areaId} {
  allow read, write: if request.auth != null
    && request.auth.uid == userId
    && request.auth.token.email_verified == true;
}
```

## 🚀 Implementation Steps

### ✅ ΦΑΣΗ 0: Enterprise Setup & Validation (ΟΛΟΚΛΗΡΩΘΗΚΕ)
**Ολοκληρώθηκε στις:** 2025-10-17
**Κατάσταση:** ✅ COMPLETED

1. ✅ **Monorepo Integration:** Δημιουργία ανεξάρτητου app στο existing monorepo
2. ✅ **Enterprise Architecture:** TypeScript path mapping για @layera packages
3. ✅ **Package Configuration:** Δικό του package.json με εξαρτήσεις
4. ✅ **Development Environment:** Vite configuration με React plugin
5. ✅ **i18n System:** Πλήρης διεθνοποίηση (ελληνικά/αγγλικά) με @layera/i18n LEGO system
6. ✅ **Language Switching:** LanguageSwitcher component με @layera/i18n LEGO system
7. ✅ **Cross-App Navigation:** Links προς άλλα apps (layera-id)
8. ✅ **Port Management:** Τρέχει στο localhost:3008
9. ✅ **TypeScript Configuration:** Strict mode με enterprise patterns
10. ✅ **Hot Module Replacement:** Development server με auto-reload

**Τεχνικά Επιτεύγματα:**
- Enterprise TypeScript path mapping (αντί για npm workspace dependencies)
- Proper React 18+ με @vitejs/plugin-react configuration
- Modular i18n system με μεταφράσεις σε δύο γλώσσες
- Cross-app navigation demonstration (port 3008 → port 3001)
- Independent app architecture με δικό του build system

**Επόμενο Βήμα:** ΦΑΣΗ 1 (Θα ξεκινήσει μετά την ενημέρωση documentation)

### Φάση 1: Core Components & Firebase Setup
1. firebase.ts configuration (EU region)
2. MapCanvas.tsx με Leaflet integration
3. TypeScript interfaces για Firestore schema
4. SaveGuard.tsx για auth protection

### Φάση 2: Core Components
1. firebase.ts configuration
2. MapCanvas.tsx με Leaflet integration
3. SaveGuard.tsx για auth protection

### Φάση 3: Pages Implementation
1. Home.tsx με βασικό χάρτη
2. NewArea.tsx wizard implementation
3. MyAreas.tsx λίστα και management

### Φάση 4: Data Layer
1. areas.ts Firestore operations
2. Error handling
3. Loading states

### Φάση 5: Integration & Testing
1. AuthProvider integration στο main.tsx
2. App.tsx routing setup
3. Guest mode testing
4. Auth flow testing
5. Save functionality testing

## ✅ Acceptance Criteria
- ✅ Guest μπορεί να σχεδιάσει χωρίς save
- ✅ Login + verified email → μπορεί save
- ✅ Λίστα περιοχών με toggle/delete
- ✅ Καμία sharing ή επαγγελματική λειτουργία
- ✅ Τρέχει με `npm --workspace apps/layera-geoalert run dev`

## 🎯 Success Metrics
- Ανεξάρτητο app που τρέχει στο δικό του port
- Zero dependencies από άλλα apps (εκτός @layera/auth-bridge)
- Πλήρης guest functionality
- Ασφαλής αποθήκευση μόνο για verified users
- Καθαρό UI με Leaflet χάρτες

---
**Note:** Αυτό το app θα είναι πλήρως ανεξάρτητο στο monorepo, με δικό του package.json, build system, και development server.