import { NextAppointment } from "@/types/entities";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "../ui/card";
import { Avatar } from "../Avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function GenerativeNextAppointment({
  nextAppointment
}: {
  nextAppointment: NextAppointment
}) {
  return (
    <Card className="bg-transparent shadow-none border-none">
      <CardContent className="flex flex-col gap-2 min-w-80">
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar avatarUrl={nextAppointment.avatar} name={nextAppointment.name} />
          <div className="flex flex-col">
            <CardTitle>{nextAppointment.name}</CardTitle>
            <CardDescription>{nextAppointment.email}</CardDescription>
          </div>
        </CardHeader>
        <p className="text-sm text-muted-foreground">
          {format(nextAppointment.date_from, 'EEEE dd, MMMM', { locale: es })}
        </p>
        <div className={`text-sm text-muted-foreground rounded-lg w-fit p-2 ${nextAppointment.session_type === 'presencial' ? 'bg-primary/10 text-primary border border-primary' : 'bg-secondary/10 text-secondary border border-secondary'}`}>
          {nextAppointment.session_type}
        </div>
      </CardContent>
    </Card>
  )
}