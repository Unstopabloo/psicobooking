"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { z } from "zod"
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { createTranscription } from "@/server/actions/transcriptions";
import { transcriptionFormSchema } from "@/types/schemas";
import { Loader2 } from "lucide-react";
import { AppointmentForTranscriptionForm } from "@/types/entities";
import { format } from "date-fns";
import { useState } from "react";
import Link from "next/link";

export default function UTButton({ appointments, error }: { appointments: AppointmentForTranscriptionForm[] | undefined, error: Error | undefined }) {
  const [open, setOpen] = useState(false)

  if (error) {
    toast.error(error.message)
  }

  const form = useForm<z.infer<typeof transcriptionFormSchema>>({
    resolver: zodResolver(transcriptionFormSchema),
    defaultValues: {
      transcription_title: "",
      appointment_id: undefined,
      audio_file: undefined,
      is_transcribed: false,
    },
  })

  const { field: audioField } = useController({
    name: 'audio_file',
    control: form.control,
  })

  async function onSubmit(data: z.infer<typeof transcriptionFormSchema>) {
    const formData = new FormData();
    formData.append('transcription_title', data.transcription_title);
    formData.append('is_transcribed', String(data.is_transcribed));

    if (data.appointment_id) {
      formData.append('appointment_id', String(data.appointment_id));
    }

    if (data.audio_file) {
      formData.append('audio_file', data.audio_file);
    }
    const response = await createTranscription(formData)

    if (response) {
      toast.success("Transcripción creada correctamente", {
        description: "El proceso de transcripción puede durar hasta 5 minutos, por favor espere."
      })
    }
    form.reset()
    setOpen(true)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="transcription_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="relative after:content-['*'] after:absolute after:text-red-500 after:text-sm after:top-1/2 after:-translate-y-1/2 after:-right-2">Titulo de la transcripción</FormLabel>
              <FormControl className="space-y-2">
                <Input placeholder="Titulo de la transcripción" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointment_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cita</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString() || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una cita" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    appointments?.map(appointment => (
                      <SelectItem key={appointment.id} value={String(appointment.id)}>{appointment.patient + ' - ' + format(new Date(appointment.date_from), 'dd/MM')}</SelectItem>
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
          name="audio_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Archivo de audio</FormLabel>
              <FormControl className="space-y-2">
                <FormControl>
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        audioField.onChange(file)
                      }
                    }}
                  />
                </FormControl>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_transcribed"
          render={({ field }) => (
            <FormItem className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-primary/20">
              <div className="relative flex w-full items-start gap-2">
                <div className="grid grow gap-2">
                  <Label htmlFor="checkbox-13">
                    Transcribir audio{" "}
                    <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                      (Opcional)
                    </span>
                  </Label>
                  <p id="checkbox-13-description" className="text-xs text-muted-foreground">
                    Al marcar, el audio será transcrito buscando las partes importantes.
                  </p>
                </div>
              </div>
              <FormControl>
                <Switch
                  id="switch-15"
                  className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                  aria-describedby="switch-15-description"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {
          form.formState.isSubmitting ?
            <Button type="button" className="w-full" disabled><Loader2 className="w-4 h-4 animate-spin mr-2 duration-500" /> Transformando audio...</Button>
            :
            <Button type="submit" className="w-full">Transformar audio</Button>
        }
      </form>
      <ContinueModal open={open} setOpen={setOpen} />
    </Form>
  );
}

function ContinueModal({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Desea ir a las transcripciones?</DialogTitle>
          <DialogDescription>
            Tenga en cuenta que la transcripción puede tardar de 2 a 5 minutos en estar disponible.
          </DialogDescription>
          <div className="pt-10 grid grid-cols-2 gap-2">
            <Button
              asChild
              className="w-full h-full min-h-56 bg-primary/10 border-primary text-primary font-medium hover:bg-primary/20 hover:text-primary"
              variant="outline"
            >
              <Link href="/dashboard/herramientas/transcripciones">
                Volver a transcripciones
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full h-full min-h-56 bg-secondary/10 border-secondary text-secondary font-medium hover:bg-secondary/20 hover:text-secondary"
              onClick={() => setOpen(!open)}
            >
              Permanecer acá
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
