import { SPACING_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';

export default function MfaStatus({ mfa }) {
  return (
    <Box
      as="span"
      padding="var(--la-space-xs-sm-padding)" // 🎯 SST: XS SM padding token
      border="1px solid var(--la-border-primary)"
      borderRadius={8}
      fontSize="var(--la-font-size-xs)"
      backgroundColor={mfa ? 'var(--la-bg-success)' : 'var(--la-bg-warning)'}
    >
      2FA: {mfa ? "Ενεργό" : "Ανενεργό"}
    </Box>
  );
}