# Export Layera Code Script
# Συλλέγει όλον τον κώδικα εκτός από node_modules και άχρηστα αρχεία

param(
    [string]$OutputPath = "C:\layera_backups",
    [string]$Category = "RBAC",
    [string]$Title = "Authentication-System"
)

Write-Host "🚀 Εκκίνηση export του Layera codebase..." -ForegroundColor Green

# Ορισμός φακέλων και αρχείων που θα αγνοηθούν
$ExcludeFolders = @(
    "node_modules",
    ".git",
    "dist",
    "build",
    "lib",
    ".next",
    ".nuxt",
    "coverage",
    ".nyc_output",
    "logs",
    "*.log",
    ".cache",
    ".temp",
    ".tmp"
)

$ExcludeFiles = @(
    "*.log",
    "*.cache",
    "npm-debug.log*",
    "yarn-debug.log*",
    "pnpm-debug.log*",
    ".DS_Store",
    "Thumbs.db",
    "*.tmp",
    "*.temp",
    ".env.local",
    ".env.production",
    "firebase-debug.log*",
    "*.zip",
    "*.tar.gz",
    "*.rar"
)

# Δημιουργία timestamp για το όνομα του αρχείου
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$ZipName = "$Category`_$Timestamp`_$Title.zip"
$ZipPath = Join-Path $OutputPath $ZipName

# Έλεγχος αν υπάρχει ο φάκελος προορισμού
if (-not (Test-Path $OutputPath)) {
    Write-Host "❌ Ο φάκελος $OutputPath δεν υπάρχει!" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Συλλογή αρχείων από: C:\layera" -ForegroundColor Cyan
Write-Host "📦 Δημιουργία zip: $ZipPath" -ForegroundColor Cyan

# Δημιουργία προσωρινού φακέλου
$TempDir = Join-Path $env:TEMP "layera_export_$Timestamp"
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

try {
    # Συλλογή αρχείων με αποκλεισμό των άχρηστων
    Write-Host "📋 Συλλογή αρχείων..." -ForegroundColor Yellow

    # Δημιουργία exclude pattern για robocopy
    $ExcludeDirs = $ExcludeFolders -join " "
    $ExcludeFilePatterns = $ExcludeFiles -join " "

    # Χρήση robocopy για αντιγραφή με εξαιρέσεις
    Write-Host "📂 Αντιγραφή αρχείων (χωρίς node_modules, logs, κλπ)..." -ForegroundColor Yellow

    $RobocopyArgs = @(
        "C:\layera",
        $TempDir,
        "/E",           # Copy subdirectories including empty ones
        "/XD",          # Exclude directories
        $ExcludeFolders,
        "/XF",          # Exclude files
        $ExcludeFiles,
        "/R:0",         # No retries
        "/W:0",         # No wait between retries
        "/MT:8",        # Multi-threaded
        "/NFL",         # No file list
        "/NDL",         # No directory list
        "/NJH",         # No job header
        "/NJS",         # No job summary
        "/NC",          # No class
        "/NS",          # No size
        "/NP"           # No progress
    )

    $Result = & robocopy @RobocopyArgs 2>&1

    # Robocopy exit codes: 0-7 are success, 8+ are errors
    if ($LASTEXITCODE -gt 7) {
        Write-Host "⚠️  Προειδοποίηση κατά την αντιγραφή (Exit code: $LASTEXITCODE)" -ForegroundColor Yellow
    }

    # Δημιουργία αρχείου πληροφοριών έκδοσης
    Write-Host "📄 Δημιουργία αρχείου πληροφοριών έκδοσης..." -ForegroundColor Yellow
    $VersionInfoPath = Join-Path $TempDir "VERSION-INFO.md"
    $VersionContent = @"
# 📦 Layera Codebase Export

## 🏷️ Στοιχεία Έκδοσης
- **Κατηγορία**: $Category
- **Τίτλος**: $Title
- **Ημερομηνία Export**: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
- **Timestamp**: $Timestamp

## 📝 Περιγραφή
Αυτό το αρχείο περιέχει την έκδοση του Layera codebase που εξήχθη στις $(Get-Date -Format "dd/MM/yyyy HH:mm:ss").

### 🎯 Τι περιλαμβάνεται σε αυτήν την έκδοση:
- Σύστημα RBAC (Role-Based Access Control)
- Υποχρεωτικό 2FA για broker/builder/admin ρόλους
- Firebase Authentication με custom claims
- Firebase Cloud Functions για διαχείριση ρόλων
- React UI components για έλεγχο πρόσβασης
- Security rules για Firestore
- Testing infrastructure με Vitest + RTL
- Admin tools scripts για διαχείριση χρηστών

### 🔧 Τεχνολογίες:
- React 19.1.1
- Firebase 12.4.0
- Vite 7.1.7
- Tailwind CSS 4.1.14
- Vitest 3.2.4
- TypeScript

### 📂 Δομή Project:
```
layera/
├── apps/layera-id/          # Main React application
├── functions/               # Firebase Cloud Functions
├── tools/admin/            # Admin management scripts
├── docs/                   # Documentation
├── firestore.rules         # Security rules
└── export scripts          # Backup automation
```

### 🚀 Τρέχουσες λειτουργίες:
- ✅ Email verification απαιτείται για όλους τους χρήστες
- ✅ Ρόλοι: private, broker, builder, admin
- ✅ 2FA υποχρεωτικό για broker/builder/admin
- ✅ Custom claims στο Firebase
- ✅ Secure API endpoints με έλεγχο δικαιωμάτων
- ✅ UI components για role display και MFA enrollment

### 📋 Επόμενα βήματα για deployment:
1. Upgrade Firebase σε Blaze plan για Cloud Functions
2. Configure Email/Password + Phone Auth στο Firebase Console
3. Setup Firebase Storage για storage rules
4. Deploy functions: `cd functions && npm run deploy`
5. Run tests: `npm run test`

---
**Export Date**: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
**Generated by**: Layera Export Script v1.0
"@

    # Αποθήκευση με UTF-8 encoding για σωστή εμφάνιση ελληνικών
    $VersionContent | Out-File -FilePath $VersionInfoPath -Encoding UTF8

    # Δημιουργία ZIP αρχείου
    Write-Host "🗜️  Δημιουργία ZIP αρχείου..." -ForegroundColor Yellow

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($TempDir, $ZipPath, "Optimal", $false)

    # Έλεγχος μεγέθους
    $ZipSize = (Get-Item $ZipPath).Length
    $ZipSizeMB = [math]::Round($ZipSize / 1MB, 2)

    Write-Host "✅ Επιτυχής δημιουργία ZIP!" -ForegroundColor Green
    Write-Host "📍 Τοποθεσία: $ZipPath" -ForegroundColor Green
    Write-Host "📏 Μέγεθος: $ZipSizeMB MB" -ForegroundColor Green

    # Εμφάνιση περιεχομένων
    Write-Host "`n📋 Περιεχόμενα που συμπεριλήφθηκαν:" -ForegroundColor Cyan
    $Items = Get-ChildItem $TempDir -Recurse | Group-Object Extension | Sort-Object Count -Descending
    foreach ($Item in $Items[0..9]) {  # Top 10 file types
        $Ext = if ($Item.Name) { $Item.Name } else { "(no extension)" }
        Write-Host "   $Ext : $($Item.Count) αρχεία" -ForegroundColor White
    }

    # Άνοιγμα φακέλου backups
    Write-Host "`n🔗 Άνοιγμα φακέλου backups..." -ForegroundColor Cyan
    Start-Process "explorer.exe" -ArgumentList $OutputPath

} catch {
    Write-Host "❌ Σφάλμα: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} finally {
    # Καθαρισμός προσωρινού φακέλου
    if (Test-Path $TempDir) {
        Write-Host "🧹 Καθαρισμός προσωρινών αρχείων..." -ForegroundColor Gray
        Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "`n🎉 Ολοκληρώθηκε με επιτυχία!" -ForegroundColor Green
Write-Host "Το αρχείο $ZipName είναι έτοιμο στον φάκελο C:\layera_backups." -ForegroundColor Green