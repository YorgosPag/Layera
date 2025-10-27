import { SPACING_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';

export default function MfaStatus({ mfa }) {
  return (
    <Box
      as="span"
      padding={`${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`}
      border="1px solid var(--layera-border-primary)"
      borderRadius={8}
      fontSize="var(--layera-font-size-xs)"
      backgroundColor={mfa ? 'var(--layera-bg-success)' : 'var(--layera-bg-warning)'}
    >
      2FA: {mfa ? "Ενεργό" : "Ανενεργό"}
    </Box>
  );
}