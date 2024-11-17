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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { PatientForNote } from "@/types/entities"
import { Avatar } from "../Avatar"
import { toast } from "sonner"

const formSchema = z.object({
  note: z.string().min(2, {
    message: "La nota debe tener al menos 2 caracteres.",
  }),
  patient_id: z.string().min(1, {
    message: "Debes seleccionar un paciente.",
  }),
  color: z.string().min(1, {
    message: "Debes seleccionar un color.",
  }),
})

const COLORS = [
  {
    color: "#f4a749",
    name: "Naranja"
  },
  {
    color: "#49a749",
    name: "Verde"
  },
  {
    color: "#4949a7",
    name: "Azul"
  },
  {
    color: "#a749f4",
    name: "Morado"
  },
  {
    color: "#f45249",
    name: "Rojo"
  },
  {
    color: "#49f449",
    name: "Verde claro"
  }
]

export function AddNote({ children, patients }: { children: React.ReactNode, patients: PatientForNote[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      patient_id: "",
      color: COLORS[0]!.color,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("content", values.note)
    formData.append("patient_id", values.patient_id)
    formData.append("color", values.color)

    toast.promise(createNote(formData), {
      loading: "Creando nota...",
      success: "Nota creada correctamente",
      error: "Error al crear la nota"
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade una nota</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nota</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40 resize-none"
                      placeholder="El contenido de la nota"
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
                <FormItem>
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        COLORS.map((color, index) => (
                          <SelectItem className="flex items-center gap-2" key={index} value={color.color}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.color }} />
                              {color.name}
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
            <Button className="col-span-2" type="submit">Guardar nota</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}