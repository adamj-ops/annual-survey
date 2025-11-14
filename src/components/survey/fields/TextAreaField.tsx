"use client"

import * as React from "react"
import { FieldApi } from "@tanstack/react-form"
import { Textarea } from "@/components/ui/textarea"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/tanstack-form"

interface TextAreaFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  label: string
  description?: string
  placeholder?: string
  rows?: number
  required?: boolean
}

export function TextAreaField({
  field,
  label,
  description,
  placeholder,
  rows = 4,
  required = false,
}: TextAreaFieldProps) {
  return (
    <FormItem>
      <FormLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl fieldApi={field}>
        <Textarea
          value={field.state.value || ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="resize-none"
        />
      </FormControl>
      {description && <FormDescription className="italic">{description}</FormDescription>}
      <FormMessage fieldApi={field} />
    </FormItem>
  )
}

