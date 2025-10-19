import { auth } from '../firebase';
import { sendEmailVerification, reload } from 'firebase/auth';
import { Button } from '@layera/buttons';
import { useLayeraTranslation } from '@layera/i18n';

export default function Verify() {
  const user = auth.currentUser;
  const { t } = useLayeraTranslation();
  async function resend() { if (user) await sendEmailVerification(user); }
  async function check() { if (user) await reload(user); window.location.reload(); }
  return (
    <div>
      <h3>{t('auth.verify.emailSent')}</h3>
      <Button onClick={resend} variant="secondary" size="sm">{t('auth.verify.resend')}</Button>
      <Button onClick={check} variant="primary" size="sm" style={{ marginLeft: '10px' }}>{t('auth.verify.checkDone')}</Button>
    </div>
  );
}