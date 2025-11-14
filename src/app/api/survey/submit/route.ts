import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { surveySchema } from "@/lib/survey-schema"

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
        'not_at_all': 1,
        'somewhat': 3,
        'moderately': 5,
        'very_familiar': 7,
      }
      return map[value] || 1
    }

    const mapBrandReflectionToInt = (value: string): number => {
      const map: Record<string, number> = {
        'not_at_all': 1,
        'somewhat': 3,
        'well': 5,
        'very_well': 7,
      }
      return map[value] || 1
    }

    const mapCommunicationToInt = (value: string): number => {
      const map: Record<string, number> = {
        'not_well': 1,
        'somewhat': 3,
        'well': 5,
        'very_well': 7,
      }
      return map[value] || 1
    }

    const mapEaseOfUseToInt = (value: string): number => {
      const map: Record<string, number> = {
        'very_difficult': 1,
        'somewhat_difficult': 2,
        'somewhat_easy': 4,
        'very_easy': 5,
      }
      return map[value] || 1
    }

    // Transform data for database insertion
    const transformedData = {
      ...data,
      familiarity_score: mapFamiliarityToInt(data.familiarity_score),
      brand_reflection_score: mapBrandReflectionToInt(data.brand_reflection_score),
      communication_score: mapCommunicationToInt(data.communication_score),
      ease_of_use_score: mapEaseOfUseToInt(data.ease_of_use_score),
    }

    // Create Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
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
        ease_of_use_score: transformedData.ease_of_use_score,
        improvements_text: transformedData.improvements_text || null,
        valuable_resources: transformedData.valuable_resources,
        testimonial: transformedData.testimonial,
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
      })
      return NextResponse.json(
        { error: "Failed to save survey response", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, id: insertedData.id },
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

