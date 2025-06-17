import { createClient } from "@supabase/supabase-js"

// Client-side Supabase client
// Bu client tarayıcıda çalışır ve RLS politikalarına tabidir.
export const createBrowserClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Server-side Supabase client
// Bu client sunucuda çalışır ve genellikle RLS'yi bypass etmek için service_role_key kullanır.
// Hassas işlemler için kullanılır.
export const createServerClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false, // Sunucuda session'ı kalıcı yapmaya gerek yok
    },
  })
