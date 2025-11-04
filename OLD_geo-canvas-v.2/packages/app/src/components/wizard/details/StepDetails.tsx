import React, { useState, useCallback } from 'react';
import { useUiContext } from '../../../context/UiContext';
import { ListingDetails, JobDetails, EmploymentType } from '@geo-platform/shared';
import AccordionSection from './AccordionSection';
import BasicInfoForm from './BasicInfoForm';
import SpaceFeaturesForm from './SpaceFeaturesForm';
import TechDetailsForm from './TechDetailsForm';
import AmenitiesForm from './AmenitiesForm';
import DescriptionUploadsForm from './DescriptionUploadsForm';
import JobInfoForm from './JobInfoForm';

// FIX: Define explicit string-only key types to prevent issues with `keyof` returning symbols.
type DetailsKey = Extract<keyof (ListingDetails & JobDetails), string>;
type AmenityKey = Extract<keyof ListingDetails['amenities'], string>;

const StepDetails: React.FC = () => {
    const { wizardState, actions } = useUiContext();
    const [openSections, setOpenSections] = useState<string[]>(['basic', 'space', 'tech', 'desc']);

    const handleDetailsChange = useCallback((
        field: DetailsKey | `amenities.${AmenityKey}`,
        value: string | number | boolean | EmploymentType | ''
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
        setOpenSections(prev => 
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    if (wizardState.category === 'job') {
        return (
            <JobInfoForm 
                details={wizardState.details} 
                onChange={handleDetailsChange as (field: keyof JobDetails, value: string | number | EmploymentType) => void} 
            />
        );
    }

    return (
        <div className="space-y-2">
            <AccordionSection title="1. Βασικές Πληροφορίες" isOpen={openSections.includes('basic')} onToggle={() => toggleSection('basic')}>
                <BasicInfoForm details={wizardState.details} onChange={handleDetailsChange as (field: keyof ListingDetails, value: string | number) => void} />
            </AccordionSection>

            <AccordionSection title="2. Χαρακτηριστικά Χώρου" isOpen={openSections.includes('space')} onToggle={() => toggleSection('space')}>
                <SpaceFeaturesForm details={wizardState.details} onChange={handleDetailsChange as (field: keyof ListingDetails, value: string | number) => void} />
            </AccordionSection>

            <AccordionSection title="3. Τεχνικές Λεπτομέρειες" isOpen={openSections.includes('tech')} onToggle={() => toggleSection('tech')}>
                <TechDetailsForm details={wizardState.details} onChange={handleDetailsChange as (field: keyof ListingDetails, value: string | number) => void} />
            </AccordionSection>
            
            <AccordionSection title="4. Παροχές" isOpen={openSections.includes('amenities')} onToggle={() => toggleSection('amenities')}>
                <AmenitiesForm details={wizardState.details} onChange={handleDetailsChange as (field: `amenities.${AmenityKey}`, value: boolean) => void} />
            </AccordionSection>

            <AccordionSection title="5. Περιγραφή & Φωτογραφίες" isOpen={openSections.includes('desc')} onToggle={() => toggleSection('desc')}>
                <DescriptionUploadsForm details={wizardState.details} onChange={handleDetailsChange as (field: 'description', value: string) => void} />
            </AccordionSection>
        </div>
    );
};

export default StepDetails;