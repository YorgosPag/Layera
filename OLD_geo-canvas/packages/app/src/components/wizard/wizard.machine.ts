import { WizardState, ListingCategory, ListingIntent, TransactionType, EmploymentType, Availability } from "@geo-platform/shared";

// Define the shape of the state managed by the machine
export type WizardMachineState = Pick<WizardState, 'step' | 'category' | 'intent' | 'transactionType' | 'employmentType' | 'availability' | 'file' | 'associatedLayerId'>;

// Define all possible events that can change the state
export type WizardMachineEvent =
    | { type: 'SELECT_CATEGORY'; payload: ListingCategory }
    | { type: 'SELECT_INTENT'; payload: ListingIntent }
    | { type: 'SELECT_TRANSACTION_TYPE'; payload: TransactionType }
    | { type: 'SELECT_EMPLOYMENT_TYPE'; payload: EmploymentType }
    | { type: 'SELECT_AVAILABILITY'; payload: Availability }
    | { type: 'SUBMIT_AVAILABILITY_DETAILS' }
    | { type: 'START_FILE_UPLOAD' }
    | { type: 'FINISH_FILE_UPLOAD'; payload: { file: File, layerId: string } }
    | { type: 'FINISH_DRAWING'; payload: { layerId: string } }
    | { type: 'FINISH_POSITIONING' }
    | { type: 'SUBMIT_DETAILS' }
    | { type: 'CLOSE' }
    | { type: 'BACK' };

export const wizardInitialState: WizardMachineState = {
    step: 'category',
    category: null,
    intent: null,
    transactionType: null,
    employmentType: null,
    availability: null,
    file: null,
    associatedLayerId: null,
};

// The reducer function that acts as our Finite State Machine
export function wizardReducer(state: WizardMachineState, event: WizardMachineEvent): WizardMachineState {
    switch (state.step) {
        case 'category':
            if (event.type === 'SELECT_CATEGORY') return { ...state, step: 'intent', category: event.payload };
            break;

        case 'intent':
            if (event.type === 'SELECT_INTENT') {
                const nextStep = state.category === 'property' ? 'transactionType' : 'employmentType';
                return { ...state, step: nextStep, intent: event.payload };
            }
            if (event.type === 'BACK') return { ...state, step: 'category', intent: null, category: null };
            break;

        case 'transactionType':
            if (event.type === 'SELECT_TRANSACTION_TYPE') return { ...state, step: 'availability', transactionType: event.payload };
            if (event.type === 'BACK') return { ...state, step: 'intent', transactionType: null };
            break;
            
        case 'employmentType':
            if (event.type === 'SELECT_EMPLOYMENT_TYPE') return { ...state, step: 'availability', employmentType: event.payload };
            if (event.type === 'BACK') return { ...state, step: 'intent', employmentType: null };
            break;

        case 'availability':
            if (event.type === 'SELECT_AVAILABILITY') {
                const hasDetailsStep = event.payload === 'future' && ((state.category === 'property' && state.intent === 'offer') || state.category === 'job');
                return { ...state, step: hasDetailsStep ? 'availabilityDetails' : 'location', availability: event.payload };
            }
            if (event.type === 'BACK') {
                const prevStep = state.category === 'property' ? 'transactionType' : 'employmentType';
                return { ...state, step: prevStep, availability: null };
            }
            break;

        case 'availabilityDetails':
            if (event.type === 'SUBMIT_AVAILABILITY_DETAILS') return { ...state, step: 'location' };
            if (event.type === 'BACK') return { ...state, step: 'availability' };
            break;

        case 'location':
            if (event.type === 'START_FILE_UPLOAD') return { ...state, step: 'location' }; // No real state change, but good for logging
            if (event.type === 'FINISH_FILE_UPLOAD') return { ...state, file: event.payload.file, associatedLayerId: event.payload.layerId };
            if (event.type === 'FINISH_DRAWING') return { ...state, step: 'details', associatedLayerId: event.payload.layerId };
            if (event.type === 'FINISH_POSITIONING') return { ...state, step: 'details' };
            if (event.type === 'BACK') {
                let prevStep: WizardState['step'] = 'intent';
                if (state.category === 'property') prevStep = (state.intent === 'offer' && state.availability === 'future') ? 'availabilityDetails' : 'availability';
                else if (state.category === 'job') prevStep = state.availability === 'future' ? 'availabilityDetails' : 'availability';
                return { ...state, step: prevStep, file: null, associatedLayerId: null };
            }
            break;

        case 'details':
            if (event.type === 'SUBMIT_DETAILS') return { ...state, step: 'complete' };
            if (event.type === 'BACK') return { ...state, step: 'location' };
            break;
        
        case 'complete':
            break;
    }

    if (event.type === 'CLOSE') {
        return wizardInitialState;
    }

    return state;
}
