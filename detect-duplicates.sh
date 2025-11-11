#!/bin/bash

# LAYERA CSS DUPLICATE DETECTOR
# Ανιχνεύει διπλότυπα σε CSS αρχεία

TARGET_FILE="${1:-apps/layera/src/utilities.css}"

echo "🔍 ΑΝΙΧΝΕΥΣΗ ΔΙΠΛΟΤΥΠΩΝ ΣΤΟ: $TARGET_FILE"
echo "=================================================="

echo ""
echo "📋 1. ΔΙΠΛΟΤΥΠΕΣ CSS ΜΕΤΑΒΛΗΤΕΣ (--la-*):"
echo "-------------------------------------------"
grep -o "\-\-la[a-zA-Z0-9\-]*:" "$TARGET_FILE" | sort | uniq -c | awk '$1 > 1 {print "🚨 " $2 " (" $1 " φορές)"}'
if [ $(grep -o "\-\-la[a-zA-Z0-9\-]*:" "$TARGET_FILE" | sort | uniq -c | awk '$1 > 1' | wc -l) -eq 0 ]; then
    echo "✅ Δεν βρέθηκαν διπλότυπες μεταβλητές"
fi

echo ""
echo "📋 2. ΔΙΠΛΟΤΥΠΕΣ CSS ΚΛΑΣΕΙΣ (.la-* .layera-*):"
echo "----------------------------------------------"
grep -o "^\.[a-zA-Z0-9\-_]*\s*{" "$TARGET_FILE" | grep -o "^\.[a-zA-Z0-9\-_]*" | sort | uniq -c | awk '$1 > 1 {print "🚨 " $2 " (" $1 " φορές)"}'
if [ $(grep -o "^\.[a-zA-Z0-9\-_]*\s*{" "$TARGET_FILE" | grep -o "^\.[a-zA-Z0-9\-_]*" | sort | uniq -c | awk '$1 > 1' | wc -l) -eq 0 ]; then
    echo "✅ Δεν βρέθηκαν διπλότυπες κλάσεις"
fi

echo ""
echo "📋 3. UNDEFINED CSS ΜΕΤΑΒΛΗΤΕΣ:"
echo "------------------------------"
# Βρίσκει χρησιμοποιούμενες μεταβλητές που δεν ορίζονται
undefined_found=0
grep -o "var(--la[a-zA-Z0-9\-]*)" "$TARGET_FILE" | sed 's/var(//; s/)//' | sort | uniq | while read var; do
    if ! grep -q -- "${var}:" "$TARGET_FILE"; then
        echo "🚨 UNDEFINED: $var"
        undefined_found=1
    fi
done
if [ $undefined_found -eq 0 ]; then
    echo "✅ Δεν βρέθηκαν undefined μεταβλητές"
fi

echo ""
echo "📋 4. THEME ΜΕΤΑΒΛΗΤΕΣ CONSISTENCY:"
echo "----------------------------------"
echo "Light theme μεταβλητές:"
grep -A20 ":root.light" "$TARGET_FILE" | grep "\-\-la-color" | wc -l | xargs printf "   %d μεταβλητές\n"
echo "Dark theme μεταβλητές:"
grep -A20 ":root.dark" "$TARGET_FILE" | grep "\-\-la-color" | wc -l | xargs printf "   %d μεταβλητές\n"

echo ""
echo "📋 5. ΣΗΜΑΝΤΙΚΕΣ ΚΛΑΣΕΙΣ STATUS:"
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