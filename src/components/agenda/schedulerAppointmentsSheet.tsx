import { format } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { es } from "date-fns/locale";
import { useUpcomingAppointments, useUpcomingAppointmentsPatient } from "@/server/queries/queries";
import { toast } from "sonner";
import { AppointmentCardWithPatient } from "@/types/entities";
import { Avatar } from "../Avatar";
import { calculateDuration } from "@/lib/calculate-duration";
import { Button } from "../ui/button";
import { BellPlus, MessageCircleIcon } from "lucide-react";
import { getCountryPhoneCode } from "@/lib/get-country-code";
import { cn } from "@/lib/utils";

interface SchedulerAppointmentsSheetProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedDate: Date | null
  currentDate: Date
  isPatient?: boolean
}

export function SchedulerAppointmentsSheet({
  isOpen,
  setIsOpen,
  selectedDate,
  currentDate,
  isPatient = false
}: SchedulerAppointmentsSheetProps) {
  const { data: UPCOMING_APPOINTMENTS, isLoading, error } = isPatient ? useUpcomingAppointmentsPatient(format(selectedDate!, 'yyyy-MM-dd')) : useUpcomingAppointments(format(selectedDate!, 'yyyy-MM-dd'))
  console.log('UPCOMING_APPOINTMENTS', UPCOMING_APPOINTMENTS?.appointments)

  if (error) {
    toast.error("Hubo un error al cargar los eventos")
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-base font-semibold">
            {selectedDate && format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: es })}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {
            isLoading ? (
              <p>Cargando...</p>
            ) : selectedDate && UPCOMING_APPOINTMENTS?.appointments && UPCOMING_APPOINTMENTS?.appointments?.length > 0 ? (
              <>
                <h3 className="font-semibold text-foreground/90 mb-8">Citas:</h3>
                <div className="flex flex-col gap-8">
                  {
                    UPCOMING_APPOINTMENTS?.appointments?.map(appointment => (
                      <Appointment key={appointment.id} appointment={appointment} />
                    ))
                  }
                </div>
              </>
            ) : (
              <p>No hay citas para este día</p>
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Appointment({
  appointment,
  isPatient = false
}: {
  appointment: AppointmentCardWithPatient
  isPatient?: boolean
}) {
  return (
    <article className="flex flex-col items-start justify-between gap-6 p-3 shadow-sm rounded-lg hover:shadow-md hover:bg-card/10 transition-shadow duration-400">
      <header className="flex items-center justify-between gap-3">
        <Avatar avatarUrl={appointment.avatar} name={appointment.name} />
        <div className="flex flex-col items-start">
          <h3 className="font-medium">{appointment.name}</h3>
          <small className="text-muted-foreground">{appointment.email}</small>
        </div>
      </header>

      <div className="flex flex-col items-start justify-between gap-1 w-full [&>p>strong]:text-foreground/90 [&>p]:text-sm [&>p>strong]:font-semibold text-foreground/85 [&>p]:grid [&>p]:grid-cols-2 [&>p>span]:text-end [&>p]:gap-1 [&>p]:w-full">
        <p>
          <strong>Telefono: </strong>
          <span>{getCountryPhoneCode(appointment.nationality ?? '')} {appointment.phone}</span>
        </p>
        <p>
          <strong>Duracion: </strong>
          <span>{calculateDuration(appointment.date_from?.toString() ?? '', appointment.date_to?.toString() ?? '')}</span>
        </p>
        <p>
          <strong>Tipo de sesion: </strong>
          <span>{appointment.session_type}</span>
        </p>
      </div>

      <footer className={cn("grid grid-cols-2 gap-4 w-full", !isPatient && 'grid-cols-1')}>
        <Button variant="outline" size="sm" className="gap-2 text-foreground/85 hover:text-foreground hover:border-primary/80 transition-colors duration-400">
          Chat con {appointment.name?.split(' ')[0]} <MessageCircleIcon className="size-4" />
        </Button>
        {
          isPatient && (
            <Button variant="outline" size="sm" className="gap-2 text-foreground/85 hover:text-foreground hover:border-primary/80 transition-colors duration-400">
              Recordar cita <BellPlus className="size-4" />
            </Button>
          )
        }
      </footer>
    </article>
  )
}