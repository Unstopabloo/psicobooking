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
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { PatientSheet } from "../patient-sheet";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Appointment } from "@/types/entities";
import { Badge } from "../ui/badge";
import { getCountryPhoneCode } from "@/lib/get-country-code";

export const columns: ColumnDef<Appointment>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Telefono" />,
    cell: ({ row }) => {
      const phone = row.getValue('telefono') as string
      const codigo = getCountryPhoneCode(row.getValue('nacionalidad'))!
      return <div className="truncate w-20 lg:w-36">{codigo}{phone}</div>
    }
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="C. Informado" />,
    cell: ({ row }) => {
      const consentimientoInformado = row.getValue('consentimientoInformado')

      return consentimientoInformado === 'Firmado' ? (
        <Badge variant="outline" className="bg-green-200 text-green-600 border border-green-600 text-xs">
          Firmado
        </Badge>
      ) : (
        <Badge variant="outline" className="text-xs bg-red-200 text-red-500 border border-red-500">
          Pendiente
        </Badge>
      )
    }
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de cita" />,
    cell: ({ row }) => format(new Date(row.getValue('appointmentDate')), 'dd/MMM/yy')
  }
]
