/**
 * PropertyDetailsForm.tsx - Reusable Property Details Form
 */

import React from 'react';
import { Input, TextArea, Checkbox, FormField } from '@layera/forms';
import { Stack } from '@layera/layout';
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

    switch (field.type) {
      case 'number':
        return (
          <Input
            type="number"
            value={value as number || ''}
            onChange={(e) => onChange(field.id, e.target.value ? Number(e.target.value) : undefined)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            variant="outline"
            size="md"
            fullWidth
          />
        );

      case 'text':
        return (
          <Input
            type="text"
            value={value as string || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            variant="outline"
            size="md"
            fullWidth
          />
        );

      case 'textarea':
        return (
          <TextArea
            value={value as string || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            variant="outline"
            size="md"
            fullWidth
            resize="vertical"
          />
        );

      case 'boolean':
        return (
          <Checkbox
            checked={value as boolean || false}
            onChange={(checked: boolean) => onChange(field.id, checked)}
            label={field.label}
            size="md"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Stack spacing="md" className="bg-gray-50 p-4 rounded-lg">
      {fields.map((field) => (
        <FormField
          key={field.id}
          label={field.type !== 'boolean' ? field.label : undefined}
          required={field.required}
          className="w-full"
        >
          {renderField(field)}
        </FormField>
      ))}
    </Stack>
  );
};