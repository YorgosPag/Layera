import React, { useState } from 'react';
import { useAuthContext } from '@layera/auth-bridge';
import { FormField, FormSection, FormActions, Select, TextArea } from '@layera/forms';
import { Button } from '@layera/buttons';
import { useLayeraTranslation } from '@layera/i18n';
import { FORM_SIZES } from '@layera/constants';
import '../../../../packages/forms/dist/index.css';
import '../../../../packages/buttons/dist/styles.css';
import './Support.css';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuthContext();
  const { t } = useLayeraTranslation();

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
          <FormSection>
            <FormField
              label="Θέμα *"
              required
            >
              <Select
                value={subject}
                onChange={(value) => setSubject(value)}
                size={FORM_SIZES.MEDIUM}
                placeholder="Επιλέξτε θέμα"
                options={[
                  { value: 'Πρόβλημα σύνδεσης', label: 'Πρόβλημα σύνδεσης' },
                  { value: 'Πρόβλημα με MFA', label: 'Πρόβλημα με MFA' },
                  { value: 'Αίτημα αλλαγής ρόλου', label: 'Αίτημα αλλαγής ρόλου' },
                  { value: 'Τεχνικό πρόβλημα', label: 'Τεχνικό πρόβλημα' },
                  { value: 'Γενική ερώτηση', label: 'Γενική ερώτηση' },
                  { value: 'Άλλο', label: 'Άλλο' }
                ]}
                fullWidth
                required
              />
            </FormField>

            <FormField
              label="Μήνυμα *"
              required
            >
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size={FORM_SIZES.MEDIUM}
                placeholder="Περιγράψτε το πρόβλημα ή την ερώτησή σας..."
                minRows={6}
                fullWidth
                required
              />
            </FormField>

            <FormActions>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
              >
                Αποστολή Αιτήματος
              </Button>
            </FormActions>
          </FormSection>
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