import { auth } from '../firebase';
import { PhoneAuthProvider, RecaptchaVerifier, multiFactor } from 'firebase/auth';
import { useState } from 'react';

export default function MfaEnroll() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!phone.trim()) {
      alert('Εισάγετε αριθμό τηλεφώνου');
      return;
    }

    setLoading(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const session = await multiFactor(auth.currentUser).getSession();
      const provider = new PhoneAuthProvider(auth);
      const verId = await provider.verifyPhoneNumber({ phoneNumber: phone, session }, recaptcha);
      const code = window.prompt('Εισάγετε τον κωδικό SMS:');

      if (code) {
        const cred = PhoneAuthProvider.credential(verId, code);
        await multiFactor(auth.currentUser).enroll(cred, 'primary');
        alert('2FA εγγραφή επιτυχής!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Σφάλμα εγγραφής 2FA:', error);
      alert('Σφάλμα: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '32px auto', padding: '20px' }}>
      <h3>Εγγραφή 2FA</h3>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+30xxxxxxxxxx"
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          disabled={loading}
        />
        <small>Εισάγετε τον αριθμό με διεθνή κωδικό (π.χ. +30...)</small>
      </div>
      <div id="recaptcha" style={{ marginBottom: '16px' }}></div>
      <button
        onClick={start}
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        {loading ? 'Επεξεργασία...' : 'Εγγραφή 2FA'}
      </button>
    </div>
  );
}