import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';

export default function RoleBadge({ role = "private" }) {
  const { t } = useLayeraTranslation();
  return (
    <Box
      as="span"
      padding="var(--la-space-xs-sm-padding)" // 🎯 SST: XS SM padding token
      border="1px solid var(--la-border-primary)"
      borderRadius="var(--la-radius-sm)" // 🎯 SST: Border radius token
      fontSize="var(--la-font-size-xs)"
      backgroundColor={role === 'admin' ? 'var(--la-bg-info)' : role === 'broker' ? 'var(--la-bg-warning)' : role === 'builder' ? 'var(--la-bg-success)' : 'var(--la-bg-tertiary)'}
    >
      {t(`roles.${role}`) || t('roles.private')}
    </Box>
  );
}