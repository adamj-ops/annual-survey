"use client"

import * as React from "react"
import { FormApi } from "@tanstack/react-form"
import { FormField } from "@/components/ui/tanstack-form"
import { ScaleField } from "../fields/ScaleField"
import { RadioGroupField } from "../fields/RadioGroupField"
import { SurveyFormData } from "@/types/survey"

interface Step2BrandPerceptionProps {
  form: FormApi<SurveyFormData, any>
}

export function Step2BrandPerception({ form }: Step2BrandPerceptionProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 2 — Brand Perception & Messaging</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Help us understand how you perceive the Vasculearn Network brand.
        </p>
      </div>

      <div className="space-y-12 sm:space-y-16 pt-4">
        {/* Familiarity Score */}
        {form.Field({
          name: "familiarity_score",
          validators: {
            onChange: ({ value }) => {
              if (!value) {
                return "Please select a familiarity level"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="familiarity_score" form={form}>
              <ScaleField
                field={field}
                label="How familiar are you with Vasculearn Network (VLN)? *"
                options={[
                  { value: "not_at_all", label: "Not at all" },
                  { value: "somewhat", label: "Somewhat" },
                  { value: "moderately", label: "Moderately" },
                  { value: "very_familiar", label: "Very familiar" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Brand Reflection Score */}
        {form.Field({
          name: "brand_reflection_score",
          validators: {
            onChange: ({ value }) => {
              if (!value) {
                return "Please select a score"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="brand_reflection_score" form={form}>
              <ScaleField
                field={field}
                label="Does the Vasculearn Network name and brand reflect our mission to educate about vascular health and connect patients and clinicians? *"
                options={[
                  { value: "not_at_all", label: "Not at all" },
                  { value: "somewhat", label: "Somewhat" },
                  { value: "well", label: "Well" },
                  { value: "very_well", label: "Very well" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Communication Score */}
        {form.Field({
          name: "communication_score",
          validators: {
            onChange: ({ value }) => {
              if (!value) {
                return "Please select a score"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="communication_score" form={form}>
              <ScaleField
                field={field}
                label="How well do you feel VLN communicates its mission and goals? *"
                options={[
                  { value: "not_well", label: "Not well" },
                  { value: "somewhat", label: "Somewhat" },
                  { value: "well", label: "Well" },
                  { value: "very_well", label: "Very well" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Trustworthiness */}
        {form.Field({
          name: "trustworthiness",
          validators: {
            onChange: ({ value }) => {
              if (!value) {
                return "Please select a trustworthiness level"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="trustworthiness" form={form}>
              <RadioGroupField
                field={field}
                label="How would you rate VLN's trustworthiness as a source of medical education? *"
                options={[
                  { value: "very_low", label: "Very low" },
                  { value: "low", label: "Low" },
                  { value: "moderate", label: "Moderate" },
                  { value: "high", label: "High" },
                  { value: "very_high", label: "Very high" },
                ]}
              />
            </FormField>
          ),
        })}
      </div>
    </div>
  )
}

