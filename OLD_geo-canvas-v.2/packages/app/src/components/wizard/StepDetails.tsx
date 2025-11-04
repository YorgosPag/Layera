import React, { useState, useCallback } from 'react';
import { useUiContext } from '../../context/UiContext';
import { ListingDetails, JobDetails } from '@geo-platform/shared';
import AccordionSection from './details/AccordionSection';
import BasicInfoForm from './details/BasicInfoForm';
import SpaceFeaturesForm from './details/SpaceFeaturesForm';
import TechDetailsForm from './details/TechDetailsForm';
import AmenitiesForm from './details/AmenitiesForm';
import DescriptionUploadsForm from './details/DescriptionUploadsForm';
import JobInfoForm from './details/JobInfoForm';

// FIX: Define explicit string-only key types to prevent issues with `keyof` returning symbols.
type DetailsKey = Extract<keyof (ListingDetails & JobDetails), string>;
type AmenityKey = Extract<keyof ListingDetails['amenities'], string>;

const StepDetails: React.FC = () => {
    const { wizardState, actions } = useUiContext();
    const [openSection, setOpenSection] = useState<string>('basic');

    const handleDetailsChange = useCallback((
        field: DetailsKey | `amenities.${AmenityKey}`,
        value: any
    ) => {
        const currentDetails = wizardState.details;
        
        if (field.startsWith('amenities.')) {
            const amenityKey = field.split('.')[1] as AmenityKey;
            // FIX: Ensure the amenities object remains complete by merging with the existing amenities or a default object. This resolves both a potential runtime error and a type error.
            const oldAmenities = currentDetails.amenities || { storage: false, fireplace: false, elevator: false, balcony: false, garden: false, securityDoor: false, alarm: false };
            actions.setWizardState({
                details: {
                    ...currentDetails,
                    amenities: {
                        ...oldAmenities,
                        [amenityKey]: value,
                    }
                }
            });
        } else {
            actions.setWizardState({
                details: {
                    ...currentDetails,
                    [field]: value,
                }
            });
        }
    }, [wizardState.details, actions]);

    const toggleSection = (section: string) => {
        setOpenSection(prev => prev === section ? '' : section);
    };

    if (wizardState.category === 'job') {
        return (
            <JobInfoForm 
                details={wizardState.details} 
                onChange={handleDetailsChange as (field: keyof JobDetails, value: any) => void} 
            />
        );
    }

    return (
        <div className="space-y-2">
            <AccordionSection title="1. Βασικές Πληροφορίες" isOpen={openSection === 'basic'} onToggle={() => toggleSection('basic')}>
                <BasicInfoForm details={wizardState.details} onChange={handleDetailsChange as (field: keyof ListingDetails, value: any) => void} />
            </AccordionSection>

            <AccordionSection title="2. Χαρακτηριστικά Χώρου" isOpen={openSection === 'space'} onToggle={() => toggleSection('space')}>
                <SpaceFeaturesForm details={wizardState.details} onChange={handleDetailsChange as (field: keyof ListingDetails, value: any) => void} />
            </AccordionSection>

            <AccordionSection title="3. Τεχνικές Λεπτομέρειες" isOpen={openSection === 'tech'} onToggle={() => toggleSection('tech')}>
                <TechDetailsForm details={wizardState.details} onChange={handleDetailsChange as (field: keyof ListingDetails, value: any) => void} />
            </AccordionSection>
            
            <AccordionSection title="4. Παροχές" isOpen={openSection === 'amenities'} onToggle={() => toggleSection('amenities')}>
                <AmenitiesForm details={wizardState.details} onChange={handleDetailsChange as (field: `amenities.${AmenityKey}`, value: boolean) => void} />
            </AccordionSection>

            <AccordionSection title="5. Περιγραφή & Φωτογραφίες" isOpen={openSection === 'desc'} onToggle={() => toggleSection('desc')}>
                <DescriptionUploadsForm details={wizardState.details} onChange={handleDetailsChange as (field: 'description', value: string) => void} />
            </AccordionSection>
        </div>
    );
};

export default StepDetails;
