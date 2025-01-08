"use client"

import * as React from "react"
import { Calendar03Icon as CalendarIcon } from "@/components/icons"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form"
import { Spinner } from "../Loader"
import { getAppointmentsByDatePatient } from "@/server/actions/users"
import { AppointmentCard } from "@/types/entities"
import { toast } from "sonner"

const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

type FormValues = z.infer<typeof formSchema>

export function DatePicker({
  setAppointments,
  className
}: React.HTMLAttributes<HTMLDivElement> & { setAppointments: (appointments: AppointmentCard[]) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 10),
      },
    },
  })

  React.useEffect(() => {
    form.handleSubmit(onSubmit)()
  }, [])

  async function onSubmit(data: FormValues) {
    const fromDate = format(data.dateRange.from, "yyyy-MM-dd")
    const toDate = format(data.dateRange.to, "yyyy-MM-dd")

    const res = await getAppointmentsByDatePatient(fromDate, toDate)

    const response = JSON.parse(res)
    const { appointments, error } = response

    if (error) {
      toast.error(error)
      setAppointments([])
    }

    setAppointments(appointments ?? [])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className={cn("grid gap-2", className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-between text-left font-normal py-5 rounded-lg",
                        !field.value && "text-muted-foreground [&>:last-child]:opacity-70"
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "dd MMM, y", { locale: es })} -{" "}
                            {format(field.value.to, "dd MMM, y", { locale: es })}
                          </>
                        ) : (
                          format(field.value.from, "dd MMMM, y", { locale: es })
                        )
                      ) : (
                        <span>Selecciona un rango de fechas</span>
                      )}
                      <CalendarIcon width={16} height={16} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={es}
                    initialFocus
                    max={10}
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting ? <div className="flex items-center gap-2 h-full"><Spinner className="border-t-white size-4" />Filtrando...</div> : "Filtrar"}
        </Button>
      </form>
    </Form>
  )
}