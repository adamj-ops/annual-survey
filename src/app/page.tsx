import { MultiStepSurvey } from "@/components/survey/MultiStepSurvey"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col items-center justify-center">
        {/* Centered form content */}
        <div className="w-full max-w-4xl">
          <MultiStepSurvey />
        </div>
      </div>
    </div>
  )
}
