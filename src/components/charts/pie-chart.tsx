"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  scheduled: {
    label: "Pagados agendados",
    color: "hsl(var(--primary))",
  },
  cancelled: {
    label: "Cancelados",
    color: "hsl(var(--secondary))",
  },
  completed: {
    label: "Completados",
    color: "hsl(var(--success))",
  },
} satisfies ChartConfig

export function PieChartComponent({ paymentsState }: {
  paymentsState: { state: string, count: number, label: string, fill: string }[]
}) {
  const totalPagos = React.useMemo(() => {
    return paymentsState.reduce((acc, curr) => acc + curr.count, 0)
  }, [paymentsState])

  return (
    <Card className="flex flex-col">
      <CardHeader className="justify-between items-start p-6">
        <div className="flex flex-col gap-2">
          <CardTitle>Estado de pagos</CardTitle>
          <CardDescription>Una muestra de los pagos</CardDescription>
        </div>
        <CardDescription>Todo el tiempo</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={paymentsState}
              dataKey="count"
              nameKey="state"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPagos.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pagos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Pagos agendados, cancelados y completados
        </div>
      </CardFooter>
    </Card>
  )
}
