"use client"

import * as React from "react"
import { FormField } from "@/components/ui/tanstack-form"
import { Input } from "@/components/ui/input"
import { CheckboxGroupField } from "../fields/CheckboxGroupField"
import { RadioGroupField } from "../fields/RadioGroupField"

interface Step3CommunityEngagementProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange: ({ value }: { value: any }) => {
                if (!value || !Array.isArray(value) || value.length === 0) {
                  return "Please select at least one factor"
                }
                return undefined
              },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            children: (field: any) => (
              <FormField name="community_factors">
                <CheckboxGroupField
                  field={field}
                  label="What influenced your decision to join (or not join) the new VLN Community? *"
                  options={[
                    { value: "not_aware", label: "I wasn't aware of the community" },
                    { value: "no_time", label: "I haven't had time to explore it" },
                    { value: "unclear_benefits", label: "I am not sure what the benefits are" },
                    { value: "joined_valuable", label: "I've joined and found it valuable" },
                    { value: "joined_no_time", label: "I've joined but haven't had time to engage" },
                    { value: "prefer_other_access", label: "I prefer to access resources another way" },
                  ]}
                  allowOther
                  otherLabel="Other"
                />
              </FormField>
            ),
          })}
          {form.Field({
            name: "community_factors_other",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            children: (field: any) => {
              const hasOther = form.state.values.community_factors?.includes("other")
              if (!hasOther) return null
              return (
                <FormField name="community_factors_other">
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
          name: "refer_others_frequency",
          validators: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange: ({ value }: { value: any }) => {
              if (!value) {
                return "Please select an option"
              }
              return undefined
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children: (field: any) => (
            <FormField name="refer_others_frequency">
              <RadioGroupField
                field={field}
                label="Do you refer colleagues, patients, or peers to VLN's website or resources? *"
                options={[
                  { value: "yes_frequently", label: "Yes, frequently" },
                  { value: "yes_occasionally", label: "Yes, occasionally" },
                  { value: "no_but_would", label: "No, but I would" },
                  { value: "no_unlikely", label: "No, and I am unlikely to" },
                ]}
              />
            </FormField>
          ),
        })}

        {/* Premier Resource */}
        {form.Field({
          name: "premier_resource",
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
            <FormField name="premier_resource">
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
            <FormField name="unbiased_source">
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

