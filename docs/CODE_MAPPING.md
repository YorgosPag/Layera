# 🗺️ Code-to-Documentation Mapping

## 📋 Επισκόπηση

Αυτό το αρχείο παρέχει **bidirectional mapping** μεταξύ κώδικα και documentation για το Layera ID project. Κάθε αρχείο κώδικα έχει αντίστοιχη τεκμηρίωση και κάθε section της τεκμηρίωσης αναφέρεται σε συγκεκριμένα αρχεία κώδικα.

## 🎯 Enterprise Traceability

Σε enterprise εφαρμογές, η **traceability** μεταξύ κώδικα και documentation είναι κρίσιμη για:
- **Maintenance**: Εύκολη εύρεση σχετικών αρχείων
- **Code Reviews**: Γρήγορη πρόσβαση σε documentation
- **Onboarding**: Νέοι developers καταλαβαίνουν το context
- **Compliance**: Audit trails για enterprise requirements

## 📁 Frontend Components Mapping

### Authentication System
| Αρχείο Κώδικα | Documentation Section | Περιγραφή |
|---|---|---|
| `apps/layera-id/src/contexts/AuthContext.jsx` | [ARCHITECTURE.md#authcontext-provider](./ARCHITECTURE.md#authcontext-provider) | Global authentication state |
| `apps/layera-id/src/contexts/AuthContext.jsx` | [API.md#authentication-apis](./API.md#authentication-apis) | Authentication API calls |
| `apps/layera-id/src/contexts/AuthContext.jsx` | [SECURITY.md#authentication-security](./SECURITY.md#authentication-security) | Security implementation |

### Route Protection
| Αρχείο Κώδικα | Documentation Section | Περιγραφή |
|---|---|---|
| `apps/layera-id/src/components/PrivateRoute.jsx` | [ARCHITECTURE.md#privateroute-component](./ARCHITECTURE.md#privateroute-component) | Route protection logic |
| `apps/layera-id/src/components/PrivateRoute.jsx` | [SECURITY.md#authorization-security-rbac](./SECURITY.md#authorization-security-rbac) | RBAC implementation |

### MFA Components
| Αρχείο Κώδικα | Documentation Section | Περιγραφή |
|---|---|---|
| `apps/layera-id/src/components/MfaEnroll.jsx` | [API.md#mfa-enrollment](./API.md#mfa-enrollment) | 2FA enrollment process |
| `apps/layera-id/src/components/MfaEnroll.jsx` | [SECURITY.md#multi-factor-authentication-2fa](./SECURITY.md#multi-factor-authentication-2fa) | MFA security implementation |

### UI Components
| Αρχείο Κώδικα | Documentation Section | Περιγραφή |
|---|---|---|
| `apps/layera-id/src/components/Header.jsx` | [ARCHITECTURE.md#component-dependencies](./ARCHITECTURE.md#component-dependencies) | Navigation component |
| `apps/layera-id/src/components/RoleDisplay.jsx` | [ARCHITECTURE.md#component-dependencies](./ARCHITECTURE.md#component-dependencies) | Role display logic |

### Pages
| Αρχείο Κώδικα | Documentation Section | Περιγραφή |
|---|---|---|
| `apps/layera-id/src/pages/Login.jsx` | [API.md#user-login](./API.md#user-login) | Login functionality |
| `apps/layera-id/src/pages/Signup.jsx` | [API.md#user-registration](./API.md#user-registration) | Registration process |
| `apps/layera-id/src/pages/Dashboard.jsx` | [ARCHITECTURE.md#scalability-considerations](./ARCHITECTURE.md#scalability-considerations) | Main application view |
| `apps/layera-id/src/pages/Profile.jsx` | [API.md#firestore-apis](./API.md#firestore-apis) | User profile management |

## 🔧 Backend Functions Mapping

### Cloud Functions
| Αρχείο Κώδικα | Documentation Section | Περιγραφή |
|---|---|---|
| `functions/src/index.ts` | [API.md#cloud-functions-apis](./API.md#cloud-functions-apis) | Admin API functions |
| `functions/src/index.ts` | [SECURITY.md#cloud-functions-security](./SECURITY.md#cloud-functions-security) | Function security |
| `functions/src/index.ts` | [DEPLOYMENT.md#cloud-functions-deployment](./DEPLOYMENT.md#cloud-functions-deployment) | Deployment procedures |

### Specific Functions
| Function Name | Documentation Section | Περιγραφή |
|---|---|---|
| `setRole` | [API.md#set-user-role](./API.md#set-user-role) | Role assignment API |
| `refreshMfaClaim` | [API.md#refresh-mfa-claim](./API.md#refresh-mfa-claim) | MFA status update |
| `assertAdmin` | [SECURITY.md#function-level-security](./SECURITY.md#function-level-security) | Admin validation |

## 🗃️ Database Schema Mapping

### Firestore Collections
| Collection | Documentation Section | Security Rules | Περιγραφή |
|---|---|---|---|
| `users/{uid}` | [ARCHITECTURE.md#users-collection-firestore](./ARCHITECTURE.md#users-collection-firestore) | `firestore.rules:15-17` | User profiles |
| `projects/{projectId}` | [ARCHITECTURE.md#projects-collection-firestore](./ARCHITECTURE.md#projects-collection-firestore) | `firestore.rules:25-35` | Project data |
| `admin/{document}` | [SECURITY.md#database-security-firestore-rules](./SECURITY.md#database-security-firestore-rules) | `firestore.rules:40-42` | Admin operations |
| `audit/{logId}` | [SECURITY.md#audit-logging](./SECURITY.md#audit-logging) | `firestore.rules:45-47` | Security audit logs |

## 🛡️ Security Rules Mapping

### Firestore Rules
| Rule Section | Documentation | Code Reference | Περιγραφή |
|---|---|---|---|
| `isVerified()` | [SECURITY.md#email-verification-υποχρεωτικό](./SECURITY.md#email-verification-υποχρεωτικό) | `firestore.rules:6-8` | Email verification check |
| `hasRole(role)` | [SECURITY.md#role-based-access-control-matrix](./SECURITY.md#role-based-access-control-matrix) | `firestore.rules:10-12` | Role validation |
| `hasMfa()` | [SECURITY.md#multi-factor-authentication-2fa](./SECURITY.md#multi-factor-authentication-2fa) | `firestore.rules:14-16` | MFA requirement check |

### Storage Rules
| Rule Section | Documentation | Code Reference | Περιγραφή |
|---|---|---|---|
| Profile images | [SECURITY.md#storage-security-rules](./SECURITY.md#storage-security-rules) | `storage.rules:5-12` | User profile image access |
| Project documents | [SECURITY.md#storage-security-rules](./SECURITY.md#storage-security-rules) | `storage.rules:15-25` | Project file access |

## 🔧 Admin Tools Mapping

### CLI Scripts
| Script | Documentation Section | Περιγραφή |
|---|---|---|
| `tools/admin/set-role.mjs` | [DEPLOYMENT.md#admin-tools](./DEPLOYMENT.md#admin-tools) | User role management |
| `tools/admin/check-user.mjs` | [DEPLOYMENT.md#admin-tools](./DEPLOYMENT.md#admin-tools) | User status verification |

## 📦 Configuration Mapping

### Build & Deployment
| Config File | Documentation Section | Περιγραφή |
|---|---|---|
| `apps/layera-id/package.json` | [DEPLOYMENT.md#frontend-build](./DEPLOYMENT.md#frontend-build) | Frontend dependencies |
| `functions/package.json` | [DEPLOYMENT.md#functions-build](./DEPLOYMENT.md#functions-build) | Functions dependencies |
| `firebase.json` | [DEPLOYMENT.md#hosting-configuration](./DEPLOYMENT.md#hosting-configuration) | Firebase project config |
| `firestore.rules` | [SECURITY.md#comprehensive-security-rules](./SECURITY.md#comprehensive-security-rules) | Database security |
| `storage.rules` | [SECURITY.md#storage-security-rules](./SECURITY.md#storage-security-rules) | File storage security |

### Environment Configuration
| Config | Documentation Section | Περιγραφή |
|---|---|---|
| `.env.local` | [DEPLOYMENT.md#environment-variables](./DEPLOYMENT.md#environment-variables) | Development environment |
| `.env.production` | [DEPLOYMENT.md#environment-variables](./DEPLOYMENT.md#environment-variables) | Production environment |

## 🧪 Testing Mapping

### Test Files
| Test File | Documentation Section | Code Reference | Περιγραφή |
|---|---|---|---|
| `apps/layera-id/src/test/setupTests.js` | [DEPLOYMENT.md#unit-tests](./DEPLOYMENT.md#unit-tests) | Test configuration |
| `apps/layera-id/vite.config.js` | [DEPLOYMENT.md#unit-tests](./DEPLOYMENT.md#unit-tests) | Vitest configuration |

## 📄 Documentation Cross-References

### Documentation Files Hierarchy
```
docs/
├── README.md                    ← Main project overview
├── ARCHITECTURE.md              ← System architecture
│   ├── References → API.md
│   ├── References → SECURITY.md
│   └── References → Code files
├── API.md                       ← API documentation
│   ├── References → SECURITY.md
│   ├── References → DEPLOYMENT.md
│   └── References → Function files
├── SECURITY.md                  ← Security guidelines
│   ├── References → ARCHITECTURE.md
│   ├── References → API.md
│   └── References → Security rules
├── DEPLOYMENT.md                ← Deployment procedures
│   ├── References → ARCHITECTURE.md
│   ├── References → API.md
│   └── References → Config files
└── CODE_MAPPING.md              ← This file (mapping index)
```

## 🔄 Maintenance Guidelines

### When Adding New Code
1. **Add JSDoc comments** με references σε documentation
2. **Update relevant documentation** sections
3. **Add mapping entry** σε αυτό το αρχείο
4. **Update cross-references** στα related documentation files

### When Updating Documentation
1. **Check corresponding code** για consistency
2. **Update file references** αν αλλάξουν αρχεία
3. **Update mapping entries** σε αυτό το αρχείο
4. **Verify cross-references** λειτουργούν σωστά

### Validation Checklist
```bash
# Έλεγχος για broken links
grep -r "docs/" apps/ functions/ tools/

# Έλεγχος για outdated references
grep -r "@see" apps/ functions/ tools/

# Verification των documentation links
find docs/ -name "*.md" -exec grep -l "\./" {} \;
```

## 🎯 Enterprise Compliance

### Traceability Requirements
- **ISO 27001**: Documentation traceability for security controls
- **SOC 2**: Change management και documentation consistency
- **GDPR**: Data processing documentation references
- **Code Reviews**: Required documentation updates για κάθε code change

### Audit Trail
Αυτό το mapping αρχείο serves ως **audit trail** για:
- Code-to-requirement traceability
- Documentation coverage verification
- Security control implementation tracking
- Change impact analysis

---

**Τελευταία ενημέρωση**: 17/10/2025
**Έκδοση**: 1.0
**Συντηρητής**: Layera Documentation Team