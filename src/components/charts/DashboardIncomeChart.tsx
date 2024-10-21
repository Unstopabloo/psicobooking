"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A stacked area chart"

const chartData = [
  { month: "January", pacientes: 186, ingresos: 80 },
  { month: "February", pacientes: 305, ingresos: 200 },
  { month: "March", pacientes: 237, ingresos: 120 },
  { month: "April", pacientes: 73, ingresos: 190 },
  { month: "May", pacientes: 209, ingresos: 130 },
  { month: "June", pacientes: 214, ingresos: 140 },
]

const chartConfig = {
  pacientes: {
    label: "pacientes",
    color: "hsl(var(--chart-1))",
  },
  ingresos: {
    label: "ingresos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function DashboardIncomeTable() {
  return (
    <Card>
      <CardHeader className="flex flex-col text-center p-4">
        <CardTitle>Ingresos - pacientes</CardTitle>
        <CardDescription>
          Se muestran los ingresos y pacientes en los últimos 3 meses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="ingresos"
              type="natural"
              fill="var(--color-ingresos)"
              fillOpacity={0.4}
              stroke="var(--color-ingresos)"
              stackId="a"
            />
            <Area
              dataKey="pacientes"
              type="natural"
              fill="var(--color-pacientes)"
              fillOpacity={0.4}
              stroke="var(--color-pacientes)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tus ingresos han crecido un 5.2% este mes. <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

