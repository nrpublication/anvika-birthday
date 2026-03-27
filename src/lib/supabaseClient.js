import { createClient } from '@supabase/supabase-js'

// Ye variables Vercel ke Environment Variables se data uthayenge
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your Environment Variables!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)