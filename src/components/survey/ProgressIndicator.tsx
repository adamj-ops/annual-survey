"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
        <span>
          {currentStep === 0 ? "Welcome" : `Step ${currentStep} of ${totalSteps - 1}`}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

