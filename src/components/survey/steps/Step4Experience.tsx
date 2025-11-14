"use client"

import * as React from "react"
import { FormField } from "@/components/ui/tanstack-form"
import { Input } from "@/components/ui/input"
import { ScaleField } from "../fields/ScaleField"
import { TextAreaField } from "../fields/TextAreaField"
import { CheckboxGroupField } from "../fields/CheckboxGroupField"

interface Step4ExperienceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
}

export function Step4Experience({ form }: Step4ExperienceProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 4 — Experience Using VLN Resources</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Share your experience using VLN&apos;s educational resources.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Ease of Use Score */}
        {form.Field({
          name: "ease_of_use_score",
          validators: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange: ({ value }: { value: any }) => {
              if (!value) {
                return "Please select a score"
              }
              return undefined
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => (
            <FormField name="ease_of_use_score">
              <ScaleField
                field={field}
                label="How easy has it been to find and use educational resources on our website and community platform? *"
                description="1 = Very difficult, 7 = Very easy"
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Improvements Text */}
        {form.Field({
          name: "improvements_text",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => (
            <FormField name="improvements_text">
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange: ({ value }: { value: any }) => {
                if (!value || !Array.isArray(value) || value.length === 0) {
                  return "Please select at least one resource"
                }
                return undefined
              },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => (
              <FormField name="valuable_resources">
                <CheckboxGroupField
                  field={field}
                  label="Which VLN resources do you find most valuable? *"
                  options={[
                  { value: "patient_education", label: "Patient education materials" },
                  { value: "clinician_education", label: "Clinician education (e.g., webinars, CME courses)" },
                  { value: "patient_support", label: "Patient support groups" },
                  { value: "research_updates", label: "Research updates (What's Hot in Clots)" },
                  { value: "community_discussions", label: "Community Discussion Boards" },
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => {
              const hasOther = form.state.values.valuable_resources?.includes("other")
              if (!hasOther) return null
              return (
                <FormField name="valuable_resources_other">
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

