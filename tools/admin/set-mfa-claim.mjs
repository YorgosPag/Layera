import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({ credential: applicationDefault() });

const [uid] = process.argv.slice(2);
if (!uid) {
  console.error('Usage: node set-mfa-claim.mjs <uid>');
  process.exit(1);
}

const auth = getAuth();
const user = await auth.getUser(uid);
const enrolled = (user.multiFactor?.enrolledFactors?.length || 0) > 0;
await auth.setCustomUserClaims(uid, { ...(user.customClaims||{}), mfa: enrolled });
console.log('OK mfa ->', enrolled);