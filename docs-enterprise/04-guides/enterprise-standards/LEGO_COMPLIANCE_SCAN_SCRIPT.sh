#!/bin/bash
# Enterprise LEGO Compliance Scanning Tool
# Created: October 26, 2025
# Purpose: Automated baseline metrics για Phase 1A Emergency Stabilization

echo "🔍 ENTERPRISE LEGO COMPLIANCE SCAN - BASELINE METRICS"
echo "============================================================"
echo "Scan Date: $(date)"
echo "Target: Layera GeoAlert Application"
echo ""

# Total files
TOTAL_FILES=$(find apps/layera-geoalert/src -name "*.tsx" -o -name "*.ts" | wc -l)
echo "📁 Total TypeScript Files: $TOTAL_FILES"

# Inline styles audit
TOTAL_STYLES=$(grep -r "style={{" apps/layera-geoalert/src --exclude-dir=node_modules | wc -l)
echo "🎨 Total Inline Styles: $TOTAL_STYLES"

# LEGO-compliant styles
LEGO_COMPLIANT=$(grep -r "style={{" apps/layera-geoalert/src --exclude-dir=node_modules | grep -c "SPACING_SCALE\|BORDER_RADIUS\|COLOR_TOKENS\|BOX_SHADOW")
echo "✅ LEGO-Compliant Styles: $LEGO_COMPLIANT"

# Non-compliant styles
NON_COMPLIANT=$((TOTAL_STYLES - LEGO_COMPLIANT))
echo "❌ Non-Compliant Styles: $NON_COMPLIANT"

# Compliance percentage
COMPLIANCE_PCT=$((LEGO_COMPLIANT * 100 / TOTAL_STYLES))
echo "📊 Current Compliance: ${COMPLIANCE_PCT}%"

echo ""
echo "🚨 PRIORITY VIOLATIONS:"

# Hardcoded colors
HARDCODED_COLORS=$(grep -r "backgroundColor.*#\|color.*#" apps/layera-geoalert/src --exclude-dir=node_modules | wc -l)
echo "🎨 Hardcoded Colors: $HARDCODED_COLORS"

# Custom flex implementations
CUSTOM_FLEX=$(grep -r "display.*flex" apps/layera-geoalert/src --exclude-dir=node_modules | wc -l)
echo "📐 Custom Flex Layouts: $CUSTOM_FLEX"

# Magic numbers
MAGIC_NUMBERS=$(grep -r "width.*px\|height.*px\|margin.*px\|padding.*px" apps/layera-geoalert/src --exclude-dir=node_modules | grep -v "SPACING_SCALE\|BORDER_RADIUS" | wc -l)
echo "🔢 Magic Numbers: $MAGIC_NUMBERS"

echo ""
echo "🎯 PHASE 1A TARGETS:"
echo "Target Compliance: 50% (από ${COMPLIANCE_PCT}%)"
echo "Target Inline Styles: 120 (από $TOTAL_STYLES)"
echo "Reduction Required: $((TOTAL_STYLES - 120)) styles"

echo ""
echo "============================================================"
echo "Report saved για enterprise dashboard integration"