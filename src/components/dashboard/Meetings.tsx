import { Skeleton } from "../ui/skeleton";
import { MeetingCard } from "../users/MeetingCard";
import { getDashboardAppointments } from "@/server/db/users";

export async function Meetings() {
  const { appointments, error } = await getDashboardAppointments()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 text-center lg:text-start items-center">
      {appointments?.map(appointment => (
        <MeetingCard
          key={appointment.id}
          patientId={appointment.patient_id}
          name={appointment.name}
          informedConsent={appointment.informed_consent}
          avatarUrl={appointment.avatar ?? ''}
          appointmentType={appointment.session_type}
          timestamp={appointment.date_from}
          error={error}
        />
      ))}
    </div>
  )
}

export function MeetingsLoading() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 text-center lg:text-start items-center">
      <Skeleton className="w-full max-w-sm h-28" />
      <Skeleton className="w-full max-w-sm h-28" />
      <Skeleton className="w-full max-w-sm h-28" />
      <Skeleton className="w-full max-w-sm h-28" />
    </div>
  )
}