import { getPatientsNamesForNote } from "@/server/db/users";
import { NoteCard } from "./note-card";
import { getNotes } from "@/server/db/notas";
import { NoData } from "../no-data";

export async function DashboardNotes() {
  const notes = await getNotes({ is_dashboard: true })
  const patients = await getPatientsNamesForNote()

  if (notes.length === 0) return <NoData className="col-span-3" title="Aún no tienes notas" description="Comienza a crear notas para mantener un registro de tus sesiones" />

  return (
    <>
      {
        notes.map(note => (
          <NoteCard key={note.id} note={note} patients={patients} />
        ))
      }
    </>
  )
}