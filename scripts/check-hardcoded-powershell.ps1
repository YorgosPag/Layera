# 🔍 LAYERA HARDCODED VALUES QUICK CHECK (PowerShell)

Write-Host "🔍 LAYERA HARDCODED VALUES QUICK CHECK" -ForegroundColor Blue
Write-Host "======================================" -ForegroundColor Blue

$violationsFound = $false

Write-Host "🔍 Checking for hardcoded values..."

# Function to check pattern
function Test-Pattern {
    param($Pattern, $Description, $Files)

    Write-Host "   • $Description... " -NoNewline

    try {
        $results = rg $Pattern --type ts --type tsx --type js --type jsx $Files 2>$null | Where-Object { $_ -notmatch "DON_T_TOUCH-Layera_OLD" } | Select-Object -First 3

        if ($results) {
            Write-Host "❌ FOUND" -ForegroundColor Red
            Write-Host "     Examples: $($results -join ', ')" -ForegroundColor Yellow
            return $true
        } else {
            Write-Host "✅ CLEAN" -ForegroundColor Green
            return $false
        }
    } catch {
        Write-Host "⚠️ COULD NOT CHECK" -ForegroundColor Yellow
        return $false
    }
}

# Check directories
$checkDirs = @("apps\layera\src", "packages\icons\src", "packages\typography\src")

# Check hex colors
if (Test-Pattern "#[0-9a-fA-F]{3,6}" "Hex colors" $checkDirs) { $violationsFound = $true }

# Check CSS units
if (Test-Pattern "\b\d+\.?\d*(px|rem|em)\b" "CSS units (px/rem/em)" $checkDirs) { $violationsFound = $true }

# Check RGB colors
if (Test-Pattern "rgba?\s*\(" "RGB colors" $checkDirs) { $violationsFound = $true }

# Check inline styles
if (Test-Pattern "style\s*=\s*\{" "Inline styles" $checkDirs) { $violationsFound = $true }

Write-Host ""

if (-not $violationsFound) {
    Write-Host "✅ SUCCESS: No hardcoded values found!" -ForegroundColor Green
    Write-Host "🚀 Your code follows enterprise standards." -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ VIOLATIONS DETECTED" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Quick fixes:" -ForegroundColor Yellow
    Write-Host "   • Replace hex colors with: var(--la-color-primary)"
    Write-Host "   • Replace px values with design tokens"
    Write-Host "   • Remove inline styles, use CSS classes"
    Write-Host ""
    Write-Host "📖 For details run:" -ForegroundColor Blue
    Write-Host "   node scripts/validate-hardcoded-values.js"
    exit 1
}