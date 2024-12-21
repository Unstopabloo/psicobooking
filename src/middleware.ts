import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server'
import { api } from "./lib/mercado-pago";
import { getSuscription } from "./server/db/payments";

const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up/:path*',
  '/sign-in/:path*',
  '/sign-in',
  '/sign-up',
  '/api/wh/sync',
  '/privacy-policy',
  '/ingest/e/',
  '/monitoring',
  '/api/workflow/audio',
  '/api/mercadopago/pagos',
])

// Definimos las rutas exactas que son públicas para usuarios con suscripción
const publicSuscriptionPaths = new Set([
  '/dashboard',
  '/dashboard/profile',
  '/dashboard/suscripcion',
  '/',
  '/sign-up/:path*',
  '/sign-in/:path*',
  '/sign-in',
  '/sign-up',
  '/api/wh/sync',
  '/privacy-policy',
  '/ingest/e/',
  '/monitoring',
  '/api/workflow/audio',
  '/api/mercadopago/pagos'
]);

// Función helper para verificar si una ruta está en las rutas públicas
function isPublicSubscriptionPath(pathname: string): boolean {
  return publicSuscriptionPaths.has(pathname);
}

async function checkSubscription(userId: string) {
  if (!userId) {
    return false;
  }

  try {
    const suscripcion = await getSuscription(userId);
    console.log('suscripcion checkSubscription middleware', suscripcion)
    return suscripcion?.status === 'authorized';
  } catch (error) {
    console.error('Error verificando suscripción:', error);
    return false;
  }
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims, redirectToSignIn } = auth()

  // Apply CSP headers
  const response = applyCsp(req)

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return response
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    console.log('redirectinggggg.....')
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    if (isPublicRoute(req)) {
      return response
    }

    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  // Verificación de suscripción para psicólogos
  if (
    userId &&
    !isPublicRoute(req) &&
    sessionClaims?.metadata?.role === 'psychologist' &&
    !isPublicSubscriptionPath(req.nextUrl.pathname)
  ) {
    console.log("Verificando suscripción...");
    const isSubscribed = await checkSubscription(userId);
    if (!isSubscribed) {
      // Redirigir a la página de suscripción
      const pricingUrl = new URL('/dashboard/suscripcion', req.url);
      return NextResponse.redirect(pricingUrl);
    }
    return response;
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) return response
  return response
})

export const config = {
  matcher: [
    // Apply to all routes except Next.js static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ],
};

function applyCsp(request: NextRequest) {
  // create a randomly generated nonce value
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // format the CSP header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://*.posthog.com https://*.sentry.io https://*.clerk.accounts.dev https://definite-lemming-97.clerk.accounts.dev https://challenges.cloudflare.com https: http: 'unsafe-eval';
    connect-src 'self' https://definite-lemming-97.clerk.accounts.dev https://*.sentry.io *.posthog.com ws://127.0.0.1:55568/ https://res.cloudinary.com/dwv9pebu9/* https://*.cloudinary.com/; 
    img-src 'self' data: blob: https: http: https://img.clerk.com https://*.posthog.com;
    media-src 'self' blob: https: http: https://*.cloudinary.com http://*.cloudinary.com https://res.cloudinary.com/dwv9pebu9/* https://*.cloudinary.com/;
    worker-src 'self' blob:;
    font-src 'self' data: https: http:;
    style-src 'self' 'unsafe-inline' http: https://fonts.googleapis.com/css?family=Geist;
    frame-src 'self' https://challenges.cloudflare.com https://*.posthog.com https://www.google.com https://upload-widget.cloudinary.com/;
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim()

  // set the nonce and csp values in the request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('x-nonce', nonce)
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue)
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response
}
