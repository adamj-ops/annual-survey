"use client"

import * as React from "react"
import { FormApi } from "@tanstack/react-form"
import { FormField } from "@/components/ui/tanstack-form"
import { Input } from "@/components/ui/input"
import { ScaleField } from "../fields/ScaleField"
import { TextAreaField } from "../fields/TextAreaField"
import { CheckboxGroupField } from "../fields/CheckboxGroupField"
import { SurveyFormData } from "@/types/survey"

interface Step4ExperienceProps {
  form: FormApi<SurveyFormData, any>
}

export function Step4Experience({ form }: Step4ExperienceProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 4 — Experience Using VLN Resources</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Share your experience using VLN's educational resources.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Ease of Use Score */}
        {form.Field({
          name: "ease_of_use_score",
          validators: {
            onChange: ({ value }) => {
              if (!value) {
                return "Please select a score"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="ease_of_use_score" form={form}>
              <ScaleField
                field={field}
                label="How easy has it been to find and use educational resources on our website and community platform? *"
                options={[
                  { value: "very_difficult", label: "Very difficult" },
                  { value: "somewhat_difficult", label: "Somewhat difficult" },
                  { value: "somewhat_easy", label: "Somewhat easy" },
                  { value: "very_easy", label: "Very easy" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Improvements Text */}
        {form.Field({
          name: "improvements_text",
          children: (field) => (
            <FormField name="improvements_text" form={form}>
              <TextAreaField
                field={field}
                label="What improvements or additional resources would you like to see from VLN in the future?"
                placeholder="Share your thoughts and suggestions..."
                rows={4}
              />
            </FormField>
          ),
        })}

        {/* Valuable Resources */}
        <div className="space-y-4">
          {form.Field({
            name: "valuable_resources",
            validators: {
              onChange: ({ value }) => {
                if (!value || !Array.isArray(value) || value.length === 0) {
                  return "Please select at least one resource"
                }
                return undefined
              },
            },
            children: (field) => (
              <FormField name="valuable_resources" form={form}>
                <CheckboxGroupField
                  field={field}
                  label="Which VLN resources do you find most valuable? *"
                  options={[
                    { value: "educational_articles", label: "Educational articles" },
                    { value: "webinars_cme", label: "Webinars / CME events" },
                    { value: "patient_support_groups", label: "Patient support groups" },
                    { value: "podcasts_videos", label: "Podcasts & videos" },
                    { value: "clinical_toolkits", label: "Clinical toolkits" },
                    { value: "research_summaries", label: "Research summaries" },
                    { value: "community_discussions", label: "Community discussions" },
                    { value: "other", label: "Other" },
                  ]}
                  allowOther={true}
                  otherLabel="Other"
                />
              </FormField>
            ),
          })}
          {form.Field({
            name: "valuable_resources_other",
            children: (field) => {
              const hasOther = form.state.values.valuable_resources?.includes("other")
              if (!hasOther) return null
              return (
                <FormField name="valuable_resources_other" form={form}>
                  <div className="space-y-2 ml-6">
                    <label htmlFor="valuable_resources_other" className="text-sm font-medium">
                      Please specify
                    </label>
                    <Input
                      id="valuable_resources_other"
                      type="text"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Please specify"
                      className="max-w-md"
                    />
                  </div>
                </FormField>
              )
            },
          })}
        </div>
      </div>
    </div>
  )
}

