import React from 'react';
import { ListingDetails } from '@geo-platform/shared';

// FIX: Extract string keys to avoid issues with `keyof` returning symbols in some TS contexts.
type AmenityKey = Extract<keyof ListingDetails['amenities'], string>;

interface AmenitiesFormProps {
    // FIX: Changed details prop to Partial<ListingDetails> to align with wizard state.
    details: Partial<ListingDetails>;
    // FIX: Use AmenityKey to ensure the field is a string.
    onChange: (field: `amenities.${AmenityKey}`, value: boolean) => void;
}

const amenities: { key: AmenityKey; label: string }[] = [
    { key: 'storage', label: 'Αποθήκη' },
    { key: 'fireplace', label: 'Τζάκι' },
    { key: 'elevator', label: 'Ανελκυστήρας' },
    { key: 'balcony', label: 'Μπαλκόνι / Βεράντα' },
    { key: 'garden', label: 'Κήπος' },
    { key: 'securityDoor', label: 'Πόρτα Ασφαλείας' },
    { key: 'alarm', label: 'Συναγερμός' },
];

const AmenitiesForm: React.FC<AmenitiesFormProps> = ({ details, onChange }) => {
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {amenities.map(amenity => (
                <label key={amenity.key} className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        // FIX: Added optional chaining and nullish coalescing operator to handle potentially undefined values.
                        checked={details.amenities?.[amenity.key] ?? false}
                        onChange={(e) => onChange(`amenities.${amenity.key}`, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{amenity.label}</span>
                </label>
            ))}
        </div>
    );
};

export default AmenitiesForm;
