import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { usePsychologistById } from "@/server/queries/queries";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ChevronLeft, ChevronRight, SquarePlay } from "lucide-react";
import Placeholder from "../../../public/isotipo.webp";
import { VideoPlayer } from "../cloudinary/video-player";
import { Badge } from "../ui/badge";
import { addMonths, format, getDay, getDaysInMonth, isAfter, isToday, startOfMonth, startOfToday, subMonths } from "date-fns";
import { DAYS, MONTHS } from "@/lib/consts";
import { isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { AvailabilityInterval } from "@/types/entities";
import { format as formatTZ, toZonedTime, fromZonedTime } from 'date-fns-tz';

export function PsychologistAppointmentSheet({
  selectedPsychologist,
  setSelectedPsychologist
}: {
  selectedPsychologist: number | null,
  setSelectedPsychologist: (psychologist: number | null) => void
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { data, isLoading, refetch } = usePsychologistById(selectedPsychologist!)

  useEffect(() => {
    if (selectedPsychologist) {
      refetch()
    }
  }, [selectedPsychologist])

  console.log(data)
  return (
    <article className={`flex flex-col gap-4 animate-fade-right duration-300 col-span-1`}>
      <Card className="flex flex-row items-start gap-4 p-4">
        <aside>
          <Image
            src={data?.avatar || Placeholder}
            alt={`${data?.first_name} ${data?.last_name}` || ''}
            width={280}
            height={450}
            className="rounded-lg object-cover"
          />
        </aside>
        <div>
          <CardHeader className="w-full justify-between">
            <CardTitle>{data?.first_name} {data?.last_name}</CardTitle>
            {data?.video_presentation_url ? (
              <PsychologistVideoPresentation name={data?.first_name + ' ' + data?.last_name} publicId={data?.video_presentation_url} />
            ) : (
              <Button disabled variant="outline" size="icon">
                <SquarePlay className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <section>
              <h4 className="text-sm font-medium text-foreground/70 py-2">Especialidades</h4>
              <ul className="flex flex-wrap gap-2"  >
                {data?.specialities.map((speciality) => (
                  <li key={speciality.name}>
                    <Badge variant="outline" className="border-primary text-primary font-normal bg-primary/10">{speciality.name}</Badge>
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
          <CardFooter className="p-0 pt-8 flex flex-col items-start gap-2">
            <p className="text-sm text-foreground/70"><strong>Precio por sesión:</strong> $130</p>
            <p className="text-sm text-foreground/70">Agenda 1 hora por cita</p>
          </CardFooter>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <PsychologistAppointmentScheduler psychologistId={selectedPsychologist!} setSelectedDate={setSelectedDate} availability={data?.availability || []} />
        <PsychologistAppointmentSchedulerDay appointments={data?.appointments || []} psychologistId={selectedPsychologist!} date={selectedDate!} />
      </div>
    </article>
  )
}

function PsychologistAppointmentSchedulerDay({
  appointments,
  psychologistId,
  date
}: {
  appointments: { state: string, date_from: string, date_to: string }[],
  psychologistId: number,
  date: Date
}) {
  if (!date) return null;

  // Generamos slots desde 8:00 UTC hasta 20:30 UTC
  const UTC_TIME_SLOTS = Array.from({ length: 26 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8; // Comenzamos desde 8:00 UTC
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  }).filter(time => {
    const [hour, minutes] = time.split(':').map(Number);
    // Filtramos para terminar en 20:30
    return hour! < 21 && !(hour! === 20 && minutes! > 30);
  });

  const handleClick = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const fullDate = new Date(date);
    fullDate.setUTCHours(hours!, minutes!, 0, 0);
    const utcTimestamp = fullDate.toISOString();
    console.log(`Hora seleccionada (UTC): ${time}`);
    console.log(`ISO timestamp: ${utcTimestamp}`);
  };

  const isTimeSlotAvailable = (time: string): boolean => {
    const [hours, minutes] = time.split(':').map(Number);
    const slotDate = new Date(date);
    slotDate.setUTCHours(hours!, minutes!, 0, 0);

    return !appointments.some(appointment => {
      const appointmentStart = new Date(appointment.date_from);
      const appointmentEnd = new Date(appointment.date_to);

      // Verifica si el slot está dentro del rango de una cita existente
      return slotDate >= appointmentStart && slotDate < appointmentEnd;
    });
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-col items-start justify-between w-full">
        <h4 className="text-sm font-medium text-foreground py-2">
          {format(date, 'EEEE, d MMMM yyyy', { locale: es })} (Horarios en UTC)
        </h4>
        <p className="text-sm text-foreground/70">Selecciona un horario para agendar tu cita</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {UTC_TIME_SLOTS.map((time, index) => {
          const [hours, minutes] = time.split(':').map(Number);
          const utcDate = new Date();
          utcDate.setUTCHours(hours!, minutes, 0, 0);
          const localTime = format(utcDate, 'HH:mm');
          const isAvailable = isTimeSlotAvailable(time);

          return (
            <Button
              onClick={() => handleClick(time)}
              key={index}
              variant="outline"
              className={cn(
                "relative flex flex-col items-center justify-center border border-primary text-center hover:shadow-md",
                !isAvailable && 'bg-card/50 border-primary/40 opacity-10 cursor-not-allowed shadow-none'
              )}
              disabled={!isAvailable}
            >
              <span>{time} UTC</span>
              <small className="text-xs text-foreground/50">({localTime} local)</small>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

const PsychologistAppointmentScheduler = memo(function PsychologistAppointmentScheduler({
  psychologistId,
  setSelectedDate,
  availability
}: {
  psychologistId: number,
  setSelectedDate: (date: Date) => void,
  availability: Omit<AvailabilityInterval, "id" | "clinic_id" | "psychologist_id">[]
}) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7

  const isAfterToday = (date: Date): boolean => {
    const today = startOfToday()
    return isAfter(date, today) || isToday(date)
  }

  const isDayAvailable = (date: Date): boolean => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), date.getDate())
    const dayOfWeek = dateToCheck.getDay()
    return availability.some(interval => interval.day_of_week === dayOfWeek)
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  return (
    <section className="flex flex-col items-start gap-2">
      <header className="flex flex-row justify-between w-full items-center">
        <h4 className="font-semibold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>
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
          const isAvailable = isDayAvailable(dateToCheck)

          return (
            <Button
              key={day}
              variant="outline"
              className={cn(
                `relative text-center py-4 sm:py-6 hover:shadow-md`,
                isCurrentDay && 'border-primary',
                (!isAvailable || isPastDay) && 'bg-card/70 opacity-50 cursor-not-allowed shadow-none'
              )}
              disabled={isPastDay || !isAvailable}
              onClick={() => setSelectedDate(dateToCheck)}
            >
              {day}
            </Button>
          )
        })}
      </div>
    </section>
  )
})

function PsychologistVideoPresentation({ name, publicId }: { name: string, publicId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="text-primary hover:text-primary/80 border-primary">
          <SquarePlay className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Video presentación de {name}</DialogTitle>
          <DialogDescription>Este video es una presentación del psicólogo para que el paciente pueda conocerlo mejor.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <VideoPlayer publicId={publicId} />
        </div>
      </DialogContent>
    </Dialog>
  )
}