import React from 'react';
import { ListingDetails } from '@geo-platform/shared';

interface SpaceFeaturesFormProps {
    // FIX: Changed details prop to Partial<ListingDetails> to align with wizard state.
    details: Partial<ListingDetails>;
    onChange: (field: keyof ListingDetails, value: string | number) => void;
}

const SpaceFeaturesForm: React.FC<SpaceFeaturesFormProps> = ({ details, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Υπνοδωμάτια</label>
                    <input type="number" id="bedrooms" value={details.bedrooms ?? ''} onChange={(e) => onChange('bedrooms', e.target.value === '' ? '' : parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Μπάνια</label>
                    <input type="number" id="bathrooms" value={details.bathrooms ?? ''} onChange={(e) => onChange('bathrooms', e.target.value === '' ? '' : parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="wc" className="block text-sm font-medium text-gray-700">WC</label>
                    <input type="number" id="wc" value={details.wc ?? ''} onChange={(e) => onChange('wc', e.target.value === '' ? '' : parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Όροφος</label>
                    <select id="floor" value={details.floor ?? ''} onChange={(e) => onChange('floor', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option value="">Επιλέξτε...</option>
                        <option value="ground">Ισόγειο</option>
                        <option value="1">1ος</option>
                        <option value="2">2ος</option>
                        <option value="3">3ος</option>
                        <option value="4+">4ος+</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="totalFloors" className="block text-sm font-medium text-gray-700">Όροφοι Κτιρίου</label>
                    <input type="number" id="totalFloors" value={details.totalFloors ?? ''} onChange={(e) => onChange('totalFloors', e.target.value === '' ? '' : parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>
        </div>
    );
};

export default SpaceFeaturesForm;