'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { NEXT_PUBLIC_POSTHOG_KEY } from "@/lib/env"

if (typeof window !== 'undefined') {
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com'
  })
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}><PostHogWrapper>{children}</PostHogWrapper></PostHogProvider>
}

function PostHogWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const userInfo = useUser()

  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.primaryEmailAddress?.emailAddress,
        name: userInfo.user.firstName + ' ' + userInfo.user.lastName,
      })
    } else if (!auth.isSignedIn) {
      posthog.reset()
    }
  }, [auth, userInfo])

  return children
}