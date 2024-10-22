'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, isSameMonth, isToday, parseISO, isBefore } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'

const DAYS = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM']
const MONTHS = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

// Sample event data
const EVENTS = {
  '2024-10-30': [{ title: 'Reunion con el equipo' }],
  '2024-10-22': [{ title: 'Cita con el dentista' }],
  '2024-10-21': [{ title: 'Fiesta de cumpleaños' }],
}

export function Scheduler({
  children
}: {
  children: React.ReactNode
}) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    setIsOpen(true)
  }

  const hasEvents = (day: number) => {
    const dateString = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), 'yyyy-MM-dd')
    return dateString in EVENTS && EVENTS[dateString as keyof typeof EVENTS].length > 0
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex justify-center items-start pt-10 max-w-2xl">
        <div className="p-4 rounded-lg w-[850px]">
          <DialogHeader className="flex flex-row justify-between items-center mb-4">
            <DialogTitle className="font-semibold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</DialogTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
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
              const currentDay = new Date()
              const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const isPastDay = isBefore(dateToCheck, currentDay) && !isToday(dateToCheck)
              const isCurrentDay = isToday(dateToCheck)

              return (
                <Button
                  key={day}
                  variant="outline"
                  className={cn(
                    `relative text-center py-8`,
                    isPastDay && 'bg-card/70 opacity-10 cursor-not-allowed',
                    isCurrentDay && 'border-primary'
                  )}
                  onClick={() => !isPastDay && handleDateClick(day)}
                  disabled={isPastDay}
                >
                  {hasEvents(day) && (
                    <span className="absolute top-1 right-1 size-[6px] bg-primary rounded-full"></span>
                  )}
                  {day}
                </Button>
              )
            })}
          </div>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: es })}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              {selectedDate && (
                <>
                  <h3 className="font-bold mb-2">Eventos:</h3>
                  {EVENTS[format(selectedDate, 'yyyy-MM-dd') as keyof typeof EVENTS] ? (
                    EVENTS[format(selectedDate, 'yyyy-MM-dd') as keyof typeof EVENTS].map((event, index) => (
                      <p key={index}>{event.title}</p>
                    ))
                  ) : (
                    <p>No hay eventos para este día.</p>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </DialogContent>
    </Dialog>
  )
}