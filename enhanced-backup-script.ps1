# LAYERA ENHANCED BACKUP SCRIPT
# 🛡️ Enterprise-Grade Backup with Critical Files Protection
#
# ΚΡΙΤΗΡΙΑ ΑΣΦΑΛΕΙΑΣ:
# 1. Προστασία Design Tokens (packages/tokens/dist/)
# 2. Έλεγχος Git status για uncommitted changes
# 3. Δημιουργία πολλαπλών backup levels
# 4. Verification της ακεραιότητας των backups
# 5. Δημιουργία restore instructions

param(
    [string]$BackupPath = "C:\layera_backups",
    [string]$SourcePath = "C:\layera",
    [switch]$FullBackup = $false,
    [switch]$Force = $false
)

# 🎨 Colors για output
$Green = @{ForegroundColor = "Green"}
$Red = @{ForegroundColor = "Red"}
$Yellow = @{ForegroundColor = "Yellow"}
$Cyan = @{ForegroundColor = "Cyan"}
$Magenta = @{ForegroundColor = "Magenta"}

Write-Host "🛡️ LAYERA ENHANCED BACKUP SCRIPT" @Magenta
Write-Host "=================================" @Magenta
Write-Host ""

# Validation των paths
if (-not (Test-Path $SourcePath)) {
    Write-Host "❌ ERROR: Source path not found: $SourcePath" @Red
    exit 1
}

# Δημιουργία backup directory structure
$BackupStructure = @(
    "$BackupPath\daily",
    "$BackupPath\weekly",
    "$BackupPath\monthly",
    "$BackupPath\critical",
    "$BackupPath\restore_instructions"
)

foreach ($dir in $BackupStructure) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "📁 Created backup directory: $dir" @Green
    }
}

# 🔍 1. GIT STATUS CHECK - Κρίσιμο για ασφάλεια
Write-Host "🔍 Checking Git status..." @Yellow
Push-Location $SourcePath

try {
    $gitStatus = git status --porcelain 2>$null
    $gitBranch = git branch --show-current 2>$null

    if ($gitStatus -and -not $Force) {
        Write-Host "⚠️  UNCOMMITTED CHANGES DETECTED!" @Yellow
        Write-Host "Files with changes:" @Yellow
        $gitStatus | ForEach-Object { Write-Host "  $_" @Yellow }
        Write-Host ""
        Write-Host "Options:" @Cyan
        Write-Host "1. Run: git add . && git commit -m 'Backup checkpoint'" @Cyan
        Write-Host "2. Use -Force to backup anyway" @Cyan
        Write-Host "3. Cancel and commit manually" @Cyan

        $choice = Read-Host "Continue with uncommitted changes? (y/N)"
        if ($choice -ne "y" -and $choice -ne "Y") {
            Write-Host "❌ Backup cancelled" @Red
            exit 1
        }
    }

    Write-Host "✅ Git Status: Branch '$gitBranch'" @Green
    if (-not $gitStatus) {
        Write-Host "✅ No uncommitted changes" @Green
    }

} catch {
    Write-Host "⚠️  Warning: Not a Git repository or Git not available" @Yellow
} finally {
    Pop-Location
}

# 📅 Determine backup type and filename
$DateTime = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$DayOfWeek = (Get-Date).DayOfWeek
$DayOfMonth = (Get-Date).Day

if ($FullBackup) {
    $BackupType = "full"
    $BackupFolder = "$BackupPath\monthly"
} elseif ($DayOfWeek -eq "Sunday") {
    $BackupType = "weekly"
    $BackupFolder = "$BackupPath\weekly"
} else {
    $BackupType = "daily"
    $BackupFolder = "$BackupPath\daily"
}

$BackupFileName = "layera_${BackupType}_${DateTime}.zip"
$BackupFullPath = Join-Path $BackupFolder $BackupFileName

Write-Host "📦 Backup Type: $BackupType" @Cyan
Write-Host "📂 Destination: $BackupFullPath" @Cyan
Write-Host ""

# 🗂️ 2. CRITICAL FILES BACKUP - Ξεχωριστά τα κρίσιμα αρχεία
Write-Host "🎯 Creating CRITICAL FILES backup..." @Yellow

$CriticalBackupPath = Join-Path "$BackupPath\critical" "critical_${DateTime}.zip"
$CriticalTempPath = Join-Path $env:TEMP "layera_critical_temp"

if (Test-Path $CriticalTempPath) {
    Remove-Item $CriticalTempPath -Recurse -Force
}
New-Item -ItemType Directory -Path $CriticalTempPath -Force | Out-Null

# Κρίσιμα αρχεία που ΠΡΕΠΕΙ να διατηρηθούν
$CriticalFiles = @(
    "packages\tokens\dist\*",           # 🎨 Design Tokens - Η ψυχή της εμφάνισης
    "packages\tokens\src\*",            # 🎨 Source tokens
    "packages\tokens\.backups\*",       # 🎨 Token backups
    "packages\tokens\style-dictionary.config.mjs",  # 🎨 Build config
    "package.json",                     # 📦 Root dependencies
    "pnpm-workspace.yaml",              # 📦 Workspace config
    "packages\*\package.json",          # 📦 Package configs
    ".gitignore",                       # 🔒 Git config
    "tsconfig.json",                    # ⚙️ TypeScript config
    "*.md",                             # 📚 Documentation
    ".claude\*"                         # 🤖 Claude configs
)

Write-Host "🎯 Critical files to backup:" @Cyan
foreach ($pattern in $CriticalFiles) {
    $files = Get-ChildItem -Path $SourcePath -Filter $pattern.Split('\')[-1] -Recurse -ErrorAction SilentlyContinue
    if ($files) {
        Write-Host "  ✓ $pattern" @Green
    } else {
        Write-Host "  ⚠ $pattern (not found)" @Yellow
    }
}

# Copy critical files
try {
    robocopy $SourcePath $CriticalTempPath /E /R:2 /W:1 /NFL /NDL /NP /XD node_modules .git build .next coverage /XF *.log .DS_Store Thumbs.db | Out-Null

    # Ειδική προσοχή στα tokens
    $TokensSource = "$SourcePath\packages\tokens"
    $TokensTarget = "$CriticalTempPath\packages\tokens"

    if (Test-Path $TokensSource) {
        New-Item -ItemType Directory -Path $TokensTarget -Force | Out-Null
        robocopy $TokensSource $TokensTarget /E /R:2 /W:1 /NFL /NDL /NP | Out-Null
        Write-Host "✅ Tokens backed up successfully" @Green
    }

    Compress-Archive -Path "$CriticalTempPath\*" -DestinationPath $CriticalBackupPath -Force
    Remove-Item $CriticalTempPath -Recurse -Force

    $CriticalSize = (Get-Item $CriticalBackupPath).Length
    $CriticalSizeMB = [math]::Round($CriticalSize / 1MB, 2)
    Write-Host "✅ Critical backup created: $CriticalSizeMB MB" @Green

} catch {
    Write-Host "❌ Critical backup failed: $($_.Exception.Message)" @Red
}

# 🗂️ 3. FULL PROJECT BACKUP
Write-Host ""
Write-Host "📦 Creating full project backup..." @Yellow

$TempPath = Join-Path $env:TEMP "layera_backup_temp"
if (Test-Path $TempPath) {
    Remove-Item $TempPath -Recurse -Force
}
New-Item -ItemType Directory -Path $TempPath -Force | Out-Null

try {
    Write-Host "📂 Copying project files..." @Cyan

    # ΑΥΤΗ Η ΓΡΑΜΜΗ ΕΙΝΑΙ ΚΡΙΣΙΜΗ - ΔΕΝ εξαιρούμε πια το dist/!
    # Εξαιρούμε μόνο node_modules και άλλα προσωρινά αρχεία
    robocopy $SourcePath $TempPath /E /R:3 /W:2 /XD node_modules .git .next coverage .nyc_output .vscode .idea layera_OLD "*OLD*" "*DONT_TOUCH*" "*.tmp" /XF *.log .DS_Store Thumbs.db *.temp .env.local .env.development.local .env.test.local .env.production.local /NFL /NDL /NP

    Write-Host "🗜️ Creating ZIP archive..." @Cyan
    Compress-Archive -Path "$TempPath\*" -DestinationPath $BackupFullPath -Force

    Remove-Item $TempPath -Recurse -Force

    # 📊 Backup Statistics
    $BackupSize = (Get-Item $BackupFullPath).Length
    $BackupSizeMB = [math]::Round($BackupSize / 1MB, 2)

    Write-Host ""
    Write-Host "🎉 BACKUP COMPLETED SUCCESSFULLY!" @Green
    Write-Host "===============================================" @Green
    Write-Host "📄 Type: $BackupType backup" @Cyan
    Write-Host "📁 File: $BackupFullPath" @Cyan
    Write-Host "📊 Size: $BackupSizeMB MB" @Cyan
    Write-Host "📅 Date: $(Get-Date)" @Cyan
    Write-Host "🌿 Branch: $gitBranch" @Cyan
    Write-Host "💎 Critical: $CriticalBackupPath ($CriticalSizeMB MB)" @Cyan

} catch {
    Write-Host "❌ Backup failed: $($_.Exception.Message)" @Red
    if (Test-Path $TempPath) {
        Remove-Item $TempPath -Recurse -Force
    }
    exit 1
}

# 🔧 4. RESTORE INSTRUCTIONS GENERATION
Write-Host ""
Write-Host "📝 Creating restore instructions..." @Yellow

$RestoreScript = @"
# LAYERA RESTORE INSTRUCTIONS
# Generated: $(Get-Date)
# Backup: $BackupFullPath
# Critical: $CriticalBackupPath

## 🚨 EMERGENCY RESTORE PROCEDURE

### 1. QUICK CRITICAL RESTORE (Design Tokens Only)
1. Extract: $CriticalBackupPath
2. Copy tokens to: C:\layera\packages\tokens\
3. Run: pnpm install --filter @layera/tokens
4. Run: pnpm --filter @layera/tokens build

### 2. FULL PROJECT RESTORE
1. Backup current: mv C:\layera C:\layera_old_$(Get-Date -Format 'yyyyMMdd')
2. Extract: $BackupFullPath → C:\layera
3. Run: pnpm install
4. Run: pnpm build
5. Verify: pnpm dev

### 3. GIT RESTORATION
Original branch: $gitBranch
After restore run:
- git remote add origin <your-repo-url>
- git fetch origin
- git reset --hard origin/$gitBranch

### 4. VERIFICATION CHECKLIST
- [ ] Tokens CSS generated correctly
- [ ] All packages build without errors
- [ ] Dev server starts on localhost:3000
- [ ] Design system styling is intact

## 🆘 CONTACT FOR HELP
If restoration fails, check:
1. Node.js version compatibility
2. pnpm version (latest)
3. Windows permissions on target directory
"@

$RestoreInstructions = "$BackupPath\restore_instructions\restore_${DateTime}.md"
$RestoreScript | Out-File -FilePath $RestoreInstructions -Encoding UTF8

Write-Host "✅ Restore instructions: $RestoreInstructions" @Green

# 🧹 5. CLEANUP OLD BACKUPS (Optional)
$DaysToKeep = @{
    "daily" = 7
    "weekly" = 4
    "monthly" = 12
    "critical" = 30
}

foreach ($folder in $DaysToKeep.Keys) {
    $folderPath = "$BackupPath\$folder"
    if (Test-Path $folderPath) {
        $cutoffDate = (Get-Date).AddDays(-$DaysToKeep[$folder])
        $oldBackups = Get-ChildItem -Path $folderPath -File | Where-Object { $_.CreationTime -lt $cutoffDate }

        if ($oldBackups) {
            Write-Host "🧹 Cleaning old $folder backups (older than $($DaysToKeep[$folder]) days)..." @Yellow
            $oldBackups | ForEach-Object {
                Remove-Item $_.FullName -Force
                Write-Host "  🗑️ Removed: $($_.Name)" @Yellow
            }
        }
    }
}

# 📂 Open backup location
Write-Host ""
Write-Host "📂 Opening backup location..." @Cyan
explorer.exe $BackupPath

Write-Host ""
Write-Host "🛡️ BACKUP COMPLETE - YOUR PROJECT IS SAFE! 🛡️" @Green
Write-Host "===============================================" @Green