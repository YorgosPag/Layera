import React from 'react';
import { TransactionType, ListingIntent } from '@geo-platform/shared';
import { useUiContext } from '../../context/UiContext';

interface StepTransactionTypeProps {
    onSelect: (transaction: TransactionType) => void;
    intent: ListingIntent | null;
}

const StepTransactionType: React.FC<StepTransactionTypeProps> = ({ onSelect, intent }) => {
    const { actions } = useUiContext();

    const isSearch = intent === 'search';

    const saleTexts = {
        title: isSearch ? 'Για Αγορά' : 'Προς Πώληση',
        description: isSearch ? 'Δημιουργία ειδοποίησης για ακίνητα προς αγορά.' : 'Το ακίνητο είναι διαθέσιμο για αγορά.',
        info: isSearch 
            ? 'Θα ειδοποιηθείτε για νέα ακίνητα προς πώληση στην περιοχή που θα ορίσετε. Θέλετε να συνεχίσετε;' 
            : 'Το ακίνητο θα καταχωρηθεί ως διαθέσιμο προς αγορά. Θέλετε να συνεχίσετε;'
    };
    
    const rentTexts = {
        title: isSearch ? 'Για Ενοικίαση' : 'Προς Ενοικίαση',
        description: isSearch ? 'Δημιουργία ειδοποίησης για ακίνητα προς ενοικίαση.' : 'Το ακίνητο είναι διαθέσιμο για ενοικίαση.',
        info: isSearch 
            ? 'Θα ειδοποιηθείτε για νέα ακίνητα προς ενοικίαση στην περιοχή που θα ορίσετε. Θέλετε να συνεχίσετε;' 
            : 'Το ακίνητο θα καταχωρηθεί ως διαθέσιμο προς ενοικίαση. Θέλετε να συνεχίσετε;'
    };

    const handleInfoClick = (e: React.MouseEvent, transaction: TransactionType) => {
        e.stopPropagation();
        const message = transaction === 'sale' ? saleTexts.info : rentTexts.info;
        
        actions.showToast({
            message,
            onConfirm: () => onSelect(transaction),
        });
    };

    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={() => onSelect('sale')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">{saleTexts.title}</h4>
                    <p className="text-sm text-gray-600">{saleTexts.description}</p>
                </div>
                 <button
                    onClick={(e) => handleInfoClick(e, 'sale')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </button>
            <button
                onClick={() => onSelect('rent')}
                className="relative w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <div>
                    <h4 className="font-bold text-gray-800">{rentTexts.title}</h4>
                    <p className="text-sm text-gray-600">{rentTexts.description}</p>
                </div>
                 <button
                    onClick={(e) => handleInfoClick(e, 'rent')}
                    className="absolute bottom-2 right-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Πληροφορίες"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </button>
            </button>
        </div>
    );
};

export default StepTransactionType;