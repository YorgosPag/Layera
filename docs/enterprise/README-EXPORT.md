# 📦 Layera Code Export Scripts

Αυτοί οι scripts σου επιτρέπουν να εξάγεις ολόκληρο τον κώδικα του project σε ένα ZIP αρχείο, εκτός από τα άχρηστα αρχεία.

## 🚀 Χρήση

### PowerShell Script (Προτεινόμενο)
```powershell
.\export-code.ps1
```

### Batch Script (Εναλλακτικό)
```cmd
export-code.bat
```

## 📁 Τι περιλαμβάνεται

✅ **Συμπεριλαμβάνεται:**
- Όλος ο source code (src/, pages/, components/)
- Configuration αρχεία (package.json, tsconfig.json, etc.)
- Firebase functions code
- Admin tools scripts
- Documentation (docs/, README.md)
- Security rules (firestore.rules, storage.rules)

❌ **Αποκλείεται:**
- `node_modules/` φάκελοι
- Build artifacts (`dist/`, `build/`, `lib/`)
- Log αρχεία (`*.log`, `npm-debug.log*`)
- Cache φάκελοι (`.cache/`, `.temp/`)
- Environment files (`.env.local`, `.env.production`)
- Git history (`.git/`)
- Temporary files (`*.tmp`, `*.temp`)
- Archive files (`*.zip`, `*.tar.gz`, `*.rar`)

## 📋 Λεπτομέρειες

- **Output**: `C:\layera_backups\CATEGORY_YYYYMMDD_HHMMSS_TITLE.zip`
- **Compression**: Optimal compression
- **Εκτιμώμενο μέγεθος**: 2-5 MB (χωρίς node_modules)
- **Χρόνος εκτέλεσης**: 10-30 δευτερόλεπτα

## 🔧 Προσαρμογή

Για να αλλάξεις τον φάκελο προορισμού, επεξεργάσου το script:

**PowerShell:**
```powershell
.\export-code.ps1 -OutputPath "C:\MyCustomPath" -Category "UI" -Title "Dashboard-Components"
```

**Batch:**
Άλλαξε τις γραμμές:
- `set OUTPUT_DIR=C:\layera_backups`
- `set CATEGORY=RBAC`
- `set TITLE=Authentication-System`

## 📊 Τι περιέχει το ZIP

Η δομή του ZIP θα είναι:
```
RBAC_YYYYMMDD_HHMMSS_Authentication-System.zip
├── apps/
│   └── layera-id/
│       ├── src/
│       ├── package.json
│       └── ...
├── functions/
│   ├── src/
│   ├── package.json
│   └── ...
├── tools/
│   └── admin/
├── docs/
├── firebase.json
├── firestore.rules
├── VERSION-INFO.md
└── ...
```

## 🎯 Χρήσιμο για:
- Backup του κώδικα
- Sharing με developers
- Version archiving
- Code review
- Migration σε άλλο environment