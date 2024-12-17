import React, { use } from "react";
import { useContactInfo, usePatient } from "@/server/queries/queries";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Avatar } from "./Avatar";
import { Badge } from "./ui/badge";
import { getCountryPhoneCode } from "@/lib/get-country-code";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { ContactBase } from "@/types/entities";
import { Button } from "./ui/button";
import Link from "next/link";

export function PatientSheet({
  patientId,
  open,
  setOpen
}: {
  patientId: number,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [openContact, setOpenContact] = React.useState(false)
  const { data, isLoading, error, refetch } = usePatient(patientId);
  React.useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  if (!open) return null;
  if (error) return toast.error("No se pudo cargar la información del paciente. Por favor, intente de nuevo.")

  const generalInfo = [
    {
      id: 1,
      title: "Numero de ficha",
      value: data?.patientTicket?.numberOfTicket
    },
    {
      id: 2,
      title: "Email",
      value: data?.patientTicket?.email
    },
    {
      id: 3,
      title: "Teléfono",
      value: data?.patientTicket?.phone
    },
    {
      id: 4,
      title: "Nacionalidad",
      value: data?.patientTicket?.nationality
    },
    {
      id: 5,
      title: "Tipo de sesión",
      value: data?.patientTicket?.sessionType
    },
    {
      id: 6,
      title: "Estado",
      value: data?.patientTicket?.state
    },
    {
      id: 7,
      title: "Precio / sesión",
      value: data?.patientTicket?.price
    }
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          {isLoading ? (
            <div className="space-y-4 mt-6">
              <SheetTitle className="text-[17px]">
                Ficha resumen de paciente
              </SheetTitle>
              <SheetDescription className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-60 rounded-lg" />
                    <Skeleton className="h-2 w-28 rounded-lg" />
                  </div>
                </div>
                <Skeleton className="rounded-lg h-4 w-20" />
              </SheetDescription>
            </div>
          ) : data?.patientTicket ? (
            <>
              <SheetTitle className="text-[17px]">
                Ficha resumen de paciente
              </SheetTitle>
              <SheetDescription className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div>
                    <Avatar avatarUrl={data.patientTicket.avatar ?? null} name={data.patientTicket.name ?? null} />
                  </div>
                  <div className="flex flex-col">
                    <strong className="font-semibold text-foreground/90">{data.patientTicket.name}</strong>
                    <small className="font-normal">Edad: {data.patientTicket.age}</small>
                  </div>
                </div>
                <div>
                  {data.patientTicket.consentimientoInformado === 1 ? (
                    <Badge variant="outline" className="bg-green-200 text-green-600 border border-green-600 text-xs">
                      Firmado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-red-200 text-red-500 border border-red-500">
                      Pendiente
                    </Badge>
                  )}
                </div>
              </SheetDescription>
            </>
          ) : (
            <div className="text-gray-500 mt-4">
              No se encontró información para este paciente.
            </div>
          )}
        </SheetHeader>
        {isLoading ? (
          <div className="space-y-4 mt-6 pb-10">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <div className="py-14 space-y-5">
              <Skeleton className="h-4 w-[250px]" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-5 w-[150px]" />
              </div>
            </div>
            <div className="py-14 space-y-5">
              <Skeleton className="h-4 my-2 w-[250px]" />
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 mt-4">
            No se pudo cargar la información del paciente. Por favor, intente de nuevo.
          </div>
        ) : data?.patientTicket ? (
          <div className="flex flex-col gap-12">
            <section className="mt-10 space-y-4">
              <h4 className="text-base font-medium">Información general</h4>
              <ul className="space-y-3">
                {
                  generalInfo.map((info, index) => (
                    <li key={index} className="grid grid-cols-2 gap-x-4 gap-y-4">
                      <strong className="text-sm font-medium">{info.title}</strong>
                      {
                        info.title === 'Teléfono' ? (
                          <span className="text-sm font-normal">{getCountryPhoneCode(data.patientTicket!.nationality!)} {info.value}</span>
                        ) : (
                          <span className="text-sm font-normal">{info.title === 'Numero de ficha' && '#'} {info.value ?? '-'}</span>
                        )
                      }
                    </li>
                  ))
                }
              </ul>
            </section>
            <section className="space-y-4">
              <h4 className="text-base font-medium">Contactos</h4>
              <div className="flex items-center gap-4">
                {
                  data.patientTicket.contacts.length > 0 ? data.patientTicket.contacts.map((contact, index) => (
                    <ContactDialog key={index} contact={contact} open={openContact} setOpen={setOpenContact} />
                  )) : (
                    <div className="text-muted-foreground">No hay contactos disponibles</div>
                  )
                }
              </div>
            </section>
            <section className="space-y-4">
              <h4 className="text-base font-medium">Sesiones</h4>
              <ul className="space-y-3 [&>li]:grid [&>li]:grid-cols-2 text-sm [&>li>p]:text-foreground/80 [&>li>strong]:font-normal ">
                <li>
                  <strong>Realizadas</strong>
                  <span>{data.patientTicket.sessions.completed}</span>
                </li>
                <li>
                  <strong>Programadas</strong>
                  <span>{data.patientTicket.sessions.scheduled}</span>
                </li>
                <li>
                  <strong>Canceladas</strong>
                  <span>{data.patientTicket.sessions.cancelled}</span>
                </li>
                <li>
                  <strong>Total</strong>
                  <span>{data.patientTicket.sessions.scheduled + data.patientTicket.sessions.cancelled + data.patientTicket.sessions.completed}</span>
                </li>
              </ul>
            </section>
            <div className="mt-14">
              <Button asChild className="w-full">
                <Link href={`/dashboard/pacientes/${data.patientTicket.id}`}>
                  Ver ficha
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 mt-4">
            No se encontró información para este paciente.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export const ContactDialog = ({
  open,
  setOpen,
  contact
}: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  contact: ContactBase
}) => {

  const { data, isLoading, error, refetch } = useContactInfo(contact.id)
  React.useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-8 bg-secondary/10 text-secondary border border-secondary/90 hover:bg-secondary/15 hover:text-secondary rounded-lg">
          {contact.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto p-0">
        <DialogHeader>
          <DialogTitle className="font-semibold text-base">{data?.contactInfo?.name ?? '-'}</DialogTitle>
          <DialogDescription className="text-foreground/85 text-sm font-normal">{data?.contactInfo?.name ?? '-'}</DialogDescription>
        </DialogHeader>
        <DialogContent className="py-8">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg">Contacto de emergencia</h3>
          </div>
          <ul className="space-y-2 text-base [&>li>strong]:font-semibold [&>li>strong]:text-foreground/95">
            <li className="flex items-center gap-2">
              <strong>Nombre: </strong>
              <span>{data?.contactInfo?.name ?? '-'}</span>
            </li>
            <li className="flex items-center gap-2">
              <strong>Teléfono: </strong>
              <span>{data?.contactInfo?.number ?? '-'}</span>
            </li>
            <li className="flex items-center gap-2">
              <strong>Email: </strong>
              <span>{data?.contactInfo?.email ?? '-'}</span>
            </li>
          </ul>
        </DialogContent>
      </DialogContent>
    </Dialog>
  )
}