import { z } from 'zod';

export const surveySchema = z.object({
  // Step 1: About You
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['clinician', 'patient', 'industry', 'other'], {
    required_error: 'Please select your role',
  }),
  familiarity_score: z.enum(['not_at_all', 'somewhat', 'moderately', 'very_familiar'], {
    required_error: 'Please select a familiarity level',
  }),

  // Step 2: Brand Perception
  brand_reflection_score: z.enum(['not_at_all', 'somewhat', 'well', 'very_well'], {
    required_error: 'Please select a score',
  }),
  communication_score: z.enum(['not_well', 'somewhat', 'well', 'very_well'], {
    required_error: 'Please select a score',
  }),
  trustworthiness: z.enum(['very_low', 'low', 'moderate', 'high', 'very_high'], {
    required_error: 'Please select a trustworthiness level',
  }),
  premier_resource: z.boolean(),
  unbiased_source: z.boolean(),

  // Step 3: Community Engagement
  community_factors: z.array(z.enum([
    'content_available',
    'peer_recommendations',
    'curiosity',
    'didnt_know',
    'time_constraints',
    'privacy_concerns',
    'not_interested',
    'other',
  ])).min(1, 'Please select at least one factor'),
  community_factors_other: z.string().optional(),
  refer_others: z.boolean(),

  // Step 4: Experience
  ease_of_use_score: z.enum(['very_difficult', 'somewhat_difficult', 'somewhat_easy', 'very_easy'], {
    required_error: 'Please select a score',
  }),
  improvements_text: z.string().optional(),
  valuable_resources: z.array(z.enum([
    'educational_articles',
    'webinars_cme',
    'patient_support_groups',
    'podcasts_videos',
    'clinical_toolkits',
    'research_summaries',
    'community_discussions',
    'other',
  ])).min(1, 'Please select at least one resource'),
  valuable_resources_other: z.string().optional(),

  // Step 5: Testimonials
  testimonial: z.string().optional(),
  may_contact: z.boolean(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;

