"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createNote } from "@/server/actions/notas"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { PatientForNote } from "@/types/entities"
import { Avatar } from "../Avatar"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { createActivity } from "@/server/actions/activity"

const formSchema = z.object({
  patient_id: z.string().min(1, {
    message: "Debes seleccionar un paciente.",
  }),
  title: z.string({
    required_error: "Debes introducir un título.",
  }).min(1, {
    message: "Debes introducir un título.",
  }),
  description: z.string({
    required_error: "Debes introducir una descripción.",
  }).min(1, {
    message: "Debes introducir una descripción.",
  }),
  date_from: z.date({
    required_error: "Debes introducir una fecha de inicio.",
  }),
  date_to: z.date({
    required_error: "Debes introducir una fecha de fin.",
  }),
})

export function AddActivity({ children, patients }: { children: React.ReactNode, patients: PatientForNote[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date_from: undefined,
      date_to: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("title", values.title)
    formData.append("description", values.description)
    formData.append("date_from", values.date_from.toISOString())
    formData.append("date_to", values.date_to.toISOString())
    formData.append("patient_id", values.patient_id)

    toast.promise(createActivity(formData), {
      loading: "Creando actividad...",
      success: "Actividad creada correctamente",
      error: "Error al crear la actividad"
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade una actividad</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="El título de la actividad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient_id"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Paciente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={patients.length === 0 ? 'No hay pacientes' : 'Selecciona un paciente'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        patients.length > 0 && patients.map(patient => (
                          <SelectItem className="flex items-center gap-2" key={patient.id} value={patient.id.toString()}>
                            <div className="flex items-center gap-2">
                              <Avatar name={patient.name} avatarUrl={patient.avatar} className="size-6" />
                              {patient.name}
                            </div>
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40 resize-none"
                      placeholder="La descripción de la actividad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_from"
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Fecha de inicio</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          // Reset date_to if it's before the new date_from
                          const dateTo = form.getValues("date_to");
                          if (dateTo && date && dateTo < date) {
                            form.setValue("date_to", date);
                          }
                        }}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_to"
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col">
                  <FormLabel>Fecha de fin</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={!form.getValues("date_from")}
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const dateFrom = form.getValues("date_from");
                          return !dateFrom || date < dateFrom || date < new Date("1900-01-01");
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="col-span-2" type="submit">Guardar actividad</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}