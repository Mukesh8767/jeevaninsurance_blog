import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create client mostly to refresh session if needed
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Only get session, don't try to refresh to avoid "already used" errors
    const { data: { session } } = await supabase.auth.getSession()

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // If not logged in and not on login page, redirect
        if (!session && request.nextUrl.pathname !== '/admin/login') {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = '/admin/login'
            return NextResponse.redirect(redirectUrl)
        }

        // Role check could take place here or in layout.
        // Ideally we check profile role. But that requires DB access.
        // For middleware, session check is good enough, then Layout can forbid access.
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|header_logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
