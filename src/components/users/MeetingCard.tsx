"use client"

import { useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/Avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { TaskDailyIcon } from '../icons'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { PatientSheet } from '../patient-sheet'

interface UserCardProps {
  patientId: number
  name: string
  informedConsent: number
  avatarUrl: string
  appointmentType: string
  timestamp: string
  error?: Error
}

export function MeetingCard({ patientId, name, informedConsent, avatarUrl, appointmentType, timestamp, error }: UserCardProps) {
  const [open, setOpen] = useState(false)

  if (error) {
    toast.error("Error al cargar las citas")
  }

  return (
    <>
      <Card onClick={() => setOpen(true)} className="w-full cursor-pointer border hover:shadow-md hover:shadow-primary/50 transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-between gap-6">
            <header className="w-full flex items-start justify-between gap-4">
              <div className='flex flex-col'>
                <h3 className="font-medium text-base">{name}</h3>
                <p className="text-sm text-muted-foreground text-start">C.I. {informedConsent === 1 ? 'Firmado' : 'Pendiente'}</p>
              </div>
              <Avatar name={name} avatarUrl={avatarUrl} />
            </header>
            <div className="w-full flex items-center justify-between gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <TaskDailyIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cita {appointmentType}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm text-muted-foreground">{format(new Date(timestamp), 'dd MMM | HH:mm')} PM</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <PatientSheet patientId={patientId} open={open} setOpen={setOpen} />
    </>

  )
}