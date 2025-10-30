# 🛡️ ΑΣΦΑΛΗΣ Single-File Naming Orchestrator Guide

**Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance**
**ΣΚΟΠΟΣ**: Ασφαλής έλεγχος κάθε αρχείου ξεχωριστά μετά την εμπειρία χθεσινής βλάβης

---

## 🚨 ΓΙΑΤΙ ΧΡΕΙΑΖΕΤΑΙ ΑΥΤΟΣ Ο ORCHESTRATOR

### ❌ **ΤΙ ΣΥΝΕΒΗ ΧΘΕΣ**
- Μαζικά naming scripts έσπασαν την εφαρμογή
- Χιλιάδες λάθη και broken imports
- Αδυναμία επαναφοράς της εφαρμογής
- **ΠΟΤΕ ΞΑΝΑ** μαζική επεξεργασία

### ✅ **Η ΝΕΑ ΑΣΦΑΛΗΣ ΠΡΟΣΕΓΓΙΣΗ**
- **ΕΝΑ αρχείο κάθε φορά**
- **Λεπτομερής ανάλυση** πριν κάθε αλλαγή
- **JSON reports** με όλα τα ευρήματα
- **Risk assessment** για κάθε action

---

## 🔧 ΧΡΗΣΗ ΤΟΥ ORCHESTRATOR

### 📝 **ΒΑΣΙΚΗ ΧΡΗΣΗ**
```bash
# Ανάλυση ενός συγκεκριμένου αρχείου
node scripts/refactor/single-file-naming-orchestrator.mjs "path/to/file.tsx"

# Παραδείγματα
node scripts/refactor/single-file-naming-orchestrator.mjs "apps/layera-geoalert/src/App.tsx"
node scripts/refactor/single-file-naming-orchestrator.mjs "packages/auth-bridge/src/utils/helper.ts"
node scripts/refactor/single-file-naming-orchestrator.mjs "docs/README.md"
```

### 📊 **ΠΑΡΑΔΕΙΓΜΑ OUTPUT**
```
🛡️ ΑΣΦΑΛΗΣ SINGLE-FILE NAMING ORCHESTRATOR
📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance
🚨 SAFETY-FIRST: One file at a time validation

🔍 ANALYZING SINGLE FILE: apps/layera-geoalert/src/components/MyComponent.tsx
  📊 Running naming analysis...
  🛡️ Assessing risks...
  📋 Generating action plan...
  ✅ Analysis completed - Risk: MEDIUM

📄 Detailed JSON report: single-file-analysis-1698675123456.json

============================================================
📊 SINGLE FILE ANALYSIS SUMMARY
============================================================
📁 File: apps/layera-geoalert/src/components/MyComponent.tsx
🎯 Category: react
✅ Compliant: YES
🛡️ Risk Level: SAFE
🔧 Actions Needed: 0
```

---

## 📋 ΤΙ ΕΛΕΓΧΕΙ Ο ORCHESTRATOR

### 🎯 **NAMING COMPLIANCE**
- ✅ **React components** → PascalCase.tsx
- ✅ **TS/JS files** → kebab-case.ts
- ✅ **Documentation** → kebab-case.md
- ✅ **Test files** → kebab-case.test.ts
- ✅ **Scripts** → kebab-case.js/mjs

### 🔗 **IMPORTS ANALYSIS**
- 🔍 **Relative imports** counting και validation
- ❌ **Broken imports** detection
- 📄 **Import paths** που δεν υπάρχουν
- 🔄 **Dependencies** που χρειάζονται update

### 📤 **EXPORTS ANALYSIS**
- ✅ **Default exports** detection
- 🏷️ **Anonymous exports** identification
- 📝 **Named exports** analysis
- ⚛️ **React component** export patterns

### 🛡️ **RISK ASSESSMENT**
- 🚨 **HIGH**: Critical violations που μπορούν να σπάσουν build
- ⚠️ **MEDIUM**: Naming violations που χρειάζονται fix
- 💡 **LOW**: Minor improvements
- ✅ **SAFE**: Compliant files

---

## 📄 JSON REPORT STRUCTURE

### 🗂️ **ΠΑΡΑΓΕΤΑΙ ΑΥΤΟΜΑΤΑ**
Κάθε ανάλυση δημιουργεί detailed JSON report:
```
single-file-analysis-[timestamp].json
```

### 📊 **ΠΕΡΙΕΧΟΜΕΝΑ REPORT**
```json
{
  "timestamp": "2024-10-30T12:34:56.789Z",
  "targetFile": "path/to/file.tsx",
  "analysis": {
    "category": "react",
    "compliant": false,
    "violation": {
      "current": "myComponent.tsx",
      "expected": "PascalCase.tsx",
      "description": "React components → PascalCase.tsx"
    },
    "severity": "critical",
    "riskLevel": "high"
  },
  "actionPlan": [
    {
      "action": "REACT_PASCAL_CASE",
      "description": "Rename React component to PascalCase",
      "script": "tsx-rename-to-pascal.mjs",
      "risk": "MEDIUM",
      "automated": true,
      "command": "node scripts/refactor/tsx-rename-to-pascal.mjs --single-file \"path/to/file.tsx\""
    }
  ],
  "recommendations": [...],
  "nextSteps": [...]
}
```

---

## 🔍 VIEWING REPORTS

### 📊 **USER-FRIENDLY VIEWER**
```bash
# View any JSON report
node scripts/refactor/view-single-file-report.mjs single-file-analysis-1698675123456.json

# Shows recent reports automatically
node scripts/refactor/view-single-file-report.mjs
```

### 📋 **SAMPLE VIEWER OUTPUT**
```
================================================================================
📊 SINGLE FILE NAMING ANALYSIS REPORT
================================================================================
📁 File: apps/layera-geoalert/src/components/myComponent.tsx
🕒 Analyzed: 30/10/2024, 12:34:56 μ.μ.
🎯 Category: react
📏 Rule: React components → PascalCase.tsx
❌ NEEDS FIXES
🚨 HIGH

❌ NAMING VIOLATION DETAILS:
   Current: myComponent.tsx
   Expected: React components → PascalCase.tsx
   Severity: CRITICAL

📋 ACTION PLAN (1 actions):

   1. Rename React component to PascalCase
      Risk: ⚠️ MEDIUM
      Automated: YES
      Command: node scripts/refactor/tsx-rename-to-pascal.mjs --single-file "..."
      Script: tsx-rename-to-pascal.mjs

💡 RECOMMENDATIONS:
   • 🚨 CRITICAL: React component needs PascalCase naming
   • 📝 Action: Run tsx-rename-to-pascal.mjs on this file
   • 💾 Always commit changes to Git before running scripts
   • 🔍 Test build after any naming changes
```

---

## 🔄 WORKFLOW ΓΙΑ ΑΣΦΑΛΕΙΣ ΑΛΛΑΓΕΣ

### 1️⃣ **ΠΡΟΕΤΟΙΜΑΣΙΑ**
```bash
# Commit current state
git add -A && git commit -m "🛡️ SAFETY: Before naming analysis"

# Create safety tag
git tag "safety-$(date +%Y%m%d-%H%M%S)"
```

### 2️⃣ **ΑΝΑΛΥΣΗ ΑΡΧΕΙΟΥ**
```bash
# Run orchestrator on specific file
node scripts/refactor/single-file-naming-orchestrator.mjs "path/to/target-file.tsx"
```

### 3️⃣ **ΕΛΕΓΧΟΣ ΑΠΟΤΕΛΕΣΜΑΤΩΝ**
```bash
# View the JSON report
node scripts/refactor/view-single-file-report.mjs single-file-analysis-[timestamp].json
```

### 4️⃣ **ΕΚΤΕΛΕΣΗ ACTIONS (αν ασφαλές)**
```bash
# Example: Fix React component naming
node scripts/refactor/tsx-rename-to-pascal.mjs --single-file "path/to/target-file.tsx"

# Verify no breaks
npm run typecheck
npm run build
```

### 5️⃣ **ΕΠΙΒΕΒΑΙΩΣΗ**
```bash
# Re-analyze the same file
node scripts/refactor/single-file-naming-orchestrator.mjs "path/to/target-file.tsx"

# Should show: ✅ COMPLIANT, ✅ SAFE
```

### 6️⃣ **COMMIT CHANGES**
```bash
git add -A && git commit -m "🔧 Fix naming: [specific change]"
```

---

## 🚨 SAFETY MEASURES

### ✅ **ΕΝΣΩΜΑΤΩΜΕΝΕΣ ΠΡΟΣΤΑΣΙΕΣ**
- **Single file only** - Δεν επηρεάζει άλλα αρχεία
- **Risk assessment** πριν κάθε action
- **Detailed analysis** με breakdown όλων των issues
- **Clear warnings** για high-risk operations
- **Manual review flags** για επικίνδυνες αλλαγές

### 🛡️ **EXIT CODES**
```bash
echo $?  # Check exit code after run

# 0 = Success, file is safe/compliant
# 1 = Warnings, file needs fixes but safe to process
# 2 = Critical errors, manual review required
```

### ⚠️ **ΟΤΑΝ ΝΑ ΜΗΝ ΠΡΟΧΩΡΗΣΕΙΣ**
- ❌ Risk Level: **HIGH** με **broken imports**
- ❌ Multiple **CRITICAL** violations
- ❌ **Import issues** που μπορούν να σπάσουν build
- ❌ Κάθε φορά που δεν είσαι **100% σίγουρος**

---

## 🎯 EXPERT RECOMMENDATIONS

### 💡 **ΚΑΘΗΜΕΡΙΝΗ ΧΡΗΣΗ**
1. **Πάντα ένα αρχείο κάθε φορά**
2. **Πάντα review του JSON report**
3. **Πάντα Git commit πριν αλλαγές**
4. **Πάντα test build μετά αλλαγές**

### 🔄 **SYSTEMATIC APPROACH**
1. Start με **SAFE** files πρώτα
2. Move to **LOW** risk files
3. Handle **MEDIUM** risk με προσοχή
4. **AVOID** HIGH risk files μέχρι manual review

### 📋 **DOCUMENTATION**
- Keep **all JSON reports** για tracking
- Document **any manual changes**
- Track **which files processed**
- Monitor **success/failure patterns**

---

## 🏆 SUCCESS METRICS

### ✅ **ΣΤΟΧΟΣ**
- **Zero application breaks**
- **Gradual compliance improvement**
- **Safe, controlled migration**
- **Complete audit trail**

### 📊 **TRACKING**
- Files analyzed: **count**
- Compliance improvements: **before/after**
- Zero critical failures: **✅**
- Application stability: **100%**

---

**🛡️ SAFETY-FIRST | 📊 DATA-DRIVEN | 🎯 EXPERT-VALIDATED | ⚡ CONTROLLED-VELOCITY**

**📋 Based on**: TERMINOLOGY_RULES.md ChatGPT Expert Guidance
**🤖 Generated with**: Claude Code
**⚡ Purpose**: Prevent χθεσινό catastrophic failure