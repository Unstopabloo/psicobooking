import React from "react";
import { format } from "date-fns";
import { usePatient } from "@/server/queries/queries";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export function PatientSheet({
  patientId,
  open,
  setOpen
}: {
  patientId: number,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { data, isLoading, error, refetch } = usePatient(patientId);
  React.useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isLoading ? <Skeleton className="h-6 w-[200px]" /> : data?.user?.firstName + " " + data?.user?.lastName}
          </SheetTitle>
          <SheetDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-[300px]" />
            ) : (
              error ? (
                <span className="text-red-500">Error: {error.message}</span>
              ) : (
                `Información del paciente ID: ${patientId}`
              )
            )}
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        ) : error ? (
          <div className="text-red-500 mt-4">
            No se pudo cargar la información del paciente. Por favor, intente de nuevo.
          </div>
        ) : data?.user ? (
          <div className="mt-4 space-y-4">
            <div>
              <strong>Email:</strong> {data.user.email}
            </div>
            <div>
              <strong>Teléfono:</strong> {data.user.phone || 'No disponible'}
            </div>
            <div>
              <strong>Nacionalidad:</strong> {data.user.nationality || 'No disponible'}
            </div>
            <div>
              <strong>Género:</strong> {data.user.gender === 'female' ? 'Mujer' : 'Hombre'}
            </div>
            <div>
              <strong>Fecha de nacimiento:</strong> {data.user.birthDay ? format(new Date(data.user.birthDay), 'dd/MM/yyyy') : 'No disponible'}
            </div>
            <div>
              <strong>Ocupación:</strong> {data.user.occupation || 'No disponible'}
            </div>
            <div>
              <strong>Dirección:</strong> {`${data.user.street || ''} ${data.user.numHouse || ''}, ${data.user.city || ''}, ${data.user.state || ''}, ${data.user.country || ''}`}
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