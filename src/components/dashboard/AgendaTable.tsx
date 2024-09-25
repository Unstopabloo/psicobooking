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

export async function AgendaTable() {
  return (
    <Table>
      <TableCaption>Tus proximas citas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo de sesión</TableHead>
          <TableHead>Consentimiento</TableHead>
          <TableHead className="text-right">Whatsapp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Pablo Oyarce Ramirez</TableCell>
          <TableCell>Presencial</TableCell>
          <TableCell>Firmado</TableCell>
          <TableCell className="flex justify-end items-center pe-4">
            <Button size="icon" variant="ghost" className="p-1">
              <WhatsApp />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Pablo Oyarce Ramirez</TableCell>
          <TableCell>Presencial</TableCell>
          <TableCell>Firmado</TableCell>
          <TableCell className="flex justify-end items-center pe-4">
            <Button size="icon" variant="ghost" className="p-1">
              <WhatsApp />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Pablo Oyarce Ramirez</TableCell>
          <TableCell>Presencial</TableCell>
          <TableCell>Firmado</TableCell>
          <TableCell className="flex justify-end items-center pe-4">
            <Button size="icon" variant="ghost" className="p-1">
              <WhatsApp />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Pablo Oyarce Ramirez</TableCell>
          <TableCell>Presencial</TableCell>
          <TableCell>Firmado</TableCell>
          <TableCell className="flex justify-end items-center pe-4">
            <Button size="icon" variant="ghost" className="p-1">
              <WhatsApp />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}