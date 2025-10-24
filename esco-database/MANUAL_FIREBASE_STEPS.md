# 🔥 Manual Firebase Setup Steps - layera-dev Project

**Status: Firebase project επιλεγμένο, rules deployed, χρειάζεται Firestore activation**

## ✅ Completed:
- Firebase CLI logged in ✅
- Project selected: `layera-dev` ✅
- Firestore rules deployed ✅

## 📋 Manual Steps Required:

### Step 1: Enable Firestore Database
1. **Go to Firebase Console:**
   ```
   https://console.firebase.google.com/project/layera-dev/firestore
   ```

2. **Create Firestore Database:**
   - Click **"Create database"**
   - Choose **"Start in production mode"** (we have custom rules)
   - Select location: **europe-west1** or **europe-west3**
   - Click **"Done"**

### Step 2: Deploy Indexes (After Firestore is enabled)
```bash
cd C:\layera\esco-database
firebase deploy --only firestore:indexes
```

### Step 3: Import Sample ESCO Data
```bash
# Import our sample data για testing
npm run import:esco -- --project layera-dev --source sample-data --batch-size 10
```

### Step 4: Get Firebase Web Configuration
1. **Go to Project Settings:**
   ```
   https://console.firebase.google.com/project/layera-dev/settings/general
   ```

2. **Add Web App:**
   - Scroll to "Your apps"
   - Click **"Add app"** → **Web** (</>)
   - App name: `esco-demo`
   - Click **"Register app"**

3. **Copy Configuration:**
   You'll see:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "layera-dev.firebaseapp.com",
     projectId: "layera-dev",
     storageBucket: "layera-dev.appspot.com",
     messagingSenderId: "318578122017",
     appId: "1:318578122017:web:..."
   };
   ```

### Step 5: Update HTML Demo
1. **Edit the demo file:**
   ```
   C:\layera\voithitika_docs\esco-api-demo.html
   ```

2. **Replace Firebase config** (line ~376):
   ```javascript
   // Replace with YOUR config από Step 4
   const firebaseConfig = {
       apiKey: "YOUR-REAL-API-KEY",
       authDomain: "layera-dev.firebaseapp.com",
       projectId: "layera-dev",
       storageBucket: "layera-dev.appspot.com",
       messagingSenderId: "318578122017",
       appId: "YOUR-APP-ID"
   };
   ```

### Step 6: Test Live Demo
```bash
start voithitika_docs/esco-api-demo.html
```

**Expected Results:**
- Status: "✅ Connected"
- Database stats: Shows real data counts
- Search: Works με real Firebase data

## 🚀 Quick Commands Ready:

### After Manual Steps, Run These:
```bash
# Deploy indexes (after Firestore enabled)
firebase deploy --only firestore:indexes

# Import sample data
npm run import:esco -- --project layera-dev --source sample-data

# Test with more comprehensive data (if you have ESCO CSV):
# npm run import:esco -- --project layera-dev --source path/to/esco/csv
```

## 🎯 Current Status:

### ✅ Ready:
- Firebase project: `layera-dev`
- Security rules: Deployed
- Sample data: Ready για import
- HTML demo: Ready για connection

### 🔧 Needs Manual Action:
1. Enable Firestore in Console (2 clicks)
2. Get Firebase web config (copy/paste)
3. Update HTML demo config (1 line edit)

**Total time: ~5 minutes manual work**

## 🔍 Expected Final Result:

**HTML Demo will show:**
- 🔥 LIVE DATABASE: Connected to Firebase ESCO Database
- Status: ✅ Connected
- Real data counts: 5 occupations, 8 skills, 20 relations
- Fast search results από πραγματική Firestore

**This proves the architecture works και είναι ready για full ESCO import!**

---

**Next: Complete these 6 manual steps και έχουμε live ESCO database! 🚀**