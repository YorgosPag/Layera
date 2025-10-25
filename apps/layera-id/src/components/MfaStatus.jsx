import { SPACING_SCALE } from '@layera/constants';

export default function MfaStatus({ mfa }) {
  return (
    <span style={{
      padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`,
      border: "1px solid var(--layera-border-primary)",
      borderRadius: 8,
      fontSize: "12px",
      backgroundColor: mfa ? 'var(--layera-bg-success)' : 'var(--layera-bg-warning)'
    }}>
      2FA: {mfa ? "Ενεργό" : "Ανενεργό"}
    </span>
  );
}