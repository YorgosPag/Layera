import React, { useEffect } from 'react';
import { useUiContext } from '../../context/UiContext';

const Toast: React.FC = () => {
    const { toast, actions } = useUiContext();
    const { isVisible, message } = toast;

    useEffect(() => {
        if (isVisible && !toast.onConfirm) {
            const timer = setTimeout(() => {
                actions.hideToast();
            }, 5000); // Auto-hide informational toasts after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [isVisible, toast.onConfirm, actions]);

    if (!isVisible) return null;

    const handleConfirm = () => {
        if (toast.onConfirm) {
            toast.onConfirm();
        }
        actions.hideToast();
    };

    const handleCancel = () => {
        if (toast.onCancel) {
            toast.onCancel();
        }
        actions.hideToast();
    };

    return (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-2xl z-[9999] flex items-center gap-4 animate-fade-in-up w-auto max-w-sm">
            <p className="text-sm flex-grow">{message}</p>
            {toast.onConfirm && (
                <div className="flex gap-2 flex-shrink-0">
                    <button onClick={handleConfirm} className="px-4 py-1.5 bg-green-500 text-white rounded text-sm font-semibold hover:bg-green-600 transition-colors">Ναι</button>
                    <button onClick={handleCancel} className="px-4 py-1.5 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors">Όχι</button>
                </div>
            )}
            <button onClick={actions.hideToast} className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 hover:text-white text-lg leading-none focus:outline-none focus:ring-2 focus:ring-white">&times;</button>
        </div>
    );
};

export default Toast;