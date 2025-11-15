import { afterEach, describe, expect, it } from "vitest"
import {
  getPublicSupabaseUrl,
  getServerSupabaseUrl,
  normalizeSupabaseUrl,
} from "@/lib/supabase-config"

const ORIGINAL_SUPABASE_URL = process.env.SUPABASE_URL
const ORIGINAL_NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

afterEach(() => {
  process.env.SUPABASE_URL = ORIGINAL_SUPABASE_URL
  process.env.NEXT_PUBLIC_SUPABASE_URL = ORIGINAL_NEXT_PUBLIC_URL
})

describe("normalizeSupabaseUrl", () => {
  it("returns the origin for a valid https Supabase URL", () => {
    expect(normalizeSupabaseUrl("https://xyz.supabase.co/rest/v1")).toBe(
      "https://xyz.supabase.co"
    )
  })

  it("allows localhost http URLs for local dev", () => {
    expect(normalizeSupabaseUrl("http://127.0.0.1:54321/rest/v1")).toBe(
      "http://127.0.0.1:54321"
    )
  })

  it("converts Postgres connection strings into REST URLs", () => {
    const connection =
      "postgresql://postgres:password@db.abcd123.supabase.co:5432/postgres"
    expect(normalizeSupabaseUrl(connection)).toBe("https://abcd123.supabase.co")
  })

  it("throws when the URL is missing", () => {
    expect(() => normalizeSupabaseUrl("")).toThrow(/Supabase URL is not configured/i)
  })

  it("throws when the URL protocol is invalid", () => {
    expect(() => normalizeSupabaseUrl("ftp://xyz.supabase.co")).toThrow(
      /must use https/i
    )
  })
})

describe("getServerSupabaseUrl", () => {
  it("prefers SUPABASE_URL over NEXT_PUBLIC_SUPABASE_URL", () => {
    process.env.SUPABASE_URL =
      "postgres://postgres:password@db.server123.supabase.co:5432/postgres"
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://client.supabase.co"

    expect(getServerSupabaseUrl()).toBe("https://server123.supabase.co")
  })

  it("falls back to NEXT_PUBLIC_SUPABASE_URL when SUPABASE_URL is missing", () => {
    process.env.SUPABASE_URL = ""
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://client.supabase.co"

    expect(getServerSupabaseUrl()).toBe("https://client.supabase.co")
  })
})

describe("getPublicSupabaseUrl", () => {
  it("throws if NEXT_PUBLIC_SUPABASE_URL is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ""
    expect(() => getPublicSupabaseUrl()).toThrow(/Supabase URL is not configured/i)
  })

  it("normalizes NEXT_PUBLIC_SUPABASE_URL", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://public.supabase.co/rest/v1/"
    expect(getPublicSupabaseUrl()).toBe("https://public.supabase.co")
  })
})


