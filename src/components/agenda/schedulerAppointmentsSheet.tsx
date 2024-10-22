import { format } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { es } from "date-fns/locale";
import { useUpcomingAppointments } from "@/server/queries/queries";
import { toast } from "sonner";

interface SchedulerAppointmentsSheetProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedDate: Date | null
  currentDate: Date
}

export function SchedulerAppointmentsSheet({
  isOpen,
  setIsOpen,
  selectedDate,
  currentDate
}: SchedulerAppointmentsSheetProps) {
  const { data: UPCOMING_APPOINTMENTS, isLoading, error } = useUpcomingAppointments(format(selectedDate!, 'yyyy-MM-dd'))

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
            ) : selectedDate && (
              <>
                <h3 className="font-semibold text-foreground/90 mb-8">Citas:</h3>
                {
                  UPCOMING_APPOINTMENTS?.appointments ? UPCOMING_APPOINTMENTS.appointments.map((appointment, index) => (
                    <p key={index}>{appointment.name}</p>
                  )) : (
                    <p>No hay eventos para este día.</p>
                  )
                }
              </>
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}