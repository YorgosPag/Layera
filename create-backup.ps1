# Simple backup script for Layera project
param(
    [string]$OutputPath = "C:\layera_backups"
)

$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$Category = "RBAC-Enterprise"
$Title = "Documentation-Complete"
$ZipName = "$Category`_$Timestamp`_$Title.zip"
$ZipPath = Join-Path $OutputPath $ZipName
$TempDir = Join-Path $env:TEMP "layera_export_$Timestamp"

Write-Host "Creating backup: $ZipName" -ForegroundColor Green

# Create temp directory
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

# Copy files excluding unnecessary directories
Write-Host "Copying files..." -ForegroundColor Yellow
robocopy "C:\layera" $TempDir /E /XD node_modules .git dist build lib .next .nuxt coverage .nyc_output logs .cache .temp .tmp /XF *.log *.cache npm-debug.log* yarn-debug.log* pnpm-debug.log* .DS_Store Thumbs.db *.tmp *.temp .env.local .env.production firebase-debug.log* *.zip *.tar.gz *.rar pglite-debug.log /R:0 /W:0 /NFL /NDL /NJH /NJS /NC /NS /NP

# Get git information
$GitCommits = & git log --oneline -6
$GitStatus = & git status --porcelain

# Create version info
$VersionInfo = @"
# Layera Codebase Export

## Version Information
- **Category**: $Category
- **Title**: $Title
- **Export Date**: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")
- **Timestamp**: $Timestamp

## Git Repository Status
### Recent Commits:
$($GitCommits -join "`n")

### Working Directory Status:
$($GitStatus -join "`n")

## Project Summary
- Complete RBAC + MFA authentication system
- Enterprise documentation suite
- Firebase backend infrastructure
- React frontend with security components
- Admin tools and automation scripts

## Features Implemented:
- Role-Based Access Control (private/broker/builder/admin)
- Multi-Factor Authentication with SMS
- Email verification enforcement
- Firebase security rules
- Comprehensive API documentation
- Production deployment guides
- Backup automation system

Generated: $(Get-Date)
"@

$VersionInfo | Out-File -FilePath (Join-Path $TempDir "VERSION-INFO.md") -Encoding UTF8

# Create ZIP
Write-Host "Creating ZIP archive..." -ForegroundColor Yellow
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($TempDir, $ZipPath, "Optimal", $false)

# Cleanup
Remove-Item $TempDir -Recurse -Force -ErrorAction SilentlyContinue

# Report results
$ZipSize = (Get-Item $ZipPath).Length
$ZipSizeMB = [math]::Round($ZipSize / 1MB, 2)

Write-Host "Backup created successfully!" -ForegroundColor Green
Write-Host "Location: $ZipPath" -ForegroundColor Cyan
Write-Host "Size: $ZipSizeMB MB" -ForegroundColor Cyan

# Open folder
Start-Process "explorer.exe" -ArgumentList $OutputPath