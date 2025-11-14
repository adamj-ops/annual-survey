"use client"

import * as React from "react"
import { FieldApi } from "@tanstack/react-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/tanstack-form"

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroupFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  label: string
  description?: string
  options: CheckboxOption[]
  allowOther?: boolean
  otherLabel?: string
}

export function CheckboxGroupField({
  field,
  label,
  description,
  options,
  allowOther = false,
  otherLabel = "Other (please specify)",
}: CheckboxGroupFieldProps) {
  const values = field.state.value || []

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentValues = values || []
    if (checked) {
      field.handleChange([...currentValues, optionValue])
    } else {
      field.handleChange(currentValues.filter((v: string) => v !== optionValue))
    }
  }

  // Split label to style asterisk separately
  const labelParts = label.split(/(\*)/)
  
  return (
    <FormItem>
      <FormLabel>
        {labelParts.map((part, index) => 
          part === "*" ? (
            <span key={index} className="text-primary">{part}</span>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          )
        )}
      </FormLabel>
      <FormControl fieldApi={field}>
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={values.includes(option.value)}
                onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
              />
              <Label
                htmlFor={option.value}
                className="font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
          {allowOther && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="other"
                checked={values.includes("other")}
                onCheckedChange={(checked) => handleCheckboxChange("other", checked as boolean)}
              />
              <Label htmlFor="other" className="font-normal cursor-pointer">
                {otherLabel}
              </Label>
            </div>
          )}
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage fieldApi={field} />
    </FormItem>
  )
}

