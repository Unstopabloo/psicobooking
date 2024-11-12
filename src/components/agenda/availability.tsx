'use client'

import { useState } from 'react'
import { CalendarRange, ChevronLeft, ChevronRight, Plus, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, isToday, isBefore, startOfToday } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DAYS, DAYS_FULL, MONTHS } from '@/lib/consts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { es } from 'date-fns/locale'
import { DailyAvailability as AvailabilityType, RecurringAvailability, SpecificAvailability } from '@/types/entities'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'
import { deleteAvailability, saveAvailability } from '@/server/actions/users'
import { saveSpecificAvailability } from '@/server/actions/users'

import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { cn } from '@/lib/utils'
import { Scheduler } from './scheduler'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const TIME_SLOTS = Array.from({ length: 26 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8
  const minutes = i % 2 === 0 ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minutes}`
}).filter(time => {
  const hour = parseInt(time.split(':')[0] || '0')
  return hour < 21
})

export function Availability({ availability }: { availability: AvailabilityType[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [recurringTimes, setRecurringTimes] = useState<{ [key: number]: { start: string, end: string } }>({})
  const [recurringDisabledDays, setRecurringDisabledDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6])
  const [disabledEndTime, setDisabledEndTime] = useState<number[]>([0, 1, 2, 3, 4, 5, 6])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOpenAvailabilityChange, setIsOpenAvailabilityChange] = useState(false)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleStartTimeChange = (time: string, dayIndex: number) => {

    if (time === (recurringTimes[dayIndex]?.end || '')) {
      toast.error('La hora de inicio y fin no pueden ser iguales')
      return
    }

    if (recurringTimes[dayIndex]?.end && recurringTimes[dayIndex]?.start > recurringTimes[dayIndex]?.end) {
      toast.error('La hora de inicio no puede ser mayor a la hora de fin')
      return
    }

    setRecurringTimes(prev => ({
      ...prev,
      [dayIndex]: {
        start: time,
        end: prev[dayIndex]?.end || ''
      }
    }))

    setDisabledEndTime(prev => prev.filter(d => d !== dayIndex))
  }

  const handleEndTimeChange = (time: string, dayIndex: number) => {
    if (time <= (recurringTimes[dayIndex]?.start || '')) {
      toast.error('La hora de fin no puede ser menor o igual a la hora de inicio')
      return
    }

    setRecurringDisabledDays(prev => prev.filter(d => d !== dayIndex))

    setRecurringTimes(prev => ({
      ...prev,
      [dayIndex]: {
        start: prev[dayIndex]?.start || '',
        end: time
      }
    }))
  }

  const handleSaveRecurringAvailability = async (dayIndex: number) => {
    const adjustedDayIndex = dayIndex === 6 ? 0 : dayIndex + 1

    if (recurringTimes[dayIndex]?.start === '' || recurringTimes[dayIndex]?.end === '') {
      toast.error('Debes seleccionar una hora de inicio y fin')
      return
    }

    if (recurringTimes[dayIndex]?.start === recurringTimes[dayIndex]?.end) {
      toast.error('La hora de inicio y fin no pueden ser iguales')
      return
    }

    if ((recurringTimes[dayIndex]?.start || '') > (recurringTimes[dayIndex]?.end || '')) {
      toast.error('La hora de inicio no puede ser mayor a la hora de fin')
      return
    }

    const existingSlots = availability[dayIndex]?.availability_slots || []
    const newStart = recurringTimes[dayIndex]!.start
    const newEnd = recurringTimes[dayIndex]!.end

    for (const slot of existingSlots) {
      if (
        (newStart >= slot.hour_from && newStart <= slot.hour_to) ||
        (newEnd >= slot.hour_from && newEnd <= slot.hour_to) ||
        (newStart <= slot.hour_from && newEnd >= slot.hour_to)
      ) {
        toast.error(`Ya tienes disponibilidad configurada entre ${slot.hour_from} y ${slot.hour_to}`)
        return
      }

      if (newStart === slot.hour_from && newEnd === slot.hour_to) {
        toast.error('Ya existe este rango de disponibilidad')
        return
      }
    }

    toast.promise(saveAvailability(adjustedDayIndex, recurringTimes[dayIndex]!.start, recurringTimes[dayIndex]!.end), {
      loading: 'Actualizando disponibilidad...',
      success: 'Disponibilidad actualizada',
      error: 'No se pudo actualizar la disponibilidad, por favor intenta nuevamente'
    })

    setRecurringTimes({})
  }

  const onAvailabilityDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsOpenAvailabilityChange(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Ver y modificar disponibilidad" variant="outline" className='flex items-center gap-4 text-foreground/80'>
          <span className="hidden sm:block">Gestor de disponibilidad</span>
          <CalendarRange size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="grid grid-cols-1 max-w-md sm:max-w-[1170px] px-3 pt-10 sm:p-8">
        <div className="p-1 sm:p-4 rounded-lg">
          <DialogHeader className="flex flex-col md:flex-row justify-between items-start">
            <div className='flex-shrink-0'>
              <DialogTitle>Gestor de disponibilidad</DialogTitle>
              <DialogDescription className='pb-6'>Acá puedes ver y modificar tu disponibilidad para los próximos meses.</DialogDescription>
            </div>
            <Scheduler text='Ver disponibilidad' mode='availability' onAvailabilityDateClick={(date) => onAvailabilityDateClick(date)} />
            <AvailabilityCalendar
              isOpenAvailabilityChange={isOpenAvailabilityChange}
              setIsOpenAvailabilityChange={setIsOpenAvailabilityChange}
              currentDate={currentDate}
              selectedDate={selectedDate}
            />
          </DialogHeader>
          {/*  */}
          <div className='grid sm:grid-cols-2 md:grid-cols-3 col-span-2 gap-x-8 gap-y-6 w-full mt-4'>
            {
              availability.map((availability, index) => {
                return (
                  <div key={index} className='flex flex-col items-start justify-between border p-4 rounded-lg shadow-sm bg-card/15'>
                    <div className='flex items-center gap-2 w-full'>
                      <Badge
                        className='min-w-20 bg-gray-700 dark:bg-gray-800 hover:bg-gray-700 dark:hover:bg-gray-800 h-6 flex items-center justify-center'
                      >
                        {availability.day_name}
                      </Badge>
                    </div>
                    <div className='w-full mt-4 flex flex-col items-start gap-2'>
                      {
                        availability.availability_slots && availability.availability_slots.length > 0 ?
                          availability.availability_slots.map((slot, index) => (
                            <InputTimeSlot
                              key={index}
                              startTime={slot.hour_from}
                              endTime={slot.hour_to}
                              slotId={slot.id}
                            />
                          )) : <p className='text-start text-sm text-muted-foreground'>No tienes definida ninguna disponibilidad para este día</p>
                      }
                    </div>
                    <div className='mt-6 w-full'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className='flex items-center gap-1 w-full bg-secondary/10 border-secondary/60 hover:bg-secondary/20'
                            aria-label="Guardar disponibilidad recurrente"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4" />
                            Añadir
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Añade un rango de disponibilidad</DialogTitle>
                            <DialogDescription>
                              Selecciona un rango de horas para añadir a tu disponibilidad del día {DAYS_FULL[index]}
                            </DialogDescription>
                            <form className='grid grid-cols-2 gap-2 py-4' action={handleSaveRecurringAvailability.bind(null, index)}>
                              <Select
                                onValueChange={(time) => handleStartTimeChange(time, index)}
                                value={recurringTimes[index]?.start || ''}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Hora de inicio" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TIME_SLOTS.map(time => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                onValueChange={(time) => handleEndTimeChange(time, index)}
                                value={recurringTimes[index]?.end || ''}
                                disabled={disabledEndTime.includes(index)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Hora de fin" />
                                </SelectTrigger>
                                <SelectContent>
                                  {TIME_SLOTS.map(time => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button className='col-span-2 mt-8' type='submit'>Guardar</Button>
                            </form>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InputTimeSlot({
  startTime,
  endTime,
  slotId,
}: {
  startTime: string,
  endTime: string,
  slotId: number,
}) {
  const handleClearAvailability = (id: number) => {
    toast.promise(deleteAvailability(id), {
      loading: 'Eliminando disponibilidad...',
      success: 'Disponibilidad eliminada',
      error: 'No se pudo eliminar la disponibilidad, por favor intenta nuevamente'
    })
  }

  return (
    <div className='w-full'>
      <div className="relative">
        <Input
          id="input-53"
          className="pe-9"
          type="text"
          defaultValue={startTime + ' - ' + endTime}
          readOnly
        />
        <div className='absolute inset-y-0 end-2 h-full flex items-center'>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleClearAvailability(slotId)}
                  className="flex h-full  w-7 items-center justify-center border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-red-700/70 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed"
                  aria-label="Eliminar disponibilidad"
                >
                  <div>
                    <Trash size={16} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                Eliminar disponibilidad
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

export function AvailabilityCalendar({
  selectedDate,
  currentDate,
  isOpenAvailabilityChange,
  setIsOpenAvailabilityChange,
}: {
  selectedDate: Date | null
  currentDate: Date
  isOpenAvailabilityChange: boolean
  setIsOpenAvailabilityChange: (open: boolean) => void
}) {

  return (
    <AlertDialog open={isOpenAvailabilityChange} onOpenChange={setIsOpenAvailabilityChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Modificar disponibilidad
          </AlertDialogTitle>
          <AlertDialogDescription>
            Estas a punto de especificar que no estarás disponible el día {format(currentDate, 'EEEE dd/MM/yy', { locale: es })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button>No estaré disponible</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}