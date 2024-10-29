"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AiAssistant } from "../icons"
import { useUser } from "@clerk/nextjs"
import { useChat } from 'ai/react';
import { Avatar } from "@/components/Avatar"
import { ScrollArea } from "../ui/scroll-area"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"
import { SendIcon } from "lucide-react"
import { GenerativeNextAppointment, SkeletonGenerativeNextAppointment } from "./generative-next-appointment"

export function ChatAsistant() {
  const { user } = useUser();
  const avatar = user?.imageUrl

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/assistant',
  });
  const [isOpen, setIsOpen] = useState(false)

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 2. Cuando los mensajes cambian, desplazamos el contenedor hacia el final
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth', // Para un desplazamiento suave
      });
    }
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <AiAssistant className="-ms-1 me-2 opacity-85" width={16} height={16} strokeWidth={2} aria-hidden="true" />
          Asistente
          <kbd className="-me-1 ms-2 inline-flex h-5 max-h-full items-center rounded border border-white/70 px-1 font-[inherit] text-[0.625rem] font-medium text-white/70">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Asistente</DialogTitle>
          <DialogDescription>
            Este es tu asistente personal, puedes consultarle sobre información de pacientes, citas, etc.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea viewportRef={scrollAreaRef} className="h-[500px] pr-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-start mt-4' : 'justify-end'}`}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-3 flex items-start gap-4',
                  message.role !== 'user' && 'border border-border/40 bg-card/30'
                )}
              >
                {
                  message.role === 'user' ? (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Avatar name={user!.fullName} avatarUrl={avatar!} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 min-w-8 min-h-8 aspect-square rounded-full flex items-center justify-center">
                      <AiAssistant width={16} height={16} strokeWidth={2} aria-hidden="true" color="blue" />
                    </div>
                  )
                }
                <p className="prose text-foreground/85">{message.content}</p>
                <div>
                  {message.toolInvocations?.map(toolInvocation => {
                    const { toolName, toolCallId, state } = toolInvocation;

                    if (state === 'result') {
                      if (toolName === 'nextAppointment') {
                        const { result } = toolInvocation;
                        return (
                          <div key={toolCallId}>
                            <GenerativeNextAppointment nextAppointment={result.nextAppointment} />
                          </div>
                        );
                      }
                    } else {
                      return (
                        <div key={toolCallId}>
                          {toolName === 'nextAppointment' ? (
                            <SkeletonGenerativeNextAppointment />
                          ) : null}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex items-center justify-between px-4 py-1 border gap-4 rounded-xl bg-card/65">
          <textarea
            value={input}
            onChange={handleInputChange}
            className="w-full field-sizing resize-none min-h-[40px] h-auto p-2 max-h-28 focus-visible:ring-0 focus-visible:ring-offset-0 border-none break-words max-w-2xl focus-visible:outline-none shadow-none focus-visible:shadow-none bg-transparent"
            placeholder="Escribe tu mensaje..."
            rows={1}
            style={{ lineHeight: '1.5' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" className="rounded-xl" size="icon" aria-label="Enviar mensaje">
            <SendIcon className="w-4 h-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}