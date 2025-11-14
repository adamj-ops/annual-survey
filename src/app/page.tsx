import { MultiStepSurvey } from "@/components/survey/MultiStepSurvey"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 pt-6 pb-8 flex-1 flex flex-col items-center">
        {/* Centered form content */}
        <div className="flex-1 flex flex-col justify-start pt-8 w-full max-w-4xl">
          <MultiStepSurvey />
        </div>
      </div>
    </div>
  )
}
