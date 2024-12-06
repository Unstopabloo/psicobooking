"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useQueryState } from 'nuqs'
import { useDebounce } from "@/lib/debounce";
import { usePsychologists } from "@/server/queries/queries";
import { PsychologistCard } from "./psychologist-card";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import H1 from "../H1";
import { PsychologistProfile } from "@/types/entities";
import { PsychologistAppointmentSheet } from "./psychologist-appointment-sheet";

export function SearchFilter({ user }: { user: Pick<PsychologistProfile, 'id' | 'first_name' | 'last_name' | 'email' | 'phone' | 'gender' | 'country'> | null }) {
  const [selectedPsychologist, setSelectedPsychologist] = useState<number | null>(null)
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = usePsychologists(debouncedSearch)

  return (
    <section className="py-4 grid grid-cols-2 gap-10">
      <div
        aria-label="Filtro de búsqueda de psicólogos y resultados"
        className={`animate-fade-left duration-300 flex flex-col gap-10 ${selectedPsychologist ? 'col-span-1' : 'col-span-2'}`}
      >
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <H1>Hola, {user?.first_name} {user?.last_name}</H1>
            <p className="pt-1 text-sm text-muted-foreground max-w-[800px] text-balance">PsicoBooking te da la bienvenida, aquí podrás agendar cita con un profesional que más se acomode a tus requerimientos, si necesitas ayuda no olvides en escribirnos en nuestras redes sociales, que tengas un buen día. </p>
          </div>
        </header>
        <div className="flex items-end gap-4">

          <div className="space-y-2">
            <Label htmlFor="search-filter">Busca un profesional por nombre ó especialidad</Label>
            <div className="relative min-w-96">
              <Input
                id="search-filter"
                aria-describedby="filtro-busqueda-de-psicologos"
                className="w-full pe-9"
                placeholder="Ej: Psicología, Terapia Cognitiva, Juan Perez, etc."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Subscribe"
              >
                <Search size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
        <ScrollArea className="h-[525px]">
          <div className={`grid gap-4 ${selectedPsychologist ? 'grid-cols-3' : 'grid-cols-6'}`}>
            {
              isLoading
                ? Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton key={index} className="h-72 w-full" />
                ))
                : data?.length! > 0
                  ? data?.map((psychologist) => (
                    <PsychologistCard
                      key={psychologist.id}
                      psychologist={psychologist}
                      selectedPsychologist={selectedPsychologist}
                      setSelectedPsychologist={setSelectedPsychologist}
                    />
                  ))
                  : <p className="text-center text-base text-muted-foreground">No se encontraron psicólogos</p>
            }
          </div>
        </ScrollArea>
      </div>
      {
        selectedPsychologist && (
          <PsychologistAppointmentSheet
            selectedPsychologist={selectedPsychologist}
            setSelectedPsychologist={setSelectedPsychologist}
          />
        )
      }
    </section>
  )
}
