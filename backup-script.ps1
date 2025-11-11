# Layera Backup Script
# Creates zip backup of code without node_modules and old folders

param(
    [string]$BackupPath = "C:\layera_backups",
    [string]$SourcePath = "C:\layera"
)

# Create backup directory if it doesn't exist
if (-not (Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath -Force
    Write-Host "Created backup folder: $BackupPath" -ForegroundColor Green
}

# Generate backup filename with date and time
$DateTime = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupFileName = "layera_backup_$DateTime.zip"
$BackupFullPath = Join-Path $BackupPath $BackupFileName

Write-Host "Starting backup to: $BackupFullPath" -ForegroundColor Yellow

# Temporary folder for backup
$TempPath = Join-Path $env:TEMP "layera_backup_temp"
if (Test-Path $TempPath) {
    Remove-Item $TempPath -Recurse -Force
}
New-Item -ItemType Directory -Path $TempPath -Force

Write-Host "Copying files (excluding node_modules, old folders etc)..." -ForegroundColor Blue

try {
    # Copy everything except excluded folders
    robocopy $SourcePath $TempPath /E /XD node_modules dist build .git .next coverage .nyc_output .vscode .idea layera_OLD "*OLD*" "*DONT_TOUCH*" /XF *.log .DS_Store Thumbs.db *.tmp *.temp .env.local .env.development.local .env.test.local .env.production.local /NFL /NDL /NP

    Write-Host "Creating ZIP file..." -ForegroundColor Blue

    # Create ZIP
    Compress-Archive -Path "$TempPath\*" -DestinationPath $BackupFullPath -Force

    # Clean up temporary folder
    Remove-Item $TempPath -Recurse -Force

    # Backup information
    $BackupSize = (Get-Item $BackupFullPath).Length
    $BackupSizeMB = [math]::Round($BackupSize / 1MB, 2)

    Write-Host ""
    Write-Host "BACKUP COMPLETED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host "File: $BackupFullPath" -ForegroundColor Cyan
    Write-Host "Size: $BackupSizeMB MB" -ForegroundColor Cyan
    Write-Host "Date: $(Get-Date)" -ForegroundColor Cyan
    Write-Host ""

    # Open backup folder
    explorer.exe $BackupPath

} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red

    # Cleanup on error
    if (Test-Path $TempPath) {
        Remove-Item $TempPath -Recurse -Force
    }

    exit 1
}