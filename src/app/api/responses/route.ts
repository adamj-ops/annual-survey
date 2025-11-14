import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication
    const authHeader = request.headers.get("authorization")
    const adminPassword = (process.env.ADMIN_PASSWORD || "").trim()
    
    // Fallback for development if not set
    if (!adminPassword) {
      console.warn("ADMIN_PASSWORD not set, using default")
    }
    const finalPassword = adminPassword || "admin123"

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized", message: "No authorization header provided" },
        { status: 401 }
      )
    }

    // Extract password from Bearer token
    const providedPassword = authHeader.replace(/^Bearer\s+/i, "").trim()
    
    // Compare passwords (case-sensitive, exact match)
    if (providedPassword !== finalPassword) {
      // Log for debugging (remove sensitive info)
      console.log("Password mismatch", {
        providedLength: providedPassword.length,
        expectedLength: finalPassword.length,
        match: providedPassword === finalPassword
      })
      return NextResponse.json(
        { error: "Invalid password", message: "The password you entered is incorrect" },
        { status: 401 }
      )
    }

    // Create Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY?.trim()

    if (!supabaseUrl || !supabaseServiceKey) {
      const missingVars = []
      if (!supabaseUrl) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
      if (!supabaseServiceKey) missingVars.push("SUPABASE_SERVICE_KEY")
      
      console.error("Missing Supabase environment variables:", missingVars)
      return NextResponse.json(
        { 
          error: "Server configuration error",
          message: `Missing required environment variables: ${missingVars.join(", ")}. Please set these in your Vercel project settings.`
        },
        { status: 500 }
      )
    }

    // Validate URL format
    try {
      new URL(supabaseUrl)
    } catch {
      console.error("Invalid Supabase URL format:", supabaseUrl)
      return NextResponse.json(
        { 
          error: "Server configuration error",
          message: "Invalid Supabase URL format. Please check NEXT_PUBLIC_SUPABASE_URL in your environment variables."
        },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: async (url, options = {}) => {
          try {
            const response = await fetch(url, {
              ...options,
              headers: {
                ...options.headers,
                'User-Agent': 'Vercel-Serverless',
              },
            })
            return response
          } catch (fetchError) {
            console.error("Supabase fetch error:", {
              url: typeof url === 'string' ? url : url.toString(),
              error: fetchError instanceof Error ? fetchError.message : String(fetchError)
            })
            throw fetchError
          }
        },
      },
    })
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = (page - 1) * limit

    // Get total count
    const { count } = await supabase
      .from("survey_responses")
      .select("*", { count: "exact", head: true })

    // Get paginated responses
    const { data, error } = await supabase
      .from("survey_responses")
      .select("*")
      .order("submitted_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("Database error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { 
          error: "Failed to fetch responses", 
          details: error.message,
          hint: error.hint || "Please check your Supabase connection and database configuration"
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

