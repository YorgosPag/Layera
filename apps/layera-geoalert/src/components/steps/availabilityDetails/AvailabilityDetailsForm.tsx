/**
 * AvailabilityDetailsForm.tsx - Reusable Availability Details Form
 *
 * 🏗️ ENTERPRISE LEGO INTEGRATION:
 * Χρησιμοποιεί @layera/forms DatePicker για single source of truth
 */

import React from 'react';
import { DatePicker } from '@layera/forms';
import { useLayeraTranslation } from '@layera/tolgee';
import type { AvailabilityDetails } from './types';

interface AvailabilityDetailsFormProps {
  details: AvailabilityDetails;
  onChange: (field: keyof AvailabilityDetails, value: unknown) => void;
}

export const AvailabilityDetailsForm: React.FC<AvailabilityDetailsFormProps> = ({
  details,
  onChange
}) => {
  const { t } = useLayeraTranslation();
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '6px'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px'
    }}>
      {/* Ημερομηνία Έναρξης - LEGO DatePicker */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>
          {t('availabilityDetails.startDate', 'Ημερομηνία Έναρξης')} <span style={{ color: '#f00' }}> *</span>
        </label>
        <DatePicker
          value={details.date || ''}
          onChange={(date) => onChange('date', date)}
          placeholder={t('availabilityDetails.selectStartDate', 'Επιλέξτε ημερομηνία έναρξης')}
          locale="el"
          format="DD/MM/YYYY"
          minDate={new Date()}
          disabled={false}
          size="lg"
          style={baseStyle}
        />
      </div>

      {/* Διάρκεια */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>
          {t('availabilityDetails.duration', 'Διάρκεια')} <span style={{ color: '#f00' }}> *</span>
        </label>
        <input
          type="number"
          value={details.duration || ''}
          onChange={(e) => onChange('duration', e.target.value ? Number(e.target.value) : 0)}
          placeholder={t('availabilityDetails.durationPlaceholder', 'π.χ. 12')}
          min={1}
          max={120}
          style={baseStyle}
        />
      </div>

      {/* Μονάδα */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>
          {t('availabilityDetails.unit', 'Μονάδα')} <span style={{ color: '#f00' }}> *</span>
        </label>
        <select
          value={details.unit || 'months'}
          onChange={(e) => onChange('unit', e.target.value as 'months' | 'years')}
          style={baseStyle}
        >
          <option value="months">{t('availabilityDetails.months', 'Μήνες')}</option>
          <option value="years">{t('availabilityDetails.years', 'Χρόνια')}</option>
        </select>
      </div>
    </div>
  );
};