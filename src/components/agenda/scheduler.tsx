'use client'

import { useState } from 'react'
import { CalendarSearch, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, isToday, isBefore, isAfter, startOfToday } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import { useUpcomingAppointmentData } from '@/server/queries/queries'
import { DAYS, MONTHS } from '@/lib/consts'
import { SchedulerAppointmentsSheet } from './schedulerAppointmentsSheet'

export function Scheduler() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7

  const { data: APPOINTMENTS } = useUpcomingAppointmentData(format(currentDate, 'yyyy-MM-dd'))

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

  const isAfterToday = (date: Date): boolean => {
    const today = startOfToday()
    return isAfter(date, today) || isToday(date)
  }

  const hasAppointments = (day: number) => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = format(dateToCheck, 'yyyy-MM-dd')
    return APPOINTMENTS?.data?.some(event => event.date === dateString)
  }

  const getAppointmentCount = (day: number) => {
    const dateString = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), 'yyyy-MM-dd')
    return APPOINTMENTS?.data?.find(event => event.date === dateString)?.quant || 0
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Ver agenda rápida" variant="outline" className='flex items-center gap-4 text-foreground/80'>
          <span className="hidden sm:block">Agenda rápida</span>
          <CalendarSearch size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center items-start max-w-md sm:max-w-2xl px-3 pt-10 sm:p-8">
        <div className="p-1 sm:p-4 rounded-lg w-[850px]">
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
              const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              const isPastDay = isBefore(dateToCheck, startOfToday())
              const isCurrentDay = isToday(dateToCheck)
              const appointmentCount = getAppointmentCount(day)
              const hasAppointmentsForDay = hasAppointments(day)
              const isFutureDay = isAfterToday(dateToCheck)

              return (
                <Button
                  key={day}
                  variant="outline"
                  className={cn(
                    `relative text-center py-6 sm:py-8 hover:shadow-md`,
                    isPastDay && 'bg-card/70 opacity-10 cursor-not-allowed shadow-none',
                    isCurrentDay && 'border-primary',
                    hasAppointmentsForDay && 'bg-primary/5 hover:bg-primary/15'
                  )}
                  onClick={() => !isPastDay && handleDateClick(day)}
                  disabled={isPastDay}
                >
                  {
                    hasAppointmentsForDay && isFutureDay && (
                      appointmentCount > 1 ? (
                        <span className="absolute top-1 right-1 text-xs font-light text-primary z-10">
                          {appointmentCount}
                        </span>
                      ) : (
                        <span className="absolute top-1 right-1 size-[6px] bg-primary rounded-full z-10" />
                      )
                    )
                  }
                  {day}
                </Button>
              )
            })}
          </div>
        </div>
        <SchedulerAppointmentsSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDate={selectedDate}
          currentDate={currentDate}
        />
      </DialogContent>
    </Dialog>
  )
}