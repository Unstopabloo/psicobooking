import H1 from "@/components/H1";
import { Container } from "@/app/dashboard/_layout-components/container";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { AddActivity } from "@/components/actividades/add-activity";
import { getPatientsNamesForNote } from "@/server/db/users";
import { Activities } from "@/components/actividades/activities";
import { Suspense } from "react";
import { ActivitiesSkeleton } from "@/components/actividades/activities";

export default async function ActividadesPage() {
  const patients = await getPatientsNamesForNote()

  return (
    <Container className="lg:px-0 xl:px-0 2xl:px-20">
      <header className="flex items-center justify-between pb-10">
        <div>
          <H1>Actividades</H1>
          <p className="text-sm text-muted-foreground">Aquí podrás seguir y modificar las actividades que se han realizado en el sistema.</p>
        </div>
        <AddActivity patients={patients}>
          <Button className="gap-2">
            <PlusIcon className="size-4" />
            <span className="hidden md:block">Nueva actividad</span>
          </Button>
        </AddActivity>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        <Suspense fallback={<ActivitiesSkeleton limit={4} />}>
          <Activities />
        </Suspense>
      </div>
    </Container>
  )
}
