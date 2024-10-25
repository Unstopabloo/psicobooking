import { differenceInMinutes } from "date-fns"

export function calculateDuration(date_from: string, date_to: string) {
  const minutesDifference = differenceInMinutes(new Date(date_to), new Date(date_from))

  if (minutesDifference < 60) {
    return `${minutesDifference} minutos`
  }

  return `${Math.floor(minutesDifference / 60)} ${Math.floor(minutesDifference / 60) === 1 ? 'hora' : 'horas'} y ${minutesDifference % 60} ${minutesDifference % 60 === 1 ? 'minuto' : 'minutos'}`
}