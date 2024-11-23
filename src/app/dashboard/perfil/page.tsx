import PsychologistCard, { ProfileCardSkeleton } from "@/components/users/profile-card";
import { Container } from "../_layout-components/container";
import { Suspense } from "react";

export default async function PerfilPage() {
  return (
    <Container>
      <Suspense fallback={<ProfileCardSkeleton />}>
        <PsychologistCard />
      </Suspense>
    </Container>
  )
}
