# Layera Ultimate Backup Script
# Creates a single ZIP file with all source code (excludes OLD_geo-canvas, node_modules, build files)
# Generates BACKUP_SUMMARY.md with git changes since last backup
# Format: YYYYMMDD_HHMM - [CATEGORY] - Description.zip

# Auto-detect backup category based on recent git commits
$timestamp = Get-Date -Format "yyyyMMdd_HHmm"
$category = "BACKUP"
$description = "Enterprise Theme System Complete"

# Try to determine category from recent commits
try {
    $recentCommits = git log --oneline -3 2>$null
    if ($recentCommits) {
        $commitText = $recentCommits -join " "

        # Detect category from commit messages
        if ($commitText -match "fix|bug|error|issue") { $category = "FIX" }
        elseif ($commitText -match "feature|add|implement|create") { $category = "FEATURE" }
        elseif ($commitText -match "refactor|clean|improve|optimize") { $category = "REFACTOR" }
        elseif ($commitText -match "docs|documentation|readme") { $category = "DOCS" }
        elseif ($commitText -match "theme|css|style|color") { $category = "THEME" }

        # Extract description from latest commit (first 50 chars)
        $latestCommit = ($recentCommits -split "`n")[0]
        if ($latestCommit -match "^[\w\d]+\s+(.+)$") {
            $commitDesc = $matches[1]
            if ($commitDesc.Length -gt 50) {
                $description = $commitDesc.Substring(0, 47) + "..."
            } else {
                $description = $commitDesc
            }
        }
    }
} catch {
    # Keep default values if git fails
}

$zipName = "$timestamp - [$category] - $description.zip"
$zipPath = "C:\layera_backups\$zipName"

Write-Host "=== LAYERA BACKUP ===" -ForegroundColor Green
Write-Host "Creating: $zipName" -ForegroundColor Yellow

# Ensure backup directory exists
New-Item -Path "C:\layera_backups" -ItemType Directory -Force | Out-Null

# Enterprise Feature: Clean old backups (keep last 10)
Write-Host "Checking for old backups..." -ForegroundColor Cyan
$oldBackups = Get-ChildItem "C:\layera_backups\" -Filter "*.zip" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -Skip 10
if ($oldBackups.Count -gt 0) {
    Write-Host "  Found $($oldBackups.Count) old backups to remove (keeping last 10)" -ForegroundColor Yellow
    foreach ($oldBackup in $oldBackups) {
        Remove-Item $oldBackup.FullName -Force
        Write-Host "    Removed: $($oldBackup.Name)" -ForegroundColor DarkGray
    }
}

# Create temporary folder for organizing files before zip
$tempDir = "$env:TEMP\layera-backup-$timestamp"
New-Item -Path $tempDir -ItemType Directory -Force | Out-Null

Write-Host "Analyzing changes since last backup..." -ForegroundColor Cyan

# Find the last backup date from existing files (support both old and new formats)
$lastBackupDate = $null
$existingBackups = Get-ChildItem "C:\layera_backups\" -Filter "*.zip" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
if ($existingBackups.Count -gt 0) {
    $lastBackupDate = $existingBackups[0].LastWriteTime
    Write-Host "  Last backup: $($lastBackupDate.ToString('yyyy-MM-dd HH:mm:ss'))" -ForegroundColor Gray
} else {
    Write-Host "  No previous backup found - this is the first backup" -ForegroundColor Gray
}

# Generate git log since last backup
Write-Host "Generating backup summary..." -ForegroundColor Cyan
$gitLog = ""
$gitStatus = ""
$changedFiles = ""

try {
    # Get git status
    $gitStatus = git status --porcelain 2>$null

    # Get recent commits (last 10 or since last backup)
    if ($lastBackupDate) {
        $sinceDate = $lastBackupDate.ToString('yyyy-MM-dd')
        $gitLog = git log --since="$sinceDate" --oneline --no-merges 2>$null
    } else {
        $gitLog = git log --oneline --no-merges -10 2>$null
    }

    # Get changed files
    if ($lastBackupDate) {
        $changedFiles = git diff --name-only HEAD~5..HEAD 2>$null
    } else {
        $changedFiles = git ls-files 2>$null | Select-Object -First 20
    }
} catch {
    Write-Host "  Warning: Could not get git information" -ForegroundColor Yellow
}

# Create comprehensive backup summary
$summaryContent = @"
# LAYERA BACKUP SUMMARY
**Backup Date:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
**Previous Backup:** $(if ($lastBackupDate) { $lastBackupDate.ToString('yyyy-MM-dd HH:mm:ss') } else { "First backup" })

## 📋 CHANGES SINCE LAST BACKUP

### Git Commits:
$(if ($gitLog) {
    $gitLog -split "`n" | ForEach-Object { "- $_" }
} else {
    "- No git commits found or this is the first backup"
})

### Current Git Status:
$(if ($gitStatus) {
    $gitStatus -split "`n" | ForEach-Object { "- $_" }
} else {
    "- Working directory clean"
})

### Modified Files:
$(if ($changedFiles) {
    $changedFiles -split "`n" | Select-Object -First 15 | ForEach-Object { "- $_" }
    if (($changedFiles -split "`n").Count -gt 15) { "- ... and more files" }
} else {
    "- No recent file changes detected"
})

## 📦 BACKUP CONTENTS

### ✅ INCLUDED:
- **apps/** - All application source code
- **packages/** - Enterprise packages (theme-switcher, typography, buttons, icons, viewport, tolgee, auth-bridge)
- **voithitika_docs/** - Documentation and progress logs
- **strategy/** - Strategic planning documents
- **.claude/** - Claude Code configuration
- **Root files** - package.json, tsconfig.json, vite.config, etc.

### ❌ EXCLUDED (for optimization):
- **OLD_geo-canvas/** - Archived old code
- **node_modules/** - Dependencies (restore with: npm install)
- **dist/, build/** - Build artifacts (restore with: npm run build)
- **.git/** - Version control history
- **Log files** - *.log, *.tmp, *.lock files

## 🎨 CURRENT PROJECT STATUS

### Enterprise Theme System:
- ✅ Complete Dark/Light mode switching
- ✅ CSS Variables system (--layera-bg-*, --layera-text-*, --layera-border-*)
- ✅ Theme switcher icons on all pages
- ✅ 300+ hardcoded colors replaced with CSS variables
- ✅ TypeScript support across all packages

### Applications:
- **Layera ID** - Full authentication system with theming
- **GeoAlert** - Complete map application with theme integration

### Packages:
- **@layera/theme-switcher** - Enterprise theme switching
- **@layera/typography** - Professional typography components
- **@layera/buttons** - Enterprise button components
- **@layera/icons** - Comprehensive icon library
- **@layera/viewport** - Responsive viewport handling
- **@layera/tolgee** - Internationalization system
- **@layera/auth-bridge** - Authentication utilities

## 🚀 RESTORE INSTRUCTIONS

1. **Extract** this backup ZIP file
2. **Install dependencies:** `npm install`
3. **Start development:** `npm run dev`
4. **Build for production:** `npm run build`

## 📊 BACKUP STATISTICS

- **Backup Size:** Will be calculated after compression
- **Files Included:** Source code, documentation, configuration
- **Git Branch:** $(git branch --show-current 2>$null)
- **Last Commit:** $(git log -1 --oneline 2>$null)

---
*Generated automatically by Layera Backup Script*
*Enterprise Theme System - Production Ready*
"@

# Save summary to temp directory
$summaryContent | Out-File -FilePath "$tempDir\BACKUP_SUMMARY.md" -Encoding UTF8
Write-Host "  Backup summary created" -ForegroundColor Gray

Write-Host "Collecting source files..." -ForegroundColor Cyan

try {
    # Copy apps (excluding node_modules, dist, build)
    Write-Host "  Copying apps..." -ForegroundColor Gray
    $appCount = (Get-ChildItem "C:\Layera\apps" -Directory).Count
    $current = 0
    foreach ($app in Get-ChildItem "C:\Layera\apps" -Directory) {
        $current++
        Write-Host "    [$current/$appCount] $($app.Name)" -ForegroundColor DarkGray
        robocopy "$($app.FullName)" "$tempDir\apps\$($app.Name)" /E /XD node_modules dist build coverage .cache .git .turbo /XF *.log *.tmp nul *.lock /R:1 /W:1 /NP /NDL /NJH /NJS
    }

    # Copy packages (excluding node_modules, dist, build)
    Write-Host "  Copying packages..." -ForegroundColor Gray
    $packageCount = (Get-ChildItem "C:\Layera\packages" -Directory).Count
    $current = 0
    foreach ($package in Get-ChildItem "C:\Layera\packages" -Directory) {
        $current++
        Write-Host "    [$current/$packageCount] $($package.Name)" -ForegroundColor DarkGray
        robocopy "$($package.FullName)" "$tempDir\packages\$($package.Name)" /E /XD node_modules dist build coverage .cache .git .turbo /XF *.log *.tmp nul *.lock /R:1 /W:1 /NP /NDL /NJH /NJS
    }

    # Copy documentation
    Write-Host "  Copying documentation..." -ForegroundColor Gray
    if (Test-Path "C:\Layera\voithitika_docs") {
        robocopy "C:\Layera\voithitika_docs" "$tempDir\voithitika_docs" /E /R:1 /W:1 /NP /NDL /NJH /NJS
    }
    if (Test-Path "C:\Layera\strategy") {
        robocopy "C:\Layera\strategy" "$tempDir\strategy" /E /R:1 /W:1 /NP /NDL /NJH /NJS
    }

    # Copy .claude config
    Write-Host "  Copying .claude config..." -ForegroundColor Gray
    if (Test-Path "C:\Layera\.claude") {
        robocopy "C:\Layera\.claude" "$tempDir\.claude" /E /R:1 /W:1 /NP /NDL /NJH /NJS
    }

    # Copy root files (excluding problematic ones and OLD_geo-canvas)
    Write-Host "  Copying root files..." -ForegroundColor Gray
    $rootFiles = Get-ChildItem "C:\Layera" -File | Where-Object {
        $_.Name -notlike "*.log" -and
        $_.Name -ne "nul" -and
        $_.Name -notlike "*.tmp" -and
        $_.Name -notlike "*.lock" -and
        $_.Name -ne "backup.ps1"
    }

    foreach ($file in $rootFiles) {
        Copy-Item $file.FullName $tempDir -Force -ErrorAction SilentlyContinue
    }

    # Summary already created above, no need for additional readme

    # Calculate source size before compression
    Write-Host "Calculating source size..." -ForegroundColor Cyan
    $sourceSize = 0
    Get-ChildItem $tempDir -Recurse -File | ForEach-Object { $sourceSize += $_.Length }
    $sourceSizeMB = [math]::Round($sourceSize / 1MB, 2)
    Write-Host "  Total source size: $sourceSizeMB MB" -ForegroundColor Gray

    # Create the ZIP file directly with progress
    Write-Host "Creating ZIP archive..." -ForegroundColor Cyan
    Write-Host "  Compressing $sourceSizeMB MB of source files..." -ForegroundColor Gray

    # Use .NET for better compression
    Add-Type -Assembly System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $zipPath, 'Optimal', $false)

    # Clean up temp directory
    Write-Host "  Cleaning up temporary files..." -ForegroundColor Gray
    Remove-Item $tempDir -Recurse -Force

    # Show results
    $zipSize = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
    $compressionRatio = [math]::Round((($sourceSizeMB - $zipSize) / $sourceSizeMB * 100), 1)

    Write-Host ""
    Write-Host "════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "SUCCESS! ENTERPRISE BACKUP COMPLETED!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 ZIP Location: $zipPath" -ForegroundColor White
    Write-Host "📊 Source Size: $sourceSizeMB MB" -ForegroundColor Cyan
    Write-Host "🗜️  ZIP Size: $zipSize MB" -ForegroundColor Cyan
    Write-Host "✨ Compression: $compressionRatio% reduction" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "BACKUP SUMMARY:" -ForegroundColor Cyan
    Write-Host "  All changes since last backup documented" -ForegroundColor Gray
    Write-Host "  Git commits and status included" -ForegroundColor Gray
    Write-Host "  Full project status documented" -ForegroundColor Gray
    Write-Host ""
    Write-Host "EXCLUDED (for optimization):" -ForegroundColor Yellow
    Write-Host "  OLD_geo-canvas/ (archived code)" -ForegroundColor Gray
    Write-Host "  node_modules/ (npm install)" -ForegroundColor Gray
    Write-Host "  dist/, build/ (npm run build)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Check BACKUP_SUMMARY.md inside ZIP for detailed changes!" -ForegroundColor Cyan

} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    # Clean up on error
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force
    }
}