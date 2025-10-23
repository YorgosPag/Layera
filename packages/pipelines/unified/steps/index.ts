// Enterprise LEGO Step Components
//
// ⚠️ DEPRECATED: LEGACY PIPELINE SYSTEM - ΘΑ ΔΙΑΓΡΑΦΕΙ! ⚠️
//
// Αυτό το directory περιέχει το ΠΑΛΙΟ step system που χρησιμοποιείται
// ως αναφορά για migration. Όταν ολοκληρωθεί το ΝΕΟ Enterprise Step System
// (apps/layera-geoalert/src/components/steps/), όλο αυτό θα διαγραφεί.
//
// All components follow enterprise standards: <100 LOC, complexity <15
// Only @layera LEGO systems used - no custom implementations

export { CategoryStep } from './CategoryStep';
export type { CategoryStepProps, Category } from './CategoryStep';

export { IntentStep } from './IntentStep';
export type { IntentStepProps, Intent } from './IntentStep';

export { TransactionTypeStep } from './TransactionTypeStep';
export type { TransactionTypeStepProps, TransactionType } from './TransactionTypeStep';

export { EmploymentTypeStep } from './EmploymentTypeStep';
export type { EmploymentTypeStepProps, EmploymentType } from './EmploymentTypeStep';

export { AvailabilityStep } from './AvailabilityStep';
export type { AvailabilityStepProps, Availability } from './AvailabilityStep';

export { AvailabilityDetailsStep } from './AvailabilityDetailsStep';
export type { AvailabilityDetailsStepProps, AvailabilityDetails } from './AvailabilityDetailsStep';

export { LocationStep } from './LocationStep';
export type { LocationStepProps, LocationDetails } from './LocationStep';

export { LayoutStep } from './LayoutStep';
export type { LayoutStepProps, PropertyLayout } from './LayoutStep';

export { DetailsStep } from './DetailsStep';
export type { DetailsStepProps, DetailsData } from './DetailsStep';

export { CompleteStep } from './CompleteStep';
export type { CompleteStepProps } from './CompleteStep';