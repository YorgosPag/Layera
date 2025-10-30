# 🏛️ ENTERPRISE NAMING SYSTEM - LAYERA PROJECT

**📅 Έκδοση**: 2.0.0
**👨‍💻 Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης
**🎯 Status**: Production Ready
**📋 Βάση**: Fortune 500 Standards + Industry Best Practices

---

## 📑 ΠΙΝΑΚΑΣ ΠΕΡΙΕΧΟΜΕΝΩΝ

1. [🎯 Στρατηγική Επισκόπηση](#στρατηγική-επισκόπηση)
2. [📋 Κανόνες Ονοματοδοσίας ανά Τύπο](#κανόνες-ονοματοδοσίας-ανά-τύπο)
3. [🔄 Migration Strategy](#migration-strategy)
4. [🛠️ Εργαλεία & Automation](#εργαλεία--automation)
5. [✅ Validation & Compliance](#validation--compliance)
6. [📊 Enterprise Context](#enterprise-context)

---

## 🎯 ΣΤΡΑΤΗΓΙΚΗ ΕΠΙΣΚΟΠΗΣΗ

### **🎪 Υβριδικό Μοντέλο Ονοματοδοσίας**

**Φιλοσοφία**: Συμμόρφωση με διεθνή standards όπου είναι κρίσιμο + εσωτερική συνέπεια όπου δεν υπάρχει καθιερωμένο convention.

### **📊 Προτεραιότητες Compliance:**
1. **🥇 TIER 1**: Οικοσύστημα/βιομηχανικά conventions (npm/Unix, GitHub canonical names)
2. **🥈 TIER 2**: Τοπικό RFC του repository
3. **🥉 TIER 3**: Τεκμηριωμένες εξαιρέσεις ανά φάκελο

---

## 📋 ΚΑΝΟΝΕΣ ΟΝΟΜΑΤΟΔΟΣΙΑΣ ΑΝΑ ΤΥΠΟ

### **📁 Φάκελοι & Directory Structure**
```bash
✅ ΣΩΣΤΟ: kebab-case
packages/auth-bridge/
apps/layera-geoalert/
docs-enterprise/
scripts/domains/validation/

❌ ΛΑΘΟΣ:
packages/AuthBridge/        # PascalCase φάκελοι
apps/layera_geoalert/       # underscore naming
docs_enterprise/            # underscore naming
```

### **📄 Αρχεία Κώδικα**

#### **🔷 TypeScript/JavaScript Files**
```typescript
✅ ΣΩΣΤΟ: kebab-case.ts/js (εκτός React components)
src/user-service.ts
src/api-client.js
src/validation-utils.ts

❌ ΛΑΘΟΣ:
src/userService.ts          # camelCase για μη-React files
src/api_client.js           # underscore naming
src/ValidationUtils.ts      # PascalCase για utility files
```

#### **⚛️ React Components**
```typescript
✅ ΣΩΣΤΟ: PascalCase.tsx
src/components/UserCard.tsx
src/components/NavigationMenu.tsx
src/layouts/AppShell.tsx

❌ ΛΑΘΟΣ:
src/components/userCard.tsx     # camelCase components
src/components/user-card.tsx    # kebab-case components
src/layouts/app_shell.tsx       # underscore naming
```

#### **🧪 Test Files**
```typescript
✅ ΣΩΣΤΟ: matching-name.test.ts/tsx (δίπλα στο αρχείο)
src/user-service.test.ts
src/components/UserCard.test.tsx
src/utils/validation.spec.ts

❌ ΛΑΘΟΣ:
tests/user_service_test.ts      # underscore + separate location
__tests__/UserCard.test.tsx     # separate __tests__ folder
src/userService.test.ts         # camelCase για non-React
```

#### **📦 Barrel Files (index.ts)**
```typescript
✅ ΣΩΣΤΟ: index.ts μόνο για δημόσια surface
packages/auth-bridge/src/index.ts
packages/ui/src/components/index.ts

❌ ΛΑΘΟΣ:
src/utils/index.ts              # overuse of barrels
src/helpers/index.ts            # unnecessary barrel files
```

### **📜 Scripts & CLI Tools**

#### **🔧 Build/Automation Scripts**
```bash
✅ ΣΩΣΤΟ: kebab-case.js (όλα τα executable scripts)
scripts/domains/design/fix-hardcoded-colors.js
scripts/validation/check-duplicates.js
tools/build-packages.mjs

❌ ΛΑΘΟΣ:
scripts/domains/design/fixHardcodedColors.js    # camelCase scripts
scripts/validation/checkDuplicates.js          # camelCase scripts
```

#### **📋 NPM Script Keys**
```json
✅ ΣΩΣΤΟ: ομαδοποίηση με colon
{
  "scripts": {
    "build:packages": "...",
    "test:unit": "...",
    "fix:colors": "...",
    "validate:naming": "...",
    "docs:generate": "..."
  }
}

❌ ΛΑΘΟΣ:
{
  "scripts": {
    "buildPackages": "...",      # camelCase script names
    "test_unit": "...",          # underscore script names
    "fix-colors": "...",         # flat naming without groups
  }
}
```

### **📚 Documentation Files**

#### **📘 Canonical GitHub Files**
```bash
✅ ΣΩΣΤΟ: Σταθερά ονόματα (GitHub standard)
README.md
LICENSE
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
CHANGELOG.md

❌ ΛΑΘΟΣ:
readme.md                    # lowercase canonical files
code-of-conduct.md          # kebab-case canonical files
```

#### **📖 Enterprise Documentation**
```bash
✅ ΣΩΣΤΟ: kebab-case.md (μη-canonical αρχεία)
docs-enterprise/naming-conventions.md
docs-enterprise/lego-systems-registry.md
docs-enterprise/implementation-guide.md

❌ ΛΑΘΟΣ:
docs-enterprise/NAMING_CONVENTIONS.md          # CAPS_UNDERSCORE
docs-enterprise/Lego-Systems-Registry.md       # Mixed Case
docs-enterprise/implementationGuide.md         # camelCase
```

### **🎨 Assets & Resources**

#### **🖼️ Images, CSS, etc.**
```bash
✅ ΣΩΣΤΟ: kebab-case.ext
assets/images/layera-logo.png
styles/components/user-card.css
public/icons/navigation-menu.svg

❌ ΛΑΘΟΣ:
assets/images/LayeraLogo.png        # PascalCase assets
styles/components/userCard.css      # camelCase assets
public/icons/navigation_menu.svg    # underscore assets
```

### **🏷️ Package & Module Names**

#### **📦 NPM Package Names**
```json
✅ ΣΩΣΤΟ: @layera/kebab-case
@layera/auth-bridge
@layera/user-management
@layera/geo-drawing

❌ ΛΑΘΟΣ:
@layera/authBridge           # camelCase packages
@layera/user_management      # underscore packages
@layera/GeodrawingUtils      # PascalCase packages
```

#### **🔗 Import Paths**
```typescript
✅ ΣΩΣΤΟ: kebab-case για relative imports
import { UserService } from './user-service';
import { ApiClient } from '../api/api-client';
import { Button } from '@layera/ui';

❌ ΛΑΘΟΣ:
import { UserService } from './userService';     # camelCase paths
import { ApiClient } from '../api/apiClient';   # camelCase paths
```

---

## 🔄 MIGRATION STRATEGY

### **📋 Phase-Based Implementation**

#### **🎯 Phase 1: Κρίσιμα Scripts & Tools (Άμεση Προτεραιότητα)**
- ✅ Scripts που καλούνται από npm
- ✅ CLI tools και automation
- ✅ Build configuration files

#### **🎯 Phase 2: Documentation & Canonical Files**
- ✅ GitHub canonical files (README.md, etc.)
- ✅ Enterprise documentation structure
- ✅ Package documentation

#### **🎯 Phase 3: TypeScript/JavaScript Modules**
- ✅ Non-React utility files
- ✅ Service layers
- ✅ Configuration files

#### **🎯 Phase 4: React Components**
- ✅ Component files → PascalCase.tsx
- ✅ Component-related tests
- ✅ Storybook stories

#### **🎯 Phase 5: Assets & Resources**
- ✅ Images, CSS, configs
- ✅ Public assets
- ✅ Build artifacts

### **⚠️ Migration Risks & Mitigation**

#### **🚨 High-Risk Operations:**
- **File renaming**: Μπορεί να σπάσει imports και git history
- **Case-only changes**: Προβληματικά σε Windows/macOS
- **Package renames**: Επηρεάζει dependencies

#### **🛡️ Risk Mitigation:**
- **Git mv με διπλό βήμα** για case-only αλλαγές
- **Automated import updates** με AST-based tools
- **Phase-by-phase implementation** για ελέγχιμη πρόοδο
- **Comprehensive backups** πριν κάθε φάση

---

## 🛠️ ΕΡΓΑΛΕΙΑ & AUTOMATION

### **🔧 ESLint Configuration**
```javascript
// Enterprise-grade filename validation
module.exports = {
  plugins: ['unicorn', 'import'],
  overrides: [
    {
      files: ['**/*.{js,ts}'],
      rules: {
        'unicorn/filename-case': ['error', {
          case: 'kebabCase',
          ignore: ['^index\\.[jt]s$']
        }]
      }
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }]
      }
    }
  ]
};
```

### **🤖 Automation Scripts**
- **`rename-to-kebab.mjs`**: Μαζική μετονομασία JS/TS files
- **`tsx-to-pascal.mjs`**: React components σε PascalCase
- **`update-imports.mjs`**: Αυτόματη ενημέρωση import paths
- **`validate-naming.js`**: Compliance checking

### **🔄 CI/CD Integration**
- **Pre-commit hooks**: Αποτροπή μη-compliant αρχείων
- **PR validation**: Αυτόματος έλεγχος naming conventions
- **Compliance scoring**: 0-100% enterprise compliance metrics

---

## ✅ VALIDATION & COMPLIANCE

### **📊 Compliance Levels**

#### **🥇 GOLD (95%+): Excellent Enterprise Standard**
- Τέλεια συμμόρφωση με όλους τους κανόνες
- Zero exceptions εκτός αιτιολογημένων cases
- Πλήρης automation με CI/CD

#### **🥈 SILVER (85%+): Good Enterprise Compliance - PASS**
- Συμμόρφωση με κρίσιμους κανόνες
- Μικρές εξαιρέσεις σε non-critical files
- Acceptable για production deployment

#### **🥉 BRONZE (75%+): Minimum Acceptable**
- Βασική συμμόρφωση με core standards
- Χρειάζεται βελτίωση πριν major releases
- Warning level - χρειάζεται προσοχή

#### **❌ FAILED (<75%): Unacceptable για Enterprise**
- Πολλές παραβιάσεις naming standards
- Blocked από CI/CD pipeline
- Άμεση επέμβαση απαιτείται

### **🔍 Validation Commands**
```bash
# Βασικός έλεγχος compliance
npm run naming:validate

# Λεπτομερής ανάλυση με breakdown
npm run naming:validate --detailed

# Strict mode (αυστηρότεροι κανόνες)
npm run naming:validate --strict

# Preview αλλαγών χωρίς εκτέλεση
npm run naming:fix-preview
```

---

## 📊 ENTERPRISE CONTEXT

### **🏢 Project Specifications**
- **Μέγεθος**: 54 packages, 2 apps, πολλαπλοί developers
- **Stack**: TypeScript/React/Node.js monorepo
- **Audience**: Enterprise χρήση, όχι public library
- **CI/CD**: Automated validation με scripts
- **Team**: Mixed seniority levels

### **🎯 Business Impact**

#### **✅ Οφέλη Συνεπούς Ονοματοδοσίας:**
- **Μειωμένο cognitive load** για νέους developers
- **Λιγότερα λάθη** στα scripts και paths
- **Καλύτερη συμβατότητα** εργαλείων
- **Ευκολότερη maintenance** και refactoring
- **Professional image** για enterprise clients

#### **⚠️ Κόστη Μη-Συμμόρφωσης:**
- **Αυξημένος χρόνος** onboarding νέων developers
- **Περισσότερα bugs** από path/import λάθη
- **Δυσκολία automation** λόγω inconsistency
- **Technical debt** accumulation
- **Unprofessional appearance** σε code reviews

### **📈 ROI Analysis**
- **Short-term cost**: 2-3 εβδομάδες migration effort
- **Long-term benefit**: 15-20% μείωση στο development time
- **Risk mitigation**: 50% λιγότερα path-related bugs
- **Team efficiency**: Faster onboarding και code navigation

---

## 🎯 NEXT STEPS

### **📋 Immediate Actions Required**
1. **📥 Review & Approve** αυτό το Enterprise Naming System
2. **🔧 Setup tooling** (ESLint rules, automation scripts)
3. **📋 Create implementation roadmap** για migration phases
4. **👥 Team training** σε νέα naming conventions
5. **🚀 Begin Phase 1** implementation (scripts & tools)

### **📚 Related Documentation**
- `ENTERPRISE_NAMING_IMPLEMENTATION_GUIDE.md` - Detailed implementation steps
- `ENTERPRISE_NAMING_MIGRATION_STRATEGY.md` - Comprehensive migration plan
- `NAMING_CONVENTIONS_VALIDATION_REPORT.json` - Current compliance baseline

---

**🔥 ΚΛΕΙΔΙ ΓΙΑ ΕΠΙΤΥΧΙΑ**: Consistency + Automation + Gradual Implementation = Enterprise Excellence

---

**📞 Contact**: Γιώργος Παγώνης, Enterprise Architecture Supervisor
**📅 Last Updated**: 30 Οκτωβρίου 2025
**🔄 Version**: 2.0.0 - Production Ready