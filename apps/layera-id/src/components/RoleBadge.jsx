import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';

const LABELS = {
  admin: "Διαχειριστής",
  broker: "Μεσίτης",
  builder: "Κατασκευαστής",
  private: "Ιδιώτης"
};

export default function RoleBadge({ role = "private" }) {
  return (
    <Box
      as="span"
      padding={`${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`}
      border="1px solid var(--layera-border-primary)"
      borderRadius={`${BORDER_RADIUS_SCALE.SM}px`}
      fontSize="var(--layera-font-size-xs)"
      backgroundColor={role === 'admin' ? 'var(--layera-bg-info)' : role === 'broker' ? 'var(--layera-bg-warning)' : role === 'builder' ? 'var(--layera-bg-success)' : 'var(--layera-bg-tertiary)'}
    >
      {LABELS[role] ?? LABELS.private}
    </Box>
  );
}