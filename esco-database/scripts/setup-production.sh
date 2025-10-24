#!/bin/bash

# 🏗️ ESCO Database Production Setup Script
# One-time setup για production Firebase project

set -e

echo "🏗️ Setting up ESCO Database Production Environment..."

# Configuration
PROJECT_ID=${1:-"layera-esco-prod"}
REGION="europe-west1"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verify prerequisites
log_info "Verifying prerequisites..."

if ! command -v firebase &> /dev/null; then
    log_error "Firebase CLI not found. Install with: npm install -g firebase-tools"
    exit 1
fi

if ! command -v gcloud &> /dev/null; then
    log_warning "Google Cloud CLI not found. Some features may be limited."
fi

# Login check
if ! firebase projects:list &> /dev/null; then
    log_error "Not authenticated with Firebase. Run: firebase login"
    exit 1
fi

log_info "Setting up Firebase project: $PROJECT_ID"

# Create or verify project exists
log_info "Checking if project $PROJECT_ID exists..."
if firebase projects:list | grep -q "$PROJECT_ID"; then
    log_success "Project $PROJECT_ID already exists"
else
    log_info "Creating new Firebase project: $PROJECT_ID"

    echo ""
    echo "🚨 MANUAL STEP REQUIRED:"
    echo "   1. Go to https://console.firebase.google.com/"
    echo "   2. Click 'Add Project'"
    echo "   3. Project ID: $PROJECT_ID"
    echo "   4. Enable Google Analytics (recommended)"
    echo "   5. Select region: $REGION"
    echo ""
    read -p "Press Enter when project is created in Firebase Console..."
fi

# Associate local project with Firebase project
log_info "Associating local project with Firebase..."
firebase use $PROJECT_ID

# Enable required APIs
log_info "Enabling required Firebase services..."

log_info "Please enable the following services in Firebase Console:"
echo "  1. Firestore Database"
echo "  2. Firebase Authentication (for future admin access)"
echo "  3. Firebase Storage (for ESCO CSV file storage)"
echo ""
read -p "Press Enter when services are enabled..."

# Initialize Firestore
log_info "Initializing Firestore database..."
echo ""
echo "🚨 MANUAL STEP REQUIRED:"
echo "   1. Go to https://console.firebase.google.com/project/$PROJECT_ID/firestore"
echo "   2. Click 'Create database'"
echo "   3. Start in production mode (we have custom rules)"
echo "   4. Select region: $REGION"
echo ""
read -p "Press Enter when Firestore is initialized..."

# Deploy initial configuration
log_info "Deploying Firestore rules and indexes..."

if firebase deploy --only firestore:rules --project $PROJECT_ID; then
    log_success "Firestore rules deployed"
else
    log_error "Failed to deploy Firestore rules"
    exit 1
fi

if firebase deploy --only firestore:indexes --project $PROJECT_ID; then
    log_success "Firestore indexes deployed"
else
    log_warning "Firestore indexes deployment failed (will be created automatically on first queries)"
fi

# Create service account (manual step)
echo ""
echo "🔑 SERVICE ACCOUNT SETUP (Optional για automated imports):"
echo "   1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts?project=$PROJECT_ID"
echo "   2. Create service account: 'esco-import-service'"
echo "   3. Grant roles: 'Cloud Datastore User', 'Firebase Admin'"
echo "   4. Create JSON key and save securely"
echo ""

# Setup environment file
log_info "Creating environment configuration..."

if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    log_info "Created .env.local from template"
    echo ""
    echo "🔧 CONFIGURATION REQUIRED:"
    echo "   Edit .env.local and add your Firebase config:"
    echo "   1. Get config from: https://console.firebase.google.com/project/$PROJECT_ID/settings/general"
    echo "   2. Copy 'Web app' configuration"
    echo "   3. Update FIREBASE_* variables in .env.local"
    echo ""
else
    log_info ".env.local already exists"
fi

# Display next steps
log_success "🎉 Production setup completed!"
echo ""
echo "📋 NEXT STEPS:"
echo "   1. Configure .env.local with Firebase settings"
echo "   2. Download ESCO dataset: npm run download:esco"
echo "   3. Import data: npm run import:esco -- --project $PROJECT_ID"
echo "   4. Verify deployment: npm run verify:deployment"
echo ""
echo "📚 USEFUL COMMANDS:"
echo "   • Deploy updates: ./scripts/deploy.sh"
echo "   • View logs: firebase functions:log --project $PROJECT_ID"
echo "   • Open console: firebase open --project $PROJECT_ID"
echo ""
echo "🔥 Project URL: https://console.firebase.google.com/project/$PROJECT_ID"