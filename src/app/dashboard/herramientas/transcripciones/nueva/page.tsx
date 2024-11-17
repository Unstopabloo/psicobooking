import { Container } from "@/app/dashboard/_layout-components/container";
import H1 from "@/components/H1";
import { UploadTranscriptionForm } from "@/components/uploads/upload-transcription-form";
import { getAppointmentsForTranscriptionForm } from "@/server/db/users";

export default async function NuevaTranscripcionPage() {
  const { data: appointments, error } = await getAppointmentsForTranscriptionForm()

  return (
    <Container className="flex justify-center">
      <div className="flex flex-col gap-10 items-center max-w-xl">
        <H1 className="text-start w-full">Nueva transcripción</H1>
        <UploadTranscriptionForm appointments={appointments} error={error} />
      </div>
    </Container>
  )
}