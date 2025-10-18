import React from 'react';
import { ImportedLayer } from '@geo-platform/shared';

interface ListingDetailModalProps {
    listing: ImportedLayer;
    onClose: () => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => {
    if (!value && typeof value !== 'number') return null;
    return (
        <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
        </div>
    );
};

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose }) => {
    
    const details = listing.details || {};
    
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 truncate pr-4">{listing.name}</h2>
                    <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600 leading-none">&times;</button>
                </header>
                <main className="p-6 overflow-y-auto">
                    <dl className="divide-y divide-gray-200">
                        <DetailRow label="ID Καταχώρησης" value={listing.id} />
                        <DetailRow label="Κατηγορία" value={listing.category === 'property' ? 'Ακίνητο' : 'Εργασία'} />
                        <DetailRow label="Πρόθεση" value={listing.intent === 'offer' ? 'Προσφορά' : 'Αναζήτηση'} />
                        <DetailRow label="Ημ/νία Δημιουργίας" value={new Date(listing.createdAt).toLocaleString('el-GR')} />
                        
                        {listing.category === 'property' && (
                            <>
                                <DetailRow label="Είδος Συναλλαγής" value={listing.transactionType === 'sale' ? 'Πώληση' : 'Ενοικίαση'} />
                                <DetailRow label="Τιμή" value={details.price ? `${Number(details.price).toLocaleString('el-GR')} €` : 'N/A'} />
                                <DetailRow label="Εμβαδόν" value={details.area ? `${details.area} τ.μ.` : 'N/A'} />
                                <DetailRow label="Τύπος Ακινήτου" value={details.propertyType} />
                                <DetailRow label="Υπνοδωμάτια" value={details.bedrooms} />
                                <DetailRow label="Μπάνια" value={details.bathrooms} />
                            </>
                        )}
                        {listing.category === 'job' && (
                            <>
                                <DetailRow label="Είδος Απασχόλησης" value={listing.employmentType} />
                                <DetailRow label="Τίτλος Θέσης" value={details.jobTitle} />
                                <DetailRow label="Εταιρεία" value={details.company} />
                                <DetailRow label="Μισθός" value={details.salary ? `${Number(details.salary).toLocaleString('el-GR')} €` : 'Συζητήσιμος'} />
                            </>
                        )}
                        <div className="py-2">
                            <dt className="text-sm font-medium text-gray-500">Περιγραφή</dt>
                            <dd className="mt-1 text-sm text-gray-900">{details.description || 'Δεν υπάρχει περιγραφή.'}</dd>
                        </div>
                    </dl>
                </main>
                <footer className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                        Κλείσιμο
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ListingDetailModal;