import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // options type should be CookieOptions from @supabase/ssr
          request.cookies.set({
            name,
            value,
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          // options type should be CookieOptions from @supabase/ssr
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          supabaseResponse.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Bu, oturumun süresi dolduysa yenileyecektir - Sunucu Bileşenleri için gereklidir
  // ve ayrıca yeni bir çerez ayarlayacaktır.
  await supabase.auth.getUser()

  return supabaseResponse
}
