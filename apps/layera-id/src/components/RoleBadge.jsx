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
      border: "1px solid var(--layera-border-primary)",
      borderRadius: 8,
      fontSize: "12px",
      backgroundColor: role === 'admin' ? 'var(--layera-bg-info)' : role === 'broker' ? 'var(--layera-bg-warning)' : role === 'builder' ? 'var(--layera-bg-success)' : 'var(--layera-bg-tertiary)'
    }}>
      {LABELS[role] ?? LABELS.private}
    </span>
  );
}