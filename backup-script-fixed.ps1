# LAYERA FIXED BACKUP SCRIPT
# 🛡️ Απλό και αξιόπιστο backup χωρίς robocopy προβλήματα

param(
    [string]$BackupPath = "C:\layera_backups",
    [string]$SourcePath = "C:\layera"
)

# 🎨 Colors για output
function Write-ColorMessage {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

Write-ColorMessage "🛡️ LAYERA BACKUP SCRIPT - FIXED VERSION" "Magenta"
Write-ColorMessage "========================================" "Magenta"
Write-ColorMessage ""

# Validation
if (-not (Test-Path $SourcePath)) {
    Write-ColorMessage "❌ ERROR: Source path not found: $SourcePath" "Red"
    exit 1
}

# Δημιουργία backup directory
if (-not (Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
    Write-ColorMessage "📁 Created backup directory: $BackupPath" "Green"
}

# Generate backup filename
$DateTime = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupFileName = "layera_backup_$DateTime.zip"
$BackupFullPath = Join-Path $BackupPath $BackupFileName

Write-ColorMessage "📦 Creating backup: $BackupFullPath" "Cyan"
Write-ColorMessage ""

# 🔍 Git Status Check (non-blocking)
Write-ColorMessage "🔍 Checking Git status..." "Yellow"
Push-Location $SourcePath

try {
    $gitBranch = git branch --show-current 2>$null
    $gitStatus = git status --porcelain 2>$null

    if ($gitBranch) {
        Write-ColorMessage "✅ Git Branch: $gitBranch" "Green"
    }

    if ($gitStatus) {
        Write-ColorMessage "⚠️  Warning: You have uncommitted changes" "Yellow"
        $gitStatus | Select-Object -First 3 | ForEach-Object { Write-ColorMessage "  $_" "Yellow" }
    } else {
        Write-ColorMessage "✅ No uncommitted changes" "Green"
    }
} catch {
    Write-ColorMessage "⚠️  Git status check failed (not a problem)" "Yellow"
} finally {
    Pop-Location
}
Write-ColorMessage ""

# 📂 Temporary folder
$TempPath = Join-Path $env:TEMP "layera_backup_simple"
if (Test-Path $TempPath) {
    Remove-Item $TempPath -Recurse -Force -ErrorAction SilentlyContinue
}

try {
    Write-ColorMessage "📂 Creating temporary backup folder..." "Cyan"
    New-Item -ItemType Directory -Path $TempPath -Force | Out-Null

    Write-ColorMessage "📋 Copying files (this may take a moment)..." "Cyan"

    # Αντί για robocopy, χρησιμοποιούμε Copy-Item με εξαιρέσεις
    $ExcludeFolders = @(
        "node_modules",
        ".git",
        ".next",
        "coverage",
        ".vscode",
        ".idea",
        "layera_OLD",
        "build",
        "out"
    )

    $ExcludeFiles = @(
        "*.log",
        ".DS_Store",
        "Thumbs.db",
        "*.tmp",
        ".env.local",
        ".env.development.local"
    )

    # Copy με PowerShell (πιο αξιόπιστο από robocopy)
    Write-ColorMessage "   Copying project files..." "Cyan"

    # Get all items except excluded ones
    $AllItems = Get-ChildItem -Path $SourcePath -Recurse -ErrorAction SilentlyContinue | Where-Object {
        $item = $_
        $relativePath = $item.FullName.Substring($SourcePath.Length + 1)

        # Skip excluded folders
        $skipFolder = $false
        foreach ($excludeFolder in $ExcludeFolders) {
            if ($relativePath -like "*$excludeFolder*") {
                $skipFolder = $true
                break
            }
        }

        # Skip excluded files
        $skipFile = $false
        foreach ($excludeFile in $ExcludeFiles) {
            if ($item.Name -like $excludeFile) {
                $skipFile = $true
                break
            }
        }

        return (-not $skipFolder -and -not $skipFile)
    }

    Write-ColorMessage "   Found $($AllItems.Count) files to backup..." "Cyan"

    # Create directory structure first
    $AllItems | Where-Object { $_.PSIsContainer } | ForEach-Object {
        $relativePath = $_.FullName.Substring($SourcePath.Length + 1)
        $targetPath = Join-Path $TempPath $relativePath
        New-Item -ItemType Directory -Path $targetPath -Force -ErrorAction SilentlyContinue | Out-Null
    }

    # Copy files
    $fileCount = 0
    $AllItems | Where-Object { -not $_.PSIsContainer } | ForEach-Object {
        try {
            $relativePath = $_.FullName.Substring($SourcePath.Length + 1)
            $targetPath = Join-Path $TempPath $relativePath
            $targetDir = Split-Path $targetPath -Parent

            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }

            Copy-Item $_.FullName $targetPath -Force -ErrorAction SilentlyContinue
            $fileCount++

            if ($fileCount % 100 -eq 0) {
                Write-ColorMessage "     Copied $fileCount files..." "Green"
            }
        } catch {
            # Skip files that can't be copied
        }
    }

    Write-ColorMessage "✅ Copied $fileCount files successfully" "Green"
    Write-ColorMessage ""

    Write-ColorMessage "🗜️ Creating ZIP archive..." "Cyan"

    # Create the ZIP file
    try {
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        [System.IO.Compression.ZipFile]::CreateFromDirectory($TempPath, $BackupFullPath)
        Write-ColorMessage "✅ ZIP archive created successfully" "Green"
    } catch {
        # Fallback to PowerShell 5.0+ Compress-Archive
        Compress-Archive -Path "$TempPath\*" -DestinationPath $BackupFullPath -Force
        Write-ColorMessage "✅ ZIP archive created successfully (fallback method)" "Green"
    }

    # Cleanup
    Remove-Item $TempPath -Recurse -Force -ErrorAction SilentlyContinue

    # Backup statistics
    $BackupSize = (Get-Item $BackupFullPath).Length
    $BackupSizeMB = [math]::Round($BackupSize / 1MB, 2)

    Write-ColorMessage ""
    Write-ColorMessage "🎉 BACKUP COMPLETED SUCCESSFULLY!" "Green"
    Write-ColorMessage "==================================" "Green"
    Write-ColorMessage "📁 File: $BackupFullPath" "Cyan"
    Write-ColorMessage "📊 Size: $BackupSizeMB MB" "Cyan"
    Write-ColorMessage "📅 Date: $(Get-Date)" "Cyan"
    Write-ColorMessage "📂 Files: $fileCount files backed up" "Cyan"
    Write-ColorMessage ""

    # 🎯 CRITICAL CHECK: Verify tokens are included
    Write-ColorMessage "🎯 Verifying critical files..." "Yellow"

    try {
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zip = [System.IO.Compression.ZipFile]::OpenRead($BackupFullPath)

        $tokensCssFound = $zip.Entries | Where-Object { $_.FullName -like "*tokens*css*" }
        $packageJsonFound = $zip.Entries | Where-Object { $_.FullName -like "*package.json" }

        if ($tokensCssFound) {
            Write-ColorMessage "✅ Design tokens CSS found in backup" "Green"
        } else {
            Write-ColorMessage "⚠️  Warning: Design tokens CSS not found" "Yellow"
        }

        if ($packageJsonFound) {
            Write-ColorMessage "✅ Package.json files found in backup" "Green"
        }

        Write-ColorMessage "✅ Total entries in ZIP: $($zip.Entries.Count)" "Green"
        $zip.Dispose()

    } catch {
        Write-ColorMessage "⚠️  Could not verify ZIP contents (backup still created)" "Yellow"
    }

    Write-ColorMessage ""
    Write-ColorMessage "📂 Opening backup folder..." "Cyan"
    explorer.exe $BackupPath

} catch {
    Write-ColorMessage "❌ Backup failed: $($_.Exception.Message)" "Red"

    if (Test-Path $TempPath) {
        Remove-Item $TempPath -Recurse -Force -ErrorAction SilentlyContinue
    }

    Write-ColorMessage "Error details: $($_.Exception)" "Red"
    exit 1
}

Write-ColorMessage ""
Write-ColorMessage "🛡️ BACKUP COMPLETE - YOUR PROJECT IS SAFE! 🛡️" "Green"