import { getNotes } from "@/server/db/notas";
import { NoteCard } from "./note-card";
import { getPatientsNamesForNote } from "@/server/db/users";
import { Skeleton } from "../ui/skeleton";

export async function Notes() {
  const notes = await getNotes()
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

export function NotesSkeleton({ is_dashboard = false }: { is_dashboard?: boolean }) {
  return (
    <>
      {
        Array.from({ length: is_dashboard ? 3 : 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-44" />
        ))
      }
    </>
  )
}
