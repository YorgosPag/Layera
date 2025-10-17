import { auth } from '../firebase';
import { sendEmailVerification, reload } from 'firebase/auth';

export default function Verify() {
  const user = auth.currentUser;
  async function resend() { if (user) await sendEmailVerification(user); }
  async function check() { if (user) await reload(user); window.location.reload(); }
  return (
    <div>
      <h3>Έγινε αποστολή email επιβεβαίωσης.</h3>
      <button onClick={resend}>Ξαναστείλε</button>
      <button onClick={check}>Έκανα verify</button>
    </div>
  );
}