"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SinglePatientTicket } from "@/types/entities"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { es } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import React from "react"
import { TreatmentSchema } from "@/types/schemas"
import { Spinner } from "../Loader"
import { Textarea } from "../ui/textarea"
import { updateTreatmentSheet } from "@/server/actions/users"

export function TreatmentSheetForm({ patient }: { patient: SinglePatientTicket }) {
  const form = useForm<z.infer<typeof TreatmentSchema>>({
    resolver: zodResolver(TreatmentSchema),
    defaultValues: {
      patient_id: patient.id,
      actual_state: patient.actual_state ?? undefined,
      motive_end: patient.motive_end ?? undefined,
      motive_reason: patient.motive_reason ?? undefined,
      diagnostic_guidance: patient.diagnostic_guidance ?? undefined,
      date_from: patient.date_from ? new Date(patient.date_from) : undefined,
      date_to: patient.date_to ? new Date(patient.date_to) : undefined
    },
  })

  async function onSubmit(data: z.infer<typeof TreatmentSchema>) {
    const newData = { ...data }
    if (watchActualState !== "finalizado") {
      newData.date_to = undefined
      newData.motive_reason = undefined
    }

    const res = await updateTreatmentSheet(newData)

    if (res?.data?.error) {
      toast.error("Hubo un error al actualizar la ficha", { description: JSON.stringify(res?.data?.error) })
      return
    }

    toast.success(`Ficha actualizada`)
  }

  const watchActualState = form.watch("actual_state")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-card/35 rounded-xl p-5">
        <section>
          <h2 className="pb-10 font-semibold">Datos personales</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="actual_state"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Estado actual</FormLabel>
                    <FormMessage />
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="agendada">Agendada</SelectItem>
                      <SelectItem value="en_curso">En curso</SelectItem>
                      <SelectItem value="finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_from"
              render={({ field }) => (
                <FormItem className="self-end flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Inicio del tratamiento</FormLabel>
                  </div>
                  <FormMessage />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_to"
              render={({ field }) => (
                <FormItem className="self-end flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Fin del tratamiento</FormLabel>
                  </div>
                  <FormMessage />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={watchActualState !== "finalizado"}
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motive_end"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Motivo de finalización</FormLabel>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input disabled={watchActualState !== "finalizado"} placeholder="Un motivo de finalización" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motive_reason"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Motivo de consulta</FormLabel>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Motivo de consulta" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnostic_guidance"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Orientación diagnóstica</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Comentario de orientación diagnóstica"
                      className="resize-none min-h-32"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className="w-full flex justify-end pt-10">
          <Button
            className="w-2/4"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? <div className="flex items-center gap-2"><Spinner className="border-t-white" />Guardando...</div> : "Guardar ficha"}
          </Button>
        </div>
      </form>
    </Form >
  )
}
