import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Supabase-Konfiguration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gqoiaiohfxlybjkdowxa.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WEXUjSgG-MmdgRU_xOWZlg_KsTzz4q2'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

