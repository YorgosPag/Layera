$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupName = "layera-backup-$timestamp"
$backupDir = "C:\layera_backups\$backupName"
$zipPath = "C:\layera_backups\$backupName.zip"

Write-Host "Creating backup: $backupName"

# Ensure backup directory exists
New-Item -Path "C:\layera_backups" -ItemType Directory -Force | Out-Null
New-Item -Path $backupDir -ItemType Directory -Force | Out-Null

# Copy main source files
Write-Host "Copying source code..."
Copy-Item -Path "C:\Layera\*" -Destination $backupDir -Recurse -Force -Exclude @("node_modules", ".git", "dist", "build", "*.log", "*.tmp")

# Create summary
$summaryPath = "$backupDir\BACKUP_SUMMARY.md"
@"
# Layera Backup Summary
Generated: $(Get-Date)

## Enterprise i18n Implementation Completed ✅
- Complete translation system for Dashboard, Account, Settings, Data, MFA pages
- LanguageSwitcher integration in all headers
- Enterprise-grade namespace organization
- Fixed mixed language expressions
- Template variable support for dynamic content

## Technical Implementation
- React 19 with modern hooks and patterns
- Firebase Authentication with MFA
- Monorepo architecture with shared packages
- TypeScript support in packages
- Responsive design with modern CSS

## Ready for RBAC Implementation 🚀
Next step: Role-based access control with mandatory 2FA for professional users

## Commit Information
Latest commit: Complete Enterprise i18n Implementation + Translation System
Status: Ready for production deployment
"@ | Out-File -FilePath $summaryPath -Encoding UTF8

# Create zip
Write-Host "Creating zip archive..."
Compress-Archive -Path $backupDir -DestinationPath $zipPath -Force

Write-Host "Backup completed successfully!"
Write-Host "Location: $zipPath"
Write-Host "Summary: $summaryPath"