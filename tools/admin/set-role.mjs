import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({ credential: applicationDefault() });

const [uid, role] = process.argv.slice(2);
if (!uid || !role) {
  console.error('Usage: node set-role.mjs <uid> <private|broker|builder|admin>');
  process.exit(1);
}

const auth = getAuth();
const user = await auth.getUser(uid);
const claims = { ...(user.customClaims||{}), role };
await auth.setCustomUserClaims(uid, claims);
console.log('OK role ->', role);