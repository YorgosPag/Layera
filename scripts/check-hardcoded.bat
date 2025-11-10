@echo off
echo 🔍 LAYERA HARDCODED VALUES QUICK CHECK
echo ======================================

set violations_found=0

echo 🔍 Checking for hardcoded values...

echo    • Hex colors...
rg "#[0-9a-fA-F]{3,6}" --type ts --type tsx --type js --type jsx apps\layera\src packages\icons\src packages\typography\src 2>nul | findstr /v "DON_T_TOUCH-Layera_OLD" >temp_hex.txt
if exist temp_hex.txt (
    for /f %%i in (temp_hex.txt) do (
        echo      ^❌ FOUND
        echo      Examples: %%i
        set violations_found=1
        goto hex_done
    )
)
echo      ✅ CLEAN
:hex_done
if exist temp_hex.txt del temp_hex.txt

echo    • CSS units (px/rem/em)...
rg "\b\d+\.?\d*(px|rem|em)\b" --type ts --type tsx --type js --type jsx apps\layera\src packages\icons\src packages\typography\src 2>nul | findstr /v "DON_T_TOUCH-Layera_OLD" | findstr /v "tokens.css" >temp_css.txt
if exist temp_css.txt (
    for /f %%i in (temp_css.txt) do (
        echo      ^❌ FOUND
        echo      Examples: %%i
        set violations_found=1
        goto css_done
    )
)
echo      ✅ CLEAN
:css_done
if exist temp_css.txt del temp_css.txt

echo    • RGB colors...
rg "rgba?\s*\(" --type ts --type tsx --type js --type jsx apps\layera\src packages\icons\src packages\typography\src 2>nul | findstr /v "DON_T_TOUCH-Layera_OLD" >temp_rgb.txt
if exist temp_rgb.txt (
    for /f %%i in (temp_rgb.txt) do (
        echo      ^❌ FOUND
        echo      Examples: %%i
        set violations_found=1
        goto rgb_done
    )
)
echo      ✅ CLEAN
:rgb_done
if exist temp_rgb.txt del temp_rgb.txt

echo    • Inline styles...
rg "style\s*=\s*\{" --type tsx --type jsx apps\layera\src packages\icons\src packages\typography\src 2>nul | findstr /v "DON_T_TOUCH-Layera_OLD" >temp_style.txt
if exist temp_style.txt (
    for /f %%i in (temp_style.txt) do (
        echo      ^❌ FOUND
        echo      Found inline style props
        set violations_found=1
        goto style_done
    )
)
echo      ✅ CLEAN
:style_done
if exist temp_style.txt del temp_style.txt

echo.
if %violations_found%==0 (
    echo ✅ SUCCESS: No hardcoded values found!
    echo 🚀 Your code follows enterprise standards.
    exit /b 0
) else (
    echo ❌ VIOLATIONS DETECTED
    echo.
    echo 🔧 Quick fixes:
    echo    • Replace hex colors with: var(--la-color-primary^)
    echo    • Replace px values with design tokens
    echo    • Remove inline styles, use CSS classes
    echo.
    echo 📖 For details run:
    echo    node scripts/validate-hardcoded-values.js
    exit /b 1
)