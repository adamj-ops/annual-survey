"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import { Form } from "@/components/ui/tanstack-form"
import { ProgressIndicator } from "./ProgressIndicator"
import { StepNavigation } from "./StepNavigation"
import { Step0Welcome } from "./steps/Step0Welcome"
import { Step1AboutYou } from "./steps/Step1AboutYou"
import { Step2BrandPerception } from "./steps/Step2BrandPerception"
import { Step3CommunityEngagement } from "./steps/Step3CommunityEngagement"
import { Step4Experience } from "./steps/Step4Experience"
import { Step5Testimonials } from "./steps/Step5Testimonials"
import { Step6Review } from "./steps/Step6Review"
import { Step7ThankYou } from "./steps/Step7ThankYou"
import { SurveyFormData } from "@/types/survey"
import { toast } from "sonner"

const TOTAL_STEPS = 8

const defaultValues: Partial<SurveyFormData> = {
  name: "",
  email: "",
  role: undefined,
  familiarity_score: undefined,
  brand_reflection_score: undefined,
  communication_score: undefined,
  trustworthiness: undefined,
  premier_resource: undefined,
  unbiased_source: undefined,
  community_factors: [],
  community_factors_other: "",
  refer_others_frequency: undefined,
  ease_of_use_score: undefined,
  improvements_text: "",
  valuable_resources: [],
  valuable_resources_other: "",
  testimonial: "",
  may_contact: undefined,
}

type SurveyLogoProps = {
  asHeading?: boolean
}

function SurveyLogo({ asHeading = false }: SurveyLogoProps) {
  const Wrapper = asHeading ? "h1" : "div"
  return (
    <Wrapper className="flex justify-center">
      {asHeading && <span className="sr-only">Annual Survey</span>}
      <Image
        src="/vln_logo.png"
        alt="Vasculearn Network Annual Survey"
        width={400}
        height={225}
        priority={asHeading}
        className={asHeading ? "w-64 sm:w-72 md:w-80 h-auto" : "w-48 sm:w-56 md:w-64 h-auto"}
      />
    </Wrapper>
  )
}

export function MultiStepSurvey() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        const response = await fetch("/api/survey/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })

        if (!response.ok) {
          const error = await response.json().catch(() => ({}))
          const errorMessage = error.details 
            ? `Validation error: ${JSON.stringify(error.details)}` 
            : error.message || error.error || "Failed to submit survey"
          console.error("Submission error:", error)
          throw new Error(errorMessage)
        }

        // Clear draft
        localStorage.removeItem("survey_draft")
        
        // Trigger confetti celebration
        const duration = 3000
        const end = Date.now() + duration

        const colors = ['#9333ea', '#a855f7', '#c084fc', '#2dd4bf', '#5eead4', '#7dd3fc']

        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          })
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        }
        frame()

        // Also add some bursts from the center
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors,
          })
        }, 100)

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          })
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          })
        }, 500)
        
        setIsSubmitted(true)
        setCurrentStep(TOTAL_STEPS - 1)
        toast.success("Survey submitted successfully!")
      } catch (error) {
        console.error("Submission error:", error)
        toast.error(error instanceof Error ? error.message : "Failed to submit survey. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  // Load draft from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("survey_draft")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        form.setFieldValue("name", parsed.name || "")
        form.setFieldValue("email", parsed.email || "")
        // Load other fields as needed
      } catch (e) {
        console.error("Failed to load draft", e)
      }
    }
  }, [form])

  // Save draft to localStorage on change
  React.useEffect(() => {
    const values = form.state.values
    localStorage.setItem("survey_draft", JSON.stringify({
      name: values.name,
      email: values.email,
      // Save other important fields
    }))
  }, [form.state.values])

  const validateCurrentStep = React.useCallback((): boolean => {
    const values = form.state.values

    switch (currentStep) {
      case 0:
        return true // Welcome step, always valid
      case 1:
        return !!(
          values.name?.trim() &&
          values.email?.trim() &&
          values.role
        )
      case 2:
        return !!(
          values.familiarity_score &&
          values.brand_reflection_score &&
          values.communication_score &&
          values.trustworthiness
        )
      case 3:
        return !!(
          values.community_factors && values.community_factors.length > 0 &&
          values.refer_others_frequency &&
          values.premier_resource !== undefined &&
          values.unbiased_source !== undefined
        )
      case 4:
        return !!(
          values.ease_of_use_score &&
          values.valuable_resources && values.valuable_resources.length > 0
        )
      case 5:
        return !!(
          values.may_contact !== undefined
        )
      case 6:
        return true // Review step, always valid
      default:
        return false
    }
  }, [form.state.values, currentStep])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      if (currentStep === 6) {
        // Submit on review step
        form.handleSubmit()
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleEditStep = (step: number) => {
    setCurrentStep(step)
  }

  // Subscribe to form state changes to make validation reactive
  // Use form.state.values directly and force re-render on form state changes
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  
  React.useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      forceUpdate()
    })
    return unsubscribe
  }, [form])
  
  const canProceed = React.useMemo(() => validateCurrentStep(), [validateCurrentStep])

  const renderStep = () => {
    if (isSubmitted && currentStep === TOTAL_STEPS - 1) {
      return <Step7ThankYou />
    }

    switch (currentStep) {
      case 0:
        return <Step0Welcome />
      case 1:
        return <Step1AboutYou form={form} />
      case 2:
        return <Step2BrandPerception form={form} />
      case 3:
        return <Step3CommunityEngagement form={form} />
      case 4:
        return <Step4Experience form={form} />
      case 5:
        return <Step5Testimonials form={form} />
      case 6:
        return <Step6Review form={form} onEditStep={handleEditStep} />
      case 7:
        return <Step7ThankYou />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        {currentStep === 0 ? <SurveyLogo asHeading /> : <SurveyLogo />}
      </div>
      {!isSubmitted && currentStep !== 0 && (
        <div className="mb-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
      )}

      <Form form={form}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {!isSubmitted && currentStep < TOTAL_STEPS - 1 && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isSubmitting={isSubmitting}
            canProceed={canProceed}
            nextLabel={currentStep === 6 ? "Submit" : currentStep === 0 ? "Get Started" : undefined}
          />
        )}
      </Form>
    </div>
  )
}

