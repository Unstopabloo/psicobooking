"use client"

import { addActivityComment } from "@/server/actions/activity";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Button } from "../ui/button";

const formSchema = z.object({
  content: z.string().min(2).max(50),
  activity_id: z.number()
})

export function AddActivityForm({ activityId }: { activityId: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      activity_id: activityId
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("content", values.content)
    formData.append("activity_id", values.activity_id.toString())

    toast.promise(addActivityComment(formData), {
      success: () => {
        form.reset()
        return <p>Comentario publicado</p>
      },
      error: () => {
        form.reset()
        return <p>Error al publicar el comentario</p>
      },
      loading: "Publicando comentario..."
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-4">
        <div className="relative">
          <FormField
            control={form.control}
            name="content"
            disabled={form.formState.isSubmitted}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="pe-9" disabled={form.formState.isSubmitted} placeholder="Escribe una nota" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={form.formState.isSubmitted}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Publicar comentario"
          >
            {
              form.formState.isSubmitted
                ? <Loader2 className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
                : <Send size={16} strokeWidth={2} aria-hidden="true" />
            }
          </button>
        </div>
      </form>
    </Form>
  )
}