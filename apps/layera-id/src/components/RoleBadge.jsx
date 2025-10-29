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
      border="1px solid var(--la-border-primary)"
      borderRadius={`${BORDER_RADIUS_SCALE.SM}px`}
      fontSize="var(--la-font-size-xs)"
      backgroundColor={role === 'admin' ? 'var(--la-bg-info)' : role === 'broker' ? 'var(--la-bg-warning)' : role === 'builder' ? 'var(--la-bg-success)' : 'var(--la-bg-tertiary)'}
    >
      {LABELS[role] ?? LABELS.private}
    </Box>
  );
}