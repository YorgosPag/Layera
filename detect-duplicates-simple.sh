#!/bin/bash

# LAYERA CSS DUPLICATE DETECTOR - SIMPLE VERSION
# Ανιχνεύει διπλότυπα σε CSS αρχεία

TARGET_FILE="${1:-apps/layera/src/utilities.css}"

echo "🔍 ΑΝΙΧΝΕΥΣΗ ΔΙΠΛΟΤΥΠΩΝ ΣΤΟ: $TARGET_FILE"
echo "=================================================="

echo ""
echo "📋 1. ΔΙΠΛΟΤΥΠΕΣ CSS ΜΕΤΑΒΛΗΤΕΣ (--la-*):"
echo "-------------------------------------------"
grep -o "\-\-la[a-zA-Z0-9\-]*:" "$TARGET_FILE" | sort | uniq -c | while read count var; do
    if [ "$count" -gt 1 ]; then
        echo "🚨 $var ($count φορές)"
    fi
done

echo ""
echo "📋 2. ΔΙΠΛΟΤΥΠΕΣ CSS ΚΛΑΣΕΙΣ (.la-* .layera-*):"
echo "----------------------------------------------"
grep -o "^\.[a-zA-Z0-9\-_]*\s*{" "$TARGET_FILE" | grep -o "^\.[a-zA-Z0-9\-_]*" | sort | uniq -c | while read count class; do
    if [ "$count" -gt 1 ]; then
        echo "🚨 $class ($count φορές)"
    fi
done

echo ""
echo "📋 3. UNDEFINED CSS ΜΕΤΑΒΛΗΤΕΣ:"
echo "------------------------------"
# Αποθηκεύει όλες τις ορισμένες μεταβλητές
grep -o "\-\-la[a-zA-Z0-9\-]*:" "$TARGET_FILE" | sed 's/:$//' > /tmp/defined_vars.txt

# Αποθηκεύει όλες τις χρησιμοποιούμενες μεταβλητές
grep -o "var(\-\-la[a-zA-Z0-9\-]*)" "$TARGET_FILE" | sed 's/var(//; s/)//' > /tmp/used_vars.txt

# Βρίσκει τις undefined
echo "Ψάχνω για undefined μεταβλητές..."
cat /tmp/used_vars.txt | sort | uniq | while read var; do
    if ! grep -Fx "$var" /tmp/defined_vars.txt > /dev/null; then
        echo "🚨 UNDEFINED: $var"
    fi
done

echo ""
echo "📋 4. ΣΗΜΑΝΤΙΚΕΣ ΚΛΑΣΕΙΣ STATUS:"
echo "-------------------------------"
for class in "la-header" "la-card" "layera-header" "layera-card" "layera-modal-container"; do
    count=$(grep -c "^\.$class\s*{" "$TARGET_FILE")
    if [ $count -eq 1 ]; then
        echo "✅ .$class: $count φορά"
    elif [ $count -gt 1 ]; then
        echo "🚨 .$class: $count φορές"
    else
        echo "⚠️  .$class: Δεν βρέθηκε"
    fi
done

echo ""
echo "=================================================="
echo "🎯 ΑΝΙΧΝΕΥΣΗ ΟΛΟΚΛΗΡΩΘΗΚΕ"

# Καθαρίζει τα temporary αρχεία
rm -f /tmp/defined_vars.txt /tmp/used_vars.txt