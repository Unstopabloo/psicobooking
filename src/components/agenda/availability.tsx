'use client'

import { useState } from 'react'
import { CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react'
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
import { DAYS, MONTHS } from '@/lib/consts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { es } from 'date-fns/locale'
import { useAvailabilityData } from '@/server/queries/queries'
import { RecurringAvailability, SpecificAvailability } from '@/types/entities'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const TIME_SLOTS = Array.from({ length: 26 }, (_, i) => i + 8)
  .filter(hour => hour < 21)
  .flatMap(hour => [
    `${hour.toString().padStart(2, '0')}:00`,
    `${hour.toString().padStart(2, '0')}:30`
  ])

export function Availability() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDays, setSelectedDays] = useState<number[]>([])

  const { data: availabilityData } = useAvailabilityData(format(currentDate, 'yyyy-MM-dd'))
  const { recurring, specific } = availabilityData?.data || { recurring: [], specific: [] }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    setIsOpen(true)
  }

  const getAvailabilityForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    const dayOfWeek = getDay(date) || 7 // 0 for Sunday, so we change it to 7

    // Buscar si hay una disponibilidad específica para esta fecha
    const specificDay = specific?.find(item => item.date === dateString)
    if (specificDay !== undefined) {
      return specificDay.slots
    }

    // Si no hay específica, buscar la disponibilidad recurrente para ese día de la semana
    const recurringDay = recurring?.find(item => item.day === dayOfWeek)
    return recurringDay?.slots || []
  }

  const toggleDay = (day: number) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Ver y modificar disponibilidad" variant="outline" className='flex items-center gap-4 text-foreground/80'>
          <span className="hidden sm:block">Gestor de disponibilidad</span>
          <CalendarRange size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center items-start max-w-md sm:max-w-2xl px-3 pt-10 sm:p-8">
        <div className="p-1 sm:p-4 rounded-lg w-[850px]">
          <DialogHeader>
            <DialogTitle>Gestor de disponibilidad</DialogTitle>
            <DialogDescription className='pb-6'>Acá puedes ver y modificar tu disponibilidad para los próximos meses.</DialogDescription>
            <div className="flex flex-row justify-between items-center pb-4">
              <strong className="font-semibold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</strong>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-7 gap-1">
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
                  className={cn(`relative text-center py-6 sm:py-8 hover:shadow-md`, isTodayDate && 'bg-primary/5 border-primary/60')}
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
          </div>
          <h3 className="text-lg font-semibold mb-4">Disponibilidad Recurrente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DAYS.map((day, index) => (
              <div
                key={day}
                onClick={() => toggleDay(index + 1)}
                className={cn(
                  "flex items-center space-x-2 p-3 cursor-pointer rounded-lg border-2 transition-colors",
                  selectedDays.includes(index + 1) ? "border-primary bg-primary/10" : "border-gray-200"
                )}
              >
                <Checkbox
                  id={day}
                  value={index + 1}
                  className="h-5 w-5 rounded-full"
                  checked={selectedDays.includes(index + 1)}
                  onCheckedChange={() => toggleDay(index + 1)}
                />
                <Label
                  htmlFor={day}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {day}
                </Label>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <AvailabilityForm
              open={isOpen}
              onOpenChange={setIsOpen}
              date={selectedDate}
              specific={specific}
              recurring={recurring}
              dateAvailability={getAvailabilityForDate(selectedDate)}
            />
          </div>
        </div>
      </DialogContent>
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex justify-center items-start max-w-md sm:max-w-2xl px-3 pt-10 sm:p-8">
        <div className="p-1 sm:p-4 rounded-lg w-[850px]">
          <DialogHeader>
            <DialogTitle>Modificar disponibilidad</DialogTitle>
            <DialogDescription className='pb-6'>Modifica tu disponibilidad para el día {format(date, 'EEEE MM/yy', { locale: es })}.</DialogDescription>
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
            </div>
            {dateAvailability.map((slot, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{slot[0]} - {slot[1]}</span>
                <Button variant="destructive" size="sm">
                  Eliminar
                </Button>
              </div>
            ))}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}