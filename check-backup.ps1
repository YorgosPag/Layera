$backupDir = "C:\layera_backups\layera-enterprise-i18n-2025-10-17_15-17-40"

Write-Host "Checking backup directory contents..." -ForegroundColor Yellow
Write-Host "Directory: $backupDir" -ForegroundColor Gray

if (Test-Path $backupDir) {
    $allFiles = Get-ChildItem $backupDir -Recurse
    $totalSize = ($allFiles | Measure-Object -Property Length -Sum).Sum

    Write-Host "Total files: $($allFiles.Count)" -ForegroundColor Green
    Write-Host "Total size: $([math]::Round($totalSize / 1MB, 2)) MB" -ForegroundColor Green

    Write-Host "`nDirectory structure:" -ForegroundColor Cyan
    Get-ChildItem $backupDir | ForEach-Object {
        if ($_.PSIsContainer) {
            $folderSize = (Get-ChildItem $_.FullName -Recurse | Measure-Object -Property Length -Sum).Sum
            Write-Host "  $($_.Name)/  [$([math]::Round($folderSize / 1MB, 2)) MB]" -ForegroundColor White
        } else {
            Write-Host "  $($_.Name)  [$([math]::Round($_.Length / 1KB, 2)) KB]" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "Backup directory not found!" -ForegroundColor Red
}