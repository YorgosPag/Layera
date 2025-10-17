import { useState } from "react";
import { callSetRole, callRefreshMfaClaim } from "../lib/functions";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function AdminRoles() {
  const { claims } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("private");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (claims?.role !== "admin") {
    return (
      <div style={{ maxWidth: 720, margin: "32px auto", padding: "20px" }}>
        <p>Απαγορεύεται. Μόνο admin μπορεί να δει αυτή τη σελίδα.</p>
        <Link to="/dashboard">← Επιστροφή στο Dashboard</Link>
      </div>
    );
  }

  async function onSetRole() {
    if (!email.trim()) {
      setMsg("Εισάγετε email χρήστη");
      return;
    }
    setLoading(true);
    setMsg("Επεξεργασία...");
    try {
      const res = await callSetRole({ email, role });
      setMsg(`✅ OK: ${res.uid} -> ${role}`);
    } catch (e) {
      setMsg(`❌ Σφάλμα: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  async function onRefreshMfa() {
    if (!email.trim()) {
      setMsg("Εισάγετε email χρήστη");
      return;
    }
    setLoading(true);
    setMsg("Έλεγχος 2FA...");
    try {
      const res = await callRefreshMfaClaim({ email });
      setMsg(`✅ MFA: ${res.uid} -> ${res.mfa ? "ενεργό" : "ανενεργό"}`);
    } catch (e) {
      setMsg(`❌ Σφάλμα: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "32px auto", padding: "20px" }}>
      <h2>Διαχείριση ρόλων</h2>
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <label>Email χρήστη:</label>
          <input
            placeholder="user@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            disabled={loading}
          />
        </div>
        <div>
          <label>Ρόλος:</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            disabled={loading}
          >
            <option value="private">Ιδιώτης</option>
            <option value="broker">Μεσίτης</option>
            <option value="builder">Κατασκευαστής</option>
            <option value="admin">Διαχειριστής</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onSetRole}
            disabled={loading}
            style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}
          >
            Ορισμός ρόλου
          </button>
          <button
            onClick={onRefreshMfa}
            disabled={loading}
            style={{ padding: "10px 16px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px" }}
          >
            Ανανέωση claim 2FA
          </button>
        </div>
        {msg && <p style={{ padding: "8px", backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: "4px" }}>{msg}</p>}
        <p style={{ fontSize: 12, opacity: 0.7 }}>
          Σημείωση: μόνο admin μπορεί να καλέσει τα functions. Ο πελάτης δεν γράφει claims.
        </p>
      </div>
      <div style={{ marginTop: "24px" }}>
        <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Επιστροφή στο Dashboard
        </Link>
      </div>
    </div>
  );
}