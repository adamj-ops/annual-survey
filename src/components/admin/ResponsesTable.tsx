"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Download } from "lucide-react"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface SurveyResponse {
  id: string
  name: string
  email: string
  role: string
  familiarity_score: number
  brand_reflection_score: number
  communication_score: number
  trustworthiness: string
  premier_resource: boolean
  unbiased_source: boolean
  community_factors: string[]
  refer_others: boolean
  refer_others_detail?: string | null
  ease_of_use_score: number
  improvements_text?: string
  valuable_resources: string[]
  testimonial: string
  may_contact: boolean
  submitted_at: string
}

interface ResponsesTableProps {
  responses: SurveyResponse[]
}

const familiarityLabels: Record<number, string> = {
  1: "Not familiar at all",
  3: "Somewhat",
  4: "Somewhat familiar",
  5: "Moderately",
  7: "Very familiar",
}

const brandReflectionLabels: Record<number, string> = {
  1: "Not at all",
  3: "Not really",
  5: "Yes, somewhat / Well",
  7: "Yes, very well",
}

const communicationLabels: Record<number, string> = {
  1: "Not at all / Not well",
  2: "Not well",
  3: "Somewhat",
  4: "Somewhat well",
  5: "Well",
  6: "Very well",
  7: "Extremely well",
}

const easeOfUseLabels: Record<number, string> = {
  1: "1 — Very difficult",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7 — Very easy",
}

const communityFactorLabels: Record<string, string> = {
  content_available: "Content Available",
  peer_recommendations: "Peer Recommendations",
  curiosity: "Curiosity",
  didnt_know: "Didn't Know",
  time_constraints: "Time Constraints",
  privacy_concerns: "Privacy Concerns",
  not_interested: "Not Interested",
  other: "Other",
  not_aware: "Not aware of community",
  no_time: "No time to explore",
  unclear_benefits: "Unsure of benefits",
  joined_valuable: "Joined & found valuable",
  joined_no_time: "Joined but no time to engage",
  prefer_other_access: "Prefer other access",
}

const valuableResourceLabels: Record<string, string> = {
  educational_articles: "Educational Articles",
  webinars_cme: "Webinars & CME",
  patient_support_groups: "Patient Support Groups",
  podcasts_videos: "Podcasts & Videos",
  clinical_toolkits: "Clinical Toolkits",
  research_summaries: "Research Summaries",
  community_discussions: "Community Discussions",
  patient_education: "Patient education materials",
  clinician_education: "Clinician education",
  patient_support: "Patient support groups",
  research_updates: "Research updates",
  other: "Other",
}

function ResponseDetailDrawer({ response, open, onOpenChange }: { response: SurveyResponse | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!response) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-2xl">
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-2xl">{response.name}</DrawerTitle>
          <DrawerDescription>
            {response.email} • {response.role.charAt(0).toUpperCase() + response.role.slice(1)}
          </DrawerDescription>
          <p className="text-sm text-muted-foreground mt-2">
            Submitted: {format(new Date(response.submitted_at), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </DrawerHeader>
        
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Step 1: About You */}
          <div>
            <h3 className="font-semibold text-lg mb-3">About You</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Familiarity with VLN:</span>
                <div className="mt-1">
                  <Badge variant="outline">{familiarityLabels[response.familiarity_score] || `${response.familiarity_score}/7`}</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 2: Brand Perception */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Brand Perception</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Brand Reflection Score:</span>
                <div className="mt-1">
                  <Badge variant="outline">{brandReflectionLabels[response.brand_reflection_score] || `${response.brand_reflection_score}/7`}</Badge>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Communication Score:</span>
                <div className="mt-1">
                  <Badge variant="outline">{communicationLabels[response.communication_score] || `${response.communication_score}/7`}</Badge>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Trustworthiness:</span>
                <div className="mt-1">
                  <Badge variant="outline">{response.trustworthiness.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Premier Resource:</span>
                  <Badge variant={response.premier_resource ? "default" : "secondary"} className="ml-2">
                    {response.premier_resource ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Unbiased Source:</span>
                  <Badge variant={response.unbiased_source ? "default" : "secondary"} className="ml-2">
                    {response.unbiased_source ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 3: Community Engagement */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Community Engagement</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Community Factors:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {response.community_factors.map((factor) => (
                    <Badge key={factor} variant="outline">
                      {communityFactorLabels[factor] || factor}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Would Refer Others:</span>
                <Badge variant={response.refer_others ? "default" : "secondary"} className="ml-2">
                  {response.refer_others_detail || (response.refer_others ? "Yes" : "No")}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 4: Experience */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Experience</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Ease of Use:</span>
                <div className="mt-1">
                  <Badge variant="outline">{easeOfUseLabels[response.ease_of_use_score] || `${response.ease_of_use_score}/5`}</Badge>
                </div>
              </div>
              {response.improvements_text && (
                <div>
                  <span className="text-sm text-muted-foreground">Suggested Improvements:</span>
                  <p className="mt-1 text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">{response.improvements_text}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">Valuable Resources:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {response.valuable_resources.map((resource) => (
                    <Badge key={resource} variant="outline">
                      {valuableResourceLabels[resource] || resource}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 5: Testimonials */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Testimonial</h3>
            <p className="text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">{response.testimonial}</p>
            <div className="mt-3">
              <span className="text-sm text-muted-foreground">May Contact:</span>
              <Badge variant={response.may_contact ? "default" : "secondary"} className="ml-2">
                {response.may_contact ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function ResponsesTable({ responses }: ResponsesTableProps) {
  const [selectedResponse, setSelectedResponse] = React.useState<SurveyResponse | null>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleRowClick = (response: SurveyResponse) => {
    setSelectedResponse(response)
    setDrawerOpen(true)
  }

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Role",
      "Familiarity Score",
      "Brand Reflection Score",
      "Communication Score",
      "Trustworthiness",
      "Premier Resource",
      "Unbiased Source",
      "Community Factors",
      "Refer Others",
      "Refer Others Detail",
      "Ease of Use Score",
      "Improvements",
      "Valuable Resources",
      "Testimonial",
      "May Contact",
      "Submitted At",
    ]

    const rows = responses.map((r) => [
      r.id,
      r.name,
      r.email,
      r.role,
      r.familiarity_score,
      r.brand_reflection_score,
      r.communication_score,
      r.trustworthiness,
      r.premier_resource ? "Yes" : "No",
      r.unbiased_source ? "Yes" : "No",
      r.community_factors.join("; "),
      r.refer_others ? "Yes" : "No",
      r.refer_others_detail || "",
      r.ease_of_use_score,
      r.improvements_text || "",
      r.valuable_resources.join("; "),
      r.testimonial.replace(/\n/g, " "),
      r.may_contact ? "Yes" : "No",
      format(new Date(r.submitted_at), "yyyy-MM-dd HH:mm:ss"),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `survey-responses-${format(new Date(), "yyyy-MM-dd")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Survey Responses</h2>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="rounded-md overflow-x-auto">
          <Table>
            <TableCaption>
              A list of all survey responses. Click on any row to view detailed information.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="min-w-[100px]">Role</TableHead>
                <TableHead className="min-w-[120px]">Familiarity</TableHead>
                <TableHead className="min-w-[120px]">Brand Score</TableHead>
                <TableHead className="min-w-[120px]">Comm Score</TableHead>
                <TableHead className="min-w-[120px]">Trust</TableHead>
                <TableHead className="min-w-[100px]">Premier</TableHead>
                <TableHead className="min-w-[100px]">Unbiased</TableHead>
                <TableHead className="min-w-[200px]">Community Factors</TableHead>
                <TableHead className="min-w-[100px]">Refer Others</TableHead>
                <TableHead className="min-w-[140px]">Referral Detail</TableHead>
                <TableHead className="min-w-[120px]">Ease of Use</TableHead>
                <TableHead className="min-w-[200px]">Improvements</TableHead>
                <TableHead className="min-w-[200px]">Valuable Resources</TableHead>
                <TableHead className="min-w-[300px]">Testimonial</TableHead>
                <TableHead className="min-w-[100px]">May Contact</TableHead>
                <TableHead className="text-right min-w-[150px]">Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={17} className="text-center text-muted-foreground">
                    No responses yet
                  </TableCell>
                </TableRow>
              ) : (
                responses.map((response) => (
                  <TableRow 
                    key={response.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleRowClick(response)}
                  >
                    <TableCell className="font-medium">{response.name}</TableCell>
                    <TableCell>{response.email}</TableCell>
                    <TableCell className="capitalize">{response.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {familiarityLabels[response.familiarity_score] || `${response.familiarity_score}/7`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {brandReflectionLabels[response.brand_reflection_score] || `${response.brand_reflection_score}/7`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {communicationLabels[response.communication_score] || `${response.communication_score}/7`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`text-xs capitalize whitespace-nowrap ${
                          response.trustworthiness === 'very_high' || response.trustworthiness === 'very_trustworthy'
                            ? 'text-green-600'
                            : response.trustworthiness === 'high' || response.trustworthiness === 'somewhat_trustworthy'
                              ? 'text-green-500'
                              : response.trustworthiness === 'moderate' || response.trustworthiness === 'neutral'
                                ? 'text-yellow-600'
                                : response.trustworthiness === 'low'
                                  ? 'text-orange-600'
                                  : 'text-red-600'
                        }`}
                      >
                        {response.trustworthiness.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={response.premier_resource ? "default" : "secondary"} className="text-xs">
                        {response.premier_resource ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={response.unbiased_source ? "default" : "secondary"} className="text-xs">
                        {response.unbiased_source ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {response.community_factors.slice(0, 2).map((factor) => (
                          <Badge key={factor} variant="outline" className="text-xs">
                            {communityFactorLabels[factor] || factor}
                          </Badge>
                        ))}
                        {response.community_factors.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{response.community_factors.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={response.refer_others ? "default" : "secondary"} className="text-xs whitespace-nowrap">
                        {response.refer_others_detail || (response.refer_others ? "Yes" : "No")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm truncate max-w-[140px]" title={response.refer_others_detail || ""}>
                        {response.refer_others_detail || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {easeOfUseLabels[response.ease_of_use_score] || `${response.ease_of_use_score}/5`}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="text-sm truncate" title={response.improvements_text || ""}>
                        {response.improvements_text || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {response.valuable_resources.slice(0, 2).map((resource) => (
                          <Badge key={resource} variant="outline" className="text-xs">
                            {valuableResourceLabels[resource] || resource}
                          </Badge>
                        ))}
                        {response.valuable_resources.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{response.valuable_resources.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="text-sm truncate" title={response.testimonial}>
                        {response.testimonial}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={response.may_contact ? "default" : "secondary"} className="text-xs">
                        {response.may_contact ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {format(new Date(response.submitted_at), "MMM d, yyyy HH:mm")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={17}>Total Responses</TableCell>
            <TableCell className="text-right font-medium">
              {responses.length}
            </TableCell>
          </TableRow>
        </TableFooter>
          </Table>
        </div>
      </div>

      <ResponseDetailDrawer 
        response={selectedResponse} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </>
  )
}

