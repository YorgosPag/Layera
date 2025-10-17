export default function MfaStatus({ mfa }) {
  return (
    <span style={{
      padding: "4px 8px",
      border: "1px solid #ccc",
      borderRadius: 8,
      fontSize: "12px",
      backgroundColor: mfa ? '#e8f5e8' : '#fff3cd'
    }}>
      2FA: {mfa ? "Ενεργό" : "Ανενεργό"}
    </span>
  );
}