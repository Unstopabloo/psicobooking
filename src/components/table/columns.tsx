"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import React from "react";
import { PatientSheet } from "../patient-sheet";
import { DataTableColumnHeader } from "./data-table-column-header";


export type Paciente = {
  id: number;
  name: string;
  email: string;
  telefono: string;
  nacionalidad: string;
  genero: string;
  edad: number;
  tipoDeSesion: string;
  consentimientoInformado: "Firmado" | "Pendiente";
  appointmentDate: Date;
  appointmentState: "scheduled" | "completed" | "cancelled";
};

export const columns: ColumnDef<Paciente>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return <div className="truncate w-20 lg:w-36">{row.getValue('email')}</div>
    }
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Telefono" />
  },
  {
    accessorKey: "nacionalidad",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nacionalidad" />
  },
  {
    accessorKey: "genero",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Genero" />,
    cell: ({ row }) => {
      const genero = row.getValue('genero')
      return genero === 'female' ? 'Mujer' : 'Hombre'
    }
  },
  {
    accessorKey: "edad",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Edad" />
  },
  {
    accessorKey: "tipoDeSesion",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de sesión" />,
    cell: ({ row }) => {
      const tipoDeSesion = row.getValue('tipoDeSesion')
      return tipoDeSesion === 'online' ? 'En línea' : 'Presencial'
    }
  },
  {
    accessorKey: "consentimientoInformado",
    header: ({ column }) => <DataTableColumnHeader column={column} title="C. Informado" />
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de cita" />,
    cell: ({ row }) => format(new Date(row.getValue('appointmentDate')), 'dd/MMM/yy')
  },
  {
    accessorKey: "appointmentState",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const appointmentState = row.getValue('appointmentState')
      if (appointmentState === 'cancelled') {
        return 'Cancelada'
      }
      return appointmentState === 'scheduled' ? 'Pendiente' : 'Completada'
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original
      const [open, setOpen] = React.useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Ver paciente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <PatientSheet patientId={patient.id} open={open} setOpen={setOpen} />
        </>
      )
    },
  }
]
