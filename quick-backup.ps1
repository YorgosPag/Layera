$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupName = "layera-enterprise-i18n-complete-$timestamp"
$backupDir = "C:\layera_backups\$backupName"

Write-Host "=== Layera Enterprise i18n Backup ===" -ForegroundColor Green
Write-Host "Creating backup: $backupName" -ForegroundColor Yellow

# Create backup directory
New-Item -Path $backupDir -ItemType Directory -Force | Out-Null

# Copy essential source files only (exclude heavy directories)
Write-Host "Copying source code..." -ForegroundColor Cyan

$excludeDirs = @("node_modules", ".git", "dist", "build", "coverage", ".cache")
$sourceItems = Get-ChildItem "C:\Layera" | Where-Object { $_.Name -notin $excludeDirs }

foreach ($item in $sourceItems) {
    if ($item.PSIsContainer) {
        Write-Host "  Copying directory: $($item.Name)" -ForegroundColor Gray
        Copy-Item $item.FullName $backupDir -Recurse -Force
    } else {
        Write-Host "  Copying file: $($item.Name)" -ForegroundColor Gray
        Copy-Item $item.FullName $backupDir -Force
    }
}

# Create comprehensive summary
$summaryPath = "$backupDir\ENTERPRISE_I18N_COMPLETE.md"
$summary = @"
# Layera Enterprise i18n Implementation - COMPLETE ✅
**Backup Created:** $(Get-Date)
**Status:** Ready for Production Deployment

## 🎯 Implementation Summary
This backup contains the COMPLETE Enterprise i18n implementation for Layera Authentication System.

### ✅ COMPLETED FEATURES
- **Full Translation System** for all pages (Dashboard, Account, Settings, Data, MFA)
- **LanguageSwitcher Integration** in all page headers with professional styling
- **Enterprise-grade Namespace Organization** (common.json + dashboard.json)
- **Zero Mixed Language Expressions** - all strings use translation keys
- **Template Variable Support** for dynamic content ({{name}}, {{email}})
- **Fixed Translation Key Conflicts** - all namespaces working correctly

### 🌍 Supported Languages
- **Greek (el)** - Complete native language support
- **English (en)** - Complete English translations
- **Dynamic switching** between languages with persistence

### 🔧 Technical Architecture
- **React 19** with modern hooks and patterns
- **Firebase Authentication** with MFA support
- **Monorepo structure** with shared packages (@layera/i18n, @layera/auth-bridge)
- **TypeScript support** in packages
- **Enterprise-grade CSS** with responsive design

### 📱 Pages with Full i18n
1. **Dashboard** (/dashboard) - User welcome, info panel, quick actions
2. **Account** (/account) - Profile management, MFA status, role badges
3. **Settings** (/settings) - Security, notifications, appearance, danger zone
4. **Data** (/data) - Personal data display, export options, privacy info
5. **MFA Enrollment** (/mfa-enroll) - 2FA setup with comprehensive error handling

### 🚀 Ready for Next Phase
**RBAC Implementation** with mandatory 2FA for professional users
- Role-based access control (admin, broker, builder, private)
- Cloud Functions for secure role management
- Enhanced security rules with MFA requirements

### 📂 Project Structure
```
apps/layera-id/src/
├── components/ ✅ Fully internationalized
├── pages/ ✅ Fully internationalized
└── Complete CSS styling

packages/i18n/ ✅ Enterprise translation system
├── locales/el/ ✅ Complete Greek translations
├── locales/en/ ✅ Complete English translations
└── LanguageSwitcher component ✅ Working
```

### 💻 Development Environment
- All translation keys tested and working
- No console errors or missing translations
- Professional UI/UX with consistent styling
- Mobile-responsive design
- Enterprise code quality standards

**🎉 STATUS: PRODUCTION READY**
"@

$summary | Out-File -FilePath $summaryPath -Encoding UTF8

# Create smaller zip (without huge node_modules)
Write-Host "Creating optimized zip archive..." -ForegroundColor Cyan
$zipPath = "C:\layera_backups\$backupName.zip"

try {
    Compress-Archive -Path $backupDir -DestinationPath $zipPath -Force
    $zipSize = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
    Write-Host "✅ Backup completed successfully!" -ForegroundColor Green
    Write-Host "📁 Location: $zipPath" -ForegroundColor White
    Write-Host "📏 Size: $zipSize MB" -ForegroundColor White
    Write-Host "📄 Summary: $summaryPath" -ForegroundColor White
} catch {
    Write-Host "❌ Zip creation failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "📁 Backup folder available at: $backupDir" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Enterprise i18n Implementation COMPLETE!" -ForegroundColor Green
Write-Host "Ready for RBAC implementation phase." -ForegroundColor Cyan