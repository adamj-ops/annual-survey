import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface SurveyResponse {
  id: number
  name: string
  email: string
  role: string
  testimonial: string
  created_at: string
}

export function TestimonialsTable() {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchResponses()
  }, [])

  const fetchResponses = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/responses")
      if (!response.ok) {
        throw new Error("Failed to fetch responses")
      }
      const data = await response.json()
      // Filter responses that have testimonials
      const testimonialsOnly = data.filter((r: SurveyResponse) => r.testimonial && r.testimonial.trim() !== "")
      setResponses(testimonialsOnly)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "healthcare_professional":
        return "default"
      case "patient_family":
        return "secondary"
      case "pharma_representative":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "healthcare_professional":
        return "Healthcare Professional"
      case "patient_family":
        return "Patient/Family"
      case "pharma_representative":
        return "Pharma Representative"
      default:
        return role
    }
  }

  if (loading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Amazon Gift Card Drawing Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading testimonials...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Amazon Gift Card Drawing Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Amazon Gift Card Drawing Entries
          <Badge variant="secondary">{responses.length} entries</Badge>
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          People who submitted testimonials and are eligible for the $250 Amazon gift card drawing.
        </p>
      </CardHeader>
      <CardContent>
        {responses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No testimonials submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Testimonial</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell className="font-medium">{response.name}</TableCell>
                    <TableCell>{response.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(response.role)}>
                        {getRoleLabel(response.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(response.created_at)}</TableCell>
                    <TableCell className="max-w-xs">
                      {expandedRows.has(response.id) ? (
                        <div className="whitespace-normal">{response.testimonial}</div>
                      ) : (
                        <div className="truncate">{response.testimonial}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(response.id)}
                      >
                        {expandedRows.has(response.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
