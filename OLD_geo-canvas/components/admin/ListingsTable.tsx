import React from 'react';
import { ImportedLayer } from '../../shared/types';

interface ListingsTableProps {
    listings: ImportedLayer[];
    onView: (id: string) => void;
    onDelete: (id: string) => void;
    onViewOnMap: (id: string) => void;
}

const ListingsTable: React.FC<ListingsTableProps> = ({ listings, onView, onDelete, onViewOnMap }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Τίτλος Καταχώρησης</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Κατηγορία</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Πρόθεση</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ημ/νία Δημιουργίας</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {listings.length > 0 ? (
                        listings.map((listing) => (
                            <tr key={listing.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.category === 'property' ? 'Ακίνητο' : 'Εργασία'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.intent === 'offer' ? 'Προσφορά' : 'Αναζήτηση'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(listing.createdAt).toLocaleDateString('el-GR')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button onClick={() => onViewOnMap(listing.id)} className="text-green-600 hover:text-green-900">Χάρτης</button>
                                    <button onClick={() => onView(listing.id)} className="text-indigo-600 hover:text-indigo-900">Προβολή</button>
                                    <button onClick={() => onDelete(listing.id)} className="text-red-600 hover:text-red-900">Διαγραφή</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                Δεν βρέθηκαν καταχωρήσεις που να ταιριάζουν με τα κριτήρια.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListingsTable;