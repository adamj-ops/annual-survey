"use client"

import { useState } from "react"
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
import { format } from "date-fns"

interface SurveyResponse {
  id: string
  name: string
  email: string
  role: string
  testimonial: string
  submitted_at: string
}

interface TestimonialsTableProps {
  responses: SurveyResponse[]
}

export function TestimonialsTable({ responses }: TestimonialsTableProps) {
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpandedTestimonials((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const testimonialEntries = responses.filter(r => r.testimonial && r.testimonial.trim() !== '')

  if (testimonialEntries.length === 0) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Amazon Gift Card Drawing Entries
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {testimonialEntries.length} entries
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="min-w-[100px]">Role</TableHead>
                <TableHead className="min-w-[150px]">Submitted At</TableHead>
                <TableHead className="min-w-[300px]">Testimonial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonialEntries.map((response) => (
                <TableRow key={response.id}>
                  <TableCell className="font-medium">{response.name}</TableCell>
                  <TableCell>{response.email}</TableCell>
                  <TableCell>{response.role}</TableCell>
                  <TableCell>{format(new Date(response.submitted_at), "yyyy-MM-dd HH:mm")}</TableCell>
                  <TableCell>
                    {response.testimonial.length > 150 ? (
                      <>
                        {expandedTestimonials.has(response.id)
                          ? response.testimonial
                          : `${response.testimonial.substring(0, 150)}...`}
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => toggleExpand(response.id)}
                          className="ml-2 p-0 h-auto text-primary"
                        >
                          {expandedTestimonials.has(response.id) ? (
                            <>
                              <EyeOff className="mr-1 h-3 w-3" /> Show Less
                            </>
                          ) : (
                            <>
                              <Eye className="mr-1 h-3 w-3" /> Show More
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      response.testimonial
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
