import { getActivities } from "@/server/db/activity"
import { ActivityCard } from "./activity-card"
import { Skeleton } from "../ui/skeleton"

export async function Activities({ limit }: { limit?: boolean }) {
  const activities = await getActivities(limit)

  return (
    <>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </>
  )
}

export function ActivitiesSkeleton({ limit = 4 }: { limit?: number }) {
  return (
    <>
      {
        Array.from({ length: limit ? limit : 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[70px]" />
        ))
      }
    </>
  )
}