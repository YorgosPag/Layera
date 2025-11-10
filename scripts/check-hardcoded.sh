#!/bin/bash

# 🚨 LAYERA QUICK HARDCODED VALUES CHECK
# Γρήγορος έλεγχος για developers

echo "🔍 LAYERA HARDCODED VALUES QUICK CHECK"
echo "======================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

violations_found=0

echo "🔍 Checking for hardcoded values..."

# Check for hex colors
echo -n "   • Hex colors... "
hex_results=$(rg "#[0-9a-fA-F]{3,6}" --type ts --type tsx --type js --type jsx src/ 2>/dev/null | grep -v "DON_T_TOUCH-Layera_OLD" | head -3)
if [[ -n "$hex_results" ]]; then
    echo -e "${RED}FOUND${NC}"
    echo "     Examples: $(echo "$hex_results" | cut -d: -f3 | head -2 | tr '\n' ' ')"
    violations_found=1
else
    echo -e "${GREEN}CLEAN${NC}"
fi

# Check for CSS units
echo -n "   • CSS units (px/rem/em)... "
css_results=$(rg "\b\d+\.?\d*(px|rem|em)\b" --type ts --type tsx --type js --type jsx src/ 2>/dev/null | grep -v "DON_T_TOUCH-Layera_OLD" | grep -v "tokens.css" | head -3)
if [[ -n "$css_results" ]]; then
    echo -e "${RED}FOUND${NC}"
    echo "     Examples: $(echo "$css_results" | cut -d: -f3 | head -2 | tr '\n' ' ')"
    violations_found=1
else
    echo -e "${GREEN}CLEAN${NC}"
fi

# Check for RGB colors
echo -n "   • RGB colors... "
rgb_results=$(rg "rgba?\s*\(" --type ts --type tsx --type js --type jsx src/ 2>/dev/null | grep -v "DON_T_TOUCH-Layera_OLD" | head -3)
if [[ -n "$rgb_results" ]]; then
    echo -e "${RED}FOUND${NC}"
    echo "     Examples: $(echo "$rgb_results" | cut -d: -f3 | head -2 | tr '\n' ' ')"
    violations_found=1
else
    echo -e "${GREEN}CLEAN${NC}"
fi

# Check for inline styles
echo -n "   • Inline styles... "
style_results=$(rg "style\s*=\s*\{" --type tsx --type jsx src/ 2>/dev/null | grep -v "DON_T_TOUCH-Layera_OLD" | head -3)
if [[ -n "$style_results" ]]; then
    echo -e "${RED}FOUND${NC}"
    echo "     Found inline style props"
    violations_found=1
else
    echo -e "${GREEN}CLEAN${NC}"
fi

# Summary
echo ""
if [[ $violations_found -eq 0 ]]; then
    echo -e "${GREEN}✅ SUCCESS: No hardcoded values found!${NC}"
    echo "🚀 Your code follows enterprise standards."
    exit 0
else
    echo -e "${RED}❌ VIOLATIONS DETECTED${NC}"
    echo ""
    echo -e "${YELLOW}🔧 Quick fixes:${NC}"
    echo "   • Replace hex colors with: var(--la-color-primary)"
    echo "   • Replace px values with design tokens"
    echo "   • Remove inline styles, use CSS classes"
    echo ""
    echo -e "${BLUE}📖 For details run:${NC}"
    echo "   node scripts/validate-hardcoded-values.js"
    exit 1
fi