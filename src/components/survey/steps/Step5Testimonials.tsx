"use client"

import * as React from "react"
import { FormApi } from "@tanstack/react-form"
import { FormField } from "@/components/ui/tanstack-form"
import { TextAreaField } from "../fields/TextAreaField"
import { RadioGroupField } from "../fields/RadioGroupField"
import { SurveyFormData } from "@/types/survey"

interface Step5TestimonialsProps {
  form: FormApi<SurveyFormData, any>
}

export function Step5Testimonials({ form }: Step5TestimonialsProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 5 — Testimonials & Follow-Up</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Share your experience and help us improve.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Testimonial */}
        {form.Field({
          name: "testimonial",
          children: (field) => (
            <FormField name="testimonial" form={form}>
              <TextAreaField
                field={field}
                label="Please share any testimonials or experiences regarding VLN"
                description="Optional: Share your experience to be entered to win the Amazon gift card 🎉"
                placeholder="Share your experience with VLN..."
                rows={6}
              />
            </FormField>
          ),
        })}

        {/* May Contact */}
        {form.Field({
          name: "may_contact",
          validators: {
            onChange: ({ value }) => {
              if (value === undefined || value === null) {
                return "Please select an option"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="may_contact" form={form}>
              <RadioGroupField
                field={field}
                label="May VLN contact you regarding your survey responses? *"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
          ),
        })}
      </div>
    </div>
  )
}

