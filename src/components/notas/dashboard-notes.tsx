import { getPatientsNamesForNote } from "@/server/db/users";
import { NoteCard } from "./note-card";
import { getNotes } from "@/server/db/notas";

export async function DashboardNotes() {
  const notes = await getNotes({ is_dashboard: true })
  const patients = await getPatientsNamesForNote()

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