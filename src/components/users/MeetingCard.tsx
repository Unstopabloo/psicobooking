"use client"

import { useState } from 'react'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/Avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { TaskDailyIcon } from '../icons'

interface UserCardProps {
  name: string
  status: string
  avatarUrl: string
  documentCount: number
  timestamp: string
}

export function MeetingCard({ name, status, avatarUrl, documentCount, timestamp }: UserCardProps = {
  name: "Pablo Oyarce Ramirez",
  status: "C.I: Firmado",
  avatarUrl: "/placeholder.svg?height=40&width=40",
  documentCount: 3,
  timestamp: "20/08 | 15:45 PM"
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Card className="w-full max-w-sm cursor-pointer border hover:shadow-md hover:shadow-primary/50 transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-between gap-6">
              <header className="w-full flex items-start justify-between gap-4">
                <div className='flex flex-col'>
                  <h3 className="font-medium text-base">{name}</h3>
                  <p className="text-sm text-muted-foreground text-start">{status}</p>
                </div>
                <Avatar name={name} avatarUrl={avatarUrl} />
              </header>
              <div className="w-full flex items-center justify-between gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1">
                      <TaskDailyIcon />
                      <span className="text-sm">{documentCount}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cita numero {documentCount}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-sm text-muted-foreground">{timestamp}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p>Mas info acá</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}