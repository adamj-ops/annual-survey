import { MultiStepSurvey } from "@/components/survey/MultiStepSurvey"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-4xl flex-shrink-0">
        <MultiStepSurvey />
      </div>
    </div>
  )
}
