import React from 'react';
import { ListingDetails } from '@geo-platform/shared';
import PhotoUploader from './PhotoUploader';

interface DescriptionUploadsFormProps {
    // FIX: Changed details prop to Partial<ListingDetails> to align with wizard state.
    details: Partial<ListingDetails>;
    onChange: (field: 'description', value: string) => void;
}

const DescriptionUploadsForm: React.FC<DescriptionUploadsFormProps> = ({ details, onChange }) => {
    return (
        <div className="space-y-4">
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Περιγραφή <span className="text-red-500">*</span></label>
                <textarea
                    id="description"
                    rows={4}
                    // FIX: Added nullish coalescing operator to handle potentially undefined value.
                    value={details.description ?? ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Προσθέστε μια σύντομη περιγραφή του ακινήτου..."
                />
            </div>
             <PhotoUploader />
        </div>
    );
};

export default DescriptionUploadsForm;