import { useAuth } from "../contexts/AuthContext";
import RoleBadge from "../components/RoleBadge";
import MfaStatus from "../components/MfaStatus";
import { Link } from "react-router-dom";

export default function Account() {
  const { currentUser, claims } = useAuth();
  if (!currentUser) return null;

  return (
    <div style={{ maxWidth: 640, margin: "32px auto", padding: "20px" }}>
      <h2>Ο λογαριασμός μου</h2>
      <p>Email: <strong>{currentUser.email}</strong></p>
      <div style={{ display: "flex", gap: 12, marginBottom: "16px" }}>
        <RoleBadge role={claims?.role || "private"} />
        <MfaStatus mfa={!!claims?.mfa} />
      </div>
      {!currentUser.emailVerified && <p style={{ color: 'red' }}>Το email δεν είναι επιβεβαιωμένο.</p>}
      {!claims?.mfa && (
        <p>
          <Link to="/mfa-enroll" style={{ color: '#007bff', textDecoration: 'none' }}>
            Ενεργοποίηση 2FA →
          </Link>
        </p>
      )}
      <div style={{ marginTop: "24px" }}>
        <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Επιστροφή στο Dashboard
        </Link>
      </div>
    </div>
  );
}