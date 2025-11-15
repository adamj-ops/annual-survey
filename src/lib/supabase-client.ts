import { createClient } from '@supabase/supabase-js';
import { getPublicSupabaseUrl, getServerSupabaseUrl } from '@/lib/supabase-config';

// Client-side Supabase client
export function createSupabaseClient() {
  const supabaseUrl = getPublicSupabaseUrl();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Server-side admin client
export function createSupabaseAdmin() {
  const supabaseUrl = getServerSupabaseUrl();
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY?.trim();

  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

