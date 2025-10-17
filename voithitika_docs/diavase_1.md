Θέλω να μελετήσεις πολύ καλά αυτόν τον κώδικα, αυτό το αρχείο ZIP, και να μου πεις εάν έχουν τηρηθεί όλα όσα συζητήσαμε ή όχι. Αν είναι μία εντεφράει μέχρι στιγμής δομή αυτή. Δεν θα ξεχνάς ότι θέλουμε η αρχιτεκτονική να είναι αρθρωτή, να μπορούμε να προσθέτουμε εύκολα και να αφαιρούμε κομμάτια, τουβλάκια, πονκώδικα, και να μπορούμε να διανέμουμε ή να ενσωματώνουμε τις εφαρμογές εύκολα σε άλλα σημεία ή σε άλλα προγράμματα. Πονκώδικα αυτών σε άλλα σημεία ή σε άλλα προγράμματα. Το πιο ιδανικό είναι να μπορεί κάθε κομμάτι που χτίζουμε να μπορεί να μεταφέρεται από εφαρμογή σε εφαρμογή ή από υποεφαρμογή σε υποεφαρμογή. Να είναι πολύ αρθρωτοί, αλλά να τηρούνται οι κανόνες του διεθνούς προγραμματισμού.
Το ChatGPT είπε:

Σκέφτηκε για 2m 40s
Συμπέρασμα: έχεις καλό “πυρήνα ταυτότητας”, αλλά όχι ακόμη πραγματικό monorepo ούτε πλήρη “τουβλάκια”. Είναι οργανωμένο repo πολλών φακέλων, όχι ενιαίο workspace.

Τι τηρήθηκε
Κεντρικό Login/Identity (“Layera ID”) υπάρχει και δουλεύει.

Σύνδεση email + Google με επιβεβαίωση e-mail πριν από ιδιωτικές ροές.

Έλεγχος ρόλων και 2FA στα “επαγγελματικά” (κανόνες Firestore/Storage ζητούν verified και mfa όπου πρέπει).

Ρυθμίσεις με μεταβλητές περιβάλλοντος. Καλή βάση για μεταφορά.

Τι δεν τηρήθηκε / Ασυμφωνίες
Όχι monorepo: δεν υπάρχουν workspaces (root package.json χωρίς workspaces, ούτε pnpm/yarn workspaces, ούτε turbo/nx).

Δεν υπάρχει κοινό πακέτο-γεφυρα για να κουμπώνει το login σε άλλες εφαρμογές (το προτεινόμενο packages/auth-bridge λείπει).

2FA στα docs μιλά για SMS. Εμείς αποφασίσαμε χωρίς SMS τώρα. Χρειάζεται προσαρμογή σε TOTP/“app” αργότερα, και απενεργοποίηση απαίτησης όπου δεν πρέπει.

Καμία κοινή εργαλειοθήκη (lint/test/build) σε επίπεδο ρίζας.

Διανομή/ενσωμάτωση: δεν έχεις ακόμα σαφές “συμβόλαιο” embed/plug-in για να μεταφέρεται κομμάτι από εφαρμογή σε εφαρμογή.

Τι να αλλάξεις τώρα (μικρά, στοχευμένα)
Κάν’ το monorepo: πρόσθεσε root workspaces.

package.json (workspaces: ["apps/*","packages/*","functions","tools/*"])

pnpm-workspace.yaml ή yarn workspaces.

Φτιάξε “τουβλάκι” login: νέο packages/auth-bridge με LoginButton, RequireVerified, helpers. Όλες οι μελλοντικές apps θα το καταναλώνουν.

Ευθυγράμμισε 2FA: κράτα τις ροές UI, αλλά μην απαιτείς SMS τώρα. Στους κανόνες, 2FA μόνο όπου ορίσαμε (μεσίτες/κατασκευαστές/admin).

Κοινό tooling στη ρίζα: lint, typecheck, test, build scripts για όλα.

Συμβόλαιο ενσωμάτωσης: μία απλή περιγραφή πώς άλλο app χρησιμοποιεί το auth-bridge και πώς γίνεται redirect/guard.

Docs update: διόρθωσε τα έγγραφα ασφαλείας ώστε να ταιριάζουν με τις αποφάσεις μας (χωρίς SMS τώρα, TOTP αργότερα).

Θες να σου γράψω έτοινα τα αρχεία package.json (root) και pnpm-workspace.yaml + σκελετό packages/auth-bridge για να τα δώσεις στον agent;

Είπες:
Ναι, θα ήθελα να μου το δώσεις. Ευχαριστώ πολύ.
Το ChatGPT είπε:

Σκέφτηκε για 8s
Έτοιμα αρχεία για πραγματικό monorepo και “τουβλάκι” login.

1) Ρίζα repo
package.json (root)
{
  "name": "layera",
  "private": true,
  "version": "0.1.0",
  "workspaces": [
    "apps/*",
    "packages/*",
    "functions",
    "tools/*"
  ],
  "scripts": {
    "dev:id": "npm --workspace apps/layera-id run dev",
    "build:id": "npm --workspace apps/layera-id run build",
    "lint": "eslint .",
    "typecheck": "tsc -b --pretty false",
    "clean": "git clean -fdX"
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "typescript": "^5.6.0"
  }
}
pnpm-workspace.yaml (αν θες pnpm)
packages:
  - "apps/*"
  - "packages/*"
  - "functions"
  - "tools/*"
2) Πακέτο “τουβλάκι” auth-bridge
packages/auth-bridge/package.json
{
  "name": "@layera/auth-bridge",
  "version": "0.1.0",
  "private": false,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "rimraf dist"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "firebase": ">=10"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "rimraf": "^6.0.0"
  }
}
packages/auth-bridge/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
packages/auth-bridge/src/index.ts
import type { Auth, User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

let _auth: Auth | null = null;

/** Καλείται μια φορά από το host app. */
export function setAuth(auth: Auth) {
  _auth = auth;
}

export function getAuthUnsafe(): Auth {
  if (!_auth) throw new Error("auth-bridge: call setAuth(auth) first");
  return _auth;
}

export function onAuthChange(cb: (user: User | null) => void) {
  const auth = getAuthUnsafe();
  return onAuthStateChanged(auth, cb);
}

export function isSignedIn(): boolean {
  const auth = getAuthUnsafe();
  return !!auth.currentUser;
}

export function isVerified(): boolean {
  const auth = getAuthUnsafe();
  const u = auth.currentUser;
  return !!u && !!u.emailVerified;
}

/** Context για γρήγορη πρόσβαση στο user */
const UserCtx = createContext<User | null | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getAuthUnsafe();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), [auth]);
  const value = useMemo(() => user ?? null, [user]);
  return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;
}

export function useCurrentUser(): User | null {
  const v = useContext(UserCtx);
  return v === undefined ? null : v;
}

/** Guard: απαιτεί verified email, αλλιώς δείχνει fallback. */
export function RequireVerified({
  children,
  fallback
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const user = useCurrentUser();
  if (!user) return <>{fallback ?? null}</>;
  if (!user.emailVerified) return <>{fallback ?? null}</>;
  return <>{children}</>;
}

/** Κουμπί login που στέλνει στο /login (ρυθμιζόμενο). */
export function LoginButton({
  to = "/login",
  label = "Σύνδεση"
}: {
  to?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.location.href = to;
      }}
    >
      {label}
    </button>
  );
}
packages/auth-bridge/README.md
# @layera/auth-bridge

Ελαφρύ “τουβλάκι” για σύνδεση/φύλαξη πρόσβασης σε άλλα apps.

## Χρήση

```ts
// host app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setAuth, AuthProvider, RequireVerified, LoginButton } from "@layera/auth-bridge";

const app = initializeApp({...});
setAuth(getAuth(app));

function App() {
  return (
    <AuthProvider>
      <RequireVerified fallback={<LoginButton to="/login" />}>
        {/* protected content */}
      </RequireVerified>
    </AuthProvider>
  );
}
setAuth(getAuth(app)) μία φορά στην εκκίνηση.

RequireVerified απαιτεί επιβεβαιωμένο email.

LoginButton απλό redirect στο /login.


---

Θες και snippet για ενσωμάτωση στο `apps/layera-id` (π.χ. να τυλίξεις το App με `AuthProvider` και να εκθέσεις ένα demo protected component);
::contentReference[oaicite:0]{index=0}
Είπες:
Ναι, ευχαριστώ. Θα το ήθελα. Σας ευχαριστώ πολύ.
Το ChatGPT είπε:

Σκέφτηκε για 19s
Έτοιμα, κοφτά. Ενσωμάτωση του “τουβλακιού” @layera/auth-bridge στο apps/layera-id.

1) apps/layera-id/package.json
Πρόσθεσε εξάρτηση στο workspace.

{
  "dependencies": {
    "@layera/auth-bridge": "workspace:*"
  }
}
2) apps/layera-id/src/lib/firebase.ts
(Χρησιμοποίησε τα δικά σου κλειδιά και το σωστό storageBucket.)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET // π.χ. layera-dev.appspot.com
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
3) apps/layera-id/src/main.tsx
Τύλιξε όλη την εφαρμογή με AuthProvider και δώσε το auth στο bridge.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { auth } from "./lib/firebase";
import { setAuth, AuthProvider } from "@layera/auth-bridge";

setAuth(auth);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
4) apps/layera-id/src/routes/ProtectedDemo.tsx
Παράδειγμα προστατευμένης οθόνης.

import { RequireVerified, LoginButton } from "@layera/auth-bridge";

export default function ProtectedDemo() {
  return (
    <RequireVerified fallback={<LoginButton to="/login" label="Σύνδεση απαιτείται" />}>
      <div>Περιεχόμενο μόνο για χρήστες με επιβεβαιωμένο email.</div>
    </RequireVerified>
  );
}
5) apps/layera-id/src/App.tsx
Αν έχεις router, πρόσθεσε route. Αν όχι, απλώς κάνε import και βάλε το component κάπου.

// με React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedDemo from "./routes/ProtectedDemo";
import Login from "./routes/Login";      // το υπάρχον δικό σου
import Register from "./routes/Register"; // το υπάρχον δικό σου
import Account from "./routes/Account";   // το υπάρχον δικό σου

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Αρχική</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/protected" element={<ProtectedDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
6) Παράδειγμα guard σε οποιοδήποτε κουμπί “Αποθήκευση”
import { RequireVerified, LoginButton } from "@layera/auth-bridge";

function SaveSection() {
  return (
    <RequireVerified fallback={<LoginButton to="/login" label="Σύνδεση για αποθήκευση" />}>
      <button type="button" onClick={() => {/* save logic */}}>Αποθήκευση</button>
    </RequireVerified>
  );
}
7) .env.example (υπενθύμιση)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=layera-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=layera-dev
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_STORAGE_BUCKET=layera-dev.appspot.com
8) Εντολές
Ρίζα: npm i

Dev: npm run dev:id

Θες και μίνι demo σε απλό HTML/TSX αρχείο που δείχνει μόνο LoginButton + RequireVerified χωρίς router;

Είπες:
Ναι, δώσε μου κι αυτό. Σε ευχαριστώ, δώσ' το μου.
Το ChatGPT είπε:

Σκέφτηκε για 6s
Έτοιμο μίνι demo χωρίς router. Δείχνει μόνο LoginButton + RequireVerified.

1) apps/layera-id/index.html
<!doctype html>
<html lang="el">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Layera ID – Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/demo/minimal.tsx"></script>
  </body>
</html>
2) apps/layera-id/src/demo/minimal.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { auth } from "../lib/firebase";          // υπάρχει ήδη
import { setAuth, AuthProvider, RequireVerified, LoginButton } from "@layera/auth-bridge";

setAuth(auth);

function ProtectedBox() {
  return <div style={{padding:16, border:"1px solid #ccc"}}>Περιεχόμενο για verified χρήστες</div>;
}

function App() {
  return (
    <AuthProvider>
      <h1>Layera ID – Μίνι Demo</h1>

      <section style={{marginTop:12}}>
        <h2>Πρόσβαση</h2>
        <p>Αν δεν είσαι συνδεδεμένος ή δεν έχεις επιβεβαιωμένο e-mail, θα δεις κουμπί σύνδεσης.</p>
        <RequireVerified fallback={<LoginButton to="/login" label="Σύνδεση / Επιβεβαίωση" />}>
          <ProtectedBox />
        </RequireVerified>
      </section>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
3) Υπενθύμιση .env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=layera-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=layera-dev
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_STORAGE_BUCKET=layera-dev.appspot.com
4) Εκτέλεση
npm i
npm run dev:id
Αν θες, δίνω και ελάχιστο Login.tsx για /login.

Είπες:
Ναι, ευχαριστώ πολύ. Δώσε μου και αυτό το ελάχιστο λόγινο.
Το ChatGPT είπε:

Σκέφτηκε για 10s
Έτοιμο ελάχιστο /login.

apps/layera-id/src/routes/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [needsVerify, setNeedsVerify] = useState(false);

  async function onEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pass);
      if (!user.emailVerified) {
        setNeedsVerify(true);
        setMsg("Συνδέθηκες. Χρειάζεται επιβεβαίωση e-mail πριν συνεχίσεις.");
        return;
      }
      nav("/account");
    } catch (e: any) {
      setErr(e.message ?? "Σφάλμα σύνδεσης");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setErr(null); setMsg(null); setLoading(true);
    try {
      const { user } = await signInWithPopup(getAuth(), new GoogleAuthProvider());
      if (!user.emailVerified) {
        setNeedsVerify(true);
        setMsg("Ο λογαριασμός χρειάζεται επιβεβαίωση e-mail.");
        return;
      }
      nav("/account");
    } catch (e: any) {
      setErr(e.message ?? "Σφάλμα Google login");
    } finally {
      setLoading(false);
    }
  }

  async function resendVerify() {
    const u = getAuth().currentUser;
    if (!u) return;
    try {
      await sendEmailVerification(u);
      setMsg("Στάλθηκε νέο e-mail επιβεβαίωσης.");
    } catch (e: any) {
      setErr(e.message ?? "Αποτυχία αποστολής επιβεβαίωσης");
    }
  }

  return (
    <div style={{maxWidth:420, margin:"40px auto", padding:20, border:"1px solid #ddd", borderRadius:8}}>
      <h1>Σύνδεση</h1>

      <form onSubmit={onEmailLogin} style={{display:"grid", gap:12}}>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
            style={{width:"100%"}}
          />
        </label>

        <label>
          Κωδικός
          <input
            type="password"
            value={pass}
            onChange={e=>setPass(e.target.value)}
            required
            style={{width:"100%"}}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Παρακαλώ..." : "Σύνδεση"}
        </button>
      </form>

      <div style={{margin:"12px 0"}}>
        <button type="button" onClick={onGoogle} disabled={loading}>
          Σύνδεση με Google
        </button>
      </div>

      <div style={{display:"flex", gap:12, fontSize:14}}>
        <Link to="/register">Δημιουργία λογαριασμού</Link>
        <Link to="/reset">Ξέχασα τον κωδικό</Link>
      </div>

      {msg && <p style={{marginTop:12, color:"#0a0"}}>{msg}</p>}
      {err && <p style={{marginTop:12, color:"#c00"}}>{err}</p>}

      {needsVerify && (
        <div style={{marginTop:12}}>
          <button type="button" onClick={resendVerify}>Αποστολή e-mail επιβεβαίωσης</button>
        </div>
      )}
    </div>
  );
}
Χρειάζεσαι και ελάχιστο /register ή /reset;

Είπες:
Δώσε και αυτά, δώσ' τα, σε ευχαριστώ, δώσ' τα να έχω πλήρη εικόνα.
Το ChatGPT είπε:
Παρακάτω τα ελάχιστα /register και /reset.

apps/layera-id/src/routes/Register.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null);
    if (pass !== confirm) { setErr("Οι κωδικοί δεν ταιριάζουν."); return; }
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(user);
      await signOut(auth);
      setMsg("Ο λογαριασμός δημιουργήθηκε. Έγινε αποστολή e-mail επιβεβαίωσης. Συνδέσου μετά την επιβεβαίωση.");
      // Προαιρετικά: nav("/login");
    } catch (e: any) {
      setErr(e.message ?? "Σφάλμα δημιουργίας λογαριασμού");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth:420, margin:"40px auto", padding:20, border:"1px solid #ddd", borderRadius:8}}>
      <h1>Δημιουργία λογαριασμού</h1>
      <form onSubmit={onSubmit} style={{display:"grid", gap:12}}>
        <label>
          E-mail
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%"}}/>
        </label>
        <label>
          Κωδικός
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} required style={{width:"100%"}}/>
        </label>
        <label>
          Επιβεβαίωση κωδικού
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required style={{width:"100%"}}/>
        </label>
        <button type="submit" disabled={loading}>{loading ? "Παρακαλώ..." : "Εγγραφή"}</button>
      </form>

      <div style={{display:"flex", gap:12, fontSize:14, marginTop:12}}>
        <Link to="/login">Έχω ήδη λογαριασμό</Link>
      </div>

      {msg && <p style={{marginTop:12, color:"#0a0"}}>{msg}</p>}
      {err && <p style={{marginTop:12, color:"#c00"}}>{err}</p>}
    </div>
  );
}
apps/layera-id/src/routes/Reset.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Στάλθηκε e-mail επαναφοράς κωδικού.");
    } catch (e: any) {
      setErr(e.message ?? "Αποτυχία αποστολής e-mail επαναφοράς");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{maxWidth:420, margin:"40px auto", padding:20, border:"1px solid #ddd", borderRadius:8}}>
      <h1>Επαναφορά κωδικού</h1>
      <form onSubmit={onSubmit} style={{display:"grid", gap:12}}>
        <label>
          E-mail
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%"}}/>
        </label>
        <button type="submit" disabled={loading}>{loading ? "Παρακαλώ..." : "Αποστολή"}</button>
      </form>

      <div style={{display:"flex", gap:12, fontSize:14, marginTop:12}}>
        <Link to="/login">Πίσω στη σύνδεση</Link>
        <Link to="/register">Δημιουργία λογαριασμού</Link>
      </div>

      {msg && <p style={{marginTop:12, color:"#0a0"}}>{msg}</p>}
      {err && <p style={{marginTop:12, color:"#c00"}}>{err}</p>}
    </div>
  );
}
Έχεις πλήρη ελάχιστο κύκλο: Register → Verify email (μέσω link) → Login → Account → Reset.