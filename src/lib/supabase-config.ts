const POSTGRES_SCHEMES = [/^postgresql:\/\//i, /^postgres:\/\//i]
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0"])

const missingUrlError = new Error(
  "Supabase URL is not configured. Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL."
)

function isPostgresConnectionString(value: string) {
  return POSTGRES_SCHEMES.some((regex) => regex.test(value))
}

function isLocalHost(hostname: string) {
  return LOCAL_HOSTNAMES.has(hostname) || hostname.endsWith(".local")
}

function normalizeConnectionString(raw: string) {
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    throw new Error("Invalid Supabase Postgres connection string.")
  }

  const hostname = parsed.hostname.replace(/^db\./i, "")
  if (!hostname) {
    throw new Error("Supabase connection string is missing a hostname.")
  }

  return `https://${hostname}`
}

export function normalizeSupabaseUrl(rawUrl?: string | null): string {
  if (!rawUrl || !rawUrl.trim()) {
    throw missingUrlError
  }

  const trimmed = rawUrl.trim()

  if (isPostgresConnectionString(trimmed)) {
    return normalizeConnectionString(trimmed)
  }

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    throw new Error("Invalid Supabase URL format. Expected https://<project>.supabase.co")
  }

  if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && isLocalHost(parsed.hostname))) {
    throw new Error("Supabase URL must use https:// (http allowed only for localhost).")
  }

  return parsed.origin
}

export function getServerSupabaseUrl(): string {
  const serverUrl = process.env.SUPABASE_URL?.trim()
  const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const value = serverUrl || publicUrl

  if (!value) {
    throw missingUrlError
  }

  return normalizeSupabaseUrl(value)
}

export function getPublicSupabaseUrl(): string {
  return normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
}


