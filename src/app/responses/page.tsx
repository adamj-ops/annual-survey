"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsesTable } from "@/components/admin/ResponsesTable"
import { toast } from "sonner"

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

export default function ResponsesPage() {
  const [password, setPassword] = React.useState("")
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [responses, setResponses] = React.useState<SurveyResponse[]>([])
  const [loading, setLoading] = React.useState(false)
  const authPasswordRef = React.useRef<string>("")

  const loadResponses = React.useCallback(async () => {
    if (!authPasswordRef.current) return
    
    setLoading(true)
    try {
      const response = await fetch("/api/responses", {
        headers: {
          Authorization: `Bearer ${authPasswordRef.current}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setResponses(data.data || [])
      } else if (response.status === 401) {
        // Password expired or invalid
        setIsAuthenticated(false)
        authPasswordRef.current = ""
        toast.error("Session expired. Please login again.")
      }
    } catch {
      toast.error("Failed to load responses")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogin = async () => {
    if (!password.trim()) {
      toast.error("Please enter a password")
      return
    }
    
    setLoading(true)
    try {
      const authHeader = `Bearer ${password.trim()}`
      
      const response = await fetch("/api/responses", {
        headers: {
          Authorization: authHeader,
        },
      })

      if (response.ok) {
        const data = await response.json()
        authPasswordRef.current = password.trim() // Store password in ref
        setIsAuthenticated(true)
        setResponses(data.data || [])
        setLoading(false)
        toast.success("Access granted")
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || errorData.message || "Invalid password"
        toast.error(errorMessage)
        setLoading(false)
      }
    } catch {
      toast.error("Failed to authenticate. Please try again.")
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (!isAuthenticated || !authPasswordRef.current) return
    
    // Initial load - only if we have a password
    loadResponses()
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      if (authPasswordRef.current) {
        loadResponses()
      }
    }, 30000)
    
    return () => clearInterval(interval)
  }, [isAuthenticated, loadResponses])

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to view survey responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleLogin()
                }
              }}
              autoComplete="current-password"
            />
            <Button 
              onClick={(e) => {
                e.preventDefault()
                handleLogin()
              }} 
              className="w-full" 
              disabled={loading || !password.trim()}
              type="button"
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      {loading && responses.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-muted-foreground">Loading responses...</div>
        </div>
      ) : (
        <ResponsesTable responses={responses} />
      )}
    </div>
  )
}

