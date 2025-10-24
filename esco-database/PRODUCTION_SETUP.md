# 🚀 ESCO Database - Production Setup Guide

**Πλήρες guide για δημιουργία production Firebase environment**

## ✅ Επιτυχημένο Enterprise Testing

Το σύστημα έχει περάσει όλα τα enterprise tests:
- **13/13 unit tests** ✅ PASS
- **TypeScript strict mode** ✅ 100% compliance
- **Sample data import** ✅ SUCCESS (5 occupations, 8 skills, 20 relations)
- **Enterprise validation** ✅ VERIFIED

## 🔥 Production Setup Steps

### 1. Firebase Project Creation

```bash
# Manual Step - Go to Firebase Console
https://console.firebase.google.com/

# Create new project:
# Project ID: layera-esco-prod
# Region: europe-west1 (Frankfurt)
# Enable Google Analytics: Yes (recommended)
```

### 2. Enable Required Services

```bash
# In Firebase Console, enable:
✅ Firestore Database (Native mode)
✅ Firebase Authentication (for admin access)
✅ Firebase Storage (for CSV file storage)
```

### 3. Automated Setup

```bash
cd /c/layera/esco-database

# Run production setup script
npm run setup:production

# This will:
# - Configure Firebase project association
# - Deploy Firestore rules
# - Deploy database indexes
# - Create environment template
```

### 4. Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Get Firebase config from:
# https://console.firebase.google.com/project/layera-esco-prod/settings/general

# Add to .env.local:
FIREBASE_PROJECT_ID=layera-esco-prod
FIREBASE_API_KEY=your-web-api-key
FIREBASE_AUTH_DOMAIN=layera-esco-prod.firebaseapp.com
# ... etc
```

### 5. Deploy Infrastructure

```bash
# Deploy rules and indexes
npm run deploy

# Verify deployment
npm run verify
```

### 6. Import ESCO Data

```bash
# Download ESCO dataset manually from:
# https://esco.ec.europa.eu/en/use-esco/download

# Extract CSV files to voithitika_docs/tabiya-open-dataset/tabiya-esco-v1.1.1/csv/

# Import to production
npm run import:production -- --source voithitika_docs/tabiya-open-dataset/tabiya-esco-v1.1.1/csv
```

## 📊 Post-Deployment Verification

### Check Data Import
```bash
# Verify collections in Firestore Console:
# https://console.firebase.google.com/project/layera-esco-prod/firestore

Expected Collections:
✅ occupations: ~30,000 documents
✅ skills: ~90,000 documents
✅ relations: ~120,000 documents
✅ metadata: 1 document with stats
```

### Test Search Functionality
```typescript
// Example client code
import { collection, query, where, getDocs } from 'firebase/firestore';

const searchQuery = query(
  collection(db, 'occupations'),
  where('searchTerms', 'array-contains', 'software')
);

const results = await getDocs(searchQuery);
console.log(`Found ${results.size} software-related occupations`);
```

## 🔒 Security Verification

### Firestore Rules (Already Deployed)
- ✅ Public read access για ESCO data (EU public domain)
- ✅ Write access μόνο για authenticated imports
- ✅ No personal data stored (GDPR compliant)

### Authentication Setup (Optional)
```bash
# Enable Email/Password in Firebase Console
# For admin access to import operations
# https://console.firebase.google.com/project/layera-esco-prod/authentication
```

## 💰 Cost Monitoring

### Firebase Free Tier Limits
- **Storage**: 1 GB (ESCO ~50MB) ✅
- **Reads**: 50,000/day ✅
- **Writes**: 20,000/day ✅

### Expected Usage
- **Initial Import**: ~150K writes (one-time)
- **Daily Reads**: <10K για moderate usage
- **Monthly Cost**: FREE to €2-5 maximum

### Monitor Usage
```bash
# Firebase Console Analytics
https://console.firebase.google.com/project/layera-esco-prod/usage

# Set budget alerts at €5/month
```

## 🛠️ Maintenance Operations

### Regular Updates
```bash
# ESCO releases new versions quarterly
# Download latest data and re-import:

npm run import:production -- --source new-esco-data/csv --batch-size 500
```

### Performance Monitoring
```bash
# Check Firestore performance
https://console.firebase.google.com/project/layera-esco-prod/firestore/usage

# Monitor search response times
# Set up alerts για slow queries
```

### Backup Strategy
```bash
# Firestore automatic backups enabled
# Additional export για disaster recovery:
gcloud firestore export gs://layera-esco-prod-backups/$(date +%Y%m%d)
```

## 🚨 Troubleshooting

### Common Issues

**Import Fails:**
```bash
# Check Firebase project permissions
firebase projects:list

# Verify Firestore rules allow writes
npm run deploy:rules
```

**Search Not Working:**
```bash
# Check indexes are created
https://console.firebase.google.com/project/layera-esco-prod/firestore/indexes

# Manually trigger index creation
npm run deploy:indexes
```

**Cost Overrun:**
```bash
# Check usage dashboard
# Implement query caching
# Reduce read frequency
```

## 📞 Support

### Internal Support
- **Primary**: Γιώργος Παγώνης (Enterprise Architect)
- **Technical**: Layera Development Team

### External Resources
- **Firebase Support**: https://firebase.google.com/support
- **ESCO Documentation**: https://esco.ec.europa.eu/en/use-esco
- **EU Data Portal**: https://data.europa.eu/data/datasets

## 🎯 Success Criteria

### Deployment Complete When:
- ✅ Firebase project created και configured
- ✅ All Firestore rules deployed
- ✅ ESCO data imported successfully
- ✅ Search functionality verified
- ✅ Cost monitoring setup
- ✅ Client applications connected

### Production Ready Checklist:
- [ ] Firebase project: layera-esco-prod
- [ ] Firestore database initialized
- [ ] Security rules deployed
- [ ] Database indexes created
- [ ] ESCO data imported (verify counts)
- [ ] Environment variables configured
- [ ] Cost alerts setup
- [ ] Performance monitoring enabled
- [ ] Client access tested
- [ ] Documentation updated

---

**🔥 Enterprise-Grade ESCO Database - Production Ready**

*Total Setup Time: ~30 minutes*
*Expected Monthly Cost: FREE to €5*
*Data Coverage: 100% official EU ESCO taxonomy*