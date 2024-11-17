"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createNote, updateNote } from "@/server/actions/notas"

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
import { Note, PatientForNote } from "@/types/entities"
import { Avatar } from "../Avatar"
import { toast } from "sonner"
import { format } from "date-fns"
import { es } from "date-fns/locale"

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

export function NoteCard({ note, patients }: { note: Note, patients: PatientForNote[] }) {
  const { content, color, created_at, patient_name, patient_id, psychologist_id } = note

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: content,
      patient_id: patient_id.toString() || "",
      color: color,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("content", values.note)
    formData.append("color", values.color)
    formData.append("note_id", note.id.toString())
    formData.append("psychologist_id", psychologist_id.toString())

    toast.promise(updateNote(formData), {
      loading: "Modificando nota...",
      success: "Nota modificada correctamente",
      error: "Error al modificar la nota"
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <article
          style={{ borderColor: color, backgroundColor: `${color}1a` }}
          className={`flex flex-col justify-between gap-4 p-4 border rounded-lg cursor-pointer`}
        >
          <p className="text-sm text-foreground/80">{content.slice(0, 100)}...</p>
          <footer className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{format(new Date(created_at), "dd MMM", { locale: es })}</p>
            <p className="text-sm text-muted-foreground text-end">{patient_name}</p>
          </footer>
        </article>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica la nota</DialogTitle>
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
                      <SelectTrigger disabled>
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
            <Button className="col-span-2" type="submit">Modificar nota</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}