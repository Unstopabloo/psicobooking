import H1 from "@/components/H1";
import { Container } from "../../_layout-components/container";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NoteCard } from "@/components/notas/note-card";
import { AddNote } from "@/components/notas/add-note";
import { getPatientsNamesForNote } from "@/server/db/users";
import { getNotes } from "@/server/db/notas";

export default async function NotasPage() {
  const patients = await getPatientsNamesForNote()
  const notes = await getNotes()

  return (
    <Container className="lg:px-0 xl:px-0 2xl:px-18">
      <header className="w-full flex items-start justify-between pb-12 pt-6">
        <H1>Notas</H1>
        <AddNote patients={patients}>
          <Button className="flex items-center gap-2">
            <Plus />
            <span className="hidden md:block">Nueva nota</span>
          </Button>
        </AddNote>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {
          notes.map(note => (
            <NoteCard key={note.id} note={note} patients={patients} />
          ))
        }
        <AddNote patients={patients}>
          <Button aria-label="Agregar nota" size="icon" className="flex w-full h-full min-h-44 justify-center border border-[#f4a749] bg-[#f4a749]/10 hover:bg-[#f4a749]/20 transition-colors duration-300 rounded-lg">
            <Plus strokeWidth={0.9} className="size-20 text-[#bf843d]" />
          </Button>
        </AddNote>
      </div>
    </Container>
  )
}