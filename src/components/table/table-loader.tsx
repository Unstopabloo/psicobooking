import { Container } from "@/app/dashboard/_layout-components/container";
import H1 from "../H1";

export function TableLoader() {
  return (
    <Container className="px-0 lg:px-0 xl:px-10 2xl:px-10">
      <div className="flex items-center justify-between w-full py-8">
        <div className="flex-shrink-0">
          <H1>Pacientes</H1>
          <p className="text-muted-foreground text-pretty text-sm font-normal">Gestiona tus pacientes y gestiona sus citas.</p>
        </div>
        <div className="w-96 bg-gray-300 dark:bg-gray-700 animate-duration-[3500ms] rounded-lg animate-pulse flex items-center justify-end py-4"></div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 animate-duration-[3500ms] animate-pulse rounded-lg h-[450px] w-full"></div>
    </Container>
  )
}