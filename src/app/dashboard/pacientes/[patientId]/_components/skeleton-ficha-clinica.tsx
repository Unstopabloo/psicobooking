import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonFichaClinica() {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="flex items-center justify-between gap-40">
        <div className="flex items-start flex-col gap-3">
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-3 w-[400px]" />
        </div>
        <Skeleton className="h-3 w-60" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Skeleton className="h-[570px] w-[400px]" />
        <Skeleton className="h-[570px] w-[400px]" />
      </div>
    </div>
  )
}