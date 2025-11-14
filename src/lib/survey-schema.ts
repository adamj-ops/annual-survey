import { z } from 'zod';

export const surveySchema = z.object({
  // Step 1: About You
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum([
    'clinician',
    'patient',
    'industry',
    'other',
    'healthcare_professional',
    'patient_family',
    'pharma_representative',
  ], {
    required_error: 'Please select your role',
  }),
  familiarity_score: z.enum(['very_familiar', 'somewhat_familiar', 'not_familiar'], {
    required_error: 'Please select a familiarity level',
  }),

  // Step 2: Brand Perception
  brand_reflection_score: z.enum(['yes_very_well', 'yes_somewhat', 'not_really', 'not_at_all'], {
    required_error: 'Please select a score',
  }),
  communication_score: z.enum(['extremely_well', 'very_well', 'somewhat_well', 'not_well', 'not_at_all'], {
    required_error: 'Please select a score',
  }),
  trustworthiness: z.enum(['very_trustworthy', 'somewhat_trustworthy', 'neutral', 'not_trustworthy'], {
    required_error: 'Please select a trustworthiness level',
  }),
  premier_resource: z.boolean(),
  unbiased_source: z.boolean(),

  // Step 3: Community Engagement
  community_factors: z.array(z.enum([
    'not_aware',
    'no_time',
    'unclear_benefits',
    'joined_valuable',
    'joined_no_time',
    'prefer_other_access',
    'other',
  ])).min(1, 'Please select at least one factor'),
  community_factors_other: z.string().optional(),
  refer_others_frequency: z.enum(['yes_frequently', 'yes_occasionally', 'no_but_would', 'no_unlikely'], {
    required_error: 'Please select a referral option',
  }),

  // Step 4: Experience
  ease_of_use_score: z.enum(['1', '2', '3', '4', '5', '6', '7'], {
    required_error: 'Please select a score',
  }),
  improvements_text: z.string().optional(),
  valuable_resources: z.array(z.enum([
    'patient_education',
    'clinician_education',
    'patient_support',
    'research_updates',
    'community_discussions',
    'other',
  ])).min(1, 'Please select at least one resource'),
  valuable_resources_other: z.string().optional(),

  // Step 5: Testimonials
  testimonial: z.string().optional(),
  may_contact: z.boolean(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;

