export type SurveyRole =
  | "clinician"
  | "patient"
  | "industry"
  | "other"
  | "healthcare_professional"
  | "patient_family"
  | "pharma_representative"

export type TrustworthinessLevel =
  | "very_low"
  | "low"
  | "moderate"
  | "high"
  | "very_high"
  | "very_trustworthy"
  | "somewhat_trustworthy"
  | "neutral"
  | "not_trustworthy"

export type CommunityFactor =
  | "content_available"
  | "peer_recommendations"
  | "curiosity"
  | "didnt_know"
  | "time_constraints"
  | "privacy_concerns"
  | "not_interested"
  | "other"
  | "not_aware"
  | "no_time"
  | "unclear_benefits"
  | "joined_valuable"
  | "joined_no_time"
  | "prefer_other_access"

export type ValuableResource =
  | "educational_articles"
  | "webinars_cme"
  | "patient_support_groups"
  | "podcasts_videos"
  | "clinical_toolkits"
  | "research_summaries"
  | "community_discussions"
  | "other"
  | "patient_education"
  | "clinician_education"
  | "patient_support"
  | "research_updates"

export type FamiliarityLevel = "very_familiar" | "somewhat_familiar" | "not_familiar"
export type BrandReflectionLevel = "yes_very_well" | "yes_somewhat" | "not_really" | "not_at_all"
export type CommunicationLevel = "extremely_well" | "very_well" | "somewhat_well" | "not_well" | "not_at_all"
export type EaseOfUseLevel = "1" | "2" | "3" | "4" | "5" | "6" | "7"
export type ReferOthersFrequency = "yes_frequently" | "yes_occasionally" | "no_but_would" | "no_unlikely"

export interface SurveyFormData {
  // Step 1: About You
  name: string
  email: string
  role: SurveyRole

  // Step 2: Brand Perception
  familiarity_score: FamiliarityLevel
  brand_reflection_score: BrandReflectionLevel
  communication_score: CommunicationLevel
  trustworthiness: TrustworthinessLevel
  premier_resource: boolean
  unbiased_source: boolean

  // Step 3: Community Engagement
  community_factors: CommunityFactor[]
  community_factors_other?: string
  refer_others_frequency: ReferOthersFrequency

  // Step 4: Experience
  ease_of_use_score: EaseOfUseLevel
  improvements_text?: string
  valuable_resources: ValuableResource[]
  valuable_resources_other?: string

  // Step 5: Testimonials
  testimonial?: string
  may_contact: boolean
}

export interface SurveyResponse extends SurveyFormData {
  id: string
  submitted_at: string
  refer_others: boolean
  refer_others_detail?: string | null
}

