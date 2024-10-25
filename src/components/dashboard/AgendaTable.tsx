import { WhatsApp } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { getDashboardPatients } from "@/server/db/users";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { getCountryPhoneCode } from "@/lib/get-country-code";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { NoData } from "../no-data";

export async function AgendaTable() {
  const { patients, error } = await getDashboardPatients()

  return (
    patients ? (
      <Table>
        <TableCaption>Tus proximas citas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Nacionalidad</TableHead>
            <TableHead className="text-right">Whatsapp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            patients?.map(patient => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.nacionalidad}</TableCell>
                <TableCell className="flex justify-end items-center pe-4">
                  <Button asChild size="icon" variant="ghost" className="p-1">
                    <Link href={createWhatsAppLink(getCountryPhoneCode(patient.nacionalidad) + patient.telefono)}>
                      <WhatsApp />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
          {
            error && <TableRow>
              <TableCell colSpan={4} className="text-center">
                <p className="text-red-500">Hubo un error al cargar los pacientes</p>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    ) : <NoData title="Aún no tienes pacientes en tu agenda" description="De momento puedes marcar tu disponibilidad en la pestaña de agenda." />
  )
}

export function AgendaTableLoading() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
    </div>
  )
}