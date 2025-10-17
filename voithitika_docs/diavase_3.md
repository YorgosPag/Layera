Έτοιμο. Επόμενο βήμα: ρόλοι (RBAC) + υποχρεωτικό 2FA για broker/builder/admin.

1) Ρυθμίσεις στην κονσόλα Firebase

Enable Email/Password και Google.

Enable Multi-factor authentication (Phone).

Δημιούργησε ρόλους: private, broker, builder, admin μέσω custom claims.

2) Κανόνες Firestore/Storage (με ρόλους + 2FA)

Firestore rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function isVerified() { return request.auth.token.email_verified == true; }
    function role(r) { return request.auth.token.role == r; }
    function hasMfa() { return request.auth.token.mfa == true; }

    match /users/{uid} {
      allow read: if isVerified() && request.auth.uid == uid;
      allow write: if isVerified() && request.auth.uid == uid;
    }

    // Παραδείγματα συλλογών που απαιτούν επαγγελματίες + 2FA για write
    match /projects/{id} {
      allow read:  if isVerified();
      allow write: if isVerified() && hasMfa() && (role('admin') || role('broker') || role('builder'));
    }

    match /admin/{doc=**} {
      allow read, write: if isVerified() && hasMfa() && role('admin');
    }
  }
}


Storage rules:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isVerified() { return request.auth.token.email_verified == true; }
    function role(r) { return request.auth.token.role == r; }
    function hasMfa() { return request.auth.token.mfa == true; }

    match /uploads/{allPaths=**} {
      allow read: if false;
      allow write: if isVerified() && hasMfa() && (role('admin') || role('broker') || role('builder'));
    }
  }
}


3) Εγγραφή και έλεγχος 2FA στην εφαρμογή

src/components/Verify.jsx υπάρχει. Πρόσθεσε σελίδα εγγραφής 2FA:

// src/components/MfaEnroll.jsx
import { auth } from '../firebase';
import { PhoneAuthProvider, RecaptchaVerifier, multiFactor } from 'firebase/auth';
import { useState } from 'react';

export default function MfaEnroll() {
  const [phone, setPhone] = useState('');
  async function start() {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
    const session = await multiFactor(auth.currentUser).getSession();
    const provider = new PhoneAuthProvider(auth);
    const verId = await provider.verifyPhoneNumber({ phoneNumber: phone, session }, recaptcha);
    const code = window.prompt('SMS code');
    const cred = PhoneAuthProvider.credential(verId, code);
    await multiFactor(auth.currentUser).enroll(cred, 'primary');
    alert('2FA enrolled');
    window.location.reload();
  }
  return (
    <div>
      <h3>Εγγραφή 2FA</h3>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+30..." />
      <div id="recaptcha" />
      <button onClick={start}>Εγγραφή</button>
    </div>
  );
}


4) Ανάγνωση custom claims στον client

// src/contexts/AuthContext.jsx (προσθήκη)
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
...
const [claims, setClaims] = useState({ role: 'private', mfa: false });

useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (u) => {
    if (!u) { setCurrentUser(null); setClaims({role:'private', mfa:false}); return; }
    const token = await getIdTokenResult(u, true);
    setCurrentUser(u);
    setClaims({
      role: token.claims.role || 'private',
      mfa:  token.claims.mfa === true,
    });
  });
  return unsub;
}, []);


Φραγή πρόσβασης:

// src/components/PrivateRoute.jsx
if (!currentUser) return <Navigate to="/login" replace />;
if (!currentUser.emailVerified) return <Navigate to="/verify" replace />;
// για επαγγελματικές σελίδες:
if (requirePro && !claims.mfa) return <Navigate to="/mfa-enroll" replace />;


5) Scripts για custom claims (Admin SDK)

Δημιούργησε εκτός app:

C:\layera\tools\admin\


Εγκατάσταση:

cd C:\layera\tools\admin
npm init -y
npm i firebase-admin


set-role.mjs:

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({ credential: applicationDefault() });

const [uid, role] = process.argv.slice(2);
if (!uid || !role) { console.error('Usage: node set-role.mjs <uid> <private|broker|builder|admin>'); process.exit(1); }

const auth = getAuth();
const user = await auth.getUser(uid);
const claims = { ...(user.customClaims||{}), role };
await auth.setCustomUserClaims(uid, claims);
console.log('OK role ->', role);


set-mfa-claim.mjs:

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({ credential: applicationDefault() });

const [uid] = process.argv.slice(2);
if (!uid) { console.error('Usage: node set-mfa-claim.mjs <uid>'); process.exit(1); }

const auth = getAuth();
const user = await auth.getUser(uid);
const enrolled = (user.multiFactor?.enrolledFactors?.length || 0) > 0;
await auth.setCustomUserClaims(uid, { ...(user.customClaims||{}), mfa: enrolled });
console.log('OK mfa ->', enrolled);


Εκτέλεση (Windows):

# Θέσε GOOGLE_APPLICATION_CREDENTIALS στο service account JSON (μην το βάλεις στο repo)
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\keys\layera-dev-admin.json"

cd C:\layera\tools\admin
node set-role.mjs <UID> broker
node set-mfa-claim.mjs <UID>


6) Ροή χρήστη

Ιδιώτης: login → verify email → χρήση. 2FA προαιρετικό.

Broker/Builder/Admin: admin σου θέτει role → ο χρήστης κάνει enroll 2FA → τρέχεις set-mfa-claim.mjs → αποκτά write πρόσβαση σε επαγγελματικές συλλογές.

Αν θες, δίνω αμέσως μικρό UI για “Ρόλος μου” + “Κατάσταση 2FA” και σελίδα admin διαχείρισης ρόλων.

Έτοιμο UI. Δίνει: (α) “Ο ρόλος μου” + “Κατάσταση 2FA” σελίδα χρήστη, (β) σελίδα admin για αλλαγή ρόλων. Χρειάζεται callable Functions για ασφάλεια.

1) Cloud Functions (admin-only)

functions/package.json (TypeScript):

{
  "name": "layera-admin-fns",
  "private": true,
  "scripts": {
    "build": "tsc",
    "serve": "firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions"
  },
  "engines": { "node": "20" },
  "dependencies": {
    "firebase-admin": "^12.5.0",
    "firebase-functions": "^5.0.1"
  },
  "devDependencies": { "typescript": "^5.6.3" }
}


functions/tsconfig.json:

{ "compilerOptions": { "lib": ["es2021"], "module": "commonjs", "target": "es2021", "outDir": "lib", "rootDir": "src", "esModuleInterop": true, "strict": true } }


functions/src/index.ts:

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const region = "europe-west1";

function assertAdmin(ctx: functions.https.CallableContext) {
  if (!ctx.auth?.token?.role || ctx.auth.token.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Admin only");
  }
}

export const setRole = functions.region(region).https.onCall(async (data, ctx) => {
  assertAdmin(ctx);
  const { email, uid, role } = data as { email?: string; uid?: string; role: "private"|"broker"|"builder"|"admin" };
  if (!role || (!email && !uid)) {
    throw new functions.https.HttpsError("invalid-argument", "Provide email or uid and role");
  }
  const auth = admin.auth();
  const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email!);
  await auth.setCustomUserClaims(user.uid, { ...(user.customClaims||{}), role });
  return { uid: user.uid, role };
});

export const refreshMfaClaim = functions.region(region).https.onCall(async (data, ctx) => {
  assertAdmin(ctx);
  const { email, uid } = data as { email?: string; uid?: string };
  if (!email && !uid) throw new functions.https.HttpsError("invalid-argument", "Provide email or uid");
  const auth = admin.auth();
  const user = uid ? await auth.getUser(uid) : await auth.getUserByEmail(email!);
  const enrolled = (user.multiFactor?.enrolledFactors?.length || 0) > 0;
  await auth.setCustomUserClaims(user.uid, { ...(user.customClaims||{}), mfa: enrolled });
  return { uid: user.uid, mfa: enrolled };
});


Εντολές:

cd C:\layera
firebase init functions --language typescript --region europe-west1
# Αντικατάστησε τα αρχεία με τα παραπάνω
cd functions
npm i
npm run build
npm run deploy


2) Client helpers

apps/layera-id/src/lib/functions.ts:

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const fns = getFunctions(app, "europe-west1");

export async function callSetRole(payload: { email?: string; uid?: string; role: "private"|"broker"|"builder"|"admin" }) {
  const fn = httpsCallable(fns, "setRole");
  const res = await fn(payload);
  return res.data as { uid: string; role: string };
}

export async function callRefreshMfaClaim(payload: { email?: string; uid?: string }) {
  const fn = httpsCallable(fns, "refreshMfaClaim");
  const res = await fn(payload);
  return res.data as { uid: string; mfa: boolean };
}


3) Εμφάνιση “Ρόλος μου” + “2FA”

apps/layera-id/src/components/RoleBadge.jsx:

export default function RoleBadge({ role }) {
  const map = { admin: "Διαχειριστής", broker: "Μεσίτης", builder: "Κατασκευαστής", private: "Ιδιώτης" };
  return <span style={{padding:"4px 8px", border:"1px solid #ccc", borderRadius:8}}>{map[role]||"Ιδιώτης"}</span>;
}


apps/layera-id/src/components/MfaStatus.jsx:

export default function MfaStatus({ mfa }) {
  return <span style={{padding:"4px 8px", border:"1px solid #ccc", borderRadius:8}}>
    2FA: {mfa ? "Ενεργό" : "Ανενεργό"}
  </span>;
}


apps/layera-id/src/pages/Account.jsx:

import { useAuth } from "../contexts/AuthContext";
import RoleBadge from "../components/RoleBadge";
import MfaStatus from "../components/MfaStatus";
import { Link } from "react-router-dom";

export default function Account() {
  const { currentUser, claims } = useAuth(); // claims.role, claims.mfa
  if (!currentUser) return null;
  return (
    <div style={{maxWidth:640, margin:"32px auto"}}>
      <h2>Ο λογαριασμός μου</h2>
      <p>Email: {currentUser.email}</p>
      <div style={{display:"flex", gap:12}}>
        <RoleBadge role={claims?.role||"private"} />
        <MfaStatus mfa={!!claims?.mfa} />
      </div>
      {!currentUser.emailVerified && <p>Το email δεν είναι επιβεβαιωμένο.</p>}
      {!claims?.mfa && <p><Link to="/mfa-enroll">Ενεργοποίηση 2FA</Link></p>}
    </div>
  );
}


4) Σελίδα Admin διαχείρισης ρόλων

apps/layera-id/src/pages/AdminRoles.jsx:

import { useState } from "react";
import { callSetRole, callRefreshMfaClaim } from "../lib/functions";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoles() {
  const { claims } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("private");
  const [msg, setMsg] = useState("");

  if (claims?.role !== "admin") return <p>Απαγορεύεται.</p>;

  async function onSetRole() {
    setMsg("Επεξεργασία...");
    try {
      const res = await callSetRole({ email, role });
      setMsg(`OK: ${res.uid} -> ${role}`);
    } catch (e) { setMsg(String(e?.message||e)); }
  }

  async function onRefreshMfa() {
    setMsg("Έλεγχος 2FA...");
    try {
      const res = await callRefreshMfaClaim({ email });
      setMsg(`MFA: ${res.uid} -> ${res.mfa ? "ενεργό" : "ανενεργό"}`);
    } catch (e) { setMsg(String(e?.message||e)); }
  }

  return (
    <div style={{maxWidth:720, margin:"32px auto"}}>
      <h2>Διαχείριση ρόλων</h2>
      <div style={{display:"grid", gap:12}}>
        <input placeholder="email χρήστη" value={email} onChange={e=>setEmail(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="private">Ιδιώτης</option>
          <option value="broker">Μεσίτης</option>
          <option value="builder">Κατασκευαστής</option>
          <option value="admin">Διαχειριστής</option>
        </select>
        <div style={{display:"flex", gap:8}}>
          <button onClick={onSetRole}>Ορισμός ρόλου</button>
          <button onClick={onRefreshMfa}>Ανανέωση claim 2FA</button>
        </div>
        {msg && <p>{msg}</p>}
        <p style={{fontSize:12, opacity:0.7}}>
          Σημείωση: μόνο admin μπορεί να καλέσει τα functions. Ο πελάτης δεν γράφει claims.
        </p>
      </div>
    </div>
  );
}


5) Routes

Πρόσθεσε routes στο router:

// src/App.jsx ή όπου ορίζεις routes
import Account from "./pages/Account";
import AdminRoles from "./pages/AdminRoles";
import MfaEnroll from "./components/MfaEnroll"; // από το προηγούμενο βήμα
import PrivateRoute from "./components/PrivateRoute";

<Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>} />
<Route path="/mfa-enroll" element={<PrivateRoute><MfaEnroll/></PrivateRoute>} />
<Route path="/admin/roles" element={<PrivateRoute requirePro><AdminRoles/></PrivateRoute>} />


6) Τι κερδίζεις

Ο χρήστης βλέπει άμεσα ρόλο και 2FA.

Ο admin αλλάζει ρόλους χωρίς scripts.

Ασφάλεια: μόνο admin αλλάζει claims μέσω callable function.

Παραδίδω shadcn/ui έκδοση και μικρά tests.

Εγκατάσταση shadcn/ui (Vite + Tailwind)

cd C:\layera\apps\layera-id
npx shadcn@latest init -d
npx shadcn@latest add button input select card badge label separator


Αναβαθμισμένα components (shadcn/ui)

src/components/RoleBadge.jsx

import { Badge } from "@/components/ui/badge";

const LABELS = { admin: "Διαχειριστής", broker: "Μεσίτης", builder: "Κατασκευαστής", private: "Ιδιώτης" };

export default function RoleBadge({ role = "private" }) {
  return <Badge variant="secondary">{LABELS[role] ?? LABELS.private}</Badge>;
}


src/components/MfaStatus.jsx

import { Badge } from "@/components/ui/badge";
export default function MfaStatus({ mfa }) {
  return <Badge variant={mfa ? "default" : "outline"}>2FA: {mfa ? "Ενεργό" : "Ανενεργό"}</Badge>;
}


src/pages/Account.jsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RoleBadge from "../components/RoleBadge";
import MfaStatus from "../components/MfaStatus";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Account() {
  const { currentUser, claims } = useAuth();
  if (!currentUser) return null;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader><CardTitle>Ο λογαριασμός μου</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>Email: <span className="font-mono">{currentUser.email}</span></div>
          <div className="flex gap-2">
            <RoleBadge role={claims?.role || "private"} />
            <MfaStatus mfa={!!claims?.mfa} />
          </div>
          {!currentUser.emailVerified && <div>Το email δεν είναι επιβεβαιωμένο.</div>}
          {!claims?.mfa && (
            <Link to="/mfa-enroll">
              <Button size="sm">Ενεργοποίηση 2FA</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


src/pages/AdminRoles.jsx

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { callSetRole, callRefreshMfaClaim } from "../lib/functions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AdminRoles() {
  const { claims } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("private");
  const [msg, setMsg] = useState("");

  if (claims?.role !== "admin") return <p className="p-4">Απαγορεύεται.</p>;

  async function onSetRole() {
    setMsg("Επεξεργασία...");
    try {
      const res = await callSetRole({ email, role });
      setMsg(`OK: ${res.uid} -> ${role}`);
    } catch (e) { setMsg(String(e?.message || e)); }
  }
  async function onRefreshMfa() {
    setMsg("Έλεγχος 2FA...");
    try {
      const res = await callRefreshMfaClaim({ email });
      setMsg(`MFA: ${res.uid} -> ${res.mfa ? "ενεργό" : "ανενεργό"}`);
    } catch (e) { setMsg(String(e?.message || e)); }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader><CardTitle>Διαχείριση ρόλων</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email">Email χρήστη</Label>
            <Input id="email" placeholder="user@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Ρόλος</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger><SelectValue placeholder="Επίλεξε ρόλο" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Ιδιώτης</SelectItem>
                <SelectItem value="broker">Μεσίτης</SelectItem>
                <SelectItem value="builder">Κατασκευαστής</SelectItem>
                <SelectItem value="admin">Διαχειριστής</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={onSetRole}>Ορισμός ρόλου</Button>
            <Button variant="outline" onClick={onRefreshMfa}>Ανανέωση claim 2FA</Button>
          </div>
          {msg && <p className="text-sm">{msg}</p>}
          <p className="text-xs opacity-70">Μόνο admin καλεί τα functions. Ο πελάτης δεν γράφει claims.</p>
        </CardContent>
      </Card>
    </div>
  );
}


Μικρά tests (Vitest + RTL)

Εγκατάσταση

npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom


package.json

{
  "scripts": { "test": "vitest" },
  "vitest": {
    "environment": "jsdom",
    "setupFiles": ["./src/test/setupTests.js"]
  }
}


src/test/setupTests.js

import "@testing-library/jest-dom";


src/components/tests/RoleBadge.test.jsx

import { render, screen } from "@testing-library/react";
import RoleBadge from "../RoleBadge";

test("απεικονίζει σωστά τις ετικέτες ρόλων", () => {
  render(<RoleBadge role="admin" />);  expect(screen.getByText("Διαχειριστής")).toBeInTheDocument();
});


src/components/tests/MfaStatus.test.jsx

import { render, screen } from "@testing-library/react";
import MfaStatus from "../MfaStatus";

test("δείχνει ενεργό", () => {
  render(<MfaStatus mfa={true} />);  expect(screen.getByText(/2FA: Ενεργό/)).toBeInTheDocument();
});

test("δείχνει ανενεργό", () => {
  render(<MfaStatus mfa={false} />); expect(screen.getByText(/2FA: Ανενεργό/)).toBeInTheDocument();
});


Βοηθός για mock AuthContext

// src/test/AuthMock.jsx
import { createContext, useContext } from "react";
const Ctx = createContext({ currentUser: null, claims: {} });
export const useAuth = () => useContext(Ctx);
export function AuthProviderMock({ children, value }) { return <Ctx.Provider value={value}>{children}</Ctx.Provider>; }


src/pages/tests/Account.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Account from "../Account";
import { AuthProviderMock } from "../../test/AuthMock";

test("προβάλλει email, ρόλο και 2FA", () => {
  render(
    <MemoryRouter>
      <AuthProviderMock value={{ currentUser:{ email:"user@ex.com", emailVerified:true }, claims:{ role:"broker", mfa:true }}}>
        <Account/>
      </AuthProviderMock>
    </MemoryRouter>
  );
  expect(screen.getByText(/user@ex.com/)).toBeInTheDocument();
  expect(screen.getByText("Μεσίτης")).toBeInTheDocument();
  expect(screen.getByText(/2FA: Ενεργό/)).toBeInTheDocument();
});


Mock των callable functions

// src/lib/__mocks__/functions.js
export const callSetRole = vi.fn(async ({ email, role }) => ({ uid: "UID123", role }));
export const callRefreshMfaClaim = vi.fn(async ({ email }) => ({ uid: "UID123", mfa: true }));


src/pages/tests/AdminRoles.test.jsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminRoles from "../AdminRoles";
import { AuthProviderMock } from "../../test/AuthMock";

// mock τα functions
vi.mock("../../lib/functions", async () => {
  return {
    callSetRole: vi.fn(async ({ email, role }) => ({ uid: "U1", role })),
    callRefreshMfaClaim: vi.fn(async ({ email }) => ({ uid: "U1", mfa: true })),
  };
});

test("απορρίπτει μη-admin", () => {
  render(
    <MemoryRouter>
      <AuthProviderMock value={{ currentUser:{email:"x@x"}, claims:{ role:"private" }}}>
        <AdminRoles/>
      </AuthProviderMock>
    </MemoryRouter>
  );
  expect(screen.getByText("Απαγορεύεται.")).toBeInTheDocument();
});

test("ο admin ορίζει ρόλο και ανανεώνει mfa", async () => {
  render(
    <MemoryRouter>
      <AuthProviderMock value={{ currentUser:{email:"admin@x"}, claims:{ role:"admin" }}}>
        <AdminRoles/>
      </AuthProviderMock>
    </MemoryRouter>
  );
  // set email
  const email = screen.getByPlaceholderText("user@example.com");
  fireEvent.change(email, { target: { value: "user@ex.com" } });

  // open select και επέλεξε broker
  fireEvent.mouseDown(screen.getByRole("combobox")); // SelectTrigger is combobox
  fireEvent.click(await screen.findByText("Μεσίτης"));

  fireEvent.click(screen.getByText("Ορισμός ρόλου"));
  await waitFor(() => expect(screen.getByText(/OK:/)).toBeInTheDocument());

  fireEvent.click(screen.getByText("Ανανέωση claim 2FA"));
  await waitFor(() => expect(screen.getByText(/MFA:/)).toBeInTheDocument());
});


Σημειώσεις

Οι δοκιμές χρησιμοποιούν vitest και jsdom.

Τα imports @/components/ui/* προϋποθέτουν alias @ -> src. Αν δεν υπάρχει, πρόσθεσέ το στο vite.config.ts.

Αν δεν έχεις Tailwind ρυθμισμένο, κάνε το πριν τα shadcn components.