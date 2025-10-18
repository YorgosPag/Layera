import React from 'react';
import { ListingDetails } from '../../../shared/types';

interface TechDetailsFormProps {
    // FIX: Changed details prop to Partial<ListingDetails> to align with wizard state.
    details: Partial<ListingDetails>;
    onChange: (field: keyof ListingDetails, value: any) => void;
}

const TechDetailsForm: React.FC<TechDetailsFormProps> = ({ details, onChange }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="constructionYear" className="block text-sm font-medium text-gray-700">Έτος Κατασκευής</label>
                <input type="number" id="constructionYear" value={details.constructionYear ?? ''} onChange={(e) => onChange('constructionYear', e.target.value === '' ? '' : parseInt(e.target.value))} placeholder="π.χ. 2005" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
             <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Κατάσταση</label>
                <select id="condition" value={details.condition ?? ''} onChange={(e) => onChange('condition', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value="">Επιλέξτε...</option>
                    <option value="new">Νεόδμητο</option>
                    <option value="renovated">Ανακαινισμένο</option>
                    <option value="good">Καλή κατάσταση</option>
                    <option value="needs_renovation">Χρήζει ανακαίνισης</option>
                </select>
            </div>
            <div>
                <label htmlFor="heating" className="block text-sm font-medium text-gray-700">Θέρμανση</label>
                <select id="heating" value={details.heating ?? ''} onChange={(e) => onChange('heating', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value="">Επιλέξτε...</option>
                    <option value="autonomous_gas">Αυτόνομη (Φυσικό Αέριο)</option>
                    <option value="autonomous_petrol">Αυτόνομη (Πετρέλαιο)</option>
                    <option value="central_gas">Κεντρική (Φυσικό Αέριο)</option>
                    <option value="central_petrol">Κεντρική (Πετρέλαιο)</option>
                    <option value="ac">Κλιματισμός / Αντλία Θερμότητας</option>
                    <option value="none">Χωρίς Θέρμανση</option>
                </select>
            </div>
             <div>
                <label htmlFor="parking" className="block text-sm font-medium text-gray-700">Πάρκινγκ</label>
                <select id="parking" value={details.parking ?? ''} onChange={(e) => onChange('parking', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option value="">Επιλέξτε...</option>
                    <option value="closed">Ναι, Κλειστό</option>
                    <option value="open">Ναι, Ανοιχτό (Πυλωτή)</option>
                    <option value="none">Όχι</option>
                </select>
            </div>
        </div>
    );
};

export default TechDetailsForm;
