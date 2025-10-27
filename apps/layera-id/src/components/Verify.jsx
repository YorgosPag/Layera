import { auth } from '../firebase';
import { sendEmailVerification, reload } from 'firebase/auth';
import { Button } from '@layera/buttons';
import { useLayeraTranslation } from '@layera/i18n';
import { SPACING_SCALE } from '@layera/constants';
import { Box } from '@layera/layout';

export default function Verify() {
  const user = auth.currentUser;
  const { t } = useLayeraTranslation();
  async function resend() { if (user) await sendEmailVerification(user); }
  async function check() { if (user) await reload(user); window.location.reload(); }
  return (
    <Box>
      <h3>{t('auth.verify.emailSent')}</h3>
      <Button onClick={resend} variant="secondary" size="sm">{t('auth.verify.resend')}</Button>
      <Button onClick={check} variant="primary" size="sm" marginLeft={`${SPACING_SCALE.SM}px`}>{t('auth.verify.checkDone')}</Button>
    </Box>
  );
}