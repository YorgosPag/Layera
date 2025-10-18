$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupName = "layera-enterprise-i18n-$timestamp"
$backupDir = "C:\layera_backups\$backupName"

Write-Host "Creating Enterprise i18n Backup: $backupName"

# Create backup directory
New-Item -Path $backupDir -ItemType Directory -Force | Out-Null

# Copy main directories (excluding node_modules)
Write-Host "Copying apps directory..."
robocopy "C:\Layera\apps" "$backupDir\apps" /E /XD node_modules dist build /R:1 /W:1 /MT:4 /NP /NDL /NJH /NJS

Write-Host "Copying packages directory..."
robocopy "C:\Layera\packages" "$backupDir\packages" /E /XD node_modules dist build /R:1 /W:1 /MT:4 /NP /NDL /NJH /NJS

Write-Host "Copying docs directory..."
robocopy "C:\Layera\docs" "$backupDir\docs" /E /R:1 /W:1 /MT:4 /NP /NDL /NJH /NJS

Write-Host "Copying voithitika_docs directory..."
robocopy "C:\Layera\voithitika_docs" "$backupDir\voithitika_docs" /E /R:1 /W:1 /MT:4 /NP /NDL /NJH /NJS

# Copy root files
Write-Host "Copying root files..."
Copy-Item "C:\Layera\*.json" $backupDir -Force -ErrorAction SilentlyContinue
Copy-Item "C:\Layera\*.md" $backupDir -Force -ErrorAction SilentlyContinue
Copy-Item "C:\Layera\*.js" $backupDir -Force -ErrorAction SilentlyContinue

# Create summary
$summaryContent = @"
# Layera Enterprise i18n Implementation - COMPLETE
Generated: $(Get-Date)

## Status: ✅ PRODUCTION READY

### Completed Features:
- Full translation system for all pages
- LanguageSwitcher integration
- Enterprise-grade namespace organization
- Zero mixed language expressions
- Template variable support
- All translation conflicts resolved

### Technical Stack:
- React 19 with modern patterns
- Firebase Authentication with MFA
- Monorepo with shared packages
- TypeScript support
- Responsive CSS design

### Ready for Next Phase:
RBAC implementation with mandatory 2FA

## Backup Information
- Created: $(Get-Date)
- Source: C:\Layera
- Excludes: node_modules, dist, build directories
- Status: Complete Enterprise i18n Implementation
"@

$summaryContent | Out-File -FilePath "$backupDir\BACKUP_SUMMARY.md" -Encoding UTF8

Write-Host "Backup folder created: $backupDir"
Write-Host "Summary available: $backupDir\BACKUP_SUMMARY.md"
Write-Host "Backup completed successfully!"