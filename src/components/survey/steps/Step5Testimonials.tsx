"use client"

import * as React from "react"
import { FormField } from "@/components/ui/tanstack-form"
import { TextAreaField } from "../fields/TextAreaField"
import { RadioGroupField } from "../fields/RadioGroupField"

interface Step5TestimonialsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => (
            <FormField name="testimonial">
              <TextAreaField
                field={field}
                label="Please share any testimonials or experiences regarding VLN (must be completed to be eligible to win the Amazon gift card)"
                description="Share a brief testimonial or story about VLN."
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange: ({ value }: { value: any }) => {
              if (value === undefined || value === null) {
                return "Please select an option"
              }
              return undefined
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => (
            <FormField name="may_contact">
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

