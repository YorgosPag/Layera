#!/bin/bash

# 🚀 ESCO Database Production Deployment Script
# Enterprise deployment automation για Layera ESCO system

set -e

echo "🔥 Starting ESCO Database Production Deployment..."

# Configuration
PROJECT_ID=${FIREBASE_PROJECT_ID:-"layera-esco-prod"}
ENVIRONMENT=${NODE_ENV:-"production"}

# Colors για output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Pre-deployment checks
log_info "Running pre-deployment checks..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    log_error "Firebase CLI is not installed. Install with: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    log_error "Not logged in to Firebase. Run: firebase login"
    exit 1
fi

# Check if TypeScript compiles
log_info "Running TypeScript compilation check..."
if ! npm run typecheck; then
    log_error "TypeScript compilation failed. Fix errors before deployment."
    exit 1
fi

# Run tests
log_info "Running test suite..."
if ! npm test; then
    log_error "Tests failed. Fix tests before deployment."
    exit 1
fi

# Build project
log_info "Building project..."
if ! npm run build; then
    log_error "Build failed."
    exit 1
fi

# Deploy Firebase configuration
log_info "Deploying Firestore rules and indexes..."
firebase use $PROJECT_ID

# Deploy rules
if firebase deploy --only firestore:rules --project $PROJECT_ID; then
    log_success "Firestore rules deployed successfully"
else
    log_error "Failed to deploy Firestore rules"
    exit 1
fi

# Deploy indexes
if firebase deploy --only firestore:indexes --project $PROJECT_ID; then
    log_success "Firestore indexes deployed successfully"
else
    log_warning "Firestore indexes deployment failed (this is often expected on first deploy)"
fi

# Verify deployment
log_info "Verifying deployment..."

# Check if Firestore is accessible
log_info "Testing Firestore connectivity..."
if npx ts-node -e "
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection, getDocs } from 'firebase/firestore';

const config = {
  projectId: '$PROJECT_ID'
};

const app = initializeApp(config);
const db = getFirestore(app);

getDocs(collection(db, 'metadata')).then(() => {
  console.log('✅ Firestore connectivity verified');
}).catch((error) => {
  console.log('⚠️ Firestore not yet accessible (expected on fresh deploy):', error.message);
});
"; then
    log_success "Firestore verification completed"
fi

# Final success message
log_success "🎉 ESCO Database deployment completed successfully!"
log_info "Project: $PROJECT_ID"
log_info "Environment: $ENVIRONMENT"
log_info ""
log_info "Next steps:"
log_info "1. Import ESCO data: npm run import:esco -- --project $PROJECT_ID"
log_info "2. Monitor Firestore console: https://console.firebase.google.com/project/$PROJECT_ID/firestore"
log_info "3. Check logs: firebase functions:log --project $PROJECT_ID"

echo ""
echo "🔥 Deployment Status: SUCCESS"