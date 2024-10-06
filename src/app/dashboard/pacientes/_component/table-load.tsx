import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getPatientsWithAppointments } from "@/server/users";

export async function TableLoad() {
  const { patientsWithAppointments: data, error } = await getPatientsWithAppointments()

  return (
    <DataTable columns={columns} data={data} />
  )
}