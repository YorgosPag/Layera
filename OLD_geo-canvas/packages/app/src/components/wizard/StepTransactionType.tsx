import React from 'react';
import { TransactionType } from '@geo-platform/shared';

interface StepTransactionTypeProps {
    onSelect: (transaction: TransactionType) => void;
}

const StepTransactionType: React.FC<StepTransactionTypeProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-col space-y-3">
            <button
                onClick={() => onSelect('sale')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">Προς Πώληση</h4>
                <p className="text-sm text-gray-600">Το ακίνητο είναι διαθέσιμο για αγορά.</p>
            </button>
            <button
                onClick={() => onSelect('rent')}
                className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
                <h4 className="font-bold text-gray-800">Προς Ενοικίαση</h4>
                <p className="text-sm text-gray-600">Το ακίνητο είναι διαθέσιμο για ενοικίαση.</p>
            </button>
        </div>
    );
};

export default StepTransactionType;