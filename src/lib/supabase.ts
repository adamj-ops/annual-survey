import { createClient } from '@supabase/supabase-js';
import { getPublicSupabaseUrl, getServerSupabaseUrl } from '@/lib/supabase-config';

const supabaseUrl = getPublicSupabaseUrl();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key (for server-side only)
export function createAdminClient() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY?.trim();
  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
  }
  return createClient(getServerSupabaseUrl(), supabaseServiceKey);
}

