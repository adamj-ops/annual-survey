"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  isSubmitting?: boolean
  canProceed?: boolean
  nextLabel?: string
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false,
  canProceed = true,
  nextLabel,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div className="pt-8 sm:pt-[40px] pb-8">
      <div className={`flex flex-col sm:flex-row gap-4 ${isFirstStep ? 'justify-center items-stretch sm:items-center' : 'justify-between'}`}>
        {!isFirstStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="w-full sm:w-1/4 order-2 sm:order-1"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          className={`w-full sm:w-1/4 ${isFirstStep ? '' : 'order-1 sm:order-2'} ${!isFirstStep ? 'sm:ml-auto' : ''}`}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : isLastStep ? (
            "Submit"
          ) : (
            <>
              {nextLabel || "Next"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {isFirstStep && (
        <p className="text-xs italic text-muted-foreground text-center mt-[5px]">
          *est 5-10 minutes to complete
        </p>
      )}
    </div>
  )
}

