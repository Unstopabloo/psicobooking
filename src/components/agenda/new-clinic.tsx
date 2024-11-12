"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const TIME_SLOTS = Array.from({ length: 26 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8
  const minutes = i % 2 === 0 ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minutes}`
}).filter(time => {
  const hour = parseInt(time.split(':')[0] || '0')
  return hour < 21
})

const FormSchema = z.object({
  name: z.string({
    message: "El nombre del consultorio es requerido",
  }).min(2, {
    message: "El nombre del consultorio debe tener al menos 2 caracteres",
  }),

  address: z.string({
    message: "La dirección del consultorio es requerida",
  }).min(2, {
    message: "La dirección del consultorio debe tener al menos 2 caracteres",
  }),

  day_of_week: z.string({
    message: "El día de la semana es requerido",
  }),

  hour_from: z.string({
    message: "La hora de inicio es requerida",
  }),

  hour_to: z.string({
    message: "La hora de finalización es requerida",
  }),
})

export function NewClinic() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
      day_of_week: "",
      hour_from: "",
      hour_to: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.hour_from === data.hour_to) {
      toast.error('La hora de inicio y fin no pueden ser iguales')
      return
    }

    if (data.hour_from > data.hour_to) {
      toast.error('La hora de inicio no puede ser mayor a la hora de fin')
      return
    }

    // toast.promise(addConsultorio(data), {
    //   loading: 'Creando consultorio...',
    //   success: 'Consultorio creado correctamente',
    //   error: ({ data }) => {
    //     return data?.error || 'Ha ocurrido un error al crear el consultorio'
    //   }
    // })

    form.reset()
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Nombre del consultorio</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del consultorio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day_of_week"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Día de la semana</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Día de la semana" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Lunes</SelectItem>
                  <SelectItem value="1">Martes</SelectItem>
                  <SelectItem value="2">Miércoles</SelectItem>
                  <SelectItem value="3">Jueves</SelectItem>
                  <SelectItem value="4">Viernes</SelectItem>
                  <SelectItem value="5">Sábado</SelectItem>
                  <SelectItem value="6">Domingo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Dirección del consultorio</FormLabel>
              <FormControl>
                <Input placeholder="Dirección del consultorio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hour_from"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Hora de inicio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hora de inicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hour_to"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Hora de finalización</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Hora de finalización" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-2 mt-6" type="submit">Guardar consultorio</Button>
      </form>
    </Form>
  )
}
