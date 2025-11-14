"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"

interface Step6ReviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
  onEditStep: (step: number) => void
}

const roleLabels: Record<string, string> = {
  clinician: "Clinician",
  patient: "Patient",
  industry: "Industry Representative",
  other: "Other",
  healthcare_professional: "Healthcare Professional",
  patient_family: "Patient or family member/friend of patient",
  pharma_representative: "Pharmaceutical industry representative",
}

const familiarityLabels: Record<string, string> = {
  not_at_all: "Not at all",
  somewhat: "Somewhat",
  moderately: "Moderately",
  very_familiar: "Very familiar",
  somewhat_familiar: "Somewhat familiar",
  not_familiar: "Not familiar at all",
}

const brandReflectionLabels: Record<string, string> = {
  not_at_all: "Not at all",
  somewhat: "Somewhat",
  well: "Well",
  very_well: "Very well",
  yes_very_well: "Yes, very well",
  yes_somewhat: "Yes, somewhat",
  not_really: "Not really",
}

const communicationLabels: Record<string, string> = {
  not_well: "Not well",
  somewhat: "Somewhat",
  well: "Well",
  very_well: "Very well",
  extremely_well: "Extremely well",
  somewhat_well: "Somewhat well",
  not_at_all: "Not at all",
}

const trustworthinessLabels: Record<string, string> = {
  very_low: "Very low",
  low: "Low",
  moderate: "Moderate",
  high: "High",
  very_high: "Very high",
  very_trustworthy: "Very trustworthy",
  somewhat_trustworthy: "Somewhat trustworthy",
  neutral: "Neutral",
  not_trustworthy: "Not trustworthy",
}

const communityFactorLabels: Record<string, string> = {
  content_available: "The content available",
  peer_recommendations: "Peer recommendations",
  curiosity: "Curiosity",
  didnt_know: "Didn't know about it",
  time_constraints: "Time constraints",
  privacy_concerns: "Privacy concerns",
  not_interested: "Not interested",
  other: "Other",
  not_aware: "I wasn’t aware of the community",
  no_time: "I haven’t had time to explore it",
  unclear_benefits: "I am not sure what the benefits are",
  joined_valuable: "I’ve joined and found it valuable",
  joined_no_time: "I’ve joined but haven’t had time to engage",
  prefer_other_access: "I prefer to access resources another way",
}

const easeOfUseLabels: Record<string, string> = {
  very_difficult: "Very difficult",
  somewhat_difficult: "Somewhat difficult",
  somewhat_easy: "Somewhat easy",
  very_easy: "Very easy",
  "1": "1 — Very difficult",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7 — Very easy",
}

const resourceLabels: Record<string, string> = {
  educational_articles: "Educational articles",
  webinars_cme: "Webinars / CME events",
  patient_support_groups: "Patient support groups",
  podcasts_videos: "Podcasts & videos",
  clinical_toolkits: "Clinical toolkits",
  research_summaries: "Research summaries",
  community_discussions: "Community discussions",
  patient_education: "Patient education materials",
  clinician_education: "Clinician education (e.g., webinars, CME courses)",
  patient_support: "Patient support groups",
  research_updates: "Research updates (What's Hot in Clots)",
  other: "Other",
}

const referOthersLabels: Record<string, string> = {
  yes_frequently: "Yes, frequently",
  yes_occasionally: "Yes, occasionally",
  no_but_would: "No, but I would",
  no_unlikely: "No, and I am unlikely to",
}

export function Step6Review({ form, onEditStep }: Step6ReviewProps) {
  const values = form.state.values

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 6 — Confirmation & Submit</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Please review your answers before submitting.
        </p>
      </div>

      <div>
        {/* Step 1 Review */}
        <div className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">About You</h3>
            <button
              onClick={() => onEditStep(1)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              aria-label="Edit About You section"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium mb-1">Your name</div>
              <div className="text-muted-foreground">{values.name}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Your email</div>
              <div className="text-muted-foreground">{values.email}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Are you a clinician, patient, or pharmaceutical industry representative?</div>
              <div className="text-muted-foreground">{roleLabels[values.role] || values.role}</div>
            </div>
          </div>
        </div>

        <Separator className="bg-muted" />

        {/* Step 2 Review */}
        <div className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Brand Perception & Messaging</h3>
            <button
              onClick={() => onEditStep(2)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              aria-label="Edit Brand Perception section"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium mb-1">How familiar are you with Vasculearn Network (VLN)?</div>
              <div className="text-muted-foreground">{familiarityLabels[values.familiarity_score] || values.familiarity_score}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Does the Vasculearn Network name and brand reflect our mission to educate about vascular health and connect patients and clinicians?</div>
              <div className="text-muted-foreground">{brandReflectionLabels[values.brand_reflection_score] || values.brand_reflection_score}</div>
            </div>
            <div>
              <div className="font-medium mb-1">How well do you feel VLN communicates its mission and goals?</div>
              <div className="text-muted-foreground">{communicationLabels[values.communication_score] || values.communication_score}</div>
            </div>
            <div>
              <div className="font-medium mb-1">How would you rate VLN&apos;s trustworthiness as a source of medical education?</div>
              <div className="text-muted-foreground">{trustworthinessLabels[values.trustworthiness] || values.trustworthiness}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Do you consider VLN to be a premier resource for medical and health education?</div>
              <div className="text-muted-foreground">{values.premier_resource ? "Yes" : "No"}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Do you consider VLN to be an unbiased source of medical education?</div>
              <div className="text-muted-foreground">{values.unbiased_source ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>

        <Separator className="bg-muted" />

        {/* Step 3 Review */}
        <div className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Community Engagement & Decision Factors</h3>
            <button
              onClick={() => onEditStep(3)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              aria-label="Edit Community Engagement section"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium mb-1">What influenced your decision to join (or not join) the new VLN Community?</div>
              <div className="text-muted-foreground">
                <ul className="list-disc list-inside mt-1 ml-2">
                  {values.community_factors?.map((factor: string) => (
                    <li key={factor}>{communityFactorLabels[factor] || factor}</li>
                  ))}
                </ul>
                {values.community_factors_other && (
                  <div className="mt-1 ml-4 italic">Other: {values.community_factors_other}</div>
                )}
              </div>
            </div>
            <div>
              <div className="font-medium mb-1">Do you refer colleagues, patients, or peers to VLN&apos;s website or resources?</div>
              <div className="text-muted-foreground">
                {referOthersLabels[values.refer_others_frequency] || values.refer_others_frequency || "—"}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-muted" />

        {/* Step 4 Review */}
        <div className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Experience Using VLN Resources</h3>
            <button
              onClick={() => onEditStep(4)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              aria-label="Edit Experience section"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium mb-1">How easy has it been to find and use educational resources on our website and community platform?</div>
              <div className="text-muted-foreground">{easeOfUseLabels[values.ease_of_use_score] || values.ease_of_use_score}</div>
            </div>
            {values.improvements_text && (
              <div>
                <div className="font-medium mb-1">What improvements or additional resources would you like to see from VLN in the future?</div>
                <div className="text-muted-foreground whitespace-pre-wrap">{values.improvements_text}</div>
              </div>
            )}
            <div>
              <div className="font-medium mb-1">Which VLN resources do you find most valuable?</div>
              <div className="text-muted-foreground">
                <ul className="list-disc list-inside mt-1 ml-2">
                  {values.valuable_resources?.map((resource: string) => (
                    <li key={resource}>{resourceLabels[resource] || resource}</li>
                  ))}
                </ul>
                {values.valuable_resources_other && (
                  <div className="mt-1 ml-4 italic">Other: {values.valuable_resources_other}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-muted" />

        {/* Step 5 Review */}
        <div className="py-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Testimonials & Follow-Up</h3>
            <button
              onClick={() => onEditStep(5)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              aria-label="Edit Testimonials section"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 text-sm">
            {values.testimonial && (
              <div>
                <div className="font-medium mb-1">Please share any testimonials or experiences regarding VLN</div>
                <div className="text-muted-foreground whitespace-pre-wrap">{values.testimonial}</div>
              </div>
            )}
            <div>
              <div className="font-medium mb-1">May VLN contact you regarding your survey responses?</div>
              <div className="text-muted-foreground">{values.may_contact ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
