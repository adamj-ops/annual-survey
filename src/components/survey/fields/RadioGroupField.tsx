"use client"

import * as React from "react"
import { FieldApi } from "@tanstack/react-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/tanstack-form"

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  label: string
  description?: string
  options: RadioOption[]
  orientation?: "horizontal" | "vertical"
}

export function RadioGroupField({
  field,
  label,
  description,
  options,
  orientation = "vertical",
}: RadioGroupFieldProps) {
  const rawValue = field.state.value
  // Convert boolean to "yes"/"no" for display, or use string value as-is
  const displayValue = typeof rawValue === "boolean" 
    ? (rawValue ? "yes" : "no")
    : rawValue

  // Split label to style asterisk separately
  const labelParts = label.split(/(\*)/)
  
  return (
    <FormItem>
      <FormLabel className="mb-2">
        {labelParts.map((part, index) => 
          part === "*" ? (
            <span key={index} className="text-primary">{part}</span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </FormLabel>
      <FormControl fieldApi={field}>
        <RadioGroup
          value={displayValue}
          onValueChange={(val) => {
            // Convert "yes"/"no" to boolean for boolean fields
            if (val === "yes") {
              field.handleChange(true)
            } else if (val === "no") {
              field.handleChange(false)
            } else {
              field.handleChange(val)
            }
          }}
          className={orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3"}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label
                htmlFor={option.value}
                className="font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage fieldApi={field} />
    </FormItem>
  )
}

