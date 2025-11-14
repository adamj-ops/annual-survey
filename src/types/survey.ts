export type SurveyRole = 'clinician' | 'patient' | 'industry' | 'other';

export type TrustworthinessLevel = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';

export type CommunityFactor = 
  | 'content_available'
  | 'peer_recommendations'
  | 'curiosity'
  | 'didnt_know'
  | 'time_constraints'
  | 'privacy_concerns'
  | 'not_interested'
  | 'other';

export type ValuableResource = 
  | 'educational_articles'
  | 'webinars_cme'
  | 'patient_support_groups'
  | 'podcasts_videos'
  | 'clinical_toolkits'
  | 'research_summaries'
  | 'community_discussions'
  | 'other';

export type FamiliarityLevel = 'not_at_all' | 'somewhat' | 'moderately' | 'very_familiar';
export type BrandReflectionLevel = 'not_at_all' | 'somewhat' | 'well' | 'very_well';
export type CommunicationLevel = 'not_well' | 'somewhat' | 'well' | 'very_well';
export type EaseOfUseLevel = 'very_difficult' | 'somewhat_difficult' | 'somewhat_easy' | 'very_easy';

export interface SurveyFormData {
  // Step 1: About You
  name: string;
  email: string;
  role: SurveyRole;
  familiarity_score: FamiliarityLevel;

  // Step 2: Brand Perception
  brand_reflection_score: BrandReflectionLevel;
  communication_score: CommunicationLevel;
  trustworthiness: TrustworthinessLevel;
  premier_resource: boolean;
  unbiased_source: boolean;

  // Step 3: Community Engagement
  community_factors: CommunityFactor[];
  community_factors_other?: string;
  refer_others: boolean;

  // Step 4: Experience
  ease_of_use_score: EaseOfUseLevel;
  improvements_text?: string;
  valuable_resources: ValuableResource[];
  valuable_resources_other?: string;

  // Step 5: Testimonials
  testimonial: string;
  may_contact: boolean;
}

export interface SurveyResponse extends SurveyFormData {
  id: string;
  submitted_at: string;
}

