import React, { useRef, useState, useCallback } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { UploadedPhoto } from '../../../shared/types';

// A single item in the photo preview list
const PhotoPreviewItem: React.FC<{
    photo: UploadedPhoto;
    index: number;
    onDescriptionChange: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragEnter: (e: React.DragEvent, index: number) => void;
    onDragEnd: (e: React.DragEvent) => void;
}> = ({ photo, index, onDescriptionChange, onRemove, onDragStart, onDragEnter, onDragEnd }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="flex items-start space-x-3 p-2 bg-white border border-gray-200 rounded-md cursor-grab active:cursor-grabbing"
        >
            <img src={photo.previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
            <div className="flex-grow">
                <textarea
                    value={photo.description}
                    onChange={(e) => onDescriptionChange(photo.id, e.target.value)}
                    placeholder="Περιγραφή φωτογραφίας..."
                    rows={3}
                    className="w-full text-sm p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <button
                onClick={() => onRemove(photo.id)}
                className="text-gray-400 hover:text-red-600 flex-shrink-0"
                title="Αφαίρεση φωτογραφίας"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};


// The main uploader component
const PhotoUploader: React.FC = () => {
    const { wizardState, actions } = useAppContext();
    const { photos = [] } = wizardState.details || {};
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);


    const handleFileSelect = (files: FileList | null) => {
        if (files && files.length > 0) {
            actions.addPhotos(Array.from(files));
        }
    };

    // --- Drag and Drop for File Upload ---
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);
    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    // --- Drag and Drop for Reordering Photos ---
    const handleDragStart = (e: React.DragEvent, index: number) => {
        dragItem.current = index;
    };
    const handleDragEnter = (e: React.DragEvent, index: number) => {
        dragOverItem.current = index;
    };
    const handleDragEnd = (e: React.DragEvent) => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const newPhotos = [...photos];
            const draggedItemContent = newPhotos.splice(dragItem.current, 1)[0];
            newPhotos.splice(dragOverItem.current, 0, draggedItemContent);
            actions.reorderPhotos(newPhotos);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };


    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Φωτογραφίες Ακινήτου</label>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center space-y-2 p-4 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-600 text-center">Σύρετε & αφήστε φωτογραφίες εδώ, ή</p>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 text-xs font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
                >
                    Επιλογή Αρχείων
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    accept="image/jpeg,image/png,image/webp"
                />
                 <p className="text-xs text-gray-500 pt-1">Αρχεία JPG, PNG. Οι εικόνες θα συμπιεστούν αυτόματα.</p>
            </div>

            {photos.length > 0 && (
                <div className="space-y-2">
                    {photos.map((photo, index) => (
                        <PhotoPreviewItem
                            key={photo.id}
                            photo={photo}
                            index={index}
                            onDescriptionChange={actions.updatePhotoDescription}
                            onRemove={actions.removePhoto}
                            onDragStart={handleDragStart}
                            onDragEnter={handleDragEnter}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PhotoUploader;