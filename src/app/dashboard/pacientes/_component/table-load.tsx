import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getPatientsWithAppointments } from "@/server/users";
import { toast } from "sonner";

export async function TableLoad() {
  const { patientsWithAppointments: data, error } = await getPatientsWithAppointments()
  if (error) {
    console.error(error)
    toast.error("Hubo un error al recuperar los pacientes.")
  }

  return (
    <DataTable columns={columns} data={data} />
  )
}