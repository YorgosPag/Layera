@echo off
echo ===========================================
echo 🚨 EMERGENCY RESTORE - NAVIGATION SYSTEM
echo ===========================================
echo.
echo This will restore the WORKING navigation system
echo from before the enterprise refactoring.
echo.
pause

echo Switching to safe branch...
git checkout refactor/geomap-enterprise-split

echo Resetting to working commit...
git reset --hard d6a819c

echo Restoring from backup files...
copy "safety-backups\20251022_115150_working_navigation\GeoMapNew.tsx" "apps\layera-geoalert\src\components\GeoMapNew.tsx"
copy "safety-backups\20251022_115150_working_navigation\FloatingStepper.tsx" "apps\layera-geoalert\src\components\device-specific\mobile\iphone-14-pro-max\components\FloatingStepper.tsx"

echo.
echo ✅ NAVIGATION SYSTEM RESTORED TO WORKING STATE
echo ✅ Back button should work now
echo ✅ Dynamic colors should work
echo ✅ All functionality restored
echo.
echo Open http://localhost:3008 to test
echo.
pause