'use client'

import { useState, useEffect } from 'react'
import { CalendarRange, Check, ChevronLeft, ChevronRight, Copy, Edit, Pen, Pencil, Plus, Trash, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, isBefore, startOfToday, isToday } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { DAYS_FULL } from '@/lib/consts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { es } from 'date-fns/locale'
// import { useAvailabilityData } from '@/server/queries/queries'
import { DailyAvailability as AvailabilityType, RecurringAvailability, SpecificAvailability } from '@/types/entities'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'
import { clearSpecificAvailability, deleteRecurringAvailability, saveRecurringAvailability } from '@/server/actions/users'
import { saveSpecificAvailability } from '@/server/actions/users'

import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [recurringTimes, setRecurringTimes] = useState<{ [key: number]: { start: string, end: string } }>({})
  const [recurringDisabledDays, setRecurringDisabledDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6])
  const [disabledEndTime, setDisabledEndTime] = useState<number[]>([0, 1, 2, 3, 4, 5, 6])
  const [copied, setCopied] = useState(false)
  // const { data: availabilityData } = useAvailabilityData(format(currentDate, 'yyyy-MM-dd'))
  // const { recurring, specific } = availabilityData?.data || { recurring: [], specific: [] }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    setIsOpen(true)
  }

  // const getAvailabilityForDate = (date: Date) => {
  //   const dateString = format(date, 'yyyy-MM-dd')
  //   const dayOfWeek = getDay(date)

  //   // Buscar si hay una disponibilidad específica para esta fecha
  //   const specificDay = specific?.find(item => item.date === dateString)
  //   if (specificDay !== undefined) {
  //     // Si existe una disponibilidad específica y está marcada como no disponible (slots vacíos),
  //     // retornamos un array vacío independientemente de la disponibilidad recurrente
  //     return specificDay.slots
  //   }

  //   // Si no hay específica, buscar la disponibilidad recurrente para ese día de la semana
  //   const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek
  //   const recurringDay = recurring?.find(item => item.day === adjustedDayOfWeek)
  //   return recurringDay?.slots || []
  // }

  const toggleDay = (day: number) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }

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

    toast.promise(saveRecurringAvailability(adjustedDayIndex, recurringTimes[dayIndex]!.start, recurringTimes[dayIndex]!.end), {
      loading: 'Actualizando disponibilidad...',
      success: 'Disponibilidad actualizada',
      error: 'No se pudo actualizar la disponibilidad, por favor intenta nuevamente'
    })
  }

  const handleClearRecurringAvailability = (dayIndex: number) => {
    const adjustedDayIndex = dayIndex === 6 ? 0 : dayIndex + 1

    if (recurringTimes[dayIndex]?.start === '' && recurringTimes[dayIndex]?.end === '') {
      toast.error('No se puede eliminar la disponibilidad recurrente de un día que no tiene disponibilidad')
      return
    }

    toast.promise(deleteRecurringAvailability(adjustedDayIndex), {
      loading: 'Limpiando disponibilidad...',
      success: 'Disponibilidad eliminada',
      error: 'No se pudo eliminar la disponibilidad, por favor intenta nuevamente'
    })
  }

  // useEffect(() => {
  //   if (recurring?.length) {
  //     const initialTimes: { [key: number]: { start: string, end: string } } = {}

  //     recurring.forEach(item => {
  //       // Convertir de domingo=0 a lunes=0
  //       const adjustedDay = item.day === 0 ? 6 : item.day - 1

  //       if (item.slots?.[0]) {
  //         initialTimes[adjustedDay] = {
  //           start: item.slots[0][0],
  //           end: item.slots[0][1]
  //         }
  //       }
  //     })

  //     setRecurringTimes(initialTimes)
  //     // Actualizar los días habilitados
  //     setRecurringDisabledDays(prev =>
  //       prev.filter(day => !initialTimes[day])
  //     )
  //     // Actualizar los tiempos finales habilitados
  //     setDisabledEndTime(prev =>
  //       prev.filter(day => !initialTimes[day]?.start)
  //     )
  //   }
  // }, [recurring])

  console.log('availability', availability)
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
          <DialogHeader>
            <DialogTitle>Gestor de disponibilidad</DialogTitle>
            <DialogDescription className='pb-6'>Acá puedes ver y modificar tu disponibilidad para los próximos meses.</DialogDescription>
            {/* <div className="flex flex-row justify-between items-center pb-4">
              <strong className="font-semibold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</strong>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
          </DialogHeader>
          {/* <div className="grid grid-cols-7 gap-1">
            {DAYS.map(day => (
              <div key={day} className="text-center text-sm text-muted-foreground lowercase font-normal py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="text-center py-2"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const dateAvailability = getAvailabilityForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
              const hasAvailability = dateAvailability.length > 0
              const isTodayDate = isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
              const isBeforeToday = isBefore(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), startOfToday())

              return (
                <Button
                  key={day}
                  variant="outline"
                  disabled={isBeforeToday}
                  className={cn(
                    `relative text-center py-6 sm:py-8 hover:shadow-md`,
                    isTodayDate && 'bg-primary/5 border-primary/60',
                    hasAvailability && 'bg-primary/5 border-primary/60'
                  )}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                  {hasAvailability && (
                    <div className="absolute inset-0 flex flex-col justify-end items-center pb-1">
                      <div className="flex space-x-0.5">
                        {dateAvailability.map((_, index) => (
                          <div key={index} className="w-1 h-1 bg-primary rounded-full" />
                        ))}
                      </div>
                    </div>
                  )}
                </Button>
              )
            })}
          </div> */}
          <div className='grid grid-cols-3 col-span-2 gap-x-8 gap-y-6 w-full'>
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
                              slotId={slot.id.toString()}
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
                      {/* <Button
                        className='border-red-500/20 hover:bg-red-500/10'
                        aria-label="Limpiar disponibilidad recurrente"
                        variant="outline"
                        disabled={recurringDisabledDays.includes(index)}
                        onClick={() => handleClearRecurringAvailability(index)}
                      >
                        Limpiar
                      </Button> */}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </DialogContent>
      {/* <div className="mt-8">
        <AvailabilityForm
          open={isOpen}
          onOpenChange={setIsOpen}
          date={selectedDate}
          specific={specific}
          recurring={recurring}
          dateAvailability={getAvailabilityForDate(selectedDate)}
        />
      </div> */}
    </Dialog>
  )
}

function AvailabilityForm({
  open,
  onOpenChange,
  date,
  specific,
  recurring,
  dateAvailability,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  specific: SpecificAvailability[]
  recurring: RecurringAvailability[]
  dateAvailability: string[][]
}) {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const router = useRouter()

  const handleSaveAvailability = async () => {
    if (!startTime || !endTime) {
      toast.error('Debes seleccionar una hora de inicio y fin')
      return
    }

    if (startTime === endTime) {
      toast.error('La hora de inicio y fin no pueden ser iguales')
      return
    }

    if (startTime > endTime) {
      toast.error('La hora de inicio no puede ser mayor a la hora de fin')
      return
    }
    const dateString = format(date, 'yyyy-MM-dd')

    toast.promise(saveSpecificAvailability(dateString, startTime, endTime), {
      loading: 'Guardando disponibilidad...',
      success: 'Disponibilidad guardada correctamente',
      error: 'No se pudo guardar la disponibilidad'
    })

    router.refresh()
  }

  const handleClearSpecificAvailability = () => {
    const dateString = format(date, 'yyyy-MM-dd')

    toast.promise(clearSpecificAvailability(dateString), {
      loading: 'Limpiando disponibilidad...',
      success: 'Disponibilidad eliminada',
      error: 'No se pudo eliminar la disponibilidad'
    })

    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex justify-center items-start max-w-md sm:max-w-2xl px-3 pt-10 sm:p-8">
        <div className="p-1 sm:p-4 rounded-lg w-[850px]">
          <DialogHeader>
            <DialogTitle>Modificar disponibilidad</DialogTitle>
            <DialogDescription className='pb-6'>
              Modifica tu disponibilidad para el día {format(date, 'EEEE dd/MM/yy', { locale: es })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Select onValueChange={setStartTime} value={startTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Hora de inicio" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setEndTime} value={endTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Hora de fin" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleSaveAvailability}
                disabled={!startTime || !endTime}
              >
                Modificar disponibilidad
              </Button>
            </div>
            {dateAvailability.map((slot, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{slot[0]} - {slot[1]}</span>
                <Button onClick={handleClearSpecificAvailability} variant="outline" size="sm">
                  Este día no estaré disponible
                </Button>
              </div>
            ))}
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
  slotId: string,
}) {
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
        <div className='absolute inset-y-0 end-0 h-full flex items-center'>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center h-full w-7 justify-center text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed"
                  aria-label="Editar disponibilidad"
                >
                  <div>
                    <Edit size={16} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                Editar disponibilidad
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex h-full w-7 items-center justify-center border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed"
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