"use client"

import * as React from "react"
import { FormApi } from "@tanstack/react-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/tanstack-form"
import { Input } from "@/components/ui/input"
import { RadioGroupField } from "../fields/RadioGroupField"
import { SurveyFormData } from "@/types/survey"

interface Step1AboutYouProps {
  form: FormApi<SurveyFormData, any>
}

export function Step1AboutYou({ form }: Step1AboutYouProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 1 — About You</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Let's start with some basic information about you.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Name */}
        {form.Field({
          name: "name",
          validators: {
            onChange: ({ value }) => {
              if (!value || value.trim().length === 0) {
                return "Name is required"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="name" form={form}>
              <FormItem>
                <FormLabel>
                  Your name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl fieldApi={field}>
                  <Input
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your name"
                    required
                  />
                </FormControl>
                <FormMessage fieldApi={field} />
              </FormItem>
            </FormField>
          ),
        })}

        {/* Email */}
        {form.Field({
          name: "email",
          validators: {
            onChange: ({ value }) => {
              if (!value || value.trim().length === 0) {
                return "Email is required"
              }
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (!emailRegex.test(value)) {
                return "Please enter a valid email address"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="email" form={form}>
              <FormItem>
                <FormLabel>
                  Your email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl fieldApi={field}>
                  <Input
                    type="email"
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter your email"
                    required
                  />
                </FormControl>
                <FormMessage fieldApi={field} />
              </FormItem>
            </FormField>
          ),
        })}

        {/* Role */}
        {form.Field({
          name: "role",
          validators: {
            onChange: ({ value }) => {
              if (!value) {
                return "Please select your role"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="role" form={form}>
              <RadioGroupField
                field={field}
                label="Are you a clinician, patient, or pharmaceutical industry representative? *"
                options={[
                  { value: "clinician", label: "Clinician" },
                  { value: "patient", label: "Patient" },
                  { value: "industry", label: "Industry Representative" },
                  { value: "other", label: "Other" },
                ]}
              />
            </FormField>
          ),
        })}
      </div>
    </div>
  )
}

