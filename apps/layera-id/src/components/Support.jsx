import React, { useState } from 'react';
import { useAuthContext } from '@layera/auth-bridge';
import './Support.css';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuthContext();

  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || 'support@layera.gr';

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailBody = `
Αίτημα υποστήριξης από τη Layera ID

Από: ${user?.email || 'Ανώνυμος χρήστης'}
Ρόλος: ${user?.layeraClaims?.role || 'Δεν έχει οριστεί'}
UID: ${user?.uid || 'Δεν είναι συνδεδεμένος'}

Θέμα: ${subject}

Μήνυμα:
${message}

---
Στάλθηκε από Layera ID Platform
Ημερομηνία: ${new Date().toLocaleString('el-GR')}
    `.trim();

    const mailtoLink = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="support-container">
        <div className="support-card">
          <div className="success-message">
            <h2>✓ Αίτημα Στάλθηκε</h2>
            <p>Το πρόγραμμα email σας άνοιξε με το αίτημά σας.</p>
            <p>Θα επικοινωνήσουμε μαζί σας σύντομα στο <strong>{user?.email}</strong></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="support-container">
      <div className="support-card">
        <h2>Επικοινωνία</h2>
        <p className="support-description">
          Χρειάζεστε βοήθεια; Στείλτε μας το αίτημά σας και θα επικοινωνήσουμε μαζί σας.
        </p>

        <div className="support-info">
          <div className="info-item">
            <strong>Email υποστήριξης:</strong> {supportEmail}
          </div>
          {user && (
            <div className="info-item">
              <strong>Ο λογαριασμός σας:</strong> {user.email}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="support-form">
          <div className="form-group">
            <label htmlFor="subject">Θέμα *</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="form-select"
            >
              <option value="">Επιλέξτε θέμα</option>
              <option value="Πρόβλημα σύνδεσης">Πρόβλημα σύνδεσης</option>
              <option value="Πρόβλημα με MFA">Πρόβλημα με MFA</option>
              <option value="Αίτημα αλλαγής ρόλου">Αίτημα αλλαγής ρόλου</option>
              <option value="Τεχνικό πρόβλημα">Τεχνικό πρόβλημα</option>
              <option value="Γενική ερώτηση">Γενική ερώτηση</option>
              <option value="Άλλο">Άλλο</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Μήνυμα *</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              placeholder="Περιγράψτε το πρόβλημα ή την ερώτησή σας..."
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-button">
            Αποστολή Αιτήματος
          </button>
        </form>

        <div className="support-footer">
          <p>
            <strong>Σημείωση:</strong> Το αίτημά σας θα ανοίξει στο πρόγραμμα email σας.
            Μπορείτε να προσθέσετε επιπλέον πληροφορίες πριν την αποστολή.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;