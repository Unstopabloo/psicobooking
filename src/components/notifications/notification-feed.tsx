"use client"

import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

import { useUser } from "@clerk/nextjs";

import { NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY, NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID } from "@/lib/env.client";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

export function NotificationFeed() {
  const { user } = useUser();

  if (!user) return null;

  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <KnockProvider
      apiKey={NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY!}
      userId={user.id}
    >
      <KnockFeedProvider feedId={NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID!}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};