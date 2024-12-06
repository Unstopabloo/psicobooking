import { Historiales } from "./historiales"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollFade } from "@/components/scroll-fade"
import { getClinicalHistories } from "@/server/actions/users"

export async function HistoricComponent({ patientId }: { patientId: string }) {
  const { clinicalHistory, error } = await getClinicalHistories(parseInt(patientId))

  return (
    <div className="relative">
      <div className="consultorios-list flex flex-col gap-4 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-10 pt-3">
        <Historiales clinicalHistory={clinicalHistory} error={error} />
        <ScrollFade />
        <ScrollFade is_reached_top />
      </div>
    </div>
  )
}

export function HistorialesLoader() {
  return (
    <div className="flex flex-col gap-4 min-h-[400px]">
      <Skeleton className="w-full min-w-72 h-20" />
      <Skeleton className="w-full min-w-72 h-20" />
      <Skeleton className="w-full min-w-72 h-20" />
    </div>
  )
}