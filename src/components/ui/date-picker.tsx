"use client"

import * as React from "react"
import { Calendar03Icon as CalendarIcon } from "@/components/icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 10),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-between text-left font-normal py-5 rounded-lg",
              !date && "text-muted-foreground [&>:last-child]:opacity-70"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd MMM, y", { locale: es })} -{" "}
                  {format(date.to, "dd MMM, y", { locale: es })}
                </>
              ) : (
                format(date.from, "dd MMMM, y", { locale: es })
              )
            ) : (
              <span>Selecciona un rango de fechas</span>
            )}
            <CalendarIcon width={16} height={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={es}
            initialFocus
            max={10}
            mode="range"
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
