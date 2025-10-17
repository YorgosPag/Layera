const LABELS = {
  admin: "Διαχειριστής",
  broker: "Μεσίτης",
  builder: "Κατασκευαστής",
  private: "Ιδιώτης"
};

export default function RoleBadge({ role = "private" }) {
  return (
    <span style={{
      padding: "4px 8px",
      border: "1px solid #ccc",
      borderRadius: 8,
      fontSize: "12px",
      backgroundColor: role === 'admin' ? '#e3f2fd' : role === 'broker' ? '#f3e5f5' : role === 'builder' ? '#e8f5e8' : '#f5f5f5'
    }}>
      {LABELS[role] ?? LABELS.private}
    </span>
  );
}