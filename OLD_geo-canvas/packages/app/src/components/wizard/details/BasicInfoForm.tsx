import React from 'react';
import { ListingDetails } from '@geo-platform/shared';

interface BasicInfoFormProps {
    // FIX: Changed details prop to Partial<ListingDetails> to align with wizard state.
    details: Partial<ListingDetails>;
    onChange: (field: keyof ListingDetails, value: string | number) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ details, onChange }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Τιμή (€)</label>
                <input
                    type="number"
                    id="price"
                    // FIX: Added nullish coalescing operator to handle potentially undefined value.
                    value={details.price ?? ''}
                    onChange={(e) => onChange('price', e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="π.χ. 150000"
                />
            </div>
            <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Εμβαδόν (τ.μ.)</label>
                <input
                    type="number"
                    id="area"
                    // FIX: Added nullish coalescing operator to handle potentially undefined value.
                    value={details.area ?? ''}
                    onChange={(e) => onChange('area', e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="π.χ. 85"
                />
            </div>
            <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Είδος Ακινήτου</label>
                <select
                    id="propertyType"
                    // FIX: Added nullish coalescing operator to handle potentially undefined value.
                    value={details.propertyType ?? ''}
                    onChange={(e) => onChange('propertyType', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="">Επιλέξτε...</option>
                    <option value="apartment">Διαμέρισμα</option>
                    <option value="house">Μονοκατοικία</option>
                    <option value="maisonette">Μεζονέτα</option>
                    <option value="studio">Στούντιο / Γκαρσονιέρα</option>
                    <option value="business">Επαγγελματικός Χώρος</option>
                </select>
            </div>
        </div>
    );
};

export default BasicInfoForm;