"use client"

import * as React from "react"
import { FieldApi } from "@tanstack/react-form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/tanstack-form"

interface ScaleOption {
  value: string
  label: string
}

interface ScaleFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  label: string
  description?: string
  options: ScaleOption[]
}

export function ScaleField({
  field,
  label,
  description,
  options,
}: ScaleFieldProps) {
  const value = field.state.value ?? undefined

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl fieldApi={field}>
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(val) => {
            if (val) {
              field.handleChange(val)
            } else {
              // Allow deselection
              field.handleChange(undefined)
            }
          }}
          variant="outline"
          className="w-full flex flex-wrap gap-2 sm:gap-0"
          aria-invalid={!!field.state.meta.errors?.length && field.state.meta.isTouched}
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className="flex-1 min-w-[60px] sm:min-w-0 text-xs sm:text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/90"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage fieldApi={field} />
    </FormItem>
  )
}

