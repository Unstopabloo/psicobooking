"use client"
import { Minus, TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { Payment } from "@/types/entities"

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "hsl(var(--primary))",
  },
  citas: {
    label: "Citas",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export function MainChart({ payments, crecimientoIngresos }: { payments: Payment[], crecimientoIngresos: number }) {

  function getCrecimiento(crecimiento: number) {
    if (crecimiento >= 25) {
      return (
        <div className="flex gap-2 font-medium leading-none">
          Se ve un crecimiento de {crecimiento.toFixed(0)}% este mes
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      )
    } else if (crecimiento >= 10 && crecimiento < 25) {
      return (
        <div className="flex gap-2 font-medium leading-none">
          Se ve un crecimiento de {crecimiento.toFixed(0)}% este mes
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
      )
    } else if (crecimiento >= 0 && crecimiento < 10) {
      return (
        <div className="flex gap-2 font-medium leading-none">
          Hay un crecimiento de {crecimiento.toFixed(0)}% este mes
          <Minus className="h-4 w-4 text-orange-400" />
        </div>
      )
    } else {
      return (
        <div className="flex gap-2 font-medium leading-none">
          Hay un decrecimiento de {crecimiento.toFixed(0)}% este mes
          <TrendingDown className="h-4 w-4 text-red-400" />
        </div>
      )
    }
  }

  return (
    <Card className="col-span-3 bg-card/40">
      <CardHeader className="p-6 flex items-center justify-between">
        <CardTitle>Ingresos</CardTitle>
        <CardDescription>{`${payments[0]?.month} - ${payments[payments.length - 1]?.month} ${new Date().getFullYear()}`}</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[300px] h-[300px]">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={payments}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="ingresos"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: number) => value.toString()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="ingresos" fill="hsl(var(--primary))" radius={4} />
            <Bar dataKey="citas" fill="hsl(var(--secondary))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {getCrecimiento(crecimientoIngresos)}
        <div className="leading-none text-muted-foreground">
          La muestra se toma de los últimos 12 meses
        </div>
      </CardFooter>
    </Card>
  )
}