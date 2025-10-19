import { z } from 'zod';

/**
 * Enterprise Zod Schemas - UnifiedPipeline
 * Purpose: Runtime type validation with discriminated unions
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 */

// Base enums
export const CategorySchema = z.enum(['property', 'job']);
export const IntentSchema = z.enum(['offer', 'search']);
export const TransactionTypeSchema = z.enum(['sale', 'rent']);
export const EmploymentTypeSchema = z.enum(['full_time', 'part_time', 'freelance', 'seasonal']);
export const AvailabilitySchema = z.enum(['now', 'future']);

// Complex object schemas
export const AvailabilityDetailsSchema = z.object({
  date: z.string().min(1, 'Η ημερομηνία είναι υποχρεωτική'),
  duration: z.number().min(1, 'Η διάρκεια πρέπει να είναι τουλάχιστον 1'),
  unit: z.enum(['months', 'years'])
});

export const LocationDataSchema = z.object({
  method: z.enum(['detect', 'search']),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  address: z.string().optional()
});

export const LayoutDataSchema = z.object({
  rotation: z.number().min(0).max(360),
  scales: z.object({
    cmToM: z.number().positive(),
    mmToM: z.number().positive(),
    mToM: z.number().positive()
  }),
  uploadedFiles: z.array(z.instanceof(File)).optional()
});

export const FormDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  price: z.number().positive().optional(),
  size: z.number().positive().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  salary: z.number().positive().optional()
});

// Discriminated Union Schemas
export const PropertyOfferSchema = z.object({
  category: z.literal('property'),
  intent: z.literal('offer'),
  transactionType: TransactionTypeSchema,
  availability: AvailabilitySchema,
  availabilityDetails: AvailabilityDetailsSchema.optional(),
  locationData: LocationDataSchema.optional(),
  layoutData: LayoutDataSchema.optional(),
  formData: FormDataSchema.optional()
});

export const PropertySearchSchema = z.object({
  category: z.literal('property'),
  intent: z.literal('search'),
  availability: AvailabilitySchema,
  availabilityDetails: AvailabilityDetailsSchema.optional(),
  locationData: LocationDataSchema.optional(),
  formData: FormDataSchema.optional()
});

export const JobOfferSchema = z.object({
  category: z.literal('job'),
  intent: z.literal('offer'),
  employmentType: EmploymentTypeSchema,
  availability: AvailabilitySchema,
  availabilityDetails: AvailabilityDetailsSchema.optional(),
  locationData: LocationDataSchema.optional(),
  formData: FormDataSchema.optional()
});

export const JobSearchSchema = z.object({
  category: z.literal('job'),
  intent: z.literal('search'),
  employmentType: EmploymentTypeSchema,
  availability: AvailabilitySchema,
  availabilityDetails: AvailabilityDetailsSchema.optional(),
  locationData: LocationDataSchema.optional(),
  formData: FormDataSchema.optional()
});

// Main Pipeline Schema (Discriminated Union)
export const PipelineSchema = z.discriminatedUnion('category', [
  z.discriminatedUnion('intent', [PropertyOfferSchema, PropertySearchSchema]),
  z.discriminatedUnion('intent', [JobOfferSchema, JobSearchSchema])
]);

// API DTO Schema
export const UnifiedPipelineDTOSchema = z.object({
  category: CategorySchema,
  intent: IntentSchema,
  transactionType: TransactionTypeSchema.optional(),
  employmentType: EmploymentTypeSchema.optional(),
  availability: AvailabilitySchema,
  availabilityDetails: AvailabilityDetailsSchema.optional(),
  locationData: LocationDataSchema,
  layoutData: LayoutDataSchema.optional(),
  formData: FormDataSchema
});