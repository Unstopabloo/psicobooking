import { Container } from "@/app/dashboard/_layout-components/container";
import { getPatientDashboardData } from "@/server/db/users";
import { SearchFilter } from "@/components/patient/search-filter";

export default async function Patient() {
  const user = await getPatientDashboardData()

  return (
    <Container className="lg:px-0 xl:px-0 2xl:px-0">
      <SearchFilter user={user} />
    </Container>
  )
}
