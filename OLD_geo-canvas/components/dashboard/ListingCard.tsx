import React from 'react';
import { ImportedLayer, ListingCategory } from '../../shared/types';
import { useAppContext } from '../../context/AppContext';

interface ListingCardProps {
    layer: ImportedLayer;
}

const InfoItem: React.FC<{ icon: React.ReactNode, children: React.ReactNode }> = ({ icon, children }) => (
    <div className="flex items-center text-sm text-gray-600">
        <span className="w-5 h-5 mr-2 text-gray-400">{icon}</span>
        <span>{children}</span>
    </div>
);

const PropertyDetails: React.FC<{ layer: ImportedLayer }> = ({ layer }) => {
    const { details = {}, transactionType } = layer;
    const priceLabel = transactionType === 'sale' ? 'Τιμή' : 'Ενοίκιο';
    const price = details.price ? `${Number(details.price).toLocaleString('el-GR')} €` : 'N/A';
    const area = details.area ? `${details.area} τ.μ.` : 'N/A';
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-3">
            <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}>
                <strong>{priceLabel}:</strong>{' '}{price} {transactionType === 'rent' ? '/ μήνα' : ''}
            </InfoItem>
            <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21M9 3v1.5M15 3v1.5M12 3v1.5" /></svg>}>
                <strong>Εμβαδόν:</strong>{' '}{area}
            </InfoItem>
             <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125-1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>}>
                <strong>Υπνοδωμάτια:</strong>{' '}{details.bedrooms || 'N/A'}
            </InfoItem>
        </div>
    );
};

const JobDetails: React.FC<{ layer: ImportedLayer }> = ({ layer }) => {
    const { details = {}, employmentType } = layer;
    const salary = details.salary ? `${Number(details.salary).toLocaleString('el-GR')} €` : 'Συζητήσιμη';
    const typeText = {
        full_time: 'Πλήρης', part_time: 'Μερική', freelance: 'Freelance', seasonal: 'Εποχιακή'
    }[employmentType || ''] || 'N/A';
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-3">
            <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}>
                <strong>Μισθός:</strong>{' '}{salary}
            </InfoItem>
            <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}>
                <strong>Απασχόληση:</strong>{' '}{typeText}
            </InfoItem>
            {details.proximityPreference && details.proximityRadius && (
                 <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7a.75.75 0 0 0-.75.75v14.25a.75.75 0 0 0 .75.75h7a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75Z" /></svg>}>
                    <strong>Περιοχή:</strong>{' '}{`< ${details.proximityRadius} χλμ`}
                </InfoItem>
            )}
            <InfoItem icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21M9 3v1.5M15 3v1.5M12 3v1.5" /></svg>}>
                <strong>Εταιρεία:</strong>{' '}{details.company || 'N/A'}
            </InfoItem>
        </div>
    );
};

const ListingCard: React.FC<ListingCardProps> = ({ layer }) => {
    const { actions } = useAppContext();
    
    const handleViewOnMap = () => {
        actions.setActiveView('map');
        actions.zoomToLayer(layer.id);
        if (window.innerWidth < 1024) {
            actions.toggleLayersPanel(false);
        }
    };

    const getSubheader = () => {
        const availabilityDate = layer.details?.availabilityDate;
        let dateText = '';

        if (availabilityDate) {
            const [year, month, day] = availabilityDate.split('-');
            dateText = ` • ${day}/${month}/${year}`;
        } else {
            dateText = ` • ${new Date(layer.createdAt).toLocaleDateString('el-GR')}`;
        }

        if (layer.intent === 'search') {
            return `Αναζήτηση (Geo-Alert)${dateText}`;
        }
        
        const intentText = layer.intent === 'offer' ? 'Προσφορά' : 'Αναζήτηση';
        return `${intentText}${dateText}`;
    };


    const categoryColor = layer.category === 'property' ? 'border-l-blue-500' : 'border-l-green-500';

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${categoryColor} flex flex-col sm:flex-row justify-between sm:items-center gap-4`}>
            <div className="flex-grow">
                <p className="font-semibold text-lg text-gray-800 truncate" title={layer.name}>{layer.name}</p>
                <p className="text-sm text-gray-500 mb-2">{getSubheader()}</p>
                
                {layer.category === 'property' ? <PropertyDetails layer={layer} /> : <JobDetails layer={layer} />}
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-center">
                <button 
                    onClick={handleViewOnMap} 
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    Προβολή στο Χάρτη
                </button>
                <button 
                    onClick={() => actions.removeLayer(layer.id)} 
                    title="Διαγραφή"
                    className="text-gray-400 hover:text-red-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ListingCard;