import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { surveySchema } from "@/lib/survey-schema"
import { getServerSupabaseUrl } from "@/lib/supabase-config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the data
    const validationResult = surveySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Map string enum values to integers for database compatibility
    const mapFamiliarityToInt = (value: string): number => {
      const map: Record<string, number> = {
        not_at_all: 1,
        somewhat: 3,
        moderately: 5,
        very_familiar: 7,
        somewhat_familiar: 4,
        not_familiar: 1,
      }
      return map[value] || 1
    }

    const mapBrandReflectionToInt = (value: string): number => {
      const map: Record<string, number> = {
        not_at_all: 1,
        somewhat: 3,
        well: 5,
        very_well: 7,
        yes_very_well: 7,
        yes_somewhat: 5,
        not_really: 3,
      }
      return map[value] || 1
    }

    const mapCommunicationToInt = (value: string): number => {
      const map: Record<string, number> = {
        not_well: 2,
        somewhat: 3,
        well: 5,
        very_well: 6,
        not_at_all: 1,
        extremely_well: 7,
        somewhat_well: 4,
      }
      return map[value] || 1
    }

    const mapEaseOfUseToInt = (value: string): number => {
      const map: Record<string, number> = {
        very_difficult: 1,
        somewhat_difficult: 2,
        somewhat_easy: 4,
        very_easy: 5,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
      }
      return map[value] || 1
    }

    const referFrequencyLabels: Record<string, string> = {
      yes_frequently: "Yes, frequently",
      yes_occasionally: "Yes, occasionally",
      no_but_would: "No, but I would",
      no_unlikely: "No, and I am unlikely to",
    }

    const referOthersBoolean =
      data.refer_others_frequency === "yes_frequently" || data.refer_others_frequency === "yes_occasionally"

    // Transform data for database insertion
    const transformedData = {
      ...data,
      familiarity_score: mapFamiliarityToInt(data.familiarity_score),
      brand_reflection_score: mapBrandReflectionToInt(data.brand_reflection_score),
      communication_score: mapCommunicationToInt(data.communication_score),
      ease_of_use_score: mapEaseOfUseToInt(data.ease_of_use_score),
      refer_others: referOthersBoolean,
      refer_others_detail: referFrequencyLabels[data.refer_others_frequency] || data.refer_others_frequency,
    }

    // Create Supabase admin client
    let supabaseUrl: string
    try {
      supabaseUrl = getServerSupabaseUrl()
    } catch (configError) {
      console.error("Supabase URL configuration error:", configError)
      return NextResponse.json(
        {
          error: "Server configuration error",
          message:
            configError instanceof Error
              ? configError.message
              : "Supabase URL is not configured correctly.",
        },
        { status: 500 }
      )
    }

    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY?.trim()

    if (!supabaseServiceKey) {
      console.error("Missing SUPABASE_SERVICE_KEY environment variable")
      console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('SUPABASE')))
      return NextResponse.json(
        {
          error: "Server configuration error",
          message: "SUPABASE_SERVICE_KEY is not set.",
        },
        { status: 500 }
      )
    }

    // Verify we have both URL and key
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration incomplete:", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseServiceKey,
        urlLength: supabaseUrl?.length,
        keyLength: supabaseServiceKey?.length,
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        fetch: (url, options = {}) => {
          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'User-Agent': 'Vercel-Serverless',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Content-Type': 'application/json',
            },
          })
        },
      },
    })
    const { data: insertedData, error } = await supabase
      .from("survey_responses")
      .insert({
        name: transformedData.name,
        email: transformedData.email,
        role: transformedData.role,
        familiarity_score: transformedData.familiarity_score,
        brand_reflection_score: transformedData.brand_reflection_score,
        communication_score: transformedData.communication_score,
        trustworthiness: transformedData.trustworthiness,
        premier_resource: transformedData.premier_resource,
        unbiased_source: transformedData.unbiased_source,
        community_factors: transformedData.community_factors,
        refer_others: transformedData.refer_others,
        refer_others_detail: transformedData.refer_others_detail,
        ease_of_use_score: transformedData.ease_of_use_score,
        improvements_text: transformedData.improvements_text?.trim() || null,
        valuable_resources: transformedData.valuable_resources,
        testimonial: transformedData.testimonial?.trim() || "",
        may_contact: transformedData.may_contact,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      console.error("Attempted to insert:", {
        name: transformedData.name,
        email: transformedData.email,
        role: transformedData.role,
        familiarity_score: transformedData.familiarity_score,
        brand_reflection_score: transformedData.brand_reflection_score,
        communication_score: transformedData.communication_score,
        ease_of_use_score: transformedData.ease_of_use_score,
        trustworthiness: transformedData.trustworthiness,
        premier_resource: transformedData.premier_resource,
        unbiased_source: transformedData.unbiased_source,
        refer_others: transformedData.refer_others,
        refer_others_detail: transformedData.refer_others_detail,
        testimonial: transformedData.testimonial?.trim() || "",
        may_contact: transformedData.may_contact,
      })
      return NextResponse.json(
        { error: "Failed to save survey response", message: error.message, details: error },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, id: insertedData?.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

