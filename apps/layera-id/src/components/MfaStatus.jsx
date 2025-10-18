export default function MfaStatus({ mfa }) {
  return (
    <span style={{
      padding: "4px 8px",
      border: "1px solid var(--layera-border-primary)",
      borderRadius: 8,
      fontSize: "12px",
      backgroundColor: mfa ? 'var(--layera-bg-success)' : 'var(--layera-bg-warning)'
    }}>
      2FA: {mfa ? "Ενεργό" : "Ανενεργό"}
    </span>
  );
}