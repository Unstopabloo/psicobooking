"use client"

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"
import { DataTablePagination } from "./data-table-pagination"
import H1 from "../H1"
import { PatientSheet } from "../patient-sheet"
import { Appointment } from "@/types/entities"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | undefined
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [openTicket, setOpenTicket] = React.useState(false)
  const [patientId, setPatientId] = React.useState(0)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState<any>([])
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter
  })

  return (
    <div className="flex flex-col w-full gap-8 min-h-[500px]">
      <header className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <H1>Pacientes</H1>
          <p className="text-muted-foreground text-pretty text-sm font-normal">Gestiona tus pacientes y gestiona sus citas.</p>
        </div>
        <div className="flex-1 flex items-center justify-end py-4">
          <Input
            placeholder="Buscar ..."
            value={globalFilter}
            onChange={e => table.setGlobalFilter(String(e.target.value))}
            className="max-w-md"
          />
        </div>
      </header>
      <div className="rounded-md border flex-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(`cursor-pointer ${row.index % 2 === 0 && "bg-card/40"}`, 'hover:text-foreground')}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setOpenTicket(true)
                    setPatientId((row.original as Appointment).id)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aún no hay pacientes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption className="text-center text-muted-foreground text-sm font-normal">
            {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} resultados
          </TableCaption>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full">
        <DataTablePagination table={table} />
      </div>
      <PatientSheet patientId={patientId} open={openTicket} setOpen={setOpenTicket} />
    </div>
  )
}
