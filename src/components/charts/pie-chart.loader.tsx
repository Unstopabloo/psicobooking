import { getPaymentsState } from "@/server/db/payments";
import { PieChartComponent } from "./pie-chart";
import { Skeleton } from "../ui/skeleton";

export async function PieChartLoader() {
  const paymentsState = await getPaymentsState()

  return (
    <PieChartComponent paymentsState={paymentsState} />
  )
}

export function PieChartSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-32 w-full" />
    </div>
  )
}