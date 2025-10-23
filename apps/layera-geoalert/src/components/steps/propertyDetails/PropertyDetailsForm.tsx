/**
 * PropertyDetailsForm.tsx - Reusable Property Details Form
 */

import React from 'react';
import type { PropertyDetails, PropertyDetailsFormField } from './types';

interface PropertyDetailsFormProps {
  details: PropertyDetails;
  onChange: (field: keyof PropertyDetails, value: unknown) => void;
  fields: PropertyDetailsFormField[];
}

export const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({
  details,
  onChange,
  fields
}) => {
  const renderField = (field: PropertyDetailsFormField) => {
    const value = details[field.id];

    const baseStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#fff'
    };

    switch (field.type) {
      case 'number':
        return (
          <input
            type="number"
            value={value as number || ''}
            onChange={(e) => onChange(field.id, e.target.value ? Number(e.target.value) : undefined)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            style={baseStyle}
          />
        );

      case 'text':
        return (
          <input
            type="text"
            value={value as string || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            style={baseStyle}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value as string || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            style={{
              ...baseStyle,
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        );

      case 'boolean':
        return (
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={value as boolean || false}
              onChange={(e) => onChange(field.id, e.target.checked)}
              style={{
                width: '20px',
                height: '20px'
              }}
            />
            <span>{field.label}</span>
          </label>
        );

      default:
        return null;
    }
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
      {fields.map((field) => (
        <div key={field.id} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {field.type !== 'boolean' && (
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#333'
            }}>
              {field.label}
              {field.required && <span style={{ color: '#f00' }}> *</span>}
            </label>
          )}
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};