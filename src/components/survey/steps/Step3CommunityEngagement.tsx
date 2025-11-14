"use client"

import * as React from "react"
import { FormApi } from "@tanstack/react-form"
import { FormField } from "@/components/ui/tanstack-form"
import { Input } from "@/components/ui/input"
import { CheckboxGroupField } from "../fields/CheckboxGroupField"
import { RadioGroupField } from "../fields/RadioGroupField"
import { SurveyFormData } from "@/types/survey"

interface Step3CommunityEngagementProps {
  form: FormApi<SurveyFormData, any>
}

export function Step3CommunityEngagement({ form }: Step3CommunityEngagementProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">Step 3 — Community Engagement & Decision Factors</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Tell us about your engagement with the VLN community.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Community Factors */}
        <div className="space-y-4">
          {form.Field({
            name: "community_factors",
            validators: {
              onChange: ({ value }) => {
                if (!value || !Array.isArray(value) || value.length === 0) {
                  return "Please select at least one factor"
                }
                return undefined
              },
            },
            children: (field) => (
              <FormField name="community_factors" form={form}>
                <CheckboxGroupField
                  field={field}
                  label="What influenced your decision to join (or not join) the new VLN Community? *"
                  options={[
                    { value: "content_available", label: "The content available" },
                    { value: "peer_recommendations", label: "Peer recommendations" },
                    { value: "curiosity", label: "Curiosity" },
                    { value: "didnt_know", label: "Didn't know about it" },
                    { value: "time_constraints", label: "Time constraints" },
                    { value: "privacy_concerns", label: "Privacy concerns" },
                    { value: "not_interested", label: "Not interested" },
                    { value: "other", label: "Other" },
                  ]}
                  allowOther={true}
                  otherLabel="Other (please specify)"
                />
              </FormField>
            ),
          })}
          {form.Field({
            name: "community_factors_other",
            children: (field) => {
              const hasOther = form.state.values.community_factors?.includes("other")
              if (!hasOther) return null
              return (
                <FormField name="community_factors_other" form={form}>
                  <div className="space-y-2 ml-6">
                    <label htmlFor="community_factors_other" className="text-sm font-medium">
                      Please specify
                    </label>
                    <Input
                      id="community_factors_other"
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

        {/* Refer Others */}
        {form.Field({
          name: "refer_others",
          validators: {
            onChange: ({ value }) => {
              if (value === undefined || value === null) {
                return "Please select an option"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="refer_others" form={form}>
              <RadioGroupField
                field={field}
                label="Do you refer colleagues, patients, or peers to VLN's website or resources? *"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Premier Resource */}
        {form.Field({
          name: "premier_resource",
          validators: {
            onChange: ({ value }) => {
              if (value === undefined || value === null) {
                return "Please select an option"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="premier_resource" form={form}>
              <RadioGroupField
                field={field}
                label="Do you consider VLN to be a premier resource for medical and health education? *"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Unbiased Source */}
        {form.Field({
          name: "unbiased_source",
          validators: {
            onChange: ({ value }) => {
              if (value === undefined || value === null) {
                return "Please select an option"
              }
              return undefined
            },
          },
          children: (field) => (
            <FormField name="unbiased_source" form={form}>
              <RadioGroupField
                field={field}
                label="Do you consider VLN to be an unbiased source of medical education? *"
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

