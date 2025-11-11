@echo off
echo ============================================
echo    LAYERA BACKUP SCRIPT
echo ============================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0backup-script.ps1"

echo.
echo Backup completed. Press any key to exit...
pause > nul